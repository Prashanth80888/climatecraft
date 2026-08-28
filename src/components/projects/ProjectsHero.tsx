import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_LINES = [
  { text: 'Spaces designed around', accent: false },
  { text: 'how comfort is experienced.', accent: true },
]

const INDICATORS = [
  'Residential',
  'Media Room',
  'Formal Lounge',
  'Fireside',
  'Window Suite',
]

// Small, honest supporting stats — reinforces premium positioning without
// claiming anything unverifiable; wording kept generic/qualitative on purpose.
const STATS = [
  { value: '4', label: 'Space Types' },
  { value: '360°', label: 'Design Review' },
  { value: '1:1', label: 'Bespoke Fit' },
]

export function ProjectsHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 })

  // Separate, gentler spring for the floating stat card so it drifts opposite
  // the spotlight — adds real depth instead of everything moving in lockstep.
  const cardX = useTransform(springX, (v) => v * -0.4)
  const cardY = useTransform(springY, (v) => v * -0.4)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(px * 24)
      mouseY.set(py * 16)
    },
    [prefersReducedMotion, mouseX, mouseY],
  )

  const onMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-transparent pt-40 sm:pt-44 lg:pt-48"
    >
      <SectionAtmosphere variant="glow" />

      {/* Ambient background atmosphere — deepened with a third, cooler bloom and
          a faint rotating conic wash for more dimensionality than two static orbs. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[12%] top-[15%] h-[600px] w-[700px] opacity-[0.28] blur-[180px]"
          style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[8%] right-[8%] h-[450px] w-[550px] opacity-[0.25] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #53c9c5 0%, transparent 65%)' }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { opacity: [0.14, 0.24, 0.14] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[22%] top-[4%] h-[380px] w-[380px] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #0F7776 0%, transparent 68%)' }}
        />

        {/* Fine grid — a quiet architectural/blueprint cue that reads as "engineered
            spaces" without any imagery, fading out toward the edges. */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#063B3D 1px, transparent 1px), linear-gradient(90deg, #063B3D 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 0%, transparent 75%)',
          }}
        />
      </div>

      {/* Cursor-following spotlight */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ x: mouseX, y: mouseY }}
        >
          <div
            className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.20] blur-[120px]"
            style={{ background: 'radial-gradient(circle, #f0a92c 0%, transparent 60%)' }}
          />
        </motion.div>
      )}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-x-10">
          <div>
            {/* Eyebrow — now a small glass pill instead of a bare line + label,
                matching the premium chip language used elsewhere on the site. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-white/40 py-1.5 pl-2.5 pr-4 backdrop-blur-md"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400/90 text-ink-950">
                <Sparkles className="h-3 w-3" strokeWidth={2.25} />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-700">
                Projects &amp; Spaces
              </span>
            </motion.div>

            {/* Headline — line-by-line reveal, now with a soft animated underline
                sweeping in beneath the accent line for a more finished, editorial feel. */}
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] font-normal leading-[1.03] tracking-[-0.01em] text-cream-100">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '115%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.55 + i * 0.15, ease: easeOut }}
                    className={`relative inline-block ${line.accent ? 'italic text-teal-700' : ''}`}
                  >
                    {line.text}
                    {line.accent && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.3, ease: easeOut }}
                        style={{ transformOrigin: 'left' }}
                        className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
                      />
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: easeOut }}
              className="mt-8 max-w-lg text-[16px] leading-relaxed text-cream-200 sm:text-[17px]"
            >
              Explore how Climate Craft furniture shapes residential, media, formal and lounge environments —
              combining intelligent movement, climate technology and considered design.
            </motion.p>

            {/* CTAs — primary button now has a magnetic-feeling lift with a richer
                sheen and glow, secondary gains a filled hover state instead of just
                a border color shift. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: easeOut }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#space-explorer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-teal-700 px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_20px_50px_-16px_rgba(22,155,154,0.55)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-teal-800 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_30px_64px_-14px_rgba(22,155,154,0.7)] active:scale-[0.97]"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#space-explorer')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />
                <span className="relative z-10">Explore Spaces</span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#063B3D]/[0.14] px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-ink-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#063B3D]/0 hover:text-white"
              >
                <span className="absolute inset-0 -z-10 scale-x-0 bg-[#063B3D] transition-transform duration-400 ease-out origin-left group-hover:scale-x-100" />
                <span>Discuss a Project</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Space application indicators — now separated by fine dot dividers
                for a tighter, more considered rhythm than raw gaps. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-16 flex flex-wrap items-center gap-x-0 gap-y-3 border-t border-[#063B3D]/[0.08] pt-7 sm:mt-20"
            >
              {INDICATORS.map((label, i) => (
                <span key={label} className="flex items-center">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.1 + i * 0.07, ease: easeOut }}
                    className="cursor-default px-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-cream-200 transition-colors duration-300 first:pl-0 hover:text-teal-700"
                  >
                    {label}
                  </motion.span>
                  {i < INDICATORS.length - 1 && (
                    <span className="h-1 w-1 flex-none rounded-full bg-[#063B3D]/15" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Floating glass stat card — desktop only. Adds visual weight on the
              right side of the hero (previously empty), drifts gently opposite the
              cursor spotlight, and reinforces premium/bespoke positioning with
              honest, non-numeric-claim stats. */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOut }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/55 bg-white/40 p-7 shadow-[0_40px_90px_-30px_rgba(6,59,61,0.35)] backdrop-blur-xl">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(240,169,44,0.35) 0%, transparent 72%)' }}
              />
              <span className="relative text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-700">
                Every Project Starts With
              </span>
              <p className="relative mt-3 font-display text-xl italic leading-snug text-[#063B3D]">
                A conversation about how the space is actually used.
              </p>

              <div className="relative mt-7 grid grid-cols-3 gap-3 border-t border-[#063B3D]/10 pt-5">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.7 + i * 0.1, ease: easeOut }}
                  >
                    <div className="font-display text-xl italic text-teal-700">{s.value}</div>
                    <div className="mt-1 text-[9.5px] font-medium uppercase leading-tight tracking-widest text-ink-700">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Small orbiting accent ring behind the card for extra depth */}
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -inset-6 -z-10"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(22,155,154,0.25)"
                    strokeWidth="0.5"
                    strokeDasharray="0.4 6"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.15 }}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#063B3D]/20 bg-white/30 text-ink-900 backdrop-blur-sm transition-colors duration-300 hover:border-teal-700/40 hover:bg-white/50"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}