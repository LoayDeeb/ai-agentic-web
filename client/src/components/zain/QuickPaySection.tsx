import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Wifi, Zap, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickPaySectionProps {
  className?: string;
  onPaySubmit?: (value: string) => void;
  placeholder?: string;
  title?: string;
  buttonText?: string;
}

export const QuickPaySection = ({
  className,
  onPaySubmit,
  placeholder = "أدخل رقم اشتراك الموبايل أو الإنترنت أو الفايبر",
  title = "الدفع السريع",
  buttonText = "ادفع/أعد الشحن الآن"
}: QuickPaySectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPaySubmit) {
      onPaySubmit(inputValue);
    }
  };

  return (
    <section 
      dir="rtl" 
      className={cn("w-full max-w-6xl mx-auto px-4 py-8 md:py-12", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#f9fafb] rounded-[20px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-gray-100 shadow-sm"
      >
        <div className="flex-shrink-0 text-center md:text-right">
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#333333] leading-tight font-sans">
            {title}
          </h2>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col md:flex-row flex-grow w-full gap-4 md:gap-4 items-center"
        >
          <div className="relative flex-grow w-full group">
            <div 
              className={cn(
                "absolute inset-y-0 right-4 flex items-center pointer-events-none transition-colors duration-200",
                isFocused ? "text-[#37ace5]" : "text-gray-400"
              )}
            >
              <Smartphone size={18} className="md:w-5 md:h-5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={cn(
                "w-full h-[50px] md:h-[60px] pr-12 pl-4 py-3 bg-white border-0 rounded-[10px] text-base md:text-lg text-[#333333] transition-all duration-300 outline-none",
                "shadow-[0_0_14px_0_rgba(0,0,0,0.05)] focus:shadow-[0_0_20px_0_rgba(55,172,229,0.15)] focus:ring-1 focus:ring-[#37ace5]/30",
                "placeholder:text-gray-400 placeholder:text-sm md:placeholder:text-base font-sans"
              )}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={cn(
              "whitespace-nowrap h-[50px] md:h-[60px] px-8 md:px-10 rounded-full bg-[#37ace5] text-white font-bold text-base md:text-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(55,172,229,0.3)]",
              "hover:bg-[#20a2e2] hover:shadow-[0_6px_20px_0_rgba(55,172,229,0.4)]",
              "flex items-center justify-center gap-2 font-sans w-full md:w-auto min-w-[200px]"
            )}
          >
            <Zap size={18} className="fill-current" />
            {buttonText}
          </motion.button>
        </form>
      </motion.div>

      {/* Feature Icons */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
        {[
          { icon: CreditCard, label: "دفع آمن" },
          { icon: Wifi, label: "إنترنت فايبر" },
          { icon: Smartphone, label: "شحن رصيد" },
          { icon: Search, label: "استعلام" }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center gap-2 text-sm text-gray-500 font-sans"
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
