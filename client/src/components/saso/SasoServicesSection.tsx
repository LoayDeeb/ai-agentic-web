import React, { useState } from 'react'
import { CarFront, CalendarDays, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tabs = ['المستهلك', 'التاجر', 'المنشآت الصغيرة والمتوسطة']

const cards = [
  { title: 'فحص المركبات المستوردة', icon: CarFront, to: '/saso/service/imported-vehicles' },
  { title: 'التحقق من حالة الفحص الفني الدوري', icon: CarFront, to: '/saso/service/imported-vehicles' },
  { title: 'طلب إشعار استعلام كفاءة الطاقة للمركبات', icon: CarFront, to: '/saso/service/imported-vehicles' },
  { title: 'حجز موعد إلكتروني', icon: CalendarDays, to: '/saso/service/imported-vehicles' }
]

export function SasoServicesSection() {
  const [activeTab, setActiveTab] = useState('المستهلك')
  const navigate = useNavigate()

  return (
    <section dir="rtl" className="bg-[#F6F7F8] py-16 px-6">
      <div className="mx-auto max-w-[1360px]">
        <header className="text-center mb-12">
          <h2 className="text-5xl leading-none font-semibold text-[#44484D]">الخدمات الإلكترونية</h2>
          <p className="text-[#2C2E31] text-3xl mt-4">استكشف الخدمات الإلكترونية الأكثر استخداماً</p>
        </header>

        <div className="mx-auto w-full max-w-[980px] border-b border-[#626A71] mb-10">
          <div className="flex items-end justify-center gap-20">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-2xl leading-none ${activeTab === tab ? 'text-[#2C2E31] border-b-[5px] border-[#1D925A] font-semibold' : 'text-[#4A4E53]/85'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="rounded-[24px] border border-[#D0D5DA] bg-white p-8 min-h-[320px] flex flex-col">
                <div className="h-16 w-16 rounded-full bg-[#EAF7EF] text-[#168552] inline-flex items-center justify-center self-end">
                  <Icon size={34} />
                </div>
                <h3 className="text-3xl leading-[1.35] text-[#43474C] font-semibold mt-10">{card.title}</h3>
                <button
                  onClick={() => navigate(card.to)}
                  className="mt-auto h-14 w-14 rounded-md bg-[#1B8A56] text-white inline-flex items-center justify-center hover:bg-[#146B43]"
                >
                  <ArrowLeft size={30} />
                </button>
              </article>
            )
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-16 py-4 rounded-lg border border-[#CCD2D8] bg-white text-2xl text-[#3A3D42]">جميع الخدمات</button>
        </div>
      </div>
    </section>
  )
}
