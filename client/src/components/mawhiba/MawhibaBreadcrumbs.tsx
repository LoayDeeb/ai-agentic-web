import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
  isHome?: boolean;
};

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  className?: string;
};

// @component: MawhibaBreadcrumbs
export const MawhibaBreadcrumbs = ({
  items = [{
    label: 'الرئيسية',
    href: '#',
    isHome: true
  }, {
    label: 'الخدمات الإلكترونية',
    href: '#'
  }, {
    label: 'البرنامج الوطني للكشف عن الموهوبين',
    href: '#'
  }],
  className = ''
}: BreadcrumbsProps) => {
  // @return
  return <nav className={`w-full max-w-[1440px] flex flex-wrap items-center gap-1 px-4 py-12 md:px-40 md:py-12 ${className}`} aria-label="Breadcrumb" dir="rtl">
      {items.map((item, index) => <React.Fragment key={index}>
          {index > 0 && <ChevronLeft className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />}
          <a href={item.href || '#'} className={`flex items-center gap-1.5 text-sm leading-6 transition-colors duration-200 ${index === 0 ? 'text-[#2b254b] hover:text-[#2b254b]/80' : 'text-gray-500 hover:text-gray-700'}`} aria-label={item.label} onClick={e => e.preventDefault()}>
            {item.isHome && <Home className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />}
            <span>{item.label}</span>
          </a>
        </React.Fragment>)}
    </nav>;
};








