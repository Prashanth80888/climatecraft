import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Snowflake,
  Flame,
  Sliders,
} from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { AboutSectionLabel } from './AboutSectionLabel'

const easeOut: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
]

const TECHNOLOGY_MODULES = [
  {
    number: '01',
    title: 'Cooling',
    icon: Snowflake,
    description:
      'When you want to reduce the heat around your seating and back-contact areas, the system provides active cooling through the integrated water-based liquid pad cooling system.',
    tone: 'teal',
  },
  {
    number: '02',
    title: 'Heating',
    icon: Flame,
    description:
      'When the environment is cold, the same concept works in reverse, providing controlled warmth through the seating and back areas.',
    tone: 'gold',
  },
  {
    number: '03',
    title: 'Personal Control',
    icon: Sliders,
    description:
      'Instead of depending completely on the temperature of the room, ClimateCraft puts greater control of your immediate seating environment in your hands.',
    tone: 'dark',
  },
] as const

export function OriginSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* Ambient atmosphere */}
      <div
        className="
          pointer-events-none absolute
          -left-40 top-1/4
          h-96 w-96 rounded-full
          bg-teal-500/[0.045]
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-40 bottom-0
          h-[420px] w-[420px]
          rounded-full
          bg-gold-400/[0.04]
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            INTRO / IMAGE
        ====================================================== */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              {/* Only this section label is enlarged */}
              <div className="[&_span]:!text-[12px] sm:[&_span]:!text-[13px] lg:[&_span]:!text-[14px]">
                <AboutSectionLabel>
                  How the Technology Works
                </AboutSectionLabel>
              </div>

              <h2
                className="
                  mt-5 max-w-lg
                  font-display
                  text-[35px]
                  font-medium
                  leading-[1.05]
                  tracking-[-0.025em]
                  text-[#063B3D]
                  sm:text-[46px]
                  lg:text-[52px]
                "
              >
                Comfort,{' '}
                <span className="italic font-normal text-teal-700">
                  delivered through contact.
                </span>
              </h2>

              <p
                className="
                  mt-6 max-w-md
                  text-[16px]
                  font-medium
                  leading-7
                  text-ink-700
                  sm:text-[17px]
                "
              >
                At the heart of our temperature-controlled seating
                is a system designed to transfer thermal comfort
                through the areas where your body makes contact
                with the furniture.
              </p>

              <p
                className="
                  mt-4 max-w-md
                  text-[16px]
                  font-medium
                  leading-7
                  text-ink-700
                  sm:text-[17px]
                "
              >
                The system integrates temperature-control
                technology into the seating structure, allowing
                the user to select the desired comfort level
                through the available controls.
              </p>
            </Reveal>

            {/* =================================================
                CLICKABLE CRAFT MOTION IMAGE
            ================================================== */}
            <Reveal delay={0.15}>
              <Link
                to="/products/craft-motion"
                aria-label="Explore Craft Motion"
                className="group relative mt-9 block"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    duration: 0.45,
                    ease: easeOut,
                  }}
                  className="
                    relative overflow-hidden
                    rounded-[30px]
                    bg-[#E8EFEC]
                    shadow-[0_32px_85px_-38px_rgba(6,59,61,0.48)]
                    ring-1 ring-[#063B3D]/[0.07]
                  "
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                      src="/images/about/motion.webp"
                      alt="A ClimateCraft recliner's motorized reclining mechanism"
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.045 }}
                      transition={{
                        duration: 0.9,
                        ease: easeOut,
                      }}
                      className="
                        h-full w-full
                        object-cover
                      "
                    />

                    {/* Image depth overlay */}
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-[#063B3D]/80
                        via-[#063B3D]/10
                        to-transparent
                      "
                    />

                    {/* Soft top highlight */}
                    <div
                      className="
                        pointer-events-none absolute inset-x-0 top-0
                        h-28
                        bg-gradient-to-b
                        from-white/20
                        to-transparent
                      "
                    />

                    {/* Product label */}
                    <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
                      <span
                        className="
                          inline-flex items-center
                          rounded-full
                          border border-white/35
                          bg-[#063B3D]/45
                          px-3.5 py-2
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        Craft Motion
                      </span>
                    </div>

                    {/* Bottom product information */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        p-5 sm:p-6
                      "
                    >
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-white/70
                            "
                          >
                            Motorized comfort
                          </p>

                          <h3
                            className="
                              mt-1
                              font-display
                              text-[25px]
                              font-medium
                              leading-tight
                              text-white
                              sm:text-[29px]
                            "
                          >
                            Craft Motion
                          </h3>
                        </div>

                        {/* Explore arrow */}
                        <span
                          className="
                            flex h-11 w-11 flex-none
                            items-center justify-center
                            rounded-full
                            border border-white/35
                            bg-white/15
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            group-hover:border-gold-400
                            group-hover:bg-gold-400
                            group-hover:text-[#063B3D]
                          "
                        >
                          <ArrowUpRight
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </span>
                      </div>

                      <div
                        className="
                          mt-4 flex items-center gap-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-white/75
                        "
                      >
                        <span>Explore product</span>

                        <span
                          className="
                            h-px w-8
                            bg-white/50
                            transition-all
                            duration-500
                            group-hover:w-12
                            group-hover:bg-gold-400
                          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover border */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      rounded-[30px]
                      ring-1 ring-transparent
                      transition-all duration-500
                      group-hover:ring-teal-500/30
                    "
                  />
                </motion.div>
              </Link>
            </Reveal>
          </div>

          {/* =====================================================
              TECHNOLOGY MODULES
          ====================================================== */}
          <div className="lg:col-span-7 lg:pt-2">
            <Reveal>
              <div className="mb-8">
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-ink-500
                  "
                >
                  Three ways to personalize comfort
                </p>

                <p
                  className="
                    mt-2 max-w-lg
                    font-display
                    text-[25px]
                    leading-tight
                    text-[#063B3D]
                    sm:text-[30px]
                  "
                >
                  Temperature management,
                  <span className="italic text-teal-700">
                    {' '}built into the experience.
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {TECHNOLOGY_MODULES.map((module, index) => {
                const Icon = module.icon

                const isTeal = module.tone === 'teal'
                const isGold = module.tone === 'gold'

                return (
                  <motion.div
                    key={module.number}
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.18,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: easeOut,
                    }}
                    whileHover={{
                      x: 5,
                      transition: {
                        duration: 0.25,
                        ease: easeOut,
                      },
                    }}
                    className={`
                      group relative overflow-hidden
                      rounded-[24px]
                      border p-5
                      shadow-[0_22px_55px_-40px_rgba(6,59,61,0.45)]
                      transition-all duration-300
                      sm:p-6
                      ${isTeal
                        ? `
                            border-teal-600/15
                            bg-teal-500/[0.055]
                            hover:border-teal-600/30
                            hover:bg-teal-500/[0.08]
                          `
                        : isGold
                          ? `
                              border-gold-500/20
                              bg-gold-400/[0.065]
                              hover:border-gold-500/35
                              hover:bg-gold-400/[0.09]
                            `
                          : `
                              border-[#063B3D]/10
                              bg-white/55
                              hover:border-[#063B3D]/20
                              hover:bg-white/75
                            `
                      }
                    `}
                  >
                    {/* Decorative glow */}
                    <div
                      className={`
                        pointer-events-none
                        absolute -right-12 -top-12
                        h-32 w-32 rounded-full
                        blur-3xl opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                        ${isTeal
                          ? 'bg-teal-500/15'
                          : isGold
                            ? 'bg-gold-400/20'
                            : 'bg-teal-500/10'
                        }
                      `}
                    />

                    <div className="relative flex gap-4 sm:gap-5">
                      {/* Number + icon */}
                      <div className="flex flex-col items-center gap-3">
                        <span
                          className={`
                            text-[9px]
                            font-bold
                            tracking-[0.12em]
                            ${isGold
                              ? 'text-gold-700'
                              : 'text-teal-700'
                            }
                          `}
                        >
                          {module.number}
                        </span>

                        <span
                          className={`
                            flex h-11 w-11
                            items-center justify-center
                            rounded-2xl
                            border
                            transition-all duration-300
                            ${isTeal
                              ? `
                                  border-teal-600/15
                                  bg-white/75
                                  text-teal-700
                                  group-hover:border-teal-600/30
                                `
                              : isGold
                                ? `
                                    border-gold-500/20
                                    bg-white/75
                                    text-gold-700
                                    group-hover:border-gold-500/35
                                  `
                                : `
                                    border-[#063B3D]/10
                                    bg-[#063B3D]
                                    text-gold-400
                                    group-hover:bg-[#063B3D]/90
                                  `
                            }
                          `}
                        >
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.5}
                          />
                        </span>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3
                            className={`
                              font-display
                              text-[24px]
                              font-medium
                              leading-tight
                              tracking-[-0.015em]
                              ${isGold
                                ? 'text-[#8A6314]'
                                : 'text-[#063B3D]'
                              }
                              sm:text-[27px]
                            `}
                          >
                            {module.title}
                          </h3>

                          <ArrowUpRight
                            className="
                              h-4 w-4 flex-none
                              -translate-x-1 translate-y-1
                              text-[#063B3D]/30
                              opacity-0
                              transition-all duration-300
                              group-hover:translate-x-0
                              group-hover:translate-y-0
                              group-hover:opacity-100
                            "
                            strokeWidth={1.6}
                          />
                        </div>

                        <p
                          className="
                            mt-3
                            text-[15px]
                            font-medium
                            leading-7
                            text-ink-700
                            sm:text-[15.5px]
                          "
                        >
                          {module.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <span
                      className={`
                        absolute bottom-0 left-5
                        h-[2px] w-0
                        transition-all duration-500
                        group-hover:w-16
                        ${isGold
                          ? 'bg-gold-500'
                          : 'bg-teal-600'
                        }
                      `}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            FINAL STATEMENT
        ====================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: easeOut,
          }}
          className="
            mx-auto mt-20 max-w-4xl
            text-center
            sm:mt-24
            lg:mt-28
          "
        >
          <span
            className="
              mx-auto block h-px w-14
              bg-gradient-to-r
              from-transparent
              via-gold-500
              to-transparent
            "
          />

          <p
            className="
              mt-7
              font-display
              text-[28px]
              font-normal
              leading-[1.12]
              tracking-[-0.015em]
              text-[#063B3D]
              sm:text-[38px]
              lg:text-[44px]
            "
          >
            <span className="italic text-teal-700">
              Your seat.
            </span>{' '}
            <span className="italic text-teal-700">
              Your temperature.
            </span>{' '}
            <span className="italic text-gold-700">
              Your comfort.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}