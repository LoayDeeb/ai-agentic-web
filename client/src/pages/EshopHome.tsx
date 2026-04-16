import React from 'react'
import { ArrowRight, CreditCard, Gift, ShieldCheck, Smartphone, Wifi } from 'lucide-react'
import {
	EshopBrandStrip,
	EshopCategories,
	EshopHeader,
	EshopProductCarousel,
	type EshopProduct,
} from '../components/eshop'

const newArrivalProducts: EshopProduct[] = [
	{
		id: 1,
		name: 'Samsung Galaxy Tab A11 LTE - 8GB',
		price: '164.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081592_samsung-galaxy-tab-a11-lte-8gb_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081593_samsung-galaxy-tab-a11-lte-8gb_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 2,
		name: 'Xiaomi Mi Vacuum Cleaner Mini EU',
		price: '45.01',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081544_xiaomi-mi-vacuum-cleaner-mini-eu_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081545_xiaomi-mi-vacuum-cleaner-mini-eu_360.webp',
		rating: 2,
		reviewCount: 4,
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 3,
		name: 'Realme C75X',
		price: '129.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0082342_realme-c75x_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0082343_realme-c75x_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 4,
		name: 'Xiaomi Robot Vacuum S40C EU',
		price: '229.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081464_xiaomi-robot-vacuum-s40c-eu_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081465_xiaomi-robot-vacuum-s40c-eu_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 5,
		name: 'Xiaomi Gaming Mouse Lite GL',
		price: '25.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080441_xiaomi-gaming-mouse-lite-gl_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080442_xiaomi-gaming-mouse-lite-gl_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 6,
		name: 'Tapo C610 Solar-Powered Pan/Tilt Security Camera Kit',
		price: '69.99',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081727_tapo-c610-solar-powered-pantilt-security-camera-kit_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081728_tapo-c610-solar-powered-pantilt-security-camera-kit_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
		soldOut: true,
	},
	{
		id: 7,
		name: 'TP-Link BE6500 Wi-Fi 7 High Gain Wireless USB Adapter',
		price: '55.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080421_tp-link-be6500-wi-fi-7-high-gain-wireless-usb-adapter_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080422_tp-link-be6500-wi-fi-7-high-gain-wireless-usb-adapter_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 8,
		name: 'FOLG Ear Phone FG-EC05',
		price: '6.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080383_folg-ear-phone-fg-ec05_360.webp',
		rating: 4,
		reviewCount: 81,
		badge: 'New arrival',
		badgeTone: 'teal',
	},
]

const bestSellerProducts: EshopProduct[] = [
	{
		id: 11,
		name: 'Airpods 4 Active Noise Cancellation',
		price: '179.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0069311_airpods-4-active-noise-cancellation_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 12,
		name: 'Apple Watch Series 11',
		price: '415.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079603_apple-watch-series-11_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 13,
		name: 'Honor Pad X9',
		price: '159.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0071578_honor-pad-x9_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 14,
		name: 'HUAWEI FreeBuds SE 4',
		price: '36.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080130_huawei-freebuds-se-4_360.webp',
		badge: 'Best Seller',
		soldOut: true,
	},
	{
		id: 15,
		name: 'iPhone 17 Pro Max',
		price: '1,199.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079481_iphone-17-pro-max_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 16,
		name: 'Samsung Galaxy A06 5G - 4GB',
		price: '49.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0077305_samsung-galaxy-a06-5g-4gb_360.webp',
		badge: 'Best Seller',
		soldOut: true,
	},
	{
		id: 17,
		name: 'Samsung Galaxy A36 5G',
		price: '210.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0077389_samsung-galaxy-a36-5g_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 18,
		name: 'Samsung Galaxy S25 FE',
		price: '399.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079661_samsung-galaxy-s25-fe_360.webp',
		badge: 'Best Seller',
	},
]

const appleProducts: EshopProduct[] = [
	{
		id: 21,
		name: 'iPhone 17',
		price: '799.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079484_iphone-17_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079485_iphone-17_360.webp',
		rating: 4.5,
		reviewCount: 30,
	},
	{
		id: 22,
		name: 'iPhone 17 Pro',
		price: '1099.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079478_iphone-17-pro_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079480_iphone-17-pro_360.webp',
		rating: 4.7,
		reviewCount: 21,
	},
	{
		id: 23,
		name: 'iPhone 17 Pro Max',
		price: '1199.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079481_iphone-17-pro-max_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079482_iphone-17-pro-max_360.webp',
		rating: 4.6,
		reviewCount: 54,
		badge: 'Best Seller',
	},
	{
		id: 24,
		name: 'iPhone Air',
		price: '999.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079495_iphone-air_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079494_iphone-air_360.webp',
	},
	{
		id: 25,
		name: 'Apple Watch Series 11',
		price: '415.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079603_apple-watch-series-11_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079605_apple-watch-series-11_360.webp',
		rating: 5,
		reviewCount: 11,
		badge: 'Best Seller',
	},
	{
		id: 26,
		name: 'AirPods Pro 3',
		price: '229.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079526_airpods-pro-3_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079527_airpods-pro-3_360.webp',
		rating: 5,
		reviewCount: 1,
	},
	{
		id: 27,
		name: 'MacBook Air 13-in (M4)',
		price: '849.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080012_macbook-air-13-in-m4_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080013_macbook-air-13-in-m4_360.webp',
		rating: 5,
		reviewCount: 4,
	},
]

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
	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,#efe6ff_0%,#f5f6fb_26%,#f8f9fc_60%,#f4f7fb_100%)] text-slate-900">
			<EshopHeader />

			<main className="pb-16">
				<section className="relative overflow-hidden bg-[linear-gradient(135deg,#1a0050_0%,#29006f_58%,#3a0b84_100%)] text-white">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(0,155,222,0.24),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(209,43,138,0.24),transparent_26%)]" />
					<div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
						<div className="max-w-2xl">
							<p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/65">
								Zain Jordan eShop Demo
							</p>
							<h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
								A storefront demo built around the same Zain language, but tuned for commerce.
							</h1>
							<p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
								This page packages categories, launches, best sellers, and brand-led shopping into a
								single route so the e-commerce experience sits beside the existing service demos.
							</p>

							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<a
									href="#categories"
									className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#21005f] transition-transform hover:-translate-y-0.5"
								>
									Explore categories
								</a>
								<a
									href="#apple-products"
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

				<div id="categories">
					<EshopCategories />
				</div>

				<EshopProductCarousel
					title="New arrival"
					description="Fresh devices, smart home gear, and newly listed accessories arranged in a launch-first rail."
					products={newArrivalProducts}
				/>

				<EshopBrandStrip />

				<EshopProductCarousel
					title="Best seller"
					description="A higher-conversion rail for the products customers return to most often."
					products={bestSellerProducts}
				/>

				<div id="apple-products">
					<EshopProductCarousel
						title="Apple products"
						description="A brand-led collection with hover image swaps and review signals for premium device browsing."
						products={appleProducts}
					/>
				</div>
			</main>

			<footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">
				<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
					<div>
						<div className="text-2xl font-bold text-[#1a0050]">zain</div>
						<p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
							eShop demo route for devices, digital vouchers, and commerce-led merchandising inside the
							existing showcase app.
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
							Commerce demo route added for internal showcase purposes. Content and pricing are illustrative.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
