import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MouseEvent } from 'react'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_PART_1 = "Let's create".split("")
const HEADLINE_PART_2 = "your comfort space.".split("")

export function ContactHero() {
  // Mouse position tracking for interactive dynamic ambient glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group/hero relative w-full overflow-hidden bg-transparent pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-48"
    >
      <SectionAtmosphere variant="wave" />

      {/* Dynamic Cursor-Following Ambient Glow */}
      <motion.div
        className="pointer-events-none absolute h-[450px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px] transition-opacity duration-500 group-hover/hero:opacity-50"
        style={{
          left: smoothX,
          top: smoothY,
          background: 'radial-gradient(circle, rgba(83,201,197,0.8) 0%, rgba(212,175,55,0.2) 50%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow Badge with Pulse Glow & Shimmer */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEase }}
            className="inline-flex items-center gap-3 rounded-full border border-gold-400/20 bg-gold-400/5 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-400/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-700">
              Request a Quote
            </span>
          </motion.div>

          {/* Staggered Letter Reveal Headline with Glow on Hover */}
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.06] text-cream-100 sm:text-5xl lg:text-6xl select-none">
            {/* First Line */}
            <span className="block overflow-hidden py-1">
              <span className="inline-block">
                {HEADLINE_PART_1.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: '120%', rotateZ: 5 }}
                    animate={{ y: '0%', rotateZ: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + index * 0.03,
                      ease: customEase,
                    }}
                    className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:text-gold-400"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </span>

            {/* Second Line (Italic & Accent Color with Gradient Mask) */}
            <span className="block overflow-hidden py-1">
              <span className="inline-block italic text-teal-700">
                {HEADLINE_PART_2.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: '120%', rotateZ: 5 }}
                    animate={{ y: '0%', rotateZ: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.03,
                      ease: customEase,
                    }}
                    className="inline-block transition-all duration-300 hover:-translate-y-1 hover:text-teal-400 hover:drop-shadow-[0_0_12px_rgba(83,201,197,0.6)]"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </span>
          </h1>

          {/* Subtitle with Fade-up & Smooth Slide */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: customEase }}
            className="mt-6 max-w-lg text-[16px] leading-relaxed text-cream-200/90"
          >
            Tell us what you're planning. We'll help you choose the right{' '}
            <span className="relative inline-block font-medium text-cream-100 underline decoration-teal-700/50 decoration-2 underline-offset-4 transition-colors duration-300 hover:text-teal-400 hover:decoration-teal-400">
              Climate Craft
            </span>{' '}
            configuration, quantity and finish for your space.
          </motion.p>
        </div>
      </div>
    </section>
  )
}