export type EshopLang = 'ar' | 'en'

const productNameAr: Record<number, string> = {
	1: 'سامسونج جالاكسي تاب A11 LTE - 8GB',
	2: 'شاومي ميني فاكيوم كلينر EU',
	3: 'ريلمي C75X',
	4: 'شاومي روبوت فاكيوم S40C EU',
	5: 'شاومي جيمينج ماوس لايت GL',
	7: 'TP-Link BE6500 واي فاي 7 USB Adapter',
	8: 'سماعة FOLG FG-EC05',
	11: 'AirPods 4 بخاصية إلغاء الضوضاء',
	12: 'Apple Watch Series 11',
	13: 'Honor Pad X9',
	14: 'HUAWEI FreeBuds SE 4',
	15: 'iPhone 17 Pro Max',
	17: 'Samsung Galaxy A36 5G',
	18: 'Samsung Galaxy S25 FE',
	21: 'iPhone 17',
	22: 'iPhone 17 Pro',
	23: 'iPhone 17 Pro Max',
	24: 'iPhone Air',
	25: 'Apple Watch Series 11',
	26: 'AirPods Pro 3',
	27: 'MacBook Air 13-in (M4)',
}

const badgeAr: Record<string, string> = {
	'New arrival': 'وصل حديثاً',
	'Best Seller': 'الأكثر مبيعاً',
	'Top pick': 'اختيار مميز',
	'Value pick': 'خيار اقتصادي',
	'Sold Out': 'نفد المخزون',
}

export function getEshopProductName(productId: number, fallback: string, lang: EshopLang) {
	return lang === 'ar' ? productNameAr[productId] || fallback : fallback
}

export function getEshopBadgeLabel(badge: string | undefined, lang: EshopLang) {
	if (!badge) return badge
	return lang === 'ar' ? badgeAr[badge] || badge : badge
}

