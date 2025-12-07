import React from 'react';
type MenuItem = {
  label: string;
  href: string;
};
type MenuColumn = {
  items: MenuItem[];
};
type DropdownMenuProps = {
  title?: string;
  columns?: MenuColumn[];
};
const defaultColumns: MenuColumn[] = [{
  items: [{
    label: 'Who We Are',
    href: '#'
  }, {
    label: 'Organizational Structure',
    href: '#'
  }, {
    label: 'Statute of ZATCA',
    href: '#'
  }, {
    label: "The Governor's Message",
    href: '#'
  }, {
    label: 'Board Members',
    href: '#'
  }, {
    label: 'Members of the Sharia Committee',
    href: '#'
  }, {
    label: 'ZATCA Leadership',
    href: '#'
  }, {
    label: 'Advisory Committee',
    href: '#'
  }]
}, {
  items: [{
    label: 'Our Partners',
    href: '#'
  }, {
    label: 'Policies, Strategies, and Obligations for Providing Services',
    href: '#'
  }, {
    label: 'Procurement and Tenders',
    href: '#'
  }, {
    label: 'Sustainable Development Goals',
    href: '#'
  }, {
    label: 'E-Participation',
    href: '#'
  }, {
    label: 'Open Data',
    href: '#'
  }, {
    label: 'ZATCA Statistics',
    href: '#'
  }, {
    label: 'Fresh Graduates Program',
    href: '#'
  }]
}, {
  items: [{
    label: 'Work with Us',
    href: '#'
  }, {
    label: 'Contact Us',
    href: '#'
  }]
}];

// @component: DropdownMenu
export const DropdownMenu = ({
  title = 'About Us',
  columns = defaultColumns
}: DropdownMenuProps) => {
  // @return
  return <ul className="flex flex-wrap list-none p-0 m-0 w-full pl-0 md:pl-[215px]">
      <li className="hidden md:block">
        <p className="text-[#1B8354] text-lg font-bold leading-7 cursor-default px-4 pb-3 m-0">
          {title}
        </p>
      </li>

      <li className="w-full hidden md:block" />

      {columns.map((column, columnIndex) => <li key={columnIndex} className="min-w-[316px]">
          <ul className="list-none p-0 m-0">
            {column.items.map((item, itemIndex) => <li key={itemIndex}>
                <a href={item.href} className="inline-block text-[#1F2A37] text-base font-medium leading-6 mb-1 pr-4 clear-both text-start whitespace-normal transition-all duration-300 ease-in-out rounded-lg py-2 px-4 hover:bg-gray-100 flex items-center w-full" onClick={e => e.preventDefault()}>
                  {item.label}
                </a>
              </li>)}
          </ul>
        </li>)}
    </ul>;
};