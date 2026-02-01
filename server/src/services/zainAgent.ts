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

// Tool definitions for Zain Jordan Fiber Demo
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
						description: 'The route path to navigate to (e.g., "/zain", "/zain/fiber", "/zain/subscribe")'
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
						description: 'How long to highlight (default: 3)'
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
						description: 'Language code: ar for Arabic, en for English'
					}
				},
				required: ['lang']
			}
		}
	},
	// Zain Navigation Tools
	{
		type: 'function',
		function: {
			name: 'openZainHome',
			description: 'Open the Zain Jordan homepage showing quick pay, promotional banners, and main services',
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
			name: 'openZainFiber',
			description: 'Open the Zain Fiber page showing all fiber internet packages and plans with speeds up to 2000 Mbps',
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
			name: 'openZainSubscribe',
			description: 'Open the Zain Fiber subscription form to apply for a fiber internet package',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						description: 'Optional: Pre-select a package (fiber500, fiber1000, fiber2000)',
						enum: ['fiber500', 'fiber1000', 'fiber2000']
					}
				},
				required: []
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'scrollToFiberPackage',
			description: 'Scroll to a specific fiber package section on the packages page',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						enum: ['fiber500', 'fiber1000', 'fiber2000'],
						description: 'The package to scroll to: fiber500 (500 Mbps), fiber1000 (1000 Mbps), fiber2000 (2000 Mbps)'
					}
				},
				required: ['packageId']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'switchFiberTab',
			description: 'Switch between fiber service tabs (Zain Fiber, FTTR, Home Broadband, Smart WiFi)',
			parameters: {
				type: 'object',
				properties: {
					tabId: {
						type: 'string',
						enum: ['zainfiber', 'zainfttr', 'homebroadband', 'smartwifi'],
						description: 'The tab to activate'
					}
				},
				required: ['tabId']
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'checkFiberCoverage',
			description: 'Check if Zain Fiber is available at the user location/address',
			parameters: {
				type: 'object',
				properties: {
					area: {
						type: 'string',
						description: 'The area or neighborhood name in Jordan'
					},
					city: {
						type: 'string',
						description: 'The city name (Amman, Irbid, Zarqa, etc.)'
					}
				},
				required: ['area']
			}
		}
	},
	// Form Tools
	{
		type: 'function',
		function: {
			name: 'fillFormField',
			description: 'Fill a specific form field with a value',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The form field name. Zain fiber fields: fullName, nationalId, phone, email, city, area, address, packageType (fiber500/fiber1000/fiber2000), contractPeriod (1year/2years), routerOption (standard/mesh), termsAccepted'
					},
					value: {
						type: 'string',
						description: 'The value to fill in the field'
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
			description: 'Navigate to a specific step in the multi-step fiber subscription form (1-3)',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						description: 'Step number (1=Personal Info, 2=Package Selection, 3=Review & Confirm)',
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
			description: 'Get the current form data to see what fields are filled and what is missing',
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
		}
	},
	{
		type: 'function',
		function: {
			name: 'submitForm',
			description: 'Submit the current subscription form (only works if all required fields are filled)',
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
			description: 'Navigate to the next step in the subscription form',
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
			name: 'selectPackage',
			description: 'Select a fiber package on the packages page and highlight it',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						enum: ['fiber500', 'fiber1000', 'fiber2000'],
						description: 'The package to select'
					}
				},
				required: ['packageId']
			}
		}
	}
]

