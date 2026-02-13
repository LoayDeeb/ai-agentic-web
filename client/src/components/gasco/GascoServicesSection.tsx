import React, { useState } from 'react'
import { ArrowLeft, Flame, ShieldAlert, FileCheck2, Gauge } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tabs = ['Residential', 'Commercial', 'Industrial']

const services = [
  { title: 'New Gas Connection', icon: Flame, to: '/gasco/service/new-connection' },
  { title: 'Safety Inspection Booking', icon: ShieldAlert, to: '/gasco/service/new-connection' },
  { title: 'Connection Compliance Certificate', icon: FileCheck2, to: '/gasco/service/new-connection' },
  { title: 'Usage and Meter Overview', icon: Gauge, to: '/gasco/service/new-connection' }
]

export function GascoServicesSection() {
  const [activeTab, setActiveTab] = useState('Residential')
  const navigate = useNavigate()

  return (
    <section className="bg-[#F8FAFC] py-16 px-6" dir="rtl">
      <div className="mx-auto max-w-[1340px]">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A]">Electronic Services</h2>
          <p className="text-[#334155] mt-4 text-lg">Find the right service for safe and reliable gas connection</p>
        </div>

        <div className="mx-auto max-w-[860px] border-b border-[#CBD5E1] mb-8">
          <div className="flex items-end justify-center gap-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-lg font-semibold ${activeTab === tab ? 'text-[#0F172A] border-b-4 border-[#F97316]' : 'text-[#64748B]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.title} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 min-h-[300px] flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-[#FFF7ED] text-[#EA580C] inline-flex items-center justify-center self-end">
                  <Icon size={26} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-[#1E293B] leading-9">{service.title}</h3>
                <button
                  onClick={() => navigate(service.to)}
                  className="mt-auto h-12 w-12 rounded-md bg-[#0F172A] text-white inline-flex items-center justify-center hover:bg-[#1E293B]"
                >
                  <ArrowLeft size={20} />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
