import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { PRODUCT_FAMILIES } from '../../data/homeProducts'
import { useCountUp } from '../../hooks/useCountUp'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal } from '../ui/Reveal'

// Every value here is traceable to real, existing data — the founding year in
// the Footer's copyright line, the fabric count from a real client testimonial
// already live on Collections, and the product family count from the product data.
// Nothing here is a marketing estimate.
const FOUNDING_YEAR = 2020
const ARCHIVE_FABRIC_COUNT = 2000

const STATS = [
  {
    value: new Date().getFullYear() - FOUNDING_YEAR,
    suffix: '',
    label: 'Years of Engineering',
  },
  {
    value: ARCHIVE_FABRIC_COUNT,
    suffix: '+',
    label: 'Archive Fabrics',
  },
  {
    value: PRODUCT_FAMILIES.length,
    suffix: '',
    label: 'Product Families',
  },
]

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number
  suffix: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, active)

  return (
    <div className="flex flex-col items-start border-t border-ink-900/10 px-1 py-7 first:border-t-0 sm:border-t-0 sm:border-l sm:px-7 sm:py-2 sm:first:border-l-0">
      <span className="font-display text-4xl tabular-nums text-[#B89B4A] sm:text-5xl lg:text-6xl">
        {count}
        {suffix}
      </span>

      <span className="mt-3 text-[11px] font-medium uppercase tracking-widest text-cream-200">
        {label}
      </span>
    </div>
  )
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  })

  return (
    <section className="relative bg-transparent py-16 sm:py-20">
      <SectionAtmosphere variant="ambient" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-1 gap-y-8 border-y border-ink-900/10 py-2 sm:grid-cols-3 sm:gap-y-0"
          >
            {STATS.map((stat) => (
              <Stat
                key={stat.label}
                {...stat}
                active={inView}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}