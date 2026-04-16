import type { EshopProduct } from './EshopProductCarousel'

export const eshopSectionIds = {
	categories: 'categories',
	newArrival: 'new-arrival',
	brands: 'brands',
	bestSeller: 'best-seller',
	appleProducts: 'apple-products',
} as const

export type EshopSectionId = (typeof eshopSectionIds)[keyof typeof eshopSectionIds]

export const newArrivalProducts: EshopProduct[] = [
	{
		id: 1,
		name: 'Samsung Galaxy Tab A11 LTE - 8GB',
		price: '164.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081592_samsung-galaxy-tab-a11-lte-8gb_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081593_samsung-galaxy-tab-a11-lte-8gb_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 2,
		name: 'Xiaomi Mi Vacuum Cleaner Mini EU',
		price: '45.01',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081544_xiaomi-mi-vacuum-cleaner-mini-eu_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081545_xiaomi-mi-vacuum-cleaner-mini-eu_360.webp',
		rating: 2,
		reviewCount: 4,
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 3,
		name: 'Realme C75X',
		price: '129.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0082342_realme-c75x_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0082343_realme-c75x_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 4,
		name: 'Xiaomi Robot Vacuum S40C EU',
		price: '229.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081464_xiaomi-robot-vacuum-s40c-eu_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081465_xiaomi-robot-vacuum-s40c-eu_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 5,
		name: 'Xiaomi Gaming Mouse Lite GL',
		price: '25.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080441_xiaomi-gaming-mouse-lite-gl_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080442_xiaomi-gaming-mouse-lite-gl_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 6,
		name: 'Tapo C610 Solar-Powered Pan/Tilt Security Camera Kit',
		price: '69.99',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081727_tapo-c610-solar-powered-pantilt-security-camera-kit_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0081728_tapo-c610-solar-powered-pantilt-security-camera-kit_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
		soldOut: true,
	},
	{
		id: 7,
		name: 'TP-Link BE6500 Wi-Fi 7 High Gain Wireless USB Adapter',
		price: '55.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080421_tp-link-be6500-wi-fi-7-high-gain-wireless-usb-adapter_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080422_tp-link-be6500-wi-fi-7-high-gain-wireless-usb-adapter_360.webp',
		badge: 'New arrival',
		badgeTone: 'teal',
	},
	{
		id: 8,
		name: 'FOLG Ear Phone FG-EC05',
		price: '6.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080383_folg-ear-phone-fg-ec05_360.webp',
		rating: 4,
		reviewCount: 81,
		badge: 'New arrival',
		badgeTone: 'teal',
	},
]

export const bestSellerProducts: EshopProduct[] = [
	{
		id: 11,
		name: 'Airpods 4 Active Noise Cancellation',
		price: '179.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0069311_airpods-4-active-noise-cancellation_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 12,
		name: 'Apple Watch Series 11',
		price: '415.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079603_apple-watch-series-11_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 13,
		name: 'Honor Pad X9',
		price: '159.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0071578_honor-pad-x9_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 14,
		name: 'HUAWEI FreeBuds SE 4',
		price: '36.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080130_huawei-freebuds-se-4_360.webp',
		badge: 'Best Seller',
		soldOut: true,
	},
	{
		id: 15,
		name: 'iPhone 17 Pro Max',
		price: '1,199.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079481_iphone-17-pro-max_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 16,
		name: 'Samsung Galaxy A06 5G - 4GB',
		price: '49.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0077305_samsung-galaxy-a06-5g-4gb_360.webp',
		badge: 'Best Seller',
		soldOut: true,
	},
	{
		id: 17,
		name: 'Samsung Galaxy A36 5G',
		price: '210.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0077389_samsung-galaxy-a36-5g_360.webp',
		badge: 'Best Seller',
	},
	{
		id: 18,
		name: 'Samsung Galaxy S25 FE',
		price: '399.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079661_samsung-galaxy-s25-fe_360.webp',
		badge: 'Best Seller',
	},
]

export const appleProducts: EshopProduct[] = [
	{
		id: 21,
		name: 'iPhone 17',
		price: '799.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079484_iphone-17_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079485_iphone-17_360.webp',
		rating: 4.5,
		reviewCount: 30,
	},
	{
		id: 22,
		name: 'iPhone 17 Pro',
		price: '1099.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079478_iphone-17-pro_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079480_iphone-17-pro_360.webp',
		rating: 4.7,
		reviewCount: 21,
	},
	{
		id: 23,
		name: 'iPhone 17 Pro Max',
		price: '1199.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079481_iphone-17-pro-max_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079482_iphone-17-pro-max_360.webp',
		rating: 4.6,
		reviewCount: 54,
		badge: 'Best Seller',
	},
	{
		id: 24,
		name: 'iPhone Air',
		price: '999.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079495_iphone-air_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079494_iphone-air_360.webp',
	},
	{
		id: 25,
		name: 'Apple Watch Series 11',
		price: '415.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079603_apple-watch-series-11_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079605_apple-watch-series-11_360.webp',
		rating: 5,
		reviewCount: 11,
		badge: 'Best Seller',
	},
	{
		id: 26,
		name: 'AirPods Pro 3',
		price: '229.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079526_airpods-pro-3_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0079527_airpods-pro-3_360.webp',
		rating: 5,
		reviewCount: 1,
	},
	{
		id: 27,
		name: 'MacBook Air 13-in (M4)',
		price: '849.00',
		currency: 'JOD',
		image: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080012_macbook-air-13-in-m4_360.webp',
		image2: 'https://cdn-eshop.jo.zain.com/images/thumbs/0080013_macbook-air-13-in-m4_360.webp',
		rating: 5,
		reviewCount: 4,
	},
]

export const allEshopProducts = [
	...newArrivalProducts,
	...bestSellerProducts,
	...appleProducts,
]

export const eshopProductMap = new Map(allEshopProducts.map((product) => [product.id, product]))

export function getEshopProductById(productId: number) {
	return eshopProductMap.get(productId)
}

const upsellPairs: Record<number, number[]> = {
	1: [5, 7],
	11: [25, 26],
	12: [26, 21],
	13: [5, 26],
	15: [25, 26],
	17: [7, 8],
	18: [7, 8],
	21: [25, 26],
	22: [23, 26],
	23: [25, 26],
	24: [26, 25],
	25: [26, 21],
	27: [5, 26],
}

export function getRecommendedUpsells(cartProductIds: number[]) {
	const inCart = new Set(cartProductIds)
	const recommendedIds = new Set<number>()

	for (const productId of cartProductIds) {
		for (const candidateId of upsellPairs[productId] ?? []) {
			if (!inCart.has(candidateId)) {
				recommendedIds.add(candidateId)
			}
		}
	}

	if (recommendedIds.size === 0) {
		for (const fallbackId of [26, 25, 5, 7, 8, 21]) {
			if (!inCart.has(fallbackId)) {
				recommendedIds.add(fallbackId)
			}
			if (recommendedIds.size >= 3) break
		}
	}

	return Array.from(recommendedIds)
		.map((productId) => getEshopProductById(productId))
		.filter((product): product is EshopProduct => Boolean(product && !product.soldOut))
}
