import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE_LINES = [
  { text: 'Where intelligent seating', accent: false },
  { text: 'becomes part of the space.', accent: true },
]

const SUPPORTING_TEXT =
  'Real projects. Real spaces. Real requirements. Climate Craft engineers intelligent seating environments — combining premium reclining, liquid-based climate control, voice-activated smart controls and luxury upholstery around the way each space is actually lived.'

const TECHNOLOGIES = [
  {
    number: '01',
    value: '15°C',
    label: 'Cooling',
    description: 'Liquid climate control',
  },
  {
    number: '02',
    value: '35°C',
    label: 'Heating',
    description: 'Controlled comfort range',
  },
  {
    number: '03',
    value: '3',
    label: 'Ways to Control',
    description: 'Voice · Touch · Remote',
  },
]

const PROJECT_TYPES = [
  'Private Interiors',
  'Media Rooms',
  'Hospitality',
]

export function ProjectsHero() {
  const prefersReducedMotion = useReducedMotion()

  const scrollToProjects = () => {
    document
      .querySelector('#case-studies')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-transparent
        pb-16
        pt-36
        sm:pb-20
        sm:pt-40
        lg:pb-24
        lg:pt-48
      "
    >
      <SectionAtmosphere variant="bloom" />

      {/* ================================================================
          BACKGROUND ATMOSPHERE
      ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Gold ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: prefersReducedMotion
              ? 0.22
              : [0.18, 0.27, 0.18],
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.5 }
              : {
                  duration: 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className="
            absolute
            -left-40
            -top-32
            h-[500px]
            w-[700px]
            rounded-full
            blur-[150px]
          "
          style={{
            background:
              'radial-gradient(ellipse, #f0a92c 0%, transparent 68%)',
          }}
        />

        {/* Teal ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: prefersReducedMotion
              ? 0.18
              : [0.14, 0.24, 0.14],
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.5 }
              : {
                  duration: 11,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }
          }
          className="
            absolute
            -bottom-48
            -right-40
            h-[620px]
            w-[620px]
            rounded-full
            blur-[170px]
          "
          style={{
            background:
              'radial-gradient(circle, #53c9c5 0%, transparent 68%)',
          }}
        />

        {/* Central atmosphere */}
        <div
          className="
            absolute
            left-1/2
            top-[35%]
            h-[450px]
            w-[680px]
            -translate-x-1/2
            rounded-full
            opacity-[0.08]
            blur-[150px]
          "
          style={{
            background:
              'radial-gradient(ellipse, #0F7776 0%, transparent 70%)',
          }}
        />

        {/* Very subtle architectural grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage:
              'linear-gradient(#063B3D 1px, transparent 1px), linear-gradient(90deg, #063B3D 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, transparent 82%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, transparent 82%)',
          }}
        />

        <div className="grain-overlay opacity-[0.07]" />
      </div>

      {/* ================================================================
          CONTENT
      ================================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ============================================================
              LEFT CONTENT
          ============================================================ */}

          <div className="lg:col-span-7">

            {/* Eyebrow */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: easeOut,
              }}
              className="flex items-center gap-2.5"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 28 }}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease: easeOut,
                }}
                className="h-px bg-gold-400"
              />

              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-700">
                Climate Craft Projects
              </span>
            </motion.div>

            {/* Main heading */}
            <h1
              className="
                mt-5
                max-w-4xl
                font-display
                text-3xl
                font-normal
                leading-[1.04]
                tracking-[-0.015em]
                text-cream-100
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              {HEADLINE_LINES.map((line, index) => (
                <span
                  key={line.text}
                  className="block overflow-hidden"
                >
                  <motion.span
                    initial={{
                      y: '110%',
                      opacity: 0,
                    }}
                    animate={{
                      y: '0%',
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.35 + index * 0.14,
                      ease: easeOut,
                    }}
                    className={`relative block ${
                      line.accent
                        ? 'italic text-teal-700'
                        : ''
                    }`}
                  >
                    {line.text}

                    {line.accent && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.9,
                          delay: 1.05,
                          ease: easeOut,
                        }}
                        className="
                          absolute
                          -bottom-1
                          left-0
                          h-[2px]
                          w-[92%]
                          origin-left
                          rounded-full
                          bg-gradient-to-r
                          from-gold-400
                          via-gold-300
                          to-transparent
                        "
                      />
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.85,
                ease: easeOut,
              }}
              className="
                mt-5
                max-w-2xl
                text-[14px]
                leading-relaxed
                text-cream-200
                sm:mt-7
                sm:text-[16px]
                lg:text-[17px]
              "
            >
              {SUPPORTING_TEXT}
            </motion.p>

            {/* Project types */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.05,
                ease: easeOut,
              }}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-y-2
              "
            >
              {PROJECT_TYPES.map((type, index) => (
                <div
                  key={type}
                  className="flex items-center"
                >
                  <motion.span
                    whileHover={{
                      y: -2,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      cursor-default
                      px-3
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-cream-200
                      transition-colors
                      duration-300
                      hover:text-teal-700
                      first:pl-0
                    "
                  >
                    {type}
                  </motion.span>

                  {index < PROJECT_TYPES.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-gold-400/70" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.25,
                ease: easeOut,
              }}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-3
                sm:gap-4
              "
            >
              <button
                type="button"
                onClick={scrollToProjects}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-2.5
                  overflow-hidden
                  rounded-full
                  bg-teal-700
                  px-6
                  py-3
                  text-[10px]
                  sm:px-7
                  sm:py-4
                  sm:text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-[0_20px_50px_-16px_rgba(22,155,154,0.5)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-teal-800
                  hover:shadow-[0_28px_60px_-15px_rgba(22,155,154,0.65)]
                  active:translate-y-0
                  active:scale-[0.98]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-1/2
                    w-1/2
                    -skew-x-12
                    bg-white/30
                    opacity-0
                    transition-all
                    duration-700
                    group-hover:left-full
                    group-hover:opacity-100
                  "
                />

                <span className="relative z-10">
                  Explore Projects
                </span>

                <ArrowDown
                  className="
                    relative
                    z-10
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </button>

              <Link
                to="/contact"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-full
                  border
                  border-[#063B3D]/[0.15]
                  px-5
                  py-3
                  text-[10px]
                  sm:px-6
                  sm:py-3.5
                  sm:text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-ink-700
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#063B3D]
                  hover:text-white
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    -z-10
                    origin-left
                    scale-x-0
                    bg-[#063B3D]
                    transition-transform
                    duration-400
                    group-hover:scale-x-100
                  "
                />

                <span>
                  Discuss a Project
                </span>

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT — INFORMATION PANEL
          ============================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.95,
              ease: easeOut,
            }}
            className="
              relative
              lg:col-span-5
              lg:pt-8
            "
          >
            {/* Decorative vertical line */}
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: '100%',
              }}
              transition={{
                duration: 1,
                delay: 1.25,
                ease: easeOut,
              }}
              className="
                absolute
                -left-7
                top-8
                hidden
                w-px
                bg-gradient-to-b
                from-gold-400/0
                via-gold-400/50
                to-teal-700/0
                lg:block
              "
            />

            {/* Intro label */}
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold-700" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-700">
                Engineered Comfort
              </span>
            </div>

            {/* Technology cards */}
            <div className="space-y-3">
              {TECHNOLOGIES.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 1.2 + index * 0.12,
                    ease: easeOut,
                  }}
                  whileHover={{
                    x: 5,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/60
                    bg-white/45
                    p-4
                  sm:p-5
                    shadow-[0_18px_45px_-28px_rgba(6,59,61,0.38)]
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-teal-700/25
                    hover:bg-white/65
                    hover:shadow-[0_25px_55px_-25px_rgba(6,59,61,0.42)]
                  "
                >
                  {/* Hover highlight */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-teal-700/[0.04]
                      via-transparent
                      to-gold-400/[0.05]
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative flex items-start gap-4">

                    {/* Number */}
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        flex-none
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#063B3D]/10
                        bg-white/55
                        font-display
                        text-[11px]
                        italic
                        text-gold-700
                        transition-all
                        duration-300
                        group-hover:border-gold-400/50
                        group-hover:bg-gold-400/10
                      "
                    >
                      {item.number}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">

                        <span
                          className="
                            font-display
                            text-2xl
                            italic
                            leading-none
                            text-teal-700
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                          "
                        >
                          {item.value}
                        </span>

                        <span
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-[#063B3D]
                          "
                        >
                          {item.label}
                        </span>

                      </div>

                      <p
                        className="
                          mt-2
                          text-[10px]
                          leading-relaxed
                          text-[#416A6C]
                        "
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Hover arrow */}
                    <ArrowRight
                      className="
                        mt-1
                        h-3.5
                        w-3.5
                        flex-none
                        text-teal-700/0
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:text-teal-700/70
                      "
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ==========================================================
                INFORMATION STATEMENT
            ========================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.65,
                ease: easeOut,
              }}
              className="
                relative
                mt-5
                overflow-hidden
                rounded-[22px]
                border
                border-[#063B3D]/10
                bg-[#063B3D]/[0.045]
                p-5
                transition-all
                duration-300
                hover:bg-[#063B3D]/[0.065]
              "
            >
              <div className="relative">

                <p
                  className="
                    font-display
                    text-xl
                    font-normal
                    leading-[1.2]
                    text-[#063B3D]
                  "
                >
                  Intelligent comfort,
                  <span className="italic text-teal-700">
                    {' '}designed around the room.
                  </span>
                </p>

                <p
                  className="
                    mt-3
                    text-[10px]
                    leading-relaxed
                    text-[#416A6C]
                  "
                >
                  Every project considers the space, the people using it,
                  and how technology should become part of the experience
                  rather than interrupt it.
                </p>

              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ================================================================
            BOTTOM SCROLL INDICATOR
        ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 2,
            ease: easeOut,
          }}
          className="
            mt-14
            flex
            justify-center
            sm:mt-16
          "
        >
          <button
            type="button"
            onClick={scrollToProjects}
            className="group flex flex-col items-center gap-2"
          >
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-ink-700
                transition-colors
                duration-300
                group-hover:text-teal-700
              "
            >
              Discover the projects
            </span>

            <motion.span
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 5, 0],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#063B3D]/15
                bg-white/35
                text-[#063B3D]
                backdrop-blur-sm
                transition-all
                duration-300
                group-hover:border-teal-700/40
                group-hover:bg-white/60
                group-hover:text-teal-700
              "
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </motion.div>

      </div>
    </section>
  )
}