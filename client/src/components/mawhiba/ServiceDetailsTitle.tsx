import React from 'react';

type ServiceDetailsTitleProps = {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  dir?: 'rtl' | 'ltr' | 'auto';
};

// @component: ServiceDetailsTitle
export const ServiceDetailsTitle = ({
  text = 'البرنامج الوطني للكشف عن الموهوبين',
  size = 'lg',
  className = '',
  dir = 'rtl'
}: ServiceDetailsTitleProps) => {
  const sizeClasses = {
    sm: 'text-xl leading-7',
    md: 'text-2xl leading-9',
    lg: 'text-[32px] leading-[48px]',
    xl: 'text-4xl leading-[56px]'
  };

  // @return
  return <h1 className={`font-normal text-gray-600 m-0 p-0 ${sizeClasses[size]} ${className}`} style={{
    fontFamily: 'Alexandria, sans-serif'
  }} dir={dir}>
      {text}
    </h1>;
};


