import OpenAI from 'openai'
import { logger } from '../logger.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export type AgentMessage = {
	role: 'user' | 'assistant' | 'system' | 'tool'
	content: string | null
	tool_calls?: Array<{
		id: string
		type: 'function'
		function: { name: string; arguments: string }
	}>
	tool_call_id?: string
}

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'navigateTo',
			description: 'الانتقال إلى صفحة معينة في بوابة المستثمر',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description:
							'المسار للانتقال إليه مثل /moin أو /moin/service',
					},
				},
				required: ['path'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMoinServices',
			description: 'فتح صفحة خدمات المستثمر الرئيسية',
			parameters: {
				type: 'object',
				properties: {},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMoinService',
			description:
				'فتح صفحة تفاصيل خدمة اصدار بطاقة المستثمر مع نموذج التقديم',
			parameters: {
				type: 'object',
				properties: {},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'moinAgreeTerms',
			description:
				'الموافقة على شروط وأحكام خدمة اصدار بطاقة المستثمر نيابة عن المستخدم',
			parameters: {
				type: 'object',
				properties: {},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'goToFormStep',
			description: 'الانتقال إلى خطوة معينة في نموذج التقديم',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						enum: [1, 2],
						description:
							'رقم الخطوة: 1 لمعلومات عامة وشروط الطلب، 2 لتقديم الطلب',
					},
				},
				required: ['step'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'submitForm',
			description:
				'إرسال طلب اصدار بطاقة المستثمر بعد الموافقة على الشروط',
			parameters: {
				type: 'object',
				properties: {},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'highlight',
			description: 'تمييز عنصر معين في الصفحة لجذب انتباه المستخدم',
			parameters: {
				type: 'object',
				properties: {
					selector: {
						type: 'string',
						description: 'محدد CSS للعنصر المراد تمييزه',
					},
					seconds: {
						type: 'number',
						description: 'مدة التمييز بالثواني',
					},
				},
				required: ['selector', 'seconds'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'scrollToMoinSection',
			description:
				'التمرير إلى قسم محدد في صفحة خدمة بطاقة المستثمر',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['terms', 'agreement', 'services'],
						description:
							'القسم للتمرير إليه: terms (شروط الطلب)، agreement (قسم الموافقة)، services (شبكة الخدمات)',
					},
				},
				required: ['section'],
			},
		},
	},
]

const systemPrompt = `أنت المساعد الافتراضي لبوابة المستثمر التابعة لوزارة الاستثمار في المملكة الأردنية الهاشمية. أنت مستشار استثماري محترف يساعد المستثمرين في الحصول على خدمات بطاقة المستثمر.

================================================================================
قواعد اللغة الصارمة
================================================================================

يجب عليك الالتزام بالقواعد التالية بشكل صارم:

١. الرد باللغة العربية فقط - لا تستخدم أي كلمات إنجليزية في ردودك النصية مطلقاً
٢. لا تستخدم النجوم أو العلامات مثل * أو ** أو *** في ردودك
٣. لا تستخدم الرموز التعدادية مثل • أو - في بداية الجمل
٤. استخدم اللهجة الأردنية المهنية مثل "أهلاً وسهلاً" و"تفضل" و"إن شاء الله"
٥. حافظ على الرسمية المناسبة لجهة حكومية

================================================================================
خدمات بطاقة المستثمر
================================================================================

تقدم بوابة المستثمر الخدمات التالية:

طلب اصدار بطاقة المستثمر للفئة (أ):
بطاقة المستثمر من الفئة أ تمنح للمستثمر الذي تبلغ حصته في رأس المال المسجل 150 ألف دينار أردني على الأقل مع توفير 25 وظيفة للأردنيين، أو 300 ألف دينار مع توفير 15 وظيفة.

طلب اصدار بطاقة المستثمر للفئة (ب):
بطاقة المستثمر من الفئة ب تمنح وفق شروط مختلفة تتعلق بحجم الاستثمار.

طلب اصدار بطاقة المستثمر للفئة (ج):
بطاقة المستثمر من الفئة ج للمستثمرين الصغار.

طلب تجديد بطاقة المستثمر للفئة (أ):
تجديد بطاقة مستثمر فئة أ المنتهية الصلاحية.

اصدار بطاقة افراد عائلة المستثمر:
اصدار بطاقات لأفراد عائلة المستثمر الحاصل على بطاقة من أي فئة.

طلب الحصول على حوافز استثمارية:
خدمة تقديم طلب للحصول على حوافز ومزايا استثمارية.

شروط بطاقة المستثمر فئة أ:
أولاً: إذا بلغت حصة المستثمر في رأس المال المسجل للشركة أو مجموع حصصه في الشركات التي يمتلك حصصاً فيها 150 ألف دينار أردني على الأقل وتوفر تلك الشركة او الشركات ما لا يقل عن 25 وظيفة للأردنيين او 5 وظائف للأردنيين لنشاط تكنولوجيا المعلومات فقط.
ثانياً: إذا بلغت حصة المستثمر 300 ألف دينار أردني على الاقل وتوفر 15 وظيفة للأردنيين او 3 وظائف لنشاط تكنولوجيا المعلومات فقط.
ثالثاً: عند اصدار البطاقة يشترط ان تكون اعداد العمالة الاردنية مضى على تسجيلها لدى الضمان الاجتماعي 4 شهور على الأقل.

================================================================================
سير العمل
================================================================================

عند سؤال المستخدم عن خدمات بطاقة المستثمر أو الخدمات المتاحة:
١. استخدم أداة openMoinServices لفتح صفحة الخدمات
٢. قدم نبذة مختصرة عن الخدمات المتاحة

عند سؤال المستخدم عن بطاقة المستثمر أو شروط معينة:
١. استخدم أداة openMoinServices لعرض الخدمات
٢. اشرح الشروط المطلوبة بإيجاز
٣. اسأل إذا كان يريد التقديم

عند رغبة المستخدم بالتقديم على بطاقة المستثمر:
١. استخدم أداة openMoinService للانتقال لنموذج التقديم
٢. اشرح للمستخدم الشروط الموجودة في الخطوة الأولى
٣. اسأله إذا يوافق على الشروط
٤. عند موافقته استخدم أداة moinAgreeTerms للموافقة على الشروط
٥. ثم استخدم أداة goToFormStep مع الخطوة 2 للانتقال لتقديم الطلب
٦. ثم استخدم أداة submitForm لإرسال الطلب

================================================================================
إرشادات التواصل
================================================================================

كن محترفاً وودوداً في نفس الوقت
اجعل ردودك مختصرة في جملة أو جملتين وركز على الإجراء لا الشرح المطول
بعد تنفيذ كل أداة أكد النتيجة للمستخدم بإيجاز
عند الترحيب قل: أهلاً وسهلاً في بوابة المستثمر! كيف أقدر أساعدك اليوم؟`

