import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InternetPackageCardProps {
  id?: string;
  title?: string;
  price?: string;
  currency?: string;
  billingCycle?: string;
  period?: string;
  features?: string[];
  isExclusive?: boolean;
  discountPrice?: string;
  discountPromo?: string;
  buttonText?: string;
  details?: string[];
  onSubscribe?: () => void;
  isHighlighted?: boolean;
}

export const InternetPackageCard = ({
  id = 'fiber500',
  title = "فايبر 500 ميجابت",
  price = "23",
  currency = "دينار",
  billingCycle = "شهري",
  period = "سنتين",
  features = ["راوتر فايبر: Wi-Fi 6 مجاناً"],
  isExclusive = false,
  discountPrice,
  discountPromo = "اونلاين فقط",
  buttonText = "اشترك الان",
  details = [
    "سرعة تحميل تصل إلى 500 ميجابت",
    "سرعة رفع تصل إلى 250 ميجابت",
    "راوتر Wi-Fi 6 متطور مجاني",
    "خدمة عملاء مميزة على مدار الساعة"
  ],
  onSubscribe,
  isHighlighted = false
}: InternetPackageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      id={`${id}-section`}
      className={cn(
        "relative flex flex-col p-6 bg-white border rounded-[24px] w-[310px] min-h-[400px] shadow-sm hover:shadow-md transition-all duration-300 select-none",
        isHighlighted 
          ? "border-[#E6007E] ring-2 ring-[#E6007E]/20 shadow-lg" 
          : "border-[#E2E6EB]"
      )}
      dir="rtl"
    >
      {/* Exclusive Label */}
      {isExclusive && (
        <div className="absolute top-5 left-[-7px] z-10">
          <div
            className="bg-[#E6007E] text-white text-[12px] py-1 px-3 rounded-full flex items-center justify-center font-medium shadow-sm"
            style={{ minWidth: '92px', height: '24px' }}
          >
            عرض محدود
          </div>
        </div>
      )}

      {/* Online Discount Ribbon */}
      {discountPrice && (
        <div
          className="absolute top-5 left-[-7px] z-10 flex flex-col items-center justify-center text-white p-2 pt-0 pb-2"
          style={{
            backgroundImage: `url('https://www.jo.zain.com/english/PublishingImages/Icons/discount-ribbon-ar.png')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            minWidth: '120px',
            height: '50px'
          }}
        >
          <div className="flex items-baseline gap-1 mt-[-2px]">
            <span className="text-[18px] font-bold">{discountPrice}</span>
            <span className="text-[12px]">{currency}\{billingCycle}</span>
          </div>
          <span className="text-[10px] leading-[10px] opacity-90">{discountPromo}</span>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-start justify-between w-full mb-4">
        <h4 className="text-[18px] font-semibold text-[#11120E] leading-tight min-h-[55px] pt-0">
          {title}
        </h4>
      </div>

      {/* Pricing Section */}
      <div className="flex items-end justify-between w-full gap-4 relative">
        <div className="flex items-baseline gap-2">
          <span className="text-[36px] font-bold text-[#11120E] leading-none">
            {price}
          </span>
          <span className="text-[14px] text-[#11120E] whitespace-nowrap">
            {currency}\{billingCycle}
          </span>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="text-[14px] text-[#11120E] border-r border-[#E2E6EB] pr-2.5 h-6 flex items-center">
            {period}
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-[#E2E6EB] my-4" />

      {/* Primary Features List */}
      <ul className="flex-1 space-y-3 mb-4">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start text-[14px] text-[#4F6F88] leading-tight"
          >
            <span className="text-[#E6007E] font-bold ml-2.5 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Action Area */}
      <div className="mt-auto pt-4">
        <button
          onClick={onSubscribe}
          className="w-full h-10 rounded-full bg-[#E6007E] hover:bg-[#c5006d] text-white text-[14px] font-semibold transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          {buttonText}
        </button>

        {/* Collapsible Details */}
        <div className="mt-4">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <ul className="py-2 space-y-2 border-t border-[#E2E6EB] mt-2">
                  {details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-[#4F6F88] list-disc list-inside px-1"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[#E6007E] text-[14px] font-bold cursor-pointer group mt-2"
          >
            <span>{isExpanded ? 'اخفاء المزيد' : 'عرض المزيد'}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={22} className="mt-[-2px]" />
            </motion.span>
          </button>
        </div>
      </div>
    </div>
  );
};
