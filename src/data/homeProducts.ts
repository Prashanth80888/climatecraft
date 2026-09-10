// The 9 real Climate Craft products shown on the HOME PAGE Collections section.
// This is intentionally separate from data/products.json, which still powers the
// standalone /collections page (out of scope for this update) — the two pages
// are allowed to use different datasets until /collections is migrated later.
//
// Product photography lives at /images/products/{slug}/01.png, 02.png, etc. —
// 01 is always that product's main/primary image, and the full ordered set is
// auto-discovered from the filesystem (src/data/generatedProductImages.ts, via
// scripts/generate-image-derivatives.mjs) rather than tracked per product here.
// Use homeProductImageCount(slug)/homeProductImages(slug) from src/lib/assets.ts
// to read a product's photo count/URLs — never hand-maintain it on this type.
export interface HomeProduct {
  id: string
  slug: string
  number: number
  familyId: 'climate-smart' | 'motorised-comfort' | 'classic'
  name: string
  category: string
  operation: string
  seats: 1 | 2 | 3
  /** First sentence of the full description — used on the compact Home card. */
  teaser: string
  /** Full editorial description — used on the Product Detail page. */
  description: string
  /** 3–4 curated highlights shown on the Home card. */
  highlights: string[]
  /** Complete spec list — shown on the Product Detail page. */
  specifications: string[]
  /** Interactive part callouts for the DETAILS explorer — copy is always sourced from `specifications`. */
  hotspots: ProductHotspot[]
  /**
   * 0-indexed angle (into homeProductImages(slug)) used as the single DETAILS-explorer
   * image for this product — the one photo where every hotspot below actually lines up
   * with a visible feature. Defaults to 0 ("01") when omitted.
   */
  detailImageIndex?: number
}

export interface ProductHotspot {
  id: string
  /** Position as a percentage of the image, 0–100. */
  x: number
  y: number
  title: string
  description: string
}

