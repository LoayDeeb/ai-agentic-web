import React, { useEffect, useMemo, useState } from 'react'
import {
	CalendarDays,
	CheckCircle,
	ChevronRight,
	Clock,
	Globe2,
	MapPin,
	Menu,
	Minus,
	Plus,
	ShoppingBag,
	User,
	X,
} from 'lucide-react'
import { FormField, SelectInput, TextArea, TextInput } from '../components/FormField'
import { StepIndicator } from '../components/StepIndicator'
import { highlight } from '../features/agent/spotlight'
import { useFormStore } from '../store/formStore'

const SITE_ORIGIN = 'https://imaginetest.replit.app'

const experiences = [
	{
		id: 'general-visit',
		title: 'General Visit',
		price: 'JOD 12',
		image: `${SITE_ORIGIN}/api/storage/objects/uploads/ee2af135-7039-499b-b6eb-df923b0b83fa`,
		copy: 'Self-paced access to the main pilgrimage path, churches, river overlook, and visitor center.',
	},
	{
		id: 'biblical-package',
		title: 'Biblical Package',
		price: 'JOD 28',
		image: `${SITE_ORIGIN}/api/storage/objects/uploads/bf4ceb02-34b4-41c6-bb83-1bfed9ed38c0`,
		copy: 'A guided route through Elijah Hill, John’s Spring, ancient pools, and the Jordan River.',
	},
	{
		id: 'baptism-renewal',
		title: 'Baptism Renewal',
		price: 'JOD 45',
		image: `${SITE_ORIGIN}/baptism-site.webp`,
		copy: 'A quieter hosted visit with reserved prayer time and baptismal-vow renewal support.',
	},
]

const routeStops = [
	'Visitor Center',
	'Elijah’s Hill',
	'John’s Spring',
	'Ancient Pools',
	'Jordan River',
	'Pilgrim Chapel',
]

