import { SPACE_PROCESS } from '../../data/projects'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

export function SpaceProcess() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="wave" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>How We Approach a Space</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            From room to experience.{' '}
            <span className="italic text-teal-700">Step by step.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:mt-20">
          {SPACE_PROCESS.map((step) => (
            <RevealItem key={step.number}>
              <div className="group relative flex flex-col gap-4 rounded-[20px] border border-ink-900/[0.08] bg-white/50 p-6 transition-all duration-500 hover:border-gold-400/20 hover:bg-white/55">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/25 font-display text-sm text-gold-700/75 tabular-nums transition-all duration-500 group-hover:border-teal-500/70 group-hover:text-gold-700">
                  {step.number}
                </span>
                <h3 className="font-display text-xl text-cream-100">{step.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-cream-200">{step.copy}</p>
                <span className="mt-auto h-px w-6 bg-gold-400/20 transition-all duration-500 group-hover:w-10 group-hover:bg-gold-400/50" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
