import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { contact, whatsappHref } from '../lib/assets'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="group relative isolate overflow-hidden bg-[#083F40]"
    >
      {/* Main premium gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,#159F9D_0%,#0D7776_42%,#073E40_100%)]" />

      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-30 blur-[110px] transition-all duration-1000 group-hover:opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(240,169,44,0.65) 0%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-25 blur-[100px] transition-all duration-1000 group-hover:scale-125 group-hover:opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(94,220,214,0.75) 0%, transparent 70%)',
        }}
      />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-[2000ms] group-hover:scale-110" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F0C76A]/10 transition-transform duration-[1600ms] group-hover:scale-110" />

      {/* Grain */}
      <div className="grain-overlay opacity-20" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel>
              <span className="text-[#F3C96B]">Let's Talk</span>
            </SectionLabel>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] text-white sm:text-4xl lg:text-[3rem]">
            Let's configure your{' '}
            <span className="relative inline-block italic text-[#F3C96B]">
              next piece.
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#F3C96B] transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/85 sm:text-base">
            Every Climate Craft piece is engineered to order and quoted for
            your space — never sold off a shelf.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {/* Request Quote */}
            <Link
              to="/contact"
              className="group/quote relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#07585A] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3C96B] hover:text-[#063E40] hover:shadow-[0_15px_40px_rgba(240,201,107,0.28)] active:translate-y-0"
            >
              <span className="relative z-10">Request a Quote</span>

              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/quote:translate-x-1.5" />

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/quote:translate-x-full" />
            </Link>

            {/* WhatsApp */}
            <a
              href={whatsappHref(
                "Hi Climate Craft, I'd like to talk about a bespoke piece."
              )}
              target="_blank"
              rel="noreferrer"
              className="group/whatsapp relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/45 bg-white/10 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#F3C96B] hover:bg-white/15 hover:text-[#F3C96B] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] active:translate-y-0"
            >
              <span className="relative z-10">Message on WhatsApp</span>

              <MessageCircle className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/whatsapp:rotate-12 group-hover/whatsapp:scale-110" />

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/whatsapp:translate-x-full" />
            </a>
          </div>
        </Reveal>

        {/* Contact details */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/65 sm:flex-row sm:gap-3">
            <span className="transition-colors duration-300 hover:text-[#F3C96B]">
              {contact.phoneDisplay}
            </span>

            <span className="hidden text-white/30 sm:inline">·</span>

            <span className="transition-colors duration-300 hover:text-[#F3C96B]">
              {contact.email}
            </span>
          </div>
        </Reveal>

        {/* Small decorative indicator */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 opacity-40">
          <Sparkles className="h-4 w-4 animate-pulse text-[#F3C96B]" />
        </div>
      </div>
    </section>
  )
}