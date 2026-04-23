import type { ReactNode } from 'react'
import {
	Car,
	CheckCircle2,
	CreditCard,
	DollarSign,
	FileText,
	Globe,
	Headphones,
	HeadphonesIcon,
	Home,
	Plane,
	Shield,
	Smartphone,
	Star,
} from 'lucide-react'

export type SubItem = {
	label: string
	path?: string
}

export type NavItem = {
	label: string
	active?: boolean
	path?: string
	subItems?: SubItem[]
}

export type BenefitCard = {
	title: string
	description: string
}

export type SidebarLink = {
	label: string
	path?: string
	active: boolean
}

export type FooterAction = {
	label: string
	icon: ReactNode
}

export type OfficialFact = {
	title: string
	description: string
	sourceLabel: string
	sourceUrl: string
}

export type OfficialSourceLink = {
	label: string
	url: string
}

export const TAMKEEN_PRIMARY = '#193a85'
export const TAMKEEN_PRIMARY_DARK = '#142f6b'
export const TAMKEEN_SURFACE = '#f1f1f1'
export const TAMKEEN_RED = '#c8102e'
export const TAMKEEN_GOLD = '#d4af37'
export const TAMKEEN_DARK = '#1a1a2e'

export const tamkeenNavItems: NavItem[] = [
	{ label: 'Home', active: true, path: '/bahraincredit' },
	{
		label: 'Islamic Window',
		subItems: [
			{ label: 'About' },
			{ label: 'Vehicle Finance' },
			{ label: 'Apply for Islamic Finance' },
		],
	},
	{
		label: 'Loans',
		path: '/bahraincredit/loans/car-loan',
		subItems: [
			{ label: 'Car Loan', path: '/bahraincredit/loans/car-loan' },
			{ label: 'Personal Loan' },
			{ label: 'Mortgage Loan' },
			{ label: 'Installment Deferral Program' },
		],
	},
	{
		label: 'Cards',
		path: '/bahraincredit/cards/imtiaz',
		subItems: [
			{ label: 'IMTIAZ', path: '/bahraincredit/cards/imtiaz' },
			{ label: 'IMTIAZ World', path: '/bahraincredit/cards/world' },
			{ label: 'IMTIAZ for Her' },
			{ label: 'IMTIAZ Platinum' },
			{ label: 'IMTIAZ Prepaid' },
			{ label: 'IMTIAZ Corporate' },
			{ label: 'Loyalty Program' },
			{ label: 'Airport Lounge Access' },
			{ label: 'IMTIAZ Offers' },
		],
	},
	{ label: 'Commercial & SME' },
	{
		label: 'Insurance',
		subItems: [
			{ label: 'Medical Insurance' },
			{ label: 'Motor Insurance' },
			{ label: 'Life Insurance' },
			{ label: 'Home Insurance' },
			{ label: 'Travel Insurance' },
		],
	},
	{
		label: 'Real Estate',
		subItems: [
			{ label: 'Sales of Lands' },
			{ label: 'Rent' },
			{ label: 'Valuation Services' },
			{ label: 'Investment Properties' },
			{ label: 'Development Services' },
		],
	},
	{
		label: 'Investor Relations',
		subItems: [
			{ label: 'Shareholders' },
			{ label: 'Board of Directors' },
			{ label: 'Executive Management' },
			{ label: 'Financials and Disclosures' },
			{ label: 'Corporate Governance' },
			{ label: 'Corporate Social Responsibility' },
		],
	},
]

export const domainChangeSteps = [
	{
		icon: CheckCircle2,
		text: 'Update your bookmarks with the new BahrainCredit domain to access BahrainCredit services.',
	},
	{
		icon: CheckCircle2,
		text: 'All legacy demo links will auto-forward to the new experience during the transition.',
	},
	{
		icon: CheckCircle2,
		text: 'Loan and card application details stay the same across the new pages.',
	},
	{
		icon: CheckCircle2,
		text: 'Voice guidance remains active so customers can ask about financing or cards at any step.',
	},
]

