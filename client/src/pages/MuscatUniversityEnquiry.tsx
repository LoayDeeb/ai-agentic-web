import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, FileText, MessageCircle, ShieldCheck } from 'lucide-react'
import { FormField, SelectInput, TextArea, TextInput } from '../components/FormField'
import { MuscatUniversityShell } from '../components/muscatuniversity/MuscatUniversityShell'
import {
	getMuProgramme,
	inferMuStudyLevel,
	MU_HEARD_FROM_OPTIONS,
	MU_PROGRAMME_OPTIONS,
	MU_PROGRAMMES,
} from '../components/muscatuniversity/content'
import { highlight } from '../features/agent/spotlight'
import { onToolEvent } from '../features/agent/tools'
import { useFormStore } from '../store/formStore'

const stepLabels = [
	{ number: 1, label: 'بيانات الطالب' },
	{ number: 2, label: 'اختيار البرنامج' },
	{ number: 3, label: 'المراجعة' },
]

const studyLevelOptions = [
	{ value: 'foundation', label: 'General Foundation' },
	{ value: 'diploma', label: 'Diploma' },
	{ value: 'undergraduate', label: 'Undergraduate' },
	{ value: 'postgraduate', label: 'Postgraduate' },
]

const contactOptions = [
	{ value: 'phone', label: 'Phone call' },
	{ value: 'whatsapp', label: 'WhatsApp' },
	{ value: 'email', label: 'Email' },
]

function programmeLabel(value: string) {
	return getMuProgramme(value)?.title || value || 'Not selected'
}

