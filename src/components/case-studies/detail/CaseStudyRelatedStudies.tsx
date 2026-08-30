import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '../../../data/caseStudies'
import { CASE_STUDIES } from '../../../data/caseStudies'
import type { CaseStudyDetail } from '../../../data/caseStudyDetail'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal'

export function CaseStudyRelatedStudies({
  caseStudies,
}: {
  caseStudies: CaseStudyDetail[]
}) {
  if (caseStudies.length === 0) return null

  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Continue Exploring</SectionLabel>

          <h2 className="mt-4 font-display text-2xl font-normal leading-tight text-cream-100 sm:text-3xl">
            More Climate Craft{' '}
            <span className="italic text-teal-700">case studies.</span>
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2"
          stagger={0.12}
        >
          {caseStudies.map((cs) => {
            // Use the ORIGINAL case-study data for the real images.
            // Match by slug so each related study gets its own actual gallery.
            const originalCaseStudy: CaseStudy | undefined = CASE_STUDIES.find(
              (original) => original.slug === cs.slug,
            )

            const image = originalCaseStudy?.gallery?.[0]

            // Never render a dummy/placeholder image.
            if (!image) return null

            return (
              <RevealItem key={cs.slug}>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="group relative block overflow-hidden rounded-[24px] border border-white/70 bg-white/50 shadow-[0_24px_60px_-30px_rgba(18,59,61,0.28)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-teal-600/35 hover:shadow-[0_36px_80px_-32px_rgba(18,59,61,0.35)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={image}
                      alt={`${cs.title} by Climate Craft`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063B3D]/55 via-[#063B3D]/5 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream-100 backdrop-blur-md">
                      {cs.breadcrumb}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                      <div>
                        <p className="font-display text-lg leading-tight text-white">
                          {cs.title}
                        </p>

                        <p className="mt-1 line-clamp-2 max-w-sm text-[12.5px] leading-relaxed text-white/80">
                          {cs.lead}
                        </p>
                      </div>

                      <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-[#E7C96A] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}