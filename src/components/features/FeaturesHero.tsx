import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ['Engineered for', 'how you live.']

interface HeroFeature {
  id: string
  number: string
  title: string
  points: string[]
  markerX: number
  markerY: number
  targetX: number
  targetY: number
}

const HERO_FEATURES: HeroFeature[] = [
  {
    id: 'climate',
    number: '01',
    title: 'Intelligent Climate',
    points: ['15°C – 35°C temperature range', 'Patented liquid cooling & heating'],
    markerX: 88,
    markerY: 22,
    targetX: 50,
    targetY: 38,
  },
  {
    id: 'control',
    number: '02',
    title: 'Smart & Voice Control',
    points: ['Smart touchscreen interface', 'Remote control', 'Voice control'],
    markerX: 88,
    markerY: 38,
    targetX: 19,
    targetY: 44,
  },
  {
    id: 'comfort',
    number: '03',
    title: 'Premium Comfort',
    points: ['Ergonomic cushioning and support', 'Premium 460 GSM upholstery', 'Integrated cup holders'],
    markerX: 88,
    markerY: 54,
    targetX: 50,
    targetY: 55,
  },
  {
    id: 'motion',
    number: '04',
    title: 'Motorized Precision',
    points: ['2 motorized reclining seats', 'Motorized leg-rest adjustment'],
    markerX: 88,
    markerY: 70,
    targetX: 30,
    targetY: 78,
  },
  {
    id: 'warranty',
    number: '05',
    title: '2-Year Warranty',
    points: ['Built for long-term everyday use'],
    markerX: 88,
    markerY: 86,
    targetX: 70,
    targetY: 85,
  },
]

const AUTO_CYCLE_MS = 3800
const RESUME_DELAY_MS = 4200

