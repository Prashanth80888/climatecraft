import { motion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FACTORS = [
  {
    number: '01',
    title: 'Comfort',
    question: 'Does the product actually feel better to use?',
  },
  {
    number: '02',
    title: 'Control',
    question: 'Can the user easily adjust the experience?',
  },
  {
    number: '03',
    title: 'Design',
    question:
      'Can technology be integrated without compromising the appearance of premium furniture?',
  },
  {
    number: '04',
    title: 'Reliability',
    question:
      'Can the product deliver a consistent experience over time?',
  },
  {
    number: '05',
    title: 'Usability',
    question:
      'Can someone understand and operate the product without unnecessary complexity?',
  },
]

export function AboutProcess() {
  return (
    <section
      id="process"
      className="relative bg-transparent py-20 sm:py-28 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          {/* Highlighted centered section label — same style as previous sections */}
          <div className="flex w-full justify-center">
            <div className="inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap rounded-full border border-gold-500/30 bg-gold-400/[0.10] px-5 py-2.5 text-center shadow-[0_10px_30px_-18px_rgba(6,59,61,0.45)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 sm:text-[13px] lg:text-[14px]">
                Our Approach to Product Development
              </span>
            </div>
          </div>

          <h2 className="mt-5 text-center font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[#063B3D] sm:text-[2.75rem]">
            Innovation should{' '}
            <span className="italic font-normal text-teal-700">
              solve a real problem.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-relaxed text-ink-700">
            That means we focus on the complete experience rather than adding
            technology simply because it is possible. We consider:
          </p>
        </Reveal>

        <RevealGroup className="mt-14 border-t border-[#063B3D]/12 sm:mt-16">
          {FACTORS.map((factor) => (
            <RevealItem key={factor.number}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-[#063B3D]/12 py-7 sm:grid-cols-[6rem_auto_1fr] sm:gap-8 sm:py-9"
              >
                <motion.span
                  variants={{
                    rest: { color: 'rgba(6,59,61,0.22)' },
                    hover: { color: 'rgba(201,168,78,1)' },
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-3xl font-bold tabular-nums sm:text-5xl"
                >
                  {factor.number}
                </motion.span>

                <motion.h3
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 6 },
                  }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  className="font-display text-2xl font-semibold text-[#063B3D] sm:text-[1.75rem]"
                >
                  {factor.title}
                </motion.h3>

                <div className="col-span-2 sm:col-span-1">
                  <p className="max-w-md text-[15.5px] leading-relaxed text-ink-700 sm:text-[16px]">
                    {factor.question}
                  </p>

                  <motion.span
                    variants={{
                      rest: { width: 24 },
                      hover: { width: 56 },
                    }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="mt-3 block h-px bg-gold-500"
                  />
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-lg text-center text-[15px] font-medium leading-relaxed text-[#063B3D] sm:text-[16px]">
            This approach guides how we think about every ClimateCraft product.
          </p>
        </Reveal>
      </div>
    </section>
  )
}