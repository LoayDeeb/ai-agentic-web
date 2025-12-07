import React from 'react';
import { Users, DollarSign, Clock, CreditCard } from 'lucide-react';

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
  const defaultIcon = icon || <DollarSign className="w-6 h-6" />;

  // @return
  return <div className="w-full p-2.5">
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="block w-6 h-6 flex items-center justify-center" style={{
        color: iconColor
      }}>
          {defaultIcon}
        </span>
        <span className="font-bold text-base text-[#161616]" style={{
        fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
      }}>
          {title}
        </span>
      </div>
      <span className="block text-base text-[#161616] mr-[30px]" style={{
      fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
    }}>
        {content}
      </span>
    </div>;
};
