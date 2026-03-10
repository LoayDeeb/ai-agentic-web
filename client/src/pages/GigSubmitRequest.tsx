import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ClipboardList, ShieldCheck, UserRound } from 'lucide-react'
import { FormField, SelectInput, TextArea, TextInput } from '../components/FormField'
import {
	GigHeaderTopBar,
	GigLogoBackground,
	GigNavMenuButton
} from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'
import { onToolEvent } from '../features/agent/tools'
import { highlight } from '../features/agent/spotlight'
import { useFormStore } from '../store/formStore'

const genderOptions = [
	{ value: 'male', label: 'ذكر' },
	{ value: 'female', label: 'أنثى' }
]

const coverageOptions = [
	{ value: 'private', label: 'خاصة' },
	{ value: 'first', label: 'أولى' },
	{ value: 'second', label: 'ثانية' },
	{ value: 'third', label: 'ثالثة' }
]

const familyOptions = [
	{ value: '1', label: 'فرد واحد' },
	{ value: '2', label: 'فردان' },
	{ value: '3', label: 'ثلاثة أفراد' },
	{ value: '4', label: 'أربعة أفراد' },
	{ value: '5+', label: 'خمسة أفراد أو أكثر' }
]

const copayOptions = [
	{ value: 'default', label: 'النسبة القياسية حسب الوثيقة' },
	{ value: '10', label: 'نسبة تحمل عشرة بالمئة' },
	{ value: '0', label: 'بدون نسبة تحمل' }
]

const maternityOptions = [
	{ value: 'yes', label: 'نعم' },
	{ value: 'no', label: 'لا' }
]

const cityOptions = [
	{ value: 'amman', label: 'عمان' },
	{ value: 'irbid', label: 'إربد' },
	{ value: 'zarqa', label: 'الزرقاء' },
	{ value: 'aqaba', label: 'العقبة' },
	{ value: 'salt', label: 'السلط' },
	{ value: 'madaba', label: 'مادبا' }
]

