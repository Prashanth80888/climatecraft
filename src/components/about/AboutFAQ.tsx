import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  HelpCircle,
  Mail,
  Sparkles,
  Sofa,
  Settings2,
  Ruler,
  ShieldCheck,
  Cpu,
  Heart,
} from 'lucide-react'
import { contact } from '../../lib/assets'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

type FAQItem = {
  q: string
  a: string
}

type FAQCategory = {
  id: string
  title: string
  description: string
  icon: typeof Sofa
  faqs: FAQItem[]
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    description:
      'Understand what smart recliners and sofas are, who they are designed for, and where they fit into everyday living.',
    icon: Sofa,
    faqs: [
      {
        q: 'What is a smart recliner and sofa?',
        a: 'A smart recliner and sofa is a modern seating solution designed for one or more users, offering adjustable reclining comfort along with advanced smart features including heating and cooling temperature control technology for enhanced relaxation.',
      },
      {
        q: 'Who should buy a smart recliner and sofa?',
        a: 'A smart recliner and sofa is ideal for individuals, families, senior citizens, professionals, gamers, readers, and anyone looking for advanced comfort seating with heating and cooling comfort technology.',
      },
      {
        q: 'Where can I use a smart recliner and sofa?',
        a: 'It can be used in living rooms, bedrooms, home theatres, offices, reading corners, lounges, and home offices, especially where heating and cooling temperature-controlled comfort is desired.',
      },
      {
        q: 'What is the difference between a smart recliner sofa and a normal sofa?',
        a: 'A smart recliner sofa allows adjustable positions with added smart features including heating and cooling temperature control technology, while a normal sofa has a fixed seating position.',
      },
      {
        q: 'Why should I choose a smart recliner and sofa?',
        a: 'It offers personalized comfort, advanced technology, and flexible seating options with integrated heating and cooling temperature control features that fit well in modern homes.',
      },
      {
        q: 'What is a 2-seater recliner?',
        a: 'A 2-seater recliner is a sofa-style recliner designed for two people with reclining comfort and optional heating and cooling temperature control technology.',
      },
      {
        q: 'What is a 3-seater recliner?',
        a: 'A 3-seater recliner is a larger recliner sofa designed for three people with enhanced heating and cooling comfort options.',
      },
      {
        q: 'What is the difference between a 2-seater and 3-seater recliner?',
        a: 'The main difference is seating capacity, size, and heating and cooling comfort distribution across seats.',
      },
      {
        q: 'Which is better for a small living room: 2-seater or 3-seater?',
        a: 'A 2-seater recliner is usually better for smaller rooms and can still include heating and cooling comfort features.',
      },
      {
        q: 'Which is better for families: 2-seater or 3-seater?',
        a: 'A 3-seater recliner is usually better for families with multi-seat heating and cooling comfort technology.',
      },
      {
        q: 'Can I use a recliner in a living room?',
        a: 'Yes. Recliners are commonly used with heating and cooling comfort systems.',
      },
      {
        q: 'Are recliners suitable for home theatres?',
        a: 'Yes. They are ideal for home theatres with advanced heating and cooling temperature control comfort.',
      },
      {
        q: 'Are recliners good for daily use?',
        a: 'Yes. They are designed for daily use with heating and cooling comfort support.',
      },
      {
        q: 'Do recliners come in manual and electric options?',
        a: 'Yes. Electric versions support heating and cooling technology integration.',
      },
    ],
  },

  {
    id: 'comfort',
    title: 'Comfort & Daily Use',
    description:
      'Explore how the seating works for relaxing, reading, watching TV, taking naps, and creating a comfortable space at home.',
    icon: Heart,
    faqs: [
      {
        q: 'Is a smart recliner and sofa comfortable for daily use?',
        a: 'Yes. It is designed for everyday relaxation and long-term comfort with heating and cooling temperature control technology.',
      },
      {
        q: 'Can I watch TV on a smart recliner and sofa?',
        a: 'Yes. It is perfect for watching TV with adjustable seating positions and heating and cooling temperature control comfort.',
      },
      {
        q: 'Can I read books on a smart recliner and sofa?',
        a: 'Yes. It provides a comfortable position for long reading sessions with optional heating and cooling temperature settings.',
      },
      {
        q: 'Can I take a nap on a smart recliner and sofa?',
        a: 'Yes. Many users enjoy short naps and long sleep due to its reclining comfort and heating and cooling temperature control option.',
      },
      {
        q: 'Is it suitable for work-from-home breaks?',
        a: 'Yes. It provides a relaxing space with heating and cooling comfort technology for work breaks.',
      },
      {
        q: 'Are recliners comfortable for long sitting hours?',
        a: 'Yes. They provide comfort with heating and cooling temperature control support.',
      },
      {
        q: 'Can a recliner help me relax after work?',
        a: 'Yes. It offers relaxation with heating and cooling comfort technology.',
      },
      {
        q: 'Can I watch TV comfortably on a recliner?',
        a: 'Yes. It is ideal for TV viewing with heating and cooling comfort settings.',
      },
      {
        q: 'Can a recliner be used for reading?',
        a: 'Yes. It offers comfort with climate-controlled heating and cooling technology.',
      },
      {
        q: 'Is a recliner good for elderly people?',
        a: 'Yes. It provides comfort with heating and cooling temperature control features.',
      },
      {
        q: 'Can a recliner be used for guests?',
        a: 'Yes. It is suitable for guests with heating and cooling comfort support.',
      },
      {
        q: 'Can I sleep on a recliner?',
        a: 'Yes. It supports naps with heating and cooling comfort technology.',
      },
      {
        q: 'Is a recliner better than a normal sofa?',
        a: 'Yes. It offers more comfort with heating and cooling smart technology.',
      },
      {
        q: 'Does a recliner provide back support?',
        a: 'Yes. It provides support along with heating and cooling comfort features.',
      },
    ],
  },

  {
    id: 'technology',
    title: 'Smart Features & Climate Control',
    description:
      'Learn how the motor, voice control, touchscreen, remote, and liquid-based heating and cooling technology work together.',
    icon: Cpu,
    faqs: [
      {
        q: 'What is a smart recliner?',
        a: 'A smart recliner includes advanced features such as voice control, touchscreen controls, remote operation, and heating and cooling temperature control technology.',
      },
      {
        q: 'What is an electric recliner?',
        a: 'An electric recliner uses a motor to adjust the reclining position smoothly along with optional heating and cooling comfort features.',
      },
      {
        q: 'What is a manual recliner?',
        a: 'A manual recliner is operated by a lever or body movement without electricity and does not include heating and cooling technology.',
      },
      {
        q: 'What is voice control in a smart recliner and sofa?',
        a: 'Voice control allows you to adjust seating positions and heating and cooling temperature settings using supported voice commands.',
      },
      {
        q: 'Can I operate it with a remote?',
        a: 'Yes. We offer remote control for easy operation including heating and cooling temperature adjustments.',
      },
      {
        q: 'Does it have a touchscreen?',
        a: 'Smart models include a touchscreen to adjust heating and cooling temperature settings.',
      },
      {
        q: 'What is liquid-based temperature technology?',
        a: 'It is a patented system that circulates temperature-controlled liquid through built-in pads for advanced heating and cooling comfort technology.',
      },
      {
        q: 'Does it use fan-based cooling?',
        a: 'No. It uses liquid-based heating and cooling temperature control technology instead of air blowers or fans.',
      },
      {
        q: 'What is the heating temperature range?',
        a: 'Smart models can provide adjustable heating technology up to 35°C.',
      },
      {
        q: 'What is the cooling temperature range?',
        a: 'Smart models can provide advanced cooling technology down to 15°C.',
      },
      {
        q: 'What is a voice-controlled recliner?',
        a: 'It responds to commands including heating and cooling adjustments.',
      },
      {
        q: 'What is a touchscreen recliner?',
        a: 'It allows control of heating and cooling temperature settings.',
      },
      {
        q: 'What is a remote-controlled recliner?',
        a: 'It allows control of heating and cooling comfort features.',
      },
      {
        q: 'What is liquid-based temperature technology in a recliner?',
        a: 'It uses liquid circulation for advanced heating and cooling comfort.',
      },
      {
        q: 'Does the recliner use fans for cooling?',
        a: 'No. It uses liquid-based cooling and heating technology.',
      },
      {
        q: 'Can the recliner cool the seating surface?',
        a: 'Yes. It cools up to 15°C using advanced cooling technology.',
      },
      {
        q: 'Can the recliner heat the seating surface?',
        a: 'Yes. It heats up to 35°C using heating technology.',
      },
      {
        q: 'What is the advantage of smart controls in a recliner?',
        a: 'They allow easy adjustment of heating and cooling comfort settings.',
      },
    ],
  },

  {
    id: 'space',
    title: 'Design & Space',
    description:
      'See where smart recliners and sofas can fit and how they work within different interiors and spaces.',
    icon: Ruler,
    faqs: [
      {
        q: 'Is a smart recliner and sofa suitable for apartments?',
        a: 'Yes. It is designed to fit well in modern apartments with compact heating and cooling comfort technology.',
      },
      {
        q: 'Can I place it in my bedroom?',
        a: 'Yes. It works well as a relaxation or reading seating option with heating and cooling temperature control comfort.',
      },
      {
        q: 'Is it suitable for a home theatre?',
        a: 'Yes. It is an excellent choice for home theatre seating with cooling and heating comfort technology for long viewing sessions.',
      },
      {
        q: 'Can I use it in an office?',
        a: 'Yes. It can be used in executive offices, lounges, and private cabins with heating and cooling comfort support.',
      },
      {
        q: 'Is it suitable for a reading corner?',
        a: 'Yes. It is ideal for creating a comfortable reading space with temperature-controlled heating and cooling comfort.',
      },
      {
        q: 'Are recliners available in modern designs?',
        a: 'Yes. Many include smart heating and cooling technology.',
      },
      {
        q: 'Can a recliner improve my home interior?',
        a: 'Yes. It enhances interiors with advanced heating and cooling comfort systems.',
      },
    ],
  },

  {
    id: 'quality',
    title: 'Materials & Quality',
    description:
      'Find answers about durability, cleaning, upholstery, maintenance, and long-term use.',
    icon: Settings2,
    faqs: [
      {
        q: 'Is it durable?',
        a: 'Yes. It is designed for long-term use along with heating and cooling system durability.',
      },
      {
        q: 'Is it easy to clean?',
        a: 'Yes. It is easy to clean even with integrated heating and cooling technology components.',
      },
      {
        q: 'Does the upholstery resist wear?',
        a: 'Premium materials are designed for everyday use with support for heating and cooling comfort systems.',
      },
      {
        q: 'Will it match modern interiors?',
        a: 'Yes. It is designed to complement contemporary interiors with advanced heating and cooling smart technology.',
      },
      {
        q: 'Are recliners durable?',
        a: 'Yes. They are durable with heating and cooling system integration.',
      },
      {
        q: 'Are recliners easy to maintain?',
        a: 'Yes. They are easy to maintain including heating and cooling components.',
      },
      {
        q: 'Can recliner upholstery be cleaned easily?',
        a: 'Yes. It is easy to clean even with heating and cooling systems.',
      },
      {
        q: 'Are premium recliners worth the price?',
        a: 'Yes. They include advanced heating and cooling comfort technology.',
      },
    ],
  },

  {
    id: 'buying',
    title: 'Buying & Customization',
    description:
      'Get practical information about choosing a model, customization, installation, servicing, and purchase.',
    icon: Sofa,
    faqs: [
      {
        q: 'How do I choose the right smart recliner and sofa?',
        a: 'Consider space, features, upholstery, comfort, and heating and cooling temperature control technology.',
      },
      {
        q: 'Is a smart recliner and sofa worth buying?',
        a: 'Yes, if you value comfort, technology, and heating and cooling smart comfort features.',
      },
      {
        q: 'Can I customize colour or upholstery?',
        a: 'Yes. You can choose fabric and colour along with models that support heating and cooling technology integration.',
      },
      {
        q: 'Does it come assembled?',
        a: 'Yes. Installation is provided including setup of heating and cooling systems.',
      },
      {
        q: 'Does it require maintenance?',
        a: 'Minimal maintenance is required for both structure and heating and cooling technology systems.',
      },
      {
        q: 'Can the temperature system be serviced?',
        a: 'Yes. Service is available for heating and cooling technology components.',
      },
      {
        q: 'Does the motor require maintenance?',
        a: 'No. Maintenance is not required, including for heating and cooling integrated systems.',
      },
      {
        q: 'How do I choose the right recliner?',
        a: 'Consider comfort, size, and heating and cooling technology features.',
      },
      {
        q: 'Should I buy a 2-seater or 3-seater recliner?',
        a: 'Choose based on space and heating and cooling comfort needs.',
      },
      {
        q: 'Is a 2-seater recliner good for couples?',
        a: 'Yes. It can include heating and cooling comfort features.',
      },
      {
        q: 'Is a 3-seater recliner good for families?',
        a: 'Yes. It offers multi-seat heating and cooling comfort.',
      },
      {
        q: 'Why should I choose a smart recliner over a normal recliner?',
        a: 'Because it offers heating and cooling temperature control technology along with smart features.',
      },
    ],
  },

  {
    id: 'warranty',
    title: 'Warranty & Purchase',
    description:
      'Everything related to warranty, installation, purchasing options, delivery, and support.',
    icon: ShieldCheck,
    faqs: [
      {
        q: 'Does it include a warranty?',
        a: 'Yes. We offer a 3-year warranty including coverage for heating and cooling technology systems.',
      },
      {
        q: 'Is installation available?',
        a: 'Yes. We offer delivery and installation including heating and cooling system setup.',
      },
      {
        q: 'Can I buy it online?',
        a: 'Yes. It is available online and offline with options including heating and cooling smart recliners.',
      },
      {
        q: 'Is after-sales support available?',
        a: 'Support depends on the brand or retailer, including support for heating and cooling technology features.',
      },
    ],
  },

  {
    id: 'smart-home',
    title: 'Smart Technology',
    description:
      'Understand what makes the smart seating different from traditional furniture and how it fits into modern homes.',
    icon: Sparkles,
    faqs: [
      {
        q: 'What makes it different from ordinary sofas?',
        a: 'It combines comfort with smart features like voice control, touchscreen operation, remote control, and advanced heating and cooling temperature control technology.',
      },
      {
        q: 'Can different family members use it?',
        a: 'Yes. Settings can be adjusted individually including heating and cooling temperature preferences.',
      },
      {
        q: 'Is it suitable for luxury homes?',
        a: 'Yes. It is designed for premium interiors with high-end heating and cooling smart technology.',
      },
      {
        q: 'Why choose a smart recliner and sofa over traditional seating?',
        a: 'It offers advanced comfort, smart controls, and heating and cooling personalized relaxation technology.',
      },
      {
        q: 'Why is our smart recliner and sofa unique?',
        a: 'It combines patented liquid-based heating and cooling technology (15°C to 35°C), voice control, touchscreen operation, remote access, premium craftsmanship, and modern design to deliver a luxury seating experience unlike traditional sofas.',
      },
    ],
  },

  {
    id: 'health',
    title: 'Comfort & Wellness',
    description:
      'General comfort-related questions about reclining, relaxation, posture, and temperature-controlled seating.',
    icon: Heart,
    faqs: [
      {
        q: 'What are the health benefits of using a smart recliner and sofa?',
        a: 'It helps improve relaxation, reduces body stress, supports better posture, and provides heating and cooling temperature control comfort that can ease muscle tension.',
      },
      {
        q: 'Can a smart recliner help reduce back pain?',
        a: 'Yes. The adjustable reclining positions and ergonomic support can help reduce pressure on the spine and lower back.',
      },
      {
        q: 'Is a smart recliner good for blood circulation?',
        a: 'Yes. Reclining positions that elevate the legs can help improve blood circulation and reduce leg fatigue.',
      },
      {
        q: 'Can heating and cooling features help with body pain?',
        a: 'Yes. Heating can help relax stiff muscles, while cooling can help reduce inflammation and body heat discomfort.',
      },
      {
        q: 'Is a smart recliner good for stress relief?',
        a: 'Yes. The combination of comfort seating, temperature control, and relaxation positioning helps reduce stress and mental fatigue.',
      },
    ],
  },
]

