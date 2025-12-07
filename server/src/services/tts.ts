import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import { logger } from '../logger.js'

const client = new ElevenLabsClient({
	apiKey: process.env.ELEVENLABS_API_KEY || ''
})

export type TTSConfig = {
	voiceId?: string
	modelId?: string
}

/**
 * Stream text to ElevenLabs TTS and yield audio chunks
 * Per https://elevenlabs.io/docs/api-reference/streaming
 */
export async function* streamTTS(
	text: string,
	config: TTSConfig = {}
): AsyncGenerator<Buffer> {
	const voiceId = config.voiceId || process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'
	const modelId = config.modelId || process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2'

	try {
		logger.info({ text, voiceId, modelId }, 'Streaming TTS request')

		const audioStream = await client.textToSpeech.stream(voiceId, {
			text,
			modelId: modelId,
			outputFormat: 'mp3_44100_128'
		})

		// Collect all chunks into a single contiguous MP3 buffer
		const parts: Buffer[] = []

		for await (const chunk of audioStream) {
			if (chunk) {
				parts.push(Buffer.from(chunk))
			}
		}

		if (parts.length > 0) {
			const full = Buffer.concat(parts)
			yield full
		}

		logger.info('TTS stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'TTS streaming failed')
		throw error
	}
}

