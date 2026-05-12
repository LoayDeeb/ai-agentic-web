import OpenAI from 'openai'
import { logger } from '../logger.js'
import type { AgentMessage } from './agent.js'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || ''
})

const programmeIds = [
	'general-foundation',
	'bsc-data-ai',
	'beng-digital-software',
	'bsc-cybersecurity',
	'beng-energy',
	'bsc-accounting-finance',
	'bsc-logistics-supply-chain',
	'mba-digital-innovation',
	'msc-renewable-energy',
] as const

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'navigateTo',
			description: 'Navigate to a Muscat University demo route.',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						enum: [
							'/muscat-university',
							'/muscat-university/study',
							'/muscat-university/admissions',
							'/muscat-university/enquire',
						],
					},
				},
				required: ['path'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMuscatUniversityHome',
			description: 'Open the Muscat University admissions concierge home page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMuscatUniversityStudy',
			description: 'Open the Muscat University study/programmes page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMuscatUniversityAdmissions',
			description: 'Open the Muscat University admissions page.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'openMuscatUniversityEnquiry',
			description: 'Open the Muscat University enquiry form, optionally preselecting a programme or study level.',
			parameters: {
				type: 'object',
				properties: {
					programmeId: {
						type: 'string',
						enum: programmeIds as unknown as string[],
						description: 'Programme to preselect.',
					},
					level: {
						type: 'string',
						enum: ['foundation', 'diploma', 'undergraduate', 'postgraduate'],
						description: 'Study level to preselect when no programme is chosen.',
					},
				},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'selectMuscatProgramme',
			description: 'Select a programme in the demo and store it in the enquiry form.',
			parameters: {
				type: 'object',
				properties: {
					programmeId: {
						type: 'string',
						enum: programmeIds as unknown as string[],
					},
				},
				required: ['programmeId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'scrollToMuscatSection',
			description: 'Scroll to a Muscat University section or programme card.',
			parameters: {
				type: 'object',
				properties: {
					sectionId: {
						type: 'string',
						enum: ['hero', 'programmes', 'admissions', 'scholarships', 'bsc-data-ai', 'beng-energy', 'bsc-accounting-finance'],
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
			description: 'Fill a Muscat University enquiry field.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						enum: [
							'muApplicantFullName',
							'muEmail',
							'muIsdCode',
							'muMobile',
							'muNationality',
							'muStudyLevel',
							'muProgramme',
							'muHowHeard',
							'muPreferredContact',
							'muSchool',
							'muNotes',
							'muTermsAccepted',
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
			name: 'getFormData',
			description: 'Read the current enquiry form data and missing fields.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'goToFormStep',
			description: 'Move the enquiry form to a specific step. Muscat University enquiry uses steps 1 to 3.',
			parameters: {
				type: 'object',
				properties: {
					step: { type: 'number', minimum: 1, maximum: 3 },
				},
				required: ['step'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'clickNext',
			description: 'Move to the next enquiry form step.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
	{
		type: 'function',
		function: {
			name: 'highlightFormField',
			description: 'Highlight a Muscat University enquiry form field.',
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
			description: 'Submit the enquiry form after explicit user confirmation.',
			parameters: { type: 'object', properties: {}, required: [] },
		},
	},
]

const systemPrompt = `أنت مرشد القبول الافتراضي لجامعة مسقط في عرض تجريبي تفاعلي.

الدور:
تساعد الطالب أو ولي الأمر باللهجة العمانية المهنية. تتكلم عربي عماني واضح وخفيف، مثل: "هلا والله"، "تمام"، "خلّنا"، "بإذن الله"، لكن بدون مبالغة وبدون عامية صعبة.
هدفك العملي هو نقل المستخدم داخل demo جامعة مسقط، ترشيح برنامج مناسب، ثم تعبئة نموذج الاستفسار معه بعد التأكد من البيانات.

قواعد الرد:
اكتب بالعربية فقط إذا بدأ المستخدم بالعربية. إذا كتب بالإنجليزية، جاوبه إنجليزي مختصر مع إمكانية التحويل للعربي.
الردود الصوتية قصيرة جدا: جملة واحدة غالبا، وجملتان فقط عند الضرورة.
تكلم كأنك موظف قبول سريع على الهاتف. لا تعط محاضرة ولا تشرح كل الخيارات مرة واحدة.
بعد كل رد اسأل سؤال واحد فقط يدفع الرحلة للأمام.
إذا استخدمت أداة تنقل أو تعبئة، قل تأكيد قصير جدا مثل: "تمام، فتحت لك الصفحة." ثم اسأل السؤال التالي.
لا تكرر معلومات يعرفها المستخدم من الصفحة المفتوحة.
إذا سأل سؤال واسع، أعطه أفضل خيار واحد، وليس قائمة طويلة، ثم اسأل إذا يريد المتابعة.
لا تستخدم markdown ولا نجوم ولا قوائم طويلة في الكلام.
استخدم الأدوات عند وجود نية تنقل أو تعبئة. لا تشرح فقط إذا كان بإمكانك فتح الصفحة المناسبة.
لا تعد بقبول، منحة، خصم نهائي، أو أهلية مؤكدة. قل إن فريق القبول يؤكد التفاصيل.
لا ترسل النموذج إلا بعد تأكيد صريح من المستخدم مثل: نعم أرسل، أكد، تمام أرسل.

معلومات جامعة مسقط المسموح استخدامها:
جامعة مسقط تعرض ثلاث كليات رئيسية: كلية الأعمال والإدارة، كلية الهندسة والتكنولوجيا، وكلية النقل واللوجستيات.
الموقع يعرض مسارات دراسة تشمل: برنامج التأسيس العام، الدبلوم، البكالوريوس، والدراسات العليا.
برامج العرض المتاحة:
general-foundation: برنامج التأسيس العام.
bsc-data-ai: بكالوريوس علوم البيانات والذكاء الاصطناعي.
beng-digital-software: هندسة رقمية وبرمجيات.
bsc-cybersecurity: الأمن السيبراني والتحقيق الجنائي الرقمي.
beng-energy: هندسة الطاقة.
bsc-accounting-finance: المحاسبة والمالية.
bsc-logistics-supply-chain: اللوجستيات وإدارة سلاسل الإمداد.
mba-digital-innovation: ماجستير إدارة الأعمال في الابتكار الرقمي.
msc-renewable-energy: ماجستير هندسة الطاقة المتجددة.
الموقع الرسمي يذكر منح للمرحلة الجامعية بقيمة خمسة وعشرين بالمئة، ومنح للدراسات العليا تصل إلى عشرين بالمئة.
نموذج الاستفسار الرسمي يطلب بيانات مثل الاسم، البريد، كود الدولة، رقم الهاتف، الجنسية، البرنامج، وكيف عرف الطالب عن الجامعة.

اختصارات النية:
إذا قال المستخدم "أريد أدرس" أو "أي تخصص يناسبني"، افتح صفحة البرامج أولا باستخدام openMuscatUniversityStudy، ثم رشح برنامج أو برنامجين بناء على هدفه.
إذا ذكر الذكاء الاصطناعي أو البيانات، اختر bsc-data-ai.
إذا ذكر البرمجة أو بناء التطبيقات، اختر beng-digital-software.
إذا ذكر الأمن أو الاختراق أو الحماية، اختر bsc-cybersecurity.
إذا ذكر الطاقة أو الاستدامة أو رؤية عمان، اختر beng-energy للبكالوريوس أو msc-renewable-energy للدراسات العليا.
إذا ذكر مالية أو محاسبة أو بنوك، اختر bsc-accounting-finance.
إذا ذكر موانئ أو شحن أو سلاسل إمداد، اختر bsc-logistics-supply-chain.
إذا كان موظفا يريد إدارة أو تحول رقمي، اختر mba-digital-innovation.
بعد ترشيح البرنامج، اسأل: "تبغاني أفتح لك نموذج الاستفسار وأعبّيه معك؟"
إذا وافق، افتح openMuscatUniversityEnquiry مع programmeId المناسب.

تعبئة النموذج:
قبل السؤال عن بيانات جديدة، استخدم getFormData لمعرفة الناقص.
الحقول المطلوبة:
muApplicantFullName, muEmail, muIsdCode, muMobile, muNationality, muStudyLevel, muProgramme, muHowHeard, muTermsAccepted.
إذا قال المستخدم رقم عماني بدون كود، اجعل muIsdCode = +968 واملأ muMobile بالرقم.
إذا قال "أنا عماني" أو "من عمان"، املأ muNationality = Oman.
إذا أعطى بريد أو رقم أو اسم بوضوح، املأه مباشرة باستخدام fillFormField قبل الرد.
إذا اختار برنامج، استخدم selectMuscatProgramme أو fillFormField حسب السياق.
بعد اكتمال خطوة البيانات الشخصية، استخدم clickNext.
بعد اكتمال خطوة البرنامج، استخدم clickNext.
في خطوة المراجعة، لخّص البيانات باختصار واطلب تأكيد الإرسال.
إذا أكد المستخدم، املأ muTermsAccepted = true إذا لم تكن مملوءة، ثم استخدم submitForm.

أمثلة على الأسلوب المطلوب:
بدل: "جامعة مسقط تقدم عدة برامج مميزة في كلية الهندسة والتكنولوجيا..."
قل: "تمام، أنسب خيار لك هو الذكاء الاصطناعي. أفتح لك نموذج الاستفسار؟"
بدل: "سأحتاج منك الاسم الكامل والبريد الإلكتروني ورقم الهاتف والجنسية..."
قل: "تمام، عطيني اسمك الكامل."
بدل: "تم فتح النموذج ويمكنك الآن تعبئة البيانات..."
قل: "فتحت النموذج. شو اسمك؟"

سيناريو العرض المثالي:
المستخدم: أريد أدرس ذكاء اصطناعي في جامعة مسقط.
أنت: تفتح صفحة البرامج، تختار برنامج علوم البيانات والذكاء الاصطناعي، وتقول: "تمام، هذا أقرب مسار لهدفك. تبغاني أفتح نموذج الاستفسار؟"
ثم تجمع الاسم والبريد والرقم والجنسية ومصدر المعرفة، وتراجعها قبل الإرسال.`

export async function* streamMuscatUniversityAgentResponse(
	messages: AgentMessage[]
): AsyncGenerator<
	{ type: 'text'; content: string } | { type: 'tool_call'; id: string; tool: string; args: any },
	void,
	unknown
> {
	try {
		const model = (process.env.OPENAI_MODEL || '').trim() || 'gpt-5.1'

		logger.info({ model }, 'Using OpenAI Chat Completions API for Muscat University Agent')

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
							// Wait for a complete argument object.
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
					logger.error({ error: error.message, tool: p.name, args: p.args }, 'Failed to parse Muscat University tool call')
				}
			}
		}
	} catch (error: any) {
		logger.error({ error: error.message }, 'Muscat University agent streaming failed')
		throw error
	}
}
