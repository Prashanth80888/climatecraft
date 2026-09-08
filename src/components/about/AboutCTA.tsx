import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
]

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}
      <div
        className="
          pointer-events-none absolute
          -left-40 bottom-0
          h-96 w-96
          rounded-full
          bg-teal-500/[0.045]
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-32 top-0
          h-80 w-80
          rounded-full
          bg-gold-400/[0.05]
          blur-[100px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="
              relative overflow-hidden
              rounded-[30px]
              bg-[#063B3D]
              px-6 py-10
              shadow-[0_40px_100px_-50px_rgba(6,59,61,0.65)]
              sm:px-10 sm:py-12
              lg:px-14 lg:py-14
            "
          >
            {/* =================================================
                DECORATIVE ATMOSPHERE
            ================================================== */}
            <div
              className="
                pointer-events-none absolute
                -right-24 -top-28
                h-72 w-72
                rounded-full
                bg-teal-400/15
                blur-[90px]
              "
            />

            <div
              className="
                pointer-events-none absolute
                -bottom-32 -left-20
                h-64 w-64
                rounded-full
                bg-gold-400/10
                blur-[80px]
              "
            />

            {/* Fine decorative lines */}
            <div
              className="
                pointer-events-none absolute
                left-0 top-0
                h-px w-2/3
                bg-gradient-to-r
                from-gold-400/70
                via-gold-400/20
                to-transparent
              "
            />

            <div
              className="
                pointer-events-none absolute
                bottom-0 right-0
                h-px w-1/2
                bg-gradient-to-l
                from-teal-300/30
                to-transparent
              "
            />

            {/* =================================================
                CONTENT GRID
            ================================================== */}
            <div
              className="
                relative
                grid grid-cols-1
                items-center
                gap-10
                lg:grid-cols-12
                lg:gap-16
              "
            >
              {/* =================================================
                  LEFT — MAIN MESSAGE
              ================================================== */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-gold-400/25
                        bg-gold-400/[0.08]
                      "
                    >
                      <Sparkles
                        className="h-4 w-4 text-gold-400"
                        strokeWidth={1.5}
                      />
                    </span>

                    <div className="[&_span]:!text-gold-400">
                      <SectionLabel>
                        Experience ClimateCraft
                      </SectionLabel>
                    </div>
                  </div>

                  <h2
                    className="
                      mt-6 max-w-2xl
                      font-display
                      text-[32px]
                      font-normal
                      leading-[1.06]
                      tracking-[-0.02em]
                      text-white
                      sm:text-[42px]
                      lg:text-[50px]
                    "
                  >
                    The best way to understand it is to{' '}
                    <span className="italic text-teal-300">
                      experience it.
                    </span>
                  </h2>
                </Reveal>
              </div>

              {/* =================================================
                  RIGHT — DESCRIPTION + CTA
              ================================================== */}
              <div className="lg:col-span-5">
                <Reveal delay={0.12}>
                  <div
                    className="
                      border-l
                      border-white/15
                      pl-5
                      sm:pl-6
                    "
                  >
                    <p
                      className="
                        max-w-md
                        text-[14.5px]
                        font-medium
                        leading-7
                        text-white/70
                        sm:text-[15.5px]
                        sm:leading-7
                      "
                    >
                      Explore our products and discover what
                      happens when premium seating meets active
                      temperature control.
                    </p>

                    <Link
                      to="/collections"
                      className="
                        group mt-7
                        inline-flex
                        items-center gap-3
                        rounded-full
                        bg-gold-400
                        px-5 py-3.5
                        text-[10.5px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-[#063B3D]
                        shadow-[0_14px_35px_-15px_rgba(240,169,44,0.65)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-gold-300
                        hover:shadow-[0_20px_40px_-15px_rgba(240,169,44,0.75)]
                        sm:px-6
                        sm:py-4
                      "
                    >
                      <span>Explore Products</span>

                      <span
                        className="
                          flex h-7 w-7
                          items-center justify-center
                          rounded-full
                          bg-[#063B3D]/10
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        <ArrowRight
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                      </span>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* =================================================
                BOTTOM BRAND LINE
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: easeOut,
              }}
              className="
                relative mt-10
                origin-left
                border-t border-white/10
                pt-5
                sm:mt-12
              "
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/35
                  "
                >
                  Premium seating
                </span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/35
                  "
                >
                  Active temperature control
                </span>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}