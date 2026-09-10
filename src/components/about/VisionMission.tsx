import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock3,
  Layers3,
  Sparkles,
  Target,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const STAGES = [
  {
    label: 'Today',
    title: 'Temperature-controlled recliners',
    description:
      'Our starting point: premium seating that brings active temperature control directly into the personal comfort experience.',
    icon: Target,
    number: '01',
  },
  {
    label: 'Tomorrow',
    title: 'More intelligent seating and comfort products',
    description:
      'The platform can evolve into smarter seating experiences designed around how people relax, work and spend time.',
    icon: Sparkles,
    number: '02',
  },
  {
    label: 'Long Term',
    title:
      'A broader ecosystem of temperature-controlled furniture and personal comfort technology',
    description:
      'A wider ecosystem where intelligent comfort becomes a natural part of furniture and the spaces people use every day.',
    icon: Layers3,
    number: '03',
  },
]

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function VisionMission() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-transparent via-gold-100/20 to-transparent py-20 sm:py-24 lg:py-32">
      {/* Soft atmosphere — decorative only, never affects layout */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-teal-500/[0.045] blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-gold-400/[0.055] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/[0.035] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            {/* Highlighted centered section label */}
            <div className="flex w-full justify-center">
              <div className="inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap rounded-full border border-gold-500/30 bg-gold-400/[0.10] px-5 py-2.5 text-center shadow-[0_10px_30px_-18px_rgba(6,59,61,0.45)]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 sm:text-[13px] lg:text-[14px]">
                  Built for More Than One Type of Comfort
                </span>
              </div>
            </div>

            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#063B3D] sm:text-[2.75rem] lg:text-[52px]">
              The concept can extend{' '}
              <span className="italic font-normal text-teal-700">
                beyond a single product.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-[16px] font-medium leading-7 text-ink-700 sm:text-[17px] sm:leading-7">
              Our initial focus is temperature-controlled recliner seating,
              but the broader opportunity is much larger. We see the potential
              for comfort technology across different environments where
              people spend significant amounts of time seated or resting.
            </p>
          </Reveal>
        </div>

        {/* ROADMAP */}
        <div className="relative mt-14 sm:mt-20 lg:mt-24">
          {/* Desktop connector stays behind the cards only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-8 z-0 hidden h-px bg-gradient-to-r from-teal-600/15 via-gold-500/65 to-teal-600/15 sm:block"
          />

          <RevealGroup className="relative z-10 grid grid-cols-1 items-stretch gap-7 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon

              return (
                <RevealItem key={stage.label} className="h-full">
                  <motion.article
                    whileHover={{ y: -7 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="group relative flex h-full flex-col"
                  >
                    {/* Timeline node */}
                    <div className="relative z-20 mx-auto mb-5 flex h-16 w-16 flex-none items-center justify-center sm:mb-6">
                      <div className="absolute inset-0 rounded-full bg-gold-400/10 blur-xl transition-all duration-500 group-hover:bg-gold-400/20" />

                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/60 bg-[#F8F6EE] shadow-[0_12px_35px_-16px_rgba(6,59,61,0.5)] transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-400">
                        <span className="font-display text-lg font-semibold text-[#063B3D]">
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Stage card */}
                    <div className="relative flex min-h-[350px] flex-1 flex-col overflow-hidden rounded-[26px] border border-[#063B3D]/10 bg-white/65 p-6 shadow-[0_25px_70px_-45px_rgba(6,59,61,0.5)] backdrop-blur-md transition-all duration-500 group-hover:border-teal-700/20 group-hover:bg-white/80 group-hover:shadow-[0_32px_80px_-45px_rgba(6,59,61,0.62)] sm:min-h-[370px] sm:p-7 lg:min-h-[390px] lg:p-8">
                      {/* Card accent */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/70 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-400/[0.08] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-700">
                            <Clock3
                              className="h-3 w-3"
                              strokeWidth={1.8}
                            />
                            {stage.label}
                          </span>

                          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                            Horizon {stage.number}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-teal-700/10 bg-teal-600/[0.055] text-teal-700 transition-all duration-500 group-hover:border-gold-500/25 group-hover:bg-gold-400/15 group-hover:text-[#063B3D]">
                          <Icon
                            className="h-[18px] w-[18px]"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      <h3 className="mt-4 font-display text-[24px] font-normal leading-[1.15] tracking-[-0.01em] text-[#063B3D] sm:text-[26px]">
                        {stage.title}
                      </h3>

                      <p className="mt-4 flex-1 text-[14px] font-medium leading-6 text-ink-600 sm:text-[15px] sm:leading-6">
                        {stage.description}
                      </p>

                      <div className="mt-auto pt-7">
                        <div className="flex items-center gap-3 border-t border-[#063B3D]/[0.08] pt-5">
                          <span className="h-px w-8 bg-gradient-to-r from-teal-600 to-gold-500 transition-all duration-500 group-hover:w-12" />

                          <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-teal-800">
                            Comfort, evolving
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>

        {/* CLOSING STATEMENT
            Kept in normal document flow with generous separation so it
            can never overlap the roadmap cards or the following section. */}
        <Reveal delay={0.15}>
          <div className="relative z-10 mx-auto mt-12 max-w-4xl sm:mt-16 lg:mt-20">
            <div className="relative overflow-hidden rounded-[26px] border border-teal-700/10 bg-[#063B3D]/[0.035] px-6 py-7 text-center sm:px-10 sm:py-8">
              <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-48 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />

              <div className="relative">
                <p className="font-display text-[22px] leading-snug text-[#063B3D] sm:text-[25px]">
                  Our goal is to build the technology and product platform
                  that can make this possible.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-teal-800">
                  <span>One platform</span>

                  <ArrowRight className="h-3.5 w-3.5 flex-none text-gold-600" />

                  <span>Many possibilities</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}