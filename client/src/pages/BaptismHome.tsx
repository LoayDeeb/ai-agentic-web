import { useState } from 'react'
import { Footer, Header } from './BaptismTripPlanner'

const recognitionCards = [
	{
		title: 'A Living Christian Tradition',
		copy: 'Pilgrims have gathered beside the Jordan River for centuries to remember the baptism of Jesus Christ.',
	},
	{
		title: 'World Heritage Landscape',
		copy: 'The site preserves churches, caves, pools, and pathways within the recognized Bethany Beyond the Jordan area.',
	},
	{
		title: 'Pilgrimage Destination',
		copy: 'The route welcomes individuals, families, churches, and tour groups for prayer, discovery, and reflection.',
	},
]

const timelineItems = [
	['1st century AD', 'Jesus is baptized by John in the Jordan River area.'],
	['Byzantine era', 'Churches, chapels, caves, and pilgrim stations grow across the holy landscape.'],
	['Modern rediscovery', 'Archaeology and conservation reopen the Baptism Site for pilgrims and visitors.'],
]

const historyCards = [
	['Churches', 'Ancient remains trace worship, baptism, and pilgrimage across the centuries.'],
	['Pilgrim Route', 'A sacred walking route links the visitor path, springs, churches, and river.'],
	['Jordan River', 'The river remains the spiritual center of the visit and the place of prayer.'],
]

const tourPlaces = [
	['Elijah Hill', 'A historic hill associated with prophetic tradition and early Christian memory.', '/elijah-hill.webp'],
	['Ancient Pool', 'Archaeological pools and church remains show how baptism was practiced here.', '/ancient-pool.webp'],
	["John's Spring", 'A quiet landmark connected to John the Baptist and the pilgrim route.', '/john-spring.webp'],
	['Pilgrims Station', 'The visitor arrival point for guided walks toward the Jordan River.', '/pilgrims-station.webp'],
	['Churches and Chapels', 'Sacred ruins across the landscape preserve the story of worship here.', '/bg4.webp'],
	['Jordan River Path', 'The final walking approach toward prayer, reflection, and the riverbank.', '/video-img1.webp'],
]

const routePlaces = ['Visitor Center', 'Elijah Hill', "John's Spring", 'Ancient Pools', 'Jordan River']

function LocationMark() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
			<circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	)
}

