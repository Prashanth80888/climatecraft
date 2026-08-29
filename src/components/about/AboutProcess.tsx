import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  Hammer,
  Shirt,
  Truck,
  ArrowRight,
} from 'lucide-react'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    step: '01',
    label: 'Consult & Design',
    title: 'Specify Specifications',
    copy: 'We start with your brief — defining operational mechanics, exact dimensions, curated fabric directions from our archive, and production volume.',
    icon: Sliders,
    highlights: [
      'Bespoke Sizing',
      'Fabric Archival Selection',
      'Mechanism Briefing',
    ],
  },
  {
    step: '02',
    label: 'Engineering',
    title: 'Build & Frame Testing',
    copy: 'The quiet glide motor and climate modules are assembled and stress-tested. A hand-jointed hardwood frame is then crafted around the core mechanism.',
    icon: Hammer,
    highlights: [
      'Hardwood Joinery',
      'Motor Calibration',
      'Thermal Testing',
    ],
  },
  {
    step: '03',
    label: 'Craftsmanship',
    title: 'Upholster & Tension',
    copy: 'Hand-tied, zone-tensioned suspension systems are dressed carefully by master upholsterers using specified premium textiles.',
    icon: Shirt,
    highlights: [
      'Zone-Tensioned Comfort',
      'Hand Upholstery',
      'Quality Audit',
    ],
  },
  {
    step: '04',
    label: 'Fulfillment',
    title: 'Crate & Deliver',
    copy: 'Every piece is custom-crated in protective museum-grade casing and shipped directly to your residential site or warehouse destination.',
    icon: Truck,
    highlights: [
      'Custom White-Glove Crating',
      'Worldwide Logistics',
      'On-Site Setup Guidance',
    ],
  },
]

