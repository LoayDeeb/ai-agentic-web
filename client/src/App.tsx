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
const EFPrograms = React.lazy(() => import('./pages/EFPrograms'))
const EFProgramDetail = React.lazy(() => import('./pages/EFProgramDetail'))
const EFSubmitApplication = React.lazy(() => import('./pages/EFSubmitApplication'))
const EFProgramsAr = React.lazy(() => import('./pages/EFProgramsAr'))
const EFProgramDetailAr = React.lazy(() => import('./pages/EFProgramDetailAr'))
const EFSubmitApplicationAr = React.lazy(() => import('./pages/EFSubmitApplicationAr'))
const SasoHome = React.lazy(() => import('./pages/SasoHome'))
const SasoServices = React.lazy(() => import('./pages/SasoServices'))
const SasoAppointmentDetail = React.lazy(() => import('./pages/SasoAppointmentDetail'))
const SasoImportedVehicleSubmit = React.lazy(() => import('./pages/SasoImportedVehicleSubmit'))
const GascoHome = React.lazy(() => import('./pages/GascoHome'))
const GascoServices = React.lazy(() => import('./pages/GascoServices'))
const GascoConnectionDetail = React.lazy(() => import('./pages/GascoConnectionDetail'))

// Zain Jordan Pages
const ZainHome = React.lazy(() => import('./pages/ZainHome'))
const ZainFiber = React.lazy(() => import('./pages/ZainFiber'))
const ZainSubscribe = React.lazy(() => import('./pages/ZainSubscribe'))

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
					
					{/* EF (Environment Fund) Routes */}
					<Route path="/ef" element={<EFPrograms />} />
					<Route path="/ef/program/:id" element={<EFProgramDetail />} />
					<Route path="/ef/apply/:id" element={<EFSubmitApplication />} />
					
					{/* EF Arabic Routes */}
					<Route path="/ef-ar" element={<EFProgramsAr />} />
					<Route path="/ef-ar/program/:id" element={<EFProgramDetailAr />} />
					<Route path="/ef-ar/apply/:id" element={<EFSubmitApplicationAr />} />
					
					{/* Zain Jordan Routes */}
					<Route path="/zain" element={<ZainHome />} />
					<Route path="/zain/fiber" element={<ZainFiber />} />
					<Route path="/zain/subscribe" element={<ZainSubscribe />} />

					{/* SASO Routes */}
					<Route path="/saso" element={<SasoHome />} />
					<Route path="/saso/services" element={<SasoServices />} />
					<Route path="/saso/service/imported-vehicles" element={<SasoAppointmentDetail />} />
					<Route path="/saso/service/imported-vehicles/submit" element={<SasoImportedVehicleSubmit />} />

					{/* GASCO Routes */}
					<Route path="/gasco" element={<GascoHome />} />
					<Route path="/gasco/services" element={<GascoServices />} />
					<Route path="/gasco/service/new-connection" element={<GascoConnectionDetail />} />
					
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
