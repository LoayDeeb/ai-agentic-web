import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, FileText, User } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import { FormField, SelectInput, TextInput } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'
import { onToolEvent } from '../features/agent/tools'
import { TAMKEEN_PRIMARY } from '../components/tamkeenbahrain/content'

const steps = [
	{ number: 1, label: 'Applicant Details' },
	{ number: 2, label: 'Financing Details' },
	{ number: 3, label: 'Review & Submit' },
]

export default function TamkeenBahrainLoanApply() {
	const navigate = useNavigate()
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = React.useState(false)
	const [errors, setErrors] = React.useState<Record<string, string>>({})

	React.useEffect(() => {
		setCurrentStep(1)
	}, [setCurrentStep])

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
			} else if (tool === 'goToFormStep') {
				setCurrentStep(args.step)
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else if (tool === 'highlightFormField') {
				const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
				if (input) {
					input.scrollIntoView({ behavior: 'smooth', block: 'center' })
					highlight(`[name="${args.fieldName}"]`, args.duration || 3)
				}
			} else if (tool === 'submitForm' && currentStep === 3) {
				handleSubmit()
			}
		})
		return unsubscribe
	}, [currentStep, setCurrentStep, setField])

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}
		if (step === 1) {
			if (!formData.tamkeenLoanFullName) nextErrors.tamkeenLoanFullName = 'Full name is required'
			if (!formData.tamkeenLoanNationalId) nextErrors.tamkeenLoanNationalId = 'CPR or national ID is required'
			if (!formData.tamkeenLoanPhone) nextErrors.tamkeenLoanPhone = 'Mobile number is required'
			if (!formData.tamkeenLoanEmail) nextErrors.tamkeenLoanEmail = 'Email address is required'
		}
		if (step === 2) {
			if (!formData.tamkeenLoanEmploymentType) nextErrors.tamkeenLoanEmploymentType = 'Employment type is required'
			if (!formData.tamkeenLoanMonthlyIncome) nextErrors.tamkeenLoanMonthlyIncome = 'Monthly income is required'
			if (!formData.tamkeenLoanVehicleType) nextErrors.tamkeenLoanVehicleType = 'Vehicle type is required'
			if (!formData.tamkeenLoanRequestedAmount) nextErrors.tamkeenLoanRequestedAmount = 'Requested amount is required'
			if (!formData.tamkeenLoanPreferredTerm) nextErrors.tamkeenLoanPreferredTerm = 'Preferred term is required'
		}
		if (step === 3 && !formData.tamkeenLoanTermsAccepted) {
			nextErrors.tamkeenLoanTermsAccepted = 'You must confirm the declaration before submitting'
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
			<div className="min-h-screen bg-[#f4f6fb]">
				<TamkeenHeader />
				<div className="mx-auto max-w-3xl px-5 py-14">
					<div className="rounded-[28px] bg-white p-10 text-center shadow-[0_24px_80px_rgba(25,58,133,0.12)]">
						<CheckCircle className="mx-auto mb-5 h-20 w-20 text-[#1f9d63]" />
						<h1 className="mb-4 text-3xl font-bold text-slate-900">Car loan request submitted</h1>
						<p className="mb-6 text-slate-600">
							Your Bahrain Credit car loan application is now queued for review. A relationship team will
							contact you with the next steps.
						</p>
						<div className="mb-8 inline-block rounded-xl bg-slate-50 px-5 py-4 text-left">
							<p className="text-sm text-slate-500">Reference Number</p>
							<p className="font-mono text-lg font-bold text-slate-900">
								BCFC-CL-{Math.floor(Math.random() * 90000) + 10000}
							</p>
						</div>
						<div>
							<button
								onClick={() => navigate('/BahrainCredit/loans/car-loan')}
								className="rounded-full px-6 py-3 text-white"
								style={{ backgroundColor: TAMKEEN_PRIMARY }}
							>
								Return to Car Loan
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: 'Poppins, sans-serif' }}>
			<TamkeenHeader />
			<div className="mx-auto max-w-5xl px-5 py-10">
				<nav className="mb-3">
					<ul className="m-0 flex list-none flex-wrap items-center p-0 text-[13px] text-[rgb(153,153,153)]">
						<li className="inline-flex items-center">
							<Link to="/BahrainCredit" className="no-underline text-[rgb(153,153,153)]">Home</Link>
							<ChevronRight size={12} className="mx-1" />
						</li>
						<li className="inline-flex items-center">
							<Link to="/BahrainCredit/loans/car-loan" className="no-underline text-[rgb(153,153,153)]">Car Loan</Link>
							<ChevronRight size={12} className="mx-1" />
						</li>
						<li>Apply</li>
					</ul>
				</nav>

				<div className="rounded-[28px] bg-white p-8 shadow-[0_24px_80px_rgba(25,58,133,0.1)]">
					<div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-8 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: TAMKEEN_PRIMARY }}>
								BahrainCredit
							</p>
							<h1 className="mt-3 text-4xl font-bold text-slate-900">Apply for Car Loan</h1>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
								Complete the application with the same guided assistant experience used across the
								demo. The agent can fill fields, move steps, and help you review before submission.
							</p>
						</div>
						<div className="rounded-2xl bg-[linear-gradient(135deg,#193a85_0%,#244fb2_100%)] p-4 text-white">
							<User className="mb-2 h-6 w-6" />
							<p className="text-sm font-semibold">Three-step application</p>
						</div>
					</div>

					<div className="mb-10 flex flex-wrap gap-3">
						{steps.map((step) => {
							const active = currentStep === step.number
							const completed = currentStep > step.number
							return (
								<div
									key={step.number}
									className="min-w-[150px] rounded-2xl border px-4 py-3"
									style={{
										borderColor: active || completed ? TAMKEEN_PRIMARY : '#dbe3f0',
										backgroundColor: active ? '#eef4ff' : '#fff',
									}}
								>
									<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
										Step {step.number}
									</p>
									<p className="mt-2 text-sm font-semibold text-slate-900">{step.label}</p>
								</div>
							)
						})}
					</div>

					{currentStep === 1 && (
						<div className="space-y-6">
							<h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
								<User size={20} style={{ color: TAMKEEN_PRIMARY }} />
								Applicant Details
							</h2>
							<div className="grid gap-5 md:grid-cols-2">
								<FormField label="Full Name" required error={errors.tamkeenLoanFullName}>
									<TextInput name="tamkeenLoanFullName" value={formData.tamkeenLoanFullName} onChange={(val) => setField('tamkeenLoanFullName', val)} placeholder="Enter full name" />
								</FormField>
								<FormField label="CPR / National ID" required error={errors.tamkeenLoanNationalId}>
									<TextInput name="tamkeenLoanNationalId" value={formData.tamkeenLoanNationalId} onChange={(val) => setField('tamkeenLoanNationalId', val)} placeholder="Enter CPR or national ID" />
								</FormField>
								<FormField label="Mobile Number" required error={errors.tamkeenLoanPhone}>
									<TextInput name="tamkeenLoanPhone" type="tel" value={formData.tamkeenLoanPhone} onChange={(val) => setField('tamkeenLoanPhone', val)} placeholder="+973 3XXX XXXX" />
								</FormField>
								<FormField label="Email Address" required error={errors.tamkeenLoanEmail}>
									<TextInput name="tamkeenLoanEmail" type="email" value={formData.tamkeenLoanEmail} onChange={(val) => setField('tamkeenLoanEmail', val)} placeholder="name@example.com" />
								</FormField>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className="space-y-6">
							<h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
								<FileText size={20} style={{ color: TAMKEEN_PRIMARY }} />
								Financing Details
							</h2>
							<div className="grid gap-5 md:grid-cols-2">
								<FormField label="Employment Type" required error={errors.tamkeenLoanEmploymentType}>
									<SelectInput
										name="tamkeenLoanEmploymentType"
										value={formData.tamkeenLoanEmploymentType}
										onChange={(val) => setField('tamkeenLoanEmploymentType', val)}
										placeholder="Select employment type"
										options={[
											{ value: 'salaried', label: 'Salaried' },
											{ value: 'self-employed', label: 'Self-employed' },
											{ value: 'retired', label: 'Retired' },
										]}
									/>
								</FormField>
								<FormField label="Monthly Income (BHD)" required error={errors.tamkeenLoanMonthlyIncome}>
									<TextInput name="tamkeenLoanMonthlyIncome" type="number" value={formData.tamkeenLoanMonthlyIncome} onChange={(val) => setField('tamkeenLoanMonthlyIncome', val)} placeholder="e.g. 1200" />
								</FormField>
								<FormField label="Vehicle Type" required error={errors.tamkeenLoanVehicleType}>
									<SelectInput
										name="tamkeenLoanVehicleType"
										value={formData.tamkeenLoanVehicleType}
										onChange={(val) => setField('tamkeenLoanVehicleType', val)}
										placeholder="Select vehicle type"
										options={[
											{ value: 'new-car', label: 'New car' },
											{ value: 'used-car', label: 'Used car' },
											{ value: 'suv', label: 'SUV' },
											{ value: 'commercial', label: 'Commercial vehicle' },
										]}
									/>
								</FormField>
								<FormField label="Requested Amount (BHD)" required error={errors.tamkeenLoanRequestedAmount}>
									<TextInput name="tamkeenLoanRequestedAmount" type="number" value={formData.tamkeenLoanRequestedAmount} onChange={(val) => setField('tamkeenLoanRequestedAmount', val)} placeholder="e.g. 8500" />
								</FormField>
								<FormField label="Preferred Tenure" required error={errors.tamkeenLoanPreferredTerm}>
									<SelectInput
										name="tamkeenLoanPreferredTerm"
										value={formData.tamkeenLoanPreferredTerm}
										onChange={(val) => setField('tamkeenLoanPreferredTerm', val)}
										placeholder="Select tenure"
										options={[
											{ value: '36-months', label: '36 months' },
											{ value: '48-months', label: '48 months' },
											{ value: '60-months', label: '60 months' },
											{ value: '84-months', label: '84 months' },
										]}
									/>
								</FormField>
								<FormField label="Down Payment (Optional)">
									<TextInput name="tamkeenLoanDownPayment" type="number" value={formData.tamkeenLoanDownPayment} onChange={(val) => setField('tamkeenLoanDownPayment', val)} placeholder="Optional amount" />
								</FormField>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className="space-y-6">
							<h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
							<div className="grid gap-4 md:grid-cols-2">
								{[
									['Full Name', formData.tamkeenLoanFullName],
									['CPR / National ID', formData.tamkeenLoanNationalId],
									['Mobile Number', formData.tamkeenLoanPhone],
									['Email Address', formData.tamkeenLoanEmail],
									['Employment Type', formData.tamkeenLoanEmploymentType],
									['Monthly Income', formData.tamkeenLoanMonthlyIncome],
									['Vehicle Type', formData.tamkeenLoanVehicleType],
									['Requested Amount', formData.tamkeenLoanRequestedAmount],
									['Preferred Tenure', formData.tamkeenLoanPreferredTerm],
									['Down Payment', formData.tamkeenLoanDownPayment || 'Not provided'],
								].map(([label, value]) => (
									<div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
										<p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
									</div>
								))}
							</div>

							<label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
								<input
									name="tamkeenLoanTermsAccepted"
									type="checkbox"
									checked={formData.tamkeenLoanTermsAccepted}
									onChange={(e) => setField('tamkeenLoanTermsAccepted', e.target.checked)}
									className="mt-1"
								/>
								<span className="text-sm leading-7 text-slate-700">
									I confirm that the information provided is accurate and can be used by Bahrain Credit
									to assess my financing request.
								</span>
							</label>
							{errors.tamkeenLoanTermsAccepted ? (
								<p className="text-xs text-red-600">{errors.tamkeenLoanTermsAccepted}</p>
							) : null}
						</div>
					)}

					<div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
						<button
							type="button"
							onClick={handleBack}
							disabled={currentStep === 1}
							className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
						>
							Back
						</button>
						{currentStep < 3 ? (
							<button
								type="button"
								onClick={handleNext}
								className="rounded-full px-6 py-3 text-sm font-semibold text-white"
								style={{ backgroundColor: TAMKEEN_PRIMARY }}
							>
								Continue
							</button>
						) : (
							<button
								type="button"
								onClick={handleSubmit}
								className="rounded-full px-6 py-3 text-sm font-semibold text-white"
								style={{ backgroundColor: TAMKEEN_PRIMARY }}
							>
								Submit Application
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
