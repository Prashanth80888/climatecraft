
import type { HomeProduct } from '../../data/homeProducts'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

function findSpec(specs: string[], pattern: RegExp) {
  const match = specs.find((s) => pattern.test(s))
  return match?.includes(':') ? match.split(':')[1]?.trim() : match
}

export function ProductSpecifications({
  product,
}: {
  product: HomeProduct
}) {
  const temperature = findSpec(
    product.specifications,
    /temperature range/i,
  )

  const warranty = findSpec(
    product.specifications,
    /warranty/i,
  )

  const upholstery = product.specifications.some((s) =>
    /460 gsm/i.test(s),
  )
    ? '460 GSM'
    : 'Premium'

  const metrics = [
    {
      label: 'Seating',
      value: String(product.seats),
    },
    {
      label: 'Operation',
      value: product.operation,
    },
    ...(temperature
      ? [
        {
          label: 'Temperature',
          value: temperature,
        },
      ]
      : []),
    {
      label: 'Upholstery',
      value: upholstery,
    },
    ...(warranty
      ? [
        {
          label: 'Warranty',
          value: warranty,
        },
      ]
      : []),
  ]

  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
      <SectionAtmosphere variant="wave" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section title */}
        <Reveal>
          <SectionLabel>Specifications</SectionLabel>
        </Reveal>

        {/* Main specification metrics */}
        <RevealGroup
          className="mt-8 grid grid-cols-2 divide-y divide-ink-900/10 border-y border-ink-900/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5"
          stagger={0.08}
        >
          {metrics.map((m) => (
            <RevealItem
              key={m.label}
              className="px-3 py-7 first:pl-0 sm:px-6 sm:first:pl-0 lg:px-7"
            >
              {/* Label */}
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream-200">
                {m.label}
              </p>

              {/* Value */}
              <p className="mt-2 font-display text-[22px] leading-tight text-gold-700 sm:text-[25px]">
                {m.value}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Detailed specifications */}
        <Reveal delay={0.15}>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
            {product.specifications.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-3 text-[15px] font-medium leading-7 text-cream-200"
              >
                {/* Bullet */}
                <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-gold-400/80" />

                {/* Specification detail */}
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

