import React, { useState } from 'react';
import { NavbarTopLinks } from '../components/mawhiba/NavbarTopLinks';
import { MawhibaBreadcrumbs } from '../components/mawhiba/MawhibaBreadcrumbs';
import { ServiceDetailsTitle } from '../components/mawhiba/ServiceDetailsTitle';
import { ServiceAboutCard } from '../components/mawhiba/ServiceAboutCard';
import { ServiceTabs } from '../components/mawhiba/ServiceTabs';
import { ServiceStepsCard } from '../components/mawhiba/ServiceStepsCard';
import { ServiceInfoSidebar } from '../components/mawhiba/ServiceInfoSidebar';

export default function MawhibaServiceDetail() {
  const [activeTab, setActiveTab] = useState('steps');

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Alexandria, sans-serif' }} dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <NavbarTopLinks />
      </div>

      <div className="container mx-auto px-4 md:px-[162px]">
        <MawhibaBreadcrumbs 
          items={[
            { label: 'الرئيسية', href: '/mawhiba', isHome: true },
            { label: 'الخدمات الإلكترونية', href: '/mawhiba' },
            { label: 'البرنامج الوطني للكشف عن الموهوبين' }
          ]}
        />

        <div className="mb-8">
          <ServiceDetailsTitle />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            <ServiceAboutCard />
            
            <ServiceTabs 
              defaultActiveTab="steps"
              onTabChange={setActiveTab}
            />

            {activeTab === 'steps' && (
              <ServiceStepsCard />
            )}
             {activeTab === 'terms' && (
              <div className="bg-[#f4f4f6] rounded-[25px] p-10 max-w-[642px]">
                 <h3 className="text-xl font-medium text-gray-600 mb-4">شروط الخدمة</h3>
                 <ul className="list-disc list-inside text-gray-600 leading-8">
                   <li>أن يكون الطالب سعودي الجنسية أو من أم سعودية.</li>
                   <li>أن يكون الطالب من الصف الثالث الابتدائي إلى الأول الثانوي.</li>
                   <li>سداد المقابل المالي للخدمة.</li>
                 </ul>
              </div>
            )}
             {activeTab === 'faq' && (
              <div className="bg-[#f4f4f6] rounded-[25px] p-10 max-w-[642px]">
                 <h3 className="text-xl font-medium text-gray-600 mb-4">الأسئلة الشائعة</h3>
                 <p className="text-gray-600">لا توجد أسئلة شائعة حالياً.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex-shrink-0">
            <ServiceInfoSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}



