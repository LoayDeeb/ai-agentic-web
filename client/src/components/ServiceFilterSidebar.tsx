import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ServiceItem = {
  id: string;
  title: string;
  count: number;
  checked: boolean;
};
type ServiceFilterSidebarProps = {
  initialServices?: ServiceItem[];
  onSelectionChange?: (selectedServices: ServiceItem[]) => void;
};
const defaultServices: ServiceItem[] = [{
  id: '1',
  title: 'Zakat Services',
  count: 14,
  checked: true
}, {
  id: 'static-tax',
  title: 'Tax Services',
  count: 50,
  checked: false
}, {
  id: '15',
  title: 'Customs Services',
  count: 71,
  checked: false
}, {
  id: 'static-most-used',
  title: 'Most Used Services',
  count: 0,
  checked: false
}, {
  id: '16',
  title: 'Proactive Services',
  count: 4,
  checked: false
}, {
  id: '13',
  title: 'General Services',
  count: 21,
  checked: false
}];

// @component: ServiceFilterSidebar
export const ServiceFilterSidebar = ({
  initialServices = defaultServices,
  onSelectionChange
}: ServiceFilterSidebarProps) => {
  const { t } = useTranslation()
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const handleCheckboxChange = (id: string) => {
    const updatedServices = services.map(service => service.id === id ? {
      ...service,
      checked: !service.checked
    } : service);
    setServices(updatedServices);
    onSelectionChange?.(updatedServices.filter(s => s.checked));
  };

  // @return
  return <div className="w-[298.6px] border border-[#d2d6db] rounded-lg bg-white" style={{
    fontFamily: '"IBM Plex Sans Arabic", sans-serif'
  }}>
      {/* Filter header */}
      <h6 className="font-bold text-[16px] leading-[18px] text-[rgb(31,42,55)] border-b border-[rgb(210,214,219)] px-6 pt-4 pb-2 m-0">
        {t('Filter')}
      </h6>
      
      {/* Services section */}
      <div className="p-2">
        <span className="block px-4 pt-2 text-sm font-bold leading-[18px] text-[#1f2a37]">
          {t('Services')}
        </span>
        {services.map((service, index) => <div key={service.id} className="my-3 flex min-h-6 gap-2 px-2 py-2 text-sm font-normal leading-6 text-[#161616]" style={{
        marginBottom: index === services.length - 1 ? '0' : '16px'
      }}>
            <input type="checkbox" id={service.id} checked={service.checked} onChange={() => handleCheckboxChange(service.id)} className="m-0 h-[21px] w-[21px] flex-shrink-0 cursor-pointer appearance-none rounded-[3.6px] border-[0.6px] bg-white bg-center bg-no-repeat" style={{
          borderColor: service.checked ? '#1b8354' : '#6c737f',
          backgroundColor: service.checked ? '#1b8354' : '#ffffff',
          backgroundImage: service.checked ? "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e\")" : 'none'
        }} />
            <label htmlFor={service.id} className="m-0 block cursor-pointer font-medium text-[#161616]">
              {t(service.title)} <span className="filter-count">({service.count})</span>
            </label>
          </div>)}
      </div>
    </div>;
};


