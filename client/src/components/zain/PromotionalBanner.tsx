import React from 'react';
import { motion } from 'framer-motion';

interface PromotionalBannerProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const PromotionalBanner = ({
  src = "https://www.jo.zain.com/arabic/HomePageSlider/Redmi%20note%2015.jpg",
  alt = "Zain Promotional Banner",
  onClick,
  href = "#",
  className = ""
}: PromotionalBannerProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto p-4 ${className}`}>
      <motion.a
        href={href}
        onClick={handleClick}
        className="block relative overflow-hidden rounded-[15px] shadow-sm transition-shadow duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
      >
        <div className="relative aspect-[16/6] md:aspect-[21/9] lg:aspect-[3/1] w-full bg-gray-100 overflow-hidden rounded-[15px]">
          <img
            loading="lazy"
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-[15px] select-none pointer-events-none"
            style={{
              WebkitTapHighlightColor: "rgba(255, 255, 255, 0)"
            }}
          />

          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-[15px]" />
        </div>
      </motion.a>
    </div>
  );
};
