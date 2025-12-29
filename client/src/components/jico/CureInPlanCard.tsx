import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Interface for the CureInPlanCard props.
 * Allows customization of the content for reusability.
 */
interface CureInPlanCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  isRtl?: boolean;
}

const defaultFeatures = [
  "سقف سنوي 1 مليون دينار أردني.",
  "تغطية 100% داخل المستشفى فقط.",
  "ثلاث فئات من التغطية: الخاصة، الأولى، والثانية. ابتداءً من 65 دينار.",
  "خدمة على مدار الساعة طوال أيام الأسبوع.",
  "تغطية الولادة ومضاعفاتها حسب الفئة المختارة."
];

// @component: CureInPlanCard
export const CureInPlanCard = ({
  title = ""كيور ان"",
  subtitle = "",
  description = 'تأمين "كيور " خيار يناسب احتياجاتك ومتطلباتك داخل المستشفى فقط ويشمل تغطيات وميزات رئيسية منها:',
  features = defaultFeatures,
  primaryButtonText = "لمعرفة المزيد، قم بتنزيل بروشور كيور إن…",
  secondaryButtonText = "احصل على استشارة مجانية الآن!",
  imageUrl = "https://jico.jo/wp-content/uploads/2025/10/in-patient-medical-insurance.jpg",
  imageAlt = "In-patient medical insurance",
  className = "",
  isRtl = true
}: CureInPlanCardProps) => {
  // @return
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto px-4 py-12 md:py-20 bg-white overflow-hidden",
        isRtl ? "rtl" : "ltr",
        className
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CD9E51] leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg font-medium text-gray-600">{subtitle}</p>
            )}
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 group"
              >
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#CD9E51] transition-transform group-hover:scale-110" />
                </div>
                <span className="text-base text-gray-600 font-medium">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-[#CD9E51] text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors hover:bg-[#b88c45] shadow-lg shadow-[#CD9E51]/20 min-w-[240px]"
            >
              <ArrowRight className={cn("w-5 h-5", isRtl ? "rotate-180" : "")} />
              {primaryButtonText}
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border-2 border-[#CD9E51] text-[#CD9E51] px-8 py-4 rounded-md font-semibold text-lg transition-colors hover:bg-[#CD9E51]/5 min-w-[240px]"
            >
              <Phone className="w-5 h-5" />
              {secondaryButtonText}
            </motion.a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative group max-w-[500px]">
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-[#CD9E51]/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-1" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge for added polish */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#CD9E51]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#CD9E51] font-bold text-xl">1M</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">سقف التغطية</p>
                  <p className="font-bold text-gray-800">دينار أردني</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

