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
      style={{ transform: 'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
      className="group relative block h-full overflow-hidden rounded-[22px] border border-[#0B3F42]/[0.10] bg-[#F4F7F5] transition-[border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-[#159FA3]/40 hover:shadow-[0_32px_64px_-30px_rgba(6,61,60,0.28)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(22,155,154,0.14), transparent 70%)',
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
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-canvas-aqua to-canvas px-6 text-center">
            <Camera className="h-6 w-6 text-cream-200/60" strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200/55">
              Photography Pending
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent transition-all duration-500" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span className="font-display text-xs italic tabular-nums text-cream-100/75 transition-colors duration-500 group-hover:text-gold-600">
            {String(product.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-cream-100/70">
            {product.operation}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-lg text-cream-100 sm:text-xl">{product.name}</h4>
            <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-gold-700 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-200/60">{product.category}</p>
          <p className="mt-1.5 max-w-xs text-[12.5px] leading-relaxed text-cream-200/60">{product.teaser}</p>
          <span className="mt-3 block h-px w-8 bg-gold-400/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold-400/80" />
        </div>
      </div>
    </Link>
  )
}