export async function* streamMoinAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	| { type: 'text'; content: string }
	| { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	const model = process.env.OPENAI_MODEL || 'gpt-4o'
	logger.info(
		{ model, messageCount: messages.length },
		'Starting MOIN agent stream'
	)

	const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		{ role: 'system', content: systemPrompt },
		...messages.map((m) => {
			if (m.role === 'tool') {
				return {
					role: 'tool' as const,
					content: m.content || '',
					tool_call_id: m.tool_call_id || '',
				}
			}
			if (m.role === 'assistant' && m.tool_calls) {
				return {
					role: 'assistant' as const,
					content: m.content,
					tool_calls: m.tool_calls,
				}
			}
			return {
				role: m.role as 'user' | 'assistant',
				content: m.content || '',
			}
		}),
	]

	try {
		const stream = await openai.chat.completions.create({
			model,
			messages: chatMessages,
			tools,
			tool_choice: 'auto',
			stream: true,
		})

		let currentToolCall: {
			id: string
			name: string
			args: string
		} | null = null

		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta

			if (delta?.content) {
				yield { type: 'text', content: delta.content }
			}

			if (delta?.tool_calls) {
				for (const tc of delta.tool_calls) {
					if (tc.id) {
						if (currentToolCall) {
							try {
								const args = JSON.parse(
									currentToolCall.args || '{}'
								)
								yield {
									type: 'tool_call',
									id: currentToolCall.id,
									tool: currentToolCall.name,
									args,
								}
							} catch (e) {
								logger.error(
									{ error: e, args: currentToolCall.args },
									'Failed to parse tool call args'
								)
							}
						}
						currentToolCall = {
							id: tc.id,
							name: tc.function?.name || '',
							args: '',
						}
					}
					if (tc.function?.arguments) {
						if (currentToolCall) {
							currentToolCall.args += tc.function.arguments
						}
					}
				}
			}

			if (
				chunk.choices[0]?.finish_reason === 'tool_calls' &&
				currentToolCall
			) {
				try {
					const args = JSON.parse(currentToolCall.args || '{}')
					yield {
						type: 'tool_call',
						id: currentToolCall.id,
						tool: currentToolCall.name,
						args,
					}
				} catch (e) {
					logger.error(
						{ error: e, args: currentToolCall.args },
						'Failed to parse final tool call args'
					)
				}
				currentToolCall = null
			}
		}

		if (currentToolCall) {
			try {
				const args = JSON.parse(currentToolCall.args || '{}')
				yield {
					type: 'tool_call',
					id: currentToolCall.id,
					tool: currentToolCall.name,
					args,
				}
			} catch (e) {
				logger.error(
					{ error: e, args: currentToolCall.args },
					'Failed to parse remaining tool call args'
				)
			}
		}
	} catch (error: any) {
		logger.error({ error: error.message }, 'MOIN agent stream error')
		throw error
	}
}
