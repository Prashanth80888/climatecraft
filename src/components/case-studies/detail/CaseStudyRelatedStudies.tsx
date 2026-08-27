import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '../../../data/caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import { RevealGroup, RevealItem } from '../../ui/Reveal'

export function CaseStudyRelatedStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null

  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>Continue Exploring</SectionLabel>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {caseStudies.map((cs) => (
            <RevealItem key={cs.slug}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group relative block overflow-hidden rounded-[20px] border border-[#0B3F42]/[0.10] bg-[#F4F7F5] transition-all duration-300 hover:border-[#159FA3]/35 hover:shadow-[0_24px_56px_-24px_rgba(6,61,60,0.22)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8EFEC]">
                  <img
                    src={cs.gallery[0]}
                    alt={cs.summary}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-ink-900/[0.14] bg-white/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-cream-100/70 backdrop-blur-md">
                    {cs.category}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <div>
                      <h4 className="font-display text-lg text-cream-100">{cs.title}</h4>
                      <p className="mt-1 max-w-xs text-[12.5px] leading-relaxed text-cream-200/55">{cs.summary}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-gold-700 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
