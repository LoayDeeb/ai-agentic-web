// Audio playback queue for streaming TTS chunks with proper buffering

export type AudioQueueController = {
	enqueue: (base64Data: string) => void
	clear: () => void
	isPlaying: () => boolean
}

export function createAudioQueue(
	onPlaybackStart?: () => void,
	onPlaybackEnd?: () => void
): AudioQueueController {
	const audioContext = new AudioContext()
	const decodedQueue: AudioBuffer[] = []
	const scheduled: AudioBufferSourceNode[] = []
	const gain = audioContext.createGain()
	gain.connect(audioContext.destination)

	let playing = false
	let nextStartTime = 0
	let bufferedSec = 0

	const PREROLL_SEC = 0.5
	const SAFETY_LEAD_SEC = 0.05

	// Ensure decode operations run in sequence
	let decodeChain: Promise<void> = Promise.resolve()

	function base64ToArrayBuffer(b64: string): Uint8Array {
		const binary = atob(b64)
		const len = binary.length
		const bytes = new Uint8Array(len)
		for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
		return bytes
	}

	async function decodeAndQueue(data: Uint8Array) {
		try {
			// data represents a complete MP3 file (one sentence/utterance)
			const bufferToDecode = data.buffer.slice(
				data.byteOffset,
				data.byteOffset + data.byteLength
			)

			const audioBuffer = await audioContext.decodeAudioData(bufferToDecode)

			decodedQueue.push(audioBuffer)
			bufferedSec += audioBuffer.duration

			if (playing) {
				scheduleAvailable()
			} else if (bufferedSec >= PREROLL_SEC) {
				startPlayback()
			}
		} catch (e) {
			console.error('[AudioQueue] decodeAudioData failed:', e)
			// On failure, drop this chunk; don't block the whole stream.
		}
	}

	function startPlayback() {
		if (playing) return
		
		// Ensure AudioContext is running (fix for autoplay policy)
		if (audioContext.state === 'suspended') {
			audioContext.resume()
		}

		playing = true
		onPlaybackStart?.()
		nextStartTime = Math.max(audioContext.currentTime + SAFETY_LEAD_SEC, nextStartTime || 0)
		scheduleAvailable()
	}

	function scheduleAvailable() {
		while (decodedQueue.length > 0) {
			const buf = decodedQueue.shift()!
			const src = audioContext.createBufferSource()
			src.buffer = buf
			src.connect(gain)

			if (nextStartTime === 0) {
				nextStartTime = audioContext.currentTime + SAFETY_LEAD_SEC
			}

			src.start(nextStartTime)
			nextStartTime += buf.duration
			bufferedSec -= buf.duration
			scheduled.push(src)

			src.onended = () => {
				scheduled.shift()
				if (scheduled.length === 0 && decodedQueue.length === 0) {
					playing = false
					nextStartTime = 0
					onPlaybackEnd?.()
					console.log('[AudioQueue] Playback completed')
				}
			}
		}
	}

	return {
		enqueue: (base64Data: string) => {
			try {
				const bytes = base64ToArrayBuffer(base64Data)
				// Chain decodes so they run strictly in arrival order
				decodeChain = decodeChain.then(() => decodeAndQueue(bytes))
			} catch (e) {
				console.error('[AudioQueue] enqueue failed:', e)
			}
		},
		clear: () => {
			console.log('[AudioQueue] Clearing queue')
			for (const s of scheduled) {
				try {
					s.stop()
				} catch {}
			}
			scheduled.length = 0
			decodedQueue.length = 0
			bufferedSec = 0
			playing = false
			nextStartTime = 0
			onPlaybackEnd?.()
		},
		isPlaying: () => playing
	}
}
