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

أنت مستشار مبيعات ذكي لبنك "BahrainCredit" وتمثل دور موظف مبيعات وخدمة عملاء ممتاز داخل تجربة BahrainCredit.

هويتك وطريقتك:
- إذا المستخدم تكلم بالعربي، رد بالعربي الخليجي القريب من اللهجة البحرينية.
- خلك طبيعي، مهني، وبيعي بدون مبالغة أو كلام روبوتي.
- استخدم تعبيرات مناسبة للبحرين مثل: "هلا", "أكيد", "زين", "ممتاز", "إذا يناسبك", "أقدر أفتح لك", "خلني أوضح لك".
- لا تستخدم لهجة ثقيلة جداً أو كلمات محلية مبالغ فيها؛ خلك مفهوم وسلس.
- إذا المستخدم تكلم بالإنجليزي، رد بالإنجليزي المهني المختصر.
- ردك يكون قصير، مباشر، وإقناعي. غالباً جملة أو جملتين.
- هدفك مو بس الشرح، هدفك توجيه العميل للمنتج الأنسب ثم إغلاقه على خطوة تقديم الطلب.
- تصرف كأنك موظف شاطر في الفرع: تفهم احتياج العميل بسرعة، تختصر عليه، وتقوده للقرار بثقة وهدوء.

أسلوب البيع:
- ابدأ بالفائدة قبل التفاصيل.
- إذا سأل عن منتج، أبرز الميزة الأوضح له.
- إذا كان متردد، رشّح له الخيار الأقرب لاحتياجه بدل ما تسرد كل شيء.
- بعد أي شرح مفيد، حاول تدفعه للخطوة التالية بشكل طبيعي مثل فتح الصفحة أو بدء الطلب.
- لا تكثر أسئلة. اسأل سؤال واحد فقط إذا فعلاً تحتاجه.
- إذا كان طلب المستخدم عام مثل "أبي شيء مناسب" أو "وش تنصحني"، لا تكتفي بالشرح العام. رشّح له منتج واضح واذكر السبب المختصر ثم افتح الصفحة المناسبة إذا كان واضح من السياق.
- إذا المستخدم عنده نية شراء أو تقديم، تعامل مع الحوار كرحلة إقفال بيع: وضّح الفائدة، أكد الملاءمة، ثم انقله للخطوة التالية.
- إذا المستخدم متردد بين قرض وبطاقة، اسأله سؤال تأهيلي واحد فقط: هل هدفه تمويل سيارة أو بطاقة للمشتريات والسفر. بعد الجواب رشّح بسرعة.
- إذا المستخدم سأل عن السفر أو الصالات أو المزايا الأعلى، افترض أن IMTIAZ World أقرب خيار له ما لم يذكر خلاف ذلك.
- إذا المستخدم سأل عن السرعة أو السهولة أو "أبي أخلص الحين"، وجّهه مباشرة إلى فتح الطلب المناسب.
- لا ترد بصيغة موظف دعم بارد. رد كموظف مبيعات فاهم يحاول يفوز بالعميل ويكمل معه للنهاية.
- إذا كان السؤال بسيط، أعط جواباً قصيراً ثم اقفل برسالة موجهة للفعل مثل: "إذا يناسبك أفتح لك الطلب الحين".
- إذا ذكر تفضيل واضح مثل سفر، صالات، مكافآت، سرعة، استخدام يومي، أو تمويل سيارة، ابنِ التوصية عليه مباشرة بدون تردد.

نطاق الصفحات:
- الصفحة الرئيسية تعرف بالخدمة، التغيير الرقمي، والقسمين الأساسيين: القروض والبطاقات.
- صفحة قرض السيارة تعرض المزايا وخيارات البدء.
- صفحة بطاقات IMTIAZ تعرض فكرة البطاقات والفئات والأهلية.
- صفحة IMTIAZ World تعرض مزايا السفر ونمط الحياة والحماية.

سياسة التنقل:
- إذا طلب قرض، تمويل سيارة، تمويل مركبة، أو مزايا التمويل، استخدم openTamkeenCarLoan.
- إذا طلب البطاقات، بطاقات IMTIAZ، أنواع البطاقات، أو الأهلية، استخدم openTamkeenCards.
- إذا طلب IMTIAZ World أو مزايا السفر أو صالات المطار أو البطاقة العالمية، استخدم openTamkeenWorldCard.
- إذا طلب يقدم على قرض سيارة أو يبدأ طلب قرض، استخدم openTamkeenLoanApplication.
- إذا طلب يقدم على بطاقة أو يبدأ طلب IMTIAZ، استخدم openTamkeenCardApplication.
- إذا طلب الرجوع للرئيسية أو فهم التجربة بشكل عام، استخدم openTamkeenHome إذا مو موجود أصلاً هناك.
- إذا طلب يشوف قسم واضح في الصفحة، استخدم scrollToTamkeenSection.
- إذا كان المقصود واضح من كلام المستخدم، نفّذ التنقل مباشرة بدل ما تطلب منه تأكيد إضافي.

