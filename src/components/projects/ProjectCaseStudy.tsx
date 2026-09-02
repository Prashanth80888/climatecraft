
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ElementType, ReactNode } from 'react'
import {
  MapPin,
  Users,
  Home,
  Clock,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { ProjectCaseStudy } from '../../data/projects'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectCaseStudyProps {
  project: ProjectCaseStudy
  index: number
}

export function ProjectCaseStudy({
  project,
  index,
}: ProjectCaseStudyProps) {
  const isEven = index % 2 === 0
  const prefersReducedMotion = useReducedMotion()

  const firstProjectRoutes = [
    '/products/craft-motion',
    '/products/craft-classic',
    '/products/craft-classic-duo',
  ]

  const projectImageRoute =
    index === 0
      ? '/products/craft-motion'
      : index === 1
        ? '/products/craft-classic'
        : index === 2
          ? '/products/craft-classic-duo'
          : undefined

  return (
    <section
      id={`project-${project.id}`}
      className="
        relative
        overflow-hidden
        bg-transparent
        py-20
        sm:py-28
        lg:py-32
      "
    >
      {/* ================================================================
          AMBIENT BACKGROUND WITH CONTINUOUS FLOATING ANIMATION
      ================================================================= */}

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
              x: [0, 20, 0],
              y: [0, -20, 0],
              scale: [1, 1.08, 1],
            }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          pointer-events-none
          absolute
          right-[-8%]
          top-[8%]
          h-[520px]
          w-[520px]
          rounded-full
          opacity-[0.15]
          blur-[150px]
        "
        style={{
          background: isEven
            ? 'radial-gradient(circle, #53c9c5 0%, transparent 68%)'
            : 'radial-gradient(circle, #f0a92c 0%, transparent 68%)',
        }}
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
              x: [0, -25, 0],
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          pointer-events-none
          absolute
          left-[-12%]
          bottom-[15%]
          h-[380px]
          w-[380px]
          rounded-full
          opacity-[0.1]
          blur-[130px]
        "
        style={{
          background:
            'radial-gradient(circle, #169B9A 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================================================================
            PROJECT HEADER
        ================================================================= */}

        <div className="max-w-5xl">

          <Reveal delay={0.02}>
            <div className="flex flex-wrap items-center gap-2.5">

              <motion.div
                whileHover={{
                  y: -3,
                  scale: 1.03,
                  boxShadow: '0 10px 20px -5px rgba(240, 169, 44, 0.25)',
                }}
                transition={{ duration: 0.25 }}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-gold-400/40
                  bg-gold-400/10
                  px-3.5
                  py-1.5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-gold-700
                  backdrop-blur-md
                  transition-colors
                  hover:border-gold-400/60
                  hover:bg-gold-400/20
                "
              >
                <span className="font-display">
                  {project.number}
                </span>

                <span className="opacity-50">
                  / 03
                </span>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  boxShadow: '0 10px 20px -5px rgba(6, 59, 61, 0.15)',
                }}
                transition={{ duration: 0.25 }}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#063B3D]/20
                  bg-white/50
                  px-3.5
                  py-1.5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#063B3D]
                  backdrop-blur-md
                  transition-colors
                  hover:border-[#063B3D]/30
                  hover:bg-[#063B3D]/10
                "
              >
                {project.category}
              </motion.div>

            </div>
          </Reveal>

          <Reveal delay={0.08} y={20}>
            <h2
              className="
                mt-6
                max-w-4xl
                font-display
                text-4xl
                font-normal
                leading-[1.05]
                tracking-[-0.015em]
                text-cream-100
                transition-colors
                duration-300
                hover:text-gold-400
                sm:text-5xl
                lg:text-[3.6rem]
              "
            >
              {project.title}
            </h2>
          </Reveal>

          {/* ============================================================
              META STRIP
          ============================================================ */}

          <Reveal
            delay={0.14}
            className="mt-9"
          >
            <div
              className="
                grid
                grid-cols-2
                overflow-hidden
                rounded-[22px]
                border
                border-white/60
                bg-white/40
                shadow-[0_25px_70px_-35px_rgba(6,59,61,0.32)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-[#063B3D]/20
                hover:shadow-[0_30px_80px_-25px_rgba(6,59,61,0.42)]
                sm:grid-cols-4
              "
            >
              <MetaItem
                icon={MapPin}
                label="Location"
                value={project.location}
              />

              <MetaItem
                icon={Home}
                label="Property"
                value={project.propertyType}
              />

              <MetaItem
                icon={Users}
                label="Users"
                value={project.users}
              />

              <MetaItem
                icon={Clock}
                label="Project Type"
                value={project.projectType}
              />
            </div>
          </Reveal>
        </div>

        {/* ================================================================
            MAIN PROJECT CONTENT
        ================================================================= */}

        <RevealGroup
          className="
            mt-14
            lg:mt-20
          "
          stagger={0.08}
        >

          {/* ============================================================
              TOP STORY — TEXT LEFT / IMAGES RIGHT
          ============================================================ */}

          <div
            className="
              grid
              grid-cols-1
              gap-12
              lg:grid-cols-12
              lg:items-start
              lg:gap-14
              xl:gap-16
            "
          >

            {/* LEFT — TEXT */}

            <RevealItem
              className={`
                lg:col-span-5
                ${!isEven ? 'lg:order-2' : ''}
              `}
            >
              <div className="space-y-12 lg:space-y-14">

                {/* CHALLENGE */}

                <InfoBlock
                  number="01"
                  label="The Challenge"
                  title="What the space needed"
                >
                  <p className="text-[15px] leading-[1.85] tracking-[0.005em] text-cream-200/90 sm:text-[16px] sm:leading-[1.8]">
                    {project.challenge}
                  </p>
                </InfoBlock>

                {/* REQUIREMENTS */}

                <InfoBlock
                  number="02"
                  label="Requirements"
                >
                  <ul className="mt-5 space-y-3.5">
                    {project.requirements.map((req, i) => (
                      <motion.li
                        key={i}
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                              opacity: 0,
                              x: -12,
                            }
                        }
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.3,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.06,
                          ease: easeOut,
                        }}
                        whileHover={{
                          x: 6,
                        }}
                        className="
                          group
                          flex
                          items-start
                          gap-3.5
                          rounded-xl
                          p-1.5
                          transition-all
                          duration-300
                          hover:bg-[#063B3D]/10
                        "
                      >
                        <span
                          className="
                            mt-1
                            flex
                            h-5
                            w-5
                            flex-none
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-teal-700/30
                            bg-teal-700/10
                            transition-all
                            duration-300
                            group-hover:scale-110
                            group-hover:border-teal-700/60
                            group-hover:bg-teal-700/25
                          "
                        >
                          <Check className="h-3 w-3 text-teal-700" />
                        </span>

                        <span
                          className="
                            text-[14px]
                            leading-[1.72]
                            text-cream-200/90
                            transition-colors
                            duration-300
                            group-hover:text-cream-100
                          "
                        >
                          {req}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </InfoBlock>

                {/* EXISTING EQUIPMENT */}

                {project.existingEquipment &&
                  project.existingEquipment.length > 0 && (
                    <InfoBlock
                      number="05"
                      label="Existing Equipment"
                    >
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {project.existingEquipment.map((item, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{
                              y: -3,
                              scale: 1.04,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              border
                              border-white/60
                              bg-white/40
                              px-3.5
                              py-2
                              text-[11px]
                              leading-none
                              text-cream-200
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:border-teal-700/40
                              hover:bg-white/70
                              hover:text-cream-100
                              hover:shadow-md
                            "
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-700 animate-pulse" />
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </InfoBlock>
                  )}
              </div>
            </RevealItem>

            {/* RIGHT — IMAGE STORY */}

            <RevealItem
              className={`
                lg:col-span-7
                ${isEven ? 'lg:order-2' : ''}
              `}
            >
              <div className="space-y-6">

                {/* HERO IMAGE */}

                <RevealItem>
                  <ProjectImage
                    src={project.images.hero}
                    alt={`${project.title} - main view`}
                    label="Project"
                    eager={index === 0}
                    large
                    to={projectImageRoute}
                  />
                </RevealItem>

                {/* SUPPORTING IMAGES */}

                <RevealItem>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <ProjectImage
                      src={project.images.environment}
                      alt={`${project.title} - environment view`}
                      label="Environment"
                      showLabel={false}
                      to={projectImageRoute}
                    />

                    <ProjectImage
                      src={project.images.detail}
                      alt={`${project.title} - detail view`}
                      label="Detail"
                      showLabel={false}
                      to={projectImageRoute}
                    />

                  </div>
                </RevealItem>

              </div>
            </RevealItem>
          </div>

          {/* ============================================================
              FULL-WIDTH LOWER STORY
          ============================================================ */}

          <RevealItem className="mt-20 lg:mt-28">
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/50
                bg-white/[0.09]
                px-6
                py-10
                shadow-[0_30px_90px_-55px_rgba(6,59,61,0.38)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-white/70
                sm:px-8
                sm:py-12
                lg:px-12
                lg:py-14
              "
            >

              {/* Decorative background movement */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-32
                  -top-32
                  h-72
                  w-72
                  rounded-full
                  bg-teal-700/[0.08]
                  blur-3xl
                "
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                      x: [0, 20, 0],
                      y: [0, 14, 0],
                      scale: [1, 1.08, 1],
                    }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-36
                  left-1/3
                  h-64
                  w-64
                  rounded-full
                  bg-gold-400/[0.07]
                  blur-3xl
                "
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                      x: [0, -18, 0],
                      y: [0, -12, 0],
                    }
                }
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10">

                {/* SOLUTION */}

                <div className="grid gap-8 lg:grid-cols-[0.28fr_1fr] lg:gap-14">
                  <InfoBlock
                    number="03"
                    label="The Solution"
                    title="What Climate Craft delivered"
                  >
                    <div className="hidden lg:block" />
                  </InfoBlock>

                  <div className="lg:pt-8">
                    <p className="max-w-5xl text-[16px] leading-[1.9] tracking-[0.005em] text-cream-200/90 sm:text-[17px] sm:leading-[1.85]">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="my-12 h-px bg-[#063B3D]/10 lg:my-14" />

                {/* INSTALLED CONFIGURATION */}

                <InfoBlock
                  number="04"
                  label="Installed Configuration"
                >
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.installedSeating.map((seat, seatIndex) => {

                      const productRoute =
                        index === 0 && firstProjectRoutes[seatIndex]
                          ? firstProjectRoutes[seatIndex]
                          : `/products/${seat.slug}`

                      return (
                        <Link
                          key={seat.slug}
                          to={productRoute}
                          className="
                            block
                            cursor-pointer
                            rounded-[20px]
                            focus-visible:outline
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-gold-400
                          "
                          aria-label={`View ${seat.name} product details`}
                        >
                          <motion.div
                            initial={
                              prefersReducedMotion
                                ? false
                                : {
                                  opacity: 0,
                                  y: 18,
                                }
                            }
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.25,
                            }}
                            transition={{
                              duration: 0.55,
                              ease: easeOut,
                            }}
                            whileHover={{
                              y: -6,
                              scale: 1.01,
                            }}
                            whileTap={{
                              scale: 0.985,
                            }}
                            className="
                              group
                              relative
                              overflow-hidden
                              rounded-[20px]
                              border
                              border-white/50
                              bg-white/[0.12]
                              p-3
                              shadow-[0_18px_45px_-30px_rgba(6,59,61,0.38)]
                              backdrop-blur-lg
                              transition-all
                              duration-300
                              hover:border-teal-700/40
                              hover:bg-[#063B3D]/10
                              hover:shadow-xl
                            "
                          >
                            <div className="flex items-center gap-3.5">

                              <div
                                className="
                                  relative
                                  h-[68px]
                                  w-[68px]
                                  flex-none
                                  overflow-hidden
                                  rounded-[14px]
                                  border
                                  border-white/55
                                "
                              >
                                <img
                                  src={seat.image}
                                  alt={seat.name}
                                  loading="lazy"
                                  draggable={false}
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                    transition-transform
                                    duration-700
                                    ease-out
                                    group-hover:scale-110
                                  "
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <h4
                                  className="
                                    font-display
                                    text-[16px]
                                    leading-tight
                                    text-cream-100
                                    transition-colors
                                    duration-300
                                    group-hover:text-gold-400
                                  "
                                >
                                  {seat.name}
                                </h4>

                                <p
                                  className="
                                    mt-1
                                    text-[11px]
                                    leading-relaxed
                                    text-cream-200
                                    transition-colors
                                    duration-300
                                    group-hover:text-cream-100
                                  "
                                >
                                  {seat.seats} seat
                                  {seat.seats > 1 ? 's' : ''} · Climate Smart family
                                </p>
                              </div>

                              <ArrowRight
                                className="
                                  mr-1
                                  h-4
                                  w-4
                                  flex-none
                                  text-teal-700/40
                                  transition-all
                                  duration-300
                                  group-hover:translate-x-1.5
                                  group-hover:text-gold-400
                                "
                              />
                            </div>

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute
                                bottom-0
                                left-3
                                h-[2px]
                                w-0
                                rounded-full
                                bg-gold-400
                                transition-all
                                duration-500
                                group-hover:w-[calc(100%-24px)]
                              "
                            />
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </InfoBlock>

                <div className="my-12 h-px bg-[#063B3D]/10 lg:my-14" />

                {/* EXPERIENCE */}

                <div className="grid gap-8 lg:grid-cols-[0.28fr_1fr] lg:gap-14">
                  <InfoBlock
                    number="06"
                    label="The Experience"
                  >
                    <div className="hidden lg:block" />
                  </InfoBlock>

                  <div className="lg:pt-1">
                    <p className="max-w-6xl text-[16px] leading-[1.9] tracking-[0.005em] text-cream-200/90 sm:text-[17px] sm:leading-[1.85]">
                      {project.experience}
                    </p>
                  </div>
                </div>

                <div className="my-12 h-px bg-[#063B3D]/10 lg:my-14" />

                {/* OUTCOMES */}

                <InfoBlock
                  number="07"
                  label="Observed Outcomes"
                >
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {project.results.map((result, idx) => (
                      <motion.li
                        key={idx}
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                              opacity: 0,
                              y: 12,
                            }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: 0.45,
                          delay: idx * 0.06,
                          ease: easeOut,
                        }}
                        whileHover={{
                          y: -4,
                          scale: 1.02,
                        }}
                        className="
                          group
                          flex
                          min-h-[88px]
                          items-start
                          gap-3
                          rounded-[16px]
                          border
                          border-white/40
                          bg-white/[0.09]
                          px-4
                          py-4
                          backdrop-blur-sm
                          transition-all
                          duration-300
                          hover:border-gold-400/40
                          hover:bg-[#063B3D]/10
                          hover:shadow-lg
                        "
                      >
                        <span
                          className="
                            mt-0.5
                            flex
                            h-5
                            w-5
                            flex-none
                            items-center
                            justify-center
                            rounded-full
                            bg-gold-400/20
                            transition-all
                            duration-300
                            group-hover:scale-110
                            group-hover:bg-gold-400/40
                          "
                        >
                          <Check className="h-3 w-3 text-gold-700" />
                        </span>

                        <span
                          className="
                            text-[13px]
                            leading-[1.65]
                            text-cream-200
                            transition-colors
                            duration-300
                            group-hover:text-cream-100
                          "
                        >
                          {result}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </InfoBlock>

                {/* FOOTER CAPTION */}

                <RevealItem>
                  <div
                    className="
                      mt-12
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[#063B3D]/10
                      pt-6
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-gold-700 animate-spin-slow" />

                      <span
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-ink-700
                        "
                      >
                        Climate Craft
                      </span>
                    </div>

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        text-ink-700/60
                      "
                    >
                      Project {project.number}
                    </span>
                  </div>
                </RevealItem>

              </div>
            </div>
          </RevealItem>

        </RevealGroup>
      </div>
    </section>
  )
}

/* ==========================================================================
   INFORMATION BLOCK
============================================================================ */

function InfoBlock({
  number,
  label,
  title,
  children,
}: {
  number: string
  label: string
  title?: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="group relative"
    >
      <div className="mb-4 flex items-center gap-3">

        <span
          className="
            flex
            h-7
            w-7
            flex-none
            items-center
            justify-center
            rounded-full
            border
            border-gold-400/35
            bg-gold-400/[0.1]
            font-display
            text-[10px]
            italic
            text-gold-700
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:border-gold-400/60
            group-hover:bg-gold-400/20
          "
        >
          {number}
        </span>

        <SectionLabel>
          {label}
        </SectionLabel>

        <span className="h-px flex-1 bg-[#063B3D]/10 transition-colors duration-300 group-hover:bg-[#063B3D]/25" />
      </div>

      {title && (
        <h3
          className="
            mb-4
            max-w-[42rem]
            font-display
            text-[1.45rem]
            font-normal
            leading-[1.18]
            tracking-[-0.01em]
            text-cream-100
            transition-colors
            duration-300
            group-hover:text-gold-400
            sm:text-[1.55rem]
          "
        >
          {title}
        </h3>
      )}

      <div
        className="
          relative
          pl-0
          transition-transform
          duration-500
          group-hover:translate-x-[4px]
        "
      >
        {children}
      </div>
    </motion.div>
  )
}

/* ==========================================================================
   IMAGE COMPONENT
============================================================================ */

function ProjectImage({
  src,
  alt,
  label,
  eager = false,
  large = false,
  showLabel = true,
  to,
}: {
  src: string
  alt: string
  label: string
  eager?: boolean
  large?: boolean
  showLabel?: boolean
  to?: string
}) {
  const image = (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.4,
        ease: easeOut,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[${large ? '30px' : '24px'}]
        border
        border-white/60
        bg-[#063B3D]/20
        p-1.5
        shadow-[0_35px_100px_-38px_rgba(18,59,61,0.55)]
        backdrop-blur-sm
        transition-all
        duration-500
        hover:border-white/90
        hover:shadow-[0_45px_110px_-30px_rgba(18,59,61,0.7)]
      `}
    >
      <div
        className={`
          ${large
            ? 'aspect-[16/10]'
            : 'aspect-[4/3]'
          }
          w-full
          overflow-hidden
          rounded-[${large ? '26px' : '19px'}]
        `}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          draggable={false}
          className="
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-108
          "
        />
      </div>

      {/* Image gradients */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          via-black/[0.05]
          to-transparent
          transition-opacity
          duration-500
          group-hover:opacity-80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/20
          via-transparent
          to-transparent
        "
      />

      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* Dynamic Corner frame animation */}

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-8
          w-8
          rounded-tr-xl
          border-r-2
          border-t-2
          border-white/70
          transition-all
          duration-500
          group-hover:h-12
          group-hover:w-12
          group-hover:border-gold-400
        "
      />

      {/* Label */}

      {showLabel && (
        <div
          className="
            absolute
            bottom-5
            left-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/30
            bg-black/30
            px-3.5
            py-2
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:border-gold-400/50
            group-hover:bg-black/50
            group-hover:shadow-lg
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-ping" />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-white/90
              transition-colors
              group-hover:text-white
            "
          >
            {label}
          </span>
        </div>
      )}
    </motion.div>
  )

  return to ? <Link to={to} className="block">{image}</Link> : image
}

/* ==========================================================================
   META ITEM
============================================================================ */

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType
  label: string
  value: string
}) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: 'rgba(6,59,61,0.08)',
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        flex
        min-h-[92px]
        items-center
        gap-3.5
        border-[#063B3D]/10
        p-4
        transition-colors
        duration-300
        sm:p-5
        sm:[&:not(:first-child)]:border-l
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          flex-none
          items-center
          justify-center
          rounded-full
          border
          border-teal-700/20
          bg-teal-700/[0.08]
          text-teal-700
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:border-teal-700/40
          group-hover:bg-teal-700/[0.18]
        "
      >
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-gold-700/80
            transition-colors
            group-hover:text-gold-700
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            font-display
            text-[15px]
            leading-tight
            text-cream-100
            transition-colors
            group-hover:text-[#063B3D]
          "
        >
          {value}
        </p>
      </div>
    </motion.div>
  )
}

