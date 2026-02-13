import React from 'react'
import { Plus, Accessibility, MessageCircleQuestion } from 'lucide-react'

export function SasoFloatingActions() {
  return (
    <>
      <button className="fixed bottom-6 left-6 h-16 w-16 rounded-full bg-[#0D8A58] text-white shadow-xl inline-flex items-center justify-center z-40">
        <Plus size={30} />
      </button>

      <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3">
        <button className="h-16 w-16 rounded-lg bg-[#0E8A5B] text-white inline-flex items-center justify-center shadow-lg">
          <Accessibility size={30} />
        </button>
        <button className="h-16 w-16 rounded-lg bg-[#0E8A5B] text-white inline-flex items-center justify-center shadow-lg">
          <MessageCircleQuestion size={30} />
        </button>
      </div>
    </>
  )
}
