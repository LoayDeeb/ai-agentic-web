import React from 'react'
import { Flame, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'About GASCO' },
  { label: 'Safety Center' },
  { label: 'Customer Care' },
  { label: 'Business' },
  { label: 'E-Services', href: '/gasco/services' }
]

type GascoHeaderProps = {
  breadcrumb?: string[]
}

export function GascoHeader({ breadcrumb = [] }: GascoHeaderProps) {
  return (
    <header className="bg-[#0F172A] text-white" dir="rtl">
      <div className="mx-auto max-w-[1340px] px-6 py-4 flex items-center justify-between border-b border-white/15">
        <div className="inline-flex items-center gap-3">
          <span className="h-11 w-11 rounded-xl bg-[#F97316] inline-flex items-center justify-center">
            <Flame size={24} />
          </span>
          <Link to="/gasco" className="leading-tight">
            <div className="text-xs uppercase text-[#FDBA74] tracking-widest">National Gas</div>
            <div className="text-2xl font-bold">GASCO Demo</div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) =>
            item.href ? (
              <Link key={item.label} to={item.href} className="text-white/90 hover:text-[#FDBA74] transition-colors">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} className="text-white/90 hover:text-[#FDBA74] transition-colors">
                {item.label}
              </button>
            )
          )}
        </div>

        <div className="inline-flex items-center gap-3">
          <button className="h-10 w-10 rounded-lg border border-white/20 inline-flex items-center justify-center hover:bg-white/10">
            <Search size={18} />
          </button>
          <button className="h-10 w-10 rounded-lg border border-white/20 inline-flex items-center justify-center hover:bg-white/10 lg:hidden">
            <Menu size={18} />
          </button>
        </div>
      </div>

      {breadcrumb.length > 0 ? (
        <div className="mx-auto max-w-[1340px] px-6 py-3 text-sm text-white/65">
          {breadcrumb.join(' / ')}
        </div>
      ) : null}
    </header>
  )
}
