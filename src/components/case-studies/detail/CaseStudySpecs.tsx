import type { CaseStudyDetail } from '../../../data/caseStudyDetail'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal'

export function CaseStudySpecs({ caseStudy }: { caseStudy: CaseStudyDetail }) {
  return (
    <section aria-labelledby="csd-spec-title" className="relative">
      <Reveal>
        <SectionLabel>Specifications</SectionLabel>
        <h2 id="csd-spec-title" className="mt-4 font-display text-2xl font-normal leading-[1.15] text-cream-100 sm:text-3xl">
          {caseStudy.specificationTitle}
        </h2>
      </Reveal>

      <RevealGroup
        className="mt-8 overflow-hidden rounded-[26px] border border-white/70 bg-white/50 shadow-[0_40px_90px_-45px_rgba(18,59,61,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md"
        stagger={0.07}
      >
        {caseStudy.specifications.map((spec, i) => (
          <RevealItem key={spec.label}>
            <div
              className={`group/csd grid grid-cols-1 gap-1.5 px-7 py-5 transition-colors duration-300 hover:bg-white/40 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-8 sm:py-6 ${
                i > 0 ? 'border-t border-white/50' : ''
              }`}
            >
              <div className="sm:col-span-5">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-cream-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500 transition-transform duration-300 group-hover/csd:scale-150" aria-hidden="true" />
                  {spec.label}
                </p>
              </div>
              <div className="sm:col-span-7">
                <p className="csd-spec-value font-display text-[15px] leading-snug text-cream-100 sm:text-[17px]">
                  {spec.value}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}