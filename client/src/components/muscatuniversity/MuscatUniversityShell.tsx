import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, GraduationCap, Menu, MessageCircle, X } from 'lucide-react'
import { MU_BRAND } from './content'

type ShellProps = {
	children: React.ReactNode
}

const navItems = [
	{ label: 'الرئيسية', to: '/muscat-university' },
	{ label: 'البرامج', to: '/muscat-university/study' },
	{ label: 'القبول', to: '/muscat-university/admissions' },
	{ label: 'استفسر الآن', to: '/muscat-university/enquire' },
]

export function MuscatUniversityHeader() {
	const [mobileOpen, setMobileOpen] = React.useState(false)

	return (
		<header className="sticky top-0 z-30 border-b border-[#dbe7df] bg-[#fffdf8]/95 backdrop-blur" dir="rtl">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<Link to="/muscat-university" className="flex items-center gap-3 text-[#0B2D42] no-underline">
					<div className="grid h-11 w-11 place-items-center rounded-lg bg-[#0B2D42] text-white">
						<GraduationCap className="h-6 w-6" />
					</div>
					<div>
						<p className="m-0 text-base font-black leading-tight">Muscat University</p>
						<p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-[#007A78]">
							Aspire Beyond
						</p>
					</div>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.to === '/muscat-university'}
							className={({ isActive }) =>
								`rounded-md px-4 py-2 text-sm font-bold no-underline transition ${
									isActive ? 'bg-[#E7F2EF] text-[#007A78]' : 'text-[#0B2D42] hover:bg-[#F3F7F4]'
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<Link
						to="/muscat-university/enquire"
						className="inline-flex items-center gap-2 rounded-md bg-[#C99A3E] px-4 py-2 text-sm font-black text-[#0B2D42] no-underline transition hover:bg-[#d7aa53]"
					>
						<MessageCircle className="h-4 w-4" />
						ابدأ الطلب
					</Link>
				</div>

				<button
					type="button"
					className="grid h-10 w-10 place-items-center rounded-md border border-[#dbe7df] text-[#0B2D42] md:hidden"
					onClick={() => setMobileOpen((value) => !value)}
					aria-label="Toggle navigation"
				>
					{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{mobileOpen ? (
				<div className="border-t border-[#dbe7df] px-4 py-3 md:hidden">
					<div className="grid gap-2">
						{navItems.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								onClick={() => setMobileOpen(false)}
								className="rounded-md px-3 py-3 text-sm font-bold text-[#0B2D42] no-underline hover:bg-[#F3F7F4]"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			) : null}
		</header>
	)
}

export function MuscatUniversityFooter() {
	return (
		<footer className="bg-[#0B2D42] text-white" dir="rtl">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
				<div>
					<p className="mb-3 text-lg font-black">Muscat University</p>
					<p className="max-w-md text-sm leading-7 text-white/74">
						نسخة تجريبية لمرشد قبول ذكي يساعد الطالب على اختيار المسار، فهم المنح، وإرسال نموذج
						استفسار جاهز للمتابعة.
					</p>
				</div>
				<div>
					<p className="mb-3 text-sm font-black text-[#C99A3E]">روابط العرض</p>
					<div className="grid gap-2 text-sm">
						<Link className="text-white/80 no-underline hover:text-white" to="/muscat-university/study">
							استعراض البرامج
						</Link>
						<Link className="text-white/80 no-underline hover:text-white" to="/muscat-university/admissions">
							مسارات القبول
						</Link>
						<Link className="text-white/80 no-underline hover:text-white" to="/muscat-university/enquire">
							نموذج الاستفسار
						</Link>
					</div>
				</div>
				<div>
					<p className="mb-3 text-sm font-black text-[#C99A3E]">سيناريو سريع</p>
					<Link
						to="/muscat-university/enquire?programme=bsc-data-ai"
						className="inline-flex items-center gap-2 rounded-md border border-white/28 px-4 py-2 text-sm font-bold text-white no-underline hover:bg-white/10"
					>
						طالب يريد الذكاء الاصطناعي
						<ArrowRight className="h-4 w-4 rotate-180" />
					</Link>
				</div>
			</div>
		</footer>
	)
}

export function MuscatUniversityShell({ children }: ShellProps) {
	React.useEffect(() => {
		document.documentElement.dir = 'rtl'
		document.documentElement.lang = 'ar'
		return () => {
			document.documentElement.dir = 'ltr'
			document.documentElement.lang = 'en'
		}
	}, [])

	return (
		<div
			className="min-h-screen bg-[#fffdf8] text-[#102331]"
			dir="rtl"
			style={{
				fontFamily:
					'Tahoma, "Segoe UI", "Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
				color: MU_BRAND.ink,
			}}
		>
			<MuscatUniversityHeader />
			{children}
			<MuscatUniversityFooter />
		</div>
	)
}
