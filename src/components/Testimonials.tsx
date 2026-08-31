import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal } from './ui/Reveal'
import { SectionAtmosphere } from './ui/SectionAtmosphere'

export interface Testimonial {
  q: string
  mono: string
  n: string
  r: string
  location: string
}

// Custom Testimonials with Karnataka names
const karnatakaTestimonials: Testimonial[] = [
  {
    q: "The climate-control seating made an extraordinary difference in our Bengaluru residence. The craftsmanship and voice automation feel truly world-class.",
    mono: "UH",
    n: "Uday Hegde",
    r: "Principal Interior Architect",
    location: "Bengaluru, Karnataka",
  },
  {
    q: "Integrating Climate Craft into our penthouse project in Mangaluru was seamless. The precision motorized reclining and thermal features are unmatched.",
    mono: "NB",
    n: "Nitin Bhat",
    r: "Luxury Residential Designer",
    location: "Mangaluru, Karnataka",
  },
  {
    q: "Uncompromising quality. The temperature customization and hand-stitched leather work exceeded our client's expectations completely.",
    mono: "KK",
    n: "Kartik Kulkarni",
    r: "Design Lead, Kulkarni Studios",
    location: "Hubballi, Karnataka",
  },
  {
    q: "A masterpiece of engineering and comfort. The voice commands work flawlessly, making it the focal point of the entire living room.",
    mono: "SR",
    n: "Sharath Rao",
    r: "Executive Homeowner",
    location: "Mysuru, Karnataka",
  },
  {
    q: "Exceptional elegance combined with modern technology. It delivers effortless temperature control without compromising on luxury aesthetics.",
    mono: "AN",
    n: "Ananya Nayak",
    r: "Architectural Consultant",
    location: "Udupi, Karnataka",
  },
]

const AUTOPLAY_MS = 5000

