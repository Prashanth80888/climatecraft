// Single source of truth for every code-split route's dynamic import(), shared
// between App.tsx's lazy() definitions and the idle-time/hover prefetcher below
// (see src/components/RoutePrefetch.tsx and Navbar's onPointerEnter handlers).
// Calling the same import() specifier more than once is free — Vite/the browser
// resolve it to the same cached module — so reusing these loaders to warm the
// cache ahead of a click never duplicates the actual network fetch.
export const routeModules: Record<string, () => Promise<unknown>> = {
  '/collections': () => import('../pages/CollectionsPage'),
  '/products': () => import('../pages/ProductDetailPage'),
  '/features': () => import('../pages/FeaturesPage'),
  '/projects': () => import('../pages/ProjectsPage'),
  '/case-studies': () => import('../pages/CaseStudiesPage'),
  '/about': () => import('../pages/AboutPage'),
  '/contact': () => import('../pages/ContactPage'),
  '/privacy-policy': () => import('../pages/PrivacyPolicyPage'),
  '/terms-and-conditions': () => import('../pages/TermsAndConditionsPage'),
  '/cookie-policy': () => import('../pages/CookiePolicyPage'),
}

// Case-study detail pages share the CaseStudiesPage's dynamic slug pattern —
// map any `/products/:slug` or `/case-studies/:slug` href to its shared page chunk.
export function routeModuleForPath(pathname: string): (() => Promise<unknown>) | undefined {
  if (pathname in routeModules) return routeModules[pathname]
  if (pathname.startsWith('/products/')) return routeModules['/products']
  if (pathname.startsWith('/case-studies/')) return () => import('../pages/CaseStudyDetailPage')
  return undefined
}

let prefetched = false

/** Warms every route chunk once, during browser idle time, so a later click never has to wait on the network. */
export function prefetchAllRoutes() {
  if (prefetched) return
  prefetched = true

  const run = () => {
    for (const load of Object.values(routeModules)) {
      load().catch(() => {
        // A prefetch failing (offline, blocked request) just means the
        // normal Suspense fallback handles that route's real navigation later.
      })
    }
    import('../pages/CaseStudyDetailPage').catch(() => {})
  }

  const idle = (window as typeof window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
  if (idle) {
    idle(run)
  } else {
    setTimeout(run, 1200)
  }
}
