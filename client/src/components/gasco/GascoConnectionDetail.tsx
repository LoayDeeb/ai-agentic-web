import React, { useState } from 'react'
import { Clock3, ShieldCheck, WalletCards, Home, FileText, ExternalLink } from 'lucide-react'

const sideInfo = [
  { icon: Home, label: 'Beneficiaries', value: 'Home Owners / Tenants' },
  { icon: Clock3, label: 'Processing Time', value: 'Up to 2 working days' },
  { icon: WalletCards, label: 'Service Cost', value: 'Calculated per property type' },
  { icon: ShieldCheck, label: 'Safety Requirement', value: 'Mandatory site inspection' }
]

const tabs = ['Requirements', 'Execution Steps', 'Attachments']

export function GascoConnectionDetail() {
  const [activeTab, setActiveTab] = useState('Requirements')

  return (
    <section className="bg-white pb-20" dir="rtl">
      <div className="bg-gradient-to-b from-[#FFF7ED] to-white border-b border-[#FFEDD5]">
        <div className="mx-auto max-w-[1340px] px-6 py-14">
          <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
            <aside className="rounded-2xl border border-[#FED7AA] bg-white p-6">
              <ul className="space-y-6">
                {sideInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="space-y-1">
                      <div className="text-sm text-[#9A3412] inline-flex items-center gap-2">
                        <Icon size={16} />
                        {item.label}
                      </div>
                      <div className="font-semibold text-[#1E293B]">{item.value}</div>
                    </li>
                  )
                })}
              </ul>
            </aside>

            <div>
              <button className="rounded-xl bg-[#F97316] px-5 py-2.5 text-white font-semibold hover:bg-[#EA580C]">
                Start Service
              </button>
              <h1 className="mt-5 text-4xl font-black text-[#111827]">New Gas Connection Request</h1>
              <p className="mt-4 text-[#334155] text-lg leading-8 max-w-[840px]">
                Submit a new residential gas connection request, select your preferred inspection slot, and track activation status from request to completion.
              </p>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#111827]">User Guide</h2>
                <a href="#" className="mt-2 inline-flex items-center gap-2 text-[#EA580C] font-semibold">
                  <ExternalLink size={16} />
                  Service Level Agreement
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1340px] px-6 pt-10">
        <div className="flex items-center justify-end gap-8 border-b border-[#E2E8F0] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-lg font-semibold ${activeTab === tab ? 'text-[#111827] border-b-4 border-[#F97316]' : 'text-[#64748B]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Requirements' ? (
          <ul className="list-disc pr-5 text-[#334155] leading-8">
            <li>Valid national identity or resident ID.</li>
            <li>Property ownership or tenancy contract.</li>
            <li>Approved internal gas network readiness report.</li>
          </ul>
        ) : null}

        {activeTab === 'Execution Steps' ? (
          <ol className="list-decimal pr-5 text-[#334155] leading-8">
            <li>Select Start Service and fill request details.</li>
            <li>Book a site safety inspection appointment.</li>
            <li>Receive compliance check result and activation notice.</li>
          </ol>
        ) : null}

        {activeTab === 'Attachments' ? (
          <div className="rounded-xl border border-[#E2E8F0] p-6 max-w-[620px] text-[#334155] inline-flex items-center gap-3">
            <FileText size={18} className="text-[#EA580C]" />
            No attachments uploaded yet.
          </div>
        ) : null}
      </div>
    </section>
  )
}
