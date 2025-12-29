import React from 'react';
import { NavbarTopLinks } from '../components/mawhiba/NavbarTopLinks';
import { MawhibaServicesHeader } from '../components/mawhiba/MawhibaServicesHeader';
import { ServicesTabGroup } from '../components/mawhiba/ServicesTabGroup';
import { ServiceCard } from '../components/mawhiba/ServiceCard';
import { MawhibaBreadcrumbs } from '../components/mawhiba/MawhibaBreadcrumbs';
import { useNavigate } from 'react-router-dom';

export default function MawhibaServices() {
  const navigate = useNavigate();

  const handleServiceStart = () => {
    navigate('/mawhiba/service');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Alexandria, sans-serif' }} dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <NavbarTopLinks />
      </div>
      
      <MawhibaServicesHeader className="mb-8" />
      
      <div className="container mx-auto px-4 md:px-[162px]">
         <MawhibaBreadcrumbs />
         
         <div className="mb-8">
           <ServicesTabGroup />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            <ServiceCard 
              title="أسبوع موهبة للعلوم"
              description="خدمة تمكن الطلبة من التسجيل في أسبوع موهبة للعلوم"
              onStartService={handleServiceStart}
            />
            <ServiceCard 
               title="البرنامج الوطني للكشف عن الموهوبين"
               description="خدمة تمكن الطلبة من التسجيل في مقياس موهبة للقدرات العقلية المتعددة"
               onStartService={handleServiceStart}
            />
            <ServiceCard 
               title="مسابقة الكانجارو للرياضيات"
               description="أكبر مسابقة للرياضيات في العالم، تقام في أكثر من 70 دولة"
               onStartService={handleServiceStart}
            />
            <ServiceCard 
               title="الأولمبياد الوطني للإبداع العلمي"
               description="مسابقة علمية سنوية تقوم على أساس التنافس في أحد المجالات العلمية"
               onStartService={handleServiceStart}
            />
         </div>
      </div>
    </div>
  );
}








