import React from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, Download } from 'lucide-react';

interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => (
  <motion.li
    initial={{ opacity: 0, x: 10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-3 text-right"
    dir="rtl"
  >
    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#CD9E51]/10 flex items-center justify-center">
      <Check className="w-3 h-3 text-[#CD9E51]" />
    </div>
    <span className="text-gray-700 text-sm md:text-base leading-relaxed">
      {text}
    </span>
  </motion.li>
);

// @component: InsurancePlanCard
export const InsurancePlanCard = () => {
  const features = [
    "سقف سنوي 1 مليون دينار أردني.",
    "تغطية 100% لزيارات الطبيب.",
    "تغطية 100% داخل المستشفى.",
    "ثلاث فئات من التغطية: الخاصة، الأولى، والثانية. ابتداءً من 250 دينار.",
    "خدمة على مدار الساعة طوال أيام الأسبوع.",
    "تغطية لا تقل عن 80 % للأشعة والمختبرات والادوية الموصوفة.",
    "تغطية الولادة ومضاعفاتها ومراجعاتها حسب الفئة المختارة.",
    "منح خصم بقيمة 20% على جميع عقود السفر."
  ];

  // @return
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 font-['IBM_Plex_Sans_Arabic',sans-serif]"
      dir="rtl"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full lg:max-w-[550px]"
        >
          <div className="mb-8">
            <h3 className="text-[#CD9E51] text-2xl md:text-3xl font-medium mb-2">
              "كيور"
            </h3>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
              برامج التأمين الصحي
            </h2>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            تأمين "كيور"، يلبي جميع احتياجاتك ويشمل متطلباتك وتشمل تغطيات وميزات
            واسعة منها:
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <FeatureItem key={index} text={feature} />
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-[#CD9E51] text-white px-8 py-4 rounded-md font-medium text-lg transition-colors hover:bg-[#b88c45]"
            >
              <Download className="w-5 h-5 ml-2" />
              قم بتنزيل بروشور كيور…
            </motion.a>

            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border-2 border-[#CD9E51] text-[#CD9E51] px-8 py-4 rounded-md font-medium text-lg transition-colors hover:bg-[#CD9E51]/5"
            >
              <Phone className="w-5 h-5 ml-2" />
              احصل على استشارة مجانية الآن!
            </motion.a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://jico.jo/wp-content/uploads/2025/10/health-insurance-medical-insurance-programs.jpg"
              alt="Health Insurance Medical Programs"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#CD9E51] rounded-2xl -z-0 hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
};


