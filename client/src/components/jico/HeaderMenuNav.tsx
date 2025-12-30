import React from 'react';
import { cn } from '../../lib/utils';

/**
 * HeaderMenuNav Component
 * 
 * A clean, responsive header navigation component based on the provided design.
 * Features a language switcher, contact link, and a prominent login button.
 * Designed to work within a header or as a standalone top-level menu.
 */

interface NavItemProps {
  label: string;
  href?: string;
  variant?: 'outline-white' | 'outline-blue' | 'solid-gray';
  onClick?: () => void;
}
const NavItem = ({
  label,
  href = "#",
  variant = "outline-blue",
  onClick
}: NavItemProps) => {
  // Styles based on the extracted CSS
  const baseStyles = "cursor-pointer block uppercase text-[14px] leading-[37px] font-medium mt-[31px] rounded-[4px] px-[15px] transition-all duration-200 border-[0.6px]";
  const variants = {
    'outline-white': "text-[#5eb2e0] border-white hover:bg-white/10",
    'outline-blue': "text-[#5eb2e0] border-[#5eb2e0] hover:bg-[#5eb2e0]/10",
    'solid-gray': "text-white bg-[#606060] border-[#606060] hover:bg-[#4d4d4d]"
  };
  return <li className="list-none float-right p-0 m-0 last:mr-0 ml-3 first:ml-0">
      <a href={href} onClick={e => {
      e.preventDefault();
      if (onClick) onClick();
    }} className={cn(baseStyles, variants[variant])}>
        {label}
      </a>
    </li>;
};

// @component: HeaderMenuNav
export const HeaderMenuNav = () => {
  // @return
  return <nav className="w-full flex justify-end px-4 py-2 bg-transparent">
      <ul id="menu-header-top-right-menu" className="flex flex-row-reverse items-center p-0 m-0 w-auto">
        {/* The design uses float:right and specific margins to order them right-to-left */}
        {/* We use flex-row-reverse to maintain the visual order from the design: 
            [تسجيل الدخول] [تواصل معنا] [English] 
         */}
        
        {/* Login Button */}
        <NavItem label="تسجيل الدخول" variant="solid-gray" href="#" />

        {/* Contact Us Link */}
        <NavItem label="تواصل معنا" variant="outline-blue" href="#" />

        {/* English Language Toggle */}
        <NavItem label="English" variant="outline-white" href="#" />
      </ul>
    </nav>;
};


