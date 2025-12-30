import React, { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  ariaLabel?: string;
};

type ProductDetailsTabsProps = {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
};

const defaultTabs: Tab[] = [{
  id: 'product',
  label: 'تعرف على المنتج',
  ariaLabel: 'تعرف على المنتج'
}, {
  id: 'terms',
  label: 'الشروط',
  ariaLabel: 'الشروط'
}, {
  id: 'requirements',
  label: 'المتطلبات',
  ariaLabel: 'المتطلبات'
}];

// @component: ProductDetailsTabs
export const ProductDetailsTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
  onTabChange
}: ProductDetailsTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, index: number) => {
    if (e.key === 'ArrowRight' && index > 0) {
      setSelectedTab(tabs[index - 1].id);
    } else if (e.key === 'ArrowLeft' && index < tabs.length - 1) {
      setSelectedTab(tabs[index + 1].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedTab(tabId);
    }
  };

  // @return
  return <div className={`w-full mb-5 ${className || ''}`} style={{
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
  }}>
      <div className="w-full">
        <ul role="tablist" aria-orientation="horizontal" className="inline-flex items-center gap-0.5 relative w-full list-none box-border">
          {tabs.map((tab, index) => {
          const isSelected = selectedTab === tab.id;
          return <li key={tab.id} role="tab" aria-selected={isSelected} tabIndex={isSelected ? 0 : -1} onClick={() => handleTabClick(tab.id)} onKeyDown={e => handleKeyDown(e, tab.id, index)} className={`flex justify-center items-center gap-1 relative whitespace-nowrap cursor-pointer rounded px-4 py-3 box-border transition-colors ${isSelected ? 'text-[rgb(56,66,80)]' : 'text-[rgb(56,66,80)]'}`} style={{
            outline: 'none'
          }}>
                <span className={`text-sm leading-5 ${isSelected ? 'font-medium' : 'font-normal'}`}>
                  {tab.label}
                </span>
                {isSelected && <span className="block absolute rounded-full" style={{
              display: 'block',
              position: 'absolute'
            }} />}
              </li>;
        })}
        </ul>
      </div>
    </div>;
};








