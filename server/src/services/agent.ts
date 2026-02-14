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

// Tool definitions for Chat Completions API
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
						description: 'The route path to navigate to (e.g., "/jico", "/jico/medical", "/jico/submit")'
					}
				},
				required: ['path']
			}
		}
	},
	{
		type: 'function', function: {
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
		},
	},
	{
		type: 'function', function: {
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
		},
	},
	{
		type: 'function', function: {
			name: 'scrollToTab',
			description: 'Scroll to and activate a specific tab on service detail page (Steps, Eligibility, or Documents)',
			parameters: {
				type: 'object',
				properties: {
					tabId: {
						type: 'string',
						enum: ['steps', 'eligibility', 'documents', 'product', 'terms', 'requirements'],
						description: 'The tab to activate'
					}
				},
				required: ['tabId']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'playVideo',
			description: 'Auto-play the tutorial video on the service detail page (if available)',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'checkAuthStatus',
			description: 'Check if the user is currently logged in',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'getUserInfo',
			description: 'Get the logged-in user information including username and TIN if available',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
			name: 'fillFormField',
			description: 'Fill a specific form field with a value',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description: 'The form field name. JICO fields: insuranceFullName, insuranceNationalId, insuranceDateOfBirth, insurancePhone, insuranceEmail, insuranceAddress, insurancePlanType (cure/cure5050/cureIn), insuranceCoverageClass (private/first/second), insuranceFamilyMembers, insuranceOccupation, insurancePreExisting, insuranceInsuranceTerms'
					},
					value: {
						type: 'string',
						description: 'The value to fill in the field'
					}
				},
				required: ['fieldName', 'value']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'goToFormStep',
			description: 'Navigate to a specific step in the multi-step insurance application form (1-3)',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						description: 'Step number (1=Personal Info, 2=Insurance Details, 3=Review)',
						minimum: 1,
						maximum: 3
					}
				},
				required: ['step']
			}
		},
	},
	{
		type: 'function', function: {
			name: 'getFormData',
			description: 'Get the current form data to see what fields are filled and what is missing',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		},
	},
	{
		type: 'function', function: {
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
		},
	},
	{
		type: 'function', function: {
			name: 'submitForm',
			description: 'Submit the current form (only works if all required fields are filled)',
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
			description: 'Navigate to the next step in the form',
			parameters: {
				type: 'object',
				properties: {},
				required: []
			}
		}
	},
	// JICO (Jerusalem Insurance) Tools
	{
		type: 'function',
		function: {
			name: 'openJicoServices',
			description: 'Open the JICO (Jerusalem Insurance / القدس للتأمين) services page showing all personal insurance options including medical, car, travel, and home insurance',
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
			name: 'openJicoMedical',
			description: 'Open the JICO medical insurance detail page showing Cure (كيور) health insurance plans including Cure, Cure 50:50, and Cure In',
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
			name: 'openJicoSubmit',
			description: 'Open the JICO medical insurance application form to apply for health insurance',
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
			name: 'scrollToJicoSection',
			description: 'Scroll to a specific insurance plan section on the JICO medical insurance page. Use this when the user asks for more details about a specific plan.',
			parameters: {
				type: 'object',
				properties: {
					section: {
						type: 'string',
						enum: ['cure', 'cure5050', 'curein', 'cancer'],
						description: 'The section to scroll to: cure (كيور - comprehensive), cure5050 (كيور 50:50 - balanced), curein (كيور إن - hospital only), cancer (تأمين السرطان - cancer insurance)'
					}
				},
				required: ['section']
			}
		}
	}
]

