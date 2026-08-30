import { motion } from 'framer-motion'
import { PROJECT_PROCESS_STEPS } from '../../data/projects'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ProjectProcess() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-36"
    >
      <SectionAtmosphere variant="wave" />

      {/* Ambient atmosphere */}
      <div
        className="pointer-events-none absolute -right-40 top-[18%] h-[620px] w-[620px] rounded-full opacity-[0.12] blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, #169B9A 0%, rgba(22,155,154,0.35) 35%, transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-[5%] h-[500px] w-[500px] rounded-full opacity-[0.08] blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, #f0a92c 0%, rgba(240,169,44,0.25) 35%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400" />

              <SectionLabel>Our Process</SectionLabel>

              <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-3xl font-normal leading-[1.08] text-cream-100 sm:text-4xl lg:text-[3.35rem]">
              From room to experience.
              <br />
              <span className="italic text-teal-700">Step by step.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-cream-200 sm:text-[16px]">
              Every Climate Craft project follows a deliberate path — understanding
              the space, configuring the technology, and delivering comfort that
              feels inevitable.
            </p>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* DESKTOP PROCESS                                                   */}
        {/* ---------------------------------------------------------------- */}

        <RevealGroup
          className="mt-16 hidden lg:block xl:mt-24"
          stagger={0.1}
        >
          <div className="relative">
            {/* Timeline background */}
            <div className="absolute left-[8%] right-[8%] top-[39px] h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-[#063B3D]/20 to-transparent" />

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: easeOut }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-gold-400/30 via-teal-700/50 to-gold-400/20"
              />
            </div>

            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: `repeat(${PROJECT_PROCESS_STEPS.length}, minmax(0, 1fr))`,
              }}
            >
              {PROJECT_PROCESS_STEPS.map((step, index) => (
                <RevealItem key={step.number}>
                  <ProcessStepDesktop step={step} index={index} />
                </RevealItem>
              ))}
            </div>
          </div>
        </RevealGroup>

        {/* ---------------------------------------------------------------- */}
        {/* MOBILE / TABLET                                                  */}
        {/* ---------------------------------------------------------------- */}

        <RevealGroup
          className="mx-auto mt-12 max-w-2xl lg:hidden"
          stagger={0.08}
        >
          <div className="relative">
            {PROJECT_PROCESS_STEPS.map((step, index) => (
              <RevealItem key={step.number}>
                <ProcessStepMobile
                  step={step}
                  index={index}
                  isLast={index === PROJECT_PROCESS_STEPS.length - 1}
                />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM STATEMENT                                                  */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl sm:mt-14 lg:mt-20">
            <div className="relative overflow-hidden rounded-[24px] border border-white/30 bg-white/[0.12] px-6 py-5 text-center backdrop-blur-xl sm:px-8 sm:py-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-700/[0.04] via-transparent to-gold-400/[0.04]" />

              <p className="relative text-[12px] uppercase tracking-[0.2em] text-cream-200/70">
                A considered process
                <span className="mx-3 text-gold-400">•</span>
                A considered result
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ========================================================================== */
/* DESKTOP STEP                                                               */
/* ========================================================================== */

function ProcessStepDesktop({
  step,
  index,
}: {
  step: (typeof PROJECT_PROCESS_STEPS)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: easeOut,
      }}
      className="group relative flex h-full min-w-0 flex-col items-center text-center"
    >
      {/* Timeline node */}
      <motion.div
        whileHover={{
          scale: 1.08,
          y: -3,
        }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="relative z-20 flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/60 bg-white/70 shadow-[0_15px_45px_-22px_rgba(6,61,60,0.45)] backdrop-blur-xl transition-all duration-500 group-hover:border-teal-700/60 group-hover:bg-white group-hover:shadow-[0_20px_55px_-22px_rgba(22,155,154,0.45)]"
      >
        {/* Outer decorative ring */}
        <span className="absolute inset-[5px] rounded-full border border-gold-400/20 transition-all duration-500 group-hover:inset-[3px] group-hover:border-gold-400/50" />

        {/* Number */}
        <span className="relative z-10 font-display text-lg text-gold-700 transition-colors duration-500 group-hover:text-teal-700">
          {step.number}
        </span>

        {/* Active dot */}
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 scale-0 rounded-full bg-gold-400 shadow-[0_0_14px_rgba(240,169,44,0.65)] transition-transform duration-500 group-hover:scale-100" />
      </motion.div>

      {/* Step card */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="relative mt-7 flex min-h-[250px] w-full flex-1 flex-col rounded-[22px] overflow-hidden border border-white/35 bg-white/[0.13] px-5 py-6 backdrop-blur-xl transition-all duration-500 group-hover:border-white/65 group-hover:bg-white/[0.22] group-hover:shadow-[0_25px_60px_-28px_rgba(6,61,60,0.38)]"
      >
        {/* Top glow */}
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-teal-700/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <h3 className="font-display text-[17px] leading-snug text-cream-100 transition-colors duration-300 group-hover:text-teal-700">
          {step.title}
        </h3>

        {/* Gold divider */}
        <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
          <span className="h-px w-3 bg-gold-400/40 transition-all duration-500 group-hover:w-5" />
          <span className="h-1 w-1 rounded-full bg-gold-400 transition-transform duration-500 group-hover:scale-125" />
          <span className="h-px w-3 bg-gold-400/40 transition-all duration-500 group-hover:w-5" />
        </div>

        <p className="mx-auto mt-4 flex-1 max-w-[15rem] text-[12.5px] leading-[1.7] text-cream-200/90">
          {step.description}
        </p>

        {/* Bottom hover indicator */}
        <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-700 to-transparent transition-all duration-500 group-hover:w-16" />
      </motion.div>
    </motion.div>
  )
}

/* ========================================================================== */
/* MOBILE / TABLET STEP                                                       */
/* ========================================================================== */

function ProcessStepMobile({
  step,
  index,
  isLast,
}: {
  step: (typeof PROJECT_PROCESS_STEPS)[0]
  index: number
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: easeOut,
      }}
      className="group relative flex gap-4 pb-7 sm:gap-5 sm:pb-9"
    >
      {/* Connector */}
      {!isLast && (
        <div className="absolute bottom-0 left-[25px] top-[58px] w-px">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: index * 0.07,
              ease: easeOut,
            }}
            className="h-full origin-top bg-gradient-to-b from-teal-700/35 via-[#063B3D]/15 to-transparent"
          />
        </div>
      )}

      {/* Number */}
      <motion.div
        whileHover={{ scale: 1.06, x: 2 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="relative z-10 flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border border-white/60 bg-white/75 font-display text-base text-gold-700 shadow-[0_12px_32px_-18px_rgba(6,61,60,0.4)] backdrop-blur-xl transition-all duration-500 group-hover:border-teal-700/50 group-hover:bg-white group-hover:text-teal-700"
      >
        <span className="absolute inset-[4px] rounded-full border border-gold-400/20 transition-all duration-500 group-hover:inset-[3px] group-hover:border-gold-400/45" />

        <span className="relative z-10">
          {step.number}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="relative min-w-0 flex-1 overflow-hidden rounded-[20px] border border-white/35 bg-white/[0.13] px-5 py-5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/65 group-hover:bg-white/[0.22] group-hover:shadow-[0_20px_50px_-25px_rgba(6,61,60,0.35)] sm:px-6 sm:py-6"
      >
        <span className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold-400/50 via-teal-700/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <h3 className="font-display text-lg text-cream-100 transition-colors duration-300 group-hover:text-teal-700 sm:text-xl">
          {step.title}
        </h3>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-px w-5 bg-gold-400/50 transition-all duration-500 group-hover:w-8" />
          <span className="h-1 w-1 rounded-full bg-gold-400" />
        </div>

        <p className="mt-3 text-[14px] leading-[1.7] text-cream-200/90 sm:text-[15px]">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  )
}