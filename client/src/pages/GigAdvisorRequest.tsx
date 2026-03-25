import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, ClipboardList, ShieldCheck } from 'lucide-react'
import { FormField, SelectInput, TextArea, TextInput } from '../components/FormField'
import { GigHeaderTopBar, GigLogoBackground, GigNavMenuButton } from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'
import { onToolEvent } from '../features/agent/tools'
import { highlight } from '../features/agent/spotlight'
import { useFormStore } from '../store/formStore'

const customerTypeOptions = [
	{ value: 'individual_family', label: 'فرد / عائلة' },
	{ value: 'business', label: 'شركة / أعمال' }
]

const contactMethodOptions = [
	{ value: 'phone', label: 'اتصال هاتفي' },
	{ value: 'whatsapp', label: 'واتساب' },
	{ value: 'email', label: 'البريد الإلكتروني' }
]

const cityOptions = [
	{ value: 'amman', label: 'عمان' },
	{ value: 'irbid', label: 'إربد' },
	{ value: 'zarqa', label: 'الزرقاء' },
	{ value: 'aqaba', label: 'العقبة' },
	{ value: 'salt', label: 'السلط' },
	{ value: 'madaba', label: 'مادبا' }
]

const insuranceLabels: Record<string, string> = {
	crown_family_overview: 'كراون عائلتي',
	crown_family_apply: 'كراون عائلتي',
	medical_category: 'التأمين الطبي',
	medical_online_individual_family: 'تأمين طبي فردي وعائلي (إلكتروني)',
	life_individual: 'تأمين الحياة الفردي',
	life_group: 'تأمين الحياة الجماعي',
	motor_comprehensive: 'تأمين المركبات شامل/تكميلي',
	motor_online_new: 'تأمين مركبة جديدة (إلكتروني)',
	motor_online_renew: 'تجديد تأمين المركبات (إلكتروني)',
	travel_standard: 'تأمين السفر',
	travel_hajj_umrah: 'تأمين الحج والعمرة',
	travel_online_issue: 'إصدار تأمين سفر (إلكتروني)',
	property_insurance: 'تأمين الممتلكات',
	home_online: 'تأمين المنازل (إلكتروني)',
	marine_cargo: 'التأمين البحري نقل البضائع',
	marine_forwarders_liability: 'مسؤولية وكلاء الشحن',
	engineering_insurance: 'التأمينات الهندسية',
	other_general_insurance: 'تأمينات عامة أخرى',
	workers_online: 'تأمين العاملين في المنازل (إلكتروني)'
}

