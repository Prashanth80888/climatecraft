import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Users,
  Sparkles,
} from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const COLLECTIVE_WORDS = [
  'Many People',
  'Many Skills',
  'Many Efforts',
  'One Product',
]

const PEOPLE_POINTS = [
  {
    number: '01',
    title: 'Ideas',
    text: 'People who shape the idea and direction.',
  },
  {
    number: '02',
    title: 'Craft',
    text: 'People who design, manufacture, and assemble.',
  },
  {
    number: '03',
    title: 'Precision',
    text: 'People who test, refine, and support.',
  },
  {
    number: '04',
    title: 'Delivery',
    text: 'People who help bring the product to you.',
  },
]

export function RecentWork() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-16 h-80 w-80 rounded-full bg-teal-700/5 blur-3xl" />
        <div className="absolute -right-40 top-[38%] h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-700/[0.035] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            THE PEOPLE BEHIND CLIMATECRAFT
        ===================================================== */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* -------------------------------------------------
              LEFT COLUMN
          ------------------------------------------------- */}
          <div className="min-w-0">
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/10">
                  <Users className="h-3.5 w-3.5 text-gold-600" />
                </span>

                <SectionLabel>
                  The People Behind ClimateCraft
                </SectionLabel>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-7 max-w-xl font-display text-3xl font-normal leading-[1.16] tracking-[-0.025em] text-[#063B3D] sm:text-4xl lg:text-[2.65rem] xl:text-[2.8rem]">
                A product may carry a company's name,
                <span className="text-teal-700/70">
                  {' '}
                  but it is never built by one person alone.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 h-px w-20 bg-gradient-to-r from-gold-500 to-transparent" />
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-7 max-w-lg text-[15px] leading-[1.8] text-[#466365]">
                At ClimateCraft, we value every hand involved in bringing our
                products to life — from the people who shape the idea and
                design the technology to those who manufacture, assemble, test,
                support, and deliver it.
              </p>
            </Reveal>

            {/* Small visual marker */}
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-[#F5F7F4] bg-[#063B3D]" />
                  <span className="h-7 w-7 rounded-full border-2 border-[#F5F7F4] bg-gold-500/70" />
                  <span className="h-7 w-7 rounded-full border-2 border-[#F5F7F4] bg-[#063B3D]/60" />
                  <span className="h-7 w-7 rounded-full border-2 border-[#F5F7F4] bg-gold-500/35" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#063B3D]/45">
                  A collective effort
                </span>
              </div>
            </Reveal>
          </div>

          {/* -------------------------------------------------
              RIGHT COLUMN
          ------------------------------------------------- */}
          <div className="min-w-0">
            <Reveal delay={0.08}>
              <div className="space-y-5 text-[15px] leading-[1.8] text-[#466365]">
                <p>
                  We believe every contribution deserves recognition. The
                  person whose work happens behind the scenes is just as much a
                  part of the craft as the person whose name appears at the
                  front.
                </p>

                <p>
                  There are simply too many people whose efforts make
                  ClimateCraft possible to represent them all through a few
                  photographs or titles. And choosing only a handful would
                  never feel right to us.
                </p>

                <p>
                  So, rather than putting faces to a selected few, we choose to
                  acknowledge the collective hands behind every product we
                  craft.
                </p>
              </div>
            </Reveal>

            {/* Contribution cards */}
            <Reveal delay={0.18}>
              <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PEOPLE_POINTS.map((point, index) => (
                  <motion.div
                    key={point.number}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#063B3D]/10 bg-white/65 p-5 shadow-[0_12px_35px_rgba(6,59,61,0.045)] backdrop-blur-md transition-all duration-300 hover:border-gold-500/30 hover:bg-white/90"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gold-500/5 blur-2xl transition-transform duration-500 group-hover:scale-150"
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-gold-600">
                          {point.number}
                        </span>

                        <ArrowUpRight className="h-4 w-4 text-[#063B3D]/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600" />
                      </div>

                      <h3 className="mt-6 font-display text-xl font-semibold text-[#063B3D]">
                        {point.title}
                      </h3>

                      <p className="mt-2 text-[13px] leading-[1.65] text-[#65797B]">
                        {point.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Closing statement */}
            <Reveal delay={0.28}>
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-[#063B3D] px-6 py-6 shadow-[0_18px_50px_rgba(6,59,61,0.13)] sm:px-7 sm:py-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-gold-400/10 blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-20 w-40 bg-teal-300/5 blur-3xl"
                />

                <div className="relative">
                  <Sparkles className="h-5 w-5 text-gold-400" />

                  <p className="mt-4 text-[14px] font-medium leading-[1.75] text-white/90">
                    Because ClimateCraft is not the work of one founder, one
                    team, or one department.
                  </p>

                  <p className="mt-2 text-[14px] font-medium leading-[1.75] text-white/75">
                    It is the result of many people, many skills, and countless
                    efforts coming together to build something meaningful.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =====================================================
            COLLECTIVE IDENTITY
        ===================================================== */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden border-y border-[#063B3D]/10 py-6 sm:mt-20 sm:py-7">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-gold-500 to-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-px w-24 bg-gradient-to-l from-gold-500 to-transparent"
            />

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
              {COLLECTIVE_WORDS.map((word, index) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-x-5 sm:gap-x-8"
                >
                  <span
                    className={`font-display text-base italic sm:text-lg ${word === 'One Product'
                      ? 'font-semibold text-[#063B3D]'
                      : 'text-[#063B3D]/60'
                      }`}
                  >
                    {word}
                  </span>

                  {index < COLLECTIVE_WORDS.length - 1 && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-gold-500"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            WHERE WE OPERATE
        ===================================================== */}
        <div className="mt-20 border-t border-[#063B3D]/10 pt-16 sm:mt-24 sm:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

            {/* Left */}
            <div>
              <Reveal>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/10">
                    <MapPin className="h-3.5 w-3.5 text-gold-600" />
                  </span>

                  <SectionLabel>Where We Operate</SectionLabel>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="mt-7 max-w-xl font-display text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-[#063B3D] sm:text-4xl">
                  Built in India.
                  <span className="block font-normal text-[#063B3D]/55">
                    Designed to reach further.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-[#557072]">
                  Our current focus is India, with plans to expand the reach of
                  temperature-controlled comfort technology as the product
                  portfolio grows.
                </p>
              </Reveal>
            </div>

            {/* Right */}
            <div>
              <Reveal delay={0.12}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Based In */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="group relative min-h-[190px] overflow-hidden rounded-3xl border border-[#063B3D]/10 bg-white/70 p-6 shadow-[0_15px_45px_rgba(6,59,61,0.05)] backdrop-blur-md sm:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-700/5 blur-2xl transition-transform duration-500 group-hover:scale-150"
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                          Based In
                        </span>

                        <MapPin className="h-4 w-4 text-[#063B3D]/25 transition-colors group-hover:text-gold-600" />
                      </div>

                      <div className="mt-auto pt-10">
                        <p className="font-display text-xl font-semibold leading-tight text-[#063B3D] sm:text-2xl">
                          Bangalore
                        </p>

                        <p className="mt-1 text-[13px] text-[#637678]">
                          Karnataka, India
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Serving */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="group relative min-h-[190px] overflow-hidden rounded-3xl bg-[#063B3D] p-6 shadow-[0_15px_45px_rgba(6,59,61,0.14)] sm:p-7"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                          Serving
                        </span>

                        <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400" />
                      </div>

                      <div className="mt-auto pt-10">
                        <p className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                          All Over India
                        </p>

                        <p className="mt-1 text-[13px] text-white/50">
                          Current focus
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col gap-5 border-t border-[#063B3D]/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-[13px] leading-[1.7] text-[#6A7E80]">
                Discover the products bringing premium seating and active
                temperature control together.
              </p>

              <Link
                to="/collections"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#063B3D] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(6,59,61,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#074C4E] hover:shadow-[0_14px_35px_rgba(6,59,61,0.22)]"
              >
                Explore Products

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-gold-500/20">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}