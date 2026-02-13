import React, { useState } from 'react'
import { Calendar, Computer, HandCoins, Phone, UserRound, Clock3, ExternalLink } from 'lucide-react'

const sideDetails = [
  { icon: UserRound, label: 'Target Audience' },
  { icon: Clock3, label: 'Execution Time' },
  { icon: Computer, label: 'Visitors' },
  { icon: HandCoins, label: 'Service Cost' }
]

const tabs = ['Service Requirements', 'Execution Steps', 'Attachments']

export function SasoAppointmentDetailContent() {
  const [activeTab, setActiveTab] = useState('Service Requirements')

  return (
    <section dir="rtl" className="bg-white pb-20">
      <div className="bg-[#F2F8F6]">
        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[430px_1fr] gap-8 items-start">
            <aside className="rounded-3xl border border-[#D7DEE3] bg-white p-8">
              <ul className="space-y-10">
                {sideDetails.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-center justify-between text-[#4A4F54] text-2xl font-semibold">
                      <Icon size={30} className="text-[#168552]" />
                      <span>{item.label}</span>
                    </li>
                  )
                })}
              </ul>

              <hr className="my-10 border-[#E3E9ED]" />
              <button className="w-full text-xl text-[#168552] inline-flex items-center justify-end gap-2 mb-12">
                <ExternalLink size={24} />
                Frequently Asked Questions
              </button>

              <h3 className="text-3xl text-[#3D4248] font-semibold mb-6">Customer Service</h3>
              <p className="text-2xl text-[#3D4248] inline-flex items-center justify-end gap-3">
                <Phone size={24} className="text-[#168552]" />
                Phone Number
              </p>
            </aside>

            <div className="pr-0 lg:pr-8">
              <button className="mb-8 px-12 py-4 rounded-md bg-[#1B8A56] text-white text-xl hover:bg-[#146B43]">Start Service</button>
              <h1 className="text-6xl leading-[1.2] text-[#41464B] font-bold mb-8">Book Appointment</h1>
              <p className="text-2xl leading-[1.75] text-[#33383D] max-w-[900px] mb-10">
                This service organizes visitor reception processes in a complete and smooth electronic way.
              </p>
              <div className="mb-10">
                <h2 className="text-4xl font-semibold text-[#13171A] mb-3">User Guide</h2>
                <a href="#" className="inline-flex items-center gap-2 text-[#168552] text-xl">
                  <ExternalLink size={24} />
                  Service Level Agreement
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 pt-12">
        <div className="flex items-center justify-end gap-12 border-b border-[#D6DCE2] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-5 text-2xl ${activeTab === tab ? 'text-[#21252A] border-b-[4px] border-[#1B8A56] font-semibold' : 'text-[#4E545B]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Service Requirements' ? (
          <ul className="text-xl leading-[2] text-[#3E444A] pr-5 list-disc">
            <li>Sign in to the unified login platform.</li>
            <li>Select branch and preferred appointment date.</li>
            <li>Confirm details and receive booking notification.</li>
          </ul>
        ) : null}

        {activeTab === 'Execution Steps' ? (
          <ol className="text-xl leading-[2] text-[#3E444A] pr-5 list-decimal">
            <li>Choose Start Service.</li>
            <li>Sign in.</li>
            <li>Select service type and date.</li>
            <li>Confirm booking.</li>
          </ol>
        ) : null}

        {activeTab === 'Attachments' ? (
          <div className="rounded-xl border border-[#D8DEE4] p-8 max-w-[640px]">
            <p className="text-xl text-[#4B5055] inline-flex items-center gap-3">
              <Calendar size={24} className="text-[#168552]" />
              No attachments available
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
