import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AgentDock } from './features/voice/AgentDock'
import { useLocation, useNavigate } from 'react-router-dom'
import { setNavigator } from './features/agent/navigator'
import { ProtectedRoute } from './components/ProtectedRoute'
import EshopCheckout from './pages/EshopCheckout'
import EshopHome from './pages/EshopHome'
import EshopProductDetail from './pages/EshopProductDetail'

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
const SasoRegulations = React.lazy(() => import('./pages/SasoRegulations'))
const SasoRegulationDetail = React.lazy(() => import('./pages/SasoRegulationDetail'))
const GascoHome = React.lazy(() => import('./pages/GascoHome'))
const GascoServices = React.lazy(() => import('./pages/GascoServices'))
const GascoConnectionDetail = React.lazy(() => import('./pages/GascoConnectionDetail'))
const GigHome = React.lazy(() => import('./pages/GigHome'))
const GigCrownFamily = React.lazy(() => import('./pages/GigCrownFamily'))
const GigSubmitRequest = React.lazy(() => import('./pages/GigSubmitRequest'))
const GigAdvisorRequest = React.lazy(() => import('./pages/GigAdvisorRequest'))
const GigInsuranceDestination = React.lazy(() => import('./pages/GigInsuranceDestination'))
// MOIN (Ministry of Investment) Pages
const MoinServices = React.lazy(() => import('./pages/MoinServices'))
const MoinServiceDetail = React.lazy(() => import('./pages/MoinServiceDetail'))
const MoinSubmitRequest = React.lazy(() => import('./pages/MoinSubmitRequest'))

// Zain Jordan Pages
const ZainHome = React.lazy(() => import('./pages/ZainHome'))
const ZainFiber = React.lazy(() => import('./pages/ZainFiber'))
const ZainSubscribe = React.lazy(() => import('./pages/ZainSubscribe'))
const TamkeenBahrainHome = React.lazy(() => import('./pages/TamkeenBahrainHome'))
const TamkeenBahrainCarLoan = React.lazy(() => import('./pages/TamkeenBahrainCarLoan'))
const TamkeenBahrainCards = React.lazy(() => import('./pages/TamkeenBahrainCards'))
const TamkeenBahrainWorldCard = React.lazy(() => import('./pages/TamkeenBahrainWorldCard'))
const TamkeenBahrainForHerWorldCard = React.lazy(() => import('./pages/TamkeenBahrainForHerWorldCard'))
const TamkeenBahrainPlatinumCard = React.lazy(() => import('./pages/TamkeenBahrainPlatinumCard'))
const TamkeenBahrainLoanApply = React.lazy(() => import('./pages/TamkeenBahrainLoanApply'))
const TamkeenBahrainCardApply = React.lazy(() => import('./pages/TamkeenBahrainCardApply'))
const BaptismHome = React.lazy(() => import('./pages/BaptismHome'))
const BaptismBook = React.lazy(() => import('./pages/BaptismBook'))
const BaptismGeneralVisitsTours = React.lazy(() => import('./pages/BaptismGeneralVisitsTours'))
const BaptismTripPlanner = React.lazy(() => import('./pages/BaptismTripPlanner'))
const BaptismGuidedTours = React.lazy(() => import('./pages/BaptismGuidedTours'))
const BaptismGuidedTourDetail = React.lazy(() => import('./pages/BaptismGuidedTourDetail'))
const BaptismGuidedTourRequest = React.lazy(() => import('./pages/BaptismGuidedTourRequest'))
const BaptismReligiousService = React.lazy(() => import('./pages/BaptismReligiousService'))

