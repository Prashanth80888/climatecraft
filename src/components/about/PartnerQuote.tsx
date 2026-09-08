import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Eye,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
]

const IDEAS = [
  {
    number: '01',
    icon: Eye,
    label: 'See',
    description: 'See the technology in the product itself.',
  },
  {
    number: '02',
    icon: Sliders,
    label: 'Control',
    description: 'Control your personal comfort experience.',
  },
  {
    number: '03',
    icon: Sparkles,
    label: 'Experience',
    description: 'Experience the difference for yourself.',
  },
]

export function PartnerQuote() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}
      <div
        className="
          pointer-events-none absolute
          -left-40 top-20
          h-96 w-96
          rounded-full
          bg-teal-500/[0.045]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-40 bottom-0
          h-[420px] w-[420px]
          rounded-full
          bg-gold-400/[0.045]
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* =================================================
              LEFT — PROOF STORY
          ================================================== */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    border border-teal-600/15
                    bg-teal-500/[0.06]
                  "
                >
                  <ShieldCheck
                    className="h-4 w-4 text-teal-700"
                    strokeWidth={1.6}
                  />
                </span>

                <SectionLabel>Built on Proof</SectionLabel>
              </div>

              <h2
                className="
                  mt-6 max-w-2xl
                  font-display
                  text-[34px]
                  font-medium
                  leading-[1.04]
                  tracking-[-0.025em]
                  text-[#063B3D]
                  sm:text-[46px]
                  lg:text-[54px]
                "
              >
                Why should you believe{' '}
                <span className="italic font-normal text-teal-700">
                  ClimateCraft?
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 max-w-2xl">
                <p
                  className="
                    text-[15.5px]
                    font-medium
                    leading-7
                    text-ink-700
                    sm:text-[16.5px]
                    sm:leading-[1.85]
                  "
                >
                  We believe technology claims should be
                  supported by the product itself. ClimateCraft
                  focuses on integrating temperature-control
                  technology directly into premium seating so
                  that the experience is something you can{' '}
                  <span className="font-semibold text-[#063B3D]">
                    see, control and experience
                  </span>
                  , rather than simply read about.
                </p>

                <p
                  className="
                    mt-5
                    text-[15.5px]
                    font-medium
                    leading-7
                    text-ink-700
                    sm:text-[16.5px]
                    sm:leading-[1.85]
                  "
                >
                  Our credibility comes from the product, the
                  engineering behind it, the materials used,
                  the controls integrated into the system and
                  the standards we apply during product
                  development.
                </p>
              </div>
            </Reveal>

            {/* Small proof markers */}
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                {[
                  'Product',
                  'Engineering',
                  'Materials',
                  'Controls',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-[#063B3D]/65
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* =================================================
              RIGHT — SEE / CONTROL / EXPERIENCE
          ================================================== */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div
                className="
                  relative overflow-hidden
                  rounded-[28px]
                  border border-[#063B3D]/10
                  bg-white/50
                  p-5
                  shadow-[0_30px_80px_-50px_rgba(6,59,61,0.5)]
                  backdrop-blur-sm
                  sm:p-6
                "
              >
                {/* Card atmosphere */}
                <div
                  className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-52 w-52
                    rounded-full
                    bg-teal-500/[0.07]
                    blur-3xl
                  "
                />

                <div className="relative">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-ink-500
                        "
                      >
                        The ClimateCraft approach
                      </p>

                      <h3
                        className="
                          mt-2
                          font-display
                          text-[25px]
                          font-medium
                          leading-tight
                          text-[#063B3D]
                          sm:text-[29px]
                        "
                      >
                        Proof you can experience.
                      </h3>
                    </div>

                    <span
                      className="
                        flex h-10 w-10
                        flex-none items-center
                        justify-center
                        rounded-full
                        bg-[#063B3D]
                        text-gold-400
                      "
                    >
                      <ShieldCheck
                        className="h-5 w-5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>

                  <RevealGroup
                    className="mt-7"
                    stagger={0.09}
                  >
                    {IDEAS.map((idea) => {
                      const Icon = idea.icon

                      return (
                        <RevealItem key={idea.number}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{
                              duration: 0.25,
                              ease: easeOut,
                            }}
                            className="
                              group relative
                              flex items-center
                              gap-4
                              border-t
                              border-[#063B3D]/[0.09]
                              py-5
                              last:border-b
                            "
                          >
                            {/* Number */}
                            <span
                              className="
                                w-7 flex-none
                                font-display
                                text-[11px]
                                italic
                                tabular-nums
                                text-gold-600
                              "
                            >
                              {idea.number}
                            </span>

                            {/* Icon */}
                            <span
                              className="
                                flex h-10 w-10
                                flex-none
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-teal-600/10
                                bg-teal-500/[0.045]
                                text-teal-700
                                transition-all
                                duration-300
                                group-hover:border-teal-600/25
                                group-hover:bg-teal-500/[0.09]
                              "
                            >
                              <Icon
                                className="h-[18px] w-[18px]"
                                strokeWidth={1.5}
                              />
                            </span>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                              <h4
                                className="
                                  font-display
                                  text-[21px]
                                  font-medium
                                  leading-tight
                                  text-[#063B3D]
                                  sm:text-[23px]
                                "
                              >
                                {idea.label}
                              </h4>

                              <p
                                className="
                                  mt-1
                                  text-[12px]
                                  font-medium
                                  leading-relaxed
                                  text-ink-500
                                  sm:text-[12.5px]
                                "
                              >
                                {idea.description}
                              </p>
                            </div>

                            {/* Arrow */}
                            <ArrowUpRight
                              className="
                                h-4 w-4 flex-none
                                -translate-x-1 translate-y-1
                                text-teal-700/35
                                opacity-0
                                transition-all duration-300
                                group-hover:translate-x-0
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                              strokeWidth={1.6}
                            />
                          </motion.div>
                        </RevealItem>
                      )
                    })}
                  </RevealGroup>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =====================================================
            EXPERIENCE CTA
        ====================================================== */}
        <Reveal delay={0.2}>
          <div
            className="
              relative mt-16
              overflow-hidden
              rounded-[30px]
              bg-[#063B3D]
              px-6 py-10
              shadow-[0_35px_90px_-45px_rgba(6,59,61,0.65)]
              sm:mt-20
              sm:px-10 sm:py-12
              lg:px-14 lg:py-14
            "
          >
            {/* CTA background glow */}
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

            {/* Decorative line */}
            <div
              className="
                pointer-events-none absolute
                right-0 top-0
                h-px w-1/2
                bg-gradient-to-l
                from-gold-400/60
                to-transparent
              "
            />

            <div
              className="
                relative
                flex flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="h-px w-9 bg-gold-400" />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.19em]
                      text-gold-400
                    "
                  >
                    Experience ClimateCraft
                  </span>
                </div>

                <h3
                  className="
                    mt-4
                    font-display
                    text-[28px]
                    font-normal
                    leading-[1.08]
                    text-white
                    sm:text-[37px]
                    lg:text-[42px]
                  "
                >
                  See the technology.{' '}
                  <span className="italic text-teal-300">
                    Experience the difference.
                  </span>
                </h3>

                <p
                  className="
                    mt-4 max-w-xl
                    text-[14px]
                    font-medium
                    leading-7
                    text-white/70
                    sm:text-[15px]
                  "
                >
                  The strongest proof of temperature-controlled
                  comfort is experiencing the product yourself.
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/collections"
                className="
                  group inline-flex
                  w-fit flex-none
                  items-center gap-4
                  rounded-full
                  bg-gold-400
                  px-6 py-3.5
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#063B3D]
                  shadow-[0_15px_35px_-15px_rgba(240,169,44,0.65)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-gold-300
                  hover:shadow-[0_20px_40px_-15px_rgba(240,169,44,0.75)]
                  sm:px-7 sm:py-4
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}