import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
interface MenuItem {
  id: string;
  label: string;
}
const menuItems: MenuItem[] = [{
  id: '1',
  label: 'تأمين السيارات'
}, {
  id: '2',
  label: 'تأمين السفر'
}, {
  id: '3',
  label: 'تأمين الطبي'
}, {
  id: '4',
  label: 'تأمين المنزل'
}];

// @component: PersonalInsuranceMenu
export const PersonalInsuranceMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // @return
  return <div className="relative inline-block font-['IBM_Plex_Sans_Arabic',sans-serif]" dir="rtl">
      {/* Main Menu Button */}
      <button onClick={toggleMenu} className={cn("flex items-center justify-between min-w-[143px] px-5 py-4 bg-transparent cursor-pointer transition-colors duration-200 group focus:outline-none", isOpen ? "text-[#cd9e51]" : "text-[#111111]")} aria-expanded={isOpen}>
        <span className="text-base font-medium text-[#cd9e51] whitespace-nowrap">
          التأمين الشخصي
        </span>
        
        <div className="relative ml-2 w-4 h-4">
          <AnimatePresence mode="wait">
            {!isOpen ? <motion.div key="chevron" initial={{
            opacity: 0,
            rotate: -90
          }} animate={{
            opacity: 1,
            rotate: 0
          }} exit={{
            opacity: 0,
            rotate: 90
          }} transition={{
            duration: 0.2
          }}>
                <ChevronDown size={16} strokeWidth={3} className="text-[#cd9e51]" />
              </motion.div> : <motion.div key="close" initial={{
            opacity: 0,
            scale: 0.5
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.5
          }} transition={{
            duration: 0.2
          }}>
                <X size={16} strokeWidth={3} className="text-[#cd9e51]" />
              </motion.div>}
          </AnimatePresence>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} transition={{
        duration: 0.2,
        ease: "easeOut"
      }} className="absolute top-full right-0 mt-1 min-w-[200px] bg-white border border-[#f0f0f0] rounded-md shadow-lg z-50 overflow-hidden">
            <div className="py-2">
              {menuItems.map(item => <a key={item.id} href="#" onClick={e => e.preventDefault()} className="block px-6 py-3 text-sm text-[#111111] hover:bg-[#f9f9f9] hover:text-[#cd9e51] transition-colors duration-150 text-right no-underline">
                  {item.label}
                </a>)}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Backdrop for closing menu when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>;
};


