import { navigateTo } from './navigator'
import { highlight } from './spotlight'
import { useFormStore } from '../../store/formStore'
import { useEshopStore } from '../../store/eshopStore'
import { useLocaleStore } from '../../store/locale'
import {
	eshopCheckoutFieldLabels,
	type EshopCheckoutFieldName,
	useEshopCheckoutStore,
} from '../../store/eshopCheckoutStore'
import {
	getEshopProductById,
	getEshopProductDetailById,
	getRecommendedUpsells,
	getEshopSectionForProduct,
} from '../../components/eshop/catalog'

export type AgentTool = {
	tool: string
	args: any
}

function buildGigInsurancePath(target: string) {
	return `/gig/insurance/${encodeURIComponent(target)}`
}

const gigInsuranceLabels: Record<string, string> = {
	gig_home: 'الرئيسية',
	crown_family_overview: 'كراون عائلتي',
	crown_family_apply: 'طلب كراون عائلتي',
	medical_category: 'التأمين الطبي',
	medical_online_individual_family: 'تأمين طبي فردي وعائلي (إلكتروني)',
	life_individual: 'تأمين الحياة الفردي',
	life_group: 'تأمين الحياة الجماعي',
	motor_comprehensive: 'تأمين المركبات شامل/تكميلي',
	motor_online_new: 'تأمين مركبة جديدة (إلكتروني)',
	motor_online_renew: 'تجديد تأمين المركبات (إلكتروني)',
	travel_standard: 'تأمين السفر',
	travel_hajj_umrah: 'تأمين الحج والعمرة',
	travel_online_issue: 'إصدار تأمين سفر (إلكتروني)',
	property_insurance: 'تأمين الممتلكات',
	home_online: 'تأمين المنازل (إلكتروني)',
	marine_cargo: 'التأمين البحري نقل البضائع',
	marine_forwarders_liability: 'مسؤولية وكلاء الشحن',
	engineering_insurance: 'التأمينات الهندسية',
	other_general_insurance: 'تأمينات عامة أخرى',
	workers_online: 'تأمين العاملين في المنازل (إلكتروني)'
}

const gigInsuranceTargets: Record<string, string> = {
	crown_family_overview: '/gig/crown-family',
	crown_family_apply: '/gig/submit',
	gig_home: '/gig',
	medical_category: buildGigInsurancePath('medical_category'),
	medical_crown_unlimited: buildGigInsurancePath('medical_crown_unlimited'),
	medical_crown_in_hospital: buildGigInsurancePath('medical_crown_in_hospital'),
	medical_crown_in_out_hospital: buildGigInsurancePath('medical_crown_in_out_hospital'),
	medical_aman: buildGigInsurancePath('medical_aman'),
	medical_ebtisamati: buildGigInsurancePath('medical_ebtisamati'),
	medical_royal: buildGigInsurancePath('medical_royal'),
	medical_bupa_global: buildGigInsurancePath('medical_bupa_global'),
	medical_international_360: buildGigInsurancePath('medical_international_360'),
	medical_online_individual_family: buildGigInsurancePath('medical_online_individual_family'),
	life_individual: buildGigInsurancePath('life_individual'),
	life_group: buildGigInsurancePath('life_group'),
	motor_comprehensive: buildGigInsurancePath('motor_comprehensive'),
	motor_online_new: buildGigInsurancePath('motor_online_new'),
	motor_online_renew: buildGigInsurancePath('motor_online_renew'),
	travel_standard: buildGigInsurancePath('travel_standard'),
	travel_hajj_umrah: buildGigInsurancePath('travel_hajj_umrah'),
	travel_online_issue: buildGigInsurancePath('travel_online_issue'),
	property_insurance: buildGigInsurancePath('property_insurance'),
	home_online: buildGigInsurancePath('home_online'),
	marine_cargo: buildGigInsurancePath('marine_cargo'),
	marine_forwarders_liability: buildGigInsurancePath('marine_forwarders_liability'),
	engineering_insurance: buildGigInsurancePath('engineering_insurance'),
	other_general_insurance: buildGigInsurancePath('other_general_insurance'),
	workers_online: buildGigInsurancePath('workers_online')
}

