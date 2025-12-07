// Web Speech API wrapper for continuous speech recognition
// Supports Arabic and English with auto-restart on errors

export type SpeechRecognitionConfig = {
	lang: 'ar-SA' | 'en-US'
	continuous?: boolean
	interimResults?: boolean
	onResult: (transcript: string, isFinal: boolean) => void
	onError?: (error: string) => void
	onStart?: () => void
	onEnd?: () => void
}

export type SpeechRecognitionController = {
	start: () => void
	stop: () => void
	isActive: () => boolean
}

export function createSpeechRecognition(
	config: SpeechRecognitionConfig
): SpeechRecognitionController {
	const SpeechRecognition =
		(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

	if (!SpeechRecognition) {
		throw new Error('Web Speech API not supported in this browser')
	}

	const recognition = new SpeechRecognition()
	// Force Arabic language always
	recognition.lang = 'ar-SA'
	recognition.continuous = config.continuous ?? true
	recognition.interimResults = config.interimResults ?? true
	recognition.maxAlternatives = 1

	let isActive = false
	let shouldRestart = false

	recognition.onstart = () => {
		console.log('[SpeechRecognition] Started, lang:', config.lang)
		isActive = true
		config.onStart?.()
	}

	recognition.onresult = (event: any) => {
		const results = event.results
		for (let i = event.resultIndex; i < results.length; i++) {
			const result = results[i]
			const transcript = result[0].transcript
			const isFinal = result.isFinal
			console.log(
				`[SpeechRecognition] ${isFinal ? 'Final' : 'Interim'}:`,
				transcript
			)
			config.onResult(transcript, isFinal)
		}
	}

	recognition.onerror = (event: any) => {
		console.error('[SpeechRecognition] Error:', event.error)
		config.onError?.(event.error)
		// Don't auto-restart on no-speech (it's normal), just let onend handle it
		if (event.error === 'aborted' || event.error === 'network') {
			shouldRestart = false
		}
	}

	recognition.onend = () => {
		console.log('[SpeechRecognition] Ended')
		isActive = false
		config.onEnd?.()
		// Auto-restart if continuous mode and not explicitly stopped
		if (shouldRestart && config.continuous) {
			setTimeout(() => {
				if (shouldRestart) {
					try {
						recognition.start()
						console.log('[SpeechRecognition] Auto-restarted')
					} catch (e) {
						console.warn('[SpeechRecognition] Failed to restart:', e)
					}
				}
			}, 100)
		}
	}

	return {
		start: () => {
			shouldRestart = true
			try {
				recognition.start()
			} catch (e: any) {
				if (e.message?.includes('already started')) {
					console.warn('[SpeechRecognition] Already running')
				} else {
					throw e
				}
			}
		},
		stop: () => {
			shouldRestart = false
			try {
				recognition.stop()
			} catch (e) {
				console.warn('[SpeechRecognition] Stop failed:', e)
			}
		},
		isActive: () => isActive
	}
}

