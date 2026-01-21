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
    label: 'Home',
    href: '/ef'
  },
  {
    label: 'About Environment Fund',
    href: '#',
    children: [
      { label: 'About', href: '#' },
      { label: 'Board of Directors', href: '#' },
      { label: "CEO's Message", href: '#' },
      { label: 'Environmental system', href: '#' }
    ]
  },
  {
    label: 'Our Programs',
    href: '/ef',
    children: [
      { label: 'Grants', href: '/ef?category=Grants' },
      { label: 'Loan Guarantees', href: '/ef?category=Loan+Guarantee' },
      { label: 'Loan Support', href: '/ef?category=Loan+Support' },
      { label: 'Awards', href: '/ef?category=Awards' }
    ]
  },
  {
    label: 'Media Center',
    href: '#',
    children: [
      { label: 'Annual reports', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Visual Identity Guide', href: '#' }
    ]
  },
  {
    label: 'Digital Library',
    href: '#',
    children: [{ label: 'Open Data', href: '#' }]
  }
];

export const NavigationHeader = () => {
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
    if (href.startsWith('/ef')) {
      navigate(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'w-full fixed top-0 left-0 z-50 transition-all duration-300',
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
                href="/ef"
                onClick={(e) => handleNavClick('/ef', e)}
                className="flex items-center"
              >
                <img
                  src="https://www.ef.gov.sa/Style%20Library/assets/images/shared/EF-logo2.svg"
                  alt="Environment Fund Logo"
                  className="h-12 w-auto brightness-0 invert"
                />
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-6 text-white/90 text-sm">
              <a
                href="/ef"
                onClick={(e) => handleNavClick('/ef', e)}
                className="bg-[#2c3a82] hover:bg-[#3a499d] px-3 py-1.5 rounded-lg transition-colors"
              >
                Incentives and Grants Platform
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Join Us
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact us
              </a>
              <button
                className="p-1 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                className="flex items-center space-x-1 hover:text-white transition-colors"
                aria-label="Change Language"
              >
                <Globe size={18} />
                <span>العربية</span>
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-4 text-white">
              <button className="p-1" aria-label="Search">
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          <nav className="hidden lg:flex justify-end mt-1">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.label} className="relative group">
                  <button
                    className="text-white flex items-center space-x-1 py-4 text-base font-medium hover:text-white/80 transition-colors"
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
                    <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                  </button>

                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className="absolute right-0 mt-0 w-[500px] bg-white rounded-md shadow-2xl overflow-hidden z-50 p-8"
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
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
                      <ul className="mt-4 ml-4 space-y-3">
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
                  href="/ef"
                  onClick={(e) => handleNavClick('/ef', e)}
                  className="block text-white text-lg"
                >
                  Incentives and Grants Platform
                </a>
                <a href="#" className="block text-white text-lg">
                  Join Us
                </a>
                <a href="#" className="block text-white text-lg">
                  Contact us
                </a>
                <button className="flex items-center space-x-2 text-white text-lg">
                  <Globe size={20} />
                  <span>العربية</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
