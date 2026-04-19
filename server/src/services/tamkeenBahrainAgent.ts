import OpenAI from 'openai'
import { logger } from '../logger.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
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
			name: 'openTamkeenHome',
			description: 'Open the Tamkeen Bahrain home page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenCarLoan',
			description: 'Open the Tamkeen Bahrain car loan page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenCards',
			description: 'Open the IMTIAZ cards overview page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenWorldCard',
			description: 'Open the IMTIAZ World card detail page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenLoanApplication',
			description: 'Open the Bahrain Credit car loan application form.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenCardApplication',
			description: 'Open the IMTIAZ card application form, optionally preselecting the card type.',
			parameters: {
				type: 'object',
				properties: {
					cardType: {
						type: 'string',
						enum: ['imtiaz', 'world'],
					},
				},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'scrollToTamkeenSection',
			description: 'Scroll to a specific visible section in the current Tamkeen Bahrain page.',
			parameters: {
				type: 'object',
				properties: {
					sectionId: {
						type: 'string',
						enum: [
							'hero',
							'notice',
							'products',
							'loan-summary',
							'loan-benefits',
							'loan-actions',
							'loan-app',
							'card-perks',
							'card-features',
							'card-eligibility',
							'card-carousel',
							'benefits',
							'travel',
							'lifestyle',
							'peace',
						],
					},
				},
				required: ['sectionId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'fillFormField',
			description: 'Fill a field in the current Tamkeen Bahrain application form.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						enum: [
							'tamkeenLoanFullName',
							'tamkeenLoanNationalId',
							'tamkeenLoanPhone',
							'tamkeenLoanEmail',
							'tamkeenLoanEmploymentType',
							'tamkeenLoanMonthlyIncome',
							'tamkeenLoanVehicleType',
							'tamkeenLoanRequestedAmount',
							'tamkeenLoanPreferredTerm',
							'tamkeenLoanDownPayment',
							'tamkeenLoanTermsAccepted',
							'tamkeenCardFullName',
							'tamkeenCardNationalId',
							'tamkeenCardPhone',
							'tamkeenCardEmail',
							'tamkeenCardEmploymentStatus',
							'tamkeenCardMonthlyIncome',
							'tamkeenCardType',
							'tamkeenCardCreditLimit',
							'tamkeenCardDeliveryPreference',
							'tamkeenCardTermsAccepted',
						],
					},
					value: {
						type: 'string',
					},
				},
				required: ['fieldName', 'value'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'goToFormStep',
			description: 'Navigate to a specific step in the current Tamkeen Bahrain application form.',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						enum: [1, 2, 3],
					},
				},
				required: ['step'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'getFormData',
			description: 'Get the current form data and list of missing required fields.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'highlightFormField',
			description: 'Highlight a specific field in the application form for the user.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: { type: 'string' },
					duration: { type: 'number' },
				},
				required: ['fieldName'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'submitForm',
			description: 'Submit the current application form after all required details are completed.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
]

const homePrompt = `You are the Bahrain Credit virtual assistant for the Tamkeen Bahrain demo.

Style:
- Reply in the same language as the user.
- Keep replies short, practical, and action-oriented.
- Prefer one or two sentences.
- When the user clearly wants a page or section, use a tool immediately.

Product scope:
- Home page introduces the Bahrain demo, the new domain announcement, loans, and cards.
- Car loan page explains financing benefits and action buttons.
- IMTIAZ cards page explains the overall card family, eligibility, and the carousel of card variants.
- IMTIAZ World page covers premium travel, lifestyle, and peace-of-mind benefits.

Navigation policy:
- If the user asks for loans, car finance, vehicle finance, or financing benefits, use openTamkeenCarLoan.
- If the user asks for cards, IMTIAZ cards, card types, or card eligibility, use openTamkeenCards.
- If the user asks for IMTIAZ World, world card, airport lounge access, travel perks, or premium benefits, use openTamkeenWorldCard.
- If the user asks to apply for a loan, start a loan request, or submit a car loan application, use openTamkeenLoanApplication.
- If the user asks to apply for a card, start an IMTIAZ application, or submit a card request, use openTamkeenCardApplication.
- If the user asks to go back home or asks what this Bahrain demo includes, use openTamkeenHome if they are not already on the home page.
- If the user asks to show a visible section, use scrollToTamkeenSection with the correct section id.

Section map:
- Home: hero, notice, products
- Car loan: loan-summary, loan-benefits, loan-actions, loan-app
- Cards overview: card-perks, card-features, card-eligibility, card-carousel
- IMTIAZ World: benefits, travel, lifestyle, peace

Content guardrails:
- Do not invent loan rates, approval guarantees, fees, or eligibility details beyond the visible page content.
- Do not claim a product was opened or scrolled into view unless you called the matching tool in the same turn.
- If the user asks which option fits them, compare only using the visible distinctions: loan financing, general IMTIAZ cards, or IMTIAZ World premium travel benefits.
- When on an application page, collect information one field at a time unless the user provides multiple items together.
- Always call getFormData before deciding what to ask for next on an application page.
- Fill every clear value immediately with fillFormField before replying.
- Move steps with goToFormStep when the needed fields for the current step are complete.
- Submit only after all required fields are present and the terms field is set to true.
`