export default function GigAdvisorRequest() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const formData = useFormStore((state) => state.formData)
	const setField = useFormStore((state) => state.setField)
	const currentStep = useFormStore((state) => state.currentStep)
	const setCurrentStep = useFormStore((state) => state.setCurrentStep)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const suggestedTarget = searchParams.get('target') || ''
	const suggestedLabel =
		searchParams.get('label') || insuranceLabels[suggestedTarget] || formData.gigAdvisorInsuranceLabel
	const suggestedReason = searchParams.get('reason') || ''

	useEffect(() => {
		document.documentElement.dir = 'rtl'
		document.title = 'GIG Jordan | Advisor Request'
		setCurrentStep(1)

		if (suggestedTarget) {
			setField('gigAdvisorInsuranceTarget', suggestedTarget)
		}
		if (suggestedLabel) {
			setField('gigAdvisorInsuranceLabel', suggestedLabel)
		}
	}, [setCurrentStep, setField, suggestedLabel, suggestedTarget])

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
				const step = Number(args.step) || 1
				setCurrentStep(Math.min(2, Math.max(1, step)))
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}
			if (tool === 'submitForm' && currentStep === 2) {
				handleSubmit()
			}
		})

		return unsubscribe
	}, [currentStep, setCurrentStep, setField])

	const steps = useMemo(
		() => [
			{ number: 1, label: 'بيانات التواصل', icon: ShieldCheck },
			{ number: 2, label: 'المراجعة والإرسال', icon: ClipboardList }
		],
		[]
	)

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.gigApplicantFullName) nextErrors.gigApplicantFullName = 'الاسم الكامل مطلوب'
			if (!formData.gigPhone) nextErrors.gigPhone = 'رقم الهاتف مطلوب'
			if (!formData.gigAdvisorInsuranceTarget)
				nextErrors.gigAdvisorInsuranceTarget = 'نوع التأمين مطلوب'
			if (!formData.gigAdvisorCustomerType)
				nextErrors.gigAdvisorCustomerType = 'نوع العميل مطلوب'
			if (!formData.gigAdvisorContactMethod)
				nextErrors.gigAdvisorContactMethod = 'طريقة التواصل مطلوبة'
		}

		if (step === 2 && !formData.gigAdvisorTermsAccepted) {
			nextErrors.gigAdvisorTermsAccepted = 'يجب الموافقة على الشروط والأحكام'
		}

		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleNext = () => {
		if (!validateStep(currentStep)) return
		setCurrentStep(2)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleBack = () => {
		setCurrentStep(1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleSubmit = () => {
		if (!validateStep(2)) return
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
							تم تسجيل طلب اهتمامك بمنتج
							{` `}
							<span className="font-bold text-[#1D2146]">{formData.gigAdvisorInsuranceLabel}</span>
							{` `}
							وسيتم التواصل معك من فريق GIG لاستكمال التفاصيل.
						</p>
						<div className="mb-8 rounded-2xl bg-[#f7f9fc] p-4 text-[#1D2146]">
							رقم الطلب: GIG-ADV-{Date.now().toString().slice(-8)}
						</div>
						<div className="flex flex-wrap justify-center gap-3">
							<button
								type="button"
								onClick={() => navigate('/gig')}
								className="rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white"
							>
								العودة للرئيسية
							</button>
							<button
								type="button"
								onClick={() => navigate('/gig/crown-family')}
								className="rounded-2xl border border-[#1D2146]/15 px-6 py-3 font-bold text-[#1D2146]"
							>
								عرض كراون عائلتي
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
							<p className="text-sm font-semibold text-[#A52A2A]">GIG Jordan Advisor</p>
							<h1 className="text-3xl font-black text-[#1D2146]">طلب استشارة وتأمين</h1>
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
				<div className="mb-10 grid gap-4 md:grid-cols-2">
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
							<h2 className="mb-6 text-2xl font-bold text-[#1D2146]">بيانات التواصل</h2>

							<FormField
								label="التأمين المقترح"
								required
								error={errors.gigAdvisorInsuranceTarget}
								helpText={suggestedReason || undefined}
							>
								<TextInput
									name="gigAdvisorInsuranceLabel"
									value={formData.gigAdvisorInsuranceLabel}
									onChange={(value) => setField('gigAdvisorInsuranceLabel', value)}
									placeholder="اسم التأمين المقترح"
								/>
							</FormField>

							<FormField label="رمز المنتج" required error={errors.gigAdvisorInsuranceTarget}>
								<TextInput
									name="gigAdvisorInsuranceTarget"
									value={formData.gigAdvisorInsuranceTarget}
									onChange={(value) => setField('gigAdvisorInsuranceTarget', value)}
									placeholder="مثال: travel_standard"
								/>
							</FormField>

							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="الاسم الكامل" required error={errors.gigApplicantFullName}>
									<TextInput
										name="gigApplicantFullName"
										value={formData.gigApplicantFullName}
										onChange={(value) => setField('gigApplicantFullName', value)}
										placeholder="الاسم كما هو في الهوية"
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
								<FormField label="البريد الإلكتروني">
									<TextInput
										name="gigEmail"
										type="email"
										value={formData.gigEmail}
										onChange={(value) => setField('gigEmail', value)}
										placeholder="email@example.com"
									/>
								</FormField>
								<FormField label="المدينة">
									<SelectInput
										name="gigCity"
										value={formData.gigCity}
										onChange={(value) => setField('gigCity', value)}
										placeholder="اختر المدينة"
										options={cityOptions}
									/>
								</FormField>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<FormField label="نوع العميل" required error={errors.gigAdvisorCustomerType}>
									<SelectInput
										name="gigAdvisorCustomerType"
										value={formData.gigAdvisorCustomerType}
										onChange={(value) => setField('gigAdvisorCustomerType', value)}
										placeholder="اختر نوع العميل"
										options={customerTypeOptions}
									/>
								</FormField>
								<FormField label="طريقة التواصل المفضلة" required error={errors.gigAdvisorContactMethod}>
									<SelectInput
										name="gigAdvisorContactMethod"
										value={formData.gigAdvisorContactMethod}
										onChange={(value) => setField('gigAdvisorContactMethod', value)}
										placeholder="اختر طريقة التواصل"
										options={contactMethodOptions}
									/>
								</FormField>
							</div>
						</div>
					) : null}

					{currentStep === 2 ? (
						<div className="space-y-6">
							<h2 className="mb-2 text-2xl font-bold text-[#1D2146]">المراجعة والإرسال</h2>
							<p className="text-sm leading-7 text-[#5a657d]">
								راجع البيانات التالية قبل إرسال طلب الاستشارة، وسيتم التواصل معك من فريق GIG.
							</p>

							<div className="rounded-[24px] bg-[#f7f9fc] p-6">
								<h3 className="mb-4 text-lg font-bold text-[#1D2146]">ملخص الطلب</h3>
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<p className="text-sm text-[#7a859f]">التأمين المقترح</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigAdvisorInsuranceLabel}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">نوع العميل</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigAdvisorCustomerType}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">الاسم الكامل</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigApplicantFullName}</p>
									</div>
									<div>
										<p className="text-sm text-[#7a859f]">رقم الهاتف</p>
										<p className="font-semibold text-[#1D2146]">{formData.gigPhone}</p>
									</div>
								</div>
							</div>

							<FormField label="ملاحظات إضافية" helpText="اختياري">
								<TextArea
									name="gigAdvisorNotes"
									value={formData.gigAdvisorNotes}
									onChange={(value) => setField('gigAdvisorNotes', value)}
									placeholder="أي تفاصيل إضافية عن الاحتياج التأميني"
									rows={4}
								/>
							</FormField>

							<div className="rounded-[24px] border border-[#dde3f0] p-5">
								<label className="flex items-start gap-3">
									<input
										type="checkbox"
										name="gigAdvisorTermsAccepted"
										checked={formData.gigAdvisorTermsAccepted}
										onChange={(event) => setField('gigAdvisorTermsAccepted', event.target.checked)}
										className="mt-1 h-5 w-5 rounded border-gray-300 text-[#A52A2A] focus:ring-[#A52A2A]"
									/>
									<span className="text-sm leading-7 text-[#1D2146]">
										أقر بصحة البيانات المدخلة وأوافق على استخدامها للتواصل معي بخصوص الاستشارة التأمينية.
									</span>
								</label>
								{errors.gigAdvisorTermsAccepted ? (
									<p className="mt-2 text-sm text-red-600">{errors.gigAdvisorTermsAccepted}</p>
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

						{currentStep < 2 ? (
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
