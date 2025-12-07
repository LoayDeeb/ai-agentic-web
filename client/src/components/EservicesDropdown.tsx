import React from 'react';
type DropdownMenuProps = {
  title?: string;
  items?: Array<{
    label: string;
    href?: string;
  }>;
};

// @component: EservicesDropdown
export const EservicesDropdown = ({
  title = "E-Services",
  items = [{
    label: "Zakat, Tax and Customs Services",
    href: "#"
  }, {
    label: "Zakaty Platform",
    href: "#"
  }, {
    label: "E-Auctions",
    href: "#"
  }]
}: DropdownMenuProps) => {
  // @return
  return <div className="w-full min-w-full bg-white rounded shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),0_4px_6px_-2px_rgba(16,24,40,0.03)] border-t border-[#e9ecef] animate-[fadeIn_0.3s_ease] min-h-[457px]" style={{
    padding: '32px 20px'
  }}>
      <ul className="flex flex-wrap list-none p-0 m-0" style={{
      paddingLeft: '215px'
    }}>
        <li className="hidden md:block">
          <p className="text-[#1b8354] text-lg font-bold leading-7 cursor-default px-4 mb-3 m-0">
            {title}
          </p>
        </li>
        
        <li className="w-full hidden md:block"></li>
        
        <li className="min-w-[316px]">
          <ul className="list-none p-0 m-0">
            {items.map((item, index) => <li key={index}>
                <a href={item.href || "#"} onClick={e => e.preventDefault()} className="mb-1 inline-block w-[316px] clear-both text-left text-[#1f2a37] text-base font-medium leading-6 transition-all duration-300 ease-in-out rounded-lg px-4 py-2 hover:bg-gray-50">
                  {item.label}
                </a>
              </li>)}
          </ul>
        </li>
      </ul>
    </div>;
};


