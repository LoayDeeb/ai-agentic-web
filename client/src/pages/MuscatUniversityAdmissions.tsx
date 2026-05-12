import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BadgePercent, Globe2, School, UserRoundCheck, UsersRound } from 'lucide-react'
import { MuscatUniversityShell } from '../components/muscatuniversity/MuscatUniversityShell'
import { onToolEvent } from '../features/agent/tools'
import { highlight } from '../features/agent/spotlight'

const applicantTypes = [
	{
		id: 'undergraduate',
		icon: School,
		title: 'طالب بكالوريوس',
		text: 'للطلبة القادمين من الدبلوم العام أو ما يعادله ويريدون اختيار مسار جامعي.',
		to: '/muscat-university/enquire?level=undergraduate',
	},
	{
		id: 'transfer',
		icon: UsersRound,
		title: 'طالب تحويل',
		text: 'للطلبة الذين درسوا في مؤسسة أخرى ويريدون مناقشة التحويل والاعتماد.',
		to: '/muscat-university/enquire?level=undergraduate',
	},
	{
		id: 'postgraduate',
		icon: UserRoundCheck,
		title: 'دراسات عليا',
		text: 'للمهنيين والخريجين الباحثين عن ماجستير أو MBA في مسارات متخصصة.',
		to: '/muscat-university/enquire?level=postgraduate',
	},
]

export default function MuscatUniversityAdmissions() {
	React.useEffect(() => {
		document.title = 'Muscat University Admissions'
	}, [])

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'scrollToMuscatSection') {
				const sectionId = String(args.sectionId || '')
				const element = document.getElementById(`mu-${sectionId}`)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#mu-${sectionId}`, 3)
				}
			}
		})
		return unsubscribe
	}, [])

	return (
		<MuscatUniversityShell>
			<main>
				<section className="bg-[#F3F7F4] py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
							<div>
								<p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#007A78]">
									Admissions
								</p>
								<h1 className="max-w-4xl text-5xl font-black leading-tight text-[#0B2D42]">
									قبول واضح: الطالب يختار نوعه، والمرشد يفتح المسار المناسب.
								</h1>
								<p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
									الموقع الرسمي يعرض مسارات للطالب الجامعي، طالب التحويل، والدراسات العليا،
									إضافة إلى معلومات للطلبة الدوليين والمنح.
								</p>
							</div>
							<div className="rounded-lg border border-[#dbe7df] bg-white p-6 shadow-sm">
								<p className="mb-2 text-sm font-black text-[#007A78]">نص العرض المقترح</p>
								<p className="m-0 text-base leading-8 text-[#0B2D42]">
									الطالب يقول: "أنا من مسقط وأبغى تخصص له مستقبل في الذكاء الاصطناعي".
									المرشد يفتح البرامج، يقترح بكالوريوس علوم البيانات والذكاء الاصطناعي، ثم
									ينتقل لنموذج الاستفسار ويعبئه معه.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="mu-admissions" className="bg-[#fffdf8] py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-5 md:grid-cols-3">
							{applicantTypes.map((item) => (
								<Link
									key={item.id}
									to={item.to}
									className="rounded-lg border border-[#dbe7df] bg-white p-6 text-[#102331] no-underline shadow-[0_14px_34px_rgba(11,45,66,0.07)] hover:border-[#C99A3E]"
								>
									<item.icon className="mb-5 h-9 w-9 text-[#C99A3E]" />
									<h2 className="mb-3 text-2xl font-black text-[#0B2D42]">{item.title}</h2>
									<p className="mb-6 text-sm leading-7 text-slate-600">{item.text}</p>
									<span className="inline-flex items-center gap-2 text-sm font-black text-[#007A78]">
										ابدأ الاستفسار
										<ArrowLeft className="h-4 w-4" />
									</span>
								</Link>
							))}
						</div>
					</div>
				</section>

				<section id="mu-scholarships" className="bg-[#0B2D42] py-14 text-white">
					<div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
						<div className="rounded-lg border border-white/16 p-7">
							<BadgePercent className="mb-5 h-9 w-9 text-[#F4D48A]" />
							<h2 className="mb-3 text-3xl font-black">منح ومساعدات</h2>
							<p className="text-base leading-8 text-white/76">
								جامعة مسقط تذكر أن لديها برنامج منح ومساعدات، مع منح للمرحلة الجامعية
								والدراسات العليا حسب الحالة والتواصل مع فريق الاستقطاب.
							</p>
						</div>
						<div className="rounded-lg border border-white/16 p-7">
							<Globe2 className="mb-5 h-9 w-9 text-[#F4D48A]" />
							<h2 className="mb-3 text-3xl font-black">طلبة دوليون</h2>
							<p className="text-base leading-8 text-white/76">
								السيناريو يدعم الطالب العماني والدولي: الجنسية، كود الدولة، البرنامج، ومصدر
								التواصل كلها موجودة في نموذج الاستفسار.
							</p>
						</div>
					</div>
				</section>
			</main>
		</MuscatUniversityShell>
	)
}
