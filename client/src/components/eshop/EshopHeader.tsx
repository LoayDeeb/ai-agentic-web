import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useLocaleStore } from '../../store/locale'
import { eshopCopy } from './content'

const BRAND_BG = '#1a0050'

function ZainWordmark({ compact = false }: { compact?: boolean }) {
	return (
		<div className="flex items-center" aria-label="Zain eShop">
			<svg
				width={compact ? 72 : 96}
				height={compact ? 22 : 28}
				viewBox="0 0 96 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
			>
				<text
					x="0"
					y="23"
					fontFamily="'Trebuchet MS', 'Segoe UI', sans-serif"
					fontWeight="700"
					fontSize={compact ? '24' : '28'}
					letterSpacing="-1.1"
					fill="white"
				>
					zain
				</text>
			</svg>
		</div>
	)
}

type EshopHeaderProps = {
	itemCount?: number
	onCartClick?: () => void
}

export function EshopHeader({ itemCount = 0, onCartClick }: EshopHeaderProps) {
	const { lang, switchLanguage } = useLocaleStore()
	const copy = eshopCopy.header[lang]
	const [searchValue, setSearchValue] = useState('')
	const [accountOpen, setAccountOpen] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const accountRef = useRef<HTMLDivElement>(null)
	const navLinks = [
		{
			label: copy.languageLabel,
			href: '#',
			action: () => switchLanguage(lang === 'ar' ? 'en' : 'ar'),
		},
		{ label: copy.mainWebsite, href: '#' },
		{ label: copy.trackOrder, href: '#' },
	]
	const accountMenuItems = [
		{ label: copy.logIn, href: '#' },
		{ label: copy.register, href: '#' },
	]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
				setAccountOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<header className="sticky top-0 z-40 w-full shadow-[0_10px_30px_rgba(10,0,35,0.22)]">
			<div style={{ backgroundColor: BRAND_BG }}>
				<div className="mx-auto hidden max-w-7xl items-center gap-6 px-6 py-3 lg:flex">
					<a href="/eshop" className="shrink-0">
						<ZainWordmark />
					</a>

					<div className="flex max-w-[390px] flex-1 items-center">
						<div className="flex h-10 flex-1 items-center rounded-l-full border border-black/5 bg-white px-4">
							<input
								type="text"
								placeholder={copy.searchPlaceholder}
								value={searchValue}
								onChange={(event) => setSearchValue(event.target.value)}
								aria-label={copy.searchAria}
								className="w-full bg-transparent text-sm text-black/70 outline-none placeholder:text-black/40"
							/>
						</div>
						<button
							type="button"
							aria-label={copy.submitSearch}
							className="flex h-10 w-11 items-center justify-center rounded-r-full bg-[#ebebeb] text-black/70 transition-colors hover:bg-[#dfdfdf]"
						>
							<Search size={18} strokeWidth={1.8} />
						</button>
					</div>

					<nav className="ml-auto flex items-center">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={(event) => {
									if (!link.action) return
									event.preventDefault()
									link.action()
								}}
								className="px-3 py-2 text-sm text-white/90 transition-opacity hover:opacity-75"
							>
								{link.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-1 text-white">
						<a
							href="#"
							aria-label={copy.wishlist}
							className="rounded-full p-2 transition-colors hover:bg-white/10"
						>
							<Heart size={22} strokeWidth={1.7} />
						</a>

						<div ref={accountRef} className="relative">
							<button
								type="button"
								onClick={() => setAccountOpen((value) => !value)}
								aria-label={copy.myAccount}
								className="flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-white/10"
							>
								<User size={22} strokeWidth={1.7} />
								<ChevronDown size={16} strokeWidth={1.7} />
							</button>
							{accountOpen ? (
								<div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-2xl">
									<ul className="py-2">
										{accountMenuItems.map((item) => (
											<li key={item.label}>
												<a
													href={item.href}
													onClick={() => setAccountOpen(false)}
													className="block px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
												>
													{item.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							) : null}
						</div>

						<button
							type="button"
							onClick={onCartClick}
							aria-label={copy.cart}
							className="relative rounded-full p-2 transition-colors hover:bg-white/10"
						>
							<ShoppingCart size={22} strokeWidth={1.7} />
							{itemCount > 0 ? (
								<span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d12b8a] px-1 text-[11px] font-bold text-white">
									{itemCount}
								</span>
							) : null}
						</button>
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 py-3 lg:hidden">
					<div className="flex items-center justify-between gap-3">
						<button
							type="button"
							aria-label={copy.openMenu}
							onClick={() => setMobileMenuOpen((value) => !value)}
							className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
						>
							{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
						</button>

						<a href="/eshop" className="flex items-center">
							<ZainWordmark compact />
						</a>

						<div className="flex items-center gap-1 text-white">
							<a
								href="#"
								aria-label={copy.wishlist}
								className="rounded-full p-2 transition-colors hover:bg-white/10"
							>
								<Heart size={20} strokeWidth={1.7} />
							</a>
							<button
								type="button"
								onClick={onCartClick}
								aria-label={copy.cart}
								className="relative rounded-full p-2 transition-colors hover:bg-white/10"
							>
								<ShoppingCart size={20} strokeWidth={1.7} />
								{itemCount > 0 ? (
									<span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d12b8a] px-1 text-[11px] font-bold text-white">
										{itemCount}
									</span>
								) : null}
							</button>
						</div>
					</div>

					<div className="mt-3 flex items-center">
						<div className="flex h-10 flex-1 items-center rounded-l-full border border-black/5 bg-white px-4">
							<input
								type="text"
								placeholder={copy.searchPlaceholder}
								value={searchValue}
								onChange={(event) => setSearchValue(event.target.value)}
								aria-label={copy.searchAria}
								className="w-full bg-transparent text-sm text-black/70 outline-none placeholder:text-black/40"
							/>
						</div>
						<button
							type="button"
							aria-label={copy.submitSearch}
							className="flex h-10 w-11 items-center justify-center rounded-r-full bg-[#ebebeb] text-black/70 transition-colors hover:bg-[#dfdfdf]"
						>
							<Search size={18} strokeWidth={1.8} />
						</button>
					</div>

					<div
						className={cn(
							'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300',
							mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
						)}
					>
						<div className="min-h-0">
							<div className="mt-3 rounded-3xl border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-sm">
								{navLinks.map((link) => (
									<a
										key={link.label}
										href={link.href}
										onClick={(event) => {
											if (!link.action) return
											event.preventDefault()
											link.action()
											setMobileMenuOpen(false)
										}}
										className="block rounded-2xl px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
									>
										{link.label}
									</a>
								))}
								<div className="my-2 border-t border-white/10" />
								{accountMenuItems.map((item) => (
									<a
										key={item.label}
										href={item.href}
										className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
									>
										<User size={16} strokeWidth={1.7} />
										{item.label}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
