import { Route, Routes, useRoutes } from 'react-router-dom'
import { AtmosphereBackground } from './components/AtmosphereBackground'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage'
import { CookiePolicyPage } from './pages/CookiePolicyPage'
import { NotFoundPage } from './pages/NotFoundPage'

function MainLayout() {
  return (
    <>
      <AtmosphereBackground />
      <Navbar />
      <div className="relative z-10">
        <ScrollToTop />
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
        </Routes>
      </div>
    </>
  )
}

function NotFoundLayout() {
  return <NotFoundPage />
}

function App() {
  const routes = useRoutes([
    { path: '/', element: <MainLayout /> },
    { path: '*', element: <NotFoundLayout /> },
  ])

  return routes
}

export default App
