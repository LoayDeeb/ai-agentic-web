import React from 'react';

type ArabicTextSectionProps = {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
};

// @component: ArabicTextSection
export const ArabicTextSection = ({
  text = 'صممنا منتجات رائدة ومبتكرة تتنوع بين منتجات للأفراد وأخرى للمنشآت، والقطاع غير الربحي، كما نحرص على تطويرها وتحسينها بشكل مستمر لتحقق الغايات المرجوة منها، هنا اكتشف تمويلك المناسب.',
  className = '',
  style
}: ArabicTextSectionProps) => {
  // @return
  return <p style={{
    fontStyle: 'normal',
    fontVariantLigatures: 'normal',
    fontWeight: 400,
    fontStretch: '100%',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
    boxSizing: 'border-box',
    padding: '0px',
    margin: '0px',
    width: '100%',
    ...style
  }} className={className} dir="rtl">
      {text}
    </p>;
};


