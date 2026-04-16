import React from 'react'
import { motion } from 'framer-motion'
import { useLocaleStore } from '../../store/locale'
import { eshopCopy } from './content'

type Brand = {
	name: string
	slug: string
	logo: React.ReactNode
}

const brands: Brand[] = [
	{ name: 'Apple', slug: 'apple', logo: <AppleSvg /> },
	{ name: 'Samsung', slug: 'samsung', logo: <SamsungSvg /> },
	{ name: 'Anker', slug: 'anker', logo: <AnkerSvg /> },
	{ name: 'Honor', slug: 'honor', logo: <HonorSvg /> },
	{ name: 'Nothing', slug: 'nothing', logo: <NothingSvg /> },
	{ name: 'Tecno', slug: 'tecno', logo: <TecnoSvg /> },
]

export function EshopBrandStrip() {
	const { lang } = useLocaleStore()
	const copy = eshopCopy.brands[lang]

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-[2rem] border border-slate-200/70 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:px-8">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#009BDE]">
							{copy.kicker}
						</p>
						<h2 className="mt-2 text-3xl font-bold text-slate-900">{copy.title}</h2>
					</div>
					<p className="max-w-2xl text-sm leading-6 text-slate-600">
						{copy.description}
					</p>
				</div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.07 } },
					}}
					className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
				>
					{brands.map((brand) => (
						<motion.a
							key={brand.slug}
							href="#"
							onClick={(event) => event.preventDefault()}
							variants={{
								hidden: { opacity: 0, y: 16 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
							}}
							whileHover={{ scale: 1.04, y: -2 }}
							whileTap={{ scale: 0.98 }}
							className="flex min-h-[110px] items-center justify-center rounded-3xl border border-slate-200/80 bg-slate-50/70 px-4 py-5 transition-colors hover:border-slate-300 hover:bg-white"
							aria-label={brand.name}
						>
							<div className="flex items-center justify-center opacity-90 transition-opacity hover:opacity-100">
								{brand.logo}
							</div>
						</motion.a>
					))}
				</motion.div>
			</div>
		</section>
	)
}

function AppleSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56" viewBox="0 0 814 1000">
			<path
				d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-165.8-127.3C46 452.4 16.5 312.7 16.5 183.7c0-111.1 38.5-169.6 93.5-228.3C172.5-109.7 250.8-127 330-127c77.5 0 144.4 38.5 192 38.5 47.5 0 124.2-40.8 209.5-40.8 32.8 0 135.5 2.6 205.7 98.7zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
				fill="#111827"
			/>
		</svg>
	)
}

function SamsungSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 36" width="118" height="32">
			<path
				d="M13.8 7.4c-2.7 0-4.9.8-6.3 2.3-1.3 1.4-2 3.3-2 5.6 0 2.4.7 4.3 2.1 5.7 1.4 1.4 3.5 2.1 6.2 2.1h2.4v3.7h-2.4c-4 0-7.1-1.1-9.2-3.2C2.5 21.6 1.3 18.8 1.3 15.3c0-3.4 1.2-6.2 3.4-8.3 2.3-2.1 5.4-3.2 9.1-3.2h2.4v3.6h-2.4zM30.1 22l-1.3-3.6H21l-1.3 3.6h-4L23.3 4h3.8l7.6 18h-4.6zm-4.8-13.6l-2.8 7h5.6l-2.8-7zM51.3 4h3.8v18h-4V10.5L47.4 22h-3.6l-3.7-11.5V22h-4V4h3.8l5.7 14.1L51.3 4zM71.7 22l-1.3-3.6h-7.8L61.3 22h-4.1L64.9 4h3.8l7.6 18h-4.6zm-4.8-13.6l-2.8 7h5.6l-2.8-7zM85.3 14.4c1.7.8 2.9 1.6 3.6 2.5.7.9 1 2 1 3.2 0 1.7-.6 3-1.9 4-1.3 1-3 1.4-5.2 1.4-2.3 0-4.3-.5-6.1-1.6v-3.8c1.8 1.3 3.8 2 5.9 2 1 0 1.8-.2 2.3-.6.5-.4.8-.9.8-1.5 0-.6-.3-1.1-.8-1.6-.5-.5-1.5-1-2.9-1.6-1.6-.7-2.8-1.5-3.5-2.4-.7-.9-1.1-2-1.1-3.3 0-1.6.6-2.9 1.9-3.9 1.2-.9 2.9-1.4 4.9-1.4 2.1 0 4 .5 5.7 1.4v3.7c-1.7-1.1-3.5-1.7-5.4-1.7-.9 0-1.6.2-2.1.6-.5.4-.8.9-.8 1.5 0 .6.3 1.1.8 1.6.5.5 1.6 1 3.1 1.6M107.3 4v3.6h-6V22h-4V7.6h-6V4h16zM125.3 4v3.6h-9.8v3.8h9.2v3.5h-9.2v3.6h9.8V22h-13.8V4h13.8zM142.4 22l-8.2-11.6V22h-3.9V4h3.7l8 11.3V4h3.9v18h-3.5zM163.7 14.5h4V20c-.9.7-2 1.3-3.2 1.7-1.2.4-2.5.6-3.8.6-2.8 0-5-.9-6.7-2.6-1.7-1.7-2.5-4-2.5-6.8 0-2.8.9-5.1 2.7-6.8 1.8-1.7 4.2-2.6 7.1-2.6 2.2 0 4.2.5 6 1.6V8.9c-1.8-1.2-3.7-1.8-5.8-1.8-1.8 0-3.3.6-4.5 1.7-1.2 1.1-1.8 2.6-1.8 4.4 0 1.9.6 3.4 1.8 4.6 1.2 1.1 2.8 1.7 4.8 1.7.9 0 1.8-.2 2.6-.5v-4.5zM184.8 14v7.4c-1.8.6-3.6.9-5.5.9-2.9 0-5.2-.9-6.8-2.6-1.7-1.7-2.5-4-2.5-6.8 0-2.8.9-5 2.6-6.8 1.7-1.7 4-2.6 6.8-2.6 2.1 0 4.1.5 5.9 1.5V8.8c-1.7-1.1-3.6-1.7-5.6-1.7-1.9 0-3.4.6-4.6 1.7-1.2 1.1-1.7 2.6-1.7 4.5 0 1.9.6 3.4 1.8 4.5 1.2 1.1 2.8 1.7 4.9 1.7.8 0 1.6-.1 2.3-.3V17h-3.7v-3h5.9"
				fill="#1428A0"
			/>
		</svg>
	)
}

function AnkerSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="112" height="42">
			<text x="10" y="38" fontFamily="Arial, sans-serif" fontSize="38" fontWeight="bold" fill="#0070CC" letterSpacing="1">
				anker
			</text>
		</svg>
	)
}

function HonorSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="112" height="42">
			<text x="10" y="38" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#CC0000" letterSpacing="1">
				HONOR
			</text>
		</svg>
	)
}

function NothingSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50" width="128" height="42">
			<text x="5" y="38" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#111111" letterSpacing="2">
				nothing
			</text>
		</svg>
	)
}

function TecnoSvg() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="112" height="42">
			<text x="5" y="38" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="bold" fill="#005BAC" letterSpacing="1">
				TECNO
			</text>
		</svg>
	)
}
