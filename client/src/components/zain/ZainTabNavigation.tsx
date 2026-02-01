import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { onToolEvent } from '../../features/agent/tools';

interface TabItem {
  id: string;
  label: string;
  href: string;
}

const TABS: TabItem[] = [
  { id: 'zainfiber', label: 'زين فايبر', href: '#' },
  { id: 'zainfttr', label: 'فايبر لكل غرفة', href: '#' },
  { id: 'homebroadband', label: 'الإنترنت المنزلي', href: '#' },
  { id: 'smartwifi', label: 'الواي فاي الذكي', href: '#' }
];

interface ZainTabNavigationProps {
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export const ZainTabNavigation = ({ 
  activeTabId: externalActiveTab,
  onTabChange 
}: ZainTabNavigationProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(TABS[0].id);
  
  const activeTab = externalActiveTab ?? internalActiveTab;

  // Listen for agent tool events
  React.useEffect(() => {
    return onToolEvent((tool, args) => {
      if (tool === 'switchFiberTab' && args.tabId) {
        setInternalActiveTab(args.tabId);
        onTabChange?.(args.tabId);
      }
    });
  }, [onTabChange]);

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(tabId);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % TABS.length;
      handleTabClick(TABS[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + TABS.length) % TABS.length;
      handleTabClick(TABS[prevIndex].id);
    }
  };

  return (
    <nav 
      className="w-full bg-white border-b border-gray-100 py-2 px-4 select-none" 
      dir="rtl" 
      aria-label="Internet Service Tabs"
    >
      <ul 
        className="flex flex-wrap items-center justify-start gap-y-4 list-none p-0 m-0" 
        role="tablist"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id} role="presentation" className="relative flex flex-col items-end">
              <a
                href={tab.href}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(tab.id);
                }}
                onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
                className={cn(
                  "block px-6 py-2 text-[16px] transition-colors duration-200 outline-none",
                  isActive
                    ? "text-[#0070C9] font-bold"
                    : "text-[#11120E] font-normal hover:text-[#0070C9]/70"
                )}
              >
                {tab.label}
              </a>

              {/* Active Indicator Bar */}
              <div className="h-1 w-full px-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      layoutId="activeTabUnderline"
                      className="block h-1 w-6 bg-[#0070C9] rounded-full float-right"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Hidden Panels for ARIA compliance */}
      <div className="sr-only">
        {TABS.map((tab) => (
          <div
            key={`panel-${tab.id}`}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
          >
            {tab.label} Panel Content
          </div>
        ))}
      </div>
    </nav>
  );
};
