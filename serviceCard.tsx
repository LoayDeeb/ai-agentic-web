import React from 'react';
type ServiceRequestCardProps = {
  title?: string;
  description?: string;
  badges?: string[];
  learnMoreLabel?: string;
  startLabel?: string;
  onLearnMore?: () => void;
  onStart?: () => void;
};

// @component: ServiceRequestCard
export const ServiceRequestCard = ({
  title = "Request an Installment Plan",
  description = "An e-service that allows you to request installment payments in cases where you face difficulties in paying the full amount due.",
  badges = ["Zakat"],
  learnMoreLabel = "Learn More",
  startLabel = "Start",
  onLearnMore,
  onStart
}: ServiceRequestCardProps) => {
  // @return
  return <div className="relative flex flex-col min-w-0 overflow-hidden bg-white border border-[#D2D6DB] rounded-2xl p-4 w-[310.6px] h-[282.6px]">
      <div className="flex-grow flex-shrink flex flex-col pb-6">
        <h5 className="font-bold font-sans text-lg leading-7 text-[#1F2A37] mb-2">
          {title}
        </h5>
        <p className="text-[#1F2A37] font-normal leading-6 overflow-hidden text-ellipsis line-clamp-3 m-0">
          {description}
        </p>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {badges.map((badge, index) => <span key={index} className="block bg-[#F9FAFB] text-[#1F2A37] text-xs font-medium text-center leading-4 border border-[#E5E7EB] rounded px-1.5 py-1">
              {badge}
            </span>)}
        </div>
      </div>
      
      <div className="p-0">
        <div className="flex gap-3">
          <button onClick={onLearnMore} className="text-[#161616] block font-sans text-base font-medium leading-6 text-center align-middle cursor-pointer bg-[#F3F4F6] transition-all duration-150 ease-in-out min-h-[40px] border border-[#F3F4F6] rounded px-4 py-1.5 hover:bg-[#E5E7EB]">
            {learnMoreLabel}
          </button>
          <button onClick={onStart} className="text-white block font-sans text-base font-medium leading-6 text-center align-middle cursor-pointer bg-[#1B8354] transition-all duration-150 ease-in-out min-h-[40px] border border-[#1B8354] rounded px-4 py-1.5 hover:bg-[#156b45]">
            {startLabel}
          </button>
        </div>
      </div>
    </div>;
};