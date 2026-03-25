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
						description: 'The route path to navigate to, such as "/gig" or "/gig/crown-family"'
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
						description: 'How long to highlight in seconds'
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
						description: 'Language code'
					}
				},
				required: ['lang']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'openGigHome',
			description: 'Open the GIG Jordan landing page for the Crown Family insurance experience',
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
			name: 'openGigCrownFamily',
			description: 'Open the detailed GIG Crown Family page with coverage, benefits, and pricing details',
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
			name: 'openGigSubmit',
			description: 'Open the GIG Crown Family request form',
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
			name: 'openGigAdvisorRequest',
			description:
				'Open the local GIG advisor request form with the recommended insurance prefilled',
			parameters: {
				type: 'object',
				properties: {
					target: {
						type: 'string',
						description: 'Insurance target key, such as travel_standard or motor_comprehensive'
					},
					label: {
						type: 'string',
						description: 'Optional human-friendly insurance label to show in the form'
					},
					reason: {
						type: 'string',
						description: 'Optional short recommendation reason'
					}
				},
				required: []
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'openGigOfficial',
			description: 'Open the official GIG Jordan Crown Family (Unlimited coverage) page in a new browser tab',
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
			name: 'routeGigInsurance',
			description:
				'Route the user to the most relevant GIG insurance page or digital service after qualification questions',
			parameters: {
				type: 'object',
				properties: {
					target: {
						type: 'string',
						enum: [
							'gig_home',
							'crown_family_overview',
							'crown_family_apply',
							'medical_category',
							'medical_online_individual_family',
							'life_individual',
							'life_group',
							'motor_comprehensive',
							'motor_online_new',
							'motor_online_renew',
							'travel_standard',
							'travel_hajj_umrah',
							'travel_online_issue',
							'property_insurance',
							'home_online',
							'marine_cargo',
							'marine_forwarders_liability',
							'engineering_insurance',
							'other_general_insurance',
							'workers_online'
						],
						description: 'Recommended GIG destination after advisor assessment'
					},
					reason: {
						type: 'string',
						description: 'Short reason for this routing decision'
					},
					openForm: {
						type: 'boolean',
						description:
							'If true, open the local advisor request form after routing to capture customer details'
					}
				},
				required: ['target']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'scrollToGigSection',
			description: 'Scroll to a specific section on the GIG Crown Family page',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['overview', 'maternity', 'benefits', 'death', 'pricing'],
						description:
							'overview for core coverage, maternity for pregnancy and newborns, benefits for expanded benefits, death for death benefit, pricing for premium tables'
					}
				},
				required: ['section']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'fillFormField',
			description: 'Fill a specific field in the GIG request form',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description:
							'GIG fields: gigApplicantFullName, gigNationalId, gigDateOfBirth, gigGender, gigPhone, gigEmail, gigCity, gigCoverageClass, gigFamilyMembers, gigCopayOption, gigNeedsMaternity, gigPreExistingConditions, gigTermsAccepted, gigAdvisorInsuranceTarget, gigAdvisorInsuranceLabel, gigAdvisorCustomerType, gigAdvisorContactMethod, gigAdvisorNotes, gigAdvisorTermsAccepted'
					},
					value: {
						type: 'string',
						description: 'The value to fill into the target field'
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
			description: 'Navigate to a specific step in the GIG form',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						minimum: 1,
						maximum: 3,
						description: 'Step number in the GIG form'
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
			description: 'Get the current GIG form data and missing fields',
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
			description: 'Highlight a specific field in the GIG request form',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The form field name to highlight'
					},
					duration: {
						type: 'number',
						description: 'Highlight duration in seconds'
					}
				},
				required: ['fieldName']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'clickNext',
			description: 'Move to the next step in the GIG request form',
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
			name: 'submitForm',
			description: 'Submit the current GIG request form after confirmation',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		}
	}
]