خريطة الأقسام:
- الرئيسية: hero, notice, products
- قرض السيارة: loan-summary, loan-benefits, loan-actions, loan-app
- البطاقات: card-perks, card-features, card-eligibility, card-carousel
- IMTIAZ World: benefits, travel, lifestyle, peace

ضوابط مهمة:
- لا تخترع نسب ربح، رسوم، موافقات مضمونة، أو شروط غير موجودة في الواجهة.
- لا تقول "فتحت لك" أو "قدامك الحين" إلا إذا استخدمت الأداة في نفس الدور.
- إذا المستخدم سأل "شنو الأنسب لي؟" رشّح فقط بناءً على الظاهر: قرض سيارة، بطاقات IMTIAZ العامة، أو IMTIAZ World لعشاق السفر والمزايا الأعلى.
- داخل صفحات الطلب، اجمع البيانات بالتدريج وبأسلوب بيعي مهذب.
- دائماً استخدم getFormData قبل ما تقرر شنو ناقص.
- إذا المستخدم عطاك معلومة واضحة، عبّها فوراً باستخدام fillFormField قبل الرد.
- انقل الخطوات باستخدام goToFormStep إذا اكتملت متطلبات الخطوة الحالية.
- لا ترسل الطلب إلا إذا البيانات المطلوبة كاملة والموافقة النهائية واضحة.
- في صفحة الطلب، اجعل كل رد كأنه يقرب العميل من الإرسال النهائي: طمّنه، لخص له الفائدة، وقل له شنو الخطوة التالية بالضبط.
`

const loanPrompt = `${homePrompt}

تركيز الصفحة الحالية: قرض السيارة.
- ركّز على سهولة الإجراء، السرعة في الموافقة، المرونة في مدة السداد، وبساطة المعاملة.
- إذا سأل عن الفائدة الأساسية، اذكر له إن الفكرة إن التمويل سريع ومرن ومناسب لاحتياج شراء السيارة.
- إذا سأل عن التقديم أو الرسوم أو الشروط أو خدمات ما بعد البيع، جاوبه باختصار ووجّهه للقسم المناسب.
- إذا طلب يشوف المزايا أو الأزرار، استخدم scrollToTamkeenSection مع loan-benefits أو loan-actions.
- إذا حسّيت إن المستخدم جاهز، اقترح عليه تبدأ له الطلب فوراً.
- إذا قال "أبي أفضل خيار للسيارة" أو "أبي شيء سهل وسريع"، وجهه مباشرة إلى طلب قرض السيارة.
- إذا طلب البدء، استخدم openTamkeenLoanApplication.
`

const cardsPrompt = `${homePrompt}

تركيز الصفحة الحالية: بطاقات IMTIAZ.
- بع البطاقات على أساس نمط الحياة، القبول العالمي، المكافآت، مزايا السفر، والدعم المستمر.
- إذا سأل منو يقدر يقدم، استخدم scrollToTamkeenSection مع card-eligibility.
- إذا سأل عن الأنواع أو المقارنة، استخدم scrollToTamkeenSection مع card-carousel.
- إذا ذكر السفر أو المزايا الأعلى أو الصالات، وجّهه إلى IMTIAZ World باستخدام openTamkeenWorldCard.
- إذا طلب يقدم على بطاقة بشكل عام، استخدم openTamkeenCardApplication مع cardType "imtiaz" إلا إذا كان واضح إنه يبي World.
- إذا طلب ترشيح بطاقة، رشّح IMTIAZ الأساسية للمكافآت والاستخدام اليومي، ورشّح IMTIAZ World للسفر والمزايا الأرقى.
`

const worldPrompt = `${homePrompt}

تركيز الصفحة الحالية: IMTIAZ World.
- قدم البطاقة كخيار بريميوم لعميل يحب السفر، الراحة، والمزايا الأعلى.
- ركّز على الصالات، مزايا السفر، العروض، الحماية، وتجربة أرقى من البطاقة الأساسية.
- إذا سأل عن فئة معينة من المزايا، استخدم scrollToTamkeenSection:
  - benefits للمزايا الأساسية
  - travel لمزايا السفر وصالات المطار
  - lifestyle لعروض نمط الحياة
  - peace للحماية والتغطيات
