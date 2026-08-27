import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Camera } from 'lucide-react'
import { HOME_PRODUCTS, type HomeProduct } from '../../data/homeProducts'
import { homeProductImage } from '../../lib/assets'
import { SectionLabel } from '../ui/SectionLabel'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const MAX_TILT = 4

function RelatedCard({ product }: { product: HomeProduct }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--tilt-x', `${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg`)
  }

  const onMouseLeave = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg')
    cardRef.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Link
      ref={cardRef}
      to={`/products/${product.slug}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform: 'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
      className="group relative block overflow-hidden rounded-[20px] border border-[#0B3F42]/[0.10] bg-[#F4F7F5] transition-[border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-[#159FA3]/35 hover:shadow-[0_28px_64px_-26px_rgba(6,61,60,0.26)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8EFEC]">
        {product.imageCount > 0 ? (
          <img
            src={homeProductImage(product.slug)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-canvas-aqua to-canvas text-center">
            <Camera className="h-6 w-6 text-cream-200/60" strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium uppercase tracking-widest text-cream-200/55">
              Photography Pending
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        <span className="absolute left-4 top-4 font-display text-xs italic tabular-nums text-cream-100/75">
          {String(product.number).padStart(2, '0')} / {String(HOME_PRODUCTS.length).padStart(2, '0')}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-lg text-cream-100">{product.name}</h4>
            <ArrowUpRight className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-gold-700 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-200/60">{product.category}</p>
        </div>
      </div>
    </Link>
  )
}

export function RelatedProducts({ products }: { products: HomeProduct[] }) {
  if (products.length === 0) return null

  return (
    <section className="relative bg-transparent py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>You May Also Like</SectionLabel>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <RelatedCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
