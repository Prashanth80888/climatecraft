import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AtmosphereBackground } from './components/AtmosphereBackground'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { HomePage } from './pages/HomePage'

// Every other route is code-split — Home is the page almost every visitor
// lands on first, so it stays in the main bundle, while the rest only
// download once the user actually navigates there. Cuts the single ~900KB
// JS chunk the production build otherwise ships down to what Home needs.
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage })))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then((m) => ({ default: m.FeaturesPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then((m) => ({ default: m.CaseStudiesPage })))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })))
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage').then((m) => ({ default: m.TermsAndConditionsPage })))
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then((m) => ({ default: m.CookiePolicyPage })))
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
