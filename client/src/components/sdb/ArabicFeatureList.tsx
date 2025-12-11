import React from 'react';

type ArabicFeatureListProps = {
  items?: string[];
  className?: string;
};

const defaultItems = ['تمويل يبدأ من 18 ألف ويصل إلى 100 ألف ♦ (عند عدم الاستفادة من أحد منتجات التمويل الاجتماعي سابقًا).', 'فترة السداد تصل إلى 4 سنوات.', 'يتم السداد بشكل شهري.', 'بدون رسوم إدارية.', 'يكون الإعفاء في حالة الوفاة لا سمح الله.'];

// @component: ArabicFeatureList
export const ArabicFeatureList = ({
  items = defaultItems,
  className = ''
}: ArabicFeatureListProps) => {
  // @return
  return <ul dir="rtl" className={`list-none p-0 pr-6 m-0 w-full max-w-[881px] ${className}`} style={{
    fontFamily: 'Arial, sans-serif'
  }}>
      {items.map((item, index) => <li key={index} className="relative h-6 text-base leading-6 text-right text-[#333333]">
          <span className="absolute left-[-19.2px] top-[11.2px] h-[5px] w-[5px] rounded-full bg-[#333333]" aria-hidden="true" />
          {item}
        </li>)}
    </ul>;
};



