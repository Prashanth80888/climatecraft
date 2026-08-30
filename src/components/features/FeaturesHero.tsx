import { useEffect, useRef, useState, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowUpRight,
  Armchair,
  CheckCircle2,
  Flame,
  Mic,
  Sparkles,
  Snowflake,
  Thermometer,
  type LucideIcon,
} from 'lucide-react'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const HEADLINE = ['Engineered for', 'how you live.']

interface HeroFeature {
  id: string
  number: string
  title: string
  points: string[]
  icon: LucideIcon
  targetX: number
  targetY: number
  zoomScale: number
}

const HERO_FEATURES: HeroFeature[] = [
  {
    id: 'climate',
    number: '01',
    title: 'Intelligent Climate',
    points: ['15°C – 35°C temperature range', 'Patented liquid cooling & heating'],
    icon: Thermometer,
    targetX: 50,
    targetY: 59,
    zoomScale: 1.08,
  },
  {
    id: 'control',
    number: '02',
    title: 'Smart & Voice Control',
    points: ['Smart touchscreen interface', 'Remote control', 'Voice control'],
    icon: Mic,
    targetX: 25,
    targetY: 58,
    zoomScale: 1.1,
  },
  {
    id: 'comfort',
    number: '03',
    title: 'Premium Comfort',
    points: ['Ergonomic cushioning and support', 'Premium 460 GSM upholstery', 'Integrated cup holders'],
    icon: Armchair,
    targetX: 58,
    targetY: 60,
    zoomScale: 1.08,
  },
]

const SEAT_ZONE = { x: 57, y: 59 }

const STRAND_PATHS: {
  qx: number
  qy: number
  ex: number
  ey: number
  side: 'cool' | 'warm'
}[] = [
  { qx: -6, qy: 1, ex: -14, ey: -4, side: 'cool' },
  { qx: -5, qy: 4, ex: -12, ey: 8, side: 'cool' },
  { qx: -4, qy: -4, ex: -10, ey: -10, side: 'cool' },
  { qx: -2, qy: 7, ex: -7, ey: 13, side: 'cool' },
  { qx: 6, qy: 1, ex: 14, ey: -3, side: 'warm' },
  { qx: 5, qy: 4, ex: 12, ey: 8, side: 'warm' },
  { qx: 4, qy: -4, ex: 10, ey: -10, side: 'warm' },
  { qx: 2, qy: 7, ex: 7, ey: 13, side: 'warm' },
]

const QUICK_SPECS = [
  { label: '15°C – 35°C', detail: 'Wide temperature range', icon: Thermometer },
  { label: 'Liquid Technology', detail: 'Advanced cooling & heating', icon: Sparkles },
  { label: 'Smart Control', detail: 'Touch · remote · voice', icon: Mic },
  { label: 'Premium Build', detail: '460 GSM upholstery', icon: CheckCircle2 },
]

const AUTO_CYCLE_MS = 5000

