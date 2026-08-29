import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal } from '../ui/Reveal'

export function CollectionStory() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const mainY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const accentY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      <SectionAtmosphere variant="wave" />

      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute left-[8%] top-1/3 h-[420px] w-[420px] rounded-full opacity-[0.1] blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* ─────────────────────────────────────────
              LEFT — STORY CONTENT
          ───────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Engineered for How You Live</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-lg font-display text-4xl font-normal leading-[1.08] text-cream-100 sm:text-5xl lg:text-[3.4rem]">
                Every piece begins as{' '}
                <span className="italic text-teal-700">
                  a mechanism.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream-200 sm:text-base">
                A motor, a hinge, a hand-crank glide tuned to move without a
                sound. Around it, a hardwood frame, a hand-tied suspension,
                and an upholstery chosen from a curated archive of fabrics —
                built by hand, to order, for every collection on this page.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-12 border-t border-ink-900/10 pt-8 font-display text-3xl italic leading-[1.15] text-gold-700 sm:text-4xl">
                Comfort, refined.
              </p>
            </Reveal>
          </div>

          {/* ─────────────────────────────────────────
              RIGHT — 4 SEATER + SINGLE SEATER
          ───────────────────────────────────────── */}
          <div className="relative lg:col-span-6">

            {/* Soft background glow */}
            <div
              className="pointer-events-none absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full opacity-30 blur-[110px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(22,155,154,0.32), transparent 70%)',
              }}
            />

            {/* Decorative outer frame */}
            <div className="pointer-events-none absolute right-[2%] top-[4%] h-[88%] w-[82%] rounded-[36px] border border-[#0B3F42]/10" />

            {/* ─────────────────────────────
                4-SEATER — MAIN / LEFT
            ───────────────────────────── */}
            <motion.div
              style={{ y: mainY }}
              className="group relative z-10 w-[82%] overflow-hidden rounded-[30px] border border-white/70 bg-white/20 shadow-[0_45px_110px_-38px_rgba(6,61,60,0.38)] transition-all duration-500 hover:shadow-[0_55px_125px_-35px_rgba(6,61,60,0.45)] sm:w-[80%] lg:w-[82%]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={homeProductImage('craft-classic-grand')}
                  alt="Climate Craft four seater sofa"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              {/* Image gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

              {/* Corner accent */}
              <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 rounded-tl-xl border-l border-t border-white/70" />

              {/* 4 Seater Label */}
              <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 backdrop-blur-md">
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/90">
                  Three Seater
                </span>
              </div>
            </motion.div>

            {/* ─────────────────────────────
                SINGLE SEATER — RIGHT
            ───────────────────────────── */}
            <motion.div
              style={{ y: accentY }}
              className="group absolute -bottom-[4%] right-[-2%] z-20 w-[40%] overflow-hidden rounded-[24px] border border-white/80 bg-white/30 p-1.5 shadow-[0_35px_80px_-28px_rgba(6,61,60,0.45)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_95px_-25px_rgba(6,61,60,0.5)] sm:right-[-1%] sm:w-[38%] lg:right-[-5%] lg:w-[39%]"
            >
              <div className="relative overflow-hidden rounded-[19px]">

                <div className="aspect-[4/5] w-full">
                  <img
                    src={homeProductImage('climate-craft-signature')}
                    alt="Climate Craft single seater chair"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/50 via-transparent to-transparent" />

                {/* Single Seater Label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/90">
                    Single Seater
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ─────────────────────────────
                SMALL GOLD DETAIL
            ───────────────────────────── */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'top' }}
              className="pointer-events-none absolute bottom-[8%] right-[-2%] z-30 h-24 w-px bg-gradient-to-b from-transparent via-gold-400 to-transparent"
            />

            {/* Small connecting dot */}
            <span className="pointer-events-none absolute bottom-[7%] right-[-2.5%] z-30 h-1.5 w-1.5 rounded-full bg-gold-400" />
          </div>
        </div>
      </div>
    </section>
  )
}