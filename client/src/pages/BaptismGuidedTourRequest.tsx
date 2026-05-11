import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookingStepIndicator, Footer, Header } from './BaptismTripPlanner'
import { getBaptismGuidedItinerary } from './baptismItineraryData'

type Visitor = {
	name: string
	nationality: string
	dateOfBirth: string
}

const defaultVisitor: Visitor = { name: 'Malak', nationality: 'American', dateOfBirth: '1985-12-02' }
const emptyVisitor = (): Visitor => ({ ...defaultVisitor })

const inputStyle: React.CSSProperties = {
	width: '100%',
	boxSizing: 'border-box',
	padding: '11px 13px',
	border: '1.5px solid #D6D2CC',
	borderRadius: 6,
	fontSize: 14,
	color: '#083B50',
	background: '#FAFAF9',
	outline: 'none',
	fontFamily: "'Inter', sans-serif",
	transition: 'border-color 0.2s',
}

function focus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
	e.currentTarget.style.borderColor = '#083B50'
}

function blur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
	e.currentTarget.style.borderColor = '#D6D2CC'
}

export default function BaptismGuidedTourRequest() {
	const { id } = useParams()
	const itinerary = getBaptismGuidedItinerary(id)
	const [preferredDate, setPreferredDate] = useState('')
	const [groupSize, setGroupSize] = useState(1)
	const [accessibilityRequired, setAccessibility] = useState(false)
	const [visitors, setVisitors] = useState<Visitor[]>([emptyVisitor()])
	const [error, setError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		setVisitors((prev) => {
			if (groupSize > prev.length) {
				return [...prev, ...Array(groupSize - prev.length).fill(null).map(emptyVisitor)]
			}
			return prev.slice(0, groupSize)
		})
	}, [groupSize])

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!preferredDate) {
			setError('Please choose your preferred date.')
			return
		}
		setError(null)
		setSubmitting(true)
		window.setTimeout(() => {
			setSubmitting(false)
			setSubmitted(true)
		}, 700)
	}

	const steps = [
		{ label: 'Request Details', desc: 'Trip basics' },
		{ label: 'Operator Offers', desc: 'Compare replies' },
		{ label: 'Confirm Tour', desc: 'Choose offer' },
	]

	return (
		<div style={{ fontFamily: "'Inter', sans-serif" }}>
			<Header />

			<section style={{ backgroundColor: '#083B50', padding: '64px 0 40px', textAlign: 'center' }}>
				<div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
					<p style={{ color: '#A58D67', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>
						Guided tour request
					</p>
					<h1 style={{ fontFamily: "'Merriweather', serif", fontSize: 30, color: '#fff', fontWeight: 700, margin: '0 0 10px' }}>
						{itinerary.title}
					</h1>
					<p style={{ color: '#B8C5CC', fontSize: 14, margin: 0 }}>
						Choose your preferred date, group size, and accessibility needs so operators can send suitable offers.
					</p>
				</div>
			</section>

			<section data-guided-request={itinerary.id} style={{ backgroundColor: '#E5E2DD', padding: '52px 24px 64px' }}>
				<div style={{ maxWidth: 760, margin: '0 auto' }}>
					<BookingStepIndicator currentStep={submitted ? 3 : 1} submitted={submitted} items={steps} />

					{submitted ? (
						<div style={{ background: '#fff', borderRadius: 12, padding: '56px 40px', boxShadow: '0 4px 20px rgba(8,59,80,0.08)', border: '1px solid #E5E2DD', textAlign: 'center' }}>
							<div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="20 6 9 17 4 12" />
								</svg>
							</div>
							<h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 22, color: '#083B50', fontWeight: 700, margin: '0 0 12px' }}>
								Request sent
							</h2>
							<p style={{ color: '#4A5568', fontSize: 15, lineHeight: '24px', margin: '0 0 6px', maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
								Your request for <strong>{itinerary.title}</strong> has been received.
							</p>
							<p style={{ color: '#6E6E6E', fontSize: 14, lineHeight: '22px', margin: '0 0 32px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
								Tour operators will review the request for {visitors[0].name} and prepare offers for your four-day Jordan visit.
							</p>
							<Link to="/baptism/guided-tours" style={{ color: '#A58D67', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
								Browse more tours
							</Link>
						</div>
					) : (
						<form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: '36px 40px', boxShadow: '0 4px 20px rgba(8,59,80,0.08)', border: '1px solid #E5E2DD' }}>
							{error ? (
								<div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '12px 16px', color: '#B91C1C', fontSize: 13, marginBottom: 24, display: 'flex', gap: 10 }}>
									{error}
								</div>
							) : null}

							<p style={{ fontSize: 11, fontWeight: 700, color: '#A58D67', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 18px' }}>
								Booking details
							</p>

							<div style={{ marginBottom: 20 }}>
								<label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#083B50', marginBottom: 7 }}>
									Preferred date <span style={{ color: '#EF4444' }}>*</span>
								</label>
								<input type="date" value={preferredDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setPreferredDate(e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
							</div>

							<div style={{ marginBottom: 28 }}>
								<label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#083B50', marginBottom: 7 }}>
									Number of visitors <span style={{ color: '#EF4444' }}>*</span>
								</label>
								<div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'fit-content', border: '1.5px solid #D6D2CC', borderRadius: 6, overflow: 'hidden', background: '#FAFAF9' }}>
									<button type="button" onClick={() => setGroupSize((value) => Math.max(1, value - 1))} style={{ padding: '10px 18px', fontSize: 18, fontWeight: 700, color: '#083B50', background: 'transparent', border: 'none', cursor: groupSize <= 1 ? 'not-allowed' : 'pointer', opacity: groupSize <= 1 ? 0.35 : 1, lineHeight: 1 }}>
										-
									</button>
									<span style={{ padding: '10px 20px', fontSize: 15, fontWeight: 700, color: '#083B50', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', minWidth: 56, textAlign: 'center' }}>
										{groupSize}
									</span>
									<button type="button" onClick={() => setGroupSize((value) => Math.min(100, value + 1))} style={{ padding: '10px 18px', fontSize: 18, fontWeight: 700, color: '#083B50', background: 'transparent', border: 'none', cursor: groupSize >= 100 ? 'not-allowed' : 'pointer', opacity: groupSize >= 100 ? 0.35 : 1, lineHeight: 1 }}>
										+
									</button>
								</div>
							</div>

							<div style={{ marginTop: 8, marginBottom: 20 }}>
								<label onClick={() => setAccessibility((value) => !value)} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', border: `1.5px solid ${accessibilityRequired ? '#083B50' : '#E0D9CE'}`, borderRadius: 8, padding: '16px 18px', background: accessibilityRequired ? '#F0F4F7' : '#FAFAF9', transition: 'all 0.2s', userSelect: 'none' }}>
									<div style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 2, border: `2px solid ${accessibilityRequired ? '#083B50' : '#C0B8B0'}`, background: accessibilityRequired ? '#083B50' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
										{accessibilityRequired ? (
											<svg width="11" height="9" viewBox="0 0 11 9" fill="none">
												<path d="M1 4L4 7L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										) : null}
									</div>
									<div>
										<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
											<span style={{ fontSize: 14, fontWeight: 700, color: '#083B50' }}>Accessibility support</span>
											<span style={{ fontSize: 12, color: '#9E9E9E', fontWeight: 400 }}>Optional</span>
										</div>
										<p style={{ fontSize: 13, color: '#6E6E6E', margin: 0, lineHeight: '20px' }}>
											Let operators know if the group needs mobility support, special access, or extra assistance.
										</p>
									</div>
								</label>
							</div>

							<button type="submit" disabled={submitting} style={{ width: '100%', padding: 15, background: submitting ? '#C9B99A' : '#083B50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
								{submitting ? 'Submitting...' : 'Submit request ->'}
							</button>
							<p style={{ textAlign: 'center', color: '#9E9E9E', fontSize: 12, marginTop: 14, marginBottom: 0 }}>
								No sign-in required for this demo request.
							</p>
						</form>
					)}
				</div>
			</section>

			<Footer />
		</div>
	)
}
