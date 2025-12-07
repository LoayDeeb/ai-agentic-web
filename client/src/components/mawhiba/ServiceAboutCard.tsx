import React from 'react';

type ServiceDetailsCardProps = {
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
};

// @component: ServiceAboutCard
export const ServiceAboutCard = ({
  title = 'عن الخدمة',
  description = 'خدمة تمكن الطلبة من التسجيل في مقياس موهبة للقدرات العقلية المتعددة ضمن البرنامج الوطني للكشف عن الموهوبين',
  linkText = 'تفاصيل البرنامج',
  linkHref = '#'
}: ServiceDetailsCardProps) => {
  // @return
  return <div className="flex flex-col gap-4 bg-zinc-100 rounded-3xl p-10 w-full max-w-[642px]" dir="rtl">
      <h3 className="text-gray-600 text-xl font-medium leading-6 m-0 p-0">
        {title}
      </h3>
      <div className="text-gray-500 text-sm leading-[26px] m-0 p-0">
        {description}
      </div>
      <div className="flex items-center gap-1 m-0 p-0">
        <div className="m-0 p-0">
          <p className="text-[#2B254B] text-sm font-normal leading-6 m-0 mb-[5px] p-0">
            <a href={linkHref} className="text-[#2B254B] text-sm font-normal leading-6 cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 no-underline" onClick={e => e.preventDefault()}>
              {linkText}
            </a>
          </p>
        </div>
      </div>
    </div>;
};

