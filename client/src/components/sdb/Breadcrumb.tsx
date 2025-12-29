import React from 'react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  className?: string;
};

// @component: Breadcrumb
export const Breadcrumb = ({
  items = [{
    label: 'الرئيسية',
    href: '#'
  }, {
    label: 'تمويل الأفراد',
    href: '#'
  }, {
    label: 'تمويل الأسرة'
  }],
  className = ''
}: BreadcrumbProps) => {
  // @return
  return <nav role="navigation" aria-label="Breadcrumb" className={`flex items-center gap-1 ${className}`} dir="rtl">
      {items.map((item, index) => <React.Fragment key={index}>
          <div className="flex items-center gap-1">
            {item.href ? <a href={item.href} className="text-sm text-[#384250] hover:text-[#384250]/80 transition-colors py-0.5 flex items-center" onClick={e => e.preventDefault()}>
                <span>{item.label}</span>
              </a> : <span className="text-sm text-[#9DA4AE]">{item.label}</span>}
          </div>
          {index < items.length - 1 && <span className="text-[#9DA4AE] flex items-center w-4 h-4 mx-1">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </span>}
        </React.Fragment>)}
    </nav>;
};







