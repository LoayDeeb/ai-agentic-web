import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SasoHeader } from '../components/saso/SasoHeader'

export default function SasoImportedVehicleSubmit() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    mobile: '',
    chassisNumber: '',
    customsNumber: '',
    vehicleType: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['الخدمات الإلكترونية', 'فحص المركبات المستوردة', 'تقديم الطلب']} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-[#1F2A37] mb-2">نموذج طلب فحص المركبات المستوردة</h1>
          <p className="text-[#4B5563] mb-8">يرجى تعبئة البيانات التالية بدقة لإرسال الطلب.</p>

          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1F2A37]">الاسم الكامل</label>
                <input required value={formData.fullName} onChange={(e) => onChange('fullName', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1F2A37]">رقم الهوية / الإقامة</label>
                  <input required value={formData.nationalId} onChange={(e) => onChange('nationalId', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1F2A37]">رقم الجوال</label>
                  <input required value={formData.mobile} onChange={(e) => onChange('mobile', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1F2A37]">رقم الهيكل (VIN)</label>
                  <input required value={formData.chassisNumber} onChange={(e) => onChange('chassisNumber', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1F2A37]">رقم البيان الجمركي</label>
                  <input required value={formData.customsNumber} onChange={(e) => onChange('customsNumber', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#1F2A37]">نوع المركبة</label>
                <select required value={formData.vehicleType} onChange={(e) => onChange('vehicleType', e.target.value)} className="w-full h-11 rounded-md border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B8354]/30">
                  <option value="">اختر نوع المركبة</option>
                  <option value="sedan">سيارة سيدان</option>
                  <option value="suv">سيارة رياضية متعددة الاستخدام</option>
                  <option value="truck">شاحنة خفيفة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="h-11 px-6 rounded-md bg-[#1B8354] text-white font-semibold hover:bg-[#156b45]">
                  إرسال الطلب
                </button>
                <button type="button" onClick={() => navigate('/saso/service/imported-vehicles')} className="h-11 px-6 rounded-md border border-gray-300 text-[#1F2A37] font-semibold hover:bg-gray-50">
                  رجوع
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-lg border border-[#D1FAE5] bg-[#F0FDF4] p-6">
              <h2 className="text-xl font-bold text-[#166534] mb-2">تم إرسال الطلب بنجاح</h2>
              <p className="text-[#065F46] mb-4">رقم الطلب المرجعي: SASO-REQ-IMV-2026</p>
              <button onClick={() => navigate('/saso/services')} className="h-10 px-5 rounded-md bg-[#1B8354] text-white font-semibold hover:bg-[#156b45]">
                العودة إلى الخدمات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
