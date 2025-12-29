import React from 'react';
import { motion } from 'framer-motion';

type RTLActionButtonProps = {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

// @component: RTLActionButton
export const RTLActionButton = ({
  text = 'ﻟﺈﻧﺸﺎء ﺣﺴﺎب إﻟﻜﺘﺮوﻧﻲ',
  onClick,
  disabled = false,
  loading = false,
  variant = 'outline',
  size = 'md',
  className = ''
}: RTLActionButtonProps) => {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-900',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
    outline: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  // @return
  return <motion.button type="button" onClick={handleClick} disabled={disabled || loading} dir="rtl" className={`
        inline-flex items-center justify-center
        font-medium transition-all duration-200 ease-in-out
        rounded cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')} whileHover={!disabled && !loading ? {
    scale: 1.02
  } : {}} whileTap={!disabled && !loading ? {
    scale: 0.98
  } : {}} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      {loading ? <motion.div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" animate={{
      rotate: 360
    }} transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }} /> : <span className="font-medium leading-6">{text}</span>}
    </motion.button>;
};







