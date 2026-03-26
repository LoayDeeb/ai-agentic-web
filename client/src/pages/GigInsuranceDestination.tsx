import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ClipboardCheck, ExternalLink, ShieldCheck } from 'lucide-react'
import { GigHeaderTopBar, GigLogoBackground, GigNavMenuButton } from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'

type InsuranceDetail = {
	title: string
	family: string
	description: string
	bestFor: string
	advisorNote: string
	officialUrl: string
}

const insuranceCatalog: Record<string, InsuranceDetail> = {
	medical_category: {
		title: 'التأمينات الطبية',
		family: 'التأمين الطبي (جماعي / فردي)',
		description:
			'هذا المسار يغطي برامج التأمين الطبي للأفراد والعائلات والشركات ضمن حلول GIG الأردن الطبية.',
		bestFor: 'العملاء الذين أولويتهم الرعاية الصحية وحماية تكاليف العلاج.',
		advisorNote: 'سأوصي بالخطة الطبية الأنسب حسب عدد الأفراد وطبيعة التغطية المطلوبة.',
		officialUrl:
			'https://www.gig.com.jo/Page/167/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9'
	},
	medical_online_individual_family: {
		title: 'تأمين طبي (فردي وعائلي) إلكتروني',
		family: 'الخدمات الإلكترونية الطبية',
		description: 'مسار رقمي لإصدار أو طلب التأمين الطبي الفردي والعائلي عبر قناة إلكترونية.',
		bestFor: 'العميل الذي يريد بدء الإجراء الطبي بسرعة عبر القناة الرقمية.',
		advisorNote: 'بعد تعبئة الطلب، يمكن متابعة إصدار الخدمة الطبية إلكترونيا.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=21&locale=ar'
	},
	life_individual: {
		title: 'تأمين الحياة الفردي',
		family: 'التأمين على الحياة',
		description: 'حلول حماية مالية للأفراد ضمن برامج تأمين الحياة الفردية.',
		bestFor: 'من يبحث عن حماية دخل العائلة أو تغطية طويلة الأجل.',
		advisorNote: 'أوصي بهذه الفئة عند أولوية الاستقرار المالي للعائلة.',
		officialUrl: 'https://www.gig.com.jo/Page/412/Individual-Life-Insurance'
	},
	life_group: {
		title: 'تأمين الحياة الجماعي',
		family: 'التأمين على الحياة للشركات',
		description: 'برامج تأمين حياة جماعية مخصصة للشركات وفرق العمل.',
		bestFor: 'الشركات التي تريد حماية جماعية للموظفين ضمن مزايا المؤسسة.',
		advisorNote: 'هذا الخيار مناسب عندما يكون الطلب بصيغة شركة أو جهة عمل.',
		officialUrl:
			'https://www.gig.com.jo/Page/411/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%AC%D9%85%D8%A7%D8%B9%D9%8A-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D8%A7%D9%84%D8%AE%D8%A7%D8%B5-%D8%A8%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA'
	},
	motor_comprehensive: {
		title: 'تأمين المركبات شامل / تكميلي',
		family: 'تأمين المركبات',
		description: 'تغطية تأمينية للمركبات ضمن مسار التأمين الشامل أو التكميلي.',
		bestFor: 'العملاء الذين يملكون مركبة ويريدون حماية أوسع من الإلزامي.',
		advisorNote: 'يوصى به عند التركيز على حماية المركبة والتعويضات المرتبطة بها.',
		officialUrl:
			'https://www.gig.com.jo/Page/219/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%A8%D8%A7%D8%AA-%D8%B4%D8%A7%D9%85%D9%84---%D8%AA%D9%83%D9%85%D9%8A%D9%84%D9%8A'
	},
	motor_online_new: {
		title: 'تأمين مركبة جديدة (إلكتروني)',
		family: 'الخدمات الإلكترونية للمركبات',
		description: 'قناة إلكترونية مخصصة لإصدار تأمين لمركبة جديدة.',
		bestFor: 'من يريد إصدار وثيقة لمركبة جديدة عبر قناة رقمية.',
		advisorNote: 'مناسب عندما تكون الحاجة إصدار سريع لمركبة جديدة.',
		officialUrl: 'https://e-services.gig.com.jo/quote/motor-issuance?cmsId=28&linkingId=null'
	},
	motor_online_renew: {
		title: 'تجديد تأمين المركبات (إلكتروني)',
		family: 'الخدمات الإلكترونية للمركبات',
		description: 'قناة رقمية لتجديد وثيقة المركبات القائمة.',
		bestFor: 'من يريد تجديد التأمين الحالي دون زيارة الفرع.',
		advisorNote: 'الخيار الأفضل عند وجود وثيقة حالية تحتاج تجديد.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=23&locale=ar'
	},
	travel_standard: {
		title: 'تأمين السفر',
		family: 'برامج السفر',
		description: 'تغطيات مرتبطة بالسفر ضمن برامج تأمين السفر لدى GIG الأردن.',
		bestFor: 'المسافرون الذين يحتاجون تغطية أثناء الرحلات.',
		advisorNote: 'يوصى به عند وجود سفر قريب أو متكرر.',
		officialUrl: 'https://www.gig.com.jo/Page/225/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%B3%D9%81%D8%B1'
	},
	travel_hajj_umrah: {
		title: 'تأمين الحج والعمرة',
		family: 'برامج السفر',
		description: 'برنامج سفر مخصص لسياق الحج والعمرة.',
		bestFor: 'المسافرون لأغراض الحج أو العمرة.',
		advisorNote: 'أفضل مسار عندما يكون الهدف رحلة حج أو عمرة.',
		officialUrl: 'https://www.gig.com.jo/Page/169/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B3%D9%81%D8%B1'
	},
	travel_online_issue: {
		title: 'إصدار تأمين سفر (إلكتروني)',
		family: 'الخدمات الإلكترونية للسفر',
		description: 'مسار رقمي لإصدار تأمين السفر مباشرة عبر البوابة الإلكترونية.',
		bestFor: 'العميل الذي يريد إصدارا إلكترونيا سريعا لتأمين السفر.',
		advisorNote: 'بعد إرسال الطلب، سنوجهك لمسار الإصدار الإلكتروني المناسب.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=16&locale=ar'
	},
	property_insurance: {
		title: 'تأمين الممتلكات',
		family: 'التأمينات العامة',
		description: 'حلول حماية للممتلكات ضمن فئة التأمينات العامة.',
		bestFor: 'الأفراد أو الأعمال الراغبة بحماية الممتلكات من المخاطر.',
		advisorNote: 'هذا المسار مناسب عند أولوية حماية الأصول والممتلكات.',
		officialUrl:
			'https://www.gig.com.jo/Page/236/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D9%85%D8%AA%D9%84%D9%83%D8%A7%D8%AA'
	},
	home_online: {
		title: 'تأمين المنازل (إلكتروني)',
		family: 'الخدمات الإلكترونية للمنازل',
		description: 'خدمة إلكترونية مرتبطة بطلب أو إصدار تأمين المنازل.',
		bestFor: 'العميل الذي يريد بدء مسار تأمين المنزل رقميا.',
		advisorNote: 'يمكن متابعة الإجراء مباشرة عبر نموذج الطلب ثم المسار الإلكتروني.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=30'
	},
	marine_cargo: {
		title: 'التأمين البحري - نقل البضائع',
		family: 'التأمينات البحرية والطيران والطاقة',
		description: 'تغطيات مرتبطة بشحن ونقل البضائع ضمن التأمين البحري.',
		bestFor: 'الأعمال اللوجستية والشحن التجاري.',
		advisorNote: 'الخيار الأنسب عند وجود مخاطر نقل وشحن للبضائع.',
		officialUrl:
			'https://www.gig.com.jo/Page/228/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%A8%D8%B6%D8%A7%D8%A6%D8%B9'
	},
	marine_forwarders_liability: {
		title: 'مسؤولية وكلاء الشحن',
		family: 'التأمينات البحرية والطيران والطاقة',
		description: 'تغطية المسؤولية القانونية الخاصة بوكلاء الشحن.',
		bestFor: 'شركات ووكلاء الشحن الذين يحتاجون حماية مسؤولية مهنية.',
		advisorNote: 'يوصى به عندما تكون المخاطرة مرتبطة بمسؤولية أعمال الشحن.',
		officialUrl:
			'https://www.gig.com.jo/Page/229/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B3%D8%A4%D9%88%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9-%D9%84%D9%88%D9%83%D9%84%D8%A7%D8%A1-%D8%A7%D9%84%D8%B4%D8%AD%D9%86-'
	},
	engineering_insurance: {
		title: 'التأمينات الهندسية',
		family: 'التأمينات العامة',
		description: 'حلول تأمين للمشاريع والمقاولات والمعدات ضمن التأمينات الهندسية.',
		bestFor: 'المقاولون وأصحاب المشاريع والأصول الهندسية.',
		advisorNote: 'مناسب عندما يكون الخطر مرتبطا بالمشاريع أو المعدات الفنية.',
		officialUrl: 'https://www.gig.com.jo/Page/237/Engineering-Insurance'
	},
	other_general_insurance: {
		title: 'تأمينات أخرى',
		family: 'التأمينات العامة',
		description: 'فئة عامة تشمل منتجات تأمينية متنوعة خارج المسارات الرئيسية.',
		bestFor: 'الحالات الخاصة التي لا تقع ضمن مسار طبي/مركبات/سفر مباشر.',
		advisorNote: 'نستخدم هذا المسار عند الحاجة لتغطية عامة متخصصة.',
		officialUrl:
			'https://www.gig.com.jo/Page/238/%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A3%D8%AE%D8%B1%D9%89'
	},
	workers_online: {
		title: 'تأمين العاملين في المنازل (إلكتروني)',
		family: 'الخدمات الإلكترونية',
		description: 'خدمة إلكترونية مخصصة لتأمين العاملين في المنازل.',
		bestFor: 'من يريد إصدار هذا النوع من التأمين عبر القناة الرقمية.',
		advisorNote: 'بعد إدخال البيانات سنوجهك لخطوات الخدمة الإلكترونية المناسبة.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=20&locale=ar'
	}
}

const fallbackInsurance: InsuranceDetail = {
	title: 'مسار تأمين من GIG الأردن',
	family: 'استشارة تأمينية',
	description: 'تم تحديد مسار مبدئي بناء على احتياجك.',
	bestFor: 'العملاء الذين يريدون استشارة سريعة للوصول إلى المنتج المناسب.',
	advisorNote: 'أكمل الطلب وسيتابع معك مستشار التأمين بخطوة مناسبة.',
	officialUrl:
		'https://www.gig.com.jo/Page/167/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9'
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
		</div>
	)
}
