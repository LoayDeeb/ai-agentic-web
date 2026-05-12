import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BookOpen, Building2, Headphones, Search, Sparkles } from 'lucide-react'
import { MuscatUniversityShell } from '../components/muscatuniversity/MuscatUniversityShell'
import { MU_BRAND, MU_PROGRAMMES } from '../components/muscatuniversity/content'

const heroSlides = [
	{
		title: 'EXCLUSIVE NEW PROGRAMMES',
		text: 'Including the first CFA-aligned programme in Oman, covering all three CFA levels.',
		to: '/muscat-university/study',
	},
	{
		title: 'THE FUTURE OF ENERGY',
		text: 'Renewable Energy Engineering programmes aligned with Oman Vision 2040.',
		to: '/muscat-university/study',
	},
]

const faculties = ['Faculty of Engineering and Technology', 'Faculty of Transport and Logistics', 'Faculty of Business and Management']

const scenarioSteps = [
	{
		title: 'Understands intent',
		text: 'Student says: "I want AI or renewable energy." The agent asks one short question, then narrows the path.',
	},
	{
		title: 'Navigates the site',
		text: 'It opens Study, highlights matching programmes, and explains choices in concise Omani Arabic.',
	},
	{
		title: 'Fills the enquiry',
		text: 'It collects name, email, phone, nationality, programme, then reviews before submit.',
	},
]

const admissionHighlights = [
	{
		icon: BadgeCheck,
		title: 'Undergraduate scholarships',
		text: 'Registration is open with undergraduate scholarships worth 25%.',
	},
	{
		icon: Sparkles,
		title: 'Postgraduate scholarships',
		text: 'Postgraduate applicants can explore scholarships worth up to 20%.',
	},
	{
		icon: Building2,
		title: 'Three faculties',
		text: 'Business and Management, Engineering and Technology, and Transport and Logistics.',
	},
]

