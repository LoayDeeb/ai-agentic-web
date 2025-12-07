import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, User, Briefcase } from 'lucide-react'
import { Header } from '../components/sdb/Header'
import { FormField, TextInput, SelectInput, TextArea } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function SDBSubmitRequest() {
	const navigate = useNavigate()
	
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		document.documentElement.dir = 'rtl'
	}, [])

	// Listen for agent tool events
	useEffect(() => {
		const handler = (e: Event) => {
			const { tool, args } = (e as CustomEvent).detail
			
			if (tool === 'fillFormField') {
				setField(args.fieldName, args.value)
				setTimeout(() => {
					const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement
					if (input) {
						input.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
		{ number: 1, label: 'المعلومات الشخصية', completed: currentStep > 1, active: currentStep === 1 },
		{ number: 2, label: 'التفاصيل المالية', completed: currentStep > 2, active: currentStep === 2 },
		{ number: 3, label: 'المراجعة والإرسال', completed: submitted, active: currentStep === 3 }
	]

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.applicantName) newErrors.applicantName = 'اسم المتقدم مطلوب'
			if (!formData.applicantNationalId) newErrors.applicantNationalId = 'رقم الهوية مطلوب'
			if (!formData.applicantPhone) newErrors.applicantPhone = 'رقم الجوال مطلوب'
			if (!formData.applicantEmail) newErrors.applicantEmail = 'البريد الإلكتروني مطلوب'
		} else if (step === 2) {
			if (!formData.familyMembers) newErrors.familyMembers = 'عدد أفراد الأسرة مطلوب'
			if (!formData.monthlyIncome) newErrors.monthlyIncome = 'الدخل الشهري مطلوب'
			if (!formData.financingAmount) newErrors.financingAmount = 'مبلغ التمويل مطلوب'
			if (!formData.employmentType) newErrors.employmentType = 'نوع التوظيف مطلوب'
		} else if (step === 3) {
			if (!formData.termsAccepted) newErrors.termsAccepted = 'يجب الموافقة على الشروط والأحكام'
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
			console.log('Submitting SDB form:', formData)
			setSubmitted(true)
		}
	}

	if (submitted) {
		return (
			<div className="min-h-screen bg-[#f9fafb]" dir="rtl" style={{ fontFamily: 'saudiriyal, IBMPlexSansArabic, serif' }}>
				<Header />
				<div className="container mx-auto px-4 py-12 text-center">
					<div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-sm">
						<CheckCircle className="w-20 h-20 text-[#1B8354] mx-auto mb-6" />
						<h1 className="text-3xl font-bold text-[#161616] mb-4">
							تم تقديم الطلب بنجاح
						</h1>
						<p className="text-gray-600 mb-6">
							تم استلام طلبك للحصول على تمويل الأسرة. سيتم مراجعة الطلب والتواصل معك قريباً.
						</p>
						<button
							onClick={() => navigate('/sdb')}
							className="bg-[#1b8354] text-white px-8 py-3 rounded font-medium hover:opacity-90 transition-opacity"
						>
							العودة للخدمات
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-[#f9fafb]" dir="rtl" style={{ fontFamily: 'saudiriyal, IBMPlexSansArabic, serif' }}>
			<Header />
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold text-[#161616] mb-8">
					طلب تمويل الأسرة
				</h1>

				{/* Step Indicator */}
				<div className="flex justify-between mb-12 relative">
					<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
					{steps.map((step) => (
						<div key={step.number} className="flex flex-col items-center bg-[#f9fafb] px-4">
							<div 
								className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
									step.active 
										? 'border-[#1b8354] bg-[#1b8354] text-white' 
										: step.completed 
											? 'border-[#1B8354] bg-[#1B8354] text-white' 
											: 'border-gray-300 bg-white text-gray-400'
								}`}
							>
								{step.completed ? <CheckCircle className="w-6 h-6" /> : step.number}
							</div>
							<span className={`text-sm font-medium ${step.active ? 'text-[#161616]' : 'text-gray-500'}`}>
								{step.label}
							</span>
						</div>
					))}
				</div>

				<div className="bg-white rounded-2xl p-10 shadow-sm">
					{/* Step 1: Personal Information */}
					{currentStep === 1 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-[#161616] flex items-center gap-2 mb-6">
								<User className="w-6 h-6" />
								المعلومات الشخصية
							</h2>

							<FormField label="الاسم الرباعي" required error={errors.applicantName}>
								<TextInput
									name="applicantName"
									value={formData.applicantName}
									onChange={(val) => setField('applicantName', val)}
									placeholder="أدخل الاسم كما هو في الهوية"
								/>
							</FormField>

							<FormField label="رقم الهوية الوطنية" required error={errors.applicantNationalId}>
								<TextInput
									name="applicantNationalId"
									value={formData.applicantNationalId}
									onChange={(val) => setField('applicantNationalId', val)}
									placeholder="أدخل رقم الهوية المكون من 10 أرقام"
								/>
							</FormField>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField label="رقم الجوال" required error={errors.applicantPhone}>
									<TextInput
										name="applicantPhone"
										value={formData.applicantPhone}
										onChange={(val) => setField('applicantPhone', val)}
										placeholder="05xxxxxxxx"
									/>
								</FormField>

								<FormField label="البريد الإلكتروني" required error={errors.applicantEmail}>
									<TextInput
										name="applicantEmail"
										type="email"
										value={formData.applicantEmail}
										onChange={(val) => setField('applicantEmail', val)}
										placeholder="example@email.com"
									/>
								</FormField>
							</div>
						</div>
					)}

					{/* Step 2: Financial Details */}
					{currentStep === 2 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-[#161616] flex items-center gap-2 mb-6">
								<Briefcase className="w-6 h-6" />
								التفاصيل المالية
							</h2>

							<FormField label="عدد أفراد الأسرة" required error={errors.familyMembers}>
								<TextInput
									name="familyMembers"
									type="number"
									value={formData.familyMembers}
									onChange={(val) => setField('familyMembers', val)}
									placeholder="أدخل عدد أفراد الأسرة"
								/>
							</FormField>

							<FormField label="الدخل الشهري (ريال)" required error={errors.monthlyIncome}>
								<TextInput
									name="monthlyIncome"
									type="number"
									value={formData.monthlyIncome}
									onChange={(val) => setField('monthlyIncome', val)}
									placeholder="أدخل الدخل الشهري"
								/>
							</FormField>

							<FormField label="مبلغ التمويل المطلوب (ريال)" required error={errors.financingAmount}>
								<SelectInput
									name="financingAmount"
									value={formData.financingAmount}
									onChange={(val) => setField('financingAmount', val)}
									placeholder="اختر مبلغ التمويل"
									options={[
										{ value: '18000', label: '18,000 ريال' },
										{ value: '30000', label: '30,000 ريال' },
										{ value: '50000', label: '50,000 ريال' },
										{ value: '75000', label: '75,000 ريال' },
										{ value: '100000', label: '100,000 ريال' }
									]}
								/>
							</FormField>

							<FormField label="نوع التوظيف" required error={errors.employmentType}>
								<SelectInput
									name="employmentType"
									value={formData.employmentType}
									onChange={(val) => setField('employmentType', val)}
									placeholder="اختر نوع التوظيف"
									options={[
										{ value: 'government', label: 'موظف حكومي' },
										{ value: 'private', label: 'موظف قطاع خاص' },
										{ value: 'self-employed', label: 'عمل حر' },
										{ value: 'unemployed', label: 'بدون عمل' }
									]}
								/>
							</FormField>

							<FormField label="الغرض من التمويل" required error={errors.financingPurpose}>
								<TextArea
									name="financingPurpose"
									value={formData.financingPurpose}
									onChange={(val) => setField('financingPurpose', val)}
									placeholder="اشرح الغرض من التمويل..."
									rows={4}
								/>
							</FormField>

							<FormField label="رقم حساب الآيبان" required error={errors.bankAccount}>
								<TextInput
									name="bankAccount"
									value={formData.bankAccount}
									onChange={(val) => setField('bankAccount', val)}
									placeholder="SA00 0000 0000 0000 0000 0000"
								/>
							</FormField>
						</div>
					)}

					{/* Step 3: Review */}
					{currentStep === 3 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-[#161616] mb-6">
								مراجعة الطلب
							</h2>
							
							<div className="bg-[#f9fafb] rounded-2xl p-6 space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-gray-500 text-sm">اسم المتقدم</p>
										<p className="font-medium text-[#161616]">{formData.applicantName}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">رقم الهوية</p>
										<p className="font-medium text-[#161616]">{formData.applicantNationalId}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">رقم الجوال</p>
										<p className="font-medium text-[#161616]">{formData.applicantPhone}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">البريد الإلكتروني</p>
										<p className="font-medium text-[#161616]">{formData.applicantEmail}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">عدد أفراد الأسرة</p>
										<p className="font-medium text-[#161616]">{formData.familyMembers}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">مبلغ التمويل</p>
										<p className="font-medium text-[#161616]">{formData.financingAmount} ريال</p>
									</div>
								</div>
							</div>

							<div className="bg-white rounded-2xl p-6 border border-gray-200">
								<label className="flex items-center gap-3 cursor-pointer">
									<input 
										type="checkbox" 
										checked={formData.termsAccepted}
										onChange={(e) => setField('termsAccepted', e.target.checked)}
										name="termsAccepted"
										className="w-5 h-5 text-[#1B8354] rounded focus:ring-[#1B8354]"
									/>
									<span className="text-[#161616]">
										أقر بصحة البيانات المدخلة وأوافق على <a href="#" className="text-[#1b8354] underline">الشروط والأحكام</a>
									</span>
								</label>
								{errors.termsAccepted && <p className="text-red-500 text-sm mt-2">{errors.termsAccepted}</p>}
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-10 pt-6 border-t border-gray-300">
						{currentStep > 1 && (
							<button
								onClick={handleBack}
								className="px-8 py-3 border border-gray-300 text-[#161616] rounded font-medium hover:bg-gray-50 transition-colors"
							>
								السابق
							</button>
						)}
						<div className={currentStep === 1 ? 'mr-auto' : ''}>
							{currentStep < 3 ? (
								<button
									onClick={handleNext}
									className="px-8 py-3 bg-[#1b8354] text-white rounded font-medium hover:opacity-90 transition-opacity"
								>
									التالي
								</button>
							) : (
								<button
									onClick={handleSubmit}
									className="px-8 py-3 bg-[#1B8354] text-white rounded font-medium hover:opacity-90 transition-opacity"
								>
									إرسال الطلب
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

