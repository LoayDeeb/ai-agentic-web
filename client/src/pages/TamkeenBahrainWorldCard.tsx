import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import {
	appStores,
	cardFooterButtons,
	TAMKEEN_PRIMARY,
	TAMKEEN_PRIMARY_DARK,
	worldSections,
	worldSidebarLinks,
} from '../components/tamkeenbahrain/content'
import { onToolEvent } from '../features/agent/tools'

const breadcrumbs = [
	{ label: 'Home', href: '/bahraincredit' },
	{ label: 'Cards', href: '/bahraincredit/cards/imtiaz' },
	{ label: 'IMTIAZ World', href: '/bahraincredit/cards/world' },
	{ label: 'IMTIAZ World Credit Card', href: null },
]

export default function TamkeenBahrainWorldCard() {
	const navigate = useNavigate()
	const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({ peace: true })

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToTamkeenSection' && args.sectionId) {
				const sectionId = String(args.sectionId)
				setOpenSections((prev) => ({ ...prev, [sectionId]: true }))
				window.setTimeout(() => {
					document.getElementById(`tamkeen-world-${sectionId}`)?.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				}, 80)
			}
		})
		return unsubscribe
	}, [])

	const toggleSection = (id: string) => {
		setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	return (
		<div className="min-h-screen bg-[#f1f1f1]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
			<TamkeenHeader />

			<section className="w-full px-4 py-8">
				<div className="mx-auto max-w-[1170px]">
					<div className="flex flex-col items-start gap-0 md:flex-row">
						<aside className="order-2 mt-6 w-full flex-shrink-0 pr-0 md:order-1 md:mt-0 md:w-[25%] md:pr-4">
							<div className="mb-8">
								<ul className="m-0 list-none p-0">
									{worldSidebarLinks.map((link, index) => (
										<li
											key={link.label}
											className="mb-[3px] text-sm font-bold last:mb-0"
											style={{
												fontFamily: 'Poppins, sans-serif',
												background: link.active ? 'rgb(8,59,138)' : 'rgb(241,241,241)',
												marginBottom: index === worldSidebarLinks.length - 1 ? 0 : 3,
											}}
										>
											<a
												href={link.path || '#'}
												onClick={(e) => {
													e.preventDefault()
													if (link.path) navigate(link.path)
												}}
												className="block px-4 py-[15px] text-sm font-bold no-underline"
												style={{ color: link.active ? '#ffffff' : 'rgb(45,45,45)' }}
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<table className="w-full border-collapse" cellPadding={0} cellSpacing={0}>
								<tbody>
									<tr>
										<td className="border border-white px-3 py-2 text-center" style={{ background: 'rgb(26,66,138)' }}>
											<span className="text-sm font-bold text-white">Join Our Exciting Community</span>
										</td>
									</tr>
									<tr>
										<td className="border border-white px-3 py-3" style={{ background: 'rgb(241,241,241)' }}>
											<p className="mb-1 text-center text-sm">Call us on our Toll-Free</p>
											<p className="mb-1 text-center">
												<a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-[rgb(51,122,183)]">
													80008000
												</a>
											</p>
											<p className="mb-1 text-center text-xs">Or our international number</p>
											<p className="text-center">
												<a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-[rgb(51,122,183)]">
													0097317787222
												</a>
											</p>
										</td>
									</tr>
									<tr>
										<td className="border border-white px-3 py-2" style={{ background: 'rgb(241,241,241)' }}>
											<p className="m-0 text-center">
												<a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-[rgb(51,122,183)]">
													Or Fill out a form Here
												</a>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</aside>

						<main className="order-1 w-full flex-1 pl-0 md:order-2 md:w-[75%] md:pl-4">
							<nav aria-label="breadcrumb" className="mb-2">
								<ul className="m-0 flex list-none flex-wrap items-center p-0 text-xs text-[rgb(153,153,153)]">
									{breadcrumbs.map((crumb, index) => (
										<li key={crumb.label} className="mr-1 inline-flex items-center">
											{crumb.href ? (
												<Link to={crumb.href} className="text-[rgb(153,153,153)] no-underline">
													{crumb.label}
												</Link>
											) : (
												<span>{crumb.label}</span>
											)}
											{index < breadcrumbs.length - 1 ? <span className="mx-2">/</span> : null}
										</li>
									))}
								</ul>
							</nav>

							<div className="mb-5">
								<h1
									className="mb-0 mt-5 text-left text-[35px] font-medium leading-[58px] tracking-[-0.4px] text-[rgb(34,34,34)]"
									style={{ fontFamily: 'Poppins, sans-serif' }}
								>
									IMTIAZ World Mastercard®
								</h1>
							</div>

							<motion.div
								className="mb-8 w-full overflow-hidden rounded-xl"
								style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
								animate={{ scale: [1, 1.02, 1] }}
								transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
							>
								<img
									src="https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/Thumbnails/IMTIAZWorldTopBanner.jpg"
									alt="IMTIAZ World Mastercard"
									className="block w-full"
									style={{ maxHeight: 220, objectFit: 'cover' }}
								/>
							</motion.div>

							<div
								className="mb-8 w-full rounded-xl p-9 text-center"
								style={{ background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: TAMKEEN_PRIMARY }}
							>
								<h2
									className="mb-4 mt-0 text-[22px] font-bold leading-[1.1]"
									style={{ fontFamily: 'Poppins, sans-serif', color: TAMKEEN_PRIMARY }}
								>
									Welcome to IMTIAZ World Mastercard<sup>®</sup> Credit Card
								</h2>
								<p className="m-0 text-sm leading-relaxed opacity-90" style={{ color: TAMKEEN_PRIMARY }}>
									Unlock a world of luxury, convenience, and seamless financial experiences with a
									card designed for frequent travellers and professionals who want rewards, protection,
									and premium access in one place.
								</p>
							</div>

							{worldSections.map((section) => {
								const Icon = section.icon
								const isOpen = Boolean(openSections[section.id])
								return (
									<div
										key={section.id}
										id={`tamkeen-world-${section.id}`}
										className="mb-5 overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
									>
										<button
											onClick={() => toggleSection(section.id)}
											className="relative flex w-full cursor-pointer items-center px-6 py-[18px] text-base font-semibold text-white transition-all duration-300"
											style={{
												background: isOpen
													? `linear-gradient(135deg, ${TAMKEEN_PRIMARY_DARK} 0%, #163d8a 100%)`
													: `linear-gradient(135deg, ${TAMKEEN_PRIMARY} 0%, #1a4ba1 100%)`,
											}}
											aria-expanded={isOpen}
										>
											<span className="mr-4 flex-shrink-0">
												<Icon size={16} />
											</span>
											<span className="flex-1 text-left">{section.title}</span>
											<span className="ml-auto flex-shrink-0">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
										</button>
										<AnimatePresence initial={false}>
											{isOpen ? (
												<motion.div
													key="content"
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
													style={{ overflow: 'hidden' }}
												>
													<div className="p-6">
														<div
															className="mb-5 rounded-r-sm border-l-4 bg-[rgba(25,58,133,0.08)] py-3 pl-4 pr-3 text-sm text-gray-700"
															style={{ borderLeftColor: TAMKEEN_PRIMARY }}
														>
															{section.highlight}
														</div>
														<ul className="m-0 list-disc space-y-2 pl-5">
															{section.items.map((item) => (
																<li key={item} className="text-sm leading-relaxed text-gray-700">
																	{item}
																</li>
															))}
														</ul>
													</div>
												</motion.div>
											) : null}
										</AnimatePresence>
									</div>
								)
							})}

							<div className="mb-8 mt-2 flex flex-wrap justify-center gap-3">
								{cardFooterButtons.map((button) => (
									<a
										key={button.label}
										href="#"
										onClick={(e) => {
											e.preventDefault()
											if (button.label === 'Apply for IMTIAZ') {
												navigate('/bahraincredit/cards/apply?card=world')
											}
										}}
										className="flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium no-underline transition-all duration-300 hover:-translate-y-0.5"
										style={{ background: '#ffffff', color: TAMKEEN_PRIMARY, borderColor: TAMKEEN_PRIMARY }}
									>
										{button.icon}
										{button.label}
									</a>
								))}
							</div>

							<div className="w-full rounded-xl bg-[rgb(248,249,250)] px-5 py-6">
								<div className="text-center">
									<motion.h3
										className="mb-4 mt-5 text-2xl font-medium text-[rgb(51,51,51)]"
										style={{ fontFamily: 'Poppins, sans-serif' }}
										animate={{ scale: [1, 1.02, 1] }}
										transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
									>
										Download Sahel by BCFC Mobile App
									</motion.h3>
									<p className="mb-6 text-sm text-[rgb(102,102,102)]">
										Get the best experience by downloading Sahel by BCFC from your preferred app store.
									</p>
									<div className="flex flex-wrap justify-center gap-3">
										{appStores.map((store) => (
											<a
												key={store}
												href="#"
												onClick={(e) => e.preventDefault()}
												className="rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline"
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
							</div>
						</main>
					</div>
				</div>
			</section>
		</div>
	)
}
