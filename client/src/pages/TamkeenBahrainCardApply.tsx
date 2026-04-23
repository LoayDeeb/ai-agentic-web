import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, ChevronRight, CreditCard, FileText } from 'lucide-react'
import { TamkeenHeader } from '../components/tamkeenbahrain/TamkeenHeader'
import { FormField, SelectInput, TextInput } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'
import { onToolEvent } from '../features/agent/tools'
import { TAMKEEN_PRIMARY } from '../components/tamkeenbahrain/content'

const steps = [
	{ number: 1, label: 'Cardholder Details' },
	{ number: 2, label: 'Card Preferences' },
	{ number: 3, label: 'Review & Submit' },
]

const cardTypeMap: Record<string, string> = {
	imtiaz: 'imtiaz',
	world: 'imtiaz-world',
}

const cardTypeLabelMap: Record<string, string> = {
	imtiaz: 'IMTIAZ Mastercard',
	'imtiaz-world': 'IMTIAZ World Mastercard',
}

export default function TamkeenBahrainCardApply() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = React.useState(false)
	const [errors, setErrors] = React.useState<Record<string, string>>({})

	React.useEffect(() => {
		setCurrentStep(1)
		const requestedCard = cardTypeMap[String(searchParams.get('card') || 'imtiaz')] || 'imtiaz'
		setField('tamkeenCardType', requestedCard)
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
			if (!formData.tamkeenCardFullName) nextErrors.tamkeenCardFullName = 'Full name is required'
			if (!formData.tamkeenCardNationalId) nextErrors.tamkeenCardNationalId = 'CPR or national ID is required'
			if (!formData.tamkeenCardPhone) nextErrors.tamkeenCardPhone = 'Mobile number is required'
			if (!formData.tamkeenCardEmail) nextErrors.tamkeenCardEmail = 'Email address is required'
		}
		if (step === 2) {
			if (!formData.tamkeenCardEmploymentStatus) nextErrors.tamkeenCardEmploymentStatus = 'Employment status is required'
			if (!formData.tamkeenCardMonthlyIncome) nextErrors.tamkeenCardMonthlyIncome = 'Monthly income is required'
			if (!formData.tamkeenCardType) nextErrors.tamkeenCardType = 'Card type is required'
			if (!formData.tamkeenCardDeliveryPreference) nextErrors.tamkeenCardDeliveryPreference = 'Delivery preference is required'
		}
		if (step === 3 && !formData.tamkeenCardTermsAccepted) {
			nextErrors.tamkeenCardTermsAccepted = 'You must confirm the declaration before submitting'
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
						<h1 className="mb-4 text-3xl font-bold text-slate-900">Card application submitted</h1>
						<p className="mb-6 text-slate-600">
							Your {cardTypeLabelMap[formData.tamkeenCardType] || 'IMTIAZ'} request has been received and
							will be reviewed by Bahrain Credit.
						</p>
						<div className="mb-8 inline-block rounded-xl bg-slate-50 px-5 py-4 text-left">
							<p className="text-sm text-slate-500">Reference Number</p>
							<p className="font-mono text-lg font-bold text-slate-900">
								BCFC-CC-{Math.floor(Math.random() * 90000) + 10000}
							</p>
						</div>
						<div>
							<button
								onClick={() => navigate('/bahraincredit/cards/imtiaz')}
								className="rounded-full px-6 py-3 text-white"
								style={{ backgroundColor: TAMKEEN_PRIMARY }}
							>
								Return to Cards
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
							<Link to="/bahraincredit" className="no-underline text-[rgb(153,153,153)]">Home</Link>
							<ChevronRight size={12} className="mx-1" />
						</li>
						<li className="inline-flex items-center">
							<Link to="/bahraincredit/cards/imtiaz" className="no-underline text-[rgb(153,153,153)]">Cards</Link>
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
							<h1 className="mt-3 text-4xl font-bold text-slate-900">Apply for IMTIAZ Card</h1>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
								The assistant can guide the customer through cardholder details, product selection, and
								the final review before submission.
							</p>
						</div>
						<div className="rounded-2xl bg-[linear-gradient(135deg,#193a85_0%,#244fb2_100%)] p-4 text-white">
							<CreditCard className="mb-2 h-6 w-6" />
							<p className="text-sm font-semibold">{cardTypeLabelMap[formData.tamkeenCardType] || 'IMTIAZ Mastercard'}</p>
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
									<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Step {step.number}</p>
									<p className="mt-2 text-sm font-semibold text-slate-900">{step.label}</p>
								</div>
							)
						})}
					</div>

					{currentStep === 1 && (
						<div className="grid gap-5 md:grid-cols-2">
							<FormField label="Full Name" required error={errors.tamkeenCardFullName}>
								<TextInput name="tamkeenCardFullName" value={formData.tamkeenCardFullName} onChange={(val) => setField('tamkeenCardFullName', val)} placeholder="Enter full name" />
							</FormField>
							<FormField label="CPR / National ID" required error={errors.tamkeenCardNationalId}>
								<TextInput name="tamkeenCardNationalId" value={formData.tamkeenCardNationalId} onChange={(val) => setField('tamkeenCardNationalId', val)} placeholder="Enter CPR or national ID" />
							</FormField>
							<FormField label="Mobile Number" required error={errors.tamkeenCardPhone}>
								<TextInput name="tamkeenCardPhone" type="tel" value={formData.tamkeenCardPhone} onChange={(val) => setField('tamkeenCardPhone', val)} placeholder="+973 3XXX XXXX" />
							</FormField>
							<FormField label="Email Address" required error={errors.tamkeenCardEmail}>
								<TextInput name="tamkeenCardEmail" type="email" value={formData.tamkeenCardEmail} onChange={(val) => setField('tamkeenCardEmail', val)} placeholder="name@example.com" />
							</FormField>
						</div>
					)}

					{currentStep === 2 && (
						<div className="grid gap-5 md:grid-cols-2">
							<FormField label="Employment Status" required error={errors.tamkeenCardEmploymentStatus}>
								<SelectInput
									name="tamkeenCardEmploymentStatus"
									value={formData.tamkeenCardEmploymentStatus}
									onChange={(val) => setField('tamkeenCardEmploymentStatus', val)}
									placeholder="Select employment status"
									options={[
										{ value: 'salaried', label: 'Salaried' },
										{ value: 'self-employed', label: 'Self-employed' },
										{ value: 'business-owner', label: 'Business owner' },
									]}
								/>
							</FormField>
							<FormField label="Monthly Income (BHD)" required error={errors.tamkeenCardMonthlyIncome}>
								<TextInput name="tamkeenCardMonthlyIncome" type="number" value={formData.tamkeenCardMonthlyIncome} onChange={(val) => setField('tamkeenCardMonthlyIncome', val)} placeholder="e.g. 1500" />
							</FormField>
							<FormField label="Preferred Card Type" required error={errors.tamkeenCardType}>
								<SelectInput
									name="tamkeenCardType"
									value={formData.tamkeenCardType}
									onChange={(val) => setField('tamkeenCardType', val)}
									placeholder="Select card type"
									options={[
										{ value: 'imtiaz', label: 'IMTIAZ Mastercard' },
										{ value: 'imtiaz-world', label: 'IMTIAZ World Mastercard' },
									]}
								/>
							</FormField>
							<FormField label="Requested Credit Limit (Optional)">
								<TextInput name="tamkeenCardCreditLimit" type="number" value={formData.tamkeenCardCreditLimit} onChange={(val) => setField('tamkeenCardCreditLimit', val)} placeholder="Optional requested limit" />
							</FormField>
							<FormField label="Card Delivery Preference" required error={errors.tamkeenCardDeliveryPreference}>
								<SelectInput
									name="tamkeenCardDeliveryPreference"
									value={formData.tamkeenCardDeliveryPreference}
									onChange={(val) => setField('tamkeenCardDeliveryPreference', val)}
									placeholder="Select delivery preference"
									options={[
										{ value: 'branch-pickup', label: 'Branch pickup' },
										{ value: 'home-delivery', label: 'Home delivery' },
										{ value: 'office-delivery', label: 'Office delivery' },
									]}
								/>
							</FormField>
						</div>
					)}

					{currentStep === 3 && (
						<div className="space-y-6">
							<h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
								<FileText size={20} style={{ color: TAMKEEN_PRIMARY }} />
								Review & Submit
							</h2>
							<div className="grid gap-4 md:grid-cols-2">
								{[
									['Full Name', formData.tamkeenCardFullName],
									['CPR / National ID', formData.tamkeenCardNationalId],
									['Mobile Number', formData.tamkeenCardPhone],
									['Email Address', formData.tamkeenCardEmail],
									['Employment Status', formData.tamkeenCardEmploymentStatus],
									['Monthly Income', formData.tamkeenCardMonthlyIncome],
									['Card Type', cardTypeLabelMap[formData.tamkeenCardType] || formData.tamkeenCardType],
									['Requested Limit', formData.tamkeenCardCreditLimit || 'Not provided'],
									['Delivery Preference', formData.tamkeenCardDeliveryPreference],
								].map(([label, value]) => (
									<div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
										<p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
										<p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
									</div>
								))}
							</div>

							<label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
								<input
									name="tamkeenCardTermsAccepted"
									type="checkbox"
									checked={formData.tamkeenCardTermsAccepted}
									onChange={(e) => setField('tamkeenCardTermsAccepted', e.target.checked)}
									className="mt-1"
								/>
								<span className="text-sm leading-7 text-slate-700">
									I confirm that Bahrain Credit may review this application and contact me about the
									selected IMTIAZ card request.
								</span>
							</label>
							{errors.tamkeenCardTermsAccepted ? (
								<p className="text-xs text-red-600">{errors.tamkeenCardTermsAccepted}</p>
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
