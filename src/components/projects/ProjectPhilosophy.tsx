import { Home, MonitorPlay, Armchair, Wind } from 'lucide-react'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const SPACE_NEEDS = [
  {
    title: 'A private residence',
    copy: 'may prioritise quiet relaxation — a seat that disappears into the room, supporting rest without drawing attention.',
    icon: Home,
  },
  {
    title: 'A media environment',
    copy: 'may require comfort that adapts over long sessions — motorised reclining that changes position without interrupting what is on screen.',
    icon: MonitorPlay,
  },
  {
    title: 'A formal lounge',
    copy: 'may need a stronger visual presence — furniture that holds its own against architecture and art, comfort through form rather than movement.',
    icon: Armchair,
  },
  {
    title: 'A personal retreat',
    copy: 'may demand climate control as part of the experience — liquid cooling and heating that responds to how the body actually settles in a space.',
    icon: Wind,
  },
]

export function ProjectPhilosophy() {
  return (
    <section className="relative bg-transparent py-20 sm:py-28 lg:py-36">
      <SectionAtmosphere variant="bloom" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Approach</SectionLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl lg:text-[3rem]">
            Every space asks for a different kind of{' '}
            <span className="italic text-teal-700">comfort.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-cream-200 sm:text-[17px]">
            Climate Craft approaches each environment by considering how people actually sit, move, relax
            and interact with the space around them — not by applying a single solution to every room.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {SPACE_NEEDS.map((need, i) => {
            const Icon = need.icon
            return (
              <RevealItem key={need.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-teal-700/25 hover:bg-white/65 hover:shadow-[0_30px_60px_-24px_rgba(6,59,61,0.28)]">
                  {/* Soft glow that blooms in on hover, anchored behind the icon */}
                  <div
                    className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-60"
                    style={{ background: 'radial-gradient(circle, rgba(22,155,154,0.35) 0%, transparent 72%)' }}
                  />

                  {/* Faint index number, watermark-style, top-right */}
                  <span className="pointer-events-none absolute right-5 top-4 font-display text-3xl italic text-ink-900/[0.06] transition-colors duration-500 group-hover:text-teal-700/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-700/20 bg-white/70 text-teal-700 shadow-[0_8px_20px_-10px_rgba(6,59,61,0.2)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-teal-700/40 group-hover:bg-teal-700 group-hover:text-white group-hover:shadow-[0_14px_28px_-10px_rgba(22,155,154,0.5)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>

                    <h3 className="mt-5 font-display text-lg text-[#063B3D] transition-colors duration-300 group-hover:text-teal-800">
                      {need.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-ink-700">{need.copy}</p>

                    <span className="mt-5 block h-px w-6 bg-gold-400/40 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-gold-400" />
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}