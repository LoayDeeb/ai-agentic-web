import React from 'react';
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
      <HealthInsuranceCard />

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

      {/* Footer can be added here in the future */}
    </div>
  );
}

