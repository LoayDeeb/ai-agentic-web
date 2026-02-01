import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

type CountryLink = {
  name: string;
  url: string;
  flagUrl: string;
};

const countries: CountryLink[] = [
  {
    name: 'البحرين',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/426.png'
  },
  {
    name: 'العراق',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/418.png'
  },
  {
    name: 'لبنان',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/415.png'
  },
  {
    name: 'الكويت',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/419.png'
  },
  {
    name: 'المغرب',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/604.png'
  },
  {
    name: 'السعودية',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/420.png'
  },
  {
    name: 'السودان',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/634.png'
  },
  {
    name: 'جنوب السودان',
    url: '#',
    flagUrl: 'https://www.jo.zain.com/Style%20Library/en-us/Images/assets/images/flags/659.png'
  }
];

interface ZainHeaderNavProps {
  activeTab?: 'personal' | 'business';
  onTabChange?: (tab: 'personal' | 'business') => void;
}

export const ZainHeaderNav = ({ 
  activeTab: externalActiveTab, 
  onTabChange 
}: ZainHeaderNavProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState<'personal' | 'business'>('personal');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTab = externalActiveTab ?? internalActiveTab;

  const handleTabChange = (tab: 'personal' | 'business') => {
    setInternalActiveTab(tab);
    onTabChange?.(tab);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav 
      className="w-full bg-white border-b border-black/10 h-12 flex items-center justify-center font-sans" 
      dir="rtl"
    >
      <div className="max-w-[1170px] w-full px-4 flex justify-between items-stretch h-full">
        {/* Right side (Personal/Business) */}
        <div className="flex items-stretch">
          <button
            onClick={() => handleTabChange('personal')}
            className={cn(
              "px-4 py-2 text-sm md:text-base transition-colors flex items-center",
              activeTab === 'personal'
                ? "bg-[#54b8e9] text-white"
                : "bg-transparent text-black hover:bg-gray-50"
            )}
          >
            زين شخصي
          </button>
          <button
            onClick={() => handleTabChange('business')}
            className={cn(
              "px-4 py-2 text-sm md:text-base transition-colors flex items-center mr-0.5",
              activeTab === 'business'
                ? "bg-[#54b8e9] text-white"
                : "bg-transparent text-black hover:bg-gray-50"
            )}
          >
            زين أعمال
          </button>
        </div>

        {/* Left side (Tools/Region) */}
        <div className="flex items-center space-x-reverse space-x-1">
          {/* Language Switcher */}
          <button className="px-3 h-full flex items-center text-sm md:text-base text-black hover:bg-gray-50 transition-colors">
            <span className="ml-1">English</span>
          </button>

          {/* Region Dropdown */}
          <div className="relative h-full" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 h-full flex items-center text-sm md:text-base text-black hover:bg-gray-50 transition-colors"
            >
              <span>الأردن</span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 mr-1 transition-transform",
                  isDropdownOpen && "rotate-180"
                )} 
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full bg-white shadow-2xl border border-black/10 z-50 min-w-[160px] py-1"
                >
                  {countries.map((country) => (
                    <li key={country.name} className="block">
                      <a
                        href={country.url}
                        className="flex items-center px-4 py-2.5 text-sm text-[#333] hover:bg-gray-100 transition-colors whitespace-nowrap"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(false);
                        }}
                      >
                        <img
                          src={country.flagUrl}
                          alt={country.name}
                          className="w-5 h-5 rounded-full ml-2 object-cover border border-gray-100"
                        />
                        {country.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Locator */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="px-3 h-full flex items-center text-sm md:text-base text-black hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 ml-1" />
            <span>زورنا</span>
          </a>

          {/* Sign Language Tool */}
          <button className="hidden md:flex px-3 h-full items-center text-sm md:text-base text-black hover:bg-gray-50 transition-colors">
            <Languages className="w-3.5 h-3.5 ml-1" />
            <span>لغة الصم</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
