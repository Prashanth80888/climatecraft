import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Mechanics } from '../components/Mechanics'
import { Collections } from '../components/Collections'
import { WhyClimateCraft } from '../components/WhyClimateCraft'
import { Statistics } from '../components/Statistics'
import { Testimonials } from '../components/Testimonials'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function HomePage() {
  const location = useLocation()

  useDocumentMeta(
    'ClimateCraft | Advanced Climate-Controlled Comfort',
    'Experience personalized comfort with ClimateCraft. Advanced cooling and heating, voice and remote control, motorized recliner, and premium upholstery in one premium comfort experience.',
    {
      ogDescription:
        'Cooling, heating and intelligent comfort control designed into a premium reclining experience.',
    },
  )

  // Supports deep links like "/#final-cta" (e.g. Request Quote navigating in from
  // a future placeholder page) by scrolling to the target section once the Home
  // page itself has mounted and laid out.
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
        <Hero />
        <Collections />
        <Mechanics />
        <WhyClimateCraft />
        <Statistics />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
