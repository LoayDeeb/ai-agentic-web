import React from 'react';
import { motion } from 'framer-motion';

interface ArabicHeroHeadingProps {
  mainTitle?: string;
  subTitle?: string;
  className?: string;
}

/**
 * ArabicHeroHeading component
 * Renders a centered, elegantly styled Arabic heading with motion effects.
 * Designed to match the provided reference styling exactly.
 */

// @component: ArabicHeroHeading
export const ArabicHeroHeading = ({
  mainTitle = "نحن الضماد و الخطة البديلة",
  subTitle = "نحن نغطيك",
  className = ""
}: ArabicHeroHeadingProps) => {
  // Animation variants for the container to orchestrate children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  // Animation variants for individual text elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  // @return
  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center ${className}`}
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="space-y-2">
        <motion.h2
          className="text-[#1a1a1a] dark:text-white"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: '31px',
            lineHeight: '1.2',
            fontWeight: 300
          }}
          variants={itemVariants}
        >
          <strong
            className="block mb-2"
            style={{ fontWeight: 500, fontStyle: 'normal' }}
          >
            {mainTitle}
          </strong>
          <span className="block opacity-90">{subTitle}</span>
        </motion.h2>

        {/* Decorative element inspired by "Band-Aid/Plan B" theme - subtle underline */}
        <motion.div
          className="mt-6 h-0.5 w-16 bg-blue-500/30 rounded-full mx-auto"
          variants={itemVariants}
        />
      </header>

      {/* Visual enhancement for "protection/coverage" theme */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;500&display=swap');
      `
        }}
      />
    </motion.div>
  );
};

