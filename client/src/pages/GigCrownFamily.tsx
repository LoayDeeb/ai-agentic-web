import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react'
import {
	GigAccordionButton,
	GigHeaderTopBar,
	GigLogoBackground,
	GigNavMenuButton
} from '../components/gig/GigBlocks'
import {
	GIG_OFFICIAL_URL,
	gigCostAdjustments,
	gigCoverageSections,
	gigHeroStats,
	gigKeyBenefits,
	gigMenuItems,
	gigPremiumRows
} from '../components/gig/content'
import { onToolEvent } from '../features/agent/tools'

const scrollSectionMap: Record<string, string> = {
	overview: 'gig-overview',
	maternity: 'gig-maternity',
	benefits: 'gig-advanced-benefits',
	death: 'gig-death-benefit',
	pricing: 'gig-pricing'
}

export default function GigCrownFamily() {
	const navigate = useNavigate()

	React.useEffect(() => {
		document.title = 'GIG Demo | Crown Family Unlimited Coverage'
	}, [])

	React.useEffect(() => {
		return onToolEvent((tool, args) => {
			if (tool !== 'scrollToGigSection') return
			const targetId = scrollSectionMap[args.section]
			if (!targetId) return
			const element = document.getElementById(targetId)
			element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		})
	}, [])

	return (
		<div
			className="min-h-screen bg-[#f8f9fd] text-[#1D2146]"
			dir="rtl"
			style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
		>
			<GigHeaderTopBar />

			<header className="border-b border-[#dde3f0] bg-white/95 backdrop-blur">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center gap-5">
						<GigLogoBackground width={144} padding="56px 66px" />
						<div className="space-y-1">
							<p className="text-sm font-semibold text-[#A52A2A]">GIG Jordan Demo</p>
							<h1 className="text-3xl font-bold text-[#1D2146]">برنامج عائلتي بلا حدود</h1>
							<p className="text-sm text-[#57637f]">
								نسخة محلية مبنية على صفحة
								{` `}
								كراؤن عائلتي (Unlimited coverage)
							</p>
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

			<main className="mx-auto max-w-7xl px-4 py-10">
				<section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
					<motion.div
						initial={{ opacity: 0, y: 22 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="rounded-[36px] bg-[#1D2146] p-8 text-white shadow-2xl shadow-[#1D2146]/20"
					>
						<p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
							Unlimited coverage
						</p>
						<h2 className="mt-3 text-4xl font-black leading-tight">
							تغطية تأمينية بلا حدود للعائلة داخل وخارج المستشفى
						</h2>
						<p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
							البرنامج يغطي العلاج داخل وخارج الأردن، يشمل مراجعات الحمل والولادة،
							ويوفر مزايا إضافية للأمراض المزمنة والحالات المتقدمة مع منفعة خطر وفاة
							للفئة العمرية المؤهلة.
						</p>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							{gigHeroStats.map((stat) => (
								<div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
									<div className="text-2xl font-black">{stat.value}</div>
									<div className="mt-2 text-sm leading-6 text-white/70">{stat.label}</div>
								</div>
							))}
						</div>

						<div className="mt-8 flex flex-wrap gap-3">
							<button
								type="button"
								onClick={() => navigate('/gig/submit')}
								className="inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A] px-5 py-3 font-bold text-white"
							>
								ابدأ طلب التأمين
								<ArrowLeft className="h-4 w-4" />
							</button>
							<a
								href={GIG_OFFICIAL_URL}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-[#1D2146]"
							>
								زيارة الصفحة الرسمية
								<ExternalLink className="h-4 w-4" />
							</a>
							<button
								type="button"
								onClick={() => navigate('/gig')}
								className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 font-bold text-white"
							>
								العودة للديمو
								<ArrowLeft className="h-4 w-4" />
							</button>
						</div>
					</motion.div>

					<div className="rounded-[36px] border border-[#dde3f0] bg-white p-8 shadow-sm">
						<h3 className="text-2xl font-bold text-[#1D2146]">أهم النقاط الرسمية في الصفحة</h3>
						<ul className="mt-6 space-y-4">
							{gigKeyBenefits.map((benefit) => (
								<li key={benefit} className="flex items-start gap-3 text-sm leading-7 text-[#54617d]">
									<CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#A52A2A]" />
									<span>{benefit}</span>
								</li>
							))}
						</ul>
						<div className="mt-8 rounded-[28px] bg-[#f7f9fc] p-5">
							<h4 className="text-lg font-bold text-[#1D2146]">الأهلية والفئة العمرية</h4>
							<p className="mt-3 text-sm leading-7 text-[#57637f]">
								تصدر الوثيقة فقط للأشخاص من عمر 18 إلى 60 سنة، ويمكن تأمين الأطفال من
								عمر 18 يوماً حتى 17 سنة إذا كان الوالدان مؤمنين معه ضمن البرنامج.
							</p>
						</div>
					</div>
				</section>

				<section className="mt-10">
					<GigAccordionButton items={gigCoverageSections} title="تفاصيل التغطيات والمنافع" />
				</section>

				<section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
					<div className="rounded-[32px] border border-[#dde3f0] bg-white p-6 shadow-sm">
						<h3 className="text-2xl font-bold text-[#1D2146]">منفعة خطر الوفاة</h3>
						<p className="mt-3 text-sm leading-7 text-[#57637f]">
							يستحق مبلغ التأمين لحامل الوثيقة و/أو الزوج أو الزوجة المشمولين إذا حدثت
							الوفاة أثناء سريان مدة التأمين، وفق الأحكام المعتمدة لدى GIG الأردن.
						</p>
						<div className="mt-6 overflow-hidden rounded-3xl border border-[#e4e9f5]">
							<table className="min-w-full divide-y divide-[#e4e9f5] text-right text-sm">
								<thead className="bg-[#f5f7fb] text-[#1D2146]">
									<tr>
										<th className="px-4 py-3 font-bold">الفئة العمرية</th>
										<th className="px-4 py-3 font-bold">الوفاة الطبيعية / المرض</th>
										<th className="px-4 py-3 font-bold">الوفاة الناتجة عن حادث</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-[#eef2f9]">
									<tr>
										<td className="px-4 py-3">18 إلى 60 عاماً</td>
										<td className="px-4 py-3">5,000 دينار</td>
										<td className="px-4 py-3">10,000 دينار</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p className="mt-4 text-sm text-[#6b7490]">
							مدة التغطية التأمينية: سنة واحدة ابتداءً من تاريخ بدء سريان الوثيقة.
						</p>
					</div>

					<div className="rounded-[32px] border border-[#dde3f0] bg-white p-6 shadow-sm">
						<h3 className="text-2xl font-bold text-[#1D2146]">الأقساط السنوية حسب الفئة</h3>
						<p className="mt-3 text-sm leading-7 text-[#57637f]">
							الأسعار التالية تلخص النطاق السعري المعلن في الصفحة الرسمية للذكور والإناث
							بحسب الدرجة التأمينية، وتشمل منفعة خطر الوفاة.
						</p>
						<div className="mt-6 overflow-hidden rounded-3xl border border-[#e4e9f5]">
							<table className="min-w-full divide-y divide-[#e4e9f5] text-right text-sm">
								<thead className="bg-[#f5f7fb] text-[#1D2146]">
									<tr>
										<th className="px-4 py-3 font-bold">العمر</th>
										<th className="px-4 py-3 font-bold">الذكر</th>
										<th className="px-4 py-3 font-bold">الأنثى</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-[#eef2f9]">
									{gigPremiumRows.map((row) => (
										<tr key={row.age}>
											<td className="px-4 py-3">{row.age}</td>
											<td className="px-4 py-3">{row.male}</td>
											<td className="px-4 py-3">{row.female}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>

				<section className="mt-10 rounded-[32px] border border-[#dde3f0] bg-white p-6 shadow-sm">
					<h3 className="text-2xl font-bold text-[#1D2146]">تعديل نسبة التحمل خارج المستشفى</h3>
					<p className="mt-3 text-sm leading-7 text-[#57637f]">
						يمكن تعديل نسبة التحمل على العلاج خارج المستشفى داخل الشبكة الطبية المعتمدة
						مقابل زيادة على الأقساط السنوية لكل فرد كما هو موضح أدناه.
					</p>
					<div className="mt-6 overflow-hidden rounded-3xl border border-[#e4e9f5]">
						<table className="min-w-full divide-y divide-[#e4e9f5] text-right text-sm">
							<thead className="bg-[#f5f7fb] text-[#1D2146]">
								<tr>
									<th className="px-4 py-3 font-bold">الخيار</th>
									<th className="px-4 py-3 font-bold">خاصة</th>
									<th className="px-4 py-3 font-bold">أولى</th>
									<th className="px-4 py-3 font-bold">ثانية</th>
									<th className="px-4 py-3 font-bold">ثالثة</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-[#eef2f9]">
								{gigCostAdjustments.map((row) => (
									<tr key={row.label}>
										<td className="px-4 py-3">{row.label}</td>
										<td className="px-4 py-3">{row.private} د.أ</td>
										<td className="px-4 py-3">{row.first} د.أ</td>
										<td className="px-4 py-3">{row.second} د.أ</td>
										<td className="px-4 py-3">{row.third} د.أ</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="mt-4 text-sm text-[#6b7490]">
						يتم إضافة 5% بدل خدمة إصدار وثيقة التأمين و1% رسوم طوابع واردات للدولة، ويخضع
						البرنامج لشروط وأحكام واستثناءات عقد التأمين المعتمد لدى مجموعة الخليج للتأمين -
						الأردن.
					</p>
				</section>
			</main>
		</div>
	)
}
