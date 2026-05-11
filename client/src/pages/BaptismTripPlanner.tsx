import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle, ChevronDown, Menu, ShoppingBag, X } from 'lucide-react'
import { highlight } from '../features/agent/spotlight'
import { useFormStore } from '../store/formStore'

export const experiences = [
	{
		id: 'general-visit',
		title: 'General Visits',
		price: 'JOD 12.00',
		image: '/exp-img1.webp',
		copy: 'Book individual or group tickets for the Baptism Site, including the visitor center, shuttle, and Jordan River access.',
		points: ['Open daily', 'Visitor center access', 'Shuttle included'],
	},
	{
		id: 'biblical-package',
		title: 'Biblical Packages',
		price: 'From JOD 28.00',
		image: '/exp-img2.webp',
		copy: 'A guided itinerary through Elijah Hill, John the Baptist Spring, ancient pools, churches, and the riverbank.',
		points: ['Guided route', 'Pilgrim landmarks', 'Multi-stop experience'],
	},
	{
		id: 'baptism-renewal',
		title: 'Mass & Christian Events',
		price: 'Request quote',
		image: '/exp-img3.webp',
		copy: 'Request coordinated support for worship groups, clergy-led visits, and baptism-renewal arrangements.',
		points: ['Hosted coordination', 'Prayer support', 'Group planning'],
	},
]

const navLinks = ['History', 'Online Tour', 'Visitors Gallery', 'Information', 'Book Your Trip', 'Contact Us']

const stepItems = [
	{ label: 'Select Experience', desc: 'Choose visit type' },
	{ label: 'Date & Time', desc: 'Plan arrival' },
	{ label: 'Visitor Details', desc: 'Guest information' },
	{ label: 'Review & Confirm', desc: 'Submit request' },
	{ label: 'Payment', desc: 'Secure checkout' },
]

const timeSlots = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00']

const nationalities = ['Jordanian', 'American', 'British', 'French', 'Italian', 'Spanish', 'Canadian', 'Australian', 'German', 'Brazilian', 'Filipino']

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="baptism-site-header">
			<div className="container-wide">
				<div className="baptism-header-row">
					<a href="/baptism" aria-label="The Baptism Site">
						<img src="/logo.png" alt="The Baptism Site" className="baptism-logo" />
					</a>

					<nav className="baptism-nav">
						{navLinks.map((item) => (
							<a key={item} href={item === 'Book Your Trip' ? '/baptism/book' : item === 'Contact Us' ? '#baptism-contact' : '/baptism#baptism-experience'}>
								{item}
								{['History', 'Online Tour', 'Visitors Gallery', 'Information'].includes(item) ? <ChevronDown size={14} /> : null}
							</a>
						))}
					</nav>

					<div className="baptism-actions">
						<ShoppingBag size={22} />
						<a className="baptism-profile" href="/baptism/book/general#baptism-booking" aria-label="Sign in">
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
						</a>
						<button className="baptism-lang">English</button>
						<img src="/logo2.png" alt="" className="baptism-logo-secondary" />
						<button className="baptism-menu" onClick={() => setMobileOpen((value) => !value)} aria-label="Open menu">
							{mobileOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>
				</div>

				{mobileOpen && (
					<nav className="baptism-mobile-nav">
						{navLinks.map((item) => (
							<a
								key={item}
								href={item === 'Book Your Trip' ? '/baptism/book' : item === 'Contact Us' ? '#baptism-contact' : '/baptism#baptism-experience'}
								onClick={() => setMobileOpen(false)}
							>
								{item}
							</a>
						))}
					</nav>
				)}
			</div>
		</header>
	)
}