export default function BaptismHome() {
	const [videoOpen, setVideoOpen] = useState(false)

	return (
		<div className="baptism-site-page baptism-home-original">
			<Header />

			<section id="baptism-hero" className="home-hero">
				<img className="home-hero-video" src="/hero-bg1.webp" alt="The Baptism Site of Jesus Christ" />
				<div className="home-hero-gradient" />
				<div className="home-hero-radial" />
				<div className="home-hero-content">
					<div className="home-hero-eyebrow">The Baptism Site of Jesus Christ</div>
					<h1 className="home-hero-title">Bethany Beyond the Jordan</h1>
					<div className="home-hero-quote">"These things were done in Bethany beyond the Jordan, where John was baptizing."</div>
					<div className="home-hero-citation">(John 1:28)</div>
					<div className="home-hero-actions">
						<a className="home-hero-button" href="#baptism-history">Discover History</a>
						<a className="home-hero-button" href="/baptism/book">Plan Your Visit</a>
					</div>
				</div>
				<a className="home-hero-scroll" href="#baptism-experience" aria-label="Scroll to introduction">
					<span />
				</a>
			</section>

			<section id="baptism-experience" className="about-video-sec p100">
				<div className="container-mid">
					<div className="home-video-flex">
						<div className="home-video-image">
							<img src="/video-img1.webp" alt="Pilgrims walking through the Baptism Site" />
							<button className="home-video-play" type="button" onClick={() => setVideoOpen(true)} aria-label="Play Baptism Site video">
								<span />
							</button>
						</div>
						<div className="home-video-copy">
							<p className="subtitle">A sacred place to visit</p>
							<h2 className="ctitle2">Where faith, history, and the Jordan River meet</h2>
							<p>
								The Baptism Site welcomes visitors into the landscape where Christian memory, archaeology, and pilgrimage come together.
								Plan a clear visit through the holy route, the ancient churches, the springs, and the river itself.
							</p>
							<a className="tbtn" href="/baptism/guided-tours">View Guided Tours</a>
						</div>
					</div>
				</div>
			</section>

			<section className="home-recognition-section" style={{ backgroundImage: 'url(/recog-bg.jpg)' }}>
				<div className="container-mid">
					<div className="home-recognition-head">
						<p className="subtitle">Recognition</p>
						<h2 className="ctitle2">A world heritage pilgrimage landscape</h2>
					</div>
					<div className="home-recognition-grid">
						{recognitionCards.map((card, index) => (
							<div className="home-recognition-card" key={card.title}>
								<div className="home-recognition-icon">{index + 1}</div>
								<h3>{card.title}</h3>
								<p>{card.copy}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="baptism-history" className="home-history-section p100">
				<div className="container-mid">
					<div className="home-history-layout">
						<div className="home-history-copy">
							<p className="subtitle">History</p>
							<h2 className="ctitle2">A place of prophets, baptism, and pilgrimage</h2>
							<p>
								The site preserves a layered story: biblical tradition, early Christian worship, Byzantine pilgrimage, archaeological discovery,
								and the modern visitor journey through Bethany Beyond the Jordan.
							</p>
							<div className="home-history-timeline">
								{timelineItems.map(([period, copy]) => (
									<div className="home-history-time" key={period}>
										<strong>{period}</strong>
										<span>{copy}</span>
									</div>
								))}
							</div>
						</div>
						<div className="home-history-map">
							<img src="/map1.svg" alt="Baptism Site route map" />
						</div>
					</div>
					<div className="home-history-grid">
						{historyCards.map(([title, copy]) => (
							<a className="home-history-card" href="/baptism/guided-tours" key={title}>
								<h3>{title}</h3>
								<p>{copy}</p>
								<span>Explore &gt;</span>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="home-arch-section">
				<div className="container-mid home-arch-layout">
					<div className="home-arch-collage">
						<img className="home-arch-main" src="/ancient-pool.webp" alt="Ancient baptism pools" />
						<img className="home-arch-small" src="/video-img1.webp" alt="Baptism Site archaeology path" />
					</div>
					<div className="home-arch-copy">
						<p className="subtitle">Archaeology</p>
						<h2 className="ctitle2">A preserved landscape of churches, pools, and caves</h2>
						<p>
							Archaeological remains help visitors see how the holy place was used by generations of pilgrims. The guided route connects
							the discoveries into one clear experience.
						</p>
						<a className="tbtn" href="/baptism/book">Book a Visit</a>
					</div>
				</div>
			</section>

			<section className="home-tour-section" style={{ backgroundImage: 'url(/holy-route-bg.jpg)' }}>
				<div className="container-mid">
					<div className="home-tour-head">
						<p className="subtitle">Virtual route</p>
						<h2 className="ctitle2">Explore the main landmarks</h2>
					</div>
					<div className="home-tour-grid">
						{tourPlaces.map(([title, copy, image]) => (
							<a className="home-tour-card" href="/baptism/guided-tours/4" key={title}>
								<img src={image} alt={title} />
								<div>
									<h3>{title}</h3>
									<p>{copy}</p>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="home-info-section p100">
				<div className="container-mid home-info-grid">
					<div className="home-info-card">
						<p className="subtitle">Visits</p>
						<h2>General Visits and Tours</h2>
						<p>Plan an individual, family, or group visit through the Baptism Site route and the main heritage landmarks.</p>
						<a className="tbtn" href="/baptism/book/general">Start Booking</a>
					</div>
					<div className="home-info-card">
						<p className="subtitle">Prayer</p>
						<h2>Mass and Christian Events</h2>
						<p>Request a religious service, church group visit, or special Christian event at the Baptism Site.</p>
						<a className="tbtn" href="/baptism/religious-service">Request Service</a>
					</div>
				</div>
			</section>

			<section className="home-route-section" style={{ backgroundImage: 'url(/holy-route-bg.jpg)' }}>
				<div className="container-mid">
					<div className="home-route-head">
						<p className="subtitle">Holy route</p>
						<h2 className="ctitle2">Walk from arrival to the Jordan River</h2>
					</div>
					<div className="home-route-grid">
						{routePlaces.map((place, index) => (
							<div className={`home-route-card ${index === routePlaces.length - 1 ? 'active' : ''}`} key={place}>
								<LocationMark />
								<span>{String(index + 1).padStart(2, '0')}</span>
								<h3>{place}</h3>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="home-scripture-section">
				<div className="container-mid">
					<p>And a voice from heaven said, This is my beloved Son, with whom I am well pleased.</p>
					<span>Matthew 3:17</span>
				</div>
			</section>

			{videoOpen && (
				<div className="video-modal" role="dialog" aria-modal="true" aria-label="Baptism Site video">
					<button type="button" className="video-modal-close" onClick={() => setVideoOpen(false)} aria-label="Close video">x</button>
					<div className="video-modal-frame">
						<img src="/video-img1.webp" alt="Pilgrims at the Baptism Site" />
					</div>
				</div>
			)}

			<Footer />
		</div>
	)
}
