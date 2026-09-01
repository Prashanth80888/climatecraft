import { useRef, useState } from 'react'
import {
  motion,
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
  previewImage: string
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
    previewImage: '/images/ergonomics.png',
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
    previewImage: '/images/motion.png',
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
    previewImage: '/images/climate.png',
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
    previewImage: '/images/control.png',
  },
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
    previewImage: '/images/material.png',
  },
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
    previewImage: '/images/craft.png',
  },
]

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
    setActive(id)
  }

  const closeConcept = () => {
    clearHoverTimeout()

    hoverTimeout.current = setTimeout(() => {
      setActive(null)
      hoverTimeout.current = null
    }, 150)
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
            Click or hover over any discipline to zoom directly into the
            corresponding feature.
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

                const endX = 50 + (dx / distance) * 28
                const endY = 50 + (dy / distance) * 28

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
                      strokeWidth={isActive ? 1.2 : 0.55}
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

            {/* =========================================================
                MAIN CIRCULAR IMAGE

                DEFAULT:
                Always uses the original Craft Classic product image.

                HOVER / CLICK:
                Only the image changes to the exact corresponding
                feature image. No zoom/scale — object-contain keeps
                the whole image (including any text in it) visible.

                NO DESKTOP CARD.
                NO MOBILE CARD.
                ========================================================= */}
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
              className="absolute inset-[17%] z-[5] overflow-hidden rounded-full border border-white/80 bg-[#063B3D] shadow-[0_45px_110px_-32px_rgba(6,59,61,0.5)]"
            >
              <motion.img
                key={activeConcept?.id ?? 'default'}
                src={
                  activeConcept
                    ? activeConcept.previewImage
                    : homeProductImage(product.slug)
                }
                alt={
                  activeConcept
                    ? `${activeConcept.label} feature`
                    : product.name
                }
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  ease: easeOut,
                }}
                className="h-full w-full object-contain"
              />

              {/* Very subtle image protection overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-[#063B3D]/20 via-transparent to-white/[0.03]" />
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
                  onMouseEnter={() => openConcept(concept.id)}
                  onMouseLeave={closeConcept}
                >
                  <motion.button
                    type="button"
                    onClick={() => selectConcept(concept.id)}
                    onFocus={() => openConcept(concept.id)}
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
                    {/* ACTIVE GLOW */}
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
                        transition={{
                          duration: 0.2,
                        }}
                        className="absolute -inset-2 rounded-full bg-gold-400/30 blur-md"
                      />
                    )}

                    {/* LABEL */}
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
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}