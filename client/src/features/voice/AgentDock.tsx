import React from 'react'
import { Mic, MicOff, X, Volume2, Send } from 'lucide-react'
import { createSpeechRecognition, SpeechRecognitionController } from './speechRecognition'
import { connectVoiceSocket, VoiceSocketController } from './voiceSocket'
import { createAudioQueue, AudioQueueController } from './audioQueue'
import { executeActions } from '../agent/execute'

const DOCK_STATE_KEY = 'voice.dock.state'
const ENV_SPEECH_LANG = String(import.meta.env.VITE_VOICE_INPUT_LANG || '').trim().toLowerCase()

function resolveSpeechLang(pathname?: string): 'ar-SA' | 'en-US' {
	const normalizedPath = (pathname || '').toLowerCase()
	if (normalizedPath.startsWith('/saso')) return 'ar-SA'
	if (ENV_SPEECH_LANG === 'ar' || ENV_SPEECH_LANG === 'ar-sa') return 'ar-SA'
	if (ENV_SPEECH_LANG === 'en' || ENV_SPEECH_LANG === 'en-us') return 'en-US'
	if (typeof window !== 'undefined' && window.navigator.language?.toLowerCase().startsWith('ar')) {
		return 'ar-SA'
	}
	return 'en-US'
}

function resolveAssistantHint(pathname: string, speechLang: 'ar-SA' | 'en-US') {
	const normalizedPath = pathname.toLowerCase()
	const micLanguage = speechLang === 'ar-SA' ? 'Arabic' : 'English'

	if (normalizedPath.startsWith('/baptism')) {
		return `Try asking to plan a guided visit or book a baptism renewal. Mic language: ${micLanguage}.`
	}

	if (
		normalizedPath.startsWith('/bahraincredit') ||
		normalizedPath.startsWith('/tamkeenbahrain')
	) {
		return `Try asking about loans or IMTIAZ cards. Mic language: ${micLanguage}.`
	}

	if (normalizedPath.startsWith('/eshop')) {
		return `Try asking to compare products or checkout. Mic language: ${micLanguage}.`
	}

	return `Try asking for help with this page. Mic language: ${micLanguage}.`
}

type PersistedDockState = {
	transcript: string[]
	sessionId: string
	hasActiveSession: boolean
}

