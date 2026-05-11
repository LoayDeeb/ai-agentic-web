import { Footer, Header } from './BaptismTripPlanner'

const bookCards = [
	{
		title: 'General Visits & Tours',
		copy: 'Choose between regular site entry tickets or Biblical Packages with guided tours and itineraries.',
		image: '/booktrip-img1.webp',
		href: '/baptism/book/general',
		cta: 'Choose Visit Type',
	},
	{
		title: 'Mass & Christian Events',
		copy: 'Request coordinated support for church groups, prayer visits, clergy-led worship, and baptism-renewal arrangements.',
		image: '/booktrip-img2.webp',
		href: '/baptism/book/religious',
		cta: 'Request Event',
	},
]

export default function BaptismBook() {
	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="innerbanner2" style={{ backgroundImage: 'url(/inner-banner8.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center">Book Your Trip</h1>
					</div>
				</div>
			</section>

			<section className="baptism-book-intro">
				<div className="container-mid">
					<div>
						<h2 className="ctitle2">Book Your Trip</h2>
						<p>Choose the trip type first. The assistant can then open the matching flow and fill the active form with the visitor details.</p>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="baptism-book-options">
				<div className="container-mid">
					<div className="baptism-book-card-grid">
						{bookCards.map((card) => (
							<a key={card.title} href={card.href} className="booktripimg">
								<img src={card.image} alt={card.title} />
								<div className="bookinfo">
									<h3>{card.title}</h3>
									<p>{card.copy}</p>
									<span className="bbtn1">{card.cta}</span>
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
