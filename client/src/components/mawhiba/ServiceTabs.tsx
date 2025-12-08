import React, { useState } from 'react';

type TabItem = {
  id: string;
  title: string;
  icon: string;
};

type ServiceTabsProps = {
  tabs?: TabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
};

const defaultTabs: TabItem[] = [{
  id: 'steps',
  title: 'خطوات التقديم',
  icon: 'https://www.mawhiba.sa/assets/img/img/icons/send-sqaure-2.svg'
}, {
  id: 'terms',
  title: 'شروط الخدمة',
  icon: 'https://www.mawhiba.sa/assets/img/img/icons/receipt-text.svg'
}, {
  id: 'faq',
  title: 'الأسئلة الشائعة',
  icon: 'https://www.mawhiba.sa/assets/img/img/icons/message-question.svg'
}];

// @component: ServiceTabs
export const ServiceTabs = ({
  tabs = defaultTabs,
  defaultActiveTab,
  onTabChange
}: ServiceTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // @return
  return <div className="flex flex-wrap items-center bg-[#f4f4f6] rounded-[24px] p-3" style={{
    gap: '12px',
    maxWidth: '642px'
  }}>
      {tabs.map((tab, index) => {
      const isActive = activeTab === tab.id;
      return <button key={tab.id} onClick={() => handleTabClick(tab.id)} className="flex items-center justify-center flex-1 min-w-fit rounded-[24px] px-4 py-[14.6px] cursor-pointer transition-all duration-1000 ease-in-out" style={{
        gap: '8px',
        backgroundColor: isActive ? '#e2a947' : 'transparent',
        color: isActive ? '#ffffff' : '#2b254b'
      }}>
            <img src={tab.icon} alt="icon" className="block w-6 h-6 transition-all duration-1000 ease-in-out" style={{
          filter: isActive ? 'invert(1) brightness(2)' : 'none'
        }} />
            <span className="flex font-medium" style={{
          fontFamily: 'Alexandria, sans-serif',
          fontSize: isActive ? '18px' : '16px',
          lineHeight: isActive ? '21px' : '19px'
        }}>
              {tab.title}
            </span>
          </button>;
    })}
    </div>;
};



