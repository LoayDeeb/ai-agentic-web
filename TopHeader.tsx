import React, { useState } from 'react';
import { Phone, Globe, Smartphone, Mic, MinusCircle, PlusCircle, Contrast } from 'lucide-react';
type TopHeaderBarProps = {
  onContactClick?: () => void;
  onLanguageSwitch?: () => void;
  onAppsClick?: () => void;
  onVoiceClick?: () => void;
  onFontDecrease?: () => void;
  onFontIncrease?: () => void;
  onContrastToggle?: () => void;
};

// @component: TopHeaderBar
export const TopHeaderBar = (props: TopHeaderBarProps) => {
  const [isHoveringContact, setIsHoveringContact] = useState(false);
  const [isHoveringLanguage, setIsHoveringLanguage] = useState(false);
  const [isHoveringApps, setIsHoveringApps] = useState(false);
  const [isHoveringVoice, setIsHoveringVoice] = useState(false);
  const [isHoveringFontMinus, setIsHoveringFontMinus] = useState(false);
  const [isHoveringFontPlus, setIsHoveringFontPlus] = useState(false);
  const [isHoveringContrast, setIsHoveringContrast] = useState(false);
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onContactClick?.();
  };
  const handleLanguageClick = () => {
    props.onLanguageSwitch?.();
  };
  const handleAppsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAppsClick?.();
  };
  const handleVoiceClick = () => {
    props.onVoiceClick?.();
  };
  const handleFontDecrease = () => {
    props.onFontDecrease?.();
  };
  const handleFontIncrease = () => {
    props.onFontIncrease?.();
  };
  const handleContrastToggle = () => {
    props.onContrastToggle?.();
  };

  // @return
  return <div className="flex flex-wrap items-center gap-4 w-full px-4 py-3 bg-white">
      <a href="#" onClick={handleContactClick} className="flex items-center gap-1 text-[#384250] hover:text-[#2c3844] transition-colors" onMouseEnter={() => setIsHoveringContact(true)} onMouseLeave={() => setIsHoveringContact(false)}>
        <Phone className="w-5 h-5" strokeWidth={1.5} />
        <span className="hidden md:block text-base font-normal leading-6">
          Contact Us
        </span>
      </a>

      <div className="lang-switch">
        <button type="button" onClick={handleLanguageClick} onMouseEnter={() => setIsHoveringLanguage(true)} onMouseLeave={() => setIsHoveringLanguage(false)} className="flex items-center gap-1 px-0 min-h-[40px] text-[#161616] font-medium text-base leading-6 bg-transparent border border-transparent rounded hover:bg-gray-50 transition-colors">
          <Globe className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
          <span className="hidden md:block text-[#384250] text-base font-normal leading-6">
            عربي
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <a href="#" onClick={handleAppsClick} onMouseEnter={() => setIsHoveringApps(true)} onMouseLeave={() => setIsHoveringApps(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors" title="Zatca Mobile Apps">
          <Smartphone className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
        </a>

        <button type="button" onClick={handleVoiceClick} onMouseEnter={() => setIsHoveringVoice(true)} onMouseLeave={() => setIsHoveringVoice(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors bg-transparent border-0 cursor-pointer" title="Voice Commands">
          <Mic className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
        </button>

        <button type="button" onClick={handleFontDecrease} onMouseEnter={() => setIsHoveringFontMinus(true)} onMouseLeave={() => setIsHoveringFontMinus(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors bg-transparent border-0 cursor-pointer" title="Decrease font">
          <MinusCircle className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
        </button>

        <button type="button" onClick={handleFontIncrease} onMouseEnter={() => setIsHoveringFontPlus(true)} onMouseLeave={() => setIsHoveringFontPlus(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors bg-transparent border-0 cursor-pointer" title="Increase font">
          <PlusCircle className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
        </button>

        <button type="button" onClick={handleContrastToggle} onMouseEnter={() => setIsHoveringContrast(true)} onMouseLeave={() => setIsHoveringContrast(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors bg-transparent border-0 cursor-pointer" title="Grayscale mode">
          <Contrast className="w-5 h-5 text-[#384250]" strokeWidth={1.5} />
        </button>
      </div>
    </div>;
};