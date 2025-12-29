import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  id: string;
  image: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

type BannerCarouselProps = {
  slides?: Slide[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  rtl?: boolean;
};

const defaultSlides: Slide[] = [{
  id: '1',
  image: 'https://www.sdb.gov.sa/sdb/media/sdb/entrepreneurship%20a%20modern%20business%20practices%20forum/devgo-ar.png',
  title: '',
  description: '',
  buttonText: 'سجل حضورك',
  buttonLink: '#'
}, {
  id: '2',
  image: 'https://www.sdb.gov.sa/sdb/media/sdb/gdp/desktop_web-banner-copy.jpg',
  title: '',
  description: '',
  buttonText: 'تقدم الآن',
  buttonLink: '#'
}, {
  id: '3',
  image: 'https://www.sdb.gov.sa/sdb/media/sdb/gdp/freewebar.jpg',
  title: '',
  description: '',
  buttonText: 'قدم وكمل خطوتك',
  buttonLink: '#'
}, {
  id: '4',
  image: 'https://www.sdb.gov.sa/sdb/media/sdb/gdp/banner-cx.jpg',
  title: 'لأنك شريكنا',
  description: 'ساعدنا في التحسين عبر تقييم الخدمة/المنتج الذي حصلت عليه',
  buttonText: 'شاركنا رأيك',
  buttonLink: '#'
}];

// @component: BannerCarousel
export const BannerCarousel = ({
  slides = defaultSlides,
  autoplay = true,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  rtl = true
}: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
  }, [slides.length]);

  useEffect(() => {
    if (!autoplay || isHovered) return;
    const interval = setInterval(() => {
      goToNext();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isHovered, goToNext]);

  // @return
  return <div className="relative w-full max-w-[1486px] mx-auto px-[60px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} dir={rtl ? 'rtl' : 'ltr'}>
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.5
        }} className="relative w-full">
            <div className="relative w-full h-[539px]">
              <img src={slides[currentIndex].image} alt={slides[currentIndex].title || ''} className="w-full h-full object-cover brightness-[0.8]" />
              
              <div className="absolute inset-0 z-10 flex flex-col justify-center gap-5 px-[60px]">
                {slides[currentIndex].title && <h1 className="text-[36px] leading-[44px] font-bold text-white max-w-[1200px]">
                    {slides[currentIndex].title}
                  </h1>}
                
                {slides[currentIndex].description && <p className="text-base leading-6 font-bold text-white max-w-[1200px]">
                    {slides[currentIndex].description}
                  </p>}
                
                {slides[currentIndex].buttonText && <button type="button" className="flex items-center justify-center gap-1 h-10 px-4 text-base font-medium text-white bg-white/20 rounded hover:bg-white/30 transition-all duration-200 w-fit" onClick={e => {
                e.preventDefault();
                if (slides[currentIndex].buttonLink) {
                  console.log('Navigate to:', slides[currentIndex].buttonLink);
                }
              }}>
                    <span>{slides[currentIndex].buttonText}</span>
                  </button>}
                {showDots && <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-[10px]">
                    {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-[15px] h-[15px] rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-[rgb(27,131,84)]' : 'bg-[rgb(210,214,219)] hover:bg-[rgb(180,184,189)]'}`} aria-label={`Go to slide ${index + 1}`} />)}
                  </div>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {showArrows && <>
            <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm" aria-label="Previous slide">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm" aria-label="Next slide">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>}
      </div>
    </div>;
};







