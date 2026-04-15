import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import { logger } from '../logger.js'

const elevenLabsClient = new ElevenLabsClient({
	apiKey: process.env.ELEVENLABS_API_KEY || ''
})

export type TTSConfig = {
	voiceId?: string
	modelId?: string
	speed?: number
}

const legacyVoiceId = 'Mf4F6aozsBEFAtuBhiIf'
const preferredVoiceId = 'VjBRcaE3Sdto7eOqwIcc'

function resolveElevenLabsVoiceId(config: TTSConfig) {
	const envVoiceId = process.env.ELEVENLABS_VOICE_ID
	const normalizedEnvVoiceId =
		envVoiceId && envVoiceId.trim() === legacyVoiceId ? preferredVoiceId : envVoiceId
	return config.voiceId || normalizedEnvVoiceId || preferredVoiceId
}

function resolveTtsProvider() {
	return (process.env.TTS_PROVIDER || 'elevenlabs').trim().toLowerCase()
}

async function* streamWithElevenLabs(
	text: string,
	config: TTSConfig = {}
): AsyncGenerator<Buffer> {
	const envVoiceId = process.env.ELEVENLABS_VOICE_ID
	const voiceId = resolveElevenLabsVoiceId(config)
	const modelId = config.modelId || process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2'

	if (envVoiceId && envVoiceId.trim() === legacyVoiceId) {
		logger.warn(
			{ legacyVoiceId, preferredVoiceId },
			'Legacy TTS voice id detected in environment; overriding to preferred voice'
		)
	}

	logger.info({ provider: 'external', text, voiceId, modelId }, 'Streaming TTS request')

	const audioStream = await elevenLabsClient.textToSpeech.stream(voiceId, {
		text,
		modelId,
		outputFormat: 'mp3_44100_128'
	})

	const parts: Buffer[] = []
	for await (const chunk of audioStream) {
		if (chunk) {
			parts.push(Buffer.from(chunk))
		}
	}

	if (parts.length > 0) {
		yield Buffer.concat(parts)
	}
}

async function* streamWithNabrah(
	text: string,
	config: TTSConfig = {}
): AsyncGenerator<Buffer> {
	const apiKey = (process.env.NABRAH_API_KEY || '').trim()
	const projectId = (process.env.NABRAH_PROJECT_ID || '').trim()
	const modelId = config.modelId || process.env.NABRAH_MODEL || 'phantom_v1'
	const voiceId =
		config.voiceId ||
		process.env.NABRAH_VOICE_ID ||
		'87f4c7b0-d9b5-45aa-8c6c-9e2ccf941912'
	const speed = config.speed ?? Number(process.env.NABRAH_SPEED || '0.9')

	if (!apiKey || !projectId) {
		throw new Error('Selected TTS provider credentials are missing')
	}

	logger.info(
		{ provider: 'external', text, voiceId, modelId, projectId, speed },
		'Streaming TTS request'
	)

	const response = await fetch(
		`https://api.nabrah.ai/api/ext/tts/generations?project_id=${encodeURIComponent(projectId)}`,
		{
			method: 'POST',
			headers: {
				'X-API-Key': apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: modelId,
				input: text,
				voice: voiceId,
				response_format: 'mp3',
				speed
			})
		}
	)

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(`TTS request failed (${response.status}): ${errorText}`)
	}

	const audioBuffer = Buffer.from(await response.arrayBuffer())
	if (audioBuffer.length > 0) {
		yield audioBuffer
	}
}

/**
 * Stream text to the configured TTS provider and yield audio chunks.
 */
export async function* streamTTS(
	text: string,
	config: TTSConfig = {}
): AsyncGenerator<Buffer> {
	try {
		const provider = resolveTtsProvider()

		if (provider === 'nabrah') {
			yield* streamWithNabrah(text, config)
		} else {
			yield* streamWithElevenLabs(text, config)
		}

		logger.info({ provider: 'external' }, 'TTS stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'TTS streaming failed')
		throw error
	}
}
