import { useEffect } from 'react'
import { ProjectsHero } from '../components/projects/ProjectsHero'
import { ProjectCaseStudy } from '../components/projects/ProjectCaseStudy'
import { TechnologyShowcase } from '../components/projects/TechnologyShowcase'
import { ProjectProcess } from '../components/projects/ProjectProcess'
import { WhyDifferent } from '../components/projects/WhyDifferent'
import { ApplicationsSection } from '../components/projects/ApplicationsSection'
import { ProjectsCTA } from '../components/projects/ProjectsCTA'
import { Footer } from '../components/Footer'
import { PROJECT_CASE_STUDIES } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function ProjectsPage() {
  useDocumentMeta(
    'Projects & Case Studies — Climate Craft',
    'Explore Climate Craft projects where premium seating, liquid-based climate control, smart reclining and intelligent controls are engineered around real spaces and real comfort requirements.'
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <main>
        <ProjectsHero />
        <section id="case-studies" className="relative">
          {PROJECT_CASE_STUDIES.map((project, index) => (
            <ProjectCaseStudy key={project.id} project={project} index={index} />
          ))}
        </section>
        <TechnologyShowcase />
        <ProjectProcess />
        <WhyDifferent />
        <ApplicationsSection />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  )
}