import React from 'react'
import { ChevronDown, Search, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'

type SasoHeaderProps = {
  showBreadcrumb?: boolean
  breadcrumb?: string[]
}

const navItems = [
  { label: 'About SASO' },
  { label: 'Sectors' },
  { label: 'Regulations' },
  { label: 'Consumer Awareness' },
  { label: 'Media Center' },
  { label: 'Subsites' },
  { label: 'E-Services', href: '/saso/services' },
  { label: 'Join Us' }
]

export function SasoHeader({ showBreadcrumb = false, breadcrumb = [] }: SasoHeaderProps) {
  return (
    <header dir="rtl" className="w-full border-t border-[#3A3A3A] bg-white">
      <div className="bg-[#F1F3F4] text-[#1A1A1A] text-sm">
        <div className="mx-auto max-w-[1320px] px-6 py-2 flex items-center justify-end gap-2">
          <span className="inline-flex h-4 w-6 items-center justify-center rounded bg-[#0E8A5B] text-[10px] text-white">SA</span>
          <span>Official government website of Saudi Arabia</span>
          <span className="text-[#0E8A5B] inline-flex items-center gap-1">Verify <ChevronDown size={14} /></span>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-8 text-[17px] font-semibold text-[#1E1E1E]">
          {navItems.map((item) =>
            item.href ? (
              <Link key={item.label} to={item.href} className="inline-flex items-center gap-1 hover:text-[#0E8A5B] transition-colors">
                <span>{item.label}</span>
              </Link>
            ) : (
              <button key={item.label} className="inline-flex items-center gap-1 hover:text-[#0E8A5B] transition-colors">
                <span>{item.label}</span>
                {item.label !== 'Join Us' ? <ChevronDown size={14} /> : null}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-6">
          <button className="text-[#1E1E1E] hover:text-[#0E8A5B]">
            <Search size={24} />
          </button>
          <button className="inline-flex items-center gap-2 text-[30px] text-[#1E1E1E] font-semibold">
            <Languages size={24} />
            <span className="text-xl">English</span>
          </button>
          <Link to="/saso" className="text-right leading-tight">
            <div className="text-[#6D6F73] text-sm">Saudi Standards Authority</div>
            <div className="text-[#2F3134] text-[32px] font-semibold">Saudi Standards</div>
          </Link>
        </div>
      </div>

      {showBreadcrumb ? (
        <div className="bg-[#F5FAF8] border-t border-[#E7ECE9]">
          <div className="mx-auto max-w-[1320px] px-6 py-4 text-[#98A2B3] text-sm">
            {breadcrumb.join('  >  ')}
          </div>
        </div>
      ) : null}
    </header>
  )
}
