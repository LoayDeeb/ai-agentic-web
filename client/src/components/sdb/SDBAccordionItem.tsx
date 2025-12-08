import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
  title?: string;
  items?: string[];
  defaultExpanded?: boolean;
};

// @component: SDBAccordionItem
export const SDBAccordionItem = ({
  title = 'رجال - موظف حكومي/ شركة حكومية',
  items = ['صورة هوية المتقدم.', 'صورة سجل الأسرة.', 'رقم حساب الآيبان على الورق الرسمي للبنك، ومصدّق من البنك التجاري.', 'كشف حساب لآخر 3 رواتب مصدّق من البنك التجاري.', 'شهادة مدد وأجور مشترك لا يتجاوز تاريخ إصدارها 60 يوم من موقع التأمينات الاجتماعية (في حال كان المتقدم خاضع لنظام التأمينات الاجتماعية).'],
  defaultExpanded = true
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // @return
  return <div className="w-full max-w-[905px] bg-white border-t border-[#D2D6DB]">
      <div className="w-full">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between text-right px-0 py-2.5 hover:bg-gray-50 transition-colors" aria-expanded={isExpanded} type="button">
          <h3 className="text-lg font-bold text-[#222222] flex-1">
            {title}
          </h3>
          <span className="transition-transform duration-250 ease-out" style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
            <ChevronDown className="w-6 h-6 text-[#222222]" />
          </span>
        </button>
      </div>
      
      <div className="overflow-hidden transition-all duration-300 ease-out" style={{
      height: isExpanded ? 'auto' : '0',
      visibility: isExpanded ? 'visible' : 'hidden'
    }}>
        <div className="px-4 pt-2.5 pb-5.5">
          <div className="max-w-[960px]">
            <ul className="list-none pr-6 space-y-0" dir="rtl">
              {items.map((item, index) => <li key={index} className="relative text-base leading-6 text-[#222222] mb-0">
                  <span className="absolute left-full top-[11.2px] w-[5px] h-[5px] bg-[#333333] rounded-full -mr-[19.2px]" />
                  {item}
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};


