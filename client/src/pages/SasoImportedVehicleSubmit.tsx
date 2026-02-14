import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CarFront, FileText } from 'lucide-react'
import { SasoHeader } from '../components/saso/SasoHeader'
import { FormField, TextInput, SelectInput } from '../components/FormField'
import { useFormStore } from '../store/formStore'
import { highlight } from '../features/agent/spotlight'

export default function SasoImportedVehicleSubmit() {
  const navigate = useNavigate()
  const formData = useFormStore((s) => s.formData)
  const setField = useFormStore((s) => s.setField)
  const currentStep = useFormStore((s) => s.currentStep)
  const setCurrentStep = useFormStore((s) => s.setCurrentStep)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    document.documentElement.dir = 'rtl'
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const { tool, args } = (e as CustomEvent).detail

      if (tool === 'fillFormField') {
        setField(args.fieldName, args.value)
        setTimeout(() => {
          const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement
          if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' })
            highlight(`[name="${args.fieldName}"]`, 2)
          }
        }, 100)
      } else if (tool === 'goToFormStep') {
        setCurrentStep(args.step)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (tool === 'highlightFormField') {
        const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' })
          highlight(`[name="${args.fieldName}"]`, args.duration || 3)
        }
      } else if (tool === 'submitForm') {
        if (currentStep === 3) handleSubmit()
      }
    }

    window.addEventListener('agentTool', handler)
    return () => window.removeEventListener('agentTool', handler)
  }, [currentStep, setCurrentStep, setField])

  const steps = [
    { number: 1, label: 'بيانات المستفيد', completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, label: 'بيانات المركبة', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, label: 'المراجعة والإرسال', completed: submitted, active: currentStep === 3 }
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.sasoApplicantName) newErrors.sasoApplicantName = 'الاسم مطلوب'
      if (!formData.sasoNationalId) newErrors.sasoNationalId = 'رقم الهوية مطلوب'
      if (!formData.sasoMobile) newErrors.sasoMobile = 'رقم الجوال مطلوب'
    } else if (step === 2) {
      if (!formData.sasoChassisNumber) newErrors.sasoChassisNumber = 'رقم الهيكل مطلوب'
      if (!formData.sasoCustomsNumber) newErrors.sasoCustomsNumber = 'رقم البيان الجمركي مطلوب'
      if (!formData.sasoVehicleType) newErrors.sasoVehicleType = 'نوع المركبة مطلوب'
    } else if (step === 3) {
      if (!formData.sasoTermsAccepted) newErrors.sasoTermsAccepted = 'يجب الموافقة على الشروط والأحكام'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 3))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
        <SasoHeader showBreadcrumb breadcrumb={['الخدمات الإلكترونية', 'فحص المركبات المستوردة', 'تقديم الطلب']} />
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
            <CheckCircle className="w-20 h-20 text-[#1B8354] mx-auto mb-5" />
            <h1 className="text-3xl font-bold text-[#1F2A37] mb-3">تم إرسال الطلب بنجاح</h1>
            <p className="text-gray-600 mb-6">تم استلام طلب فحص المركبة المستوردة وسيتم إشعارك بحالة الطلب.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">رقم الطلب المرجعي: SASO-IMV-2026-001</p>
            </div>
            <button
              onClick={() => navigate('/saso/services')}
              className="bg-[#1B8354] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#156b45]"
            >
              العودة إلى الخدمات
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['الخدمات الإلكترونية', 'فحص المركبات المستوردة', 'تقديم الطلب']} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1F2A37] mb-8">نموذج طلب فحص المركبات المستوردة</h1>

        <div className="flex justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center bg-gray-50 px-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${
                  step.active ? 'border-[#1B8354] bg-[#1B8354] text-white' : step.completed ? 'border-[#1B8354] bg-[#1B8354] text-white' : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step.completed ? <CheckCircle className="w-6 h-6" /> : step.number}
              </div>
              <span className={`text-sm ${step.active ? 'text-[#1F2A37] font-semibold' : 'text-gray-500'}`}>{step.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1F2A37] flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6" />
                بيانات المستفيد
              </h2>

              <FormField label="الاسم الكامل" required error={errors.sasoApplicantName}>
                <TextInput
                  name="sasoApplicantName"
                  value={formData.sasoApplicantName}
                  onChange={(val) => setField('sasoApplicantName', val)}
                  placeholder="أدخل الاسم الكامل"
                />
              </FormField>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="رقم الهوية / الإقامة" required error={errors.sasoNationalId}>
                  <TextInput
                    name="sasoNationalId"
                    value={formData.sasoNationalId}
                    onChange={(val) => setField('sasoNationalId', val)}
                    placeholder="أدخل رقم الهوية"
                  />
                </FormField>

                <FormField label="رقم الجوال" required error={errors.sasoMobile}>
                  <TextInput
                    name="sasoMobile"
                    value={formData.sasoMobile}
                    onChange={(val) => setField('sasoMobile', val)}
                    placeholder="05xxxxxxxx"
                  />
                </FormField>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1F2A37] flex items-center gap-2 mb-4">
                <CarFront className="w-6 h-6" />
                بيانات المركبة
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="رقم الهيكل (VIN)" required error={errors.sasoChassisNumber}>
                  <TextInput
                    name="sasoChassisNumber"
                    value={formData.sasoChassisNumber}
                    onChange={(val) => setField('sasoChassisNumber', val)}
                    placeholder="أدخل رقم الهيكل"
                  />
                </FormField>

                <FormField label="رقم البيان الجمركي" required error={errors.sasoCustomsNumber}>
                  <TextInput
                    name="sasoCustomsNumber"
                    value={formData.sasoCustomsNumber}
                    onChange={(val) => setField('sasoCustomsNumber', val)}
                    placeholder="أدخل رقم البيان الجمركي"
                  />
                </FormField>
              </div>

              <FormField label="نوع المركبة" required error={errors.sasoVehicleType}>
                <SelectInput
                  name="sasoVehicleType"
                  value={formData.sasoVehicleType}
                  onChange={(val) => setField('sasoVehicleType', val)}
                  placeholder="اختر نوع المركبة"
                  options={[
                    { value: 'sedan', label: 'سيارة سيدان' },
                    { value: 'suv', label: 'سيارة رياضية متعددة الاستخدام' },
                    { value: 'truck', label: 'شاحنة خفيفة' },
                    { value: 'other', label: 'أخرى' }
                  ]}
                />
              </FormField>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#1F2A37] mb-4">المراجعة والإرسال</h2>
              <div className="bg-gray-50 rounded-lg p-5 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">الاسم</p>
                  <p className="font-medium">{formData.sasoApplicantName}</p>
                </div>
                <div>
                  <p className="text-gray-500">رقم الهوية</p>
                  <p className="font-medium">{formData.sasoNationalId}</p>
                </div>
                <div>
                  <p className="text-gray-500">رقم الجوال</p>
                  <p className="font-medium">{formData.sasoMobile}</p>
                </div>
                <div>
                  <p className="text-gray-500">رقم الهيكل</p>
                  <p className="font-medium">{formData.sasoChassisNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">رقم البيان الجمركي</p>
                  <p className="font-medium">{formData.sasoCustomsNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">نوع المركبة</p>
                  <p className="font-medium">{formData.sasoVehicleType}</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="sasoTermsAccepted"
                  checked={formData.sasoTermsAccepted}
                  onChange={(e) => setField('sasoTermsAccepted', e.target.checked)}
                  className="w-5 h-5 mt-1 text-[#1B8354] rounded focus:ring-[#1B8354]"
                />
                <span className="text-[#1F2A37]">
                  أقر بصحة البيانات المدخلة وأوافق على الشروط والأحكام.
                </span>
              </label>
              {errors.sasoTermsAccepted && <p className="text-red-500 text-sm">{errors.sasoTermsAccepted}</p>}
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button onClick={handleBack} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                السابق
              </button>
            )}
            <div className={currentStep === 1 ? 'mr-auto' : ''}>
              {currentStep < 3 ? (
                <button onClick={handleNext} className="px-6 py-3 bg-[#1B8354] text-white rounded-lg hover:bg-[#156b45]">
                  التالي
                </button>
              ) : (
                <button onClick={handleSubmit} className="px-6 py-3 bg-[#1B8354] text-white rounded-lg hover:bg-[#156b45]">
                  إرسال الطلب
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
