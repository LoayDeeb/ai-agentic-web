import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, HeartPulse, ShieldPlus, Baby } from 'lucide-react'
import {
	GigAccordionButton,
	GigHeaderTopBar,
	GigInsightCard,
	GigLogoBackground,
	GigNavMenuButton
} from '../components/gig/GigBlocks'
import {
	GIG_OFFICIAL_URL,
	gigHeroStats,
	gigInsightCard,
	gigKeyBenefits,
	gigMenuItems
} from '../components/gig/content'

const featureCards = [
	{
		title: 'تغطية بلا سقف سنوي',
		description: 'برنامج طبي فردي وعائلي مع تغطية غير محددة سنوياً داخل وخارج الأردن.',
		icon: ShieldPlus
	},
	{
		title: 'رعاية الحمل والولادة',
		description: 'يشمل مراجعات الحمل والولادة والمواليد الجدد والفيتامينات المرتبطة بالحمل.',
		icon: Baby
	},
	{
		title: 'شبكة طبية واسعة',
		description: 'أكثر من 3620 مقدم خدمة مع تسوية مطالبات نقدية خلال 7 أيام عمل.',
		icon: HeartPulse
	}
] as const

export default function GigHome() {
	const navigate = useNavigate()

	React.useEffect(() => {
		document.title = 'GIG Demo | Crown Family'
	}, [])

	return (
		<div
			className="min-h-screen bg-[#f6f7fb] text-[#1D2146]"
			dir="rtl"
			style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
		>
			<GigHeaderTopBar onSearch={() => navigate('/gig/crown-family')} />

			<header className="border-b border-[#dfe4f0] bg-white">
				<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center justify-between gap-4">
						<GigLogoBackground width={150} padding="58px 72px" />
						<div className="text-right">
							<p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A52A2A]">
								GIG Demo
							</p>
							<h1 className="text-2xl font-bold text-[#1D2146]">برنامج عائلتي بلا حدود</h1>
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
								className="min-w-[160px]"
							/>
						))}
					</nav>
				</div>
			</header>

			<main>
				<section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(165,42,42,0.16),_transparent_32%),linear-gradient(135deg,#f9fbff_0%,#eef2fb_48%,#ffffff_100%)]">
					<div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55 }}
							className="space-y-6"
						>
							<div className="inline-flex rounded-full border border-[#A52A2A]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#A52A2A] backdrop-blur">
								التأمين الطبي الفردي للعائلة
							</div>
							<div className="space-y-4">
								<h2 className="text-4xl font-black leading-tight text-[#1D2146] md:text-5xl">
									نسخة ديمو جديدة لـ GIG مبنية على تصميم الموقع الرسمي ومحتوى برنامج
									{` `}
									<span className="text-[#A52A2A]">كراؤن عائلتي</span>
								</h2>
								<p className="max-w-2xl text-lg leading-8 text-[#44506b]">
									الصفحة المحلية تعرض أهم مزايا البرنامج، تفاصيل التغطيات، وفئات الأقساط
									مع ربط مباشر بالصفحة الرسمية لبرنامج
									{` `}
									كراؤن عائلتي (Unlimited coverage)
									{` `}
									على موقع GIG الأردن.
								</p>
							</div>
							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => navigate('/gig/crown-family')}
									className="inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white shadow-lg shadow-[#A52A2A]/20 transition-transform hover:-translate-y-0.5"
								>
									عرض صفحة المنتج
									<ArrowLeft className="h-4 w-4" />
								</button>
								<a
									href={GIG_OFFICIAL_URL}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-2 rounded-2xl border border-[#1D2146]/15 bg-white px-6 py-3 font-bold text-[#1D2146] transition-colors hover:border-[#1D2146] hover:bg-[#f8f9fd]"
								>
									فتح الصفحة الرسمية
									<ExternalLink className="h-4 w-4" />
								</a>
								<button
									type="button"
									onClick={() => navigate('/gig/submit')}
									className="inline-flex items-center gap-2 rounded-2xl border border-[#A52A2A]/20 bg-[#A52A2A]/5 px-6 py-3 font-bold text-[#A52A2A] transition-colors hover:bg-[#A52A2A]/10"
								>
									ابدأ طلب التأمين
									<ArrowLeft className="h-4 w-4" />
								</button>
							</div>
							<div className="grid gap-4 sm:grid-cols-3">
								{gigHeroStats.map((stat) => (
									<div
										key={stat.label}
										className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur"
									>
										<div className="text-2xl font-black text-[#1D2146]">{stat.value}</div>
										<div className="mt-2 text-sm leading-6 text-[#5a657d]">{stat.label}</div>
									</div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.55, delay: 0.1 }}
							className="relative"
						>
							<div className="rounded-[36px] bg-[#1D2146] p-8 text-white shadow-2xl shadow-[#1D2146]/20">
								<div className="mb-8 flex items-center justify-between">
									<div>
										<p className="text-sm text-white/70">GIG Jordan</p>
										<h3 className="text-3xl font-bold">كراؤن عائلتي</h3>
									</div>
									<GigLogoBackground
										width={112}
										padding="38px 44px"
										className="rounded-2xl bg-white"
									/>
								</div>
								<ul className="space-y-4">
									{gigKeyBenefits.map((benefit) => (
										<li
											key={benefit}
											className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white/90"
										>
											{benefit}
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 py-14">
					<div className="grid gap-6 md:grid-cols-3">
						{featureCards.map((feature, index) => {
							const Icon = feature.icon
							return (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.08 }}
									className="rounded-[28px] border border-[#dce2f0] bg-white p-6 shadow-sm"
								>
									<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A52A2A]/10 text-[#A52A2A]">
										<Icon className="h-6 w-6" />
									</div>
									<h3 className="mb-3 text-xl font-bold text-[#1D2146]">{feature.title}</h3>
									<p className="text-sm leading-7 text-[#52607d]">{feature.description}</p>
								</motion.div>
							)
						})}
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 pb-12">
					<div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
						<div className="rounded-[32px] border border-[#dce2f0] bg-white p-6 shadow-sm">
							<div className="mb-5 flex items-center justify-between">
								<div>
									<p className="text-sm font-semibold text-[#A52A2A]">ما الذي بداخل الديمو</p>
									<h3 className="text-2xl font-bold text-[#1D2146]">ملخص المنتج والتفاصيل</h3>
								</div>
								<button
									type="button"
									onClick={() => navigate('/gig/submit')}
									className="rounded-2xl border border-[#1D2146]/15 px-4 py-2 text-sm font-bold text-[#1D2146]"
								>
									اذهب للنموذج
								</button>
							</div>
							<GigAccordionButton title="أبرز التغطيات داخل هذا الديمو" />
						</div>

						<GigInsightCard
							title={gigInsightCard.title}
							description={gigInsightCard.description}
							image={gigInsightCard.image}
							category={gigInsightCard.category}
							author={gigInsightCard.author}
							date={gigInsightCard.date}
							readTime={gigInsightCard.readTime}
							tags={[...gigInsightCard.tags]}
							onReadMore={() => navigate('/gig/crown-family')}
							className="max-w-none"
						/>
					</div>
				</section>
			</main>
		</div>
	)
}
