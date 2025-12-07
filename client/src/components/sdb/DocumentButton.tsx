import React from 'react';

type DocumentButtonProps = {
  text?: string;
  onClick?: () => void;
};

// @component: DocumentButton
export const DocumentButton = ({
  text = "تمويل الاسرة - دليل المستخدم",
  onClick
}: DocumentButtonProps) => {
  // @return
  return <div className="font-sans p-2.5 w-[413.4px]">
      <button type="button" onClick={onClick} className="
          inline-flex items-center justify-center
          w-[218.6px] h-10
          px-4
          text-base leading-6 font-medium
          text-[#222222]
          cursor-pointer
          transition-all duration-200 ease-in-out
          rounded
          outline outline-[0.6px] outline-[#e5e7eb]
          mix-blend-multiply
          overflow-hidden
          gap-1
          hover:bg-gray-50
          active:bg-gray-100
          focus:outline-2 focus:outline-offset-2 focus:outline-gray-400
        ">
        <span className="text-base leading-6 font-medium">
          {text}
        </span>
      </button>
    </div>;
};