export const carLoanBenefits: BenefitCard[] = [
	{
		title: 'No Salary Transfers',
		description: 'Keep your salary with your current bank while enjoying Bahrain Credit services.',
	},
	{
		title: 'Same Day Approval',
		description: 'Move from enquiry to approval quickly when the documentation is complete.',
	},
	{
		title: 'Up to 7 Years Financing',
		description: 'Flexible repayment plans help match the car value and your monthly budget.',
	},
	{
		title: 'Competitive Rates',
		description: 'Transparent financing costs are positioned to stay attractive in the Bahrain market.',
	},
	{
		title: 'Hassle-Free Processing',
		description: 'Simple documentation and a guided process reduce back-and-forth for applicants.',
	},
	{
		title: 'Easy Application',
		description: 'A lightweight application flow keeps the focus on choosing the right vehicle.',
	},
	{
		title: 'Reliable After-Sales',
		description: 'Dedicated teams continue to support account updates, payments, and service requests.',
	},
	{
		title: 'For Everyone',
		description: 'Solutions are designed for Bahrainis and expatriates with practical eligibility criteria.',
	},
]

export const loanSidebarLinks: SidebarLink[] = [
	{ label: 'Car Loan', path: '/bahraincredit/loans/car-loan', active: true },
	{ label: 'Personal Loan', active: false },
	{ label: 'Mortgage Loan', active: false },
	{ label: 'Installment Deferral Program', active: false },
]

export const imtiazSidebarLinks: SidebarLink[] = [
	{ label: 'IMTIAZ', path: '/bahraincredit/cards/imtiaz', active: true },
	{ label: 'IMTIAZ World', path: '/bahraincredit/cards/world', active: false },
	{ label: 'IMTIAZ for Her', active: false },
	{ label: 'IMTIAZ Platinum', active: false },
	{ label: 'IMTIAZ Prepaid', active: false },
	{ label: 'IMTIAZ Corporate', active: false },
	{ label: 'Loyalty Program', active: false },
	{ label: 'Airport Lounge Access', active: false },
	{ label: 'IMTIAZ Offers', active: false },
]

export const worldSidebarLinks: SidebarLink[] = [
	{ label: 'IMTIAZ World Credit Card', path: '/bahraincredit/cards/world', active: true },
	{
		label: 'Mastercard UEFA Champions League Credit Card issued by IMTIAZ',
		active: false,
	},
]

export const footerButtons: FooterAction[] = [
	{ label: 'Apply Now', icon: <CreditCard size={18} /> },
	{ label: 'Service Rates & Charges', icon: <DollarSign size={18} /> },
	{ label: 'After Sales Services', icon: <HeadphonesIcon size={18} /> },
	{ label: 'Terms & Conditions', icon: <FileText size={18} /> },
]

export const cardFooterButtons: FooterAction[] = [
	{ label: 'Apply for IMTIAZ', icon: <CreditCard size={18} /> },
	{ label: 'Service Rates & Charges', icon: <DollarSign size={18} /> },
	{ label: 'After Sales Services', icon: <Headphones size={18} /> },
	{ label: 'Terms & Conditions', icon: <FileText size={18} /> },
]

export const appStores = ['App Store', 'Google Play', 'AppGallery']

