import OpenAI from 'openai'
import { logger } from '../logger.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || ''
})

export type AgentMessage =
	| { role: 'system'; content: string }
	| { role: 'user'; content: string }
	| { role: 'assistant'; content: string | null; tool_calls?: any[] }
	| { role: 'tool'; content: string; tool_call_id: string }

// Tool definitions for Chat Completions API
const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'navigateTo',
			description: 'Navigate the UI to a specific route path',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description: 'The route path to navigate to (e.g., "/sdb", "/sdb/service", "/sdb/submit")'
					}
				},
				required: ['path']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'openSDBService',
			description: 'Open the SDB (Saudi Development Bank) service detail page',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		}
	},
	{
		type: 'function', function: {
			name: 'highlight',
			description: 'Highlight a UI element to draw user attention',
			parameters: {
				type: 'object',
				properties: {
					selector: {
						type: 'string',
						description: 'CSS selector for the element to highlight'
					},
					seconds: {
						type: 'number',
						description: 'How long to highlight (default: 3)'
					}
				},
				required: ['selector']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'setLanguage',
			description: 'Switch the application language',
			parameters: {
				type: 'object',
				properties: {
					lang: {
						type: 'string',
						enum: ['ar', 'en'],
						description: 'Language code: ar for Arabic, en for English'
					}
				},
				required: ['lang']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'scrollToTab',
			description: 'Scroll to and activate a specific tab on service detail page (Steps, Eligibility, or Documents)',
			parameters: {
				type: 'object',
				properties: {
					tabId: {
						type: 'string',
						enum: ['steps', 'eligibility', 'documents', 'product', 'terms', 'requirements'],
						description: 'The tab to activate'
					}
				},
				required: ['tabId']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'playVideo',
			description: 'Auto-play the tutorial video on the service detail page (if available)',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'checkAuthStatus',
			description: 'Check if the user is currently logged in',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'getUserInfo',
			description: 'Get the logged-in user information including username and TIN if available',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'fillFormField',
			description: 'Fill a specific form field with a value',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The form field name (applicantName, applicantNationalId, applicantPhone, familyMembers, monthlyIncome, financingAmount, financingPurpose, employmentType, bankAccount, termsAccepted)'
					},
					value: {
						type: 'string',
						description: 'The value to fill in the field'
					}
				},
				required: ['fieldName', 'value']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'goToFormStep',
			description: 'Navigate to a specific step in the multi-step SDB financing application form (1-3)',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						description: 'Step number (1=Personal Info, 2=Financial Details, 3=Review)',
						minimum: 1,
						maximum: 3
					}
				},
				required: ['step']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'getFormData',
			description: 'Get the current form data to see what fields are filled and what is missing',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'highlightFormField',
			description: 'Highlight a specific form field to draw user attention',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The field name to highlight'
					},
					duration: {
						type: 'number',
						description: 'How many seconds to highlight (default: 3)'
					}
				},
				required: ['fieldName']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'submitForm',
			description: 'Submit the current form (only works if all required fields are filled)',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'clickNext',
			description: 'Navigate to the next step in the form',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		}
	}
]

