import { motion } from 'framer-motion'
import { Sparkles, Layers, CheckCircle2, Quote, Star, Palette } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal } from '../ui/Reveal'

const TEXTILE_TYPES = [
  'Tactile Bouclé',
  'Mohair Velvet',
  'Performance Weaves',
  'Aniline Leather',
]

export function FabricArchive() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="wave" />

      {/* Background Radial Light Glow */}
      <div
        className="pointer-events-none absolute right-10 top-1/2 h-[450px] w-[750px] -translate-y-1/2 opacity-[0.35] blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, #063B3D 50%, transparent 75%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Image & Interactive Visual Showcase */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/40 p-3 shadow-[0_30px_70px_-20px_rgba(6,59,61,0.25)] backdrop-blur-xl"
              >
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src="/images/about/design.png"
                    alt="Diamond-quilted upholstery from the Climate Craft fabric archive"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105 sm:aspect-[4/3] lg:aspect-[4/5]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/70 via-transparent to-transparent opacity-85" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/40 bg-[#063B3D]/80 px-4 py-1.5 shadow-md backdrop-blur-md">
                    <Palette className="h-3.5 w-3.5 text-gold-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      2,000+ Curated Specs
                    </span>
                  </div>

                  {/* Bottom Image Caption Badge */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/30 bg-white/85 p-4 shadow-lg backdrop-blur-md">
                    <div>
                      <p className="text-xs font-bold text-[#063B3D]">Digital Twin Calibration</p>
                      <p className="text-[11px] font-medium text-ink-700">100% Color-Accurate Rendering</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-700 text-white">
                      <Sparkles className="h-4 w-4 text-gold-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Right Column: Text & Partner Quote */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
                <Layers className="h-3.5 w-3.5 text-gold-600" />
                <SectionLabel>The Fabric Archive</SectionLabel>
              </div>

              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#063B3D] sm:text-5xl lg:text-[2.85rem]">
                Two thousand fabrics, <span className="italic font-normal text-teal-700">digitised.</span>
              </h2>

              <p className="mt-5 text-[16px] font-normal leading-relaxed text-ink-700 sm:text-[17px]">
                A master curated archive spanning bouclé, velvet, mohair, and performance weaves. Color-matched and high-resolution digitised so partners can specify with absolute confidence before a single piece is cut. Every Climate Craft order is tailored individually from it — never held as stock.
              </p>
            </Reveal>

            {/* Textile Pill Tags */}
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-2">
                {TEXTILE_TYPES.map((type) => (
                  <div
                    key={type}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#063B3D]/15 bg-white/80 px-3.5 py-2 text-xs font-bold text-[#063B3D] shadow-2xs transition-all hover:border-gold-400 hover:bg-white"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Glassmorphism Partner Testimonial Card */}
            <Reveal delay={0.25}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative mt-8 overflow-hidden rounded-2xl border border-white/90 bg-white/85 p-6 shadow-[0_15px_35px_-10px_rgba(6,59,61,0.15)] backdrop-blur-xl"
              >
                {/* Top Accent Strip */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#063B3D] via-[#169B9A] to-gold-400" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-gold-600/60" />
                </div>

                <p className="mt-3 font-display text-base font-normal italic leading-relaxed text-[#063B3D]">
                  "Two thousand fabrics, digitised and colour-accurate. Our showroom finally matches what the client sees on screen."
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-[#063B3D]/10 pt-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/50 bg-gold-500/10 font-display text-xs font-bold text-[#063B3D]">
                    PR
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#063B3D]">Priya Raghunathan</h4>
                    <p className="text-[11px] font-semibold text-ink-700/80 uppercase tracking-wider">
                      Gallery Owner · Atelier Sud
                    </p>
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