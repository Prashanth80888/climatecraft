import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2, Sliders, Hammer, Shirt, Truck, ArrowRight } from 'lucide-react'
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
    highlights: ['Bespoke Sizing', 'Fabric Archival Selection', 'Mechanism Briefing'],
  },
  {
    step: '02',
    label: 'Engineering',
    title: 'Build & Frame Testing',
    copy: 'The quiet glide motor and climate modules are assembled and stress-tested. A hand-jointed hardwood frame is then crafted around the core mechanism.',
    icon: Hammer,
    highlights: ['Hardwood Joinery', 'Motor Calibration', 'Thermal Testing'],
  },
  {
    step: '03',
    label: 'Craftsmanship',
    title: 'Upholster & Tension',
    copy: 'Hand-tied, zone-tensioned suspension systems are dressed carefully by master upholsterers using specified premium textiles.',
    icon: Shirt,
    highlights: ['Zone-Tensioned Comfort', 'Hand Upholstery', 'Quality Audit'],
  },
  {
    step: '04',
    label: 'Fulfillment',
    title: 'Crate & Deliver',
    copy: 'Every piece is custom-crated in protective museum-grade casing and shipped directly to your residential site or warehouse destination.',
    icon: Truck,
    highlights: ['Custom White-Glove Crating', 'Worldwide Logistics', 'On-Site Setup Guidance'],
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
    const computedIndex = Math.min(STEPS.length - 1, Math.floor(latest * STEPS.length))
    setActiveStep(computedIndex)
  })

  return (
    <section id="process" ref={containerRef} className="relative bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="radial" />

      {/* Layered Ambient Glow Effects */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[850px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35] blur-[150px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, #063B3D 50%, transparent 75%)' }}
      />
      <div
        className="pointer-events-none absolute right-10 bottom-1/4 h-[350px] w-[350px] opacity-[0.18] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Heading Header */}
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-600 animate-pulse" />
            <SectionLabel>Process Architecture</SectionLabel>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#063B3D] sm:text-5xl lg:text-6xl">
            From mechanism <span className="italic font-normal text-teal-700">to made.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[16px] font-normal leading-relaxed text-ink-700">
            A transparent four-phase journey uniting precision thermal engineering with traditional European furniture artistry.
          </p>
        </Reveal>

        {/* Main Grid: Left Navigation / Right Active Card Detail */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Side: Interactive Stepper Timeline */}
          <div className="relative lg:col-span-5">
            {/* Connecting Vertical Track Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#063B3D]/15" />

            {/* Animated Active Track Progress Bar */}
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
                    className={`group relative flex cursor-pointer items-start gap-5 rounded-2xl p-4 transition-all duration-300 ${isActive
                        ? 'bg-white/90 shadow-[0_10px_30px_-10px_rgba(6,59,61,0.15)] backdrop-blur-xl border border-gold-400/50'
                        : 'bg-white/40 hover:bg-white/70 backdrop-blur-md border border-transparent'
                      }`}
                  >
                    {/* Step Node Marker Icon */}
                    <div
                      className={`relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-xl font-display text-sm font-bold shadow-md transition-all duration-300 ${isActive
                          ? 'bg-[#063B3D] text-white shadow-[#063B3D]/30 scale-110'
                          : isPassed
                            ? 'bg-teal-700 text-white'
                            : 'bg-white/80 text-[#063B3D] border border-[#063B3D]/15'
                        }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-5 w-5 text-gold-400" />
                      ) : (
                        <IconComponent className="h-5 w-5" />
                      )}
                    </div>

                    {/* Step Title Summary */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-700">
                          Phase {s.step}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#063B3D]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#063B3D]">
                            Viewing
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-semibold text-[#063B3D]">
                        {s.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-ink-700/80 font-medium">
                        {s.label}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Side: Detailed Glassmorphism Spec Sheet Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {STEPS.map((s, i) => {
                if (i !== activeStep) return null

                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-8 shadow-[0_25px_60px_-15px_rgba(6,59,61,0.18)] backdrop-blur-2xl sm:p-10"
                  >
                    {/* Glowing Accent Top Line */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#063B3D] via-[#169B9A] to-gold-400" />

                    {/* Header Tag & Step Number */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
                        <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                        {s.label}
                      </span>
                      <span className="font-display text-4xl font-bold italic text-[#063B3D]/20">
                        #{s.step}
                      </span>
                    </div>

                    {/* Card Main Title */}
                    <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-[#063B3D] sm:text-4xl">
                      {s.title}
                    </h3>

                    {/* Extended Description */}
                    <p className="mt-4 text-[16px] font-normal leading-relaxed text-ink-700">
                      {s.copy}
                    </p>

                    {/* Key Deliverables Bullet Pills */}
                    <div className="mt-8 border-t border-[#063B3D]/10 pt-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#063B3D]">
                        Phase Highlights & Deliverables
                      </h4>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {s.highlights.map((item) => (
                          <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-xl border border-[#063B3D]/15 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#063B3D] shadow-2xs"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer Callout */}
                    <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#063B3D]/5 p-4 sm:p-5">
                      <span className="text-xs font-medium text-[#063B3D]">
                        Need custom specifications for your project?
                      </span>
                      <a
                        href={`mailto:contact@climatecraft.com`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 transition-colors hover:text-[#063B3D]"
                      >
                        <span>Inquire Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
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