function createSessionId() {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID()
	}
	return `voice-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function readPersistedDockState(): PersistedDockState {
	if (typeof window === 'undefined') {
		return {
			transcript: [],
			sessionId: createSessionId(),
			hasActiveSession: false,
		}
	}

	try {
		const raw = window.sessionStorage.getItem(DOCK_STATE_KEY)
		if (!raw) {
			return {
				transcript: [],
				sessionId: createSessionId(),
				hasActiveSession: false,
			}
		}
		const parsed = JSON.parse(raw)
		return {
			transcript: Array.isArray(parsed.transcript) ? parsed.transcript.filter((line: unknown) => typeof line === 'string') : [],
			sessionId: typeof parsed.sessionId === 'string' && parsed.sessionId.length > 0 ? parsed.sessionId : createSessionId(),
			hasActiveSession: Boolean(parsed.hasActiveSession),
		}
	} catch {
		return {
			transcript: [],
			sessionId: createSessionId(),
			hasActiveSession: false,
		}
	}
}

export function AgentDock() {
	const persistedState = React.useMemo(() => readPersistedDockState(), [])
	const [open, setOpen] = React.useState(false)
	const [connecting, setConnecting] = React.useState(false)
	const [isListening, setIsListening] = React.useState(false)
	const [isSpeaking, setIsSpeaking] = React.useState(false)
	const [textInput, setTextInput] = React.useState('')
	const recognitionRef = React.useRef<SpeechRecognitionController | null>(null)
	const socketRef = React.useRef<VoiceSocketController | null>(null)
	const audioQueueRef = React.useRef<AudioQueueController | null>(null)
	const [transcript, setTranscript] = React.useState<string[]>(persistedState.transcript)
	const [interimText, setInterimText] = React.useState('')
	const [hasActiveSession, setHasActiveSession] = React.useState(persistedState.hasActiveSession)
	const isSpeakingRef = React.useRef(false)
	const dropIncomingRef = React.useRef(false)
	const sessionIdRef = React.useRef(persistedState.sessionId)
	const unloadingRef = React.useRef(false)
	const speechLang = React.useMemo(
		() => resolveSpeechLang(typeof window !== 'undefined' ? window.location.pathname : ''),
		[]
	)
	const assistantHint = React.useMemo(
		() => resolveAssistantHint(typeof window !== 'undefined' ? window.location.pathname : '', speechLang),
		[speechLang]
	)

	const getCurrentPageContext = React.useCallback(() => ({
		url: window.location.pathname,
		title: document.title
	}), [])

	React.useEffect(() => {
		isSpeakingRef.current = isSpeaking
	}, [isSpeaking])

	React.useEffect(() => {
		window.sessionStorage.setItem(
			DOCK_STATE_KEY,
			JSON.stringify({
				transcript,
				sessionId: sessionIdRef.current,
				hasActiveSession,
			} satisfies PersistedDockState)
		)
	}, [transcript, hasActiveSession])

	React.useEffect(() => {
		if (!persistedState.hasActiveSession) return
		void initializeSession()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		const markUnloading = () => {
			unloadingRef.current = true
		}
		window.addEventListener('beforeunload', markUnloading)
		window.addEventListener('pagehide', markUnloading)
		return () => {
			window.removeEventListener('beforeunload', markUnloading)
			window.removeEventListener('pagehide', markUnloading)
		}
	}, [])
	
	// Send page state updates to server
	React.useEffect(() => {
		if (!socketRef.current) return
		
		const sendPageState = () => {
			socketRef.current?.send({
				type: 'page_state',
				...getCurrentPageContext()
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
				onOpen: () => {
					console.log('[AgentDock] WebSocket connected')
					socketRef.current?.send({
						type: 'resume_session',
						sessionId: sessionIdRef.current,
						...getCurrentPageContext(),
					})
					// Send page state immediately on connection
					socketRef.current?.send({
						type: 'page_state',
						...getCurrentPageContext()
					})
					console.log('[AgentDock] Sent initial page state:', window.location.pathname)
				},
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
				onClose: () => {
					console.warn('[AgentDock] WebSocket closed unexpectedly')
					if (!unloadingRef.current) {
						setTranscript((prev) => [...prev, 'Connection lost. Please restart voice.'])
					}
					// Mark as disconnected but don't auto-stop recognition
					socketRef.current = null
				},
				onError: (error) => {
					console.error('[AgentDock] WebSocket error:', error)
				}
			})

			// Wait a bit for WebSocket to connect
			await new Promise((resolve) => setTimeout(resolve, 500))
			setHasActiveSession(true)
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
		setHasActiveSession(true)

		try {
			const lang = speechLang
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
							lang,
							...getCurrentPageContext()
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
		setHasActiveSession(false)
		window.sessionStorage.setItem(
			DOCK_STATE_KEY,
			JSON.stringify({
				transcript,
				sessionId: sessionIdRef.current,
				hasActiveSession: false,
			} satisfies PersistedDockState)
		)
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
		setHasActiveSession(true)

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
		
		const lang = speechLang
		socketRef.current?.send({
			type: 'transcript',
			text,
			isFinal: true,
			lang,
			...getCurrentPageContext()
		})
	}

	return (
		<div
			className="fixed bottom-3 left-3 z-40 sm:bottom-4 sm:left-4"
			style={{
				right: 'auto',
			}}
		>
			{open ? (
				<div className="flex max-h-[58vh] w-[300px] max-w-[calc(100vw-1.5rem)] flex-col rounded-2xl border bg-white p-3 shadow-xl sm:w-[320px]">
					<div className="mb-2 flex items-center justify-between">
						<h3 className="text-base font-semibold">Voice Assistant</h3>
						<button className="rounded p-1.5 hover:bg-gray-100" onClick={() => setOpen(false)}>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="flex min-h-0 flex-1 flex-col space-y-2.5">
						{/* Control buttons */}
						<div className="flex gap-2 shrink-0">
							{!isListening ? (
								<button
									className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1B8354] px-3 py-2.5 text-sm font-medium text-white disabled:opacity-50"
									onClick={start}
									disabled={connecting || isListening}
								>
									<Mic className="w-5 h-5" />
									{connecting ? 'Connecting…' : 'Start Voice'}
								</button>
							) : (
								<>
									<button
										className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2.5 text-sm font-medium text-white"
										onClick={stop}
									>
										<MicOff className="w-5 h-5" />
										Stop
									</button>
									{isSpeaking && (
										<button
											className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-medium text-white"
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
						<div className="flex shrink-0 items-center gap-3 text-xs">
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
							<div className="shrink-0 rounded bg-gray-50 p-2 text-sm italic text-gray-500">
								{interimText}...
							</div>
						)}

						{/* Transcript */}
						<div className="min-h-[150px] flex-1 space-y-2 overflow-y-auto rounded-lg border bg-gray-50 p-2.5">
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
								className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
								disabled={connecting}
							/>
							<button 
								onClick={handleSend}
								disabled={!textInput.trim() || connecting}
								className="rounded-lg bg-green-600 p-2 text-white disabled:opacity-50 hover:bg-green-700"
							>
								<Send className="w-5 h-5" />
							</button>
						</div>

						{/* Help text */}
						<p className="shrink-0 text-center text-[11px] text-gray-500">
							{isListening
								? speechLang === 'ar-SA'
									? 'Speak in Arabic naturally. I will respond when you pause.'
									: 'Speak in English naturally. I will respond when you pause.'
								: assistantHint}
						</p>
					</div>
				</div>
			) : (
				<button
					className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1B8354] text-white shadow-lg transition-colors hover:bg-[#156b45] sm:h-13 sm:w-13"
					onClick={() => setOpen(true)}
					title="Open voice assistant"
				>
					<Mic className="h-6 w-6" />
					{hasActiveSession ? (
						<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d12b8a] px-1 text-[10px] font-bold text-white">
							{Math.min(transcript.length, 9)}
						</span>
					) : null}
				</button>
			)}
		</div>
	)
}
