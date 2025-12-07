import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	async componentDidCatch(error: any, errorInfo: any) {
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
			return <div className="p-6">Something went wrong.</div>
		}
		return this.props.children
	}
}


