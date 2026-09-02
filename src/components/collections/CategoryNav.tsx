import { motion } from 'framer-motion'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../../data/homeProducts'
import { Reveal } from '../ui/Reveal'

interface CategoryNavProps {
  active: number
  onChange: (index: number) => void
  productCounts?: Record<string, number>
}

export function CategoryNav({ active, onChange, productCounts }: CategoryNavProps) {
  return (
    <Reveal amount={0.4}>
      <div className="sticky top-[76px] z-30 bg-canvas/80 py-3 backdrop-blur-xl sm:top-[92px]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Collection categories"
            className="scrollbar-none flex items-center gap-1 overflow-x-auto rounded-full border border-white/80 bg-white/55 p-1.5 shadow-[0_14px_36px_-22px_rgba(6,59,61,0.22),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-[22px] sm:justify-center"
          >
            {PRODUCT_FAMILIES.map((family, i) => {
              const count = productCounts?.[family.id] ?? HOME_PRODUCTS.filter((p) => p.familyId === family.id).length
              return (
                <button
                  key={family.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => onChange(i)}
                  className={`relative flex-none whitespace-nowrap rounded-full px-5 py-2.5 text-[12px] font-medium uppercase tracking-widest transition-colors duration-300 sm:px-6 ${
                    active === i ? 'text-white' : 'text-ink-700 hover:text-ink-900'
                  }`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-teal-700 shadow-[0_10px_24px_-10px_rgba(22,155,154,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {family.label}
                    <span className={`ml-2 tabular-nums ${active === i ? 'text-white/70' : 'text-ink-700/50'}`}>
                      {String(count).padStart(2, '0')}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
