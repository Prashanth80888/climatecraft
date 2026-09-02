import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  getProductBySlug,
  PRODUCT_FAMILIES,
  type HomeProduct,
} from '../../data/homeProducts'
import { homeProductImages } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

/*
|--------------------------------------------------------------------------
| DISPLAY ORDER
|--------------------------------------------------------------------------
*/
const FAMILY_ORDER: HomeProduct['familyId'][] = [
  'motorised-comfort',
  'classic',
  'climate-smart',
]

/*
|--------------------------------------------------------------------------
| REPRESENTATIVE PRODUCT
|--------------------------------------------------------------------------
*/
const FAMILY_REPS: Record<HomeProduct['familyId'], string> = {
  'motorised-comfort': 'craft-motion',
  classic: 'craft-classic-grand',
  'climate-smart': 'climate-craft-signature',
}

/*
|--------------------------------------------------------------------------
| FEATURE DEFINITIONS
|--------------------------------------------------------------------------
*/
type Feature = {
  id: string
  title: string
  description: string
  benefit: string
  x: number
  y: number
  placement: 'top' | 'bottom' | 'left' | 'right'
}

/*
|--------------------------------------------------------------------------
| FEATURE CONTENT
|--------------------------------------------------------------------------
*/
const FEATURES: Record<string, Feature[]> = {
  'craft-motion': [
    {
      id: 'recline-control',
      title: 'Motorised Recline Controller',
      description:
        'The integrated control buttons on the armrest let you adjust the motorised recline and leg-rest position smoothly.',
      benefit:
        'Fine-tune your seating position with simple, effortless controls.',
      x: 31,
      y: 58,
      placement: 'bottom', // Changed from 'top' to 'bottom' so card renders downward
    },
    {
      id: 'comfort-panel',
      title: 'Integrated Comfort Control',
      description:
        'The built-in control panel keeps key comfort settings conveniently within reach while you relax.',
      benefit:
        'Keep your comfort controls exactly where you need them — right at the armrest.',
      x: 39,
      y: 54,
      placement: 'bottom', // Changed from 'top' to 'bottom' so card renders downward
    },
    {
      id: 'cupholder',
      title: 'Integrated Cup Holder',
      description:
        'A built-in cup holder keeps your drink secure and close while you relax.',
      benefit:
        'Everything you need stays within comfortable reach.',
      x: 83,
      y: 46,
      placement: 'left',
    },
    {
      id: 'headrest',
      title: 'Plush Ergonomic Cushioning',
      description:
        'Generous upper cushioning supports the head and upper body during extended periods of relaxation.',
      benefit:
        'Support is designed around the way you naturally rest.',
      x: 51,
      y: 29,
      placement: 'bottom',
    },
  ],

  'craft-classic-grand': [
    {
      id: 'upholstery',
      title: 'Premium Upholstery',
      description:
        'Carefully selected upholstery gives the seating its refined tactile finish.',
      benefit:
        'Comfort and visual quality come together in one understated surface.',
      x: 37,
      y: 35,
      placement: 'bottom',
    },
    {
      id: 'configuration',
      title: 'Three-Seat Configuration',
      description:
        'A spacious three-seat layout provides generous room for shared relaxation.',
      benefit:
        'Designed to bring more people comfortably into the same space.',
      x: 56,
      y: 56,
      placement: 'top',
    },
    {
      id: 'silhouette',
      title: 'Refined Contemporary Silhouette',
      description:
        'Clean proportions and a balanced form allow the sofa to sit naturally within a premium interior.',
      benefit:
        'A strong presence without overpowering the room.',
      x: 75,
      y: 72,
      placement: 'top',
    },
  ],

  'climate-craft-signature': [
    {
      id: 'control',
      title: 'Smart Interface Control',
      description:
        'The integrated control interface brings the seating and comfort settings together in one place.',
      benefit:
        'Adjust your seating experience without interrupting your comfort.',
      x: 67,
      y: 45,
      placement: 'left',
    },
    {
      id: 'temperature',
      title: 'Liquid Climate Control',
      description:
        'Liquid-based climate control intelligence brings personalised heating and cooling into the seating experience.',
      benefit:
        'Temperature-controlled liquid works through integrated comfort zones rather than conventional air blowers.',
      x: 43,
      y: 39,
      placement: 'right',
    },
    {
      id: 'recline',
      title: 'Motorised Reclining & Leg Rest',
      description:
        'Motorised movement lets the seating position and leg support adjust smoothly.',
      benefit:
        'Comfort responds to the way you want to sit, relax and rest.',
      x: 51,
      y: 64,
      placement: 'top',
    },
  ],
}

