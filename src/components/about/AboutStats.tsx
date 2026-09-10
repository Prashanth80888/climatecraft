import { motion } from 'framer-motion'
import {
  Snowflake,
  Flame,
  Thermometer,
  Zap,
  Armchair,
  Cpu,
  Sparkles,
  Layers,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { AboutSectionLabel } from './AboutSectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FEATURES = [
  { icon: Snowflake, title: 'Active Cooling' },
  { icon: Flame, title: 'Active Heating' },
  { icon: Thermometer, title: 'Temperature Control' },
  { icon: Zap, title: 'Motorized Reclining' },
  { icon: Armchair, title: 'Ergonomic Support' },
  { icon: Cpu, title: 'Smart Controls' },
  { icon: Sparkles, title: 'Premium Upholstery' },
  { icon: Layers, title: 'Integrated Comfort Features' },
]

export function AboutStats() {
  return (
    <section className="relative border-y border-[#063B3D]/8 bg-white/40 py-20 sm:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              {/* Only this section-label text is enlarged */}
              <div className="[&_span]:!text-[12px] sm:[&_span]:!text-[13px] lg:[&_span]:!text-[14px]">
                <AboutSectionLabel>
                  From Furniture to Comfort Technology
                </AboutSectionLabel>
              </div>

              <h2 className="mt-5 max-w-xl font-display text-4xl font-normal leading-[1.15] text-[#063B3D] sm:text-[2.75rem]">
                Not just another recliner —{' '}
                <span className="italic text-teal-700">
                  a platform for personalized comfort.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="max-w-md text-[16px] leading-relaxed text-ink-700 lg:text-right">
                ClimateCraft is not simply trying to make another recliner. We see furniture as a platform for
                creating a more personalized comfort experience.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-[#063B3D]/10 bg-[#063B3D]/10 sm:mt-16 sm:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon

            return (
              <RevealItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="group relative flex h-full min-h-[168px] flex-col justify-between bg-canvas-soft/90 p-5 transition-colors duration-300 hover:bg-white sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063B3D] text-white transition-colors duration-300 group-hover:bg-teal-700">
                      <Icon className="h-4.5 w-4.5 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="font-display text-xs italic tabular-nums text-[#063B3D]/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[15px] font-bold leading-snug text-[#063B3D]">
                    {feature.title}
                  </h3>

                  <span className="mt-3 block h-px w-6 bg-gold-500 transition-all duration-300 group-hover:w-10" />
                </motion.div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-xl text-[16px] leading-relaxed text-ink-700 sm:mt-12">
            The result is furniture designed not only to support your body, but also to give you greater control
            over how you experience comfort.
          </p>
        </Reveal>
      </div>
    </section>
  )
}