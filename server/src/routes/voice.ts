import { WebSocketServer, WebSocket } from 'ws'
import { Server } from 'http'
import { logger } from '../logger.js'
import { streamAgentResponse, AgentMessage } from '../services/agent.js'
import { streamEFAgentResponse } from '../services/efAgent.js'
import { streamEFAgentArResponse } from '../services/efAgentAr.js'
import { streamZainAgentResponse } from '../services/zainAgent.js'
import { streamMawhibaAgentResponse } from '../services/mawhibaAgent.js'
import { streamTTS } from '../services/tts.js'

// Helper to select the appropriate agent based on current URL
function selectAgentStream(url: string | undefined) {
	if (url?.startsWith('/mawhiba')) {
		logger.info({ url }, 'Using Mawhiba Agent')
		return streamMawhibaAgentResponse
	}
	if (url?.startsWith('/zain')) {
		logger.info({ url }, 'Using Zain Jordan Agent')
		return streamZainAgentResponse
	}
	if (url?.startsWith('/ef-ar')) {
		logger.info({ url }, 'Using EF Arabic Agent')
		return streamEFAgentArResponse
	}
	if (url?.startsWith('/ef')) {
		logger.info({ url }, 'Using EF Agent')
		return streamEFAgentResponse
	}
	// Default to JICO/ZATCA agent
	logger.info({ url }, 'Using default Agent (JICO/ZATCA)')
	return streamAgentResponse
}

