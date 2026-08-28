import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HOME_PRODUCTS, type ProductFamily } from '../../data/homeProducts'
import { ProductCard } from './ProductCard'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: easeOut } },
}

interface ProductGridProps {
  family: ProductFamily
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(function ProductGrid({ family }, ref) {
  const products = HOME_PRODUCTS.filter((p) => p.familyId === family.id)

  return (
    <section ref={ref} className="relative bg-transparent pb-24 pt-8 sm:pb-28 lg:pb-32">
      {/* Background Soft Glow for High Contrast & Text Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="h-[500px] w-[800px] rounded-full bg-radial from-white/80 via-white/40 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header with High-Visibility Glass Pill */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#063B3D]/15 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <SectionLabel className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#063B3D]">
              All Pieces in {family.label}
            </SectionLabel>
          </div>

          <span className="text-[12px] font-medium tracking-widest text-[#063B3D]/70 uppercase">
            Showing {products.length} {products.length === 1 ? 'Design' : 'Designs'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={family.id}
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-8"
          >
            {products.map((product, i) => (
              <motion.div key={product.id} variants={item} className="h-full">
                {/* Editorial Rhythm Offset for 3-Column Layouts */}
                <div
                  className={`h-full transition-transform duration-500 ${i % 3 === 1 ? 'lg:-translate-y-4' : ''
                    }`}
                >
                  <div className="h-full rounded-2xl border border-[#063B3D]/10 bg-white/60 p-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-400/40 hover:bg-white/90 hover:shadow-xl hover:shadow-gold-400/10">
                    <ProductCard product={product} total={HOME_PRODUCTS.length} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State Fallback */}
        {products.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-[#063B3D]/20 bg-white/40 p-12 text-center backdrop-blur-sm">
            <p className="font-display text-lg text-[#063B3D]">
              No products available in the {family.label} collection yet.
            </p>
            <p className="mt-1 text-sm text-[#063B3D]/70">
              Check back soon or request a custom architectural specification.
            </p>
          </div>
        )}
      </div>
    </section>
  )
})