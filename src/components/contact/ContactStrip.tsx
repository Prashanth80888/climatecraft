import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, whatsappHref } from '../../lib/assets'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

interface ContactItem {
  id: string
  icon: typeof Phone
  label: string
  value: string
  href?: string
  external?: boolean
  actionLabel: string
  copyableText?: string
}

const ITEMS: ContactItem[] = [
  {
    id: 'phone',
    icon: Phone,
    label: 'Direct Line',
    value: contact.phoneDisplay,
    href: `tel:+${contact.phoneHref}`,
    actionLabel: 'Call Now',
    copyableText: contact.phoneDisplay,
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Inquiries',
    value: contact.email,
    href: `mailto:${contact.email}`,
    actionLabel: 'Send Mail',
    copyableText: contact.email,
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'Instant Chat',
    value: 'WhatsApp Business',
    href: whatsappHref("Hi Climate Craft, I'd like to talk about a project."),
    external: true,
    actionLabel: 'Open Chat',
  },
  {
    id: 'studio',
    icon: MapPin,
    label: 'Our Studio',
    value: contact.address,
    href: undefined,
    actionLabel: 'By Appointment',
    copyableText: contact.address,
  },
]

export function ContactStrip() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (e: React.MouseEvent, id: string, text?: string) => {
    if (!text) return
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section className="relative overflow-hidden border-y border-[#063B3D]/10 bg-[#063B3D]/[0.02] py-14 backdrop-blur-xl sm:py-20">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_transparent_70%))]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[#063B3D]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal amount={0.2}>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ITEMS.map((item) => {
              const Icon = item.icon
              const isCopied = copiedId === item.id

              return (
                <RevealItem key={item.id} className="h-full">
                  <div className="group relative h-full">
                    {/* Animated Golden Hover Border Outline */}
                    <div className="absolute -inset-[1px] rounded-[22px] bg-gradient-to-r from-gold-400/0 via-gold-400/40 to-gold-400/0 opacity-0 blur-[1px] transition-all duration-700 group-hover:opacity-100" />

                    {/* Main Card Element */}
                    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-[#063B3D]/10 bg-white/70 p-6 shadow-[0_4px_20px_-4px_rgba(6,59,61,0.05)] backdrop-blur-md transition-all duration-500 hover:border-gold-400/30 hover:bg-white/95 hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.15)]">

                      {/* Top Action Row */}
                      <div className="flex items-center justify-between">
                        {/* Icon Badge */}
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#063B3D]/10 bg-[#063B3D]/5 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-gold-400/40 group-hover:bg-gold-400/15">
                          <Icon
                            className="h-5.5 w-5.5 text-[#063B3D] transition-colors duration-500 group-hover:text-gold-700"
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Interactive Action Indicators */}
                        <div className="flex items-center gap-1.5">
                          {item.copyableText && (
                            <button
                              type="button"
                              onClick={(e) => handleCopy(e, item.id, item.copyableText)}
                              aria-label={`Copy ${item.label}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/5 text-cream-200 transition-all duration-300 hover:bg-gold-400/20 hover:text-gold-700 active:scale-90"
                            >
                              {isCopied ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          )}

                          {item.href && (
                            <a
                              href={item.href}
                              target={item.external ? '_blank' : undefined}
                              rel={item.external ? 'noreferrer' : undefined}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/5 text-cream-200 transition-all duration-300 group-hover:bg-[#063B3D] group-hover:text-white"
                            >
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="mt-8 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream-200 transition-colors duration-300 group-hover:text-gold-700">
                            {item.label}
                          </span>
                          <span className="text-[10px] font-medium tracking-wide text-[#063B3D]/60">
                            {isCopied ? 'Copied!' : item.actionLabel}
                          </span>
                        </div>

                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer' : undefined}
                            className="block font-display text-[15px] font-semibold text-[#063B3D] transition-colors duration-300 hover:underline hover:decoration-gold-400 hover:underline-offset-4 group-hover:text-ink-950"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-display text-[15px] font-semibold text-[#063B3D]">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  )
}