import React from 'react';

type FinancingTypesHeaderProps = {
  text?: string;
  className?: string;
};

// @component: FinancingTypesHeader
export const FinancingTypesHeader = ({
  text = 'اكتشف أنواع التمويل',
  className = ''
}: FinancingTypesHeaderProps) => {
  // @return
  return <h2 className={`font-bold text-[30px] leading-[38px] w-full ${className}`} style={{
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
    fontStyle: 'normal',
    fontVariantLigatures: 'normal',
    fontStretch: '100%'
  }} dir="rtl">
      {text}
    </h2>;
};



