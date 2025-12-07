import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Clock, CreditCard } from 'lucide-react';
import { FamilyFinancingBanner } from '../components/sdb/FamilyFinancingBanner';
import { ProductDetailsTabs } from '../components/sdb/ProductDetailsTabs';
import { ArabicFeatureList } from '../components/sdb/ArabicFeatureList';
import { SDBAccordionItem } from '../components/sdb/SDBAccordionItem';
import { ProductInfoCard } from '../components/sdb/ProductInfoCard';

export default function SDBServiceDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('product');

  const handleApply = () => {
    navigate('/sdb/submit');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]" dir="rtl" style={{ fontFamily: 'saudiriyal, IBMPlexSansArabic, serif' }}>
      <FamilyFinancingBanner 
        title="تمويل الأسرة"
        description="تمويل مخصص للأسر ذات الدخل المحدود بهدف مساعدتها على تغطية احتياجاتها الأساسية وتحقيق الاستقرار المعيشي. يتم التقديم على المنتج إلكترونيًا بالكامل، دون الحاجة لزيارة فروع البنك."
        buttonText="تقديم الطلب"
        onButtonClick={handleApply}
        links={[
          { text: 'اتفاقية مستوى الخدمة', href: '#' },
          { text: 'فيديو المنتج', href: '#' }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProductDetailsTabs 
          defaultTab="product"
          onTabChange={setActiveTab}
        />

        {activeTab === 'product' && (
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-6">تعرف على المنتج</h2>
            <ArabicFeatureList 
              items={[
                'تمويل يبدأ من 18 ألف ويصل إلى 100 ألف ريال (عند عدم الاستفادة من أحد منتجات التمويل الاجتماعي سابقًا).',
                'فترة السداد تصل إلى 4 سنوات.',
                'يتم السداد بشكل شهري.',
                'بدون رسوم إدارية.',
                'يكون الإعفاء في حالة الوفاة لا سمح الله.'
              ]}
            />

            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#222222] mb-6">الفئة المستهدفة</h3>
              <p className="text-gray-800 mb-4">المواطنين والمواطنات</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductInfoCard 
                  icon={<Users className="w-6 h-6" />}
                  title="عدد المستفيدين"
                  content="1,2 مليون"
                />
                <ProductInfoCard 
                  icon={<DollarSign className="w-6 h-6" />}
                  title="رسوم الخدمة"
                  content="مجانية"
                />
                <ProductInfoCard 
                  icon={<CreditCard className="w-6 h-6" />}
                  title="قنوات الدفع"
                  content="مجانية"
                />
                <ProductInfoCard 
                  icon={<Clock className="w-6 h-6" />}
                  title="توافر الخدمة"
                  content="24/7"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-6">الشروط</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-800">
              <li>أن يكون المتقدم سعودي الجنسية</li>
              <li>العمر من 18 إلى 60 سنة</li>
              <li>أن يكون من الأسر ذات الدخل المحدود</li>
              <li>عدم وجود مديونيات متعثرة</li>
              <li>تقديم المستندات المطلوبة كاملة</li>
            </ul>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#222222] mb-6">المتطلبات</h2>
            
            <SDBAccordionItem 
              title="رجال - موظف حكومي/ شركة حكومية"
              items={[
                'صورة هوية المتقدم.',
                'صورة سجل الأسرة.',
                'رقم حساب الآيبان على الورق الرسمي للبنك، ومصدّق من البنك التجاري.',
                'كشف حساب لآخر 3 رواتب مصدّق من البنك التجاري.',
                'شهادة مدد وأجور مشترك لا يتجاوز تاريخ إصدارها 60 يوم من موقع التأمينات الاجتماعية (في حال كان المتقدم خاضع لنظام التأمينات الاجتماعية).'
              ]}
            />
            
            <SDBAccordionItem 
              title="رجال - موظف قطاع خاص"
              items={[
                'صورة هوية المتقدم.',
                'صورة سجل الأسرة.',
                'رقم حساب الآيبان على الورق الرسمي للبنك.',
                'كشف حساب لآخر 6 أشهر مصدّق من البنك التجاري.',
                'شهادة مدد وأجور مشترك من موقع التأمينات الاجتماعية.'
              ]}
              defaultExpanded={false}
            />

            <SDBAccordionItem 
              title="نساء - موظفات"
              items={[
                'صورة هوية المتقدمة.',
                'صورة سجل الأسرة.',
                'رقم حساب الآيبان.',
                'كشف حساب بنكي لآخر 3 أشهر.'
              ]}
              defaultExpanded={false}
            />
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#222222] mb-6">الأسئلة الشائعة</h2>
          <div className="mb-4">
            <p className="text-gray-800">اضغط هنا</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-gray-900 mb-2">920008002</p>
              <p className="text-[#1b8354]">920008002</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">care@sdb.gov.sa</p>
              <p className="text-[#1b8354]">care@sdb.gov.sa</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-white border border-gray-300 rounded text-gray-900 hover:bg-gray-50">
                تمويل الأسرة - دليل المستخدم
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 rounded text-gray-900 hover:bg-gray-50">
                لإنشاء حساب إلكتروني
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