const gigSpecificInsuranceLabels: Record<string, string> = {
	medical_crown_unlimited: 'كراون عائلتي (Unlimited coverage)',
	medical_crown_in_hospital: 'كراون عائلتي (داخل المستشفى)',
	medical_crown_in_out_hospital: 'كراون عائلتي (داخل وخارج المستشفى)',
	medical_aman: 'برنامج أمان',
	medical_ebtisamati: 'برنامج ابتسامتي',
	medical_royal: 'برنامج رويال',
	medical_bupa_global: 'BUPA Global',
	medical_international_360: 'التأمين الطبي الدولي 360'
}

function getGigInsuranceLabel(target: string) {
	return gigSpecificInsuranceLabels[target] || gigInsuranceLabels[target] || target
}

function buildGigAdvisorRequestPath(target: string, reason?: string, label?: string) {
	const params = new URLSearchParams()
	if (target) params.set('target', target)
	if (label) params.set('label', label)
	if (reason) params.set('reason', reason)
	const query = params.toString()
	return query ? `/gig/advisor-request?${query}` : '/gig/advisor-request'
}

// Event bus for tool calls - dispatch to window so all components can listen
export function emitToolEvent(tool: string, args: any) {
	const event = new CustomEvent('agentTool', { detail: { tool, args } })
	window.dispatchEvent(event)
	console.log('[AgentTools] Emitted to window:', tool, args)
}

export function onToolEvent(callback: (tool: string, args: any) => void) {
	const handler = (e: Event) => {
		const { tool, args } = (e as CustomEvent).detail
		callback(tool, args)
	}
	window.addEventListener('agentTool', handler)
	return () => window.removeEventListener('agentTool', handler)
}

function hardNavigateTo(path: string) {
	if (typeof window !== 'undefined') {
		window.location.assign(path)
		return
	}
	navigateTo(path)
}

function smartNavigateTo(path: string) {
	if (typeof window === 'undefined') {
		navigateTo(path)
		return
	}

	const target = new URL(path, window.location.origin)
	const targetPath = `${target.pathname}${target.search}${target.hash}`
	navigateTo(targetPath)

	window.setTimeout(() => {
		const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
		if (currentPath !== targetPath) {
			window.location.assign(targetPath)
		}
	}, 220)
}

function shouldUseHardNavigation(path: string) {
	return (
		path === '/eshop' ||
		path.startsWith('/eshop/checkout') ||
		path.startsWith('/eshop/product/')
	)
}

