import React from 'react'
import { Mic, MicOff, X, Volume2, Send } from 'lucide-react'
import { createSpeechRecognition, SpeechRecognitionController } from './speechRecognition'
import { connectVoiceSocket, VoiceSocketController } from './voiceSocket'
import { createAudioQueue, AudioQueueController } from './audioQueue'
import { executeActions } from '../agent/execute'
import { useLocaleStore } from '../../store/locale'

export function AgentDock() {
	const [open, setOpen] = React.useState(false)
	const [connecting, setConnecting] = React.useState(false)
	const [isListening, setIsListening] = React.useState(false)
	const [isSpeaking, setIsSpeaking] = React.useState(false)
	const [textInput, setTextInput] = React.useState('')
	const recognitionRef = React.useRef<SpeechRecognitionController | null>(null)
	const socketRef = React.useRef<VoiceSocketController | null>(null)
	const audioQueueRef = React.useRef<AudioQueueController | null>(null)
	const [transcript, setTranscript] = React.useState<string[]>([])
	const [interimText, setInterimText] = React.useState('')
	const { lang: locale } = useLocaleStore()
	const isSpeakingRef = React.useRef(false)
	const dropIncomingRef = React.useRef(false)

	React.useEffect(() => {
		isSpeakingRef.current = isSpeaking
	}, [isSpeaking])
	
	// Send page state updates to server
	React.useEffect(() => {
		if (!socketRef.current) return
		
		const sendPageState = () => {
			socketRef.current?.send({
				type: 'page_state',
				url: window.location.pathname,
				title: document.title
			})
		}
		
		// Send initial state
		sendPageState()
		
		// Monitor navigation changes
		const observer = new MutationObserver(sendPageState)
		observer.observe(document.querySelector('title') || document.head, {
			childList: true,
			subtree: true
		})
		
		// Also monitor URL changes (for SPAs)
		const originalPushState = history.pushState
		const originalReplaceState = history.replaceState
		
		history.pushState = function(...args) {
			originalPushState.apply(history, args)
			setTimeout(sendPageState, 100)
		}
		
		history.replaceState = function(...args) {
			originalReplaceState.apply(history, args)
			setTimeout(sendPageState, 100)
		}
		
		window.addEventListener('popstate', sendPageState)
		
		return () => {
			observer.disconnect()
			history.pushState = originalPushState
			history.replaceState = originalReplaceState
			window.removeEventListener('popstate', sendPageState)
		}
	}, [connecting]) // Re-run when connection status changes

	const initializeSession = async () => {
		if (socketRef.current) return true

		try {
			setConnecting(true)
			console.log('[AgentDock] Initializing session...')

			// Create audio queue
			audioQueueRef.current = createAudioQueue(
				() => {
					console.log('[AgentDock] Audio playback started')
					setIsSpeaking(true)
					setInterimText('')
					dropIncomingRef.current = false
					recognitionRef.current?.stop()
				},
				() => {
					console.log('[AgentDock] Audio playback ended')
					setIsSpeaking(false)
					if (recognitionRef.current && !recognitionRef.current.isActive()) {
						recognitionRef.current.start()
					}
				}
			)

			// Connect WebSocket
			socketRef.current = connectVoiceSocket({
				onMessage: (msg) => {
					if (msg.type === 'text') {
						// Live transcript from agent
						setTranscript((prev) => {
							const last = prev[prev.length - 1]
							if (last && last.startsWith('Assistant: ')) {
								return [...prev.slice(0, -1), last + msg.content]
							} else {
								return [...prev, `Assistant: ${msg.content}`]
							}
						})
					} else if (msg.type === 'audio_chunk') {
						if (!dropIncomingRef.current) {
							audioQueueRef.current?.enqueue(msg.data)
						}
					} else if (msg.type === 'tool_call') {
						// Execute tool and send result back
						console.log('[AgentDock] Executing tool:', msg.id, msg.tool, msg.args)
						const result = executeActions([{ id: msg.id, tool: msg.tool, args: msg.args }])
						
						// Send tool result back to server
						Promise.resolve(result).then((res) => {
							socketRef.current?.send({
								type: 'tool_result',
								id: msg.id,
								result: res || { success: true, message: 'Tool executed' }
							})
						})
					} else if (msg.type === 'speaking_started') {
						setIsSpeaking(true)
					} else if (msg.type === 'speaking_ended') {
						setIsSpeaking(false)
						dropIncomingRef.current = false
					} else if (msg.type === 'error') {
						console.error('[AgentDock] Server error:', msg.message)
						setTranscript((prev) => [...prev, `Error: ${msg.message}`])
					}
				},
				onOpen: () => {
					console.log('[AgentDock] WebSocket connected')
				},
				onClose: () => {
					console.warn('[AgentDock] WebSocket closed unexpectedly')
					setTranscript((prev) => [...prev, 'Connection lost. Please restart voice.'])
					// Mark as disconnected but don't auto-stop recognition
					socketRef.current = null
				},
				onError: (error) => {
					console.error('[AgentDock] WebSocket error:', error)
				}
			})

			// Wait a bit for WebSocket to connect
			await new Promise((resolve) => setTimeout(resolve, 500))
			return true
		} catch (e: any) {
			console.error('[AgentDock] Failed to init:', e)
			setTranscript((prev) => [...prev, `Error: ${e.message}`])
			return false
		} finally {
			setConnecting(false)
		}
	}

	const start = async () => {
		const success = await initializeSession()
		if (!success) return

		try {
			// Start speech recognition - forcing Arabic language
			const lang = 'ar-SA'
			recognitionRef.current = createSpeechRecognition({
				lang,
				continuous: true,
				interimResults: true,
				onResult: (text, isFinal) => {
					if (isSpeakingRef.current) {
						return
					}
					if (isFinal) {
						console.log('[AgentDock] Final transcript:', text)
						setTranscript((prev) => [...prev, `You: ${text}`])
						setInterimText('')
						dropIncomingRef.current = false
						// Send to server
						socketRef.current?.send({
							type: 'transcript',
							text,
							isFinal: true,
							lang
						})
					} else {
						setInterimText(text)
					}
				},
				onStart: () => {
					setIsListening(true)
					console.log('[AgentDock] Speech recognition started')
				},
				onEnd: () => {
					setIsListening(false)
					console.log('[AgentDock] Speech recognition ended')
				},
				onError: (error) => {
					console.error('[AgentDock] Speech recognition error:', error)
				}
			})

			recognitionRef.current.start()
			console.log('[AgentDock] Voice session started')
		} catch (e: any) {
			console.error('[AgentDock] Failed to start recognition:', e)
			setTranscript((prev) => [...prev, `Error: ${e.message}`])
		}
	}

	const stop = () => {
		console.log('[AgentDock] Stopping voice session')
		recognitionRef.current?.stop()
		recognitionRef.current = null
		socketRef.current?.close()
		socketRef.current = null
		audioQueueRef.current?.clear()
		audioQueueRef.current = null
		setIsListening(false)
		setIsSpeaking(false)
		setInterimText('')
	}

	const interrupt = () => {
		console.log('[AgentDock] Interrupting assistant')
		dropIncomingRef.current = true
		audioQueueRef.current?.clear()
		socketRef.current?.send({ type: 'interrupt' })
		setIsSpeaking(false)
	}

	const handleSend = async () => {
		if (!textInput.trim()) return
		
		// Ensure session is initialized
		const success = await initializeSession()
		if (!success) return

		// Wait for socket to be OPEN
		if (socketRef.current && socketRef.current.readyState !== WebSocket.OPEN) {
			console.log('[AgentDock] Waiting for socket to open...')
			let attempts = 0
			while (socketRef.current.readyState !== WebSocket.OPEN && attempts < 10) {
				await new Promise(r => setTimeout(r, 200))
				attempts++
			}
		}

		const text = textInput
		setTextInput('')
		setTranscript(prev => [...prev, `You: ${text}`])
		
		const lang = 'ar-SA'
		socketRef.current?.send({
			type: 'transcript',
			text,
			isFinal: true,
			lang
		})
	}

	return (
		<div className={`fixed bottom-4 z-50 left-4`}>
			{open ? (
				<div className="w-[380px] bg-white border rounded-2xl shadow-lg p-4 flex flex-col max-h-[80vh]">
					<div className="flex items-center justify-between mb-3">
						<h3 className="font-semibold text-lg">Voice Assistant</h3>
						<button className="p-2 hover:bg-gray-100 rounded" onClick={() => setOpen(false)}>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="space-y-3 flex-1 flex flex-col min-h-0">
						{/* Control buttons */}
						<div className="flex gap-2 shrink-0">
							{!isListening ? (
								<button
									className="flex-1 bg-[#1B8354] text-white rounded-lg px-4 py-3 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
									onClick={start}
									disabled={connecting || isListening}
								>
									<Mic className="w-5 h-5" />
									{connecting ? 'Connecting…' : 'Start Voice'}
								</button>
							) : (
								<>
									<button
										className="flex-1 bg-red-500 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2"
										onClick={stop}
									>
										<MicOff className="w-5 h-5" />
										Stop
									</button>
									{isSpeaking && (
										<button
											className="bg-orange-500 text-white rounded-lg px-4 py-3 font-medium flex items-center justify-center gap-2"
											onClick={interrupt}
										>
											<Volume2 className="w-5 h-5" />
											Interrupt
										</button>
									)}
								</>
							)}
						</div>

						{/* Status indicators */}
						<div className="flex items-center gap-3 text-sm shrink-0">
							<div className="flex items-center gap-1">
								<div
									className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}
								/>
								<span className="text-gray-600">
									{isListening ? 'Listening' : 'Not listening'}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<div
									className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}
								/>
								<span className="text-gray-600">
									{isSpeaking ? 'Speaking' : 'Silent'}
								</span>
							</div>
						</div>

						{/* Interim text */}
						{interimText && (
							<div className="bg-gray-50 rounded p-2 text-sm text-gray-500 italic shrink-0">
								{interimText}...
							</div>
						)}

						{/* Transcript */}
						<div className="flex-1 overflow-y-auto space-y-2 border rounded-lg p-3 bg-gray-50 min-h-[200px]">
							{transcript.length === 0 ? (
								<p className="text-gray-400 text-sm text-center py-4">
									Click "Start Voice" or type below to begin
								</p>
							) : (
								transcript.map((line, i) => (
									<div
										key={i}
										className={`text-sm ${
											line.startsWith('You:')
												? 'text-gray-700'
												: line.startsWith('Assistant:')
													? 'text-blue-700'
													: 'text-red-600'
										}`}
									>
										{line}
									</div>
								))
							)}
						</div>

						{/* Text Input */}
						<div className="flex gap-2 shrink-0">
							<input 
								type="text" 
								value={textInput}
								onChange={(e) => setTextInput(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && handleSend()}
								placeholder="Type a message..."
								className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
								disabled={connecting}
							/>
							<button 
								onClick={handleSend}
								disabled={!textInput.trim() || connecting}
								className="bg-green-600 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-green-700"
							>
								<Send className="w-5 h-5" />
							</button>
						</div>

						{/* Help text */}
						<p className="text-xs text-gray-500 text-center shrink-0">
							{isListening
								? 'Speak naturally. I will respond when you pause.'
								: 'Try: "How can I submit to Zakat service?"'}
						</p>
					</div>
				</div>
			) : (
				<button
					className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1B8354] text-white shadow-lg hover:bg-[#156b45] transition-colors"
					onClick={() => setOpen(true)}
					title="Open voice assistant"
				>
					<Mic className="w-7 h-7" />
				</button>
			)}
		</div>
	)
}
