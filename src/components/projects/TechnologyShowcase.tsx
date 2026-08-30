import { motion } from 'framer-motion'
import {
  Thermometer,
  MonitorSmartphone,
  Droplets,
  Flame,
  Waves,
  ArrowRight,
} from 'lucide-react'
import { TECHNOLOGY_HIGHLIGHTS } from '../../data/projects'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const ICON_MAP: Record<string, React.ElementType> = {
  thermometer: Thermometer,
  panel: MonitorSmartphone,
  motion: Waves,
}

export function TechnologyShowcase() {
  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient atmosphere */}
      <div
        className="pointer-events-none absolute -left-[10%] top-[10%] h-[520px] w-[620px] rounded-full opacity-[0.14] blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 68%)',
        }}
      />

      <div
        className="pointer-events-none absolute -right-[8%] top-[42%] h-[420px] w-[420px] rounded-full opacity-[0.09] blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------------------- */}
        {/* INTRO                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Technology</SectionLabel>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-normal leading-[1.08] text-cream-100 sm:text-4xl lg:text-[3.2rem]">
              Intelligent climate control,{' '}
              <span className="italic text-teal-700">
                engineered into the seat.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-cream-200 sm:text-[17px]">
              No fans. No air blowers. Temperature-controlled liquid circulates
              through integrated comfort zones — delivering precise, personal
              climate from 15°C to 35°C. Controlled by voice, touchscreen or remote.
            </p>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CLIMATE RANGE                                                    */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={0.2} className="mt-14 sm:mt-16">
          <ClimateControlRange />
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* TECHNOLOGY CARDS                                                  */}
        {/* ---------------------------------------------------------------- */}

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-6"
          stagger={0.1}
        >
          {TECHNOLOGY_HIGHLIGHTS.map((tech) => (
            <RevealItem key={tech.id}>
              <TechnologyCard tech={tech} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ---------------------------------------------------------------- */}
        {/* HOW IT WORKS                                                      */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={0.3} className="mt-20 lg:mt-28">
          <HowItWorks />
        </Reveal>
      </div>
    </section>
  )
}

/* ========================================================================== */
/* CLIMATE CONTROL RANGE                                                     */
/* ========================================================================== */

function ClimateControlRange() {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/55 bg-white/[0.22] shadow-[0_35px_100px_-35px_rgba(6,59,61,0.35)] backdrop-blur-2xl transition-all duration-700 hover:border-white/75 hover:bg-white/[0.30] hover:shadow-[0_45px_120px_-35px_rgba(6,59,61,0.42)]">

      {/* Glass layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-teal-700/[0.04]" />

      <div
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-15 blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, transparent 70%)',
        }}
      />

      <div className="relative p-6 sm:p-10 lg:p-14">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-700">
            Personal Climate Range
          </span>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70" />
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-10 lg:gap-20">

          {/* COOLING */}
          <ClimateRangeItem
            type="cooling"
            temperature="15°C"
            label="Cooling Minimum"
            description="Precise liquid cooling for warm afternoons and extended sessions"
            icon={Droplets}
            delay={0.1}
          />

          {/* CENTER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
            className="relative hidden flex-col items-center sm:flex"
          >
            <div className="absolute h-32 w-px bg-gradient-to-b from-transparent via-teal-700/20 to-transparent" />

            <motion.div
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-teal-700/20 bg-white/55 shadow-[0_12px_35px_-18px_rgba(22,155,154,0.4)] backdrop-blur-xl"
            >
              <Waves
                className="h-6 w-6 text-teal-700"
                strokeWidth={1.4}
              />

              <span className="absolute inset-2 rounded-full border border-gold-400/20" />
            </motion.div>

            <span className="relative mt-4 bg-white/30 px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-teal-700/75 backdrop-blur-sm">
              Continuous Range
            </span>
          </motion.div>

          {/* HEATING */}
          <ClimateRangeItem
            type="heating"
            temperature="35°C"
            label="Heating Maximum"
            description="Gentle liquid heating for cooler evenings and seasonal comfort"
            icon={Flame}
            delay={0.18}
          />
        </div>

        {/* Bottom explanation */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          className="mx-auto mt-10 max-w-3xl border-t border-[#063B3D]/10 pt-7 text-center"
        >
          <p className="text-[13.5px] leading-[1.75] text-ink-700 sm:text-[14px]">
            Temperature-controlled liquid circulates through integrated pads
            beneath the upper back, lower back and thigh support — creating a
            more precise personal climate experience without noisy fans or air
            blowers.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* CLIMATE RANGE ITEM                                                        */
/* ========================================================================== */

function ClimateRangeItem({
  type,
  temperature,
  label,
  description,
  icon: Icon,
  delay,
}: {
  type: 'cooling' | 'heating'
  temperature: string
  label: string
  description: string
  icon: React.ElementType
  delay: number
}) {
  const isCooling = type === 'cooling'

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isCooling ? -25 : 25,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.45,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: easeOut,
      }}
      className="group/range flex flex-col items-center text-center"
    >
      {/* Circle */}
      <motion.div
        whileHover={{
          scale: 1.05,
          y: -4,
        }}
        transition={{
          duration: 0.35,
          ease: easeOut,
        }}
        className="relative h-32 w-32 sm:h-36 sm:w-36"
      >
        {/* Outer glow */}
        <div
          className={`absolute inset-3 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover/range:opacity-30 ${
            isCooling ? 'bg-teal-700' : 'bg-gold-400'
          }`}
        />

        <svg
          viewBox="0 0 120 120"
          className="relative h-full w-full -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={
              isCooling
                ? 'rgba(22,155,154,0.14)'
                : 'rgba(240,169,44,0.14)'
            }
            strokeWidth="2"
          />

          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={isCooling ? '#169B9A' : '#F0A92C'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="326.7"
            initial={{
              strokeDashoffset: 326.7,
            }}
            whileInView={{
              strokeDashoffset: 81.7,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 1.5,
              delay: delay + 0.2,
              ease: easeOut,
            }}
          />
        </svg>

        {/* Center glass */}
        <div className="absolute inset-[13px] flex items-center justify-center rounded-full border border-white/70 bg-white/55 shadow-inner backdrop-blur-xl">
          <Icon
            className={`h-9 w-9 ${
              isCooling ? 'text-teal-700' : 'text-gold-600'
            }`}
            strokeWidth={1.35}
          />
        </div>
      </motion.div>

      {/* Temperature */}
      <div className="mt-5 font-display text-4xl font-medium tracking-tight text-[#063B3D] sm:text-5xl">
        {temperature}
      </div>

      {/* Label */}
      <div
        className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
          isCooling ? 'text-teal-700' : 'text-gold-700'
        }`}
      >
        {label}
      </div>

      <p className="mt-3 max-w-xs text-[12.5px] leading-[1.7] text-ink-700">
        {description}
      </p>
    </motion.div>
  )
}

/* ========================================================================== */
/* TECHNOLOGY CARD                                                           */
/* ========================================================================== */

function TechnologyCard({
  tech,
}: {
  tech: typeof TECHNOLOGY_HIGHLIGHTS[0]
}) {
  const Icon = ICON_MAP[tech.icon] || Thermometer

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.35,
        ease: easeOut,
      }}
      className="group relative h-full overflow-hidden rounded-[25px] border border-white/55 bg-white/[0.24] p-6 shadow-[0_25px_65px_-30px_rgba(6,59,61,0.28)] backdrop-blur-xl transition-all duration-500 hover:border-teal-700/30 hover:bg-white/[0.38] hover:shadow-[0_35px_85px_-30px_rgba(6,59,61,0.4)] sm:p-7"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      {/* Top decorative line */}
      <span className="absolute left-7 right-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-teal-700 via-gold-400 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative flex h-full flex-col">

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 4,
            scale: 1.08,
          }}
          transition={{
            duration: 0.3,
          }}
          className="relative flex h-13 w-13 items-center justify-center rounded-[15px] border border-teal-700/15 bg-white/70 text-teal-700 shadow-[0_12px_25px_-14px_rgba(6,59,61,0.25)] transition-all duration-500 group-hover:border-teal-700/35 group-hover:bg-teal-700 group-hover:text-white"
        >
          <Icon className="h-6 w-6" strokeWidth={1.6} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold-400 opacity-0 shadow-[0_0_12px_rgba(240,169,44,0.6)] transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="font-display text-xl text-cream-100 transition-colors duration-300 group-hover:text-teal-700">
            {tech.title}
          </h3>

          <p className="mt-3 text-[14px] leading-[1.7] text-cream-200">
            {tech.description}
          </p>
        </div>

        {/* Specs */}
        <div className="mt-7 space-y-3 border-t border-[#063B3D]/10 pt-5">
          {tech.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{
                opacity: 0,
                x: -8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: easeOut,
              }}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-700">
                {spec.label}
              </span>

              <span className="font-display text-base font-medium text-[#063B3D]">
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom indicator */}
        <div className="mt-auto pt-6">
          <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-700/60 transition-colors duration-300 group-hover:text-teal-700">
            Integrated technology
            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ========================================================================== */
/* HOW IT WORKS                                                              */
/* ========================================================================== */

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Liquid Circulation',
      description:
        'Temperature-controlled liquid flows through silent, sealed channels integrated into the seat foam.',
      icon: Waves,
    },
    {
      number: '2',
      title: 'Zone Distribution',
      description:
        'Independent zones target upper back, lower back and thigh support — each controllable to its own setpoint.',
      icon: Droplets,
    },
    {
      number: '3',
      title: 'Precision Exchange',
      description:
        'A compact thermal module beneath the seat heats or cools the liquid to the exact degree requested.',
      icon: Thermometer,
    },
    {
      number: '4',
      title: 'Silent Delivery',
      description:
        'No fans, no air movement, no noise — just consistent temperature transferred directly through contact.',
      icon: Flame,
    },
  ]

  return (
    <div className="relative">

      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>How It Works</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mt-5 font-display text-2xl font-normal text-cream-100 sm:text-3xl lg:text-4xl">
            How liquid climate control{' '}
            <span className="italic text-teal-700">
              works.
            </span>
          </h3>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-3 text-[14px] leading-relaxed text-cream-200 sm:text-[15px]">
            Four stages — from thermal module to your personal comfort zone.
          </p>
        </Reveal>
      </div>

      {/* Process */}
      <div className="relative mt-12 sm:mt-14">

        {/* Center timeline */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 hidden w-px -translate-x-1/2 lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-700/20 to-transparent" />

          <motion.div
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.5,
              ease: easeOut,
            }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-gold-400/20 via-teal-700/35 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: easeOut,
                }}
                className={`group relative flex items-center gap-5 ${
                  isLeft
                    ? 'lg:justify-end lg:pr-10'
                    : 'lg:order-2 lg:justify-start lg:pl-10'
                }`}
              >

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeOut,
                  }}
                  className="relative flex-1 rounded-[22px] border border-white/45 bg-white/[0.18] p-5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/70 group-hover:bg-white/[0.30] group-hover:shadow-[0_25px_65px_-28px_rgba(6,59,61,0.35)] sm:p-6"
                >
                  {/* Number */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-12 w-12 flex-none items-center justify-center rounded-[14px] border border-gold-400/20 bg-white/65 font-display text-base text-gold-700 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:border-teal-700/25 group-hover:bg-teal-700 group-hover:text-white">
                      <span className="absolute inset-1.5 rounded-[10px] border border-gold-400/10" />
                      <span className="relative">{step.number}</span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-display text-lg text-cream-100 transition-colors duration-300 group-hover:text-teal-700">
                        {step.title}
                      </h4>

                      <p className="mt-2 text-[13.5px] leading-[1.7] text-cream-200">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 right-5 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                    <Icon
                      className="h-7 w-7 text-teal-700"
                      strokeWidth={1.2}
                    />
                  </div>

                  {/* Hover line */}
                  <span className="absolute bottom-0 left-6 h-px w-0 bg-gradient-to-r from-gold-400 via-teal-700 to-transparent transition-all duration-500 group-hover:w-24" />
                </motion.div>

                {/* Timeline dot */}
                <div className="relative z-10 hidden h-3.5 w-3.5 flex-none rounded-full border-2 border-white bg-teal-700 shadow-[0_0_0_5px_rgba(22,155,154,0.08),0_0_18px_rgba(22,155,154,0.35)] lg:block" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}