import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Armchair,
  Sofa,
  MoveVertical,
  Zap,
  Sparkles,
  Coffee,
  Radio,
  MonitorSmartphone,
  Mic,
  ArrowUpRight,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
]

const BODY_FEATURES = [
  { icon: Armchair, label: 'Ergonomic Back Support' },
  { icon: Sofa, label: 'Comfortable Seating' },
  { icon: MoveVertical, label: 'Leg-Rest Adjustment' },
  { icon: Zap, label: 'Motorized Reclining' },
  { icon: Sparkles, label: 'Premium Upholstery' },
  { icon: Coffee, label: 'Integrated Cup Holder' },
  { icon: Radio, label: 'Remote Control' },
  {
    icon: MonitorSmartphone,
    label: 'Smart Touchscreen / Interface Control',
  },
  { icon: Mic, label: 'Voice-Control Capability' },
]

export function FabricArchive() {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* Soft ambient atmosphere */}
      <div
        className="
          pointer-events-none absolute
          -left-32 top-1/4 h-80 w-80
          rounded-full bg-teal-500/[0.045]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-40 bottom-10 h-96 w-96
          rounded-full bg-gold-400/[0.045]
          blur-[110px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          {/* =====================================================
              LEFT — INTRO + IMAGE
          ====================================================== */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>
                Designed Around the Human Body
              </SectionLabel>

              <h2
                className="
                  mt-5 max-w-lg
                  font-display text-[32px]
                  font-medium leading-[1.05]
                  tracking-[-0.025em]
                  text-[#063B3D]
                  sm:text-[42px]
                  lg:text-[48px]
                "
              >
                Still has to feel like{' '}
                <span className="italic font-normal text-teal-700">
                  a great recliner.
                </span>
              </h2>

              <p
                className="
                  mt-6 max-w-md
                  text-[15px]
                  font-medium
                  leading-7
                  text-ink-700
                  sm:text-[16px]
                "
              >
                Temperature control is only one part of the
                experience. ClimateCraft therefore brings
                together temperature management with:
              </p>
            </Reveal>

            {/* =================================================
                CLICKABLE PRODUCT IMAGE
            ================================================== */}
            <Reveal delay={0.15}>
              <Link
                to="/products/craft-classic"
                aria-label="Explore Craft Classic"
                className="group relative mt-9 block"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.45,
                    ease: easeOut,
                  }}
                  className="
                    relative overflow-hidden
                    rounded-[30px]
                    bg-[#E8EFEC]
                    shadow-[0_30px_80px_-35px_rgba(6,59,61,0.42)]
                    ring-1 ring-[#063B3D]/[0.08]
                  "
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
                    <motion.img
                      src="/images/products/craft-classic/03.webp"
                      alt="Premium upholstery and ergonomic seating design on a ClimateCraft recliner"
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.045 }}
                      transition={{
                        duration: 0.9,
                        ease: easeOut,
                      }}
                      className="
                        h-full w-full
                        object-cover
                        transition-transform
                        duration-700
                      "
                    />

                    {/* Premium image depth */}
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-[#063B3D]/75
                        via-[#063B3D]/10
                        to-transparent
                        opacity-90
                      "
                    />

                    {/* Subtle top sheen */}
                    <div
                      className="
                        pointer-events-none absolute inset-x-0
                        top-0 h-32
                        bg-gradient-to-b
                        from-white/20
                        to-transparent
                      "
                    />

                    {/* Product label */}
                    <div
                      className="
                        absolute left-5 top-5
                        sm:left-6 sm:top-6
                      "
                    >
                      <span
                        className="
                          inline-flex items-center
                          rounded-full
                          border border-white/35
                          bg-[#063B3D]/45
                          px-3.5 py-2
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        Craft Classic
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        p-5 sm:p-6
                      "
                    >
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-white/70
                            "
                          >
                            Premium seating
                          </p>

                          <h3
                            className="
                              mt-1
                              font-display
                              text-[25px]
                              font-medium
                              leading-tight
                              text-white
                              sm:text-[29px]
                            "
                          >
                            Craft Classic
                          </h3>
                        </div>

                        {/* Arrow */}
                        <motion.span
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="
                            flex h-11 w-11
                            flex-none items-center
                            justify-center
                            rounded-full
                            border border-white/35
                            bg-white/15
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            group-hover:bg-gold-400
                            group-hover:text-[#063B3D]
                          "
                        >
                          <ArrowUpRight
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </motion.span>
                      </div>

                      {/* Explore text */}
                      <div
                        className="
                          mt-4 flex items-center
                          gap-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-white/75
                        "
                      >
                        <span>Explore product</span>

                        <span
                          className="
                            h-px w-8
                            bg-white/50
                            transition-all
                            duration-500
                            group-hover:w-12
                            group-hover:bg-gold-400
                          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outer hover glow */}
                  <div
                    className="
                      pointer-events-none absolute
                      inset-0 rounded-[30px]
                      ring-1 ring-transparent
                      transition-all duration-500
                      group-hover:ring-teal-500/25
                    "
                  />
                </motion.div>
              </Link>
            </Reveal>
          </div>

          {/* =====================================================
              RIGHT — FEATURE SYSTEM
          ====================================================== */}
          <div className="lg:col-span-7 lg:pt-3">
            <Reveal>
              <div className="mb-7">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.19em]
                    text-ink-500
                  "
                >
                  The complete experience
                </p>

                <p
                  className="
                    mt-2 max-w-md
                    font-display
                    text-[22px]
                    leading-tight
                    text-[#063B3D]
                    sm:text-[26px]
                  "
                >
                  Every detail has a purpose.
                </p>
              </div>
            </Reveal>

            {/* Feature list */}
            <RevealGroup
              className="
                overflow-hidden
                rounded-[24px]
                border border-[#063B3D]/10
                bg-white/45
                shadow-[0_25px_70px_-45px_rgba(6,59,61,0.4)]
                backdrop-blur-sm
              "
              stagger={0.055}
            >
              {BODY_FEATURES.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <RevealItem key={feature.label}>
                    <motion.div
                      whileHover={{
                        x: 5,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: easeOut,
                      }}
                      className="
                        group relative
                        flex items-center
                        gap-4
                        border-b
                        border-[#063B3D]/[0.08]
                        px-5 py-4
                        last:border-b-0
                        sm:px-6 sm:py-[18px]
                      "
                    >
                      {/* Number */}
                      <span
                        className="
                          flex h-8 w-8 flex-none
                          items-center justify-center
                          rounded-full
                          bg-[#063B3D]/[0.055]
                          text-[9px]
                          font-bold
                          tracking-[0.08em]
                          text-[#063B3D]/65
                          transition-all
                          duration-300
                          group-hover:bg-teal-500/[0.10]
                          group-hover:text-teal-700
                        "
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Icon */}
                      <span
                        className="
                          flex h-9 w-9
                          flex-none items-center
                          justify-center
                          rounded-xl
                          border
                          border-teal-600/10
                          bg-teal-500/[0.045]
                          transition-all
                          duration-300
                          group-hover:border-teal-600/25
                          group-hover:bg-teal-500/[0.09]
                        "
                      >
                        <Icon
                          className="
                            h-[18px] w-[18px]
                            text-teal-700
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                          strokeWidth={1.5}
                        />
                      </span>

                      {/* Label */}
                      <span
                        className="
                          min-w-0 flex-1
                          text-[14px]
                          font-semibold
                          leading-snug
                          text-[#063B3D]
                          transition-colors
                          duration-300
                          sm:text-[15.5px]
                        "
                      >
                        {feature.label}
                      </span>

                      {/* Gold hover indicator */}
                      <span
                        className="
                          h-1.5 w-1.5
                          flex-none rounded-full
                          bg-gold-500/40
                          transition-all
                          duration-300
                          group-hover:h-2
                          group-hover:w-2
                          group-hover:bg-gold-500
                          group-hover:shadow-[0_0_10px_rgba(218,163,49,0.5)]
                        "
                      />

                      {/* Hover line */}
                      <span
                        className="
                          absolute bottom-0 left-5
                          h-[2px] w-0
                          bg-gradient-to-r
                          from-teal-600
                          to-gold-500
                          transition-all
                          duration-500
                          group-hover:w-16
                        "
                      />
                    </motion.div>
                  </RevealItem>
                )
              })}
            </RevealGroup>

            {/* Closing statement */}
            <Reveal delay={0.15}>
              <div
                className="
                  relative mt-8
                  overflow-hidden
                  rounded-[22px]
                  border border-gold-500/15
                  bg-gold-400/[0.055]
                  px-5 py-5
                  sm:px-6 sm:py-6
                "
              >
                <div
                  className="
                    pointer-events-none absolute
                    -right-8 -top-8
                    h-24 w-24
                    rounded-full
                    bg-gold-400/10
                    blur-2xl
                  "
                />

                <div className="relative flex items-start gap-4">
                  <span
                    className="
                      mt-0.5 flex h-8 w-8
                      flex-none items-center
                      justify-center
                      rounded-full
                      bg-gold-400/[0.12]
                      text-gold-700
                    "
                  >
                    <Sparkles
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </span>

                  <p
                    className="
                      max-w-lg
                      text-[14px]
                      font-medium
                      leading-7
                      text-[#063B3D]
                      sm:text-[15px]
                    "
                  >
                    Every feature has one purpose: to make the
                    time you spend in your chair more comfortable
                    and more personal.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}