import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Cog, Thermometer, Mic, Radio, Zap } from 'lucide-react'
import { brand } from '../lib/assets'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

export function Mechanics() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start 90%', 'start 20%'],
  })

  const visualScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-15, 15])

  const { scrollYProgress: settleProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })

  const visualY = useTransform(
    settleProgress,
    [0, 0.5, 1],
    ['6%', '0%', '-6%'],
  )

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
      { threshold: 0.25 },
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="mechanics"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-14 sm:py-20 lg:py-24"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full opacity-[0.45] blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How We Build</SectionLabel>
        </Reveal>

        {/* Animated divider */}
        <div className="relative mt-7 h-px w-full overflow-hidden rounded-full bg-[#063B3D]/10 sm:mt-8">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(22,155,154,0.9) 50%, transparent 100%)',
            }}
            animate={{ left: ['-33%', '100%'] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.6,
            }}
          />
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          
          {/* LEFT — COMPACT INTRO */}
          <div className="lg:col-span-5">
            <Reveal y={10}>
              <span className="mb-4 flex items-center gap-2.5">
                <span className="h-px w-7 bg-gradient-to-r from-gold-500 to-gold-500/0" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              </span>
            </Reveal>

            <h2 className="font-display text-[1.65rem] font-normal leading-[1.08] text-[#04211F] drop-shadow-[0_1px_2px_rgba(255,255,255,0.55)] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3rem]">
              <Reveal y={15}>
                <span className="block">
                  Intelligent
                </span>
              </Reveal>

              <Reveal y={15} delay={0.1}>
                <span className="block italic text-teal-700">
                  comfort —
                </span>
              </Reveal>

              <Reveal y={15} delay={0.2}>
                <span className="block">
                  engineered quietly.
                </span>
              </Reveal>
            </h2>

            <Reveal y={15} delay={0.28}>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#0C302F]/75 sm:mt-5 sm:text-sm lg:text-[15px]">
                Climate Craft brings together climate control, voice and
                remote operation, and smooth electric movement to create a
                more effortless seating experience.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — TECHNOLOGY CARD */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/55 bg-white/40 p-5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-teal-700/25 hover:bg-white/60 hover:shadow-[0_30px_70px_-28px_rgba(6,59,61,0.3)] sm:p-6 lg:p-7">

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(22,155,154,0.38) 0%, transparent 72%)',
                  }}
                />

                {/* Header */}
                <div className="relative flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-700/20 bg-white/70 text-teal-700 shadow-[0_8px_20px_-10px_rgba(6,59,61,0.2)] transition-all duration-500 group-hover:scale-105 group-hover:bg-teal-700 group-hover:text-white">
                    <Cog className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-teal-700/70">
                      Intelligent Comfort System
                    </p>

                    <h3 className="mt-1 font-display text-xl leading-tight text-[#04211F] sm:text-2xl">
                      Technology you can feel.
                    </h3>
                  </div>
                </div>

                {/* Technology grid */}
                <div className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                  {/* Climate Control */}
                  <div className="group/item flex gap-3 rounded-2xl border border-teal-700/10 bg-white/45 p-3.5 transition-all duration-300 hover:border-teal-700/20 hover:bg-white/75">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-700">
                      <Thermometer
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.7}
                      />
                    </span>

                    <div>
                      <h4 className="text-[18px] font-semibold leading-tight text-[#063B3D] sm:text-[18px] lg:text-[19px]">
                        Climate Control
                      </h4>

                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#0C302F]/65">
                        Personalised temperature comfort at your seat.
                      </p>
                    </div>
                  </div>

                  {/* Voice Control */}
                  <div className="group/item flex gap-3 rounded-2xl border border-teal-700/10 bg-white/45 p-3.5 transition-all duration-300 hover:border-teal-700/20 hover:bg-white/75">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-700">
                      <Mic
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.7}
                      />
                    </span>

                    <div>
                      <h4 className="text-[18px] font-semibold leading-tight text-[#063B3D] sm:text-[18px] lg:text-[19px]">
                        Voice Control
                      </h4>

                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#0C302F]/65">
                        Control your comfort with intuitive voice commands.
                      </p>
                    </div>
                  </div>

                  {/* Remote Control */}
                  <div className="group/item flex gap-3 rounded-2xl border border-teal-700/10 bg-white/45 p-3.5 transition-all duration-300 hover:border-teal-700/20 hover:bg-white/75">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-700">
                      <Radio
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.7}
                      />
                    </span>

                    <div>
                      <h4 className="text-[18px] font-semibold leading-tight text-[#063B3D] sm:text-[18px] lg:text-[19px]">
                        Remote Control
                      </h4>

                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#0C302F]/65">
                        Adjust reclining and comfort without getting up.
                      </p>
                    </div>
                  </div>

                  {/* Motor */}
                  <div className="group/item flex gap-3 rounded-2xl border border-gold-500/15 bg-white/45 p-3.5 transition-all duration-300 hover:border-gold-500/30 hover:bg-white/75">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                      <Zap
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.7}
                      />
                    </span>

                    <div>
                      <h4 className="text-[18px] font-semibold leading-tight text-[#063B3D] sm:text-[18px] lg:text-[19px]">
                        Quiet Electric Motor
                      </h4>

                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#0C302F]/65">
                        Smooth, controlled movement with minimal noise.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom statement + CTA */}
                <div className="relative mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="border-l border-gold-400/50 pl-3 text-xs italic leading-relaxed text-[#0C302F]/75">
                    Smart technology stays discreet — comfort is what you notice.
                  </p>

                  <a
                    href="#why-climate-craft"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .querySelector('#why-climate-craft')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn-ghost group/link inline-flex shrink-0 items-center gap-2 text-xs"
                  >
                    Learn About Our Process
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Connection indicator */}
        <Reveal delay={0.25} y={0}>
          <div className="mx-auto mt-8 flex flex-col items-center gap-2 sm:mt-10">
            <span className="h-8 w-px bg-gradient-to-b from-transparent to-gold-500/60" />

            <motion.span
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-1.5 w-1.5 rounded-full bg-gold-500"
            />
          </div>
        </Reveal>

        {/* VIDEO */}
        <motion.div
          ref={visualRef}
          style={{
            scale: visualScale,
            opacity: visualOpacity,
            y: visualY,
          }}
          className="group relative mt-5 sm:mt-7"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/80 shadow-[0_50px_120px_-40px_rgba(6,59,61,0.35)] transition-shadow duration-500 group-hover:shadow-[0_60px_140px_-30px_rgba(6,59,61,0.45)] sm:rounded-[36px]">

            <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                src={brand.mechanicsVideo}
                poster={brand.mechanicsPoster}
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>

            {/* Video overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            {/* Decorative ring */}
            <motion.div
              style={{ rotate: ringRotate }}
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold-400/25 sm:h-52 sm:w-52"
            />

            <div className="pointer-events-none absolute -left-8 bottom-10 h-24 w-24 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-teal-400/20" />

            {/* Video caption */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 sm:p-10">
              <span className="section-label text-white/90">
                Precision in Motion
              </span>

              <h3 className="mt-1 max-w-xl font-display text-2xl italic text-white sm:text-3xl">
                Quiet technology. Effortless comfort.
              </h3>

              <p className="mt-1 max-w-lg text-[13px] leading-relaxed text-white/65 sm:text-sm">
                Climate control, intelligent controls and a smooth electric
                motor work together beneath the upholstery to create a
                seamless experience.
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute right-6 top-6 flex items-center gap-2 sm:right-10 sm:top-10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />

              <span className="text-[10px] uppercase tracking-widest2 text-white/75">
                Scroll to witness
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}