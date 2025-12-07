import React, { useState } from 'react';
import { Search, ChevronDown, List, Grid } from 'lucide-react';
type ServicesHeaderProps = {
  onSearch?: (value: string) => void;
  onSort?: (direction: 'asc' | 'desc') => void;
  onViewChange?: (view: 'list' | 'grid') => void;
};

// @component: ServicesHeader
export const ServicesHeader = (props: ServicesHeaderProps) => {
  const {
    onSearch,
    onSort,
    onViewChange
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortText, setSortText] = useState('Sort by');
  const [activeView, setActiveView] = useState<'list' | 'grid'>('grid');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };
  const handleSortSelect = (direction: 'asc' | 'desc', label: string) => {
    setSortText(label);
    setSortOpen(false);
    onSort?.(direction);
  };
  const handleViewToggle = (view: 'list' | 'grid') => {
    setActiveView(view);
    onViewChange?.(view);
  };

  // @return
  return <div className="flex justify-between items-center gap-6 flex-nowrap px-0 py-6 w-full">
      <div className="relative flex-grow-[7] flex-shrink flex-basis-0">
        <div className="relative flex flex-wrap items-center w-full overflow-hidden gap-2 h-10 transition-all duration-200 ease-out border border-[rgb(157,164,174)] rounded px-3">
          <Search className="h-5 w-5 flex-shrink-0 text-gray-500" />
          <input type="search" name="searchInput" id="searchInputServices" className="flex-grow flex-shrink min-w-0 h-6 text-base leading-6 text-[rgb(56,66,80)] font-normal bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0 -ml-px placeholder:text-gray-400" placeholder="Search" value={searchValue} onChange={handleSearchChange} />
        </div>
        <div className="absolute z-[1000] bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.1)] max-h-60 mt-1 top-full rounded-lg hidden"></div>
      </div>

      <div className="hidden">
        <div className="flex-grow flex-shrink flex-basis-0 hidden">
          <a href="javascript:void(0)" className="text-white block bg-[rgb(13,18,28)] font-semibold transition-all duration-300 ease-in-out w-full text-center h-full max-w-10 max-h-10 border border-[rgb(210,214,219)] rounded py-2 px-0">
            <span className="inline-block align-text-bottom">⊕</span>
          </a>
        </div>

        <div className="hidden flex-grow flex-shrink flex-basis-0">
          <a href="javascript:void(0)" className="text-[rgb(22,22,22)] block bg-white font-semibold transition-all duration-300 ease-in-out w-full text-center h-full max-w-10 max-h-10 border border-[rgb(210,214,219)] rounded py-2 px-0">
            <span className="inline-block align-text-bottom">↑</span>
          </a>
        </div>
      </div>

      <div className="flex-grow-[4] flex-shrink flex-basis-0">
        <div className="cursor-pointer relative">
          <a className="text-[rgb(22,22,22)] flex items-center text-left h-10 transition-all duration-300 ease-out whitespace-nowrap min-h-10 gap-1 pr-10 text-base font-normal leading-6 border border-[rgb(157,164,174)] rounded pl-4 m-0" href="javascript:void(0)" onClick={() => setSortOpen(!sortOpen)}>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {sortText}
            </span>
            <ChevronDown className={`absolute right-3 h-6 w-6 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
          </a>
          {sortOpen && <ul className="absolute z-[9999] min-w-full text-base text-[rgb(31,42,55)] list-none bg-white border border-[rgb(210,214,219)] rounded p-2 mt-2 shadow-[0_2px_4px_0_rgba(16,24,40,0.06),0_4px_8px_0_rgba(16,24,40,0.1)]">
              <li>
                <a className="text-[rgb(22,22,22)] flex items-center text-sm font-normal leading-5 mb-3 pr-6 block w-full clear-both text-left whitespace-nowrap rounded py-2 pl-2 hover:bg-gray-100 transition-colors" href="javascript:void(0)" onClick={() => handleSortSelect('asc', 'A to Z')}>
                  A to Z
                </a>
              </li>
              <li>
                <a className="text-[rgb(22,22,22)] flex items-center text-sm font-normal leading-5 m-0 pr-6 block w-full clear-both text-left whitespace-nowrap rounded py-2 pl-2 hover:bg-gray-100 transition-colors" href="javascript:void(0)" onClick={() => handleSortSelect('desc', 'Z to A')}>
                  Z to A
                </a>
              </li>
            </ul>}
        </div>
      </div>

      <div className="flex-grow flex-shrink flex-basis-0">
        <div className="relative flex align-middle gap-2 rounded" role="group" aria-label="Toggle View">
          <a id="listViewBtn" className={`w-10 h-10 flex items-center justify-center transition-all duration-200 ease-out border border-[rgb(210,214,219)] rounded cursor-pointer ${activeView === 'list' ? 'bg-[rgb(229,231,235)]' : 'bg-white'} hover:bg-gray-100`} title="List View" onClick={() => handleViewToggle('list')}>
            <List className="w-5 h-5 text-[rgb(22,22,22)]" />
          </a>
          <a id="gridViewBtn" className={`w-10 h-10 flex items-center justify-center transition-all duration-200 ease-out border border-[rgb(210,214,219)] rounded cursor-pointer ${activeView === 'grid' ? 'bg-[rgb(229,231,235)]' : 'bg-white'} hover:bg-gray-100`} title="Grid View" onClick={() => handleViewToggle('grid')}>
            <Grid className="w-5 h-5 text-[rgb(22,22,22)]" />
          </a>
        </div>
      </div>
    </div>;
};