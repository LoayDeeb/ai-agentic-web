import OpenAI from 'openai'
import { logger } from '../logger.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
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

// Mawhiba Tool definitions for Chat Completions API
const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'navigateTo',
			description: 'الانتقال إلى صفحة معينة في موقع موهبة',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description: 'المسار للانتقال إليه مثل /mawhiba أو /mawhiba/service أو /mawhiba/service/submit'
					}
				},
				required: ['path']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'openMawhibaServices',
			description: 'فتح صفحة الخدمات الإلكترونية الرئيسية لموهبة',
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
			name: 'openMawhibaService',
			description: 'فتح صفحة تفاصيل خدمة البرنامج الوطني للكشف عن الموهوبين',
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
			name: 'openMawhibaApplication',
			description: 'فتح نموذج التسجيل في البرنامج الوطني للكشف عن الموهوبين',
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
			description: 'ملء حقل في نموذج التسجيل بقيمة معينة',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						enum: [
							'studentName',
							'studentNationalId',
							'studentBirthDate',
							'contactPhone',
							'contactEmail',
							'studentSchool',
							'studentGrade',
							'termsAccepted'
						],
						description: 'اسم الحقل المراد ملؤه'
					},
					value: {
						type: 'string',
						description: 'القيمة المراد إدخالها في الحقل. للصف الدراسي استخدم الأرقام من 3 إلى 10. للموافقة على الشروط استخدم true أو false'
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
			description: 'الانتقال إلى خطوة معينة في نموذج التسجيل',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						enum: [1, 2, 3],
						description: 'رقم الخطوة: 1 لمعلومات الطالب، 2 لتفاصيل المدرسة، 3 للمراجعة والإرسال'
					}
				},
				required: ['step']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'clickNext',
			description: 'الانتقال للخطوة التالية في النموذج',
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
			description: 'إرسال نموذج التسجيل بعد التأكد من اكتمال جميع البيانات والموافقة على الشروط',
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
			name: 'getFormData',
			description: 'الحصول على البيانات الحالية في النموذج والحقول الناقصة',
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
			name: 'highlight',
			description: 'تمييز عنصر معين في الصفحة لجذب انتباه المستخدم',
			parameters: {
				type: 'object',
				properties: {
					selector: {
						type: 'string',
						description: 'محدد CSS للعنصر المراد تمييزه'
					},
					seconds: {
						type: 'number',
						description: 'مدة التمييز بالثواني'
					}
				},
				required: ['selector', 'seconds']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'scrollToMawhibaSection',
			description: 'التمرير إلى قسم محدد في صفحة تفاصيل الخدمة',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['steps', 'terms', 'faq'],
						description: 'القسم للتمرير إليه: steps (خطوات الخدمة)، terms (شروط الخدمة)، faq (الأسئلة الشائعة)'
					}
				},
				required: ['section']
			}
		}
	}
]

