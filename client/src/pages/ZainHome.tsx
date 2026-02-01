import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Smartphone, CreditCard, HelpCircle } from 'lucide-react';
import {
  ZainHeaderNav,
  QuickPaySection,
  PromotionalBanner,
  ZainLogo
} from '../components/zain';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ServiceCard = ({ title, description, icon, onClick }: ServiceCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#37ace5]/30"
  >
    <div className="w-14 h-14 rounded-full bg-[#37ace5]/10 flex items-center justify-center mb-4 group-hover:bg-[#37ace5]/20 transition-colors">
      <div className="text-[#37ace5]">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-[#11120E] mb-2 group-hover:text-[#37ace5] transition-colors">
      {title}
    </h3>
    <p className="text-[#666666] text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function ZainHome() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'زين فايبر',
      description: 'إنترنت منزلي بسرعات فائقة تصل إلى 2000 ميجابت مع راوتر Wi-Fi 6 مجاناً',
      icon: <Wifi size={28} />,
      path: '/zain/fiber'
    },
    {
      title: 'خطوط الموبايل',
      description: 'باقات موبايل متنوعة تناسب جميع احتياجاتك مع تغطية شاملة',
      icon: <Smartphone size={28} />,
      path: '#'
    },
    {
      title: 'الدفع الإلكتروني',
      description: 'ادفع فواتيرك وأعد شحن رصيدك بكل سهولة وأمان',
      icon: <CreditCard size={28} />,
      path: '#'
    },
    {
      title: 'الدعم الفني',
      description: 'فريق دعم متخصص على مدار الساعة لخدمتك',
      icon: <HelpCircle size={28} />,
      path: '#'
    }
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      style={{ fontFamily: "'Zain', 'IBM Plex Sans Arabic', sans-serif" }}
      dir="rtl"
    >
      {/* Top Navigation */}
      <ZainHeaderNav />

      {/* Logo Header */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <ZainLogo />
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/zain/fiber');
              }}
              className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium"
            >
              الإنترنت المنزلي
            </a>
            <a href="#" className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium">
              الموبايل
            </a>
            <a href="#" className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium">
              الأجهزة
            </a>
            <a href="#" className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium">
              العروض
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-8">
        <PromotionalBanner
          src="https://www.jo.zain.com/arabic/HomePageSlider/Fiber%20Home%20Page%20Banner%20-%20AR.jpg"
          alt="Zain Fiber - أسرع إنترنت في الأردن"
          onClick={() => navigate('/zain/fiber')}
        />
      </section>

      {/* Quick Pay Section */}
      <QuickPaySection
        onPaySubmit={(value) => {
          console.log('Quick pay submitted:', value);
        }}
      />

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#11120E] mb-4">
            خدماتنا
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            نقدم لك مجموعة متكاملة من خدمات الاتصالات والإنترنت
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                onClick={() => navigate(service.path)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#11120E] text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/zain_logo.png"
                alt="Zain"
                className="h-10 mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                شركة الاتصالات الأردنية الرائدة
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">زين فايبر</a></li>
                <li><a href="#" className="hover:text-white transition-colors">خطوط الموبايل</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأجهزة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الفروع</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <p className="text-gray-400 text-sm mb-2">خدمة العملاء: 1234</p>
              <p className="text-gray-400 text-sm">البريد: support@jo.zain.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2026 زين الأردن. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
