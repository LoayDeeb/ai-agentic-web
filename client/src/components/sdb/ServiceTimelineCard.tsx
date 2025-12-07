import React from 'react';
import { Calendar, Monitor, Smartphone } from 'lucide-react';

type ServiceTimelineCardProps = {
  title?: string;
  desktopYear?: string;
  mobileYear?: string;
};

// @component: ServiceTimelineCard
export const ServiceTimelineCard = ({
  title = 'بدء تقديم الخدمة',
  desktopYear = '2011',
  mobileYear = '2021'
}: ServiceTimelineCardProps) => {
  // @return
  return <div className="w-full p-2.5" style={{
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
  }}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="w-6 h-6 flex items-center justify-center text-[#1b8354]">
          <Calendar className="w-6 h-6" />
        </span>
        <span className="text-base font-bold text-[#161616]">{title}</span>
      </div>
      
      <div className="mr-[30px] space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center text-[#1b8354]">
            <Monitor className="w-6 h-6" />
          </span>
          <span className="text-base font-normal text-[#161616]">{desktopYear}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center text-[#1b8354]">
            <Smartphone className="w-6 h-6" />
          </span>
          <span className="text-base font-normal text-[#161616]">{mobileYear}</span>
        </div>
      </div>
    </div>;
};
