import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ZainHeaderNav,
  ZainTabNavigation,
  ZainFiberIntro,
  PackageSectionHeader,
  InternetPackageCard,
  ZainLogo
} from '../components/zain';
import { onToolEvent } from '../features/agent/tools';

const fiberPackages = [
  {
    id: 'fiber500',
    title: 'فايبر 500 ميجابت',
    price: '23',
    currency: 'دينار',
    billingCycle: 'شهري',
    period: 'سنتين',
    features: [
      'راوتر فايبر: Wi-Fi 6 مجاناً',
      'سرعة تحميل 500 ميجابت',
      'دعم فني على مدار الساعة'
    ],
    details: [
      'سرعة تحميل تصل إلى 500 ميجابت',
      'سرعة رفع تصل إلى 250 ميجابت',
      'راوتر Wi-Fi 6 متطور مجاني',
      'خدمة عملاء مميزة على مدار الساعة'
    ],
    isExclusive: false,
    discountPrice: undefined
  },
  {
    id: 'fiber1000',
    title: 'فايبر 1000 ميجابت',
    price: '33',
    currency: 'دينار',
    billingCycle: 'شهري',
    period: 'سنتين',
    features: [
      'راوتر فايبر: Wi-Fi 6 مجاناً',
      'سرعة تحميل 1000 ميجابت',
      'سمارت واي فاي مجاني',
      'أولوية في الدعم الفني'
    ],
    details: [
      'سرعة تحميل تصل إلى 1000 ميجابت',
      'سرعة رفع تصل إلى 500 ميجابت',
      'راوتر Wi-Fi 6 متطور مجاني',
      'خدمة سمارت واي فاي مجانية',
      'أولوية في الدعم الفني'
    ],
    isExclusive: false,
    discountPrice: '29'
  },
  {
    id: 'fiber2000',
    title: 'فايبر 2000 ميجابت',
    price: '53',
    currency: 'دينار',
    billingCycle: 'شهري',
    period: 'سنتين',
    features: [
      'راوتر فايبر: Wi-Fi 6 متطور مجاناً',
      'سرعة تحميل 2000 ميجابت',
      'سمارت واي فاي مع تغطية موسعة',
      'تركيب خلال 24 ساعة',
      'أولوية قصوى في الدعم'
    ],
    details: [
      'سرعة تحميل تصل إلى 2000 ميجابت',
      'سرعة رفع تصل إلى 1000 ميجابت',
      'راوتر Wi-Fi 6 متطور مجاني',
      'خدمة سمارت واي فاي مع تغطية موسعة',
      'تركيب خلال 24 ساعة',
      'أولوية قصوى في الدعم الفني'
    ],
    isExclusive: true,
    discountPrice: undefined
  }
];

export default function ZainFiber() {
  const navigate = useNavigate();
  const [highlightedPackage, setHighlightedPackage] = useState<string | null>(null);

  // Listen for agent tool events
  useEffect(() => {
    const unsubscribe = onToolEvent((tool, args) => {
      if (tool === 'scrollToFiberPackage' && args.packageId) {
        const element = document.getElementById(`${args.packageId}-section`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedPackage(args.packageId);
          setTimeout(() => setHighlightedPackage(null), 3000);
        }
      }
      if (tool === 'selectPackage' && args.packageId) {
        setHighlightedPackage(args.packageId);
        const element = document.getElementById(`${args.packageId}-section`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleSubscribe = (packageId: string) => {
    navigate(`/zain/subscribe?package=${packageId}`);
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Zain', 'IBM Plex Sans Arabic', sans-serif" }}
      dir="rtl"
    >
      {/* Top Navigation */}
      <ZainHeaderNav />

      {/* Logo Header */}
      <header className="container mx-auto px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <ZainLogo />
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/zain');
              }}
              className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium"
            >
              الرئيسية
            </a>
            <a href="#" className="text-[#37ace5] font-bold">
              الإنترنت المنزلي
            </a>
            <a href="#" className="text-[#11120E] hover:text-[#37ace5] transition-colors font-medium">
              الأجهزة
            </a>
          </nav>
        </div>
      </header>

      {/* Tab Navigation */}
      <ZainTabNavigation />

      {/* Hero Intro */}
      <ZainFiberIntro
        onButtonClick={() => {
          const packagesSection = document.getElementById('packages-section');
          if (packagesSection) {
            packagesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Packages Section */}
      <section id="packages-section" className="py-12 bg-gray-50">
        <PackageSectionHeader
          title="سرعات متعددة لجميع احتياجاتك"
          subtitle="باقات زين فايبر"
        />

        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-wrap justify-center gap-6">
            {fiberPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <InternetPackageCard
                  id={pkg.id}
                  title={pkg.title}
                  price={pkg.price}
                  currency={pkg.currency}
                  billingCycle={pkg.billingCycle}
                  period={pkg.period}
                  features={pkg.features}
                  details={pkg.details}
                  isExclusive={pkg.isExclusive}
                  discountPrice={pkg.discountPrice}
                  onSubscribe={() => handleSubscribe(pkg.id)}
                  isHighlighted={highlightedPackage === pkg.id}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Zain Fiber */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#11120E] mb-4">
              لماذا زين فايبر؟
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'شبكة الألياف الأكبر',
                description: 'أكبر شبكة ألياف ضوئية في الأردن مع تغطية واسعة'
              },
              {
                title: 'سرعات ثابتة',
                description: 'سرعات مستقرة على مدار الساعة بدون انقطاع'
              },
              {
                title: 'تركيب مجاني',
                description: 'تركيب سريع ومجاني مع دعم فني متميز'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#37ace5]/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#37ace5]" />
                </div>
                <h3 className="text-xl font-bold text-[#11120E] mb-2">{item.title}</h3>
                <p className="text-[#666666]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#37ace5] to-[#0070C9] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جاهز للاشتراك؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            تحقق من توفر الخدمة في منطقتك واشترك الآن
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/zain/subscribe')}
            className="bg-white text-[#37ace5] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            اشترك الآن
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#11120E] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 زين الأردن. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
