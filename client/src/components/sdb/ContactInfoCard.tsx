import React from 'react';
import { Phone } from 'lucide-react';

type ContactInfoCardProps = {
  email?: string;
  iconColor?: string;
};

// @component: ContactInfoCard
export const ContactInfoCard = ({
  email = 'care@sdb.gov.sa',
  iconColor = '#1B8354'
}: ContactInfoCardProps) => {
  // @return
  return <div className="w-[413px] p-2.5">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Phone className="w-6 h-6" style={{
        color: iconColor
      }} strokeWidth={2} />
        <span className="text-base font-bold leading-6">
          {email}
        </span>
      </div>
      <div className="ml-[30px]">
        <a href={`mailto:${email}`} className="inline-flex items-center text-base leading-6 transition-all duration-200 ease-in-out py-0.5 cursor-pointer" style={{
        color: iconColor
      }} onClick={e => e.preventDefault()}>
          <span>{email}</span>
        </a>
      </div>
    </div>;
};







