import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, ChevronRight, DollarSign, FileText, HeadphonesIcon } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import {
	appStores,
	carLoanBenefits,
	footerButtons,
	loanSidebarLinks,
	TAMKEEN_PRIMARY,
} from '../components/tamkeenbahrain/content'
import { onToolEvent } from '../features/agent/tools'

export default function TamkeenBahrainCarLoan() {
	const navigate = useNavigate()
	const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null)

		const handleLoanAction = (label: string) => {
		if (label === 'Apply Now') {
			navigate('/bahraincredit/loans/car-loan/apply')
		}
	}

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToTamkeenSection' && args.sectionId) {
				const sectionId = String(args.sectionId)
				document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
				setHighlightedSection(sectionId)
				window.setTimeout(() => setHighlightedSection(null), 2200)
			}
		})
		return unsubscribe
	}, [])

	return (
		<div className="min-h-screen bg-[#f1f1f1]" style={{ fontFamily: 'Poppins, sans-serif' }}>
			<TamkeenHeader />

			<div className="mx-auto max-w-[1200px] px-5 py-10">
				<div className="flex flex-col gap-8 lg:flex-row">
					<aside className="w-full flex-shrink-0 lg:w-[280px]">
						<div className="mb-6">
							<ul className="m-0 list-none p-0">
								{loanSidebarLinks.map((link) => (
									<li key={link.label} className="mb-[3px] last:mb-0">
										<a
											href={link.path || '#'}
											onClick={(e) => {
												e.preventDefault()
												if (link.path) navigate(link.path)
											}}
											className="block px-4 py-[15px] text-sm font-bold no-underline transition-all duration-300"
											style={{
												color: link.active ? '#fff' : '#2d2d2d',
												backgroundColor: link.active ? 'rgb(8,59,138)' : 'rgb(241,241,241)',
											}}
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className="overflow-hidden rounded-sm border border-[#e0e0e0]">
							<div className="bg-[rgb(26,66,138)] p-3 text-center">
								<span className="text-sm font-bold text-white">Join Our Exciting Community</span>
							</div>
							<div className="bg-[rgb(241,241,241)] px-4 py-5 text-center">
								<p className="mb-1 text-[13px] text-[#333]">Call us on our Toll-Free</p>
								<p className="mb-2 text-sm font-bold text-[rgb(51,122,183)]">80008000</p>
								<p className="mb-1 text-[13px] text-[#333]">Or our international number</p>
								<p className="text-[13px] font-bold text-[rgb(51,122,183)]">0097317787222</p>
							</div>
							<div className="border-t border-white bg-[rgb(241,241,241)] p-3 text-center">
								<a href="#" onClick={(e) => e.preventDefault()} className="text-[13px] text-[rgb(51,122,183)] no-underline">
									Or Fill out a form Here
								</a>
							</div>
						</div>
					</aside>

					<main className="min-w-0 flex-1">
						<nav className="mb-3">
							<ul className="m-0 flex list-none flex-wrap items-center p-0 text-[13px] text-[rgb(153,153,153)]">
								{['Home', 'Loans', 'Car Loan'].map((crumb, index, array) => (
									<li key={crumb} className="inline-flex items-center">
										{index < array.length - 1 ? (
											<>
												<Link to="/bahraincredit" className="no-underline text-[rgb(153,153,153)]">
													{crumb}
												</Link>
												<ChevronRight size={12} className="mx-1 text-[rgb(153,153,153)]" />
											</>
										) : (
											<span>{crumb}</span>
										)}
									</li>
								))}
							</ul>
						</nav>

						<h1 className="mb-6 text-[35px] font-bold leading-[1.2] tracking-[-0.4px] text-[rgb(34,34,34)]">
							Car Loan
						</h1>

						<section
							id="loan-summary"
							className="mb-8 rounded-xl bg-white p-10 shadow-[0_10px_30px_rgba(25,58,133,0.1)]"
							style={{
								outline:
									highlightedSection === 'loan-summary' ? `3px solid rgba(25,58,133,0.25)` : 'none',
							}}
						>
							<h2 className="mb-5 text-[28px] font-bold leading-[1.3]" style={{ color: TAMKEEN_PRIMARY }}>
								At Bahrain Credit, we believe one visit should be enough
							</h2>
							<p className="m-0 text-lg font-light leading-[1.7] text-[#555]">
								We make taking your dream car home a reality with fast decisioning, flexible
								repayment terms, and a guided digital journey designed for Bahrain customers.
							</p>
						</section>

						<section
							id="loan-benefits"
							className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
							style={{
								outline:
									highlightedSection === 'loan-benefits' ? `3px solid rgba(25,58,133,0.25)` : 'none',
								outlineOffset: '14px',
							}}
						>
							{carLoanBenefits.map((card, index) => (
								<motion.div
									key={card.title}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
									whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(25,58,133,0.15)' }}
									className="rounded-[10px] border-t-4 bg-white p-[25px] shadow-[0_5px_15px_rgba(25,58,133,0.08)]"
									style={{ borderTopColor: TAMKEEN_PRIMARY }}
								>
									<h3 className="mb-4 mt-0 text-[20px] font-medium leading-[1.3]" style={{ color: TAMKEEN_PRIMARY }}>
										{card.title}
									</h3>
									<p className="m-0 text-sm leading-[1.6] text-[#555]">{card.description}</p>
								</motion.div>
							))}
						</section>

						<section
							id="loan-actions"
							className="mt-8 rounded-lg bg-white px-5 pb-2 pt-7 text-center"
							style={{
								outline:
									highlightedSection === 'loan-actions' ? `3px solid rgba(25,58,133,0.25)` : 'none',
							}}
						>
							<div className="mb-6 flex flex-wrap justify-center gap-3">
								{footerButtons.map((button, index) => {
									const icon =
										index === 0 ? (
											<Car size={18} className="mr-2" />
										) : index === 1 ? (
											<DollarSign size={18} className="mr-2" />
										) : index === 2 ? (
											<HeadphonesIcon size={18} className="mr-2" />
										) : (
											<FileText size={18} className="mr-2" />
										)
									return (
										<motion.a
											key={button.label}
											href="#"
											onClick={(e) => {
												e.preventDefault()
												handleLoanAction(button.label)
											}}
											whileHover={{ y: -2, backgroundColor: TAMKEEN_PRIMARY, color: '#fff' }}
											className="inline-flex items-center whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-medium no-underline"
											style={{
												backgroundColor: '#fff',
												color: TAMKEEN_PRIMARY,
												borderColor: TAMKEEN_PRIMARY,
											}}
										>
											{icon}
											{index === 0 ? 'Apply for Car Loan' : button.label}
										</motion.a>
									)
								})}
							</div>
						</section>

						<section id="loan-app" className="mt-4 rounded-lg bg-[rgb(248,249,250)] px-5 py-6 text-center">
							<h3 className="mb-3 text-[20px] font-medium text-[#333]">Download Sahel by BCFC Mobile App</h3>
							<p className="mx-auto mb-5 max-w-[600px] text-sm text-[#666]">
								Get the best experience by downloading Sahel by BCFC from your preferred app store.
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								{appStores.map((store) => (
									<a
										key={store}
										href="#"
										onClick={(e) => e.preventDefault()}
										className="inline-flex items-center rounded-md border px-[18px] py-2 text-[13px] font-semibold no-underline"
										style={{ borderColor: TAMKEEN_PRIMARY, color: TAMKEEN_PRIMARY, backgroundColor: '#fff' }}
									>
										{store}
									</a>
								))}
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	)
}
