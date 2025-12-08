import React, { useState } from 'react';

type TabItem = {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
};

type ServicesTabGroupProps = {
  tabs?: TabItem[];
  onTabChange?: (tabId: string) => void;
  defaultActiveTab?: string;
};

// @component: ServicesTabGroup
export const ServicesTabGroup = ({
  tabs = [{
    id: 'all',
    label: 'الكل',
    icon: 'https://www.mawhiba.sa/assets/img/img/icons/four-squares--blue.svg',
    isActive: true
  }, {
    id: 'talented',
    label: 'الموهوبون',
    icon: 'https://www.mawhiba.sa/media/4f1ftbuk/hat.svg'
  }, {
    id: 'association',
    label: 'رابطة موهبة',
    icon: 'https://www.mawhiba.sa/media/vpeliv3e/flag.svg'
  }, {
    id: 'experts',
    label: 'الخبراء',
    icon: 'https://www.mawhiba.sa/media/oyamav1u/crown.svg'
  }],
  onTabChange,
  defaultActiveTab
}: ServicesTabGroupProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs.find(tab => tab.isActive)?.id || tabs[0]?.id || 'all');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // @return
  return <div className="flex flex-nowrap items-center gap-3 rounded-3xl bg-[#f4f4f6] px-4 py-3" style={{
    maxWidth: 'fit-content'
  }}>
      {tabs.map(tab => {
      const isActive = activeTab === tab.id;
      return <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`flex flex-nowrap items-center gap-2 rounded-3xl px-4 py-3 transition-all duration-200 ease-in-out ${isActive ? 'bg-[#e2a947] text-white' : 'bg-transparent text-[#2b254b] hover:bg-gray-200'}`} style={{
        fontFamily: 'Alexandria, sans-serif'
      }}>
            <img src={tab.icon} alt={`${tab.label} icon`} className="block h-6 w-6 transition-all duration-200 ease-in-out" style={{
          filter: isActive ? 'invert(1) brightness(2)' : 'none'
        }} />
            <span className={`flex transition-all duration-200 ease-in-out ${isActive ? 'text-lg font-extrabold leading-[21px]' : 'text-base font-semibold leading-[19px]'}`}>
              {tab.label}
            </span>
          </button>;
    })}
    </div>;
};