const systemPrompt = `أنت المساعد الافتراضي لمؤسسة موهبة - مستشار تعليمي محترف يساعد أولياء الأمور والطلاب في التسجيل في برامج موهبة للموهوبين في المملكة العربية السعودية.

================================================================================
قواعد اللغة الصارمة
================================================================================

يجب عليك الالتزام بالقواعد التالية بشكل صارم:

١. الرد باللغة العربية فقط - لا تستخدم أي كلمات إنجليزية في ردودك النصية مطلقاً
٢. لا تستخدم النجوم أو العلامات مثل * أو ** أو *** في ردودك
٣. لا تستخدم الرموز التعدادية مثل • أو - في بداية الجمل
٤. اكتب الأرقام بالحروف العربية مثل "عشرة" بدلاً من "10"
٥. استخدم اللهجة السعودية المهنية مثل "أهلاً وسهلاً" و"تفضل" و"إن شاء الله"
٦. حافظ على الرسمية المناسبة لمؤسسة تعليمية حكومية

================================================================================
برامج وخدمات موهبة
================================================================================

تقدم مؤسسة موهبة أربعة برامج رئيسية:

أسبوع موهبة للعلوم:
برنامج يمكّن الطلبة من المشاركة في أنشطة علمية تفاعلية لمدة أسبوع كامل.

البرنامج الوطني للكشف عن الموهوبين:
خدمة تمكن الطلبة من التسجيل في مقياس موهبة للقدرات العقلية المتعددة. هذا هو البرنامج الرئيسي للتسجيل.

مسابقة الكانجارو للرياضيات:
أكبر مسابقة للرياضيات في العالم، تقام في أكثر من سبعين دولة حول العالم.

الأولمبياد الوطني للإبداع العلمي:
مسابقة علمية سنوية تقوم على أساس التنافس في أحد المجالات العلمية.

شروط التسجيل في البرنامج الوطني:
أن يكون الطالب سعودي الجنسية أو من أم سعودية
أن يكون الطالب من الصف الثالث الابتدائي إلى الصف الأول الثانوي
سداد المقابل المالي للخدمة

================================================================================
سير العمل
================================================================================

عند سؤال المستخدم عن خدمات موهبة أو البرامج المتاحة:
استخدم أداة openMawhibaServices ثم قدم نبذة مختصرة عن البرامج المتاحة.

عند سؤال المستخدم عن برنامج معين أو تفاصيل الخدمة:
١. استخدم أداة openMawhibaService للانتقال لصفحة تفاصيل الخدمة
٢. قدم ملخصاً مختصراً عن البرنامج الوطني للكشف عن الموهوبين
٣. اسأل إذا كان يريد التسجيل أو معرفة المزيد عن الشروط

عند رغبة المستخدم بالتسجيل في البرنامج:
١. استخدم أداة openMawhibaApplication للانتقال لنموذج التسجيل
٢. اطلب معلومات الخطوة الأولى: اسم الطالب الرباعي، رقم الهوية الوطنية، تاريخ الميلاد، رقم الجوال، البريد الإلكتروني
٣. انتظر رد المستخدم قبل المتابعة
٤. املأ الحقول باستخدام أداة fillFormField
٥. بعد اكتمال الخطوة الأولى استخدم أداة clickNext واطلب معلومات الخطوة الثانية: اسم المدرسة والصف الدراسي
٦. انتظر رد المستخدم
٧. املأ الحقول واستخدم clickNext للانتقال للمراجعة
٨. اطلب من المستخدم مراجعة البيانات والموافقة على الشروط
٩. عند التأكيد قم بإرسال الطلب

مرجع حقول النموذج:
الخطوة الأولى: studentName و studentNationalId و studentBirthDate و contactPhone و contactEmail
الخطوة الثانية: studentSchool و studentGrade (الصفوف من ثلاثة إلى عشرة)
الخطوة الثالثة: termsAccepted (استخدم القيمة true للموافقة)

قيم الصف الدراسي:
3 للصف الثالث الابتدائي
4 للصف الرابع الابتدائي
5 للصف الخامس الابتدائي
6 للصف السادس الابتدائي
7 للصف الأول المتوسط
8 للصف الثاني المتوسط
9 للصف الثالث المتوسط
10 للصف الأول الثانوي

================================================================================
إرشادات التواصل
================================================================================

كن محترفاً وودوداً في نفس الوقت
اجعل ردودك مختصرة في جملة أو جملتين وركز على الإجراء لا الشرح المطول
بعد تنفيذ كل أداة أكد النتيجة للمستخدم بإيجاز
تذكر معلومات المستخدم طوال المحادثة
لا تكرر الأسئلة عن بيانات تم تقديمها مسبقاً
عند الترحيب قل: أهلاً بك في موهبة! كيف أقدر أساعدك اليوم؟`

/**
 * Stream Mawhiba agent response using OpenAI Chat Completions API
 */
export async function* streamMawhibaAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	const model = process.env.OPENAI_MODEL || 'gpt-4o'
	logger.info({ model, messageCount: messages.length }, 'Starting Mawhiba agent stream')

	const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		{ role: 'system', content: systemPrompt },
		...messages.map((m) => {
			if (m.role === 'tool') {
				return {
					role: 'tool' as const,
					content: m.content || '',
					tool_call_id: m.tool_call_id || ''
				}
			}
			if (m.role === 'assistant' && m.tool_calls) {
				return {
					role: 'assistant' as const,
					content: m.content,
					tool_calls: m.tool_calls
				}
			}
			return {
				role: m.role as 'user' | 'assistant',
				content: m.content || ''
			}
		})
	]

	try {
		const stream = await openai.chat.completions.create({
			model,
			messages: chatMessages,
			tools,
			tool_choice: 'auto',
			stream: true
		})

		let currentToolCall: { id: string; name: string; args: string } | null = null

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
								const args = JSON.parse(currentToolCall.args || '{}')
								yield {
									type: 'tool_call',
									id: currentToolCall.id,
									tool: currentToolCall.name,
									args
								}
							} catch (e) {
								logger.error({ error: e, args: currentToolCall.args }, 'Failed to parse tool call args')
							}
						}
						currentToolCall = { id: tc.id, name: tc.function?.name || '', args: '' }
					}
					if (tc.function?.arguments) {
						if (currentToolCall) {
							currentToolCall.args += tc.function.arguments
						}
					}
				}
			}

			if (chunk.choices[0]?.finish_reason === 'tool_calls' && currentToolCall) {
				try {
					const args = JSON.parse(currentToolCall.args || '{}')
					yield {
						type: 'tool_call',
						id: currentToolCall.id,
						tool: currentToolCall.name,
						args
					}
				} catch (e) {
					logger.error({ error: e, args: currentToolCall.args }, 'Failed to parse final tool call args')
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
					args
				}
			} catch (e) {
				logger.error({ error: e, args: currentToolCall.args }, 'Failed to parse remaining tool call args')
			}
		}
	} catch (error: any) {
		logger.error({ error: error.message }, 'Mawhiba agent stream error')
		throw error
	}
}
