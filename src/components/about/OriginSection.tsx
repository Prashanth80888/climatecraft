import { motion } from 'framer-motion'
import { Sparkles, Cpu, Box, Layers, MapPin, History } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal } from '../ui/Reveal'

const FEATURES = [
  {
    icon: Cpu,
    title: 'Silent Glide Engine',
    desc: 'A silent motor and hand-crank glide, rigorously tested before framing.',
  },
  {
    icon: Box,
    title: 'Hardwood Architecture',
    desc: 'Hand-jointed structural frame engineered to carry motion for generations.',
  },
  {
    icon: Layers,
    title: 'Bespoke Suspension',
    desc: 'Hand-tied, zone-tensioned seating upholstered from our digital archive.',
  },
]

export function OriginSection() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="bloom" />

      {/* Radial Background Light Glow */}
      <div
        className="pointer-events-none absolute left-10 top-1/2 h-[450px] w-[750px] -translate-y-1/2 opacity-[0.35] blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, #063B3D 50%, transparent 75%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Glass Card Narrative Content */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
                <History className="h-3.5 w-3.5 text-gold-600" />
                <SectionLabel>The Origin</SectionLabel>
              </div>

              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-[#063B3D] sm:mt-5 sm:text-4xl lg:text-5xl lg:text-[2.85rem]">
                A mechanism, <span className="italic font-normal text-teal-700">then a chair.</span>
              </h2>

              <p className="mt-4 text-[14px] font-normal leading-relaxed text-ink-700 sm:mt-5 sm:text-[16px] lg:text-[17px]">
                Climate Craft was founded in 2009 in Antwerp, Belgium — still the address every piece is engineered from today. The company was built on a simple ordering of priorities: <strong className="font-semibold text-[#063B3D]">the mechanism comes first</strong>, and everything else is crafted to honour it.
              </p>
            </Reveal>

            {/* Micro Feature Interactive Cards */}
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-3.5 border-t border-[#063B3D]/15 pt-6">
                {FEATURES.map((item) => {
                  const IconComp = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ x: 6, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-start gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-2xs backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#063B3D] text-white shadow-xs transition-colors duration-300 group-hover:bg-[#169B9A]">
                        <IconComp className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#063B3D]">{item.title}</h4>
                        <p className="mt-0.5 text-xs font-normal text-ink-700/90 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/40 p-3 shadow-[0_30px_70px_-20px_rgba(6,59,61,0.25)] backdrop-blur-xl"
              >
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src="/images/about/motion.png"
                    alt="The motorized mechanism at the centre of a Climate Craft piece"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105 sm:aspect-[4/3] lg:aspect-[4/5]"
                  />

                  {/* Image Light Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/60 via-transparent to-transparent opacity-80" />

                  {/* Location Floating Badge Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 sm:gap-2 sm:px-4 sm:py-2">
                    <MapPin className="h-3.5 w-3.5 text-teal-700 animate-bounce sm:h-4 sm:w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#063B3D] sm:text-xs">
                      Antwerp, Belgium · Est. 2009
                    </span>
                  </div>

                  {/* Quality Seal Floating Pill */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-gold-400/50 bg-[#063B3D]/80 px-2.5 py-1 shadow-md backdrop-blur-md sm:top-5 sm:right-5 sm:gap-1.5 sm:px-3.5 sm:py-1.5">
                    <Sparkles className="h-3 w-3 text-gold-400 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white sm:text-[10px]">
                      Patented Motion
                    </span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}