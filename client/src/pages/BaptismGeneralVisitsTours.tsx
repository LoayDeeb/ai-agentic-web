import { Footer, Header } from './BaptismTripPlanner'

const options = [
	{
		title: 'General Visit',
		copy: 'Book individual or group tickets for the Baptism Site visitor center, shuttle, pilgrim path, and Jordan River access.',
		image: '/exp-img1.webp',
		href: '/baptism/book/general/visit',
		cta: 'Book General Visit',
	},
	{
		title: 'Biblical Packages',
		copy: 'Browse guided tours with detailed itineraries through Elijah Hill, John the Baptist Spring, ancient pools, churches, and the Jordan River.',
		image: '/exp-img2.webp',
		href: '/baptism/guided-tours',
		cta: 'View Tours & Itineraries',
	},
]

export default function BaptismGeneralVisitsTours() {
	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="innerbanner2" style={{ backgroundImage: 'url(/inner-banner8.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center">General Visits & Tours</h1>
					</div>
				</div>
			</section>

			<section className="baptism-book-intro">
				<div className="container-mid">
					<div>
						<h2 className="ctitle2">Select Experience</h2>
						<p>Choose General Visit for regular tickets, or Biblical Packages to browse guided tours and itineraries.</p>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="baptism-book-options">
				<div className="container-mid">
					<div className="experience-grid">
						{options.map((option) => (
							<a key={option.title} href={option.href} className="expinner">
								<div className="imgcol"><img src={option.image} alt={option.title} /></div>
								<div className="ctextinfo2">
									<h3 className="font30 text-white">{option.title}</h3>
									<p>{option.copy}</p>
									<span className="bbtn1">{option.cta}</span>
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
