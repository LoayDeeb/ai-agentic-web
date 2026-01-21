import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface ProgramHeaderArProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  onShare?: (platform: string) => void;
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: 'صندوق البيئة', href: '/ef-ar' },
  { label: 'برامجنا', href: '/ef-ar', active: true }
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const ProgramHeaderAr = ({
  title = 'برامجنا',
  breadcrumbs = defaultBreadcrumbs,
  backgroundImage = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560',
  onShare
}: ProgramHeaderArProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (onShare) onShare('copy');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#0a1a14] min-h-[426px] flex flex-col items-center justify-center text-white"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1350px]">
        <div className="flex flex-col items-center justify-center pt-24 pb-16">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="التنقل التفصيلي"
            className="mb-8"
          >
            <ol className="flex items-center space-x-reverse space-x-2 text-sm md:text-base">
              {breadcrumbs.map((item, index) => (
                <li key={item.label} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-white/40 select-none">/</span>}
                  <a
                    href={item.href}
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                      'transition-colors duration-200 hover:text-white/80',
                      item.active ? 'text-white/50 pointer-events-none' : 'text-white'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight leading-tight md:leading-normal"
          >
            {title}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-6 left-6 flex items-center space-x-reverse space-x-4"
        >
          <span className="hidden sm:inline-block text-sm font-medium tracking-wider uppercase opacity-80">
            مشاركة
          </span>

          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onShare?.('twitter');
              }}
              aria-label="مشاركة على X (تويتر)"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
            >
              <XIcon className="h-4 w-4 text-white group-hover:text-black transition-colors" />
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onShare?.('linkedin');
              }}
              aria-label="مشاركة على لينكد إن"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
            >
              <Linkedin className="h-4 w-4 text-white group-hover:text-[#0077b5] fill-current group-hover:fill-current transition-colors" />
            </a>

            <div className="relative">
              <button
                onClick={handleCopyLink}
                aria-label="نسخ الرابط"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="link"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <LinkIcon className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: 50 }}
                    animate={{ opacity: 1, y: -45, x: 50 }}
                    exit={{ opacity: 0, y: 10, x: 50 }}
                    className="absolute right-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm"
                  >
                    تم النسخ
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-white/20 to-transparent opacity-30" />
    </section>
  );
};
