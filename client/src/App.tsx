import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AgentDock } from './features/voice/AgentDock'
import { useNavigate } from 'react-router-dom'
import { setNavigator } from './features/agent/navigator'
import { ProtectedRoute } from './components/ProtectedRoute'

const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Services = React.lazy(() => import('./pages/Services'))
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'))
const InstallmentRequest = React.lazy(() => import('./pages/InstallmentRequest'))
const MawhibaServices = React.lazy(() => import('./pages/MawhibaServices'))
const MawhibaServiceDetail = React.lazy(() => import('./pages/MawhibaServiceDetail'))
const MawhibaInstallmentRequest = React.lazy(() => import('./pages/MawhibaInstallmentRequest'))
const SDBServices = React.lazy(() => import('./pages/SDBServices'))
const SDBServiceDetail = React.lazy(() => import('./pages/SDBServiceDetail'))
const SDBSubmitRequest = React.lazy(() => import('./pages/SDBSubmitRequest'))
const JicoServices = React.lazy(() => import('./pages/JicoServices'))
const JicoMedicalInsurance = React.lazy(() => import('./pages/JicoMedicalInsurance'))
const JicoSubmitRequest = React.lazy(() => import('./pages/JicoSubmitRequest'))

export default function App() {
	const NavSetter = () => {
		const navigate = useNavigate()
		React.useEffect(() => {
			setNavigator((path: string) => navigate(path))
		}, [navigate])
		return null
	}
	return (
		<div className="min-h-screen text-[#1F2A37]">
			<NavSetter />
			<React.Suspense fallback={<div className="p-6">Loading…</div>}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/services" element={<Services />} />
					<Route path="/services/:slug" element={<ServiceDetail />} />
					<Route
						path="/services/:slug/submit"
						element={
							<ProtectedRoute>
								<InstallmentRequest />
							</ProtectedRoute>
						}
					/>
					{/* Mawhiba Routes */}
					<Route path="/mawhiba" element={<MawhibaServices />} />
					<Route path="/mawhiba/service" element={<MawhibaServiceDetail />} />
					<Route path="/mawhiba/service/submit" element={<MawhibaInstallmentRequest />} />
					
					{/* SDB Routes */}
					<Route path="/sdb" element={<SDBServices />} />
					<Route path="/sdb/service" element={<SDBServiceDetail />} />
					<Route path="/sdb/submit" element={<SDBSubmitRequest />} />
					
					{/* JICO Routes */}
					<Route path="/jico" element={<JicoServices />} />
					<Route path="/jico/medical" element={<JicoMedicalInsurance />} />
					<Route path="/jico/submit" element={<JicoSubmitRequest />} />
					
					<Route
						path="*"
						element={
							<div className="p-6">
								<p className="mb-4">Not found.</p>
								<Link to="/" className="text-green-700 underline">
									Go Home
								</Link>
							</div>
						}
					/>
				</Routes>
			</React.Suspense>
			<AgentDock />
		</div>
	)
}