export function setupVoiceWebSocket(server: Server) {
	const wss = new WebSocketServer({ server, path: '/voice' })

	wss.on('connection', (ws: WebSocket) => {
		logger.info('Voice WebSocket client connected')

		const conversationHistory: AgentMessage[] = []
		let turnCounter = 0
		let currentTurn: { id: number; aborted: boolean } | null = null
		
		// Track pending tool results
		const pendingToolResults = new Map<string, any>()
		let waitingForToolResults = false
		
		// Conversation context for intelligent form filling
		const context: {
			userGoal?: string
			gatheredData: Record<string, any>
			currentPage?: string
			currentUrl?: string
			isAuthenticated?: boolean
		} = {
			gatheredData: {}
		}

		const startNewTurn = () => {
			if (currentTurn) currentTurn.aborted = true
			currentTurn = { id: ++turnCounter, aborted: false }
			return currentTurn
		}

		const send = (obj: any) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(obj))
			}
		}
		
		// Extract entities from user text
		const extractEntities = (text: string) => {
			const entities: Record<string, any> = {}
			
			// TIN: look for 15-digit number starting with 3
			const tinMatch = text.match(/3[\d\s]{14,}/g)
			if (tinMatch) {
				entities.tin = tinMatch[0].replace(/\s/g, '').substring(0, 15)
			}
			
			// Amounts: look for numbers with k, thousand, SAR, riyal
			const amountMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(k|thousand|SAR|riyal)?/gi)
			if (amountMatch) {
				let amount = amountMatch[0].replace(/,/g, '')
				if (amount.toLowerCase().includes('k')) {
					amount = (parseFloat(amount) * 1000).toString()
				}
				entities.amountDue = parseFloat(amount).toString()
			}
			
			// Tax periods: Q1, Q2, Q3, Q4
			const periodMatch = text.match(/Q[1-4]\s*20\d{2}/gi)
			if (periodMatch) {
				entities.taxPeriod = periodMatch[0].toUpperCase().replace(/\s/g, '-')
			}
			
			// Installments: look for number + months/year
			const installmentMatch = text.match(/(\d+|six|twelve|three)\s*(months?|years?)/gi)
			if (installmentMatch) {
				const num = installmentMatch[0].toLowerCase()
				if (num.includes('six') || num.includes('6')) entities.requestedInstallments = '6'
				else if (num.includes('twelve') || num.includes('12') || num.includes('year')) entities.requestedInstallments = '12'
				else if (num.includes('three') || num.includes('3')) entities.requestedInstallments = '3'
			}
			
			return entities
		}

		let syntheticToolSeq = 0

		// Detect Gemini-style JSON tool calls leaking into text, e.g.:
		// [{"recipient_name":"functions.setLanguage","parameters":{"lang":"ar"}}]
		// OR {"tool_uses": [{"recipient_name":...}]}
		const createToolCallFilter = (
			onToolCall: (tc: { id: string; tool: string; args: any }) => void
		) => {
			let buffer = ''

			return (incoming: string): string => {
				if (!incoming) return ''
				buffer += incoming
				let output = ''

				while (buffer.length > 0) {
					// Look for start of JSON (either [ or {)
					const startArray = buffer.indexOf('[')
					const startObject = buffer.indexOf('{')
					
					let start = -1
					if (startArray !== -1 && startObject !== -1) {
						start = Math.min(startArray, startObject)
					} else if (startArray !== -1) {
						start = startArray
					} else if (startObject !== -1) {
						start = startObject
					}

					if (start === -1) {
						// No possible JSON start -> flush buffer
						output += buffer
						buffer = ''
						break
					}

					// Flush text before JSON
					if (start > 0) {
						output += buffer.slice(0, start)
						buffer = buffer.slice(start)
					}
					
					// Determine closer
					const opener = buffer[0]
					const closer = opener === '[' ? ']' : '}'
					
					// Find matching closer
					// We need to track depth to correctly identify the matching closer
					let depth = 0
					let end = -1
					for (let i = 0; i < buffer.length; i++) {
						const char = buffer[i]
						if (char === opener) depth++
						else if (char === closer) depth--
						
						if (depth === 0) {
							end = i
							break
						}
					}

					if (end === -1) {
						// Incomplete JSON; wait for more data
						// If buffer gets huge (>4KB) without closing, force flush to avoid OOM/stuck
						if (buffer.length > 4096) {
							output += buffer[0]
							buffer = buffer.slice(1)
							continue
						}
						break
					}

					const candidate = buffer.slice(0, end + 1)
					buffer = buffer.slice(end + 1)

					let parsed: any
					try {
						parsed = JSON.parse(candidate)
					} catch {
						// Not valid JSON; treat as text
						output += candidate[0] // emit first char
						buffer = candidate.slice(1) + buffer // retry rest
						continue
					}

					const handleItem = (item: any) => {
						if (
							item &&
							typeof item === 'object' &&
							typeof item.recipient_name === 'string' &&
							item.parameters !== undefined
						) {
							const fullName = item.recipient_name as string
							const tool =
								fullName.startsWith('functions.')
									? fullName.split('.').pop() || fullName
									: fullName
							const id = `synthetic_tool_${Date.now()}_${++syntheticToolSeq}`
							const args = item.parameters
							onToolCall({ id, tool, args })
							return true
						}
						return false
					}

					let recognized = false
					
					// Case 1: Array of tools
					if (Array.isArray(parsed)) {
						for (const item of parsed) {
							if (handleItem(item)) recognized = true
						}
					} 
					// Case 2: Single tool object
					else if (handleItem(parsed)) {
						recognized = true
					}
					// Case 3: Wrapper object {"tool_uses": [...]}
					else if (parsed && typeof parsed === 'object' && Array.isArray(parsed.tool_uses)) {
						for (const item of parsed.tool_uses) {
							if (handleItem(item)) recognized = true
						}
					}

					if (!recognized) {
						// Not our tool-call format; keep as normal text
						output += candidate
					}
					// If recognized, we intentionally DROP the JSON from output
				}

				return output
			}
		}

		ws.on('message', async (data: Buffer) => {
			try {
				const msg = JSON.parse(data.toString())
				logger.info({ msg }, 'Received voice message')

				if (msg.type === 'tool_result') {
					// Store tool result
					logger.info({ id: msg.id, result: msg.result }, 'Received tool result from client')
					pendingToolResults.set(msg.id, msg.result)
					return
				} else if (msg.type === 'page_state') {
					// Update context with current page
					context.currentPage = msg.title
					context.currentUrl = msg.url
					logger.info({ url: msg.url, title: msg.title }, 'Page state updated')
					return
				} else if (msg.type === 'transcript' && msg.isFinal) {
					const myTurn = startNewTurn()
					const userText = msg.text.trim()
					if (!userText) return

					// Extract entities from user speech
					const entities = extractEntities(userText)
					if (Object.keys(entities).length > 0) {
						logger.info({ entities }, 'Extracted entities from user speech')
						Object.assign(context.gatheredData, entities)
					}

					conversationHistory.push({ role: 'user', content: userText })

					try {
						let speaking = false
						let lastAssistantText = ''

						// Helper: stream a single model pass, collecting text + tool calls
						const runAgentPass = async () => {
							let pendingText = ''
							let totalText = ''
							const toolCalls: Array<{
								id: string
								tool: string
								args: any
							}> = []

							const filterToolCallsFromText = createToolCallFilter(tc => {
								// Synthetic tool calls encoded in text
								send({ type: 'tool_call', id: tc.id, tool: tc.tool, args: tc.args })
								logger.info(
									{ id: tc.id, tool: tc.tool, args: tc.args },
									'Synthetic tool call parsed from text'
								)
								toolCalls.push(tc)
							})

							// Select appropriate agent based on current URL
							const agentStream = selectAgentStream(context.currentUrl)
							const responseStream =
								agentStream === streamAgentResponse
									? agentStream(conversationHistory, context.currentUrl)
									: agentStream(conversationHistory)

							for await (const chunk of responseStream) {
								if (currentTurn !== myTurn || myTurn.aborted) break

								if (chunk.type === 'text' && chunk.content) {
									const cleaned = filterToolCallsFromText(chunk.content)
									if (!cleaned) {
										continue
									}

									send({ type: 'text', content: cleaned })
									totalText += cleaned
									pendingText += cleaned

									// Sentence/pause based buffering for TTS
									let splitIndex = -1
									
									// 1. Look for definite sentence endings
									const sentenceMatch = pendingText.match(/[.!?](?=\s|$)/)
									if (sentenceMatch && sentenceMatch.index !== undefined) {
										splitIndex = sentenceMatch.index + 1
									} 
									// 2. If long buffer, allow soft splitting on commas/newlines
									else if (pendingText.length > 50) {
										const pauseMatch = pendingText.match(/[,:\n](?=\s)/)
										if (pauseMatch && pauseMatch.index !== undefined && pauseMatch.index > 15) {
											splitIndex = pauseMatch.index + 1
										}
									}
									
									if (splitIndex !== -1) {
										const textToSpeak = pendingText.slice(0, splitIndex)
										pendingText = pendingText.slice(splitIndex).trim()

										if (!speaking) {
											send({ type: 'speaking_started' })
											speaking = true
										}

										for await (const audioChunk of streamTTS(textToSpeak.trim())) {
											if (currentTurn !== myTurn || myTurn.aborted) break
											send({ type: 'audio_chunk', data: audioChunk.toString('base64') })
										}
									}
								} else if (chunk.type === 'tool_call' && chunk.id && chunk.tool && chunk.args) {
									// Normal structured tool calls
									send({ type: 'tool_call', id: chunk.id, tool: chunk.tool, args: chunk.args })
									logger.info(
										{ id: chunk.id, tool: chunk.tool, args: chunk.args },
										'Tool call sent to client'
									)

									toolCalls.push({
										id: chunk.id,
										tool: chunk.tool,
										args: chunk.args
									})
								}
							}

							// Flush any remaining text to TTS
							if (pendingText.trim().length > 0) {
								if (!speaking) {
									send({ type: 'speaking_started' })
									speaking = true
								}
								for await (const audioChunk of streamTTS(pendingText.trim())) {
									if (currentTurn !== myTurn || myTurn.aborted) break
									send({ type: 'audio_chunk', data: audioChunk.toString('base64') })
								}
							}

							return { text: totalText, toolCalls }
						}

						const maxToolPasses = 15
						let pass = 0

						while (!myTurn.aborted && pass < maxToolPasses) {
							// Call model once
							const { text, toolCalls } = await runAgentPass()
							lastAssistantText = text

							if (myTurn.aborted) break

							// If no tools were requested, we're done: just record the assistant text
							if (toolCalls.length === 0) {
								if (text && text.trim().length > 0) {
									conversationHistory.push({
										role: 'assistant',
										content: text
									})
								}
								logger.info(
									{ pass, responseLength: text.length },
									'Model response with no tool calls – finishing turn'
								)
								break
							}

							// Tools were requested in this pass
							logger.info(
								{ count: toolCalls.length, pass },
								'Waiting for tool results from client...'
							)

							// Add assistant message with tool_calls to history
							conversationHistory.push({
								role: 'assistant',
								content: text || null,
								tool_calls: toolCalls.map(tc => ({
									id: tc.id,
									type: 'function',
									function: {
										name: tc.tool,
										arguments: JSON.stringify(tc.args)
									}
								}))
							})

							// Wait for tool results (with timeout)
							waitingForToolResults = true
							const waitStart = Date.now()
							const maxWait = 5000 // 5 seconds

							while (
								pendingToolResults.size < toolCalls.length &&
								(Date.now() - waitStart) < maxWait
							) {
								await new Promise(resolve => setTimeout(resolve, 50))
								if (myTurn.aborted) break
							}
							waitingForToolResults = false

							// Append tool result messages to history
							for (const tc of toolCalls) {
								const result = pendingToolResults.get(tc.id) || { 
									success: false, 
									error: 'Timeout waiting for tool result' 
								}
								
								// Add tool result to history to satisfy API contract
								conversationHistory.push({
									role: 'tool',
									content: JSON.stringify(result),
									tool_call_id: tc.id
								})
								
								logger.info(
									{ id: tc.id, tool: tc.tool, result, pass },
									'Tool result received'
								)
							}

							pendingToolResults.clear()
							pass += 1

							// Loop will call the model again with updated conversationHistory,
							// allowing arbitrary tool -> model -> tool -> ... chains.
						}

						send({ type: 'speaking_ended' })
						logger.info(
							{ passes: pass, responseLength: lastAssistantText.length },
							'Turn completed - ready for next user input'
						)

						// WebSocket stays open for continuous conversation
					} catch (e: any) {
						send({ type: 'error', message: e.message })
						logger.error({ error: e.message }, 'Turn processing failed')
					}
				} else if (msg.type === 'interrupt') {
					if (currentTurn) currentTurn.aborted = true
					send({ type: 'speaking_ended' })
					logger.info('Voice interrupted by client')
				}
			} catch (error: any) {
				logger.error({ error: error.message }, 'Voice message handling failed')
				send({ type: 'error', message: error.message })
			}
		})

		ws.on('close', () => {
			if (currentTurn) currentTurn.aborted = true
			logger.info('Voice WebSocket client disconnected')
		})

		ws.on('error', (error) => {
			logger.error({ error: error.message }, 'Voice WebSocket error')
		})
		
		// Send a heartbeat to keep connection alive
		const heartbeat = setInterval(() => {
			if (ws.readyState === 1) {
				ws.ping()
			} else {
				clearInterval(heartbeat)
			}
		}, 30000)
		
		ws.on('close', () => {
			clearInterval(heartbeat)
		})
	})

	logger.info('Voice WebSocket server initialized on /voice')
}