export default function MuscatUniversityEnquiry() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = React.useState(false)
	const [errors, setErrors] = React.useState<Record<string, string>>({})

	React.useEffect(() => {
		document.title = 'Muscat University Enquiry'
	}, [])

	React.useEffect(() => {
		setCurrentStep(1)
		const programme = searchParams.get('programme')
		const level = searchParams.get('level')
		if (programme && getMuProgramme(programme)) {
			setField('muProgramme', programme)
			setField('muStudyLevel', inferMuStudyLevel(programme))
		} else if (level) {
			setField('muStudyLevel', level)
		}
	}, [searchParams, setCurrentStep, setField])

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'fillFormField') {
				setField(args.fieldName, args.value)
				window.setTimeout(() => {
					const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
					if (input) {
						input.scrollIntoView({ behavior: 'smooth', block: 'center' })
						highlight(`[name="${args.fieldName}"]`, 2)
					}
				}, 100)
			}

			if (tool === 'selectMuscatProgramme') {
				const programmeId = String(args.programmeId || '')
				if (getMuProgramme(programmeId)) {
					setField('muProgramme', programmeId)
					setField('muStudyLevel', inferMuStudyLevel(programmeId))
					window.setTimeout(() => {
						const input = document.querySelector('[name="muProgramme"]') as HTMLElement | null
						input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
						highlight('[name="muProgramme"]', 2)
					}, 100)
				}
			}

			if (tool === 'goToFormStep') {
				setCurrentStep(Math.max(1, Math.min(3, Number(args.step || 1))))
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}

			if (tool === 'highlightFormField') {
				const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
				if (input) {
					input.scrollIntoView({ behavior: 'smooth', block: 'center' })
					highlight(`[name="${args.fieldName}"]`, args.duration || 3)
				}
			}

			if (tool === 'submitForm' && currentStep === 3) {
				handleSubmit()
			}
		})
		return unsubscribe
	}, [currentStep, setCurrentStep, setField])

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}
		if (step === 1) {
			if (!formData.muApplicantFullName) nextErrors.muApplicantFullName = 'Full name is required'
			if (!formData.muEmail) nextErrors.muEmail = 'Email is required'
			if (!formData.muIsdCode) nextErrors.muIsdCode = 'ISD code is required'
			if (!formData.muMobile) nextErrors.muMobile = 'Mobile number is required'
			if (!formData.muNationality) nextErrors.muNationality = 'Nationality is required'
		}
		if (step === 2) {
			if (!formData.muStudyLevel) nextErrors.muStudyLevel = 'Study level is required'
			if (!formData.muProgramme) nextErrors.muProgramme = 'Programme is required'
			if (!formData.muHowHeard) nextErrors.muHowHeard = 'Source is required'
		}
		if (step === 3 && !formData.muTermsAccepted) {
			nextErrors.muTermsAccepted = 'Confirmation is required'
		}
		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleNext = () => {
		if (!validateStep(currentStep)) return
		setCurrentStep(Math.min(currentStep + 1, 3))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleBack = () => {
		setCurrentStep(Math.max(currentStep - 1, 1))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleSubmit = () => {
		if (!validateStep(3)) return
		setSubmitted(true)
	}

	const selectedProgramme = getMuProgramme(formData.muProgramme)

	if (submitted) {
		return (
			<MuscatUniversityShell>
				<main className="bg-[#F3F7F4] py-16">
					<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
						<div className="rounded-lg bg-white p-9 text-center shadow-[0_20px_60px_rgba(11,45,66,0.1)]">
							<CheckCircle className="mx-auto mb-5 h-20 w-20 text-[#007A78]" />
							<h1 className="mb-3 text-4xl font-black text-[#0B2D42]">تم إرسال الاستفسار</h1>
							<p className="mx-auto mb-7 max-w-xl text-base leading-8 text-slate-600">
								تم تسجيل اهتمامك ببرنامج {programmeLabel(formData.muProgramme)}. في العرض الحقيقي،
								فريق الاستقطاب يتابع مع الطالب عبر وسيلة التواصل المفضلة.
							</p>
							<div className="mb-7 inline-block rounded-lg bg-[#F3F7F4] px-5 py-4 text-right">
								<p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-[#007A78]">
									Reference
								</p>
								<p className="font-mono text-lg font-black text-[#0B2D42]">
									MU-ENQ-{Math.floor(Math.random() * 90000) + 10000}
								</p>
							</div>
							<div>
								<button
									type="button"
									onClick={() => navigate('/muscat-university')}
									className="rounded-md bg-[#0B2D42] px-6 py-3 text-sm font-black text-white hover:bg-[#123d58]"
								>
									الرجوع للرئيسية
								</button>
							</div>
						</div>
					</div>
				</main>
			</MuscatUniversityShell>
		)
	}

	return (
		<MuscatUniversityShell>
			<main className="bg-[#fffdf8]">
				<section className="border-b border-[#dbe7df] bg-[#0B2D42] py-12 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<Link to="/muscat-university" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/80 no-underline">
							<ArrowLeft className="h-4 w-4 rotate-180" />
							العودة للرئيسية
						</Link>
						<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
							<div>
								<p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#F4D48A]">
									Enquire Now
								</p>
								<h1 className="max-w-4xl text-5xl font-black leading-tight">
									نموذج استفسار قابل للتعبئة بالصوت.
								</h1>
								<p className="mt-5 max-w-3xl text-lg leading-8 text-white/76">
									المرشد يجمع نفس نوع البيانات الظاهر في نموذج الاستفسار الرسمي: الاسم، البريد،
									كود الدولة، الرقم، الجنسية، البرنامج، وكيف عرف الطالب عن الجامعة.
								</p>
							</div>
							<div className="rounded-lg border border-white/18 bg-white/8 p-5">
								<MessageCircle className="mb-4 h-8 w-8 text-[#F4D48A]" />
								<p className="text-sm leading-7 text-white/78">
									جرّب كتابة أو قول: "أنا سالم من عمان، أريد أدرس ذكاء اصطناعي، رقمي
									٩٨٨٨٨٨٨٨ وبريدي salem@example.com".
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12">
					<div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
						<div className="rounded-lg border border-[#dbe7df] bg-white p-6 shadow-[0_18px_48px_rgba(11,45,66,0.08)] sm:p-8">
							<div className="mb-8 grid gap-3 sm:grid-cols-3">
								{stepLabels.map((step) => {
									const active = currentStep === step.number
									const completed = currentStep > step.number
									return (
										<div
											key={step.number}
											className={`rounded-lg border px-4 py-3 ${
												active
													? 'border-[#007A78] bg-[#E7F2EF]'
													: completed
														? 'border-[#C99A3E] bg-[#FFF7E2]'
														: 'border-[#dbe7df] bg-white'
											}`}
										>
											<p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
												Step {step.number}
											</p>
											<p className="m-0 text-sm font-black text-[#0B2D42]">{step.label}</p>
										</div>
									)
								})}
							</div>

							{currentStep === 1 ? (
								<div className="grid gap-5 md:grid-cols-2">
									<FormField label="الاسم الكامل" required error={errors.muApplicantFullName}>
										<TextInput
											name="muApplicantFullName"
											value={formData.muApplicantFullName}
											onChange={(value) => setField('muApplicantFullName', value)}
											placeholder="مثال: سالم البلوشي"
										/>
									</FormField>
									<FormField label="البريد الإلكتروني" required error={errors.muEmail}>
										<TextInput
											name="muEmail"
											type="email"
											value={formData.muEmail}
											onChange={(value) => setField('muEmail', value)}
											placeholder="name@example.com"
										/>
									</FormField>
									<FormField label="كود الدولة" required error={errors.muIsdCode}>
										<TextInput
											name="muIsdCode"
											value={formData.muIsdCode}
											onChange={(value) => setField('muIsdCode', value)}
											placeholder="+968"
										/>
									</FormField>
									<FormField label="رقم الهاتف" required error={errors.muMobile}>
										<TextInput
											name="muMobile"
											type="tel"
											value={formData.muMobile}
											onChange={(value) => setField('muMobile', value)}
											placeholder="9XXXXXXX"
										/>
									</FormField>
									<FormField label="الجنسية" required error={errors.muNationality}>
										<TextInput
											name="muNationality"
											value={formData.muNationality}
											onChange={(value) => setField('muNationality', value)}
											placeholder="Oman"
										/>
									</FormField>
									<FormField label="المدرسة أو الجهة الحالية">
										<TextInput
											name="muSchool"
											value={formData.muSchool}
											onChange={(value) => setField('muSchool', value)}
											placeholder="اختياري"
										/>
									</FormField>
								</div>
							) : null}

							{currentStep === 2 ? (
								<div className="grid gap-5 md:grid-cols-2">
									<FormField label="مرحلة الدراسة" required error={errors.muStudyLevel}>
										<SelectInput
											name="muStudyLevel"
											value={formData.muStudyLevel}
											onChange={(value) => setField('muStudyLevel', value)}
											placeholder="اختر المرحلة"
											options={studyLevelOptions}
										/>
									</FormField>
									<FormField label="البرنامج المطلوب" required error={errors.muProgramme}>
										<SelectInput
											name="muProgramme"
											value={formData.muProgramme}
											onChange={(value) => {
												setField('muProgramme', value)
												setField('muStudyLevel', inferMuStudyLevel(value))
											}}
											placeholder="اختر البرنامج"
											options={MU_PROGRAMME_OPTIONS}
										/>
									</FormField>
									<FormField label="كيف سمعت عن الجامعة؟" required error={errors.muHowHeard}>
										<SelectInput
											name="muHowHeard"
											value={formData.muHowHeard}
											onChange={(value) => setField('muHowHeard', value)}
											placeholder="اختر المصدر"
											options={MU_HEARD_FROM_OPTIONS}
										/>
									</FormField>
									<FormField label="وسيلة التواصل المفضلة">
										<SelectInput
											name="muPreferredContact"
											value={formData.muPreferredContact}
											onChange={(value) => setField('muPreferredContact', value)}
											options={contactOptions}
										/>
									</FormField>
									<div className="md:col-span-2">
										<FormField label="ملاحظات للقبول">
											<TextArea
												name="muNotes"
												value={formData.muNotes}
												onChange={(value) => setField('muNotes', value)}
												placeholder="مثال: أريد أعرف متطلبات القبول والمنحة المتاحة."
												rows={4}
											/>
										</FormField>
									</div>
								</div>
							) : null}

							{currentStep === 3 ? (
								<div className="space-y-6">
									<div className="grid gap-4 md:grid-cols-2">
										{[
											['الاسم', formData.muApplicantFullName],
											['البريد', formData.muEmail],
											['الهاتف', `${formData.muIsdCode} ${formData.muMobile}`],
											['الجنسية', formData.muNationality],
											['البرنامج', programmeLabel(formData.muProgramme)],
											['مصدر المعرفة', formData.muHowHeard],
											['وسيلة التواصل', formData.muPreferredContact],
											['ملاحظات', formData.muNotes || 'لا توجد'],
										].map(([label, value]) => (
											<div key={label} className="rounded-lg bg-[#F3F7F4] px-4 py-3">
												<p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-[#007A78]">
													{label}
												</p>
												<p className="m-0 text-sm font-bold text-[#0B2D42]">{value}</p>
											</div>
										))}
									</div>

									<label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#dbe7df] bg-[#fffdf8] p-4">
										<input
											name="muTermsAccepted"
											type="checkbox"
											checked={formData.muTermsAccepted}
											onChange={(event) => setField('muTermsAccepted', event.target.checked)}
											className="mt-1 h-4 w-4 accent-[#007A78]"
										/>
										<span className="text-sm leading-7 text-slate-700">
											أؤكد أن البيانات صحيحة وأوافق على أن يتواصل فريق جامعة مسقط معي بخصوص هذا
											الاستفسار.
										</span>
									</label>
									{errors.muTermsAccepted ? (
										<p className="text-xs text-red-600">{errors.muTermsAccepted}</p>
									) : null}
								</div>
							) : null}

							<div className="mt-8 flex items-center justify-between border-t border-[#dbe7df] pt-6">
								<button
									type="button"
									onClick={handleBack}
									disabled={currentStep === 1}
									className="rounded-md border border-[#dbe7df] px-5 py-3 text-sm font-black text-[#0B2D42] disabled:cursor-not-allowed disabled:opacity-40"
								>
									رجوع
								</button>
								{currentStep < 3 ? (
									<button
										type="button"
										onClick={handleNext}
										className="inline-flex items-center gap-2 rounded-md bg-[#007A78] px-6 py-3 text-sm font-black text-white hover:bg-[#006865]"
									>
										التالي
										<ArrowLeft className="h-4 w-4" />
									</button>
								) : (
									<button
										type="button"
										onClick={handleSubmit}
										className="inline-flex items-center gap-2 rounded-md bg-[#C99A3E] px-6 py-3 text-sm font-black text-[#0B2D42] hover:bg-[#d7aa53]"
									>
										إرسال الاستفسار
										<CheckCircle className="h-4 w-4" />
									</button>
								)}
							</div>
						</div>

						<aside className="grid gap-5">
							<div className="rounded-lg border border-[#dbe7df] bg-white p-6 shadow-sm">
								<FileText className="mb-4 h-8 w-8 text-[#C99A3E]" />
								<h2 className="mb-3 text-2xl font-black text-[#0B2D42]">ملخص ذكي</h2>
								<p className="mb-4 text-sm leading-7 text-slate-600">
									المرشد يقدر يملأ الحقول، ينتقل بين الخطوات، ويراجع البيانات قبل الإرسال.
								</p>
								{selectedProgramme ? (
									<div className="rounded-lg bg-[#F3F7F4] p-4">
										<p className="mb-1 text-xs font-black text-[#007A78]">البرنامج المحدد</p>
										<p className="m-0 font-black text-[#0B2D42]">{selectedProgramme.title}</p>
									</div>
								) : null}
							</div>
							<div className="rounded-lg bg-[#0B2D42] p-6 text-white">
								<ShieldCheck className="mb-4 h-8 w-8 text-[#F4D48A]" />
								<h2 className="mb-3 text-2xl font-black">حدود آمنة للعرض</h2>
								<p className="text-sm leading-7 text-white/76">
									المرشد لا يضمن قبول أو منحة. يجهز الاستفسار ويرسله فقط بعد تأكيد الطالب.
								</p>
							</div>
							<div className="rounded-lg border border-[#dbe7df] bg-white p-6">
								<p className="mb-3 text-sm font-black text-[#007A78]">برامج شائعة في العرض</p>
								<div className="grid gap-2">
									{MU_PROGRAMMES.slice(1, 5).map((programme) => (
										<button
											key={programme.id}
											type="button"
											onClick={() => {
												setField('muProgramme', programme.id)
												setField('muStudyLevel', programme.level)
												setCurrentStep(2)
											}}
											className="rounded-md bg-[#F3F7F4] px-3 py-2 text-right text-sm font-bold text-[#0B2D42] hover:bg-[#E7F2EF]"
										>
											{programme.arTitle}
										</button>
									))}
								</div>
							</div>
						</aside>
					</div>
				</section>
			</main>
		</MuscatUniversityShell>
	)
}
