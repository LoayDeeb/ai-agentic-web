import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArabicTabs } from '../components/sdb/ArabicTabs';
import { FinanceCard } from '../components/sdb/FinanceCard';
import { FinancialServicesCard } from '../components/sdb/FinancialServicesCard';
import { CarouselNavigation } from '../components/sdb/CarouselNavigation';

export default function SDBServices() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('individuals');

  const handleServiceStart = () => {
    navigate('/sdb/service');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]" dir="rtl" style={{ fontFamily: 'saudiriyal, IBMPlexSansArabic, serif' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#161616] mb-8 text-center">
          برنامج تمويل رواد الأعمال
        </h1>

        <div className="flex justify-center mb-12">
          <ArabicTabs onTabChange={setActiveTab} />
        </div>

        {activeTab === 'individuals' && (
          <div>
            <h2 className="text-2xl font-bold text-[#161616] mb-6">تمويل الأفراد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <FinanceCard
                title="الأسر المنتجة التمويل غير المباشر"
                description="ادعم مشروعك المنزلي أو مهنتك الحرفية بتمويل يصل إلى 50,000 ♦ من خلال وسطاء تمويل معتمدين"
                tagText="تمويل الأسر المنتجة"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
              <FinancialServicesCard
                title="تمويل الأصول"
                description="هو حل تمويلي يدعمك للاستفادة من مسارات العمل في قطاع النقل"
                tagText="تمويل العمل الحر"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
              <FinancialServicesCard
                title="تمويل الأعمال الناشئة"
                description="قم بتنمية عملك التجاري من خلال تمويل يصل إلى 200,000 ريال"
                tagText="تمويل المشاريع"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
            </div>
          </div>
        )}

        {activeTab === 'establishments' && (
          <div>
            <h2 className="text-2xl font-bold text-[#161616] mb-6">تمويل المنشأت</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <FinancialServicesCard
                title="تمويل المنشآت الصغيرة"
                description="احصل على تمويل يصل إلى 500,000 ريال لتطوير منشأتك"
                tagText="تمويل المنشآت"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
              <FinancialServicesCard
                title="تمويل رأس المال العامل"
                description="احصل على السيولة اللازمة لتشغيل عملك بكفاءة"
                tagText="رأس المال العامل"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
            </div>
          </div>
        )}

        {activeTab === 'nonprofit' && (
          <div>
            <h2 className="text-2xl font-bold text-[#161616] mb-6">قطاع غير ربحي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <FinancialServicesCard
                title="تمويل المؤسسات الخيرية"
                description="دعم مالي للجمعيات الخيرية والمؤسسات غير الربحية"
                tagText="القطاع الخيري"
                onPrimaryClick={handleServiceStart}
                onSecondaryClick={() => navigate('/sdb/service')}
              />
            </div>
          </div>
        )}

        <div className="mt-12">
          <CarouselNavigation totalSlides={5} />
        </div>
      </div>
    </div>
  );
}