/*
|--------------------------------------------------------------------------
| WHY IT MATTERS
|--------------------------------------------------------------------------
*/
const FAMILY_BENEFITS: Record<string, string> = {
  'craft-motion':
    'Motorised comfort brings effortless movement and useful everyday features together in one premium seat.',

  'craft-classic-grand':
    'Classic comfort focuses on refined upholstery, generous space and timeless proportions.',

  'climate-craft-signature':
    'Climate Smart combines intelligent controls, motorised comfort and liquid-based temperature control inside the seating experience.',
}

/*
|--------------------------------------------------------------------------
| Tooltip position helper
|--------------------------------------------------------------------------
*/
function tooltipClasses(placement: Feature['placement']) {
  switch (placement) {
    case 'top':
      return 'bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2'

    case 'bottom':
      return 'left-1/2 top-[calc(100%+14px)] -translate-x-1/2'

    case 'left':
      return 'right-[calc(100%+14px)] top-1/2 -translate-y-1/2'

    case 'right':
      return 'left-[calc(100%+14px)] top-1/2 -translate-y-1/2'
  }
}

/*
|--------------------------------------------------------------------------
| POINTER / ARROW
|--------------------------------------------------------------------------
*/
function arrowClasses(placement: Feature['placement']) {
  switch (placement) {
    case 'top':
      return '-bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b'

    case 'bottom':
      return '-top-1.5 left-1/2 -translate-x-1/2 border-l border-t'

    case 'left':
      return '-right-1.5 top-1/2 -translate-y-1/2 border-t border-r'

    case 'right':
      return '-left-1.5 top-1/2 -translate-y-1/2 border-b border-l'
  }
}