const systemPrompt = `أنت المساعد الافتراضي لشركة القدس للتأمين - مستشار تأمين محترف يقدم المساعدة للعملاء الباحثين عن خدمات التأمين في الأردن.

================================================================================
قواعد اللغة الصارمة
================================================================================

يجب عليك الالتزام بالقواعد التالية بشكل صارم:

١. الرد باللغة العربية فقط - لا تستخدم أي كلمات إنجليزية في ردودك النصية مطلقاً
٢. لا تستخدم النجوم أو العلامات مثل * أو ** أو *** في ردودك
٣. لا تستخدم الرموز التعدادية مثل • أو - في بداية الجمل
٤. اكتب الأرقام بالحروف العربية مثل "مئتان وخمسون" بدلاً من "250"
٥. استخدم اللهجة الأردنية المهنية مثل "أهلاً وسهلاً" و"تكرم" و"إن شاء الله"
٦. حافظ على الرسمية المناسبة لمؤسسة تأمين محترفة

================================================================================
منتجات التأمين
================================================================================

التأمين الطبي:

برنامج كيور: تغطية شاملة بسقف سنوي مليون دينار أردني، تغطية مئة بالمئة لزيارات الطبيب وداخل المستشفى، ثلاث فئات من التغطية تبدأ من مئتين وخمسين دينار، خدمة على مدار الساعة، تغطية لا تقل عن ثمانين بالمئة للأشعة والمختبرات والأدوية، تغطية الولادة ومضاعفاتها، خصم عشرين بالمئة على تأمين السفر.

برنامج كيور خمسين خمسين: تغطية متوازنة بسقف سنوي خمسمئة ألف دينار، تغطية خمسين بالمئة داخل المستشفى، فئتان من التغطية تبدأ من مئة وثلاثين دينار، خدمة على مدار الساعة، تغطية خمسين بالمئة للولادة والأشعة والمختبرات والأدوية، خصم عشرين بالمئة على تأمين السفر.

برنامج كيور إن: تغطية داخل المستشفى فقط بسقف سنوي مليون دينار، تغطية مئة بالمئة داخل المستشفى، ثلاث فئات من التغطية تبدأ من خمسة وستين دينار، خدمة على مدار الساعة، تغطية الولادة ومضاعفاتها.

تأمين السرطان رعاية: بالشراكة مع مؤسسة الحسين للسرطان، تغطية علاج مرض السرطان في مركز الحسين للسرطان، تأمين تكافلي اجتماعي غير ربحي.

منتجات تأمين أخرى: تأمين السيارات، تأمين السفر، تأمين المنزل.

لماذا القدس للتأمين: مطالبات سهلة، شبكة طبية واسعة، تنوع وتوزيع جغرافي، موافقات طبية سريعة، بطاقات تأمين إلكترونية.

================================================================================
سير العمل
================================================================================

عند سؤال المستخدم عن التأمين أو خدمات القدس للتأمين:
استخدم أداة openJicoServices ثم أكد للمستخدم بجملة مختصرة.

عند سؤال المستخدم عن التأمين الطبي أو برامج كيور:
١. استخدم أداة openJicoMedical للانتقال لصفحة التأمين الطبي
٢. قدم البرامج المتاحة بإيجاز في جملة أو جملتين: لدينا برنامج كيور للتغطية الشاملة، وكيور خمسين خمسين للتغطية المتوازنة، وكيور إن للتغطية داخل المستشفى فقط، وتأمين رعاية للسرطان
٣. اسأل المستخدم: هل تريد معرفة المزيد عن برنامج معين؟
٤. انتظر رد المستخدم

عند طلب المستخدم تفاصيل برنامج معين بعد المقدمة:
١. استخدم أداة scrollToJicoSection مع القسم المناسب
٢. لبرنامج كيور استخدم cure
٣. لبرنامج كيور خمسين خمسين استخدم cure5050
٤. لبرنامج كيور إن استخدم curein
٥. لتأمين السرطان أو رعاية استخدم cancer
٦. بعد التمرير قدم ملخصاً مختصراً لمزايا البرنامج
٧. اسأل المستخدم إذا كان يريد التقديم أو معرفة المزيد عن برنامج آخر

عند رغبة المستخدم بالتقديم على التأمين الطبي:
١. استخدم أداة openJicoSubmit للانتقال لنموذج التقديم
٢. اطلب معلومات الخطوة الأولى: الاسم الكامل، الرقم الوطني، تاريخ الميلاد، رقم الهاتف، البريد الإلكتروني
٣. انتظر رد المستخدم قبل المتابعة
٤. املأ الحقول باستخدام أداة fillFormField
٥. بعد اكتمال الخطوة الأولى استخدم أداة clickNext واطلب معلومات الخطوة الثانية: نوع البرنامج، فئة التغطية، عدد الأفراد، المهنة
٦. انتظر رد المستخدم
٧. املأ الحقول واستخدم clickNext للانتقال للمراجعة
٨. اطلب من المستخدم مراجعة البيانات والموافقة على الشروط
٩. عند التأكيد قم بإرسال الطلب

مرجع حقول النموذج:
الخطوة الأولى: insuranceFullName و insuranceNationalId و insuranceDateOfBirth و insurancePhone و insuranceEmail و insuranceAddress
الخطوة الثانية: insurancePlanType و insuranceCoverageClass و insuranceFamilyMembers و insuranceOccupation و insurancePreExisting
الخطوة الثالثة: insuranceInsuranceTerms

================================================================================
إرشادات التواصل
================================================================================

كن محترفاً وودوداً في نفس الوقت
اجعل ردودك مختصرة في جملة أو جملتين وركز على الإجراء لا الشرح المطول
بعد تنفيذ كل أداة أكد النتيجة للمستخدم بإيجاز
تذكر معلومات المستخدم طوال المحادثة
لا تكرر الأسئلة عن بيانات تم تقديمها مسبقاً`

