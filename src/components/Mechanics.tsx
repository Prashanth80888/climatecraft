import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Cog } from 'lucide-react'
import { brand } from '../lib/assets'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'

export function Mechanics() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start 90%', 'start 20%'] })
  const visualScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-15, 15])

  const { scrollYProgress: settleProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] })
  const visualY = useTransform(settleProgress, [0, 0.5, 1], ['6%', '0%', '-6%'])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { })
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
    <section id="mechanics" ref={sectionRef} className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full opacity-[0.45] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #53c9c5 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How We Build</SectionLabel>
        </Reveal>

        {/* Full-width animated line — sits above the headline, spanning the same
            width as the rest of the section's content (mx-auto max-w-7xl, same
            as everything else here, so it lines up edge-to-edge with the video
            below rather than an arbitrary width). A soft gradient sweep travels
            across it continuously, echoing the "quiet mechanism" motion theme. */}
        <div className="relative mt-8 h-px w-full overflow-hidden rounded-full bg-[#063B3D]/10 sm:mt-10">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(22,155,154,0.9) 50%, transparent 100%)',
            }}
            animate={{ left: ['-33%', '100%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8 sm:mt-10">
          <div className="lg:col-span-7">
            {/* Small accent mark above the headline — a quiet, on-brand flourish
                that gives the left column its own visual anchor, matching the
                weight the icon badge gives the right-side card. */}
            <Reveal y={12}>
              <span className="mb-5 flex items-center gap-2.5">
                <span className="h-px w-8 bg-gradient-to-r from-gold-500 to-gold-500/0" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              </span>
            </Reveal>

            <h2 className="font-display text-[2.4rem] font-normal leading-[1.08] text-[#04211F] drop-shadow-[0_1px_2px_rgba(255,255,255,0.55)] sm:text-5xl lg:text-[3.4rem]">
              <Reveal y={20}>
                <span className="block">We engineer the quiet mechanics of</span>
              </Reveal>
              <Reveal y={20} delay={0.12}>
                <span className="block italic text-teal-700">comfort —</span>
              </Reveal>
              <Reveal y={20} delay={0.24}>
                <span className="block">then wrap them in fabric.</span>
              </Reveal>
            </h2>
          </div>

          {/* Right side — now a proper glass card instead of bare text, matching
              the premium card language used elsewhere on the site: soft
              translucent panel, icon badge, hover lift + glow, subtle corner bloom.
              lg:items-center on the grid parent above vertically centers this
              card against the headline column, so both sit on the same middle
              line instead of the headline riding higher than the card. */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/55 bg-white/40 p-7 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-teal-700/25 hover:bg-white/60 hover:shadow-[0_30px_70px_-28px_rgba(6,59,61,0.3)] sm:p-8">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-60"
                  style={{ background: 'radial-gradient(circle, rgba(22,155,154,0.35) 0%, transparent 72%)' }}
                />

                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-teal-700/20 bg-white/70 text-teal-700 shadow-[0_8px_20px_-10px_rgba(6,59,61,0.2)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-teal-700/40 group-hover:bg-teal-700 group-hover:text-white">
                  <Cog className="h-5 w-5" strokeWidth={1.75} />
                </span>

                <p className="relative mt-5 text-[15px] leading-relaxed text-[#0C302F] sm:text-base">
                  Every Climate Craft piece begins as a mechanism: a motor, a hinge, a hand-crank glide tuned to move
                  without a sound. Around it we build a hardwood frame, a hand-tied suspension, and an upholstery you
                  choose from a curated archive of fabrics.
                </p>
                <p className="relative mt-4 text-[15px] leading-relaxed text-[#0C302F] sm:text-base">
                  We supply manufacturers, galleries and interior houses who need seating that performs as beautifully
                  as it sits.
                </p>

                <span className="relative mt-5 block h-px w-6 bg-gold-400/40 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-gold-400" />

                <a
                  href="#why-climate-craft"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#why-climate-craft')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-ghost group/link relative mt-6 inline-flex items-center gap-2"
                >
                  Learn About Our Process
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3} y={0}>
          <div className="mx-auto mt-10 flex flex-col items-center gap-2 sm:mt-14">
            <span className="h-10 w-px bg-gradient-to-b from-transparent to-gold-500/60" />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-gold-500"
            />
          </div>
        </Reveal>

        <motion.div
          ref={visualRef}
          style={{ scale: visualScale, opacity: visualOpacity, y: visualY }}
          className="group relative mt-6 sm:mt-8"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            <motion.div
              style={{ rotate: ringRotate }}
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold-400/25 sm:h-52 sm:w-52"
            />
            <div className="pointer-events-none absolute -left-8 bottom-10 h-24 w-24 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-teal-400/20" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 sm:p-10">
              <span className="section-label text-white/90">Descent</span>
              <h3 className="mt-1 max-w-md font-display text-2xl italic text-white sm:text-3xl">
                It arrives from above.
              </h3>
              <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-white/65 sm:text-sm">
                Every piece is lowered, positioned and set by hand — a choreography of frame, mechanism and fabric
                coming to rest in the room.
              </p>
            </div>

            <div className="absolute right-6 top-6 flex items-center gap-2 sm:right-10 sm:top-10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
              <span className="text-[10px] uppercase tracking-widest2 text-white/75">Scroll to witness</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}