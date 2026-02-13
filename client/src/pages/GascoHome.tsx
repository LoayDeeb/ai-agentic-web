import React from 'react'
import { GascoHeader } from '../components/gasco/GascoHeader'
import { GascoHero } from '../components/gasco/GascoHero'
import { GascoFloatingActions } from '../components/gasco/GascoFloatingActions'

export default function GascoHome() {
  return (
    <div className="min-h-screen bg-[#0B1220]" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <GascoHeader />
      <GascoHero />
      <GascoFloatingActions />
    </div>
  )
}
