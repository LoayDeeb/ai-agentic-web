import React from 'react'
import { Accessibility, MessageCircleQuestion, PhoneCall } from 'lucide-react'

export function GascoFloatingActions() {
  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 items-end">
      <button className="h-14 w-14 rounded-xl bg-[#0F172A] text-white inline-flex items-center justify-center shadow-lg">
        <MessageCircleQuestion size={24} />
      </button>
      <button className="h-14 w-14 rounded-xl bg-[#EA580C] text-white inline-flex items-center justify-center shadow-lg">
        <Accessibility size={24} />
      </button>
      <button className="h-14 w-14 rounded-xl bg-[#16A34A] text-white inline-flex items-center justify-center shadow-lg">
        <PhoneCall size={24} />
      </button>
    </div>
  )
}
