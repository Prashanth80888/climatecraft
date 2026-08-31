import { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react'
import { brand, contact } from '../lib/assets'
import { socialLinks } from '../data/siteConfig'
import { Reveal } from './ui/Reveal'

// Legal pages are real routes, not hash links.
const FOOTER_LINKS: Record<string, { label: string; to: string }[]> = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Collections', to: '/collections' },
    { label: 'Features', to: '/features' },
    { label: 'Case Studies', to: '/case-studies' },
  ],

  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Process', to: '/#mechanics' },
    { label: 'Request a Quote', to: '/contact' },
  ],

  Support: [
    { label: 'FAQs', to: '/about#faq' },
    { label: 'Care & Warranty', to: '/#why-climate-craft' },
  ],
}

const SOCIAL = [
  {
    icon: Instagram,
    href: socialLinks.instagram,
    label: 'Instagram',
  },
  {
    icon: Facebook,
    href: socialLinks.facebook,
    label: 'Facebook',
  },
  {
    icon: Twitter,
    href: socialLinks.twitter,
    label: 'Twitter',
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  const location = useLocation()
  const navigate = useNavigate()

  const handleHashLink = useCallback(
    (to: string) => (e: React.MouseEvent) => {
      const hashIndex = to.indexOf('#')

      if (hashIndex === -1) return

      const path = to.slice(0, hashIndex) || '/'
      const hash = to.slice(hashIndex)

      e.preventDefault()

      if (location.pathname === path) {
        document.querySelector(hash)?.scrollIntoView({
          behavior: 'smooth',
        })
      } else {
        navigate(to)
      }
    },
    [location.pathname, navigate],
  )

  return (
    <footer className="group/footer relative overflow-hidden border-t border-[#0D2C2A]/80 bg-[#061816]">

      {/* ============================================================
          BACKGROUND ATMOSPHERE
          ============================================================ */}

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-[0.13] blur-[120px] transition-opacity duration-1000 group-hover/footer:opacity-[0.18]"
        style={{
          background:
            'radial-gradient(ellipse, #159FA3 0%, rgba(21,159,163,0.35) 35%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #F0A92C 0%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, #159FA3 0%, transparent 70%)',
        }}
      />

      {/* Very subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#159FA3]/40 to-transparent" />

      {/* ============================================================
          MAIN FOOTER
          KEEPING THE ORIGINAL 4-COLUMN ALIGNMENT
          ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <Reveal amount={0.2}>

          {/* IMPORTANT:
              Keep this exact 12-column structure.
              3 + 2 + 2 + 2 + 3 = 12
              This keeps CONNECT on the SAME ROW.
          */}

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8">

            {/* ======================================================
                BRAND COLUMN
                ====================================================== */}

            <div className="col-span-2 sm:col-span-4 lg:col-span-3">

              <Link
                to="/"
                className="group/brand inline-flex items-center gap-2.5"
              >
                <div className="relative">

                  <img
                    src={brand.logo}
                    alt="Climate Craft"
                    className="relative z-10 h-9 w-9 object-contain transition-all duration-500 ease-out group-hover/brand:scale-110 group-hover/brand:-rotate-3"
                  />

                  {/* Small logo glow */}
                  <span className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-[#159FA3]/30 opacity-0 blur-md transition-all duration-500 group-hover/brand:scale-125 group-hover/brand:opacity-100" />
                </div>

                <span className="font-display text-xl text-[#E5EFF1] transition-colors duration-300 group-hover/brand:text-white">
                  Climate Craft
                </span>

                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 text-[#159FA3] opacity-0 transition-all duration-300 group-hover/brand:translate-x-0 group-hover/brand:translate-y-0 group-hover/brand:opacity-100" />
              </Link>

              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#A8C5C7]/70 transition-colors duration-300 group-hover/footer:text-[#A8C5C7]/80">
                Precision-engineered motion furniture, handcrafted in Europe
                for the world's most discerning spaces.
              </p>

              {/* Social icons */}
              <div className="mt-7 flex items-center gap-3">

                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="group/social relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E5EFF1]/15 bg-white/[0.015] text-[#A8C5C7]/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#159FA3]/60 hover:bg-[#159FA3]/10 hover:text-[#159FA3] hover:shadow-[0_8px_25px_-10px_rgba(21,159,163,0.8)]"
                  >

                    {/* Hover glow */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[#159FA3]/10 opacity-0 blur-md transition-opacity duration-300 group-hover/social:opacity-100" />

                    <s.icon
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/social:scale-110"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}

              </div>
            </div>

            {/* ======================================================
                EXPLORE
                ====================================================== */}

            <div className="lg:col-span-2">

              <h4 className="relative inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5EFF1]/75">
                Explore

                <span className="absolute -bottom-3 left-0 h-px w-6 bg-[#F0A92C] transition-all duration-500 group-hover/footer:w-10" />
              </h4>

              <ul className="mt-6 flex flex-col gap-3.5">

                {FOOTER_LINKS.Explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group/link relative inline-flex items-center text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1.5 hover:text-[#E5EFF1]"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="ml-1.5 h-3 w-3 -translate-x-1 text-[#159FA3] opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/link:w-full" />
                    </Link>
                  </li>
                ))}

              </ul>
            </div>

            {/* ======================================================
                COMPANY
                ====================================================== */}

            <div className="lg:col-span-2">

              <h4 className="relative inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5EFF1]/75">
                Company

                <span className="absolute -bottom-3 left-0 h-px w-6 bg-[#F0A92C] transition-all duration-500 group-hover/footer:w-10" />
              </h4>

              <ul className="mt-6 flex flex-col gap-3.5">

                {FOOTER_LINKS.Company.map((link) => (
                  <li key={link.label}>

                    {link.to.includes('#') ? (
                      <a
                        href={link.to}
                        onClick={handleHashLink(link.to)}
                        className="group/link relative inline-flex items-center text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1.5 hover:text-[#E5EFF1]"
                      >
                        <span>{link.label}</span>

                        <ArrowUpRight className="ml-1.5 h-3 w-3 -translate-x-1 text-[#159FA3] opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />

                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/link:w-full" />
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="group/link relative inline-flex items-center text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1.5 hover:text-[#E5EFF1]"
                      >
                        <span>{link.label}</span>

                        <ArrowUpRight className="ml-1.5 h-3 w-3 -translate-x-1 text-[#159FA3] opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />

                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/link:w-full" />
                      </Link>
                    )}

                  </li>
                ))}

              </ul>
            </div>

            {/* ======================================================
                SUPPORT
                ====================================================== */}

            <div className="lg:col-span-2">

              <h4 className="relative inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5EFF1]/75">
                Support

                <span className="absolute -bottom-3 left-0 h-px w-6 bg-[#F0A92C] transition-all duration-500 group-hover/footer:w-10" />
              </h4>

              <ul className="mt-6 flex flex-col gap-3.5">

                {FOOTER_LINKS.Support.map((link) => (
                  <li key={link.label}>

                    <a
                      href={link.to}
                      onClick={
                        link.to.includes('#')
                          ? handleHashLink(link.to)
                          : undefined
                      }
                      className="group/link relative inline-flex items-center text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1.5 hover:text-[#E5EFF1]"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="ml-1.5 h-3 w-3 -translate-x-1 text-[#159FA3] opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/link:w-full" />
                    </a>

                  </li>
                ))}

              </ul>
            </div>

            {/* ======================================================
                CONNECT
                IMPORTANT: SAME ROW / FAR RIGHT
                ====================================================== */}

            <div className="lg:col-span-3">

              <h4 className="relative inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5EFF1]/75">
                Connect

                <span className="absolute -bottom-3 left-0 h-px w-6 bg-[#F0A92C] transition-all duration-500 group-hover/footer:w-10" />
              </h4>

              <ul className="mt-6 flex flex-col gap-4">

                {/* Phone */}
                <li>
                  <a
                    href={`tel:+${contact.phoneHref}`}
                    className="group/contact flex items-center gap-3 text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1 hover:text-[#E5EFF1]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5EFF1]/10 bg-white/[0.02] transition-all duration-300 group-hover/contact:border-[#159FA3]/50 group-hover/contact:bg-[#159FA3]/10 group-hover/contact:text-[#159FA3] group-hover/contact:shadow-[0_0_20px_-8px_rgba(21,159,163,0.9)]">
                      <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover/contact:scale-110" />
                    </span>

                    <span className="relative">
                      {contact.phoneDisplay}

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/contact:w-full" />
                    </span>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group/contact flex items-center gap-3 text-[13px] text-[#A8C5C7]/70 transition-all duration-300 hover:translate-x-1 hover:text-[#E5EFF1]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5EFF1]/10 bg-white/[0.02] transition-all duration-300 group-hover/contact:border-[#159FA3]/50 group-hover/contact:bg-[#159FA3]/10 group-hover/contact:text-[#159FA3] group-hover/contact:shadow-[0_0_20px_-8px_rgba(21,159,163,0.9)]">
                      <Mail className="h-3.5 w-3.5 transition-transform duration-300 group-hover/contact:scale-110" />
                    </span>

                    <span className="relative break-all">
                      {contact.email}

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/contact:w-full" />
                    </span>
                  </a>
                </li>

                {/* Address */}
                <li>
                  <div className="relative border-l border-[#159FA3]/30 pl-4 text-[13px] leading-relaxed text-[#A8C5C7]/65 transition-colors duration-300 hover:border-[#159FA3]/70 hover:text-[#A8C5C7]/85">
                    {contact.address}
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </Reveal>

        {/* ============================================================
            BOTTOM BAR
            ============================================================ */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E5EFF1]/[0.08] pt-7 sm:mt-16 sm:flex-row">

          <p className="text-[12px] text-[#A8C5C7]/55 transition-colors duration-300 hover:text-[#A8C5C7]/80">
            © 2009–{year} Climate Craft. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[#A8C5C7]/55">

            <Link
              to="/privacy-policy"
              className="group/legal relative transition-all duration-300 hover:text-[#E5EFF1]"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/legal:w-full" />
            </Link>

            <Link
              to="/terms-and-conditions"
              className="group/legal relative transition-all duration-300 hover:text-[#E5EFF1]"
            >
              Terms &amp; Conditions
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/legal:w-full" />
            </Link>

            <Link
              to="/cookie-policy"
              className="group/legal relative transition-all duration-300 hover:text-[#E5EFF1]"
            >
              Cookie Policy
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#159FA3] transition-all duration-300 group-hover/legal:w-full" />
            </Link>

          </div>
        </div>

      </div>
    </footer>
  )
}