import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ClipboardCheck, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react'
import { GigHeaderTopBar, GigLogoBackground, GigNavMenuButton } from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'

type ProductItem = {
	name: string
	summary: string
	bullets?: string[]
}

type InsuranceDetail = {
	title: string
	family: string
	description: string
	bestFor: string
	advisorNote: string
	officialUrl: string
	highlights: string[]
	products: ProductItem[]
}

const insuranceCatalog: Record<string, InsuranceDetail> = {
	medical_category: {
		title: 'التأمينات الطبية',
		family: 'التأمين الطبي (جماعي / فردي)',
		description:
			'هذا المسار يعرض برامج التأمين الطبي للأفراد والعائلات والشركات كما تظهر ضمن تصنيفات GIG الأردن.',
		bestFor: 'من يريد حماية صحية شاملة ومقارنة برامج طبية قبل التقديم.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/167/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9',
		highlights: [
			'برامج فردية وعائلية متعددة بنفس المسار',
			'يشمل مسار جماعي للشركات والمؤسسات',
			'يتضمن برامج طبية دولية ضمن نفس العائلة التأمينية'
		],
		products: [
			{ name: 'عائلتي (Unlimited coverage)', summary: 'برنامج عائلي بتغطية موسعة ضمن المسار الطبي الفردي.' },
			{ name: 'عائلتي (داخل المستشفى)', summary: 'تركيز أعلى على تغطيات خدمات الإدخال والعلاج داخل المستشفى.' },
			{ name: 'عائلتي داخل وخارج المستشفى', summary: 'تغطية متوازنة لحالات داخل وخارج المستشفى.' },
			{ name: 'برنامج أمان', summary: 'خيار طبي ضمن برامج الأفراد والعائلات.' },
			{ name: 'برنامج ابتسامتي', summary: 'برنامج طبي إضافي ضمن فئة التأمين الطبي الفردي.' },
			{ name: 'برنامج رويال', summary: 'برنامج طبي بمستوى تغطية متقدم ضمن فئة الأفراد.' },
			{ name: 'BUPA Global', summary: 'خيار التأمين الطبي الدولي ضمن عائلة المنتجات الطبية.' },
			{ name: 'التأمين الطبي الدولي 360', summary: 'مسار طبي دولي إضافي ضمن نفس التصنيف.' }
		]
	},
	medical_online_individual_family: {
		title: 'تأمين طبي (فردي وعائلي) إلكتروني',
		family: 'الخدمات الإلكترونية الطبية',
		description: 'مسار رقمي للتقديم على التأمين الطبي الفردي والعائلي.',
		bestFor: 'من يريد بدء الطلب بسرعة عبر القناة الإلكترونية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=21&locale=ar',
		highlights: ['طلب إلكتروني', 'مسار مناسب للعميل الفردي أو العائلة', 'ينتقل لاحقا لمرحلة المتابعة'],
		products: [{ name: 'خدمة التأمين الطبي الإلكتروني', summary: 'طلب رقمي للفرد والعائلة عبر بوابة الخدمات الإلكترونية.' }]
	},
	life_individual: {
		title: 'تأمين الحياة الفردي',
		family: 'التأمين على الحياة',
		description: 'حلول حماية مالية للأفراد ضمن منتجات الحياة الفردية.',
		bestFor: 'من يريد حماية دخل الأسرة أو تغطية المخاطر طويلة الأجل.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/412/Individual-Life-Insurance',
		highlights: ['تركيز على الأفراد', 'مناسب للتخطيط المالي', 'خيارات متعددة داخل نفس المسار'],
		products: [
			{ name: 'برنامج حماية دخل الأسرة 50-50', summary: 'حماية دخل الأسرة ضمن برامج الحياة الفردية.' },
			{ name: 'برنامج تأمين الحياة المؤقت', summary: 'تغطية حياة لفترة محددة.' },
			{ name: 'برنامج الأمراض المستعصية', summary: 'تغطية مرتبطة بمخاطر الأمراض المستعصية.' }
		]
	},
	life_group: {
		title: 'تأمين الحياة الجماعي',
		family: 'التأمين على الحياة للشركات',
		description: 'مسار مخصص للشركات لحماية الموظفين ضمن تغطية جماعية.',
		bestFor: 'الشركات والمؤسسات الباحثة عن مزايا تأمينية جماعية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/411/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%AC%D9%85%D8%A7%D8%B9%D9%8A-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D8%A7%D9%84%D8%AE%D8%A7%D8%B5-%D8%A8%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA',
		highlights: ['مصمم للجهات', 'تغطية موظفين', 'مسار استشاري للشركات'],
		products: [{ name: 'الحياة الجماعي للشركات', summary: 'برنامج جماعي مرتبط بمتطلبات جهة العمل.' }]
	},
	motor_comprehensive: {
		title: 'تأمين المركبات شامل / تكميلي',
		family: 'تأمين المركبات',
		description: 'مسار حماية المركبات ضمن الشامل أو التكميلي.',
		bestFor: 'من يحتاج حماية أوسع للمركبة.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/219/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%A8%D8%A7%D8%AA-%D8%B4%D8%A7%D9%85%D9%84---%D8%AA%D9%83%D9%85%D9%8A%D9%84%D9%8A',
		highlights: ['للأفراد', 'حماية مركبة أوسع', 'قابل للربط بخدمات إلكترونية'],
		products: [{ name: 'تأمين المركبات شامل/تكميلي', summary: 'المنتج الأساسي ضمن هذه الفئة.' }]
	},
	motor_online_new: {
		title: 'تأمين مركبة جديدة (إلكتروني)',
		family: 'الخدمات الإلكترونية للمركبات',
		description: 'مسار إلكتروني مخصص لإصدار تأمين لمركبة جديدة.',
		bestFor: 'من يريد الإصدار الرقمي السريع.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/quote/motor-issuance?cmsId=28&linkingId=null',
		highlights: ['إصدار رقمي', 'مركبة جديدة', 'خطوات أسرع'],
		products: [{ name: 'خدمة إصدار مركبة جديدة', summary: 'طلب وإصدار وثيقة للمركبة الجديدة عبر القناة الإلكترونية.' }]
	},
	motor_online_renew: {
		title: 'تجديد تأمين المركبات (إلكتروني)',
		family: 'الخدمات الإلكترونية للمركبات',
		description: 'تجديد وثائق المركبات عبر المسار الإلكتروني.',
		bestFor: 'من لديه وثيقة قائمة ويريد التجديد.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=23&locale=ar',
		highlights: ['تجديد رقمي', 'بدون زيارة فرع', 'يركز على الوثائق القائمة'],
		products: [{ name: 'خدمة تجديد مركبات', summary: 'تجديد الوثيقة الحالية عبر البوابة الإلكترونية.' }]
	},
	travel_standard: {
		title: 'تأمين السفر',
		family: 'برامج السفر',
		description: 'تغطيات السفر ضمن البرامج المتاحة لدى GIG الأردن.',
		bestFor: 'من لديه سفر قريب أو متكرر.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/225/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%B3%D9%81%D8%B1',
		highlights: ['تغطية سفر', 'مناسب للأفراد', 'يتكامل مع الإصدار الإلكتروني'],
		products: [{ name: 'برنامج سفر', summary: 'المنتج الأساسي ضمن فئة تأمين السفر.' }]
	},
	travel_hajj_umrah: {
		title: 'تأمين الحج والعمرة',
		family: 'برامج السفر',
		description: 'برنامج سفر مخصص لرحلات الحج والعمرة.',
		bestFor: 'من يسافر لغرض الحج أو العمرة.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/169/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B3%D9%81%D8%B1',
		highlights: ['سياق حج وعمرة', 'ضمن عائلة السفر', 'ربط مباشر بالاستشارة'],
		products: [{ name: 'برنامج الحج والعمرة', summary: 'حل سفر مخصص لرحلات الحج والعمرة.' }]
	},
	travel_online_issue: {
		title: 'إصدار تأمين سفر (إلكتروني)',
		family: 'الخدمات الإلكترونية للسفر',
		description: 'إصدار وثيقة السفر عبر قناة إلكترونية.',
		bestFor: 'من يريد إصدار الوثيقة مباشرة.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=16&locale=ar',
		highlights: ['إصدار إلكتروني', 'سرعة', 'تكامل مع مسار الاستشارة'],
		products: [{ name: 'خدمة إصدار سفر', summary: 'إصدار تأمين السفر عبر البوابة الإلكترونية.' }]
	},
	property_insurance: {
		title: 'تأمين الممتلكات',
		family: 'التأمينات العامة',
		description: 'حماية الممتلكات ضمن منتجات التأمينات العامة.',
		bestFor: 'من يريد حماية أصول وممتلكات من المخاطر.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/236/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D9%85%D8%AA%D9%84%D9%83%D8%A7%D8%AA',
		highlights: ['أفراد وأعمال', 'ضمن التأمينات العامة', 'منتجات متنوعة'],
		products: [
			{ name: 'تأمين كافة الأخطار', summary: 'حماية ممتلكات ضمن تغطية شاملة.' },
			{ name: 'تأمين الحريق والأخطار الإضافية', summary: 'تركيز على مخاطر الحريق ومخاطر إضافية.' },
			{ name: 'برنامج عرين', summary: 'برنامج ضمن فئة تأمين الممتلكات.' },
			{ name: 'برنامج أعمالي', summary: 'مسار موجّه للأعمال ضمن الممتلكات.' }
		]
	},
	home_online: {
		title: 'تأمين المنازل (إلكتروني)',
		family: 'الخدمات الإلكترونية',
		description: 'طلب تأمين المنازل عبر القناة الإلكترونية.',
		bestFor: 'من يريد بدء المسار رقميا.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=30',
		highlights: ['طلب إلكتروني', 'منازل', 'انتقال سريع للمتابعة'],
		products: [{ name: 'خدمة تأمين المنازل', summary: 'خدمة إلكترونية مخصصة لتأمين المنزل.' }]
	},
	marine_cargo: {
		title: 'التأمين البحري - نقل البضائع',
		family: 'التأمينات البحرية والطيران والطاقة',
		description: 'مسار تغطيات شحن ونقل البضائع.',
		bestFor: 'اللوجستيات والتجارة والشحن.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/228/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%A8%D8%B6%D8%A7%D8%A6%D8%B9',
		highlights: ['بحري/جوي/بري', 'مناسب للأعمال', 'تغطية نقل البضائع'],
		products: [
			{ name: 'الشحن البحري', summary: 'تغطية مخاطر الشحن عبر البحر.' },
			{ name: 'الشحن الجوي', summary: 'تغطية مخاطر الشحن الجوي.' },
			{ name: 'الشحن البري', summary: 'تغطية نقل البضائع عبر البر.' }
		]
	},
	marine_forwarders_liability: {
		title: 'تأمين المسؤولية القانونية لوكلاء الشحن',
		family: 'التأمينات البحرية والطيران والطاقة',
		description: 'حماية المسؤولية القانونية والمهنية لوكلاء الشحن.',
		bestFor: 'وكلاء وشركات الشحن.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/229/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B3%D8%A4%D9%88%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9-%D9%84%D9%88%D9%83%D9%84%D8%A7%D8%A1-%D8%A7%D9%84%D8%B4%D8%AD%D9%86-',
		highlights: ['مسؤولية قانونية', 'وكلاء الشحن', 'مسار أعمال متخصص'],
		products: [{ name: 'مسؤولية وكلاء الشحن', summary: 'تغطية متخصصة للمسؤولية القانونية لوكيل الشحن.' }]
	},
	engineering_insurance: {
		title: 'التأمينات الهندسية',
		family: 'التأمينات العامة',
		description: 'منتجات متخصصة للمشاريع والمعدات والأصول الهندسية.',
		bestFor: 'المقاولون وأصحاب المشاريع.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/237/Engineering-Insurance',
		highlights: ['مشاريع', 'معدات', 'تغطيات هندسية متنوعة'],
		products: [
			{ name: 'تأمين كافة أخطار المقاولين والتركيب', summary: 'حماية مخاطر التنفيذ والتركيب.' },
			{ name: 'تأمين أجهزة ومعدات المقاول', summary: 'تغطية للأجهزة والمعدات في مواقع العمل.' },
			{ name: 'تأمين عطل المكائن', summary: 'حماية الأعطال الفنية للمكائن.' },
			{ name: 'تأمين عطب الموجودات', summary: 'تغطية تلف الموجودات ضمن المخاطر الهندسية.' },
			{ name: 'تأمين الأجهزة الإلكترونية', summary: 'حماية الأجهزة الإلكترونية المهنية.' }
		]
	},
	other_general_insurance: {
		title: 'تأمينات أخرى',
		family: 'التأمينات العامة',
		description: 'فئة عامة لمنتجات متخصصة خارج المسارات الرئيسية.',
		bestFor: 'الحالات الخاصة أو الاحتياجات غير النمطية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/238/%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A3%D8%AE%D8%B1%D9%89',
		highlights: ['تنوع كبير', 'منتجات تخصصية', 'مناسب للأعمال والأفراد'],
		products: [
			{ name: 'تأمين النقد', summary: 'تغطية مرتبطة بمخاطر النقد.' },
			{ name: 'برنامج سند', summary: 'منتج ضمن فئة التأمينات الأخرى.' },
			{ name: 'تأمين الحوادث الشخصية', summary: 'حماية فردية من مخاطر الحوادث الشخصية.' },
			{ name: 'تأمين المسؤولية المدنية', summary: 'تغطية المسؤولية المدنية.' },
			{ name: 'تأمين مسؤولية المهنة', summary: 'حماية المسؤولية المهنية.' }
		]
	},
	workers_online: {
		title: 'تأمين العاملين في المنازل (إلكتروني)',
		family: 'الخدمات الإلكترونية',
		description: 'خدمة إلكترونية مخصصة لهذا النوع من التأمين.',
		bestFor: 'من يريد تقديم طلب سريع عبر القناة الرقمية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=20&locale=ar',
		highlights: ['خدمة رقمية', 'فئة محددة', 'خطوات مباشرة'],
		products: [{ name: 'خدمة تأمين العاملين في المنازل', summary: 'طلب وإدارة الخدمة عبر البوابة الإلكترونية.' }]
	}
}

