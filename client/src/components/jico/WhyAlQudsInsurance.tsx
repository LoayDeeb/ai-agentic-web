import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HeartPulse, MapPin, Zap, CreditCard } from 'lucide-react';

interface BenefitItemProps {
  text: string;
  icon: React.ReactNode;
  delay?: number;
}

const BenefitItem = ({ text, icon, delay = 0 }: BenefitItemProps) => (
  <motion.li
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 group"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <span className="text-gray-700 font-medium text-lg leading-tight transition-colors duration-300 group-hover:text-blue-900">
      {text}
    </span>
  </motion.li>
);

// @component: WhyAlQudsInsurance
export const WhyAlQudsInsurance = () => {
  const benefits = [
    { text: "مطالبات سهلة.", icon: <CheckCircle2 size={18} /> },
    { text: "شبكة طبية واسعة.", icon: <ShieldCheck size={18} /> },
    { text: "تنوع وتوزيع جغرافي داخل حدود المملكة.", icon: <MapPin size={18} /> },
    { text: "موافقات طبية سريعة.", icon: <Zap size={18} /> },
    { text: "بطاقات تأمين الكترونية.", icon: <CreditCard size={18} /> }
  ];

  // @return
  return (
    <div
      dir="rtl"
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 font-['IBM_Plex_Sans_Arabic',sans-serif]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-16">
          {/* Decorative Spacer Columns (mimicking the 10-80-10 layout) */}
          <div className="hidden lg:block lg:flex-1"></div>

          <div className="flex-[8] w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative inline-block mb-6">
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                  <span className="font-semibold text-blue-900">
                    لماذا القدس للتأمين؟
                  </span>
                </h2>
                <div className="absolute -bottom-2 right-0 w-16 h-1 bg-blue-600 rounded-full"></div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <ul className="space-y-1">
                  {benefits.map((benefit, index) => (
                    <BenefitItem
                      key={index}
                      text={benefit.text}
                      icon={benefit.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-8 md:mt-0 flex flex-col justify-center"
                >
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden">
                    <HeartPulse className="absolute -bottom-4 -left-4 w-24 h-24 text-blue-100 opacity-50 rotate-12" />
                    <p className="relative z-10 text-gray-700 text-lg leading-relaxed">
                      في القدس للتأمين، قمنا بتصميم حلول التأمين الطبي الخاصة بنا
                      حول احتياجات مطلوبة من عملائنا. سواء كنت تبحث عن تغطية كاملة
                      وشاملة أو خيار ملاءم أكثر للميزانية، فقد تم تصميم برامجنا
                      لتمنحك راحة البال في تغطيتك حسب الحاجة.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:flex-1"></div>
        </div>
      </div>

      {/* Global Style Injection for IBM Plex Sans Arabic font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

