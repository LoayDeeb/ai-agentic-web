import React from 'react';

type ServicesHeaderProps = {
  className?: string;
};

// @component: MawhibaServicesHeader
export const MawhibaServicesHeader = (props: ServicesHeaderProps) => {
  // @return
  return <div className={`w-full max-w-[1440px] flex flex-col px-[162px] mx-[126px] ${props.className || ''}`}>
      <div className="flex justify-between items-center relative pb-6 w-full z-[1]">
        <h2 className="flex items-center text-[32px] font-normal font-[Alexandria,sans-serif] gap-2 leading-[48px] text-[rgb(43,37,75)]">
          <img src="https://www.mawhiba.sa/assets/img/img/icons/four-squares.svg" alt="calendar icon" className="block w-6 h-6" />
          الخدمات الإلكترونية
        </h2>
        <a href="#" className="flex justify-center items-center text-white bg-[rgb(43,37,75)] transition-all duration-200 ease-in-out text-base cursor-pointer gap-2 min-w-max leading-6 font-normal font-[Alexandria,sans-serif] outline outline-2 outline-[rgb(43,37,75)] rounded-2xl px-8 py-4 hover:opacity-90">
          <span className="text-white">عرض جميع الخدمات</span>
          <img className="block w-5 h-5 -scale-x-100 transition-all duration-200 ease-in-out" src="https://www.mawhiba.sa/assets/img/img/arrow-right-up--white.svg" alt="icon" />
        </a>
        <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(226,169,71)]"></span>
      </div>
    </div>;
};




