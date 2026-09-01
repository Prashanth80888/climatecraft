import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles, Thermometer, Mic, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADLINE = ['Crafting climate.', 'Engineered luxury.']

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pb-16 pt-36 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48">
      <SectionAtmosphere variant="bloom" />

      {/* Layered Ambient Light & Glow Effects */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[520px] w-[900px] -translate-x-1/2 opacity-[0.5] blur-[150px]"
        style={{ background: 'radial-gradient(ellipse, #169B9A 0%, #063B3D 45%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[400px] w-[400px] opacity-[0.22] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div className="grain-overlay opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Atelier Badge Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-white/60 bg-white/80 px-4 py-1.5 shadow-[0_10px_30px_-10px_rgba(6,59,61,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-gold-400/50 hover:bg-white"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-600 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#063B3D]">
              The Atelier · Climate Craft Innovation
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.03] tracking-tight text-[#063B3D] sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl lg:text-[4.75rem]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: easeOut }}
                  className={`block ${i === 1 ? 'italic text-teal-700 font-normal drop-shadow-xs' : ''}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Core Subtitles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: easeOut }}
            className="mt-6 space-y-3 rounded-2xl border border-white/40 bg-white/30 p-4 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(6,59,61,0.08)] sm:mt-8 sm:space-y-4 sm:rounded-3xl sm:p-6"
          >
            <p className="max-w-xl text-[14px] font-medium leading-relaxed text-[#063B3D]/90 sm:text-[16.5px] lg:text-[18px]">
              Bespoke motion furniture powered by intelligent climate regulation and active thermal dynamics — designed around the purest mechanics of personal comfort.
            </p>
            <p className="max-w-xl text-[13px] font-normal leading-relaxed text-ink-700 sm:text-[14.5px]">
              Climate Craft engineers motorized climate recliners, thermal sofas, and modular seating, seamlessly integrating heating, liquid cooling, and voice control into hand-upholstered artistry.
            </p>
          </motion.div>

          {/* Smart Feature Pills with Floating Micro-Animations */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
            className="mt-6 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md sm:rounded-2xl sm:gap-2.5 sm:px-4 sm:py-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold-500/15">
                <Thermometer className="h-3.5 w-3.5 text-gold-600" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#063B3D]">
                Liquid Cooling & Heating
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md sm:rounded-2xl sm:gap-2.5 sm:px-4 sm:py-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/15">
                <Mic className="h-3.5 w-3.5 text-teal-700" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#063B3D]">
                Voice Automation
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md sm:rounded-2xl sm:gap-2.5 sm:px-4 sm:py-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#063B3D]/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#063B3D]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#063B3D]">
                Patented Technology
              </span>
            </motion.div>
          </motion.div>

          {/* Luxury Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: easeOut }}
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5"
          >
            {/* Primary Action Button */}
            <motion.a
              href="#process"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#063B3D] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_-15px_rgba(6,59,61,0.4)] transition-all duration-300 hover:bg-[#169B9A] hover:shadow-[0_25px_50px_-12px_rgba(22,155,154,0.5)] sm:px-8 sm:py-4 sm:text-xs"
            >
              {/* Subtle Light Flare on Hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative z-10">Explore Our Process</span>
              <ArrowDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </motion.a>

            {/* Secondary Action Button */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <Link
                to="/collections"
                className="group inline-flex items-center gap-3 rounded-full border border-[#063B3D]/25 bg-white/80 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#063B3D] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-gold-500 hover:bg-[#063B3D] hover:text-white hover:shadow-[0_20px_40px_-15px_rgba(6,59,61,0.3)] sm:px-8 sm:py-4 sm:text-xs sm:gap-3.5"
              >
                <span>View Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Meta Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25, ease: easeOut }}
          className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[#063B3D]/15 pt-5 sm:mt-20 sm:gap-4 sm:pt-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#063B3D]/80">
              Est. 2009 · Bengaluru Karnataka
            </span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
            Handcrafted Engineering
          </span>
        </motion.div>
      </div>
    </section>
  )
}