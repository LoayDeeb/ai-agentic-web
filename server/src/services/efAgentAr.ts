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

// EF (Environment Fund) Tool definitions - Arabic version
const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'navigateTo',
			description: 'التنقل في الواجهة إلى مسار محدد',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description: 'مسار الصفحة للتنقل إليها (مثال: "/ef-ar", "/ef-ar/program/1", "/ef-ar/apply/1")'
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
			description: 'تمييز عنصر في الواجهة لجذب انتباه المستخدم',
			parameters: {
				type: 'object',
				properties: {
					selector: {
						type: 'string',
						description: 'محدد CSS للعنصر المراد تمييزه'
					},
					seconds: {
						type: 'number',
						description: 'مدة التمييز بالثواني (الافتراضي: 3)'
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
			description: 'تغيير لغة التطبيق',
			parameters: {
				type: 'object',
				properties: {
					lang: {
						type: 'string',
						enum: ['ar', 'en'],
						description: 'رمز اللغة: ar للعربية، en للإنجليزية'
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
			description: 'التحقق من حالة تسجيل دخول المستخدم',
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
			description: 'الحصول على معلومات المستخدم المسجل',
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
			description: 'ملء حقل نموذج محدد بقيمة',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'اسم حقل النموذج. حقول صندوق البيئة: efOrganizationName, efRegistrationNumber, efOrganizationType, efContactPerson, efContactEmail, efContactPhone, efProjectTitle, efProjectDescription, efRequestedAmount, efProjectDuration, efEnvironmentalSector, efExpectedImpact, efTermsAccepted'
					},
					value: {
						type: 'string',
						description: 'القيمة لملء الحقل بها'
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
			description: 'الانتقال إلى خطوة محددة في نموذج التقديم متعدد الخطوات (1-3)',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						description: 'رقم الخطوة (1=معلومات المنظمة، 2=تفاصيل المشروع، 3=المراجعة)',
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
			description: 'الحصول على بيانات النموذج الحالية لمعرفة الحقول المملوءة والناقصة',
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
			description: 'تمييز حقل نموذج محدد لجذب انتباه المستخدم',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'اسم الحقل المراد تمييزه'
					},
					duration: {
						type: 'number',
						description: 'مدة التمييز بالثواني (الافتراضي: 3)'
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
			description: 'إرسال النموذج الحالي (يعمل فقط إذا كانت جميع الحقول المطلوبة مملوءة)',
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
			description: 'الانتقال إلى الخطوة التالية في النموذج',
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
			description: 'فتح صفحة برامج صندوق البيئة التي تعرض جميع المنح وضمانات القروض ودعم القروض والجوائز المتاحة',
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
			description: 'فتح صفحة تفاصيل برنامج محدد لعرض الأهلية وعملية التقديم ومزيد من المعلومات',
			parameters: {
				type: 'object',
				properties: {
					programId: {
						type: 'string',
						description: 'معرف البرنامج (1-6). 1=منحة العمل للمنظمات غير الربحية، 2=منحة المؤسسات البحثية، 3=دعم المنشآت الصغيرة والمتوسطة البيئية، 4=قرض الامتثال الصناعي، 5=جائزة التميز في الابتكار الأخضر، 6=منحة التشجير المجتمعي'
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
			description: 'فتح نموذج التقديم لبرنامج محدد لبدء عملية التقديم',
			parameters: {
				type: 'object',
				properties: {
					programId: {
						type: 'string',
						description: 'معرف البرنامج (1-6) للتقديم عليه'
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
			description: 'تصفية قائمة البرامج حسب الفئة',
			parameters: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
						enum: ['الكل', 'المنح', 'ضمانات القروض', 'دعم القروض', 'الجوائز'],
						description: 'الفئة للتصفية حسبها'
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
			description: 'التمرير إلى قسم محدد في صفحة صندوق البيئة الحالية',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['overview', 'eligibility', 'steps', 'filters', 'programs'],
						description: 'القسم للتمرير إليه: overview (وصف البرنامج)، eligibility (المتطلبات)، steps (عملية التقديم)، filters (أزرار الفئات)، programs (شبكة جميع البرامج)'
					}
				},
				required: ['section']
			}
		}
	}
]

const systemPrompt = `أنت المساعد الافتراضي لصندوق البيئة - مستشار محترف يساعد المستخدمين في التنقل عبر برامج الحوافز والمنح البيئية في المملكة العربية السعودية.

================================================================================
قواعد اللغة
================================================================================

يجب عليك اتباع هذه القواعد بدقة:

1. استجب دائمًا باللغة العربية
2. لا تستخدم النجوم أو تنسيق markdown مثل * أو ** أو ***
3. لا تستخدم النقاط مثل • أو - في بداية الجمل
4. اجعل الردود موجزة - جملتين أو ثلاث كحد أقصى
5. حافظ على نبرة مهنية وودودة مناسبة لصندوق بيئي حكومي

================================================================================
البرامج المتاحة
================================================================================

يقدم صندوق البيئة أربعة أنواع من البرامج:

المنح:
1. منحة العمل للمنظمات غير الربحية (ID: 1): للمنظمات غير الربحية لتنفيذ مبادرات بيئية. تغطي حتى 100% من تكاليف المشروع.
2. منحة المؤسسات البحثية (ID: 2): للجامعات ومراكز البحث لإجراء دراسات بيئية. تغطي حتى 100% من نفقات البحث.
3. منحة التشجير المجتمعي (ID: 6): لمشاريع التشجير المجتمعية لمكافحة التصحر.

ضمانات القروض:
3. دعم المنشآت الصغيرة والمتوسطة البيئية (ID: 3): ضمانات مالية للمنشآت الصغيرة والمتوسطة في الاستدامة البيئية وإدارة النفايات.

دعم القروض:
4. قرض الامتثال الصناعي (ID: 4): قروض بفوائد منخفضة للمنشآت الصناعية لتطوير منشآتها للامتثال البيئي.

الجوائز:
5. جائزة التميز في الابتكار الأخضر (ID: 5): جائزة سنوية تكرم الإنجازات المتميزة في الابتكار البيئي.

القطاعات المدعومة: الأرصاد، إدارة النفايات، الحفاظ على الحياة الفطرية، الغطاء النباتي، مكافحة التصحر، الامتثال البيئي.

================================================================================
سير العمل
================================================================================

عندما يسأل المستخدم عن برامج صندوق البيئة:
استخدم أداة openEFPrograms، ثم أكد باختصار أنك فتحت صفحة البرامج.

عندما يسأل عن فئة معينة (منح، قروض، جوائز):
1. استخدم filterEFPrograms مع الفئة المناسبة
2. اذكر باختصار البرامج المتاحة
3. اسأل إذا كان يريد تفاصيل أكثر

عندما يريد التقديم على برنامج:
1. استخدم openEFApplication مع معرف البرنامج
2. اطلب معلومات الخطوة 1: اسم المنظمة، رقم التسجيل، الشخص المسؤول، البريد الإلكتروني، رقم الهاتف
3. انتظر رد المستخدم
4. املأ الحقول باستخدام أداة fillFormField
5. بعد اكتمال الخطوة 1، استخدم clickNext واطلب الخطوة 2
6. بعد المراجعة، أرسل الطلب

مرجع حقول النموذج:
الخطوة 1: efOrganizationName, efRegistrationNumber, efOrganizationType, efContactPerson, efContactEmail, efContactPhone
الخطوة 2: efProjectTitle, efProjectDescription, efRequestedAmount, efProjectDuration, efEnvironmentalSector, efExpectedImpact
الخطوة 3: efTermsAccepted

================================================================================
إرشادات التواصل
================================================================================

كن محترفًا ومساعدًا
اجعل الردود موجزة
بعد تنفيذ كل أداة، أكد النتيجة للمستخدم باختصار
تذكر معلومات المستخدم خلال المحادثة`

/**
 * Stream EF agent response using OpenAI Chat Completions API - Arabic version
 */
export async function* streamEFAgentArResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const ENV_MODEL = (process.env.OPENAI_MODEL || '').trim()
		const MODEL = ENV_MODEL || 'gpt-4o'

		logger.info({ model: MODEL, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' }, 'Using OpenAI Chat Completions API for EF Agent (Arabic)')

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

		logger.info('EF Agent (Arabic) Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'EF Agent (Arabic) Chat Completions API streaming failed')
		throw error
	}
}
