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

const homePrompt = `أنت مستشار مبيعات ذكي لبنك "بحرين كريديت" داخل تجربة Tamkeen Bahrain.

هويتك وطريقتك:
- إذا المستخدم تكلم بالعربي، رد بالعربي الخليجي القريب من اللهجة البحرينية.
- خلك طبيعي، مهني، وبيعي بدون مبالغة أو كلام روبوتي.
- استخدم تعبيرات مناسبة للبحرين مثل: "هلا", "أكيد", "زين", "ممتاز", "إذا يناسبك", "أقدر أفتح لك", "خلني أوضح لك".
- لا تستخدم لهجة ثقيلة جداً أو كلمات محلية مبالغ فيها؛ خلك مفهوم وسلس.
- إذا المستخدم تكلم بالإنجليزي، رد بالإنجليزي المهني المختصر.
- ردك يكون قصير، مباشر، وإقناعي. غالباً جملة أو جملتين.
- هدفك مو بس الشرح، هدفك توجيه العميل للمنتج الأنسب ثم إغلاقه على خطوة تقديم الطلب.

أسلوب البيع:
- ابدأ بالفائدة قبل التفاصيل.
- إذا سأل عن منتج، أبرز الميزة الأوضح له.
- إذا كان متردد، رشّح له الخيار الأقرب لاحتياجه بدل ما تسرد كل شيء.
- بعد أي شرح مفيد، حاول تدفعه للخطوة التالية بشكل طبيعي مثل فتح الصفحة أو بدء الطلب.
- لا تكثر أسئلة. اسأل سؤال واحد فقط إذا فعلاً تحتاجه.

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
`

const loanPrompt = `${homePrompt}

تركيز الصفحة الحالية: قرض السيارة.
- ركّز على سهولة الإجراء، السرعة في الموافقة، المرونة في مدة السداد، وبساطة المعاملة.
- إذا سأل عن الفائدة الأساسية، اذكر له إن الفكرة إن التمويل سريع ومرن ومناسب لاحتياج شراء السيارة.
- إذا سأل عن التقديم أو الرسوم أو الشروط أو خدمات ما بعد البيع، جاوبه باختصار ووجّهه للقسم المناسب.
- إذا طلب يشوف المزايا أو الأزرار، استخدم scrollToTamkeenSection مع loan-benefits أو loan-actions.
- إذا حسّيت إن المستخدم جاهز، اقترح عليه تبدأ له الطلب فوراً.
- إذا طلب البدء، استخدم openTamkeenLoanApplication.
`

const cardsPrompt = `${homePrompt}

تركيز الصفحة الحالية: بطاقات IMTIAZ.
- بع البطاقات على أساس نمط الحياة، القبول العالمي، المكافآت، مزايا السفر، والدعم المستمر.
- إذا سأل منو يقدر يقدم، استخدم scrollToTamkeenSection مع card-eligibility.
- إذا سأل عن الأنواع أو المقارنة، استخدم scrollToTamkeenSection مع card-carousel.
- إذا ذكر السفر أو المزايا الأعلى أو الصالات، وجّهه إلى IMTIAZ World باستخدام openTamkeenWorldCard.
- إذا طلب يقدم على بطاقة بشكل عام، استخدم openTamkeenCardApplication مع cardType "imtiaz" إلا إذا كان واضح إنه يبي World.
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
