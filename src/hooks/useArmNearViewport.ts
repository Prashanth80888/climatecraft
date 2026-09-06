import { useEffect, useRef, useState } from 'react'

/**
 * Native `loading="lazy"` has no way to tune how far ahead of the viewport it
 * starts fetching, so image grids can still pop in blank on a fast scroll.
 * This "arms" a section — flips to `true` once — the moment it's within
 * `rootMargin` of the viewport, well before the user actually reaches it, so
 * callers can switch their images' `loading` from `"lazy"` to `"eager"` at
 * that point instead. Pairs with small (WebP-derivative-sized) images only —
 * never fetchPriority, since this shouldn't compete with real LCP resources.
 */
export function useArmNearViewport<T extends HTMLElement>(rootMargin = '1200px') {
  const ref = useRef<T>(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || armed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          observer.disconnect()
        }
      },
      { rootMargin: `0px 0px ${rootMargin} 0px`, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed])

  return { ref, armed }
}
