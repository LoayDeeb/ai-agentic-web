import React from 'react';
import { Link } from 'react-router-dom';

interface ZainLogoProps {
  href?: string;
  className?: string;
}

export const ZainLogo = ({ href = '/zain', className = '' }: ZainLogoProps) => {
  return (
    <Link to={href} className={`inline-block ${className}`}>
      <img
        src="https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/zain_logo.png"
        alt="Zain Jordan"
        className="h-10 md:h-12 w-auto object-contain"
      />
    </Link>
  );
};
