import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ZainFiberIntroProps {
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  rtl?: boolean;
  onButtonClick?: () => void;
}

export const ZainFiberIntro = ({
  subtitle = "زين فايبر",
  title = "استمتع بأقصى درجات السرعة",
  description = "سرعات فائقة تصل لغاية 2000 ميجابت",
  buttonText = "تحقق الآن",
  imageUrl = "https://www.jo.zain.com/arabic/PublishingImages/_5g%20-%201200x628%20copy.jpg",
  rtl = true,
  onButtonClick
}: ZainFiberIntroProps) => {
  const dirClass = rtl ? "rtl" : "ltr";
  const textAlign = rtl ? "text-right" : "text-left";
  const flexDirection = rtl ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <section
      className={`w-full bg-white py-12 px-6 md:px-12 lg:px-24 flex flex-col ${flexDirection} items-center justify-between gap-12 lg:gap-24 overflow-hidden`}
      dir={dirClass}
    >
      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: rtl ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`flex-1 flex flex-col ${textAlign} max-w-xl`}
      >
        <h6 className="text-[19px] font-normal leading-[1.1] text-[#11120e] mb-2 font-['Zain',sans-serif]">
          {subtitle}
        </h6>

        <h2 className="text-[48px] font-bold leading-[1.25] text-[#11120e] mb-4 font-['Zain',sans-serif]">
          {title}
        </h2>

        <h4 className="text-[21px] font-normal leading-[1.1] text-[#11120e] mb-8 font-['Zain',sans-serif]">
          {description}
        </h4>

        <div className="flex items-center">
          <button
            className="flex items-center gap-2 text-[#0070c9] text-[21px] font-bold bg-transparent border-none cursor-pointer p-0 group hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onButtonClick?.();
            }}
          >
            <span>{buttonText}</span>
            <ChevronRight
              className={`w-6 h-6 transition-transform group-hover:translate-x-${rtl ? '-1' : '1'} ${rtl ? 'rotate-180' : ''}`}
              strokeWidth={3}
            />
          </button>
        </div>
      </motion.div>

      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex-1 w-full max-w-[504px]"
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt="Zain Fiber"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>
      </motion.div>
    </section>
  );
};
