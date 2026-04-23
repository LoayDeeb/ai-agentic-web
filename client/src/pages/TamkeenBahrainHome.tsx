import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import {
	domainChangeSteps,
	homeFeatureLinks,
	officialBahrainFacts,
	officialSourceLinks,
	TAMKEEN_DARK,
	TAMKEEN_GOLD,
	TAMKEEN_PRIMARY,
	TAMKEEN_RED,
} from '../components/tamkeenbahrain/content'
import { onToolEvent } from '../features/agent/tools'

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
	}),
}

const pulseVariant = {
	animate: {
		scale: [1, 1.04, 1],
		transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
	},
}

const orbVariant = {
	animate: {
		rotate: 360,
		transition: { duration: 18, repeat: Infinity, ease: 'linear' },
	},
}

export default function TamkeenBahrainHome() {
	const navigate = useNavigate()
	const [hoveredStep, setHoveredStep] = React.useState<number | null>(null)
	const [currentTime, setCurrentTime] = React.useState(new Date())

	React.useEffect(() => {
		const id = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToTamkeenSection' && args.sectionId) {
				const element = document.getElementById(String(args.sectionId))
				element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		})
		return unsubscribe
	}, [])

	const formattedDate = currentTime.toLocaleDateString('en-BH', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<TamkeenHeader />

			<div className="flex w-full items-center justify-center gap-2 bg-[#C8102E] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
				<AlertCircle size={14} />
				<span>Important Notice — Effective {formattedDate}</span>
			</div>

			<section
				id="hero"
				className="relative overflow-hidden px-4 py-16 sm:py-24"
				style={{
					background: `linear-gradient(135deg, ${TAMKEEN_DARK} 0%, #16213E 50%, #0F3460 100%)`,
				}}
			>
				<motion.div
					variants={orbVariant}
					animate="animate"
					className="absolute -right-20 -top-20 h-80 w-80 rounded-full border opacity-10"
					style={{ borderColor: TAMKEEN_RED, borderWidth: 2 }}
				/>
				<motion.div
					variants={orbVariant}
					animate="animate"
					className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full border opacity-10"
					style={{ borderColor: TAMKEEN_GOLD, borderWidth: 2, animationDirection: 'reverse' }}
				/>
				<div
					className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
					style={{ backgroundColor: TAMKEEN_RED }}
				/>

				<div className="relative mx-auto max-w-6xl">
					<div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
						<div className="text-left">
							<motion.div variants={pulseVariant} animate="animate" className="mb-6 flex justify-start">
								<div
									className="flex h-20 w-20 items-center justify-center rounded-full shadow-xl"
									style={{ backgroundColor: TAMKEEN_RED }}
								>
									<Globe size={40} color="white" strokeWidth={1.5} />
								</div>
							</motion.div>

							<motion.div
								custom={0}
								variants={fadeUp}
								initial="hidden"
								animate="visible"
								className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm"
								style={{
									backgroundColor: 'rgba(200,16,46,0.2)',
									color: '#FF6B80',
								}}
							>
								BahrainCredit Banking Demo
							</motion.div>

							<motion.h1
								custom={1}
								variants={fadeUp}
								initial="hidden"
								animate="visible"
								className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
							>
								Loans and cards with a{' '}
								<span style={{ color: TAMKEEN_RED }}>voice-guided Bahrain flow</span>
							</motion.h1>

							<motion.p
								custom={2}
								variants={fadeUp}
								initial="hidden"
								animate="visible"
								className="mb-10 max-w-2xl text-base leading-8 text-slate-300 sm:text-xl"
							>
								This experience mirrors the interactive concept used in the ZATCA demo, now adapted
								for Bahrain Credit products, customer questions, and guided navigation across loans
								and IMTIAZ cards.
							</motion.p>

							<motion.div
								custom={3}
								variants={fadeUp}
								initial="hidden"
								animate="visible"
								className="flex flex-col gap-4 sm:flex-row"
							>
								<button
									type="button"
									onClick={() => navigate('/bahraincredit/loans/car-loan')}
									className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:text-base"
									style={{ backgroundColor: TAMKEEN_RED }}
								>
									Open Car Loan Journey
									<ArrowRight size={16} />
								</button>
								<button
									type="button"
									onClick={() => navigate('/bahraincredit/cards/imtiaz')}
									className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 sm:text-base"
									style={{ border: `2px solid ${TAMKEEN_GOLD}`, color: TAMKEEN_GOLD }}
								>
									Explore IMTIAZ Cards
								</button>
							</motion.div>
						</div>

						<motion.div
							custom={4}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
						>
							<div className="mb-5 flex items-center justify-between">
								<div>
									<p className="text-sm uppercase tracking-[0.25em] text-[#f6c35b]">Domain shift</p>
									<h2 className="mt-2 text-2xl font-bold text-white">New digital front door</h2>
								</div>
								<div className="rounded-full bg-white/10 p-3">
									<ExternalLink size={18} className="text-white" />
								</div>
							</div>
							<div className="space-y-4">
								<div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-slate-400">
									<span className="line-through opacity-70">www.bahraincredit.com</span>
								</div>
								<div className="flex justify-center">
									<ArrowRight size={28} color={TAMKEEN_GOLD} strokeWidth={2} />
								</div>
								<div
									className="flex items-center justify-between rounded-2xl px-5 py-4 font-mono text-sm font-bold text-white shadow-lg"
									style={{
										backgroundColor: TAMKEEN_RED,
										boxShadow: '0 0 24px rgba(200,16,46,0.5)',
									}}
								>
									<span>www.bahraincredit.com.bh</span>
									<ExternalLink size={14} />
								</div>
							</div>
							<p className="mt-5 text-sm leading-7 text-slate-300">
								The landing experience introduces the updated domain, then branches customers into
								loan or card journeys with the same voice-agent support pattern used in your existing
								demos.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			<section id="notice" className="bg-gray-50 px-4 py-14">
				<div className="mx-auto max-w-6xl">
					<motion.h2
						custom={0}
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="mb-2 text-2xl font-bold sm:text-3xl"
						style={{ color: TAMKEEN_DARK }}
					>
						What customers need to know
					</motion.h2>
					<motion.p
						custom={1}
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="mb-10 max-w-3xl text-sm text-gray-500 sm:text-base"
					>
						The core transition message is paired with direct access to financing and card discovery,
						so the assistant can answer questions and open the right page immediately.
					</motion.p>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{domainChangeSteps.map((step, index) => (
							<motion.div
								key={step.text}
								custom={index + 2}
								variants={fadeUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								onMouseEnter={() => setHoveredStep(index)}
								onMouseLeave={() => setHoveredStep(null)}
								className="cursor-default rounded-xl border bg-white p-5 shadow-sm transition-all duration-200"
								style={{
									borderColor: hoveredStep === index ? TAMKEEN_RED : 'transparent',
									transform: hoveredStep === index ? 'translateY(-2px)' : 'translateY(0)',
									boxShadow:
										hoveredStep === index
											? '0 8px 24px rgba(200,16,46,0.12)'
											: '0 1px 4px rgba(0,0,0,0.06)',
								}}
							>
								<div className="flex items-start gap-4">
									<div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(200,16,46,0.1)]">
										<step.icon size={18} style={{ color: TAMKEEN_RED }} />
									</div>
									<p className="text-sm leading-relaxed text-gray-700 sm:text-base">{step.text}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section id="products" className="bg-white px-4 py-16">
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-8 shadow-[0_18px_50px_rgba(25,58,133,0.08)]">
						<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: TAMKEEN_PRIMARY }}>
									Official knowledge base
								</p>
								<h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
									Real Bahrain Credit facts for the agent to answer from
								</h2>
								<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
									The BahrainCredit assistant is now meant to rely on official product pages and the
									2024 BCFC annual report, so it can answer with grounded facts instead of generic
									demo copy.
								</p>
								<div className="mt-6 flex flex-wrap gap-3">
									{officialSourceLinks.map((source) => (
										<a
											key={source.label}
											href={source.url}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-50"
											style={{ borderColor: '#cbd5e1', color: TAMKEEN_PRIMARY }}
										>
											{source.label}
											<ExternalLink size={14} />
										</a>
									))}
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								{officialBahrainFacts.map((fact) => (
									<div
										key={fact.title}
										className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
									>
										<h3 className="text-lg font-semibold text-slate-900">{fact.title}</h3>
										<p className="mt-3 text-sm leading-7 text-slate-600">{fact.description}</p>
										<a
											href={fact.sourceUrl}
											target="_blank"
											rel="noreferrer"
											className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
											style={{ color: TAMKEEN_PRIMARY }}
										>
											{fact.sourceLabel}
											<ExternalLink size={14} />
										</a>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mb-10 max-w-3xl">
						<p className="text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: TAMKEEN_PRIMARY }}>
							Product map
						</p>
						<h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
							Three interactive entry points for the Bahrain journey
						</h2>
					</div>

					<div className="grid gap-6 lg:grid-cols-3">
						{homeFeatureLinks.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.45, delay: index * 0.08 }}
								className="group rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-7 shadow-[0_18px_50px_rgba(25,58,133,0.08)]"
							>
								<div
									className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
									style={{ background: 'linear-gradient(135deg, #193a85 0%, #2f5dc2 100%)' }}
								>
									<item.icon size={26} className="text-white" />
								</div>
								<h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
								<p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
								<Link
									to={item.path}
									className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1"
									style={{ color: TAMKEEN_PRIMARY }}
								>
									Open page
									<ArrowRight size={16} />
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section
				className="px-4 py-10 text-center"
				style={{ background: `linear-gradient(90deg, ${TAMKEEN_DARK} 0%, #0F3460 100%)` }}
			>
				<p className="text-sm font-medium text-white sm:text-base">
					For assistance, contact{' '}
					<a
						href="mailto:bcfcinfo@bahraincredit.com.bh"
						className="underline"
						style={{ color: TAMKEEN_GOLD }}
					>
						bcfcinfo@bahraincredit.com.bh
					</a>{' '}
					or call{' '}
					<a href="tel:80008000" className="underline" style={{ color: TAMKEEN_GOLD }}>
						80008000
					</a>
				</p>
				<p className="mt-3 text-xs text-gray-400">© {new Date().getFullYear()} Bahrain Credit — All Rights Reserved.</p>
			</section>
		</div>
	)
}
