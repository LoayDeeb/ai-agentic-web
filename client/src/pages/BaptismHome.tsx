import { CalendarDays, MapPin, Route, Users } from 'lucide-react'
import { Footer, Header, experiences } from './BaptismTripPlanner'

const routeStops = [
	['Elijah Hill', 'The ancient prayer hill connected to Elijah and early Christian pilgrimage.', '/elijah-hill.webp'],
	["John's Spring", 'A quiet landmark on the traditional route of John the Baptist.', '/john-spring.webp'],
	['Ancient Pools', 'Archaeological pools and churches that frame the baptismal landscape.', '/ancient-pool.webp'],
	['Pilgrims Station', 'The arrival point for prayer, reflection, and the Jordan River path.', '/pilgrims-station.webp'],
]

export default function BaptismHome() {
	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="baptism-home-hero" style={{ backgroundImage: 'url(/hero-bg1.webp)' }}>
				<div className="container-wide">
					<div className="baptism-home-hero-copy">
						<p>Bethany Beyond the Jordan</p>
						<h1>The Baptism Site of Jesus Christ</h1>
						<span>
							Plan a meaningful visit to the Jordan River, the pilgrim route, ancient churches, and the recognized World Heritage landscape.
						</span>
						<div className="baptism-home-actions">
							<a className="cbtn1" href="/baptism/book">Book Your Trip</a>
							<a className="bbtn2" href="/baptism/guided-tours">Explore Packages</a>
						</div>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="baptism-home-intro">
				<div className="container-mid baptism-home-two-col">
					<div className="ctextinfo">
						<h2 className="ctitle2">A sacred journey, planned clearly</h2>
						<p>
							The demo follows the original Baptism Site experience: discover the place, compare visit options, then book through the active trip form.
						</p>
						<div className="baptism-home-facts">
							<div><CalendarDays /><strong>Open daily</strong><span>Choose a timed visit</span></div>
							<div><Users /><strong>Individuals & groups</strong><span>Tourist, pilgrim, and church visits</span></div>
							<div><Route /><strong>Guided route</strong><span>Landmarks, churches, springs, and river access</span></div>
							<div><MapPin /><strong>Jordan River</strong><span>Bethany Beyond the Jordan</span></div>
						</div>
					</div>
					<div className="baptism-home-media">
						<img src="/video-img1.webp" alt="Baptism Site visitor path" />
					</div>
				</div>
			</section>

			<section className="baptism-home-packages">
				<div className="container-mid">
					<div className="baptism-section-head">
						<p>Trip planning</p>
						<h2 className="ctitle2">Choose your visit type</h2>
					</div>
					<div className="experience-grid">
						{experiences.map((experience) => (
							<a key={experience.id} className="expinner" href={experience.id === 'biblical-package' ? '/baptism/guided-tours' : experience.id === 'baptism-renewal' ? '/baptism/religious-service' : '/baptism/book/general'}>
								<div className="imgcol"><img src={experience.image} alt={experience.title} /></div>
								<div className="ctextinfo2">
									<h3 className="font30">{experience.title}</h3>
									<p>{experience.copy}</p>
									<p className="sfprice">Starting from <span>{experience.price}</span></p>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="baptism-route-section" style={{ backgroundImage: 'url(/holy-route-bg.jpg)' }}>
				<div className="container-mid">
					<div className="baptism-section-head light">
						<p>Holy route</p>
						<h2 className="ctitle2">Walk the main landmarks</h2>
					</div>
					<div className="baptism-route-grid">
						{routeStops.map(([title, copy, image]) => (
							<div key={title} className="baptism-route-card">
								<img src={image} alt={title} />
								<h3>{title}</h3>
								<p>{copy}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="baptism-contact" className="baptism-home-contact">
				<div className="container-mid baptism-contact-card">
					<div>
						<p>Ready to plan?</p>
						<h2>Start with the booking journey</h2>
					</div>
					<a className="cbtn1" href="/baptism/book">Book Your Trip</a>
				</div>
			</section>

			<Footer />
		</div>
	)
}
