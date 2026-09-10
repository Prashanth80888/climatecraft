import { motion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRINCIPLES = [
  {
    number: '01',
    title: 'Purposeful Innovation',
    copy: 'We develop technology around real comfort problems rather than adding technology for its own sake.',
  },
  {
    number: '02',
    title: 'Human-Centered Design',
    copy: 'The technology exists to improve the experience of the person using the product.',
  },
  {
    number: '03',
    title: 'Premium Experience',
    copy: 'Materials, ergonomics, controls and technology must work together to create a product that feels complete.',
  },
  {
    number: '04',
    title: 'Continuous Improvement',
    copy: 'Comfort technology is an evolving field. We continue to refine the way technology and furniture work together.',
  },
  {
    number: '05',
    title: 'Responsible Engineering',
    copy: 'Innovation is meaningful only when it can be translated into a reliable and usable product.',
  },
]

export function BrandPrinciples() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          {/* Highlighted centered section label — same style as previous sections */}
          <div className="flex w-full justify-center">
            <div className="inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap rounded-full border border-gold-500/30 bg-gold-400/[0.10] px-5 py-2.5 text-center shadow-[0_10px_30px_-18px_rgba(6,59,61,0.45)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 sm:text-[13px] lg:text-[14px]">
                What We Stand For
              </span>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 sm:mt-16">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.number}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="group relative border-b border-[#063B3D]/10 py-8 first:border-t sm:py-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-0 select-none font-display text-[5rem] font-bold italic leading-none text-[#063B3D]/[0.05] transition-colors duration-500 group-hover:text-gold-500/10 sm:-top-5 sm:text-[8rem]"
                >
                  {p.number}
                </span>

                <div className="relative max-w-lg">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest text-gold-700">
                    {p.number}
                  </span>

                  <h3 className="mt-2 font-display text-3xl font-semibold text-[#063B3D] sm:text-[2rem]">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-[16px] leading-relaxed text-ink-700">
                    {p.copy}
                  </p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}