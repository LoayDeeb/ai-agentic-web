import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface PackageSectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  dir?: 'rtl' | 'ltr';
}

export const PackageSectionHeader = ({
  title = "سرعات متعددة لجميع احتياجاتك",
  subtitle,
  className,
  dir = 'rtl'
}: PackageSectionHeaderProps) => {
  return (
    <header
      dir={dir}
      className={cn(
        "w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col gap-2",
        dir === 'rtl' ? 'text-right' : 'text-left',
        className
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Zain:wght@400;700&display=swap');
            .font-zain { font-family: 'Zain', sans-serif; }
          `
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {subtitle && (
          <span className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-2 block">
            {subtitle}
          </span>
        )}

        <h2
          className={cn(
            "font-zain font-bold text-[#11120e]",
            "text-3xl md:text-4xl lg:text-5xl leading-[1.1]",
            "pt-10 pb-8 m-0 w-full"
          )}
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 40px)',
            lineHeight: 'clamp(32px, 6vw, 44px)'
          }}
        >
          {title}
        </h2>

        <div
          className={cn(
            "h-1 w-20 bg-[#37ace5]/30 rounded-full",
            dir === 'rtl' ? "mr-0" : "ml-0"
          )}
        />
      </motion.div>
    </header>
  );
};
