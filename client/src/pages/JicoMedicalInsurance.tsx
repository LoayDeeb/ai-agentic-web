import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { HealthcareHeaderNav } from '../components/jico/HealthcareHeaderNav';
import { HealthcareBanner } from '../components/jico/HealthcareBanner';
import { MedicalInsuranceHero } from '../components/jico/MedicalInsuranceHero';
import { HealthInsuranceCard } from '../components/jico/HealthInsuranceCard';
import { ArabicHeroHeading } from '../components/jico/ArabicHeroHeading';
import { InsurancePlanCard } from '../components/jico/InsurancePlanCard';
import { InsurancePlanSection } from '../components/jico/InsurancePlanSection';
import { CureInPlanCard } from '../components/jico/CureInPlanCard';
import { InsuranceSection } from '../components/jico/InsuranceSection';
import { WhyAlQudsInsurance } from '../components/jico/WhyAlQudsInsurance';

/**
 * JicoMedicalInsurance - A comprehensive medical insurance page
 * for Jerusalem Insurance (JICO) showcasing various health insurance plans.
 */
export default function JicoMedicalInsurance() {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/jico/submit');
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
      dir="rtl"
    >
      {/* Header Navigation */}
      <HealthcareHeaderNav />

      {/* Hero Banner */}
      <HealthcareBanner />

      {/* Medical Insurance Hero Section */}
      <MedicalInsuranceHero />

      {/* Health Insurance Introduction Card */}
      <HealthInsuranceCard onButtonClick={handleApplyNow} />

      {/* Arabic Hero Heading - "We are the bandage and the backup plan" */}
      <ArabicHeroHeading />

      {/* Cure Insurance Plan Card */}
      <InsurancePlanCard />

      {/* Cure 50:50 Plan Section */}
      <InsurancePlanSection />

      {/* Cure In Plan Card - Hospital only coverage */}
      <CureInPlanCard />

      {/* Cancer Insurance Section */}
      <InsuranceSection />

      {/* Why Al Quds Insurance Section */}
      <WhyAlQudsInsurance />

      {/* Call to Action Section */}
      <section className="bg-[#CD9E51] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            جاهز للحصول على تأمينك الصحي؟
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            قدم طلبك الآن واحصل على تغطية صحية شاملة لك ولعائلتك مع القدس للتأمين
          </p>
          <button
            onClick={handleApplyNow}
            className="inline-flex items-center gap-3 bg-white text-[#CD9E51] px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            قدم طلبك الآن
          </button>
        </div>
      </section>
    </div>
  );
}

