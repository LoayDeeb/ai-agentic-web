import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import {
	appStores,
	cardFooterButtons,
	creditCards,
	eligibilityCategories,
	imtiazBenefits,
	imtiazPerks,
	imtiazSidebarLinks,
	TAMKEEN_PRIMARY,
	TAMKEEN_SURFACE,
} from '../components/tamkeenbahrain/content'
import { onToolEvent } from '../features/agent/tools'

export default function TamkeenBahrainCards() {
	const navigate = useNavigate()
	const trackRef = React.useRef<HTMLDivElement>(null)
	const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null)

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

	const scrollCarousel = (direction: 'left' | 'right') => {
		trackRef.current?.scrollBy({
			left: direction === 'left' ? -300 : 300,
			behavior: 'smooth',
		})
	}

	const handleCardAction = (label: string) => {
		if (label === 'Apply for IMTIAZ') {
			navigate('/BahrainCredit/cards/apply?card=imtiaz')
		}
	}

	return (
		<div className="min-h-screen" style={{ backgroundColor: TAMKEEN_SURFACE, fontFamily: 'Poppins, sans-serif' }}>
			<TamkeenHeader />

			<section className="w-full px-0 py-6">
				<div className="mx-auto max-w-[1170px] px-4">
					<div className="flex flex-col gap-0 md:flex-row">
						<aside className="mb-6 w-full flex-shrink-0 px-4 md:mb-0 md:w-[25%] md:max-w-[292px]">
							<div className="mb-8">
								<ul className="m-0 list-none p-0">
									{imtiazSidebarLinks.map((link) => (
										<li
											key={link.label}
											className="mb-[3px] cursor-pointer"
											style={{ backgroundColor: link.active ? 'rgb(8,59,138)' : 'rgb(241,241,241)' }}
										>
											<a
												href={link.path || '#'}
												onClick={(e) => {
													e.preventDefault()
													if (link.path) navigate(link.path)
												}}
												className="block px-4 py-[15px] text-sm font-bold no-underline transition-all duration-300"
												style={{ color: link.active ? '#ffffff' : 'rgb(45,45,45)' }}
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-white bg-[rgb(26,66,138)] p-2">
											<p className="py-1 text-center text-sm font-bold text-white">Join Our Exciting Community</p>
										</td>
									</tr>
									<tr>
										<td className="border border-white bg-[rgb(241,241,241)] p-3 text-center">
											<p className="mb-1 text-sm text-gray-700">Call us on our Toll-Free</p>
											<p className="mb-1 text-sm font-bold text-blue-600">80008000</p>
											<p className="mb-1 text-xs text-gray-600">Or our international number</p>
											<p className="text-xs font-bold text-blue-600">0097317787222</p>
										</td>
									</tr>
									<tr>
										<td className="border border-white bg-[rgb(241,241,241)] p-2 text-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-blue-600">
												Or Fill out a form Here
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</aside>

						<main className="w-full px-4 md:flex-1">
							<nav className="mb-2">
								<ul className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
									<li className="flex items-center gap-1">
										<Link to="/BahrainCredit" className="flex items-center gap-1 text-xs text-gray-400 no-underline">
											<Home size={12} />
											<span>Home</span>
										</Link>
										<ChevronRight size={10} className="ml-1 text-gray-400" />
									</li>
									<li className="flex items-center gap-1">
										<span className="text-xs text-gray-400">Cards</span>
										<ChevronRight size={10} className="ml-1 text-gray-400" />
									</li>
									<li>
										<span className="text-xs text-gray-400">IMTIAZ</span>
									</li>
								</ul>
							</nav>

							<h1 className="mb-6 text-[35px] font-medium leading-[58px] text-[#222222] tracking-[-0.4px]">IMTIAZ Cards</h1>

							<p className="mb-5 max-w-[800px] text-justify text-sm leading-relaxed text-gray-700">
								IMTIAZ credit cards are designed with your lifestyle in mind. Whether you are looking
								for travel privileges, everyday rewards, or premium service support, Bahrain Credit
								can guide you to the right card variant with the same interactive assistance model used
								throughout this demo.
							</p>

							<section
								id="card-perks"
								className="mb-8 rounded-xl bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
								style={{
									outline:
										highlightedSection === 'card-perks' ? '3px solid rgba(25,58,133,0.25)' : 'none',
								}}
							>
								<h2
									className="mb-4 text-center text-[30px] font-medium leading-[33px]"
									style={{ color: TAMKEEN_PRIMARY }}
								>
									Perks of IMTIAZ Mastercard<sup className="text-xs">®</sup> Credit Card
								</h2>
								<ul className="m-0 list-none p-0">
									{imtiazPerks.map((perk) => (
										<li key={perk.title} className="relative mb-3 pl-4 text-sm leading-relaxed text-gray-700">
											<span className="absolute left-0 top-0 font-bold" style={{ color: TAMKEEN_PRIMARY }}>
												•
											</span>
											<strong className="font-black">{perk.title}: </strong>
											{perk.description}
										</li>
									))}
								</ul>
							</section>

							<h3
								className="mb-5 px-3 text-center text-[24px] font-medium leading-[26.4px]"
								style={{ color: TAMKEEN_PRIMARY }}
							>
								General Features Across All IMTIAZ Cards
							</h3>

							<section
								id="card-features"
								className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
								style={{
									outline:
										highlightedSection === 'card-features' ? '3px solid rgba(25,58,133,0.25)' : 'none',
									outlineOffset: '10px',
								}}
							>
								{imtiazBenefits.map((benefit, index) => (
									<motion.div
										key={benefit.title}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: index * 0.07 }}
										whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
										className="cursor-default rounded-xl bg-white p-4 shadow-sm"
										style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}
									>
										<div className="mb-2" style={{ color: TAMKEEN_PRIMARY }}>
											<benefit.icon size={24} />
										</div>
										<h3 className="mb-1 text-sm font-medium" style={{ color: TAMKEEN_PRIMARY }}>
											{benefit.title}
										</h3>
										<p className="text-sm leading-relaxed text-gray-600">{benefit.description}</p>
									</motion.div>
								))}
							</section>

							<section
								id="card-eligibility"
								className="mb-8 rounded-xl bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
								style={{
									outline:
										highlightedSection === 'card-eligibility' ? '3px solid rgba(25,58,133,0.25)' : 'none',
								}}
							>
								<h2
									className="mb-5 text-center text-[30px] font-medium leading-[33px]"
									style={{ color: TAMKEEN_PRIMARY }}
								>
									Who Can Apply?
								</h2>
								<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
									{eligibilityCategories.map((category) => (
										<div key={category.title} className="rounded-lg p-4" style={{ backgroundColor: TAMKEEN_SURFACE }}>
											<h3
												className="mb-3 border-b-2 pb-2 text-xl font-medium"
												style={{ color: TAMKEEN_PRIMARY, borderColor: TAMKEEN_PRIMARY }}
											>
												{category.title}
											</h3>
											<ul className="m-0 list-none p-0">
												{category.items.map((item) => (
													<li key={item} className="relative mb-2 pl-4 text-sm leading-relaxed text-gray-700">
														<span className="absolute left-0 top-0 font-bold" style={{ color: TAMKEEN_PRIMARY }}>
															•
														</span>
														{item}
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</section>

							<section
								id="card-carousel"
								className="mb-6"
								style={{
									outline:
										highlightedSection === 'card-carousel' ? '3px solid rgba(25,58,133,0.25)' : 'none',
									outlineOffset: '10px',
								}}
							>
								<h3
									className="mb-4 px-3 text-center text-[24px] font-medium leading-[26.4px]"
									style={{ color: TAMKEEN_PRIMARY }}
								>
									Choose Your IMTIAZ Mastercard<sup className="text-xs">®</sup> Credit Card
								</h3>
								<div className="relative w-full">
									<button
										onClick={() => scrollCarousel('left')}
										className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
										style={{ color: TAMKEEN_PRIMARY }}
										aria-label="Scroll left"
									>
										<ChevronLeft size={18} />
									</button>
									<div
										ref={trackRef}
										className="flex gap-4 overflow-x-auto px-10 py-3"
										style={{
											scrollSnapType: 'x mandatory',
											scrollBehavior: 'smooth',
											WebkitOverflowScrolling: 'touch',
											scrollbarWidth: 'none',
											msOverflowStyle: 'none',
										}}
									>
										{creditCards.map((card) => (
											<motion.a
												key={card.label}
												href={card.path || '#'}
												onClick={(e) => {
													e.preventDefault()
													if (card.path) navigate(card.path)
												}}
												className="w-[280px] flex-none overflow-hidden rounded-2xl no-underline"
												style={{ scrollSnapAlign: 'start', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
												whileHover={{ y: -5 }}
											>
												<img src={card.img} alt={card.alt} className="block h-[180px] w-full object-cover" />
												<p className="m-0 bg-white px-2 py-3 text-center text-sm font-medium text-[#333]">
													{card.label}
												</p>
											</motion.a>
										))}
									</div>
									<button
										onClick={() => scrollCarousel('right')}
										className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
										style={{ color: TAMKEEN_PRIMARY }}
										aria-label="Scroll right"
									>
										<ChevronRight size={18} />
									</button>
								</div>
								<p className="mt-3 px-4 text-center text-sm text-gray-600">
									Specific benefits vary by card tier. Open IMTIAZ World for the premium travel-led
									experience.
								</p>
							</section>

							<div className="mb-6 rounded-xl bg-white px-4 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
								<div className="flex flex-wrap justify-center gap-3">
									{cardFooterButtons.map((button) => (
										<motion.a
											key={button.label}
											href="#"
											onClick={(e) => {
												e.preventDefault()
												handleCardAction(button.label)
											}}
											className="flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium no-underline"
											style={{ borderColor: TAMKEEN_PRIMARY, color: TAMKEEN_PRIMARY, backgroundColor: '#ffffff' }}
											whileHover={{ backgroundColor: TAMKEEN_PRIMARY, color: '#ffffff', y: -2 }}
										>
											{button.icon}
											{button.label === 'Apply for IMTIAZ' ? 'Apply for IMTIAZ Credit Card' : button.label}
										</motion.a>
									))}
								</div>
							</div>

							<div className="mb-4 rounded-xl bg-[rgb(248,249,250)] px-4 py-6 text-center">
								<motion.h3
									className="mb-2 text-[24px] font-medium text-gray-800"
									animate={{ scale: [1, 1.02, 1] }}
									transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
								>
									Download Sahel by BCFC Mobile App
								</motion.h3>
								<p className="mx-auto mb-5 max-w-xl text-sm text-gray-500">
									Get the best experience by downloading Sahel by BCFC from your preferred app store.
								</p>
								<div className="flex flex-wrap justify-center gap-3">
									{appStores.map((store) => (
										<a
											key={store}
											href="#"
											onClick={(e) => e.preventDefault()}
											className="rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline transition-all duration-200 hover:opacity-90"
											style={{
												backgroundColor:
													store === 'App Store' ? '#000000' : store === 'Google Play' ? '#3dba4e' : '#cf0a2c',
											}}
										>
											{store}
										</a>
									))}
								</div>
							</div>
						</main>
					</div>
				</div>
			</section>
		</div>
	)
}