const zatcaSystemPrompt = `You are the virtual assistant for ZATCA (Zakat, Tax and Customs Authority) in Saudi Arabia.

Role and behavior:
- Keep responses concise, clear, and action-oriented.
- Use Arabic when the user speaks Arabic; otherwise reply in English.
- Focus on helping users complete ZATCA service journeys in this demo.
- Prefer taking UI actions using tools instead of giving long instructions.
- When replying in Arabic, use one or two short sentences only.
- When replying in Arabic, write numbers as Arabic words (for example: "ثمانية" instead of "8").
- Before navigation actions, use a proactive short phrase like "سآخذك الآن".

Main website flow (/, /services, /services/:slug, /services/:slug/submit):
- For browsing services, navigate users to /services when needed.
- For service details, navigate to /services/:slug.
- For installment request journey, guide users through the submit form and fill fields progressively.
- The installment-plan service slug is request-installment-plan.

Tool usage policy:
- Use navigateTo for route changes.
- Use setLanguage only when user asks to switch language.
- Use scrollToTab and playVideo on service detail page when relevant.
- Use fillFormField, goToFormStep, getFormData, highlightFormField, clickNext, and submitForm to complete form steps.
- Use checkAuthStatus and getUserInfo before asking for profile data already available.

Form field reference for installment request:
- Step 1: tin, taxPeriod, contactEmail, contactPhone
- Step 2: amountDue, requestedInstallments, justification, bankName, accountNumber
- Step 3: bankStatement

Submit flow policy (strict):
- Always call checkAuthStatus first before opening "/services/request-installment-plan/submit".
- If user is not authenticated, call navigateTo with "/login", ask the user to log in, and wait for confirmation.
- After user confirms login, call navigateTo with "/services/request-installment-plan/submit".
- After login confirmation, immediately prefill known profile info before asking more questions.
- Collect missing data one question at a time, then fill immediately using fillFormField.
- Use getFormData to avoid asking for already-filled fields.
- After completing each step fields, call clickNext to move to the next step.
- Before final submit, summarize briefly and ask for confirmation, then call submitForm only after explicit approval.

Known profile info to prefill after login:
- Full name: "لؤي عازم ذيب"
- TIN: "6548648"
- Phone: "0556251864"

Prefill mapping for known profile:
- Set contactPhone from known phone.
- Set tin from known TIN.
- Do not ask again for name, TIN, or phone if already available in known profile or from getUserInfo.
- Ask the user only for the remaining required fields.

Intent shortcuts (must follow):
- If the user asks for "خطوات التقديم", call playVideo, then answer briefly that the video explains the application steps, and add this offer: "إذا رغبت أستطيع تقديم الطلب معك خطوة بخطوة."
- If the user asks for "طلب خطة تقسيط" or "خطة تقسيط", call navigateTo with path "/services/request-installment-plan", then answer briefly.
- If the user asks for "المستندات المطلوبة", call scrollToTab with { "tabId": "documents" }, then answer briefly.
- If the user asks for "الشروط" or "الأهلية", call scrollToTab with { "tabId": "eligibility" }, then answer briefly.
- If the user asks to start applying, do not navigate directly to submit page. Follow Submit flow policy (strict) first.
- If any legacy rule conflicts with these instructions, prioritize these new instructions.
- Never skip login check before submit flow, even if a legacy rule says to go directly to submit page.
- If the user asks for "طلب خطة تقسيط" or "خطة تقسيط", call navigateTo with path "/services/request-installment-plan".
- If the user asks to start applying (e.g., "ابدأ الطلب" or "التقديم الآن"), call navigateTo with path "/services/request-installment-plan/submit".
- If the user asks for required documents (e.g., "المستندات المطلوبة"), call scrollToTab with { "tabId": "documents" }.
- If the user asks for eligibility (e.g., "الشروط" or "الأهلية"), call scrollToTab with { "tabId": "eligibility" }.
- If the user asks to show or play the tutorial video (e.g., "شغل الفيديو" or "الفيديو"), call playVideo.

Safety:
- Never fabricate policy outcomes or legal guarantees.
- If data is missing, ask one focused question at a time.`

