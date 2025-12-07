import React from 'react';
type FilterSidebarProps = {
  className?: string;
};

// @component: FilterSidebar
export const FilterSidebar = ({
  className = ''
}: FilterSidebarProps) => {
  // @return
  return <div className={`w-[298.6px] ${className}`}>
      <h6 className="font-bold text-[16px] leading-[18px] text-[rgb(31,42,55)] border-b border-[rgb(210,214,219)] px-6 pt-4 pb-2 m-0" style={{
      fontFamily: '"IBM Plex Sans Arabic", sans-serif'
    }}>
        Filter
      </h6>
    </div>;
};