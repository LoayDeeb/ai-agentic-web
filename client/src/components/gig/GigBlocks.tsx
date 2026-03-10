import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	ArrowLeft,
	Calendar,
	Clock,
	ExternalLink,
	Globe,
	HeartPulse,
	Phone,
	Bookmark,
	Share2,
	MessageSquare,
	Plus,
	Minus,
	FileText
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { GIG_OFFICIAL_URL, gigCoverageSections } from './content'

type NavItemProps = {
	href?: string
	text: string
	icon?: React.ReactNode
	onClick?: () => void
	className?: string
}

function QuickAction({
	href = GIG_OFFICIAL_URL,
	icon,
	text,
	onClick,
	className
}: NavItemProps) {
	return (
		<li className={cn('m-0 px-2 py-2 text-white list-none inline-block', className)}>
			<a
				href={href}
				onClick={(event) => {
					if (onClick) {
						event.preventDefault()
						onClick()
					}
				}}
				target={onClick ? undefined : '_blank'}
				rel={onClick ? undefined : 'noreferrer'}
				className="flex items-center gap-2 rounded bg-[#A52A2A] px-3 py-1.5 text-[13px] font-bold text-white shadow-[0_2px_0_0_#8E2525] transition-colors hover:bg-[#8E2525] whitespace-nowrap"
			>
				{icon ? <span className="flex h-4 w-4 items-center justify-center">{icon}</span> : null}
				<span>{text}</span>
			</a>
		</li>
	)
}

type HeaderTopBarProps = {
	onSearch?: (value: string) => void
}

export function GigHeaderTopBar({ onSearch }: HeaderTopBarProps) {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div className="w-full border-b border-[#ffffff10] bg-[#23235F] py-1 font-sans">
			<div className="mx-auto max-w-[1170px] px-[15px]">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse md:gap-0">
					<div className="flex flex-wrap items-center justify-center gap-0 md:justify-start" dir="rtl">
						<ul className="m-0 flex list-none flex-wrap items-center p-0">
							<li className="m-0 flex items-center gap-2 px-3 py-2 text-white">
								<Phone className="h-4 w-4" />
								<a
									dir="ltr"
									href="tel:+96265609888"
									className="text-[15px] text-white transition-colors hover:text-gray-300"
								>
									+(962) 6-5609888
								</a>
							</li>
							<QuickAction text="مطالبة طبية" icon={<FileText className="h-3.5 w-3.5" />} />
							<QuickAction text="شبكتنا الطبية" icon={<HeartPulse className="h-3.5 w-3.5" />} />
							<QuickAction text="الخدمات الإلكترونية" icon={<Globe className="h-3.5 w-3.5" />} />
							<li className="m-0 px-2 py-2">
								<a
									href="https://www.gig.com.jo/en"
									target="_blank"
									rel="noreferrer"
									className="block min-w-[30px] rounded bg-[#A52A2A] px-3 py-1.5 text-center text-[13px] font-bold text-white shadow-[0_2px_0_0_#8E2525] transition-colors hover:bg-[#8E2525]"
								>
									E
								</a>
							</li>
						</ul>
					</div>

					<div className="flex w-full justify-center px-[15px] md:w-auto md:justify-end">
						<form
							onSubmit={(event) => {
								event.preventDefault()
								onSearch?.(searchQuery)
							}}
							className="flex items-center"
						>
							<div className="relative flex overflow-hidden rounded shadow-sm">
								<button
									type="submit"
									className="z-10 border-none bg-[#A52A2A] px-5 py-1.5 text-[11px] font-bold text-white shadow-[0_2px_0_0_#8E2525] transition-colors hover:bg-[#8E2525]"
								>
									بحث
								</button>
								<input
									type="text"
									value={searchQuery}
									onChange={(event) => setSearchQuery(event.target.value)}
									className="w-[180px] border-none bg-white px-3 py-1 text-right text-[13px] font-bold text-[#1D2146] outline-none"
									placeholder="ابحث عن تغطية أو فئة"
									dir="rtl"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="h-[2px] w-full" />
		</div>
	)
}

