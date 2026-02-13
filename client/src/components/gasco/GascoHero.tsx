import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShieldCheck, TimerReset } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickStats = [
  { icon: TimerReset, label: 'Average Appointment Time', value: '2 Days' },
  { icon: ShieldCheck, label: 'Safety Compliance', value: '99.8%' },
  { icon: CheckCircle2, label: 'Requests Completed', value: '120K+' }
]

export function GascoHero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-[#111827] text-white" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(249,115,22,0.35),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.22),transparent_45%)]" />
      <div className="mx-auto max-w-[1340px] px-6 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide bg-[#F97316]/20 text-[#FDBA74] border border-[#F97316]/45">
              SMART ENERGY SERVICES
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
              Residential Gas Connection
              <br />
              Fast and Safe Activation
            </h1>
            <p className="mt-5 text-white/80 text-lg leading-8 max-w-[680px]">
              Track your connection request, book on-site safety inspection, and complete activation from one unified experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/gasco/service/new-connection')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-semibold hover:bg-[#EA580C] transition-colors"
              >
                Start New Connection
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => navigate('/gasco/services')}
                className="rounded-xl border border-white/25 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                View E-Services
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80"
              alt="Gas control center"
              className="h-[280px] w-full object-cover rounded-xl"
            />
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {quickStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="rounded-xl bg-[#0B1220] border border-white/10 p-3">
                    <Icon size={17} className="text-[#FDBA74]" />
                    <div className="mt-2 text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/65">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
