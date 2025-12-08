import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselNavigationProps = {
  totalSlides?: number;
  initialSlide?: number;
  onSlideChange?: (slideIndex: number) => void;
};

// @component: CarouselNavigation
export const CarouselNavigation = ({
  totalSlides = 5,
  initialSlide = 0,
  onSlideChange
}: CarouselNavigationProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const handlePrevious = () => {
    const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    setCurrentSlide(newSlide);
    onSlideChange?.(newSlide);
  };

  const handleNext = () => {
    const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(newSlide);
    onSlideChange?.(newSlide);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
  };

  // @return
  return <div className="flex items-center justify-between w-full gap-5 px-4 py-5">
      <div className="flex gap-2.5">
        {Array.from({
        length: totalSlides
      }).map((_, index) => <button key={index} onClick={() => handleDotClick(index)} className={`w-[15px] h-[15px] rounded-full transition-colors ${index === currentSlide ? 'bg-[#1B8354]' : 'bg-gray-300'}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>

      <div className="flex gap-1.5">
        <button type="button" onClick={handlePrevious} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors" aria-label="Previous slide">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        <button type="button" onClick={handleNext} className="w-8 h-8 flex items-center justify-center bg-[#1B8354] hover:bg-[#156b44] rounded transition-colors" aria-label="Next slide">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>;
};