const systemPrompt = `You are SDB AI - an advanced, proactive voice assistant for the Saudi Development Bank (بنك التنمية الاجتماعية). You have real-time control over the interface and can see exactly what the user sees.

YOUR PERSONALITY:
- Futuristic and intelligent - you anticipate needs before being asked
- Confident and helpful - you take initiative to guide users
- Conversational and natural - speak like a helpful expert, not a robot
- Precise and efficient - you get things done quickly and concisely

YOUR SUPERPOWERS:
- You can navigate the UI, play videos, highlight elements, and fill forms
- You receive real-time feedback when tools execute - you KNOW when actions succeed or fail
- You can see the current page and context
- You understand both Arabic and English naturally

YOUR MISSION:
- Guide users seamlessly through SDB financing services and programs
- Proactively suggest next steps before being asked
- Make the financing application process feel effortless
- Provide instant, accurate help

Available services you can help with:
- Family Financing (تمويل الأسرة)
- Asset Financing (تمويل الأصول)
- Small Business Financing (تمويل المنشآت الصغيرة)
- Productive Families Financing (تمويل الأسر المنتجة)

FAMILY FINANCING KNOWLEDGE BASE:
- Financing Amount: Starts from 18,000 SAR up to 100,000 SAR (if no previous social financing used).
- Repayment Period: Up to 4 years.
- Repayment Frequency: Monthly.
- Fees: No administrative fees.
- Exemption: In case of death (God forbid).
- Conditions:
  - Applicant must be a Saudi citizen.
  - Age between 18 and 60 years.
  - Must be from a low-income family.
  - No defaulted debts.
  - Submission of all required documents.

CRITICAL RULES FOR SMOOTH, NATURAL UX:

1. **BE CONCISE** - Keep answers short (1-2 sentences maximum).
2. **AFTER EVERY TOOL EXECUTION, YOU MUST: Explain what the user is now seeing.**
3. **NEVER GO SILENT AFTER TOOLS** - Briefly acknowledge completion.
4. **WEAVE TOOLS INTO CONVERSATION** - Don't announce "I am navigating". Just say "Taking you there".
5. **NO LONG EXPLANATIONS** - Do not describe what happened in the background. Just show the result.
6. **SOUND NATURAL** - Use conversational language: "Perfect!", "Done!", "Ready?"
7. Match the user's language (Arabic or English).
8. **NUMBERS AS TEXT**: When speaking Arabic, ALWAYS output numbers as text words (e.g., say "اثنين" instead of "2", "خمسة" instead of "5"). This is critical for the TTS quality.
9. **STRICT FORM PROGRESSION**: Do NOT proceed to the next step (clickNext) until ALL required fields for the current step are filled. Verify gathered data before moving on.

SCENARIO: SDB SERVICES
If the user asks about SDB (بنك التنمية الاجتماعية) or financing (تمويل):
1. Navigate to "/sdb".
2. Say: "Taking you to SDB financing services."

SCENARIO: SDB SERVICE DETAIL
If the user asks about specific financing programs like "Family Financing" (تمويل الأسرة) or "Productive Families" (الأسر المنتجة):
1. Navigate to "/sdb/service".
2. Say: "Here are the details for Family Financing."

SCENARIO: SHOW CONDITIONS
If the user asks about conditions (شروط) or requirements (متطلبات):
1. Ensure we are on "/sdb/service". If not, navigate there.
2. Call 'scrollToTab' with tabId: "terms" (for conditions) or "requirements" (for requirements).
3. Say: "Here are the conditions for the financing program."

SCENARIO: SDB FINANCING APPLICATION
If user wants to apply for SDB financing:
1. Navigate to "/sdb/submit".
2. Ask for: Applicant Name (اسم المتقدم), National ID (رقم الهوية), and Phone (رقم الجوال).
3. WAIT for response.
4. Call 'fillFormField' for "applicantName", "applicantNationalId", and "applicantPhone".
5. IF AND ONLY IF all Step 1 fields (Name, ID, Phone) are filled, Call 'clickNext' to proceed to step 2.
6. Ask for: Number of Family Members (عدد أفراد الأسرة), Monthly Income (الدخل الشهري), Financing Amount (مبلغ التمويل), Employment Type (نوع التوظيف), Purpose (الغرض), and Bank Account (الآيبان).
7. WAIT for response.
8. Call 'fillFormField' for "familyMembers", "monthlyIncome", "financingAmount", "employmentType", "financingPurpose", and "bankAccount".
9. IF AND ONLY IF all Step 2 fields are filled, Call 'clickNext' to proceed to step 3 (Review).
10. Ask user to check the terms and submit.
11. If confirmed, Call 'fillFormField' for "termsAccepted" (value: "true") and 'submitForm'.

CONVERSATION MEMORY:
- Remember the user's goal across turns
- Track what data you've collected
- Never repeat questions
- Confirm efficiently: "✓ Name saved. What's your monthly income?"

If user speaks Arabic, respond in Arabic with the same smooth, natural flow.

IMPORTANT: When speaking Arabic, you MUST use Saudi dialect (Slang/White accent).
- Use words like "أبشر", "هلا", "سم", "يا غالي", "وش", "كيف", "زين".
- Be friendly and welcoming like a Saudi local.
- Avoid formal MSA (Modern Standard Arabic) unless absolutely necessary for legal terms.`

/**
 * Stream agent response using OpenAI Chat Completions API
 */
export async function* streamAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const ENV_MODEL = (process.env.OPENAI_MODEL || '').trim()
		const MODEL = ENV_MODEL || 'gpt-4o'

		logger.info({ model: MODEL, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' }, 'Using OpenAI Chat Completions API')

		const stream = await openai.chat.completions.create({
			model: MODEL,
			messages: [{ role: 'system', content: systemPrompt }, ...messages],
			tools,
			stream: true
		})

		const partial: Record<number, { id?: string; name?: string; args: string; yielded?: boolean }> = {}

		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta

			// Text content
			if (delta?.content) {
				yield { type: 'text', content: delta.content }
			}

			// Tool calls
			if (delta?.tool_calls) {
				for (const tc of delta.tool_calls) {
					if (tc.index === undefined) continue
					const idx = tc.index
					const prev = partial[idx] || { id: undefined, name: '', args: '' }
					if (tc.id) prev.id = tc.id
					if (tc.function?.name) prev.name = tc.function.name // DO NOT concatenate
					if (tc.function?.arguments) prev.args += tc.function.arguments
					partial[idx] = prev

					// Try to parse as soon as a full JSON object is available
					if (!prev.yielded) {
						// Optimization: Only try parsing if we likely have a complete JSON object (ends with })
						// and args is long enough to be valid JSON
						if (prev.args.length > 2 && prev.args.trimEnd().endsWith('}')) {
							try {
								const parsed = JSON.parse(prev.args)
								if (prev.id && prev.name) {
									yield { type: 'tool_call', id: prev.id, tool: prev.name, args: parsed }
									prev.yielded = true
								}
							} catch {
								// Not complete yet
							}
						}
					}
				}
			}
		}

		// After stream ends, flush any not-yet-yielded tool calls
		for (const idx of Object.keys(partial)) {
			const p = partial[+idx]
			if (!p?.yielded && p?.id && p?.name) {
				try {
					const parsed = JSON.parse(p.args)
					yield { type: 'tool_call', id: p.id, tool: p.name, args: parsed }
				} catch (e: any) {
					logger.error({ e, tool: p.name, args: p.args }, 'Failed to parse final tool call arguments')
				}
			}
		}

		logger.info('Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'Chat Completions API streaming failed')
		throw error
	}
}
