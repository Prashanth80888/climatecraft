import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal } from '../ui/Reveal'

export function FabricArchive() {
  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
      <SectionAtmosphere variant="wave" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="overflow-hidden rounded-[28px] border border-white/80 shadow-[0_60px_140px_-50px_rgba(6,59,61,0.38)]">
                <img
                  src="/images/about/design.png"
                  alt="Diamond-quilted upholstery from the Climate Craft fabric archive"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionLabel>The Fabric Archive</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[2.6rem]">
                Two thousand fabrics, <span className="italic text-teal-700">digitised.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
                A curated archive spanning bouclé, velvet, mohair and performance weaves, colour-matched and
                digitised so partners can specify with confidence before a single piece is cut. Every Climate Craft
                order is made from it, to order — never held as stock.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md border-t border-[#063B3D]/10 pt-6 text-[13.5px] italic leading-relaxed text-[#315F62]/55">
                "Two thousand fabrics, digitised and colour-accurate. Our showroom finally matches what the client
                sees on screen." — Priya Raghunathan, Gallery Owner · Atelier Sud
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
