
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Pencil,
  Sparkles,
  User,
  Mail,
  Building2,
  Phone
} from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES, getProductBySlug } from '../../data/homeProducts'
import { whatsappHref } from '../../lib/assets'
import { Select, type SelectGroup } from './Select'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT_TYPES = [
  'Residential',
  'Hospitality',
  'Healthcare / Clinic',
  'Office / Corporate',
  'Gallery / Retail',
  'Trade / Wholesale',
  'White-label / OEM',
  'Other',
]

const QUANTITY_OPTIONS = ['1', '2–5', '6–10', '11–25', '26–50', '50+', 'Not sure yet']

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  '6+ months',
  'Just exploring',
]

const FAMILY_PRODUCTS = PRODUCT_FAMILIES.map((family) => ({
  family,
  products: HOME_PRODUCTS.filter((p) => p.familyId === family.id),
}))

const PROJECT_TYPE_GROUPS: SelectGroup[] = [{ options: PROJECT_TYPES.map((t) => ({ value: t, label: t })) }]
const QUANTITY_GROUPS: SelectGroup[] = [{ options: QUANTITY_OPTIONS.map((q) => ({ value: q, label: q })) }]
const TIMELINE_GROUPS: SelectGroup[] = [{ options: TIMELINE_OPTIONS.map((t) => ({ value: t, label: t })) }]

const PRODUCT_GROUPS: SelectGroup[] = [
  ...FAMILY_PRODUCTS.map(({ family, products }) => ({
    label: family.label,
    options: [
      { value: `family:${family.id}`, label: `Any product — ${family.label}` },
      ...products.map((p) => ({ value: p.slug, label: p.name })),
    ],
  })),
  { options: [{ value: 'not-sure', label: 'Not sure — help me choose' }] },
]

interface FormValues {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  productSlug: string
  quantity: string
  timeline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/

type ProductSelection =
  | { kind: 'none' }
  | { kind: 'not-sure' }
  | { kind: 'family'; family: (typeof PRODUCT_FAMILIES)[number] }
  | { kind: 'product'; product: ReturnType<typeof getProductBySlug>; family: (typeof PRODUCT_FAMILIES)[number] | undefined }

function resolveProductSelection(productSlug: string): ProductSelection {
  if (!productSlug) return { kind: 'none' }
  if (productSlug === 'not-sure') return { kind: 'not-sure' }
  if (productSlug.startsWith('family:')) {
    const familyId = productSlug.slice('family:'.length)
    const family = PRODUCT_FAMILIES.find((f) => f.id === familyId)
    return family ? { kind: 'family', family } : { kind: 'none' }
  }
  const product = getProductBySlug(productSlug)
  if (!product) return { kind: 'none' }
  const family = PRODUCT_FAMILIES.find((f) => f.id === product.familyId)
  return { kind: 'product', product, family }
}

function productLabelFor(selection: ProductSelection): string {
  switch (selection.kind) {
    case 'product':
      return selection.product ? `${selection.product.name} (${selection.family?.label ?? 'Climate Craft'})` : 'Not specified'
    case 'family':
      return `Any product — ${selection.family.label}`
    case 'not-sure':
      return 'Not sure — help me choose'
    default:
      return 'Not specified'
  }
}

function buildWhatsAppMessage(values: FormValues): string {
  const selection = resolveProductSelection(values.productSlug)

  const lines = [
    'Hello Climate Craft,',
    '',
    'I would like to enquire about a Climate Craft project.',
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || 'Not provided'}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    '',
    `Project Type: ${values.projectType}`,
    `Product / Collection: ${productLabelFor(selection)}`,
    `Estimated Quantity: ${values.quantity}`,
    `Preferred Timeline: ${values.timeline || 'Not specified'}`,
    '',
    'Project Details:',
    values.message.trim() || 'Not provided',
    '',
    'Thank you.',
  ]

  return lines.join('\n')
}

