export type VadController = {
	stop: () => void
}

/**
 * Simple energy-based VAD that toggles MediaStream tracks' `enabled` property.
 * This avoids sending continuous silence while keeping latency very low.
 */
export function startSimpleVad(stream: MediaStream, opts?: {
	threshold?: number
	attackMs?: number
	releaseMs?: number
	intervalMs?: number
	onSpeakingChange?: (speaking: boolean) => void
}): VadController {
	const context = new AudioContext()
	const source = context.createMediaStreamSource(stream)
	const analyser = context.createAnalyser()
	analyser.fftSize = 512
	source.connect(analyser)

	const threshold = opts?.threshold ?? 0.01 // RMS
	const attackMs = opts?.attackMs ?? 80
	const releaseMs = opts?.releaseMs ?? 350
	const intervalMs = opts?.intervalMs ?? 30

	const data = new Float32Array(analyser.fftSize)
	let speaking = false
	let lastAbove = 0
	let lastBelow = 0

	const tracks = stream.getAudioTracks()

	const tick = () => {
		analyser.getFloatTimeDomainData(data)
		let rms = 0
		for (let i = 0; i < data.length; i++) rms += data[i] * data[i]
		rms = Math.sqrt(rms / data.length)

		const now = performance.now()
		if (rms >= threshold) {
			lastAbove = now
			if (!speaking && now - lastBelow > attackMs) {
				speaking = true
				tracks.forEach((t) => (t.enabled = true))
				opts?.onSpeakingChange?.(true)
			}
		} else {
			lastBelow = now
			if (speaking && now - lastAbove > releaseMs) {
				speaking = false
				tracks.forEach((t) => (t.enabled = false))
				opts?.onSpeakingChange?.(false)
			}
		}
	}

	// Start initially muted until speech detected
	tracks.forEach((t) => (t.enabled = false))

	const id = setInterval(tick, intervalMs)

	return {
		stop: () => {
			clearInterval(id)
			try {
				source.disconnect()
				analyser.disconnect()
			} catch {}
			if (context.state !== 'closed') context.close()
			// Ensure mic unmuted on stop so manual control can continue
			tracks.forEach((t) => (t.enabled = true))
		}
	}
}


