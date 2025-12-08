import React from 'react';
import { Star, Phone, Globe } from 'lucide-react';

type NavbarLink = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  target?: string;
};

type NavbarTopLinksProps = {
  links?: NavbarLink[];
  direction?: 'ltr' | 'rtl';
  className?: string;
};

const defaultLinks: NavbarLink[] = [{
  id: 'survey',
  label: 'تقييمك يهمنا',
  icon: <Star className="w-4 h-4" />,
  href: '',
  target: '_blank'
}, {
  id: 'contact',
  label: 'تواصل معنا',
  icon: <Phone className="w-4 h-4" />,
  href: ''
}, {
  id: 'language',
  label: 'English',
  icon: <Globe className="w-4 h-4" />,
  href: ''
}];

// @component: NavbarTopLinks
export const NavbarTopLinks = ({
  links = defaultLinks,
  direction = 'rtl',
  className = ''
}: NavbarTopLinksProps) => {
  // @return
  return <nav className={`w-full ${className}`} dir={direction}>
      <ul className="flex flex-wrap items-center justify-end gap-4 list-none p-0 m-0" role="list">
        {links.map((link, index) => <li key={link.id || index} className="min-w-fit">
            <a href={link.href || '#'} target={link.target} onClick={e => {
          if (!link.href || link.href === '' || link.href === '#') {
            e.preventDefault();
          }
        }} className="flex items-center justify-center gap-2 min-w-max text-[#2b254b] hover:text-[#1a1730] text-sm font-normal leading-6 rounded transition-all duration-200 ease-in-out cursor-pointer no-underline" style={{
          fontFamily: 'Alexandria, sans-serif'
        }}>
              <span className="flex-shrink-0 transition-all duration-200 ease-in-out">
                {link.icon}
              </span>
              <span className="transition-all duration-200 ease-in-out">
                {link.label}
              </span>
            </a>
          </li>)}
      </ul>
    </nav>;
};



