import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Camera } from 'lucide-react'
import { HOME_PRODUCTS, type HomeProduct } from '../data/homeProducts'
import { homeCardImage } from '../lib/assets'
import { SectionLabel } from './ui/SectionLabel'
import { SectionAtmosphere } from './ui/SectionAtmosphere'
import { Reveal } from './ui/Reveal'

const TOTAL = HOME_PRODUCTS.length
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SEAT_ROWS: { label: string; blurb: string; seats: 1 | 2 | 3; dur: number; dir: 'ltr' | 'rtl' }[] = [
  { label: ' Climate Signature', blurb: 'Climate Signature · Single Seater', seats: 1, dur: 28, dir: 'ltr' },
  { label: ' Climate Duo', blurb: 'Climate Duo · Two Seater', seats: 2, dur: 32, dir: 'rtl' },
  { label: 'Climate Grand', blurb: 'Climate Grand · Three Seater', seats: 3, dur: 36, dir: 'ltr' },
]

function ProductCard({ product, armed }: { product: HomeProduct; armed: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const cardImage = homeCardImage(product.slug)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={cardRef}
      to={`/products/${product.slug}`}
      draggable={false}
      onMouseMove={onMouseMove}
      className="group relative w-[155px] flex-none overflow-hidden rounded-[14px] border border-[#0B3F42]/[0.15] bg-[#F4F7F5] transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#073F40] hover:border-[#159FA3]/50 hover:shadow-[0_28px_60px_-26px_rgba(6,61,60,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:w-[260px] md:w-[280px] lg:w-[310px] sm:rounded-[18px] lg:rounded-[20px]"
    >
      {/* cursor-follow spotlight — subtle, gold-tinted, opacity-gated so it only exists on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(180px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(22,155,154,0.16), transparent 70%)',
        }}
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8EFEC]">
        {product.imageCount > 0 ? (
          <picture>
            <source srcSet={cardImage.webp} type="image/webp" />
            <img
              src={cardImage.fallback}
              alt={product.name}
              draggable={false}
              width={400}
              height={500}
              loading={armed ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
            />
          </picture>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-canvas-aqua to-canvas px-6 text-center">
            <Camera className="h-6 w-6 text-cream-200" strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200">
              Photography Pending
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent transition-opacity duration-500" />

        <span className="absolute left-2.5 top-2.5 font-display text-[10px] italic text-cream-100 tabular-nums transition-colors duration-500 group-hover:text-gold-600 sm:left-4 sm:top-4 sm:text-xs">
          {String(product.number).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>

        <span className="absolute right-2.5 top-2.5 text-[8px] font-medium uppercase tracking-widest text-cream-100 sm:right-4 sm:top-4 sm:text-[10px]">
          {product.operation}
        </span>
      </div>

      <div className="relative border-t border-ink-900/[0.08] p-3 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:p-4 lg:p-5">
        <h4 className="font-display text-sm text-cream-100 transition-colors duration-500 group-hover:text-white sm:text-base lg:text-lg">
          {product.slug === 'craft-classic-grand' ? 'Climate Craft Classic' : product.name}
        </h4>

        <p className="mt-0.5 text-[9px] uppercase tracking-widest text-cream-200 transition-colors duration-500 group-hover:text-white/60 sm:text-[10px] lg:text-[11px]">
          {product.category}
        </p>

        <p className="mt-1.5 hidden text-[11px] leading-relaxed text-cream-200 transition-colors duration-500 group-hover:text-white/70 sm:block lg:mt-2 lg:text-[12.5px]">
          {product.teaser}
        </p>

        <span className="mt-2.5 inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-gold-700/90 transition-all duration-500 group-hover:gap-2.5 group-hover:text-gold-400 sm:mt-3 lg:mt-4 sm:text-[10px] lg:text-[10.5px]">
          View Product
          <ArrowUpRight className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3 sm:w-3" />
        </span>

        <span className="mt-2 block h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full group-hover:bg-gold-400/60 sm:mt-3" />
      </div>
    </Link>
  )
}

function MarqueeRow({
  products,
  dur,
  dir: direction,
  armed,
}: {
  products: HomeProduct[]
  dur: number
  dir: 'ltr' | 'rtl'
  armed: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const stateRef = useRef({
    position: 0,
    hovered: false,
    visible: true,
    dragging: false,
    startX: 0,
    startPosition: 0,
    setWidth: 0,
  })

  // Small families (e.g. the 3-product Motorised Comfort row) need more repeated
  // copies than a 2x duplicate to stay seamless on very wide/ultrawide viewports —
  // otherwise the track can run out of content before the loop wraps, producing a
  // visible blank gap. Larger families (6-10 items) are already wide enough at 2x.
  const [repeat, setRepeat] = useState(products.length <= 4 ? 4 : 2)
  const dir = direction === 'rtl' ? -1 : 1

  useEffect(() => {
    const track = trackRef.current
    const row = rowRef.current
    if (!track || !row) return

    const state = stateRef.current

    const measure = () => {
      state.setWidth = track.scrollWidth / repeat

      // Guarantee at least ~2.2x the viewport width of content per copy-cycle so
      // the wrap point is always off-screen, regardless of monitor width.
      if (row.clientWidth > 0 && state.setWidth * 1.8 < row.clientWidth && repeat < 8) {
        setRepeat((r) => r + 2)
      }
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(track)
    ro.observe(row)

    const io = new IntersectionObserver(
      ([entry]) => (state.visible = entry.isIntersecting),
      { threshold: 0.01 },
    )

    io.observe(row)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (
        !state.hovered &&
        !state.dragging &&
        state.visible &&
        !prefersReduced &&
        state.setWidth > 0
      ) {
        const speed = state.setWidth / dur
        state.position -= dir * speed * dt

        if (state.position <= -state.setWidth) state.position += state.setWidth
        if (state.position >= 0) state.position -= state.setWidth

        track.style.transform = `translate3d(${state.position}px,0,0)`
      }

      raf = requestAnimationFrame(tick)
    }

    if (dir === -1) state.position = -state.setWidth

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [dur, dir, repeat])

  const onPointerDown = (e: React.PointerEvent) => {
    const state = stateRef.current
    state.dragging = true
    state.startX = e.clientX
    state.startPosition = state.position
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const state = stateRef.current
    if (!state.dragging) return

    const delta = e.clientX - state.startX
    state.position = state.startPosition + delta

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${state.position}px,0,0)`
    }
  }

  const endDrag = () => {
    stateRef.current.dragging = false
  }

  const sequence = Array.from({ length: repeat }, () => products).flat()

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="relative touch-pan-y overflow-hidden"
      onMouseEnter={() => (stateRef.current.hovered = true)}
      onMouseLeave={() => (stateRef.current.hovered = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={trackRef}
        className="flex w-max cursor-grab select-none gap-3 pb-2 active:cursor-grabbing sm:gap-5 md:gap-6 lg:gap-7"
      >
        {sequence.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} armed={armed} />
        ))}
      </div>
    </motion.div>
  )
}

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null)
  // Native `loading="lazy"` has no way to tune how far ahead of the viewport it
  // starts fetching, so cards can still pop in blank on a fast scroll. Instead we
  // arm the whole section — flipping every card's `loading` to "eager" (never
  // fetchPriority) — the moment it's within 1200px of the viewport, well before
  // the user actually reaches it. The images are ~30-50KB WebP derivatives, so
  // this background fetch never competes with the Hero's priority resources.
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || armed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px 1200px 0px', threshold: 0 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [armed])

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-32"
    >
      <SectionAtmosphere variant="bloom" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>
            <span className="mx-auto">Curated for Every Space</span>
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-normal text-cream-100 sm:text-4xl lg:text-5xl sm:mt-5">
            Explore our collections
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-cream-200 sm:text-[15px] sm:mt-4">
            Three families of motion furniture — Classic, Motorised Comfort and Climate Smart.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:gap-14 lg:mt-16 lg:gap-16">
        {SEAT_ROWS.map((row, idx) => {
          let products = HOME_PRODUCTS.filter((p) => p.seats === row.seats)

          // Move classic-duo from row 1 to row 2
          if (row.seats === 1) {
            products = products.filter((p) => p.id !== 'classic-duo')
          }

          // Replace the removed Duo Two-Seater with the new Climate Craft Signature Single-Seater in the second row.
          if (row.seats === 2) {
            const singleSeaterReplacement = HOME_PRODUCTS.find((p) => p.id === 'signature-new')
            const movedClassicDuo = HOME_PRODUCTS.find((p) => p.id === 'classic-duo')
            
            const additions = []
            if (singleSeaterReplacement) additions.push(singleSeaterReplacement)
            if (movedClassicDuo) additions.push(movedClassicDuo)
            
            products = [...additions, ...products]
          }

          return (
            <div key={row.seats}>
              <Reveal amount={0.15}>
                <div className="mx-auto mb-4 flex max-w-7xl flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-[#063B3D]/20 px-4 pb-3 sm:mb-6 sm:px-6 sm:pb-4 lg:px-8">
                  <div>
                    <h3 className="font-display text-lg text-cream-100 sm:text-xl lg:text-2xl">
                      {row.label}
                    </h3>

                    <p className="mt-1 max-w-md text-[11px] leading-relaxed text-cream-200 sm:text-[12.5px]">
                      {row.blurb}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-cream-200 tabular-nums sm:text-[11px]">
                    {String(idx + 1).padStart(2, '0')} /{' '}
                    {String(SEAT_ROWS.length).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>

              <MarqueeRow
                products={products}
                dur={row.dur}
                dir={row.dir}
                armed={armed}
              />
            </div>
          )
        })}
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 sm:mt-12 lg:mt-16">
        <Reveal>
          <a
            href="#final-cta"
            onClick={(e) => {
              e.preventDefault()
              document
                .querySelector('#final-cta')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost group"
          >
            Request a bespoke configuration

            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}