export function Footer() {
	return (
		<footer className="baptism-footer">
			<div className="container-wide">
				<div className="footer-cols">
					<div className="footer-logo-col">
						<img src="/flogo.png" alt="The Baptism Site" />
					</div>
					{[
						['Explore', 'History', 'The Discovery', 'Online Tour', 'Authentication'],
						['Visitors', 'Opening Hours', 'What to Expect', 'Events', 'Book Your Trip'],
						['Commission', 'About Us', 'Our Purpose', 'Preservation', 'Donate'],
					].map(([heading, ...items]) => (
						<div key={heading} className="footer-nav-col">
							<h4>{heading}</h4>
							<ul>
								{items.map((item) => <li key={item}><a href="#baptism-experience">{item}</a></li>)}
							</ul>
						</div>
					))}
					<div className="footer-nav-col">
						<h4>Contact</h4>
						<p><a href="tel:+96253590360">+962 5 359 0360</a></p>
						<p><a href="mailto:info@baptism.jo">info@baptism.jo</a></p>
						<div className="baptism-socials">
							<a href="#" aria-label="Facebook" style={{ backgroundImage: 'url(/facebook.svg)' }} />
							<a href="#" aria-label="Instagram" style={{ backgroundImage: 'url(/instagram.svg)' }} />
							<a href="#" aria-label="Twitter" style={{ backgroundImage: 'url(/twitter.svg)' }} />
						</div>
					</div>
				</div>
				<div className="baptism-footer-bottom">
					<p>Copyright 2026 The Baptism Site Commission. All rights reserved.</p>
					<div><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="#">Sitemap</a></div>
				</div>
			</div>
		</footer>
	)
}

