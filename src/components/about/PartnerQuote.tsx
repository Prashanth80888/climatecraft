import { motion } from 'framer-motion'
import { Quote, Star, Building2 } from 'lucide-react'
import testimonialsData from '../../data/testimonials.json'
import type { Testimonial } from '../../types'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const testimonials = testimonialsData as Testimonial[]

export function PartnerQuote() {
  // Finds Uday Hegde or Kartik Kulkarni,
  // otherwise falls back to the first available testimonial
  const testimonial =
    testimonials.find(
      (t) => t.n === 'Uday Hegde' || t.n === 'Kartik Kulkarni',
    ) ?? testimonials[0]

  if (!testimonial) return null

  return (
    <section className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-28">
      <SectionAtmosphere variant="ambient" />

      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND AMBIENT GLOW                                            */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[750px] -translate-x-1/2 -translate-y-1/2 opacity-[0.28] blur-[130px]"
        style={{
          background:
            'radial-gradient(ellipse, #169B9A 0%, #53c9c5 38%, transparent 72%)',
        }}
      />

      {/* Subtle gold accent */}
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[300px] w-[300px] rounded-full opacity-[0.10] blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------------------- */}
        {/* SECTION LABEL                                                    */}
        {/* ---------------------------------------------------------------- */}

        <Reveal>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#169B9A]" />

            <SectionLabel>
              Partner Testimonial
            </SectionLabel>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* TESTIMONIAL CARD                                                 */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35 }}
            className="group relative mt-8 overflow-hidden rounded-[28px] border border-white/80 bg-white/[0.72] p-7 shadow-[0_30px_75px_-25px_rgba(6,59,61,0.24)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:border-[#169B9A]/30 hover:bg-white/[0.82] hover:shadow-[0_35px_90px_-25px_rgba(6,59,61,0.3)] sm:rounded-[32px] sm:p-10 lg:p-14"
          >

            {/* ------------------------------------------------------------ */}
            {/* INNER GLASS BORDER                                           */}
            {/* ------------------------------------------------------------ */}

            <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/50 sm:rounded-[31px]" />

            {/* ------------------------------------------------------------ */}
            {/* TOP GRADIENT ACCENT                                           */}
            {/* ------------------------------------------------------------ */}

            <div className="absolute inset-x-0 top-0 h-1 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: '0%' }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full w-full bg-gradient-to-r from-[#063B3D] via-[#169B9A] to-[#53c9c5]"
              />
            </div>

            {/* ------------------------------------------------------------ */}
            {/* SUBTLE GLASS REFLECTION                                      */}
            {/* ------------------------------------------------------------ */}

            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/55 to-transparent" />

            {/* ------------------------------------------------------------ */}
            {/* DECORATIVE INTERNAL GLOW                                     */}
            {/* ------------------------------------------------------------ */}

            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.13] blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, #169B9A 0%, transparent 70%)',
              }}
            />

            {/* ------------------------------------------------------------ */}
            {/* RATING + QUOTE ICON                                         */}
            {/* ------------------------------------------------------------ */}

            <div className="relative z-10 flex items-center justify-between">

              {/* Stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Star
                      className="h-[17px] w-[17px] fill-[#169B9A] text-[#169B9A] drop-shadow-[0_2px_5px_rgba(22,155,154,0.25)]"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote Icon */}
              <Quote
                className="h-8 w-8 text-[#169B9A]/45 transition-all duration-500 group-hover:text-[#169B9A]/65"
                strokeWidth={1.5}
              />
            </div>

            {/* ------------------------------------------------------------ */}
            {/* MAIN QUOTE                                                   */}
            {/* ------------------------------------------------------------ */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 mt-7 text-[21px] font-normal leading-[1.55] tracking-[-0.01em] text-[#063B3D] sm:mt-8 sm:text-[25px] sm:leading-[1.5] lg:text-[30px] lg:leading-[1.48]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              "{testimonial.q}"
            </motion.p>

            {/* ------------------------------------------------------------ */}
            {/* DIVIDER                                                      */}
            {/* ------------------------------------------------------------ */}

            <div className="relative z-10 mt-8 h-px w-full bg-gradient-to-r from-[#063B3D]/15 via-[#169B9A]/20 to-transparent sm:mt-10" />

            {/* ------------------------------------------------------------ */}
            {/* PARTNER DETAILS                                              */}
            {/* ------------------------------------------------------------ */}

            <div className="relative z-10 mt-7 flex items-center sm:mt-8">

              <div className="flex items-center gap-4">

                {/* Initials */}
                <motion.div
                  whileHover={{
                    scale: 1.06,
                    rotate: 2,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full border border-[#169B9A]/25 bg-gradient-to-br from-[#169B9A]/15 via-white/70 to-[#53c9c5]/10 font-display text-base font-bold text-[#063B3D] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_20px_-12px_rgba(6,59,61,0.3)] backdrop-blur-md sm:h-14 sm:w-14"
                >
                  <span className="relative z-10">
                    {testimonial.mono || 'UH'}
                  </span>

                  <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-[#169B9A]/10" />
                </motion.div>

                {/* Name + Role */}
                <div>
                  <h4 className="text-[15px] font-bold tracking-[-0.01em] text-[#063B3D] sm:text-base">
                    {testimonial.n}
                  </h4>

                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#557071] sm:text-xs">
                    {testimonial.r}
                  </p>
                </div>

              </div>

            </div>

            {/* ------------------------------------------------------------ */}
            {/* BOTTOM GLASS HIGHLIGHT                                      */}
            {/* ------------------------------------------------------------ */}

            <div className="pointer-events-none absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

          </motion.div>
        </Reveal>

      </div>
    </section>
  )
}