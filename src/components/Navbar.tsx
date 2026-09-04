import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { MoreVertical, X, ArrowUpRight } from 'lucide-react'
import { brand } from '../lib/assets'

// Matches the `lg:` breakpoint already used below to split the desktop nav from the
// mobile burger/drawer — scroll-direction hiding is a mobile/tablet-only behavior,
// the desktop bar always stays put.
const MOBILE_NAV_QUERY = '(max-width: 1023px)'

function useIsMobileNav() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_NAV_QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_NAV_QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

// Active state is driven purely by the current route (useLocation), never by
// scroll position, so scrolling through Home's sections can never make the
// navbar think the user is on "Collections" or "Case Studies", etc.
//
// Desktop shows all six as one flat list. Mobile/tablet splits them: Home,
// Collections and Features are frequent enough to stay directly on the bar;
// Projects, Case Studies and About Us move into the "More" (⋮) menu next to
// Request Quote, so the primary bar never has to fit more than three labels
// beside the logo and the More button on a small phone.
const PRIMARY_NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Features', to: '/features' },
]

const MORE_NAV_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About Us', to: '/about' },
]

const NAV_LINKS = [...PRIMARY_NAV_LINKS, ...MORE_NAV_LINKS]

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MotionLink = motion(Link)

// Below this scroll offset the bar is always shown, regardless of direction.
const REVEAL_ZONE = 80
// Ignore scroll deltas smaller than this so tiny/inertial movements can't flicker the bar.
const DIRECTION_THRESHOLD = 10

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const isMobileNav = useIsMobileNav()
  const lastScrollYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)

    // Desktop bar never hides on scroll; only mobile/tablet gets the hide-on-scroll-down
    // behavior. The open More menu must also never be yanked away by a scroll event.
    if (!isMobileNav || moreOpen) {
      lastScrollYRef.current = latest
      setHidden(false)
      return
    }

    if (latest < REVEAL_ZONE) {
      lastScrollYRef.current = latest
      setHidden(false)
      return
    }

    const delta = latest - lastScrollYRef.current
    if (Math.abs(delta) < DIRECTION_THRESHOLD) return

    lastScrollYRef.current = latest
    setHidden(delta > 0)
  })

  // Opening the More menu must reveal the bar immediately — never open into a
  // navbar that's mid-hide from the scroll that triggered the tap.
  useEffect(() => {
    if (moreOpen) setHidden(false)
  }, [moreOpen])

  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [moreOpen])

  // Escape closes the More menu, matching the click-outside backdrop below.
  useEffect(() => {
    if (!moreOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [moreOpen])

  // Close the More menu on every route change (including same-page hash jumps).
  useEffect(() => {
    setMoreOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? '-130%' : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: hidden ? 0.4 : 0.5, ease: easeOut }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:px-6 sm:pt-[calc(env(safe-area-inset-top,0px)+1.5rem)]"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-7 sm:py-3.5 ${
            scrolled
              ? 'border-white/85 bg-white/85 shadow-[0_24px_60px_-24px_rgba(6,61,60,0.22),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[24px] saturate-[145%]'
              : 'border-white/75 bg-white/75 shadow-[0_12px_40px_-20px_rgba(6,61,60,0.16),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-[22px] saturate-[135%]'
          }`}
        >
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <img
              src={brand.logo}
              alt="Climate Craft"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="hidden font-display text-[16px] tracking-[0.01em] text-ink-900 lg:inline lg:text-xl">
              Climate Craft
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative rounded-full px-4 py-2.5 text-[12px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                  location.pathname === link.to ? 'text-teal-800' : 'text-ink-700 hover:text-ink-900'
                }`}
              >
                {location.pathname === link.to && (
                  <span className="absolute inset-0 rounded-full border border-white/75 bg-white/65 shadow-[0_8px_22px_-12px_rgba(18,59,61,0.22),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-sm" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile/tablet primary nav — Home, Collections, Features stay directly
              reachable on the bar itself; everything else lives in the More menu.
              Sized tight at the base so all three plus the logo and More button
              still fit on a 320px-wide phone without wrapping or overflow, then
              relax at `sm:` where there's room to breathe. */}
          <nav className="flex min-w-0 items-center gap-0 lg:hidden">
            {PRIMARY_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`whitespace-nowrap rounded-full px-1.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-tight transition-colors duration-300 sm:px-2.5 sm:py-2 sm:text-[11.5px] sm:tracking-wide ${
                  location.pathname === link.to ? 'text-teal-800' : 'text-ink-700 hover:text-ink-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_26px_-10px_rgba(22,155,154,0.6)] transition-all duration-300 hover:bg-teal-800 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(22,155,154,0.7)] active:scale-[0.97]"
            >
              Request Quote
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={moreOpen}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/12 bg-white/45 text-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md transition-all duration-300 hover:border-teal-700/35 hover:bg-white/70 hover:text-teal-800 lg:hidden"
            aria-label={moreOpen ? 'Close menu' : 'More navigation'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={moreOpen ? 'close' : 'more'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex items-center justify-center"
              >
                {moreOpen ? <X className="h-4 w-4" /> : <MoreVertical className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="absolute right-3 top-full mt-2 w-56 overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-3 shadow-[0_40px_100px_-20px_rgba(18,59,61,0.4)] sm:right-6 lg:hidden"
              role="menu"
            >
              <nav className="flex flex-col">
                {MORE_NAV_LINKS.map((link, i) => (
                  <MotionLink
                    key={link.label}
                    to={link.to}
                    role="menuitem"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`border-b border-ink-900/[0.08] px-3 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 last:border-b-0 hover:text-teal-800 ${
                      location.pathname === link.to ? 'text-teal-800' : 'text-ink-800'
                    }`}
                  >
                    {link.label}
                  </MotionLink>
                ))}
                <Link
                  to="/contact"
                  role="menuitem"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-teal-700 px-5 py-3 text-[12px] font-semibold uppercase tracking-widest text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_26px_-10px_rgba(22,155,154,0.55)] transition-colors duration-300 hover:bg-teal-800"
                >
                  Request Quote
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {moreOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 cursor-default bg-ink-900/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
