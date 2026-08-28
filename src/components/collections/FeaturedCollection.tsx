import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES, type ProductFamily } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FAMILY_DESCRIPTIONS: Record<ProductFamily['id'], string> = {
  'climate-smart':
    'Patented liquid cooling and heating, motorized reclining and full smart-interface control — from a single considered seat up to a three-seat sofa with dual reclining.',
  'motorised-comfort':
    'Motorized reclining comfort, from a single armchair to a three-seat sofa with two reclining positions — without the climate technology.',
  classic:
    'Premium static seating, generously cushioned and upholstered by hand — no mechanical or climate technology, just timeless comfort.',
}

interface FeaturedCollectionProps {
  family: ProductFamily
  onExplore: () => void
}

export function FeaturedCollection({ family, onExplore }: FeaturedCollectionProps) {
  const products = HOME_PRODUCTS.filter((p) => p.familyId === family.id)

  // Explicitly select Climate Craft Duo for the climate-smart family if present
  const duoProduct = products.find((p) => p.slug.includes('climate-craft-duo') || p.name.toLowerCase().includes('duo'))
  const featured = family.id === 'climate-smart' && duoProduct ? duoProduct : products[0]

  return (
    <section className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-24">
      {/* Soft Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[450px] w-[700px] rounded-full bg-radial from-teal-500/10 via-gold-400/5 to-transparent blur-3xl opacity-80" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={family.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            {/* Giant Background Number Watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 right-0 select-none font-display text-[9rem] font-normal leading-none text-[#063B3D]/[0.05] sm:text-[13rem] lg:right-[38%]"
            >
              {String(family.number).padStart(2, '0')}
            </span>

            {/* Left Media Container */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/40 p-2 shadow-[0_40px_100px_-40px_rgba(6,61,60,0.3)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_50px_110px_-30px_rgba(6,61,60,0.4)] lg:col-span-7"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] sm:aspect-[16/10]">
                {featured && (
                  <motion.img
                    key={featured.slug}
                    initial={{ scale: 1.08, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: easeOut }}
                    src={homeProductImage(featured.slug)}
                    alt={featured.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                )}

                {/* High-Contrast Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#042021]/80 via-[#063B3D]/15 to-transparent" />

                {/* Top Glass Badge */}
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3.5 py-1.5 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    Featured Collection
                  </span>
                </div>

                {/* Bottom Floating Card info */}
                {featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-xl border border-white/40 bg-white/70 p-3.5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/90"
                  >
                    <div>
                      <span className="block text-[9.5px] font-bold uppercase tracking-widest text-gold-700">
                        Highlight Design
                      </span>
                      <span className="font-display text-base italic text-[#063B3D]">
                        {featured.name}
                      </span>
                    </div>
                    {featured.operation && (
                      <span className="rounded-full bg-[#063B3D] px-3 py-1 text-[10px] font-semibold text-white">
                        {featured.operation}
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right Details Column */}
            <div className="relative lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm italic tabular-nums font-semibold text-gold-700">
                  {String(family.number).padStart(2, '0')} / {String(PRODUCT_FAMILIES.length).padStart(2, '0')}
                </span>
                <div className="inline-flex items-center rounded-full border border-[#063B3D]/15 bg-white/80 px-3 py-1 shadow-2xs backdrop-blur-md">
                  <SectionLabel>
                    {String(products.length).padStart(2, '0')} {products.length === 1 ? 'Piece' : 'Pieces'}
                  </SectionLabel>
                </div>
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] text-[#063B3D] sm:text-4xl lg:text-[2.75rem]">
                {family.label}
              </h2>

              <p className="mt-5 max-w-md text-[15px] font-normal leading-relaxed text-ink-700">
                {FAMILY_DESCRIPTIONS[family.id]}
              </p>

              {/* Styled Interactive Button */}
              <motion.button
                type="button"
                onClick={onExplore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#063B3D]/20 bg-white/80 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#063B3D] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-[#063B3D] hover:text-white hover:shadow-lg hover:shadow-[#063B3D]/20"
              >
                <span>Explore the Collection</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}