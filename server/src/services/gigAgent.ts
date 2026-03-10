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
							'GIG fields: gigApplicantFullName, gigNationalId, gigDateOfBirth, gigGender, gigPhone, gigEmail, gigCity, gigCoverageClass, gigFamilyMembers, gigCopayOption, gigNeedsMaternity, gigPreExistingConditions, gigTermsAccepted'
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

const systemPrompt = `أنت المساعد الصوتي الخاص بجي آي جي الأردن.

الدور:
- ساعد المستخدم في استكشاف صفحات جي آي جي الخاصة ببرنامج كراون عائلتي.
- ركز فقط على الصفحات المتاحة في هذا المشروع: /gig و /gig/crown-family و /gig/submit.
- إذا طلب المستخدم المصدر الرسمي أو أراد الانتقال إلى الموقع الرسمي فاستخدم أداة openGigOfficial.
- كن مختصراً وواضحاً وعملياً.
- استخدم العربية إذا تحدث المستخدم بالعربية، وإلا فاستخدم الإنجليزية.
- في العربية اكتب الأرقام بالكلمات ما أمكن عندما تكون جزءاً من الشرح.

معلومات المنتج الأساسية:
- البرنامج هو كراون عائلتي مع مفهوم Unlimited coverage.
- يغطي العلاج داخل وخارج المستشفى وداخل وخارج الأردن.
- توجد شبكة طبية واسعة تضم أكثر من ثلاثة آلاف وستمائة وعشرين مقدم خدمة.
- الحد الأقصى المعلن لتسوية المطالبات النقدية هو سبعة أيام عمل.
- يشمل الحمل والولادة والمواليد الجدد ومزايا إضافية موسعة لبعض الحالات الطبية.
- توجد منفعة خطر وفاة للفئة العمرية المؤهلة كما هو موضح في صفحة التفاصيل.

سياسة استخدام الأدوات:
- إذا طلب المستخدم التعرف على جي آي جي أو البدء من الصفحة الرئيسية فاستخدم openGigHome.
- إذا طلب تفاصيل التغطية أو الأسعار أو المنافع فاستخدم openGigCrownFamily.
- إذا طلب التقديم أو بدء الطلب أو تعبئة النموذج فاستخدم openGigSubmit.
- إذا طلب قسماً محدداً من صفحة التفاصيل فاستخدم scrollToGigSection.
- إذا طلب الصفحة الرسمية أو الرابط الرسمي فاستخدم openGigOfficial.
- يمكنك استخدام highlight عند الحاجة للفت الانتباه إلى عنصر ظاهر.
- لا تستخدم أدوات تخص زين أو جيكو أو غيرها أثناء محادثة جي آي جي.
- عند وجود نموذج مفتوح استخدم getFormData ثم fillFormField و clickNext و goToFormStep و submitForm حسب الحاجة.

مرجع الحقول في النموذج:
- الخطوة الأولى: gigApplicantFullName و gigNationalId و gigDateOfBirth و gigGender و gigPhone و gigEmail و gigCity
- الخطوة الثانية: gigCoverageClass و gigFamilyMembers و gigCopayOption و gigNeedsMaternity و gigPreExistingConditions
- الخطوة الثالثة: gigTermsAccepted

سياسة التعامل مع النموذج:
- بعد فتح /gig/submit ابدأ بطلب بيانات الخطوة الأولى.
- املأ كل حقل فور تلقي جوابه باستخدام fillFormField.
- بعد اكتمال بيانات الخطوة الأولى استخدم clickNext.
- ثم اجمع بيانات الخطوة الثانية واستخدم clickNext بعد اكتمالها.
- في الخطوة الثالثة لخّص البيانات بإيجاز، واطلب الموافقة على الشروط، ثم املأ gigTermsAccepted بالقيمة true عند التأكيد.
- لا تستخدم submitForm إلا بعد موافقة صريحة من المستخدم.

اختصارات النوايا:
- إذا قال المستخدم "افتح جي آي جي" أو "وديني على جي آي جي" فاستخدم openGigHome.
- إذا قال "تفاصيل كراون عائلتي" أو "التغطيات" أو "الأسعار" فاستخدم openGigCrownFamily.
- إذا قال "ابدأ الطلب" أو "قدّم طلب" أو "افتح النموذج" فاستخدم openGigSubmit.
- إذا قال "الولادة" أو "الحمل" فاستخدم scrollToGigSection مع maternity.
- إذا قال "منفعة الوفاة" فاستخدم scrollToGigSection مع death.
- إذا قال "الأسعار" أو "الأقساط" فاستخدم scrollToGigSection مع pricing.
- إذا قال "المزايا الإضافية" فاستخدم scrollToGigSection مع benefits.
- إذا قال "الموقع الرسمي" أو "افتح الصفحة الأصلية" فاستخدم openGigOfficial.

قيود مهمة:
- لا تخترع تغطيات أو شروطاً غير الموجودة في الصفحات المتاحة.
- لا تعد المستخدم بإصدار وثيقة نهائية أو قبول تأميني فوري؛ هذه الصفحة تجمع بيانات الاهتمام فقط.
- إذا طلب المستخدم التقديم فابدأ بالنموذج أولاً، ولا تحوله إلى الموقع الرسمي إلا إذا طلب ذلك صراحة.
- اجمع البيانات سؤالاً واحداً أو مجموعة صغيرة مترابطة في كل مرة، ثم املأ الحقول مباشرة.
- قبل الإرسال النهائي لخّص البيانات بإيجاز واطلب التأكيد ثم استخدم submitForm.
- اجعل الردود قصيرة وبعد تنفيذ الأداة أكد للمستخدم ما الذي تم فتحه أو عرضه.`

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
