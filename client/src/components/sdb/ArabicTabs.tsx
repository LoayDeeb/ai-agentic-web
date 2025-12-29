import React, { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  selected: boolean;
};

type ArabicTabsProps = {
  tabs?: Tab[];
  onTabChange?: (tabId: string) => void;
};

// @component: ArabicTabs
export const ArabicTabs = ({
  tabs = [{
    id: 'individuals',
    label: 'تمويل الأفراد',
    selected: true
  }, {
    id: 'establishments',
    label: 'تمويل المنشأت',
    selected: false
  }, {
    id: 'nonprofit',
    label: 'قطاع غير ربحي',
    selected: false
  }],
  onTabChange
}: ArabicTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs.find(t => t.selected)?.id || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  // @return
  return <ul role="tablist" aria-orientation="horizontal" className="inline-flex items-center gap-[3px] relative w-[325px] p-0 m-0 list-none" style={{
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
  }}>
      {tabs.map((tab, index) => {
      const isSelected = selectedTab === tab.id;
      return <li key={tab.id} role="tab" aria-selected={isSelected} tabIndex={isSelected ? 0 : -1} onClick={() => handleTabClick(tab.id)} className={`
              box-border flex justify-center items-center gap-1
              relative whitespace-nowrap cursor-pointer rounded
              px-4 py-3 m-0
              ${isSelected ? 'text-[rgb(56,66,80)]' : 'text-[rgb(56,66,80)]'}
            `} style={{
        fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
        fontSize: '10px',
        lineHeight: '10px'
      }}>
            <span className="tab-label" style={{
          fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: isSelected ? 500 : 400,
          padding: 0,
          margin: 0
        }}>
              {tab.label}
            </span>
            {isSelected && <span className="block absolute whitespace-nowrap cursor-pointer rounded-full" style={{
          fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
          fontSize: '10px',
          lineHeight: '10px',
          color: 'rgb(56, 66, 80)',
          padding: 0,
          margin: 0
        }} />}
          </li>;
    })}
      <span className="block absolute" style={{
      fontFamily: 'saudiriyal, IBMPlexSansArabic, serif',
      fontSize: '10px',
      lineHeight: '10px',
      width: '325px',
      padding: 0,
      margin: 0
    }} />
    </ul>;
};