function BaptismHeader() {
	const [open, setOpen] = useState(false)
	const navItems = ['History', 'Online Tour', 'Visitors Gallery', 'Information', 'Book Your Trip', 'Contact Us']

	return (
		<header className="sticky top-0 z-30 border-b border-[#e8e1d4] bg-[#fbfaf7]/95 backdrop-blur">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
				<a href="#baptism-hero" className="flex items-center gap-3 text-[#123238]">
					<img src={`${SITE_ORIGIN}/logo.png`} alt="The Baptism Site" className="h-11 w-auto" />
				</a>

				<nav className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.03em] text-[#17363a] lg:flex">
					{navItems.map((item) => (
						<a key={item} href={item === 'Book Your Trip' ? '#baptism-booking' : '#baptism-experience'} className="hover:text-[#9d7a3f]">
							{item}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-4 text-[#17363a] lg:flex">
					<ShoppingBag className="h-5 w-5" />
					<User className="h-5 w-5" />
					<button className="flex items-center gap-2 rounded border border-[#e2dacb] px-3 py-2 text-sm">
						<Globe2 className="h-4 w-4" />
						English
					</button>
				</div>

				<button className="rounded border border-[#e2dacb] p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
					<Menu className="h-5 w-5" />
				</button>
			</div>

			{open && (
				<div className="fixed inset-0 z-40 bg-[#fbfaf7] p-5 lg:hidden">
					<div className="mb-8 flex items-center justify-between">
						<img src={`${SITE_ORIGIN}/logo.png`} alt="The Baptism Site" className="h-11 w-auto" />
						<button className="rounded border border-[#e2dacb] p-2" onClick={() => setOpen(false)} aria-label="Close menu">
							<X className="h-5 w-5" />
						</button>
					</div>
					<div className="grid gap-4 text-xl font-semibold text-[#17363a]">
						{navItems.map((item) => (
							<a key={item} href={item === 'Book Your Trip' ? '#baptism-booking' : '#baptism-experience'} onClick={() => setOpen(false)}>
								{item}
							</a>
						))}
					</div>
				</div>
			)}
		</header>
	)
}

export default function BaptismTripPlanner() {
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const selectedExperience = experiences.find((item) => item.id === formData.baptismExperience) || experiences[1]

	const steps = useMemo(
		() => [
			{ number: 1, label: 'Choose', completed: currentStep > 1, active: currentStep === 1 },
			{ number: 2, label: 'Plan', completed: currentStep > 2, active: currentStep === 2 },
			{ number: 3, label: 'Traveler', completed: currentStep > 3, active: currentStep === 3 },
			{ number: 4, label: 'Confirm', completed: submitted, active: currentStep === 4 },
		],
		[currentStep, submitted]
	)

	useEffect(() => {
		document.documentElement.dir = 'ltr'
	}, [])

	useEffect(() => {
		const handler = (e: Event) => {
			const { tool, args } = (e as CustomEvent).detail
			if (tool === 'selectBaptismExperience') {
				setField('baptismExperience', args.experienceId)
				document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
				setTimeout(() => highlight(`[data-experience="${args.experienceId}"]`, 3), 120)
			}
			if (tool === 'fillFormField') {
				setTimeout(() => {
					const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
					input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
					if (input) highlight(`[name="${args.fieldName}"]`, 2)
				}, 100)
			}
			if (tool === 'goToFormStep') {
				setCurrentStep(args.step)
				document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
			if (tool === 'highlightFormField') {
				const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement | null
				input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
				if (input) highlight(`[name="${args.fieldName}"]`, args.duration || 3)
			}
			if (tool === 'submitForm' && currentStep === 4) {
				handleSubmit()
			}
			if (tool === 'scrollToBaptismSection') {
				const id = `baptism-${args.sectionId}`
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
				setTimeout(() => highlight(`#${id}`, 3), 120)
			}
		}

		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [currentStep, setCurrentStep, setField])

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}
		if (step === 1 && !formData.baptismExperience) nextErrors.baptismExperience = 'Choose one experience.'
		if (step === 2) {
			if (!formData.baptismVisitDate) nextErrors.baptismVisitDate = 'Choose a visit date.'
			if (!formData.baptismGuests) nextErrors.baptismGuests = 'Enter the number of guests.'
			if (!formData.baptismLanguage) nextErrors.baptismLanguage = 'Choose a guide language.'
			if (!formData.baptismPickup) nextErrors.baptismPickup = 'Choose a pickup option.'
		}
		if (step === 3) {
			if (!formData.baptismFullName) nextErrors.baptismFullName = 'Enter the lead traveler name.'
			if (!formData.baptismEmail) nextErrors.baptismEmail = 'Enter an email address.'
			if (!formData.baptismPhone) nextErrors.baptismPhone = 'Enter a phone number.'
			if (!formData.baptismCountry) nextErrors.baptismCountry = 'Enter the traveler country.'
		}
		if (step === 4 && !formData.baptismTermsAccepted) {
			nextErrors.baptismTermsAccepted = 'Confirm the booking terms before submitting.'
		}
		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleNext = () => {
		if (!validateStep(currentStep)) return
		setCurrentStep(Math.min(currentStep + 1, 4))
		document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const handleBack = () => {
		setCurrentStep(Math.max(currentStep - 1, 1))
		document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const handleSubmit = () => {
		if (!validateStep(4)) return
		setSubmitted(true)
	}

	const guestCount = Math.max(Number(formData.baptismGuests || 0), 0)
	const estimatedTotal = guestCount * Number(selectedExperience.price.replace(/\D/g, '') || 0)

	return (
		<div className="min-h-screen bg-[#fbfaf7] text-[#17363a]">
			<BaptismHeader />

			<section id="baptism-hero" className="relative min-h-[calc(100vh-80px)] overflow-hidden">
				<img src={`${SITE_ORIGIN}/video-img1.webp`} alt="Baptism Site landscape" className="absolute inset-0 h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-b from-[#10292d]/55 via-[#10292d]/35 to-[#10292d]/70" />
				<div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-12 text-center text-white">
					<p className="mb-6 text-sm font-semibold uppercase tracking-[0.55em] text-[#e8d7bd]">The Baptism Site of Jesus Christ</p>
					<h1 className="max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl lg:text-8xl">Bethany Beyond the Jordan</h1>
					<p className="mt-7 max-w-3xl font-serif text-2xl italic text-[#f7efe3]">
						“This all happened at Bethany on the other side of the Jordan...”
					</p>
					<p className="mt-2 text-xs font-semibold uppercase tracking-[0.38em] text-[#e8d7bd]">John 1:28</p>
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<a href="#baptism-booking" className="bg-[#f7efe3] px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#17363a] hover:bg-white">
							Plan Your Visit
						</a>
						<a href="#baptism-experience" className="border border-white/75 px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white hover:bg-white/10">
							Discover Journey
						</a>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
				<div>
					<p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#9d7a3f]">Sacred Route</p>
					<h2 className="font-serif text-4xl leading-tight text-[#17363a] md:text-5xl">A planned day through history, prayer, and the Jordan River.</h2>
					<p className="mt-6 text-lg leading-8 text-[#566461]">
						The demo guides tourists from inspiration into a real booking flow: choose the visit style, set date and group needs, add pickup or prayer support, then confirm a reservation.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					{routeStops.map((stop, index) => (
						<div key={stop} className="border border-[#e5dccb] bg-white p-5">
							<p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#b08d53]">Stop {index + 1}</p>
							<h3 className="font-serif text-2xl text-[#17363a]">{stop}</h3>
						</div>
					))}
				</div>
			</section>

			<section id="baptism-booking" className="border-y border-[#e8e1d4] bg-[#f4efe7] px-5 py-16 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
						<div>
							<p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#9d7a3f]">Book Your Trip</p>
							<h2 className="font-serif text-4xl text-[#17363a] md:text-5xl">Plan and reserve the visit</h2>
						</div>
						<div className="grid grid-cols-3 gap-3 text-sm text-[#465957]">
							<div className="bg-white px-4 py-3"><Clock className="mb-2 h-5 w-5 text-[#9d7a3f]" />8:00 AM - 4:00 PM</div>
							<div className="bg-white px-4 py-3"><MapPin className="mb-2 h-5 w-5 text-[#9d7a3f]" />45 min from Amman</div>
							<div className="bg-white px-4 py-3"><CalendarDays className="mb-2 h-5 w-5 text-[#9d7a3f]" />Daily visits</div>
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-[1fr_420px]">
						<div className="bg-white p-6 shadow-sm md:p-8">
							<StepIndicator steps={steps} />

							{!submitted && currentStep === 1 && (
								<div>
									<h3 className="mb-6 font-serif text-3xl">Select Experience</h3>
									<div className="grid gap-5 md:grid-cols-3">
										{experiences.map((experience) => {
											const selected = formData.baptismExperience === experience.id
											return (
												<button
													key={experience.id}
													data-experience={experience.id}
													onClick={() => setField('baptismExperience', experience.id)}
													className={`group text-left transition ${selected ? 'ring-2 ring-[#9d7a3f]' : 'ring-1 ring-[#e5dccb] hover:ring-[#b08d53]'}`}
												>
													<img src={experience.image} alt={experience.title} className="h-44 w-full object-cover" />
													<div className="p-5">
														<div className="mb-3 flex items-center justify-between gap-3">
															<h4 className="font-serif text-2xl">{experience.title}</h4>
															<span className="text-sm font-bold text-[#9d7a3f]">{experience.price}</span>
														</div>
														<p className="text-sm leading-6 text-[#5d6b68]">{experience.copy}</p>
													</div>
												</button>
											)
										})}
									</div>
									{errors.baptismExperience && <p className="mt-3 text-sm text-red-600">{errors.baptismExperience}</p>}
								</div>
							)}

							{!submitted && currentStep === 2 && (
								<div className="grid gap-x-6 md:grid-cols-2">
									<FormField label="Visit date" required error={errors.baptismVisitDate}>
										<TextInput name="baptismVisitDate" type="text" value={formData.baptismVisitDate} onChange={(val) => setField('baptismVisitDate', val)} placeholder="May 28, 2026" />
									</FormField>
									<FormField label="Guests" required error={errors.baptismGuests}>
										<div className="flex items-center rounded-lg border border-gray-300">
											<button className="p-3" onClick={() => setField('baptismGuests', String(Math.max(1, guestCount - 1)))} aria-label="Decrease guests"><Minus className="h-4 w-4" /></button>
											<input name="baptismGuests" value={formData.baptismGuests} onChange={(e) => setField('baptismGuests', e.target.value)} className="w-full border-x border-gray-200 px-4 py-3 text-center outline-none" placeholder="2" />
											<button className="p-3" onClick={() => setField('baptismGuests', String(guestCount + 1 || 1))} aria-label="Increase guests"><Plus className="h-4 w-4" /></button>
										</div>
									</FormField>
									<FormField label="Guide language" required error={errors.baptismLanguage}>
										<SelectInput name="baptismLanguage" value={formData.baptismLanguage} onChange={(val) => setField('baptismLanguage', val)} placeholder="Choose language" options={[
											{ value: 'english', label: 'English' },
											{ value: 'french', label: 'French' },
											{ value: 'spanish', label: 'Spanish' },
											{ value: 'italian', label: 'Italian' },
											{ value: 'arabic', label: 'Arabic' },
										]} />
									</FormField>
									<FormField label="Pickup option" required error={errors.baptismPickup}>
										<SelectInput name="baptismPickup" value={formData.baptismPickup} onChange={(val) => setField('baptismPickup', val)} placeholder="Choose pickup" options={[
											{ value: 'own-transport', label: 'I will arrive by my own transport' },
											{ value: 'amman-hotel', label: 'Pickup from Amman hotel' },
											{ value: 'dead-sea-hotel', label: 'Pickup from Dead Sea hotel' },
											{ value: 'airport', label: 'Airport transfer request' },
										]} />
									</FormField>
									<div className="md:col-span-2">
										<FormField label="Add-ons">
											<TextInput name="baptismAddOns" value={formData.baptismAddOns} onChange={(val) => setField('baptismAddOns', val)} placeholder="Baptism renewal, private prayer time, Madaba stop..." />
										</FormField>
									</div>
								</div>
							)}

							{!submitted && currentStep === 3 && (
								<div className="grid gap-x-6 md:grid-cols-2">
									<FormField label="Lead traveler full name" required error={errors.baptismFullName}>
										<TextInput name="baptismFullName" value={formData.baptismFullName} onChange={(val) => setField('baptismFullName', val)} placeholder="Maria Thompson" />
									</FormField>
									<FormField label="Country" required error={errors.baptismCountry}>
										<TextInput name="baptismCountry" value={formData.baptismCountry} onChange={(val) => setField('baptismCountry', val)} placeholder="United States" />
									</FormField>
									<FormField label="Email" required error={errors.baptismEmail}>
										<TextInput name="baptismEmail" type="email" value={formData.baptismEmail} onChange={(val) => setField('baptismEmail', val)} placeholder="maria@example.com" />
									</FormField>
									<FormField label="Phone" required error={errors.baptismPhone}>
										<TextInput name="baptismPhone" type="tel" value={formData.baptismPhone} onChange={(val) => setField('baptismPhone', val)} placeholder="+1 555 0100" />
									</FormField>
									<div className="md:col-span-2">
										<FormField label="Notes for the visit team">
											<TextArea name="baptismNotes" value={formData.baptismNotes} onChange={(val) => setField('baptismNotes', val)} placeholder="Accessibility needs, clergy support, arrival details, or spiritual focus for the tour." rows={4} />
										</FormField>
									</div>
								</div>
							)}

							{!submitted && currentStep === 4 && (
								<div className="space-y-6">
									<h3 className="font-serif text-3xl">Review reservation</h3>
									<div className="grid gap-4 md:grid-cols-2">
										{[
											['Experience', selectedExperience.title],
											['Visit date', formData.baptismVisitDate],
											['Guests', formData.baptismGuests],
											['Language', formData.baptismLanguage],
											['Pickup', formData.baptismPickup],
											['Lead traveler', formData.baptismFullName],
										].map(([label, value]) => (
											<div key={label} className="border border-[#e5dccb] bg-[#fbfaf7] p-4">
												<p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9d7a3f]">{label}</p>
												<p className="mt-2 font-semibold">{value || 'Not provided'}</p>
											</div>
										))}
									</div>
									<label className="flex items-start gap-3 border border-[#e5dccb] bg-[#fbfaf7] p-4">
										<input name="baptismTermsAccepted" type="checkbox" checked={formData.baptismTermsAccepted} onChange={(e) => setField('baptismTermsAccepted', e.target.checked)} className="mt-1 h-4 w-4 accent-[#9d7a3f]" />
										<span className="text-sm leading-6 text-[#4b5c59]">
											I confirm these booking details and understand the visit team may contact me to finalize timing, pickup, and any religious-service arrangements.
										</span>
									</label>
									{errors.baptismTermsAccepted && <p className="text-sm text-red-600">{errors.baptismTermsAccepted}</p>}
								</div>
							)}

							{submitted && (
								<div className="py-10 text-center">
									<CheckCircle className="mx-auto mb-5 h-16 w-16 text-[#2f7d5b]" />
									<h3 className="font-serif text-4xl">Trip request received</h3>
									<p className="mx-auto mt-4 max-w-xl text-[#566461]">
										Your Baptism Site journey has been prepared. A visit coordinator will confirm availability, transport, and any baptism-renewal support.
									</p>
									<p className="mt-6 font-mono text-sm">BSC-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</p>
								</div>
							)}

							{!submitted && (
								<div className="mt-8 flex justify-between border-t border-[#e5dccb] pt-6">
									{currentStep > 1 ? (
										<button onClick={handleBack} className="border border-[#cfc3ae] px-6 py-3 font-semibold text-[#17363a] hover:bg-[#fbfaf7]">Back</button>
									) : <div />}
									{currentStep < 4 ? (
										<button onClick={handleNext} className="flex items-center gap-2 bg-[#17363a] px-6 py-3 font-semibold text-white hover:bg-[#0e2529]">Next <ChevronRight className="h-4 w-4" /></button>
									) : (
										<button onClick={handleSubmit} className="bg-[#9d7a3f] px-6 py-3 font-semibold text-white hover:bg-[#83652f]">Submit Booking Request</button>
									)}
								</div>
							)}
						</div>

						<aside className="self-start bg-[#17363a] p-6 text-white lg:sticky lg:top-28">
							<img src={selectedExperience.image} alt={selectedExperience.title} className="mb-6 h-56 w-full object-cover" />
							<p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e8d7bd]">Selected Journey</p>
							<h3 className="mt-3 font-serif text-3xl">{selectedExperience.title}</h3>
							<p className="mt-4 leading-7 text-[#d8e1dc]">{selectedExperience.copy}</p>
							<div className="mt-6 border-t border-white/20 pt-6">
								<div className="flex justify-between text-sm"><span>Base price</span><strong>{selectedExperience.price} / guest</strong></div>
								<div className="mt-3 flex justify-between text-sm"><span>Guests</span><strong>{formData.baptismGuests || '0'}</strong></div>
								<div className="mt-5 flex justify-between border-t border-white/20 pt-5 text-lg"><span>Estimated total</span><strong>JOD {estimatedTotal}</strong></div>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	)
}
