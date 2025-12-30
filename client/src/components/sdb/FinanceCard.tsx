import React from 'react';

type FinanceCardProps = {
  title?: string;
  description?: string;
  tagText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

// @component: FinanceCard
export const FinanceCard = (props: FinanceCardProps) => {
  const {
    title = 'الأسر المنتجة التمويل غير المباشر',
    description = 'ادعم مشروعك المنزلي أو مهنتك الحرفية بتمويل يصل إلى 50,000 ♦ من خلال وسطاء تمويل معتمدين. بأقساط مريحة وفترة سداد تصل إلى 36 شهر، وإمكانية التقديم على تمويل إضافي بعد سداد أكثر من نصف المبلغ، مع تغطية أكثر من...',
    tagText = 'تمويل الأسر المنتجة',
    primaryButtonText = 'انتقل للخدمة',
    secondaryButtonText = 'التفاصيل',
    onPrimaryClick,
    onSecondaryClick
  } = props;

  // @return
  return <div className="flex flex-col items-start gap-6 bg-white cursor-pointer relative overflow-hidden border border-[rgb(210,214,219)] rounded-2xl p-4 w-[416.8px] m-[5px]">
      <div className="flex items-center justify-center h-12 min-w-12 w-12 bg-[rgb(243,252,246)] rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="33.066" height="42.001">
          <g data-name="Group 69132">
            <g data-name="Group 68981">
              <g data-name="Group 68927">
                <path data-name="Path 161933" d="M18.137 6.11s-.363.216-.794 1.4-1.3 3.816-1.3 3.816-.039 2.413.6 2.266.9-.559 1.373-1.314a25.845 25.845 0 001.275-3.129L18.137 6.11z" fill="#fff" />
                <path data-name="Path 161934" d="M16.586 13.761a.4.4 0 01-.245-.088c-.461-.373-.461-2.011-.451-2.335v-.049c0-.029.883-2.648 1.3-3.825.432-1.206.814-1.462.853-1.481a.147.147 0 01.128-.01.215.215 0 01.1.088l1.148 3.041a.368.368 0 010 .108 24.289 24.289 0 01-1.295 3.158c-.451.736-.755 1.226-1.471 1.393-.029 0-.059.01-.088.01zm-.383-2.4a4.253 4.253 0 00.343 2.07.106.106 0 00.069.02c.569-.128.795-.481 1.275-1.246a25.429 25.429 0 001.246-3.041l-1.05-2.756a4.231 4.231 0 00-.589 1.177c-.4 1.108-1.206 3.531-1.295 3.8z" fill="#008550" />
              </g>
              <g data-name="Group 68928">
                <path data-name="Path 161935" d="M16.891 13.515s-.432.461-.893.294a1.479 1.479 0 01-.834-.922 2.427 2.427 0 01-.216-.922 5.046 5.046 0 01.137-.618 1.065 1.065 0 00.8.373 1.207 1.207 0 00.775-.314s.265 2.07.226 2.109z" fill="#fff" />
                <path data-name="Path 161936" d="M16.214 14.006a.634.634 0 01-.265-.049 1.712 1.712 0 01-.932-1.03c-.02-.069-.049-.137-.069-.206a1.811 1.811 0 01-.157-.785 3.616 3.616 0 01.147-.638.147.147 0 01.118-.108.163.163 0 01.157.059.91.91 0 00.677.314 1.042 1.042 0 00.667-.265.17.17 0 01.167-.039.16.16 0 01.108.128c.265 2.129.255 2.168.186 2.236a1.232 1.232 0 01-.794.383zm-1.04-2.364c-.029.108-.049.235-.069.353a1.43 1.43 0 00.137.628c.029.078.049.147.078.216a1.349 1.349 0 00.736.824.7.7 0 00.677-.216c-.01-.206-.1-.991-.2-1.756a1.336 1.336 0 01-.647.186 1.106 1.106 0 01-.726-.235z" fill="#008550" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="text-lg font-bold text-[18px] leading-[28px] flex items-center overflow-hidden">
        {title}
      </div>

      <div className="text-base font-normal text-[16px] leading-[24px] flex items-center overflow-hidden flex-col">
        {description}
      </div>

      <div className="flex items-center gap-[5px]">
        <div className="flex h-5 justify-center items-center gap-1 w-[125px] text-[rgb(8,93,58)] bg-[rgb(236,253,243)] border border-[rgb(171,239,198)] rounded-full px-3">
          <span className="flex justify-center items-center w-[10px] h-[10px] p-[1.8px_1.6px]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[7px] h-[10px]" style={{
            color: 'rgb(8, 93, 58)',
            stroke: 'rgb(8, 93, 58)'
          }}>
              <circle cx="5" cy="5" r="4" stroke="#1B8354" strokeWidth="1" fill="#074D31" />
            </svg>
          </span>
          <span className="text-[12px] leading-[18px]">{tagText}</span>
        </div>
      </div>

      <div className="flex items-center gap-[5px]">
        <button type="button" onClick={onPrimaryClick} className="text-[14px] leading-5 cursor-pointer text-white overflow-hidden flex items-center justify-center gap-1 w-[94.8px] transition-all duration-200 h-8 px-3 font-medium bg-[rgb(27,131,84)] rounded">
          <span>{primaryButtonText}</span>
        </button>
        
        <button type="button" onClick={onSecondaryClick} className="text-[14px] leading-5 cursor-pointer text-[rgb(22,22,22)] overflow-hidden flex items-center justify-center gap-1 w-[72.6px] transition-all duration-200 h-8 px-3 font-medium outline outline-[0.6px] outline-[rgb(229,231,235)] rounded">
          <span>{secondaryButtonText}</span>
        </button>
      </div>
    </div>;
};








