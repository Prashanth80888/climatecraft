import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const ROWS = [
  {
    number: '01',
    title: 'Smart Control',
    value: 'Touch. Remote. Voice.',
    copy: 'Every Climate Smart piece answers to a touch interface, a remote, or a simple voice command.',
  },
  {
    number: '02',
    title: 'Climate Range',
    value: '15°C — 35°C',
    copy: 'Patented liquid cooling & heating technology, regulated through the seat and back.',
  },
  {
    number: '03',
    title: 'Motor System',
    value: 'Precision Reclining',
    copy: 'A quiet, direct motorized mechanism drives reclining and leg-rest adjustment.',
  },
  {
    number: '04',
    title: 'Upholstery',
    value: '460 GSM Premium Fabric',
    copy: 'Weight and weave chosen to hold its shape and feel through years of daily use.',
  },
]

export function SpecificationStrips() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative bg-transparent py-20 sm:py-24 lg:py-28">
      <SectionAtmosphere variant="radial" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>By the Numbers</SectionLabel>

          <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            The specification,{' '}
            <span className="italic text-teal-700">in short.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-ink-900/10">
            {ROWS.map((row) => {
              const isActive = active === row.number

              return (
                <div
                  key={row.number}
                  onMouseEnter={() => setActive(row.number)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative border-b border-ink-900/10 py-7 transition-all duration-300 sm:py-8"
                >
                  {/* Animated top highlight */}
                  <motion.span
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-x-0 top-0 h-[2px] bg-gold-400"
                  />

                  <motion.div
                    animate={{ x: isActive ? 8 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="
                      flex
                      flex-col
                      gap-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:gap-x-10
                    "
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`
                          font-display
                          text-base
                          italic
                          tabular-nums
                          transition-colors
                          duration-300
                          sm:text-lg
                          ${isActive
                            ? 'text-gold-700'
                            : 'text-ink-700'
                          }
                        `}
                      >
                        {row.number}
                      </span>

                      <span
                        className="
                          font-display
                          text-xl
                          font-normal
                          leading-tight
                          tracking-[-0.01em]
                          text-cream-100
                          transition-colors
                          duration-300
                          sm:text-2xl
                        "
                      >
                        {row.title}
                      </span>
                    </div>

                    {/* RIGHT SIDE — MAIN FEATURE */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.035 : 1,
                        x: isActive ? -4 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative self-start sm:self-auto"
                    >
                      {/* Soft glow */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 0.8 : 0,
                          scale: isActive ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3 }}
                        className="
                          absolute
                          inset-0
                          rounded-full
                          bg-gold-400/25
                          blur-2xl
                        "
                      />

                      <span
                        className={`
                          relative
                          inline-flex
                          items-center
                          rounded-full
                          border
                          px-5
                          py-2.5
                          text-[14px]
                          font-bold
                          uppercase
                          leading-tight
                          tracking-[0.10em]
                          transition-all
                          duration-300
                          sm:px-6
                          sm:py-3
                          sm:text-[16px]
                          ${isActive
                            ? `
                                border-gold-400
                                bg-gold-400
                                text-ink-950
                                shadow-[0_12px_35px_-12px_rgba(240,169,44,0.65)]
                              `
                            : `
                                border-teal-700/30
                                bg-teal-700/[0.08]
                                text-teal-700
                                shadow-[0_8px_25px_-15px_rgba(18,59,61,0.35)]
                              `
                          }
                        `}
                      >
                        {/* Status dot */}
                        <span
                          className={`
                            mr-2.5
                            h-2
                            w-2
                            flex-none
                            rounded-full
                            transition-all
                            duration-300
                            ${isActive
                              ? `
                                  bg-ink-950
                                  shadow-[0_0_8px_rgba(18,59,61,0.45)]
                                `
                              : `
                                  bg-teal-700
                                `
                            }
                          `}
                        />

                        {row.value}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 14 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="
                      max-w-md
                      overflow-hidden
                      pl-0
                      text-[14px]
                      font-medium
                      leading-7
                      text-ink-700
                      sm:pl-[4.2rem]
                    "
                  >
                    {row.copy}
                  </motion.p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}