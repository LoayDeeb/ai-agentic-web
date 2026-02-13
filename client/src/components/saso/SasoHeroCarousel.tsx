import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Slide = {
  id: number
  headline: string
  body: string
  sub: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    headline: 'Service Launch\nLicensing',
    body: 'Saudi Standards announces the launch of licensing services for consultancy offices in the testing and laboratories field, enabling a clear and structured onboarding process.',
    sub: 'For support and licensing requests, contact:\ninfo@saso.gov.sa',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    headline: 'Electronic\nServices',
    body: 'A unified portal for accessing high-demand services through a modern, user-friendly digital experience.',
    sub: 'Start now and explore the most-used services.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'
  }
]

export function SasoHeroCarousel() {
  const [index, setIndex] = useState(0)
  const active = useMemo(() => slides[index], [index])

  const next = () => setIndex((p) => (p + 1) % slides.length)
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length)

  return (
    <section dir="rtl" className="bg-[#065D73] py-8">
      <div className="mx-auto max-w-[1640px] px-6 relative">
        <div className="relative overflow-hidden bg-[#075F75] min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="text-white p-10 lg:p-16 bg-gradient-to-r from-[#06687D] to-[#075F75]">
                <p className="text-4xl lg:text-5xl leading-[1.45] font-semibold whitespace-pre-line mb-10">
                  {active.body}
                </p>
                <p className="text-3xl leading-[1.5] text-[#D9E5EB] whitespace-pre-line">{active.sub}</p>
              </div>

              <div className="relative min-h-[560px]">
                <img src={active.image} alt="SASO service" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0092B7]/55" />
                <div className="absolute inset-0 p-10 lg:p-16 flex items-center justify-start text-white">
                  <h2 className="text-6xl leading-[1.2] font-bold whitespace-pre-line">{active.headline}</h2>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-[#7AA8B5]/70 text-white inline-flex items-center justify-center"
          >
            <ChevronRight size={28} />
          </button>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-[#137D4A]/90 text-white inline-flex items-center justify-center"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                aria-label={`slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-4 w-4 rounded-full ${i === index ? 'bg-[#1D964D]' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
