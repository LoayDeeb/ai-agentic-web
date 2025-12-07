import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Search, ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

type MenuItem = {
  label: string;
  href: string;
  items?: MenuItem[];
};
type ZATCAHeaderProps = {
  className?: string;
};
const menuData: MenuItem[] = [{
  label: 'About Us',
  href: '#',
  items: [{
    label: 'Who We Are',
    href: '#'
  }, {
    label: 'Organizational Structure',
    href: '#'
  }, {
    label: 'Statute of ZATCA',
    href: '#'
  }, {
    label: "The Governor's Message",
    href: '#'
  }, {
    label: 'Board Members',
    href: '#'
  }, {
    label: 'Members of the Sharia Committee',
    href: '#'
  }, {
    label: 'ZATCA Leadership',
    href: '#'
  }, {
    label: 'Advisory Committee',
    href: '#'
  }, {
    label: 'Our Partners',
    href: '#'
  }, {
    label: 'Policies, Strategies, and Obligations for Providing Services',
    href: '#'
  }, {
    label: 'Procurement and Tenders',
    href: '#'
  }, {
    label: 'Sustainable Development Goals',
    href: '#'
  }, {
    label: 'E-Participation',
    href: '#'
  }, {
    label: 'Open Data',
    href: '#'
  }, {
    label: 'ZATCA Statistics',
    href: '#'
  }, {
    label: 'Fresh Graduates Program',
    href: '#'
  }, {
    label: 'Work with Us',
    href: '#'
  }, {
    label: 'Contact Us',
    href: '#'
  }]
}, {
  label: 'E-Services',
  href: '#',
  items: [{
    label: 'Zakat, Tax and Customs Services',
    href: '#'
  }, {
    label: 'Zakaty Platform',
    href: '#'
  }, {
    label: 'E-Auctions',
    href: '#'
  }]
}, {
  label: 'Rules and Regulations',
  href: '#',
  items: [{
    label: 'Zakat, Tax and Customs Regulations',
    href: '#'
  }, {
    label: 'Tax and Customs Agreements',
    href: '#'
  }, {
    label: 'Exchange of Information Agreements',
    href: '#'
  }]
}, {
  label: 'Media Center',
  href: '#',
  items: [{
    label: 'News',
    href: '#'
  }, {
    label: 'Announcements',
    href: '#'
  }, {
    label: 'Publications',
    href: '#'
  }, {
    label: 'Magazine',
    href: '#'
  }, {
    label: 'Events and Workshops',
    href: '#'
  }, {
    label: 'ZATCA Brand Identity',
    href: '#'
  }, {
    label: 'Workshop Request',
    href: '#'
  }, {
    label: 'Newsletters',
    href: '#'
  }]
}, {
  label: 'Knowledge Center',
  href: '#',
  items: [{
    label: 'Guidelines',
    href: '#'
  }, {
    label: 'E-Services Guideline',
    href: '#'
  }, {
    label: 'Customer Journey',
    href: '#'
  }, {
    label: 'FAQs',
    href: '#'
  }, {
    label: 'ZATCA Academy',
    href: '#'
  }, {
    label: 'Market Regulations',
    href: '#'
  }, {
    label: 'Awareness Toolkit',
    href: '#'
  }, {
    label: 'Zakat, Tax and Customs Glossary',
    href: '#'
  }, {
    label: "AS'HMT Platform",
    href: '#'
  }, {
    label: 'Saudi Authorized Economic Operator (AEO)',
    href: '#'
  }]
}];

// @component: ZATCAHeader
export const ZATCAHeader = ({
  className = ''
}: ZATCAHeaderProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<number | null>(null);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileActiveDropdown(null);
  };
  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const toggleMobileDropdown = (index: number) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
  };

  // @return
  return <nav className={`w-full bg-white border-b border-gray-200 ${className}`}>
      <div className="container-fluid px-8 mx-0">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex-shrink-0">
            <img src="https://zatca.gov.sa/_layouts/15/zatca/Design/images/ZATCA-logo.svg" alt="ZATCA Logo" className="h-12" />
          </a>

          <button type="button" className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center flex-1 ml-4">
            <ul className="flex items-center space-x-1 mx-4">
              {menuData.map((item, index) => <li key={index} className="relative" onMouseEnter={() => setActiveDropdown(index)} onMouseLeave={() => setActiveDropdown(null)}>
                  <a href={item.href} className="flex items-center gap-1 px-4 py-2 text-base font-medium text-gray-900 hover:text-green-700 transition-colors rounded min-h-[72px]">
                    {t(item.label)}
                    {item.items && <ChevronDown size={16} />}
                  </a>

                  {item.items && activeDropdown === index && <div className="absolute left-0 right-0 top-full mt-2 w-screen max-w-7xl bg-white border-t border-gray-200 shadow-lg rounded-b z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-8">
                        <div className="grid grid-cols-3 gap-4">
                          {item.items.map((subItem, subIndex) => <a key={subIndex} href={subItem.href} className="block px-4 py-2 text-base text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded transition-colors">
                              {t(subItem.label)}
                            </a>)}
                        </div>
                      </div>
                    </div>}
                </li>)}
            </ul>

            <div className="flex items-center gap-2 ml-auto">
              <button type="button" className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-900 hover:text-green-700 transition-colors rounded min-h-[72px]" aria-label="Search">
                <Search size={20} />
                {t('Search')}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{user?.username}</span>
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-900 hover:text-red-600 transition-colors rounded min-h-[72px]"
                  >
                    <LogOut size={20} />
                    {t('Logout')}
                  </button>
                </div>
              ) : (
                <a href="/login" className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-900 hover:text-green-700 transition-colors rounded min-h-[72px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  {t('Login')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="p-4">
            <ul className="space-y-2">
              {menuData.map((item, index) => <li key={index} className="border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <a href={item.href} className="flex-1 py-3 text-base font-medium text-gray-900 hover:text-green-700">
                      {t(item.label)}
                    </a>
                    {item.items && <button type="button" onClick={() => toggleMobileDropdown(index)} className="p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors" aria-label={`Toggle ${item.label} menu`}>
                        <ChevronDown size={20} className={`transform transition-transform ${mobileActiveDropdown === index ? 'rotate-180' : ''}`} />
                      </button>}
                  </div>

                  {item.items && mobileActiveDropdown === index && <ul className="pl-4 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {item.items.map((subItem, subIndex) => <li key={subIndex}>
                          <a href={subItem.href} className="block py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded px-2">
                            {t(subItem.label)}
                          </a>
                        </li>)}
                    </ul>}
                </li>)}
            </ul>

            <div className="mt-6 space-y-2 pt-4 border-t border-gray-200">
              <button type="button" className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-900 hover:text-green-700 hover:bg-gray-50 rounded transition-colors">
                <Search size={20} />
                Search
              </button>

              <a href="#" className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-900 hover:text-green-700 hover:bg-gray-50 rounded transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </a>
            </div>
          </div>
        </div>}
    </nav>;
};