type NavMenuButtonProps = {
	label: string
	iconSrc: string
	href?: string
	isRtl?: boolean
	onClick?: () => void
	className?: string
}

export function GigNavMenuButton({
	label,
	iconSrc,
	href = '#',
	isRtl = true,
	onClick,
	className
}: NavMenuButtonProps) {
	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (href === '#' || onClick) {
			event.preventDefault()
		}
		onClick?.()
	}

	return (
		<motion.a
			href={href}
			onClick={handleClick}
			target={onClick || href === '#' ? undefined : '_blank'}
			rel={onClick || href === '#' ? undefined : 'noreferrer'}
			className={cn(
				'group flex min-w-[191px] items-center gap-3 rounded-2xl bg-[#1D2146] px-6 py-4 text-white shadow-sm transition-colors hover:bg-[#282d5a]',
				isRtl ? 'flex-row-reverse text-right' : 'text-left',
				className
			)}
			whileHover={{ y: -3 }}
			whileTap={{ scale: 0.98 }}
			dir={isRtl ? 'rtl' : 'ltr'}
		>
			<motion.img
				src={iconSrc}
				alt=""
				className="h-auto w-[25px] flex-shrink-0 object-contain"
				initial={{ opacity: 0.9, scale: 1 }}
				whileHover={{ scale: 1.1, opacity: 1 }}
				transition={{ duration: 0.2 }}
			/>
			<span className="text-[13px] font-semibold leading-[1.4]">{label}</span>
		</motion.a>
	)
}

type LogoBackgroundProps = {
	logoUrl?: string
	width?: string | number
	padding?: string | number
	className?: string
	ariaLabel?: string
}

export function GigLogoBackground({
	logoUrl = 'https://www.gig.com.jo/App_Themes/SiteAr/images/gig-dark-logo-01.png',
	width = 130,
	padding = '51px 50px',
	className,
	ariaLabel = 'GIG Logo'
}: LogoBackgroundProps) {
	const style: React.CSSProperties = {
		backgroundImage: `url("${logoUrl}")`,
		backgroundPosition: '50% 50%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: typeof width === 'number' ? `${width}px` : width,
		padding,
		fontFamily: 'GE_SS_Two_Medium, sans-serif'
	}

	return (
		<div
			role="img"
			aria-label={ariaLabel}
			className={cn(
				'inline-block cursor-default select-none transition-opacity hover:opacity-90',
				className
			)}
			style={style}
		/>
	)
}

type InsightCardProps = {
	title: string
	description: string
	image: string
	category: string
	author: {
		name: string
		avatar: string
	}
	date: string
	readTime: string
	tags: string[]
	onReadMore?: () => void
	className?: string
}

