import React from 'react'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoServicesSection } from '../components/saso/SasoServicesSection'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'

export default function SasoServices() {
  return (
    <div className="min-h-screen bg-[#F6F7F8]" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader />
      <SasoServicesSection />
      <SasoFloatingActions />
    </div>
  )
}
