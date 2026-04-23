import React from 'react'
import { ArrowLeft, BookOpenText, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'
import { sasoRegulations } from '../data/sasoRegulations'

export default function SasoRegulations() {
  React.useEffect(() => {
    document.title = 'الأنظمة واللوائح | SASO Demo'
  }, [])

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F6F7F8]" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['الأنظمة واللوائح', 'الأنظمة واللوائح التنفيذية']} />

      <main className="mx-auto max-w-[1320px] px-6 py-10">
        <section className="rounded-[28px] bg-white border border-[#E4E7EC] p-8 md:p-12 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] px-4 py-2 text-[#18794E] text-sm font-semibold">
            <BookOpenText size={18} />
            مرجع تشريعي داخل تجربة SASO
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1F2A37] mt-5">الأنظمة واللوائح التنفيذية</h1>
          <p className="text-lg text-[#475467] mt-4 max-w-3xl leading-8">
            تتضمن هذه الصفحات ملخصات عملية لأربع صفحات رسمية من موقع الهيئة السعودية للمواصفات والمقاييس والجودة، بحيث يستطيع الزائر والوكيل الصوتي الرجوع إليها بسرعة داخل العرض التجريبي.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sasoRegulations.map((regulation) => (
            <article key={regulation.slug} className="rounded-[24px] border border-[#D8DEE4] bg-white p-7 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#667085]">{regulation.status}</p>
                  <h2 className="text-2xl font-semibold text-[#1F2A37] mt-2 leading-10">{regulation.title}</h2>
                </div>
                <div className="rounded-full bg-[#EAF7EF] text-[#168552] h-14 w-14 inline-flex items-center justify-center shrink-0">
                  <BookOpenText size={28} />
                </div>
              </div>

              <p className="text-[#475467] leading-8 mt-4">{regulation.subtitle}</p>

              <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-[#475467]">
                <div className="rounded-2xl bg-[#F8FAFC] p-4">
                  <p className="text-[#98A2B3] mb-1">تاريخ الإصدار</p>
                  <p className="font-semibold text-[#1F2A37]">{regulation.issuedAt}</p>
                </div>
                <div className="rounded-2xl bg-[#F8FAFC] p-4">
                  <p className="text-[#98A2B3] mb-1">تاريخ النشر</p>
                  <p className="font-semibold text-[#1F2A37]">{regulation.publishedAt}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => navigate(`/saso/regulations/${regulation.slug}`)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1B8354] px-5 py-3 text-white font-medium hover:bg-[#156b45]"
                >
                  فتح الصفحة
                  <ArrowLeft size={18} />
                </button>
                <a
                  href={regulation.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] px-5 py-3 text-[#344054] font-medium hover:bg-[#F9FAFB]"
                >
                  الصفحة الرسمية
                  <ExternalLink size={18} />
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <SasoFloatingActions />
    </div>
  )
}
