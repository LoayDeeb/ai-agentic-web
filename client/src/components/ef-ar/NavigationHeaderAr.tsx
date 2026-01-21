import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const navItems: NavItem[] = [
  {
    label: 'الرئيسية',
    href: '/ef-ar'
  },
  {
    label: 'عن صندوق البيئة',
    href: '#',
    children: [
      { label: 'نبذة عنا', href: '#' },
      { label: 'مجلس الإدارة', href: '#' },
      { label: 'كلمة الرئيس التنفيذي', href: '#' },
      { label: 'المنظومة البيئية', href: '#' }
    ]
  },
  {
    label: 'برامجنا',
    href: '/ef-ar',
    children: [
      { label: 'المنح', href: '/ef-ar?category=المنح' },
      { label: 'ضمانات القروض', href: '/ef-ar?category=ضمانات+القروض' },
      { label: 'دعم القروض', href: '/ef-ar?category=دعم+القروض' },
      { label: 'الجوائز', href: '/ef-ar?category=الجوائز' }
    ]
  },
  {
    label: 'المركز الإعلامي',
    href: '#',
    children: [
      { label: 'التقارير السنوية', href: '#' },
      { label: 'الأخبار', href: '#' },
      { label: 'دليل الهوية البصرية', href: '#' }
    ]
  },
  {
    label: 'المكتبة الرقمية',
    href: '#',
    children: [{ label: 'البيانات المفتوحة', href: '#' }]
  }
];

export const NavigationHeaderAr = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('/ef-ar')) {
      navigate(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      dir="rtl"
      className={cn(
        'w-full fixed top-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#1d265a] shadow-lg py-2' : 'bg-transparent py-4'
      )}
    >
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d265a]/80 to-transparent -z-10 h-32" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full mb-2">
            <div className="flex-shrink-0 flex items-center h-16">
              <a
                href="/ef-ar"
                onClick={(e) => handleNavClick('/ef-ar', e)}
                className="flex items-center"
              >
                <img
                  src="https://www.ef.gov.sa/Style%20Library/assets/images/shared/EF-logo2.svg"
                  alt="شعار صندوق البيئة"
                  className="h-12 w-auto brightness-0 invert"
                />
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-reverse space-x-6 text-white/90 text-sm">
              <a
                href="/ef-ar"
                onClick={(e) => handleNavClick('/ef-ar', e)}
                className="bg-[#2c3a82] hover:bg-[#3a499d] px-3 py-1.5 rounded-lg transition-colors"
              >
                منصة الحوافز والمنح
              </a>
              <a href="#" className="hover:text-white transition-colors">
                انضم إلينا
              </a>
              <a href="#" className="hover:text-white transition-colors">
                تواصل معنا
              </a>
              <button
                className="p-1 hover:text-white transition-colors"
                aria-label="بحث"
              >
                <Search size={18} />
              </button>
              <button
                className="flex items-center space-x-reverse space-x-1 hover:text-white transition-colors"
                aria-label="تغيير اللغة"
              >
                <Globe size={18} />
                <span>English</span>
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-reverse space-x-4 text-white">
              <button className="p-1" aria-label="بحث">
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1"
                aria-label="القائمة"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          <nav className="hidden lg:flex justify-start mt-1">
            <ul className="flex items-center space-x-reverse space-x-8">
              {navItems.map((item) => (
                <li key={item.label} className="relative group">
                  <button
                    className="text-white flex items-center space-x-reverse space-x-1 py-4 text-base font-medium hover:text-white/80 transition-colors"
                    onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                    onClick={(e) => {
                      if (item.children) {
                        toggleDropdown(item.label);
                      } else {
                        handleNavClick(item.href, e);
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          activeDropdown === item.label ? 'rotate-180' : ''
                        )}
                      />
                    )}
                    <span className="absolute bottom-2 right-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                  </button>

                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className="absolute left-0 mt-0 w-[500px] bg-white rounded-md shadow-2xl overflow-hidden z-50 p-8"
                        >
                          <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={(e) => handleNavClick(child.href, e)}
                                  className="block py-2 text-[#212529] font-semibold text-base border-b border-gray-100 hover:text-[#2c3a82] hover:border-[#2c3a82] transition-all"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#1d265a] z-40 lg:hidden pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-4">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex justify-between items-center w-full text-white text-xl font-medium"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={20}
                        className={activeDropdown === item.label ? 'rotate-180' : ''}
                      />
                    )}
                  </button>
                  {item.children && (
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeDropdown === item.label ? 'auto' : 0,
                        opacity: activeDropdown === item.label ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 mr-4 space-y-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={(e) => handleNavClick(child.href, e)}
                              className="text-white/70 text-lg hover:text-white"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="pt-6 space-y-4">
                <a
                  href="/ef-ar"
                  onClick={(e) => handleNavClick('/ef-ar', e)}
                  className="block text-white text-lg"
                >
                  منصة الحوافز والمنح
                </a>
                <a href="#" className="block text-white text-lg">
                  انضم إلينا
                </a>
                <a href="#" className="block text-white text-lg">
                  تواصل معنا
                </a>
                <button className="flex items-center space-x-reverse space-x-2 text-white text-lg">
                  <Globe size={20} />
                  <span>English</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
