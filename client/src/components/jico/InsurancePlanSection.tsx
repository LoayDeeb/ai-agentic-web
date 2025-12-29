import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft } from 'lucide-react';

/**
 * InsurancePlanSection - A responsive, two-column layout component 
 * specifically designed for showcasing insurance plan details with an image.
 * Designed with RTL support in mind for Arabic content.
 */

// Types for the component props for better reusability
interface InsurancePlanSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

// @component: InsurancePlanSection
export const InsurancePlanSection = ({
  imageSrc = "https://jico.jo/wp-content/uploads/2025/10/Jordan-Best-health-insurance.jpg",
  imageAlt = "Jordan Best Health Insurance",
  title = "كيور 50:50",
  description = "تأمين كيور 50:50 يوازن بين التغطيات الأساسية وتكاليفه المناسبة ويشمل تغطيات وميزات عديدة منها:",
  features = [
    "سقف سنوي 500,000 دينار أردني.",
    "تغطية 50% داخل المستشفى.",
    "فئتان من التغطية: الأولى، والثانية. ابتداءً من 130 دينار.",
    "خدمة على مدار الساعة طوال أيام الأسبوع .",
    "تغطية الولادة ومضاعفاتها ومراجعاتها بسقف 50% من سقف الولادة الممنوح.",
    "تغطية 50 % للأشعة والمختبرات والادوية الموصوفة.",
    "منح خصم بقيمة 20% على جميع عقود السفر."
  ],
  primaryButtonText = "قم بتنزيل بروشور كيور 50:50…",
  secondaryButtonText = "احصل على استشارة مجانية الآن!",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {}
}: InsurancePlanSectionProps) => {
  // @return
  return (
    <section
      className="w-full py-12 md:py-24 bg-white font-sans overflow-hidden"
      dir="rtl"
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col items-start"
          >
            <div className="mb-6">
              <h2 className="text-[30px] md:text-[51px] font-medium text-slate-900 leading-tight mb-4">
                {title}
              </h2>
              <div className="w-16 h-1 bg-[#CD9E51] mb-6"></div>
              <p className="text-[16px] text-gray-700 leading-relaxed mb-6">
                {description}
              </p>
            </div>

            <ul className="space-y-4 mb-10 w-full">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] text-gray-600 leading-snug"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#CD9E51] flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 w-full">
              <button
                onClick={onPrimaryClick}
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-[#CD9E51] text-white font-medium rounded-md transition-all duration-300 hover:bg-[#b88e46] hover:shadow-lg active:scale-95 flex-grow sm:flex-grow-0"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-[17px]">{primaryButtonText}</span>
              </button>

              <button
                onClick={onSecondaryClick}
                className="group flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#CD9E51] text-[#CD9E51] font-medium rounded-md transition-all duration-300 hover:bg-[#CD9E51]/5 active:scale-95 flex-grow sm:flex-grow-0"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-[17px]">{secondaryButtonText}</span>
              </button>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle overlay decorative element */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative background shape */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-[#CD9E51]/10 rounded-full blur-2xl" />
            <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-slate-100 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

