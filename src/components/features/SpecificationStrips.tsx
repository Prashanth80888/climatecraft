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
                  className="group relative border-b border-ink-900/10 py-6 transition-all duration-300 sm:py-7"
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
                    className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8"
                  >
                    {/* Left Side */}
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-display text-sm italic tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-gold-700' : 'text-ink-700'
                        }`}
                      >
                        {row.number}
                      </span>

                      <span className="font-display text-xl text-cream-100 sm:text-2xl">
                        {row.title}
                      </span>
                    </div>

                    {/* Right Side — Main Feature Highlight */}
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
                      {/* Soft glow behind the feature */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 0.75 : 0,
                          scale: isActive ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl"
                      />

                      <span
                        className={`
                          relative
                          inline-flex
                          items-center
                          rounded-full
                          border
                          px-4
                          py-2
                          text-[12px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          transition-all
                          duration-300
                          sm:px-5
                          sm:py-2.5
                          sm:text-[13px]
                          ${
                            isActive
                              ? 'border-gold-400/70 bg-gold-400/15 text-gold-700 shadow-[0_8px_30px_-12px_rgba(240,169,44,0.55)]'
                              : 'border-teal-700/25 bg-teal-700/[0.08] text-teal-700 shadow-sm'
                          }
                        `}
                      >
                        <span
                          className={`
                            mr-2
                            h-1.5
                            w-1.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? 'bg-gold-400 shadow-[0_0_8px_rgba(240,169,44,0.8)]'
                                : 'bg-teal-700'
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
                      marginTop: isActive ? 12 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="max-w-md overflow-hidden pl-0 text-[13.5px] leading-relaxed text-ink-700 sm:pl-[3.35rem]"
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