export const officialBahrainFacts: OfficialFact[] = [
	{
		title: 'Established in 1983',
		description:
			'Bahrain Commercial Facilities Company B.S.C. says it was established on August 29, 1983, and became a public shareholding company in 1993.',
		sourceLabel: 'BCFC Annual Report 2024',
		sourceUrl:
			'https://www.bahraincredit.com.bh/Administrator/MediaHandler/GenericHandler/documents/Annual%20report/BCFCAnnualReport2024English.pdf',
	},
	{
		title: 'Licensed Financing Company',
		description:
			'The company states that it has been licensed and regulated by the Central Bank of Bahrain as a Financing Company effective June 26, 2005.',
		sourceLabel: 'BCFC Annual Report 2024',
		sourceUrl:
			'https://www.bahraincredit.com.bh/Administrator/MediaHandler/GenericHandler/documents/Annual%20report/BCFCAnnualReport2024English.pdf',
	},
	{
		title: 'Core Financing Lines',
		description:
			'Bahrain Credit lists car loans, personal loans, and mortgage loans on its loans pages, alongside IMTIAZ credit cards.',
		sourceLabel: 'Bahrain Credit Loans',
		sourceUrl: 'https://www.bahraincredit.com.bh/Loans/',
	},
	{
		title: 'Car Loan Highlights',
		description:
			'Official car-loan benefits include no salary transfer, same-day approval, up to 7 years financing, competitive rates, hassle-free processing, easy application, after-sales support, and availability for Bahrainis and expatriates.',
		sourceLabel: 'Bahrain Credit Car Loan',
		sourceUrl: 'https://www.bahraincredit.com.bh/Loans/CarLoan/',
	},
	{
		title: 'IMTIAZ Eligibility',
		description:
			'The IMTIAZ cards page says eligible applicants include Bahraini citizens and Bahrain residents, whether salaried or self-employed; primary cardholders must be 21+ and supplementary cardholders 12+.',
		sourceLabel: 'Bahrain Credit IMTIAZ',
		sourceUrl: 'https://www.bahraincredit.com.bh/Cards/IMTIAZ/',
	},
	{
		title: 'IMTIAZ World Travel Value',
		description:
			'The IMTIAZ World page advertises over 1,200 airport lounges worldwide including Pearl Lounge in Bahrain, two Careem airport rides per year, and up to 50 days interest-free on purchases.',
		sourceLabel: 'Bahrain Credit IMTIAZ World',
		sourceUrl: 'https://www.bahraincredit.com.bh/Cards/IMTIAZWorld/IMTIAZWorld/',
	},
	{
		title: 'Sahel App Capabilities',
		description:
			'Sahel by BCFC offers account management for cards and loans, payments, pre-login branch lookup, secure authentication, eKYC onboarding, and digital loan, auto-loan, and virtual-card applications.',
		sourceLabel: 'Bahrain Credit Mobile App',
		sourceUrl: 'https://www.bahraincredit.com.bh/AboutUs/MobileApp/',
	},
	{
		title: 'Official Contact Details',
		description:
			'The official site lists toll-free support at 80008000 and the international number 0097317787222. The 2024 annual report cover lists bcfcinfo@bahraincredit.com.bh and +973 17 786000.',
		sourceLabel: 'Bahrain Credit Contact Details',
		sourceUrl:
			'https://www.bahraincredit.com.bh/AboutUs/MobileApp/',
	},
]

export const officialSourceLinks: OfficialSourceLink[] = [
	{ label: 'Official Home', url: 'https://www.bahraincredit.com.bh/' },
	{ label: 'Car Loan', url: 'https://www.bahraincredit.com.bh/Loans/CarLoan/' },
	{ label: 'Personal Loan', url: 'https://www.bahraincredit.com.bh/Loans/PersonalLoan/' },
	{ label: 'IMTIAZ Cards', url: 'https://www.bahraincredit.com.bh/Cards/IMTIAZ/' },
	{ label: 'IMTIAZ World', url: 'https://www.bahraincredit.com.bh/Cards/IMTIAZWorld/IMTIAZWorld/' },
	{ label: 'Sahel by BCFC', url: 'https://www.bahraincredit.com.bh/AboutUs/MobileApp/' },
	{
		label: 'Annual Report 2024',
		url: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/GenericHandler/documents/Annual%20report/BCFCAnnualReport2024English.pdf',
	},
]

export const imtiazPerks = [
	{
		title: 'Local and Global Offers',
		description:
			'Enjoy the convenience of worldwide acceptance alongside exclusive privileges and discounts inside the Kingdom and internationally.',
	},
	{
		title: 'Tailored Experiences',
		description:
			'From women-focused offerings to travel-friendly and passion cards such as Mastercard UEFA by IMTIAZ, each card is tailored to a different lifestyle.',
	},
	{
		title: 'Real Value',
		description:
			'Earn back through IMTIAZ and redeem points for cashback, Falconflyer Miles, or Shukran points, with lounge access, travel insurance, and more on selected cards.',
	},
	{
		title: 'Easy to Apply',
		description:
			'Simple eligibility and fast approvals let customers apply from home through the Sahel by BCFC mobile application.',
	},
]

export const imtiazBenefits = [
	{
		icon: Globe,
		title: 'Global Acceptance',
		description: 'Make purchases and withdraw cash conveniently across Bahrain and worldwide.',
	},
	{
		icon: Shield,
		title: 'Enhanced Security',
		description: 'EMV chip technology and secure transaction controls keep day-to-day usage protected.',
	},
	{
		icon: Star,
		title: 'Reward Programs',
		description: 'Earn points on everyday spending and redeem for cashback, miles, or partner rewards.',
	},
	{
		icon: Plane,
		title: 'Travel Benefits',
		description: 'Selected variants include lounge access, insurance coverage, concierge services, and exclusive hotel offers.',
	},
	{
		icon: Smartphone,
		title: 'Contactless Payments',
		description: 'Tap to pay quickly and securely using NFC-enabled cards and supported wallets.',
	},
	{
		icon: Headphones,
		title: '24/7 Support',
		description: 'Customers can reach dedicated support teams around the clock for urgent card needs.',
	},
]

