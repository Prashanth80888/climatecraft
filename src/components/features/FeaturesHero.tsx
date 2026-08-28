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
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Thermometer,
  Snowflake,
  Flame,
  Sliders,
  Zap,
  CheckCircle2,
} from 'lucide-react'
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
  zoomScale: number
  zoomOrigin: string
}

const HERO_FEATURES: HeroFeature[] = [
  {
    id: 'climate',
    number: '01',
    title: 'Intelligent Climate',
    points: ['15°C – 35°C temperature range', 'Patented liquid cooling & heating'],
    markerX: 88,
    markerY: 18,
    targetX: 50,
    targetY: 38,
    zoomScale: 1.15,
    zoomOrigin: 'center center',
  },
  {
    id: 'control',
    number: '02',
    title: 'Smart & Voice Control',
    points: ['Smart touchscreen interface', 'Remote control', 'Voice control'],
    markerX: 88,
    markerY: 34,
    targetX: 22,
    targetY: 42,
    zoomScale: 1.25,
    zoomOrigin: '20% 40%',
  },
  {
    id: 'comfort',
    number: '03',
    title: 'Premium Comfort',
    points: ['Ergonomic cushioning and support', 'Premium 460 GSM upholstery', 'Integrated cup holders'],
    markerX: 88,
    markerY: 50,
    targetX: 50,
    targetY: 55,
    zoomScale: 1.2,
    zoomOrigin: '50% 60%',
  },
  {
    id: 'motion',
    number: '04',
    title: 'Motorized Precision',
    points: ['2 motorized reclining seats', 'Motorized leg-rest adjustment'],
    markerX: 88,
    markerY: 66,
    targetX: 32,
    targetY: 76,
    zoomScale: 1.25,
    zoomOrigin: '30% 80%',
  },
  {
    id: 'warranty',
    number: '05',
    title: '2-Year Warranty',
    points: ['Built for long-term everyday use'],
    markerX: 88,
    markerY: 82,
    targetX: 72,
    targetY: 82,
    zoomScale: 1.15,
    zoomOrigin: '70% 80%',
  },
]

const AUTO_CYCLE_MS = 4500
const RESUME_DELAY_MS = 5000

