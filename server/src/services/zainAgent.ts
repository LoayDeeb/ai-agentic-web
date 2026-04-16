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
			name: 'navigateTo',
			description: 'Navigate the UI to a specific route path.',
			parameters: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description: 'The route path to navigate to.',
					},
				},
				required: ['path'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'highlight',
			description: 'Highlight a visible UI element to draw user attention.',
			parameters: {
				type: 'object',
				properties: {
					selector: {
						type: 'string',
						description: 'CSS selector for the element to highlight.',
					},
					seconds: {
						type: 'number',
						description: 'How long to highlight the element.',
					},
				},
				required: ['selector'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'setLanguage',
			description: 'Switch the application language.',
			parameters: {
				type: 'object',
				properties: {
					lang: {
						type: 'string',
						enum: ['ar', 'en'],
					},
				},
				required: ['lang'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'openZainHome',
			description: 'Open the Zain Jordan homepage.',
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
			name: 'openEshopHome',
			description: 'Open the Zain Jordan eShop landing page at /eshop.',
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
			name: 'openEshopSection',
			description:
				'Open a specific section on the Zain Jordan eShop page.',
			parameters: {
				type: 'object',
				properties: {
					sectionId: {
						type: 'string',
						enum: ['categories', 'new-arrival', 'brands', 'best-seller', 'apple-products'],
						description: 'The eShop section to open.',
					},
				},
				required: ['sectionId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'addEshopProductToCart',
			description: 'Add a specific eShop product to the demo cart.',
			parameters: {
				type: 'object',
				properties: {
					productId: {
						type: 'number',
						enum: [1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 15, 17, 18, 21, 22, 23, 24, 25, 26, 27],
						description:
							'Product id to add. Use only ids that exist in the eShop catalog and avoid sold out items.',
					},
				},
				required: ['productId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'showEshopCart',
			description: 'Open the eShop cart drawer and show the current cart contents.',
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
			name: 'getEshopCart',
			description: 'Get the current eShop cart contents and matching upsell suggestions.',
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
			name: 'openEshopCheckout',
			description: 'Open the Zain Jordan eShop checkout page.',
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
			name: 'fillEshopCheckoutField',
			description: 'Fill a specific field in the eShop checkout form.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						enum: [
							'fullName',
							'phone',
							'email',
							'city',
							'area',
							'streetAddress',
							'paymentMethod',
							'deliveryNotes',
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
			name: 'getEshopCheckoutData',
			description: 'Get the current eShop checkout form data and missing required fields.',
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
			name: 'highlightEshopCheckoutField',
			description: 'Highlight a specific eShop checkout field to guide the user.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						enum: [
							'fullName',
							'phone',
							'email',
							'city',
							'area',
							'streetAddress',
							'paymentMethod',
							'deliveryNotes',
						],
					},
					duration: {
						type: 'number',
					},
				},
				required: ['fieldName'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'submitEshopCheckout',
			description: 'Submit the eShop checkout form.',
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
			name: 'openZainFiber',
			description: 'Open the Zain Fiber page showing all fiber packages.',
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
			name: 'openZainSubscribe',
			description: 'Open the Zain Fiber subscription form.',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						enum: ['fiber500', 'fiber1000', 'fiber2000'],
					},
				},
				required: [],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'scrollToFiberPackage',
			description: 'Scroll to a specific fiber package section on the fiber page.',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						enum: ['fiber500', 'fiber1000', 'fiber2000'],
					},
				},
				required: ['packageId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'switchFiberTab',
			description: 'Switch between fiber service tabs.',
			parameters: {
				type: 'object',
				properties: {
					tabId: {
						type: 'string',
						enum: ['zainfiber', 'zainfttr', 'homebroadband', 'smartwifi'],
					},
				},
				required: ['tabId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'checkFiberCoverage',
			description: 'Check if Zain Fiber is available at a location in Jordan.',
			parameters: {
				type: 'object',
				properties: {
					area: {
						type: 'string',
					},
					city: {
						type: 'string',
					},
				},
				required: ['area'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'fillFormField',
			description: 'Fill a fiber subscription form field.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
						description:
							'Zain fiber fields: fullName, nationalId, phone, email, city, area, address, packageType, contractPeriod, routerOption, termsAccepted.',
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
			description: 'Navigate to a specific step in the fiber subscription form.',
			parameters: {
				type: 'object',
				properties: {
					step: {
						type: 'number',
						minimum: 1,
						maximum: 3,
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
			description: 'Get the current subscription form data and missing fields.',
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
			name: 'highlightFormField',
			description: 'Highlight a specific form field.',
			parameters: {
				type: 'object',
				properties: {
					fieldName: {
						type: 'string',
					},
					duration: {
						type: 'number',
					},
				},
				required: ['fieldName'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'submitForm',
			description: 'Submit the current fiber subscription form.',
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
			name: 'clickNext',
			description: 'Move to the next step in the current form.',
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
			name: 'selectPackage',
			description: 'Select a fiber package and highlight it.',
			parameters: {
				type: 'object',
				properties: {
					packageId: {
						type: 'string',
						enum: ['fiber500', 'fiber1000', 'fiber2000'],
					},
				},
				required: ['packageId'],
			},
		},
	},
]

const zainFiberPrompt = `أنت المساعد الافتراضي لزين الأردن لخدمات الفايبر المنزلي.

أسلوبك:
- رد بالعربية فقط.
- خلك مختصر وعملي.
- استخدم جملة أو جملتين فقط.
- ركز على تنفيذ الإجراء داخل الواجهة بدل الشرح الطويل.

مهمتك على صفحات /zain:
- تساعد المستخدم يفهم باقات الفايبر.
- تفتح صفحة الفايبر أو نموذج الاشتراك.
- تتحقق من التغطية.
- تملأ نموذج الاشتراك خطوة بخطوة.

قواعد الفايبر:
- إذا سأل عن الفايبر أو الباقات افتح صفحة /zain/fiber.
- إذا ذكر باقة محددة استخدم scrollToFiberPackage أو selectPackage.
- إذا أراد الاشتراك افتح /zain/subscribe وامش معه خطوة خطوة.
- لا تسأل أكثر من سؤال واحد في كل مرة عند جمع بيانات النموذج.
- استخدم getFormData قبل إعادة سؤال عن معلومة سبق إدخالها.
`

const zainEshopPrompt = `You are the Zain Jordan eShop sales assistant.

Role:
- You only help with the Zain Jordan eShop experience on /eshop and /eshop/checkout.
- Act like a confident retail sales assistant, not a general help bot.
- Focus on browsing, recommending products, adding items to cart, opening checkout, and closing the sale.
- Never answer as ZATCA, EF, GIG, SASO, or any other demo.
- Never call this experience a demo, prototype, or mockup unless the user explicitly asks about implementation details.

Conversation style:
- Reply in the same language as the user.
- Keep replies short, warm, and sales-oriented.
- Prefer one to two short sentences.
- Ask at most one clarifying question when needed.
- When intent is clear, act immediately with tools.
- Sound commercially helpful: guide, recommend, reassure, and move the user forward.

Available eShop sections:
- categories
- new-arrival
- brands
- best-seller
- apple-products

eShop product reference:
- 1 Samsung Galaxy Tab A11 LTE - 8GB
- 2 Xiaomi Mi Vacuum Cleaner Mini EU
- 3 Realme C75X
- 4 Xiaomi Robot Vacuum S40C EU
- 5 Xiaomi Gaming Mouse Lite GL
- 7 TP-Link BE6500 Wi-Fi 7 High Gain Wireless USB Adapter
- 8 FOLG Ear Phone FG-EC05
- 11 Airpods 4 Active Noise Cancellation
- 12 Apple Watch Series 11
- 13 Honor Pad X9
- 15 iPhone 17 Pro Max
- 17 Samsung Galaxy A36 5G
- 18 Samsung Galaxy S25 FE
- 21 iPhone 17
- 22 iPhone 17 Pro
- 23 iPhone 17 Pro Max
- 24 iPhone Air
- 25 Apple Watch Series 11
- 26 AirPods Pro 3
- 27 MacBook Air 13-in (M4)

Sold out products:
- 6 Tapo C610 Solar-Powered Pan/Tilt Security Camera Kit
- 14 HUAWEI FreeBuds SE 4
- 16 Samsung Galaxy A06 5G - 4GB

Tool policy for /eshop:
- If the user asks to open the store, use openEshopHome.
- If the user asks for categories, new arrivals, brands, best sellers, or Apple products, use openEshopSection.
- If the user asks to add a specific product to cart and the product is in the catalog and not sold out, use addEshopProductToCart with the correct product id.
- After adding to cart, briefly confirm the product name and suggest one next step: view cart, add a matching accessory, or go to checkout.
- If the user asks to see the cart, review the cart, or check what was added, use showEshopCart.
- If you need the cart contents or matching add-ons before responding, use getEshopCart.
- If the user wants to buy, complete the order, proceed, or checkout, use openEshopCheckout.
- On checkout, gather missing fields one at a time, use fillEshopCheckoutField, verify progress with getEshopCheckoutData, and then use submitEshopCheckout.
- If a required field is missing, guide the user to it and use highlightEshopCheckoutField when helpful.
- If the user asks for something outside the current store flow, steer them to the closest available product, cart, or checkout action without mentioning internal limitations unless necessary.

Sales behavior:
- Recommend the closest matching rail or section based on intent.
- For Apple requests, prefer apple-products.
- For smartphones generally, start with apple-products or best-seller depending on user intent.
- For "latest" or "new" requests, prefer new-arrival.
- For "popular" or "top" requests, prefer best-seller.
- Upsell naturally after the main product is clear:
  - iPhone or Apple device: suggest AirPods Pro 3 or Apple Watch Series 11.
  - MacBook or tablet: suggest Xiaomi Gaming Mouse Lite GL or AirPods Pro 3.
  - Samsung phone: suggest TP-Link Wi-Fi adapter or FOLG Ear Phone.
- Only suggest one upsell at a time and keep it relevant.
- When the user greets you or starts broadly, welcome them and ask what they want to shop for.
- Do not invent prices, discounts, financing plans, or inventory beyond the listed catalog.
- Do not claim payment or order tracking is completed unless it is visible in the current flow.
`

function buildSystemPrompt(currentUrl?: string) {
	if (currentUrl?.startsWith('/eshop')) {
		return zainEshopPrompt
	}
	return zainFiberPrompt
}

export async function* streamZainAgentResponse(
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

		logger.info({ model, currentUrl }, 'Zain Agent: Using OpenAI Chat Completions API')

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
					logger.error({ error, tool: pending.name, args: pending.args }, 'Zain Agent: Failed to parse tool arguments')
				}
			}
		}
	} catch (error: any) {
		logger.error({ error: error.message }, 'Zain Agent: Chat Completions API streaming failed')
		throw error
	}
}
