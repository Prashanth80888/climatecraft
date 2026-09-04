
import {
  Zap,
  Smartphone,
  Thermometer,
  Mic,
  Radio,
  Armchair,
  Palette,
  Wind,
} from 'lucide-react'
import type { HomeProduct } from '../../data/homeProducts'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

interface FeatureRule {
  match: (specs: string[]) => boolean
  icon: typeof Zap
  label: string
}

const RULES: FeatureRule[] = [
  {
    match: (s) =>
      s.some((x) =>
        /motorized reclining|reclining seats?$|reclining position/i.test(x),
      ),
    icon: Zap,
    label: 'Motorized Reclining',
  },
  {
    match: (s) =>
      s.some((x) => /smart touchscreen|interface control/i.test(x)),
    icon: Smartphone,
    label: 'Smart Interface Control',
  },
  {
    match: (s) =>
      s.some((x) => /liquid cooling|temperature range/i.test(x)),
    icon: Thermometer,
    label: 'Liquid Cooling & Heating',
  },
  {
    match: (s) => s.some((x) => /voice control/i.test(x)),
    icon: Mic,
    label: 'Voice Control',
  },
  {
    match: (s) => s.some((x) => /remote control/i.test(x)),
    icon: Radio,
    label: 'Remote Control',
  },
  {
    match: (s) => s.some((x) => /ergonomic/i.test(x)),
    icon: Armchair,
    label: 'Ergonomic Support',
  },
  {
    match: (s) => s.some((x) => /upholstery/i.test(x)),
    icon: Palette,
    label: 'Premium Upholstery',
  },
  {
    match: (s) => s.some((x) => /static seating|no reclining/i.test(x)),
    icon: Wind,
    label: 'Static, Timeless Seating',
  },
]

export function ProductFeatures({
  product,
}: {
  product: HomeProduct
}) {
  const features = RULES.filter((r) => r.match(product.specifications))

  if (features.length === 0) return null

  return (
    <section className="relative bg-transparent py-14 sm:py-18 lg:py-20">
      <SectionAtmosphere variant="radial" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>
          What Makes It{' '}
          {product.name.split('|').pop()?.trim() ?? product.name}
        </SectionLabel>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2 lg:gap-x-16">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <RevealItem key={feature.label}>
                <div className="group flex items-center gap-4 border-b border-ink-900/10 py-5 transition-all duration-300 hover:border-teal-500/40">
                  {/* Icon */}
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-gold-400/25 bg-white/30 text-gold-700 transition-all duration-300 group-hover:scale-105 group-hover:border-teal-500/50 group-hover:bg-white/60">
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </span>

                  {/* Feature text */}
                  <span className="text-[15px] font-semibold uppercase tracking-[0.10em] text-cream-100 transition-colors duration-300">
                    {feature.label}
                  </span>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

