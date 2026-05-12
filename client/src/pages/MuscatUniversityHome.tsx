import React from 'react'
import { Link } from 'react-router-dom'
import {
	ArrowLeft,
	BadgeCheck,
	BookOpen,
	Building2,
	ChevronLeft,
	Compass,
	Headphones,
	Sparkles,
} from 'lucide-react'
import { MuscatUniversityShell } from '../components/muscatuniversity/MuscatUniversityShell'
import { MU_BRAND, MU_PROGRAMMES } from '../components/muscatuniversity/content'

const scenarioSteps = [
	{
		title: 'يفهم هدف الطالب',
		text: 'الطالب يقول: أريد أدرس ذكاء اصطناعي أو طاقة متجددة. المرشد يسأل سؤال واحد فقط لتضييق الاختيار.',
	},
	{
		title: 'ينقل المستخدم للصفحة الصحيحة',
		text: 'يفتح صفحة البرامج، يبرز المسار المناسب، ويشرح الفرق بين البرامج بلغة عمانية مهنية.',
	},
	{
		title: 'يملأ نموذج الاستفسار',
		text: 'يجمع الاسم والبريد والرقم والجنسية والبرنامج، ثم يراجع البيانات قبل الإرسال.',
	},
]

const admissionHighlights = [
	{
		icon: BadgeCheck,
		title: 'منح البكالوريوس',
		text: 'العرض الرسمي يذكر منح للمرحلة الجامعية بقيمة خمسة وعشرين بالمئة.',
	},
	{
		icon: Sparkles,
		title: 'منح الدراسات العليا',
		text: 'العرض الرسمي يذكر منح للدراسات العليا تصل إلى عشرين بالمئة.',
	},
	{
		icon: Building2,
		title: 'ثلاث كليات',
		text: 'الأعمال والإدارة، الهندسة والتكنولوجيا، والنقل واللوجستيات.',
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
					className="relative overflow-hidden bg-[#0B2D42] text-white"
					style={{
						backgroundImage:
							'linear-gradient(90deg, rgba(11,45,66,0.94), rgba(11,45,66,0.82) 48%, rgba(0,122,120,0.48)), url("https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80")',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}
				>
					<div className="mx-auto grid min-h-[680px] max-w-7xl items-end gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
						<div className="max-w-3xl">
							<p className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4D48A]">
								<Headphones className="h-4 w-4" />
								مرشد قبول يتكلم عماني
							</p>
							<h1 className="mb-6 max-w-4xl text-5xl font-black leading-[1.08] tracking-normal sm:text-6xl lg:text-7xl">
								مرشد جامعة مسقط للقبول يختصر رحلة الطالب من السؤال إلى الاستفسار.
							</h1>
							<p className="max-w-2xl text-lg leading-9 text-white/82">
								عرض تفاعلي يحاكي موقع جامعة مسقط: يتعرف على نية الطالب، يفتح البرنامج المناسب،
								يوضح المنح، ثم يملأ نموذج الاستفسار خطوة بخطوة قبل الإرسال.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Link
									to="/muscat-university/enquire?programme=bsc-data-ai"
									className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#C99A3E] px-5 py-3 text-sm font-black text-[#0B2D42] no-underline hover:bg-[#d7aa53]"
								>
									ابدأ سيناريو طالب تقنية
									<ArrowLeft className="h-4 w-4" />
								</Link>
								<Link
									to="/muscat-university/study"
									className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-black text-white no-underline hover:bg-white/10"
								>
									استعرض البرامج
									<Compass className="h-4 w-4" />
								</Link>
							</div>
						</div>

						<div className="border border-white/18 bg-[#fffdf8] p-5 text-[#102331] shadow-2xl">
							<p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#007A78]">
								سيناريو العرض
							</p>
							<h2 className="mb-5 text-2xl font-black leading-tight text-[#0B2D42]">
								طالب عماني يريد يختار تخصص ويقدم استفسار
							</h2>
							<div className="grid gap-3">
								{scenarioSteps.map((step, index) => (
									<div key={step.title} className="border-r-4 border-[#C99A3E] bg-[#F3F7F4] p-4">
										<p className="mb-1 text-xs font-black text-[#007A78]">الخطوة {index + 1}</p>
										<p className="mb-1 font-black text-[#0B2D42]">{step.title}</p>
										<p className="m-0 text-sm leading-6 text-slate-700">{step.text}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id="mu-programmes-preview" className="bg-[#fffdf8] py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
							<div>
								<p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-[#007A78]">
									اختيار البرنامج
								</p>
								<h2 className="max-w-3xl text-4xl font-black leading-tight text-[#0B2D42]">
									المرشد يحول كلام الطالب إلى مسار واضح.
								</h2>
							</div>
							<Link
								to="/muscat-university/study"
								className="inline-flex items-center gap-2 text-sm font-black text-[#007A78] no-underline"
							>
								كل البرامج
								<ChevronLeft className="h-4 w-4" />
							</Link>
						</div>

						<div className="grid gap-5 md:grid-cols-3">
							{featuredProgrammes.map((programme) => (
								<article
									key={programme.id}
									className="rounded-lg border border-[#dbe7df] bg-white p-6 shadow-[0_18px_40px_rgba(11,45,66,0.08)]"
								>
									<BookOpen className="mb-5 h-8 w-8 text-[#C99A3E]" />
									<p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#007A78]">
										{programme.faculty}
									</p>
									<h3 className="mb-3 text-xl font-black leading-tight text-[#0B2D42]">
										{programme.arTitle}
									</h3>
									<p className="mb-5 text-sm leading-7 text-slate-600">{programme.highlight}</p>
									<Link
										to={`/muscat-university/enquire?programme=${programme.id}`}
										className="inline-flex items-center gap-2 rounded-md border border-[#0B2D42] px-4 py-2 text-sm font-black text-[#0B2D42] no-underline hover:bg-[#0B2D42] hover:text-white"
									>
										استفسر عن البرنامج
										<ArrowLeft className="h-4 w-4" />
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>

				<section id="mu-scholarships" className="bg-[#F3F7F4] py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-6 md:grid-cols-3">
							{admissionHighlights.map((item) => (
								<div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
									<item.icon className="mb-4 h-7 w-7" style={{ color: MU_BRAND.gold }} />
									<h3 className="mb-2 text-lg font-black text-[#0B2D42]">{item.title}</h3>
									<p className="m-0 text-sm leading-7 text-slate-600">{item.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</MuscatUniversityShell>
	)
}
