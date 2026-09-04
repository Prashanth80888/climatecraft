import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { ProductHotspot } from '../../data/homeProducts'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface HotspotExplorerProps {
  images: string[]
  hotspots: ProductHotspot[]
  alt: string
}

export function HotspotExplorer({
  images,
  hotspots,
  alt,
}: HotspotExplorerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  /*
   * Close hotspot with Escape.
   */
  useEffect(() => {
    if (!activeId) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveId(null)
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [activeId])

  /*
   * Close hotspot when clicking outside.
   */
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveId(null)
      }
    }

    document.addEventListener('click', onClickOutside)

    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [])

  const active = hotspots.find((h) => h.id === activeId) ?? null
  const src = images[imageIndex] ?? images[0]

  /*
   * Open hotspot and switch image when required.
   */
  const openHotspot = (hotspot: ProductHotspot) => {
    setActiveId(hotspot.id)

    if (
      typeof hotspot.imageIndex === 'number' &&
      images[hotspot.imageIndex]
    ) {
      setImageIndex(hotspot.imageIndex)
    }
  }

  /*
   * Desktop card positioning.
   * Cards move away from the edge so they don't get clipped.
   */
  const cardSide = active
    ? active.x > 55
      ? 'left'
      : 'right'
    : 'right'

  const cardVertical = active
    ? active.y > 65
      ? 'up'
      : 'down'
    : 'down'

  return (
    <div
      ref={containerRef}
      className="
        relative
        overflow-visible
        rounded-[24px]
        border
        border-[#0B3F42]/[0.15]
        bg-[#E8EFEC]
        shadow-[0_35px_90px_-35px_rgba(6,61,60,0.28)]
        sm:rounded-[28px]
      "
    >
      {/* =========================================================
          HERO IMAGE
      ========================================================== */}

      <div
        className="
          relative
          aspect-[4/5]
          w-full
          overflow-hidden
          rounded-[24px]
          bg-[#E8EFEC]
          sm:aspect-[4/3]
          sm:rounded-[28px]
          lg:aspect-[5/4]
        "
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            initial={{
              opacity: 0,
              scale: 1.02,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: easeOut,
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              select-none
              object-cover
            "
          />
        </AnimatePresence>

        {/* Main image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/35
            via-black/5
            to-transparent
          "
        />

        {/* Additional bottom readability gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[42%]
            bg-gradient-to-t
            from-black/25
            via-black/5
            to-transparent
            sm:h-[32%]
          "
        />

        {/* =====================================================
            EXPLORE THE DETAILS LABEL
        ====================================================== */}

        <span
          className="
            absolute
            left-3
            top-3
            z-10
            rounded-full
            border
            border-gold-300/40
            bg-[#123B3D]/80
            px-3.5
            py-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-[#F8F4E8]
            shadow-[0_8px_25px_rgba(0,0,0,0.18)]
            backdrop-blur-md
            sm:left-4
            sm:top-4
            sm:px-3
            sm:py-1.5
          "
        >
          Explore the Details
        </span>
      </div>

      {/* =========================================================
          HOTSPOTS
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {hotspots.map((hotspot) => {
          const isActive = hotspot.id === activeId

          return (
            <button
              key={hotspot.id}
              type="button"
              aria-label={`View detail: ${hotspot.title}`}
              aria-expanded={isActive}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation()
                openHotspot(hotspot)
              }}
              onMouseEnter={() => setActiveId(hotspot.id)}
              onFocus={() => setActiveId(hotspot.id)}
              className="
                group
                pointer-events-auto
                absolute
                z-20
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                p-1.5
                outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-300
                focus-visible:ring-offset-2
                focus-visible:ring-offset-transparent
              "
            >
              {/* Pulse */}
              <span
                className={`
                  absolute
                  inset-0
                  -m-2
                  rounded-full
                  transition-opacity
                  duration-300
                  motion-reduce:animate-none
                  ${isActive
                    ? 'opacity-0'
                    : 'animate-ping opacity-40'
                  }
                `}
                style={{
                  background:
                    'radial-gradient(circle, rgba(22,155,154,0.65) 0%, transparent 70%)',
                }}
              />

              {/* Hotspot circle */}
              <span
                className={`
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  shadow-[0_5px_18px_rgba(0,0,0,0.2)]
                  backdrop-blur-md
                  transition-all
                  duration-300
                  sm:h-7
                  sm:w-7
                  ${isActive
                    ? 'scale-110 border-gold-300 bg-gold-400/95 text-ink-950'
                    : 'border-gold-300/70 bg-[#123B3D]/75 text-gold-200 group-hover:border-gold-300 group-hover:bg-white/80 group-hover:text-gold-700'
                  }
                `}
              >
                <Plus
                  className={`
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    sm:h-3.5
                    sm:w-3.5
                    ${isActive ? 'rotate-45' : ''}
                  `}
                  strokeWidth={2.5}
                />
              </span>
            </button>
          )
        })}

        {/* =======================================================
            ACTIVE HOTSPOT
        ======================================================== */}

        <AnimatePresence>
          {active && (
            <>
              {/* =================================================
                  DESKTOP CONNECTOR LINE
              ================================================== */}

              <motion.svg
                key={`line-${active.id}`}
                className="
                  absolute
                  inset-0
                  hidden
                  h-full
                  w-full
                  overflow-visible
                  sm:block
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <line
                  x1={`${active.x}%`}
                  y1={`${active.y}%`}
                  x2={`${active.x +
                    (cardSide === 'right' ? 12 : -12)
                    }%`}
                  y2={`${active.y +
                    (cardVertical === 'up' ? -10 : 10)
                    }%`}
                  stroke="rgba(22,155,154,0.55)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              </motion.svg>

              {/* =================================================
                  MOBILE DETAIL CARD

                  On mobile the card is always centered at the
                  bottom so it never goes outside the screen.
              ================================================== */}

              <div
                key={`mobile-card-${active.id}`}
                className="
                  absolute
                  inset-x-3
                  bottom-3
                  z-30
                  sm:hidden
                "
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 14,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeOut,
                  }}
                  className="
                    rounded-[18px]
                    border
                    border-gold-300/30
                    bg-[#123B3D]/94
                    p-4
                    shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)]
                    backdrop-blur-xl
                  "
                >
                  <p
                    className="
                      font-display
                      text-[17px]
                      font-medium
                      italic
                      leading-tight
                      text-gold-300
                    "
                  >
                    {active.title}
                  </p>

                  <p
                    className="
                      mt-2
                      text-[14px]
                      font-medium
                      leading-[1.55]
                      text-[#F4F1E8]
                    "
                  >
                    {active.description}
                  </p>
                </motion.div>
              </div>

              {/* =================================================
                  DESKTOP DETAIL CARD
              ================================================== */}

              <div
                key={`desktop-card-${active.id}`}
                style={{
                  ...(cardSide === 'right'
                    ? {
                      left: `calc(${active.x}% + 18px)`,
                    }
                    : {
                      right: `calc(${100 - active.x}% + 18px)`,
                    }),
                  ...(cardVertical === 'up'
                    ? {
                      bottom: `calc(${100 - active.y}% + 10px)`,
                    }
                    : {
                      top: `calc(${active.y}% + 10px)`,
                    }),
                }}
                className="
                  pointer-events-auto
                  absolute
                  z-30
                  hidden
                  w-64
                  sm:block
                "
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    y: cardVertical === 'up' ? 8 : -8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeOut,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-gold-300/25
                    bg-white/90
                    p-4
                    shadow-[0_30px_60px_-20px_rgba(18,59,61,0.4)]
                    backdrop-blur-xl
                  "
                >
                  <p
                    className="
                      font-display
                      text-sm
                      font-medium
                      italic
                      text-gold-600
                    "
                  >
                    {active.title}
                  </p>

                  <p
                    className="
                      mt-2
                      text-[13.5px]
                      font-medium
                      leading-relaxed
                      text-[#36585A]
                    "
                  >
                    {active.description}
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}