import { Quote } from 'lucide-react'
import type { CaseStudyArticleSection } from '../../../data/caseStudyDetail'
import { Reveal } from '../../ui/Reveal'

export function CaseStudyStory({ sections }: { sections: CaseStudyArticleSection[] }) {
  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      {sections.map((section, i) => (
        <Reveal key={section.heading} amount={0.25}>
          <article className={i > 0 ? 'border-t border-ink-900/10 pt-12 lg:pt-14' : ''}>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm italic tabular-nums text-gold-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="h-px max-w-[52px] flex-1 bg-ink-900/15" aria-hidden="true" />
            </div>

            <h2 className="mt-4 max-w-xl font-display text-[1.55rem] font-normal leading-[1.12] text-cream-100 sm:text-3xl">
              {section.heading}
            </h2>

            {section.body && (
              <p className="mt-6 max-w-[65ch] text-[15.5px] leading-[1.8] text-cream-200 sm:text-[16.5px]">
                {section.body}
              </p>
            )}

            {section.stats && (
              <div className="mt-7 overflow-hidden rounded-[24px] border border-white/70 bg-white/50 shadow-[0_24px_60px_-35px_rgba(18,59,61,0.25),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md">
                {section.stats.kicker && (
                  <p className="border-b border-white/45 px-7 pb-4 pt-6 text-[11px] font-medium uppercase tracking-widest2 text-gold-700 sm:px-8">
                    {section.stats.kicker}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-7 px-7 py-7 sm:grid-cols-3 sm:px-8 sm:py-8">
                  {section.stats.items.map((item) => (
                    <div key={item.text} className="flex flex-col">
                      {item.value ? (
                        <span className="font-display text-5xl italic leading-none text-teal-800">{item.value}</span>
                      ) : (
                        <span className="mb-2 h-px w-8 bg-gold-500" aria-hidden="true" />
                      )}
                      <p className="mt-4 text-[13.5px] leading-relaxed text-cream-200">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.quote && (
              <figure className="relative mt-7 overflow-hidden rounded-[24px] border border-white/70 bg-white/50 shadow-[0_24px_60px_-35px_rgba(18,59,61,0.25),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md">
                <Quote
                  className="absolute left-7 top-7 h-7 w-7 text-teal-700/25 sm:left-8 sm:top-8"
                  aria-hidden="true"
                />
                <blockquote className="relative px-7 pb-7 pt-14 font-display text-[1.35rem] font-normal italic leading-snug text-cream-100 sm:px-8 sm:pb-8 sm:pt-16 sm:text-2xl">
                  “{section.quote}”
                </blockquote>
                {section.attribution && (
                  <figcaption className="px-7 pb-7 text-[11.5px] font-semibold uppercase tracking-widest text-gold-700 sm:px-8">
                    — {section.attribution}
                  </figcaption>
                )}
              </figure>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  )
}