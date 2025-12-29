import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, User, Heart, FileText } from 'lucide-react'
import { HealthcareHeaderNav } from '../components/jico/HealthcareHeaderNav'
import { FormField, TextInput, SelectInput, TextArea } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function JicoSubmitRequest() {
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
		{ number: 2, label: 'تفاصيل التأمين', completed: currentStep > 2, active: currentStep === 2 },
		{ number: 3, label: 'المراجعة والإرسال', completed: submitted, active: currentStep === 3 }
	]

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.insuranceFullName) newErrors.insuranceFullName = 'الاسم الكامل مطلوب'
			if (!formData.insuranceNationalId) newErrors.insuranceNationalId = 'الرقم الوطني مطلوب'
			if (!formData.insuranceDateOfBirth) newErrors.insuranceDateOfBirth = 'تاريخ الميلاد مطلوب'
			if (!formData.insurancePhone) newErrors.insurancePhone = 'رقم الهاتف مطلوب'
			if (!formData.insuranceEmail) newErrors.insuranceEmail = 'البريد الإلكتروني مطلوب'
		} else if (step === 2) {
			if (!formData.insurancePlanType) newErrors.insurancePlanType = 'نوع البرنامج مطلوب'
			if (!formData.insuranceCoverageClass) newErrors.insuranceCoverageClass = 'فئة التغطية مطلوبة'
			if (!formData.insuranceOccupation) newErrors.insuranceOccupation = 'المهنة مطلوبة'
		} else if (step === 3) {
			if (!formData.insuranceInsuranceTerms) newErrors.insuranceInsuranceTerms = 'يجب الموافقة على الشروط والأحكام'
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
			console.log('Submitting JICO insurance form:', formData)
			setSubmitted(true)
		}
	}

	const getPlanLabel = (planType: string) => {
		switch (planType) {
			case 'cure': return 'كيور - تغطية شاملة'
			case 'cure5050': return 'كيور 50:50 - تغطية متوازنة'
			case 'cureIn': return 'كيور إن - داخل المستشفى فقط'
			default: return planType
		}
	}

	const getClassLabel = (coverageClass: string) => {
		switch (coverageClass) {
			case 'private': return 'الفئة الخاصة'
			case 'first': return 'الفئة الأولى'
			case 'second': return 'الفئة الثانية'
			default: return coverageClass
		}
	}

	if (submitted) {
		return (
			<div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
				<HealthcareHeaderNav />
				<div className="container mx-auto px-4 py-12 text-center">
					<div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
						<CheckCircle className="w-20 h-20 text-[#CD9E51] mx-auto mb-6" />
						<h1 className="text-3xl font-bold text-[#161616] mb-4">
							تم تقديم طلب التأمين بنجاح
						</h1>
						<p className="text-gray-600 mb-6">
							تم استلام طلبك للحصول على التأمين الطبي. سيتواصل معك أحد ممثلي خدمة العملاء خلال 24 ساعة.
						</p>
						<div className="bg-[#CD9E51]/10 rounded-xl p-4 mb-6">
							<p className="text-[#CD9E51] font-medium">
								رقم الطلب: JICO-{Date.now().toString().slice(-8)}
							</p>
						</div>
						<button
							onClick={() => navigate('/jico')}
							className="bg-[#CD9E51] text-white px-8 py-3 rounded font-medium hover:bg-[#b88c45] transition-colors"
						>
							العودة للخدمات
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
			<HealthcareHeaderNav />
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold text-[#161616] mb-2">
					طلب تأمين طبي
				</h1>
				<p className="text-gray-600 mb-8">
					أكمل النموذج التالي للحصول على تأمين طبي من القدس للتأمين
				</p>

				{/* Step Indicator */}
				<div className="flex justify-between mb-12 relative">
					<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
					{steps.map((step) => (
						<div key={step.number} className="flex flex-col items-center bg-gray-50 px-4">
							<div 
								className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
									step.active 
										? 'border-[#CD9E51] bg-[#CD9E51] text-white' 
										: step.completed 
											? 'border-[#CD9E51] bg-[#CD9E51] text-white' 
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
								<User className="w-6 h-6 text-[#CD9E51]" />
								المعلومات الشخصية
							</h2>

							<FormField label="الاسم الكامل" required error={errors.insuranceFullName}>
								<TextInput
									name="insuranceFullName"
									value={formData.insuranceFullName}
									onChange={(val) => setField('insuranceFullName', val)}
									placeholder="أدخل الاسم الكامل كما هو في الهوية"
								/>
							</FormField>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField label="الرقم الوطني" required error={errors.insuranceNationalId}>
									<TextInput
										name="insuranceNationalId"
										value={formData.insuranceNationalId}
										onChange={(val) => setField('insuranceNationalId', val)}
										placeholder="أدخل الرقم الوطني"
									/>
								</FormField>

								<FormField label="تاريخ الميلاد" required error={errors.insuranceDateOfBirth}>
									<TextInput
										name="insuranceDateOfBirth"
										value={formData.insuranceDateOfBirth}
										onChange={(val) => setField('insuranceDateOfBirth', val)}
										placeholder="DD/MM/YYYY"
									/>
								</FormField>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField label="رقم الهاتف" required error={errors.insurancePhone}>
									<TextInput
										name="insurancePhone"
										value={formData.insurancePhone}
										onChange={(val) => setField('insurancePhone', val)}
										placeholder="07xxxxxxxx"
									/>
								</FormField>

								<FormField label="البريد الإلكتروني" required error={errors.insuranceEmail}>
									<TextInput
										name="insuranceEmail"
										type="email"
										value={formData.insuranceEmail}
										onChange={(val) => setField('insuranceEmail', val)}
										placeholder="example@email.com"
									/>
								</FormField>
							</div>

							<FormField label="العنوان" error={errors.insuranceAddress}>
								<TextInput
									name="insuranceAddress"
									value={formData.insuranceAddress}
									onChange={(val) => setField('insuranceAddress', val)}
									placeholder="المدينة، الحي، الشارع"
								/>
							</FormField>
						</div>
					)}

					{/* Step 2: Insurance Details */}
					{currentStep === 2 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-[#161616] flex items-center gap-2 mb-6">
								<Heart className="w-6 h-6 text-[#CD9E51]" />
								تفاصيل التأمين
							</h2>

							<FormField label="نوع برنامج التأمين" required error={errors.insurancePlanType}>
								<SelectInput
									name="insurancePlanType"
									value={formData.insurancePlanType}
									onChange={(val) => setField('insurancePlanType', val)}
									placeholder="اختر برنامج التأمين"
									options={[
										{ value: 'cure', label: 'كيور - تغطية شاملة (ابتداءً من 250 دينار)' },
										{ value: 'cure5050', label: 'كيور 50:50 - تغطية متوازنة (ابتداءً من 130 دينار)' },
										{ value: 'cureIn', label: 'كيور إن - داخل المستشفى فقط (ابتداءً من 65 دينار)' }
									]}
								/>
							</FormField>

							<FormField label="فئة التغطية" required error={errors.insuranceCoverageClass}>
								<SelectInput
									name="insuranceCoverageClass"
									value={formData.insuranceCoverageClass}
									onChange={(val) => setField('insuranceCoverageClass', val)}
									placeholder="اختر فئة التغطية"
									options={[
										{ value: 'private', label: 'الفئة الخاصة - أعلى مستوى من التغطية' },
										{ value: 'first', label: 'الفئة الأولى - تغطية ممتازة' },
										{ value: 'second', label: 'الفئة الثانية - تغطية جيدة' }
									]}
								/>
							</FormField>

							<FormField label="عدد أفراد الأسرة المراد تغطيتهم" error={errors.insuranceFamilyMembers}>
								<SelectInput
									name="insuranceFamilyMembers"
									value={formData.insuranceFamilyMembers}
									onChange={(val) => setField('insuranceFamilyMembers', val)}
									placeholder="اختر عدد الأفراد"
									options={[
										{ value: '1', label: 'فرد واحد (أنا فقط)' },
										{ value: '2', label: 'فردين' },
										{ value: '3', label: '3 أفراد' },
										{ value: '4', label: '4 أفراد' },
										{ value: '5+', label: '5 أفراد أو أكثر' }
									]}
								/>
							</FormField>

							<FormField label="المهنة" required error={errors.insuranceOccupation}>
								<TextInput
									name="insuranceOccupation"
									value={formData.insuranceOccupation}
									onChange={(val) => setField('insuranceOccupation', val)}
									placeholder="أدخل مهنتك الحالية"
								/>
							</FormField>

							<FormField label="هل لديك أمراض مزمنة أو حالات صحية سابقة؟" error={errors.insurancePreExisting}>
								<TextArea
									name="insurancePreExisting"
									value={formData.insurancePreExisting}
									onChange={(val) => setField('insurancePreExisting', val)}
									placeholder="اذكر أي حالات صحية سابقة أو أمراض مزمنة (اختياري)"
									rows={3}
								/>
							</FormField>
						</div>
					)}

					{/* Step 3: Review */}
					{currentStep === 3 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-[#161616] flex items-center gap-2 mb-6">
								<FileText className="w-6 h-6 text-[#CD9E51]" />
								مراجعة الطلب
							</h2>
							
							<div className="bg-gray-50 rounded-2xl p-6 space-y-4">
								<h3 className="font-semibold text-[#161616] border-b pb-2 mb-4">المعلومات الشخصية</h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-gray-500 text-sm">الاسم الكامل</p>
										<p className="font-medium text-[#161616]">{formData.insuranceFullName}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">الرقم الوطني</p>
										<p className="font-medium text-[#161616]">{formData.insuranceNationalId}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">تاريخ الميلاد</p>
										<p className="font-medium text-[#161616]">{formData.insuranceDateOfBirth}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">رقم الهاتف</p>
										<p className="font-medium text-[#161616]">{formData.insurancePhone}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">البريد الإلكتروني</p>
										<p className="font-medium text-[#161616]">{formData.insuranceEmail}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">المهنة</p>
										<p className="font-medium text-[#161616]">{formData.insuranceOccupation}</p>
									</div>
								</div>
							</div>

							<div className="bg-[#CD9E51]/5 rounded-2xl p-6 space-y-4 border border-[#CD9E51]/20">
								<h3 className="font-semibold text-[#CD9E51] border-b border-[#CD9E51]/20 pb-2 mb-4">تفاصيل التأمين</h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-gray-500 text-sm">برنامج التأمين</p>
										<p className="font-medium text-[#161616]">{getPlanLabel(formData.insurancePlanType)}</p>
									</div>
									<div>
										<p className="text-gray-500 text-sm">فئة التغطية</p>
										<p className="font-medium text-[#161616]">{getClassLabel(formData.insuranceCoverageClass)}</p>
									</div>
									{formData.insuranceFamilyMembers && (
										<div>
											<p className="text-gray-500 text-sm">عدد الأفراد</p>
											<p className="font-medium text-[#161616]">{formData.insuranceFamilyMembers} أفراد</p>
										</div>
									)}
								</div>
							</div>

							<div className="bg-white rounded-2xl p-6 border border-gray-200">
								<label className="flex items-start gap-3 cursor-pointer">
									<input 
										type="checkbox" 
										checked={formData.insuranceInsuranceTerms}
										onChange={(e) => setField('insuranceInsuranceTerms', e.target.checked)}
										name="insuranceInsuranceTerms"
										className="w-5 h-5 mt-0.5 text-[#CD9E51] rounded focus:ring-[#CD9E51]"
									/>
									<span className="text-[#161616]">
										أقر بصحة البيانات المدخلة وأوافق على{' '}
										<a href="#" className="text-[#CD9E51] underline">شروط وأحكام التأمين</a>{' '}
										وأفهم أن القسط النهائي سيتم تحديده بناءً على المعلومات المقدمة والفحص الطبي إذا لزم الأمر.
									</span>
								</label>
								{errors.insuranceInsuranceTerms && <p className="text-red-500 text-sm mt-2">{errors.insuranceInsuranceTerms}</p>}
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
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
									className="px-8 py-3 bg-[#CD9E51] text-white rounded font-medium hover:bg-[#b88c45] transition-colors"
								>
									التالي
								</button>
							) : (
								<button
									onClick={handleSubmit}
									className="px-8 py-3 bg-[#CD9E51] text-white rounded font-medium hover:bg-[#b88c45] transition-colors"
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

