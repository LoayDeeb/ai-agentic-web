import React, { useState } from 'react';
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
  return <div className="w-[298.6px] border-b border-[#d2d6db] p-2" style={{
    fontFamily: '"IBM Plex Sans Arabic", sans-serif'
  }}>
      <div>
        <span className="block px-4 pt-2 text-sm font-bold leading-[18px] text-[#1f2a37]">
          Services
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
              {service.title} <span className="filter-count">({service.count})</span>
            </label>
          </div>)}
      </div>
    </div>;
};