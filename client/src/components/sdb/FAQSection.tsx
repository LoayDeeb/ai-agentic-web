import React from 'react';

type FAQSectionProps = {
  title?: string;
  linkText?: string;
  linkHref?: string;
};

// @component: FAQSection
export const FAQSection = ({
  title = 'الأسئلة الشائعة',
  linkText = 'اضغط هنا',
  linkHref = '#'
}: FAQSectionProps) => {
  // @return
  return <div className="p-2.5 w-full max-w-md" dir="rtl">
      <div className="flex gap-1.5 mb-2">
        <span className="text-base font-bold text-gray-900">
          {title}
        </span>
      </div>
      <a href={linkHref} onClick={e => e.preventDefault()} className="inline-flex items-center text-base text-[#1b8354] cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 py-0.5">
        <span>{linkText}</span>
      </a>
    </div>;
};