function FAQAccordion({
  item,
  index,
  openQuestion,
  setOpenQuestion,
}: {
  item: FAQItem
  index: number
  openQuestion: string | null
  setOpenQuestion: (value: string | null) => void
}) {
  const questionId = `${item.q}-${index}`
  const isOpen = openQuestion === questionId

  return (
    <motion.div
      layout
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-[#169B9A]/45 bg-white/90 shadow-[0_18px_40px_-18px_rgba(6,59,61,0.18)] backdrop-blur-xl'
          : 'border-white/65 bg-white/55 shadow-[0_8px_25px_-18px_rgba(6,59,61,0.2)] backdrop-blur-md hover:border-[#169B9A]/30 hover:bg-white/75'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpenQuestion(isOpen ? null : questionId)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 p-5 text-left outline-none sm:p-6"
      >
        <span className="font-display text-[17px] font-medium leading-snug text-[#063B3D] sm:text-lg">
          {item.q}
        </span>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'border-[#063B3D] bg-[#063B3D] text-white shadow-[0_5px_15px_-8px_rgba(6,59,61,0.5)]'
              : 'border-[#063B3D]/15 bg-white/80 text-[#063B3D]'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="border-t border-[#063B3D]/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p className="max-w-3xl text-[14px] leading-relaxed text-ink-700 sm:text-[15px]">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQCategoryCard({
  category,
  isOpen,
  onToggle,
  openQuestion,
  setOpenQuestion,
}: {
  category: FAQCategory
  isOpen: boolean
  onToggle: () => void
  openQuestion: string | null
  setOpenQuestion: (value: string | null) => void
}) {
  const Icon = category.icon

  return (
    <motion.div
      layout
      className={`overflow-hidden rounded-[26px] border transition-all duration-500 ${
        isOpen
          ? 'border-[#169B9A]/45 bg-white/70 shadow-[0_25px_60px_-25px_rgba(6,59,61,0.2)] backdrop-blur-xl'
          : 'border-white/70 bg-white/45 shadow-[0_12px_35px_-22px_rgba(6,59,61,0.18)] backdrop-blur-lg hover:border-white hover:bg-white/65'
      }`}
    >
      {/* Category Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-4 p-5 text-left sm:p-6"
      >
        {/* Icon */}
        <div
          className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl border transition-all duration-500 ${
            isOpen
              ? 'border-[#169B9A]/30 bg-[#063B3D] text-white shadow-[0_10px_25px_-12px_rgba(6,59,61,0.5)]'
              : 'border-white/70 bg-white/65 text-[#063B3D] group-hover:bg-white'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Category Text */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-[#063B3D] sm:text-xl">
              {category.title}
            </h3>

            <span className="rounded-full border border-[#169B9A]/20 bg-[#169B9A]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#176A69]">
              {category.faqs.length} Questions
            </span>
          </div>

          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-ink-600 sm:text-sm">
            {category.description}
          </p>
        </div>

        {/* Category Chevron */}
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'border-[#063B3D] bg-[#063B3D] text-white'
              : 'border-[#063B3D]/15 bg-white/70 text-[#063B3D]'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {/* Category Questions */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="border-t border-[#063B3D]/10 px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
              <div className="space-y-3">
                {category.faqs.map((item, index) => (
                  <FAQAccordion
                    key={item.q}
                    item={item}
                    index={index}
                    openQuestion={openQuestion}
                    setOpenQuestion={setOpenQuestion}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AboutFAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setOpenQuestion(null)

    setOpenCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-28"
    >
      <SectionAtmosphere variant="glow" />

      {/* Main Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.22] blur-[140px]"
        style={{
          background:
            'radial-gradient(ellipse, #169B9A 0%, #063B3D 45%, transparent 72%)',
        }}
      />

      {/* Gold Accent Glow */}
      <div
        className="pointer-events-none absolute right-[8%] top-[15%] h-[260px] w-[260px] rounded-full opacity-[0.13] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      <div className="grain-overlay opacity-20" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-gold-600" />

            <SectionLabel>Frequently Asked</SectionLabel>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-[#063B3D] sm:text-4xl lg:text-5xl">
                Everything you need to know.
              </h2>

              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-700 sm:text-base">
                Explore our most common questions about smart seating,
                liquid-based climate control, intelligent operation,
                customization, quality, and ownership.
              </p>
            </div>

            {/* FAQ Count */}
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-gold-600" />

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#063B3D]">
                {FAQ_CATEGORIES.reduce(
                  (total, category) => total + category.faqs.length,
                  0,
                )}{' '}
                Answers
              </span>
            </div>
          </div>
        </Reveal>

        {/* FAQ Categories */}
        <RevealGroup className="mt-10 space-y-4">
          {FAQ_CATEGORIES.map((category) => (
            <RevealItem key={category.id}>
              <FAQCategoryCard
                category={category}
                isOpen={openCategory === category.id}
                onToggle={() => toggleCategory(category.id)}
                openQuestion={openQuestion}
                setOpenQuestion={setOpenQuestion}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Bottom Support Card */}
        <Reveal delay={0.3}>
          <div className="relative mt-10 overflow-hidden rounded-[24px] border border-white/80 bg-white/65 p-5 shadow-[0_18px_45px_-25px_rgba(6,59,61,0.2)] backdrop-blur-xl sm:p-6">
            {/* Decorative Glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gold-500/15">
                <Mail className="h-5 w-5 text-gold-700" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#063B3D]">
                  Still have questions?
                </p>

                <p className="mt-1 text-xs leading-relaxed text-ink-600">
                  Our team can help with specifications, customization,
                  climate-control features, and product selection.
                </p>
              </div>

              <a
                href={`mailto:${contact.email}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#063B3D]/10 bg-[#063B3D] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_-12px_rgba(6,59,61,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B5557] hover:shadow-[0_14px_30px_-12px_rgba(6,59,61,0.5)]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>

        {/* Small Note */}
        <Reveal delay={0.4}>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[0.16em] text-ink-500">
            Smart comfort · Liquid climate control · Intelligent seating
          </p>
        </Reveal>
      </div>
    </section>
  )
}