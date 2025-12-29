import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: 'نظرة عامة', href: '#' },
  { label: 'الميزات', href: '#' },
  { label: 'الأسئلة الأكثر شيوعاً', href: '#' },
  { label: 'شهادات', href: '#' },
  { label: '4004009', href: '#' }
];

// @component: HealthcareHeaderNav
export const HealthcareHeaderNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // @return
  return (
    <header
      dir="rtl"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 font-sans",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              التأمين الطبي
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse flex-grow justify-center px-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="relative group text-[15px] font-medium text-[#A4A4A4] hover:text-[#CD9E51] transition-colors duration-200 py-2"
              >
                {link.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#CD9E51] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden md:flex items-center justify-center px-6 py-2.5 border-2 border-[#CD9E51] text-[#CD9E51] text-sm font-bold rounded hover:bg-[#CD9E51] hover:text-white transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:-rotate-12" />
              <span>تواصل مع خدمة العملاء</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-4 text-base font-medium text-gray-600 hover:text-[#CD9E51] hover:bg-gray-50 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronLeft className="w-4 h-4 opacity-40" />
                </a>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href="#"
                  className="flex items-center justify-center w-full px-6 py-4 border-2 border-[#CD9E51] text-[#CD9E51] text-base font-bold rounded-lg hover:bg-[#CD9E51] hover:text-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-5 h-5 ml-2" />
                  تواصل مع خدمة العملاء
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

