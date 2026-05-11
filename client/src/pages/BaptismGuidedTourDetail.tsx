import { Link, useParams } from 'react-router-dom'
import { Footer, Header } from './BaptismTripPlanner'
import { getBaptismGuidedItinerary } from './baptismItineraryData'

function dayLabel(count: number) {
	return count === 1 ? 'Day' : 'Days'
}

export default function BaptismGuidedTourDetail() {
	const { id } = useParams()
	const itinerary = getBaptismGuidedItinerary(id)

	return (
		<div style={{ fontFamily: "'Inter', sans-serif" }}>
			<Header />

			<section className="innerbanner2" style={{ backgroundImage: 'url(/bg4.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<p style={{ color: '#A58D67', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
							<Link to="/baptism/guided-tours" style={{ color: '#A58D67', textDecoration: 'none' }}>
								Guided tours
							</Link>
							{' '}/
						</p>
						<h1 className="ctitle2 text-center" style={{ color: '#fff', fontFamily: "'Merriweather', serif", fontSize: 36, fontWeight: 700, textAlign: 'left' }}>
							{itinerary.title}
						</h1>
					</div>
				</div>
			</section>

			<section style={{ backgroundColor: '#083B50', padding: 0 }}>
				<div className="midcontainer">
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
						<div style={{ padding: '28px 40px 28px 0', marginRight: 40, borderRight: '1px solid rgba(255,255,255,0.12)' }}>
							<p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
								Duration
							</p>
							<p style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: "'Merriweather', serif", margin: 0 }}>
								{itinerary.days.length} {dayLabel(itinerary.days.length)}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section data-itinerary-detail={itinerary.id} style={{ backgroundColor: '#E5E2DD', padding: '72px 0 100px' }}>
				<div className="midcontainer">
					<div className="baptism-guided-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
						<div>
							{itinerary.description ? (
								<div style={{ marginBottom: 56 }}>
									<h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 22, color: '#083B50', fontWeight: 700, marginBottom: 18 }}>
										About this itinerary
									</h2>
									<p style={{ color: '#6E6E6E', fontSize: 16, lineHeight: '28px', margin: 0, whiteSpace: 'pre-line' }}>
										{itinerary.description}
									</p>
								</div>
							) : null}

							<div>
								<h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 22, color: '#083B50', fontWeight: 700, marginBottom: 28 }}>
									Itinerary
								</h2>
								<div style={{ position: 'relative' }}>
									<div style={{ position: 'absolute', left: 23, top: 0, bottom: 0, width: 2, backgroundColor: '#D6CFC4' }} />

									<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
										{itinerary.days.map((day, index) => (
											<div key={`${day.title}-${index}`} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 24, paddingBottom: index < itinerary.days.length - 1 ? 36 : 0 }}>
												<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
													<div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#083B50', border: '3px solid #E5E2DD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
														<span style={{ color: '#A58D67', fontFamily: "'Merriweather', serif", fontSize: 13, fontWeight: 700 }}>
															{index + 1}
														</span>
													</div>
												</div>

												<div style={{ paddingTop: 10 }}>
													<h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 16, color: '#083B50', fontWeight: 700, margin: '0 0 10px' }}>
														{day.title}
													</h3>
													<p style={{ color: '#6E6E6E', fontSize: 15, lineHeight: '26px', margin: 0, whiteSpace: 'pre-line' }}>
														{day.description}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div style={{ position: 'sticky', top: 32 }}>
							<div style={{ background: '#fff', borderRadius: 4, padding: '36px 32px', boxShadow: '0 4px 24px rgba(8,59,80,0.10)' }}>
								<h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 18, color: '#083B50', fontWeight: 700, marginBottom: 6 }}>
									Request this tour
								</h3>
								<p style={{ color: '#6E6E6E', fontSize: 14, lineHeight: '22px', marginBottom: 24 }}>
									Send your preferred date and traveler details. Tour operators can reply with suitable offers for this itinerary.
								</p>

								<Link
									to={`/baptism/guided-tours/${itinerary.id}/request`}
									style={{ display: 'block', textAlign: 'center', backgroundColor: '#083B50', color: '#fff', padding: '16px 24px', borderRadius: 3, fontWeight: 600, fontSize: 15, textDecoration: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
								>
									Request offers
								</Link>
								<p style={{ textAlign: 'center', color: '#9E9E9E', fontSize: 12, margin: '10px 0 0' }}>
									Operators will review your trip details.
								</p>
							</div>

							<Link to="/baptism/guided-tours" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6E6E6E', fontSize: 14, textDecoration: 'none', marginTop: 20 }}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
									<line x1="19" y1="12" x2="5" y2="12" />
									<polyline points="12 19 5 12 12 5" />
								</svg>
								All guided tours
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
