import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { APPLICATIONS } from '../../data/projects'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ApplicationsSection() {
  return (
    <section
      id="applications"
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute -left-32 top-[15%] h-[420px] w-[520px] opacity-[0.14] blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 68%)',
        }}
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-[5%] h-[360px] w-[420px] opacity-[0.08] blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-start lg:gap-20">

          {/* =========================================================
              LEFT — INTRODUCTION
          ========================================================== */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">

              <Reveal>
                <SectionLabel>Applications</SectionLabel>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-4 max-w-sm font-display text-2xl font-normal leading-[1.08] text-cream-100 sm:mt-5 sm:text-3xl lg:text-4xl lg:text-[2.8rem]">
                  Where intelligent seating{' '}
                  <span className="italic text-teal-700">
                    belongs.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 max-w-sm text-[14px] leading-[1.75] text-cream-200 sm:mt-6 sm:text-[15px]">
                  Climate Craft projects span residential, hospitality and
                  dedicated entertainment spaces — anywhere comfort,
                  technology and design converge.
                </p>
              </Reveal>

              {/* Decorative divider */}
              <Reveal delay={0.2}>
                <div className="mt-9 flex items-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-gold-400 to-teal-700" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream-200/60">
                    Designed around the room
                  </span>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.26} className="mt-7 sm:mt-9">
                <a
                  href="/case-studies"
                  onClick={(event) => {
                    /*
                     * Prevent the browser from doing a hard navigation.
                     * This keeps the interaction feeling like part of the
                     * existing application.
                     */
                    if (
                      window.location.pathname !== '/case-studies'
                    ) {
                      event.preventDefault()
                      window.history.pushState({}, '', '/case-studies')
                      window.dispatchEvent(new PopStateEvent('popstate'))
                    }
                  }}
                  className="group inline-flex items-center gap-3 rounded-full border border-teal-700/25 bg-white/40 px-5 py-3 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-teal-700/60 hover:bg-white/70"
                >
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                    View All Case Studies
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-700/10 transition-all duration-500 group-hover:bg-teal-700">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-700 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white" />
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* =========================================================
              RIGHT — APPLICATION CARDS
          ========================================================== */}
          <div className="lg:col-span-8">

            <Reveal delay={0.05}>
              <div className="mb-7 flex items-end justify-between gap-6">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal-700/70">
                    Spaces &amp; Applications
                  </span>

                  <div className="mt-2 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                </div>

                <span className="hidden text-[10px] uppercase tracking-[0.18em] text-cream-200/45 sm:block">
                  {String(APPLICATIONS.length).padStart(2, '0')} applications
                </span>
              </div>
            </Reveal>

            <RevealGroup stagger={0.07}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {APPLICATIONS.map((application, index) => (
                  <RevealItem key={application.id}>
                    <ApplicationCard
                      application={application}
                      index={index}
                    />
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ===============================================================
   APPLICATION CARD
================================================================ */

function ApplicationCard({
  application,
  index,
}: {
  application: (typeof APPLICATIONS)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.04,
        ease: easeOut,
      }}
      whileHover={{ y: -5 }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[18px] border border-[#063B3D]/10 bg-white/35 p-5 backdrop-blur-xl transition-all duration-500 sm:rounded-[22px] sm:p-6 md:p-7 hover:border-teal-700/30 hover:bg-white/55 hover:shadow-[0_20px_50px_-25px_rgba(6,59,61,0.25)]">

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background:
              'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
          }}
        />

        {/* Top row */}
        <div className="relative flex items-center justify-between">
          <span className="font-display text-sm tabular-nums text-gold-700/80 transition-colors duration-500 group-hover:text-gold-700">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="h-2 w-2 rounded-full border border-teal-700/40 bg-teal-700/10 transition-all duration-500 group-hover:scale-125 group-hover:bg-teal-700" />
        </div>

        {/* Main title */}
        <div className="relative mt-7">
          <h3 className="font-display text-lg font-normal leading-tight text-[#063B3D] transition-transform duration-500 group-hover:translate-x-1 sm:text-[21px] md:text-[23px]">
            {application.label}
          </h3>

          {/* Animated underline */}
          <div className="mt-5 h-px w-full overflow-hidden bg-[#063B3D]/8">
            <motion.div
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-teal-700 to-transparent group-hover:scale-x-100"
              transition={{
                duration: 0.6,
                ease: easeOut,
              }}
            />
          </div>
        </div>

        {/* Bottom visual indicator */}
        <div className="relative mt-5 flex items-center justify-between">
          <span className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-ink-900/40 transition-colors duration-500 group-hover:text-teal-700/70">
            Climate Craft
          </span>

          <span className="h-1 w-8 overflow-hidden rounded-full bg-[#063B3D]/8">
            <span className="block h-full w-2 origin-left rounded-full bg-teal-700 transition-all duration-500 group-hover:w-full" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}