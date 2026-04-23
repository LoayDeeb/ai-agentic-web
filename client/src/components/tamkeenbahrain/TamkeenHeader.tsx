import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { NavItem } from './content'
import { tamkeenNavItems } from './content'

function LogoSvg() {
	return (
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="100" height="100" rx="4" fill="#0E3D94" />
			<text x="50" y="38" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
				BAHRAIN
			</text>
			<text x="50" y="52" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
				CREDIT
			</text>
			<text x="50" y="66" textAnchor="middle" fill="#c0a060" fontSize="9" fontWeight="600" fontFamily="Arial, sans-serif">
				&amp; FINANCE
			</text>
			<rect x="15" y="72" width="70" height="1.5" fill="#c0a060" />
			<text x="50" y="83" textAnchor="middle" fill="#c0a060" fontSize="7" fontFamily="Arial, sans-serif">
				BCFC
			</text>
		</svg>
	)
}

function LoginButton({ className }: { className?: string }) {
	return (
		<a
			href="#"
			onClick={(e) => e.preventDefault()}
			className={cn(
				'inline-flex h-[35px] w-[130px] items-center justify-center gap-1 rounded-[20px] bg-[#0E3D94] text-white transition-all duration-300 hover:bg-[#1a4fad]',
				className
			)}
			style={{
				animationName: 'tamkeenBeat',
				animationDuration: '2s',
				animationDirection: 'alternate-reverse',
				animationIterationCount: 'infinite',
			}}
		>
			<LogIn size={18} className="relative top-[1px]" />
			<span className="relative top-[1px] text-[14px] font-bold">Login</span>
		</a>
	)
}

function DesktopDropdown({
	item,
	isOpen,
	onMouseEnter,
	onMouseLeave,
	onNavigate,
	isActive,
}: {
	item: NavItem
	isOpen: boolean
	onMouseEnter: () => void
	onMouseLeave: () => void
	onNavigate: (path?: string) => void
	isActive: boolean
}) {
	return (
		<li
			className="relative inline-block border-r border-[#26418e]/60"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<a
				href={item.path || '#'}
				onClick={(e) => {
					e.preventDefault()
					onNavigate(item.path)
				}}
				className={cn(
					'block px-[14.6px] text-[15px] font-semibold leading-[60px] transition-all duration-300 ease-in-out hover:text-[#eb2a30]',
					isActive ? 'pl-0 pr-[15px] text-[#eb2a30]' : 'text-[#26418e]'
				)}
			>
				{item.label}
			</a>
			{item.subItems?.length ? (
				<ul
					className={cn(
						'absolute left-0 top-[66px] z-[9999] m-0 w-[250px] list-none bg-[#222222] p-0 transition-all duration-300 ease-in-out',
						isOpen ? 'visible opacity-100' : 'invisible opacity-0'
					)}
				>
					{item.subItems.map((sub, idx) => (
						<li key={sub.label} className={cn('relative ml-0', idx > 0 ? 'border-t border-[#333333]' : '')}>
							<a
								href={sub.path || '#'}
								onClick={(e) => {
									e.preventDefault()
									onNavigate(sub.path)
								}}
								className="block px-[15px] py-[10px] text-[15px] font-medium text-white transition-all duration-300 ease-in-out hover:bg-[#26418e]"
							>
								{sub.label}
							</a>
						</li>
					))}
				</ul>
			) : null}
		</li>
	)
}

export function TamkeenHeader() {
	const location = useLocation()
	const navigate = useNavigate()
	const [openIndex, setOpenIndex] = React.useState<number | null>(null)
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [mobileExpandedIndex, setMobileExpandedIndex] = React.useState<number | null>(null)
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleMouseEnter = (idx: number) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setOpenIndex(idx)
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setOpenIndex(null), 100)
	}

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	const toggleMobileItem = (idx: number) => {
		setMobileExpandedIndex((prev) => (prev === idx ? null : idx))
	}

	const goTo = (path?: string) => {
		if (!path) return
		setMobileOpen(false)
		navigate(path)
	}

	return (
		<header className="w-full bg-white shadow-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
			<style>{`
				@keyframes tamkeenBeat {
					0% { transform: scale(1); }
					100% { transform: scale(1.04); }
				}
			`}</style>
			<div className="flex w-full items-center px-4">
				<div className="inline-block shrink-0 py-[10px] pr-[30px] align-middle">
					<Link to="/bahraincredit">
						<LogoSvg />
					</Link>
				</div>

				<div className="hidden flex-1 items-center lg:flex">
					<nav>
						<ul className="m-0 flex list-none items-center p-0">
							{tamkeenNavItems.map((item, idx) => {
								const isActive = item.path
									? item.path === '/bahraincredit'
										? location.pathname === item.path
										: location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
									: false

								return (
									<DesktopDropdown
										key={item.label}
										item={item}
										isOpen={openIndex === idx}
										onMouseEnter={() => handleMouseEnter(idx)}
										onMouseLeave={handleMouseLeave}
										onNavigate={goTo}
										isActive={isActive || Boolean(item.active && location.pathname === '/bahraincredit')}
									/>
								)
							})}
							<li className="ml-[30px] inline-block align-middle">
								<LoginButton />
							</li>
						</ul>
					</nav>
				</div>

				<div className="ml-auto flex items-center gap-3 lg:hidden">
					<LoginButton className="w-[110px]" />
					<button
						className="flex h-[26px] w-[26px] flex-col items-center justify-center"
						onClick={() => setMobileOpen((v) => !v)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? <X size={22} className="text-[#26418e]" /> : <Menu size={22} className="text-[#26418e]" />}
					</button>
				</div>
			</div>

			{mobileOpen ? (
				<div className="w-full border-t border-gray-200 bg-white lg:hidden">
					<ul className="m-0 list-none p-0">
						{tamkeenNavItems.map((item, idx) => {
							const hasChildren = Boolean(item.subItems?.length)
							const isActive = item.path
								? item.path === '/bahraincredit'
									? location.pathname === item.path
									: location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
								: false
							return (
								<li key={item.label} className="border-b border-gray-100">
									<div
										className={cn(
											'flex cursor-pointer items-center justify-between px-4 py-3',
											isActive ? 'text-[#eb2a30]' : 'text-[#26418e]'
										)}
										onClick={() => (hasChildren ? toggleMobileItem(idx) : goTo(item.path))}
									>
										<a
											href={item.path || '#'}
											onClick={(e) => {
												e.preventDefault()
												goTo(item.path)
											}}
											className={cn(
												'text-[15px] font-semibold transition-all duration-300',
												isActive ? 'text-[#eb2a30]' : 'text-[#26418e]'
											)}
										>
											{item.label}
										</a>
										{hasChildren ? (
											<span className="select-none text-lg font-bold text-[#26418e]">
												{mobileExpandedIndex === idx ? '−' : '+'}
											</span>
										) : null}
									</div>
									{hasChildren && mobileExpandedIndex === idx ? (
										<ul className="m-0 list-none bg-[#222222] p-0">
											{item.subItems?.map((sub, sidx) => (
												<li key={sub.label} className={cn(sidx > 0 ? 'border-t border-[#333333]' : '')}>
													<a
														href={sub.path || '#'}
														onClick={(e) => {
															e.preventDefault()
															goTo(sub.path)
														}}
														className="block px-5 py-[10px] text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#26418e]"
													>
														{sub.label}
													</a>
												</li>
											))}
										</ul>
									) : null}
								</li>
							)
						})}
					</ul>
				</div>
			) : null}
		</header>
	)
}
