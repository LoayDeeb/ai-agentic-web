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

// EF (Environment Fund) Tool definitions
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
						description: 'The route path to navigate to (e.g., "/ef", "/ef/program/1", "/ef/apply/1")'
					}
				},
				required: ['path']
			}
		}
	},
	{
		type: 'function',
		function: {
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
		}
	},
	{
		type: 'function',
		function: {
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
		}
	},
	{
		type: 'function',
		function: {
			name: 'checkAuthStatus',
			description: 'Check if the user is currently logged in',
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
			name: 'getUserInfo',
			description: 'Get the logged-in user information',
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
			name: 'fillFormField',
			description: 'Fill a specific form field with a value',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The form field name. EF fields: efOrganizationName, efRegistrationNumber, efOrganizationType, efContactPerson, efContactEmail, efContactPhone, efProjectTitle, efProjectDescription, efRequestedAmount, efProjectDuration, efEnvironmentalSector, efExpectedImpact, efTermsAccepted'
					},
					value: {
						type: 'string',
						description: 'The value to fill in the field'
					}
				},
				required: ['fieldName', 'value']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'goToFormStep',
			description: 'Navigate to a specific step in the multi-step application form (1-3)',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						description: 'Step number (1=Organization Info, 2=Project Details, 3=Review)',
						minimum: 1,
						maximum: 3
					}
				},
				required: ['step']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'getFormData',
			description: 'Get the current form data to see what fields are filled and what is missing',
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
		}
	},
	{
		type: 'function',
		function: {
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
	},
	// EF-specific navigation tools
	{
		type: 'function',
		function: {
			name: 'openEFPrograms',
			description: 'Open the Environment Fund programs page showing all available grants, loan guarantees, loan support, and awards',
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
			name: 'openEFProgramDetail',
			description: 'Open a specific program detail page to show eligibility, application process, and more information',
			parameters: {
				type: 'object',
				properties: {
					programId: {
						type: 'string',
						description: 'The program ID (1-6). 1=NPO Action Grant, 2=Research Institution Grant, 3=Environmental SME Support, 4=Industrial Compliance Loan, 5=Green Innovation Excellence Award, 6=Reforestation Community Grant'
					}
				},
				required: ['programId']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'openEFApplication',
			description: 'Open the application form for a specific program to start the application process',
			parameters: {
				type: 'object',
				properties: {
					programId: {
						type: 'string',
						description: 'The program ID (1-6) to apply for'
					}
				},
				required: ['programId']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'filterEFPrograms',
			description: 'Filter the programs list by category',
			parameters: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
						enum: ['All', 'Grants', 'Loan Guarantee', 'Loan Support', 'Awards'],
						description: 'The category to filter by'
					}
				},
				required: ['category']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'scrollToEFSection',
			description: 'Scroll to a specific section on the current EF page',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['overview', 'eligibility', 'steps', 'filters', 'programs'],
						description: 'The section to scroll to: overview (program description), eligibility (requirements), steps (application process), filters (category buttons), programs (grid of all programs)'
					}
				},
				required: ['section']
			}
		}
	}
]

const systemPrompt = `You are the virtual assistant for the Environment Fund (صندوق البيئة) - a professional advisor helping users navigate Saudi Arabia's environmental incentives and grants programs.

================================================================================
LANGUAGE RULES
================================================================================

You MUST follow these rules strictly:

1. Respond in English by default, but switch to Arabic if the user writes in Arabic
2. Do NOT use asterisks or markdown formatting like * or ** or *** in your responses
3. Do NOT use bullet points with • or - at the start of sentences
4. Keep responses concise - 2-3 sentences maximum unless more detail is requested
5. Maintain a professional yet approachable tone suitable for a government environmental fund

================================================================================
AVAILABLE PROGRAMS
================================================================================

The Environment Fund offers four types of programs:

GRANTS:
1. NPO Action Grant (ID: 1): For non-profit organizations implementing environment-focused initiatives. Covers up to 100% of project costs.
2. Research Institution Grant (ID: 2): For universities and research institutions conducting environmental studies. Covers up to 100% of research expenses.
3. Reforestation Community Grant (ID: 6): For community-led reforestation projects to combat desertification.

LOAN GUARANTEE:
3. Environmental SME Support (ID: 3): Financial guarantees for SMEs in environmental sustainability, waste management, and renewable technologies.

LOAN SUPPORT:
4. Industrial Compliance Loan (ID: 4): Low-interest loans for industrial entities to upgrade facilities for environmental compliance.

AWARDS:
5. Green Innovation Excellence Award (ID: 5): Annual award recognizing outstanding achievements in environmental innovation.

Key sectors supported: meteorology, waste management, wildlife conservation, vegetation cover, desertification control, environmental compliance.

================================================================================
WORKFLOWS
================================================================================

When a user asks about Environment Fund programs or services:
Use openEFPrograms tool, then briefly confirm you've opened the programs page.

When a user asks about a specific program category (grants, loans, awards):
1. Use filterEFPrograms with the appropriate category
2. Briefly describe what programs are available in that category
3. Ask if they want more details about a specific program

When a user wants to learn more about a specific program:
1. Use openEFProgramDetail with the appropriate programId
2. Provide a brief summary of eligibility and benefits
3. Ask if they want to start an application

When a user wants to apply for a program:
1. Use openEFApplication with the programId
2. Request Step 1 information: organization name, registration number, contact person, email, phone
3. Wait for user response before proceeding
4. Fill fields using fillFormField tool
5. After Step 1 is complete, use clickNext and request Step 2: project title, description, requested amount, duration
6. Wait for user response
7. Fill fields and use clickNext to move to review
8. Ask user to review and accept terms
9. Upon confirmation, submit the application

Form field reference:
Step 1: efOrganizationName, efRegistrationNumber, efOrganizationType, efContactPerson, efContactEmail, efContactPhone
Step 2: efProjectTitle, efProjectDescription, efRequestedAmount, efProjectDuration, efEnvironmentalSector, efExpectedImpact
Step 3: efTermsAccepted

================================================================================
COMMUNICATION GUIDELINES
================================================================================

Be professional and helpful
Keep responses brief - one or two sentences, focus on action not lengthy explanation
After executing each tool, briefly confirm the result to the user
Remember user information throughout the conversation
Do not repeat questions about data already provided`

/**
 * Stream EF agent response using OpenAI Chat Completions API
 */
export async function* streamEFAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const ENV_MODEL = (process.env.OPENAI_MODEL || '').trim()
		const MODEL = ENV_MODEL || 'gpt-4o'

		logger.info({ model: MODEL, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' }, 'Using OpenAI Chat Completions API for EF Agent')

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
					if (tc.function?.name) prev.name = tc.function.name
					if (tc.function?.arguments) prev.args += tc.function.arguments
					partial[idx] = prev

					if (!prev.yielded) {
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

		// Flush any remaining tool calls
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

		logger.info('EF Agent Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'EF Agent Chat Completions API streaming failed')
		throw error
	}
}