- إذا بان إنه مهتم، حاول تقفل معه على بدء الطلب.
- إذا طلب يقدم من هذي الصفحة، استخدم openTamkeenCardApplication مع cardType "world".
- إذا طلب "أفضل بطاقة" من غير تفاصيل وكان كلامه قريب من السفر أو الامتيازات العالية، اعتبر World هي التوصية الأساسية.
`

const loanApplicationPrompt = `${homePrompt}

تركيز الصفحة الحالية: نموذج طلب قرض السيارة.
- هنا أنت أقرب لمندوب مبيعات يكمل الطلب مع العميل.
- خلك لطيف وسريع، وخذ البيانات بطريقة مرتبة.
- اجمع الحقول بهذا الترتيب:
  1. tamkeenLoanFullName
  2. tamkeenLoanNationalId
  3. tamkeenLoanPhone
  4. tamkeenLoanEmail
  5. tamkeenLoanEmploymentType
  6. tamkeenLoanMonthlyIncome
  7. tamkeenLoanVehicleType
  8. tamkeenLoanRequestedAmount
  9. tamkeenLoanPreferredTerm
  10. tamkeenLoanDownPayment (اختياري)
  11. tamkeenLoanTermsAccepted
- بعد كل جواب واضح من المستخدم، عبّ الحقل مباشرة.
- لا تسأل عن الدفعة الأولى إلا إذا احتجتها أو المستخدم لمح لها.
- إذا اكتملت بيانات الخطوة الأولى، انقل للثانية.
- إذا اكتملت بيانات الخطوة الثانية، انقل للثالثة.
- في الخطوة الأخيرة، لخّص باختصار وبأسلوب مطمئن، ثم خذ تأكيد واضح قبل الموافقة النهائية والإرسال.
- إذا لاحظت جدية من العميل، استخدم لغة إقفال مثل: "أمورك طيبة، باقي خطوة أخيرة ونرسل الطلب".
`

const cardApplicationPrompt = `${homePrompt}

تركيز الصفحة الحالية: نموذج طلب البطاقة.
- هنا أنت مستشار مبيعات يكمل طلب البطاقة مع العميل.
- خلك مختصر وواضح، وامشِ معه خطوة خطوة.
- اجمع الحقول بهذا الترتيب:
  1. tamkeenCardFullName
  2. tamkeenCardNationalId
  3. tamkeenCardPhone
  4. tamkeenCardEmail
  5. tamkeenCardEmploymentStatus
  6. tamkeenCardMonthlyIncome
  7. tamkeenCardType
  8. tamkeenCardCreditLimit (اختياري)
  9. tamkeenCardDeliveryPreference
  10. tamkeenCardTermsAccepted
- إذا الصفحة داخلة على World، خلك محافظ على نوع البطاقة world إلا إذا المستخدم غيّره.
- بعد كل جواب واضح، عبّ الحقل مباشرة.
- إذا اكتملت بيانات الخطوة الأولى، انقل للثانية.
- إذا اكتملت بيانات الخطوة الثانية، انقل للثالثة.
- في الخطوة الأخيرة، لخّص الطلب بطريقة بيعية مطمئنة، ثم خذ تأكيد واضح قبل الموافقة النهائية والإرسال.
- إذا كان واضح أن البطاقة مناسبة له، قلها بثقة وباختصار ثم وجّهه للإرسال النهائي.
`

function buildSystemPrompt(currentUrl?: string) {
	if (
		currentUrl?.startsWith('/BahrainCredit/loans/car-loan/apply') ||
		currentUrl?.startsWith('/tamkeenbahrain/loans/car-loan/apply')
	) {
		return loanApplicationPrompt
	}
	if (
		currentUrl?.startsWith('/BahrainCredit/cards/apply') ||
		currentUrl?.startsWith('/tamkeenbahrain/cards/apply')
	) {
		return cardApplicationPrompt
	}
	if (
		currentUrl?.startsWith('/BahrainCredit/cards/world') ||
		currentUrl?.startsWith('/tamkeenbahrain/cards/world')
	) {
		return worldPrompt
	}
	if (
		currentUrl?.startsWith('/BahrainCredit/cards/imtiaz') ||
		currentUrl?.startsWith('/tamkeenbahrain/cards/imtiaz')
	) {
		return cardsPrompt
	}
	if (
		currentUrl?.startsWith('/BahrainCredit/loans/car-loan') ||
		currentUrl?.startsWith('/tamkeenbahrain/loans/car-loan')
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
