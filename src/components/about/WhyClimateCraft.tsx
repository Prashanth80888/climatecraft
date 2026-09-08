import { motion } from 'framer-motion'
import {
  ArrowRight,
  Snowflake,
  Sparkles,
  Thermometer,
} from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function WhyClimateCraft() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-600/45 sm:w-12" />

              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-600/25 bg-gold-500/10">
                  <Sparkles className="h-3.5 w-3.5 text-gold-700" />
                </span>

                <SectionLabel>Why ClimateCraft?</SectionLabel>
              </div>

              <span className="h-px w-8 bg-gold-600/45 sm:w-12" />
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#31585A] sm:text-xs">
              Because we believe comfort should be more personal.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            MAIN STATEMENT
        ===================================================== */}
        <div className="mx-auto mt-14 max-w-5xl text-center sm:mt-16 lg:mt-20">

          <Reveal delay={0.08}>
            <div className="mx-auto mb-8 flex items-center justify-center gap-3 sm:mb-10">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#063B3D]/20 sm:w-20" />

              <div className="flex items-center gap-2 rounded-full border border-[#063B3D]/10 bg-white/50 px-4 py-2 backdrop-blur-sm">
                <Thermometer className="h-3.5 w-3.5 text-gold-700" />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#31585A]">
                  Personal comfort
                </span>
              </div>

              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#063B3D]/20 sm:w-20" />
            </div>
          </Reveal>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="font-display text-2xl font-normal tracking-[-0.02em] text-[#35585A] sm:text-3xl lg:text-4xl"
          >
            A room has one temperature.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: easeOut,
            }}
            className="relative mx-auto mt-4 inline-block"
          >
            <p className="relative font-display text-[2.9rem] font-semibold italic leading-[1.05] tracking-[-0.04em] text-[#063B3D] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              You don't have to.
            </p>
          </motion.div>

          <Reveal delay={0.28}>
            <div className="mx-auto mt-8 flex items-center justify-center gap-2 sm:mt-10">
              <span className="h-px w-10 bg-gold-600/45 sm:w-16" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
              <span className="h-px w-10 bg-gold-600/45 sm:w-16" />
            </div>
          </Reveal>
        </div>

        {/* =====================================================
            EXPLANATION
        ===================================================== */}
        <Reveal delay={0.32}>
          <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-12">
            <p className="text-[15px] font-medium leading-[1.85] text-[#466365] sm:text-base">
              ClimateCraft brings temperature control directly into your
              personal space, giving you the ability to create a comfort
              experience that suits you. Whether you're watching a movie,
              working, relaxing or simply taking a break, your furniture should
              work with you.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            COMFORT EXPERIENCE CARDS
            Transparent section — color only on cards
        ===================================================== */}
        <Reveal delay={0.4}>
          <div className="mx-auto mt-14 max-w-5xl sm:mt-16">

            {/* Small heading */}
            <div className="mb-7 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-700">
                Comfort, your way
              </span>

              <p className="mt-2 font-display text-xl font-medium text-[#063B3D] sm:text-2xl">
                Designed around your personal space.
              </p>
            </div>

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-3">

              {/* Cooling */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#063B3D]/10 bg-[#EAF5F4] px-6 py-8 text-center shadow-[0_12px_35px_rgba(6,59,61,0.06)] transition-all duration-300 hover:border-[#063B3D]/20 hover:shadow-[0_18px_45px_rgba(6,59,61,0.10)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0B6265]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
                />

                <div className="relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#0B6265]/15 bg-white/70 shadow-sm">
                    <Snowflake className="h-5 w-5 text-[#0B6265] transition-transform duration-300 group-hover:rotate-12" />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#063B3D]">
                    Cooling
                  </p>

                  <p className="mx-auto mt-2 max-w-[180px] text-[12px] font-medium leading-relaxed text-[#4F696B]">
                    When you want it cooler
                  </p>
                </div>
              </motion.div>

              {/* Your Control */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-gold-600/20 bg-[#FBF5E7] px-6 py-8 text-center shadow-[0_12px_35px_rgba(171,135,54,0.07)] transition-all duration-300 hover:border-gold-600/35 hover:shadow-[0_18px_45px_rgba(171,135,54,0.12)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
                />

                <div className="relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-600/20 bg-white/70 shadow-sm">
                    <Thermometer className="h-5 w-5 text-gold-700 transition-transform duration-300 group-hover:-rotate-6" />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#063B3D]">
                    Your Control
                  </p>

                  <p className="mx-auto mt-2 max-w-[180px] text-[12px] font-medium leading-relaxed text-[#5A6967]">
                    Comfort made personal
                  </p>
                </div>
              </motion.div>

              {/* Relax */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#063B3D]/10 bg-[#EEF2EF] px-6 py-8 text-center shadow-[0_12px_35px_rgba(6,59,61,0.055)] transition-all duration-300 hover:border-[#063B3D]/20 hover:shadow-[0_18px_45px_rgba(6,59,61,0.10)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#063B3D]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
                />

                <div className="relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#063B3D]/10 bg-white/70 shadow-sm">
                    <Sparkles className="h-5 w-5 text-[#0B6265] transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#063B3D]">
                    Relax
                  </p>

                  <p className="mx-auto mt-2 max-w-[190px] text-[12px] font-medium leading-relaxed text-[#52686A]">
                    Furniture that works with you
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </Reveal>

        {/* =====================================================
            FINAL BRAND STATEMENT
        ===================================================== */}
        <Reveal delay={0.48}>
          <div className="mt-14 text-center sm:mt-16">

            <div className="mx-auto flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#063B3D]/15 sm:w-16" />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#063B3D]/60">
                A more personal kind of comfort
              </span>

              <span className="h-px w-10 bg-[#063B3D]/15 sm:w-16" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-lg italic text-[#063B3D] sm:text-xl">
              <span>Your space.</span>

              <span className="font-sans text-sm font-bold text-gold-600">
                •
              </span>

              <span>Your temperature.</span>

              <span className="font-sans text-sm font-bold text-gold-600">
                •
              </span>

              <span className="font-semibold">
                Your comfort.
              </span>
            </div>

            <motion.div
              whileHover={{ x: 3 }}
              transition={{ duration: 0.25 }}
              className="mt-5 inline-flex"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#063B3D]/10 bg-white/50 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#31585A] shadow-sm backdrop-blur-sm">
                Designed around you
                <ArrowRight className="h-3 w-3 text-gold-600" />
              </span>
            </motion.div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}