import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCT_FAMILIES } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const FAMILY_IMAGES: Record<string, string> = {
  'climate-smart': homeProductImage('climate-craft-signature'),
  'motorised-comfort': homeProductImage('craft-motion'),
  classic: homeProductImage('craft-classic'),
}

const FAMILY_APPLICATIONS: Record<string, string> = {
  'climate-smart':
    'Intelligent climate comfort for environments where temperature control is part of the experience — residential living, personal retreats and premium media rooms.',
  'motorised-comfort':
    'Movement-focused seating for everyday relaxation — where motorised reclining adapts the position naturally without climate technology.',
  classic:
    'A more understated expression of comfort and craftsmanship — static seating chosen for visual presence and timeless proportions.',
}

export function ProductFamilies() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Product Families</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Three families. Each designed for a different kind of{' '}
            <span className="italic text-teal-700">space.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-200">
            The product family is chosen by the environment, not the other way around.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
          {PRODUCT_FAMILIES.map((family) => (
            <RevealItem key={family.id}>
              <Link
                to={`/collections#${family.id}`}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#0B3F42]/[0.15] bg-[#F4F7F5] transition-all duration-500 hover:border-[#159FA3]/40 hover:shadow-[0_28px_72px_-28px_rgba(6,61,60,0.26)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={FAMILY_IMAGES[family.id]}
                    alt={family.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-100 backdrop-blur-md">
                    {String(family.number).padStart(2, '0')} / 03
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-cream-100 transition-colors duration-300 group-hover:text-gold-700">
                    {family.label}
                  </h3>
                  <p className="mt-1 text-[12px] uppercase tracking-wide text-cream-200">{family.blurb}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-cream-200">
                    {FAMILY_APPLICATIONS[family.id]}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-700/80 transition-all duration-300 group-hover:gap-2.5 group-hover:text-gold-600">
                    View Collection
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
