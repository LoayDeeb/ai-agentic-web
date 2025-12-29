import React from 'react';
import { motion } from 'framer-motion';
import { Download, PhoneCall } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InsuranceSectionProps {
  title?: string;
  description1?: string;
  description2?: string;
  imageUrl?: string;
  brochureLabel?: string;
  consultationLabel?: string;
  phoneNumber?: string;
  brochureLink?: string;
  className?: string;
  isRtl?: boolean;
}

const defaultProps = {
  title: "تأمين السرطان",
  description1:
    "بالشراكة مع مؤسسة الحسين للسرطان تقدم القدس للتأمين تأمين رعاية لتغطية علاج مرض السرطان وهو تأمين تكافلي اجتماعي غير ربحي، لتغطية تكاليف علاج مرض السرطان في مركز الحسين للسرطان, أحد أفضل المراكز المختصة في علاج مرضى السرطان على مستوى الشرق الأوسط، حيث يقوم مبدأ التأمين على فكرة التكافل والالتزام بالتبرع السنوي للاشتراك.",
  description2:
    'ومن خلال هذه الشراكة، تهدف القدس للتأمين إلى جعل خدمات علاج السرطان عالية الجودة في متناول الجميع، ودعم الأفراد والعائلات في أصعب المراحل. حيث يوفّر تأمين "رعاية" للسرطان راحة البال من خلال الجمع بين الحماية المالية والخبرة الطبية المميزة لمركز الحسين للسرطان.',
  imageUrl:
    "https://jico.jo/wp-content/uploads/2025/11/Cancer-Insurance-Jordan-Amman.jpg",
  brochureLabel: "Download Brochure",
  consultationLabel: "احصل على استشارة مجانية الآن!",
  phoneNumber: "+96264004009",
  brochureLink: "#",
  isRtl: true
};

// @component: InsuranceSection
export const InsuranceSection = (props: InsuranceSectionProps) => {
  const {
    title = defaultProps.title,
    description1 = defaultProps.description1,
    description2 = defaultProps.description2,
    imageUrl = defaultProps.imageUrl,
    brochureLabel = defaultProps.brochureLabel,
    consultationLabel = defaultProps.consultationLabel,
    phoneNumber = defaultProps.phoneNumber,
    brochureLink = defaultProps.brochureLink,
    className,
    isRtl = defaultProps.isRtl
  } = props;

  // @return
  return (
    <section
      className={cn(
        "w-full bg-white py-16 px-4 sm:px-6 lg:px-8",
        isRtl ? "font-['IBM_Plex_Sans_Arabic',sans-serif]" : "font-sans",
        className
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-6 -left-6 -z-10 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-8 order-1 lg:order-2"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl lg:text-5xl font-normal text-slate-900 mb-6 leading-tight relative inline-block"
              >
                {title}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-sky-400/30 rounded-full" />
              </motion.h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {description1}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {description2}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={brochureLink}
                onClick={(e) => e.preventDefault()}
                className="group flex items-center justify-center gap-2 bg-[#5EB2E0] hover:bg-[#4a9ecb] text-white px-8 py-4 rounded-md transition-all duration-300 shadow-lg shadow-sky-100 uppercase font-medium text-base min-w-[200px]"
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span>{brochureLabel}</span>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center justify-center gap-2 border-2 border-[#CD9E51] hover:bg-[#CD9E51] text-[#CD9E51] hover:text-white px-8 py-4 rounded-md transition-all duration-300 uppercase font-medium text-base min-w-[200px]"
              >
                <PhoneCall className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{consultationLabel}</span>
              </a>
            </motion.div>

            {/* Added social/trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-4 text-slate-400 text-sm border-t border-slate-100 pt-6"
            >
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                  />
                ))}
              </div>
              <p>انضم إلى آلاف المستفيدين من تغطية رعاية</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

