import React from 'react';
import { Star, ArrowUpLeft, Clock, Users, Timer, Monitor, Phone, Sparkles, DollarSign } from 'lucide-react';

type ServiceDetailsCardProps = {
  contributionAmount?: number;
  currency?: string;
  registrationDeadline?: string;
  serviceDuration?: string;
  eligibilityInfo?: string[];
  availabilityInfo?: string;
  platformInfo?: string;
  reviewCount?: number;
  averageRating?: number;
  contactLink?: string;
  registrationLink?: string;
};

const StarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2703 3.79429L14.9713 7.19642C15.2033 7.67001 15.8218 8.12427 16.3438 8.21126L19.4269 8.72351C21.3986 9.05212 21.8626 10.4826 20.4418 11.8937L18.0448 14.2906C17.6389 14.6966 17.4166 15.4794 17.5422 16.04L18.2285 19.0072C18.7697 21.3558 17.5229 22.2644 15.4449 21.0369L12.555 19.3262C12.0331 19.0169 11.1729 19.0169 10.6413 19.3262L7.75146 21.0369C5.68312 22.2644 4.42665 21.3462 4.9679 19.0072L5.65413 16.04C5.77977 15.4794 5.55747 14.6966 5.15154 14.2906L2.75459 11.8937C1.34348 10.4826 1.79774 9.05212 3.76943 8.72351L6.8526 8.21126C7.36485 8.12427 7.98342 7.67001 8.21539 7.19642L9.91645 3.79429C10.8443 1.94825 12.3521 1.94825 13.2703 3.79429Z" fill="currentColor" />
  </svg>;

// @component: ServiceInfoSidebar
export const ServiceInfoSidebar = ({
  contributionAmount = 200,
  currency = 'ريال',
  registrationDeadline = 'ينتهي التسجيل في 23 ديسمبر 2025',
  serviceDuration = 'فوري',
  eligibilityInfo = ['الطلبة من الصف الثالث الابتدائي الى الصف الأول الثانوي', 'متاحة 7/24 خلال فترة التسجيل', 'موقع قياس'],
  reviewCount = 6814,
  averageRating = 3,
  contactLink = '#',
  registrationLink = '#'
}: ServiceDetailsCardProps) => {
  const [hoveredStar, setHoveredStar] = React.useState<number>(0);

  // @return
  return <div className="w-[450px] bg-[#F4F4F6] rounded-3xl p-6 flex flex-col gap-10" dir="rtl">
      {/* Service Details Section */}
      <div className="flex flex-col gap-6 border-b border-[#D1D5DB]/60 pb-10">
        <h3 className="text-[#4B5563] text-xl font-medium leading-6 m-0">
          تفاصيل الخدمة
        </h3>
        
        {/* Contribution Amount Row */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <DollarSign className="w-6 h-6 ml-2 stroke-[#6B7280]" />
            قيمة مساهمة ولي الأمر
          </div>
          <div className="text-[#4B5563] text-sm leading-[26px]">
            <span className="text-[#2B254B] font-medium text-[22px] leading-[26.4px]">
              {contributionAmount}
            </span>
            <span className="text-[#4B5563] mr-1">{currency}</span>
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="flex items-center text-[#2B254B]">
          {registrationDeadline}
        </div>

        {/* Registration Button */}
        <div className="flex flex-col gap-4">
          <a href={registrationLink} className="flex justify-center items-center gap-2 bg-[#2B254B] text-white rounded-2xl px-8 py-3 font-normal text-sm leading-6 transition-all duration-200 hover:bg-[#1a1730] cursor-pointer no-underline border-2 border-transparent" onClick={e => e.preventDefault()}>
            <span className="text-base">التسجيل في البرنامج</span>
            <ArrowUpLeft className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Service Duration Section */}
      <div className="flex flex-col gap-6 border-b border-[#D1D5DB]/60 pb-10">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Clock className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            مدة تنفيذ الخدمة
          </div>
          <div className="text-[#027A48] bg-[#ECFDF3] text-sm leading-[26px] px-[10px] py-1 rounded-2xl relative">
            {serviceDuration}
          </div>
        </div>
      </div>

      {/* Eligibility Info Section */}
      <div className="flex flex-col gap-6 border-b border-[#D1D5DB]/60 pb-10">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Users className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            {eligibilityInfo[0]}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Timer className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            {eligibilityInfo[1]}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Monitor className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            {eligibilityInfo[2]}
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="flex flex-col gap-6 border-b border-[#D1D5DB]/60 pb-10">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Sparkles className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            عدد التقييمات
            <span className="text-[#2B254B] font-semibold text-base leading-[19px] mr-1">
              {reviewCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0">
              {[1, 2, 3, 4, 5].map(star => <span key={star} className="h-6 cursor-pointer transition-colors duration-200" onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)} style={{
              color: star <= (hoveredStar || averageRating) ? '#E2A947' : '#D1D5DB'
            }}>
                  <StarIcon />
                </span>)}
            </div>
            <div className="text-[#E2A947] font-medium text-base leading-6">
              {averageRating}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-center gap-4 min-h-[40px]">
          <div className="flex items-center text-[#6B7280] font-bold text-sm leading-[16.8px]">
            <Phone className="w-6 h-6 ml-3 stroke-[#6B7280]" />
            لأي استفسار أو ملاحظات حول الخدمة
          </div>
          <a href={contactLink} className="text-[#6B7280] text-sm leading-6 transition-all duration-200 hover:text-[#2B254B] no-underline" onClick={e => e.preventDefault()}>
            تواصل معنا
          </a>
        </div>
      </div>
    </div>;
};




