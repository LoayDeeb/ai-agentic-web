export type BaptismItineraryDay = {
	title: string
	description: string
}

export type BaptismItinerary = {
	id: number
	title: string
	description: string
	price: string | null
	tourType: string
	days: BaptismItineraryDay[]
}

export const baptismGuidedItineraries: BaptismItinerary[] = [
	{
		id: 4,
		title: 'Biblical Jordan',
		description: '2 nights Amman / 1 Night Dead Sea. Attractions: Madaba, Mount Nebo, Baptism Site, Dead Sea, Petra, Moses Springs.',
		price: null,
		tourType: 'group',
		days: [
			{
				title: 'Day 1 - Arrival',
				description: 'Arrival to Queen Alia Airport, our representative will meet you before reaching immigration desk, will assist with government procedures to issue your visa, and later will help you with baggage claim, hire porters, and escort you to your driver.\nLater transfer to your hotel for dinner and overnight.',
			},
			{
				title: 'Day 2 - Madaba / Mount Nebo / Baptism Site / Dead Sea',
				description: 'Today is a very special day. After breakfast, head to Madaba, best known for its Byzantine and Umayyad mosaics and the famous mosaic map in St. George Church. Continue to Mount Nebo, where Moses is said to have viewed the Promised Land, then visit the Baptism Site at Bethany Beyond the Jordan, including Elijah Hill, John the Baptist Spring, and the Jordan River area. Later proceed to the Dead Sea for relaxation and overnight.',
			},
			{
				title: 'Day 3 - Dead Sea / Valley of Moses (Petra) / Moses Spring / Amman',
				description: 'After breakfast, travel to Petra via the desert highway for a full-day visit to the rose-red Nabatean city. Walk through the Siq, visit the Treasury, and explore the main monuments of Petra before visiting Moses Spring in Wadi Mousa. Return to Amman for overnight.',
			},
			{
				title: 'Day 4 - Amman / Departure',
				description: 'After breakfast, our guide will escort you to the airport, hire porters, and take care of your paperwork. Bon voyage!',
			},
		],
	},
	{
		id: 5,
		title: 'Biblical Jordan II - 4 Days (Amman / Dead Sea / Petra)',
		description: '2 nights Amman / 1 night Dead Sea. Attractions: Madaba, Mount Nebo, Machaerus, the Dead Sea, Petra, Moses Springs.',
		price: null,
		tourType: 'group',
		days: [
			{ title: 'Day 1 - Arrival', description: 'Arrival Queen Alia Airport - Amman - overnight in Amman.' },
			{ title: 'Day 2 - Mount Nebo / Madaba / Machaerus / Dead Sea', description: 'Visit Mount Nebo, Madaba, Machaerus, then continue to the Dead Sea for relaxation and overnight.' },
			{ title: 'Day 3 - Dead Sea / Petra / Moses Spring / Amman', description: 'Full day visit to Petra and Moses Spring, then return to Amman for overnight.' },
			{ title: 'Day 4 - Amman / Departure', description: 'Transfer to the airport for departure.' },
		],
	},
	{
		id: 1,
		title: '4-Day Baptism Site & Madaba Tour',
		description: '',
		price: null,
		tourType: 'group',
		days: [
			{ title: 'Day 1', description: 'Arrival Queen Alia International Airport - Amman - Overnight in Amman' },
			{ title: 'Day 2', description: 'Amman - Baptism Site - Mt. Nebo - Madaba - Overnight in Madaba' },
			{ title: 'Day 3', description: 'Madaba visit - Mukawir - Um Rasas - Madaba - Overnight in Madaba' },
			{ title: 'Day 4', description: 'Madaba - Queen Alia International Airport for Departure' },
		],
	},
	{
		id: 2,
		title: '5-Day Biblical Jordan Tour',
		description: '',
		price: null,
		tourType: 'group',
		days: [
			{ title: 'Day 1', description: 'Arrival Queen Alia International Airport - Amman - Overnight in Amman' },
			{ title: 'Day 2', description: 'Amman - Baptism Site - Mt. Nebo - Madaba - Overnight in Madaba' },
			{ title: 'Day 3', description: 'Madaba visit - Mukawir - Um Rasas - Amman - Overnight in Amman' },
			{ title: 'Day 4', description: 'Amman - Al Zarqa River - Tell Mar Elias - Anjara - Jerash - Amman - Overnight in Amman' },
			{ title: 'Day 5', description: 'Amman - Queen Alia International Airport for Departure' },
		],
	},
	{
		id: 3,
		title: '5-Day Jordan, Petra & Wadi Rum Tour',
		description: '',
		price: null,
		tourType: 'group',
		days: [
			{ title: 'Day 1', description: 'Arrival Queen Alia International Airport - Amman - Overnight in Amman' },
			{ title: 'Day 2', description: 'Amman - Baptism Site - Mt. Nebo - Madaba - Overnight in Madaba' },
			{ title: 'Day 3', description: 'Madaba visit - Mukawir - Um Rasas - Shawbak - Petra - Overnight in Petra' },
			{ title: 'Day 4', description: 'Petra visit - Wadi Rum - Overnight in Wadi Rum' },
			{ title: 'Day 5', description: 'Wadi Rum - Queen Alia International Airport for Departure' },
		],
	},
]

export function getBaptismGuidedItinerary(id: string | number | undefined) {
	const itineraryId = Number(id || 4)
	return baptismGuidedItineraries.find((item) => item.id === itineraryId) || baptismGuidedItineraries[0]
}
