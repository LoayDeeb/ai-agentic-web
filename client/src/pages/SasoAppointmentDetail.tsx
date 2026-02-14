import React from 'react'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoAppointmentDetailContent } from '../components/saso/SasoAppointmentDetailContent'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'

export default function SasoAppointmentDetail() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['الخدمات الإلكترونية', 'فحص المركبات المستوردة']} />
      <SasoAppointmentDetailContent />
      <SasoFloatingActions />
    </div>
  )
}