export function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  // Smooth mouse parallax spring setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25, mass: 0.5 })

  const onFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(px * 16)
    mouseY.set(py * 12)
  }

  const onFrameMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const [activeId, setActiveId] = useState(HERO_FEATURES[0].id)
  const [paused, setPaused] = useState(false)
  const resumeTimeout = useRef<number>()

  const activate = (id: string) => {
    setActiveId(id)
    setPaused(true)
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
  }

  const scheduleResume = () => {
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    resumeTimeout.current = window.setTimeout(() => setPaused(false), RESUME_DELAY_MS)
  }

  useEffect(() => {
    if (paused || prefersReducedMotion) return
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const idx = HERO_FEATURES.findIndex((f) => f.id === current)
        return HERO_FEATURES[(idx + 1) % HERO_FEATURES.length].id
      })
    }, AUTO_CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion])

  const hero = getProductBySlug('climate-craft-grand')!
  const image = homeProductImage(hero.slug)
  const active = HERO_FEATURES.find((f) => f.id === activeId)!

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-transparent px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:pt-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Main Stage Container with Modern Glass Boundary */}
        <div
          onMouseMove={onFrameMouseMove}
          onMouseLeave={onFrameMouseLeave}
          className="group/stage relative h-[70vh] min-h-[540px] w-full overflow-hidden rounded-[32px] border border-white/20 shadow-[0_32px_80px_-20px_rgba(4,38,38,0.25)] backdrop-blur-xl sm:h-[75vh]"
        >
          {/* Background Layer with Parallax & Scrim Gradient Overlays */}
          <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div style={{ x: springX, y: springY }} className="absolute inset-[-4%]">
                <motion.img
                  src={image}
                  alt={hero.name}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: easeOut }}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/stage:scale-[1.02]"
                />
              </motion.div>

              {/* Multi-layered Glass & Dark Vignette Scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042626]/90 via-[#042626]/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#042626]/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(4,38,38,0.4)]" />
            </div>
          </motion.div>

          {/* Floating Climate Controller Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: easeOut }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="pointer-events-auto absolute right-8 top-8 hidden w-[200px] cursor-default rounded-2xl border border-white/30 bg-[#042626]/60 p-4 shadow-[0_20px_50px_-12px_rgba(4,38,38,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl transition-all duration-300 hover:border-white/50 hover:bg-[#042626]/75 sm:block"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-teal-200">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Climate Range
              </span>
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                />
              )}
            </div>
            <div className="mt-2.5 flex items-baseline gap-1.5 font-display">
              <span className="text-2xl italic text-white">15°</span>
              <span className="text-white/60">—</span>
              <span className="text-2xl italic text-teal-300">35°C</span>
            </div>
            <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-black/40 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-amber-300 to-amber-400" />
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ left: ['5%', '95%', '5%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-teal-500 shadow-md"
                />
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[8px] font-semibold uppercase tracking-widest text-white/90">
              <span>Cooling</span>
              <span>Heating</span>
            </div>
          </motion.div>

          {/* Hotspot Connectors & Floating Markers (Desktop Only) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {HERO_FEATURES.map((f, i) => {
                const isActive = f.id === activeId
                return (
                  <motion.line
                    key={f.id}
                    x1={f.markerX}
                    y1={f.markerY}
                    x2={f.targetX}
                    y2={f.targetY}
                    vectorEffect="non-scaling-stroke"
                    stroke={isActive ? 'rgba(245,158,11,0.95)' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={isActive ? 0.6 : 0.25}
                    strokeDasharray={isActive ? 'none' : '1.5 1.5'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: easeOut }}
                  />
                )
              })}
            </svg>

            {/* Glowing Active Target Spotlight Ring */}
            {!prefersReducedMotion && (
              <motion.div
                key={active.id}
                className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  left: `${active.targetX}%`,
                  top: `${active.targetY}%`,
                  background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)',
                }}
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Interactive Feature Hotspot Buttons */}
            {HERO_FEATURES.map((f, i) => {
              const isActive = f.id === activeId
              return (
                <button
                  key={f.id}
                  type="button"
                  style={{ left: `${f.markerX}%`, top: `${f.markerY}%` }}
                  onMouseEnter={() => activate(f.id)}
                  onFocus={() => activate(f.id)}
                  onMouseLeave={scheduleResume}
                  onBlur={scheduleResume}
                  aria-label={`Feature ${f.number}: ${f.title}`}
                  aria-pressed={isActive}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.08, ease: easeOut }}
                    whileHover={{ scale: 1.1 }}
                    className="relative flex items-center"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: 8, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 8, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: easeOut }}
                          className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/40 bg-[#042626]/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl"
                        >
                          {f.title}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Animated Outer Pulse Ring */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-amber-400/60 animate-ping" />
                    )}

                    <motion.span
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        borderColor: isActive ? 'rgba(245,158,11,0.95)' : 'rgba(255,255,255,0.4)',
                        backgroundColor: isActive ? 'rgba(245,158,11,1)' : 'rgba(4,38,38,0.6)',
                        boxShadow: isActive
                          ? '0 0 20px 2px rgba(245,158,11,0.6)'
                          : '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md font-display text-[11px] italic font-semibold"
                      style={{ color: isActive ? '#042626' : '#ffffff' }}
                    >
                      {f.number}
                    </motion.span>
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Hero Main Content Overlay */}
          <motion.div
            style={{ y: contentY }}
            className="pointer-events-none relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14"
          >
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
                className="flex items-center gap-2.5"
              >
                <span className="h-px w-7 bg-amber-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Engineering &amp; Technology
                </span>
              </motion.div>

              <h1 className="mt-4 font-display text-4xl font-normal leading-[1.03] text-white sm:text-6xl lg:text-[4.2rem]">
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: easeOut }}
                      className={`block ${i === 1 ? 'italic text-teal-300' : ''}`}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: easeOut }}
                className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-100"
              >
                Comfort, motorized precision, smart control and climate technology — brought together in a single
                piece of furniture, built to Climate Craft's own standard.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: easeOut }}
                className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#feature-explorer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-teal-400/40 bg-teal-700 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-[0_16px_36px_-12px_rgba(22,155,154,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_24px_48px_-10px_rgba(22,155,154,0.65)] active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
                  <span className="relative z-10">Explore Features</span>
                  <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pointer-events-auto absolute inset-x-0 bottom-5 flex flex-col items-center gap-1.5"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.15 }}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#042626]/50 text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-[#042626]/80"
            >
              <ChevronDown className="h-3.5 w-3.5 text-white" />
            </motion.div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
              Scroll to Discover
            </span>
          </motion.div>
        </div>

        {/* Feature Tap Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: easeOut }}
          className="mt-8 border-t border-slate-700/40 pt-6"
        >
          <div className="flex flex-wrap gap-2.5">
            {HERO_FEATURES.map((f, i) => {
              const isActive = f.id === activeId
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.5 + i * 0.06, ease: easeOut }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    activate(f.id)
                    scheduleResume()
                  }}
                  onMouseEnter={() => activate(f.id)}
                  onMouseLeave={scheduleResume}
                  onFocus={() => activate(f.id)}
                  onBlur={scheduleResume}
                  aria-pressed={isActive}
                  className="relative outline-none"
                >
                  {/* Smooth Active Pill Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeHeroPill"
                      className="absolute inset-0 rounded-full bg-teal-700 shadow-[0_8px_24px_-6px_rgba(22,155,154,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${isActive
                        ? 'border-teal-400 text-white'
                        : 'border-slate-700/60 bg-slate-900/60 text-slate-200 backdrop-blur-md hover:border-slate-500 hover:bg-slate-800/80 hover:text-white'
                      }`}
                  >
                    <span
                      className={`font-display text-[10px] italic ${isActive ? 'text-teal-200' : 'text-amber-400'
                        }`}
                    >
                      {f.number}
                    </span>
                    {f.title}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Active Points Display */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="mt-5 flex flex-wrap gap-x-8 gap-y-2 px-2"
            >
              {active.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[13px] font-medium text-slate-200">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}