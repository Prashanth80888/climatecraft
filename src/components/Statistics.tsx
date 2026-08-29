import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { Reveal } from './ui/Reveal'
import { SectionAtmosphere } from './ui/SectionAtmosphere'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Craft' },
  { value: 300, suffix: '+', label: 'Bespoke Projects' },
  { value: 10, suffix: 'K+', label: 'Pieces Delivered' },
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
    <div className="flex flex-col items-center border-t border-ink-900/10 px-4 py-9 text-center first:border-t-0 sm:border-t-0 sm:border-l sm:py-11 sm:first:border-l-0">
      <span className="font-display text-4xl tabular-nums text-gold-700 sm:text-5xl">
        {count}
        {suffix}
      </span>

      <span className="mt-2.5 text-[11px] font-medium uppercase tracking-widest text-cream-200">
        {label}
      </span>
    </div>
  )
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section className="relative bg-transparent py-14 sm:py-16">
      <SectionAtmosphere variant="ambient" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-2 border-y border-ink-900/10 sm:grid-cols-3"
          >
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} active={inView} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}