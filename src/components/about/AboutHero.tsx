import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sofa, Cpu, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'


const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ["We're Rethinking", 'What Comfort Can Be']

const PILLARS = [
  { icon: Sofa, label: 'Premium Furniture' },
  { icon: Cpu, label: 'Temperature Technology' },
  { icon: Heart, label: 'Personal Comfort' },
]

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left: eyebrow -> headline -> short line -> CTAs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            >
              <div className="flex items-center gap-3">
                {/* Keep ONE decorative line */}
                <span className="h-px w-10 bg-[#b18a2d]" />

                <span className="text-[14px] font-bold uppercase tracking-[0.24em] text-[#245d63] sm:text-[16px] lg:text-[17px]">
                  About ClimateCraft
                </span>
              </div>
            </motion.div>

            <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-[#063B3D] sm:mt-7 sm:text-[4rem] md:text-[4.75rem] lg:text-[4.5rem] xl:text-[4.75rem]">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1,
                      delay: 0.35 + i * 0.18,
                      ease: easeOut,
                    }}
                    className={`block ${i === 1 ? 'italic text-teal-700 font-normal' : ''
                      }`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
              className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-700 sm:mt-8 sm:text-[19px]"
            >
              Comfort should not depend entirely on the temperature around you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: easeOut }}
              className="mt-9 flex flex-wrap items-center gap-4 sm:mt-10"
            >
              <Link
                to="/collections"
                className="group inline-flex items-center gap-3 rounded-full bg-[#063B3D] px-7 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_-15px_rgba(6,59,61,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 sm:px-8 sm:py-4 sm:text-xs"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#why-exists"
                className="group inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-700 transition-colors duration-300 hover:text-teal-700 sm:text-xs"
              >
                <span>Our Story</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right: supporting detail panel */}
          <div className="lg:col-span-5 lg:pt-3">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: easeOut }}
              className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 p-7 shadow-glass backdrop-blur-xl sm:p-8"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

              <p className="font-display text-xl font-normal italic leading-snug text-[#063B3D] sm:text-2xl">
                ClimateCraft is building a new approach to personal comfort —
                combining premium furniture, temperature-control technology and
                intelligent controls into one experience.
              </p>

              <div className="mt-7 space-y-4 border-t border-[#063B3D]/10 pt-6">
                {PILLARS.map((pillar, i) => {
                  const Icon = pillar.icon

                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.1 + i * 0.1,
                        ease: easeOut,
                      }}
                      className="flex items-center gap-3.5"
                    >
                      <span className="font-display text-xs italic tabular-nums text-gold-600/80">
                        0{i + 1}
                      </span>

                      <Icon className="h-4 w-4 flex-none text-teal-700" />

                      <span className="text-[13.5px] font-bold uppercase tracking-wider text-[#063B3D]">
                        {pillar.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}