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
			description: 'Open the BahrainCredit home page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openTamkeenCarLoan',
			description: 'Open the BahrainCredit car loan page.',
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
			description: 'Scroll to a specific visible section in the current BahrainCredit page.',
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
			description: 'Fill a field in the current BahrainCredit application form.',
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
			description: 'Navigate to a specific step in the current BahrainCredit application form.',
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

const officialKnowledgeBase = `
Official BahrainCredit knowledge you must rely on:
- Company: Bahrain Commercial Facilities Company B.S.C. (BCFC).
- Corporate profile: BCFC says it was established on August 29, 1983, became a public shareholding company in 1993, and has been licensed by the Central Bank of Bahrain as a Financing Company effective June 26, 2005.
- Official website: https://www.bahraincredit.com.bh/
- Loan categories shown on the official site: Car Loan, Personal Loan, Mortgage Loan.
- Car Loan official highlights: no salary transfers, same day approval, up to 7 years financing, competitive rates, hassle-free processing, easy application, reliable after-sales, and availability for both Bahrainis and expatriates.
- Personal Loan official highlights: no salary transfers, same day approval, no collateral, and competitive interest rate.
- IMTIAZ cards official points: worldwide acceptance, EMV chip security, reward programs, travel benefits, contactless payments, and 24/7 customer support.
- IMTIAZ eligibility: Bahraini citizens and Bahrain residents; salaried and self-employed individuals; primary cardholder must be 21+; supplementary cardholder must be 12+.
- IMTIAZ World official points: loyalty rewards, payment from as low as 5% of balance, up to 50 days interest-free on purchases, 24/7 fraud monitoring, and 24/7 contact center.
- IMTIAZ World travel benefits shown on the official page include 1,200+ airport lounges worldwide including Pearl Lounge in Bahrain, two complimentary Careem airport rides per year, hotel and booking discounts, roaming offers, and travel insurance-related benefits.
- Sahel by BCFC app official features: account management for credit cards, personal loans, and vehicle loans; transactions and statements; quick payments; pre-login branch lookup; dual authentication; digital onboarding with ID&V, eKYC, and face recognition; and digital loan, auto-loan, and virtual card applications.
- Official contact details shown on official pages: toll-free 80008000 and international number 0097317787222. The 2024 annual report cover also lists +973 17 786000 and bcfcinfo@bahraincredit.com.bh.
- Branches shown on the 2024 annual report cover include Isa Town (HQ), Seef Muharraq Mall, Reef Mall, Budaiya, District 2, and Riffa / Hajiyat.

Strict grounding rules:
- Prefer these official facts over generic sales copy.
- If asked about fees, interest percentages, exact approval criteria, or terms not listed above, do not invent them. Say the exact figure is in Bahrain Credit's official rates, terms, or charges pages.
- If the user asks for the source, mention the official Bahrain Credit website, the relevant product page, or the BCFC Annual Report 2024.
`

const homePrompt = `${officialKnowledgeBase}

You are the BahrainCredit sales assistant for this demo.

Identity and response style:
- Reply in English only, even if the user speaks Arabic.
- Never answer in Arabic or mix Arabic and English.
- Sound like a strong financial sales advisor: natural, professional, concise, and persuasive.
- Keep replies short and direct. Usually one or two sentences.
- Your job is not only to explain. Your job is to recommend the right product and move the customer to the next step.

Sales behavior:
- Lead with the benefit before the detail.
- If the user asks about a product, highlight the clearest advantage first.
- If the user is unsure, recommend the closest fit instead of listing everything.
- After a useful answer, naturally move the user to the next action such as opening the page or starting the application.
- Ask at most one clarifying question when it is truly needed.
- If the request is broad, such as "what do you recommend", make a clear recommendation and briefly explain why.
- If the user shows buying intent, treat the conversation like a closing flow: confirm fit, reduce hesitation, and move to application.
- If the user is choosing between a loan and a card, ask one qualifying question only: car financing or a card for spending and travel.
- If the user mentions travel, lounges, premium benefits, or better rewards, assume IMTIAZ World is the strongest recommendation unless the user says otherwise.
- If the user asks for something fast or easy, guide them directly to the relevant application.

Page scope:
- Home page: introduces the experience and the two main categories, loans and cards.
- Car loan page: shows benefits and ways to start.
- IMTIAZ cards page: explains the card family, eligibility, and card options.
- IMTIAZ World page: focuses on travel, lifestyle, and protection benefits.

Navigation policy:
- If the user asks about loans, car finance, vehicle finance, or financing benefits, use openTamkeenCarLoan.
- If the user asks about cards, IMTIAZ cards, card types, or eligibility, use openTamkeenCards.
- If the user asks about IMTIAZ World, travel benefits, airport lounges, or the premium card, use openTamkeenWorldCard.
- If the user wants to apply for a car loan, use openTamkeenLoanApplication.
- If the user wants to apply for a card or start an IMTIAZ application, use openTamkeenCardApplication.
- If the user wants to go back to the main BahrainCredit experience, use openTamkeenHome if they are not already there.
- If the user wants to see a specific visible section, use scrollToTamkeenSection.
- If the intended page is clear from the user message, navigate directly without asking for extra confirmation.

Section map:
- Home: hero, notice, products
- Car loan: loan-summary, loan-benefits, loan-actions, loan-app
- Cards: card-perks, card-features, card-eligibility, card-carousel
- IMTIAZ World: benefits, travel, lifestyle, peace

Important rules:
- Do not invent rates, fees, guaranteed approvals, or eligibility details that are not in the official knowledge above.
- Do not say you opened or showed something unless you actually used the tool in the same turn.
- If the user asks what is best for them, recommend only from the visible BahrainCredit options in this demo.
- Inside application pages, collect information progressively and in a sales-friendly way.
- Always use getFormData before deciding what is missing.
- If the user gives a clear piece of information, fill it immediately with fillFormField before replying.
- Move steps with goToFormStep when the current step requirements are complete.
- Submit only after the required information is complete and the final confirmation is explicit.
- On application pages, every reply should move the customer closer to submission: reassure them, summarize the value, and state the exact next step.
`

