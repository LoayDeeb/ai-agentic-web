import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText, Users, Calendar, DollarSign } from 'lucide-react';
import { NavigationHeader } from '../components/ef/NavigationHeader';
import { ProgramHeader } from '../components/ef/ProgramHeader';
import { PROGRAMS_DATA } from '../components/ef/ProgramsGrid';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Grants':
      return 'bg-[#BDCD5C]';
    case 'Loan Guarantee':
      return 'bg-[#5CBDCD]';
    case 'Loan Support':
      return 'bg-[#CD5C5C]';
    case 'Awards':
      return 'bg-[#CD985C]';
    default:
      return 'bg-[#BDCD5C]';
  }
};

export default function EFProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const program = PROGRAMS_DATA.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Program Not Found</h1>
          <button
            onClick={() => navigate('/ef')}
            className="text-[#2C3A82] hover:underline"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  const eligibilityCriteria = [
    'Registered entity in Saudi Arabia',
    'Valid commercial registration or non-profit license',
    'Demonstrated commitment to environmental sustainability',
    'Clear project plan with measurable outcomes',
    'Financial stability and governance structure'
  ];

  const applicationSteps = [
    { step: 1, title: 'Submit Application', description: 'Complete the online application form with all required information' },
    { step: 2, title: 'Document Review', description: 'Our team reviews your application and supporting documents' },
    { step: 3, title: 'Committee Evaluation', description: 'Applications are evaluated by the grant committee' },
    { step: 4, title: 'Approval & Funding', description: 'Approved projects receive funding and implementation support' }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <NavigationHeader />
      <ProgramHeader
        title={program.title}
        breadcrumbs={[
          { label: 'Environment Fund', href: '/ef' },
          { label: 'Programs', href: '/ef' },
          { label: program.title, href: '#', active: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2560"
      />

      <main className="max-w-[1350px] mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/ef')}
          className="flex items-center gap-2 text-[#2C3A82] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section id="ef-program-overview">
              <h2 className="text-2xl font-bold text-[#2C3A82] mb-4">Program Overview</h2>
              <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-gray-800 mb-4 ${getCategoryColor(program.category)}`}>
                {program.category}
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {program.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                This program is part of the Environment Fund's comprehensive strategy to support sustainable development
                across Saudi Arabia. Through this initiative, we aim to foster innovation, build capacity, and create
                lasting positive environmental impact.
              </p>
            </section>

            <section id="ef-program-eligibility" className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#2C3A82] mb-6 flex items-center gap-3">
                <Users className="w-6 h-6" />
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#BDCD5C] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{criteria}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="ef-program-steps">
              <h2 className="text-2xl font-bold text-[#2C3A82] mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Application Process
              </h2>
              <div className="space-y-6">
                {applicationSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2C3A82] text-white flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#2C3A82] text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">Funding Coverage</p>
                      <p className="font-semibold">Up to 100%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">Application Period</p>
                      <p className="font-semibold">Year-round</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">Target Audience</p>
                      <p className="font-semibold">Organizations & Institutions</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/ef/apply/${program.id}`)}
                className="w-full py-4 bg-[#BDCD5C] text-[#2C3A82] rounded-xl font-bold text-lg hover:bg-[#a8b84d] transition-colors"
              >
                Apply Now
              </button>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for assistance with your application.
                </p>
                <a href="mailto:support@ef.gov.sa" className="text-[#2C3A82] hover:underline text-sm font-medium">
                  support@ef.gov.sa
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