export const eshopCopy = {
	header: {
		en: {
			languageLabel: 'العربية',
			mainWebsite: 'Main website',
			trackOrder: 'Track order',
			logIn: 'Log in',
			register: 'Register',
			searchPlaceholder: 'Search',
			searchAria: 'Search store',
			submitSearch: 'Submit search',
			openMenu: 'Open menu',
			wishlist: 'Wishlist',
			myAccount: 'My account',
			cart: 'Shopping cart',
		},
		ar: {
			languageLabel: 'English',
			mainWebsite: 'الموقع الرئيسي',
			trackOrder: 'تتبع الطلب',
			logIn: 'تسجيل الدخول',
			register: 'إنشاء حساب',
			searchPlaceholder: 'ابحث',
			searchAria: 'ابحث في المتجر',
			submitSearch: 'تنفيذ البحث',
			openMenu: 'فتح القائمة',
			wishlist: 'المفضلة',
			myAccount: 'حسابي',
			cart: 'سلة التسوق',
		},
	},
	categories: {
		en: {
			kicker: 'Shop faster',
			title: 'Shop popular categories',
			description:
				'Pick a lane and jump straight into the products, plans, and vouchers people browse the most.',
			cardCopy: 'Explore curated items and current offers in one place.',
			names: ['Prepaid', 'Fiber', 'Smartphone', 'Postpaid', 'eVouchers'],
		},
		ar: {
			kicker: 'تسوّق أسرع',
			title: 'تسوّق حسب الفئات الأكثر طلباً',
			description:
				'اختر الفئة التي تناسبك وادخل مباشرة إلى الأجهزة والباقات والقسائم الأكثر تصفحاً.',
			cardCopy: 'اكتشف المنتجات والعروض الحالية في مكان واحد.',
			names: ['مسبق الدفع', 'الفايبر', 'الهواتف الذكية', 'الخطوط المفوترة', 'القسائم الإلكترونية'],
		},
	},
	brands: {
		en: {
			kicker: 'Trusted brands',
			title: 'Shop by brand',
			description:
				'Discover current launches, accessories, and contract-ready devices from the labels people ask for first.',
		},
		ar: {
			kicker: 'علامات موثوقة',
			title: 'تسوّق حسب العلامة التجارية',
			description:
				'اكتشف أحدث الإطلاقات والإكسسوارات والأجهزة من العلامات التي يبحث عنها العملاء أولاً.',
		},
	},
	carousel: {
		en: {
			showAll: 'Show all',
			viewDetails: 'View details',
			addToCart: 'Add to cart',
			soldOut: 'Sold Out',
		},
		ar: {
			showAll: 'عرض الكل',
			viewDetails: 'عرض التفاصيل',
			addToCart: 'أضف إلى السلة',
			soldOut: 'نفد المخزون',
		},
	},
	cart: {
		en: {
			kicker: 'Your cart',
			title: 'Selected items',
			emptyTitle: 'Your cart is empty',
			emptyCopy: 'Add a product from the eShop rails and the sales agent can walk you through the cart.',
			qty: 'Qty',
			subtotal: 'Subtotal',
			proceed: 'Proceed to checkout',
		},
		ar: {
			kicker: 'سلتك',
			title: 'المنتجات المختارة',
			emptyTitle: 'سلة التسوق فارغة',
			emptyCopy: 'أضف منتجاً من أقسام المتجر وسيساعدك المساعد في إكمال الطلب.',
			qty: 'الكمية',
			subtotal: 'المجموع الفرعي',
			proceed: 'إتمام الشراء',
		},
	},
	home: {
		en: {
			kicker: 'Zain Jordan eShop',
			title: 'Shop devices, plans, and add-ons in one polished Zain storefront.',
			description:
				'Discover the latest arrivals, browse best sellers, and build your basket with a sales assistant that can guide you all the way to checkout.',
			exploreCategories: 'Explore categories',
			viewAppleRange: 'View Apple range',
			signals: ['Secure checkout', 'Instant eVouchers', 'Flexible payment'],
			promoKicker: 'Promo stack',
			promoTitle: 'Storefront sections that feel retail-first',
			launchFocus: 'Launch focus',
			launchCopy: 'Merchandising slots for device drops, accessories, and shopping campaigns.',
			merchFlow: 'Merch flow',
			merchFlowCopy:
				'New arrivals, best sellers, audio picks, and Apple-specific inventory using reusable carousel logic.',
			quickHighlights: [
				{
					title: 'Plans & top-up',
					copy: 'Prepaid, postpaid, and recharge bundles sorted for the fastest path to purchase.',
				},
				{
					title: 'Devices & accessories',
					copy: 'Phones, tablets, smart home gear, and add-ons from the brands people already know.',
				},
				{
					title: 'Fiber & gifting',
					copy: 'Home internet, eVouchers, and giftable extras wrapped into one storefront.',
				},
			],
			sections: {
				newArrival: {
					title: 'New arrival',
					description:
						'Fresh devices, smart home gear, and newly listed accessories arranged in a launch-first rail.',
				},
				bestSeller: {
					title: 'Best seller',
					description:
						'A higher-conversion rail for the products customers return to most often.',
				},
				audio: {
					title: 'Audio picks',
					description:
						'All earphones, earbuds, and audio add-ons grouped into one clean section for easier comparison.',
				},
				apple: {
					title: 'Apple products',
					description:
						'A brand-led collection with hover image swaps and review signals for premium device browsing.',
				},
			},
			footer: {
				about:
					'Zain Jordan eShop for devices, digital vouchers, and commerce-led merchandising in one place.',
				shopTitle: 'Shop',
				shopItems: ['Smartphones', 'Fiber', 'Accessories'],
				supportTitle: 'Support',
				supportItems: ['Track order', 'Payment options', 'Account access'],
				statusTitle: 'Status',
				statusCopy: 'Shop flow with guided browsing, cart actions, and checkout support.',
			},
		},
		ar: {
			kicker: 'متجر زين الأردن الإلكتروني',
			title: 'تسوّق الأجهزة والباقات والإضافات من واجهة زين واحدة متكاملة.',
			description:
				'تعرّف على أحدث المنتجات، استعرض الأكثر مبيعاً، وابنِ سلتك مع مساعد بيع يرافقك حتى إتمام الطلب.',
			exploreCategories: 'استعرض الفئات',
			viewAppleRange: 'عرض مجموعة آبل',
			signals: ['دفع آمن', 'قسائم إلكترونية فورية', 'خيارات دفع مرنة'],
			promoKicker: 'واجهة العروض',
			promoTitle: 'أقسام متجر مصممة لتجربة شراء واضحة وسريعة',
			launchFocus: 'تركيز الإطلاقات',
			launchCopy: 'مساحات عرض للأجهزة الجديدة والإكسسوارات والحملات التسويقية.',
			merchFlow: 'مسار العرض',
			merchFlowCopy:
				'أحدث المنتجات، الأكثر مبيعاً، قسم السماعات، ومجموعة آبل ضمن أقسام قابلة لإعادة الاستخدام.',
			quickHighlights: [
				{
					title: 'الباقات والشحن',
					copy: 'مسبق الدفع، الخطوط المفوترة، وباقات الشحن مرتبة للوصول الأسرع إلى الشراء.',
				},
				{
					title: 'الأجهزة والإكسسوارات',
					copy: 'هواتف، أجهزة لوحية، ومنتجات منزل ذكي وإكسسوارات من العلامات المعروفة.',
				},
				{
					title: 'الفايبر والهدايا',
					copy: 'الإنترنت المنزلي والقسائم الإلكترونية والإضافات القابلة للإهداء ضمن واجهة واحدة.',
				},
			],
			sections: {
				newArrival: {
					title: 'وصل حديثاً',
					description:
						'أجهزة جديدة ومنتجات منزل ذكي وإكسسوارات مضافة حديثاً ضمن قسم مخصص للإطلاقات.',
				},
				bestSeller: {
					title: 'الأكثر مبيعاً',
					description:
						'قسم يركّز على المنتجات التي يعود لها العملاء باستمرار ويحقق أفضل تحويل.',
				},
				audio: {
					title: 'قسم السماعات',
					description:
						'كل السماعات السلكية واللاسلكية والإضافات الصوتية في مكان واحد للمقارنة بسهولة.',
				},
				apple: {
					title: 'منتجات آبل',
					description:
						'مجموعة مخصصة لمنتجات آبل مع عرض بصري قوي وتجربة تصفح مميزة للأجهزة الفاخرة.',
				},
			},
			footer: {
				about:
					'متجر زين الأردن للأجهزة والقسائم الرقمية وتجربة تسوق مبنية على البيع والإرشاد.',
				shopTitle: 'التسوّق',
				shopItems: ['الهواتف الذكية', 'الفايبر', 'الإكسسوارات'],
				supportTitle: 'الدعم',
				supportItems: ['تتبع الطلب', 'خيارات الدفع', 'الوصول إلى الحساب'],
				statusTitle: 'الحالة',
				statusCopy: 'تجربة تسوق متكاملة مع تصفح موجه وسلة مشتريات ودعم لإتمام الطلب.',
			},
		},
	},
	checkout: {
		en: {
			continueShopping: 'Continue shopping',
			checkout: 'Checkout',
			kicker: 'Secure checkout',
			title: 'Finish your order in one step',
			description:
				'Add your contact and delivery details, then choose the payment option that suits you.',
			fields: {
				fullName: 'Full name',
				phone: 'Phone number',
				email: 'Email address',
				city: 'City',
				area: 'Area',
				streetAddress: 'Street address',
				deliveryNotes: 'Delivery notes',
			},
			placeholders: {
				fullName: 'Enter your full name',
				phone: '07XXXXXXXX',
				email: 'name@example.com',
				city: 'Amman',
				area: 'Abdoun',
				streetAddress: 'Building, street, and apartment',
				deliveryNotes: 'Optional instructions for the courier',
			},
			paymentMethod: 'Payment method',
			paymentOptions: {
				card_online: {
					label: 'Pay online by card',
					copy: 'Fastest checkout with instant confirmation.',
				},
				cash_on_delivery: {
					label: 'Cash on delivery',
					copy: 'Pay when your order reaches you.',
				},
				card_on_delivery: {
					label: 'Card on delivery',
					copy: 'Tap to pay when the courier arrives.',
				},
			},
			deliveryCopy: 'Delivery across Jordan with contact confirmation before dispatch.',
			placeOrder: 'Place order',
			orderSummary: 'Order summary',
			itemsReady: 'items ready',
			emptyTitle: 'Your cart is empty',
			emptyCopy:
				'Go back to the store, add a few products, then come back here to complete your order.',
			backToStore: 'Back to eShop',
			subtotal: 'Subtotal',
			total: 'Total',
			recommended: 'Recommended add-ons',
			completeSetup: 'Complete the setup',
			recommendedCopy: 'Popular picks that pair naturally with what is already in your cart.',
			addThisToo: 'Add this too',
			successTitle: 'Order placed successfully',
			successThanks: 'Thanks',
			successReach: 'Your order is confirmed and our team can reach you on',
			successFallbackName: 'there',
			successFallbackPhone: 'your phone number',
			successIfNeeded: 'if anything is needed.',
			deliveryAddress: 'Delivery address',
			payment: 'Payment',
			qty: 'Qty',
		},
		ar: {
			continueShopping: 'العودة للمتجر',
			checkout: 'إتمام الشراء',
			kicker: 'دفع آمن',
			title: 'أكمل طلبك بخطوة واحدة',
			description:
				'أدخل بيانات التواصل والتوصيل ثم اختر طريقة الدفع المناسبة لك.',
			fields: {
				fullName: 'الاسم الكامل',
				phone: 'رقم الهاتف',
				email: 'البريد الإلكتروني',
				city: 'المدينة',
				area: 'المنطقة',
				streetAddress: 'العنوان التفصيلي',
				deliveryNotes: 'ملاحظات التوصيل',
			},
			placeholders: {
				fullName: 'أدخل اسمك الكامل',
				phone: '07XXXXXXXX',
				email: 'name@example.com',
				city: 'عمّان',
				area: 'عبدون',
				streetAddress: 'العمارة والشارع ورقم الشقة',
				deliveryNotes: 'أي ملاحظات إضافية للمندوب',
			},
			paymentMethod: 'طريقة الدفع',
			paymentOptions: {
				card_online: {
					label: 'الدفع أونلاين بالبطاقة',
					copy: 'أسرع خيار لإتمام الطلب مع تأكيد فوري.',
				},
				cash_on_delivery: {
					label: 'الدفع عند الاستلام نقداً',
					copy: 'ادفع عندما يصلك الطلب إلى باب المنزل.',
				},
				card_on_delivery: {
					label: 'الدفع عند الاستلام بالبطاقة',
					copy: 'ادفع بالبطاقة مباشرة عند وصول المندوب.',
				},
			},
			deliveryCopy: 'التوصيل داخل الأردن مع تأكيد التواصل قبل الإرسال.',
			placeOrder: 'تأكيد الطلب',
			orderSummary: 'ملخص الطلب',
			itemsReady: 'منتج جاهز',
			emptyTitle: 'سلة التسوق فارغة',
			emptyCopy: 'ارجع إلى المتجر وأضف بعض المنتجات ثم عد لإكمال الطلب.',
			backToStore: 'العودة للمتجر',
			subtotal: 'المجموع الفرعي',
			total: 'الإجمالي',
			recommended: 'إضافات مقترحة',
			completeSetup: 'أكمل التجهيز',
			recommendedCopy: 'منتجات يختارها العملاء عادة مع العناصر الموجودة في سلتك.',
			addThisToo: 'أضف هذا أيضاً',
			successTitle: 'تم تأكيد طلبك بنجاح',
			successThanks: 'شكراً',
			successReach: 'تم تأكيد الطلب وسيتواصل معك فريقنا على الرقم',
			successFallbackName: 'عزيزي العميل',
			successFallbackPhone: 'المسجل لديك',
			successIfNeeded: 'إذا احتجنا أي تفاصيل إضافية.',
			deliveryAddress: 'عنوان التوصيل',
			payment: 'الدفع',
			qty: 'الكمية',
		},
	},
	detail: {
		en: {
			back: 'Back to eShop',
			kicker: 'Apple product detail',
			addToCart: 'Add to cart',
			buyNow: 'Buy now',
			inTheBox: 'In the box',
			pairsWell: 'Pairs well with',
		},
		ar: {
			back: 'العودة للمتجر',
			kicker: 'تفاصيل منتج آبل',
			addToCart: 'أضف إلى السلة',
			buyNow: 'اشترِ الآن',
			inTheBox: 'محتويات العلبة',
			pairsWell: 'يناسب هذا المنتج',
		},
	},
} as const

