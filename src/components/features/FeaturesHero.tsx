import { useEffect, useRef, useState, type MouseEvent } from 'react'
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
  previewImage: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'climate',
    title: 'CLIMATE CONTROL',
    description:
      'Touchscreen panel to adjust temperature and cooling / heating levels with ease.',
    icon: Thermometer,
    pinX: 25,
    pinY: 52,
    cardPosition: 'top-right',
    previewImage: '/images/screen.JPG',
  },
  {
    id: 'recline',
    title: 'RECLINE CONTROLLER',
    description:
      'Easy-access buttons for smooth one-touch recline and adjustments.',
    icon: Mic,
    pinX: 18,
    pinY: 62,
    cardPosition: 'bottom-left',
    previewImage: '/images/recline control.JPG',
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
  {
    label: '15°C – 35°C',
    detail: 'Wide temperature range',
    icon: Thermometer,
  },
  {
    label: 'Liquid Technology',
    detail: 'Advanced cooling & heating',
    icon: Sparkles,
  },
  {
    label: 'Smart Control',
    detail: 'Touch · remote · voice',
    icon: Mic,
  },
  {
    label: 'Premium Build',
    detail: '460 GSM upholstery',
    icon: CheckCircle2,
  },
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

  const springX = useSpring(mouseX, {
    stiffness: 55,
    damping: 22,
    mass: 0.45,
  })

  const springY = useSpring(mouseY, {
    stiffness: 55,
    damping: 22,
    mass: 0.45,
  })

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

  const coolFactor = useTransform(
    smoothTemp,
    [15, 22],
    [1, 0],
    { clamp: true },
  )

  const warmFactor = useTransform(
    smoothTemp,
    [22, 35],
    [0, 1],
    { clamp: true },
  )

  const isCooling = temp < 21
  const isHeating = temp > 23

  const consoleBorder = useTransform(
    smoothTemp,
    [15, 22, 35],
    [
      'rgba(34,211,238,0.75)',
      'rgba(15,118,110,0.30)',
      'rgba(245,158,11,0.75)',
    ],
  )



  const airflowOpacity = useTransform(
    smoothTemp,
    [15, 22, 35],
    [0.95, 0.1, 0.95],
  )

  const coolingPanelOpacity = useTransform(
    coolFactor,
    [0, 1],
    [0.52, 1],
  )

  const heatingPanelOpacity = useTransform(
    warmFactor,
    [0, 1],
    [0.52, 1],
  )

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-slate-50 px-2.5 pb-8 pt-16 sm:px-5 sm:pb-14 sm:pt-24 lg:px-6 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(ellipse_at_100%_55%,rgba(251,146,60,0.14),transparent_40%),linear-gradient(180deg,#f1f8f8_0%,#ffffff_60%,#eef6f5_100%)]" />

      <div className="pointer-events-none absolute left-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[120px]" />

      <div className="pointer-events-none absolute right-[-8%] top-[42%] h-[380px] w-[380px] rounded-full bg-amber-200/30 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Outer card: solid instead of hazy glass so nothing washes out the product image */}
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(15,70,70,0.30),inset_0_1px_0_rgba(255,255,255,0.9)] sm:rounded-[38px]">
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
                  transition={{
                    duration: 0.7,
                    delay: 0.12,
                    ease: cubicEase,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <span className="h-0.5 w-8 bg-amber-400" />

                  <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-amber-500 bg-clip-text text-[10px] font-extrabold uppercase tracking-[0.2em] text-transparent sm:text-[11px]">
                    Engineering &amp; Technology
                  </span>
                </motion.div>

                <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.035em] text-[#082F32] sm:mt-4 sm:text-5xl lg:text-[3.35rem]">
                  {HEADLINE.map((line, index) => (
                    <span
                      key={line}
                      className="block overflow-hidden pb-1"
                    >
                      <motion.span
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{
                          duration: 0.85,
                          delay: 0.22 + index * 0.1,
                          ease: cubicEase,
                        }}
                        className={`block ${index === 1
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
                  transition={{
                    duration: 0.75,
                    delay: 0.4,
                    ease: cubicEase,
                  }}
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
                  transition={{
                    duration: 0.7,
                    delay: 0.52,
                    ease: cubicEase,
                  }}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-gradient-to-r from-[#0D9488] via-[#0F766E] to-[#115E59] px-6 py-3 text-[10px] font-extrabold uppercase tracking-[0.11em] text-white shadow-[0_12px_28px_-12px_rgba(15,118,110,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_32px_-12px_rgba(15,118,110,0.65)] sm:px-7 sm:text-[11px]"
                >
                  <span>Explore Features</span>

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              </div>
            </div>

            {/* Main product stage */}
            {/* Mobile: clean product presentation so the image stays fully visible */}
            <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-[#0c2b2d] shadow-[0_25px_70px_-28px_rgba(15,70,70,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] sm:hidden">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={image}
                  alt={hero.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,30,31,0.08),transparent_55%,rgba(6,30,31,0.45))]" />

                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/25 bg-[#063B3D]/90 px-3.5 py-3 shadow-[0_16px_35px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Snowflake className="h-4 w-4 text-cyan-300" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-cyan-200">
                        Seat Climate
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-white">
                        Cooling &amp; heating
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-[#123638]">
                    15°C – 35°C
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/tablet: preserve the existing interactive product stage */}
            <div
              onMouseMove={onFrameMouseMove}
              onMouseLeave={onFrameMouseLeave}
              className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-slate-200 bg-[#0c2b2d] shadow-[0_25px_70px_-28px_rgba(15,70,70,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] sm:block sm:aspect-[16/10] lg:aspect-[21/10] lg:min-h-[555px]"
            >
              {/* Faint, low-opacity accent — no longer washes out the photo */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(255,255,255,0.06),transparent_60%)]" />

              <motion.div
                style={{
                  y: scrollY,
                  scale: scrollScale,
                }}
                className="absolute inset-0"
              >
                <motion.div
                  style={{
                    x: springX,
                    y: springY,
                  }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                >
                  <motion.img
                    src={image}
                    alt={hero.name}
                    initial={{
                      scale: 1.03,
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.15,
                      ease: cubicEase,
                    }}
                    className="h-full w-full object-cover object-[50%_50%] contrast-[1.08] saturate-[1.15] brightness-[1.02]"
                  />
                </motion.div>

                {/* Minimal vignette — only at top for header legibility and bottom for console legibility */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,30,31,0.22),transparent_20%,transparent_68%,rgba(6,30,31,0.38))]" />

                {/* Thermal Effect - Optimized for mobile by crossfading opacity instead of animating background gradient strings */}
                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: coolFactor,
                  }}
                  className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-xl sm:h-96 sm:w-96 bg-[radial-gradient(circle,rgba(34,211,238,0.50)_0%,rgba(103,232,249,0.22)_30%,transparent_72%)] will-change-opacity"
                />

                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: warmFactor,
                  }}
                  className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-xl sm:h-96 sm:w-96 bg-[radial-gradient(circle,rgba(245,158,11,0.50)_0%,rgba(251,191,36,0.20)_30%,transparent_72%)] will-change-opacity"
                />

                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: coolFactor,
                  }}
                  className="pointer-events-none absolute h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-md sm:h-56 sm:w-[26rem] bg-[radial-gradient(ellipse,rgba(34,211,238,0.95)_0%,rgba(245,158,11,0)_42%,transparent_74%)] will-change-opacity"
                />

                <motion.div
                  style={{
                    left: `${SEAT_ZONE.x}%`,
                    top: `${SEAT_ZONE.y}%`,
                    opacity: warmFactor,
                  }}
                  className="pointer-events-none absolute h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-md sm:h-56 sm:w-[26rem] bg-[radial-gradient(ellipse,rgba(34,211,238,0)_0%,rgba(245,158,11,0.95)_42%,transparent_74%)] will-change-opacity"
                />

                {!prefersReducedMotion &&
                  STRAND_PATHS.map((strand, index) => (
                    <motion.div
                      key={`energy-${index}`}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: airflowOpacity,
                      }}
                    >
                      <svg
                        className="absolute inset-0 h-full w-full overflow-visible"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d={`M ${SEAT_ZONE.x} ${SEAT_ZONE.y} Q ${SEAT_ZONE.x + strand.qx
                            } ${SEAT_ZONE.y + strand.qy}, ${SEAT_ZONE.x + strand.ex
                            } ${SEAT_ZONE.y + strand.ey}`}
                          fill="none"
                          stroke={
                            strand.side === 'cool'
                              ? '#06B6D4'
                              : '#F59E0B'
                          }
                          strokeWidth={0.42}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          strokeDasharray="1.2 2.4"
                          style={{
                            opacity:
                              strand.side === 'cool'
                                ? coolFactor
                                : warmFactor,
                          }}
                          animate={{
                            strokeDashoffset: [0, -9],
                          }}
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
                          left: `${SEAT_ZONE.x + (index - 1) * 8
                            }%`,
                          top: `${SEAT_ZONE.y + 3}%`,
                          opacity: warmFactor,
                        }}
                        animate={{
                          y: [8, -34, -60],
                          x: [0, index === 1 ? 7 : -5, 0],
                          opacity: [0, 0.55, 0],
                          scale: [0.8, 1.2, 1.5],
                          rotateZ: [0, 0, 0],
                        }}
                        transition={{
                          duration: 3.8 + index * 0.45,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: index * 0.75,
                        }}
                        className="pointer-events-none absolute h-16 w-12 -translate-x-1/2 rounded-full bg-amber-400/30 blur-xl will-change-transform"
                      />
                    ))}
                  </>
                )}
              </motion.div>

              {/* Hover Hotspots */}
              {HOTSPOTS.map((spot) => (
                <div
                  key={`trigger-${spot.id}`}
                  style={{
                    left: `${spot.pinX}%`,
                    top: `${spot.pinY}%`,
                  }}
                  className="group absolute z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                  onMouseEnter={() => setHoveredId(spot.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-teal-600 shadow-lg transition-transform duration-300 group-hover:scale-125">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
              ))}

              {/* Hover Details + Exact Feature Image */}
              {HOTSPOTS.map((spot) => {
                const isHovered = hoveredId === spot.id

                return (
                  <AnimatePresence key={`popup-${spot.id}`}>
                    {isHovered && (
                      <div
                        className={`pointer-events-none absolute z-40 flex gap-3 ${getCornerPositionClass(
                          spot.cardPosition,
                        )}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92, x: 10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.92, x: 10 }}
                          transition={{ duration: 0.22, ease: cubicEase }}
                          style={{ backgroundColor: 'rgba(8, 44, 46, 0.98)' }}
                          className="w-60 rounded-2xl border border-white/15 p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] sm:w-64 sm:p-4"
                        >
                          <div className="mb-1.5 flex items-center gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                              <spot.icon className="h-3.5 w-3.5 text-cyan-300" />
                            </span>
                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                              {spot.title}
                            </h3>
                          </div>
                          <p className="text-xs font-medium leading-relaxed text-white/90">
                            {spot.description}
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.88, x: 8 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.88, x: 8 }}
                          transition={{ duration: 0.25, ease: cubicEase }}
                          className="relative h-28 w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] sm:h-32 sm:w-48"
                        >
                          <img
                            src={spot.previewImage}
                            alt={spot.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063B3D]/25 via-transparent to-transparent" />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                )
              })}

              {/* Climate Console — more opaque, less blur, clearer against the photo */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.72, ease: cubicEase }}
                style={{
                  borderColor: consoleBorder,
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                }}
                className="absolute bottom-2.5 left-1/2 z-30 w-[calc(100%-1.25rem)] max-w-[310px] -translate-x-1/2 rounded-[22px] border p-3 shadow-[0_22px_55px_-18px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5 sm:w-[calc(100%-2.5rem)] sm:max-w-[300px] sm:translate-x-0 sm:p-4"
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
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isInteractiveMode ? 'bg-amber-400' : 'bg-teal-500'
                        }`}
                    />
                    {isInteractiveMode ? 'Live' : 'Auto'}
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 shadow-inner">
                  <motion.div
                    style={{ opacity: coolingPanelOpacity }}
                    className="relative overflow-hidden p-3"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-200/70 to-transparent" />
                    <div className="relative flex items-center gap-1.5">
                      <Snowflake className="h-5 w-5 text-cyan-600" />
                      <span className="font-display text-2xl font-semibold italic text-[#123638]">
                        15
                      </span>
                      <span className="text-[10px] font-bold text-cyan-700">
                        °C
                      </span>
                    </div>
                    <p className="relative mt-0.5 text-[9px] font-extrabold uppercase tracking-wider text-cyan-700">
                      Cooling
                    </p>
                  </motion.div>

                  <motion.div
                    style={{ opacity: heatingPanelOpacity }}
                    className="relative overflow-hidden border-l border-slate-200 p-3 text-right"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-amber-200/70 to-transparent" />
                    <div className="relative flex items-center justify-end gap-1.5">
                      <span className="text-[10px] font-bold text-amber-700">
                        °C
                      </span>
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
                          ? 'font-extrabold text-cyan-600'
                          : isHeating
                            ? 'font-extrabold text-amber-600'
                            : 'font-extrabold text-teal-600'
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
                      aria-valuetext={`${temp}°C, ${isCooling ? 'cooling' : isHeating ? 'heating' : 'balanced'
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

            {/* Quick Specs — solid, crisp panel instead of heavy glass haze */}
            <motion.div
              id="feature-explorer"
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.88,
                ease: cubicEase,
              }}
              className="relative grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_15px_45px_-28px_rgba(15,70,70,0.30),inset_0_1px_0_rgba(255,255,255,0.9)] sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-1"
            >
              {QUICK_SPECS.map((spec, index) => {
                const Icon = spec.icon

                return (
                  <motion.div
                    key={spec.label}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.98 + index * 0.06,
                      ease: cubicEase,
                    }}
                    className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-br from-cyan-100 via-teal-100 to-amber-100 text-teal-700 shadow-[0_8px_20px_-12px_rgba(15,118,110,0.55)]">
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

function getCornerPositionClass(
  position: Hotspot['cardPosition'],
): string {
  switch (position) {
    case 'top-left':
      return 'top-[42%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[28%] flex-col items-center sm:items-start'

    case 'top-right':
      return 'top-[42%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[28%] flex-col sm:flex-row items-center'

    case 'bottom-left':
      return 'top-[60%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[21%] flex-col items-center sm:items-start'

    case 'bottom-right':
      return 'top-[60%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[21%] flex-col sm:flex-row items-center'
  }
}