export default function GigSubmitRequest() {
	const navigate = useNavigate()
	const formData = useFormStore((state) => state.formData)
	const setField = useFormStore((state) => state.setField)
	const currentStep = useFormStore((state) => state.currentStep)
	const setCurrentStep = useFormStore((state) => state.setCurrentStep)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		document.documentElement.dir = 'rtl'
		document.title = 'GIG Jordan | Submit Request'
		setCurrentStep(1)
	}, [])

	useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'fillFormField') {
				const value =
					args.value === 'true' ? true : args.value === 'false' ? false : args.value
				setField(args.fieldName, value)
				setTimeout(() => {
					const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
					if (input) {
						input.scrollIntoView({ behavior: 'smooth', block: 'center' })
						highlight(`[name="${args.fieldName}"]`, 2)
					}
				}, 120)
			}
			if (tool === 'goToFormStep') {
				setCurrentStep(args.step)
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}
			if (tool === 'submitForm' && currentStep === 3) {
				handleSubmit()
			}
		})

		return unsubscribe
	}, [currentStep, setCurrentStep, setField])

	const steps = useMemo(
		() => [
			{ number: 1, label: 'بيانات مقدم الطلب', icon: UserRound },
			{ number: 2, label: 'تفاصيل التغطية', icon: ShieldCheck },
			{ number: 3, label: 'المراجعة والإرسال', icon: ClipboardList }
		],
		[]
	)

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.gigApplicantFullName) nextErrors.gigApplicantFullName = 'الاسم الكامل مطلوب'
			if (!formData.gigNationalId) nextErrors.gigNationalId = 'الرقم الوطني مطلوب'
			if (!formData.gigDateOfBirth) nextErrors.gigDateOfBirth = 'تاريخ الميلاد مطلوب'
			if (!formData.gigGender) nextErrors.gigGender = 'الجنس مطلوب'
			if (!formData.gigPhone) nextErrors.gigPhone = 'رقم الهاتف مطلوب'
		}

		if (step === 2) {
			if (!formData.gigCoverageClass) nextErrors.gigCoverageClass = 'فئة التغطية مطلوبة'
			if (!formData.gigFamilyMembers) nextErrors.gigFamilyMembers = 'عدد أفراد العائلة مطلوب'
			if (!formData.gigCopayOption) nextErrors.gigCopayOption = 'خيار نسبة التحمل مطلوب'
			if (!formData.gigNeedsMaternity) nextErrors.gigNeedsMaternity = 'يرجى تحديد احتياج تغطية الولادة'
		}

		if (step === 3 && !formData.gigTermsAccepted) {
			nextErrors.gigTermsAccepted = 'يجب الموافقة على الشروط والأحكام'
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

	if (submitted) {
		return (
			<div
				className="min-h-screen bg-[#f8f9fd]"
				dir="rtl"
				style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
			>
				<GigHeaderTopBar />
				<div className="mx-auto max-w-3xl px-4 py-16">
					<div className="rounded-[32px] border border-[#dde3f0] bg-white p-10 text-center shadow-sm">
						<CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-[#A52A2A]" />
						<h1 className="mb-4 text-3xl font-black text-[#1D2146]">تم استلام طلبك بنجاح</h1>
						<p className="mb-6 text-base leading-8 text-[#5a657d]">
							تم تسجيل طلب اهتمام ببرنامج كراون عائلتي، وسيتم التواصل معك من فريق خدمة
							العملاء لمراجعة البيانات وتقديم عرض مناسب.
						</p>
						<div className="mb-8 rounded-2xl bg-[#f7f9fc] p-4 text-[#1D2146]">
							رقم الطلب: GIG-{Date.now().toString().slice(-8)}
						</div>
						<div className="flex flex-wrap justify-center gap-3">
							<button
								type="button"
								onClick={() => navigate('/gig/crown-family')}
								className="rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white"
							>
								العودة للتفاصيل
							</button>
							<button
								type="button"
								onClick={() => navigate('/gig')}
								className="rounded-2xl border border-[#1D2146]/15 px-6 py-3 font-bold text-[#1D2146]"
							>
								العودة للرئيسية
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div
			className="min-h-screen bg-[#f8f9fd]"
			dir="rtl"
			style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
		>
			<GigHeaderTopBar />

			<header className="border-b border-[#dde3f0] bg-white">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center gap-5">
						<GigLogoBackground width={140} padding="52px 60px" />
						<div>
							<p className="text-sm font-semibold text-[#A52A2A]">GIG Jordan</p>
							<h1 className="text-3xl font-black text-[#1D2146]">طلب اهتمام ببرنامج كراون عائلتي</h1>
						</div>
					</div>
					<nav className="flex flex-wrap justify-end gap-3">
						{gigMenuItems.map((item) => (
							<GigNavMenuButton
								key={item.label}
								label={item.label}
								iconSrc={item.iconSrc}
								href={item.href}
								onClick={item.path ? () => navigate(item.path) : undefined}
								className="min-w-[165px]"
							/>
						))}
					</nav>
				</div>
			</header>

			<div className="mx-auto max-w-5xl px-4 py-10">
				<div className="mb-10 grid gap-4 md:grid-cols-3">
					{steps.map((step) => {
						const Icon = step.icon
						const active = currentStep === step.number
						const completed = currentStep > step.number
						return (
							<div
								key={step.number}
								className={`rounded-[28px] border p-5 transition-colors ${
									active
										? 'border-[#A52A2A] bg-[#A52A2A] text-white'
										: completed
											? 'border-[#1D2146] bg-[#1D2146] text-white'
											: 'border-[#dde3f0] bg-white text-[#7a859f]'
								}`}
							>
								<div className="mb-3 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
										<Icon className="h-5 w-5" />
									</div>
									<div className="text-sm font-bold">الخطوة {step.number}</div>
								</div>
								<div className="text-lg font-bold">{step.label}</div>
							</div>
						)
					})}
				</div>

				<div className="rounded-[32px] border border-[#dde3f0] bg-white p-8 shadow-sm">
					{currentStep === 1 ? (
						<div className="space-y-4">
							<h2 className="mb-6 text-2xl font-bold text-[#1D2146]">بيانات مقدم الطلب</h2>
							<FormField label="الاسم الكامل" required error={errors.gigApplicantFullName}>
								<TextInput
									name="gigApplicantFullName"
									value={formData.gigApplicantFullName}
									onChange={(value) => setField('gigApplicantFullName', value)}
									placeholder="الاسم كما هو في الهوية"
								/>
							</FormField>
							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="الرقم الوطني" required error={errors.gigNationalId}>
									<TextInput
										name="gigNationalId"
										value={formData.gigNationalId}
										onChange={(value) => setField('gigNationalId', value)}
										placeholder="أدخل الرقم الوطني"
									/>
								</FormField>
								<FormField label="تاريخ الميلاد" required error={errors.gigDateOfBirth}>
									<TextInput
										name="gigDateOfBirth"
										value={formData.gigDateOfBirth}
										onChange={(value) => setField('gigDateOfBirth', value)}
										placeholder="DD/MM/YYYY"
									/>
								</FormField>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="الجنس" required error={errors.gigGender}>
									<SelectInput
										name="gigGender"
										value={formData.gigGender}
										onChange={(value) => setField('gigGender', value)}
										placeholder="اختر الجنس"
										options={genderOptions}
									/>
								</FormField>
								<FormField label="رقم الهاتف" required error={errors.gigPhone}>
									<TextInput
										name="gigPhone"
										type="tel"
										value={formData.gigPhone}
										onChange={(value) => setField('gigPhone', value)}
										placeholder="07XXXXXXXX"
									/>
								</FormField>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="البريد الإلكتروني" error={errors.gigEmail}>
									<TextInput
										name="gigEmail"
										type="email"
										value={formData.gigEmail}
										onChange={(value) => setField('gigEmail', value)}
										placeholder="email@example.com"
									/>
								</FormField>
								<FormField label="المدينة" error={errors.gigCity}>
									<SelectInput
										name="gigCity"
										value={formData.gigCity}
										onChange={(value) => setField('gigCity', value)}
										placeholder="اختر المدينة"
										options={cityOptions}
									/>
								</FormField>
							</div>
						</div>
					) : null}

					{currentStep === 2 ? (
						<div className="space-y-4">
							<h2 className="mb-6 text-2xl font-bold text-[#1D2146]">تفاصيل التغطية المطلوبة</h2>
							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="فئة التغطية" required error={errors.gigCoverageClass}>
									<SelectInput
										name="gigCoverageClass"
										value={formData.gigCoverageClass}
										onChange={(value) => setField('gigCoverageClass', value)}
										placeholder="اختر فئة التغطية"
										options={coverageOptions}
									/>
								</FormField>
								<FormField label="عدد أفراد العائلة" required error={errors.gigFamilyMembers}>
									<SelectInput
										name="gigFamilyMembers"
										value={formData.gigFamilyMembers}
										onChange={(value) => setField('gigFamilyMembers', value)}
										placeholder="اختر العدد"
										options={familyOptions}
									/>
								</FormField>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="خيار نسبة التحمل" required error={errors.gigCopayOption}>
									<SelectInput
										name="gigCopayOption"
										value={formData.gigCopayOption}
										onChange={(value) => setField('gigCopayOption', value)}
										placeholder="اختر خيار نسبة التحمل"
										options={copayOptions}
									/>
								</FormField>
								<FormField label="هل تحتاج تغطية ولادة؟" required error={errors.gigNeedsMaternity}>
									<SelectInput
										name="gigNeedsMaternity"
										value={formData.gigNeedsMaternity}
										onChange={(value) => setField('gigNeedsMaternity', value)}
										placeholder="اختر الإجابة"
										options={maternityOptions}
									/>
								</FormField>
							</div>
							<FormField
								label="حالات صحية سابقة أو ملاحظات"
								helpText="اختياري، يفيد فريق المبيعات في اقتراح الأنسب."
								error={errors.gigPreExistingConditions}
							>
								<TextArea
									name="gigPreExistingConditions"
									value={formData.gigPreExistingConditions}
									onChange={(value) => setField('gigPreExistingConditions', value)}
									placeholder="اذكر أي أمراض مزمنة أو ملاحظات إضافية"
									rows={4}
								/>
							</FormField>
						</div>
					) : null}

					{currentStep === 3 ? (
						<div className="space-y-6">
							<h2 className="mb-2 text-2xl font-bold text-[#1D2146]">المراجعة والإرسال</h2>
							<p className="text-sm leading-7 text-[#5a657d]">
								راجع البيانات التالية قبل إرسال طلب الاهتمام ليتم التواصل معك من فريق GIG.
							</p>

							<div className="rounded-[24px] bg-[#f7f9fc] p-6">
								<h3 className="mb-4 text-lg font-bold text-[#1D2146]">بيانات مقدم الطلب</h3>
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<p className="text-sm text-[#7a859f]">الاسم الكامل</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigApplicantFullName}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">الرقم الوطني</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigNationalId}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">تاريخ الميلاد</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigDateOfBirth}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">الهاتف</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigPhone}</p>
									</div>
								</div>
							</div>

							<div className="rounded-[24px] border border-[#A52A2A]/10 bg-[#A52A2A]/5 p-6">
								<h3 className="mb-4 text-lg font-bold text-[#1D2146]">تفاصيل التغطية</h3>
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<p className="text-sm text-[#7a859f]">فئة التغطية</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigCoverageClass}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">عدد أفراد العائلة</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigFamilyMembers}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">نسبة التحمل</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigCopayOption}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">تغطية الولادة</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigNeedsMaternity}</p>
									</div>
								</div>
							</div>

							<div className="rounded-[24px] border border-[#dde3f0] p-5">
								<label className="flex items-start gap-3">
									<input
										type="checkbox"
										name="gigTermsAccepted"
										checked={formData.gigTermsAccepted}
										onChange={(event) => setField('gigTermsAccepted', event.target.checked)}
										className="mt-1 h-5 w-5 rounded border-gray-300 text-[#A52A2A] focus:ring-[#A52A2A]"
									/>
									<span className="text-sm leading-7 text-[#1D2146]">
										أقر بصحة البيانات المدخلة وأوافق على استخدامها للتواصل معي بخصوص برنامج
										كراون عائلتي.
									</span>
								</label>
								{errors.gigTermsAccepted ? (
									<p className="mt-2 text-sm text-red-600">{errors.gigTermsAccepted}</p>
								) : null}
							</div>
						</div>
					) : null}

					<div className="mt-10 flex items-center justify-between border-t border-[#eef2f9] pt-6">
						{currentStep > 1 ? (
							<button
								type="button"
								onClick={handleBack}
								className="rounded-2xl border border-[#dde3f0] px-6 py-3 font-bold text-[#1D2146]"
							>
								السابق
							</button>
						) : (
							<div />
						)}

						{currentStep < 3 ? (
							<button
								type="button"
								onClick={handleNext}
								className="rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white"
							>
								التالي
							</button>
						) : (
							<button
								type="button"
								onClick={handleSubmit}
								className="rounded-2xl bg-[#1D2146] px-6 py-3 font-bold text-white"
							>
								إرسال الطلب
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
