import React from 'react'
import { GascoHeader } from '../components/gasco/GascoHeader'
import { GascoServicesSection } from '../components/gasco/GascoServicesSection'
import { GascoFloatingActions } from '../components/gasco/GascoFloatingActions'

export default function GascoServices() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <GascoHeader breadcrumb={['E-Services']} />
      <GascoServicesSection />
      <GascoFloatingActions />
    </div>
  )
}
