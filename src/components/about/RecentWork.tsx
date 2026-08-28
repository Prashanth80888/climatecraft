import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles, ExternalLink } from 'lucide-react'
import { getCaseStudyBySlug } from '../../data/caseStudies'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const FEATURED_SLUGS = ['the-parlour', 'quiet-study', 'screening-room']

export function RecentWork() {
  const studies = FEATURED_SLUGS.map(getCaseStudyBySlug).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  )

  if (studies.length === 0) return null

  return (
    <section className="relative bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="radial" />

      {/* Radial Background Light Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.28] blur-[150px]"
        style={{
          background: 'radial-gradient(ellipse, #169B9A 0%, #063B3D 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-4 border-b border-[#063B3D]/10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
              <Compass className="h-3.5 w-3.5 text-gold-600" />
              <SectionLabel>Recent Work</SectionLabel>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#063B3D] sm:text-5xl lg:text-[2.85rem]">
              A few rooms, <span className="italic font-normal text-teal-700">applied.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/case-studies"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#063B3D] shadow-2xs backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-white hover:shadow-md"
            >
              <span>All Case Studies</span>
              <ArrowRight className="h-3.5 w-3.5 text-teal-700 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Case Studies Grid */}
        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <RevealItem key={study.slug}>
              <Link to={`/case-studies/${study.slug}`} className="group block h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/80 p-3.5 shadow-[0_20px_50px_-15px_rgba(6,59,61,0.18)] backdrop-blur-xl transition-all duration-300 group-hover:border-gold-400/60 group-hover:shadow-[0_30px_70px_-20px_rgba(6,59,61,0.28)]"
                >
                  {/* Top Subtle Gold Highlight Bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Image Visual Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#063B3D]/5">
                    <img
                      src={study.gallery[0]}
                      alt={study.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063B3D]/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    {/* Floating Category Tag */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/40 bg-[#063B3D]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-gold-400" />
                      <span>{study.category}</span>
                    </div>

                    {/* Floating Hover Action Icon */}
                    <div className="absolute bottom-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#063B3D] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75 shadow-lg">
                      <ExternalLink className="h-4 w-4 text-teal-700" />
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="flex flex-1 flex-col justify-between p-4 pt-5">
                    <div>
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[#063B3D] transition-colors duration-300 group-hover:text-teal-700">
                        {study.title}
                      </h3>

                      <p className="mt-2.5 text-xs font-normal leading-relaxed text-ink-700/90 line-clamp-3">
                        {study.summary}
                      </p>
                    </div>

                    {/* Action Link Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#063B3D]/10 pt-3.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#063B3D] transition-colors duration-300 group-hover:text-gold-700">
                        Explore Case Study
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063B3D]/5 text-[#063B3D] transition-all duration-300 group-hover:bg-[#063B3D] group-hover:text-white">
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}