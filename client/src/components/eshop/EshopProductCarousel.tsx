import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getEshopProductDetailById } from './catalog'
import { useLocaleStore } from '../../store/locale'
import { eshopCopy, getEshopBadgeLabel, getEshopProductName } from './content'

export type EshopProduct = {
	id: number
	name: string
	price: string
	currency: string
	image: string
	image2?: string
	rating?: number
	reviewCount?: number
	soldOut?: boolean
	badge?: string
	badgeTone?: 'blue' | 'teal'
}

type EshopProductCarouselProps = {
	title: string
	description?: string
	products: EshopProduct[]
	onAddToCart?: (productId: number) => void
}

const badgeBackgrounds = {
	blue: 'linear-gradient(90deg, rgb(18,116,164) 0%, rgb(4,102,150) 100%)',
	teal: 'linear-gradient(90deg, rgb(84,184,233) 0%, rgb(13,157,111) 100%)',
}

export function EshopProductCarousel({
	title,
	description,
	products,
	onAddToCart,
}: EshopProductCarouselProps) {
	const { lang } = useLocaleStore()
	const copy = eshopCopy.carousel[lang]
	const scrollRef = useRef<HTMLDivElement>(null)
	const [scrollProgress, setScrollProgress] = useState(0)

	const handleScroll = useCallback(() => {
		const element = scrollRef.current
		if (!element) return
		const maxScroll = element.scrollWidth - element.clientWidth
		if (maxScroll <= 0) {
			setScrollProgress(0)
			return
		}
		setScrollProgress(element.scrollLeft / maxScroll)
	}, [])

	useEffect(() => {
		const element = scrollRef.current
		if (!element) return
		element.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()
		return () => element.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const thumbRatio = Math.min(0.58, Math.max(0.24, 1 / Math.max(1.8, products.length / 3.3)))
	const maxThumbOffset = 100 - thumbRatio * 100

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-[2rem] border border-slate-200/70 bg-white px-6 py-7 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:px-8">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
						{description ? (
							<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
						) : null}
					</div>
					<a
						href="#"
						onClick={(event) => event.preventDefault()}
						className="inline-flex items-center text-sm font-bold text-[#d12b8a] transition-opacity hover:opacity-80"
					>
						{copy.showAll}
						<ChevronRight size={18} className={lang === 'ar' ? 'mr-1 rotate-180' : 'ml-1'} />
					</a>
				</div>

				<div ref={scrollRef} className="hide-scrollbar mt-8 overflow-x-auto pb-2">
					<div className="flex gap-4">
						{products.map((product, index) => (
							<ProductCard
								key={product.id}
								product={product}
								index={index}
								onAddToCart={onAddToCart}
							/>
						))}
					</div>
				</div>

				<div className="mt-5 h-[2px] overflow-hidden rounded-full bg-black/10">
					<div
						className="h-full rounded-full bg-[#d12b8a] transition-[width,transform] duration-100"
						style={{
							width: `${thumbRatio * 100}%`,
							transform: `translateX(${scrollProgress * maxThumbOffset}%)`,
						}}
					/>
				</div>
			</div>
		</section>
	)
}

function ProductCard({
	product,
	index,
	onAddToCart,
}: {
	product: EshopProduct
	index: number
	onAddToCart?: (productId: number) => void
}) {
	const { lang } = useLocaleStore()
	const copy = eshopCopy.carousel[lang]
	const [hovered, setHovered] = useState(false)
	const badgeTone = product.badgeTone ?? 'blue'
	const detailProduct = getEshopProductDetailById(product.id)
	const productName = getEshopProductName(product.id, product.name, lang)

	return (
		<motion.article
			id={`eshop-product-${product.id}`}
			data-eshop-product-id={product.id}
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24) }}
			whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)' }}
			className="flex min-h-[390px] w-[214px] shrink-0 flex-col rounded-3xl border border-slate-200/80 bg-white p-4"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="relative flex justify-center pb-6 pt-8">
				<div className="relative h-[180px] w-[180px]">
					<img
						src={product.image}
						alt={product.name}
						draggable={false}
						className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
						style={{ opacity: hovered && product.image2 ? 0 : 1 }}
					/>
					{product.image2 ? (
						<img
							src={product.image2}
							alt={product.name}
							draggable={false}
							className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
							style={{ opacity: hovered ? 1 : 0 }}
						/>
					) : null}
				</div>

				{product.badge ? (
					<div
						className="absolute right-0 top-0 rounded-md px-2 py-1 text-xs font-semibold text-white"
						style={{ background: badgeBackgrounds[badgeTone] }}
					>
						{getEshopBadgeLabel(product.badge, lang)}
					</div>
				) : null}
			</div>

			<div className="flex flex-1 flex-col">
				<h3
					className="text-[17px] font-normal leading-[1.35] text-black/90"
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{detailProduct ? (
						<Link
							to={`/eshop/product/${detailProduct.slug}`}
							className="transition-colors hover:text-[#2b0b73]"
						>
							{productName}
						</Link>
					) : (
						productName
					)}
				</h3>

				<div className="mt-2">{renderRating(product.rating ?? 0, product.reviewCount ?? 0)}</div>

				<div className="mt-auto pt-4">
					<div className="flex items-baseline gap-1">
						<span className="text-2xl font-bold text-black/90">{product.price}</span>
						<span className="text-base text-black/80">{product.currency}</span>
					</div>
					{product.soldOut ? (
						<div className="mt-1 text-sm text-[#dc362e]">{copy.soldOut}</div>
					) : (
						<div className="mt-3 flex gap-2">
							{detailProduct ? (
								<Link
									to={`/eshop/product/${detailProduct.slug}`}
									className="inline-flex flex-1 items-center justify-center rounded-full border border-[#1a0050] px-4 py-2 text-sm font-semibold text-[#1a0050] transition-colors hover:bg-[#f2edff]"
								>
									{copy.viewDetails}
								</Link>
							) : null}
							<button
								type="button"
								onClick={() => onAddToCart?.(product.id)}
								className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1a0050] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b0b73]"
							>
								<ShoppingCart size={16} />
								{copy.addToCart}
							</button>
						</div>
					)}
				</div>
			</div>
		</motion.article>
	)
}

function renderRating(rating: number, reviewCount: number) {
	if (rating <= 0 && reviewCount <= 0) {
		return <div className="h-4" />
	}

	const fullStars = Math.floor(rating)
	const hasHalfStar = rating - fullStars >= 0.5

	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, index) => {
				const filled = index < fullStars
				const half = !filled && index === fullStars && hasHalfStar
				return (
					<div key={index} className="relative h-[14px] w-[14px] shrink-0">
						<Star size={14} className="absolute inset-0 text-slate-200" fill="currentColor" />
						{filled || half ? (
							<div
								className="absolute inset-0 overflow-hidden text-amber-400"
								style={{ width: filled ? '100%' : '50%' }}
							>
								<Star size={14} fill="currentColor" />
							</div>
						) : null}
					</div>
				)
			})}
			{reviewCount > 0 ? <span className="text-xs text-slate-500">({reviewCount})</span> : null}
		</div>
	)
}