export function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  // Mouse Parallax Physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25, mass: 0.5 })

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
  const [temp, setTemp] = useState(22)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)
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
    if (paused || prefersReducedMotion || isInteractiveMode) return
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const idx = HERO_FEATURES.findIndex((f) => f.id === current)
        return HERO_FEATURES[(idx + 1) % HERO_FEATURES.length].id
      })
    }, AUTO_CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion, isInteractiveMode])

  const hero = getProductBySlug('climate-craft-grand')!
  const image = homeProductImage(hero.slug)
  const active = HERO_FEATURES.find((f) => f.id === activeId)!

  const isCooling = temp < 22
  const isHeating = temp > 22

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-transparent px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:pt-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Main Stage Frame */}
        <div
          onMouseMove={onFrameMouseMove}
          onMouseLeave={onFrameMouseLeave}
          className="group/stage relative h-[78vh] min-h-[620px] w-full overflow-hidden rounded-[36px] border border-white/20 bg-[#042626] shadow-[0_35px_90px_-20px_rgba(4,38,38,0.5)] backdrop-blur-2xl"
        >
          {/* Hero Visual Image */}
          <motion.div style={{ y: scrollY, scale: scrollScale }} className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                style={{ x: springX, y: springY }}
                animate={{
                  scale: active.zoomScale,
                  transformOrigin: active.zoomOrigin,
                }}
                transition={{ duration: 1.2, ease: easeOut }}
                className="absolute inset-[-4%]"
              >
                <motion.img
                  src={image}
                  alt={hero.name}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, ease: easeOut }}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out"
                />

                {/* Ambient Thermal Glow Overlay */}
                {isCooling && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    className="pointer-events-none absolute inset-0 bg-radial from-cyan-500/25 via-teal-950/40 to-transparent mix-blend-screen"
                  />
                )}
                {isHeating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    className="pointer-events-none absolute inset-0 bg-radial from-amber-500/30 via-orange-950/40 to-transparent mix-blend-screen"
                  />
                )}
              </motion.div>

              {/* Dark Gradient Scrim Overlay for Legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042626] via-[#042626]/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#042626]/90 via-[#042626]/40 to-transparent" />
            </div>
          </motion.div>

          {/* Hotspot Lines & Connectors */}
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
                    stroke={isActive ? '#f59e0b' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={isActive ? 0.8 : 0.35}
                    strokeDasharray={isActive ? 'none' : '2 2'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: easeOut }}
                  />
                )
              })}
            </svg>

            {!prefersReducedMotion && (
              <motion.div
                key={active.id}
                className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  left: `${active.targetX}%`,
                  top: `${active.targetY}%`,
                  background: 'radial-gradient(circle, rgba(245,158,11,0.45) 0%, transparent 70%)',
                }}
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Hotspot Numeric Buttons */}
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
                    whileHover={{ scale: 1.15 }}
                    className="relative flex items-center"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: 10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.9 }}
                          transition={{ duration: 0.25, ease: easeOut }}
                          className="absolute right-full top-1/2 mr-3.5 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-amber-400/40 bg-black/70 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white shadow-2xl backdrop-blur-xl"
                        >
                          <span className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-amber-400 animate-pulse" />
                            {f.title}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-amber-400/60 animate-ping" />
                    )}

                    <motion.span
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        borderColor: isActive ? '#f59e0b' : 'rgba(255,255,255,0.4)',
                        backgroundColor: isActive ? '#f59e0b' : 'rgba(4,38,38,0.75)',
                        boxShadow: isActive
                          ? '0 0 25px 4px rgba(245,158,11,0.65)'
                          : '0 4px 14px rgba(0,0,0,0.4)',
                      }}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="relative flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md font-display text-xs italic font-bold"
                      style={{ color: isActive ? '#042626' : '#ffffff' }}
                    >
                      {f.number}
                    </motion.span>
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Hero Main Content & Temperature Widget Area */}
          <motion.div
            style={{ y: contentY }}
            className="pointer-events-none relative flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14"
          >
            {/* Top Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
              className="flex items-center gap-2.5"
            >
              <span className="h-0.5 w-8 bg-amber-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Engineering &amp; Technology
              </span>
            </motion.div>

            {/* Bottom Content Area Split */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              {/* Headline & Paragraph */}
              <div className="max-w-xl">
                <h1 className="font-display text-4xl font-semibold leading-[1.03] text-white sm:text-6xl lg:text-[4rem]">
                  {HEADLINE.map((line, i) => (
                    <span key={line} className="block overflow-hidden pb-1">
                      <motion.span
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: easeOut }}
                        className={`block ${i === 1 ? 'italic font-normal text-teal-300' : ''}`}
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
                  className="mt-4 text-[15px] font-normal leading-relaxed text-slate-100/90 sm:text-[16px]"
                >
                  Climate craft precision, liquid temperature regulation, motorized reclining, and smart control — seamlessly synthesized into a single icon of modern living.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: easeOut }}
                  className="pointer-events-auto mt-6 flex flex-wrap items-center gap-4"
                >
                  <a
                    href="#feature-explorer"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-teal-400/40 bg-teal-700 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-teal-600 active:scale-[0.97]"
                  >
                    <span className="relative z-10">Explore Features</span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </div>

              {/* RE-LOCATED CLIMATE CONTROL HUD (NO OVERLAP WITH TOP HOTSPOTS) */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
                className="pointer-events-auto w-full max-w-[280px] rounded-3xl border border-white/25 bg-black/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-white/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Climate Engine
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-white/25"
                  >
                    <Sliders className="h-2.5 w-2.5 text-teal-300" />
                    <span>{isInteractiveMode ? 'Live' : 'Control'}</span>
                  </button>
                </div>

                {/* Display Screen */}
                <div className="relative mt-3 flex items-center justify-between rounded-2xl border border-white/15 bg-black/50 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    {isCooling && <Snowflake className="h-5 w-5 text-cyan-400 animate-spin-slow" />}
                    {isHeating && <Flame className="h-5 w-5 text-amber-400 animate-bounce" />}
                    {!isCooling && !isHeating && <Thermometer className="h-5 w-5 text-teal-300" />}

                    <div className="flex items-baseline gap-0.5">
                      <span className="font-display text-3xl font-semibold italic text-white">
                        {temp}
                      </span>
                      <span className="font-display text-base font-normal text-teal-300">°C</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${isCooling ? 'text-cyan-300' : isHeating ? 'text-amber-300' : 'text-teal-200'
                        }`}
                    >
                      {isCooling ? 'Cooling' : isHeating ? 'Heating' : 'Optimal'}
                    </span>
                    <p className="text-[9px] font-medium text-white/50">Liquid Thermal</p>
                  </div>
                </div>

                {/* Interactive Temperature Slider */}
                <div className="mt-3.5">
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/70">
                    <span className="text-cyan-400">15°C</span>
                    <span className="text-amber-400">35°C</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="35"
                    value={temp}
                    onChange={(e) => {
                      setTemp(Number(e.target.value))
                      setIsInteractiveMode(true)
                    }}
                    className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 accent-white outline-none"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pointer-events-auto absolute inset-x-0 bottom-4 flex flex-col items-center gap-1.5"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.15 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#042626]/60 text-white backdrop-blur-md transition-colors hover:border-amber-400 hover:bg-[#042626]/90"
            >
              <ChevronDown className="h-4 w-4 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PREMIUM GLASS PANEL FEATURE SELECTOR & SPECIFICATIONS HUB     */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: easeOut }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:p-8"
        >
          {/* Subtle Ambient Glow Effects inside bottom bar */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          {/* Feature Pill Navigation */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
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
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    activate(f.id)
                    scheduleResume()
                  }}
                  onMouseEnter={() => activate(f.id)}
                  onMouseLeave={scheduleResume}
                  aria-pressed={isActive}
                  className="relative outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeHeroPill"
                      className="absolute inset-0 rounded-2xl bg-[#042626] shadow-lg shadow-[#042626]/20 border border-teal-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-3 rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                        ? 'text-white'
                        : 'border border-white/20 bg-white/20 text-slate-800 hover:bg-white/40 hover:text-black'
                      }`}
                  >
                    <span
                      className={`font-display text-sm italic font-extrabold ${isActive ? 'text-amber-400' : 'text-teal-800'
                        }`}
                    >
                      {f.number}
                    </span>
                    <span>{f.title}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Specifications Glass Grid */}
          <div className="relative z-10 mt-6 min-h-[56px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex flex-wrap gap-4 w-full"
              >
                {active.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/20 px-4 py-2.5 backdrop-blur-md shadow-sm transition-all hover:bg-white/30"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-none text-teal-700" />
                    <span className="text-sm font-semibold tracking-wide text-slate-900">
                      {point}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}