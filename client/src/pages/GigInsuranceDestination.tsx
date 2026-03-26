import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ClipboardCheck, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react'
import { GigHeaderTopBar, GigLogoBackground, GigNavMenuButton } from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'

type ProductItem = {
	name: string
	summary: string
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
	const insurance = insuranceCatalog[targetKey] || fallbackInsurance

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
							إكمال طلب الاستشارة
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
							</article>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
