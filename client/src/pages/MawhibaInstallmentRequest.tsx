import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Upload, User, School, Calendar } from 'lucide-react'
import { NavbarTopLinks } from '../components/mawhiba/NavbarTopLinks'
import { MawhibaBreadcrumbs } from '../components/mawhiba/MawhibaBreadcrumbs'
import { FormField, TextInput, SelectInput } from '../components/FormField'
import { useLocaleStore } from '../store/locale'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function MawhibaInstallmentRequest() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const switchLang = useLocaleStore((s) => s.switchLanguage)
	const dir = useLocaleStore((s) => s.dir)
	
	// Use global form store for agent access
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		document.documentElement.dir = dir
	}, [dir])

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
		{ number: 1, label: 'معلومات الطالب', completed: currentStep > 1, active: currentStep === 1 },
		{ number: 2, label: 'تفاصيل المدرسة', completed: currentStep > 2, active: currentStep === 2 },
		{ number: 3, label: 'المراجعة والإرسال', completed: submitted, active: currentStep === 3 }
	]

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.studentName) newErrors.studentName = 'اسم الطالب مطلوب'
			if (!formData.studentNationalId) newErrors.studentNationalId = 'رقم الهوية مطلوب'
			if (!formData.studentBirthDate) newErrors.studentBirthDate = 'تاريخ الميلاد مطلوب'
			if (!formData.contactEmail) newErrors.contactEmail = 'البريد الإلكتروني مطلوب'
			if (!formData.contactPhone) newErrors.contactPhone = 'رقم الجوال مطلوب'
		} else if (step === 2) {
			if (!formData.studentSchool) newErrors.studentSchool = 'اسم المدرسة مطلوب'
			if (!formData.studentGrade) newErrors.studentGrade = 'الصف الدراسي مطلوب'
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
			console.log('Submitting form:', formData)
			setSubmitted(true)
		}
	}

	if (submitted) {
		return (
			<div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Alexandria, sans-serif' }}>
				<div className="container mx-auto px-4 py-4">
					<NavbarTopLinks />
				</div>
				<div className="container mx-auto px-4 py-12 text-center">
					<div className="max-w-2xl mx-auto bg-[#f4f4f6] rounded-[25px] p-10">
						<CheckCircle className="w-20 h-20 text-[#1B8354] mx-auto mb-6" />
						<h1 className="text-3xl font-bold text-[#2b254b] mb-4">
							تم تقديم الطلب بنجاح
						</h1>
						<p className="text-gray-600 mb-6">
							تم استلام طلبك للتسجيل في البرنامج الوطني للكشف عن الموهوبين. سيتم مراجعة الطلب وإشعارك بالنتيجة.
						</p>
						<button
							onClick={() => navigate('/mawhiba')}
							className="bg-[#2b254b] text-white px-8 py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity"
						>
							العودة للخدمات
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Alexandria, sans-serif' }}>
			<div className="container mx-auto px-4 py-4">
				<NavbarTopLinks />
			</div>

			<div className="container mx-auto px-4 md:px-[162px]">
				<MawhibaBreadcrumbs 
					items={[
						{ label: 'الرئيسية', href: '/mawhiba', isHome: true },
						{ label: 'الخدمات الإلكترونية', href: '/mawhiba' },
						{ label: 'طلب تسجيل جديد' }
					]}
				/>

				<div className="max-w-4xl mx-auto mb-20">
					<h1 className="text-[32px] font-normal text-[#4b5563] mb-8">
						طلب تسجيل في البرنامج الوطني للكشف عن الموهوبين
					</h1>

					{/* Custom Step Indicator */}
					<div className="flex justify-between mb-12 relative">
						<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
						{steps.map((step) => (
							<div key={step.number} className="flex flex-col items-center bg-white px-4">
								<div 
									className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
										step.active 
											? 'border-[#e2a947] bg-[#e2a947] text-white' 
											: step.completed 
												? 'border-[#1B8354] bg-[#1B8354] text-white' 
												: 'border-gray-300 bg-white text-gray-400'
									}`}
								>
									{step.completed ? <CheckCircle className="w-6 h-6" /> : step.number}
								</div>
								<span className={`text-sm font-medium ${step.active ? 'text-[#2b254b]' : 'text-gray-500'}`}>
									{step.label}
								</span>
							</div>
						))}
					</div>

					<div className="bg-[#f4f4f6] rounded-[25px] p-10">
						{/* Step 1: Student Info */}
						{currentStep === 1 && (
							<div className="space-y-6">
								<h2 className="text-xl font-medium text-[#2b254b] flex items-center gap-2 mb-6">
									<User className="w-6 h-6" />
									معلومات الطالب
								</h2>

								<FormField label="اسم الطالب الرباعي" required error={errors.studentName}>
									<TextInput
										name="studentName"
										value={formData.studentName}
										onChange={(val) => setField('studentName', val)}
										placeholder="أدخل الاسم كما هو في الهوية"
									/>
								</FormField>

								<FormField label="رقم الهوية الوطنية / الإقامة" required error={errors.studentNationalId}>
									<TextInput
										name="studentNationalId"
										value={formData.studentNationalId}
										onChange={(val) => setField('studentNationalId', val)}
										placeholder="أدخل رقم الهوية المكون من 10 أرقام"
									/>
								</FormField>

								<FormField label="تاريخ الميلاد" required error={errors.studentBirthDate}>
									<TextInput
										name="studentBirthDate"
										type="text"
										value={formData.studentBirthDate}
										onChange={(val) => setField('studentBirthDate', val)}
										placeholder="YYYY-MM-DD"
									/>
								</FormField>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField label="رقم الجوال" required error={errors.contactPhone}>
										<TextInput
											name="contactPhone"
											value={formData.contactPhone}
											onChange={(val) => setField('contactPhone', val)}
											placeholder="05xxxxxxxx"
										/>
									</FormField>

									<FormField label="البريد الإلكتروني" required error={errors.contactEmail}>
										<TextInput
											name="contactEmail"
											value={formData.contactEmail}
											onChange={(val) => setField('contactEmail', val)}
											placeholder="example@email.com"
										/>
									</FormField>
								</div>
							</div>
						)}

						{/* Step 2: School Details */}
						{currentStep === 2 && (
							<div className="space-y-6">
								<h2 className="text-xl font-medium text-[#2b254b] flex items-center gap-2 mb-6">
									<School className="w-6 h-6" />
									تفاصيل المدرسة
								</h2>

								<FormField label="اسم المدرسة" required error={errors.studentSchool}>
									<TextInput
										name="studentSchool"
										value={formData.studentSchool}
										onChange={(val) => setField('studentSchool', val)}
										placeholder="أدخل اسم المدرسة"
									/>
								</FormField>

								<FormField label="الصف الدراسي" required error={errors.studentGrade}>
									<SelectInput
										name="studentGrade"
										value={formData.studentGrade}
										onChange={(val) => setField('studentGrade', val)}
										placeholder="اختر الصف الدراسي"
										options={[
											{ value: '3', label: 'الصف الثالث الابتدائي' },
											{ value: '4', label: 'الصف الرابع الابتدائي' },
											{ value: '5', label: 'الصف الخامس الابتدائي' },
											{ value: '6', label: 'الصف السادس الابتدائي' },
											{ value: '7', label: 'الصف الأول المتوسط' },
											{ value: '8', label: 'الصف الثاني المتوسط' },
											{ value: '9', label: 'الصف الثالث المتوسط' },
											{ value: '10', label: 'الصف الأول الثانوي' }
										]}
									/>
								</FormField>
							</div>
						)}

						{/* Step 3: Review */}
						{currentStep === 3 && (
							<div className="space-y-6">
								<h2 className="text-xl font-medium text-[#2b254b] mb-6">
									مراجعة الطلب
								</h2>
								
								<div className="bg-white rounded-2xl p-6 space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-gray-500 text-sm">اسم الطالب</p>
											<p className="font-medium text-[#2b254b]">{formData.studentName}</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">رقم الهوية</p>
											<p className="font-medium text-[#2b254b]">{formData.studentNationalId}</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">المدرسة</p>
											<p className="font-medium text-[#2b254b]">{formData.studentSchool}</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">الصف</p>
											<p className="font-medium text-[#2b254b]">{formData.studentGrade}</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">رقم الجوال</p>
											<p className="font-medium text-[#2b254b]">{formData.contactPhone}</p>
										</div>
										<div>
											<p className="text-gray-500 text-sm">البريد الإلكتروني</p>
											<p className="font-medium text-[#2b254b]">{formData.contactEmail}</p>
										</div>
									</div>
								</div>

								<div className="bg-white rounded-2xl p-6">
									<label className="flex items-center gap-3 cursor-pointer">
										<input 
											type="checkbox" 
											checked={formData.termsAccepted}
											onChange={(e) => setField('termsAccepted', e.target.checked)}
											name="termsAccepted"
											className="w-5 h-5 text-[#1B8354] rounded focus:ring-[#1B8354]"
										/>
										<span className="text-[#2b254b]">
											أقر بصحة البيانات المدخلة وأوافق على <a href="#" className="text-[#e2a947] underline">الشروط والأحكام</a>
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
									className="px-8 py-3 border border-[#2b254b] text-[#2b254b] rounded-2xl font-medium hover:bg-gray-50 transition-colors"
								>
									السابق
								</button>
							)}
							<div className={currentStep === 1 ? 'mr-auto' : ''}>
								{currentStep < 3 ? (
									<button
										onClick={handleNext}
										className="px-8 py-3 bg-[#2b254b] text-white rounded-2xl font-medium hover:opacity-90 transition-opacity"
									>
										التالي
									</button>
								) : (
									<button
										onClick={handleSubmit}
										className="px-8 py-3 bg-[#1B8354] text-white rounded-2xl font-medium hover:opacity-90 transition-opacity"
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
