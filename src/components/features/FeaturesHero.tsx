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

interface Hotspot {
  id: string
  title: string
  description: string
  icon: LucideIcon
  pinX: number
  pinY: number
  cardPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  zoomX: number
  zoomY: number
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'climate',
    title: 'CLIMATE CONTROL',
    description: 'Touchscreen panel to adjust temperature and cooling / heating levels with ease.',
    icon: Thermometer,
    pinX: 25,
    pinY: 52,
    cardPosition: 'top-left',
    zoomX: 25,
    zoomY: 52,
  },
  {
    id: 'cupholder',
    title: 'CUP HOLDER',
    description: 'Integrated cup holder for your convenience.',
    icon: Armchair,
    pinX: 84,
    pinY: 41,
    cardPosition: 'top-right',
    zoomX: 84,
    zoomY: 41,
  },
  {
    id: 'recline',
    title: 'RECLINE CONTROLLER',
    description: 'Easy-access buttons for smooth one-touch recline and adjustments.',
    icon: Mic,
    pinX: 18,
    pinY: 62,
    cardPosition: 'bottom-left',
    zoomX: 18,
    zoomY: 62,
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

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [temp, setTemp] = useState(22)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)

  const hero = getProductBySlug('climate-craft-grand')!
  const image = homeProductImage(hero.slug)

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
    ['rgba(34,211,238,0.65)', 'rgba(15,118,110,0.25)', 'rgba(245,158,11,0.65)'],
  )

  const thermalGlow = useTransform(
    smoothTemp,
    [15, 22, 35],
    [
      'radial-gradient(circle, rgba(34,211,238,0.50) 0%, rgba(103,232,249,0.22) 30%, transparent 72%)',
      'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 72%)',
      'radial-gradient(circle, rgba(245,158,11,0.50) 0%, rgba(251,191,36,0.20) 30%, transparent 72%)',
    ],
  )

  const coolZoneColor = useTransform(
    coolFactor,
    [0, 1],
    ['rgba(34,211,238,0)', 'rgba(34,211,238,0.95)'],
  )

  const warmZoneColor = useTransform(
    warmFactor,
    [0, 1],
    ['rgba(245,158,11,0)', 'rgba(245,158,11,0.95)'],
  )

  const thermalOpacity = useTransform(
    smoothTemp,
    [15, 22, 35],
    [0.8, 0.2, 0.78],
  )

  const airflowOpacity = useTransform(
    smoothTemp,
    [15, 22, 35],
    [0.95, 0.1, 0.95],
  )

  const coolingPanelOpacity = useTransform(coolFactor, [0, 1], [0.52, 1])
  const heatingPanelOpacity = useTransform(warmFactor, [0, 1], [0.52, 1])

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-slate-50 px-2.5 pb-8 pt-16 sm:px-5 sm:pb-14 sm:pt-24 lg:px-6 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(ellipse_at_100%_55%,rgba(251,146,60,0.14),transparent_40%),linear-gradient(180deg,#f1f8f8_0%,#ffffff_60%,#eef6f5_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8%] top-[42%] h-[380px] w-[380px] rounded-full bg-amber-200/30 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-[26px] border border-white/95 bg-white/60 shadow-[0_30px_90px_-35px_rgba(15,70,70,0.28),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-3xl sm:rounded-[38px]">
          <motion.div
            style={{ y: contentY }}
            className="relative flex flex-col gap-5 p-3.5 sm:gap-6 sm:p-7 lg:gap-7 lg:p-10"
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
                  <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-amber-500 bg-clip-text text-[10px] font-extrabold uppercase tracking-[0.2em] text-transparent sm:text-[11px]">
                    Engineering &amp; Technology
                  </span>
                </motion.div>

                <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.035em] text-[#082F32] sm:mt-4 sm:text-5xl lg:text-[3.35rem]">
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
                          index === 1
                            ? 'italic font-normal bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-500 bg-clip-text text-transparent'
                            : ''
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
                  className="max-w-xl text-[13px] font-medium leading-[1.65] text-[#24494B]/85 sm:text-[15px]"
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
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-gradient-to-r from-[#0D9488] via-[#0F766E] to-[#115E59] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.11em] text-white shadow-[0_12px_28px_-12px_rgba(15,118,110,0.65)] sm:px-7 sm:text-[11px] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_32px_-12px_rgba(15,118,110,0.65)]"
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
              className="relative aspect-[1/1.15] w-full overflow-hidden rounded-[22px] border border-white/90 bg-[linear-gradient(135deg,rgba(224,242,254,0.92),rgba(255,255,255,0.85))] shadow-[0_25px_70px_-28px_rgba(15,70,70,0.32),inset_0_1px_0_rgba(255,255,255,0.95)] sm:aspect-[16/10] lg:aspect-[21/10] lg:min-h-[555px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(255,255,255,0.85),transparent_56%),linear-gradient(90deg,rgba(255,255,255,0.80),transparent_30%,transparent_72%,rgba(255,255,255,0.60))]" />

              <motion.div
                style={{ y: scrollY, scale: scrollScale }}
                className="absolute inset-0"
              >
                <motion.div
                  style={{ x: springX, y: springY }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                >
                  <motion.img
                    src={image}
                    alt={hero.name}
                    initial={{ scale: 1.03, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.15, ease: cubicEase }}
                    className="h-full w-full object-cover object-[50%_50%] contrast-[1.08] saturate-[1.18] brightness-[1.02]"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),transparent_25%,transparent_72%,rgba(224,242,254,0.40)),linear-gradient(90deg,rgba(240,253,250,0.35),transparent_18%,transparent_82%,rgba(240,253,250,0.20))]" />

                {/* Thermal Effect */}
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
                          stroke={strand.side === 'cool' ? '#06B6D4' : '#F59E0B'}
                          strokeWidth={0.42}
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
                        className="pointer-events-none absolute h-16 w-12 -translate-x-1/2 rounded-full bg-amber-400/30 blur-xl"
                      />
                    ))}
                  </>
                )}
              </motion.div>

              {/* Hover Hotspots on image */}
              {HOTSPOTS.map((spot) => (
                <div
                  key={`trigger-${spot.id}`}
                  style={{ left: `${spot.pinX}%`, top: `${spot.pinY}%` }}
                  className="absolute z-30 h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center group"
                  onMouseEnter={() => setHoveredId(spot.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 border-2 border-white shadow-lg transition-transform group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
              ))}

              {/* Hover Details & Magnified Circle */}
              {HOTSPOTS.map((spot) => {
                const isHovered = hoveredId === spot.id

                return (
                  <AnimatePresence key={`popup-${spot.id}`}>
                    {isHovered && (
                      <div
                        className={`absolute z-40 pointer-events-none flex flex-col gap-3 ${getCornerPositionClass(
                          spot.cardPosition
                        )}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="w-60 sm:w-64 rounded-2xl border border-white/90 bg-white/95 p-3.5 sm:p-4 shadow-2xl backdrop-blur-md"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <spot.icon className="h-4 w-4 text-teal-600" />
                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#082F32]">
                              {spot.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {spot.description}
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-white shadow-2xl self-center"
                        >
                          <img
                            src={image}
                            alt={spot.title}
                            className="absolute max-w-none contrast-[1.10] saturate-[1.20]"
                            style={{
                              width: '400%',
                              height: '400%',
                              left: `${-spot.zoomX * 4 + 50}%`,
                              top: `${-spot.zoomY * 4 + 50}%`,
                            }}
                          />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                )
              })}

              {/* Climate Console */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.72, ease: cubicEase }}
                style={{ borderColor: consoleBorder }}
                className="absolute bottom-2.5 left-1/2 z-30 w-[calc(100%-1.25rem)] max-w-[310px] -translate-x-1/2 rounded-[22px] border bg-white/80 p-3 shadow-[0_22px_55px_-22px_rgba(15,70,70,0.40),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-3xl sm:bottom-5 sm:left-auto sm:right-5 sm:w-[calc(100%-2.5rem)] sm:max-w-[300px] sm:translate-x-0 sm:p-4"
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
                    className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-white"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isInteractiveMode ? 'bg-amber-400' : 'bg-teal-500'
                      }`}
                    />
                    {isInteractiveMode ? 'Live' : 'Auto'}
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/80 bg-white/70 shadow-inner">
                  <motion.div
                    style={{ opacity: coolingPanelOpacity }}
                    className="relative overflow-hidden p-3"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-200/60 to-transparent" />

                    <div className="relative flex items-center gap-1.5">
                      <Snowflake className="h-5 w-5 text-cyan-600" />
                      <span className="font-display text-2xl font-semibold italic text-[#123638]">
                        15
                      </span>
                      <span className="text-[10px] text-cyan-700 font-bold">°C</span>
                    </div>
                    <p className="relative mt-0.5 text-[9px] font-extrabold uppercase tracking-wider text-cyan-700">
                      Cooling
                    </p>
                  </motion.div>

                  <motion.div
                    style={{ opacity: heatingPanelOpacity }}
                    className="relative overflow-hidden border-l border-slate-200/70 p-3 text-right"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-200/60 to-transparent" />

                    <div className="relative flex items-center justify-end gap-1.5">
                      <span className="text-[10px] text-amber-700 font-bold">°C</span>
                      <span className="font-display text-2xl font-semibold italic text-[#123638]">
                        35
                      </span>
                      <Flame className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="relative mt-0.5 text-[9px] font-extrabold uppercase tracking-wider text-amber-700">
                      Heating
                    </p>
                  </motion.div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                    <span>15°C</span>
                    <span
                      className={
                        isCooling
                          ? 'text-cyan-600 font-extrabold'
                          : isHeating
                            ? 'text-amber-600 font-extrabold'
                            : 'text-teal-600 font-extrabold'
                      }
                    >
                      {isCooling ? 'Cooling' : isHeating ? 'Heating' : 'Balanced'}
                    </span>
                    <span>35°C</span>
                  </div>

                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-500 shadow-sm" />

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
                      className="relative z-10 h-2.5 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-white outline-none"
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

            {/* Quick Specs */}
            <motion.div
              id="feature-explorer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.88, ease: cubicEase }}
              className="relative grid grid-cols-1 divide-y divide-slate-200/65 overflow-hidden rounded-[22px] border border-white/95 bg-white/70 shadow-[0_15px_45px_-28px_rgba(15,70,70,0.30),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-3xl sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-1"
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
                    className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-gradient-to-br from-cyan-100 via-teal-100 to-amber-100 text-teal-700 shadow-[0_8px_20px_-12px_rgba(15,118,110,0.55)]">
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

function getCornerPositionClass(position: Hotspot['cardPosition']): string {
  switch (position) {
    case 'top-left':
      return 'top-6 left-6 items-start'
    case 'top-right':
      return 'top-6 right-6 items-end'
    case 'bottom-left':
      return 'bottom-6 left-6 items-start'
    case 'bottom-right':
      return 'bottom-6 right-6 items-end'
  }
}