export function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.025])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-2%'])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22, mass: 0.45 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22, mass: 0.45 })

  const onFrameMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return

    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(px * 8)
    mouseY.set(py * 5)
  }

  const onFrameMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // The visual has no left-side feature labels or hotspot dots.
  // The feature itself is still automatically cycled so the sofa subtly
  // reframes while the central information card changes.
  const [activeId, setActiveId] = useState('comfort')
  const [temp, setTemp] = useState(22)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion || isInteractiveMode) return

    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = HERO_FEATURES.findIndex((feature) => feature.id === current)
        return HERO_FEATURES[(index + 1) % HERO_FEATURES.length].id
      })
    }, AUTO_CYCLE_MS)

    return () => window.clearInterval(id)
  }, [prefersReducedMotion, isInteractiveMode])

  const hero = getProductBySlug('climate-craft-grand')!
  const image = homeProductImage(hero.slug)
  const active = HERO_FEATURES.find((feature) => feature.id === activeId) ?? HERO_FEATURES[2]

  const tempMotion = useMotionValue(22)

  useEffect(() => {
    tempMotion.set(temp)
  }, [temp, tempMotion])

  const smoothTemp = useSpring(tempMotion, {
    stiffness: 95,
    damping: 23,
    mass: 0.5,
  })

  const coolFactor = useTransform(smoothTemp, [15, 22], [1, 0], { clamp: true })
  const warmFactor = useTransform(smoothTemp, [22, 35], [0, 1], { clamp: true })

  const isCooling = temp < 21
  const isHeating = temp > 23

  const consoleBorder = useTransform(
    smoothTemp,
    [15, 22, 35],
    ['rgba(34,211,238,0.55)', 'rgba(15,118,110,0.20)', 'rgba(245,158,11,0.55)'],
  )

  const thermalGlow = useTransform(
    smoothTemp,
    [15, 22, 35],
    [
      'radial-gradient(circle, rgba(34,211,238,0.42) 0%, rgba(103,232,249,0.16) 28%, transparent 72%)',
      'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 72%)',
      'radial-gradient(circle, rgba(245,158,11,0.40) 0%, rgba(251,191,36,0.14) 28%, transparent 72%)',
    ],
  )

  const coolZoneColor = useTransform(
    coolFactor,
    [0, 1],
    ['rgba(34,211,238,0)', 'rgba(34,211,238,0.92)'],
  )

  const warmZoneColor = useTransform(
    warmFactor,
    [0, 1],
    ['rgba(245,158,11,0)', 'rgba(245,158,11,0.92)'],
  )

  const thermalOpacity = useTransform(
    smoothTemp,
    [15, 22, 35],
    [0.72, 0.16, 0.68],
  )

  const airflowOpacity = useTransform(
    smoothTemp,
    [15, 22, 35],
    [0.9, 0.08, 0.9],
  )

  // Keep derived motion values at the top level so React/Framer Motion hooks
  // are never created inside JSX branches. This also keeps the two climate
  // panels perfectly synchronized with the main temperature state.
  const coolingPanelOpacity = useTransform(coolFactor, [0, 1], [0.52, 1])
  const heatingPanelOpacity = useTransform(warmFactor, [0, 1], [0.52, 1])

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-white px-3 pb-10 pt-20 sm:px-5 sm:pb-14 sm:pt-24 lg:px-6 lg:pt-28"
    >
      {/* Soft white / pale-teal atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(110,231,227,0.22),transparent_48%),radial-gradient(ellipse_at_100%_55%,rgba(245,200,100,0.10),transparent_36%),linear-gradient(180deg,#f8fcfb_0%,#ffffff_62%,#f4faf8_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-teal-200/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-8%] top-[42%] h-[380px] w-[380px] rounded-full bg-amber-100/35 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-white/90 bg-white/55 shadow-[0_30px_90px_-35px_rgba(15,70,70,0.28)] backdrop-blur-2xl sm:rounded-[38px]">
          <motion.div
            style={{ y: contentY }}
            className="relative flex flex-col gap-6 p-5 sm:p-7 lg:gap-7 lg:p-10"
          >
            {/* Header */}
            <div className="relative z-30 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: cubicEase }}
                  className="flex items-center gap-2.5"
                >
                  <span className="h-0.5 w-8 bg-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-500 sm:text-[11px]">
                    Engineering &amp; Technology
                  </span>
                </motion.div>

                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-[#092B2D] sm:text-5xl lg:text-[3.35rem]">
                  {HEADLINE.map((line, index) => (
                    <span key={line} className="block overflow-hidden pb-1">
                      <motion.span
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{
                          duration: 0.85,
                          delay: 0.22 + index * 0.1,
                          ease: cubicEase,
                        }}
                        className={`block ${
                          index === 1 ? 'italic font-normal text-[#16A5A8]' : ''
                        }`}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </div>

              <div className="flex max-w-md flex-col items-start gap-4 lg:items-end lg:pt-1 lg:text-right">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.4, ease: cubicEase }}
                  className="text-[14px] font-normal leading-relaxed text-[#264749]/80 sm:text-[15px]"
                >
                  Climate craft precision, liquid temperature regulation,
                  motorized reclining, and smart control — synthesized into a
                  single icon of modern living.
                </motion.p>

                <motion.a
                  href="#feature-explorer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.52, ease: cubicEase }}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-teal-500/35 bg-[#18A5A8] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_-12px_rgba(15,118,110,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#139397] hover:shadow-[0_18px_32px_-12px_rgba(15,118,110,0.55)]"
                >
                  <span>Explore Features</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              </div>
            </div>

            {/* Main product stage */}
            <div
              onMouseMove={onFrameMouseMove}
              onMouseLeave={onFrameMouseLeave}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[25px] border border-white/80 bg-[linear-gradient(135deg,rgba(238,250,248,0.92),rgba(255,255,255,0.74))] shadow-[0_25px_70px_-28px_rgba(15,70,70,0.28)] sm:aspect-[16/10] lg:aspect-[21/10] lg:min-h-[555px]"
            >
              {/* Light glass stage */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(255,255,255,0.72),transparent_56%),linear-gradient(90deg,rgba(255,255,255,0.72),transparent_30%,transparent_72%,rgba(255,255,255,0.50))]" />

              <motion.div
                style={{ y: scrollY, scale: scrollScale }}
                className="absolute inset-0"
              >
                {/* Use only the real product image mapped by the project.
                    No blue-sofa placeholder/depth images are imported. */}
                <motion.div
                  style={{ x: springX, y: springY }}
                  animate={{
                    scale: 1.04 * active.zoomScale,
                    transformOrigin: `${active.targetX}% ${active.targetY}%`,
                  }}
                  transition={{ duration: 1.15, ease: cubicEase }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={image}
                    alt={hero.name}
                    initial={{ scale: 1.03, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.15, ease: cubicEase }}
                    className="h-full w-full object-cover object-[50%_50%]"
                  />
                </motion.div>

                {/* Soft edge treatment */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_25%,transparent_72%,rgba(238,249,247,0.56)),linear-gradient(90deg,rgba(245,252,251,0.40),transparent_18%,transparent_82%,rgba(245,252,251,0.24))]" />

                {/* Dynamic climate glow */}
                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: thermalOpacity,
                    background: thermalGlow,
                  }}
                  className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-xl sm:h-96 sm:w-96"
                />

                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: thermalOpacity,
                    background: useMotionTemplate`radial-gradient(ellipse, ${coolZoneColor} 0%, ${warmZoneColor} 42%, transparent 74%)`,
                  }}
                  className="pointer-events-none absolute h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-md sm:h-56 sm:w-[26rem]"
                />

                {/* Animated cooling / heating waves */}
                {!prefersReducedMotion &&
                  STRAND_PATHS.map((strand, index) => (
                    <motion.div
                      key={`energy-${index}`}
                      className="pointer-events-none absolute inset-0"
                      style={{ opacity: airflowOpacity }}
                    >
                      <svg
                        className="absolute inset-0 h-full w-full overflow-visible"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d={`M ${SEAT_ZONE.x} ${SEAT_ZONE.y} Q ${
                            SEAT_ZONE.x + strand.qx
                          } ${SEAT_ZONE.y + strand.qy}, ${
                            SEAT_ZONE.x + strand.ex
                          } ${SEAT_ZONE.y + strand.ey}`}
                          fill="none"
                          stroke={strand.side === 'cool' ? '#22CFE2' : '#F59E0B'}
                          strokeWidth={0.38}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          strokeDasharray="1.2 2.4"
                          style={{
                            opacity:
                              strand.side === 'cool' ? coolFactor : warmFactor,
                          }}
                          animate={{ strokeDashoffset: [0, -9] }}
                          transition={{
                            duration: 2.6 + index * 0.18,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </svg>
                    </motion.div>
                  ))}

                {/* Soft rising warmth */}
                {!prefersReducedMotion && (
                  <>
                    {[0, 1, 2].map((index) => (
                      <motion.span
                        key={`haze-${index}`}
                        style={{
                          left: `${SEAT_ZONE.x + (index - 1) * 8}%`,
                          top: `${SEAT_ZONE.y + 3}%`,
                          opacity: warmFactor,
                        }}
                        animate={{
                          y: [8, -34, -60],
                          x: [0, index === 1 ? 7 : -5, 0],
                          opacity: [0, 0.55, 0],
                          scale: [0.8, 1.2, 1.5],
                        }}
                        transition={{
                          duration: 3.8 + index * 0.45,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: index * 0.75,
                        }}
                        className="pointer-events-none absolute h-16 w-12 -translate-x-1/2 rounded-full bg-amber-300/25 blur-xl"
                      />
                    ))}
                  </>
                )}
              </motion.div>

              {/* Central glass feature card.
                  This is the only feature label shown on the image. */}
              <div className="pointer-events-none absolute inset-0 z-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: cubicEase }}
                    className="absolute left-[50%] top-[35%] w-[250px] -translate-x-1/2 rounded-[20px] border border-white/85 bg-white/78 p-4 shadow-[0_24px_55px_-22px_rgba(15,70,70,0.34)] backdrop-blur-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs italic font-bold text-amber-500">
                        {active.number}
                      </span>
                      <h3 className="text-[11px] font-bold uppercase tracking-wide text-[#173638]">
                        {active.title}
                      </h3>
                    </div>

                    <ul className="mt-2.5 space-y-1">
                      {active.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-slate-600"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Premium glass climate console */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.72, ease: cubicEase }}
                style={{ borderColor: consoleBorder }}
                className="absolute bottom-3 right-3 z-40 w-[calc(100%-1.5rem)] max-w-[300px] rounded-[24px] border bg-white/76 p-3.5 shadow-[0_22px_55px_-22px_rgba(15,70,70,0.40)] backdrop-blur-2xl sm:bottom-5 sm:right-5 sm:p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-amber-500">
                    <Sparkles className="h-3.5 w-3.5" />
                    Seat Climate
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsInteractiveMode((value) => !value)}
                    aria-pressed={isInteractiveMode}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/65 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600 transition-colors hover:bg-white"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isInteractiveMode ? 'bg-amber-400' : 'bg-teal-500'
                      }`}
                    />
                    {isInteractiveMode ? 'Live' : 'Auto'}
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/80 bg-white/55 shadow-inner">
                  <motion.div
                    style={{ opacity: coolingPanelOpacity }}
                    className="relative overflow-hidden p-3"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-100/70 to-transparent" />

                    <div className="relative flex items-center gap-1.5">
                      <Snowflake className="h-5 w-5 text-cyan-500" />
                      <span className="font-display text-2xl font-semibold italic text-[#123638]">
                        15
                      </span>
                      <span className="text-[10px] text-cyan-600">°C</span>
                    </div>
                    <p className="relative mt-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-600">
                      Cooling
                    </p>
                  </motion.div>

                  <motion.div
                    style={{ opacity: heatingPanelOpacity }}
                    className="relative overflow-hidden border-l border-slate-200/70 p-3 text-right"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-100/75 to-transparent" />

                    <div className="relative flex items-center justify-end gap-1.5">
                      <span className="text-[10px] text-amber-600">°C</span>
                      <span className="font-display text-2xl font-semibold italic text-[#123638]">
                        35
                      </span>
                      <Flame className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="relative mt-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600">
                      Heating
                    </p>
                  </motion.div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <span>15°C</span>
                    <span
                      className={
                        isCooling
                          ? 'text-cyan-600'
                          : isHeating
                            ? 'text-amber-600'
                            : 'text-teal-600'
                      }
                    >
                      {isCooling ? 'Cooling' : isHeating ? 'Heating' : 'Balanced'}
                    </span>
                    <span>35°C</span>
                  </div>

                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 opacity-80" />

                    <label htmlFor="climate-temp-slider" className="sr-only">
                      Adjust seat temperature, 15 to 35 degrees Celsius
                    </label>

                    <input
                      id="climate-temp-slider"
                      type="range"
                      min="15"
                      max="35"
                      value={temp}
                      aria-valuetext={`${temp}°C, ${
                        isCooling ? 'cooling' : isHeating ? 'heating' : 'balanced'
                      }`}
                      onChange={(e) => {
                        setTemp(Number(e.target.value))
                        setIsInteractiveMode(true)
                      }}
                      onFocus={() => setIsInteractiveMode(true)}
                      className="relative z-10 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-white outline-none"
                    />

                    {isInteractiveMode && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pointer-events-none absolute -top-7 rounded-md bg-[#123638] px-2 py-0.5 text-[9px] font-bold text-white shadow-md"
                        style={{
                          left: `${((temp - 15) / 20) * 100}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        {temp}°C
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Glass specification bar */}
            <motion.div
              id="feature-explorer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.88, ease: cubicEase }}
              className="relative grid grid-cols-2 divide-y divide-slate-200/65 overflow-hidden rounded-[24px] border border-white/90 bg-white/60 px-4 shadow-[0_15px_45px_-28px_rgba(15,70,70,0.30)] backdrop-blur-xl sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-1"
            >
              {QUICK_SPECS.map((spec, index) => {
                const Icon = spec.icon

                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.98 + index * 0.06,
                      ease: cubicEase,
                    }}
                    className="flex items-center gap-3 px-2 py-4 sm:px-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-300/60 bg-teal-50/80 text-teal-600">
                      <Icon className="h-4 w-4" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[12px] font-bold leading-tight text-[#18393B] sm:text-sm">
                        {spec.label}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-snug text-slate-500 sm:text-xs">
                        {spec.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