const medicalSpecificCatalog: Record<string, InsuranceDetail> = {
	medical_crown_unlimited: {
		title: 'كراون عائلتي (Unlimited coverage)',
		family: 'التأمين الطبي الفردي - Crown Family',
		description:
			'برنامج عائلي بسقف تغطية سنوي مرتفع ضمن فئة كراون عائلتي، مناسب لمن يريد حماية أوسع داخل وخارج المستشفى.',
		bestFor: 'العائلات التي تريد سقف تغطية كبير ومرونة أعلى في الاستخدام.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl:
			'https://www.gig.com.jo/Page/212/%D9%83%D8%B1%D8%A7%D9%88%D9%86-%D8%B9%D8%A7%D8%A6%D9%84%D8%AA%D9%8A-(Unlimited-coverage)',
		highlights: ['سقف سنوي مرتفع', 'تغطية عائلية', 'مسار علاجي داخل وخارج المستشفى'],
		products: [
			{
				name: 'كراون عائلتي بلا حدود',
				summary: 'منتج عائلي بفلسفة تغطية موسعة مع مسار علاجي داخل وخارج المستشفى.',
				bullets: [
					'سقف سنوي مرتفع حسب الفئة التأمينية.',
					'تغطية داخل وخارج المستشفى ضمن شروط الوثيقة.',
					'شبكة طبية واسعة داخل الأردن.'
				]
			}
		]
	},
	medical_crown_in_hospital: {
		title: 'كراون عائلتي (داخل المستشفى)',
		family: 'التأمين الطبي الفردي - Crown Family',
		description: 'نسخة تركّز على خدمات الإدخال والعلاج داخل المستشفى للعائلة ضمن برنامج كراون.',
		bestFor: 'من يهمه أكثر تغطية حالات التنويم والجراحات داخل المستشفى.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/213/Crown-Family?lang=en',
		highlights: ['تركيز داخلي بالمستشفى', 'مناسب للعائلات', 'ضمن فئة كراون'],
		products: [
			{
				name: 'كراون عائلتي داخل المستشفى',
				summary: 'مسار يركز على الإقامة والعلاج داخل المستشفى أكثر من المنافع الخارجية.',
				bullets: [
					'يركز على خدمات الإدخال والتنويم.',
					'يتضمن الجراحات والفحوصات المرتبطة بالعلاج الداخلي حسب الوثيقة.',
					'مناسب لمن استخدامه الرئيسي داخل المستشفى.'
				]
			}
		]
	},
	medical_crown_in_out_hospital: {
		title: 'كراون عائلتي (داخل وخارج المستشفى)',
		family: 'التأمين الطبي الفردي - Crown Family',
		description: 'تغطية متوازنة بين خدمات المستشفى والعيادات الخارجية ضمن برنامج كراون.',
		bestFor: 'من يريد استخدامًا طبيًا يوميًا مع حماية للحالات الداخلية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/214/Crown-Family?lang=en',
		highlights: ['تغطية داخلية وخارجية', 'مرونة أعلى', 'شبكة طبية واسعة'],
		products: [
			{
				name: 'كراون عائلتي داخل وخارج المستشفى',
				summary: 'مسار متوازن مع منافع داخلية وخارجية في الوثيقة نفسها.',
				bullets: [
					'يغطي حالات الإدخال والعلاج الخارجي حسب الدرجة.',
					'يشمل مزايا علاجية مثل التصوير والتحاليل والأدوية بنسبة تغطية حسب الجدول.',
					'يتضمن مزايا إضافية مثل الأمومة ضمن حدود البرنامج.'
				]
			}
		]
	},
	medical_aman: {
		title: 'برنامج أمان',
		family: 'التأمين الطبي الفردي',
		description: 'برنامج أمان هو برنامج طبي موجّه مع تركيز خاص على تغطيات مرتبطة بعلاجات السرطان وفق الشروط.',
		bestFor: 'من يبحث عن برنامج طبي مخصص أكثر لحالات الأورام والعلاج المرتبط بها.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/215/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%A3%D9%85%D8%A7%D9%86',
		highlights: ['برنامج طبي محلي', 'للأفراد والعائلات', 'يمكن ربطه بطلب إلكتروني'],
		products: [
			{
				name: 'برنامج أمان',
				summary: 'برنامج فردي مخصص مع نطاق تغطية علاجي مرتبط بحالات السرطان.',
				bullets: [
					'يغطي الفحوصات التشخيصية لحالات السرطان والأورام الحميدة والخبيثة حسب الوثيقة.',
					'يغطي العلاج داخل وخارج المستشفى ضمن حدود البرنامج.',
					'يشمل الأدوية والكيماوي والأشعة المرتبطة بالحالة حسب شروط العقد.'
				]
			}
		]
	},
	medical_ebtisamati: {
		title: 'برنامج ابتسامتي',
		family: 'التأمين الطبي الفردي',
		description: 'برنامج طبي يركز على مزايا مرتبطة بالعناية السنية ضمن فئة التأمين الطبي الفردي.',
		bestFor: 'من يهتم أكثر بالعناية السنية الدورية ومزايا الأسنان.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/216/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%A7%D8%A8%D8%AA%D8%B3%D8%A7%D9%85%D8%AA%D9%8A',
		highlights: ['تركيز على مزايا سنية', 'ضمن الفئة الطبية الفردية', 'ملائم للاستخدام الدوري'],
		products: [
			{
				name: 'برنامج ابتسامتي',
				summary: 'برنامج تأمين أسنان مع مستويات اشتراك متعددة.',
				bullets: [
					'يوفر باقات اشتراك شهرية بمستويات تغطية مختلفة.',
					'يتضمن خدمات تنظيف، فحوصات، وعلاجات سنية حسب الخطة.',
					'مناسب لمن يريد تغطية سنية دورية.'
				]
			}
		]
	},
	medical_royal: {
		title: 'برنامج رويال',
		family: 'التأمين الطبي الفردي',
		description: 'برنامج طبي بمستوى تغطية متقدم ضمن منتجات التأمين الطبي الفردي لدى GIG الأردن.',
		bestFor: 'من يحتاج مزايا أعلى ضمن برامج التأمين الطبي الفردية.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/217/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%B1%D9%88%D9%8A%D8%A7%D9%84',
		highlights: ['مزايا متقدمة', 'برنامج فردي', 'مناسب للاحتياج الأعلى'],
		products: [
			{
				name: 'برنامج رويال',
				summary: 'برنامج طبي متقدم ضمن الفئة الفردية بمزايا علاجية واسعة.',
				bullets: [
					'شبكة طبية واسعة داخل الأردن.',
					'تغطية داخل وخارج المستشفى حسب الخطة.',
					'مزايا للأمراض المزمنة والطارئة ضمن الشروط المعتمدة.'
				]
			}
		]
	},
	medical_bupa_global: {
		title: 'BUPA Global',
		family: 'التأمين الطبي الدولي',
		description: 'برنامج تأمين طبي دولي ضمن شراكات GIG الأردن للفئات الدولية.',
		bestFor: 'من يحتاج تغطية طبية دولية واسعة وشبكات علاج خارج الأردن.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/281/BUPA-Global',
		highlights: ['تغطية دولية', 'ملائم للتنقل والسفر', 'شبكات طبية عالمية'],
		products: [
			{
				name: 'BUPA Global',
				summary: 'برنامج تأمين طبي دولي يقدم شبكة رعاية واسعة خارج الأردن.',
				bullets: [
					'شبكة عالمية تغطي عدداً كبيراً من الدول ومقدمي الخدمة.',
					'مناسب للمقيمين كثيري السفر أو الحالات الدولية.',
					'يغطي خدمات علاج داخل وخارج المستشفى حسب الخطة.'
				]
			}
		]
	},
	medical_international_360: {
		title: 'التأمين الطبي الدولي 360',
		family: 'التأمين الطبي الدولي',
		description: 'برنامج طبي دولي 360 ضمن منتجات GIG الأردن الدولية.',
		bestFor: 'من يريد خيارًا دوليًا مرنًا مع نطاق تغطية واسع.',
		advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
		officialUrl: 'https://www.gig.com.jo/Page/369/gig--AXA-International-360-product',
		highlights: ['منتج دولي 360', 'خيار دولي مرن', 'ضمن فئة الطبي الدولي'],
		products: [
			{
				name: 'gig - AXA International 360',
				summary: 'برنامج طبي دولي بالتعاون مع AXA وبخيارين أساسي/شامل.',
				bullets: [
					'خيارا تغطية أساسي (B) وشامل (A).',
					'إمكانية اختيار نطاق جغرافي مع خيار شمول الولايات المتحدة.',
					'يشمل منافع مثل الإخلاء الطبي الطارئ والرعاية داخل وخارج المستشفى حسب الخطة.'
				]
			}
		]
	}
}

