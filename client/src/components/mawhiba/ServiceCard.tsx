import React from 'react';
import { Share2, ArrowUpLeft } from 'lucide-react';

type ServiceCardProps = {
  title?: string;
  description?: string;
  availability?: string;
  isAvailable?: boolean;
  onStartService?: () => void;
  onShare?: () => void;
};

// @component: ServiceCard
export const ServiceCard = ({
  title = 'أسبوع موهبة للعلوم',
  description = 'خدمة تمكن الطلبة من التسجيل في أسبوع موهبة للعلوم',
  availability = 'متاح',
  isAvailable = true,
  onStartService = () => {},
  onShare = () => {}
}: ServiceCardProps) => {
  // @return
  return <div className="relative flex flex-col gap-3 w-[261px] bg-white border border-[#6b6681] rounded-[15px] p-6 pt-[38px] transition-all duration-200 ease-in-out" dir="rtl">
      <p className={`absolute top-0 left-[24px] text-white text-xs leading-[14px] px-2.5 py-1.5 rounded-b-md ${isAvailable ? 'bg-[#82b989]' : 'bg-gray-400'}`}>
        {availability}
      </p>
      <h3 className="text-[#4b5563] text-base font-medium leading-6 m-0 p-0">
        {title}
      </h3>
      <p className="text-[#6b7280] text-xs font-light leading-[21px] m-0 p-0">
        {description}
      </p>
      <div className="flex flex-wrap-reverse justify-between items-center gap-2 mt-[132px] h-[41.4px]">
        <button onClick={onStartService} className="flex items-center justify-center gap-2 min-w-max text-sm leading-6 font-normal border border-[#2b254b] rounded-2xl px-[6.6px] py-2 bg-white text-[#2b254b] transition-all duration-200 ease-in-out hover:bg-[#2b254b] hover:text-white cursor-pointer" aria-label="ابدأ الخدمة">
          <span>ابدأ الخدمة</span>
          <ArrowUpLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={onShare} className="flex items-center justify-center w-8 h-8 min-w-8 min-h-8 bg-[#f4f4f6] border border-transparent rounded-full p-2 transition-all duration-200 ease-in-out hover:bg-[#e5e7eb] cursor-pointer" aria-label="مشاركة">
            <Share2 className="w-4 h-4 text-[#2b254b]" />
          </button>
        </div>
      </div>
    </div>;
};




