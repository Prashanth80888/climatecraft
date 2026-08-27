import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { brand } from '../lib/assets'

// Only "/" (Home) is an implemented page right now. The rest are real routes —
// ready for their own pages later — but today they render a minimal placeholder.
// Active state is driven purely by the current route (useLocation), never by
// scroll position, so scrolling through Home's sections can never make the
// navbar think the user is on "Collections" or "Case Studies", etc.
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Features', to: '/features' },
  { label: 'Projects', to: '/projects' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About Us', to: '/about' },
]

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MotionLink = motion(Link)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [open])

  // Close the mobile drawer on every route change (including same-page hash jumps).
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6"
      >
          <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 sm:px-7 sm:py-3.5 ${
            scrolled
              ? 'border-white/75 bg-white/72 shadow-[0_24px_60px_-24px_rgba(6,61,60,0.22),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[24px] saturate-[145%]'
              : 'border-white/60 bg-white/50 shadow-[0_12px_40px_-20px_rgba(6,61,60,0.16),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-[22px] saturate-[135%]'
          }`}
        >
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <img
              src={brand.logo}
              alt="Climate Craft"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="font-display text-[18px] tracking-[0.01em] text-ink-900 sm:text-xl">
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
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/12 bg-white/45 text-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md transition-all duration-300 hover:border-teal-700/35 hover:bg-white/70 hover:text-teal-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex items-center justify-center"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/65 bg-white/82 p-3 shadow-[0_36px_80px_-28px_rgba(18,59,61,0.28),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <MotionLink
                    key={link.label}
                    to={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={`border-b border-ink-900/[0.08] px-4 py-3.5 text-sm uppercase tracking-widest transition-colors duration-300 last:border-b-0 hover:text-teal-800 ${
                      location.pathname === link.to ? 'text-teal-800' : 'text-ink-700'
                    }`}
                  >
                    {link.label}
                  </MotionLink>
                ))}
                <Link
                  to="/contact"
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
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
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