const fallbackInsurance: InsuranceDetail = {
	title: 'مسار تأمين من GIG الأردن',
	family: 'استشارة تأمينية',
	description: 'تم تحديد مسار مبدئي بناء على احتياجك.',
	bestFor: 'العميل الذي يريد توجيها سريعا إلى خيار مناسب.',
	advisorNote: 'هل تريد أن أساعدك في تعبئة النموذج معًا؟',
	officialUrl:
		'https://www.gig.com.jo/Page/167/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9',
	highlights: ['توجيه مبدئي', 'توصية مستشار', 'انتقال مباشر للنموذج'],
	products: [{ name: 'استشارة مبدئية', summary: 'تحديد احتياجك ثم تحويلك للنموذج المناسب.' }]
}

export default function GigInsuranceDestination() {
	const navigate = useNavigate()
	const { target = '' } = useParams()
	const targetKey = decodeURIComponent(target)
	const insurance = medicalSpecificCatalog[targetKey] || insuranceCatalog[targetKey] || fallbackInsurance

	React.useEffect(() => {
		document.documentElement.dir = 'rtl'
		document.title = `GIG الأردن | ${insurance.title}`
	}, [insurance.title])

	const advisorPath = React.useMemo(() => {
		const params = new URLSearchParams()
		params.set('target', targetKey)
		params.set('label', insurance.title)
		params.set('reason', insurance.advisorNote)
		return `/gig/advisor-request?${params.toString()}`
	}, [insurance.advisorNote, insurance.title, targetKey])

	return (
		<div
			className="min-h-screen bg-[#f8f9fd] text-[#1D2146]"
			dir="rtl"
			style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
		>
			<GigHeaderTopBar />

			<header className="border-b border-[#dde3f0] bg-white">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center gap-5">
						<GigLogoBackground width={140} padding="52px 60px" />
						<div>
							<p className="text-sm font-semibold text-[#A52A2A]">GIG الأردن</p>
							<h1 className="text-3xl font-black text-[#1D2146]">{insurance.title}</h1>
							<p className="mt-1 text-sm text-[#5d6883]">{insurance.family}</p>
						</div>
					</div>
					<nav className="flex flex-wrap justify-end gap-3">
						{gigMenuItems.map((item) => (
							<GigNavMenuButton
								key={item.label}
								label={item.label}
								iconSrc={item.iconSrc}
								href={item.href}
								onClick={item.path ? () => navigate(item.path) : undefined}
								className="min-w-[165px]"
							/>
						))}
					</nav>
				</div>
			</header>

			<main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
				<section className="rounded-[32px] border border-[#dde3f0] bg-white p-8 shadow-sm">
					<div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A]/10 px-3 py-1.5 text-sm font-semibold text-[#A52A2A]">
						<ShieldCheck className="h-4 w-4" />
						توصية مستشار التأمين
					</div>

					<p className="text-lg leading-8 text-[#44506b]">{insurance.description}</p>
					<p className="mt-4 text-base leading-8 text-[#44506b]">
						<span className="font-bold text-[#1D2146]">مناسب لـ:</span> {insurance.bestFor}
					</p>

					<div className="mt-8 grid gap-3 sm:grid-cols-3">
						{insurance.highlights.map((item) => (
							<div key={item} className="rounded-2xl border border-[#e2e7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#52607d]">
								{item}
							</div>
						))}
					</div>

					<div className="mt-8 rounded-2xl border border-[#e2e7f3] bg-[#f7f9fc] p-5">
						<div className="mb-2 flex items-center gap-2 text-[#1D2146]">
							<ClipboardCheck className="h-5 w-5 text-[#A52A2A]" />
							<span className="font-bold">ملاحظة المستشار</span>
						</div>
						<p className="text-sm leading-7 text-[#52607d]">{insurance.advisorNote}</p>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={() => navigate(advisorPath)}
							className="inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white"
						>
							تقديم طلب
							<ArrowLeft className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={() => navigate('/gig')}
							className="inline-flex items-center gap-2 rounded-2xl border border-[#1D2146]/15 px-6 py-3 font-bold text-[#1D2146]"
						>
							العودة للرئيسية
							<ArrowLeft className="h-4 w-4" />
						</button>
					</div>
				</section>

				<aside className="rounded-[32px] border border-[#dde3f0] bg-white p-8 shadow-sm">
					<h2 className="text-2xl font-bold text-[#1D2146]">مرجع المنتج</h2>
					<p className="mt-3 text-sm leading-7 text-[#5d6883]">
						هذه الصفحة داخل تطبيقك. يمكن فتح الصفحة المرجعية الرسمية من GIG عند الحاجة.
					</p>
					<a
						href={insurance.officialUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#1D2146]/15 px-5 py-3 font-bold text-[#1D2146]"
					>
						فتح المرجع الرسمي
						<ExternalLink className="h-4 w-4" />
					</a>
					<p className="mt-4 break-all text-xs text-[#7a859f]">{insurance.officialUrl}</p>
				</aside>
			</main>

			<section className="mx-auto max-w-7xl px-4 pb-12">
				<div className="rounded-[32px] border border-[#dde3f0] bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center gap-2 text-[#1D2146]">
						<Sparkles className="h-5 w-5 text-[#A52A2A]" />
						<h2 className="text-2xl font-black">المنتجات المتاحة ضمن هذا المسار</h2>
					</div>
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{insurance.products.map((product) => (
							<article key={product.name} className="rounded-2xl border border-[#e2e7f3] bg-[#f7f9fc] p-5">
								<h3 className="text-lg font-bold text-[#1D2146]">{product.name}</h3>
								<p className="mt-2 text-sm leading-7 text-[#52607d]">{product.summary}</p>
								{product.bullets && product.bullets.length > 0 ? (
									<ul className="mt-3 space-y-1 text-sm leading-7 text-[#52607d]">
										{product.bullets.map((bullet) => (
											<li key={bullet}>• {bullet}</li>
										))}
									</ul>
								) : null}
							</article>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