export function FeatureExplorer() {
  const [familyId, setFamilyId] =
    useState<HomeProduct['familyId']>('motorised-comfort')

  const [activeId, setActiveId] = useState<string | null>(null)

  const product = getProductBySlug(FAMILY_REPS[familyId])!

  const family = PRODUCT_FAMILIES.find(
    (item) => item.id === familyId,
  )!

  const images = homeProductImages(
    product.slug,
    product.imageCount,
  )

  const displayImage = images[0]

  const features = FEATURES[product.slug] ?? []

  const activeFeature =
    features.find((feature) => feature.id === activeId) ?? null

  const activeIndex = activeFeature
    ? features.findIndex(
      (feature) => feature.id === activeFeature.id,
    )
    : -1

  const selectFamily = (id: HomeProduct['familyId']) => {
    if (id === familyId) return

    setFamilyId(id)
    setActiveId(null)
  }

  const activateFeature = (id: string) => {
    setActiveId((current) => (current === id ? current : id))
  }

  const toggleFeature = (id: string) => {
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="feature-explorer"
      className="relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -right-48 top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.12] blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, rgba(22,155,154,0.35) 35%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute -left-48 bottom-[-10%] h-[500px] w-[500px] rounded-full opacity-[0.08] blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Feature Discovery</SectionLabel>

          <h2 className="mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.08] text-cream-100 sm:text-4xl lg:text-[2.9rem]">
            Explore the thinking{' '}
            <span className="italic text-teal-700">
              inside every seat.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream-200">
            Choose a collection and explore its key features
            directly on the product.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Seating collections"
            className="mt-9 inline-flex flex-wrap items-center gap-1 rounded-full border border-white/80 bg-white/55 p-1 shadow-[0_18px_45px_-24px_rgba(6,59,61,0.28),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px]"
          >
            {FAMILY_ORDER.map((id) => {
              const familyItem = PRODUCT_FAMILIES.find(
                (item) => item.id === id,
              )

              if (!familyItem) return null

              const selected = familyId === id

              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectFamily(id)}
                  className={`relative rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-6 ${selected
                    ? 'text-white'
                    : 'text-[#315F61] hover:text-[#063B3D]'
                    }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="feature-family-pill"
                      transition={{
                        duration: 0.45,
                        ease: easeOut,
                      }}
                      className="absolute inset-0 rounded-full bg-teal-700 shadow-[0_12px_28px_-10px_rgba(22,155,154,0.7),inset_0_1px_0_rgba(255,255,255,0.28)]"
                    />
                  )}

                  <span className="relative z-10">
                    {familyItem.label}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.99,
              }}
              transition={{
                duration: 0.55,
                ease: easeOut,
              }}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-8">
                {/* Changed overflow-hidden to visible so top/side card overlays do not clip */}
                <motion.div
                  animate={{
                    scale: activeFeature ? 1.008 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: easeOut,
                  }}
                  className="relative rounded-[30px] border border-white/70 bg-[#E8EFEC] shadow-[0_45px_110px_-42px_rgba(6,61,60,0.38)]"
                >
                  {/* Container allowing full visibility of floating tooltips */}
                  <div className="relative aspect-[4/3] w-full rounded-[30px] max-sm:aspect-[1/1] sm:aspect-[16/10]">
                    <motion.img
                      key={product.slug}
                      src={displayImage}
                      alt={product.name}
                      initial={{
                        opacity: 0,
                        scale: 1.025,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: easeOut,
                      }}
                      className="absolute inset-0 h-full w-full rounded-[30px] select-none object-cover object-center"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-t from-black/30 via-transparent to-black/[0.03]" />

                    <div
                      className="pointer-events-none absolute inset-0 rounded-[30px] opacity-[0.08] mix-blend-multiply"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(6,59,61,0.55), transparent 45%, rgba(22,155,154,0.22))',
                      }}
                    />

                    <div className="absolute left-3 top-3 z-40 sm:left-5 sm:top-5">
                      <div className="rounded-full border border-white/75 bg-white/85 px-3 py-1.5 shadow-[0_12px_28px_-16px_rgba(6,59,61,0.4)] backdrop-blur-xl sm:px-4 sm:py-2">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gold-700 sm:text-[9px] sm:tracking-[0.16em]">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-5 top-5 z-40 hidden sm:block">
                      <div className="rounded-full border border-white/35 bg-black/20 px-4 py-2 backdrop-blur-xl">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/90">
                          {family.label}
                        </span>
                      </div>
                    </div>

                    {features.map((feature, index) => {
                      const isActive = feature.id === activeId

                      return (
                        <div
                          key={feature.id}
                          className="absolute z-50 hidden lg:block"
                          style={{
                            left: `${feature.x}%`,
                            top: `${feature.y}%`,
                          }}
                        >
                          <button
                            type="button"
                            aria-label={`Explore ${feature.title}`}
                            aria-expanded={isActive}
                            onMouseEnter={() =>
                              activateFeature(feature.id)
                            }
                            onFocus={() =>
                              activateFeature(feature.id)
                            }
                            onClick={() =>
                              toggleFeature(feature.id)
                            }
                            className="group relative -translate-x-1/2 -translate-y-1/2 outline-none"
                          >
                            <motion.span
                              animate={{
                                scale: isActive
                                  ? 1.35
                                  : [1, 1.18, 1],
                                opacity: isActive
                                  ? 0
                                  : [0.25, 0.08, 0.25],
                              }}
                              transition={
                                isActive
                                  ? {
                                    duration: 0.4,
                                    ease: easeOut,
                                  }
                                  : {
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }
                              }
                              className="absolute inset-0 -m-3 rounded-full"
                              style={{
                                background:
                                  'radial-gradient(circle, rgba(22,155,154,0.8) 0%, transparent 70%)',
                              }}
                            />

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
                                    scale: 0.75,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    ease: easeOut,
                                  }}
                                  className="absolute -inset-2 rounded-full border border-gold-300/80"
                                />
                              )}
                            </AnimatePresence>

                            <motion.span
                              animate={{
                                scale: isActive ? 1.1 : 1,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: easeOut,
                              }}
                              className={`relative flex h-8 w-8 items-center justify-center rounded-full border font-display text-[10px] italic shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 sm:h-10 sm:w-10 sm:text-[11px] ${isActive
                                ? 'border-gold-300 bg-gold-400 text-[#063B3D]'
                                : 'border-white/85 bg-white/85 text-gold-700 group-hover:border-gold-300 group-hover:bg-white'
                                }`}
                            >
                              {String(index + 1).padStart(
                                2,
                                '0',
                              )}
                            </motion.span>

                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    scale: 0.94,
                                    y:
                                      feature.placement ===
                                        'top'
                                        ? 7
                                        : feature.placement ===
                                          'bottom'
                                          ? -7
                                          : 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                  }}
                                  transition={{
                                    duration: 0.28,
                                    ease: easeOut,
                                  }}
                                  className={`pointer-events-auto absolute hidden w-[205px] lg:block sm:w-[235px] ${tooltipClasses(
                                    feature.placement,
                                  )}`}
                                  onMouseEnter={() =>
                                    activateFeature(
                                      feature.id,
                                    )
                                  }
                                >
                                  <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-[#F9FFFD]/95 p-4 text-left shadow-[0_25px_55px_-22px_rgba(6,59,61,0.55)] backdrop-blur-2xl sm:p-5">
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />

                                    <div
                                      className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-30 blur-2xl"
                                      style={{
                                        background:
                                          'radial-gradient(circle, #53c9c5, transparent 70%)',
                                      }}
                                    />

                                    <div className="relative mb-3 flex items-center gap-2">
                                      <span className="font-display text-[11px] italic text-gold-700">
                                        {String(
                                          index + 1,
                                        ).padStart(2, '0')}
                                      </span>

                                      <span className="h-px w-7 bg-gold-400/70" />

                                      <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-teal-700">
                                        Feature
                                      </span>
                                    </div>

                                    <h3 className="relative font-display text-[17px] font-medium leading-[1.18] text-[#063B3D] sm:text-[18px]">
                                      {feature.title}
                                    </h3>

                                    <p className="relative mt-2.5 text-[11.5px] leading-[1.55] text-[#315F61] sm:text-[12.5px]">
                                      {feature.description}
                                    </p>

                                    <div className="relative mt-3 border-t border-[#063B3D]/10 pt-3">
                                      <span className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-teal-700">
                                        Why it matters
                                      </span>

                                      <p className="mt-1.5 text-[10.5px] leading-[1.5] text-[#416A6C]">
                                        {feature.benefit}
                                      </p>
                                    </div>

                                    <div
                                      className={`absolute h-2.5 w-2.5 rotate-45 border-white/80 bg-[#F9FFFD]/95 ${arrowClasses(
                                        feature.placement,
                                      )}`}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      )
                    })}

                    <div className="absolute bottom-4 left-3 z-40 sm:bottom-5 sm:left-5 lg:block">
                      <div className="hidden items-center gap-2 rounded-full border border-white/35 bg-black/20 px-3.5 py-2 backdrop-blur-xl lg:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(240,169,44,0.9)]" />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-[9px]">
                          Hover a point to explore
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-4 lg:hidden">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-teal-700">
                        Explore features
                      </p>
                      <p className="mt-1 text-[10px] text-[#416A6C]">
                        Tap a feature to view the detail.
                      </p>
                    </div>
                    <span className="rounded-full border border-white/80 bg-white/65 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                      {activeFeature
                        ? `${String(activeIndex + 1).padStart(2, '0')} / ${String(features.length).padStart(2, '0')}`
                        : `${String(features.length).padStart(2, '0')} features`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {features.map((feature, index) => {
                      const isActive = feature.id === activeId

                      return (
                        <button
                          key={`mobile-${feature.id}`}
                          type="button"
                          onClick={() => toggleFeature(feature.id)}
                          aria-pressed={isActive}
                          className={`flex min-h-[52px] items-center gap-2.5 rounded-[16px] border px-3 py-2.5 text-left transition-all duration-200 ${isActive
                              ? 'border-teal-700/30 bg-teal-700 text-white shadow-[0_12px_26px_-16px_rgba(6,59,61,0.7)]'
                              : 'border-white/80 bg-white/75 text-[#063B3D] shadow-[0_10px_24px_-18px_rgba(6,59,61,0.35)]'
                            }`}
                        >
                          <span
                            className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-display text-[10px] italic ${isActive
                                ? 'bg-gold-400 text-[#063B3D]'
                                : 'bg-[#E6F2EF] text-gold-700'
                              }`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span
                            className={`min-w-0 text-[9px] font-semibold uppercase leading-[1.25] tracking-[0.08em] ${isActive ? 'text-white' : 'text-[#315F61]'
                              }`}
                          >
                            {feature.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeFeature && (
                    <motion.div
                      key={`mobile-feature-${activeFeature.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: easeOut }}
                      className="mt-3 rounded-[20px] border border-white/80 bg-[#F9FFFD]/95 p-4 text-left shadow-[0_20px_45px_-24px_rgba(6,59,61,0.5)] backdrop-blur-2xl lg:hidden"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[11px] italic text-gold-700">
                          {String(activeIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px w-7 bg-gold-400/70" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-teal-700">
                          Feature detail
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-[18px] font-medium leading-tight text-[#063B3D]">
                        {activeFeature.title}
                      </h3>

                      <p className="mt-2 text-[12px] leading-[1.6] text-[#315F61]">
                        {activeFeature.description}
                      </p>

                      <div className="mt-3 border-t border-[#063B3D]/10 pt-3">
                        <span className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-teal-700">
                          Why it matters
                        </span>
                        <p className="mt-1.5 text-[10.5px] leading-[1.5] text-[#416A6C]">
                          {activeFeature.benefit}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block lg:col-span-4">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: easeOut,
                  }}
                  className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/55 p-6 shadow-[0_25px_65px_-35px_rgba(6,59,61,0.35)] backdrop-blur-xl sm:p-7"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />

                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
                    style={{
                      background:
                        'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
                    }}
                  />

                  <div className="relative">
                    <span className="font-display text-sm italic text-teal-700">
                      {family.label}
                    </span>

                    <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-[#063B3D]">
                      {product.name}
                    </h3>

                    <p className="mt-4 text-[13px] leading-relaxed text-[#315F61]">
                      {FAMILY_BENEFITS[product.slug]}
                    </p>

                    <div className="mt-6 border-t border-[#063B3D]/10 pt-5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.17em] text-teal-700">
                        Explore the details
                      </p>

                      <div className="mt-4 space-y-3">
                        {features.map((feature, index) => {
                          const isActive = feature.id === activeId

                          return (
                            <button
                              key={feature.id}
                              type="button"
                              onMouseEnter={() =>
                                activateFeature(feature.id)
                              }
                              onFocus={() =>
                                activateFeature(feature.id)
                              }
                              onClick={() =>
                                toggleFeature(feature.id)
                              }
                              className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all duration-300 ${isActive
                                ? 'bg-white/85 shadow-[0_8px_20px_-14px_rgba(6,59,61,0.4)]'
                                : 'hover:bg-white/55'
                                }`}
                            >
                              <span
                                className={`font-display text-[11px] italic ${isActive
                                  ? 'text-gold-700'
                                  : 'text-teal-700/65'
                                  }`}
                              >
                                {String(index + 1).padStart(
                                  2,
                                  '0',
                                )}
                              </span>

                              <span
                                className={`text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${isActive
                                  ? 'text-[#063B3D]'
                                  : 'text-[#416A6C] group-hover:text-[#063B3D]'
                                  }`}
                              >
                                {feature.title}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 border-t border-[#063B3D]/10 pt-5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />

                      <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#416A6C]">
                        {activeFeature
                          ? `Exploring ${String(
                            activeIndex + 1,
                          ).padStart(2, '0')} / ${String(
                            features.length,
                          ).padStart(2, '0')}`
                          : 'Select a point on the product'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}