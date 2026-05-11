import { Church, Clock, type LucideIcon, Users } from 'lucide-react'
import { Footer, Header } from './BaptismTripPlanner'

const services: Array<[string, string, LucideIcon]> = [
	['Mass coordination', 'Coordinate timing, group details, and on-site support for visiting church communities.', Church],
	['Baptism renewal', 'Prepare a hosted visit with reserved prayer time and renewal support for pilgrims.', Users],
	['Christian events', 'Request planning help for clergy-led visits, worship groups, and special Christian occasions.', Clock],
]

export default function BaptismReligiousService() {
	return (
		<div className="baptism-site-page">
			<Header />

			<section id="baptism-hero" className="innerbanner2" style={{ backgroundImage: 'url(/inner-banner8.webp)' }}>
				<div className="texts">
					<div className="midcontainer">
						<h1 className="ctitle2 text-center">Mass & Christian Events</h1>
					</div>
				</div>
			</section>

			<section className="baptism-book-intro">
				<div className="container-mid">
					<div>
						<h2 className="ctitle2">Religious Service Requests</h2>
						<p>Request support for prayer groups, worship visits, clergy-led programs, and baptism-renewal arrangements at the Baptism Site.</p>
					</div>
				</div>
			</section>

			<section id="baptism-experience" className="baptism-service-section">
				<div className="container-mid">
					<div className="baptism-service-grid">
						{services.map(([title, copy, Icon]) => (
							<div key={String(title)} className="baptism-service-card">
								<Icon />
								<h3>{title}</h3>
								<p>{copy}</p>
							</div>
						))}
					</div>
					<div className="baptism-service-request">
						<div>
							<p>Active request form</p>
							<h2>Continue to the booking form</h2>
							<span>The assistant will select Mass & Christian Events, then collect the date, group size, visitor details, confirmations, and demo payment information.</span>
						</div>
						<a className="cbtn1" href="/baptism/book/general/visit#baptism-booking">Start Religious Service Request</a>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
