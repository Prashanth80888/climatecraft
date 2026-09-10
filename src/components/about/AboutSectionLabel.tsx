import type { ReactNode } from 'react'

interface AboutSectionLabelProps {
  children: ReactNode
  /**
   * Use light-on-dark colors for a label sitting on a dark panel (e.g. the
   * closing CTA's teal card). Defaults to the standard light-canvas colors.
   */
  tone?: 'light' | 'dark'
  /**
   * 'lg' is a one-off emphasis variant for the About Us hero's "About
   * ClimateCraft" label only — larger and bolder so it reads immediately,
   * while staying a compact label rather than competing with the hero's
   * main heading. Every other About Us section keeps the 'default' size.
   */
  size?: 'default' | 'lg'
}

/**
 * About Us page-only section-opening label: a short gold line, a shorter
 * teal line, then small uppercase tracked text. This is the exact treatment
 * that already existed ad hoc in BrandStatement's "Why ClimateCraft Exists"
 * label — centralized here so every major About Us section opens the same
 * way. Scoped to the About page on purpose: the site-wide `SectionLabel`
 * (Home, Product Detail, Legal pages) is untouched so this change can't
 * ripple into unrelated pages.
 */
export function AboutSectionLabel({ children, tone = 'light', size = 'default' }: AboutSectionLabelProps) {
  const goldLine = tone === 'dark' ? 'bg-gold-400' : 'bg-[#b18a2d]'
  const tealLine = tone === 'dark' ? 'bg-teal-300' : 'bg-[#1aa8a8]'
  const text = tone === 'dark' ? 'text-gold-400' : 'text-[#245d63]'
  const isLg = size === 'lg'

  return (
    <span className="inline-flex items-center gap-3">
      <span className={`${isLg ? 'h-[1.5px] w-12' : 'h-px w-11'} shrink-0 ${goldLine}`} />
      <span className={`${isLg ? 'h-[1.5px] w-6' : 'h-px w-6'} shrink-0 ${tealLine}`} />
      <span
        className={`uppercase ${text} ${
          isLg
            ? 'ml-1.5 text-[13px] font-extrabold tracking-[0.2em] sm:text-[15px]'
            : 'ml-1 text-[10.5px] font-bold tracking-[0.22em] sm:text-[12px]'
        }`}
      >
        {children}
      </span>
    </span>
  )
}
