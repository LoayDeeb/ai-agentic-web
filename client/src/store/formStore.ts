import { create } from 'zustand'

export type FormData = {
	tin: string
	contactEmail: string
	contactPhone: string
	vatEntityType: string
	vatRegistrationBasis: string
	vatAnnualRevenue: string
	vatEffectiveDate: string
	vatActivityDescription: string
	vatRegistrationCertificate: File | null
	vatTermsAccepted: boolean
	taxPeriod: string
	amountDue: string
	requestedInstallments: string
	justification: string
	bankName: string
	accountNumber: string
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
	// SASO Imported Vehicle Inspection Fields
	sasoApplicantName: string
	sasoNationalId: string
	sasoMobile: string
	sasoChassisNumber: string
	sasoCustomsNumber: string
	sasoVehicleType: string
	sasoTermsAccepted: boolean
	// GIG Crown Family Fields
	gigApplicantFullName: string
	gigNationalId: string
	gigDateOfBirth: string
	gigGender: string
	gigPhone: string
	gigEmail: string
	gigCity: string
	gigCoverageClass: string
	gigFamilyMembers: string
	gigCopayOption: string
	gigNeedsMaternity: string
	gigPreExistingConditions: string
	gigTermsAccepted: boolean
	// GIG Advisor Lead Fields
	gigAdvisorInsuranceTarget: string
	gigAdvisorInsuranceLabel: string
	gigAdvisorCustomerType: string
	gigAdvisorContactMethod: string
	gigAdvisorNotes: string
	gigAdvisorTermsAccepted: boolean
	// MOIN (Ministry of Investment) Fields
	moinInvestorName: string
	moinNationalId: string
	moinNationality: string
	moinPhone: string
	moinEmail: string
	moinCompanyName: string
	moinCompanyRegNumber: string
	moinCapitalShare: string
	moinEmployeesCount: string
	moinActivityType: string
	moinTermsAccepted: boolean
	// Tamkeen Bahrain Loan Fields
	tamkeenLoanFullName: string
	tamkeenLoanNationalId: string
	tamkeenLoanPhone: string
	tamkeenLoanEmail: string
	tamkeenLoanEmploymentType: string
	tamkeenLoanMonthlyIncome: string
	tamkeenLoanVehicleType: string
	tamkeenLoanRequestedAmount: string
	tamkeenLoanPreferredTerm: string
	tamkeenLoanDownPayment: string
	tamkeenLoanTermsAccepted: boolean
	// Tamkeen Bahrain Card Fields
	tamkeenCardFullName: string
	tamkeenCardNationalId: string
	tamkeenCardPhone: string
	tamkeenCardEmail: string
	tamkeenCardEmploymentStatus: string
	tamkeenCardMonthlyIncome: string
	tamkeenCardType: string
	tamkeenCardCreditLimit: string
	tamkeenCardDeliveryPreference: string
	tamkeenCardTermsAccepted: boolean
	// Baptism Site Trip Booking Fields
	baptismFullName: string
	baptismEmail: string
	baptismPhone: string
	baptismCountry: string
	baptismVisitDate: string
	baptismVisitTime: string
	baptismGuests: string
	baptismExperience: string
	baptismLanguage: string
	baptismPickup: string
	baptismNationality: string
	baptismDateOfBirth: string
	baptismAccessibilityNeeds: string
	baptismWantsClubCar: boolean
	baptismAddOns: string
	baptismNotes: string
	baptismTermsAccepted: boolean
	baptismConsentPolicy: boolean
	baptismConsentPayment: boolean
	baptismCardNumber: string
	baptismCardName: string
	baptismCardExpiry: string
	baptismCardCvv: string
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
	contactEmail: '',
	contactPhone: '',
	vatEntityType: '',
	vatRegistrationBasis: '',
	vatAnnualRevenue: '',
	vatEffectiveDate: '',
	vatActivityDescription: '',
	vatRegistrationCertificate: null,
	vatTermsAccepted: false,
	taxPeriod: '',
	amountDue: '',
	requestedInstallments: '',
	justification: '',
	bankName: '',
	accountNumber: '',
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
	efTermsAccepted: false,
	// SASO Imported Vehicle Inspection Fields
	sasoApplicantName: '',
	sasoNationalId: '',
	sasoMobile: '',
	sasoChassisNumber: '',
	sasoCustomsNumber: '',
	sasoVehicleType: '',
	sasoTermsAccepted: false,
	// GIG Crown Family Fields
	gigApplicantFullName: '',
	gigNationalId: '',
	gigDateOfBirth: '',
	gigGender: '',
	gigPhone: '',
	gigEmail: '',
	gigCity: '',
	gigCoverageClass: '',
	gigFamilyMembers: '',
	gigCopayOption: '',
	gigNeedsMaternity: '',
	gigPreExistingConditions: '',
	gigTermsAccepted: false,
	// GIG Advisor Lead Fields
	gigAdvisorInsuranceTarget: '',
	gigAdvisorInsuranceLabel: '',
	gigAdvisorCustomerType: '',
	gigAdvisorContactMethod: '',
	gigAdvisorNotes: '',
	gigAdvisorTermsAccepted: false,
	// MOIN (Ministry of Investment) Fields
	moinInvestorName: '',
	moinNationalId: '',
	moinNationality: '',
	moinPhone: '',
	moinEmail: '',
	moinCompanyName: '',
	moinCompanyRegNumber: '',
	moinCapitalShare: '',
	moinEmployeesCount: '',
	moinActivityType: '',
	moinTermsAccepted: false,
	// Tamkeen Bahrain Loan Fields
	tamkeenLoanFullName: '',
	tamkeenLoanNationalId: '',
	tamkeenLoanPhone: '',
	tamkeenLoanEmail: '',
	tamkeenLoanEmploymentType: '',
	tamkeenLoanMonthlyIncome: '',
	tamkeenLoanVehicleType: '',
	tamkeenLoanRequestedAmount: '',
	tamkeenLoanPreferredTerm: '',
	tamkeenLoanDownPayment: '',
	tamkeenLoanTermsAccepted: false,
	// Tamkeen Bahrain Card Fields
	tamkeenCardFullName: '',
	tamkeenCardNationalId: '',
	tamkeenCardPhone: '',
	tamkeenCardEmail: '',
	tamkeenCardEmploymentStatus: '',
	tamkeenCardMonthlyIncome: '',
	tamkeenCardType: '',
	tamkeenCardCreditLimit: '',
	tamkeenCardDeliveryPreference: '',
	tamkeenCardTermsAccepted: false,
	// Baptism Site Trip Booking Fields
	baptismFullName: '',
	baptismEmail: '',
	baptismPhone: '',
	baptismCountry: '',
	baptismVisitDate: '',
	baptismVisitTime: '',
	baptismGuests: '',
	baptismExperience: '',
	baptismLanguage: '',
	baptismPickup: '',
	baptismNationality: '',
	baptismDateOfBirth: '',
	baptismAccessibilityNeeds: '',
	baptismWantsClubCar: false,
	baptismAddOns: '',
	baptismNotes: '',
	baptismTermsAccepted: false,
	baptismConsentPolicy: false,
	baptismConsentPayment: false,
	baptismCardNumber: '',
	baptismCardName: '',
	baptismCardExpiry: '',
	baptismCardCvv: ''
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
		const path = typeof window !== 'undefined' ? window.location.pathname : ''
		const normalizedPath = path.toLowerCase()
		let required = [
			'tin',
			'vatEntityType',
			'vatRegistrationBasis',
			'vatAnnualRevenue',
			'vatEffectiveDate',
			'vatActivityDescription',
			'contactEmail',
			'contactPhone',
			'vatTermsAccepted'
		]

		if (path.startsWith('/saso/service/imported-vehicles')) {
			required = [
				'sasoApplicantName',
				'sasoNationalId',
				'sasoMobile',
				'sasoChassisNumber',
				'sasoCustomsNumber',
				'sasoVehicleType'
			]
		}
		if (path.startsWith('/gig/submit')) {
			required = [
				'gigApplicantFullName',
				'gigNationalId',
				'gigDateOfBirth',
				'gigGender',
				'gigPhone',
				'gigCoverageClass',
				'gigFamilyMembers',
				'gigCopayOption'
			]
		}
		if (path.startsWith('/gig/advisor-request')) {
			required = [
				'gigApplicantFullName',
				'gigPhone',
				'gigAdvisorInsuranceTarget',
				'gigAdvisorCustomerType',
				'gigAdvisorContactMethod',
				'gigAdvisorTermsAccepted'
			]
		}
		if (
			normalizedPath.startsWith('/bahraincredit/loans/car-loan/apply') ||
			normalizedPath.startsWith('/tamkeenbahrain/loans/car-loan/apply')
		) {
			required = [
				'tamkeenLoanFullName',
				'tamkeenLoanNationalId',
				'tamkeenLoanPhone',
				'tamkeenLoanEmail',
				'tamkeenLoanEmploymentType',
				'tamkeenLoanMonthlyIncome',
				'tamkeenLoanVehicleType',
				'tamkeenLoanRequestedAmount',
				'tamkeenLoanPreferredTerm',
				'tamkeenLoanTermsAccepted'
			]
		}
		if (
			normalizedPath.startsWith('/bahraincredit/cards/apply') ||
			normalizedPath.startsWith('/tamkeenbahrain/cards/apply')
		) {
			required = [
				'tamkeenCardFullName',
				'tamkeenCardNationalId',
				'tamkeenCardPhone',
				'tamkeenCardEmail',
				'tamkeenCardEmploymentStatus',
				'tamkeenCardMonthlyIncome',
				'tamkeenCardType',
				'tamkeenCardDeliveryPreference',
				'tamkeenCardTermsAccepted'
			]
		}
		if (normalizedPath.startsWith('/baptism')) {
			required = [
				'baptismFullName',
				'baptismEmail',
				'baptismPhone',
				'baptismNationality',
				'baptismDateOfBirth',
				'baptismVisitDate',
				'baptismVisitTime',
				'baptismGuests',
				'baptismExperience',
				'baptismLanguage',
				'baptismPickup',
				'baptismTermsAccepted',
				'baptismConsentPolicy',
				'baptismConsentPayment',
				'baptismCardNumber',
				'baptismCardName',
				'baptismCardExpiry',
				'baptismCardCvv'
			]
		}
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
