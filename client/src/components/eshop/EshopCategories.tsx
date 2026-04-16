import React from 'react'
import { motion } from 'framer-motion'
import { useLocaleStore } from '../../store/locale'
import { eshopCopy } from './content'

type Category = {
	name: string
	icon: React.ReactNode
}

const categories: Category[] = [
	{ name: 'Prepaid', icon: <PrepaidIcon /> },
	{ name: 'Fiber', icon: <FiberIcon /> },
	{ name: 'Smartphone', icon: <SmartphoneIcon /> },
	{ name: 'Postpaid', icon: <PostpaidIcon /> },
	{ name: 'eVouchers', icon: <EVouchersIcon /> },
]

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
		},
	},
}

const cardVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: 'easeOut' },
	},
}

export function EshopCategories() {
	const { lang } = useLocaleStore()
	const copy = eshopCopy.categories[lang]

	return (
		<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:p-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d12b8a]">
						{copy.kicker}
					</p>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						{copy.title}
					</h2>
					<p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
						{copy.description}
					</p>
				</div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5"
				>
					{categories.map((category, index) => (
						<motion.a
							key={category.name}
							href="#"
							onClick={(event) => event.preventDefault()}
							variants={cardVariants}
							whileHover={{
								scale: 1.03,
								boxShadow: '0 18px 44px rgba(0, 155, 222, 0.12)',
							}}
							whileTap={{ scale: 0.98 }}
							className="group flex min-h-[210px] flex-col items-center justify-center rounded-3xl border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-5 text-center transition-colors hover:border-[#009BDE]/35"
						>
							<div className="flex h-20 items-center justify-center">{category.icon}</div>
							<div className="mt-4 text-base font-bold text-slate-900">{copy.names[index]}</div>
							<p className="mt-2 max-w-[14rem] text-sm text-slate-500 transition-colors group-hover:text-slate-700">
								{copy.cardCopy}
							</p>
						</motion.a>
					))}
				</motion.div>
			</div>
		</section>
	)
}

function PrepaidIcon() {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="8" y="16" width="48" height="32" rx="4" fill="#E8F4FD" />
			<rect x="8" y="16" width="48" height="32" rx="4" stroke="#009BDE" strokeWidth="2" />
			<rect x="14" y="26" width="12" height="8" rx="2" fill="#009BDE" />
			<circle cx="46" cy="36" r="3" fill="#009BDE" opacity="0.4" />
			<circle cx="52" cy="36" r="3" fill="#009BDE" />
			<rect x="14" y="38" width="20" height="2" rx="1" fill="#009BDE" opacity="0.5" />
			<path d="M38 20L50 8L56 14L44 26Z" fill="#F7A800" />
			<path d="M50 8L56 14L54 16L48 10Z" fill="#E09000" />
			<circle cx="42" cy="18" r="2" fill="#fff" />
		</svg>
	)
}

function FiberIcon() {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="6" y="30" width="52" height="20" rx="4" fill="#E8F4FD" stroke="#009BDE" strokeWidth="2" />
			<rect x="12" y="36" width="6" height="2" rx="1" fill="#009BDE" />
			<rect x="12" y="40" width="6" height="2" rx="1" fill="#009BDE" opacity="0.5" />
			<path d="M32 30V18" stroke="#009BDE" strokeWidth="2" strokeLinecap="round" />
			<path d="M24 22Q32 14 40 22" stroke="#009BDE" strokeWidth="2" fill="none" strokeLinecap="round" />
			<path d="M20 26Q32 10 44 26" stroke="#009BDE" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
			<circle cx="32" cy="18" r="2" fill="#009BDE" />
			<circle cx="46" cy="38" r="2" fill="#F7A800" />
			<circle cx="50" cy="38" r="2" fill="#F7A800" opacity="0.5" />
		</svg>
	)
}

function SmartphoneIcon() {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="18" y="6" width="28" height="52" rx="5" fill="#E8F4FD" stroke="#009BDE" strokeWidth="2" />
			<rect x="22" y="12" width="20" height="32" rx="2" fill="#009BDE" opacity="0.15" />
			<rect x="22" y="12" width="20" height="32" rx="2" stroke="#009BDE" strokeWidth="1" />
			<circle cx="32" cy="52" r="2" fill="#009BDE" />
			<rect x="28" y="8" width="8" height="2" rx="1" fill="#009BDE" opacity="0.4" />
			<path d="M26 24L30 28L38 20" stroke="#F7A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function PostpaidIcon() {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="16" y="12" width="32" height="40" rx="4" fill="#E8F4FD" stroke="#009BDE" strokeWidth="2" />
			<path d="M24 28Q32 20 40 28" stroke="#009BDE" strokeWidth="2" fill="none" strokeLinecap="round" />
			<path d="M27 33Q32 27 37 33" stroke="#009BDE" strokeWidth="2" fill="none" strokeLinecap="round" />
			<circle cx="32" cy="37" r="2" fill="#009BDE" />
			<rect x="22" y="18" width="10" height="2" rx="1" fill="#009BDE" opacity="0.4" />
			<rect x="22" y="22" width="20" height="1" rx="0.5" fill="#009BDE" opacity="0.2" />
			<path d="M22 44H42" stroke="#F7A800" strokeWidth="2" strokeLinecap="round" />
		</svg>
	)
}

function EVouchersIcon() {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="6" y="18" width="52" height="28" rx="4" fill="#E8F4FD" stroke="#009BDE" strokeWidth="2" />
			<circle cx="6" cy="32" r="6" fill="#f5f5f5" stroke="#009BDE" strokeWidth="2" />
			<circle cx="58" cy="32" r="6" fill="#f5f5f5" stroke="#009BDE" strokeWidth="2" />
			<path d="M14 32H50" stroke="#009BDE" strokeWidth="1.5" strokeDasharray="3 3" />
			<path d="M20 26L28 38L44 24" stroke="#F7A800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
