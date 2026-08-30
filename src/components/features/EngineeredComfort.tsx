
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
}

const CONCEPTS: Concept[] = [
  {
    id: 'ergonomics',
    label: 'Ergonomics',
    x: 50,
    y: 6,
    icon: Armchair,
    eyebrow: 'Designed around you',
    title: 'Comfort follows the body.',
    description:
      'Every seating position is considered around posture, support and long-session comfort.',
    detail:
      'The seating experience is shaped around the body so support and relaxation feel natural rather than simply soft.',
  },
  {
    id: 'motion',
    label: 'Motion',
    x: 91,
    y: 29,
    icon: Cog,
    eyebrow: 'Precision movement',
    title: 'Movement without interruption.',
    description:
      'Motorised reclining lets the seat adapt smoothly to the way you want to sit, relax or watch.',
    detail:
      'The integrated mechanism is designed for smooth, quiet position changes while keeping the experience effortless.',
  },
  {
    id: 'climate',
    label: 'Climate',
    x: 91,
    y: 71,
    icon: Droplets,
    eyebrow: 'Liquid Climate Control Intelligence',
    title: 'Your climate. Inside the seat.',
    description:
      'Plain-water liquid climate control brings personalised heating and cooling directly into the seating experience.',
    detail:
      'Temperature-controlled liquid circulates through integrated comfort zones to create a more personalised seating environment without relying on conventional air blowers.',
  },
  {
    id: 'control',
    label: 'Control',
    x: 50,
    y: 94,
    icon: MousePointer2,
    eyebrow: 'Intelligent control',
    title: 'Comfort, at your command.',
    description:
      'Control the seating experience through voice, touchscreen and remote interaction.',
    detail:
      'Recline, adjust comfort settings and manage the climate experience through intuitive controls designed to keep the technology simple.',
  },
  {
    id: 'material',
    label: 'Material',
    x: 9,
    y: 71,
    icon: Layers3,
    eyebrow: 'Material intelligence',
    title: 'Every surface has a purpose.',
    description:
      'Premium upholstery and carefully selected materials complete the engineered seating experience.',
    detail:
      'Materials are selected to balance tactile comfort, durability and a refined appearance that works naturally within premium interiors.',
  },
  {
    id: 'craft',
    label: 'Craft',
    x: 9,
    y: 29,
    icon: Hand,
    eyebrow: 'Made with intention',
    title: 'Technology meets craftsmanship.',
    description:
      'Intelligent mechanisms are brought together with the detail and finish expected from premium furniture.',
    detail:
      'Mechanism, materials, proportions and finishing are considered together to create one complete seating experience.',
  },
]

/*
 * Each card has its own controlled position.
 *
 * IMPORTANT:
 * The cards are intentionally kept outside the main product image.
 * This prevents the information panels from covering the product.
 */
const CARD_POSITIONS: Record<string, string> = {
  ergonomics:
    'left-1/2 top-[1%] -translate-x-1/2 -translate-y-full',

  motion:
    'left-[96%] top-[29%] -translate-y-1/2',

  climate:
    'left-[96%] top-[71%] -translate-y-1/2',

  control:
    'left-1/2 bottom-[1%] -translate-x-1/2 translate-y-full',

  material:
    'right-[96%] top-[71%] -translate-y-1/2',

  craft:
    'right-[96%] top-[29%] -translate-y-1/2',
}

