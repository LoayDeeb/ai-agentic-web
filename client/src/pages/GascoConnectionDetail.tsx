import React from 'react'
import { GascoHeader } from '../components/gasco/GascoHeader'
import { GascoConnectionDetail as GascoConnectionDetailSection } from '../components/gasco/GascoConnectionDetail'
import { GascoFloatingActions } from '../components/gasco/GascoFloatingActions'

export default function GascoConnectionDetail() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <GascoHeader breadcrumb={['E-Services', 'New Gas Connection']} />
      <GascoConnectionDetailSection />
      <GascoFloatingActions />
    </div>
  )
}
