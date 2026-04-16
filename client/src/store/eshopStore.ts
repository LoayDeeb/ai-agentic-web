import { create } from 'zustand'
import { getEshopProductById } from '../components/eshop/catalog'

export type EshopCartItem = {
	productId: number
	quantity: number
}

type EshopStore = {
	items: EshopCartItem[]
	isCartOpen: boolean
	addItem: (productId: number) => { success: boolean; itemCount: number; cartTotal: number; productName?: string }
	removeItem: (productId: number) => void
	openCart: () => void
	closeCart: () => void
	clearCart: () => void
	getItemCount: () => number
	getCartTotal: () => number
}

function getPriceNumber(value: string) {
	return Number.parseFloat(value.replace(/,/g, '')) || 0
}

export const useEshopStore = create<EshopStore>((set, get) => ({
	items: [],
	isCartOpen: false,

	addItem: (productId) => {
		const product = getEshopProductById(productId)
		if (!product || product.soldOut) {
			return {
				success: false,
				itemCount: get().getItemCount(),
				cartTotal: get().getCartTotal(),
			}
		}

		set((state) => {
			const existing = state.items.find((item) => item.productId === productId)
			if (existing) {
				return {
					items: state.items.map((item) =>
						item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
					),
					isCartOpen: true,
				}
			}

			return {
				items: [...state.items, { productId, quantity: 1 }],
				isCartOpen: true,
			}
		})

		return {
			success: true,
			itemCount: get().getItemCount(),
			cartTotal: get().getCartTotal(),
			productName: product.name,
		}
	},

	removeItem: (productId) =>
		set((state) => ({
			items: state.items.filter((item) => item.productId !== productId),
		})),

	openCart: () => set({ isCartOpen: true }),
	closeCart: () => set({ isCartOpen: false }),
	clearCart: () => set({ items: [], isCartOpen: false }),

	getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

	getCartTotal: () =>
		get().items.reduce((sum, item) => {
			const product = getEshopProductById(item.productId)
			if (!product) return sum
			return sum + getPriceNumber(product.price) * item.quantity
		}, 0),
}))
