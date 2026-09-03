import { useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES } from '../data/homeProducts'
import { whatsappHref } from '../lib/assets'
import { CollectionsHero } from '../components/collections/CollectionsHero'
import { CategoryNav } from '../components/collections/CategoryNav'
import { FeaturedCollection } from '../components/collections/FeaturedCollection'
import { ProductGrid } from '../components/collections/ProductGrid'
import { CollectionStory } from '../components/collections/CollectionStory'
import { EngineeringDetail } from '../components/collections/EngineeringDetail'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const CLASSIC_GRAND_ONLY = HOME_PRODUCTS.filter(
  (p) => p.slug === 'craft-classic-grand',
)

const CLIMATE_SMART_PRODUCTS = HOME_PRODUCTS.filter((p) =>
  p.name.includes('Climate Craft'),
)

export function CollectionsPage() {
  useDocumentMeta(
    'Luxury Recliner Collections | Climate Craft',
    'Explore Climate Craft\'s three collections — Climate Smart, Motorised Comfort and Classic — engineered and handcrafted in Europe.',
  )

  const [active, setActive] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const activeFamily = PRODUCT_FAMILIES[active]
  const isMotorised = activeFamily.id === 'motorised-comfort'
  const isClassic = activeFamily.id === 'classic'
  const isClimateSmart = activeFamily.id === 'climate-smart'

  const filteredProducts = isClassic
    ? CLASSIC_GRAND_ONLY
    : isClimateSmart
      ? CLIMATE_SMART_PRODUCTS
      : HOME_PRODUCTS.filter((p) => p.familyId === activeFamily.id)

  const collectionLabel = isClimateSmart
    ? 'Climate Smart'
    : isClassic
      ? 'Classic'
      : 'Motorised Comfort'

  const collectionDescription = isClimateSmart
    ? 'Intelligent climate control, refined materials and considered engineering come together in seating designed for a more personal kind of comfort.'
    : isClassic
      ? 'Timeless proportions, considered materials and precise craftsmanship define our Classic collection.'
      : 'Designed around effortless movement, intuitive control and everyday relaxation, our Motorised Comfort collection is coming soon.'

  const collectionSupportingText = isClimateSmart
    ? 'Discover seating where technology and comfort work quietly together.'
    : isClassic
      ? 'Explore refined seating shaped by craftsmanship, proportion and lasting comfort.'
      : 'A new generation of effortless movement is on its way.'

  return (
    <>
      <main>
        <CollectionsHero />

        <CategoryNav
          active={active}
          onChange={setActive}
          productCounts={{
            'climate-smart': CLIMATE_SMART_PRODUCTS.length,
            classic: CLASSIC_GRAND_ONLY.length,
            'motorised-comfort': 0,
          }}
        />

        {/* COLLECTION INTRO */}
        <section className="relative overflow-hidden bg-transparent px-5 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-teal-700/70 sm:text-[10px]">
              {collectionLabel}
            </span>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-normal leading-[1.08] text-[#063B3D] sm:text-4xl lg:text-5xl">
              Designed for the way
              <span className="italic text-teal-700"> you live.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.75] text-ink-700 sm:text-[15px]">
              {collectionDescription}
            </p>

            <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-[#063B3D]/60 sm:text-[12px]">
              {collectionSupportingText}
            </p>

            {!isMotorised && (
              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#063B3D]/40 sm:text-[10px]">
                Explore the products below
              </p>
            )}
          </div>
        </section>

        {isMotorised ? (
          <section className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[450px] w-[700px] rounded-full bg-radial from-teal-500/10 via-gold-400/5 to-transparent blur-3xl opacity-80" />
            </div>

            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <span className="rounded-full border border-[#063B3D]/15 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#063B3D]/70 backdrop-blur-md">
                  Coming Soon
                </span>

                <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] text-[#063B3D] sm:text-4xl lg:text-5xl">
                  Motorised Comfort
                </h2>

                <p className="mt-4 max-w-lg text-[14px] font-normal leading-relaxed text-ink-700 sm:text-[15px]">
                  If you are interested in this product, we can make it for you.
                  Please contact us on WhatsApp for more details and to discuss
                  your requirements.
                </p>

                <a
                  href={whatsappHref(
                    'Hi Climate Craft, I\'d like to know more about Motorised Comfort.',
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#063B3D]/20 bg-white/80 px-6 py-3.5 text-[12px] font-bold uppercase tracking-widest text-[#063B3D] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-[#063B3D] hover:text-white hover:shadow-lg hover:shadow-[#063B3D]/20"
                >
                  <span>Message on WhatsApp</span>
                  <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </div>
            </div>
          </section>
        ) : (
          <>
            <FeaturedCollection
              family={activeFamily}
              filteredProducts={filteredProducts}
              onExplore={() =>
                gridRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            />

            <ProductGrid
              ref={gridRef}
              family={activeFamily}
              filteredProducts={filteredProducts}
            />
          </>
        )}

        <CollectionStory />
        <EngineeringDetail />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}