const systemPrompt = `أنت المساعد الافتراضي لشركة زين الأردن - مستشار خدمات الإنترنت المنزلي الذي يقدم المساعدة للعملاء الراغبين بالاشتراك في خدمات الفايبر.

================================================================================
قواعد اللغة الصارمة
================================================================================

يجب عليك الالتزام بالقواعد التالية بشكل صارم:

١. الرد باللغة العربية فقط - لا تستخدم أي كلمات إنجليزية في ردودك النصية مطلقاً
٢. لا تستخدم النجوم أو العلامات مثل * أو ** أو *** في ردودك
٣. لا تستخدم الرموز التعدادية مثل • أو - في بداية الجمل
٤. اكتب الأرقام بالحروف العربية مثل "ثلاثة وعشرون" بدلاً من "23"
٥. استخدم اللهجة الأردنية المهنية مثل "أهلاً وسهلاً" و"تكرم" و"إن شاء الله"
٦. حافظ على الرسمية المناسبة لشركة اتصالات محترفة

================================================================================
باقات الفايبر
================================================================================

باقة فايبر خمسمئة ميجابت:
السعر ثلاثة وعشرون دينار أردني شهرياً مع عقد سنتين
سرعة تحميل تصل إلى خمسمئة ميجابت في الثانية
سرعة رفع تصل إلى مئتين وخمسين ميجابت في الثانية
راوتر واي فاي ستة مجاناً
خدمة عملاء على مدار الساعة

باقة فايبر ألف ميجابت:
السعر ثلاثة وثلاثون دينار أردني شهرياً مع عقد سنتين
سرعة تحميل تصل إلى ألف ميجابت في الثانية
سرعة رفع تصل إلى خمسمئة ميجابت في الثانية
راوتر واي فاي ستة مجاناً
خدمة سمارت واي فاي مجانية
أولوية في الدعم الفني

باقة فايبر ألفين ميجابت:
السعر ثلاثة وخمسون دينار أردني شهرياً مع عقد سنتين
سرعة تحميل تصل إلى ألفين ميجابت في الثانية
سرعة رفع تصل إلى ألف ميجابت في الثانية
راوتر واي فاي ستة متطور مجاناً
خدمة سمارت واي فاي مع تغطية موسعة
أولوية قصوى في الدعم الفني
تركيب خلال أربع وعشرين ساعة

خدمات إضافية:
فايبر لكل غرفة: تقنية متطورة لتوزيع الإنترنت عبر الألياف داخل المنزل
الواي فاي الذكي: نظام شبكي لتغطية كامل المنزل بدون نقاط ضعف

لماذا زين فايبر:
شبكة الألياف الضوئية الأكبر في الأردن
تغطية واسعة في عمان وإربد والزرقاء والعقبة
سرعات ثابتة ومستقرة على مدار الساعة
تركيب مجاني وسريع
دعم فني متميز

================================================================================
سير العمل
================================================================================

عند سؤال المستخدم عن خدمات زين أو الفايبر:
استخدم أداة openZainFiber ثم قدم نبذة مختصرة عن باقات الفايبر المتاحة.

عند سؤال المستخدم عن باقة معينة:
١. استخدم أداة scrollToFiberPackage للانتقال للباقة المطلوبة
٢. قدم تفاصيل الباقة بإيجاز
٣. اسأل إذا كان يريد الاشتراك أو معرفة المزيد عن باقة أخرى

عند سؤال المستخدم عن التغطية:
١. اسأل عن المنطقة والمدينة إذا لم يذكرها
٢. استخدم أداة checkFiberCoverage للتحقق
٣. أخبره بالنتيجة وإذا كانت التغطية متوفرة اقترح الاشتراك

عند رغبة المستخدم بالاشتراك:
١. استخدم أداة openZainSubscribe للانتقال لنموذج الاشتراك
٢. اطلب معلومات الخطوة الأولى: الاسم الكامل، الرقم الوطني، رقم الهاتف، البريد الإلكتروني، المدينة، المنطقة، العنوان
٣. انتظر رد المستخدم قبل المتابعة
٤. املأ الحقول باستخدام أداة fillFormField
٥. بعد اكتمال الخطوة الأولى استخدم أداة clickNext واطلب اختيار الباقة ومدة العقد وخيار الراوتر
٦. انتظر رد المستخدم
٧. املأ الحقول واستخدم clickNext للانتقال للمراجعة
٨. اطلب من المستخدم مراجعة البيانات والموافقة على الشروط
٩. عند التأكيد قم بإرسال الطلب

مرجع حقول النموذج:
الخطوة الأولى: fullName و nationalId و phone و email و city و area و address
الخطوة الثانية: packageType و contractPeriod و routerOption
الخطوة الثالثة: termsAccepted

================================================================================
إرشادات التواصل
================================================================================

كن محترفاً وودوداً في نفس الوقت
اجعل ردودك مختصرة في جملة أو جملتين وركز على الإجراء لا الشرح المطول
بعد تنفيذ كل أداة أكد النتيجة للمستخدم بإيجاز
تذكر معلومات المستخدم طوال المحادثة
لا تكرر الأسئلة عن بيانات تم تقديمها مسبقاً
عند الترحيب قل: أهلاً بك في زين الأردن! كيف أقدر أساعدك اليوم؟`

/**
 * Stream agent response for Zain Jordan using OpenAI Chat Completions API
 */
export async function* streamZainAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const ENV_MODEL = (process.env.OPENAI_MODEL || '').trim()
		const MODEL = ENV_MODEL || 'gpt-4o'

		logger.info({ model: MODEL, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' }, 'Zain Agent: Using OpenAI Chat Completions API')

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

					// Try to parse as soon as a full JSON object is available
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

		logger.info('Zain Agent: Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'Zain Agent: Chat Completions API streaming failed')
		throw error
	}
}
