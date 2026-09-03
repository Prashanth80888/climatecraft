import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WHATSAPP_NUMBER = '917619343762'
const WHATSAPP_MESSAGE =
  'Hello Climate Craft, I would like to know more about your products.'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

const whatsappEasing: [number, number, number, number] = [0.16, 1, 0.3, 1]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.04 4C9.44 4 4.08 9.36 4.08 15.96c0 2.1.55 4.16 1.6 5.97L4 28l6.2-1.62a11.9 11.9 0 0 0 5.83 1.49h.01c6.6 0 11.96-5.36 11.96-11.96S22.64 4 16.04 4zm0 21.72h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.68.96.98-3.6-.24-.37a9.9 9.9 0 0 1-1.52-5.29c0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.15 1.03 7.03 2.91a9.86 9.86 0 0 1 2.91 7.03c0 5.48-4.46 9.9-9.99 9.9zm5.46-7.42c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.07c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z" />
    </svg>
  )
}

export function FloatingWhatsApp() {
  const [labelVisible, setLabelVisible] = useState(false)

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-6 z-[80] flex items-center sm:right-8 md:right-10">
      <AnimatePresence>
        {labelVisible && (
          <motion.button
            type="button"
            onClick={openWhatsApp}
            initial={{ opacity: 0, x: 12, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.94 }}
            transition={{ duration: 0.28, ease: whatsappEasing }}
            className="glass mr-3 hidden cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-ink-800 hover:text-teal-800 sm:inline-flex"
          >
            <span className="text-teal-700">
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </span>
            Chat on WhatsApp
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={openWhatsApp}
        aria-label="Chat with Climate Craft on WhatsApp"
        onMouseEnter={() => setLabelVisible(true)}
        onMouseLeave={() => setLabelVisible(false)}
        onFocus={() => setLabelVisible(true)}
        onBlur={() => setLabelVisible(false)}
        className="group relative flex h-[84px] w-[84px] items-center justify-center rounded-full text-white shadow-[0_18px_44px_-14px_rgba(22,155,154,0.55)] transition-transform duration-300 ease-out hover:scale-105 active:scale-95 sm:h-[84px] sm:w-[84px] md:h-[84px] md:w-[84px]"
        style={{ backgroundColor: '#25D366' }}
      >
        <span className="relative z-10 flex items-center justify-center">
          <WhatsAppIcon className="h-[42px] w-[42px] sm:h-[42px] sm:w-[42px] md:h-[42px] md:w-[42px]" />
        </span>
      </button>
    </div>
  )
}