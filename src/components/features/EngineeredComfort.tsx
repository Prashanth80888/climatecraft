import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Armchair,
  Cog,
  Droplets,
  Hand,
  Layers3,
  MousePointer2,
  X,
} from 'lucide-react'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Concept = {
  id: string
  label: string
  x: number
  y: number
  icon: typeof Armchair
  eyebrow: string
  title: string
  description: string
  detail: string
  zoomX: number
  zoomY: number
  zoomScale: number
}

const CONCEPTS: Concept[] = [
  {
    id: 'ergonomics',
    label: 'Ergonomics',
    x: 50,
    y: 6.5,
    icon: Armchair,
    eyebrow: 'Designed around you',
    title: 'Comfort follows the body.',
    description:
      'Every seating position is considered around posture, support and long-session comfort.',
    detail:
      'Headrest and upper back support adjust dynamically to prevent neck tension.',
    zoomX: 50,
    zoomY: 18,
    zoomScale: 2.3,
  },
  {
    id: 'motion',
    label: 'Motion',
    x: 83.5,
    y: 30.5,
    icon: Cog,
    eyebrow: 'Precision movement',
    title: 'Movement without interruption.',
    description:
      'Motorised reclining lets the seat adapt smoothly to the way you want to sit, relax or watch.',
    detail:
      'Silent dual-motor mechanism engineered for fluid multi-angle recline.',
    zoomX: 72,
    zoomY: 45,
    zoomScale: 2.4,
  },
  {
    id: 'climate',
    label: 'Climate',
    x: 83.5,
    y: 69.5,
    icon: Droplets,
    eyebrow: 'Liquid Climate Control Intelligence',
    title: 'Your climate. Inside the seat.',
    description:
      'Plain-water liquid climate control brings personalised heating and cooling directly into the seating experience.',
    detail:
      'Micro-channels in the lumbar cushion gently circulate temperature-controlled fluid.',
    zoomX: 60,
    zoomY: 65,
    zoomScale: 2.4,
  },
  {
    id: 'control',
    label: 'Control',
    x: 50,
    y: 88.5,
    icon: MousePointer2,
    eyebrow: 'Intelligent control',
    title: 'Comfort, at your command.',
    description:
      'Control the seating experience through voice, touchscreen and remote interaction.',
    detail:
      'Seamlessly integrated armrest tactile interface and voice activation array.',
    zoomX: 38,
    zoomY: 55,
    zoomScale: 2.5,
  },

  // ONLY MATERIAL POSITION CHANGED
  {
    id: 'material',
    label: 'Material',
    x: 4.5,
    y: 69.5,
    icon: Layers3,
    eyebrow: 'Material intelligence',
    title: 'Every surface has a purpose.',
    description:
      'Premium upholstery and carefully selected materials complete the engineered seating experience.',
    detail:
      'Breathable full-grain Italian leather bonded with thermal-conductive lining.',
    zoomX: 30,
    zoomY: 72,
    zoomScale: 2.4,
  },

  // ONLY CRAFT POSITION CHANGED
  {
    id: 'craft',
    label: 'Craft',
    x: 4.5,
    y: 30.5,
    icon: Hand,
    eyebrow: 'Made with intention',
    title: 'Technology meets craftsmanship.',
    description:
      'Intelligent mechanisms are brought together with the detail and finish expected from premium furniture.',
    detail:
      'Hand-stitched precision seams and sculpted high-density contour foam.',
    zoomX: 25,
    zoomY: 38,
    zoomScale: 2.4,
  },
]

const CARD_POSITIONS: Record<string, string> = {
  ergonomics:
    'left-1/2 top-[-14px] -translate-x-1/2 -translate-y-full',

  motion:
    'left-[calc(100%+16px)] top-1/2 -translate-y-1/2',

  climate:
    'left-[calc(100%+16px)] top-1/2 -translate-y-1/2',

  control:
    'left-1/2 bottom-[-14px] -translate-x-1/2 translate-y-full',

  material:
    'right-[calc(100%+16px)] top-1/2 -translate-y-1/2',

  craft:
    'right-[calc(100%+16px)] top-1/2 -translate-y-1/2',
}

