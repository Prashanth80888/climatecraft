import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function CollectionsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const heroProduct = HOME_PRODUCTS[0]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:pt-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl lg:px-8">
        <div className="flex min-h-[70vh] flex-col gap-12 lg:min-h-[80vh] lg:flex-row lg:items-center lg:gap-20">

          {/* ── Left: Typography ─────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[55%]">
            <Reveal>
              <SectionLabel>Climate Craft Collections</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-7 max-w-xl font-display text-[2.6rem] font-normal leading-[1.05] text-[#063B3D] sm:text-6xl lg:text-[4.25rem]">
                Engineered motion.
                <br />
                <span className="italic text-teal-700">Considered comfort.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[540px] text-[15px] leading-[1.7] text-cream-200 sm:text-base">
                Precision mechanisms. Bespoke comfort. Timeless design — {PRODUCT_FAMILIES.length} collections of
                motorized and manually operated seating, each engineered in-house and upholstered by hand.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex items-center gap-x-10 gap-y-4 border-t border-[#063B3D]/15 pt-7 sm:gap-x-12">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl text-gold-700">{PRODUCT_FAMILIES.length}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink-700">Collections</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl text-gold-700">{HOME_PRODUCTS.length}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink-700">Pieces</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl italic text-[#169B9A]">MTO</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink-700">Made to Order</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Hero Image ────────────────────────────────────────── */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full flex-1 lg:max-w-[45%]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={homeProductImage(heroProduct.slug)}
                alt={heroProduct.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/8 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
