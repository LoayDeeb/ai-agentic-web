import React from 'react'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoAppointmentDetailContent } from '../components/saso/SasoAppointmentDetailContent'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'

export default function SasoAppointmentDetail() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['Electronic Services', 'Book Appointment']} />
      <SasoAppointmentDetailContent />
      <SasoFloatingActions />
    </div>
  )
}
