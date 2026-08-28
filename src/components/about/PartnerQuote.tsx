import { motion } from 'framer-motion'
import { Quote, Star, Building2 } from 'lucide-react'
import testimonialsData from '../../data/testimonials.json'
import type { Testimonial } from '../../types'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const testimonials = testimonialsData as Testimonial[]

export function PartnerQuote() {
  // Finds Uday Hegde or Kartik Kulkarni, otherwise falls back to the first available testimonial
  const testimonial =
    testimonials.find((t) => t.n === 'Uday Hegde' || t.n === 'Kartik Kulkarni') ?? testimonials[0]

  if (!testimonial) return null

  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-28">
      <SectionAtmosphere variant="ambient" />

      {/* Radial Background Light Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[750px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35] blur-[130px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, #f0a92c 40%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gold-600" />
            <SectionLabel>Partner Testimonial</SectionLabel>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="relative mt-8 overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-8 shadow-[0_25px_60px_-20px_rgba(6,59,61,0.2)] backdrop-blur-xl sm:p-12 lg:p-14"
          >
            {/* Top Accent Strip */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#063B3D] via-[#169B9A] to-gold-400" />

            {/* Header Rating & Quote Watermark */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-gold-600/50" strokeWidth={1.5} />
            </div>

            {/* Main Quote Copy */}
            <p className="mt-8 font-display text-2xl font-normal italic leading-[1.4] text-[#063B3D] sm:text-3xl lg:text-[2.2rem]">
              "{testimonial.q}"
            </p>

            {/* Partner Details */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#063B3D]/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/50 bg-gradient-to-br from-gold-500/20 via-teal-600/20 to-transparent font-display text-base font-bold text-[#063B3D] shadow-inner">
                  {testimonial.mono || 'UH'}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#063B3D]">{testimonial.n}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-700">
                    {testimonial.r}
                  </p>
                </div>
              </div>

              {testimonial.location && (
                <span className="rounded-full border border-[#063B3D]/15 bg-white/90 px-4 py-1.5 text-xs font-bold text-teal-800 shadow-2xs">
                  {testimonial.location}
                </span>
              )}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}