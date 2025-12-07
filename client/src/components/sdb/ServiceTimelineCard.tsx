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
  return <div className="w-full max-w-md p-2.5" style={{
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <Calendar className="w-6 h-6 text-[#1b8354]" strokeWidth={2} />
        <span className="text-base font-bold text-gray-900">{title}</span>
      </div>
      
      <div className="ml-[30px] mr-[30px] space-y-0">
        <div className="flex items-center gap-2">
          <Monitor className="w-6 h-6 text-[#1b8354]" strokeWidth={2} />
          <span className="text-base font-normal text-gray-900">{desktopYear}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-[#1b8354]" strokeWidth={2} />
          <span className="text-base font-normal text-gray-900">{mobileYear}</span>
        </div>
      </div>
    </div>;
};

