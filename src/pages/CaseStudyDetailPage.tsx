import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CASE_STUDY_DETAILS,
  getCaseStudyDetailBySlug,
} from '../data/caseStudyDetail'
import { CaseStudyDetailHero } from '../components/case-studies/detail/CaseStudyDetailHero'
import { CaseStudyStory } from '../components/case-studies/detail/CaseStudyStory'
import { CaseStudySpecs } from '../components/case-studies/detail/CaseStudySpecs'
import { CaseStudyFAQ } from '../components/case-studies/detail/CaseStudyFAQ'
import { CaseStudySidebar } from '../components/case-studies/detail/CaseStudySidebar'
import { CaseStudyRelatedStudies } from '../components/case-studies/detail/CaseStudyRelatedStudies'
import { CaseStudyDetailCTA } from '../components/case-studies/detail/CaseStudyDetailCTA'
import { Footer } from '../components/Footer'
import { SectionAtmosphere } from '../components/ui/SectionAtmosphere'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ComingSoon } from './ComingSoon'

function getRelatedDetails(slug: string) {
  const index = CASE_STUDY_DETAILS.findIndex((cs) => cs.slug === slug)
  const count = CASE_STUDY_DETAILS.length
  if (index === -1) return []
  return [
    CASE_STUDY_DETAILS[(index + 1) % count],
    CASE_STUDY_DETAILS[(index + 2) % count],
  ]
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const detail = getCaseStudyDetailBySlug(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  useDocumentMeta(
    detail?.metaTitle ?? 'Case Study — Climate Craft',
    detail?.metaDescription ?? 'A Climate Craft case study.',
  )

  if (!detail) {
    return <ComingSoon title="Case Study" />
  }

  const index = CASE_STUDY_DETAILS.findIndex((cs) => cs.slug === detail.slug)
  const location = detail.sidebarStats.find((stat) => stat.label === 'Location')?.value
  const related = getRelatedDetails(detail.slug)

  return (
    <>
      <main className="case-study-detail">
        <CaseStudyDetailHero caseStudy={detail} index={index} location={location} />

        <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
          <SectionAtmosphere variant="radial" />
          <div
            className="pointer-events-none absolute right-0 top-32 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-[130px]"
            style={{ background: 'radial-gradient(circle, #c9a84e 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
            <div className="csd-column flex flex-col gap-16 lg:col-span-8 xl:col-span-7 lg:gap-20">
              <CaseStudyStory sections={detail.articleSections} />
              <CaseStudySpecs caseStudy={detail} />
              <CaseStudyFAQ faqs={detail.faqs} />
            </div>

            <aside className="csd-column lg:col-span-4 xl:col-span-4 lg:col-start-9">
              <CaseStudySidebar caseStudy={detail} />
            </aside>
          </div>
        </section>

        <CaseStudyRelatedStudies caseStudies={related} />
        <CaseStudyDetailCTA cta={detail.cta} />
      </main>
      <Footer />
    </>
  )
}