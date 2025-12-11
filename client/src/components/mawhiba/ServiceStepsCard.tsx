import React from 'react';

type Step = {
  id: string;
  text: string;
};

type ServiceStepsCardProps = {
  title?: string;
  steps?: Step[];
  className?: string;
};

const defaultSteps: Step[] = [{
  id: '1',
  text: 'تسجيل الدخول إلى موقع قياس'
}, {
  id: '2',
  text: 'تأكيد بيانات الملف الشخصي'
}, {
  id: '3',
  text: 'اختيار "مقياس موهبة للقدرات العقلية المتعددة" من قائمة الاختبارات المتاحة'
}, {
  id: '4',
  text: 'تحديد مقر وموعد الاختبار'
}, {
  id: '5',
  text: 'الموافقة على الشروط والأحكام'
}, {
  id: '6',
  text: 'سداد المساهمة المالية'
}];

// @component: ServiceStepsCard
export const ServiceStepsCard = ({
  title = 'خطوات طلب الخدمة',
  steps = defaultSteps,
  className
}: ServiceStepsCardProps) => {
  // @return
  return <div className={`relative w-full max-w-[642px] rounded-[25px] p-10 flex flex-col gap-6 ${className || ''}`} style={{
    backgroundColor: 'rgb(244, 244, 246)',
    direction: 'rtl'
  }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-medium m-0 leading-6" style={{
        color: 'rgb(75, 85, 99)'
      }}>
          {title}
        </h3>
      </div>
      <ul className="flex flex-col m-0 p-0 list-none">
        {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return <li key={step.id} className="flex gap-3 relative">
              {/* Dot Column */}
              <div className="flex flex-col items-center">
                {/* The Dot */}
                <div className="relative z-10 box-border rounded-full flex items-center justify-center shrink-0" style={{
              width: '24px',
              height: '24px',
              border: '2px solid rgb(226, 169, 71)'
            }}>
                  <div className="rounded-full box-border" style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'rgb(226, 169, 71)',
                border: '2.6px solid #ffffff'
              }} />
                </div>
                {/* The Connecting Line */}
                {!isLast && <div className="absolute top-[24px] bottom-0 w-[2px]" style={{
              backgroundColor: 'rgb(209, 213, 219)',
              // Adjust position to center exactly under the 24px dot
              left: 'auto',
              right: '11px' // (24px / 2) - (2px / 2) = 11px from right in RTL
            }} />}
              </div>
              {/* Text Column */}
              <p className="text-sm m-0 leading-[26px]" style={{
            color: 'rgb(75, 85, 99)',
            paddingBottom: isLast ? '0px' : '33px'
          }}>
                {step.text}
              </p>
            </li>;
      })}
      </ul>
    </div>;
};




