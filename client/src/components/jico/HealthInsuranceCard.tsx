import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealthInsuranceCardProps {
  title?: string;
  description1?: string;
  description2?: string;
  buttonText?: string;
  imageUrl?: string;
  imageAlt?: string;
  onButtonClick?: () => void;
}

const DEFAULT_CONTENT = {
  description1:
    "لان صحتك هي الأهم. نقدم لك مجموعة خيارات من برامج التأمين الطبي لتلبية احتياجات افراد عائلتك. إن حلولنا التأمينية تساعدك في الحصول على الرعاية التي تحتاجها، دون ضغوط التكاليف غير المتوقعة.",
  description2:
    'ولهذا السبب فإننا نقدم "كيور"، حيث تم تصميم حلول التأمين الطبي الفردية لدينا لتوفير حماية مميزة.',
  buttonText: "احمِ نفسك وأحبائك الآن…",
  imageUrl: "https://jico.jo/wp-content/uploads/2025/10/Cheap-health-insurance.jpg",
  imageAlt: "تغطية التأمين الطبي"
};

/**
 * HealthInsuranceCard - A reusable React component for medical insurance promotion.
 * Designed with RTL (Arabic) support and a modern professional aesthetic.
 */
// @component: HealthInsuranceCard
export const HealthInsuranceCard = ({
  description1 = DEFAULT_CONTENT.description1,
  description2 = DEFAULT_CONTENT.description2,
  buttonText = DEFAULT_CONTENT.buttonText,
  imageUrl = DEFAULT_CONTENT.imageUrl,
  imageAlt = DEFAULT_CONTENT.imageAlt,
  onButtonClick = () => {}
}: HealthInsuranceCardProps) => {
  // @return
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16 font-sans"
      dir="rtl"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text Content Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-[47.5%] flex flex-col items-start text-right"
        >
          <div className="space-y-6">
            <p className="text-[#333333] text-base md:text-[15px] leading-[1.6] md:leading-[22.6px]">
              {description1}
            </p>

            <p className="text-[#333333] text-base md:text-[15px] leading-[1.6] md:leading-[22.6px]">
              {description2}
            </p>
          </div>

          <motion.button
            onClick={onButtonClick}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(205, 158, 81, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 group relative flex items-center justify-center gap-3 px-6 h-[52px] min-w-[150px] 
                       border-[0.6px] border-[#CD9E51] rounded-[4px] bg-transparent 
                       text-[#CD9E51] text-[17px] font-medium transition-all duration-300
                       hover:shadow-md cursor-pointer"
          >
            <span className="transform group-hover:-rotate-12 transition-transform duration-300">
              <Phone size={24} className="stroke-[1.5px]" />
            </span>
            <span>{buttonText}</span>
          </motion.button>
        </motion.div>

        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-[47.5%] overflow-hidden rounded-lg shadow-sm"
        >
          <figure className="relative w-full h-auto flex justify-center items-center group">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle overlay for image depth */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </figure>
        </motion.div>
      </div>

      {/* Decorative elements - Subtle gold accent line at bottom on mobile only */}
      <div className="md:hidden mt-8 w-16 h-[1px] bg-[#CD9E51]/30 mx-auto" />
    </div>
  );
};


