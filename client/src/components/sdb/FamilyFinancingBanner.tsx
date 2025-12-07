import React from 'react';

type FamilyFinancingBannerProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  serviceLevelAgreementText?: string;
  serviceLevelAgreementHref?: string;
  productVideoText?: string;
  productVideoHref?: string;
  onButtonClick?: () => void;
};

// @component: FamilyFinancingBanner
export const FamilyFinancingBanner = (props: FamilyFinancingBannerProps) => {
  const {
    title = 'تمويل الأسرة',
    description = 'تمويل مخصص للأسر ذات الدخل المحدود بهدف مساعدتها على تغطية احتياجاتها الأساسية وتحقيق الاستقرار المعيشي. يتم التقديم على المنتج إلكترونيًا بالكامل، دون الحاجة لزيارة فروع البنك.',
    ctaText = 'تقديم الطلب',
    ctaHref = '#',
    serviceLevelAgreementText = 'اتفاقية مستوى الخدمة',
    serviceLevelAgreementHref = '#',
    productVideoText = 'فيديو المنتج',
    productVideoHref = '#',
    onButtonClick
  } = props;

  // @return
  return <div className="w-full py-8" style={{
    backgroundColor: 'rgb(247, 253, 249)',
    fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
  }} dir="rtl">
      <div className="grid grid-cols-12 gap-4 md:gap-4">
        <div className="col-span-12 md:col-span-8">
          <h1 className="text-[30px] leading-[38px] font-bold m-0 p-0 text-[#161616]" style={{
          fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
        }}>
            {title}
          </h1>
          
          <div className="my-4" />
          
          <div className="text-base leading-6 font-normal text-[#161616]" style={{
          fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
        }}>
            <p className="m-0 p-0 break-words">{description}</p>
          </div>

          <div className="my-4" />

          <div className="flex gap-4 flex-wrap">
            <a href={serviceLevelAgreementHref} className="flex items-center gap-0 cursor-pointer transition-all duration-200 ease-in-out text-[rgb(27,131,84)] py-0.5 hover:opacity-80 no-underline text-base leading-6 font-normal" style={{
            fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
          }}>
              <span>{serviceLevelAgreementText}</span>
            </a>
            <a href={productVideoHref} className="flex items-center gap-0 cursor-pointer transition-all duration-200 ease-in-out text-[rgb(27,131,84)] py-0.5 hover:opacity-80 no-underline text-base leading-6 font-normal" style={{
            fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
          }}>
              <span>{productVideoText}</span>
            </a>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 flex justify-start md:justify-end items-start">
          <button type="button" onClick={onButtonClick} className="flex items-center justify-center gap-1 h-10 px-6 text-white bg-[rgb(27,131,84)] rounded transition-all duration-200 hover:bg-[#156b44] cursor-pointer text-base leading-6 font-medium" style={{
            fontFamily: 'saudiriyal, IBMPlexSansArabic, serif'
          }}>
            <span>{ctaText}</span>
          </button>
        </div>
      </div>
    </div>;
};
