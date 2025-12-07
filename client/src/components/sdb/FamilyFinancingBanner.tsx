import React from 'react';

type FamilyFinancingBannerProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  links?: Array<{
    text: string;
    href: string;
  }>;
};

// @component: FamilyFinancingBanner
export const FamilyFinancingBanner = (props: FamilyFinancingBannerProps) => {
  const {
    title = 'تمويل الأسرة',
    description = 'تمويل مخصص للأسر ذات الدخل المحدود بهدف مساعدتها على تغطية احتياجاتها الأساسية وتحقيق الاستقرار المعيشي. يتم التقديم على المنتج إلكترونيًا بالكامل، دون الحاجة لزيارة فروع البنك.',
    buttonText = 'تقديم الطلب',
    onButtonClick = () => {},
    links = [{
      text: 'اتفاقية مستوى الخدمة',
      href: '#'
    }, {
      text: 'فيديو المنتج',
      href: '#'
    }]
  } = props;

  // @return
  return <div className="w-full max-w-5xl mx-auto px-4 py-12 bg-[#f7fdf9]" dir="rtl" style={{
    fontFamily: 'IBMPlexSansArabic, Arial, sans-serif'
  }}>
      <div className="grid grid-cols-12 gap-4 mb-8">
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-start md:justify-end items-start">
          <button type="button" onClick={onButtonClick} className="bg-[#1b8354] text-white px-4 py-2.5 rounded hover:bg-[#156b44] transition-colors duration-200 font-medium text-base">
            {buttonText}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-base text-gray-800 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {links.map((link, index) => <a key={index} href={link.href} className="text-[#1b8354] hover:text-[#156b44] transition-colors duration-200 text-base py-0.5" onClick={e => e.preventDefault()}>
            {link.text}
          </a>)}
      </div>
    </div>;
};

