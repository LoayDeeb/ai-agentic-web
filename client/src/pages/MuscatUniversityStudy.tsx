import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, BookMarked, Filter, GraduationCap, Search } from 'lucide-react'
import { MuscatUniversityShell } from '../components/muscatuniversity/MuscatUniversityShell'
import { MU_PROGRAMMES, type MuProgramme } from '../components/muscatuniversity/content'
import { onToolEvent } from '../features/agent/tools'
import { highlight } from '../features/agent/spotlight'

const levelLabels: Record<string, string> = {
	all: 'كل البرامج',
	foundation: 'التأسيس',
	diploma: 'الدبلوم',
	undergraduate: 'البكالوريوس',
	postgraduate: 'الدراسات العليا',
}

function ProgrammeCard({ programme }: { programme: MuProgramme }) {
	return (
		<article
			id={`mu-programme-${programme.id}`}
			className="rounded-lg border border-[#dbe7df] bg-white p-6 shadow-[0_14px_32px_rgba(11,45,66,0.07)]"
		>
			<div className="mb-5 flex items-start justify-between gap-3">
				<div>
					<p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#007A78]">
						{programme.faculty}
					</p>
					<h2 className="text-2xl font-black leading-tight text-[#0B2D42]">{programme.arTitle}</h2>
					<p className="mt-1 text-sm font-bold text-slate-500">{programme.title}</p>
				</div>
				<GraduationCap className="h-8 w-8 shrink-0 text-[#C99A3E]" />
			</div>
			<p className="mb-5 text-sm leading-7 text-slate-600">{programme.highlight}</p>
			<div className="mb-6 flex flex-wrap gap-2">
				{programme.bestFor.map((tag) => (
					<span key={tag} className="rounded-md bg-[#F3F7F4] px-3 py-1 text-xs font-bold text-[#0B2D42]">
						{tag}
					</span>
				))}
			</div>
			<Link
				to={`/muscat-university/enquire?programme=${programme.id}`}
				className="inline-flex items-center gap-2 rounded-md bg-[#0B2D42] px-4 py-2 text-sm font-black text-white no-underline hover:bg-[#123d58]"
			>
				استفسر عن هذا البرنامج
				<ArrowLeft className="h-4 w-4" />
			</Link>
		</article>
	)
}

export default function MuscatUniversityStudy() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [query, setQuery] = React.useState('')
	const level = searchParams.get('level') || 'all'

	React.useEffect(() => {
		document.title = 'Study at Muscat University'
	}, [])

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToMuscatSection' && args.sectionId === 'programmes') {
				document.getElementById('mu-programmes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
			if (tool === 'selectMuscatProgramme') {
				const programmeId = String(args.programmeId || '')
				const element = document.getElementById(`mu-programme-${programmeId}`)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'center' })
					highlight(`#mu-programme-${programmeId}`, 3)
				}
			}
		})
		return unsubscribe
	}, [])

	const programmes = MU_PROGRAMMES.filter((programme) => {
		const matchesLevel = level === 'all' || programme.level === level
		const normalizedQuery = query.trim().toLowerCase()
		const matchesQuery =
			!normalizedQuery ||
			programme.title.toLowerCase().includes(normalizedQuery) ||
			programme.arTitle.includes(query.trim()) ||
			programme.bestFor.some((tag) => tag.includes(query.trim()))
		return matchesLevel && matchesQuery
	})

	const setLevel = (nextLevel: string) => {
		const params = new URLSearchParams(searchParams)
		if (nextLevel === 'all') params.delete('level')
		else params.set('level', nextLevel)
		setSearchParams(params)
	}

	return (
		<MuscatUniversityShell>
			<main>
				<section className="bg-[#0B2D42] py-16 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#F4D48A]">
							Study at MU
						</p>
						<h1 className="max-w-4xl text-5xl font-black leading-tight">
							البرامج الأكاديمية التي يستطيع المرشد ترشيحها حسب هدف الطالب.
						</h1>
						<p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
							المرشد يربط بين نية الطالب والكلية المناسبة: تقنية، طاقة، أعمال، مالية،
							لوجستيات، أو دراسات عليا.
						</p>
					</div>
				</section>

				<section id="mu-programmes" className="bg-[#fffdf8] py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-8 grid gap-4 rounded-lg border border-[#dbe7df] bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
							<label className="relative block">
								<Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
								<input
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder="ابحث: ذكاء اصطناعي، طاقة، مالية، لوجستيات..."
									className="h-12 w-full rounded-md border border-[#dbe7df] pr-12 text-sm outline-none focus:border-[#007A78] focus:ring-2 focus:ring-[#007A78]/20"
								/>
							</label>
							<div className="flex flex-wrap items-center gap-2">
								<Filter className="h-5 w-5 text-[#007A78]" />
								{Object.entries(levelLabels).map(([value, label]) => (
									<button
										key={value}
										type="button"
										onClick={() => setLevel(value)}
										className={`rounded-md px-3 py-2 text-sm font-black ${
											level === value
												? 'bg-[#007A78] text-white'
												: 'bg-[#F3F7F4] text-[#0B2D42] hover:bg-[#E7F2EF]'
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</div>

						<div className="grid gap-5 lg:grid-cols-2">
							{programmes.map((programme) => (
								<ProgrammeCard key={programme.id} programme={programme} />
							))}
						</div>

						{programmes.length === 0 ? (
							<div className="rounded-lg border border-dashed border-[#dbe7df] bg-white p-10 text-center">
								<BookMarked className="mx-auto mb-4 h-10 w-10 text-[#C99A3E]" />
								<h2 className="mb-2 text-xl font-black text-[#0B2D42]">ما حصلنا برنامج مطابق</h2>
								<p className="text-sm text-slate-600">جرّب كلمة ثانية أو اطلب من المرشد يقترح لك برنامج.</p>
							</div>
						) : null}
					</div>
				</section>
			</main>
		</MuscatUniversityShell>
	)
}
