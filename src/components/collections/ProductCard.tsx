import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Camera } from 'lucide-react'
import type { HomeProduct } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProductCardProps {
  product: HomeProduct
  total: number
}

const MAX_TILT = 5

export function ProductCard({ product, total }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * MAX_TILT * 2
    const rotateX = (0.5 - py) * MAX_TILT * 2
    card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Link
      ref={cardRef}
      to={`/products/${product.slug}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: 'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
      }}
      className="group relative block h-full overflow-hidden rounded-[18px] border border-[#0B3F42]/20 bg-[#F4F7F5] transition-[border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-[#159FA3]/50 hover:shadow-[0_32px_64px_-30px_rgba(6,61,60,0.35)] sm:rounded-[22px]"
    >
      {/* Interactive Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(22,155,154,0.18), transparent 70%)',
        }}
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8EFEC]">
        {product.imageCount > 0 ? (
          <motion.div
            initial={{ clipPath: 'inset(7% round 4px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% round 0px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="h-full w-full"
          >
            <img
              src={homeProductImage(product.slug)}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#063B3D] to-[#0A2628] px-6 text-center text-white">
            <Camera className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
            <span className="text-[10.5px] font-semibold uppercase tracking-widest text-gold-300">
              Photography Pending
            </span>
          </div>
        )}

        {/* High-Contrast Gradient Scrim Overlays */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#042021]/95 via-[#063B3D]/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#042021]/60 via-transparent to-transparent opacity-80" />

        {/* Top Bar: Glass Pills for Index & Operation Status */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 sm:p-4 lg:p-5">
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-display text-xs font-semibold italic tabular-nums text-white backdrop-blur-md transition-colors duration-500 group-hover:border-gold-400/50 group-hover:text-gold-300">
            {String(product.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {product.operation}
          </span>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-base font-semibold leading-snug text-white drop-shadow-md sm:text-lg lg:text-xl group-hover:text-gold-200">
              {product.name}
            </h4>
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-black">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300 drop-shadow-sm">
            {product.category}
          </p>

          <p className="mt-1.5 max-w-xs text-[11px] leading-relaxed text-white/90 drop-shadow-sm line-clamp-2 sm:mt-2 sm:text-[13px]">
            {product.teaser}
          </p>

          <span className="mt-3 block h-[2px] w-8 bg-gold-400 transition-all duration-500 group-hover:w-16 group-hover:bg-gold-300" />
        </div>
      </div>
    </Link>
  )
}