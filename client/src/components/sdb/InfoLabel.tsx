import React from 'react';

type InfoLabelProps = {
  text?: string;
  className?: string;
};

// @component: InfoLabel
export const InfoLabel = ({
  text = 'قنوات التقديم',
  className = ''
}: InfoLabelProps) => {
  // @return
  return <div className={`flex gap-[5px] p-0 m-0 w-[413.4px] ${className}`} style={{
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
  }}>
      <span className="font-bold text-base leading-6" style={{
      fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
    }}>
        {text}
      </span>
    </div>;
};