const CARD_ALIGNMENT: Record<string, string> = {
  ergonomics: 'text-center',
  motion: 'text-left',
  climate: 'text-left',
  control: 'text-center',
  material: 'text-right',
  craft: 'text-right',
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
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.22,
        ease: easeOut,
      }}
      /*
       * The pointer events remain enabled on the card.
       * This allows the user to move from the circle button
       * into the card without losing the active state.
       */
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`absolute hidden w-[270px] sm:block ${CARD_POSITIONS[concept.id]}`}
    >
      <div
        className={`relative rounded-[20px] border border-white/95 bg-white/[0.98] p-5 shadow-[0_25px_65px_-28px_rgba(6,59,61,0.48)] backdrop-blur-2xl ${CARD_ALIGNMENT[concept.id]}`}
      >
        {/* TOP GOLD DETAIL */}
        <div
          className={`absolute top-0 h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent ${
            concept.id === 'motion' ||
            concept.id === 'climate'
              ? 'left-5'
              : concept.id === 'craft' ||
                  concept.id === 'material'
                ? 'right-5'
                : 'left-1/2 -translate-x-1/2'
          }`}
        />

        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold-700">
          {concept.eyebrow}
        </p>

        <h3 className="mt-2 font-display text-[20px] leading-[1.12] text-[#063B3D]">
          {concept.title}
        </h3>

        <p className="mt-3 text-[12px] font-medium leading-[1.55] text-[#17494B]">
          {concept.description}
        </p>

        <div className="mt-3 border-t border-[#063B3D]/10 pt-3">
          <p className="text-[11px] leading-[1.55] text-ink-700">
            {concept.detail}
          </p>
        </div>

        {/* CLIMATE DETAILS */}
        {concept.id === 'climate' && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-teal-700/10 bg-teal-700/[0.06] px-3 py-2 text-center">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-teal-700">
                Cooling
              </span>

              <span className="mt-0.5 block font-display text-lg text-[#063B3D]">
                15°C
              </span>
            </div>

            <div className="rounded-xl border border-gold-500/15 bg-gold-400/[0.08] px-3 py-2 text-center">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-gold-700">
                Heating
              </span>

              <span className="mt-0.5 block font-display text-lg text-[#063B3D]">
                35°C
              </span>
            </div>
          </div>
        )}

        {/* CONTROL DETAILS */}
        {concept.id === 'control' && (
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {['Voice', 'Touch', 'Remote'].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[#063B3D]/10 bg-[#063B3D]/[0.035] px-2 py-2 text-center text-[8px] font-semibold uppercase tracking-wider text-[#063B3D]"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* POINTER */}
        <span
          className={`absolute h-3 w-3 rotate-45 border-white/95 bg-white/[0.98] ${
            concept.id === 'motion' ||
            concept.id === 'climate'
              ? '-left-1.5 top-1/2 -translate-y-1/2 border-b border-l'
              : concept.id === 'craft' ||
                  concept.id === 'material'
                ? '-right-1.5 top-1/2 -translate-y-1/2 border-t border-r'
                : concept.id === 'ergonomics'
                  ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-b border-r'
                  : 'top-[-6px] left-1/2 -translate-x-1/2 border-l border-t'
          }`}
        />
      </div>
    </motion.div>
  )
}

export function EngineeredComfort() {
  const [active, setActive] = useState<string | null>(null)

  /*
   * This state prevents the hover interaction from constantly
   * reopening/restarting the card when the pointer moves.
   */
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

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.96, 1],
  )

  const activeConcept =
    CONCEPTS.find((concept) => concept.id === active) ?? null

  /*
   * Clear any pending close operation.
   */
  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
  }

  /*
   * Open immediately.
   * If the same item is already active, do nothing.
   * This is what prevents unnecessary animation refreshes.
   */
  const openConcept = (id: string) => {
    clearHoverTimeout()

    setActive((current) => {
      if (current === id) {
        return current
      }

      return id
    })
  }

  /*
   * Do not close immediately.
   * Give the pointer a short bridge period to travel
   * from the button to the information card.
   */
  const closeConcept = () => {
    clearHoverTimeout()

    hoverTimeout.current = setTimeout(() => {
      setActive(null)
      hoverTimeout.current = null
    }, 180)
  }

  /*
   * Clicking/tapping should remain stable.
   */
  const selectConcept = (id: string) => {
    clearHoverTimeout()

    setActive((current) =>
      current === id ? null : id,
    )
  }

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* SECTION INTRO */}
        <Reveal className="text-center">
          <SectionLabel>Engineered Comfort</SectionLabel>

          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Six disciplines,{' '}
            <span className="italic text-teal-700">
              one intelligent experience.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream-200 sm:text-base">
            Explore the thinking behind Climate Craft.
            Hover or select each discipline to discover what
            makes the experience different.
          </p>
        </Reveal>

        {/* INTERACTIVE PRODUCT AREA */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-16 w-full max-w-[700px] sm:mt-20"
        >
          <motion.div
            style={{ scale }}
            className="relative aspect-square w-full"
          >

            {/* AMBIENT LIGHT */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600/[0.07] blur-[75px]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/[0.055] blur-[60px]" />

            {/* OUTER ORBIT */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
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
                duration: 1,
                ease: easeOut,
              }}
              className="absolute inset-[11%] rounded-full border border-teal-700/15"
            />

            {/* SECONDARY ORBIT */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      rotate: 360,
                    }
                  : {}
              }
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: 0.3,
                },
                rotate: {
                  duration: 36,
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

                const distance = Math.sqrt(
                  dx * dx + dy * dy,
                )

                const endX =
                  50 + (dx / distance) * 28

                const endY =
                  50 + (dy / distance) * 28

                const isActive =
                  active === concept.id

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
                        isActive ? 0.9 : 0.55
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
                        delay:
                          0.35 + index * 0.08,
                        ease: easeOut,
                      }}
                    />

                    <motion.circle
                      cx={endX}
                      cy={endY}
                      r={isActive ? 1.8 : 1}
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
                        delay:
                          0.55 + index * 0.08,
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
                      scale: activeConcept
                        ? 1.025
                        : 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                ease: easeOut,
              }}
              className="absolute inset-[17%] z-[5] overflow-hidden rounded-full border border-white/80 bg-white/20 shadow-[0_45px_110px_-32px_rgba(6,59,61,0.4)]"
            >
              <motion.img
                src={homeProductImage(product.slug)}
                alt={product.name}
                loading="lazy"
                animate={{
                  scale: activeConcept ? 1.035 : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: easeOut,
                }}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/60 via-transparent to-white/5" />

              {/* IMAGE LABEL */}
              <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 text-center sm:pb-9">
                <AnimatePresence mode="wait">
                  {activeConcept ? (
                    <motion.div
                      key={activeConcept.id}
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      transition={{
                        duration: 0.22,
                      }}
                    >
                      <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-gold-300 sm:text-[9px]">
                        {activeConcept.eyebrow}
                      </p>

                      <p className="mt-1 font-display text-lg leading-tight text-white sm:text-xl">
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

                      <p className="mt-1 font-display text-lg text-white sm:text-xl">
                        Intelligent comfort
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ORBIT LIGHT */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      rotate: 360,
                    }
                  : {}
              }
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: 0.8,
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              className="pointer-events-none absolute inset-[11%] z-[6]"
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_14px_5px_rgba(240,169,44,0.6)]" />
            </motion.div>

            {/* CONCEPT BUTTONS */}
            {CONCEPTS.map((concept, index) => {
              const Icon = concept.icon
              const isActive =
                active === concept.id

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
                    delay:
                      0.35 + index * 0.08,
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
                      scale: 1.07,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="group relative outline-none"
                  >
                    {/* ACTIVE GLOW */}
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
                          className="absolute -inset-2 rounded-full bg-gold-400/25 blur-md"
                        />
                      )}
                    </AnimatePresence>

                    {/* BUTTON */}
                    <span
                      className={`relative flex items-center gap-2 rounded-full border px-3 py-2.5 backdrop-blur-xl transition-colors duration-300 sm:px-4 sm:py-3 ${
                        isActive
                          ? 'border-gold-300 bg-gold-400 text-[#063B3D] shadow-[0_12px_30px_-8px_rgba(240,169,44,0.6)]'
                          : 'border-white/90 bg-white/[0.96] text-[#063B3D] shadow-[0_10px_28px_-12px_rgba(6,59,61,0.35)] hover:border-teal-700/30 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 flex-none" />

                      <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px]">
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
                          openConcept(
                            concept.id,
                          )
                        }
                        onLeave={closeConcept}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* DESKTOP INSTRUCTION */}
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={
              inView
                ? {
                    opacity: active ? 0 : 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.3,
            }}
            className="pointer-events-none mt-5 flex w-full justify-center text-center"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-cream-200">
            </span>
          </motion.div>
        </div>

        {/* MOBILE INFORMATION */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            {activeConcept && (
              <motion.div
                key={activeConcept.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                }}
                transition={{
                  duration: 0.25,
                  ease: easeOut,
                }}
                className="mx-auto mt-7 max-w-md"
              >
                <div className="relative rounded-[20px] border border-white/95 bg-white/[0.98] p-5 shadow-[0_25px_60px_-25px_rgba(6,59,61,0.4)] backdrop-blur-2xl">

                  <button
                    type="button"
                    onClick={() =>
                      setActive(null)
                    }
                    aria-label="Close information"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#063B3D]/10 bg-white text-[#063B3D]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <p className="pr-8 text-[8px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    {activeConcept.eyebrow}
                  </p>

                  <h3 className="mt-2 pr-8 font-display text-xl leading-tight text-[#063B3D]">
                    {activeConcept.title}
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-relaxed text-[#17494B]">
                    {activeConcept.description}
                  </p>

                  <p className="mt-3 border-t border-[#063B3D]/10 pt-3 text-[11px] leading-relaxed text-ink-700">
                    {activeConcept.detail}
                  </p>

                  {activeConcept.id ===
                    'climate' && (
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

                  {activeConcept.id ===
                    'control' && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        'Voice',
                        'Touch',
                        'Remote',
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-[#063B3D]/10 bg-[#063B3D]/[0.035] px-2 py-2 text-center"
                        >
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-[#063B3D]">
                            {item}
                          </span>
                        </div>
                      ))}
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