export interface ProductFamily {
  id: HomeProduct['familyId']
  number: number
  label: string
  blurb: string
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: 'climate-smart',
    number: 1,
    label: 'Climate Smart',
    blurb: 'Intelligent temperature control, smart technology and motorized comfort.',
  },
  {
    id: 'motorised-comfort',
    number: 2,
    label: 'Motorised Comfort',
    blurb: 'Motorized reclining comfort, without the climate technology.',
  },
  {
    id: 'classic',
    number: 3,
    label: 'Classic',
    blurb: 'Premium static seating — no mechanical or climate technology.',
  },
]

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: 'signature-new',
    slug: 'climate-craft-signature-new',
    number: 10,
    familyId: 'climate-smart',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description: 'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'screen',
        x: 41,
        y: 50,
        title: 'Smart Interface Control',
        description: 'The embedded touchscreen display built into the armrest — smart interface control over recline and temperature.',
      },
      {
        id: 'reclineControl',
        x: 34,
        y: 52,
        title: 'Recline Controller',
        description: 'Physical recline buttons beside the touchscreen, for one-touch manual control of the reclining motion.',
      },
      {
        id: 'backrest',
        x: 39,
        y: 24,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 78,
        y: 64,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
    detailImageIndex: 1,
  },
  {
    id: 'classic',
    slug: 'craft-classic',
    number: 7,
    familyId: 'classic',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description:
      'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'control',
        x: 40,
        y: 51,
        title: 'Smart Interface Control',
        description: 'A discreet touch control panel built into the armrest — full smart touchscreen, remote and voice control over recline and temperature.',
      },
      {
        id: 'backrest',
        x: 40,
        y: 29,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 61,
        y: 72,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
    detailImageIndex: 3,
  },

  {
    id: 'grand',
    slug: 'climate-craft-grand',
    number: 3,
    familyId: 'climate-smart',
    name: 'Climate Craft | Grand',
    category: 'Smart Sofa · Three Seater',
    operation: 'Motorized · SMART & Dual Reclining',
    seats: 3,
    teaser: 'A statement three-seater that brings the Climate Craft experience into a larger living space.',
    description:
      'A statement three-seater that brings the Climate Craft experience into a larger living space. With two motorized reclining seats and a comfortable central seat, Grand combines spacious premium seating with intelligent cooling, heating and smart controls.',
    highlights: ['3 Seats', 'Dual Motorized Reclining', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 3',
      '2 motorized reclining seats',
      'Central fixed seating position',
      'Motorized leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Premium 460 GSM upholstery',
      'Ergonomic cushioning and support',
      'Integrated cup holders',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'control',
        x: 30.5,
        y: 55.0,
        title: 'Smart Touch Control',
        description: 'The control switch built into the outer side of the left armrest, commanding the smart interface, remote and voice control, and the 2 motorized reclining seats.',
      },
      {
        id: 'center',
        x: 50.0,
        y: 58.6,
        title: 'Central Fixed Seating',
        description: 'A comfortable central fixed seating position sits between the two motorized reclining seats, in premium 460 GSM upholstery.',
      },
      {
        id: 'headrests',
        x: 47.9,
        y: 34.4,
        title: 'Three-Across Headrest Cushioning',
        description: 'The tall, individually contoured headrest built into each of the three seats, rising above the shared backrest line in premium 460 GSM upholstery.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'motion',
    slug: 'craft-motion',
    number: 4,
    familyId: 'motorised-comfort',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description:
      'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'screen',
        x: 37,
        y: 54,
        title: 'Smart Interface Control',
        description: 'The embedded touchscreen display built into the armrest — smart interface control over recline and temperature.',
      },
      {
        id: 'reclineControl',
        x: 27,
        y: 56,
        title: 'Recline Controller',
        description: 'Physical recline buttons beside the touchscreen, for one-touch manual control of the reclining motion.',
      },
      {
        id: 'backrest',
        x: 42,
        y: 30,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 63,
        y: 70,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'motion-duo',
    slug: 'craft-motion-duo',
    number: 5,
    familyId: 'motorised-comfort',
    name: 'Climate Craft | Duo',
    category: 'Smart Recliner · Two Seater',
    operation: 'SMART & Motorized',
    seats: 2,
    teaser: 'A sophisticated two-seater designed to bring personalized smart comfort to shared spaces.',
    description:
      'A sophisticated two-seater designed to bring personalized smart comfort to shared spaces. Each reclining position combines premium seating with intelligent temperature control, motorized adjustment and multiple control options for a more refined everyday experience.',
    highlights: ['2 Seats', 'Smart & Motorized', 'Individual Reclining', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 2',
      'Motorized reclining',
      'Motorized leg-rest adjustment',
      'Individual reclining comfort',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Premium 460 GSM upholstery',
      'Ergonomic cushioning and lumbar/back support',
      'Integrated cup holders',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'console',
        x: 61,
        y: 58,
        title: 'Individual Reclining Console',
        description: 'Each seat reclines independently, controlled from the shared centre console for individual reclining comfort.',
      },
      {
        id: 'headrests',
        x: 51,
        y: 30,
        title: 'Dual Smart Headrests',
        description: 'Ergonomic cushioning and lumbar support behind Climate Craft’s liquid cooling & heating technology, tuned across 15°C–35°C.',
      },
      {
        id: 'mechanism',
        x: 42,
        y: 72,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and motorized leg-rest adjustment, controlled by smart interface, remote or voice command — shown here with the seat fully reclined and the leg rest extended.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'motion-grand',
    slug: 'craft-motion-grand',
    number: 6,
    familyId: 'motorised-comfort',
    name: 'Craft Motion Grand',
    category: 'Motorized Reclining Sofa · 3 Seater',
    operation: 'Motorized · Dual Reclining',
    seats: 3,
    teaser: 'A spacious three-seater designed for elevated everyday relaxation.',
    description:
      'A spacious three-seater designed for elevated everyday relaxation. Craft Motion Grand combines a refined sofa silhouette with two motorized reclining positions, giving the living room both generous seating and effortless personal comfort.',
    highlights: ['3 Seats', 'Dual Reclining Seats', 'Central Fixed Seat'],
    specifications: [
      '3 seating positions',
      '2 motorized reclining seats',
      'Motorized leg rests',
      'Central fixed seat',
      'Premium upholstery',
      'Plush cushioning',
      'Ergonomic seating',
      'Integrated cup holders',
      'No climate-control technology',
    ],
    hotspots: [
      {
        id: 'control',
        x: 45,
        y: 43,
        title: 'Motorized Recline Control',
        description: 'The built-in control for the 2 motorized reclining seats, mounted on the armrest for easy reach.',
      },
      {
        id: 'legrest',
        x: 82,
        y: 53,
        title: 'Motorized Leg Rest',
        description: 'A motorized leg rest extends smoothly with each reclining seat, shown here at full extension.',
      },
      {
        id: 'center',
        x: 59,
        y: 42,
        title: 'Central Fixed Seat',
        description: 'A central fixed seat sits between the two reclining positions, in the same premium upholstery and plush cushioning.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'signature',
    slug: 'climate-craft-signature',
    number: 1,
    familyId: 'climate-smart',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description:
      'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'screen',
        x: 45,
        y: 54,
        title: 'Smart Interface Control',
        description: 'The embedded touchscreen display built into the armrest — smart interface control over recline and temperature.',
      },
      {
        id: 'reclineControl',
        x: 40,
        y: 58,
        title: 'Recline Controller',
        description: 'Physical recline buttons beside the touchscreen, for one-touch manual control of the reclining motion.',
      },
      {
        id: 'backrest',
        x: 39,
        y: 29,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 68,
        y: 70,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'classic-duo',
    slug: 'craft-classic-duo',
    number: 8,
    familyId: 'classic',
    name: 'Climate Craft | Signature',
    category: 'Smart Recliner · Single Seater',
    operation: 'SMART & Motorized',
    seats: 1,
    teaser: 'A refined single-seater smart recliner engineered for personalized comfort.',
    description:
      'A refined single-seater smart recliner engineered for personalized comfort. Signature combines premium upholstery, motorized reclining and Climate Craft’s intelligent liquid cooling and heating technology, with seamless control through the smart interface, remote and voice commands.',
    highlights: ['1 Seat', 'Smart & Motorized', '15°C–35°C Cooling & Heating', '2-Year Warranty'],
    specifications: [
      'Seating capacity: 1',
      'Motorized reclining and leg-rest adjustment',
      'Patented liquid cooling & heating technology',
      'Temperature range: 15°C–35°C',
      'Smart touchscreen/interface control',
      'Remote control',
      'Voice control',
      'Integrated cup holder',
      'Premium 460 GSM upholstery',
      'Ergonomic back, seat and leg support',
      '2-year warranty',
    ],
    hotspots: [
      {
        id: 'control',
        x: 31,
        y: 42,
        title: 'Smart Interface Control',
        description: 'A discreet touch control panel built into the armrest — full smart touchscreen, remote and voice control over recline and temperature.',
      },
      {
        id: 'backrest',
        x: 74,
        y: 40,
        title: 'Liquid Cooling & Heating',
        description: 'Patented liquid cooling and heating technology runs through the backrest, holding a temperature range of 15°C–35°C.',
      },
      {
        id: 'seat',
        x: 25,
        y: 70,
        title: 'Motorized Reclining & Leg Rest',
        description: 'Motorized reclining and leg-rest adjustment, finished in premium 460 GSM upholstery for ergonomic back, seat and leg support.',
      },
    ],
    detailImageIndex: 0,
  },
  {
    id: 'classic-grand',
    slug: 'craft-classic-grand',
    number: 9,
    familyId: 'classic',
    name: 'Craft Classic Grand',
    category: 'Premium Sofa · 3 Seater',
    operation: 'Static',
    seats: 3,
    teaser: 'A spacious three-seater that brings understated elegance and lasting comfort to the living room.',
    description:
      'A spacious three-seater that brings understated elegance and lasting comfort to the living room. Classic Grand is designed around generous seating, premium materials and timeless proportions, keeping the experience beautifully simple.',
    highlights: ['3 Seats', 'Static Seating', 'Spacious 3-Seat Configuration'],
    specifications: [
      'Seating capacity: 3',
      'Static seating',
      'Premium upholstery',
      'Generous cushioning',
      'Ergonomic seating design',
      'Spacious three-seat configuration',
      'Refined contemporary silhouette',
      'No reclining mechanism',
      'No climate-control technology',
    ],
    hotspots: [
      {
        id: 'upholstery',
        x: 49,
        y: 38,
        title: 'Premium Upholstery',
        description: 'Rich velvet-finish premium upholstery across the backrest — static seating, with no reclining or climate-control mechanism.',
      },
      {
        id: 'configuration',
        x: 49,
        y: 60,
        title: 'Spacious Three-Seat Configuration',
        description: 'A spacious three-seat configuration with generous cushioning and an ergonomic seating design throughout.',
      },
      {
        id: 'silhouette',
        x: 19,
        y: 45,
        title: 'Refined Contemporary Silhouette',
        description: 'The sofa’s tapered side profile — timeless proportions and a refined contemporary silhouette, built to keep the living room experience beautifully simple.',
      },
    ],
    detailImageIndex: 0,
  },
]

// Each family cross-references one "hub" family for its 3rd related product,
// alongside its two same-family siblings — Motorised Comfort sits in the
// middle of the range, so both other families point to it; it in turn points
// back to Climate Smart, the flagship line.
const RELATED_CROSS_FAMILY: Record<HomeProduct['familyId'], HomeProduct['familyId']> = {
  'climate-smart': 'motorised-comfort',
  'motorised-comfort': 'climate-smart',
  classic: 'motorised-comfort',
}

export function getProductBySlug(slug: string | undefined): HomeProduct | undefined {
  return HOME_PRODUCTS.find((p) => p.slug === slug)
}

/** Same-family siblings first, then the same-position product from the cross-referenced family. */
export function getRelatedProducts(product: HomeProduct): HomeProduct[] {
  const siblings = HOME_PRODUCTS.filter((p) => p.familyId === product.familyId && p.id !== product.id)

  const familyMembers = HOME_PRODUCTS.filter((p) => p.familyId === product.familyId)
  const positionInFamily = familyMembers.findIndex((p) => p.id === product.id)

  const crossFamily = RELATED_CROSS_FAMILY[product.familyId]
  const crossMembers = HOME_PRODUCTS.filter((p) => p.familyId === crossFamily)
  const crossProduct = crossMembers[positionInFamily]

  return [...siblings, crossProduct].filter(Boolean)
}
