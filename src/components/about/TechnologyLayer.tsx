import { ArrowRight, Layers, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const FURNITURE_STEPS = ['Sit', 'Recline', 'Relax']
const TECH_STEPS = ['Cool', 'Heat', 'Adjust', 'Personalize']

function StepRow({
  steps,
  tone,
}: {
  steps: string[]
  tone: 'teal' | 'gold'
}) {
  const isTeal = tone === 'teal'

  return (
    <div
      className="
        grid w-full grid-cols-1 gap-3
        sm:flex sm:flex-wrap sm:items-center sm:gap-4
        lg:gap-5
      "
    >
      {steps.map((step, i) => (
        <div
          key={step}
          className="flex items-center gap-3 sm:gap-4 lg:gap-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
              margin: '0px 0px -60px 0px',
            }}
            transition={{
              duration: 0.55,
              delay: i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className={`
              group relative flex min-h-[68px] flex-1
              items-center overflow-hidden rounded-2xl border
              px-5 py-4
              transition-all duration-300
              sm:min-h-[84px] sm:flex-none sm:px-6 sm:py-5
              lg:min-w-[150px]
              ${isTeal
                ? `
                    border-[#063B3D]/10
                    bg-white/75
                    shadow-[0_16px_45px_-30px_rgba(6,59,61,0.55)]
                    hover:border-teal-600/35
                    hover:bg-white
                    hover:shadow-[0_24px_55px_-28px_rgba(6,155,154,0.35)]
                  `
                : `
                    border-gold-500/20
                    bg-[#FFF9EA]/80
                    shadow-[0_16px_45px_-30px_rgba(138,99,20,0.35)]
                    hover:border-gold-500/45
                    hover:bg-[#FFFDF7]
                    hover:shadow-[0_24px_55px_-28px_rgba(218,163,49,0.38)]
                  `
              }
            `}
          >
            {/* Soft decorative glow */}
            <span
              className={`
                pointer-events-none absolute -right-8 -top-8
                h-24 w-24 rounded-full blur-2xl
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100
                ${isTeal
                  ? 'bg-teal-500/15'
                  : 'bg-gold-400/20'
                }
              `}
            />

            {/* Step number */}
            <span
              className={`
                relative mr-3 flex h-8 w-8 flex-none
                items-center justify-center rounded-full
                text-[9px] font-bold tracking-[0.08em]
                sm:mr-3.5
                ${isTeal
                  ? 'bg-[#063B3D]/[0.07] text-[#063B3D]'
                  : 'bg-gold-500/[0.10] text-gold-700'
                }
              `}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Step title */}
            <span
              className={`
                relative font-display text-[25px]
                font-medium leading-none
                tracking-[-0.02em]
                sm:text-[29px]
                lg:text-[31px]
                ${isTeal
                  ? 'text-[#063B3D]'
                  : 'text-[#8A6314]'
                }
              `}
            >
              {step}
            </span>

            {/* Hover accent */}
            <span
              className={`
                absolute inset-x-5 bottom-0 h-[2px]
                origin-left scale-x-0
                transition-transform duration-500
                group-hover:scale-x-100
                ${isTeal
                  ? 'bg-teal-600'
                  : 'bg-gold-500'
                }
              `}
            />
          </motion.div>

          {/* Arrow */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.09 + 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden flex-none sm:block"
            >
              <ArrowRight
                className={`
                  h-5 w-5
                  ${isTeal
                    ? 'text-teal-600/50'
                    : 'text-gold-600/60'
                  }
                `}
                strokeWidth={1.5}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

function LayerConnector() {
  return (
    <div className="relative my-10 flex items-center sm:my-12">
      <div
        className="
          h-px flex-1
          bg-gradient-to-r
          from-transparent
          via-[#063B3D]/15
          to-[#063B3D]/15
        "
      />

      <motion.div
        initial={{
          scale: 0.75,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          mx-4 flex h-11 w-11 flex-none
          items-center justify-center rounded-full
          border border-[#063B3D]/10
          bg-white/80
          shadow-[0_10px_30px_-16px_rgba(6,59,61,0.4)]
          backdrop-blur-sm
        "
      >
        <Layers
          className="h-4 w-4 text-teal-700"
          strokeWidth={1.5}
        />
      </motion.div>

      <div
        className="
          h-px flex-1
          bg-gradient-to-l
          from-transparent
          via-[#063B3D]/15
          to-[#063B3D]/15
        "
      />
    </div>
  )
}

export function TechnologyLayer() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-transparent
        py-20
        sm:py-28
        lg:py-32
      "
    >
      {/* Ambient background */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2
          h-[520px] w-[520px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-teal-500/[0.045]
          blur-[100px]
        "
      />

      <div
        className="
          relative z-10 mx-auto max-w-6xl
          px-5 sm:px-6 lg:px-8
        "
      >
        {/* =====================================================
            INTRODUCTION
        ====================================================== */}
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex h-9 w-9 flex-none
                  items-center justify-center
                  rounded-full
                  border border-gold-500/25
                  bg-gold-400/[0.08]
                "
              >
                <Sparkles
                  className="h-4 w-4 text-gold-600"
                  strokeWidth={1.5}
                />
              </span>

              <SectionLabel>
                Technology Without Losing the Furniture
              </SectionLabel>
            </div>

            <h2
              className="
                mt-6 max-w-2xl
                font-display
                text-[34px]
                font-medium
                leading-[1.05]
                tracking-[-0.025em]
                text-[#063B3D]
                sm:text-[46px]
                lg:text-[54px]
              "
            >
              Technology should{' '}
              <span className="italic font-normal text-teal-700">
                improve
              </span>{' '}
              the experience.
            </h2>

            <p
              className="
                mt-6 max-w-xl
                text-[15px]
                font-medium
                leading-7
                text-ink-700
                sm:text-[16px]
              "
            >
              A ClimateCraft recliner is still designed to look,
              feel and function like premium furniture. The
              water-based liquid pad technology is integrated into
              the product itself, rather than treated as something
              separate.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            MAIN EXPERIENCE PANEL
        ====================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative mt-14 overflow-hidden
            rounded-[28px]
            border border-[#063B3D]/10
            bg-white/50
            p-5
            shadow-[0_35px_90px_-55px_rgba(6,59,61,0.45)]
            backdrop-blur-sm
            sm:mt-16 sm:p-8
            lg:mt-20 lg:p-10
          "
        >
          {/* Top decorative line */}
          <div
            className="
              pointer-events-none absolute inset-x-8 top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-teal-600/40
              to-transparent
            "
          />

          {/* =================================================
              FURNITURE LAYER
          ================================================== */}
          <div>
            <div
              className="
                mb-5 flex items-start
                justify-between gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-ink-500
                  "
                >
                  The familiar experience
                </p>

                <p
                  className="
                    mt-1
                    text-[13px]
                    font-medium
                    text-[#063B3D]/70
                  "
                >
                  Premium furniture, first.
                </p>
              </div>

              <span
                className="
                  hidden rounded-full
                  border border-[#063B3D]/10
                  bg-white/70
                  px-3 py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#063B3D]/60
                  sm:block
                "
              >
                Furniture Layer
              </span>
            </div>

            <StepRow
              steps={FURNITURE_STEPS}
              tone="teal"
            />
          </div>

          {/* =================================================
              LAYER CONNECTOR
          ================================================== */}
          <LayerConnector />

          {/* =================================================
              TECHNOLOGY LAYER
          ================================================== */}
          <div>
            <div
              className="
                mb-5 flex items-start
                justify-between gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-ink-500
                  "
                >
                  The additional layer
                </p>

                <p
                  className="
                    mt-1
                    text-[13px]
                    font-medium
                    text-[#8A6314]/80
                  "
                >
                  Personal control, built in.
                </p>
              </div>

              <span
                className="
                  hidden rounded-full
                  border border-gold-500/20
                  bg-gold-400/[0.07]
                  px-3 py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-gold-700/80
                  sm:block
                "
              >
                Technology Layer
              </span>
            </div>

            {/* IMPORTANT:
                These items are intentionally rendered
                directly instead of using nested RevealGroup /
                RevealItem components. This prevents them from
                remaining invisible due to nested viewport
                animation state.
            */}
            <StepRow
              steps={TECH_STEPS}
              tone="gold"
            />
          </div>
        </motion.div>

        {/* =====================================================
            CLOSING STATEMENT
        ====================================================== */}
        <Reveal delay={0.18}>
          <div className="mt-12 text-center sm:mt-16">
            <div
              className="
                mx-auto flex max-w-2xl
                flex-col items-center
              "
            >
              <span
                className="
                  mb-5 h-px w-12
                  bg-gradient-to-r
                  from-transparent
                  via-gold-500/60
                  to-transparent
                "
              />

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-ink-500
                "
              >
                One experience. Two layers.
              </p>

              <h3
                className="
                  mt-4
                  font-display
                  text-[25px]
                  font-normal
                  leading-tight
                  tracking-[-0.015em]
                  text-[#063B3D]
                  sm:text-[32px]
                "
              >
                Sit. Recline. Relax.
                <span
                  className="
                    mx-2
                    italic
                    text-teal-700
                  "
                >
                  Then
                </span>
                personalize.
              </h3>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}