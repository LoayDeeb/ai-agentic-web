import { Footer, Header } from './BaptismTripPlanner'
import { baptismGuidedItineraries } from './baptismItineraryData'

function dayLabel(count: number) {
	return count === 1 ? 'Day' : 'Days'
}

function tourTypeLabel(type: string) {
	if (type === 'group') return 'Group'
	if (type === 'private') return 'Private'
	if (type === 'custom') return 'Custom'
	return type
}

export default function BaptismGuidedTours() {
	return (
		<div style={{ fontFamily: "'Inter', sans-serif" }}>
			<Header />

			<section className="innerbanner2" style={{ backgroundImage: 'url(/bg4.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center" style={{ color: '#fff', fontFamily: "'Merriweather', serif", fontSize: 40, fontWeight: 700 }}>
							Biblical Packages
						</h1>
					</div>
				</div>
			</section>

			<section style={{ backgroundColor: '#083B50', padding: '56px 0 52px' }}>
				<div className="midcontainer">
					<div style={{ maxWidth: 700 }}>
						<h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 26, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
							Guided tours and itineraries
						</h2>
						<p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: '28px', margin: 0 }}>
							Our biblical packages bring you through Bethany Beyond the Jordan and the surrounding biblical landscape - each itinerary crafted to deepen your connection with the history, faith, and spirit of this UNESCO World Heritage Site.
						</p>
					</div>
				</div>
			</section>

			<section style={{ backgroundColor: '#E5E2DD', padding: '80px 0 100px' }}>
				<div className="midcontainer">
					<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
						{baptismGuidedItineraries.map((itin, idx) => (
							<a key={itin.id} href={`/baptism/guided-tours/${itin.id}`} style={{ textDecoration: 'none' }}>
								<div
									id={itin.id === 4 ? 'jordan-four-day' : `itinerary-${itin.id}`}
									data-itinerary={itin.id === 4 ? 'jordan-four-day' : `itinerary-${itin.id}`}
									style={{
										background: '#fff',
										borderRadius: 4,
										overflow: 'hidden',
										display: 'grid',
										gridTemplateColumns: '64px 1fr auto',
										alignItems: 'stretch',
										boxShadow: '0 2px 12px rgba(8,59,80,0.07)',
										transition: 'box-shadow 0.2s, transform 0.2s',
										cursor: 'pointer',
									}}
								>
									<div style={{ backgroundColor: '#083B50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<span style={{ fontFamily: "'Merriweather', serif", fontSize: 22, fontWeight: 700, color: '#A58D67' }}>
											{String(idx + 1).padStart(2, '0')}
										</span>
									</div>

									<div style={{ padding: '28px 32px' }}>
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
											<span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, backgroundColor: '#083B50', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 3, letterSpacing: '0.04em' }}>
												{itin.days.length} {dayLabel(itin.days.length)}
											</span>
											<span style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(165,141,103,0.25)', color: '#A58D67', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 3, letterSpacing: '0.04em' }}>
												{tourTypeLabel(itin.tourType)}
											</span>
										</div>

										<h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 20, color: '#083B50', fontWeight: 700, margin: '0 0 10px' }}>
											{itin.title}
										</h3>

										{itin.description ? (
											<p style={{ color: '#6E6E6E', fontSize: 15, lineHeight: '24px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
												{itin.description}
											</p>
										) : null}

										<div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
											{itin.days.slice(0, 5).map((day, dayIndex) => (
												<span key={day.title} style={{ fontSize: 11, color: '#6E6E6E', backgroundColor: '#F7F5F2', border: '1px solid #E5E2DD', padding: '3px 9px', borderRadius: 2 }}>
													Day {dayIndex + 1}: {day.title.replace(/^Day\s*\d+\s*(?:-|\u2013)\s*/i, '')}
												</span>
											))}
										</div>
									</div>

									<div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', borderLeft: '1px solid #F0ECE6', minWidth: 160 }}>
										<div>
											{itin.price ? (
												<>
													<p style={{ color: '#A58D67', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px', textAlign: 'right' }}>
														Starting from
													</p>
													<p style={{ fontFamily: "'Merriweather', serif", fontSize: 22, color: '#083B50', fontWeight: 700, margin: 0, textAlign: 'right' }}>
														{itin.price}
													</p>
												</>
											) : null}
										</div>
										<div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#083B50', fontSize: 13, fontWeight: 600 }}>
											View details
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
												<line x1="5" y1="12" x2="19" y2="12" />
												<polyline points="12 5 19 12 12 19" />
											</svg>
										</div>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
