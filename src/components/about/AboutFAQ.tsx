import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle, Mail } from 'lucide-react'
import { contact } from '../../lib/assets'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const FAQS = [
  {
    q: 'Do you offer white-label and OEM production?',
    a: 'Yes. We work with manufacturers on white-labelled ranges built to their specification, in addition to our own collection.',
  },
  {
    q: 'What are your lead times?',
    a: "Every piece is engineered to order, so lead time depends on the specification. Get in touch and we'll confirm a timeline for your exact configuration.",
  },
  {
    q: 'Can we specify our own fabric?',
    a: 'Yes — every piece is upholstered from our curated, digitised fabric archive, so partners can specify with confidence before anything is cut.',
  },
  {
    q: 'How are the motorized mechanisms warrantied?',
    a: 'Motorized Climate Craft pieces carry a 2-year warranty, consistent across the collection.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — pieces are handcrafted in Europe and shipped worldwide. Reach us directly to confirm delivery to your location.',
  },
]

export function AboutFAQ() {
  // Tracks active open accordion index; null means all are closed
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="relative bg-transparent py-16 sm:py-20 lg:py-28">
      <SectionAtmosphere variant="glow" />

      {/* Background Glow Overlay */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-[0.25] blur-[130px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-gold-600" />
            <SectionLabel>Frequently Asked</SectionLabel>
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[#063B3D] sm:text-4xl">
            Everything you need to know.
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 space-y-4">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <RevealItem key={item.q}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                      ? 'border-[#169B9A]/60 bg-white/90 shadow-[0_20px_40px_-15px_rgba(6,59,61,0.15)] backdrop-blur-xl'
                      : 'border-white/60 bg-white/60 shadow-xs backdrop-blur-md hover:border-[#063B3D]/30 hover:bg-white/80'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left outline-none sm:p-7"
                  >
                    <span className="font-display text-lg font-medium text-[#063B3D] sm:text-xl">
                      {item.q}
                    </span>
                    <div
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                          ? 'border-[#063B3D] bg-[#063B3D] text-white'
                          : 'border-[#063B3D]/15 bg-white/80 text-[#063B3D]'
                        }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="border-t border-[#063B3D]/10 px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                          <p className="max-w-2xl text-[15px] font-normal leading-relaxed text-ink-700">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* Interactive Support Footer */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-2xs backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15">
              <Mail className="h-5 w-5 text-gold-700" />
            </div>
            <p className="text-sm font-medium text-[#063B3D]">
              Still have questions? Reach out to us directly at{' '}
              <a
                href={`mailto:${contact.email}`}
                className="font-bold text-gold-700 underline underline-offset-4 transition-colors hover:text-[#063B3D]"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}