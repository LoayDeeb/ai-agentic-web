import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Clock, CreditCard, FileText, Languages } from 'lucide-react';
import { Header } from '../components/sdb/Header';
import { FamilyFinancingBanner } from '../components/sdb/FamilyFinancingBanner';
import { ProductDetailsTabs } from '../components/sdb/ProductDetailsTabs';
import { ArabicFeatureList } from '../components/sdb/ArabicFeatureList';
import { SDBAccordionItem } from '../components/sdb/SDBAccordionItem';
import { ProductInfoCard } from '../components/sdb/ProductInfoCard';
import { ServiceTimelineCard } from '../components/sdb/ServiceTimelineCard';

export default function SDBServiceDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('product');

  const handleApply = () => {
    navigate('/sdb/submit');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]" dir="rtl" style={{ fontFamily: 'saudiriyal, IBMPlexSansArabic, serif' }}>
      <Header />
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

      <div className="container mx-auto px-4 py-8 max-w-[1486px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (Right Side) */}
          <div className="flex-1 order-2 lg:order-1">
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
                <p className="text-gray-800 cursor-pointer hover:text-[#1b8354] transition-colors">اضغط هنا</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900 mb-2 text-lg">920008002</p>
                  <p className="text-[#1b8354] text-lg">920008002</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-2 text-lg">care@sdb.gov.sa</p>
                  <p className="text-[#1b8354] text-lg">care@sdb.gov.sa</p>
                </div>
                <div className="flex gap-4 mt-6">
                  <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium">
                    تمويل الأسرة - دليل المستخدم
                  </button>
                  <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium">
                    لإنشاء حساب إلكتروني
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Left Side) */}
          <div className="w-full lg:w-[350px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-4 space-y-2">
              <ProductInfoCard 
                icon={<Users className="w-6 h-6" />}
                title="الفئة المستهدفة"
                content="المواطنين والمواطنات"
              />
              <div className="h-px bg-gray-100 my-2" />
              
              <ProductInfoCard 
                icon={<Users className="w-6 h-6" />}
                title="عدد المستفيدين"
                content="1,2 مليون"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ProductInfoCard 
                icon={<DollarSign className="w-6 h-6" />}
                title="رسوم الخدمة"
                content="مجانية"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ProductInfoCard 
                icon={<CreditCard className="w-6 h-6" />}
                title="قنوات الدفع"
                content="مجانية"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ProductInfoCard 
                icon={<Clock className="w-6 h-6" />}
                title="توافر الخدمة"
                content="24/7"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ProductInfoCard 
                icon={<FileText className="w-6 h-6" />}
                title="اتفاقية مستوى الخدمة"
                content="30 يوم عمل"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ServiceTimelineCard 
                title="بدء تقديم الخدمة"
                desktopYear="2011"
                mobileYear="2021"
              />
              <div className="h-px bg-gray-100 my-2" />

              <ProductInfoCard 
                icon={<Languages className="w-6 h-6" />}
                title="لغة التقديم"
                content="العربية"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
