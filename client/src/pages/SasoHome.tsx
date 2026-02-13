import React from 'react'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoHeroCarousel } from '../components/saso/SasoHeroCarousel'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'

export default function SasoHome() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader />
      <SasoHeroCarousel />
      <SasoFloatingActions />
    </div>
  )
}
