// WebSocket client for voice communication with server

export type VoiceMessage =
	| { type: 'transcript'; text: string; isFinal: boolean; lang: string }
	| { type: 'interrupt' }
	| { type: 'tool_result'; id: string; result: any }
	| { type: 'page_state'; url: string; title?: string; context?: any }

export type ServerMessage =
	| { type: 'text'; content: string }
	| { type: 'audio_chunk'; data: string }
	| { type: 'tool_call'; id: string; tool: string; args: any }
	| { type: 'error'; message: string }
	| { type: 'speaking_started' }
	| { type: 'speaking_ended' }

export type VoiceSocketConfig = {
	onMessage: (msg: ServerMessage) => void
	onOpen?: () => void
	onClose?: () => void
	onError?: (error: Event) => void
}

export type VoiceSocketController = {
	send: (msg: VoiceMessage) => void
	close: () => void
	isConnected: () => boolean
}

export function connectVoiceSocket(
	config: VoiceSocketConfig
): VoiceSocketController {
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
	const host = window.location.hostname
	const port = import.meta.env.DEV ? '4000' : window.location.port
	const url = `${protocol}//${host}:${port}/voice`

	console.log('[VoiceSocket] Connecting to:', url)
	const ws = new WebSocket(url)

	ws.onopen = () => {
		console.log('[VoiceSocket] Connected')
		config.onOpen?.()
	}

	ws.onmessage = (event) => {
		try {
			const msg: ServerMessage = JSON.parse(event.data)
			config.onMessage(msg)
		} catch (e) {
			console.error('[VoiceSocket] Failed to parse message:', e)
		}
	}

	ws.onerror = (error) => {
		console.error('[VoiceSocket] Error:', error)
		config.onError?.(error)
	}

	ws.onclose = () => {
		console.log('[VoiceSocket] Closed')
		config.onClose?.()
	}

	return {
		send: (msg: VoiceMessage) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(msg))
			} else {
				console.warn('[VoiceSocket] Not connected, cannot send:', msg)
			}
		},
		close: () => {
			ws.close()
		},
		isConnected: () => ws.readyState === WebSocket.OPEN
	}
}