export const eligibilityCategories = [
	{
		title: 'Nationality',
		items: ['Bahraini citizens', 'Residents of Bahrain'],
	},
	{
		title: 'Employment',
		items: ['Salaried individuals', 'Self-employed individuals'],
	},
	{
		title: 'Age',
		items: ['Primary cardholder: 21 years and above', 'Supplementary cardholder: 12 years and above'],
	},
]

export const creditCards = [
	{
		label: 'IMTIAZ World',
		img: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/Thumbnails/world.png',
		alt: 'IMTIAZ World Card',
		path: '/bahraincredit/cards/world',
	},
	{
		label: 'IMTIAZ for Her',
		img: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/Thumbnails/IFHWorld.png',
		alt: 'IMTIAZ for Her Card',
	},
	{
		label: 'IMTIAZ Platinum',
		img: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/Thumbnails/platinum.png',
		alt: 'IMTIAZ Platinum Card',
	},
	{
		label: 'IMTIAZ Prepaid',
		img: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/banner/Prepaidcards.png',
		alt: 'IMTIAZ Prepaid Card',
	},
	{
		label: 'IMTIAZ Corporate',
		img: 'https://www.bahraincredit.com.bh/Administrator/MediaHandler/ImageHandler/images/PhotoGallery/banner/ICE.png',
		alt: 'IMTIAZ Corporate Card',
	},
]

export const worldSections = [
	{
		id: 'benefits',
		icon: Star,
		title: 'Exclusive Benefits for You',
		highlight: 'Experience premium privileges designed for modern travel, lifestyle, and financial flexibility.',
		items: [
			'Earn rewards through the IMTIAZ Loyalty Programme on eligible card purchases.',
			'Enjoy flexible monthly payments from as low as 5% of your statement balance.',
			'Benefit from up to 50 days interest-free on purchases, subject to billing cycle terms.',
			'Access competitive rates, dedicated support, and fraud monitoring services around the clock.',
		],
	},
	{
		id: 'travel',
		icon: Plane,
		title: 'Travel Benefits',
		highlight: 'Frequent travellers can unlock airport, ride, hotel, and roaming perks through the World card tier.',
		items: [
			'Complimentary airport lounge access through the Mastercard Travel Pass network.',
			'Complimentary airport rides each year with selected partner benefits and promo codes.',
			'Hotel, booking, car-rental, and shopping discounts across key travel partners.',
			'Roaming and travel marketplace offers for international business or leisure trips.',
		],
	},
	{
		id: 'lifestyle',
		icon: Home,
		title: 'Lifestyle Benefits',
		highlight: 'The World card extends beyond payments with curated everyday offers and premium memberships.',
		items: [
			'Retail, delivery, entertainment, gaming, and subscription offers through Mastercard campaigns.',
			'Family-friendly digital learning and wellness perks for selected cardholders.',
			'Partner savings across selected merchants in Bahrain and abroad.',
		],
	},
	{
		id: 'peace',
		icon: Shield,
		title: 'Peace of Mind Benefits',
		highlight: 'Travel and purchase protection support customers when plans change unexpectedly.',
		items: [
			'Travel medical insurance and inconvenience coverage for eligible card usage.',
			'Confirmation letters and related support for visa or travel documentation.',
			'Additional concierge and emergency assistance services for premium cardholders.',
		],
	},
]

export const homeFeatureLinks = [
	{
		title: 'Loans That Move Fast',
		description: 'Explore vehicle finance with a guided path to benefits, charges, and application support.',
		path: '/bahraincredit/loans/car-loan',
		icon: Car,
	},
	{
		title: 'Cards Built Around Lifestyle',
		description: 'Compare IMTIAZ card families and jump into the right rewards profile for your needs.',
		path: '/bahraincredit/cards/imtiaz',
		icon: CreditCard,
	},
	{
		title: 'Premium World Benefits',
		description: 'Open the IMTIAZ World experience for travel, lounge access, and concierge-style benefits.',
		path: '/bahraincredit/cards/world',
		icon: Globe,
	},
]
