import { Router } from 'express'

const router = Router()

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

const TOOL_SPECS = [
	{
		type: 'function',
		name: 'navigateTo',
		description: 'Navigate the UI to a specific route path',
		parameters: {
			type: 'object',
			properties: { path: { type: 'string' } },
			required: ['path']
		}
	},
	{
		type: 'function',
		name: 'openServiceBySlug',
		description: 'Open the service detail page by slug',
		parameters: {
			type: 'object',
			properties: { slug: { type: 'string' } },
			required: ['slug']
		}
	},
	{
		type: 'function',
		name: 'highlight',
		description: 'Highlight a UI element by CSS selector for a few seconds',
		parameters: {
			type: 'object',
			properties: {
				selector: { type: 'string' },
				seconds: { type: 'number' }
			},
			required: ['selector']
		}
	},
	{
		type: 'function',
		name: 'setLanguage',
		description: 'Switch app language to Arabic or English',
		parameters: {
			type: 'object',
			properties: { lang: { type: 'string', enum: ['ar', 'en'] } },
			required: ['lang']
		}
	}
]

router.post('/chat', async (req, res) => {
	try {
		const apiKey = process.env.OPENAI_API_KEY
		if (!apiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' })
		const { messages } = (req.body || {}) as { messages: ChatMessage[] }
		if (!messages?.length) return res.status(400).json({ error: 'messages required' })

		const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
		const system =
			`You are a voice-first assistant for a ZATCA services demo. ` +
			`When a user asks for a task (e.g., open a service page), prefer calling tools ` +
			`instead of describing steps. After navigation, give a one-sentence summary of what they can do on this page.`

		const response = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			} as any,
			body: JSON.stringify({
				model,
				// Responses API accepts flexible input; we pass a messages-like structure
				input: [
					{ role: 'system', content: system },
					...messages.map((m) => ({ role: m.role, content: m.content }))
				],
				tools: TOOL_SPECS,
				max_output_tokens: 300
			})
		})

		if (!response.ok) {
			const detail = await response.text()
			return res.status(502).json({ error: 'Upstream error', detail })
		}

		const data = await response.json()

		// Best-effort extraction of tool calls and text from Responses API shape
		const actions: Array<{ name: string; arguments: any }> = []
		let text = ''

		// Try multiple shapes safely
		try {
			const output = (data.output ?? []) as any[]
			for (const part of output) {
				const content = part?.content ?? []
				for (const c of content) {
					if (c?.type === 'output_text') {
						text += c?.text ?? ''
					}
					const toolCall = c?.tool_call
					if (toolCall?.type === 'function') {
						const fn = toolCall.function
						if (fn?.name) {
							actions.push({
								name: fn.name,
								arguments: safeJson(fn.arguments)
							})
						}
					}
				}
			}
		} catch {
			// Ignore parse errors; client will inspect raw
		}

		return res.json({ text, actions, raw: data })
	} catch (e: any) {
		return res.status(500).json({ error: 'agent_error', detail: String(e?.message || e) })
	}
})

function safeJson(arg: any) {
	if (arg == null) return {}
	if (typeof arg === 'object') return arg
	try {
		return JSON.parse(String(arg))
	} catch {
		return { value: String(arg) }
	}
}

export default router


