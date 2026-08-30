import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { CaseStudyFaq } from '../../../data/caseStudyDetail'
import { SectionLabel } from '../../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FAQRow({
  item,
  index,
  openQuestion,
  setOpenQuestion,
}: {
  item: CaseStudyFaq
  index: number
  openQuestion: number | null
  setOpenQuestion: (value: number | null) => void
}) {
  const isOpen = openQuestion === index
  const panelId = `csd-faq-panel-${index}`
  const buttonId = `csd-faq-button-${index}`
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      layout={!prefersReducedMotion}
      transition={{ duration: 0.25, ease: easeOut }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-teal-600/40 bg-white/85 shadow-[0_18px_40px_-20px_rgba(6,59,61,0.22)] backdrop-blur-xl'
          : 'border-white/60 bg-white/50 shadow-[0_8px_25px_-18px_rgba(6,59,61,0.16)] backdrop-blur-md hover:border-teal-600/25 hover:bg-white/70'
      }`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpenQuestion(isOpen ? null : index)}
        className="flex w-full items-center justify-between gap-5 p-5 text-left outline-none sm:p-6"
      >
        <span className="font-display text-[16px] font-medium leading-snug text-cream-100 sm:text-[17.5px]">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-teal-800 bg-teal-800 text-white shadow-[0_5px_15px_-8px_rgba(6,59,61,0.5)]'
              : 'border-ink-900/15 bg-white/80 text-cream-100'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease: easeOut } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: easeOut } }}
          >
            <div className="border-t border-ink-900/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p className="max-w-[62ch] text-[14px] leading-[1.75] text-ink-700 sm:text-[15px]">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function CaseStudyFAQ({ faqs }: { faqs: CaseStudyFaq[] }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  if (faqs.length === 0) return null

  return (
    <section aria-labelledby="csd-faq-title" className="relative">
      <Reveal>
        <SectionLabel>Frequently Asked Questions</SectionLabel>
        <h2 id="csd-faq-title" className="mt-4 font-display text-2xl font-normal leading-[1.15] text-cream-100 sm:text-3xl">
          Questions about this case study.
        </h2>
      </Reveal>

      <RevealGroup className="mt-8 space-y-3.5" stagger={0.08}>
        {faqs.map((item, i) => (
          <RevealItem key={item.q}>
            <FAQRow item={item} index={i} openQuestion={openQuestion} setOpenQuestion={setOpenQuestion} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}