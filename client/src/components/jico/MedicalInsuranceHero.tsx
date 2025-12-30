import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MedicalInsuranceHeroProps {
  /**
   * Primary title text (Arabic by default)
   */
  title?: string;
  /**
   * Subtitle text (Arabic by default)
   */
  subtitle?: string;
  /**
   * Optional custom className for the container
   */
  className?: string;
  /**
   * Whether to animate the component on mount
   */
  animate?: boolean;
}

/**
 * A reusable, responsive medical insurance hero heading component
 * Specifically designed for Arabic text but supports LTR with props.
 */
// @component: MedicalInsuranceHero
export const MedicalInsuranceHero = ({
  title = "شريكك الموثوق للتأمين الطبي",
  subtitle = "يبقيك في منتهى اللياقة وبصحة ممتازة",
  className = "",
  animate = true
}: MedicalInsuranceHeroProps) => {
  // Animation variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.5, 0, 0, 1],
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.5, 0, 0, 1]
      }
    }
  };

  // @return
  return (
    <motion.section
      className={cn(
        "w-full py-12 px-4 flex flex-col items-center justify-center text-center select-none",
        "rtl", // Explicitly set RTL for Arabic context
        className
      )}
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className={cn(
            "text-[#1a1a1a] dark:text-white leading-tight mb-4",
            "text-2xl md:text-3xl lg:text-4xl",
            "font-light"
          )}
          style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
        >
          <strong
            className="block font-medium mb-1"
            style={{ fontWeight: 500 }}
          >
            {title}
          </strong>
          <span className="block opacity-90">{subtitle}</span>
        </motion.h2>

        {/* Decorative element to mirror the premium feel of medical sites */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-1 bg-blue-500/20 rounded-full mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
      </div>

      {/* Embedded font styles specifically for Arabic clarity if not already globally loaded */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap');
        
        .rtl {
          direction: rtl;
        }
      `
        }}
      />
    </motion.section>
  );
};


