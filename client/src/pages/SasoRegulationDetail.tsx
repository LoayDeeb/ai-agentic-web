import React from 'react'
import { ArrowLeft, CalendarRange, CircleAlert, ExternalLink } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SasoHeader } from '../components/saso/SasoHeader'
import { SasoFloatingActions } from '../components/saso/SasoFloatingActions'
import { sasoRegulationsBySlug } from '../data/sasoRegulations'

export default function SasoRegulationDetail() {
  const { slug } = useParams()
  const regulation = slug ? sasoRegulationsBySlug[slug] : undefined

  React.useEffect(() => {
    if (regulation) {
      document.title = `${regulation.shortTitle} | SASO Demo`
    }
  }, [regulation])

  if (!regulation) {
    return <Navigate to="/saso/regulations" replace />
  }

  return (
    <div className="min-h-screen bg-[#F6F7F8]" dir="rtl" style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif' }}>
      <SasoHeader showBreadcrumb breadcrumb={['الأنظمة واللوائح', 'الأنظمة واللوائح التنفيذية', regulation.shortTitle]} />

      <main className="mx-auto max-w-[1320px] px-6 py-10">
        <section className="rounded-[28px] bg-white border border-[#E4E7EC] p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#475467] mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] px-4 py-2 text-[#18794E] font-semibold">
              <CircleAlert size={16} />
              {regulation.status}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F2F4F7] px-4 py-2">
              <CalendarRange size={16} />
              الإصدار: {regulation.issuedAt}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F2F4F7] px-4 py-2">
              <CalendarRange size={16} />
              النشر: {regulation.publishedAt}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-[#1F2A37] leading-tight">{regulation.title}</h1>
          <p className="text-xl text-[#475467] mt-5 leading-9 max-w-4xl">{regulation.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/saso/regulations"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] px-5 py-3 text-[#344054] font-medium hover:bg-[#F9FAFB]"
            >
              العودة إلى اللوائح
              <ArrowLeft size={18} />
            </Link>
            <a
              href={regulation.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B8354] px-5 py-3 text-white font-medium hover:bg-[#156b45]"
            >
              عرض المصدر الرسمي
              <ExternalLink size={18} />
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr,0.9fr] gap-6 mt-6">
          <article className="rounded-[24px] border border-[#D8DEE4] bg-white p-8">
            <h2 className="text-2xl font-semibold text-[#1F2A37]">ملخص الصفحة</h2>
            <p className="text-[#475467] leading-8 mt-4">{regulation.summary}</p>

            <h3 className="text-xl font-semibold text-[#1F2A37] mt-8">أبرز النقاط</h3>
            <div className="mt-4 space-y-3">
              {regulation.highlights.map((item) => (
                <div key={item} className="rounded-2xl bg-[#F8FAFC] p-5 text-[#344054] leading-8">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[24px] border border-[#D8DEE4] bg-white p-8">
            <h2 className="text-2xl font-semibold text-[#1F2A37]">ما يجب أن يعرفه الوكيل</h2>
            <p className="text-[#667085] leading-8 mt-4">
              هذه النقاط موجزة ومصممة لتغذية إجابات الوكيل الصوتي داخل تجربة SASO عندما يسأل المستخدم عن هذه اللائحة أو يطلب الانتقال لصفحتها.
            </p>
            <div className="mt-5 space-y-3">
              {regulation.agentFacts.map((item) => (
                <div key={item} className="rounded-2xl border border-[#E4E7EC] p-4 text-[#344054] leading-8">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>

      <SasoFloatingActions />
    </div>
  )
}
