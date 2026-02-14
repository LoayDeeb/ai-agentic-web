import React from 'react'
import { TopHeaderBar } from '../components/TopHeader'
import { ZATCAHeader } from '../components/ZATCAHeader'
import { SasoAppointmentDetailContent } from '../components/saso/SasoAppointmentDetailContent'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'
import { useLocaleStore } from '../store/locale'

export default function SasoAppointmentDetail() {
  const switchLang = useLocaleStore((s) => s.switchLanguage)
  const dir = useLocaleStore((s) => s.dir)

  React.useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <TopHeaderBar onLanguageSwitch={() => switchLang()} />
      <ZATCAHeader />
      <SasoAppointmentDetailContent />
      <SasoFloatingActions />
    </div>
  )
}
