import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { brand } from '../lib/assets'
import { useIntroComplete } from '../context/IntroContext'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const headline = [
  { text: 'Furniture that', accent: false },
  { text: 'moves', accent: true },
  { text: 'with you.', accent: false },
]

const trustMarks = [
  '2-Year Warranty',
  'Handcrafted in Europe',
  'Bespoke for Your Space',
  'Quoted, Never Priced',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // The preloader masks this section on first load; its own mount-time timers
  // would otherwise finish silently behind the mask, so every entrance below
  // is gated to start only once the preloader hands off — one continuous
  // reveal instead of two stacked intros.
  const introComplete = useIntroComplete()

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-transparent"
    >
      <motion.div
        initial={{ scale: 1.06, opacity: 0.6 }}
        animate={introComplete ? { scale: 1, opacity: 1 } : { scale: 1.06, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: easeOut }}
        className="absolute inset-0"
      >
        <motion.div style={{ scale: videoScale, y: videoY }} className="h-full w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={brand.heroVideo}
            poster={brand.heroPoster}
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </motion.div>

      {/* Localized readability gradients — only behind text, NOT covering the video */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/30 via-black/10 to-transparent sm:h-56" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/20 to-transparent" />

      <div className="grain-overlay opacity-60" />

      <div className="pointer-events-none absolute left-[8%] top-[22%] h-1.5 w-1.5 rounded-full bg-gold-400/80 blur-[1px] animate-shimmer" />
      <div className="pointer-events-none absolute left-[22%] top-[38%] h-1 w-1 rounded-full bg-white/80 blur-[1px] animate-shimmer [animation-delay:1s]" />
      <div className="pointer-events-none absolute left-[15%] top-[62%] h-1 w-1 rounded-full bg-teal-500/70 blur-[1px] animate-shimmer [animation-delay:2s]" />

      {/*
        Guaranteed navbar clearance. This is a real flex-column sibling with a fixed
        height — not alignment or padding — so the content below it can never render
        above this line, regardless of viewport height or content length. Previously
        the content block was bottom-anchored via `items-end` on the whole section,
        which only "happened" to clear the navbar when content height + viewport
        height lined up; on shorter viewports that assumption silently broke.
      */}
      <div className="h-24 flex-none sm:h-32 lg:h-36" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-5 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
          className="section-label mb-6"
        >
          Motion Furniture · Est. 2009
        </motion.span>

        <h1 className="max-w-3xl font-display text-[11.5vw] font-normal leading-[0.98] tracking-[-0.01em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]">
          {headline.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, y: '100%' }}
              animate={introComplete ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
              transition={{ duration: 1, delay: 0.45 + i * 0.14, ease: easeOut }}
              className={`block overflow-hidden ${line.accent ? 'italic text-teal-500' : ''}`}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.95, ease: easeOut }}
          className="mt-6 max-w-md text-[14px] leading-relaxed text-white/75 sm:mt-7 sm:text-base"
        >
          Motorized and manually operated seating, engineered in-house and upholstered by hand — built for the
          manufacturers and galleries who set the standard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 1.1, ease: easeOut }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link to="/collections" className="group btn-primary">
            View the Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-900/10 pt-5 sm:mt-12 sm:gap-x-8 sm:gap-y-3 sm:pt-6 lg:mt-14 lg:gap-x-10"
        >
          {trustMarks.map((mark) => (
            <span key={mark} className="text-[10.5px] font-medium uppercase tracking-widest text-white/55">
              {mark}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 sm:flex lg:right-10"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
