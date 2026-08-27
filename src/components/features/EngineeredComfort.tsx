import { useMemo, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { getProductBySlug } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Precise positional coordinates (percentage of container width/height)
const CONCEPTS = [
  { id: 'ergonomics', label: 'Ergonomics', x: 50, y: 5 },
  { id: 'motion', label: 'Motion', x: 88, y: 26 },
  { id: 'climate', label: 'Climate', x: 88, y: 74 },
  { id: 'control', label: 'Control', x: 50, y: 95 },
  { id: 'material', label: 'Material', x: 12, y: 74 },
  { id: 'craft', label: 'Craft', x: 12, y: 26 },
]

const CIRCLE_CENTER = 50
const CIRCLE_RADIUS = 34

function edgePoint(x: number, y: number) {
  const dx = x - CIRCLE_CENTER
  const dy = y - CIRCLE_CENTER
  const dist = Math.sqrt(dx * dx + dy * dy) || 1
  return {
    x: CIRCLE_CENTER + (dx / dist) * CIRCLE_RADIUS,
    y: CIRCLE_CENTER + (dy / dist) * CIRCLE_RADIUS,
  }
}

export function EngineeredComfort() {
  const [active, setActive] = useState<string | null>(null)
  const product = getProductBySlug('craft-classic')!

  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  const edges = useMemo(
    () => Object.fromEntries(CONCEPTS.map((c) => [c.id, edgePoint(c.x, c.y)])),
    [],
  )

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionLabel>Engineered Comfort</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Six disciplines, <span className="italic text-teal-700">one piece.</span>
          </h2>
        </Reveal>

        <motion.div
          ref={stageRef}
          style={{ scale }}
          className="relative mx-auto mt-16 aspect-square max-w-[560px]"
        >
          {/* SVG Connecting Lines & Animated Orbitals */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Pulsing Backlight Ring */}
            <motion.circle
              cx={CIRCLE_CENTER}
              cy={CIRCLE_CENTER}
              r={CIRCLE_RADIUS + 0.5}
              fill="none"
              stroke="rgba(22,155,154,0.15)"
              strokeWidth={1.5}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: [1, 1.03, 1], opacity: [0.3, 0.7, 0.3] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 50px' }}
            />

            {/* Inner Counter-Rotating Dashed Ring */}
            <motion.circle
              cx={CIRCLE_CENTER}
              cy={CIRCLE_CENTER}
              r={36.5}
              fill="none"
              stroke="rgba(22,155,154,0.4)"
              strokeWidth={0.5}
              strokeDasharray="4 4"
              strokeLinecap="round"
              style={{ transformOrigin: '50px 50px' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1, rotate: 360 } : { opacity: 0 }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Outer Counter-Rotating Dashed Ring */}
            <motion.circle
              cx={CIRCLE_CENTER}
              cy={CIRCLE_CENTER}
              r={39}
              fill="none"
              stroke="rgba(240,169,44,0.35)"
              strokeWidth={0.35}
              strokeDasharray="1 5"
              strokeLinecap="round"
              style={{ transformOrigin: '50px 50px' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1, rotate: -360 } : { opacity: 0 }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                rotate: { duration: 34, repeat: Infinity, ease: 'linear' },
              }}
            />

            {CONCEPTS.map((c, i) => {
              const edge = edges[c.id]
              const isActive = active === c.id

              return (
                <g key={c.id}>
                  {/* Connecting Line */}
                  <motion.line
                    x1={c.x}
                    y1={c.y}
                    x2={edge.x}
                    y2={edge.y}
                    vectorEffect="non-scaling-stroke"
                    stroke={isActive ? 'rgba(240,169,44,0.9)' : 'rgba(22,155,154,0.35)'}
                    strokeWidth={isActive ? 1.5 : 0.85}
                    strokeDasharray={isActive ? 'none' : '2 2'}
                    strokeLinecap="round"
                    pathLength={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: easeOut }}
                  />

                  {/* Outer Anchor Circle */}
                  <motion.circle
                    cx={edge.x}
                    cy={edge.y}
                    r={isActive ? 2.8 : 1.8}
                    fill="white"
                    opacity={0.95}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 0.95, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: easeOut }}
                  />

                  {/* Inner Active Anchor Dot */}
                  <motion.circle
                    cx={edge.x}
                    cy={edge.y}
                    r={isActive ? 1.8 : 1.0}
                    fill={isActive ? '#F0A92C' : '#169B9A'}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: easeOut }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Central Product Image Container */}
          <div className="group absolute inset-[16%] overflow-hidden rounded-full border border-white/80 shadow-[0_40px_100px_-30px_rgba(18,59,61,0.35)] transition-all duration-500 hover:shadow-[0_50px_120px_-20px_rgba(18,59,61,0.45)]">
            <img
              src={homeProductImage(product.slug)}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <motion.div
              animate={{ opacity: active ? 0.25 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gold-400 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Orbiting Light Node */}
          <motion.div
            className="pointer-events-none absolute inset-[16%]"
            style={{ transformOrigin: '50% 50%' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1, rotate: 360 } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_12px_4px_rgba(240,169,44,0.75)]" />
          </motion.div>

          {/* Interactive Concept Badges */}
          {CONCEPTS.map((c, i) => {
            const isActive = active === c.id

            return (
              <div
                key={c.id}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: easeOut }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setActive(c.id)}
                  onFocus={() => setActive(c.id)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                  aria-label={c.label}
                  className="relative outline-none"
                >
                  {/* Subtle Glow Ring on Active State */}
                  {isActive && (
                    <motion.span
                      layoutId="activeGlow"
                      className="absolute -inset-1 rounded-full bg-gold-400/30 blur-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span
                    className={`relative block rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-widest backdrop-blur-md transition-all duration-300 ${isActive
                        ? 'border-gold-300 bg-gold-400 text-ink-950 shadow-[0_8px_20px_-4px_rgba(240,169,44,0.5)]'
                        : 'border-ink-900/[0.12] bg-white/90 text-ink-800 hover:border-teal-700/40 hover:bg-white'
                      }`}
                  >
                    {c.label}
                  </span>
                </motion.button>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}