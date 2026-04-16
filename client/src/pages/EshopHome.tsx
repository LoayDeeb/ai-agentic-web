import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, CreditCard, Gift, ShieldCheck, Smartphone, Wifi } from 'lucide-react'
import {
	EshopBrandStrip,
	EshopCartDrawer,
	EshopCategories,
	EshopHeader,
	EshopProductCarousel,
} from '../components/eshop'
import {
	appleProducts,
	bestSellerProducts,
	eshopSectionIds,
	newArrivalProducts,
} from '../components/eshop/catalog'
import { onToolEvent } from '../features/agent/tools'
import { useEshopStore } from '../store/eshopStore'

const quickHighlights = [
	{
		title: 'Plans & top-up',
		copy: 'Prepaid, postpaid, and recharge bundles sorted for the fastest path to purchase.',
		icon: <CreditCard size={20} />,
	},
	{
		title: 'Devices & accessories',
		copy: 'Phones, tablets, smart home gear, and add-ons from the brands people already know.',
		icon: <Smartphone size={20} />,
	},
	{
		title: 'Fiber & gifting',
		copy: 'Home internet, eVouchers, and giftable extras wrapped into one storefront.',
		icon: <Wifi size={20} />,
	},
]

const signals = [
	{ label: 'Secure checkout', icon: <ShieldCheck size={16} /> },
	{ label: 'Instant eVouchers', icon: <Gift size={16} /> },
	{ label: 'Flexible payment', icon: <CreditCard size={16} /> },
]

export default function EshopHome() {
	const location = useLocation()
	const navigate = useNavigate()
	const items = useEshopStore((state) => state.items)
	const isCartOpen = useEshopStore((state) => state.isCartOpen)
	const addItem = useEshopStore((state) => state.addItem)
	const openCart = useEshopStore((state) => state.openCart)
	const closeCart = useEshopStore((state) => state.closeCart)
	const removeItem = useEshopStore((state) => state.removeItem)
	const itemCount = useEshopStore((state) => state.getItemCount())
	const cartTotal = useEshopStore((state) => state.getCartTotal())

	React.useEffect(() => {
		const scrollToHash = (hash: string) => {
			if (!hash) return
			const element = document.getElementById(hash.replace(/^#/, ''))
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		}

		if (location.hash) {
			const timer = window.setTimeout(() => scrollToHash(location.hash), 120)
			return () => window.clearTimeout(timer)
		}
	}, [location.hash])

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToEshopSection' && args.sectionId) {
				const element = document.getElementById(String(args.sectionId))
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
				}
			}
		})

		return unsubscribe
	}, [])

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,#efe6ff_0%,#f5f6fb_26%,#f8f9fc_60%,#f4f7fb_100%)] text-slate-900">
			<EshopHeader itemCount={itemCount} onCartClick={openCart} />

			<main className="pb-16">
				<section className="relative overflow-hidden bg-[linear-gradient(135deg,#1a0050_0%,#29006f_58%,#3a0b84_100%)] text-white">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(0,155,222,0.24),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(209,43,138,0.24),transparent_26%)]" />
					<div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
						<div className="max-w-2xl">
							<p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/65">
								Zain Jordan eShop
							</p>
							<h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
								Shop devices, plans, and add-ons in one polished Zain storefront.
							</h1>
							<p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
								Discover the latest arrivals, browse best sellers, and build your basket with a sales
								assistant that can guide you all the way to checkout.
							</p>

							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<a
									href={`#${eshopSectionIds.categories}`}
									className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#21005f] transition-transform hover:-translate-y-0.5"
								>
									Explore categories
								</a>
								<a
									href={`#${eshopSectionIds.appleProducts}`}
									className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/14"
								>
									View Apple range
									<ArrowRight size={16} className="ml-2" />
								</a>
							</div>

							<div className="mt-8 flex flex-wrap gap-3">
								{signals.map((signal) => (
									<div
										key={signal.label}
										className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
									>
										{signal.icon}
										{signal.label}
									</div>
								))}
							</div>
						</div>

						<div className="grid gap-4 self-end sm:grid-cols-2">
							<div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm sm:col-span-2">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
											Promo stack
										</p>
										<h2 className="mt-3 text-2xl font-bold">Storefront sections that feel retail-first</h2>
									</div>
									<div className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/72">/eshop</div>
								</div>
								<div className="mt-6 grid gap-4 md:grid-cols-3">
									{quickHighlights.map((item) => (
										<div
											key={item.title}
											className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.06))] p-4"
										>
											<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-white">
												{item.icon}
											</div>
											<h3 className="text-lg font-semibold">{item.title}</h3>
											<p className="mt-2 text-sm leading-6 text-white/70">{item.copy}</p>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
								<p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
									Launch focus
								</p>
								<div className="mt-4 text-4xl font-bold">40+</div>
								<p className="mt-2 text-sm leading-6 text-white/70">
									Merchandising slots for device drops, accessories, and shopping campaigns.
								</p>
							</div>

							<div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
								<p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
									Merch flow
								</p>
								<div className="mt-4 text-4xl font-bold">3 rails</div>
								<p className="mt-2 text-sm leading-6 text-white/70">
									New arrivals, best sellers, and Apple-specific inventory using reusable carousel logic.
								</p>
							</div>
						</div>
					</div>
				</section>

				<div id={eshopSectionIds.categories}>
					<EshopCategories />
				</div>

				<div id={eshopSectionIds.newArrival}>
					<EshopProductCarousel
						title="New arrival"
						description="Fresh devices, smart home gear, and newly listed accessories arranged in a launch-first rail."
						products={newArrivalProducts}
						onAddToCart={addItem}
					/>
				</div>

				<div id={eshopSectionIds.brands}>
					<EshopBrandStrip />
				</div>

				<div id={eshopSectionIds.bestSeller}>
					<EshopProductCarousel
						title="Best seller"
						description="A higher-conversion rail for the products customers return to most often."
						products={bestSellerProducts}
						onAddToCart={addItem}
					/>
				</div>

				<div id={eshopSectionIds.appleProducts}>
					<EshopProductCarousel
						title="Apple products"
						description="A brand-led collection with hover image swaps and review signals for premium device browsing."
						products={appleProducts}
						onAddToCart={addItem}
					/>
				</div>
			</main>

			<footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">
				<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
					<div>
						<div className="text-2xl font-bold text-[#1a0050]">zain</div>
						<p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
							Zain Jordan eShop for devices, digital vouchers, and commerce-led merchandising in one place.
						</p>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Shop</h3>
						<ul className="mt-4 space-y-3 text-sm text-slate-700">
							<li>Smartphones</li>
							<li>Fiber</li>
							<li>Accessories</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support</h3>
						<ul className="mt-4 space-y-3 text-sm text-slate-700">
							<li>Track order</li>
							<li>Payment options</li>
							<li>Account access</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Status</h3>
						<p className="mt-4 text-sm leading-6 text-slate-700">
							Shop flow with guided browsing, cart actions, and checkout support.
						</p>
					</div>
				</div>
			</footer>

			<EshopCartDrawer
				items={items}
				isOpen={isCartOpen}
				onClose={closeCart}
				onRemove={removeItem}
				onProceedToCheckout={() => {
					closeCart()
					navigate('/eshop/checkout')
				}}
				total={cartTotal}
			/>
		</div>
	)
}
