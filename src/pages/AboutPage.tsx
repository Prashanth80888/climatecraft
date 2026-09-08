import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutHero } from '../components/about/AboutHero'
import { BrandStatement } from '../components/about/BrandStatement'
import { AboutStats } from '../components/about/AboutStats'
import { OriginSection } from '../components/about/OriginSection'
import { FabricArchive } from '../components/about/FabricArchive'
import { VisionMission } from '../components/about/VisionMission'
import { AboutProcess } from '../components/about/AboutProcess'
import { TechnologyLayer } from '../components/about/TechnologyLayer'
import { VisionStatement } from '../components/about/VisionStatement'
import { BrandPrinciples } from '../components/about/BrandPrinciples'
import { WhyClimateCraft } from '../components/about/WhyClimateCraft'
import { PartnerQuote } from '../components/about/PartnerQuote'
import { RecentWork } from '../components/about/RecentWork'
import { AboutCTA } from '../components/about/AboutCTA'
import { AboutFAQ } from '../components/about/AboutFAQ'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function AboutPage() {
  const location = useLocation()

  useDocumentMeta(
    'About ClimateCraft | Rethinking What Comfort Can Be',
    'ClimateCraft combines premium furniture, temperature-control technology and intelligent controls into one experience — starting with temperature-controlled recliners.',
  )

  useEffect(() => {
    if (!location.hash) return
    const id = requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [location.hash])
  return (
    <>
      <main className="overflow-x-hidden">
        <AboutHero />
        <BrandStatement />
        <AboutStats />
        <OriginSection />
        <FabricArchive />
        <VisionMission />
        <AboutProcess />
        <TechnologyLayer />
        <VisionStatement />
        <BrandPrinciples />
        <WhyClimateCraft />
        <PartnerQuote />
        <RecentWork />
        <AboutCTA />
        <AboutFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