const easeOut: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
]

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div
      className="
        relative flex min-h-[260px] flex-col justify-between
        overflow-hidden rounded-[22px]
        border border-white/80
        bg-white/75
        p-6
        shadow-[0_30px_70px_-25px_rgba(6,59,61,0.22)]
        backdrop-blur-md
        transition-all duration-500
        hover:border-teal-500/40
        hover:bg-white/90
        hover:shadow-[0_40px_90px_-20px_rgba(6,59,61,0.3)]
        sm:min-h-[280px]
        sm:rounded-[28px]
        sm:p-8
        lg:p-10
      "
    >
      {/* Decorative Quote Icon & Star Rating */}
      <div className="flex items-center justify-between">
        {/* Stars */}
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.35,
                delay: i * 0.06,
                ease: easeOut,
              }}
            >
              <Star
                className="
                  h-4 w-4
                  fill-[#0E7776]
                  text-[#0E7776]
                  drop-shadow-[0_2px_5px_rgba(14,119,118,0.18)]
                  sm:h-[17px] sm:w-[17px]
                "
                strokeWidth={1.5}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote Icon */}
        <Quote
          className="
            h-7 w-7
            text-[#C8A45D]/75
            sm:h-8 sm:w-8
          "
          strokeWidth={1.4}
        />
      </div>

      {/* Testimonial / Feedback Text */}
      <p
        className="
          mt-5
          text-[18px]
          font-normal
          leading-[1.65]
          text-[#063B3D]
          sm:mt-6
          sm:text-[20px]
          lg:text-[22px]
        "
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontStyle: 'normal',
          letterSpacing: '0.01em',
        }}
      >
        "{testimonial.q}"
      </p>

      {/* Customer Information */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          border-t
          border-[#063B3D]/10
          pt-5
          sm:mt-8
          sm:pt-6
        "
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Initial Circle */}
          <div
            className="
              flex
              h-10
              w-10
              flex-none
              items-center
              justify-center
              rounded-full
              border
              border-[#C8A45D]/45
              bg-gradient-to-br
              from-[#C8A45D]/20
              via-[#0E7776]/15
              to-transparent
              font-display
              text-sm
              font-semibold
              text-[#063B3D]
              shadow-inner
              sm:h-12
              sm:w-12
              sm:text-base
            "
          >
            {testimonial.mono}
          </div>

          {/* Name + Role */}
          <div>
            <p className="text-sm font-semibold text-[#063B3D] sm:text-base">
              {testimonial.n}
            </p>

            <p className="text-[11px] font-medium text-ink-700 sm:text-xs">
              {testimonial.r}
            </p>
          </div>
        </div>

        {/* Location */}
        <span
          className="
            hidden
            rounded-full
            border
            border-[#063B3D]/15
            bg-white/80
            px-3
            py-1
            text-[11px]
            font-semibold
            text-teal-800
            shadow-2xs
            backdrop-blur-sm
            sm:inline-block
          "
        >
          {testimonial.location}
        </span>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)

  const goTo = useCallback(
    (next: number) => {
      setDirection(
        next > index ||
          (index === karnatakaTestimonials.length - 1 && next === 0)
          ? 1
          : -1
      )

      setIndex(
        ((next % karnatakaTestimonials.length) +
          karnatakaTestimonials.length) %
          karnatakaTestimonials.length
      )
    },
    [index]
  )

  const next = useCallback(
    () => goTo(index + 1),
    [goTo, index]
  )

  const prev = useCallback(
    () => goTo(index - 1),
    [goTo, index]
  )

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        next()
      }
    }, AUTOPLAY_MS)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [next])

  const restart = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        next()
      }
    }, AUTOPLAY_MS)
  }

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-transparent
        py-16
        sm:py-24
        lg:py-32
      "
    >
      <SectionAtmosphere variant="glow" />

      {/* Ambient Background Radial Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[450px]
          w-[750px]
          -translate-x-1/2
          opacity-[0.45]
          blur-[120px]
        "
        style={{
          background:
            'radial-gradient(ellipse, #f0a92c 0%, transparent 70%)',
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* Section Label */}
        <Reveal>
          <SectionLabel>What They Say</SectionLabel>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2
            className="
              mt-4
              max-w-md
              font-display
              text-2xl
              font-semibold
              leading-[1.1]
              text-[#063B3D]
              sm:mt-5
              sm:text-3xl
              lg:text-4xl
              lg:text-[2.75rem]
            "
          >
            Trusted by designers. Chosen for a reason.
          </h2>
        </Reveal>

        {/* Testimonial Slider */}
        <Reveal delay={0.2}>
          <div
            className="mt-12 max-w-3xl"
            onMouseEnter={() => {
              pausedRef.current = true
            }}
            onMouseLeave={() => {
              pausedRef.current = false
            }}
          >
            <div className="relative">
              <AnimatePresence
                mode="popLayout"
                custom={direction}
              >
                <motion.div
                  key={index}
                  layout
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction * 28,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction * -28,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: easeOut,
                  }}
                >
                  <TestimonialCard
                    testimonial={karnatakaTestimonials[index]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls Bar */}
            <div className="mt-6 flex items-center justify-between sm:mt-8">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2.5">
                {karnatakaTestimonials.map((t, i) => (
                  <button
                    key={t.n}
                    type="button"
                    onClick={() => {
                      goTo(i)
                      restart()
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        i === index
                          ? 'w-8 bg-[#0E7776]'
                          : 'w-2 bg-[#0E7776]/25 hover:bg-[#0E7776]/50'
                      }
                    `}
                  />
                ))}
              </div>

              {/* Previous / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    prev()
                    restart()
                  }}
                  aria-label="Previous testimonial"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#063B3D]/20
                    bg-white/80
                    text-[#063B3D]
                    shadow-xs
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:border-[#C8A45D]
                    hover:bg-[#063B3D]
                    hover:text-white
                    sm:h-11
                    sm:w-11
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    next()
                    restart()
                  }}
                  aria-label="Next testimonial"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#063B3D]/20
                    bg-white/80
                    text-[#063B3D]
                    shadow-xs
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:border-[#C8A45D]
                    hover:bg-[#063B3D]
                    hover:text-white
                    sm:h-11
                    sm:w-11
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}