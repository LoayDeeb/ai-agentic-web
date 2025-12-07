import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Upload } from 'lucide-react'
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
				// Highlight the field that was filled
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
			} else if (tool === 'submitForm') {
				if (currentStep === 4) {
					handleSubmit()
				}
			}
		}
		
		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [currentStep])

	const steps = [
		{ number: 1, label: t('Basic Info'), completed: currentStep > 1, active: currentStep === 1 },
		{ number: 2, label: t('Financial Details'), completed: currentStep > 2, active: currentStep === 2 },
		{ number: 3, label: t('Supporting Documents'), completed: currentStep > 3, active: currentStep === 3 },
		{ number: 4, label: t('Review & Submit'), completed: submitted, active: currentStep === 4 }
	]

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {}

		if (step === 1) {
			if (!formData.tin) newErrors.tin = t('TIN is required')
			if (!formData.taxPeriod) newErrors.taxPeriod = t('Tax period is required')
		} else if (step === 2) {
			if (!formData.amountDue) newErrors.amountDue = t('Amount due is required')
			if (!formData.requestedInstallments) newErrors.requestedInstallments = t('Number of installments is required')
			if (!formData.justification) newErrors.justification = t('Justification is required')
		} else if (step === 3) {
			if (!formData.bankStatement) newErrors.bankStatement = t('Bank statement is required')
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (validateStep(currentStep)) {
			const nextStep = Math.min(currentStep + 1, 4)
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
			// In production, submit to API
			console.log('Submitting form:', formData)
			setSubmitted(true)
		}
	}

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setField('bankStatement', file)
			setErrors({ ...errors, bankStatement: '' })
		}
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
							{t('Request Submitted Successfully')}
						</h1>
						<p className="text-gray-600 mb-6">
							{t('Your installment plan request has been submitted. You will receive a notification once it is reviewed and approved.')}
						</p>
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<p className="text-sm text-gray-700">
								<strong>{t('Reference Number')}:</strong> <span className="font-mono">REQ-2025-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</span>
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
						{ label: t('Request an Installment Plan'), href: '/services/request-installment-plan' }
					]}
					pageTitle={t('Submit Request')}
				/>

				<div className="max-w-4xl mx-auto">
					<h1
						className="text-3xl font-bold text-[#1F2A37] mb-8"
						style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
					>
						{t('Request an Installment Plan')}
					</h1>

					<StepIndicator steps={steps} />

					<div className="bg-white rounded-lg shadow-md p-8">
						{/* Step 1: Basic Info */}
						{currentStep === 1 && (
							<div>
								<h2
									className="text-xl font-bold text-[#1F2A37] mb-6"
									style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
								>
									{t('Basic Information')}
								</h2>

								<FormField label={t('Tax Identification Number (TIN)')} required error={errors.tin}>
									<TextInput
										name="tin"
										value={formData.tin}
										onChange={(val) => setField('tin', val)}
										placeholder={t('Enter your TIN')}
									/>
								</FormField>

								<FormField label={t('Tax Period')} required error={errors.taxPeriod}>
									<SelectInput
										name="taxPeriod"
										value={formData.taxPeriod}
										onChange={(val) => setField('taxPeriod', val)}
										placeholder={t('Select tax period')}
										options={[
											{ value: 'Q1-2024', label: 'Q1 2024' },
											{ value: 'Q2-2024', label: 'Q2 2024' },
											{ value: 'Q3-2024', label: 'Q3 2024' },
											{ value: 'Q4-2024', label: 'Q4 2024' }
										]}
									/>
								</FormField>

								<FormField label={t('Contact Email')} required>
									<TextInput
										name="contactEmail"
										type="email"
										value={formData.contactEmail}
										onChange={(val) => setField('contactEmail', val)}
										placeholder={t('example@email.com')}
									/>
								</FormField>

								<FormField label={t('Contact Phone')} required>
									<TextInput
										name="contactPhone"
										type="tel"
										value={formData.contactPhone}
										onChange={(val) => setField('contactPhone', val)}
										placeholder="+966 XX XXX XXXX"
									/>
								</FormField>
							</div>
						)}

						{/* Step 2: Financial Details */}
						{currentStep === 2 && (
							<div>
								<h2
									className="text-xl font-bold text-[#1F2A37] mb-6"
									style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
								>
									{t('Financial Details')}
								</h2>

								<FormField label={t('Total Amount Due (SAR)')} required error={errors.amountDue}>
									<TextInput
										name="amountDue"
										type="number"
										value={formData.amountDue}
										onChange={(val) => setField('amountDue', val)}
										placeholder={t('Enter amount in SAR')}
									/>
								</FormField>

								<FormField label={t('Requested Number of Installments')} required error={errors.requestedInstallments}>
									<SelectInput
										name="requestedInstallments"
										value={formData.requestedInstallments}
										onChange={(val) => setField('requestedInstallments', val)}
										placeholder={t('Select number of installments')}
										options={[
											{ value: '3', label: '3 ' + t('Months') },
											{ value: '6', label: '6 ' + t('Months') },
											{ value: '12', label: '12 ' + t('Months') }
										]}
									/>
								</FormField>

								<FormField
									label={t('Justification for Installment Request')}
									required
									error={errors.justification}
									helpText={t('Please explain why you need an installment plan')}
								>
									<TextArea
										name="justification"
										value={formData.justification}
										onChange={(val) => setField('justification', val)}
										placeholder={t('Describe your financial situation and reasons for requesting installments...')}
										rows={6}
									/>
								</FormField>

								<FormField label={t('Bank Name')} required>
									<TextInput
										name="bankName"
										value={formData.bankName}
										onChange={(val) => setField('bankName', val)}
										placeholder={t('Enter bank name')}
									/>
								</FormField>

								<FormField label={t('Bank Account Number')} required>
									<TextInput
										name="accountNumber"
										value={formData.accountNumber}
										onChange={(val) => setField('accountNumber', val)}
										placeholder={t('Enter account number')}
									/>
								</FormField>
							</div>
						)}

						{/* Step 3: Supporting Documents */}
						{currentStep === 3 && (
							<div>
								<h2
									className="text-xl font-bold text-[#1F2A37] mb-6"
									style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
								>
									{t('Supporting Documents')}
								</h2>

								<FormField
									label={t('Bank Statement (Last 3 Months)')}
									required
									error={errors.bankStatement}
									helpText={t('Accepted formats: PDF, JPG, PNG (Max 5MB)')}
								>
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1B8354] transition-colors">
										<input
											type="file"
											id="bank-statement"
											accept=".pdf,.jpg,.jpeg,.png"
											onChange={handleFileUpload}
											className="hidden"
										/>
										<label
											htmlFor="bank-statement"
											className="cursor-pointer flex flex-col items-center"
										>
											<Upload className="w-12 h-12 text-gray-400 mb-2" />
											{formData.bankStatement ? (
												<>
													<p className="text-sm font-medium text-[#1B8354]">
														{formData.bankStatement.name}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														{(formData.bankStatement.size / 1024 / 1024).toFixed(2)} MB
													</p>
												</>
											) : (
												<>
													<p className="text-sm font-medium text-gray-700">
														{t('Click to upload or drag and drop')}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														PDF, JPG, PNG {t('up to')} 5MB
													</p>
												</>
											)}
										</label>
									</div>
								</FormField>

								<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
									<p className="text-sm text-blue-800">
										<strong>{t('Note')}:</strong> {t('Please ensure your bank statement clearly shows transactions for the last 3 months.')}
									</p>
								</div>
							</div>
						)}

						{/* Step 4: Review & Submit */}
						{currentStep === 4 && (
							<div>
								<h2
									className="text-xl font-bold text-[#1F2A37] mb-6"
									style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
								>
									{t('Review Your Request')}
								</h2>

								<div className="space-y-6">
									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">
											{t('Basic Information')}
										</h3>
										<div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">{t('TIN')}:</span>
												<span className="font-medium">{formData.tin}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Tax Period')}:</span>
												<span className="font-medium">{formData.taxPeriod}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Contact Email')}:</span>
												<span className="font-medium">{formData.contactEmail}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Contact Phone')}:</span>
												<span className="font-medium">{formData.contactPhone}</span>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">
											{t('Financial Details')}
										</h3>
										<div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Amount Due')}:</span>
												<span className="font-medium">{formData.amountDue} SAR</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Installments')}:</span>
												<span className="font-medium">{formData.requestedInstallments} {t('Months')}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">{t('Bank')}:</span>
												<span className="font-medium">{formData.bankName}</span>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">
											{t('Justification')}
										</h3>
										<div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
											{formData.justification}
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-[#1F2A37] mb-3">
											{t('Uploaded Documents')}
										</h3>
										<div className="bg-gray-50 rounded-lg p-4 text-sm">
											{formData.bankStatement && (
												<div className="flex items-center gap-2">
													<Upload className="w-4 h-4 text-[#1B8354]" />
													<span className="font-medium">{formData.bankStatement.name}</span>
													<span className="text-gray-500">
														({(formData.bankStatement.size / 1024 / 1024).toFixed(2)} MB)
													</span>
												</div>
											)}
										</div>
									</div>

									<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
										<p className="text-sm text-yellow-800">
											<strong>{t('Important')}:</strong> {t('Please review all information carefully before submitting. You will receive a notification within 20 business days.')}
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Navigation buttons */}
						<div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
							{currentStep > 1 && !submitted && (
								<button
									onClick={handleBack}
									className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
								>
									{t('Back')}
								</button>
							)}
							<div className={currentStep === 1 ? 'ml-auto' : ''}>
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
		</div>
	)
}

