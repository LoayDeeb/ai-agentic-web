import React from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck, ShoppingCart, Sparkles } from 'lucide-react'
import { EshopCartDrawer, EshopHeader } from '../components/eshop'
import {
	getEshopProductDetailBySlug,
	getRecommendedUpsells,
} from '../components/eshop/catalog'
import { detailCopyBySlug, eshopCopy, getEshopProductName } from '../components/eshop/content'
import { useLocaleStore } from '../store/locale'
import { useEshopStore } from '../store/eshopStore'

export default function EshopProductDetail() {
	const navigate = useNavigate()
	const { slug = '' } = useParams()
	const { lang, dir } = useLocaleStore()
	const baseDetail = getEshopProductDetailBySlug(slug)
	const detailCopy =
		lang === 'ar' && (slug === 'iphone-17' || slug === 'iphone-17-pro')
			? detailCopyBySlug[slug].ar
			: undefined
	const copy = eshopCopy.detail[lang]
	const items = useEshopStore((state) => state.items)
	const isCartOpen = useEshopStore((state) => state.isCartOpen)
	const addItem = useEshopStore((state) => state.addItem)
	const openCart = useEshopStore((state) => state.openCart)
	const closeCart = useEshopStore((state) => state.closeCart)
	const removeItem = useEshopStore((state) => state.removeItem)
	const itemCount = useEshopStore((state) => state.getItemCount())
	const cartTotal = useEshopStore((state) => state.getCartTotal())

	if (!baseDetail) {
		return <Navigate to="/eshop" replace />
	}

	const detail = {
		...baseDetail,
		name: detailCopy?.name ?? baseDetail.name,
		tagline: detailCopy?.tagline ?? baseDetail.tagline,
		finishLabel: detailCopy?.finishLabel ?? baseDetail.finishLabel,
		heroDescription: detailCopy?.heroDescription ?? baseDetail.heroDescription,
		highlights: detailCopy?.highlights ?? baseDetail.highlights,
		specCards: detailCopy?.specCards ?? baseDetail.specCards,
		inTheBox: detailCopy?.inTheBox ?? baseDetail.inTheBox,
	}

	const relatedUpsells = getRecommendedUpsells([detail.productId]).slice(0, 2)

	return (
		<div
			dir={dir}
			className="min-h-screen bg-[radial-gradient(circle_at_top,#f3ecff_0%,#f7f8fc_28%,#f3f7fc_60%,#eef3fb_100%)] text-slate-900"
		>
			<EshopHeader itemCount={itemCount} onCartClick={openCart} />

			<main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
					<button
						type="button"
						onClick={() => navigate('/eshop')}
						className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
					>
						<ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
						{copy.back}
					</button>
					<span>/</span>
					<span className="font-semibold text-slate-900">{detail.name}</span>
				</div>

				<section className="mt-6 rounded-[2.2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:p-8">
					<div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
						<div className="rounded-[2rem] bg-[linear-gradient(135deg,#f5f1ff_0%,#eef4ff_100%)] p-6">
							<div className="flex h-full flex-col justify-between">
								<div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#2b0b73]">
									<Sparkles size={16} />
									{detail.tagline}
								</div>
								<div className="flex min-h-[360px] items-center justify-center py-10">
									<img
										src={detail.heroImage}
										alt={detail.name}
										className="max-h-[360px] w-full max-w-[320px] object-contain"
									/>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									{detail.gallery.map((image) => (
										<div
											key={image}
											className="rounded-[1.4rem] border border-white/70 bg-white/60 p-4"
										>
											<img src={image} alt={detail.name} className="h-28 w-full object-contain" />
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex flex-col">
							<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b5ca5]">
								{copy.kicker}
							</p>
							<h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{detail.name}</h1>
							<p className="mt-4 text-base leading-7 text-slate-600">{detail.heroDescription}</p>

							<div className="mt-6 flex items-end gap-2">
								<span className="text-4xl font-bold text-slate-900">{detail.price}</span>
								<span className="pb-1 text-lg text-slate-600">{detail.currency}</span>
							</div>

							<div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
								<p className="text-sm font-semibold text-slate-700">{detail.finishLabel}</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{detail.finishes.map((finish) => (
										<span
											key={finish}
											className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
										>
											{finish}
										</span>
									))}
								</div>
							</div>

							<div className="mt-6 grid gap-4 sm:grid-cols-2">
								{detail.specCards.map((card) => (
									<div key={card.label} className="rounded-[1.5rem] border border-slate-200 p-5">
										<p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
											{card.label}
										</p>
										<p className="mt-3 text-lg font-semibold text-slate-900">{card.value}</p>
									</div>
								))}
							</div>

							<div className="mt-6 space-y-3">
								{detail.highlights.map((highlightText) => (
									<div key={highlightText} className="flex gap-3 text-sm leading-6 text-slate-600">
										<div className="mt-1 rounded-full bg-emerald-500/10 p-1 text-emerald-600">
											<Check size={14} />
										</div>
										<span>{highlightText}</span>
									</div>
								))}
							</div>

							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<button
									type="button"
									onClick={() => addItem(detail.productId)}
									className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a0050] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b0b73]"
								>
									<ShoppingCart size={16} />
									{copy.addToCart}
								</button>
								<button
									type="button"
									onClick={() => {
										addItem(detail.productId)
										navigate('/eshop/checkout')
									}}
									className="inline-flex items-center justify-center rounded-full border border-[#1a0050] px-6 py-3 text-sm font-semibold text-[#1a0050] transition-colors hover:bg-[#f2edff]"
								>
									{copy.buyNow}
								</button>
							</div>

							<div className="mt-8 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
								<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
									<ShieldCheck size={16} className="text-[#2b0b73]" />
									{copy.inTheBox}
								</div>
								<ul className="mt-3 space-y-2 text-sm text-slate-600">
									{detail.inTheBox.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{relatedUpsells.length > 0 ? (
					<section className="mt-8 rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:p-8">
						<h2 className="text-2xl font-bold text-slate-900">{copy.pairsWell}</h2>
						<div className="mt-5 grid gap-4 md:grid-cols-2">
							{relatedUpsells.map((product) => (
								<div key={product.id} className="rounded-[1.5rem] border border-slate-200 p-5">
									<div className="flex gap-4">
										<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
											<img src={product.image} alt={product.name} className="h-16 w-16 object-contain" />
										</div>
										<div className="min-w-0 flex-1">
											<h3 className="text-lg font-semibold text-slate-900">
												{getEshopProductName(product.id, product.name, lang)}
											</h3>
											<p className="mt-2 text-sm text-slate-600">
												{product.price} {product.currency}
											</p>
										</div>
									</div>
									<div className="mt-4 flex gap-2">
										<button
											type="button"
											onClick={() => addItem(product.id)}
											className="inline-flex flex-1 items-center justify-center rounded-full bg-[#1a0050] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b0b73]"
										>
											{copy.addToCart}
										</button>
										{product.id === 21 ? (
											<Link
												to="/eshop/product/iphone-17"
												className="inline-flex flex-1 items-center justify-center rounded-full border border-[#1a0050] px-4 py-2 text-sm font-semibold text-[#1a0050] transition-colors hover:bg-[#f2edff]"
											>
												{lang === 'ar' ? 'عرض التفاصيل' : 'View details'}
											</Link>
										) : null}
										{product.id === 22 ? (
											<Link
												to="/eshop/product/iphone-17-pro"
												className="inline-flex flex-1 items-center justify-center rounded-full border border-[#1a0050] px-4 py-2 text-sm font-semibold text-[#1a0050] transition-colors hover:bg-[#f2edff]"
											>
												{lang === 'ar' ? 'عرض التفاصيل' : 'View details'}
											</Link>
										) : null}
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}
			</main>

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
