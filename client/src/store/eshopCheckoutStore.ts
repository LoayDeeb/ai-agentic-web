import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type EshopPaymentMethod = 'card_online' | 'cash_on_delivery' | 'card_on_delivery'

export type EshopCheckoutFieldName =
	| 'fullName'
	| 'phone'
	| 'email'
	| 'city'
	| 'area'
	| 'streetAddress'
	| 'paymentMethod'
	| 'deliveryNotes'

export type EshopCheckoutFormData = {
	fullName: string
	phone: string
	email: string
	city: string
	area: string
	streetAddress: string
	paymentMethod: EshopPaymentMethod | ''
	deliveryNotes: string
}

export const eshopCheckoutFieldLabels: Record<EshopCheckoutFieldName, string> = {
	fullName: 'Full name',
	phone: 'Phone number',
	email: 'Email address',
	city: 'City',
	area: 'Area',
	streetAddress: 'Street address',
	paymentMethod: 'Payment method',
	deliveryNotes: 'Delivery notes',
}

const initialFormData: EshopCheckoutFormData = {
	fullName: '',
	phone: '',
	email: '',
	city: '',
	area: '',
	streetAddress: '',
	paymentMethod: '',
	deliveryNotes: '',
}

type EshopCheckoutStore = {
	formData: EshopCheckoutFormData
	isSubmitted: boolean
	setField: (fieldName: EshopCheckoutFieldName, value: string) => void
	reset: () => void
	getMissingFields: () => EshopCheckoutFieldName[]
	submit: () =>
		| { success: true; formData: EshopCheckoutFormData }
		| { success: false; missingFields: EshopCheckoutFieldName[] }
}

const requiredFields: EshopCheckoutFieldName[] = [
	'fullName',
	'phone',
	'email',
	'city',
	'streetAddress',
	'paymentMethod',
]

export const useEshopCheckoutStore = create<EshopCheckoutStore>()(
	persist(
		(set, get) => ({
			formData: initialFormData,
			isSubmitted: false,

			setField: (fieldName, value) =>
				set((state) => ({
					formData: {
						...state.formData,
						[fieldName]: value,
					},
					isSubmitted: false,
				})),

			reset: () =>
				set({
					formData: initialFormData,
					isSubmitted: false,
				}),

			getMissingFields: () =>
				requiredFields.filter((fieldName) => {
					const value = get().formData[fieldName]
					return typeof value !== 'string' || value.trim().length === 0
				}),

			submit: () => {
				const missingFields = get().getMissingFields()
				if (missingFields.length > 0) {
					return { success: false, missingFields }
				}

				set({ isSubmitted: true })
				return { success: true, formData: get().formData }
			},
		}),
		{
			name: 'eshop-checkout',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				formData: state.formData,
				isSubmitted: state.isSubmitted,
			}),
		}
	)
)