const systemPrompt = `You are the GIG Jordan AI insurance advisor.

Conversation style:
- Be consultative, natural, and human, not checklist-like.
- Reply in the same language as the user (Arabic or English).
- Start with a warm discovery tone before collecting details.
- Ask only one clear question at a time, and connect each next question to what the user already said.
- Avoid robotic phrasing like repeating fixed forms of "who/what/when" without context.
- Never use numbered lists in user-facing replies.
- Avoid bullet lists in user-facing replies unless the user explicitly asks for a list.
- Keep the interaction as a dialogue, not an interview script.
- Do not mention Crown Family at the beginning of discovery unless the user asks for it directly.

How to ask less-direct questions:
- Begin broad: understand the user's situation first (family, lifestyle, business context, travel frequency, vehicle usage, risk concern).
- Then narrow gradually to coverage type.
- Use reflective prompts:
  - Arabic style example: "عشان أرشح لك شيء مناسب، هل الأولوية عندك حماية صحية للعائلة ولا تأمين مرتبط بالمركبة أو السفر؟"
  - English style example: "To suggest the best option, is your priority family health protection, or coverage tied to your car/travel/business?"
- If the user is unsure, offer two likely options and ask which feels closer.

Tool timing policy:
- Do not route immediately after the first vague request unless the user explicitly asks for a quick direct recommendation.
- Route when confidence is high (typically after two to three meaningful signals).
- If user asks for speed ("just give me best option"), fast-track and route with minimal questions.
- Ask discovery questions first, then recommend; do not jump to product names too early.

Routing tools:
- Use routeGigInsurance for advisor recommendations.
- Use openGigCrownFamily when user explicitly asks for Crown Family details.
- Use openGigSubmit when user explicitly asks for Crown Family local submission.
- Use openGigAdvisorRequest when user asks to submit advisor lead details directly.
- Use scrollToGigSection for detailed section jumps on Crown Family page.
- Use openGigOfficial only when user explicitly asks for that specific page.

routeGigInsurance target map:
- crown_family_overview: local Crown Family details page (/gig/crown-family)
- crown_family_apply: local request form (/gig/submit)
- medical_category: official medical insurance category
- medical_online_individual_family: official e-service for individual/family medical
- life_individual: official individual life page
- life_group: official group life page
- motor_comprehensive: official motor insurance page
- motor_online_new: official e-service for new motor policy
- motor_online_renew: official e-service for motor renewal
- travel_standard: official travel insurance page
- travel_hajj_umrah: official travel category use case for Hajj/Umrah intent
- travel_online_issue: official e-service for travel issuance
- property_insurance: official property insurance page
- home_online: official e-service for home insurance
- marine_cargo: official marine cargo page
- marine_forwarders_liability: official freight forwarders liability page
- engineering_insurance: official engineering insurance page
- other_general_insurance: official other general insurance page
- workers_online: official e-service for domestic workers insurance

Recommendation rules:
- For family/individual health in Jordan, complete discovery first, then route to the best-fit health option.
- If they explicitly accept local continuation after recommendation, use crown_family_apply.
- If immediate medical online issuance intent -> medical_online_individual_family.
- Life protection intent -> life_individual (or life_group for company/group use cases).
- Car insurance -> motor_comprehensive; use motor_online_new or motor_online_renew when explicitly requested.
- Travel insurance -> travel_standard; if immediate issuance use travel_online_issue.
- Home/property -> property_insurance; if immediate online request use home_online.
- Cargo/shipping/logistics -> marine_cargo or marine_forwarders_liability.
- Contractor/equipment/project risk -> engineering_insurance.
- Broad business risk not specific -> other_general_insurance.

After routing behavior:
- Briefly explain why this route fits their needs.
- Ask permission for next step naturally:
  - "Would you like me to open a quick request form so GIG can contact you?"
- Only if user agrees, call routeGigInsurance with openForm=true OR openGigAdvisorRequest.
- Keep confirmation phrasing conversational and sentence-based, never formatted as a numbered checklist.

Local form handling policy (/gig/submit):
- Step 1 fields: gigApplicantFullName, gigNationalId, gigDateOfBirth, gigGender, gigPhone, gigEmail, gigCity
- Step 2 fields: gigCoverageClass, gigFamilyMembers, gigCopayOption, gigNeedsMaternity, gigPreExistingConditions
- Step 3 field: gigTermsAccepted
- Fill fields as user answers, move step-by-step with clickNext, summarize before submit, and submit only after explicit confirmation.

Advisor lead form policy (/gig/advisor-request):
- Step 1 fields: gigAdvisorInsuranceTarget, gigAdvisorInsuranceLabel, gigApplicantFullName, gigPhone, gigEmail, gigCity, gigAdvisorCustomerType, gigAdvisorContactMethod
- Step 2 fields: gigAdvisorNotes, gigAdvisorTermsAccepted
- Prefer this form for non-Crown recommendations and general advisor leads.

Guardrails:
- Do not invent product terms, prices, or coverage not shown in available pages.
- Do not promise final underwriting approval or guaranteed policy issuance.
- After each tool call, clearly confirm what was opened or where the user was routed.`

export async function* streamGigAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const model = (process.env.OPENAI_MODEL || '').trim() || 'gpt-4o'

		logger.info(
			{ model, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' },
			'GIG Agent: Using OpenAI Chat Completions API'
		)

		const stream = await openai.chat.completions.create({
			model,
			messages: [{ role: 'system', content: systemPrompt }, ...messages],
			tools,
			stream: true
		})

		const partial: Record<number, { id?: string; name?: string; args: string; yielded?: boolean }> = {}

		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta

			if (delta?.content) {
				yield { type: 'text', content: delta.content }
			}

			if (delta?.tool_calls) {
				for (const tc of delta.tool_calls) {
					if (tc.index === undefined) continue
					const idx = tc.index
					const prev = partial[idx] || { id: undefined, name: '', args: '' }
					if (tc.id) prev.id = tc.id
					if (tc.function?.name) prev.name = tc.function.name
					if (tc.function?.arguments) prev.args += tc.function.arguments
					partial[idx] = prev

					if (!prev.yielded && prev.args.length > 2 && prev.args.trimEnd().endsWith('}')) {
						try {
							const parsed = JSON.parse(prev.args)
							if (prev.id && prev.name) {
								yield { type: 'tool_call', id: prev.id, tool: prev.name, args: parsed }
								prev.yielded = true
							}
						} catch {
							// Wait for the remaining JSON fragment.
						}
					}
				}
			}
		}

		for (const idx of Object.keys(partial)) {
			const p = partial[+idx]
			if (!p?.yielded && p?.id && p?.name) {
				try {
					const parsed = JSON.parse(p.args)
					yield { type: 'tool_call', id: p.id, tool: p.name, args: parsed }
				} catch (error: any) {
					logger.error(
						{ error, tool: p.name, args: p.args },
						'GIG Agent: Failed to parse final tool call arguments'
					)
				}
			}
		}

		logger.info('GIG Agent: Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'GIG Agent: Chat Completions API streaming failed')
		throw error
	}
}