export default function App() {
	const NavSetter = () => {
		const navigate = useNavigate()
		React.useEffect(() => {
			setNavigator((path: string) => navigate(path))
		}, [navigate])
		return null
	}
	const ScrollManager = () => {
		const location = useLocation()
		React.useEffect(() => {
			if (location.hash) return
			window.scrollTo(0, 0)
		}, [location.pathname, location.search, location.hash])
		return null
	}
	return (
		<div className="min-h-screen text-[#1F2A37]">
				<NavSetter />
				<ScrollManager />
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
					<Route path="/BahrainCredit" element={<TamkeenBahrainHome />} />
					<Route path="/bahraincredit" element={<TamkeenBahrainHome />} />
					<Route path="/BahrainCredit/loans/car-loan" element={<TamkeenBahrainCarLoan />} />
					<Route path="/bahraincredit/loans/car-loan" element={<TamkeenBahrainCarLoan />} />
					<Route path="/BahrainCredit/loans/car-loan/apply" element={<TamkeenBahrainLoanApply />} />
					<Route path="/bahraincredit/loans/car-loan/apply" element={<TamkeenBahrainLoanApply />} />
					<Route path="/BahrainCredit/cards/imtiaz" element={<TamkeenBahrainCards />} />
					<Route path="/bahraincredit/cards/imtiaz" element={<TamkeenBahrainCards />} />
					<Route path="/BahrainCredit/cards/world" element={<TamkeenBahrainWorldCard />} />
					<Route path="/bahraincredit/cards/world" element={<TamkeenBahrainWorldCard />} />
					<Route path="/BahrainCredit/cards/for-her-world" element={<TamkeenBahrainForHerWorldCard />} />
					<Route path="/bahraincredit/cards/for-her-world" element={<TamkeenBahrainForHerWorldCard />} />
					<Route path="/BahrainCredit/cards/platinum" element={<TamkeenBahrainPlatinumCard />} />
					<Route path="/bahraincredit/cards/platinum" element={<TamkeenBahrainPlatinumCard />} />
					<Route path="/BahrainCredit/cards/apply" element={<TamkeenBahrainCardApply />} />
					<Route path="/bahraincredit/cards/apply" element={<TamkeenBahrainCardApply />} />
					<Route path="/tamkeenbahrain" element={<TamkeenBahrainHome />} />
					<Route path="/tamkeenbahrain/loans/car-loan" element={<TamkeenBahrainCarLoan />} />
					<Route path="/tamkeenbahrain/loans/car-loan/apply" element={<TamkeenBahrainLoanApply />} />
					<Route path="/tamkeenbahrain/cards/imtiaz" element={<TamkeenBahrainCards />} />
					<Route path="/tamkeenbahrain/cards/world" element={<TamkeenBahrainWorldCard />} />
					<Route path="/tamkeenbahrain/cards/for-her-world" element={<TamkeenBahrainForHerWorldCard />} />
					<Route path="/tamkeenbahrain/cards/platinum" element={<TamkeenBahrainPlatinumCard />} />
					<Route path="/tamkeenbahrain/cards/apply" element={<TamkeenBahrainCardApply />} />
					<Route path="/eshop" element={<EshopHome />} />
					<Route path="/eshop/checkout" element={<EshopCheckout />} />
					<Route path="/eshop/product/:slug" element={<EshopProductDetail />} />
					<Route path="/baptism" element={<BaptismHome />} />
					<Route path="/baptism/book" element={<BaptismBook />} />
					<Route path="/baptism/book/general" element={<BaptismGeneralVisitsTours />} />
					<Route path="/baptism/book/general/visit" element={<BaptismTripPlanner />} />
					<Route path="/baptism/guided-tours" element={<BaptismGuidedTours />} />
					<Route path="/baptism/guided-tours/:id/request" element={<BaptismGuidedTourRequest />} />
					<Route path="/baptism/guided-tours/:id" element={<BaptismGuidedTourDetail />} />
					<Route path="/baptism/book/religious" element={<BaptismReligiousService />} />
					<Route path="/baptism/religious-service" element={<BaptismReligiousService />} />

					{/* SASO Routes */}
					<Route path="/saso" element={<SasoHome />} />
					<Route path="/saso/services" element={<SasoServices />} />
					<Route path="/saso/regulations" element={<SasoRegulations />} />
					<Route path="/saso/regulations/:slug" element={<SasoRegulationDetail />} />
					<Route path="/saso/service/imported-vehicles" element={<SasoAppointmentDetail />} />
					<Route path="/saso/service/imported-vehicles/submit" element={<SasoImportedVehicleSubmit />} />

					{/* GASCO Routes */}
					<Route path="/gasco" element={<GascoHome />} />
					<Route path="/gasco/services" element={<GascoServices />} />
					<Route path="/gasco/service/new-connection" element={<GascoConnectionDetail />} />

					{/* MOIN (Ministry of Investment) Routes */}
					<Route path="/moin" element={<MoinServices />} />
					<Route path="/moin/service" element={<MoinServiceDetail />} />
					<Route path="/moin/service/submit" element={<MoinSubmitRequest />} />

					{/* GIG Jordan Routes */}
					<Route path="/gig" element={<GigHome />} />
					<Route path="/gig/crown-family" element={<GigCrownFamily />} />
					<Route path="/gig/submit" element={<GigSubmitRequest />} />
					<Route path="/gig/advisor-request" element={<GigAdvisorRequest />} />
					<Route path="/gig/insurance/:target" element={<GigInsuranceDestination />} />
					
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
