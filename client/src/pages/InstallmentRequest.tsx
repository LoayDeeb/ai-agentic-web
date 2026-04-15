import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'
import { TopHeaderBar } from '../components/TopHeader'
import { ZATCAHeader } from '../components/ZATCAHeader'
import { BreadcrumbSocial } from '../components/BreadcrumbSocial'
import { StepIndicator } from '../components/StepIndicator'
import { FormField, TextInput, SelectInput, TextArea } from '../components/FormField'
import { useLocaleStore } from '../store/locale'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function InstallmentRequest() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const switchLang = useLocaleStore((s) => s.switchLanguage)
	const dir = useLocaleStore((s) => s.dir)
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		document.documentElement.dir = dir
	}, [dir])

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
			} else if (tool === 'highlightFormField') {
				const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement
				if (input) {
					input.scrollIntoView({ behavior: 'smooth', block: 'center' })
					highlight(`[name="${args.fieldName}"]`, args.duration || 3)
				}
			} else if (tool === 'submitForm' && currentStep === 4) {
				handleSubmit()
			}
		}

		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [currentStep, setCurrentStep, setField])

	const steps = [
		{ number: 1, label: t('Entity Details'), completed: currentStep > 1, active: currentStep === 1 },
		{ number: 2, label: t('Registration Details'), completed: currentStep > 2, active: currentStep === 2 },
		{ number: 3, label: t('Confirmation'), completed: currentStep > 3, active: currentStep === 3 },
		{ number: 4, label: t('Review & Submit'), completed: submitted, active: currentStep === 4 }
	]

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.tin) nextErrors.tin = 'TIN is required'
			if (!formData.vatEntityType) nextErrors.vatEntityType = 'Entity type is required'
			if (!formData.vatRegistrationBasis) {
				nextErrors.vatRegistrationBasis = 'Registration basis is required'
			}
		}

		if (step === 2) {
			if (!formData.vatAnnualRevenue) nextErrors.vatAnnualRevenue = 'Annual revenue is required'
			if (!formData.vatEffectiveDate) {
				nextErrors.vatEffectiveDate = 'Effective registration date is required'
			}
			if (!formData.contactEmail) nextErrors.contactEmail = 'Contact email is required'
			if (!formData.contactPhone) nextErrors.contactPhone = 'Contact phone is required'
			if (!formData.vatActivityDescription) {
				nextErrors.vatActivityDescription = 'Economic activity description is required'
			}
		}

		if (step === 3 && !formData.vatTermsAccepted) {
			nextErrors.vatTermsAccepted = 'You must confirm the declaration before continuing'
		}

		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleNext = () => {
		if (!validateStep(currentStep)) return
		setCurrentStep(Math.min(currentStep + 1, 4))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleBack = () => {
		setCurrentStep(Math.max(currentStep - 1, 1))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleSubmit = () => {
		if (!validateStep(currentStep)) return
		setSubmitted(true)
	}

	if (submitted) {
		return (
			<div className="min-h-screen bg-gray-50">
				<TopHeaderBar onLanguageSwitch={() => switchLang()} />
				<ZATCAHeader />
				<div className="container mx-auto px-6 py-12">
					<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
						<CheckCircle className="w-20 h-20 text-[#1B8354] mx-auto mb-4" />
						<h1
							className="text-3xl font-bold text-[#1F2A37] mb-4"
							style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
						>
							{t('تم تقديم طلب التسجيل بنجاح')}
						</h1>
						<p className="text-gray-600 mb-6">
							{t('سيصلك إشعار لشهادة الضريبة عند اكتمال الطلب.')}
						</p>
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<p className="text-sm text-gray-700">
								<strong>{t('Reference Number')}:</strong>{' '}
								<span className="font-mono">
									VAT-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}
								</span>
							</p>
						</div>
						<button
							onClick={() => navigate('/services')}
							className="bg-[#1B8354] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#156b45] transition-colors"
						>
							{t('Back to Services')}
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<TopHeaderBar onLanguageSwitch={() => switchLang()} />
			<ZATCAHeader />
			<div className="container mx-auto px-6 py-6">
				<BreadcrumbSocial
					breadcrumbs={[
						{ label: t('Home'), href: '/' },
						{ label: t('Zakat, Tax and Customs Services'), href: '/services' },
						{
							label: t('التسجيل في ضريبة القيمة المضافة للمنشآت'),
							href: '/services/vat-registration-establishments'
						}
					]}
					pageTitle={t('ابدأ الخدمة')}
				/>

				<div className="max-w-4xl mx-auto">
					<h1
						className="text-3xl font-bold text-[#1F2A37] mb-8"
						style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
					>
						{t('التسجيل في ضريبة القيمة المضافة للمنشآت')}
					</h1>

					<StepIndicator steps={steps} />

					<div className="bg-white rounded-lg shadow-md p-8">
						{currentStep === 1 && (
							<div>
								<h2 className="text-xl font-bold text-[#1F2A37] mb-6">
									{t('بيانات المنشأة')}
								</h2>

								<FormField label={t('الرقم المميز / TIN')} required error={errors.tin}>
									<TextInput
										name="tin"
										value={formData.tin}
										onChange={(val) => setField('tin', val)}
										placeholder={t('أدخل الرقم المميز')}
									/>
								</FormField>

								<FormField label={t('نوع المنشأة')} required error={errors.vatEntityType}>
									<SelectInput
										name="vatEntityType"
										value={formData.vatEntityType}
										onChange={(val) => setField('vatEntityType', val)}
										placeholder={t('اختر نوع المنشأة')}
										options={[
											{ value: 'company', label: t('شركة') },
											{ value: 'establishment', label: t('مؤسسة') },
											{ value: 'non-profit', label: t('جهة غير ربحية') },
											{ value: 'government', label: t('جهة حكومية') }
										]}
									/>
								</FormField>

								<FormField
									label={t('أساس التسجيل')}
									required
									error={errors.vatRegistrationBasis}
									helpText={t('وصول الإيرادات السنوية لحد التسجيل الإلزامي أو الاختياري.')}
								>
									<SelectInput
										name="vatRegistrationBasis"
										value={formData.vatRegistrationBasis}
										onChange={(val) => setField('vatRegistrationBasis', val)}
										placeholder={t('اختر أساس التسجيل')}
										options={[
											{ value: 'mandatory', label: t('تسجيل إلزامي') },
											{ value: 'optional', label: t('تسجيل اختياري') }
										]}
									/>
								</FormField>
							</div>
						)}

						{currentStep === 2 && (
							<div>
								<h2 className="text-xl font-bold text-[#1F2A37] mb-6">
									{t('تفاصيل التسجيل')}
								</h2>

								<FormField
									label={t('الإيرادات السنوية')}
									required
									error={errors.vatAnnualRevenue}
								>
									<TextInput
										name="vatAnnualRevenue"
										type="number"
										value={formData.vatAnnualRevenue}
										onChange={(val) => setField('vatAnnualRevenue', val)}
										placeholder={t('أدخل الإيرادات السنوية بالريال السعودي')}
									/>
								</FormField>

								<FormField
									label={t('تاريخ التسجيل الفعلي')}
									required
									error={errors.vatEffectiveDate}
								>
									<TextInput
										name="vatEffectiveDate"
										value={formData.vatEffectiveDate}
										onChange={(val) => setField('vatEffectiveDate', val)}
										placeholder={t('مثال: 15-04-2019')}
									/>
								</FormField>

								<FormField
									label={t('البريد الإلكتروني')}
									required
									error={errors.contactEmail}
								>
									<TextInput
										name="contactEmail"
										type="email"
										value={formData.contactEmail}
										onChange={(val) => setField('contactEmail', val)}
										placeholder={t('example@company.sa')}
									/>
								</FormField>

								<FormField
									label={t('رقم الجوال')}
									required
									error={errors.contactPhone}
								>
									<TextInput
										name="contactPhone"
										type="tel"
										value={formData.contactPhone}
										onChange={(val) => setField('contactPhone', val)}
										placeholder="+9665XXXXXXXX"
									/>
								</FormField>

								<FormField
									label={t('وصف النشاط الاقتصادي')}
									required
									error={errors.vatActivityDescription}
								>
									<TextArea
										name="vatActivityDescription"
										value={formData.vatActivityDescription}
										onChange={(val) => setField('vatActivityDescription', val)}
										placeholder={t('اكتب وصفًا مختصرًا للنشاط الاقتصادي الخاضع لضريبة القيمة المضافة')}
										rows={5}
									/>
								</FormField>
							</div>
						)}

						{currentStep === 3 && (
							<div>
								<h2 className="text-xl font-bold text-[#1F2A37] mb-6">
									{t('الإقرار والتأكيد')}
								</h2>

								<div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-5 mb-6 space-y-3 text-sm text-gray-700">
									<p>{t('الخدمة متاحة للمنشآت التي تمارس نشاطًا اقتصاديًا خاضعًا لضريبة القيمة المضافة.')}</p>
									<p>{t('مدة تنفيذ الخدمة خمس دقائق.')}</p>
									<p>{t('تكلفة الخدمة: لا يوجد رسوم.')}</p>
									<p>{t('سيصلك إشعار لشهادة الضريبة عند اكتمال الطلب.')}</p>
								</div>

								<label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4">
									<input
										name="vatTermsAccepted"
										type="checkbox"
										checked={formData.vatTermsAccepted}
										onChange={(e) => setField('vatTermsAccepted', e.target.checked)}
										className="mt-1 h-4 w-4 accent-[#1B8354]"
									/>
									<span className="text-sm text-gray-700">
										{t('أقر بصحة المعلومات المدخلة وأوافق على متابعة طلب التسجيل في ضريبة القيمة المضافة للمنشآت.')}
									</span>
								</label>
								{errors.vatTermsAccepted && (
									<p className="mt-2 text-xs text-red-600">{t(errors.vatTermsAccepted)}</p>
								)}
							</div>
						)}

						{currentStep === 4 && (
							<div>
								<h2 className="text-xl font-bold text-[#1F2A37] mb-6">
									{t('مراجعة الطلب')}
								</h2>

								<div className="space-y-6">
									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">{t('بيانات المنشأة')}</h3>
										<div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('الرقم المميز / TIN')}:</span>
												<span className="font-medium">{formData.tin}</span>
											</div>
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('نوع المنشأة')}:</span>
												<span className="font-medium">{formData.vatEntityType}</span>
											</div>
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('أساس التسجيل')}:</span>
												<span className="font-medium">{formData.vatRegistrationBasis}</span>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">{t('تفاصيل التسجيل')}</h3>
										<div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('الإيرادات السنوية')}:</span>
												<span className="font-medium">{formData.vatAnnualRevenue}</span>
											</div>
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('تاريخ التسجيل الفعلي')}:</span>
												<span className="font-medium">{formData.vatEffectiveDate}</span>
											</div>
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('البريد الإلكتروني')}:</span>
												<span className="font-medium">{formData.contactEmail}</span>
											</div>
											<div className="flex justify-between gap-4">
												<span className="text-gray-600">{t('رقم الجوال')}:</span>
												<span className="font-medium">{formData.contactPhone}</span>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">
											{t('النشاط الاقتصادي')}
										</h3>
										<div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
											{formData.vatActivityDescription}
										</div>
									</div>

									<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
										<p className="text-sm text-yellow-800">
											<strong>{t('مهم')}:</strong>{' '}
											{t('بعد إرسال الطلب ستصلك شهادة الضريبة عند اكتمال الطلب.')}
										</p>
									</div>
								</div>
							</div>
						)}

						<div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
							{currentStep > 1 && !submitted ? (
								<button
									onClick={handleBack}
									className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
								>
									{t('Back')}
								</button>
							) : (
								<div />
							)}

							{currentStep < 4 ? (
								<button
									onClick={handleNext}
									className="px-6 py-3 bg-[#1B8354] text-white rounded-lg font-medium hover:bg-[#156b45] transition-colors"
								>
									{t('Next')}
								</button>
							) : (
								<button
									onClick={handleSubmit}
									className="px-6 py-3 bg-[#1B8354] text-white rounded-lg font-medium hover:bg-[#156b45] transition-colors"
								>
									{t('Submit Request')}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