const inputContainerClass =
  'relative group mt-2 rounded-xl border border-ink-900/10 bg-white/40 backdrop-blur-md transition-all duration-300 focus-within:border-gold-400 focus-within:bg-white/70 focus-within:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-ink-900/20'

const inputClass =
  'w-full rounded-xl bg-transparent px-4 py-3 pl-11 text-[14px] text-cream-100 placeholder:text-cream-200/60 outline-none transition-colors'

const labelClass = 'text-[11px] font-medium uppercase tracking-widest text-cream-200 flex items-center gap-1.5'

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-[12px] font-medium text-amber-600"
        >
          <AlertCircle className="h-3.5 w-3.5 flex-none" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export function QuoteForm() {
  const [searchParams] = useSearchParams()
  const initialSlug = (() => {
    const fromQuery = searchParams.get('product')
    return fromQuery && getProductBySlug(fromQuery) ? fromQuery : ''
  })()

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    productSlug: initialSlug,
    quantity: '',
    timeline: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [lastUrl, setLastUrl] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const selection = resolveProductSelection(values.productSlug)

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(v: FormValues): FormErrors {
    const next: FormErrors = {}
    if (!v.name.trim()) next.name = 'Full name is required.'
    if (!v.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(v.email.trim())) next.email = 'Enter a valid email address.'
    if (v.phone.trim() && !PHONE_PATTERN.test(v.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!v.projectType) next.projectType = 'Select a project type.'
    if (!v.quantity) next.quantity = 'Select an estimated quantity.'
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (phase === 'submitting') return

    const validation = validate(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setPhase('submitting')
    timeoutRef.current = setTimeout(() => {
      const message = buildWhatsAppMessage(values)
      const url = whatsappHref(message)
      setLastUrl(url)
      window.open(url, '_blank', 'noopener,noreferrer')
      setPhase('success')
    }, 650)
  }

  if (phase === 'success' && lastUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative overflow-hidden rounded-[28px] border border-[#063B3D]/15 bg-white/40 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #f0a92c 0%, #53c9c5 60%, transparent 80%)' }}
        />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/10 backdrop-blur-md">
          <svg viewBox="0 0 52 52" className="h-16 w-16">
            <motion.circle
              cx="26"
              cy="26"
              r="23"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
            />
            <motion.path
              d="M16 27l7 7 14-14"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
            />
          </svg>
        </div>

        <h3 className="relative mt-6 font-display text-3xl font-medium tracking-tight text-cream-100 sm:text-4xl">
          Enquiry Prepared
        </h3>

        <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-cream-200">
          We have generated your customized specification sheet. WhatsApp is ready to launch so you can finalize your request with our design specialists.
        </p>

        <div className="relative mx-auto mt-8 max-w-md space-y-3 rounded-2xl border border-ink-900/10 bg-white/60 p-6 text-left shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-ink-900/5 pb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cream-200">Collection</span>
            <span className="text-[13.5px] font-medium text-cream-100">{productLabelFor(selection)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-ink-900/5 pb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cream-200">Project Type</span>
            <span className="text-[13.5px] font-medium text-cream-100">{values.projectType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cream-200">Quantity</span>
            <span className="text-[13.5px] font-medium text-cream-100">{values.quantity}</span>
          </div>
        </div>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={lastUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-6 py-3.5 text-[14px] font-medium text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:bg-teal-600 hover:shadow-teal-700/30 active:scale-[0.98]"
          >
            <span>Continue on WhatsApp</span>
            <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <button
            type="button"
            onClick={() => setPhase('idle')}
            className="group inline-flex items-center gap-2 rounded-xl border border-ink-900/20 bg-white/50 px-5 py-3.5 text-[14px] font-medium text-cream-100 backdrop-blur-md transition-all duration-300 hover:border-ink-900/40 hover:bg-white/80"
          >
            <span>Edit enquiry</span>
            <Pencil className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative space-y-10">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-700" />
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
            01. Contact Details
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name *
            </label>
            <div className={inputContainerClass}>
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200 transition-colors group-focus-within:text-gold-700" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Likith S"
                required
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address *
            </label>
            <div className={inputContainerClass}>
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200 transition-colors group-focus-within:text-gold-700" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="likith@studio.com"
                required
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            <FieldError id="email-error" message={errors.email} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelClass}>
              Company / Studio
            </label>
            <div className={inputContainerClass}>
              <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200 transition-colors group-focus-within:text-gold-700" />
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Architectural Design Co."
                value={values.company}
                onChange={(e) => update('company', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <div className={inputContainerClass}>
              <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200 transition-colors group-focus-within:text-gold-700" />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
            </div>
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-ink-900/10 pt-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-700" />
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
            02. Project Specifications
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="projectType" className={labelClass}>
              Project Type *
            </label>
            <Select
              id="projectType"
              value={values.projectType}
              onChange={(v) => update('projectType', v)}
              groups={PROJECT_TYPE_GROUPS}
              placeholder="Select project type"
              invalid={Boolean(errors.projectType)}
              describedBy={errors.projectType ? 'projectType-error' : undefined}
              required
            />
            <FieldError id="projectType-error" message={errors.projectType} />
          </div>

          <div>
            <label htmlFor="quantity" className={labelClass}>
              Estimated Quantity *
            </label>
            <Select
              id="quantity"
              value={values.quantity}
              onChange={(v) => update('quantity', v)}
              groups={QUANTITY_GROUPS}
              placeholder="Select quantity"
              invalid={Boolean(errors.quantity)}
              describedBy={errors.quantity ? 'quantity-error' : undefined}
              required
            />
            <FieldError id="quantity-error" message={errors.quantity} />
          </div>
        </div>

        <div>
          <label htmlFor="productSlug" className={labelClass}>
            Product / Collection Interest
          </label>
          <Select
            id="productSlug"
            value={values.productSlug}
            onChange={(v) => update('productSlug', v)}
            groups={PRODUCT_GROUPS}
            placeholder="Select a product or collection"
          />

          {selection.kind === 'product' && selection.product && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="mt-3 flex items-center justify-between rounded-xl border border-gold-400/30 bg-gold-400/5 px-4 py-3 backdrop-blur-md"
            >
              <div>
                <p className="text-[13.5px] font-semibold text-cream-100">{selection.product.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-cream-200">
                  {selection.family?.label} · {selection.product.category}
                </p>
              </div>
              <span className="rounded-full bg-gold-400/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-700">
                {selection.product.operation}
              </span>
            </motion.div>
          )}
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Preferred Timeline
          </label>
          <Select
            id="timeline"
            value={values.timeline}
            onChange={(v) => update('timeline', v)}
            groups={TIMELINE_GROUPS}
            placeholder="Select preferred timeline"
          />
        </div>
      </div>

      <div className="space-y-6 border-t border-ink-900/10 pt-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-700" />
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
            03. Customizations & Notes
          </h4>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Share any requirements with us
          </label>
          <div className="group relative mt-2 rounded-xl border border-ink-900/10 bg-white/40 backdrop-blur-md transition-all duration-300 focus-within:border-gold-400 focus-within:bg-white/70 focus-within:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-ink-900/20">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your requirements, preferred configuration, finish direction, quantity, timeline or anything else we should know."
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              className="w-full resize-none bg-transparent p-4 text-[14px] text-cream-100 placeholder:text-cream-200/60 outline-none"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={phase === 'submitting'}
        className="relative flex w-full items-center justify-center gap-3 rounded-xl bg-gold-400 py-4 font-semibold uppercase tracking-widest text-ink-950 shadow-lg shadow-gold-400/20 transition-all duration-300 hover:bg-gold-500 hover:shadow-gold-400/30 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-10"
      >
        {phase === 'submitting' ? (
          <>
            <motion.span
              className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
            />
            <span>Preparing Specification...</span>
          </>
        ) : (
          <>
            <span>Request Quote</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </form>
  )
}

