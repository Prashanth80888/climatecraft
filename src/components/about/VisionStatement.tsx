import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

export function VisionStatement() {
  return (
    <section className="relative bg-transparent py-24 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="bloom" />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel>Our Vision</SectionLabel>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-3xl font-normal italic leading-[1.25] text-cream-100 sm:mt-10 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.2]">
            To make <span className="not-italic text-teal-700">temperature control</span> a natural part of
            personal comfort.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-[15px] leading-relaxed text-cream-200 sm:mt-12 sm:text-[16.5px]">
            We believe the future of furniture will be more responsive to the people using it. Furniture can become
            more than something that supports the body. It can respond to temperature, preferences, usage and the
            environment to create a more personalized experience.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-cream-200 sm:text-[16.5px]">
            ClimateCraft is working toward that future, starting with temperature-controlled seating.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
