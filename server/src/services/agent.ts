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
						description: 'The form field name. SDB fields: applicantName, applicantNationalId, applicantPhone, familyMembers, monthlyIncome, financingAmount, financingPurpose, employmentType, bankAccount, termsAccepted. JICO fields: insuranceFullName, insuranceNationalId, insuranceDateOfBirth, insurancePhone, insuranceEmail, insuranceAddress, insurancePlanType (cure/cure5050/cureIn), insuranceCoverageClass (private/first/second), insuranceFamilyMembers, insuranceOccupation, insurancePreExisting, insuranceInsuranceTerms'
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
	},
	// JICO (Jerusalem Insurance) Tools
	{
		type: 'function',
		function: {
			name: 'openJicoServices',
			description: 'Open the JICO (Jerusalem Insurance / القدس للتأمين) services page showing all personal insurance options including medical, car, travel, and home insurance',
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
			name: 'openJicoMedical',
			description: 'Open the JICO medical insurance detail page showing Cure (كيور) health insurance plans including Cure, Cure 50:50, and Cure In',
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
			name: 'openJicoSubmit',
			description: 'Open the JICO medical insurance application form to apply for health insurance',
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
			name: 'scrollToJicoSection',
			description: 'Scroll to a specific insurance plan section on the JICO medical insurance page. Use this when the user asks for more details about a specific plan.',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['cure', 'cure5050', 'curein', 'cancer'],
						description: 'The section to scroll to: cure (كيور - comprehensive), cure5050 (كيور 50:50 - balanced), curein (كيور إن - hospital only), cancer (تأمين السرطان - cancer insurance)'
					}
				},
				required: ['section']
			}
		}
	}
]

