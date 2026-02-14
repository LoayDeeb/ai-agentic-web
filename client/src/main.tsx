import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'

// Recover automatically from stale lazy-loaded chunks after new deployments.
const CHUNK_RELOAD_KEY = 'vite_chunk_reload_once'
window.addEventListener('vite:preloadError', () => {
	if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return
	sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
	window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundary>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>
)