export default function MuscatUniversityHome() {
	React.useEffect(() => {
		document.title = 'Muscat University Admissions Concierge'
	}, [])

	const featuredProgrammes = MU_PROGRAMMES.filter((programme) =>
		['bsc-data-ai', 'beng-energy', 'bsc-accounting-finance'].includes(programme.id)
	)

	return (
		<MuscatUniversityShell>
			<main>
				<section
					id="mu-hero"
					className="relative min-h-[640px] overflow-hidden bg-[#241733] text-white"
					style={{
						backgroundImage:
							'linear-gradient(90deg, rgba(36,23,51,0.9), rgba(74,31,102,0.72) 46%, rgba(36,23,51,0.2)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80")',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}
				>
					<div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
						<div className="max-w-3xl">
							<p className="mb-4 inline-flex items-center bg-[#a7c947] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2a2430]">
								<Headphones className="mr-2 h-4 w-4" />
								Omani Arabic admissions agent
							</p>
							<h1 className="mb-6 text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
								{heroSlides[0].title}
							</h1>
							<p className="max-w-xl text-xl font-semibold leading-8 text-white/90">{heroSlides[0].text}</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Link
									to="/muscat-university/study"
									className="inline-flex min-h-12 items-center bg-[#a7c947] px-6 py-3 text-sm font-black uppercase text-[#2a2430] no-underline hover:bg-[#b7d85c]"
								>
									Learn more
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
								<Link
									to="/muscat-university/enquire?programme=bsc-data-ai"
									className="inline-flex min-h-12 items-center border border-white/50 px-6 py-3 text-sm font-black uppercase text-white no-underline hover:bg-white/10"
								>
									Start agent demo
								</Link>
							</div>
							<div className="mt-12 flex gap-2" aria-label="Hero slides">
								{heroSlides.map((slide, index) => (
									<span key={slide.title} className={`h-2 w-10 ${index === 0 ? 'bg-[#a7c947]' : 'bg-white/45'}`} />
								))}
							</div>
						</div>

						<aside className="bg-white p-6 text-[#2a2430] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
							<p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#7b1f6f]">Scenario</p>
							<h2 className="mb-5 text-2xl font-black leading-tight">Short, conversational admissions help</h2>
							<div className="grid gap-3">
								{scenarioSteps.map((step, index) => (
									<div key={step.title} className="border-l-4 border-[#a7c947] bg-[#f6f3f8] p-4">
										<p className="mb-1 text-xs font-black uppercase text-[#7b1f6f]">Step {index + 1}</p>
										<p className="mb-1 font-black text-[#2a2430]">{step.title}</p>
										<p className="m-0 text-sm leading-6 text-[#5f5668]">{step.text}</p>
									</div>
								))}
							</div>
						</aside>
					</div>
				</section>

				<section id="mu-scholarship-strip" className="bg-[#4a1f66] text-white">
					<div className="mx-auto grid max-w-7xl gap-0 px-4 py-8 sm:px-6 md:grid-cols-2 lg:px-8">
						<div className="border-white/20 py-4 md:border-r md:pr-8">
							<p className="mb-2 text-2xl font-black">Scholarships for Postgraduates</p>
							<p className="mb-4 text-sm leading-6 text-white/78">Registration is now open. Apply for PG programmes and explore scholarships worth up to 20%.</p>
							<Link to="/muscat-university/enquire" className="font-black uppercase text-[#a7c947] no-underline">
								Apply now
							</Link>
						</div>
						<div className="py-4 md:pl-8">
							<p className="mb-2 text-2xl font-black">Scholarships for Undergraduates</p>
							<p className="mb-4 text-sm leading-6 text-white/78">Registration is now open. Apply for UG programmes and explore scholarship worth 25%.</p>
							<Link to="/muscat-university/enquire" className="font-black uppercase text-[#a7c947] no-underline">
								Apply now
							</Link>
						</div>
					</div>
				</section>

				<section id="mu-programmes-preview" className="bg-white py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto mb-9 max-w-4xl text-center">
							<h2 className="mb-4 text-4xl font-black uppercase leading-tight text-[#2a2430]">Explore our programmes</h2>
							<p className="text-base leading-8 text-[#5f5668]">
								Our academic programmes are designed with 21st-century employers in mind and delivered via three faculties.
							</p>
						</div>

						<div className="mx-auto mb-10 flex max-w-2xl items-center border border-[#ddd8e4] bg-white px-4 py-3 shadow-[0_14px_34px_rgba(30,20,44,0.08)]">
							<Search className="mr-3 h-5 w-5 text-[#7b1f6f]" />
							<input
								type="search"
								placeholder="Search our programmes..."
								className="w-full border-0 bg-transparent text-base outline-none placeholder:text-[#8c8494]"
							/>
						</div>

						<div className="mb-8 grid gap-4 md:grid-cols-3">
							{faculties.map((faculty) => (
								<div key={faculty} className="border-t-4 border-[#7b1f6f] bg-[#f6f3f8] p-5">
									<p className="m-0 text-lg font-black leading-tight text-[#2a2430]">{faculty}</p>
								</div>
							))}
						</div>

						<div className="grid gap-5 md:grid-cols-3">
							{featuredProgrammes.map((programme) => (
								<article key={programme.id} className="border border-[#e6e0ea] bg-white p-6 shadow-[0_18px_40px_rgba(30,20,44,0.08)]">
									<BookOpen className="mb-5 h-8 w-8 text-[#7b1f6f]" />
									<p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#7b1f6f]">{programme.faculty}</p>
									<h3 className="mb-3 text-xl font-black leading-tight text-[#2a2430]">{programme.title}</h3>
									<p className="mb-5 text-sm leading-7 text-[#5f5668]">{programme.highlight}</p>
									<Link
										to={`/muscat-university/enquire?programme=${programme.id}`}
										className="inline-flex items-center border border-[#4a1f66] px-4 py-2 text-sm font-black uppercase text-[#4a1f66] no-underline hover:bg-[#4a1f66] hover:text-white"
									>
										Enquire
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>

				<section id="mu-virtual-tour" className="bg-[#f6f3f8] py-16">
					<div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
						<div>
							<p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#7b1f6f]">Take a virtual tour</p>
							<h2 className="mb-4 text-4xl font-black leading-tight text-[#2a2430]">Discover the campus, classrooms, labs, and student spaces.</h2>
							<Link to="/muscat-university/enquire" className="inline-flex items-center bg-[#4a1f66] px-5 py-3 text-sm font-black uppercase text-white no-underline">
								Take the tour
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</div>
						<div
							className="min-h-[320px] bg-[#241733]"
							style={{
								backgroundImage:
									'linear-gradient(0deg, rgba(36,23,51,0.18), rgba(36,23,51,0.18)), url("https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1400&q=80")',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
							}}
						/>
					</div>
				</section>

				<section id="mu-highlights" className="bg-white py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-6 md:grid-cols-3">
							{admissionHighlights.map((item) => (
								<div key={item.title} className="border border-[#e6e0ea] bg-white p-6">
									<item.icon className="mb-4 h-7 w-7" style={{ color: MU_BRAND.plum }} />
									<h3 className="mb-2 text-lg font-black text-[#2a2430]">{item.title}</h3>
									<p className="m-0 text-sm leading-7 text-[#5f5668]">{item.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</MuscatUniversityShell>
	)
}
