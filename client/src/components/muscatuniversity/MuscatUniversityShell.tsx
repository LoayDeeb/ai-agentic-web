import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ExternalLink, Menu, MessageCircle, Search, X } from 'lucide-react'
import { MU_BRAND } from './content'

type ShellProps = {
	children: React.ReactNode
}

const navItems = [
	{ label: 'Study', to: '/muscat-university/study' },
	{ label: 'Admissions', to: '/muscat-university/admissions' },
	{ label: 'Colleges and Centres', to: '/muscat-university/study' },
	{ label: 'Life at MU', to: '/muscat-university' },
	{ label: 'About MU', to: '/muscat-university' },
	{ label: 'FAQ', to: '/muscat-university/enquire' },
]

const utilityLinks = ['Apply now', 'Current Students', 'International Students']

export function MuscatUniversityHeader() {
	const [mobileOpen, setMobileOpen] = React.useState(false)

	return (
		<header className="sticky top-0 z-30 bg-white shadow-[0_2px_16px_rgba(30,20,44,0.1)]" dir="ltr">
			<div className="bg-[#4a1f66] text-white">
				<div className="mx-auto flex max-w-7xl items-center justify-end gap-5 px-4 py-2 text-[12px] font-semibold sm:px-6 lg:px-8">
					{utilityLinks.map((label) => (
						<a key={label} href="#" className="inline-flex items-center gap-1 text-white/90 no-underline hover:text-white">
							{label}
							{label === 'Apply now' ? <ExternalLink className="h-3 w-3" /> : null}
						</a>
					))}
				</div>
			</div>

			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<Link to="/muscat-university" className="flex items-center gap-3 text-[#2a2430] no-underline">
					<div className="flex h-14 w-14 items-center justify-center bg-[#4a1f66] text-xl font-black tracking-tight text-white">
						MU
					</div>
					<div className="leading-none">
						<p className="m-0 text-[24px] font-black uppercase tracking-[0.01em] text-[#4a1f66]">Muscat</p>
						<p className="m-0 text-[16px] font-black uppercase tracking-[0.18em] text-[#2a2430]">University</p>
					</div>
				</Link>

				<nav className="hidden items-center gap-1 lg:flex">
					{navItems.map((item) => (
						<NavLink
							key={`${item.label}-${item.to}`}
							to={item.to}
							end={item.to === '/muscat-university'}
							className={({ isActive }) =>
								`px-3 py-2 text-[13px] font-bold uppercase tracking-[0.03em] no-underline transition ${
									isActive ? 'text-[#7b1f6f]' : 'text-[#2f2935] hover:text-[#7b1f6f]'
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="hidden items-center gap-2 md:flex">
					<button
						type="button"
						className="grid h-10 w-10 place-items-center rounded-none border border-[#ddd8e4] text-[#4a1f66]"
						aria-label="Search"
					>
						<Search className="h-4 w-4" />
					</button>
					<Link
						to="/muscat-university/enquire"
						className="inline-flex min-h-10 items-center gap-2 bg-[#a7c947] px-4 py-2 text-sm font-black uppercase text-[#2a2430] no-underline hover:bg-[#b7d85c]"
					>
						<MessageCircle className="h-4 w-4" />
						Enquire now
					</Link>
				</div>

				<button
					type="button"
					className="grid h-10 w-10 place-items-center border border-[#ddd8e4] text-[#4a1f66] lg:hidden"
					onClick={() => setMobileOpen((value) => !value)}
					aria-label="Toggle navigation"
				>
					{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{mobileOpen ? (
				<div className="border-t border-[#e8e3ec] px-4 py-3 lg:hidden">
					<div className="grid gap-1">
						{navItems.map((item) => (
							<Link
								key={`${item.label}-mobile`}
								to={item.to}
								onClick={() => setMobileOpen(false)}
								className="px-3 py-3 text-sm font-bold uppercase text-[#2f2935] no-underline hover:bg-[#f4f0f6]"
							>
								{item.label}
							</Link>
						))}
						<Link
							to="/muscat-university/enquire"
							onClick={() => setMobileOpen(false)}
							className="mt-2 bg-[#a7c947] px-3 py-3 text-sm font-black uppercase text-[#2a2430] no-underline"
						>
							Enquire now
						</Link>
					</div>
				</div>
			) : null}
		</header>
	)
}

export function MuscatUniversityFooter() {
	return (
		<footer className="bg-[#33223f] text-white" dir="ltr">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.25fr_1fr_1fr_1fr] lg:px-8">
				<div>
					<p className="mb-3 text-xl font-black">Muscat University</p>
					<p className="max-w-md text-sm leading-7 text-white/72">
						A demo admissions concierge styled after the public MU website. It guides students in short Omani Arabic,
						navigates programmes, and prepares enquiry details for follow-up.
					</p>
				</div>
				<div>
					<p className="mb-3 text-sm font-black uppercase text-[#a7c947]">Study at MU</p>
					<div className="grid gap-2 text-sm">
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/study">
							General Foundation Programme
						</Link>
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/study">
							UG Programmes
						</Link>
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/study">
							PG Programmes
						</Link>
					</div>
				</div>
				<div>
					<p className="mb-3 text-sm font-black uppercase text-[#a7c947]">Admissions</p>
					<div className="grid gap-2 text-sm">
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/admissions">
							Scholarships and Aids
						</Link>
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/admissions">
							How to Apply
						</Link>
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/enquire">
							Application Dashboard
						</Link>
					</div>
				</div>
				<div>
					<p className="mb-3 text-sm font-black uppercase text-[#a7c947]">Quick Links</p>
					<div className="grid gap-2 text-sm">
						<a className="text-white/78 no-underline hover:text-white" href="#">
							Contact us
						</a>
						<a className="text-white/78 no-underline hover:text-white" href="#">
							Virtual tour
						</a>
						<Link className="text-white/78 no-underline hover:text-white" to="/muscat-university/enquire">
							Enquire Now
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export function MuscatUniversityShell({ children }: ShellProps) {
	React.useEffect(() => {
		document.documentElement.dir = 'ltr'
		document.documentElement.lang = 'en'
	}, [])

	return (
		<div
			className="min-h-screen bg-white text-[#2a2430]"
			dir="ltr"
			style={{
				fontFamily: '"Trebuchet MS", "Segoe UI", Arial, sans-serif',
				color: MU_BRAND.ink,
			}}
		>
			<MuscatUniversityHeader />
			{children}
			<MuscatUniversityFooter />
		</div>
	)
}
