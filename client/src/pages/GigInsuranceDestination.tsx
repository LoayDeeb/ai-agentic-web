import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react'
import { GigHeaderTopBar, GigLogoBackground, GigNavMenuButton } from '../components/gig/GigBlocks'
import { gigMenuItems } from '../components/gig/content'

type GigInsuranceDetails = {
	title: string
	summary: string
	nextStep: string
	officialUrl: string
}

const gigInsuranceDetails: Record<string, GigInsuranceDetails> = {
	medical_category: {
		title: 'Medical Insurance',
		summary: 'Health-focused coverage for individuals, families, and medical care planning in Jordan.',
		nextStep: 'Share your profile and we will route your application to the right medical track.',
		officialUrl:
			'https://www.gig.com.jo/Page/167/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9'
	},
	medical_online_individual_family: {
		title: 'Medical Insurance (Online Individual/Family)',
		summary: 'Digital journey for individual and family medical insurance requests.',
		nextStep: 'Complete the quick local advisor form and we will prepare the online issuance path.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=21&locale=ar'
	},
	life_individual: {
		title: 'Individual Life Insurance',
		summary: 'Personal life protection plans designed around long-term financial security.',
		nextStep: 'Submit your details and the advisor team will recommend the best life plan.',
		officialUrl: 'https://www.gig.com.jo/Page/412/Individual-Life-Insurance'
	},
	life_group: {
		title: 'Group Life Insurance',
		summary: 'Life coverage options tailored for company and workforce protection.',
		nextStep: 'Share business details so we can route you to the group life team.',
		officialUrl:
			'https://www.gig.com.jo/Page/411/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%AC%D9%85%D8%A7%D8%B9%D9%8A-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D8%A7%D9%84%D8%AE%D8%A7%D8%B5-%D8%A8%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA'
	},
	motor_comprehensive: {
		title: 'Motor Insurance (Comprehensive)',
		summary: 'Comprehensive motor coverage for private vehicle owners.',
		nextStep: 'Continue to advisor request and we will prepare the matching motor option.',
		officialUrl:
			'https://www.gig.com.jo/Page/219/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%A8%D8%A7%D8%AA-%D8%B4%D8%A7%D9%85%D9%84---%D8%AA%D9%83%D9%85%D9%8A%D9%84%D9%8A'
	},
	motor_online_new: {
		title: 'Motor Insurance (Online New Policy)',
		summary: 'Online channel for issuing a new motor insurance policy.',
		nextStep: 'Submit your route request and we will take you through new policy readiness.',
		officialUrl: 'https://e-services.gig.com.jo/quote/motor-issuance?cmsId=28&linkingId=null'
	},
	motor_online_renew: {
		title: 'Motor Insurance (Online Renewal)',
		summary: 'Digital renewal flow for existing motor insurance policies.',
		nextStep: 'Submit your request and we will route you to the renewal workflow.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=23&locale=ar'
	},
	travel_standard: {
		title: 'Travel Insurance',
		summary: 'Travel coverage for international trips and trip-related protection.',
		nextStep: 'Continue with advisor request so we can match the travel scenario.',
		officialUrl:
			'https://www.gig.com.jo/Page/225/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D8%B3%D9%81%D8%B1'
	},
	travel_hajj_umrah: {
		title: 'Travel Insurance (Hajj and Umrah Context)',
		summary: 'Travel coverage recommendation path for pilgrimage-related trips.',
		nextStep: 'Share your trip profile and we will route you to the right travel option.',
		officialUrl:
			'https://www.gig.com.jo/Page/169/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B3%D9%81%D8%B1'
	},
	travel_online_issue: {
		title: 'Travel Insurance (Online Issuance)',
		summary: 'Digital issuance channel for travel insurance.',
		nextStep: 'Proceed with advisor form and we will align you with the issuance flow.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=16&locale=ar'
	},
	property_insurance: {
		title: 'Property Insurance',
		summary: 'Coverage for property and asset protection use cases.',
		nextStep: 'Submit your details and we will direct you to the relevant property solution.',
		officialUrl:
			'https://www.gig.com.jo/Page/236/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D9%85%D8%AA%D9%84%D9%83%D8%A7%D8%AA'
	},
	home_online: {
		title: 'Home Insurance (Online)',
		summary: 'Online path for home insurance product issuance.',
		nextStep: 'Continue with the request form and we will prepare your home insurance route.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=30'
	},
	marine_cargo: {
		title: 'Marine Cargo Insurance',
		summary: 'Cargo and shipment protection for logistics and trade flows.',
		nextStep: 'Share shipment context and we will route you to the marine cargo path.',
		officialUrl:
			'https://www.gig.com.jo/Page/228/%D8%A7%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%A8%D8%B6%D8%A7%D8%A6%D8%B9'
	},
	marine_forwarders_liability: {
		title: 'Freight Forwarders Liability',
		summary: 'Liability protection path for forwarding and freight operations.',
		nextStep: 'Continue with advisor request and we will route your business liability needs.',
		officialUrl:
			'https://www.gig.com.jo/Page/229/%D8%AA%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%B3%D8%A4%D9%88%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9-%D9%84%D9%88%D9%83%D9%84%D8%A7%D8%A1-%D8%A7%D9%84%D8%B4%D8%AD%D9%86-'
	},
	engineering_insurance: {
		title: 'Engineering Insurance',
		summary: 'Coverage for projects, contractors, and engineering-related risks.',
		nextStep: 'Submit your case and we will direct it to the engineering insurance stream.',
		officialUrl: 'https://www.gig.com.jo/Page/237/Engineering-Insurance'
	},
	other_general_insurance: {
		title: 'Other General Insurance',
		summary: 'General insurance categories for broader business and personal risks.',
		nextStep: 'Share your requirement and the advisor will map it to the correct product line.',
		officialUrl:
			'https://www.gig.com.jo/Page/238/%D8%AA%D8%A3%D9%85%D9%8A%D9%86%D8%A7%D8%AA-%D8%A3%D8%AE%D8%B1%D9%89'
	},
	workers_online: {
		title: 'Domestic Workers Insurance (Online)',
		summary: 'Online service path for domestic workers insurance.',
		nextStep: 'Proceed with the local form and we will route your request to this online channel.',
		officialUrl: 'https://e-services.gig.com.jo/ourproducts?id=20&locale=ar'
	}
}

