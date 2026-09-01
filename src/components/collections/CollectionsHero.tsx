import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Mic, Droplets } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../../data/homeProducts'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HERO_SLIDES = [
  {
    slug: 'craft-motion',
    image: '/images/products/craft-motion/01.png',
    name: 'Craft Motion',
    label: 'Motorised Comfort',
  },
  {
    slug: 'craft-classic',
    image: '/images/products/craft-classic/01.png',
    name: 'Craft Classic',
    label: 'Classic',
  },
  {
    slug: 'climate-craft-signature',
    image: '/images/products/climate-craft-signature/01.png',
    name: 'Climate Craft | Signature',
    label: 'Climate Smart',
  },
] as const

export function CollectionsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:pt-40"
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 top-10 h-[480px] w-[480px] opacity-[0.22] blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, #f0a92c 0%, transparent 65%)',
          }}
        />

        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : { opacity: [0.18, 0.3, 0.18] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-[6%] top-[8%] h-[520px] w-[460px] blur-[160px]"
          style={{
            background:
              'radial-gradient(circle, #53c9c5 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl lg:px-8">
        <div className="flex min-h-[70vh] flex-col gap-12 lg:min-h-[80vh] lg:flex-row lg:items-stretch lg:gap-20">

          {/* ── Left: Typography & Smart Features ───────────────────────── */}
          <div className="flex flex-1 flex-col justify-center lg:max-w-[55%]">
            <Reveal>
              <SectionLabel>Climate Craft Collections</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-xl font-display text-[2rem] font-normal leading-[1.05] text-[#063B3D] sm:mt-7 sm:text-[2.6rem] lg:text-6xl lg:text-[4.25rem]">
                Liquid climate
                <br />
                <span className="relative inline-block italic text-teal-700">
                  control intelligence.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.9,
                      ease: easeOut,
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 max-w-[540px] text-[14px] leading-[1.7] text-ink-700 sm:mt-7 sm:text-[15px] lg:text-base">
                A smarter way to experience comfort — using a
                water-based liquid climate system engineered to
                intelligently manage the temperature around you.
                Combined with voice control and precision-crafted
                seating, every detail is designed around your comfort.
              </p>
            </Reveal>

            {/* Smart Feature Pills */}
            <Reveal delay={0.25}>
              <div className="mt-6 flex flex-wrap items-center gap-3">

                {/* Liquid Climate Control */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#063B3D]/15 bg-white/70 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                  <Droplets className="h-4 w-4 text-teal-600" />

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#063B3D]">
                    Liquid Climate Control
                  </span>
                </div>

                {/* Voice Recognition */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#063B3D]/15 bg-white/70 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                  <Mic className="h-4 w-4 text-teal-600" />

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#063B3D]">
                    Voice Recognition
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Highlight Statement */}
            <Reveal delay={0.28}>
              <div className="mt-7 max-w-[540px] rounded-2xl border border-teal-700/10 bg-white/45 px-5 py-4 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700/10 text-teal-700">
                    <Droplets className="h-4 w-4" />
                  </span>

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                      The Climate Craft Difference
                    </span>

                    <p className="mt-1.5 text-sm leading-relaxed text-[#063B3D]">
                      Intelligent comfort flows through the seat —
                      <span className="font-semibold">
                        {' '}
                        using plain water as the medium for liquid climate
                        control.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-x-10 gap-y-4 border-t border-[#063B3D]/15 pt-7 sm:gap-x-12">
                {[
                  {
                    value: String(PRODUCT_FAMILIES.length),
                    label: 'Collections',
                    accent: false,
                  },
                  {
                    value: String(HOME_PRODUCTS.length),
                    label: 'Pieces',
                    accent: false,
                  },
                  {
                    value: 'MTO',
                    label: 'Made to Order',
                    accent: true,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex cursor-default flex-col gap-1"
                  >
                    <span
                      className={`font-display text-3xl transition-transform duration-300 ease-out group-hover:-translate-y-0.5 ${
                        stat.accent
                          ? 'italic text-[#169B9A]'
                          : 'text-gold-700'
                      }`}
                    >
                      {stat.value}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.2em] text-ink-700">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right: Hero Image Frame ─────────────────────────────────── */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative mx-auto flex w-full max-w-[420px] flex-1 flex-col lg:mx-0 lg:max-w-[45%]"
          >
            {/* Soft Glow */}
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(22,155,154,0.28), transparent)',
              }}
            />

            {/* Accent Frame Line */}
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[32px] border border-white/60" />

            <Reveal delay={0.25} className="group flex flex-1 flex-col">
              <div className="relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-[26px] border border-white/70 shadow-[0_40px_90px_-28px_rgba(6,59,61,0.35)] transition-shadow duration-500 ease-out group-hover:shadow-[0_55px_120px_-24px_rgba(6,59,61,0.45)] sm:aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">

                {/* Each image is linked to its own exact product detail page */}
                <Link
                  to={`/products/${HERO_SLIDES[currentSlide].slug}`}
                  className="group/image absolute inset-0 z-[1] cursor-pointer"
                  aria-label={`View ${HERO_SLIDES[currentSlide].name}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={HERO_SLIDES[currentSlide].image}
                      alt={HERO_SLIDES[currentSlide].name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1,
                        ease: 'easeInOut',
                      }}
                      whileHover={{
                        scale: 1.035,
                      }}
                      className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-700 ease-out"
                    />
                  </AnimatePresence>

                  {/* Subtle image hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 group-hover/image:bg-white/[0.04]" />

                  {/* View Details Cursor Hint */}
                  <div className="pointer-events-none absolute bottom-24 right-5 flex translate-y-2 items-center gap-2 rounded-full border border-white/40 bg-black/30 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover/image:translate-y-0 group-hover/image:opacity-100 sm:bottom-28 sm:right-6">
                    View Details
                  </div>
                </Link>

                {/* Image Overlay */}
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#063B3D]/65 via-[#063B3D]/15 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                {/* Corner Accent Brackets */}
                <span className="pointer-events-none absolute left-5 top-5 z-[3] h-6 w-6 rounded-tl-lg border-l border-t border-white/70" />
                <span className="pointer-events-none absolute right-5 top-5 z-[3] h-6 w-6 rounded-tr-lg border-r border-t border-white/70" />

                {/* Top Badge */}
                <div className="pointer-events-none absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] font-medium tracking-wider text-white backdrop-blur-md">
                    <Droplets className="h-3 w-3 text-teal-300" />
                    <span>Liquid Climate Intelligence</span>
                  </div>
                </div>

                {/* Featured Piece Card */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: easeOut,
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 flex cursor-default items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(6,59,61,0.35)] backdrop-blur-md transition-colors duration-300 ease-out hover:border-white/80 hover:bg-white/90 sm:bottom-6 sm:left-6 sm:right-6"
                >
                  <div className="min-w-0">
                    <span className="block text-[9.5px] font-medium uppercase tracking-widest text-gold-700">
                      Featured Piece
                    </span>

                    <span className="mt-0.5 block truncate font-display text-base italic text-[#063B3D]">
                      {HERO_SLIDES[currentSlide].name}
                    </span>
                  </div>

                  <span className="relative flex h-2 w-2 flex-none">
                    {!prefersReducedMotion && (
                      <motion.span
                        animate={{
                          opacity: [0.7, 0, 0.7],
                          scale: [1, 2.2, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full bg-teal-400"
                      />
                    )}

                    <span className="relative h-2 w-2 rounded-full bg-teal-500" />
                  </span>
                </motion.div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}