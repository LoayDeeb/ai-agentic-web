import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ZainHeaderNav, ZainLogo } from '../components/zain';
import { useFormStore } from '../store/formStore';
import { onToolEvent, emitToolEvent } from '../features/agent/tools';
import { cn } from '../lib/utils';

const STEPS = [
  { id: 1, title: 'المعلومات الشخصية' },
  { id: 2, title: 'اختيار الباقة' },
  { id: 3, title: 'المراجعة والتأكيد' }
];

const packageOptions = [
  { id: 'fiber500', label: 'فايبر 500 ميجابت - 23 دينار/شهري' },
  { id: 'fiber1000', label: 'فايبر 1000 ميجابت - 33 دينار/شهري' },
  { id: 'fiber2000', label: 'فايبر 2000 ميجابت - 53 دينار/شهري' }
];

const contractOptions = [
  { id: '1year', label: 'سنة واحدة' },
  { id: '2years', label: 'سنتين (خصم إضافي)' }
];

const routerOptions = [
  { id: 'standard', label: 'راوتر Wi-Fi 6 قياسي (مجاني)' },
  { id: 'mesh', label: 'نظام Mesh للتغطية الموسعة (+5 دينار/شهري)' }
];

const cities = ['عمان', 'إربد', 'الزرقاء', 'العقبة', 'السلط', 'المفرق', 'الكرك', 'معان'];