export function GigInsightCard({
	title,
	description,
	image,
	category,
	author,
	date,
	readTime,
	tags,
	onReadMore,
	className
}: InsightCardProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [isBookmarked, setIsBookmarked] = useState(false)

	return (
		<div className={cn('w-full p-4', className)}>
			<motion.div
				className="group relative overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className="relative aspect-[4/3] overflow-hidden">
					<motion.img
						src={image}
						alt={title}
						className="h-full w-full object-cover"
						animate={{ scale: isHovered ? 1.05 : 1 }}
						transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

					<div className="absolute left-4 top-4 flex items-center gap-2">
						<span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
							{category}
						</span>
					</div>

					<div className="absolute right-4 top-4 flex translate-x-12 flex-col gap-2 transition-transform duration-500 group-hover:translate-x-0">
						<button
							onClick={(event) => {
								event.preventDefault()
								setIsBookmarked((value) => !value)
							}}
							className={cn(
								'rounded-full p-2 backdrop-blur-md transition-colors duration-300',
								isBookmarked
									? 'bg-blue-500 text-white'
									: 'bg-white/80 text-slate-700 hover:bg-white'
							)}
							type="button"
						>
							<Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
						</button>
						<a
							href={GIG_OFFICIAL_URL}
							target="_blank"
							rel="noreferrer"
							className="rounded-full bg-white/80 p-2 text-slate-700 transition-colors duration-300 hover:bg-white"
						>
							<Share2 size={16} />
						</a>
					</div>
				</div>

				<div className="p-6">
					<div className="mb-4 flex items-center gap-4 text-xs font-medium text-slate-500">
						<div className="flex items-center gap-1">
							<Calendar size={14} className="text-blue-500" />
							<span>{date}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock size={14} className="text-blue-500" />
							<span>{readTime}</span>
						</div>
					</div>

					<h3 className="mb-3 text-xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
						{title}
					</h3>

					<p className="mb-6 text-sm leading-relaxed text-slate-600">{description}</p>

					<div className="mb-6 flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="rounded bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400"
							>
								#{tag}
							</span>
						))}
					</div>

					<div className="flex items-center justify-between border-t border-slate-50 pt-6">
						<div className="flex items-center gap-3">
							<div className="relative">
								<img
									src={author.avatar}
									alt={author.name}
									className="h-8 w-8 rounded-full object-contain ring-2 ring-white"
								/>
								<div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
							</div>
							<span className="text-sm font-semibold text-slate-800">{author.name}</span>
						</div>

						<motion.button
							className="flex items-center gap-2 text-sm font-bold text-blue-600"
							whileHover={{ x: 5 }}
							onClick={onReadMore}
							type="button"
						>
							اقرأ التفاصيل
							<ArrowLeft size={16} />
						</motion.button>
					</div>
				</div>

				<AnimatePresence>
					{isHovered ? (
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							exit={{ scaleX: 0 }}
							className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-blue-500"
						/>
					) : null}
				</AnimatePresence>
			</motion.div>

			<div className="mt-4 flex items-center gap-6 px-6 text-slate-400">
				<div className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-500">
					<MessageSquare size={16} />
					<span className="text-xs font-medium">تفاصيل التغطيات</span>
				</div>
				<div className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-rose-500">
					<ExternalLink size={16} />
					<span className="text-xs font-medium">زيارة الصفحة الرسمية</span>
				</div>
			</div>
		</div>
	)
}

type AccordionButtonProps = {
	items?: ReadonlyArray<{ id: string; title: string; content: string }>
	title?: string
}

function AccordionItem({
	title,
	content,
	isOpen,
	onClick
}: {
	title: string
	content: string
	isOpen: boolean
	onClick: () => void
}) {
	return (
		<div className="w-full rtl" dir="rtl">
			<button
				onClick={onClick}
				className="group relative flex w-full cursor-pointer select-none items-center justify-between px-4 py-4 text-right transition-colors duration-200 focus:outline-none"
				style={{ backgroundColor: '#20255d', color: '#f2e5dd', fontSize: '14px' }}
				aria-expanded={isOpen}
				type="button"
			>
				<div className="absolute right-0 top-0 h-full w-[2px] bg-[#f2e5dd] opacity-20" />
				<span className="flex-1 font-medium">{title}</span>
				<div className="flex items-center justify-center p-2 text-white transition-transform duration-300">
					{isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
				</div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen ? (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="overflow-hidden border-x border-b border-gray-100 bg-white shadow-sm"
					>
						<div className="p-4 text-right text-sm leading-relaxed text-gray-700">{content}</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

export function GigAccordionButton({
	items = gigCoverageSections,
	title = 'تفاصيل التغطيات'
}: AccordionButtonProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(0)

	return (
		<div className="flex flex-col items-center bg-gray-50 p-8">
			<div className="w-full max-w-3xl space-y-2">
				<h2 className="mb-6 text-center text-2xl font-bold text-[#20255d]">{title}</h2>
				{items.map((item, index) => (
					<div key={item.id} id={item.id}>
						<AccordionItem
							title={item.title}
							content={item.content}
							isOpen={openIndex === index}
							onClick={() => setOpenIndex((value) => (value === index ? null : index))}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
