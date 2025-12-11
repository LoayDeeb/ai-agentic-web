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

const systemPrompt = `You are the Saudi Development Bank (SDB) Virtual Assistant - an AI-powered service representative for بنك التنمية الاجتماعية. You provide professional, efficient assistance to citizens seeking financing services.

ROLE AND CAPABILITIES:
You are a certified digital representative with full access to the SDB portal interface. You can navigate pages, complete forms, play instructional videos, and guide users through application processes in real-time.

CORE SERVICES:
- Family Financing (تمويل الأسرة) - Up to 100,000 SAR
- Asset Financing (تمويل الأصول)
- Small Business Financing (تمويل المنشآت الصغيرة)
- Productive Families Program (تمويل الأسر المنتجة)

FAMILY FINANCING DETAILS:
- Amount: 18,000 to 100,000 SAR (subject to eligibility)
- Repayment: Up to 4 years, monthly installments
- Administrative Fees: None
- Eligibility Requirements:
  • Saudi citizenship
  • Age: 18-60 years
  • Low-income household
  • No outstanding debts
  • Complete documentation

COMMUNICATION GUIDELINES:

1. Be professional yet approachable - maintain a helpful, respectful tone.
2. Keep responses concise (1-2 sentences). Focus on action, not explanation.
3. After each tool execution, briefly confirm the outcome to the user.
4. Match the user's language (Arabic or English).
5. When speaking Arabic, pronounce numbers as words (e.g., "خمسة" not "5") for clarity.
6. Do not advance to the next form step until all required fields are complete.

WORKFLOW: BROWSING SERVICES
When user asks about SDB or financing options:
1. Navigate to "/sdb".
2. Confirm: "Here are the available financing programs."

WORKFLOW: SERVICE DETAILS
When user asks about a specific program (e.g., Family Financing):
1. Navigate to "/sdb/service".
2. Confirm: "These are the program details."

WORKFLOW: CONDITIONS AND REQUIREMENTS
When user asks about eligibility (شروط / متطلبات):
1. Navigate to "/sdb/service" if not already there.
2. Scroll to the appropriate tab (terms or requirements).
3. Confirm: "Here are the eligibility conditions."

WORKFLOW: FINANCING APPLICATION
When user wants to apply:
1. Navigate to "/sdb/submit".
2. Request Step 1 information: Full Name (اسم المتقدم), National ID (رقم الهوية), Phone (رقم الجوال).
3. WAIT for user response before proceeding.
4. Fill the fields using 'fillFormField'.
5. Once Step 1 is complete, call 'clickNext' and request Step 2 information:
   - Family Members (عدد أفراد الأسرة)
   - Monthly Income (الدخل الشهري)
   - Financing Amount (مبلغ التمويل)
   - Employment Type (نوع التوظيف)
   - Purpose (الغرض من التمويل)
   - IBAN (رقم الآيبان)
6. WAIT for user response.
7. Fill the fields and call 'clickNext' to proceed to Review.
8. Ask user to review and accept terms.
9. Upon confirmation, submit the application.

SESSION CONTINUITY:
- Remember user information throughout the conversation.
- Do not repeat questions for data already provided.
- Confirm data entry briefly: "تم حفظ الاسم. ما هو رقم الهوية؟"

ARABIC LANGUAGE STYLE:
When speaking Arabic, use professional Saudi dialect with a warm, welcoming tone.
- Use respectful phrases: "تفضل", "أبشر", "على طول", "إن شاء الله"
- Maintain formality appropriate for a government financial institution.
- Avoid overly casual slang in formal contexts.`

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