function ConceptCard({
  concept,
  onEnter,
  onLeave,
}: {
  concept: Concept
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y:
          concept.id === 'ergonomics'
            ? 8
            : concept.id === 'control'
              ? -8
              : 0,
        x:
          concept.id === 'motion' || concept.id === 'climate'
            ? -8
            : concept.id === 'craft' || concept.id === 'material'
              ? 8
              : 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.94,
      }}
      transition={{
        duration: 0.28,
        ease: easeOut,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`absolute hidden w-[290px] sm:block ${CARD_POSITIONS[concept.id]}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-6 text-left shadow-[0_30px_70px_-20px_rgba(6,59,61,0.35)] backdrop-blur-3xl">
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-gold-400 to-teal-500" />

        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#063B3D]/5 text-[#063B3D]">
            <concept.icon className="h-3.5 w-3.5 text-teal-700" />
          </span>

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-700">
            {concept.eyebrow}
          </p>
        </div>

        <h3 className="mt-2.5 font-display text-xl leading-snug text-[#063B3D]">
          {concept.title}
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-relaxed text-[#17494B]">
          {concept.description}
        </p>

        <div className="mt-3.5 border-t border-[#063B3D]/10 pt-3">
          <p className="text-[11px] font-normal leading-relaxed text-slate-600">
            {concept.detail}
          </p>
        </div>

        {concept.id === 'climate' && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-teal-700/15 bg-teal-700/[0.05] p-2.5 text-center">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-teal-800">
                Cooling
              </span>

              <span className="mt-0.5 block font-display text-base text-[#063B3D]">
                15°C
              </span>
            </div>

            <div className="rounded-xl border border-gold-500/20 bg-gold-400/[0.08] p-2.5 text-center">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-gold-800">
                Heating
              </span>

              <span className="mt-0.5 block font-display text-base text-[#063B3D]">
                35°C
              </span>
            </div>
          </div>
        )}

        {concept.id === 'control' && (
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {['Voice', 'Touch', 'Remote'].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[#063B3D]/10 bg-[#063B3D]/[0.04] px-2 py-1.5 text-center text-[8px] font-bold uppercase tracking-wider text-[#063B3D]"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function EngineeredComfort() {
  const [active, setActive] = useState<string | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const product = getProductBySlug('craft-classic')!
  const stageRef = useRef<HTMLDivElement>(null)

  const inView = useInView(stageRef, {
    once: true,
    amount: 0.3,
  })

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'center center'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])

  const activeConcept =
    CONCEPTS.find((concept) => concept.id === active) ?? null

  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
  }

  const openConcept = (id: string) => {
    clearHoverTimeout()
    setActive((current) => (current === id ? current : id))
  }

  const closeConcept = () => {
    clearHoverTimeout()

    hoverTimeout.current = setTimeout(() => {
      setActive(null)
      hoverTimeout.current = null
    }, 200)
  }

  const selectConcept = (id: string) => {
    clearHoverTimeout()
    setActive((current) => (current === id ? null : id))
  }

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionLabel>Engineered Comfort</SectionLabel>

          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Six disciplines,{' '}
            <span className="italic text-teal-700">
              one intelligent experience.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream-200 sm:text-base">
            Click or hover over any discipline to zoom directly into the corresponding anatomical feature.
          </p>
        </Reveal>

        <div
          ref={stageRef}
          className="relative mx-auto mt-16 w-full max-w-[700px] sm:mt-20"
        >
          <motion.div
            style={{ scale }}
            className="relative aspect-square w-full"
          >
            {/* AMBIENT LIGHT */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600/[0.08] blur-[80px]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/[0.06] blur-[65px]" />

            {/* ORBITS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: easeOut }}
              className="absolute inset-[11%] rounded-full border border-teal-700/15"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1, rotate: 360 } : {}}
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: 0.3,
                },
                rotate: {
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              className="pointer-events-none absolute inset-[8%] rounded-full border border-dashed border-gold-500/20"
            />

            {/* CONNECTION LINES */}
            <svg
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="conceptLine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(22,155,154,0.04)"
                  />

                  <stop
                    offset="50%"
                    stopColor="rgba(22,155,154,0.42)"
                  />

                  <stop
                    offset="100%"
                    stopColor="rgba(240,169,44,0.32)"
                  />
                </linearGradient>
              </defs>

              {CONCEPTS.map((concept, index) => {
                const dx = concept.x - 50
                const dy = concept.y - 50
                const distance = Math.sqrt(dx * dx + dy * dy)

                const endX =
                  50 + (dx / distance) * 28

                const endY =
                  50 + (dy / distance) * 28

                const isActive = active === concept.id

                return (
                  <g key={concept.id}>
                    <motion.line
                      x1={concept.x}
                      y1={concept.y}
                      x2={endX}
                      y2={endY}
                      stroke={
                        isActive
                          ? 'rgba(240,169,44,0.95)'
                          : 'url(#conceptLine)'
                      }
                      strokeWidth={
                        isActive ? 1.2 : 0.55
                      }
                      strokeDasharray={
                        isActive ? 'none' : '1.5 1.5'
                      }
                      vectorEffect="non-scaling-stroke"
                      initial={{
                        pathLength: 0,
                        opacity: 0,
                      }}
                      animate={
                        inView
                          ? {
                              pathLength: 1,
                              opacity: 1,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        delay: 0.35 + index * 0.08,
                        ease: easeOut,
                      }}
                    />

                    <motion.circle
                      cx={endX}
                      cy={endY}
                      r={isActive ? 2 : 1}
                      fill={
                        isActive
                          ? '#F0A92C'
                          : '#169B9A'
                      }
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={
                        inView
                          ? {
                              opacity: 1,
                              scale: 1,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.55 + index * 0.08,
                      }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* MAIN PRODUCT IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                ease: easeOut,
              }}
              className="absolute inset-[17%] z-[5] overflow-hidden rounded-full border border-white/80 bg-[#063B3D]/20 shadow-[0_45px_110px_-32px_rgba(6,59,61,0.5)]"
            >
              <motion.img
                src={homeProductImage(product.slug)}
                alt={product.name}
                loading="lazy"
                animate={{
                  scale: activeConcept
                    ? activeConcept.zoomScale
                    : 1,

                  x: activeConcept
                    ? `${50 - activeConcept.zoomX}%`
                    : '0%',

                  y: activeConcept
                    ? `${50 - activeConcept.zoomY}%`
                    : '0%',
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063B3D]/70 via-transparent to-white/5" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-6 text-center sm:pb-8">
                <AnimatePresence mode="wait">
                  {activeConcept ? (
                    <motion.div
                      key={activeConcept.id}
                      initial={{
                        opacity: 0,
                        y: 6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -6,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-300">
                        Focused on: {activeConcept.label}
                      </p>

                      <p className="mt-0.5 font-display text-base text-white sm:text-lg">
                        {activeConcept.title}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-[9px]">
                        Climate Craft
                      </p>

                      <p className="mt-0.5 font-display text-base text-white sm:text-lg">
                        Intelligent comfort
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CONCEPT BUTTONS */}
            {CONCEPTS.map((concept, index) => {
              const Icon = concept.icon
              const isActive = active === concept.id

              return (
                <motion.div
                  key={concept.id}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.35 + index * 0.08,
                    ease: easeOut,
                  }}
                  style={{
                    left: `${concept.x}%`,
                    top: `${concept.y}%`,
                  }}
                  className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                  onMouseEnter={() =>
                    openConcept(concept.id)
                  }
                  onMouseLeave={closeConcept}
                >
                  <motion.button
                    type="button"
                    onClick={() =>
                      selectConcept(concept.id)
                    }
                    onFocus={() =>
                      openConcept(concept.id)
                    }
                    onBlur={closeConcept}
                    aria-label={`Explore ${concept.label}`}
                    aria-pressed={isActive}
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    className="group relative outline-none"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.7,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.7,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="absolute -inset-2 rounded-full bg-gold-400/30 blur-md"
                        />
                      )}
                    </AnimatePresence>

                    <span
                      className={`relative flex items-center gap-2 rounded-full border px-3.5 py-2.5 backdrop-blur-xl transition-all duration-300 sm:px-4 sm:py-3 ${
                        isActive
                          ? 'border-gold-300 bg-gold-400 text-[#063B3D] shadow-[0_12px_30px_-8px_rgba(240,169,44,0.6)]'
                          : 'border-white/90 bg-white/[0.96] text-[#063B3D] shadow-[0_10px_28px_-12px_rgba(6,59,61,0.35)] hover:border-teal-700/30 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 flex-none" />

                      <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.16em] sm:text-[10px]">
                        {concept.label}
                      </span>
                    </span>
                  </motion.button>

                  {/* DESKTOP CARD */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onEnter={() =>
                          openConcept(concept.id)
                        }
                        onLeave={closeConcept}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* MOBILE DETAILS CARD */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            {activeConcept && (
              <motion.div
                key={activeConcept.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.25,
                  ease: easeOut,
                }}
                className="mx-auto mt-8 max-w-md"
              >
                <div className="relative rounded-2xl border border-white/95 bg-white/98 p-6 shadow-[0_25px_60px_-25px_rgba(6,59,61,0.4)] backdrop-blur-2xl">
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Close information"
                    className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#063B3D]/10 bg-white text-[#063B3D]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-2 pr-8">
                    <activeConcept.icon className="h-4 w-4 text-teal-700" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-700">
                      {activeConcept.eyebrow}
                    </p>
                  </div>

                  <h3 className="mt-2 pr-6 font-display text-xl leading-tight text-[#063B3D]">
                    {activeConcept.title}
                  </h3>

                  <p className="mt-2.5 text-[12px] font-medium leading-relaxed text-[#17494B]">
                    {activeConcept.description}
                  </p>

                  <p className="mt-3 border-t border-[#063B3D]/10 pt-3 text-[11px] leading-relaxed text-slate-600">
                    {activeConcept.detail}
                  </p>

                  {activeConcept.id === 'climate' && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-teal-700/[0.06] p-3 text-center">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-teal-700">
                          Cooling
                        </span>

                        <span className="font-display text-lg text-[#063B3D]">
                          15°C
                        </span>
                      </div>

                      <div className="rounded-xl bg-gold-400/[0.08] p-3 text-center">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-gold-700">
                          Heating
                        </span>

                        <span className="font-display text-lg text-[#063B3D]">
                          35°C
                        </span>
                      </div>
                    </div>
                  )}

                  {activeConcept.id === 'control' && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {['Voice', 'Touch', 'Remote'].map(
                        (item) => (
                          <div
                            key={item}
                            className="rounded-lg border border-[#063B3D]/10 bg-[#063B3D]/[0.035] px-2 py-2 text-center"
                          >
                            <span className="text-[8px] font-bold uppercase tracking-wider text-[#063B3D]">
                              {item}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}