export function BookingStepIndicator({
	currentStep,
	submitted,
	items = stepItems,
}: {
	currentStep: number
	submitted: boolean
	items?: typeof stepItems
}) {
	return (
		<div className="baptism-step-grid">
			{items.map((step, index) => {
				const number = index + 1
				const done = submitted || currentStep > number
				const active = !submitted && currentStep === number
				return (
					<div key={step.label} className={`baptism-step-card ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
						<div className="baptism-step-dot">
							{done ? (
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="20 6 9 17 4 12" />
								</svg>
							) : number}
						</div>
						<p>{step.label}</p>
						<span>{step.desc}</span>
					</div>
				)
			})}
		</div>
	)
}

export function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
	return (
		<div className="fieldcol">
			<label>{label} {required ? <span>*</span> : null}</label>
			{children}
			{error ? <p className="baptism-field-error">{error}</p> : null}
		</div>
	)
}

export default function BaptismTripPlanner() {
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
	const isDirectBookingRoute = pathname.startsWith('/baptism/book/general') || pathname.startsWith('/baptism/guided-tours/')
	const minStep = isDirectBookingRoute ? 2 : 1
	const activeStep = Math.max(currentStep, minStep)
	const indicatorItems = isDirectBookingRoute ? stepItems.slice(1) : stepItems
	const indicatorStep = isDirectBookingRoute ? Math.max(activeStep - 1, 1) : activeStep
	const selectedExperience = experiences.find((item) => item.id === formData.baptismExperience) || experiences[0]
	const guestCount = Math.max(Number(formData.baptismGuests || 0), 0)
	const estimatedTotal = selectedExperience.price.includes('Request')
		? 'Coordinator quote'
		: `JOD ${(guestCount * Number(selectedExperience.price.replace(/[^\d.]/g, '') || 0)).toFixed(2)}`
	const cardDigits = String(formData.baptismCardNumber || '').replace(/\s/g, '')

	useEffect(() => {
		document.documentElement.dir = 'ltr'
		document.documentElement.lang = 'en'
	}, [])

	useEffect(() => {
		if (!isDirectBookingRoute) return
		const defaultExperience = pathname.startsWith('/baptism/guided-tours/') ? 'biblical-package' : 'general-visit'
		if (formData.baptismExperience !== defaultExperience) {
			setField('baptismExperience', defaultExperience)
		}
		if (currentStep < 2) {
			setCurrentStep(2)
		}
	}, [currentStep, formData.baptismExperience, isDirectBookingRoute, pathname, setCurrentStep, setField])

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
			if (tool === 'submitForm' && activeStep === 5) handleSubmit()
			if (tool === 'scrollToBaptismSection') {
				const id = `baptism-${args.sectionId}`
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
				setTimeout(() => highlight(`#${id}`, 3), 120)
			}
		}

		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [activeStep, setCurrentStep, setField])

	const steps = useMemo(() => stepItems, [])

	const validateStep = (step: number) => {
		const nextErrors: Record<string, string> = {}
		if (step === 1 && !formData.baptismExperience) nextErrors.baptismExperience = 'Choose one experience.'
		if (step === 2) {
			if (!formData.baptismVisitDate) nextErrors.baptismVisitDate = 'Choose a visit date.'
			if (!formData.baptismVisitTime) nextErrors.baptismVisitTime = 'Choose an entry time.'
			if (!formData.baptismGuests) nextErrors.baptismGuests = 'Enter the number of guests.'
			if (!formData.baptismLanguage) nextErrors.baptismLanguage = 'Choose a guide language.'
			if (!formData.baptismPickup) nextErrors.baptismPickup = 'Choose a pickup option.'
		}
		if (step === 3) {
			if (!formData.baptismFullName) nextErrors.baptismFullName = 'Enter the lead traveler name.'
			if (!formData.baptismEmail) nextErrors.baptismEmail = 'Enter an email address.'
			if (!formData.baptismPhone) nextErrors.baptismPhone = 'Enter a phone number.'
			if (!formData.baptismNationality) nextErrors.baptismNationality = 'Choose a nationality.'
			if (!formData.baptismDateOfBirth) nextErrors.baptismDateOfBirth = 'Enter date of birth.'
		}
		if (step === 4) {
			if (!formData.baptismTermsAccepted) nextErrors.baptismTermsAccepted = 'Confirm the booking terms.'
			if (!formData.baptismConsentPolicy) nextErrors.baptismConsentPolicy = 'Accept the site policy.'
			if (!formData.baptismConsentPayment) nextErrors.baptismConsentPayment = 'Confirm payment responsibility.'
		}
		if (step === 5) {
			if (cardDigits.length < 16) nextErrors.baptismCardNumber = 'Enter a valid card number.'
			if (!formData.baptismCardName) nextErrors.baptismCardName = 'Enter cardholder name.'
			if (!formData.baptismCardExpiry) nextErrors.baptismCardExpiry = 'Enter expiry date.'
			if (!formData.baptismCardCvv) nextErrors.baptismCardCvv = 'Enter CVV.'
		}
		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	const handleNext = () => {
		if (!validateStep(activeStep)) return
		setCurrentStep(Math.min(activeStep + 1, 5))
		document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const handleBack = () => {
		setCurrentStep(Math.max(activeStep - 1, minStep))
		document.getElementById('baptism-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const handleSubmit = () => {
		if (!validateStep(5)) return
		setSubmitted(true)
	}

	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="innerbanner2" style={{ backgroundImage: 'url(/inner-banner8.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center">{isDirectBookingRoute ? selectedExperience.title : 'Book Your Trip'}</h1>
					</div>
				</div>
			</section>

			<section className="baptism-book-intro">
				<div className="container-mid">
					<div>
						<h2 className="ctitle2">{isDirectBookingRoute ? `${selectedExperience.title} Booking` : 'Book Your Trip'}</h2>
						<p>{isDirectBookingRoute ? 'Select your visit date, visitor details, confirmations, and demo payment information.' : 'Plan your visit to the Baptism Site of Jesus Christ, choose the experience that fits your group, and send a request for the visit team to confirm.'}</p>
					</div>
				</div>
			</section>

			<section id="baptism-booking" className="clssteps">
				<div className="container-mid">
					<BookingStepIndicator currentStep={indicatorStep} submitted={submitted} items={indicatorItems} />

					<div className="baptism-form-shell">
						<div className="baptism-form-main">
							{!submitted && activeStep === 1 && (
								<div>
									<div className="tabheading ctextinfo">
										<h2 className="font30">Select Experience</h2>
										<p>Choose the visit package you want to prepare.</p>
									</div>
									<div className="experience-grid">
										{experiences.map((experience) => {
											const selected = formData.baptismExperience === experience.id
											return (
												<button
													key={experience.id}
													data-experience={experience.id}
													onClick={() => setField('baptismExperience', experience.id)}
													className={`expinner ${selected ? 'expinner-selected' : ''}`}
												>
													<div className="imgcol"><img src={experience.image} alt={experience.title} /></div>
													<div className="ctextinfo2">
														<h3 className="font30">{experience.title}</h3>
														<p>{experience.copy}</p>
														<ul className="cpoints">
															{experience.points.map((point) => <li key={point}>{point}</li>)}
														</ul>
														<p className="sfprice">Starting from <span>{experience.price}</span></p>
													</div>
												</button>
											)
										})}
									</div>
									{errors.baptismExperience ? <p className="baptism-field-error">{errors.baptismExperience}</p> : null}
								</div>
							)}

							{!submitted && activeStep === 2 && (
								<div>
									<div className="tabheading ctextinfo">
										<h2 className="font30">Date & Trip Details</h2>
										<p>Select the day, group size, language, and pickup preference.</p>
									</div>
									<div className="clsform form-grid">
										<Field label="Visit date" required error={errors.baptismVisitDate}>
											<input name="baptismVisitDate" type="date" className="custfield" value={formData.baptismVisitDate} onChange={(e) => setField('baptismVisitDate', e.target.value)} />
										</Field>
										<Field label="Entry time" required error={errors.baptismVisitTime}>
											<select name="baptismVisitTime" className="custfield" value={formData.baptismVisitTime} onChange={(e) => setField('baptismVisitTime', e.target.value)}>
												<option value="">Choose time</option>
												{timeSlots.map((slot) => <option key={slot} value={slot}>{slot.replace('-', ' - ')}</option>)}
											</select>
										</Field>
										<Field label="Guests" required error={errors.baptismGuests}>
											<input name="baptismGuests" type="number" min="1" className="custfield" value={formData.baptismGuests} onChange={(e) => setField('baptismGuests', e.target.value)} placeholder="2" />
										</Field>
										<Field label="Guide language" required error={errors.baptismLanguage}>
											<select name="baptismLanguage" className="custfield" value={formData.baptismLanguage} onChange={(e) => setField('baptismLanguage', e.target.value)}>
												<option value="">Choose language</option>
												<option value="english">English</option>
												<option value="french">French</option>
												<option value="spanish">Spanish</option>
												<option value="italian">Italian</option>
												<option value="arabic">Arabic</option>
											</select>
										</Field>
										<Field label="Pickup option" required error={errors.baptismPickup}>
											<select name="baptismPickup" className="custfield" value={formData.baptismPickup} onChange={(e) => setField('baptismPickup', e.target.value)}>
												<option value="">Choose pickup</option>
												<option value="own-transport">I will arrive by my own transport</option>
												<option value="amman-hotel">Pickup from Amman hotel</option>
												<option value="dead-sea-hotel">Pickup from Dead Sea hotel</option>
												<option value="airport">Airport transfer request</option>
											</select>
										</Field>
										<div className="baptism-span-2">
											<Field label="Add-ons">
												<input name="baptismAddOns" className="custfield" value={formData.baptismAddOns} onChange={(e) => setField('baptismAddOns', e.target.value)} placeholder="Baptism renewal, private prayer time, Madaba stop..." />
											</Field>
										</div>
									</div>
								</div>
							)}

							{!submitted && activeStep === 3 && (
								<div>
									<div className="tabheading ctextinfo">
										<h2 className="font30">Visitor Details</h2>
										<p>Add the lead visitor information for coordinator follow-up.</p>
									</div>
									<div className="clsform form-grid">
										<Field label="Lead traveler full name" required error={errors.baptismFullName}>
											<input name="baptismFullName" className="custfield" value={formData.baptismFullName} onChange={(e) => setField('baptismFullName', e.target.value)} placeholder="Maria Thompson" />
										</Field>
										<Field label="Nationality" required error={errors.baptismNationality}>
											<select name="baptismNationality" className="custfield" value={formData.baptismNationality} onChange={(e) => setField('baptismNationality', e.target.value)}>
												<option value="">Select nationality</option>
												{nationalities.map((nationality) => <option key={nationality} value={nationality}>{nationality}</option>)}
											</select>
										</Field>
										<Field label="Email" required error={errors.baptismEmail}>
											<input name="baptismEmail" type="email" className="custfield" value={formData.baptismEmail} onChange={(e) => setField('baptismEmail', e.target.value)} placeholder="maria@example.com" />
										</Field>
										<Field label="Phone" required error={errors.baptismPhone}>
											<input name="baptismPhone" type="tel" className="custfield" value={formData.baptismPhone} onChange={(e) => setField('baptismPhone', e.target.value)} placeholder="+1 555 0100" />
										</Field>
										<Field label="Date of birth" required error={errors.baptismDateOfBirth}>
											<input name="baptismDateOfBirth" type="date" className="custfield" value={formData.baptismDateOfBirth} onChange={(e) => setField('baptismDateOfBirth', e.target.value)} />
										</Field>
										<div className="baptism-span-2">
											<Field label="Accessibility requirements">
												<textarea name="baptismAccessibilityNeeds" className="custfield" value={formData.baptismAccessibilityNeeds} onChange={(e) => setField('baptismAccessibilityNeeds', e.target.value)} placeholder="Wheelchair, ramp access, elderly visitors, or other mobility needs." />
											</Field>
										</div>
										<div className="baptism-span-2 baptism-option-box">
											<label>
												<input name="baptismWantsClubCar" type="checkbox" checked={formData.baptismWantsClubCar} onChange={(e) => setField('baptismWantsClubCar', e.target.checked)} />
												<span>Club Car add-on (JOD 30.00)</span>
											</label>
											<p>Optional transport support inside the site for visitors who prefer a shorter walking route.</p>
										</div>
										<div className="baptism-span-2">
											<Field label="Other notes">
												<textarea name="baptismNotes" className="custfield" value={formData.baptismNotes} onChange={(e) => setField('baptismNotes', e.target.value)} placeholder="Accessibility needs, clergy support, arrival details, or spiritual focus for the tour." />
											</Field>
										</div>
									</div>
								</div>
							)}

							{!submitted && activeStep === 4 && (
								<div className="rcconts">
									<div className="tabheading ctextinfo">
										<h2 className="font30">Review & Confirm</h2>
										<p>Confirm the captured trip details before submitting the request.</p>
									</div>
									<div className="rctextrow">
										<div className="ctextinfo2">
											<h3 className="font30">Booking Summary</h3>
											<div className="ctextrow2">
												{[
													['Experience', selectedExperience.title],
													['Visit date', formData.baptismVisitDate],
													['Entry time', formData.baptismVisitTime],
													['Guests', formData.baptismGuests],
													['Language', formData.baptismLanguage],
													['Pickup', formData.baptismPickup],
													['Lead traveler', formData.baptismFullName],
													['Nationality', formData.baptismNationality],
													['Date of birth', formData.baptismDateOfBirth],
													['Club Car', formData.baptismWantsClubCar ? 'Added' : 'No'],
												].map(([label, value]) => (
													<div key={label} className="ctexts">
														<h4>{label}</h4>
														<p>{value || 'Not provided'}</p>
													</div>
												))}
											</div>
											<div className="stprice"><p>Estimated total <span>{estimatedTotal}</span></p></div>
										</div>
									</div>
									<div className="clschecklists">
										<div className="checkboxcol">
											<input id="baptismTermsAccepted" name="baptismTermsAccepted" type="checkbox" checked={formData.baptismTermsAccepted} onChange={(e) => setField('baptismTermsAccepted', e.target.checked)} />
											<label htmlFor="baptismTermsAccepted">I confirm that the visitor details, date, time, and number of guests are correct.</label>
										</div>
										<div className="checkboxcol">
											<input id="baptismConsentPolicy" name="baptismConsentPolicy" type="checkbox" checked={formData.baptismConsentPolicy} onChange={(e) => setField('baptismConsentPolicy', e.target.checked)} />
											<label htmlFor="baptismConsentPolicy">I agree to follow site instructions, opening hours, ticket rules, and visitor policies.</label>
										</div>
										<div className="checkboxcol">
											<input id="baptismConsentPayment" name="baptismConsentPayment" type="checkbox" checked={formData.baptismConsentPayment} onChange={(e) => setField('baptismConsentPayment', e.target.checked)} />
											<label htmlFor="baptismConsentPayment">I understand the amount due is based on visitor nationality, age, selected package, and optional add-ons.</label>
										</div>
										{errors.baptismTermsAccepted ? <p className="baptism-field-error">{errors.baptismTermsAccepted}</p> : null}
										{errors.baptismConsentPolicy ? <p className="baptism-field-error">{errors.baptismConsentPolicy}</p> : null}
										{errors.baptismConsentPayment ? <p className="baptism-field-error">{errors.baptismConsentPayment}</p> : null}
									</div>
								</div>
							)}

							{!submitted && activeStep === 5 && (
								<div>
									<div className="tabheading ctextinfo">
										<h2 className="font30">Payment</h2>
										<p>Enter mock payment details to complete the demo checkout.</p>
									</div>
									<div className="baptism-payment-grid">
										<div className="baptism-card-preview">
											<span>{cardDigits.startsWith('4') ? 'VISA' : cardDigits.startsWith('5') ? 'MC' : 'CARD'}</span>
											<p>{formData.baptismCardNumber || '•••• •••• •••• ••••'}</p>
											<div><small>CARDHOLDER</small><strong>{formData.baptismCardName || 'YOUR NAME'}</strong></div>
											<div><small>EXPIRES</small><strong>{formData.baptismCardExpiry || 'MM/YY'}</strong></div>
										</div>
										<div className="clsform">
											<Field label="Card number" required error={errors.baptismCardNumber}>
												<input name="baptismCardNumber" inputMode="numeric" className="custfield" value={formData.baptismCardNumber} onChange={(e) => setField('baptismCardNumber', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())} placeholder="1234 5678 9012 3456" />
											</Field>
											<Field label="Cardholder name" required error={errors.baptismCardName}>
												<input name="baptismCardName" className="custfield" value={formData.baptismCardName} onChange={(e) => setField('baptismCardName', e.target.value)} placeholder="As it appears on the card" />
											</Field>
											<div className="form-grid">
												<Field label="Expiry date" required error={errors.baptismCardExpiry}>
													<input name="baptismCardExpiry" className="custfield" value={formData.baptismCardExpiry} onChange={(e) => setField('baptismCardExpiry', e.target.value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2'))} placeholder="MM/YY" />
												</Field>
												<Field label="CVV / CVC" required error={errors.baptismCardCvv}>
													<input name="baptismCardCvv" inputMode="numeric" className="custfield" value={formData.baptismCardCvv} onChange={(e) => setField('baptismCardCvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" />
												</Field>
											</div>
										</div>
									</div>
								</div>
							)}

							{submitted && (
								<div className="baptism-success">
									<CheckCircle />
									<h2>Trip request received</h2>
									<p>Your Baptism Site journey has been prepared. A visit coordinator will confirm availability, transport, and any baptism-renewal support.</p>
									<strong>BSC-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</strong>
								</div>
							)}

							{!submitted && (
								<div className="baptism-button-row">
									{activeStep > minStep ? <button className="bbtn2" onClick={handleBack}>Back</button> : <span />}
									{activeStep < 5 ? (
										<button className="cbtn1" onClick={handleNext}>Next</button>
									) : (
										<button className="cbtn1 cbtn2" onClick={handleSubmit}>Pay & Complete Booking</button>
									)}
								</div>
							)}
						</div>

						<aside className="baptism-summary-panel">
							<img src={selectedExperience.image} alt={selectedExperience.title} />
							<p>Selected Journey</p>
							<h3>{selectedExperience.title}</h3>
							<span>{selectedExperience.copy}</span>
							<div>
								<div><small>Base price</small><strong>{selectedExperience.price}</strong></div>
								<div><small>Guests</small><strong>{formData.baptismGuests || '0'}</strong></div>
								<div><small>Entry time</small><strong>{formData.baptismVisitTime || '-'}</strong></div>
								<div><small>Estimated total</small><strong>{estimatedTotal}</strong></div>
							</div>
						</aside>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
