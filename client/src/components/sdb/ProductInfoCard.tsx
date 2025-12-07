import React from 'react';

type ProductInfoCardProps = {
  icon?: React.ReactNode;
  title?: string;
  content?: string;
  iconColor?: string;
};

// @component: ProductInfoCard
export const ProductInfoCard = ({
  icon,
  title = 'رسوم الخدمة',
  content = 'مجانية',
  iconColor = 'rgb(27, 131, 84)'
}: ProductInfoCardProps) => {
  // @return
  return <div className="w-full max-w-[413.4px] m-2.5">
      <div className="flex items-center gap-[5px] mb-2.5">
        <span className="block w-6 h-6 text-2xl leading-6" style={{
        color: iconColor
      }}>
          {icon}
        </span>
        <span className="font-bold text-base leading-6" style={{
        fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
      }}>
          {title}
        </span>
      </div>
      <span className="block text-base leading-6 mx-[30px]" style={{
      fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
    }}>
        {content}
      </span>
    </div>;
};
