import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Building, FileText, User } from 'lucide-react';
import { NavigationHeaderAr } from '../components/ef-ar/NavigationHeaderAr';
import { FormField, TextInput, SelectInput, TextArea } from '../components/FormField';
import { useFormStore } from '../store/formStore';
import { highlight } from '../features/agent/spotlight';
import { PROGRAMS_DATA_AR } from '../components/ef-ar/ProgramsGridAr';

export default function EFSubmitApplicationAr() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const program = PROGRAMS_DATA_AR.find((p) => p.id === id);

  const formData = useFormStore((s) => s.formData);
  const setField = useFormStore((s) => s.setField);
  const currentStep = useFormStore((s) => s.currentStep);
  const setCurrentStep = useFormStore((s) => s.setCurrentStep);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { tool, args } = (e as CustomEvent).detail;

      if (tool === 'fillFormField') {
        setField(args.fieldName, args.value);
        setTimeout(() => {
          const input = document.querySelector(`[name="${args.fieldName}"]`) as HTMLElement;
          if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            highlight(`[name="${args.fieldName}"]`, 2);
          }
        }, 100);
      } else if (tool === 'goToFormStep') {
        setCurrentStep(args.step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (tool === 'submitForm') {
        if (currentStep === 3) {
          handleSubmit();
        }
      }
    };

    window.addEventListener('agentTool', handler);
    return () => window.removeEventListener('agentTool', handler);
  }, [currentStep]);

  const steps = [
    { number: 1, label: 'معلومات المنظمة', completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, label: 'تفاصيل المشروع', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, label: 'المراجعة والإرسال', completed: submitted, active: currentStep === 3 }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.efOrganizationName) newErrors.efOrganizationName = 'اسم المنظمة مطلوب';
      if (!formData.efRegistrationNumber) newErrors.efRegistrationNumber = 'رقم التسجيل مطلوب';
      if (!formData.efContactPerson) newErrors.efContactPerson = 'الشخص المسؤول مطلوب';
      if (!formData.efContactEmail) newErrors.efContactEmail = 'البريد الإلكتروني مطلوب';
      if (!formData.efContactPhone) newErrors.efContactPhone = 'رقم الهاتف مطلوب';
    } else if (step === 2) {
      if (!formData.efProjectTitle) newErrors.efProjectTitle = 'عنوان المشروع مطلوب';
      if (!formData.efProjectDescription) newErrors.efProjectDescription = 'وصف المشروع مطلوب';
      if (!formData.efRequestedAmount) newErrors.efRequestedAmount = 'المبلغ المطلوب مطلوب';
      if (!formData.efProjectDuration) newErrors.efProjectDuration = 'مدة المشروع مطلوبة';
    } else if (step === 3) {
      if (!formData.efTermsAccepted) newErrors.efTermsAccepted = 'يجب الموافقة على الشروط والأحكام';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = Math.min(currentStep + 1, 3);
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting EF application:', formData);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
        <NavigationHeaderAr />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
            <CheckCircle className="w-20 h-20 text-[#BDCD5C] mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#2C3A82] mb-4">تم تقديم الطلب بنجاح</h1>
            <p className="text-gray-600 mb-6">
              تم استلام طلبك. سيقوم فريقنا بمراجعته والتواصل معك خلال ٥-٧ أيام عمل.
            </p>
            <div className="bg-[#2C3A82]/10 rounded-xl p-4 mb-6">
              <p className="text-[#2C3A82] font-medium">
                رقم المرجع: EF-{Date.now().toString().slice(-8)}
              </p>
            </div>
            <button
              onClick={() => navigate('/ef-ar')}
              className="bg-[#2C3A82] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1f2963] transition-colors"
            >
              العودة للبرامج
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
      <NavigationHeaderAr />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2C3A82] mb-2">
          {program ? `التقديم على: ${program.title}` : 'طلب المنحة'}
        </h1>
        <p className="text-gray-600 mb-8">
          أكمل النموذج أدناه للتقديم على صندوق البيئة.
        </p>

        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center bg-gray-50 px-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
                  step.active
                    ? 'border-[#2C3A82] bg-[#2C3A82] text-white'
                    : step.completed
                    ? 'border-[#BDCD5C] bg-[#BDCD5C] text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step.completed ? <CheckCircle className="w-6 h-6" /> : step.number}
              </div>
              <span className={`text-sm font-medium ${step.active ? 'text-[#2C3A82]' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-sm">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#2C3A82] flex items-center gap-2 mb-6">
                <Building className="w-6 h-6 text-[#BDCD5C]" />
                معلومات المنظمة
              </h2>

              <FormField label="اسم المنظمة" required error={errors.efOrganizationName}>
                <TextInput
                  name="efOrganizationName"
                  value={formData.efOrganizationName || ''}
                  onChange={(val) => setField('efOrganizationName', val)}
                  placeholder="أدخل الاسم القانوني للمنظمة"
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="رقم التسجيل" required error={errors.efRegistrationNumber}>
                  <TextInput
                    name="efRegistrationNumber"
                    value={formData.efRegistrationNumber || ''}
                    onChange={(val) => setField('efRegistrationNumber', val)}
                    placeholder="رقم السجل التجاري/غير الربحي"
                  />
                </FormField>

                <FormField label="نوع المنظمة" error={errors.efOrganizationType}>
                  <SelectInput
                    name="efOrganizationType"
                    value={formData.efOrganizationType || ''}
                    onChange={(val) => setField('efOrganizationType', val)}
                    placeholder="اختر النوع"
                    options={[
                      { value: 'npo', label: 'منظمة غير ربحية' },
                      { value: 'research', label: 'مؤسسة بحثية' },
                      { value: 'sme', label: 'منشأة صغيرة/متوسطة' },
                      { value: 'industrial', label: 'منشأة صناعية' },
                      { value: 'community', label: 'منظمة مجتمعية' }
                    ]}
                  />
                </FormField>
              </div>

              <FormField label="الشخص المسؤول" required error={errors.efContactPerson}>
                <TextInput
                  name="efContactPerson"
                  value={formData.efContactPerson || ''}
                  onChange={(val) => setField('efContactPerson', val)}
                  placeholder="الاسم الكامل لجهة الاتصال الرئيسية"
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="البريد الإلكتروني" required error={errors.efContactEmail}>
                  <TextInput
                    name="efContactEmail"
                    type="email"
                    value={formData.efContactEmail || ''}
                    onChange={(val) => setField('efContactEmail', val)}
                    placeholder="contact@organization.com"
                  />
                </FormField>

                <FormField label="رقم الهاتف" required error={errors.efContactPhone}>
                  <TextInput
                    name="efContactPhone"
                    value={formData.efContactPhone || ''}
                    onChange={(val) => setField('efContactPhone', val)}
                    placeholder="+966 5X XXX XXXX"
                  />
                </FormField>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#2C3A82] flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-[#BDCD5C]" />
                تفاصيل المشروع
              </h2>

              <FormField label="عنوان المشروع" required error={errors.efProjectTitle}>
                <TextInput
                  name="efProjectTitle"
                  value={formData.efProjectTitle || ''}
                  onChange={(val) => setField('efProjectTitle', val)}
                  placeholder="أدخل عنوان المشروع"
                />
              </FormField>

              <FormField label="وصف المشروع" required error={errors.efProjectDescription}>
                <TextArea
                  name="efProjectDescription"
                  value={formData.efProjectDescription || ''}
                  onChange={(val) => setField('efProjectDescription', val)}
                  placeholder="صف أهداف المشروع والمنهجية والنتائج المتوقعة"
                  rows={5}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="المبلغ المطلوب (ريال)" required error={errors.efRequestedAmount}>
                  <TextInput
                    name="efRequestedAmount"
                    value={formData.efRequestedAmount || ''}
                    onChange={(val) => setField('efRequestedAmount', val)}
                    placeholder="مثال: ٥٠٠,٠٠٠"
                  />
                </FormField>

                <FormField label="مدة المشروع" required error={errors.efProjectDuration}>
                  <SelectInput
                    name="efProjectDuration"
                    value={formData.efProjectDuration || ''}
                    onChange={(val) => setField('efProjectDuration', val)}
                    placeholder="اختر المدة"
                    options={[
                      { value: '6months', label: '٦ أشهر' },
                      { value: '12months', label: '١٢ شهر' },
                      { value: '18months', label: '١٨ شهر' },
                      { value: '24months', label: '٢٤ شهر' },
                      { value: '36months', label: '٣٦ شهر' }
                    ]}
                  />
                </FormField>
              </div>

              <FormField label="القطاع البيئي" error={errors.efEnvironmentalSector}>
                <SelectInput
                  name="efEnvironmentalSector"
                  value={formData.efEnvironmentalSector || ''}
                  onChange={(val) => setField('efEnvironmentalSector', val)}
                  placeholder="اختر القطاع"
                  options={[
                    { value: 'waste', label: 'إدارة النفايات' },
                    { value: 'wildlife', label: 'الحفاظ على الحياة الفطرية' },
                    { value: 'vegetation', label: 'الغطاء النباتي وإعادة التشجير' },
                    { value: 'desertification', label: 'مكافحة التصحر' },
                    { value: 'compliance', label: 'الامتثال البيئي' },
                    { value: 'meteorology', label: 'الأرصاد الجوية' },
                    { value: 'renewable', label: 'الطاقة المتجددة' }
                  ]}
                />
              </FormField>

              <FormField label="الأثر المتوقع" error={errors.efExpectedImpact}>
                <TextArea
                  name="efExpectedImpact"
                  value={formData.efExpectedImpact || ''}
                  onChange={(val) => setField('efExpectedImpact', val)}
                  placeholder="صف الأثر البيئي والاجتماعي المتوقع لمشروعك"
                  rows={3}
                />
              </FormField>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#2C3A82] flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-[#BDCD5C]" />
                مراجعة الطلب
              </h2>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-[#2C3A82] border-b pb-2 mb-4">معلومات المنظمة</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">اسم المنظمة</p>
                    <p className="font-medium text-gray-800">{formData.efOrganizationName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">رقم التسجيل</p>
                    <p className="font-medium text-gray-800">{formData.efRegistrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">الشخص المسؤول</p>
                    <p className="font-medium text-gray-800">{formData.efContactPerson}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                    <p className="font-medium text-gray-800">{formData.efContactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2C3A82]/5 rounded-2xl p-6 space-y-4 border border-[#2C3A82]/20">
                <h3 className="font-semibold text-[#2C3A82] border-b border-[#2C3A82]/20 pb-2 mb-4">
                  تفاصيل المشروع
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <p className="text-gray-500 text-sm">عنوان المشروع</p>
                    <p className="font-medium text-gray-800">{formData.efProjectTitle}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">المبلغ المطلوب</p>
                    <p className="font-medium text-gray-800">{formData.efRequestedAmount} ريال</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">المدة</p>
                    <p className="font-medium text-gray-800">{formData.efProjectDuration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.efTermsAccepted || false}
                    onChange={(e) => setField('efTermsAccepted', e.target.checked)}
                    name="efTermsAccepted"
                    className="w-5 h-5 mt-0.5 text-[#2C3A82] rounded focus:ring-[#2C3A82]"
                  />
                  <span className="text-gray-700">
                    أؤكد أن جميع المعلومات المقدمة دقيقة وكاملة. أوافق على{' '}
                    <a href="#" className="text-[#2C3A82] underline">
                      الشروط والأحكام
                    </a>{' '}
                    و{' '}
                    <a href="#" className="text-[#2C3A82] underline">
                      سياسة الخصوصية
                    </a>{' '}
                    لصندوق البيئة.
                  </span>
                </label>
                {errors.efTermsAccepted && (
                  <p className="text-red-500 text-sm mt-2">{errors.efTermsAccepted}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                السابق
              </button>
            )}
            <div className={currentStep === 1 ? 'mr-auto' : ''}>
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#2C3A82] text-white rounded-lg font-medium hover:bg-[#1f2963] transition-colors"
                >
                  التالي
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#BDCD5C] text-[#2C3A82] rounded-lg font-bold hover:bg-[#a8b84d] transition-colors"
                >
                  إرسال الطلب
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
