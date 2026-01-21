import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Users, Calendar, DollarSign } from 'lucide-react';
import { NavigationHeaderAr } from '../components/ef-ar/NavigationHeaderAr';
import { ProgramHeaderAr } from '../components/ef-ar/ProgramHeaderAr';
import { PROGRAMS_DATA_AR } from '../components/ef-ar/ProgramsGridAr';

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

export default function EFProgramDetailAr() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const program = PROGRAMS_DATA_AR.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">البرنامج غير موجود</h1>
          <button
            onClick={() => navigate('/ef-ar')}
            className="text-[#2C3A82] hover:underline"
          >
            العودة للبرامج
          </button>
        </div>
      </div>
    );
  }

  const eligibilityCriteria = [
    'جهة مسجلة في المملكة العربية السعودية',
    'سجل تجاري أو ترخيص غير ربحي ساري',
    'التزام واضح بالاستدامة البيئية',
    'خطة مشروع واضحة بنتائج قابلة للقياس',
    'استقرار مالي وهيكل حوكمة'
  ];

  const applicationSteps = [
    { step: 1, title: 'تقديم الطلب', description: 'إكمال نموذج الطلب الإلكتروني مع جميع المعلومات المطلوبة' },
    { step: 2, title: 'مراجعة المستندات', description: 'يقوم فريقنا بمراجعة طلبك والمستندات الداعمة' },
    { step: 3, title: 'تقييم اللجنة', description: 'يتم تقييم الطلبات من قبل لجنة المنح' },
    { step: 4, title: 'الموافقة والتمويل', description: 'تحصل المشاريع المعتمدة على التمويل ودعم التنفيذ' }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}>
      <NavigationHeaderAr />
      <ProgramHeaderAr
        title={program.title}
        breadcrumbs={[
          { label: 'صندوق البيئة', href: '/ef-ar' },
          { label: 'البرامج', href: '/ef-ar' },
          { label: program.title, href: '#', active: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2560"
      />

      <main className="max-w-[1350px] mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/ef-ar')}
          className="flex items-center gap-2 text-[#2C3A82] hover:underline mb-8"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للبرامج
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section id="ef-program-overview">
              <h2 className="text-2xl font-bold text-[#2C3A82] mb-4">نظرة عامة على البرنامج</h2>
              <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-gray-800 mb-4 ${getCategoryColor(program.category)}`}>
                {program.category}
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {program.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                هذا البرنامج جزء من استراتيجية صندوق البيئة الشاملة لدعم التنمية المستدامة
                في جميع أنحاء المملكة العربية السعودية. من خلال هذه المبادرة، نهدف إلى تعزيز الابتكار
                وبناء القدرات وخلق أثر بيئي إيجابي دائم.
              </p>
            </section>

            <section id="ef-program-eligibility" className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#2C3A82] mb-6 flex items-center gap-3">
                <Users className="w-6 h-6" />
                معايير الأهلية
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
                عملية التقديم
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
                <h3 className="text-xl font-bold mb-4">حقائق سريعة</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">نسبة التمويل</p>
                      <p className="font-semibold">حتى ١٠٠٪</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">فترة التقديم</p>
                      <p className="font-semibold">على مدار العام</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#BDCD5C]" />
                    <div>
                      <p className="text-sm text-white/70">الفئة المستهدفة</p>
                      <p className="font-semibold">المنظمات والمؤسسات</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/ef-ar/apply/${program.id}`)}
                className="w-full py-4 bg-[#BDCD5C] text-[#2C3A82] rounded-xl font-bold text-lg hover:bg-[#a8b84d] transition-colors"
              >
                قدم الآن
              </button>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-2">تحتاج مساعدة؟</h3>
                <p className="text-sm text-gray-600 mb-4">
                  تواصل مع فريق الدعم للمساعدة في طلبك.
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
