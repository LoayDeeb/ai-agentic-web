let navFn: ((path: string) => void) | null = null

export function setNavigator(fn: (path: string) => void) {
	navFn = fn
}

export function navigateTo(path: string) {
	if (navFn) navFn(path)
	else window.location.href = path
}