const loanPrompt = `${homePrompt}

Current page focus: car loan.
- Emphasize same-day approval, flexible tenure up to 7 years, competitive rates, and simplified processing.
- If the user asks to apply, charges, terms, or after-sales, keep the answer concise and point them to the visible action area.
- If they ask to show benefits or actions, use scrollToTamkeenSection with loan-benefits or loan-actions.
- If they want to start the application, use openTamkeenLoanApplication.
`

const cardsPrompt = `${homePrompt}

Current page focus: IMTIAZ cards overview.
- Help the user understand overall IMTIAZ positioning, global acceptance, rewards, travel benefits, contactless payments, and 24/7 support.
- If they ask who can apply, use scrollToTamkeenSection with card-eligibility.
- If they ask to compare or view card families, use scrollToTamkeenSection with card-carousel.
- If they ask specifically for IMTIAZ World, use openTamkeenWorldCard.
- If they want to apply for a card, use openTamkeenCardApplication with cardType "imtiaz" unless they explicitly ask for World.
`

const worldPrompt = `${homePrompt}

Current page focus: IMTIAZ World card.
- Focus on premium travel, lounge access, loyalty, flexible repayment, lifestyle offers, and insurance-style peace-of-mind benefits.
- If the user asks about a benefit category, use scrollToTamkeenSection:
  - benefits for core card value
  - travel for airport/lounge/travel offers
  - lifestyle for everyday partnerships and memberships
  - peace for insurance and protection
- If they ask to apply from this page, use openTamkeenCardApplication with cardType "world".
`

const loanApplicationPrompt = `${homePrompt}

Current page focus: car loan application form.
- Stay concise and transactional.
- Collect the application fields in this order:
  1. tamkeenLoanFullName
  2. tamkeenLoanNationalId
  3. tamkeenLoanPhone
  4. tamkeenLoanEmail
  5. tamkeenLoanEmploymentType
  6. tamkeenLoanMonthlyIncome
  7. tamkeenLoanVehicleType
  8. tamkeenLoanRequestedAmount
  9. tamkeenLoanPreferredTerm
  10. tamkeenLoanDownPayment (optional)
  11. tamkeenLoanTermsAccepted
- After each user answer, fill the matching field immediately.
- Do not ask for down payment unless it helps and the user has not already given it.
- Once required fields for step 1 are done, move to step 2.
- Once required fields for step 2 are done, move to step 3.
- At step 3, summarize briefly, ask for final confirmation, then set tamkeenLoanTermsAccepted to true only if the user clearly agrees and submit the form.
`

const cardApplicationPrompt = `${homePrompt}

Current page focus: card application form.
- Stay concise and transactional.
- Collect the application fields in this order:
  1. tamkeenCardFullName
  2. tamkeenCardNationalId
  3. tamkeenCardPhone
  4. tamkeenCardEmail
  5. tamkeenCardEmploymentStatus
  6. tamkeenCardMonthlyIncome
  7. tamkeenCardType
  8. tamkeenCardCreditLimit (optional)
  9. tamkeenCardDeliveryPreference
  10. tamkeenCardTermsAccepted
- If the page query already implies World, keep tamkeenCardType as world unless the user changes it.
- After each user answer, fill the matching field immediately.
- Once required fields for step 1 are done, move to step 2.
- Once required fields for step 2 are done, move to step 3.
- At step 3, summarize briefly, ask for final confirmation, then set tamkeenCardTermsAccepted to true only if the user clearly agrees and submit the form.
`

function buildSystemPrompt(currentUrl?: string) {
	if (currentUrl?.startsWith('/tamkeenbahrain/loans/car-loan/apply')) {
		return loanApplicationPrompt
	}
	if (currentUrl?.startsWith('/tamkeenbahrain/cards/apply')) {
		return cardApplicationPrompt
	}
	if (currentUrl?.startsWith('/tamkeenbahrain/cards/world')) {
		return worldPrompt
	}
	if (currentUrl?.startsWith('/tamkeenbahrain/cards/imtiaz')) {
		return cardsPrompt
	}
	if (currentUrl?.startsWith('/tamkeenbahrain/loans/car-loan')) {
		return loanPrompt
	}
	return homePrompt
}

export async function* streamTamkeenBahrainAgentResponse(
	messages: AgentMessage[],
	currentUrl?: string
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const model = (process.env.OPENAI_MODEL || '').trim() || 'gpt-4o'
		const systemPrompt = buildSystemPrompt(currentUrl)

		logger.info({ model, currentUrl }, 'Tamkeen Bahrain Agent: Using OpenAI Chat Completions API')

		const stream = await openai.chat.completions.create({
			model,
			messages: [{ role: 'system', content: systemPrompt }, ...messages],
			tools,
			stream: true,
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
							// Wait for more chunks.
						}
					}
				}
			}
		}

		for (const idx of Object.keys(partial)) {
			const pending = partial[Number(idx)]
			if (!pending?.yielded && pending?.id && pending?.name) {
				try {
					const parsed = JSON.parse(pending.args)
					yield { type: 'tool_call', id: pending.id, tool: pending.name, args: parsed }
				} catch (error: any) {
					logger.error(
						{ error, tool: pending.name, args: pending.args },
						'Tamkeen Bahrain Agent: Failed to parse tool arguments'
					)
				}
			}
		}
	} catch (error: any) {
		logger.error({ error: error.message }, 'Tamkeen Bahrain Agent: Chat Completions API streaming failed')
		throw error
	}
}
