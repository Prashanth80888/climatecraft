import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { CaseStudyDetail } from '../../../data/caseStudyDetail'
import { CASE_STUDY_DETAILS } from '../../../data/caseStudyDetail'
import { CASE_STUDIES } from '../../../data/caseStudies'
import { SectionAtmosphere } from '../../ui/SectionAtmosphere'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface CaseStudyDetailHeroProps {
  caseStudy: CaseStudyDetail
  index: number
  location?: string
}

/**
 * Resolve the hero image from the ORIGINAL case-study data.
 *
 * The detail data may contain an outdated/dummy heroImage.
 * The original caseStudies data already contains the correct
 * case-study-specific gallery images, so we intentionally resolve
 * the image by matching the case-study slug.
 */
function getActualCaseStudyImage(caseStudy: CaseStudyDetail): string | undefined {
  const originalCaseStudy = CASE_STUDIES.find(
    (item) => item.slug === caseStudy.slug,
  )

  return originalCaseStudy?.gallery?.[0]
}

export function CaseStudyDetailHero({
  caseStudy,
  index,
  location,
}: CaseStudyDetailHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const total = CASE_STUDY_DETAILS.length
  const words = caseStudy.title.split(' ')

  /**
   * IMPORTANT:
   * Do NOT use caseStudy.heroImage here.
   *
   * The original CASE_STUDIES mapping contains the actual images
   * associated with each case study.
   */
  const actualHeroImage = getActualCaseStudyImage(caseStudy)

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <SectionAtmosphere variant="radial" />

      <div
        className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full opacity-[0.40] blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, #53c9c5 0%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[360px] w-[360px] rounded-full opacity-[0.18] blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, #c9a84e 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealNav>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-cream-200"
          >
            <Link
              to="/case-studies"
              className="transition-colors duration-300 hover:text-gold-700"
            >
              Case Studies
            </Link>

            <span
              aria-hidden="true"
              className="text-cream-200/70"
            >
              /
            </span>

            <span
              aria-current="page"
              className="text-teal-800"
            >
              {caseStudy.breadcrumb}
            </span>
          </nav>
        </RevealNav>

        <div className="mt-8 max-w-4xl">
          <RevealOnScroll delay={0.05}>
            <div className="flex items-center gap-4">
              <span
                className="h-px w-6 bg-gold-500"
                aria-hidden="true"
              />

              <span className="font-display text-sm italic tabular-nums text-gold-700">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>

              <span className="text-[11px] font-medium uppercase tracking-widest2 text-teal-800">
                {caseStudy.eyebrow}
              </span>
            </div>
          </RevealOnScroll>

          <h1 className="mt-6 font-display text-[2.6rem] font-normal leading-[1.04] text-cream-100 sm:text-6xl lg:text-[4.25rem]">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-baseline"
              >
                <motion.span
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { y: '110%' }
                  }
                  animate={{
                    opacity: 1,
                    y: '0%',
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.25 + i * 0.07,
                    ease: easeOut,
                  }}
                  className="inline-block"
                >
                  {word}
                  {i < words.length - 1 && '\u00A0'}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.35}>
              <p className="max-w-xl text-[16px] leading-relaxed text-cream-200 sm:text-[17px]">
                {caseStudy.lead}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.45}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-900/10 pt-6">
                <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200">
                  Sector
                </span>

                <span className="font-display text-[15px] text-teal-800">
                  {caseStudy.breadcrumb}
                </span>

                {location && (
                  <>
                    <span
                      className="h-4 w-px bg-ink-900/15"
                      aria-hidden="true"
                    />

                    <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200">
                      Location
                    </span>

                    <span className="font-display text-[15px] text-cream-100">
                      {location}
                    </span>
                  </>
                )}
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {actualHeroImage ? (
              <div className="group relative">
                <div className="overflow-hidden rounded-[28px] border border-white/70 shadow-[0_50px_120px_-50px_rgba(18,59,61,0.38),0_8px_24px_-12px_rgba(18,59,61,0.15)]">
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            clipPath:
                              'inset(100% 0% 0% 0%)',
                          }
                    }
                    animate={{
                      opacity: 1,
                      clipPath:
                        'inset(0% 0% 0% 0%)',
                    }}
                    transition={{
                      duration: 1.1,
                      delay: 0.5,
                      ease: easeOut,
                    }}
                    className="aspect-[4/3] w-full sm:aspect-[16/11]"
                  >
                    <img
                      src={actualHeroImage}
                      alt={`${caseStudy.title} Climate Craft installation`}
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#063B3D]/20 via-transparent to-transparent" />
                </div>

                {location && (
                  <div className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 shadow-[0_10px_26px_-14px_rgba(6,59,61,0.4)] backdrop-blur-md">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-teal-600"
                      aria-hidden="true"
                    />

                    <span className="text-[10.5px] font-semibold uppercase tracking-widest text-cream-100">
                      {location}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[28px] border border-white/70 bg-white/40 text-center shadow-[0_50px_120px_-50px_rgba(18,59,61,0.25)] backdrop-blur-md sm:aspect-[16/11]">
                <p className="px-8 text-sm text-cream-200">
                  Case study image unavailable.
                </p>
              </div>
            )}
          </div>
        </div>

        {prefersReducedMotion ? null : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
            }}
            className="mt-14 hidden sm:flex lg:mt-16"
          >
            <motion.div
              animate={{
                y: [0, 5, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/[0.14] text-cream-100"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/**
 * Small wrapper so hero breadcrumbs fade up with framer.
 */
function RevealNav({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Mount-timed reveal for the hero stack.
 */
function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  )
}