import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
	private static readonly CHUNK_RETRY_KEY = '__chunk_load_retry__'
	private static readonly CHUNK_RETRY_WINDOW_MS = 15000

	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	private isChunkLoadError(error: unknown) {
		const message = String((error as any)?.message || error || '')
		return /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk/i.test(message)
	}

	async componentDidCatch(error: any, errorInfo: any) {
		if (typeof window !== 'undefined' && this.isChunkLoadError(error)) {
			const lastRetry = Number(window.sessionStorage.getItem(ErrorBoundary.CHUNK_RETRY_KEY) || '0')
			const now = Date.now()
			const canRetry = now - lastRetry > ErrorBoundary.CHUNK_RETRY_WINDOW_MS

			if (canRetry) {
				window.sessionStorage.setItem(ErrorBoundary.CHUNK_RETRY_KEY, String(now))
				window.location.reload()
				return
			}
		}

		try {
			await fetch('/api/logs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					level: 'error',
					source: 'client',
					error: String(error?.message || error),
					errorInfo
				})
			})
		} catch {
			// noop
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="p-6 space-y-3">
					<p>Something went wrong while loading this page.</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 rounded bg-[#1B8354] text-white"
					>
						Reload page
					</button>
				</div>
			)
		}
		return this.props.children
	}
}


