import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, User, Building2, Briefcase } from 'lucide-react'
import { MoinHeader } from '../components/moin/MoinHeader'
import { CardHeader } from '../components/moin/CardHeader'
import { FormField, TextInput, SelectInput } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function MoinSubmitRequest() {
	const navigate = useNavigate()

	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)

	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		const handler = (e: Event) => {
			const { tool, args } = (e as CustomEvent).detail

			if (tool === 'fillFormField') {
				setField(args.fieldName, args.value)
				setTimeout(() => {
					const input = document.querySelector(
						`[name="${args.fieldName}"]`
					) as HTMLElement
					if (input) {
						input.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
						})
						highlight(`[name="${args.fieldName}"]`, 2)
					}
				}, 100)
			} else if (tool === 'goToFormStep') {
				setCurrentStep(args.step)
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else if (tool === 'submitForm') {
				if (currentStep === 3) {
					handleSubmit()
				}
			}
		}

		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [currentStep])

	const steps = [
		{
			number: 1,
			label: 'بيانات المستثمر',
			completed: currentStep > 1,
			active: currentStep === 1,
		},
		{
			number: 2,
			label: 'بيانات الشركة',
			completed: currentStep > 2,
			active: currentStep === 2,
		},
		{
			number: 3,
			label: 'المراجعة والإرسال',
			completed: submitted,
			active: currentStep === 3,
		},
	]

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.moinInvestorName)
				newErrors.moinInvestorName = 'اسم المستثمر مطلوب'
			if (!formData.moinNationalId)
				newErrors.moinNationalId = 'رقم الهوية مطلوب'
			if (!formData.moinNationality)
				newErrors.moinNationality = 'الجنسية مطلوبة'
			if (!formData.moinPhone) newErrors.moinPhone = 'رقم الهاتف مطلوب'
			if (!formData.moinEmail)
				newErrors.moinEmail = 'البريد الإلكتروني مطلوب'
		} else if (step === 2) {
			if (!formData.moinCompanyName)
				newErrors.moinCompanyName = 'اسم الشركة مطلوب'
			if (!formData.moinCompanyRegNumber)
				newErrors.moinCompanyRegNumber = 'رقم تسجيل الشركة مطلوب'
			if (!formData.moinCapitalShare)
				newErrors.moinCapitalShare = 'قيمة الحصة مطلوبة'
			if (!formData.moinEmployeesCount)
				newErrors.moinEmployeesCount = 'عدد الموظفين مطلوب'
		} else if (step === 3) {
			if (!formData.moinTermsAccepted)
				newErrors.moinTermsAccepted =
					'يجب الموافقة على الشروط والأحكام'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (validateStep(currentStep)) {
			const nextStep = Math.min(currentStep + 1, 3)
			setCurrentStep(nextStep)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const handleBack = () => {
		const prevStep = Math.max(currentStep - 1, 1)
		setCurrentStep(prevStep)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleSubmit = () => {
		if (validateStep(currentStep)) {
			console.log('Submitting MOIN form:', formData)
			setSubmitted(true)
		}
	}

	if (submitted) {
		return (
			<div
				className="min-h-screen w-full bg-[#f8f9fa]"
				dir="rtl"
				style={{ fontFamily: 'Vazirmatn, Arial, sans-serif' }}
			>
				<MoinHeader />
				<div className="container mx-auto px-4 py-12 text-center">
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-[0_6px_12px_rgba(140,152,164,0.075)] border border-[#e7eaf3b3] p-10">
						<CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
						<h1 className="text-2xl font-bold text-[#132144] mb-4">
							تم تقديم الطلب بنجاح
						</h1>
						<p className="text-[#677788] mb-6">
							تم استلام طلبك لاصدار بطاقة المستثمر للفئة (أ).
							سيتم مراجعة الطلب وإشعارك بالنتيجة خلال أيام العمل
							الرسمية.
						</p>
						<div className="bg-[#f8f9fa] rounded-lg p-4 inline-block mb-6">
							<p className="text-sm text-[#677788]">رقم الطلب</p>
							<p className="text-lg font-bold text-[#132144]">
								MOI-2026-
								{Math.floor(Math.random() * 90000) + 10000}
							</p>
						</div>
						<div>
							<button
								onClick={() => navigate('/moin')}
								className="bg-[#132144] text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
							>
								العودة للخدمات
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div
			className="min-h-screen w-full bg-[#f8f9fa]"
			dir="rtl"
			style={{ fontFamily: 'Vazirmatn, Arial, sans-serif' }}
		>
			<MoinHeader />

			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<CardHeader
						title="طلب اصدار بطاقة المستثمر للفئة (أ)"
						subtitle="يرجى تعبئة النموذج التالي لتقديم طلب اصدار بطاقة المستثمر"
						className="rounded-t-xl mb-0"
					/>

					{/* Step Indicator */}
					<div className="bg-white px-6 py-8 border-x border-[#e7eaf3b3]">
						<div className="flex justify-between relative">
							<div className="absolute top-5 left-0 right-0 h-0.5 bg-[#e7eaf3] -z-0" />
							{steps.map((step) => (
								<div
									key={step.number}
									className="flex flex-col items-center bg-white px-4 relative z-10"
								>
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
											step.active
												? 'border-[#377dff] bg-[#377dff] text-white'
												: step.completed
													? 'border-green-500 bg-green-500 text-white'
													: 'border-[#bdc5d1] bg-white text-[#677788]'
										}`}
									>
										{step.completed ? (
											<CheckCircle className="w-5 h-5" />
										) : (
											step.number
										)}
									</div>
									<span
										className={`text-xs font-medium ${step.active ? 'text-[#377dff]' : 'text-[#677788]'}`}
									>
										{step.label}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Form Content */}
					<div className="bg-white rounded-b-xl shadow-[0_6px_12px_rgba(140,152,164,0.075)] border border-[#e7eaf3b3] border-t-0 p-6 md:p-10 mb-12">
						{/* Step 1: Investor Info */}
						{currentStep === 1 && (
							<div className="space-y-6">
								<h2 className="text-lg font-bold text-[#132144] flex items-center gap-2 mb-6">
									<User className="w-5 h-5 text-[#377dff]" />
									بيانات المستثمر
								</h2>

								<FormField
									label="اسم المستثمر الكامل"
									required
									error={errors.moinInvestorName}
								>
									<TextInput
										name="moinInvestorName"
										value={formData.moinInvestorName}
										onChange={(val) =>
											setField('moinInvestorName', val)
										}
										placeholder="أدخل الاسم الرباعي كما في جواز السفر"
									/>
								</FormField>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										label="رقم الهوية / جواز السفر"
										required
										error={errors.moinNationalId}
									>
										<TextInput
											name="moinNationalId"
											value={formData.moinNationalId}
											onChange={(val) =>
												setField('moinNationalId', val)
											}
											placeholder="أدخل رقم الهوية أو جواز السفر"
										/>
									</FormField>

									<FormField
										label="الجنسية"
										required
										error={errors.moinNationality}
									>
										<SelectInput
											name="moinNationality"
											value={formData.moinNationality}
											onChange={(val) =>
												setField('moinNationality', val)
											}
											placeholder="اختر الجنسية"
											options={[
												{
													value: 'jordanian',
													label: 'أردني',
												},
												{
													value: 'saudi',
													label: 'سعودي',
												},
												{
													value: 'emirati',
													label: 'إماراتي',
												},
												{
													value: 'kuwaiti',
													label: 'كويتي',
												},
												{
													value: 'egyptian',
													label: 'مصري',
												},
												{
													value: 'iraqi',
													label: 'عراقي',
												},
												{
													value: 'syrian',
													label: 'سوري',
												},
												{
													value: 'lebanese',
													label: 'لبناني',
												},
												{
													value: 'other',
													label: 'أخرى',
												},
											]}
										/>
									</FormField>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										label="رقم الهاتف"
										required
										error={errors.moinPhone}
									>
										<TextInput
											name="moinPhone"
											value={formData.moinPhone}
											onChange={(val) =>
												setField('moinPhone', val)
											}
											placeholder="07xxxxxxxx"
										/>
									</FormField>

									<FormField
										label="البريد الإلكتروني"
										required
										error={errors.moinEmail}
									>
										<TextInput
											name="moinEmail"
											value={formData.moinEmail}
											onChange={(val) =>
												setField('moinEmail', val)
											}
											placeholder="example@email.com"
										/>
									</FormField>
								</div>
							</div>
						)}

						{/* Step 2: Company Info */}
						{currentStep === 2 && (
							<div className="space-y-6">
								<h2 className="text-lg font-bold text-[#132144] flex items-center gap-2 mb-6">
									<Building2 className="w-5 h-5 text-[#377dff]" />
									بيانات الشركة
								</h2>

								<FormField
									label="اسم الشركة"
									required
									error={errors.moinCompanyName}
								>
									<TextInput
										name="moinCompanyName"
										value={formData.moinCompanyName}
										onChange={(val) =>
											setField('moinCompanyName', val)
										}
										placeholder="أدخل اسم الشركة المسجل"
									/>
								</FormField>

								<FormField
									label="رقم تسجيل الشركة"
									required
									error={errors.moinCompanyRegNumber}
								>
									<TextInput
										name="moinCompanyRegNumber"
										value={formData.moinCompanyRegNumber}
										onChange={(val) =>
											setField(
												'moinCompanyRegNumber',
												val
											)
										}
										placeholder="أدخل رقم السجل التجاري"
									/>
								</FormField>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										label="قيمة الحصة في رأس المال (دينار أردني)"
										required
										error={errors.moinCapitalShare}
									>
										<TextInput
											name="moinCapitalShare"
											value={formData.moinCapitalShare}
											onChange={(val) =>
												setField(
													'moinCapitalShare',
													val
												)
											}
											placeholder="مثال: 150000"
											type="number"
										/>
									</FormField>

									<FormField
										label="عدد الموظفين الأردنيين"
										required
										error={errors.moinEmployeesCount}
									>
										<TextInput
											name="moinEmployeesCount"
											value={formData.moinEmployeesCount}
											onChange={(val) =>
												setField(
													'moinEmployeesCount',
													val
												)
											}
											placeholder="مثال: 25"
											type="number"
										/>
									</FormField>
								</div>

								<FormField label="نوع النشاط">
									<SelectInput
										name="moinActivityType"
										value={formData.moinActivityType}
										onChange={(val) =>
											setField('moinActivityType', val)
										}
										placeholder="اختر نوع النشاط"
										options={[
											{
												value: 'general',
												label: 'نشاط عام',
											},
											{
												value: 'it',
												label: 'تكنولوجيا المعلومات (تطوير البرمجيات)',
											},
											{
												value: 'manufacturing',
												label: 'صناعة',
											},
											{
												value: 'trade',
												label: 'تجارة',
											},
											{
												value: 'services',
												label: 'خدمات',
											},
											{
												value: 'tourism',
												label: 'سياحة',
											},
										]}
									/>
								</FormField>
							</div>
						)}

						{/* Step 3: Review */}
						{currentStep === 3 && (
							<div className="space-y-6">
								<h2 className="text-lg font-bold text-[#132144] flex items-center gap-2 mb-6">
									<Briefcase className="w-5 h-5 text-[#377dff]" />
									مراجعة الطلب
								</h2>

								<div className="bg-[#f8f9fa] rounded-lg p-6 space-y-4">
									<h4 className="font-semibold text-[#132144] border-b border-[#e7eaf3] pb-2 mb-4">
										بيانات المستثمر
									</h4>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-[#677788] text-sm">
												اسم المستثمر
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinInvestorName}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												رقم الهوية
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinNationalId}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												الجنسية
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinNationality}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												رقم الهاتف
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinPhone}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												البريد الإلكتروني
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinEmail}
											</p>
										</div>
									</div>
								</div>

								<div className="bg-[#f8f9fa] rounded-lg p-6 space-y-4">
									<h4 className="font-semibold text-[#132144] border-b border-[#e7eaf3] pb-2 mb-4">
										بيانات الشركة
									</h4>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-[#677788] text-sm">
												اسم الشركة
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinCompanyName}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												رقم التسجيل
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinCompanyRegNumber}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												قيمة الحصة
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinCapitalShare}{' '}
												دينار
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												عدد الموظفين الأردنيين
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinEmployeesCount}
											</p>
										</div>
										<div>
											<p className="text-[#677788] text-sm">
												نوع النشاط
											</p>
											<p className="font-medium text-[#132144]">
												{formData.moinActivityType}
											</p>
										</div>
									</div>
								</div>

								<div className="bg-white border border-[#e7eaf3] rounded-lg p-6">
									<label className="flex items-start gap-3 cursor-pointer">
										<input
											type="checkbox"
											checked={formData.moinTermsAccepted}
											onChange={(e) =>
												setField(
													'moinTermsAccepted',
													e.target.checked
												)
											}
											name="moinTermsAccepted"
											className="mt-1 w-4 h-4 text-[#377dff] rounded border-[#e7eaf3] focus:ring-[#377dff]"
										/>
										<span className="text-sm text-[#677788]">
											اتعهد بصحة البيانات المدخلة
											واوافق على استرجاع بياناتي الشخصية
											والاطلاع عليها ومعالجتها من قبل
											الجهات والأطراف المعنية ذات العلاقة،
											وذلك لغايات التقديم والحصول على
											الخدمة
										</span>
									</label>
									{errors.moinTermsAccepted && (
										<p className="text-red-500 text-sm mt-2">
											{errors.moinTermsAccepted}
										</p>
									)}
								</div>
							</div>
						)}

						{/* Navigation Buttons */}
						<div className="flex justify-between mt-10 pt-6 border-t border-[#e7eaf3]">
							{currentStep > 1 && (
								<button
									onClick={handleBack}
									className="px-6 py-3 border border-[#132144] text-[#132144] rounded-md font-medium hover:bg-gray-50 transition-colors"
								>
									السابق
								</button>
							)}
							<div
								className={currentStep === 1 ? 'mr-auto' : ''}
							>
								{currentStep < 3 ? (
									<button
										onClick={handleNext}
										className="px-8 py-3 bg-[#377dff] text-white rounded-md font-medium hover:bg-[#2e6ae5] transition-colors"
									>
										التالي
									</button>
								) : (
									<button
										onClick={handleSubmit}
										className="px-8 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
									>
										إرسال الطلب
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