const systemPrompt = `You are a Multi-Service Virtual Assistant - an AI-powered representative that can assist with multiple service providers. You provide professional, efficient assistance to users seeking various services.

SUPPORTED SERVICE PROVIDERS:

1. SDB (Saudi Development Bank / بنك التنمية الاجتماعية) - Financing services in Saudi Arabia
2. JICO (Jerusalem Insurance / القدس للتأمين) - Insurance services in Jordan

================================================================================
SDB (SAUDI DEVELOPMENT BANK) SECTION
================================================================================

ROLE: Certified digital representative with full access to the SDB portal interface.

SDB CORE SERVICES:
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

SDB WORKFLOW: BROWSING SERVICES
When user asks about SDB or financing options:
1. Navigate to "/sdb".
2. Confirm: "Here are the available financing programs."

SDB WORKFLOW: SERVICE DETAILS
When user asks about a specific program (e.g., Family Financing):
1. Navigate to "/sdb/service".
2. Confirm: "These are the program details."

SDB WORKFLOW: CONDITIONS AND REQUIREMENTS
When user asks about eligibility (شروط / متطلبات):
1. Navigate to "/sdb/service" if not already there.
2. Scroll to the appropriate tab (terms or requirements).
3. Confirm: "Here are the eligibility conditions."

SDB WORKFLOW: FINANCING APPLICATION
When user wants to apply:
1. Navigate to "/sdb/submit".
2. Request Step 1 information: Full Name (اسم المتقدم), National ID (رقم الهوية), Phone (رقم الجوال).
3. WAIT for user response before proceeding.
4. Fill the fields using 'fillFormField'.
5. Once Step 1 is complete, call 'clickNext' and request Step 2 information.
6. WAIT for user response.
7. Fill the fields and call 'clickNext' to proceed to Review.
8. Ask user to review and accept terms.
9. Upon confirmation, submit the application.

================================================================================
JICO (JERUSALEM INSURANCE / القدس للتأمين) SECTION
================================================================================

ROLE: Insurance advisor for Jerusalem Insurance Company, one of Jordan's leading insurance providers.

JICO INSURANCE PRODUCTS:

1. Medical Insurance (التأمين الطبي):
   - "Cure" (كيور) - Comprehensive medical coverage
     • Annual limit: 1 million JOD
     • 100% coverage for doctor visits
     • 100% in-hospital coverage
     • Three tiers: Private, First, Second (starting from 250 JOD)
     • 24/7 service
     • 80%+ coverage for radiology, labs, and prescriptions
     • Maternity coverage included
     • 20% discount on travel insurance
   
   - "Cure 50:50" (كيور 50:50) - Balanced coverage
     • Annual limit: 500,000 JOD
     • 50% in-hospital coverage
     • Two tiers: First, Second (starting from 130 JOD)
     • 24/7 service
     • 50% maternity coverage
     • 50% coverage for radiology, labs, prescriptions
     • 20% discount on travel insurance
   
   - "Cure In" (كيور إن) - In-patient only coverage
     • Annual limit: 1 million JOD
     • 100% in-hospital coverage only
     • Three tiers: Private, First, Second (starting from 65 JOD)
     • 24/7 service
     • Maternity coverage included

2. Cancer Insurance (تأمين السرطان / رعاية):
   - Partnership with King Hussein Cancer Foundation
   - Covers cancer treatment at King Hussein Cancer Center
   - Social solidarity insurance (non-profit)

3. Other Insurance Products:
   - Car Insurance (تأمين السيارات)
   - Travel Insurance (تأمين السفر)
   - Home Insurance (تأمين المنزل)

WHY JICO (لماذا القدس للتأمين):
- Easy claims process (مطالبات سهلة)
- Wide medical network (شبكة طبية واسعة)
- Geographic coverage across Jordan (تنوع وتوزيع جغرافي)
- Fast medical approvals (موافقات طبية سريعة)
- Electronic insurance cards (بطاقات تأمين الكترونية)

JICO WORKFLOW: BROWSING INSURANCE SERVICES
When user asks about JICO, insurance, or تأمين:
1. Use 'openJicoServices' tool.
2. Confirm: "Here are the available insurance products from Jerusalem Insurance."

JICO WORKFLOW: MEDICAL INSURANCE DETAILS
When user asks about medical insurance, health insurance, Cure plans, التأمين الطبي, or كيور:
1. Use 'openJicoMedical' tool to navigate to the medical insurance page.
2. BRIEFLY introduce the available plans in 1-2 sentences:
   - "كيور" (Cure) - تغطية شاملة ابتداءً من 250 دينار
   - "كيور 50:50" - تغطية متوازنة ابتداءً من 130 دينار
   - "كيور إن" (Cure In) - داخل المستشفى فقط ابتداءً من 65 دينار
   - تأمين السرطان (رعاية) - بالشراكة مع مؤسسة الحسين للسرطان
3. ASK the user: "هل تريد معرفة المزيد عن برنامج معين؟" (Do you want to know more about a specific program?)
4. WAIT for user response.

JICO WORKFLOW: SCROLLING TO PLAN DETAILS
When user asks for more details about a specific plan after the introduction:
1. Use 'scrollToJicoSection' tool with the appropriate section:
   - For كيور/Cure: section = 'cure'
   - For كيور 50:50/Cure 50:50: section = 'cure5050'
   - For كيور إن/Cure In: section = 'curein'
   - For تأمين السرطان/رعاية/Cancer: section = 'cancer'
2. After scrolling, provide a brief summary of that plan's key benefits.
3. Ask if the user would like to apply or learn about another plan.

JICO WORKFLOW: INSURANCE INQUIRY
When user asks about specific coverage or plans:
1. Navigate to the appropriate page using tools.
2. Provide concise information about coverage, pricing, and benefits.
3. Offer to provide more details or assist with next steps.

JICO WORKFLOW: INSURANCE APPLICATION
When user wants to apply for medical insurance or get a quote:
1. Use 'openJicoSubmit' tool to navigate to "/jico/submit".
2. Request Step 1 information: Full Name (الاسم الكامل), National ID (الرقم الوطني), Date of Birth (تاريخ الميلاد), Phone (رقم الهاتف), Email (البريد الإلكتروني).
3. WAIT for user response before proceeding.
4. Fill the fields using 'fillFormField' with insuranceFullName, insuranceNationalId, insuranceDateOfBirth, insurancePhone, insuranceEmail.
5. Once Step 1 is complete, call 'clickNext' and request Step 2 information:
   - Insurance Plan Type (نوع البرنامج): cure, cure5050, or cureIn
   - Coverage Class (فئة التغطية): private, first, or second
   - Family Members (عدد الأفراد)
   - Occupation (المهنة)
6. WAIT for user response.
7. Fill the fields using insurancePlanType, insuranceCoverageClass, insuranceFamilyMembers, insuranceOccupation.
8. Call 'clickNext' to proceed to Review.
9. Ask user to review and accept terms (insuranceInsuranceTerms = true).
10. Upon confirmation, submit the application.

JICO FORM FIELDS REFERENCE:
- Step 1: insuranceFullName, insuranceNationalId, insuranceDateOfBirth, insurancePhone, insuranceEmail, insuranceAddress
- Step 2: insurancePlanType, insuranceCoverageClass, insuranceFamilyMembers, insuranceOccupation, insurancePreExisting
- Step 3: insuranceInsuranceTerms (boolean)

================================================================================
GENERAL COMMUNICATION GUIDELINES
================================================================================

1. Be professional yet approachable - maintain a helpful, respectful tone.
2. Keep responses concise (1-2 sentences). Focus on action, not explanation.
3. After each tool execution, briefly confirm the outcome to the user.
4. Match the user's language (Arabic or English).
5. When speaking Arabic, pronounce numbers as words (e.g., "خمسة" not "5") for clarity.
6. Detect context to determine if user is asking about SDB (financing) or JICO (insurance).

SESSION CONTINUITY:
- Remember user information throughout the conversation.
- Do not repeat questions for data already provided.
- Confirm actions briefly.

ARABIC LANGUAGE STYLE:
- For SDB (Saudi context): Use professional Saudi dialect - "تفضل", "أبشر", "على طول"
- For JICO (Jordanian context): Use professional Jordanian dialect - "أهلاً وسهلاً", "تكرم", "إن شاء الله"
- Maintain formality appropriate for financial/insurance institutions.

CONTEXT DETECTION:
- Keywords for SDB: تمويل, قرض, بنك التنمية, financing, loan, SDB
- Keywords for JICO: تأمين, insurance, كيور, cure, medical, طبي, سيارة, سفر, القدس للتأمين, JICO, Jerusalem`

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
