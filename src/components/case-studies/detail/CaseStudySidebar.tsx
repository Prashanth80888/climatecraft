import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CaseStudyDetail } from '../../../data/caseStudyDetail'
import { Reveal } from '../../ui/Reveal'

export function CaseStudySidebar({ caseStudy }: { caseStudy: CaseStudyDetail }) {
  return (
    <Reveal amount={0.2} className="lg:sticky lg:top-28">
      <aside
        className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 shadow-[0_40px_90px_-45px_rgba(18,59,61,0.32),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
        aria-label="Project summary"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-[0.16] blur-3xl"
          style={{ background: 'radial-gradient(circle, #53c9c5 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative px-7 pb-7 pt-8 sm:p-8">
          <p className="font-display text-sm italic tabular-nums text-gold-700">
            {caseStudy.breadcrumb}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-cream-100">{caseStudy.sidebarTitle}</h3>

          <dl className="mt-6">
            {caseStudy.sidebarStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1 py-4 ${i > 0 ? 'border-t border-ink-900/[0.08]' : ''}`}
              >
                <dt className="text-[10.5px] font-semibold uppercase tracking-widest text-cream-200">
                  {stat.label}
                </dt>
                <dd className="font-display text-[15px] leading-snug text-teal-800">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative border-t border-ink-900/[0.08] bg-white/35 px-7 py-7 sm:px-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-gold-700">{caseStudy.cta.eyebrow}</p>
          <p className="mt-2 font-display text-xl leading-snug text-cream-100">{caseStudy.cta.heading}</p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-cream-200">{caseStudy.cta.body}</p>

          <Link to="/contact" className="group btn-primary mt-6 w-full">
            {caseStudy.cta.linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </aside>
    </Reveal>
  )
}