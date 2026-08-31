import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { WHY_DIFFERENT } from '../../data/projects'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function WhyDifferent() {
  return (
    <section
      id="why-different"
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient atmosphere */}
      <div
        className="pointer-events-none absolute -right-24 top-[5%] h-[520px] w-[520px] rounded-full opacity-[0.12] blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, #53c9c5 35%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute left-[-12%] bottom-[15%] h-[420px] w-[420px] rounded-full opacity-[0.08] blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #169B9A 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header + comparison */}
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — Editorial introduction */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SectionLabel>The Difference</SectionLabel>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-4 max-w-sm font-display text-2xl font-normal leading-[1.08] text-cream-100 sm:mt-5 sm:text-3xl lg:text-4xl lg:text-[2.8rem]">
                  {WHY_DIFFERENT.headline}
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 max-w-sm text-[14px] leading-[1.75] text-cream-200 sm:mt-5 sm:text-[15px]">
                  {WHY_DIFFERENT.subheadline}
                </p>
              </Reveal>

              {/* Legend card */}
              <Reveal delay={0.22} className="mt-9 hidden lg:block">
                <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/[0.34] p-5 shadow-[0_20px_60px_-35px_rgba(6,61,60,0.35)] backdrop-blur-xl">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl"
                    style={{
                      background:
                        'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
                    }}
                  />

                  <span className="relative mb-4 block text-[9px] font-semibold uppercase tracking-[0.22em] text-ink-700/45">
                    A considered comparison
                  </span>

                  <div className="relative flex flex-col gap-3">
                    <LegendItem
                      dotClass="bg-ink-900/25"
                      text="Traditional Premium Seating"
                      muted
                    />
                    <LegendItem
                      dotClass="bg-teal-700 shadow-[0_0_10px_rgba(22,155,154,0.45)]"
                      text="Climate Craft"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* RIGHT — Comparison */}
          <div className="lg:col-span-8">
            {/* Mobile legend */}
            <Reveal delay={0.18} className="mb-7 lg:hidden">
              <div className="flex flex-wrap gap-3">
                <LegendItem
                  dotClass="bg-ink-900/25"
                  text="Traditional Premium Seating"
                  muted
                />
                <LegendItem
                  dotClass="bg-teal-700"
                  text="Climate Craft"
                />
              </div>
            </Reveal>

            {/* Column headings */}
            <Reveal delay={0.1}>
              <div className="mb-3 hidden grid-cols-[1fr_44px_1fr] items-center gap-5 px-5 sm:grid">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-700/45">
                  Traditional
                </span>

                <span />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Climate Craft
                </span>
              </div>
            </Reveal>

            <RevealGroup stagger={0.07}>
              <div className="overflow-hidden rounded-[26px] border border-white/55 bg-white/[0.28] shadow-[0_35px_90px_-50px_rgba(6,61,60,0.42)] backdrop-blur-xl">
                {WHY_DIFFERENT.traditional.map((item, i) => (
                  <RevealItem key={i}>
                    <ComparisonRow
                      index={i}
                      traditional={item}
                      climateCraft={WHY_DIFFERENT.climateCraft[i] || '—'}
                      isLast={i === WHY_DIFFERENT.traditional.length - 1}
                    />
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          </div>
        </div>

        {/* Main differentiator */}
        <Reveal delay={0.1} className="mt-16 lg:mt-24">
          <DifferentiatorCallout />
        </Reveal>
      </div>
    </section>
  )
}

function LegendItem({
  dotClass,
  text,
  muted = false,
}: {
  dotClass: string
  text: string
  muted?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] ${
        muted ? 'text-ink-700/55' : 'text-teal-700'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {text}
    </span>
  )
}

function ComparisonRow({
  index,
  traditional,
  climateCraft,
  isLast,
}: {
  index: number
  traditional: string
  climateCraft: string
  isLast: boolean
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
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.28)' }}
      className={`group relative ${
        !isLast ? 'border-b border-[#063B3D]/[0.08]' : ''
      }`}
    >
      {/* Hover sweep */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top bg-gradient-to-b from-gold-400 via-teal-700 to-transparent"
      />

      <div className="grid grid-cols-1 gap-4 px-4 py-5 sm:grid-cols-[1fr_44px_1fr] sm:items-center sm:gap-5 sm:px-6 sm:py-7">
        {/* Traditional */}
        <div className="relative min-w-0">
          <span className="mb-2 block font-display text-[10px] tracking-[0.16em] text-ink-900/25">
            {String(index + 1).padStart(2, '0')}
          </span>

          <p className="text-[14px] leading-[1.65] text-ink-700/65 line-through decoration-ink-900/15 decoration-1 transition-colors duration-300 group-hover:text-ink-700/80">
            {traditional}
          </p>
        </div>

        {/* Connector */}
        <div className="hidden justify-center sm:flex">
          <motion.span
            whileHover={{ scaleX: 1.3 }}
            className="h-px w-7 bg-gradient-to-r from-ink-900/10 via-gold-400/60 to-teal-700/40"
          />
        </div>

        {/* Climate Craft */}
        <div className="relative flex min-w-0 items-start gap-3 rounded-xl border border-transparent p-1 transition-all duration-300 group-hover:border-teal-700/10 group-hover:bg-white/30">
          <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-teal-700/20 bg-teal-700/[0.08]">
            <Check
              className="h-3.5 w-3.5 text-teal-700"
              strokeWidth={2.5}
            />
          </span>

          <p className="text-[14.5px] font-medium leading-[1.65] text-[#063B3D]">
            {climateCraft}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function DifferentiatorCallout() {
  const features = [
    'Liquid Cooling & Heating',
    '15°C–35°C Range',
    '3 Comfort Zones',
    'Voice Control',
    'Smart Touchscreen',
    'Wireless Remote',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="group relative overflow-hidden rounded-[30px] border border-teal-700/20 bg-white/[0.30] shadow-[0_40px_110px_-55px_rgba(6,61,60,0.5)] backdrop-blur-2xl"
    >
      {/* Atmospheric layers */}
      <div
        className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full opacity-20 blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full opacity-15 blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 70%)',
        }}
      />

      {/* Decorative border */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-white/45" />

      <div className="relative grid gap-8 p-5 sm:gap-10 sm:p-7 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12 lg:p-12">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.06 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-700/20 bg-white/55 text-teal-700 shadow-[0_15px_40px_-20px_rgba(6,61,60,0.5)] backdrop-blur-xl sm:h-[72px] sm:w-[72px]"
        >
          <span className="absolute inset-0 rounded-2xl bg-teal-700/5" />
          <Sparkles className="relative h-6 w-6" strokeWidth={1.6} />
        </motion.div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-teal-700">
              The Climate Craft Advantage
            </span>

            <span className="h-px w-10 bg-gradient-to-r from-teal-700/30 to-transparent" />
          </div>

          <h3 className="mt-3 font-display text-xl font-normal leading-[1.12] text-cream-100 sm:text-2xl lg:text-3xl lg:text-[2.15rem]">
            Personal climate,
            <br />
            <span className="italic text-teal-700">
              engineered into the seat.
            </span>
          </h3>

          <p className="mt-3 max-w-3xl text-[13px] leading-[1.75] text-cream-200 sm:mt-4 sm:text-[14.5px] lg:text-[15px]">
            Traditional seating stops at cushioning and recline. Climate Craft
            continues into intelligent temperature control — liquid-based,
            precisely zoned (15°C–35°C), controlled by voice, touchscreen or
            remote — all integrated so seamlessly the technology disappears
            into the experience.
          </p>

          {/* Feature pills */}
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
            {features.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + i * 0.05,
                  ease: easeOut,
                }}
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2 rounded-full border border-teal-700/20 bg-white/50 px-3.5 py-2 text-[9.5px] font-semibold uppercase tracking-[0.11em] text-teal-700 shadow-[0_8px_20px_-14px_rgba(6,61,60,0.4)] backdrop-blur-md transition-colors duration-300 hover:border-teal-700/40 hover:bg-white/75"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700 shadow-[0_0_7px_rgba(22,155,154,0.45)]" />
                {item}
              </motion.span>
            ))}
          </div>

          {/* Subtle bottom accent */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-gold-400/70 to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-ink-700/45">
              Comfort, engineered differently
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-gold-700/60" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}