export function AboutProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.6', 'end 0.4'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const computedIndex = Math.min(
      STEPS.length - 1,
      Math.floor(latest * STEPS.length),
    )

    setActiveStep(computedIndex)
  })

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      <SectionAtmosphere variant="radial" />

      {/* Main Ambient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[850px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35] blur-[150px]"
        style={{
          background:
            'radial-gradient(ellipse, #169B9A 0%, #063B3D 50%, transparent 75%)',
        }}
      />

      {/* Gold Ambient Glow */}
      <div
        className="pointer-events-none absolute right-10 bottom-1/4 h-[350px] w-[350px] opacity-[0.18] blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      {/* Glass Atmosphere */}
      <div
        className="pointer-events-none absolute right-[8%] top-[38%] h-[300px] w-[300px] rounded-full opacity-[0.16] blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* SECTION HEADING */}
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse text-gold-600" />

            <SectionLabel>
              Process Architecture
            </SectionLabel>
          </div>

          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#063B3D] sm:text-5xl lg:text-6xl">
            From mechanism{' '}
            <span className="italic font-normal text-teal-700">
              to made.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-[16px] font-normal leading-relaxed text-ink-700">
            A transparent four-phase journey uniting precision thermal
            engineering with traditional European furniture artistry.
          </p>
        </Reveal>

        {/* MAIN GRID */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT — INTERACTIVE TIMELINE */}
          <div className="relative lg:col-span-5">

            {/* Connecting Track */}
            <div className="absolute bottom-8 left-6 top-8 w-0.5 bg-[#063B3D]/15" />

            {/* Animated Track */}
            <motion.div
              className="absolute left-6 top-8 w-0.5 origin-top bg-gradient-to-b from-[#063B3D] via-[#169B9A] to-gold-500 shadow-[0_0_12px_rgba(22,155,154,0.8)]"
              style={{
                height: 'calc(100% - 64px)',
                scaleY: scrollYProgress,
              }}
            />

            <div className="space-y-6">
              {STEPS.map((s, i) => {
                const isActive = i === activeStep
                const isPassed = i < activeStep
                const IconComponent = s.icon

                return (
                  <motion.div
                    key={s.step}
                    onClick={() => setActiveStep(i)}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative flex cursor-pointer items-start gap-5 rounded-2xl p-4 transition-all duration-300 ${
                      isActive
                        ? 'border border-gold-400/50 bg-white/65 shadow-[0_10px_35px_-12px_rgba(6,59,61,0.18)] backdrop-blur-xl'
                        : 'border border-white/20 bg-white/25 backdrop-blur-md hover:border-white/40 hover:bg-white/50'
                    }`}
                  >
                    {/* Step Node */}
                    <div
                      className={`relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-xl font-display text-sm font-bold shadow-md transition-all duration-300 ${
                        isActive
                          ? 'scale-110 bg-[#063B3D] text-white shadow-[#063B3D]/30'
                          : isPassed
                            ? 'bg-teal-700 text-white'
                            : 'border border-[#063B3D]/15 bg-white/70 text-[#063B3D]'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-5 w-5 text-gold-400" />
                      ) : (
                        <IconComponent className="h-5 w-5" />
                      )}
                    </div>

                    {/* Step Summary */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">

                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A741D]">
                          Phase {s.step}
                        </span>

                        {isActive && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#063B3D] backdrop-blur-md">
                            Viewing
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1 font-display text-lg font-semibold text-[#064B4D]">
                        {s.title}
                      </h3>

                      <p className="mt-0.5 text-xs font-medium text-[#557071]">
                        {s.label}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — GLASS DETAIL CARD */}
          <div className="relative lg:col-span-7">

            {/* Behind Card Glow */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-[45px] opacity-30 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle at 70% 30%, rgba(22,155,154,0.38), transparent 55%), radial-gradient(circle at 30% 80%, rgba(212,175,55,0.18), transparent 50%)',
              }}
            />

            <AnimatePresence mode="wait">
              {STEPS.map((s, i) => {
                if (i !== activeStep) return null

                return (
                  <motion.div
                    key={s.step}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: easeOut,
                    }}
                    className="group relative overflow-hidden rounded-[30px] border border-white/65 bg-white/30 p-8 shadow-[0_30px_80px_-25px_rgba(6,59,61,0.28)] backdrop-blur-[28px] backdrop-saturate-150 sm:p-10"
                  >

                    {/* Glass Inner Border */}
                    <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-white/40" />

                    {/* Glass Reflection */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/40 to-transparent opacity-80" />

                    {/* Teal Internal Glow */}
                    <div
                      className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
                      style={{
                        background:
                          'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
                      }}
                    />

                    {/* Gold Internal Glow */}
                    <div
                      className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full opacity-15 blur-3xl"
                      style={{
                        background:
                          'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                      }}
                    />

                    {/* Top Accent */}
                    <div className="absolute inset-x-6 top-0 h-[2px] overflow-hidden rounded-full">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{
                          duration: 0.8,
                          ease: easeOut,
                        }}
                        className="h-full w-full bg-gradient-to-r from-transparent via-[#169B9A] to-gold-400 shadow-[0_0_14px_rgba(22,155,154,0.7)]"
                      />
                    </div>

                    {/* CARD HEADER */}
                    <div className="relative z-10 flex items-center justify-between">

                      {/* White Phase Label */}
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                        {s.label}
                      </span>

                      {/* Step Number */}
                      <span className="font-display text-4xl font-bold italic text-white/25">
                        #{s.step}
                      </span>
                    </div>

                    {/* MAIN TITLE — WHITE */}
                    <h3 className="relative z-10 mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {s.title}
                    </h3>

                    {/* DESCRIPTION — SOFT WHITE */}
                    <p className="relative z-10 mt-4 max-w-2xl text-[16px] font-normal leading-relaxed text-white/90">
                      {s.copy}
                    </p>

                    {/* HIGHLIGHTS */}
                    <div className="relative z-10 mt-8 border-t border-white/30 pt-6">

                      {/* Heading — WHITE */}
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                        Phase Highlights & Deliverables
                      </h4>

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {s.highlights.map((item) => (
                          <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-[#063B3D]/30 px-3.5 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-[#063B3D]/45"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-teal-200" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ACTION FOOTER */}
                    <div className="relative z-10 mt-10 flex items-center justify-between gap-4 rounded-2xl border border-white/30 bg-[#063B3D]/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl sm:p-5">

                      {/* Footer Text — WHITE */}
                      <span className="text-xs font-medium text-white/85">
                        Need custom specifications for your project?
                      </span>

                      {/* Gold CTA */}
                      <a
                        href="mailto:contact@climatecraft.com"
                        className="group/link inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300 transition-colors hover:text-white"
                      >
                        <span>Inquire Now</span>

                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    </div>

                    {/* Bottom Glass Highlight */}
                    <div className="pointer-events-none absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}