import React from 'react';
import { Phone } from 'lucide-react';

type ContactCardProps = {
  phoneNumber?: string;
  className?: string;
};

// @component: ContactCard
export const ContactCard = ({
  phoneNumber = '920008002',
  className = ''
}: ContactCardProps) => {
  // @return
  return <div className={`flex flex-col gap-2.5 p-2.5 w-full max-w-[413px] ${className}`}>
      <div className="flex items-center gap-1.5">
        <Phone className="w-6 h-6 text-[#1b8354] stroke-2" />
        <span className="text-base font-bold leading-6 text-[#1b8354]">
          {phoneNumber}
        </span>
      </div>
      <div className="block ml-[30px]">
        <a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center text-base font-normal leading-6 text-[#1b8354] cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 py-0.5">
          <span>{phoneNumber}</span>
        </a>
      </div>
    </div>;
};

