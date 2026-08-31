import { useState, useEffect } from 'react'
import { MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react'
import { contact } from '../../lib/assets'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const HOURS = [
  { day: 'Sunday', hours: 'By Appointment', openTime: null, closeTime: null },
  { day: 'Monday', hours: '09:00 — 18:00', openTime: 9, closeTime: 18 },
  { day: 'Tuesday', hours: '09:00 — 18:00', openTime: 9, closeTime: 18 },
  { day: 'Wednesday', hours: '09:00 — 18:00', openTime: 9, closeTime: 18 },
  { day: 'Thursday', hours: '09:00 — 18:00', openTime: 9, closeTime: 18 },
  { day: 'Friday', hours: '09:00 — 17:00', openTime: 9, closeTime: 17 },
  { day: 'Saturday', hours: 'By Appointment', openTime: null, closeTime: null },
]

const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

export function BusinessHours() {
  const [isOpenNow, setIsOpenNow] = useState(false)
  const today = new Date().getDay()

  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()
    const todayData = HOURS[today]

    if (todayData.openTime !== null && todayData.closeTime !== null) {
      setIsOpenNow(
        currentHour >= todayData.openTime &&
        currentHour < todayData.closeTime
      )
    } else {
      setIsOpenNow(false)
    }
  }, [today])

  return (
    <section className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-24">
      <SectionAtmosphere variant="bloom" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">

          {/* Left Column: Business Hours Card */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center justify-between">
                <SectionLabel>Business Hours</SectionLabel>

                {/* Live Open Status Indicator */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider backdrop-blur-md transition-all duration-300 ${
                    isOpenNow
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                      : 'border-gold-700/20 bg-gold-400/5 text-gold-700'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                        isOpenNow ? 'bg-emerald-500' : 'bg-gold-700'
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        isOpenNow ? 'bg-emerald-500' : 'bg-gold-700'
                      }`}
                    />
                  </span>
                  {isOpenNow ? 'Open Right Now' : 'Closed Right Now'}
                </div>
              </div>
            </Reveal>

            {/* Hours List */}
            <RevealGroup className="mt-6 rounded-2xl border border-[#063B3D]/10 bg-white/40 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md sm:p-6">
              {DISPLAY_ORDER.map((index) => {
                const entry = HOURS[index]
                const isToday = index === today

                return (
                  <RevealItem key={entry.day}>
                    <div
                      className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 ${
                        isToday
                          ? 'bg-[#063B3D]/[0.06] shadow-inner'
                          : 'hover:bg-[#063B3D]/[0.03]'
                      }`}
                    >
                      {isToday && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gold-700" />
                      )}

                      <div className="flex items-center gap-2.5">
                        <Clock
                          className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                            isToday
                              ? 'text-gold-700'
                              : 'text-ink-700/40 group-hover:text-[#063B3D]'
                          }`}
                        />

                        <span
                          className={`text-[14px] transition-colors duration-200 ${
                            isToday
                              ? 'font-semibold text-[#063B3D]'
                              : 'text-ink-700 group-hover:text-[#063B3D]'
                          }`}
                        >
                          {entry.day}
                        </span>

                        {isToday && (
                          <span className="ml-1.5 rounded bg-gold-700/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-700">
                            Today
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[14px] font-mono tracking-tight transition-colors duration-200 ${
                          isToday
                            ? 'font-medium text-[#063B3D]'
                            : 'text-ink-700/80 group-hover:text-[#063B3D]'
                        }`}
                      >
                        {entry.hours}
                      </span>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          {/* Right Column: Studio Information Card */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionLabel>The Studio</SectionLabel>

              <div className="group relative mt-6 overflow-hidden rounded-2xl border border-[#063B3D]/10 bg-white/40 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#063B3D]/20 hover:shadow-lg sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gold-700/10 text-gold-700 transition-colors duration-300 group-hover:bg-gold-700 group-hover:text-white">
                    <MapPin className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <div>
                    <h4 className="text-[16px] font-semibold text-[#063B3D]">
                      Headquarters
                    </h4>

                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#063B3D]/80">
                      {contact.address}
                    </p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn mt-5 inline-flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-widest text-[#063B3D] transition-colors duration-300 hover:text-gold-700"
                    >
                      <span>Get Directions</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Studio Callout Box */}
                <div className="mt-8 border-t border-[#063B3D]/10 pt-6">
                  <div className="flex items-start gap-3 rounded-xl bg-[#063B3D]/5 p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-none text-gold-700" />

                    <p className="text-[13.5px] leading-relaxed text-ink-700">
                      Experience our intelligent climate technology in person,
                      with studio visits available strictly by appointment.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
