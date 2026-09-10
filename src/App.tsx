import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AtmosphereBackground } from './components/AtmosphereBackground'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { HomePage } from './pages/HomePage'
import { routeModules, prefetchAllRoutes } from './lib/routeModules'

// Every other route is code-split — Home is the page almost every visitor
// lands on first, so it stays in the main bundle, while the rest only
// download once the user actually navigates there. Cuts the single ~900KB
// JS chunk the production build otherwise ships down to what Home needs.
//
// The import() specifiers below are the same ones registered in
// src/lib/routeModules.ts, which is used to prefetch every chunk in the
// background (idle time + link hover) so that by the time a route is
// actually navigated to, its chunk is already sitting in the module cache
// and Suspense resolves on the same tick instead of waiting on the network.
const CollectionsPage = lazy(() => routeModules['/collections']().then((m) => ({ default: (m as typeof import('./pages/CollectionsPage')).CollectionsPage })))
const ProductDetailPage = lazy(() => routeModules['/products']().then((m) => ({ default: (m as typeof import('./pages/ProductDetailPage')).ProductDetailPage })))
const FeaturesPage = lazy(() => routeModules['/features']().then((m) => ({ default: (m as typeof import('./pages/FeaturesPage')).FeaturesPage })))
const ProjectsPage = lazy(() => routeModules['/projects']().then((m) => ({ default: (m as typeof import('./pages/ProjectsPage')).ProjectsPage })))
const AboutPage = lazy(() => routeModules['/about']().then((m) => ({ default: (m as typeof import('./pages/AboutPage')).AboutPage })))
const CaseStudiesPage = lazy(() => routeModules['/case-studies']().then((m) => ({ default: (m as typeof import('./pages/CaseStudiesPage')).CaseStudiesPage })))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })))
const ContactPage = lazy(() => routeModules['/contact']().then((m) => ({ default: (m as typeof import('./pages/ContactPage')).ContactPage })))
const PrivacyPolicyPage = lazy(() => routeModules['/privacy-policy']().then((m) => ({ default: (m as typeof import('./pages/PrivacyPolicyPage')).PrivacyPolicyPage })))
const TermsAndConditionsPage = lazy(() => routeModules['/terms-and-conditions']().then((m) => ({ default: (m as typeof import('./pages/TermsAndConditionsPage')).TermsAndConditionsPage })))
const CookiePolicyPage = lazy(() => routeModules['/cookie-policy']().then((m) => ({ default: (m as typeof import('./pages/CookiePolicyPage')).CookiePolicyPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

// Minimal, brand-neutral gap-filler for the brief moment a lazy route chunk is
// still downloading — the cinematic Preloader already owns the real first-load
// reveal, so this only ever shows on a subsequent in-app navigation.
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-900/10 border-t-teal-700" />
    </div>
  )
}

function MainLayout() {
  // Warm every other route's chunk in the background once the browser is idle,
  // so a real click almost never has to wait on the network — see
  // src/lib/routeModules.ts. Runs once per full page load; never re-fires on
  // client-side navigation since MainLayout itself never remounts between routes.
  useEffect(() => {
    prefetchAllRoutes()
  }, [])

  return (
    <>
      <AtmosphereBackground />
      <Navbar />
      <div className="relative z-10">
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <FloatingWhatsApp />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  )
}

export default App
