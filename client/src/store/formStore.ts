import { create } from 'zustand'

export type FormData = {
	tin: string
	taxPeriod: string
	amountDue: string
	requestedInstallments: string
	justification: string
	bankName: string
	accountNumber: string
	contactEmail: string
	contactPhone: string
	bankStatement: File | null
	// Mawhiba Fields
	studentName: string
	studentNationalId: string
	studentSchool: string
	studentGrade: string
	studentBirthDate: string
	termsAccepted: boolean
	// SDB Fields
	applicantName: string
	applicantNationalId: string
	applicantPhone: string
	// applicantEmail: string // Removed as per user request
	familyMembers: string
	monthlyIncome: string
	financingAmount: string
	financingPurpose: string
	employmentType: string
	bankAccount: string
	// JICO Insurance Fields
	insuranceFullName: string
	insuranceNationalId: string
	insuranceDateOfBirth: string
	insurancePhone: string
	insuranceEmail: string
	insuranceAddress: string
	insurancePlanType: string // cure, cure5050, cureIn
	insuranceCoverageClass: string // private, first, second
	insuranceFamilyMembers: string
	insurancePreExisting: string
	insuranceOccupation: string
	insuranceInsuranceTerms: boolean
	// EF (Environment Fund) Fields
	efOrganizationName: string
	efRegistrationNumber: string
	efOrganizationType: string
	efContactPerson: string
	efContactEmail: string
	efContactPhone: string
	efProjectTitle: string
	efProjectDescription: string
	efRequestedAmount: string
	efProjectDuration: string
	efEnvironmentalSector: string
	efExpectedImpact: string
	efTermsAccepted: boolean
}

type FormStore = {
	formData: FormData
	currentStep: number
	setField: (fieldName: keyof FormData, value: any) => void
	setMultipleFields: (fields: Partial<FormData>) => void
	getFormData: () => FormData
	getMissingFields: () => string[]
	setCurrentStep: (step: number) => void
	reset: () => void
}

const initialFormData: FormData = {
	tin: '',
	taxPeriod: '',
	amountDue: '',
	requestedInstallments: '',
	justification: '',
	bankName: '',
	accountNumber: '',
	contactEmail: '',
	contactPhone: '',
	bankStatement: null,
	// Mawhiba Fields
	studentName: '',
	studentNationalId: '',
	studentSchool: '',
	studentGrade: '',
	studentBirthDate: '',
	termsAccepted: false,
	// SDB Fields
	applicantName: '',
	applicantNationalId: '',
	applicantPhone: '',
	// applicantEmail: '', // Removed
	familyMembers: '',
	monthlyIncome: '',
	financingAmount: '',
	financingPurpose: '',
	employmentType: '',
	bankAccount: '',
	// JICO Insurance Fields
	insuranceFullName: '',
	insuranceNationalId: '',
	insuranceDateOfBirth: '',
	insurancePhone: '',
	insuranceEmail: '',
	insuranceAddress: '',
	insurancePlanType: '',
	insuranceCoverageClass: '',
	insuranceFamilyMembers: '',
	insurancePreExisting: '',
	insuranceOccupation: '',
	insuranceInsuranceTerms: false,
	// EF (Environment Fund) Fields
	efOrganizationName: '',
	efRegistrationNumber: '',
	efOrganizationType: '',
	efContactPerson: '',
	efContactEmail: '',
	efContactPhone: '',
	efProjectTitle: '',
	efProjectDescription: '',
	efRequestedAmount: '',
	efProjectDuration: '',
	efEnvironmentalSector: '',
	efExpectedImpact: '',
	efTermsAccepted: false
}

export const useFormStore = create<FormStore>((set, get) => ({
	formData: initialFormData,
	currentStep: 1,

	setField: (fieldName, value) => {
		set((state) => ({
			formData: { ...state.formData, [fieldName]: value }
		}))
		console.log(`[FormStore] Set ${fieldName}:`, value)
	},

	setMultipleFields: (fields) => {
		set((state) => ({
			formData: { ...state.formData, ...fields }
		}))
		console.log('[FormStore] Set multiple fields:', fields)
	},

	getFormData: () => {
		return get().formData
	},

	getMissingFields: () => {
		const data = get().formData
		const required = [
			'tin',
			'taxPeriod',
			'amountDue',
			'requestedInstallments',
			'justification',
			'contactEmail',
			'contactPhone'
		]
		return required.filter((field) => !data[field as keyof FormData])
	},

	setCurrentStep: (step) => {
		set({ currentStep: step })
		console.log('[FormStore] Set step:', step)
	},

	reset: () => {
		set({ formData: initialFormData, currentStep: 1 })
		console.log('[FormStore] Reset form')
	}
}))

// Expose to window for agent tools
if (typeof window !== 'undefined') {
	;(window as any).formStore = {
		setField: (fieldName: string, value: any) => useFormStore.getState().setField(fieldName as any, value),
		setMultipleFields: (fields: any) => useFormStore.getState().setMultipleFields(fields),
		getFormData: () => useFormStore.getState().getFormData(),
		getMissingFields: () => useFormStore.getState().getMissingFields(),
		setCurrentStep: (step: number) => useFormStore.getState().setCurrentStep(step)
	}
}