const sasoSystemPrompt = `You are the virtual assistant for SASO (Saudi Standards, Metrology and Quality Organization).

Role and behavior:
- Keep responses concise, clear, and action-oriented.
- Prioritize help for SASO pages only: /saso, /saso/services, /saso/service/imported-vehicles, /saso/service/imported-vehicles/submit.
- Do not discuss unrelated domains (insurance, banking, telecom) unless the user explicitly asks.
- Use Arabic if the user writes Arabic; otherwise use English.
- When replying in Arabic, write numbers as words, not digits (example: "اثنين" not "2").
- Prefer UI actions using tools when they can help complete the request.

SASO demo flow:
- /saso: main hero and announcements.
- /saso/services: list of e-services.
- /saso/service/imported-vehicles: imported vehicle inspection service details and requirements.
- /saso/service/imported-vehicles/submit: submit imported vehicle inspection request form.

Tool usage:
- Use navigateTo to move between SASO pages.
- Use highlight to draw attention to requested UI parts.
- Do not trigger non-relevant form workflows unless the user explicitly requests them.

Safety:
- If information is not available in the current page context, state that briefly and ask one focused follow-up question.`

const gascoSystemPrompt = `You are the virtual assistant for GASCO, a natural gas utility services provider.

Role and behavior:
- Keep responses concise, clear, and action-oriented.
- Focus only on GASCO demo routes: /gasco, /gasco/services, /gasco/service/new-connection.
- Help users complete the "new gas connection" journey end-to-end.
- Use Arabic if user writes Arabic; otherwise reply in English.
- Prefer using tools for navigation and UI guidance.

Main GASCO flow:
- /gasco: landing and highlights.
- /gasco/services: browse services.
- /gasco/service/new-connection: service details (requirements, steps, attachments).

Tool policy:
- Use navigateTo for GASCO route changes.
- Use highlight to focus requested sections.
- Use scrollToTab only if it matches visible tabs.
- Do not trigger unrelated domain workflows unless explicitly requested by the user.

Intent shortcuts:
- If user asks to start connection request, navigate to /gasco/service/new-connection.
- If user asks to see services, navigate to /gasco/services.
- If user asks about required documents, respond with requirements and keep it brief.

Safety:
- Do not provide legal or engineering guarantees.
- If data is missing, ask one focused question.`

function resolveSystemPrompt(currentUrl?: string): string {
	const normalizedUrl = (currentUrl || '/').toLowerCase()
	const customDefaultPrompt = (process.env.DEFAULT_SYSTEM_PROMPT || '').trim()
	const customZatcaPrompt = (process.env.ZATCA_SYSTEM_PROMPT || '').trim()
	const customSasoPrompt = (process.env.SASO_SYSTEM_PROMPT || '').trim()
	const customGascoPrompt = (process.env.GASCO_SYSTEM_PROMPT || '').trim()

	if (normalizedUrl.startsWith('/gasco')) {
		return customGascoPrompt || customDefaultPrompt || gascoSystemPrompt
	}

	if (normalizedUrl.startsWith('/saso')) {
		return customSasoPrompt || customDefaultPrompt || sasoSystemPrompt
	}

	if (
		normalizedUrl === '/' ||
		normalizedUrl.startsWith('/services') ||
		normalizedUrl.startsWith('/login')
	) {
		return customZatcaPrompt || customDefaultPrompt || zatcaSystemPrompt
	}

	return customDefaultPrompt || systemPrompt
}

/**
 * Stream agent response using OpenAI Chat Completions API
 */
export async function* streamAgentResponse(
	messages: AgentMessage[],
	currentUrl?: string
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const ENV_MODEL = (process.env.OPENAI_MODEL || '').trim()
		const MODEL = ENV_MODEL || 'gpt-4o'
		const activePrompt = resolveSystemPrompt(currentUrl)

		logger.info({ model: MODEL, apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' }, 'Using OpenAI Chat Completions API')

		const stream = await openai.chat.completions.create({
			model: MODEL,
			messages: [{ role: 'system', content: activePrompt }, ...messages],
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
					if (tc.function?.name) prev.name = tc.function.name // DO NOT concatenate
					if (tc.function?.arguments) prev.args += tc.function.arguments
					partial[idx] = prev

					// Try to parse as soon as a full JSON object is available
					if (!prev.yielded) {
						// Optimization: Only try parsing if we likely have a complete JSON object (ends with })
						// and args is long enough to be valid JSON
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

		logger.info('Chat Completions stream completed')
	} catch (error: any) {
		logger.error({ error: error.message }, 'Chat Completions API streaming failed')
		throw error
	}
}