export default function ZainSubscribe() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    city: '',
    area: '',
    address: '',
    packageType: searchParams.get('package') || 'fiber500',
    contractPeriod: '2years',
    routerOption: 'standard',
    termsAccepted: false
  });

  const formStore = useFormStore();

  // Sync form data with store
  useEffect(() => {
    const storeData = formStore.getFormData();
    if (Object.keys(storeData).length > 0) {
      setFormData(prev => ({ ...prev, ...storeData }));
    }
  }, []);

  // Update store when form changes
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      formStore.setField(key as any, value);
    });
  }, [formData]);

  // Sync current step with store
  useEffect(() => {
    formStore.setCurrentStep(currentStep);
  }, [currentStep]);

  // Listen for agent tool events
  useEffect(() => {
    const unsubscribe = onToolEvent((tool, args) => {
      if (tool === 'fillFormField' && args.fieldName && args.value !== undefined) {
        setFormData(prev => ({
          ...prev,
          [args.fieldName]: args.value === 'true' ? true : args.value === 'false' ? false : args.value
        }));
      }
      if (tool === 'goToFormStep' && args.step) {
        setCurrentStep(args.step);
      }
      if (tool === 'highlightFormField' && args.fieldName) {
        setHighlightedField(args.fieldName);
        setTimeout(() => setHighlightedField(null), args.duration ? args.duration * 1000 : 3000);
      }
      if (tool === 'submitForm') {
        handleSubmit();
      }
    });

    return unsubscribe;
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = () => {
    return formData.fullName && formData.nationalId && formData.phone && formData.city && formData.area;
  };

  const isStep2Valid = () => {
    return formData.packageType && formData.contractPeriod && formData.routerOption;
  };

  const isStep3Valid = () => {
    return formData.termsAccepted;
  };

  const canProceed = () => {
    if (currentStep === 1) return isStep1Valid();
    if (currentStep === 2) return isStep2Valid();
    if (currentStep === 3) return isStep3Valid();
    return false;
  };

  const handleNext = () => {
    if (currentStep < 3 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStep3Valid()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getFieldClass = (fieldName: string) => {
    return cn(
      "w-full px-4 py-3 border rounded-lg outline-none transition-all duration-300",
      "focus:ring-2 focus:ring-[#37ace5]/30 focus:border-[#37ace5]",
      highlightedField === fieldName
        ? "ring-2 ring-[#E6007E] border-[#E6007E] bg-[#E6007E]/5"
        : "border-gray-200"
    );
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'Zain', 'IBM Plex Sans Arabic', sans-serif" }}
        dir="rtl"
      >
        <ZainHeaderNav />
        <header className="container mx-auto px-4 py-4 border-b border-gray-100">
          <ZainLogo />
        </header>

        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
          >
            <Check size={48} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#11120E] mb-4">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-lg text-[#666666] mb-8 max-w-md mx-auto">
            سيتواصل معك فريقنا خلال 24 ساعة لتحديد موعد التركيب
          </p>
          <p className="text-sm text-[#666666] mb-8">
            رقم الطلب: <span className="font-bold text-[#11120E]">ZF-2026-{Math.floor(Math.random() * 100000)}</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/zain')}
            className="bg-[#37ace5] text-white px-8 py-3 rounded-full font-bold"
          >
            العودة للرئيسية
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Zain', 'IBM Plex Sans Arabic', sans-serif" }}
      dir="rtl"
    >
      <ZainHeaderNav />

      <header className="container mx-auto px-4 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <ZainLogo />
          <button
            onClick={() => navigate('/zain/fiber')}
            className="text-[#666666] hover:text-[#11120E] transition-colors flex items-center gap-1"
          >
            <ChevronRight size={20} />
            العودة للباقات
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                        ? "bg-[#37ace5] text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "hidden md:block font-medium",
                      currentStep === step.id ? "text-[#11120E]" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-12 md:w-24 h-1 rounded-full transition-all",
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#11120E] mb-6">
                المعلومات الشخصية
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className={getFieldClass('fullName')}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-2">
                    الرقم الوطني *
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => updateField('nationalId', e.target.value)}
                    className={getFieldClass('nationalId')}
                    placeholder="أدخل رقمك الوطني"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#11120E] mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={getFieldClass('phone')}
                      placeholder="07XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#11120E] mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={getFieldClass('email')}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#11120E] mb-2">
                      المدينة *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className={getFieldClass('city')}
                    >
                      <option value="">اختر المدينة</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#11120E] mb-2">
                      المنطقة *
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => updateField('area', e.target.value)}
                      className={getFieldClass('area')}
                      placeholder="اسم المنطقة أو الحي"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-2">
                    العنوان التفصيلي
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className={getFieldClass('address')}
                    rows={3}
                    placeholder="الشارع، رقم البناية، الطابق..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Package Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#11120E] mb-6">
                اختيار الباقة
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-3">
                    باقة الفايبر *
                  </label>
                  <div className="space-y-3">
                    {packageOptions.map(option => (
                      <label
                        key={option.id}
                        className={cn(
                          "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all",
                          formData.packageType === option.id
                            ? "border-[#37ace5] bg-[#37ace5]/5"
                            : "border-gray-200 hover:border-gray-300",
                          highlightedField === 'packageType' && "ring-2 ring-[#E6007E]"
                        )}
                      >
                        <input
                          type="radio"
                          name="packageType"
                          value={option.id}
                          checked={formData.packageType === option.id}
                          onChange={(e) => updateField('packageType', e.target.value)}
                          className="w-5 h-5 text-[#37ace5]"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-3">
                    مدة العقد *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contractOptions.map(option => (
                      <label
                        key={option.id}
                        className={cn(
                          "flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition-all text-center",
                          formData.contractPeriod === option.id
                            ? "border-[#37ace5] bg-[#37ace5]/5"
                            : "border-gray-200 hover:border-gray-300",
                          highlightedField === 'contractPeriod' && "ring-2 ring-[#E6007E]"
                        )}
                      >
                        <input
                          type="radio"
                          name="contractPeriod"
                          value={option.id}
                          checked={formData.contractPeriod === option.id}
                          onChange={(e) => updateField('contractPeriod', e.target.value)}
                          className="w-5 h-5 text-[#37ace5]"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#11120E] mb-3">
                    خيار الراوتر *
                  </label>
                  <div className="space-y-3">
                    {routerOptions.map(option => (
                      <label
                        key={option.id}
                        className={cn(
                          "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all",
                          formData.routerOption === option.id
                            ? "border-[#37ace5] bg-[#37ace5]/5"
                            : "border-gray-200 hover:border-gray-300",
                          highlightedField === 'routerOption' && "ring-2 ring-[#E6007E]"
                        )}
                      >
                        <input
                          type="radio"
                          name="routerOption"
                          value={option.id}
                          checked={formData.routerOption === option.id}
                          onChange={(e) => updateField('routerOption', e.target.value)}
                          className="w-5 h-5 text-[#37ace5]"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#11120E] mb-6">
                مراجعة وتأكيد الطلب
              </h2>

              <div className="space-y-6">
                {/* Personal Info Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-[#11120E] mb-3">المعلومات الشخصية</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">الاسم:</span>
                    <span className="font-medium">{formData.fullName}</span>
                    <span className="text-gray-500">الرقم الوطني:</span>
                    <span className="font-medium">{formData.nationalId}</span>
                    <span className="text-gray-500">الهاتف:</span>
                    <span className="font-medium">{formData.phone}</span>
                    <span className="text-gray-500">العنوان:</span>
                    <span className="font-medium">{formData.city} - {formData.area}</span>
                  </div>
                </div>

                {/* Package Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-[#11120E] mb-3">تفاصيل الباقة</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">الباقة:</span>
                    <span className="font-medium">
                      {packageOptions.find(p => p.id === formData.packageType)?.label}
                    </span>
                    <span className="text-gray-500">مدة العقد:</span>
                    <span className="font-medium">
                      {contractOptions.find(c => c.id === formData.contractPeriod)?.label}
                    </span>
                    <span className="text-gray-500">الراوتر:</span>
                    <span className="font-medium">
                      {routerOptions.find(r => r.id === formData.routerOption)?.label}
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <label
                  className={cn(
                    "flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all",
                    formData.termsAccepted ? "border-green-500 bg-green-50" : "border-gray-200",
                    highlightedField === 'termsAccepted' && "ring-2 ring-[#E6007E]"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => updateField('termsAccepted', e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-green-500"
                  />
                  <span className="text-sm">
                    أوافق على{' '}
                    <a href="#" className="text-[#37ace5] underline">الشروط والأحكام</a>
                    {' '}وسياسة الخصوصية الخاصة بزين الأردن
                  </span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#11120E] hover:bg-gray-100"
            )}
          >
            <ChevronRight size={20} />
            السابق
          </button>

          {currentStep < 3 ? (
            <motion.button
              whileHover={{ scale: canProceed() ? 1.02 : 1 }}
              whileTap={{ scale: canProceed() ? 0.98 : 1 }}
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all",
                canProceed()
                  ? "bg-[#37ace5] text-white hover:bg-[#20a2e2]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              )}
            >
              التالي
              <ChevronLeft size={20} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: canProceed() ? 1.02 : 1 }}
              whileTap={{ scale: canProceed() ? 0.98 : 1 }}
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all",
                canProceed() && !isSubmitting
                  ? "bg-[#E6007E] text-white hover:bg-[#c5006d]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  تأكيد الاشتراك
                  <Check size={20} />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