// Execute agent tool calls
export async function executeAgentTool(tool: string, args: any): Promise<any> {
	console.log('[AgentTools] Executing:', tool, args)

	const buildEshopCartSummary = () => {
		const eshopStore = useEshopStore.getState()

		return {
			itemCount: eshopStore.getItemCount(),
			cartTotal: eshopStore.getCartTotal(),
			items: eshopStore.items
				.map((item) => {
					const product = getEshopProductById(item.productId)
					if (!product) return null
					return {
						productId: item.productId,
						name: product.name,
						quantity: item.quantity,
						price: product.price,
						currency: product.currency,
					}
				})
				.filter(Boolean),
			recommendedUpsells: getRecommendedUpsells(
				eshopStore.items.map((item) => item.productId)
			).map((product) => ({
				productId: product.id,
				name: product.name,
				price: product.price,
				currency: product.currency,
			})),
		}
	}

	switch (tool) {
		case 'navigateTo': {
			const path = String(args.path || '')
			if (shouldUseHardNavigation(path)) {
				smartNavigateTo(path)
			} else {
				navigateTo(path)
			}
			return { success: true, navigatedTo: path }
		}

		case 'openServiceBySlug':
			navigateTo(`/services/${args.slug}`)
			return { success: true, navigatedTo: `/services/${args.slug}` }

		case 'openMawhibaServices':
			navigateTo('/mawhiba')
			return { success: true, navigatedTo: '/mawhiba' }

		case 'openMawhibaService':
			navigateTo('/mawhiba/service')
			return { success: true, navigatedTo: '/mawhiba/service' }

		case 'openMawhibaApplication':
			navigateTo('/mawhiba/service/submit')
			return { success: true, navigatedTo: '/mawhiba/service/submit' }

		case 'scrollToMawhibaSection': {
			const sectionId = args.section
			// This triggers a tab change in the service detail page
			emitToolEvent('scrollToMawhibaSection', args)
			return { success: true, scrolledTo: sectionId }
		}

		case 'openSDBService':
			navigateTo('/sdb/service')
			return { success: true, navigatedTo: '/sdb/service' }

		// JICO (Jerusalem Insurance) Tools
		case 'openJicoServices':
			navigateTo('/jico')
			return { success: true, navigatedTo: '/jico' }

		case 'openJicoMedical':
			navigateTo('/jico/medical')
			return { success: true, navigatedTo: '/jico/medical' }

		case 'openJicoSubmit':
			navigateTo('/jico/submit')
			return { success: true, navigatedTo: '/jico/submit' }

		// EF (Environment Fund) Tools
		case 'openEFPrograms':
			navigateTo('/ef')
			return { success: true, navigatedTo: '/ef' }

		case 'openEFProgramDetail':
			navigateTo(`/ef/program/${args.programId}`)
			return { success: true, navigatedTo: `/ef/program/${args.programId}` }

		case 'openEFApplication':
			navigateTo(`/ef/apply/${args.programId}`)
			return { success: true, navigatedTo: `/ef/apply/${args.programId}` }

		case 'filterEFPrograms': {
			const categoryParam = args.category === 'All' ? '' : `?category=${encodeURIComponent(args.category)}`
			navigateTo(`/ef${categoryParam}`)
			return { success: true, filteredBy: args.category }
		}

		case 'scrollToEFSection': {
			const sectionId = args.section
			const sectionMap: Record<string, string> = {
				'overview': 'ef-program-overview',
				'eligibility': 'ef-program-eligibility',
				'steps': 'ef-program-steps',
				'filters': 'ef-filters',
				'programs': 'ef-programs-grid'
			}
			const elementId = sectionMap[sectionId]
			if (elementId) {
				const element = document.getElementById(elementId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${elementId}`, 3)
					return { success: true, scrolledTo: sectionId }
				}
				return { success: false, error: `Section element not found: ${elementId}` }
			}
			return { success: false, error: `Unknown section: ${sectionId}` }
		}

		case 'highlight':
			highlight(args.selector, args.seconds)
			return { success: true, highlighted: args.selector }

		case 'setLanguage':
			useLocaleStore.getState().switchLanguage(args.lang)
			return { success: true, language: args.lang }

		case 'scrollToTab':
			emitToolEvent('scrollToTab', args)
			return { success: true, scrolledTo: args.tabId }

		case 'playVideo':
			emitToolEvent('playVideo', args)
			return { success: true, videoPlayed: true }

		case 'checkAuthStatus': {
			const storedUser = localStorage.getItem('zatca.user')
			const isAuthenticated = !!storedUser
			let username = ''
			if (storedUser) {
				try {
					const userData = JSON.parse(storedUser)
					username = userData.username || ''
				} catch (e) {}
			}
			return { isAuthenticated, username }
		}

		case 'getUserInfo': {
			const storedUser = localStorage.getItem('zatca.user')
			if (storedUser) {
				try {
					const userData = JSON.parse(storedUser)
					return {
						username: userData.username,
						tin: userData.tin,
						contactEmail: userData.email || 'user@example.com',
						contactPhone: userData.phone || '+966 50 123 4567'
					}
				} catch (e) {}
			}
			return null
		}

		case 'fillFormField': {
			const store = useFormStore.getState()
			// Handle boolean values for checkboxes (like termsAccepted)
			const val = args.value === 'true' ? true : args.value === 'false' ? false : args.value
			store.setField(args.fieldName as any, val)
			emitToolEvent('fillFormField', args)
			return { success: true, field: args.fieldName, value: val }
		}

		case 'goToFormStep': {
			const store = useFormStore.getState()
			store.setCurrentStep(args.step)
			emitToolEvent('goToFormStep', args)
			return { success: true, currentStep: args.step }
		}

		case 'getFormData': {
			const store = useFormStore.getState()
			const data = store.getFormData()
			const missing = store.getMissingFields()
			return { formData: data, missingFields: missing }
		}

		case 'highlightFormField':
			emitToolEvent('highlightFormField', args)
			return { success: true, highlightedField: args.fieldName }

		case 'submitForm':
			emitToolEvent('submitForm', args)
			return { success: true, submitted: true }

		case 'clickNext': {
			const store = useFormStore.getState()
			const currentStep = store.currentStep
			const path = typeof window !== 'undefined' ? window.location.pathname : ''
			const maxStep = path.startsWith('/gig/advisor-request') ? 2 : 3
			const nextStep = Math.min(currentStep + 1, maxStep)
			store.setCurrentStep(nextStep)
			emitToolEvent('goToFormStep', { step: nextStep })
			return { success: true, nextStep }
		}

		case 'scrollToJicoSection': {
			const sectionId = args.section
			const sectionMap: Record<string, string> = {
				'cure': 'cure-section',
				'cure5050': 'cure5050-section',
				'curein': 'curein-section',
				'cancer': 'cancer-section'
			}
			const elementId = sectionMap[sectionId]
			if (elementId) {
				const element = document.getElementById(elementId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${elementId}`, 3)
					return { success: true, scrolledTo: sectionId }
				}
				return { success: false, error: `Section element not found: ${elementId}` }
			}
			return { success: false, error: `Unknown section: ${sectionId}` }
		}

		// Zain Jordan Tools
		case 'openZainHome':
			navigateTo('/zain')
			return { success: true, navigatedTo: '/zain' }

		case 'openEshopHome':
			useEshopStore.getState().closeCart()
			smartNavigateTo('/eshop')
			return { success: true, navigatedTo: '/eshop' }

		case 'openEshopSection': {
			const sectionId = String(args.sectionId || '')
			const path = `/eshop#${sectionId}`
			useEshopStore.getState().closeCart()
			navigateTo(path)
			window.setTimeout(() => {
				const element = document.getElementById(sectionId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${sectionId}`, 3)
				} else {
					emitToolEvent('scrollToEshopSection', { sectionId })
				}
			}, 120)
			return { success: true, navigatedTo: path, sectionId }
		}

		case 'openEshopProduct': {
			const productId = Number(args.productId)
			const product = getEshopProductById(productId)
			if (!product) {
				return { success: false, error: `Unknown eShop product: ${productId}` }
			}

			const sectionId = getEshopSectionForProduct(productId)
			const path = `/eshop#${sectionId}`
			useEshopStore.getState().closeCart()
			navigateTo(path)

			window.setTimeout(() => {
				const sectionElement = document.getElementById(sectionId)
				if (sectionElement) {
					sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
				}

				window.setTimeout(() => {
					const productElement = document.getElementById(`eshop-product-${productId}`)
					if (productElement) {
						productElement.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
							inline: 'center',
						})
						highlight(`#eshop-product-${productId}`, 3)
					} else {
						emitToolEvent('scrollToEshopProduct', { productId })
					}
				}, 180)
			}, 120)

			return {
				success: true,
				navigatedTo: path,
				productId,
				productName: product.name,
				sectionId,
			}
		}

		case 'openEshopProductDetail': {
			const productId = Number(args.productId)
			const detailProduct = getEshopProductDetailById(productId)
			if (!detailProduct) {
				return { success: false, error: `No detail page for eShop product: ${productId}` }
			}

			useEshopStore.getState().closeCart()
			const path = `/eshop/product/${detailProduct.slug}`
			smartNavigateTo(path)
			return {
				success: true,
				navigatedTo: path,
				productId,
				productName: detailProduct.name,
			}
		}

		case 'addEshopProductToCart': {
			const productId = Number(args.productId)
			const result = useEshopStore.getState().addItem(productId)
			return { success: result.success, ...result, productId }
		}

		case 'showEshopCart': {
			useEshopStore.getState().openCart()
			smartNavigateTo('/eshop')
			return { success: true, navigatedTo: '/eshop', ...buildEshopCartSummary() }
		}

		case 'getEshopCart':
			return { success: true, ...buildEshopCartSummary() }

		case 'openEshopCheckout':
			useEshopStore.getState().closeCart()
			smartNavigateTo('/eshop/checkout')
			return { success: true, navigatedTo: '/eshop/checkout', ...buildEshopCartSummary() }

		case 'openIphone17Detail':
			useEshopStore.getState().closeCart()
			smartNavigateTo('/eshop/product/iphone-17')
			return { success: true, navigatedTo: '/eshop/product/iphone-17', productId: 21 }

		case 'openIphone17ProDetail':
			useEshopStore.getState().closeCart()
			smartNavigateTo('/eshop/product/iphone-17-pro')
			return { success: true, navigatedTo: '/eshop/product/iphone-17-pro', productId: 22 }

		case 'fillEshopCheckoutField': {
			const fieldName = String(args.fieldName) as EshopCheckoutFieldName
			const value = String(args.value ?? '')
			useEshopCheckoutStore.getState().setField(fieldName, value)
			return {
				success: true,
				fieldName,
				label: eshopCheckoutFieldLabels[fieldName],
				value,
			}
		}

		case 'getEshopCheckoutData': {
			const checkoutStore = useEshopCheckoutStore.getState()
			return {
				success: true,
				formData: checkoutStore.formData,
				missingFields: checkoutStore.getMissingFields(),
				isSubmitted: checkoutStore.isSubmitted,
			}
		}

		case 'highlightEshopCheckoutField': {
			const fieldName = String(args.fieldName) as EshopCheckoutFieldName
			highlight(`#eshop-checkout-${fieldName}`, args.duration ?? 3)
			return { success: true, fieldName }
		}

		case 'submitEshopCheckout': {
			const result = useEshopCheckoutStore.getState().submit()
			if (!result.success) {
				return { success: false, missingFields: result.missingFields }
			}

			return { success: true, formData: result.formData, ...buildEshopCartSummary() }
		}

		case 'openZainFiber':
			navigateTo('/zain/fiber')
			return { success: true, navigatedTo: '/zain/fiber' }

		case 'openZainSubscribe': {
			const packageParam = args.packageId ? `?package=${args.packageId}` : ''
			navigateTo(`/zain/subscribe${packageParam}`)
			return { success: true, navigatedTo: `/zain/subscribe${packageParam}` }
		}

		case 'openTamkeenHome':
			navigateTo('/BahrainCredit')
			return { success: true, navigatedTo: '/BahrainCredit' }

		case 'openTamkeenCarLoan':
			navigateTo('/BahrainCredit/loans/car-loan')
			return { success: true, navigatedTo: '/BahrainCredit/loans/car-loan' }

		case 'openTamkeenCards':
			navigateTo('/BahrainCredit/cards/imtiaz')
			return { success: true, navigatedTo: '/BahrainCredit/cards/imtiaz' }

		case 'openTamkeenWorldCard':
			navigateTo('/BahrainCredit/cards/world')
			return { success: true, navigatedTo: '/BahrainCredit/cards/world' }

		case 'openTamkeenLoanApplication':
			navigateTo('/BahrainCredit/loans/car-loan/apply')
			return { success: true, navigatedTo: '/BahrainCredit/loans/car-loan/apply' }

		case 'openTamkeenCardApplication': {
			const cardType = String(args.cardType || 'imtiaz')
			const query = cardType ? `?card=${encodeURIComponent(cardType)}` : ''
			navigateTo(`/BahrainCredit/cards/apply${query}`)
			return { success: true, navigatedTo: `/BahrainCredit/cards/apply${query}`, cardType }
		}

		case 'scrollToTamkeenSection': {
			const sectionId = String(args.sectionId || '')
			emitToolEvent('scrollToTamkeenSection', { sectionId })
			window.setTimeout(() => {
				const element = document.getElementById(sectionId) || document.getElementById(`tamkeen-world-${sectionId}`)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${element.id}`, 3)
				}
			}, 120)
			return { success: true, scrolledTo: sectionId }
		}

		// MOIN (Ministry of Investment) Tools
		case 'openMoinServices':
			navigateTo('/moin')
			return { success: true, navigatedTo: '/moin' }

		case 'openMoinService':
			navigateTo('/moin/service')
			return { success: true, navigatedTo: '/moin/service' }

		case 'openMoinApplication':
			navigateTo('/moin/service/submit')
			return { success: true, navigatedTo: '/moin/service/submit' }

		case 'moinAgreeTerms': {
			const store = useFormStore.getState()
			store.setField('moinTermsAccepted', true)
			emitToolEvent('moinAgreeTerms', {})
			return { success: true, agreed: true }
		}

		case 'getWeather': {
			try {
				const response = await fetch('/api/weather', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						latitude: args.latitude || '31.953753',
						longitude: args.longitude || '35.910053',
					}),
				})
				if (!response.ok) {
					return { success: false, error: 'Weather service unavailable' }
				}
				const weatherData = await response.json()
				return { success: true, weather: weatherData }
			} catch (e: any) {
				return { success: false, error: e.message }
			}
		}

		case 'scrollToMoinSection': {
			const moinSectionMap: Record<string, string> = {
				terms: 'moin-terms-list',
				agreement: 'moin-agreement-section',
				services: 'moin-services-grid',
			}
			const moinElementId = moinSectionMap[args.section]
			if (moinElementId) {
				const element = document.getElementById(moinElementId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${moinElementId}`, 3)
					return { success: true, scrolledTo: args.section }
				}
				return { success: false, error: `Section element not found: ${moinElementId}` }
			}
			return { success: false, error: `Unknown section: ${args.section}` }
		}

		// GIG Jordan Tools
		case 'openGigHome':
			navigateTo('/gig')
			return { success: true, navigatedTo: '/gig' }

		case 'openGigCrownFamily':
			navigateTo('/gig/crown-family')
			return { success: true, navigatedTo: '/gig/crown-family' }

		case 'openGigSubmit':
			navigateTo('/gig/submit')
			return { success: true, navigatedTo: '/gig/submit' }

		case 'openGigAdvisorRequest': {
			const target = String(args.target || '')
			const reason = String(args.reason || '')
			const label = String(args.label || getGigInsuranceLabel(target) || '')
			const path = buildGigAdvisorRequestPath(target, reason, label)
			navigateTo(path)
			return { success: true, navigatedTo: path, target, label }
		}

		case 'routeGigInsurance': {
			const target = String(args.target || '')
			const routePath = gigInsuranceTargets[target]
			const reason = String(args.reason || '')
			const label = getGigInsuranceLabel(target)
			const shouldOpenForm = Boolean(args.openForm)

			if (!routePath) {
				return {
					success: false,
					error: `Unknown GIG insurance target: ${target}`,
					availableTargets: Object.keys(gigInsuranceTargets)
				}
			}

			if (shouldOpenForm) {
				const path = buildGigAdvisorRequestPath(target, reason, label)
				navigateTo(path)
				return {
					success: true,
					target,
					label,
					navigatedTo: path
				}
			}

			navigateTo(routePath)
			return { success: true, target, label, navigatedTo: routePath }
		}

		case 'openGigOfficial':
			navigateTo('/gig/crown-family')
			return { success: true, navigatedTo: '/gig/crown-family' }

		case 'scrollToGigSection': {
			const sectionId = args.section
			const sectionMap: Record<string, string> = {
				overview: 'gig-overview',
				maternity: 'gig-maternity',
				benefits: 'gig-advanced-benefits',
				death: 'gig-death-benefit',
				pricing: 'gig-pricing'
			}
			const elementId = sectionMap[sectionId]
			if (elementId) {
				const element = document.getElementById(elementId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
					highlight(`#${elementId}`, 3)
					return { success: true, scrolledTo: sectionId }
				}
				emitToolEvent('scrollToGigSection', args)
				return { success: true, queuedScrollTo: sectionId }
			}
			return { success: false, error: `Unknown section: ${sectionId}` }
		}

		case 'scrollToFiberPackage': {
			const packageId = args.packageId
			const elementId = `${packageId}-section`
			const element = document.getElementById(elementId)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' })
				highlight(`#${elementId}`, 3)
				emitToolEvent('scrollToFiberPackage', args)
				return { success: true, scrolledTo: packageId }
			}
			return { success: false, error: `Package element not found: ${elementId}` }
		}

		case 'switchFiberTab': {
			emitToolEvent('switchFiberTab', args)
			return { success: true, switchedTo: args.tabId }
		}

		case 'checkFiberCoverage': {
			// Simulate coverage check - in production this would call an API
			const coveredAreas = ['عمان', 'إربد', 'الزرقاء', 'العقبة', 'السلط', 'المفرق']
			const city = args.city || ''
			const area = args.area || ''
			const isCovered = coveredAreas.some(c => 
				city.includes(c) || area.includes(c) || c.includes(city) || c.includes(area)
			)
			return { 
				success: true, 
				covered: isCovered, 
				area: area,
				city: city,
				message: isCovered 
					? 'خدمة زين فايبر متوفرة في منطقتك' 
					: 'نأسف، خدمة الفايبر غير متوفرة حالياً في هذه المنطقة'
			}
		}

		case 'selectPackage': {
			emitToolEvent('selectPackage', args)
			const elementId = `${args.packageId}-section`
			const element = document.getElementById(elementId)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' })
				highlight(`#${elementId}`, 3)
			}
			return { success: true, selectedPackage: args.packageId }
		}

		default:
			console.warn('[AgentTools] Unknown tool:', tool)
			return { success: false, error: 'Unknown tool' }
	}
}
