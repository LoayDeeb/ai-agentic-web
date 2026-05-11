import { Footer, Header } from './BaptismTripPlanner'

const packages = [
	{
		id: 'biblical-package',
		title: 'Bethany Beyond the Jordan Biblical Route',
		duration: 'Half day',
		price: 'From JOD 28.00',
		image: '/exp-img2.webp',
		copy: 'A guided walk through Elijah Hill, John the Baptist Spring, ancient baptismal pools, churches, and the Jordan River.',
		stops: ['Elijah Hill', "John's Spring", 'Ancient pools', 'Jordan River overlook'],
	},
	{
		id: 'pilgrim-jordan-river',
		title: 'Jordan River Pilgrim Journey',
		duration: 'Full day',
		price: 'From JOD 35.00',
		image: '/pilgrims-station.webp',
		copy: 'A slower pilgrim-focused visit with more time for prayer, reflection, river access, and group coordination.',
		stops: ['Visitor center', 'Pilgrim route', 'Churches', 'Prayer time'],
	},
	{
		id: 'madaba-nebo-extension',
		title: 'Madaba, Mount Nebo & Baptism Site',
		duration: 'Full day',
		price: 'From JOD 65.00',
		image: '/history-img.jpg',
		copy: 'A broader Christian heritage itinerary connecting the Baptism Site with nearby biblical landmarks in Jordan.',
		stops: ['Madaba', 'Mount Nebo', 'Baptism Site', 'Jordan River'],
	},
]

export default function BaptismGuidedTours() {
	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="innerbanner2" style={{ backgroundImage: 'url(/inner-banner8.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center">Guided Tours</h1>
					</div>
				</div>
			</section>

			<section className="baptism-book-intro">
				<div className="container-mid">
					<div>
						<h2 className="ctitle2">Biblical Packages</h2>
						<p>Choose a guided package first. The assistant can open the request form and continue filling the trip details.</p>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="baptism-guided-list">
				<div className="container-mid">
					{packages.map((pkg) => (
						<article key={pkg.id} className="baptism-guided-card">
							<img src={pkg.image} alt={pkg.title} />
							<div>
								<div className="baptism-guided-meta">
									<span>{pkg.duration}</span>
									<strong>{pkg.price}</strong>
								</div>
								<h2>{pkg.title}</h2>
								<p>{pkg.copy}</p>
								<ul>
									{pkg.stops.map((stop) => <li key={stop}>{stop}</li>)}
								</ul>
								<a className="cbtn1" href={`/baptism/guided-tours/${pkg.id}/request`}>Request This Tour</a>
							</div>
						</article>
					))}
				</div>
			</section>

			<Footer />
		</div>
	)
}