const fallbackDetails: GigInsuranceDetails = {
	title: 'GIG Insurance Recommendation',
	summary: 'The advisor selected an insurance route and prepared your next internal step.',
	nextStep: 'Continue to the advisor request form so the team can contact you.',
	officialUrl:
		'https://www.gig.com.jo/Page/212/%D9%83%D8%B1%D8%A7%D9%88%D9%86-%D8%B9%D8%A7%D8%A6%D9%84%D8%AA%D9%8A-(Unlimited-coverage)'
}

export default function GigInsuranceDestination() {
	const navigate = useNavigate()
	const { target = '' } = useParams()
	const decodedTarget = decodeURIComponent(target)
	const details = gigInsuranceDetails[decodedTarget] || fallbackDetails

	React.useEffect(() => {
		document.title = `GIG Jordan | ${details.title}`
	}, [details.title])

	const advisorPath = React.useMemo(() => {
		const params = new URLSearchParams()
		params.set('target', decodedTarget)
		params.set('label', details.title)
		params.set('reason', details.summary)
		return `/gig/advisor-request?${params.toString()}`
	}, [decodedTarget, details.summary, details.title])

	return (
		<div
			className="min-h-screen bg-[#f8f9fd] text-[#1D2146]"
			dir="rtl"
			style={{ fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif" }}
		>
			<GigHeaderTopBar />

			<header className="border-b border-[#dde3f0] bg-white">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center gap-5">
						<GigLogoBackground width={140} padding="52px 60px" />
						<div>
							<p className="text-sm font-semibold text-[#A52A2A]">GIG Jordan</p>
							<h1 className="text-3xl font-black text-[#1D2146]">{details.title}</h1>
						</div>
					</div>
					<nav className="flex flex-wrap justify-end gap-3">
						{gigMenuItems.map((item) => (
							<GigNavMenuButton
								key={item.label}
								label={item.label}
								iconSrc={item.iconSrc}
								href={item.href}
								onClick={item.path ? () => navigate(item.path) : undefined}
								className="min-w-[165px]"
							/>
						))}
					</nav>
				</div>
			</header>

			<main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr]">
				<section className="rounded-[32px] bg-white p-8 shadow-sm border border-[#dde3f0]">
					<div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A]/10 px-3 py-1.5 text-sm font-semibold text-[#A52A2A]">
						<ShieldCheck className="h-4 w-4" />
						Insurance advisor route
					</div>
					<p className="text-lg leading-8 text-[#44506b]">{details.summary}</p>
					<p className="mt-4 text-base leading-8 text-[#44506b]">{details.nextStep}</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={() => navigate(advisorPath)}
							className="inline-flex items-center gap-2 rounded-2xl bg-[#A52A2A] px-6 py-3 font-bold text-white shadow-lg shadow-[#A52A2A]/20"
						>
							Continue with advisor form
							<ArrowLeft className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={() => navigate('/gig')}
							className="inline-flex items-center gap-2 rounded-2xl border border-[#1D2146]/15 bg-white px-6 py-3 font-bold text-[#1D2146]"
						>
							Back to GIG Home
							<ArrowLeft className="h-4 w-4" />
						</button>
					</div>
				</section>

				<aside className="rounded-[32px] bg-white p-8 shadow-sm border border-[#dde3f0]">
					<h2 className="text-2xl font-bold text-[#1D2146]">Reference source</h2>
					<p className="mt-3 text-sm leading-7 text-[#57637f]">
						This destination is hosted inside your app. You can still open the official page manually if needed.
					</p>
					<a
						href={details.officialUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#1D2146]/15 px-5 py-3 font-bold text-[#1D2146]"
					>
						Open official reference
						<ExternalLink className="h-4 w-4" />
					</a>
					<p className="mt-4 break-all text-xs text-[#7a859f]">{details.officialUrl}</p>
				</aside>
			</main>
		</div>
	)
}
