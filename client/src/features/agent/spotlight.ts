let spotlightEl: HTMLDivElement | null = null

export function highlight(selector: string, seconds = 3, attempt = 0) {
	const el = document.querySelector<HTMLElement>(selector)

	if (!el) {
		// Retry for ~2 seconds total (20 × 100ms) to handle:
		// - route change
		// - data fetch for ServiceDetail
		// - tab content mounting
		if (attempt > 20) {
			console.warn('[spotlight] Element not found for selector:', selector)
			return
		}
		setTimeout(() => highlight(selector, seconds, attempt + 1), 100)
		return
	}

	// Lazily create the spotlight overlay
	if (!spotlightEl) {
		spotlightEl = document.createElement('div')
		spotlightEl.style.position = 'absolute'
		spotlightEl.style.border = '2px solid #FFD700' // Gold/Yellow border
		spotlightEl.style.backgroundColor = 'rgba(255, 215, 0, 0.2)' // Yellow tint
		spotlightEl.style.borderRadius = '12px'
		spotlightEl.style.pointerEvents = 'none'
		spotlightEl.style.boxShadow = '0 0 0 4px rgba(255, 215, 0, 0.2)' // Yellow glow
		spotlightEl.style.transition = 'opacity 0.2s ease-out'
		spotlightEl.style.zIndex = '9999'
		document.body.appendChild(spotlightEl)
	}

	// Ensure the element is on-screen
	el.scrollIntoView({ behavior: 'smooth', block: 'center' })

	const rect = el.getBoundingClientRect()
	spotlightEl.style.left = `${rect.left + window.scrollX - 6}px`
	spotlightEl.style.top = `${rect.top + window.scrollY - 6}px`
	spotlightEl.style.width = `${rect.width + 12}px`
	spotlightEl.style.height = `${rect.height + 12}px`
	spotlightEl.style.opacity = '1'

	setTimeout(() => {
		if (spotlightEl) spotlightEl.style.opacity = '0'
	}, seconds * 1000)
}


