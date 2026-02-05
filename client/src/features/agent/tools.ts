import { navigateTo } from './navigator'
import { highlight } from './spotlight'
import i18n from '../../i18n'
import { useFormStore } from '../../store/formStore'

export type AgentTool = {
	tool: string
	args: any
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

// Execute agent tool calls
export async function executeAgentTool(tool: string, args: any): Promise<any> {
	console.log('[AgentTools] Executing:', tool, args)

	switch (tool) {
		case 'navigateTo':
			navigateTo(args.path)
			return { success: true, navigatedTo: args.path }

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
			i18n.changeLanguage(args.lang)
			if (args.lang === 'ar') {
				document.documentElement.dir = 'rtl'
				document.documentElement.lang = 'ar'
			} else {
				document.documentElement.dir = 'ltr'
				document.documentElement.lang = 'en'
			}
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
			const nextStep = currentStep + 1
			// Assuming max steps is 3 for Mawhiba, but goToFormStep handles clamping
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

		case 'openZainFiber':
			navigateTo('/zain/fiber')
			return { success: true, navigatedTo: '/zain/fiber' }

		case 'openZainSubscribe': {
			const packageParam = args.packageId ? `?package=${args.packageId}` : ''
			navigateTo(`/zain/subscribe${packageParam}`)
			return { success: true, navigatedTo: `/zain/subscribe${packageParam}` }
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
