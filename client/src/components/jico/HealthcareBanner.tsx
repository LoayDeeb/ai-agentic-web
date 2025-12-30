import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

/**
 * HealthcareBanner Component
 * A high-end, responsive banner for a healthcare insurance provider.
 * Supports RTL layout and features a parallax-like background effect.
 */

const BACKGROUND_IMAGE = "https://jico.jo/ar/wp-content/uploads/sites/2/2021/03/best_health_insurance-scaled.jpg";
interface BreadcrumbItem {
  label: string;
  href?: string;
}
const breadcrumbs: BreadcrumbItem[] = [{
  label: 'الصفحة الرئيسية',
  href: '#'
}, {
  label: 'التأمين الفردي',
  href: '#'
}, {
  label: 'التأمين الطبي'
}];

// @component: HealthcareBanner
export const HealthcareBanner = () => {
  // @return
  return <section className="relative w-full h-[600px] overflow-hidden flex items-center justify-center font-['IBM_Plex_Sans_Arabic',_sans-serif]" dir="rtl">
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{
      backgroundImage: `url(${BACKGROUND_IMAGE})`,
      backgroundPosition: 'center 50%'
    }}>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 flex flex-col items-center md:items-start text-white">
        
        {/* Breadcrumbs */}
        <nav className="absolute top-8 left-4 right-4 md:left-8 md:right-8" aria-label="Breadcrumb">
          <ul className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {breadcrumbs.map((item, index) => <li key={index} className="flex items-center gap-2">
                {item.href ? <a href={item.href} className="hover:underline transition-colors duration-200" onClick={e => e.preventDefault()}>
                    {item.label}
                  </a> : <span className="font-bold">{item.label}</span>}
                {index < breadcrumbs.length - 1 && <ChevronRight size={14} className="rotate-180 opacity-70" />}
              </li>)}
          </ul>
        </nav>

        {/* Hero Text */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center md:text-right max-w-2xl mt-12 md:mt-0">
          <h2 className="text-xl md:text-2xl font-normal mb-4 text-sky-100/90">
            تأمين طبي مميز في الأردن
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 drop-shadow-lg">
            نرعاك و نرعى عائلتك
          </h1>
          
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-3 bg-[#5eb2e0] hover:bg-[#4a9ecb] text-white px-8 py-4 rounded-md font-medium text-base transition-all duration-300 shadow-lg group">
              <span className="relative overflow-hidden flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </span>
              أحصل على استشارة مجانية
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>;
};