export const detailCopyBySlug = {
	'iphone-17': {
		ar: {
			name: 'iPhone 17',
			tagline: 'فلاجشيب يومي متوازن',
			finishLabel: 'الألوان المتوفرة',
			heroDescription:
				'يوفر iPhone 17 توازناً ممتازاً بين الأداء والكاميرا وعمر البطارية لمن يريد تجربة آبل الكاملة بدون الانتقال إلى فئة Pro.',
			highlights: [
				'شاشة 6.1 إنش مريحة للاستخدام اليومي بيد واحدة.',
				'كاميرا مزدوجة تقدم صوراً واضحة في الإضاءة النهارية والداخلية.',
				'بطارية قوية للاستخدام اليومي من مراسلة وخرائط وفيديو.',
			],
			specCards: [
				{ label: 'الشاشة', value: 'شاشة Super Retina بحجم 6.1 إنش' },
				{ label: 'السعة', value: 'سعة أساسية 128 جيجابايت' },
				{ label: 'الكاميرا', value: 'نظام كاميرا مزدوجة متقدم' },
				{ label: 'البطارية', value: 'بطارية تدوم طوال اليوم' },
			],
			inTheBox: ['iPhone 17', 'سلك شحن USB-C', 'الوثائق'],
		},
	},
	'iphone-17-pro': {
		ar: {
			name: 'iPhone 17 Pro',
			tagline: 'أداء احترافي وكاميرا احترافية',
			finishLabel: 'ألوان فاخرة',
			heroDescription:
				'تم تصميم iPhone 17 Pro لمن يريد هيكل التيتانيوم الأخف، مرونة تصوير أعلى، وأداء أقوى للمحتوى والعمل والسفر.',
			highlights: [
				'نظام كاميرات احترافي للتقريب والبورتريه والتصوير الليلي.',
				'هيكل من التيتانيوم يمنح إحساساً أخف ولمسة أكثر فخامة.',
				'قدرة أعلى للألعاب والتحرير والاستخدام طويل المدى.',
			],
			specCards: [
				{ label: 'الشاشة', value: 'شاشة ProMotion بحجم 6.3 إنش' },
				{ label: 'الإطار', value: 'تصميم من التيتانيوم' },
				{ label: 'الكاميرا', value: 'نظام كاميرا ثلاثية احترافي' },
				{ label: 'الأداء', value: 'شريحة Pro عالية الكفاءة' },
			],
			inTheBox: ['iPhone 17 Pro', 'سلك شحن USB-C', 'الوثائق'],
		},
	},
} as const