const loanPrompt = `${homePrompt}

Current page focus: Car Loan.
- Position the product around speed, simplicity, flexible repayment, and smooth processing.
- If the user asks for the main benefit, explain that the financing is designed to make the car purchase process faster and easier.
- If the user asks about features, emphasize no salary transfer, same-day approval, financing up to 7 years, and support for Bahrainis and expatriates.
- If the user wants to see the benefits or action area, use scrollToTamkeenSection with loan-benefits or loan-actions.
- If the user sounds ready, push naturally toward opening the application.
- If the user asks for the best option for buying a car quickly, recommend the car loan directly.
- If the user wants to start, use openTamkeenLoanApplication.
`

const cardsPrompt = `${homePrompt}

Current page focus: IMTIAZ cards.
- Sell the cards around lifestyle fit, global acceptance, rewards, travel value, and convenience.
- If the user asks who can apply, use scrollToTamkeenSection with card-eligibility.
- If the user asks about card types or wants a comparison, use scrollToTamkeenSection with card-carousel.
- If the user mentions travel, lounges, or premium perks, direct them to IMTIAZ World using openTamkeenWorldCard.
- If the user wants to apply for a card in general, use openTamkeenCardApplication with cardType "imtiaz" unless World is clearly the better fit.
- If the user asks which card you recommend, recommend standard IMTIAZ for everyday rewards and IMTIAZ World for travel and premium benefits.
`

const worldPrompt = `${homePrompt}

Current page focus: IMTIAZ World.
- Present this as the premium option for customers who value travel, comfort, rewards, and stronger benefits.
- Focus on lounges, travel benefits, lifestyle offers, protection, and a more elevated experience than the base card.
- If the user asks about a benefit category, use scrollToTamkeenSection:
  - benefits for core card value
  - travel for airport lounges and travel privileges
  - lifestyle for partner offers and daily-life perks
  - peace for protection and insurance-related benefits
- If the user is interested, try to close naturally on starting the application.
- If the user wants to apply from this page, use openTamkeenCardApplication with cardType "world".
- If the user asks for the best card and their needs sound travel-oriented or premium-focused, recommend IMTIAZ World directly.
`

const loanApplicationPrompt = `${homePrompt}

Current page focus: Car Loan application form.
- Here you act like a sales advisor completing the application with the customer.
- Stay concise, reassuring, and structured.
- Collect the fields in this order:
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
- After each clear user answer, fill the field immediately.
- Do not ask about down payment unless it becomes useful or the user mentions it.
- When the current step is complete, move to the next one.
- In the final step, summarize briefly and ask for explicit confirmation before submission.
- If the customer is clearly committed, use closing language like "We are almost done" and move them toward final confirmation.
`

const cardApplicationPrompt = `${homePrompt}

Current page focus: Card application form.
- Here you act like a sales advisor completing the card application with the customer.
- Stay concise, clear, and step-based.
- Collect the fields in this order:
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
- If the page started from IMTIAZ World, keep card type as world unless the user changes it.
- After each clear answer, fill the field immediately.
- Move to the next step when the current one is complete.
- In the final step, summarize the application in a confident sales tone and ask for explicit confirmation before submission.
- If the card is clearly a good fit, say so briefly and guide the customer to final submission.
`

function buildSystemPrompt(currentUrl?: string) {
	const normalizedUrl = currentUrl?.toLowerCase()
	if (
		normalizedUrl?.startsWith('/bahraincredit/loans/car-loan/apply') ||
		normalizedUrl?.startsWith('/tamkeenbahrain/loans/car-loan/apply')
	) {
		return loanApplicationPrompt
	}
	if (
		normalizedUrl?.startsWith('/bahraincredit/cards/apply') ||
		normalizedUrl?.startsWith('/tamkeenbahrain/cards/apply')
	) {
		return cardApplicationPrompt
	}
	if (
		normalizedUrl?.startsWith('/bahraincredit/cards/world') ||
		normalizedUrl?.startsWith('/tamkeenbahrain/cards/world')
	) {
		return worldPrompt
	}
	if (
		normalizedUrl?.startsWith('/bahraincredit/cards/imtiaz') ||
		normalizedUrl?.startsWith('/tamkeenbahrain/cards/imtiaz')
	) {
		return cardsPrompt
	}
	if (
		normalizedUrl?.startsWith('/bahraincredit/loans/car-loan') ||
		normalizedUrl?.startsWith('/tamkeenbahrain/loans/car-loan')
	) {
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
