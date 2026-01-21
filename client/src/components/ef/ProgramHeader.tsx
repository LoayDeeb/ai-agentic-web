import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface ProgramHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  onShare?: (platform: string) => void;
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Environment Fund', href: '/ef' },
  { label: 'Our Programs', href: '/ef', active: true }
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const ProgramHeader = ({
  title = 'Our Programs',
  breadcrumbs = defaultBreadcrumbs,
  backgroundImage = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560',
  onShare
}: ProgramHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (onShare) onShare('copy');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a1a14] min-h-[426px] flex flex-col items-center justify-center text-white">
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
            aria-label="Breadcrumb"
            className="mb-8"
          >
            <ol className="flex items-center space-x-2 text-sm md:text-base">
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
          className="absolute bottom-6 right-6 flex items-center space-x-4"
        >
          <span className="hidden sm:inline-block text-sm font-medium tracking-wider uppercase opacity-80">
            Share
          </span>

          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onShare?.('twitter');
              }}
              aria-label="Share on X (Twitter)"
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
              aria-label="Share on LinkedIn"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:bg-white hover:border-white hover:scale-110"
            >
              <Linkedin className="h-4 w-4 text-white group-hover:text-[#0077b5] fill-current group-hover:fill-current transition-colors" />
            </a>

            <div className="relative">
              <button
                onClick={handleCopyLink}
                aria-label="Copy link to clipboard"
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
                    initial={{ opacity: 0, y: 10, x: -50 }}
                    animate={{ opacity: 1, y: -45, x: -50 }}
                    exit={{ opacity: 0, y: 10, x: -50 }}
                    className="absolute left-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm"
                  >
                    Copied to Clipboard
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30" />
    </section>
  );
};
