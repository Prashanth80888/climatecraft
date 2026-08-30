// The Projects page is an editorial case-study experience, not a product
// catalogue and not an image gallery. It draws on real project information
// and verified product photography. No client names, locations, years or
// statistics appear that don't exist — never invented.

export interface ProjectCaseStudy {
  id: string
  number: string
  category: string
  title: string
  location: string
  propertyType: string
  users: string
  projectType: string
  installedSeating: {
    name: string
    slug: string
    seats: number
    image: string
  }[]
  existingEquipment?: string[]
  challenge: string
  requirements: string[]
  solution: string
  technology: {
    climateControl: {
      description: string
      coolingMin: number
      heatingMax: number
      zones: string[]
    }
    controls: {
      voice: string
      touchscreen: string
      remote: string
    }
  }
  process: {
    step: string
    title: string
    description: string
  }[]
  experience: string
  results: string[]
  images: {
    hero: string
    environment: string
    detail: string
    configuration?: string
  }
  featured: boolean
}

export interface TechnologyHighlight {
  id: string
  title: string
  description: string
  icon: string
  specs: { label: string; value: string }[]
}

export interface ProjectProcessStep {
  number: string
  title: string
  description: string
}

export interface Application {
  id: string
  label: string
  description?: string
}

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'bengaluru-home-theatre',
    number: '01',
    category: 'Home Theatre',
    title: 'Luxury Home Theatre — Bengaluru',
    location: 'Bengaluru, Karnataka',
    propertyType: 'Luxury Villa',
    users: 'Family of 5',
    projectType: 'Dedicated Home Theatre',
    installedSeating: [
      {
        name: 'Smart Three-Seater Recliner',
        slug: 'climate-craft-grand',
        seats: 3,
        image: '/images/products/climate-craft-grand/01.png',
      },
      {
        name: 'Smart Single Recliner',
        slug: 'climate-craft-signature',
        seats: 1,
        image: '/images/products/climate-craft-signature/01.png',
      },
    ],
    existingEquipment: [
      '4K Laser Projector',
      'Dolby Atmos Surround Sound',
      '135-inch Projection Screen',
      'Acoustic Wall Panels',
      'Smart Lighting',
    ],
    challenge:
      'The family already had a premium home theatre with 4K laser projection, Dolby Atmos sound and a 135-inch screen — but their existing sofa did not provide enough comfort for long movie sessions. They needed seating that remained comfortable during 3–5 hour viewings, looked luxurious, complemented the theatre aesthetic, was easy to operate, created a premium experience for guests, and offered more than an ordinary recliner.',
    requirements: [
      'Comfort for 3–5 hour movie sessions',
      'Luxury aesthetic matching the theatre room',
      'Simple, intuitive operation',
      'Premium guest experience',
      'More than a standard recliner',
    ],
    solution:
      'Climate Craft configured a Smart Three-Seater Recliner (Grand) and a Smart Single Recliner (Signature) — combining premium upholstery, motorised reclining, and intelligent liquid-based climate control into a seating arrangement purpose-built for extended home cinema sessions.',
    technology: {
      climateControl: {
        description:
          'Temperature-controlled liquid circulates through integrated comfort zones beneath the upper back, lower back and thigh support — delivering precise personal climate without noisy fans or air blowers.',
        coolingMin: 15,
        heatingMax: 35,
        zones: ['Upper back', 'Lower back', 'Thigh support'],
      },
      controls: {
        voice: 'Voice commands adjust reclining without interrupting the viewing experience.',
        touchscreen: 'Integrated smart touchscreen controls heating/cooling levels, reclining position and seating preferences.',
        remote: 'Wireless remote provides simple operation for all seating functions.',
      },
    },
    process: [
      {
        step: '01',
        title: 'Understand the Space',
        description:
          'Analysed the room proportions, viewing distances, screen geometry, acoustic treatment and the family\'s viewing habits — including 3–5 hour session lengths and guest entertainment.',
      },
      {
        step: '02',
        title: 'Select the Seating Configuration',
        description:
          'Chose a Smart Three-Seater Recliner (Grand) for shared viewing and a Smart Single Recliner (Signature) for a dedicated premium position — both with Climate Smart technology.',
      },
      {
        step: '03',
        title: 'Integrate Intelligent Comfort',
        description:
          'Embedded liquid-based temperature-control technology into each seat, with independent zones across upper back, lower back and thigh support for personalised climate per occupant.',
      },
      {
        step: '04',
        title: 'Configure Smart Controls',
        description:
          'Programmed voice control for hands-free reclining, calibrated the touchscreen interface for climate and position adjustment, and paired wireless remotes for each seat.',
      },
      {
        step: '05',
        title: 'Finish for the Interior',
        description:
          'Selected premium 460 GSM upholstery in a tone that complements the theatre\'s acoustic panels and ambient lighting — the seating becomes part of the room\'s visual language.',
      },
      {
        step: '06',
        title: 'Create the Final Experience',
        description:
          'Delivered a home theatre where the seating disappears into the entertainment — cooling for summer weekends, heating for rainy evenings, and effortless control that never pulls attention from the screen.',
      },
    ],
    experience:
      'The family reports more comfortable movie nights, useful cooling during summer weekends, comfortable heating during cooler evenings, and guests consistently impressed by the combination of luxury design and smart technology. The recliners have become the centrepiece of the home theatre.',
    results: [
      'Comfortable 3–5 hour viewing sessions',
      'Cooling to 15°C for warm Bengaluru afternoons',
      'Heating to 35°C for cooler evenings',
      'Voice, touchscreen and remote operation',
      'Premium aesthetic integrated with theatre design',
      'Guest experience elevated beyond standard seating',
    ],
    images: {
      hero: '/images/projects/screening-room/01.png',
      environment: '/images/projects/screening-room/02.png',
      detail: '/images/projects/screening-room/03.png',
      configuration: '/images/projects/the-parlour/01.png',
    },
    featured: true,
  },
  {
    id: 'senior-citizen-recliner',
    number: '02',
    category: 'Residential',
    title: 'Smart Recliner for Senior Comfort',
    location: 'Bengaluru, Karnataka',
    propertyType: 'Private Residence',
    users: 'Mrs. Meera Rao (name changed), 72 — Retired School Teacher',
    projectType: 'Personal Living Space',
    installedSeating: [
      {
        name: 'Smart Electric Recliner',
        slug: 'climate-craft-signature',
        seats: 1,
        image: '/images/products/climate-craft-signature/01.png',
      },
    ],
    challenge:
      'Mrs. Rao wanted a single seat that could adapt to her changing comfort needs throughout the day — reading, watching television, video calling family, listening to music, afternoon relaxation and receiving guests — without requiring constant manual repositioning or complex controls.',
    requirements: [
      'Adaptable comfort for varied daily activities',
      'Simple, accessible controls',
      'Seasonal temperature adaptation',
      'Smooth, quiet reclining motion',
      'Premium aesthetic for the living space',
    ],
    solution:
      'A Smart Electric Recliner (Signature) with liquid-based climate control, motorised reclining, and three control methods — voice, touchscreen and remote — allowing effortless adaptation to each activity and season.',
    technology: {
      climateControl: {
        description:
          'Liquid-based cooling and heating circulates through the backrest and seat, providing personal temperature control from 15°C to 35°C — cooling for warm afternoons, heating for cooler periods — without fans or air movement.',
        coolingMin: 15,
        heatingMax: 35,
        zones: ['Backrest', 'Seat base'],
      },
      controls: {
        voice: 'Voice commands for reclining and temperature — no need to locate buttons or remotes.',
        touchscreen: 'Large, clear touchscreen interface on the armrest for intuitive adjustment.',
        remote: 'Simple wireless remote with large buttons for easy operation.',
      },
    },
    process: [
      {
        step: '01',
        title: 'Understand Daily Rhythms',
        description:
          'Mapped a typical day — morning reading, midday video calls, afternoon rest, evening television, guest conversations — identifying where comfort needs shift and controls must be simplest.',
      },
      {
        step: '02',
        title: 'Select the Right Product',
        description:
          'Chose the Smart Single Recliner (Signature) for its compact footprint, full climate control, and the most accessible control suite in the range.',
      },
      {
        step: '03',
        title: 'Configure for Accessibility',
        description:
          'Set up voice control as the primary method, calibrated touchscreen sensitivity, and programmed the remote with preset positions for reading, rest and television.',
      },
      {
        step: '04',
        title: 'Integrate Seasonal Intelligence',
        description:
          'Enabled automatic seasonal suggestions — cooling defaults for April–October afternoons, heating presets for November–March mornings and evenings.',
      },
      {
        step: '05',
        title: 'Finish for the Home',
        description:
          'Selected upholstery that complements the existing interior — the recliner reads as a considered furniture piece, not medical equipment.',
      },
      {
        step: '06',
        title: 'Deliver Independent Comfort',
        description:
          'A seat that adapts to the person, not the other way around — Mrs. Rao controls her environment without assistance, in every season and every activity.',
      },
    ],
    experience:
      'The recliner supports reading, television, video calls, music, rest and conversation — each with its own comfort setting. Seasonal cooling and heating mean the seat is welcoming year-round. Voice control eliminates the frustration of small buttons. The piece looks like premium furniture, not assistive technology.',
    results: [
      'One seat, multiple daily activities supported',
      'Voice control removes button/remote friction',
      '15°C cooling for summer afternoons',
      '35°C heating for winter mornings',
      'Premium furniture aesthetic maintained',
      'Independent operation without assistance',
    ],
    images: {
      hero: '/images/projects/quiet-study/01.png',
      environment: '/images/projects/quiet-study/02.png',
      detail: '/images/projects/quiet-study/03.png',
    },
    featured: false,
  },
  {
    id: 'work-from-home-recliner',
    number: '03',
    category: 'Residential',
    title: 'Smart Recliner for Work & Living',
    location: 'Bengaluru, Karnataka',
    propertyType: 'Premium Apartment',
    users: 'Software Engineer — Work-from-Home Professional',
    projectType: 'Living Area / Home Office Hybrid',
    installedSeating: [
      {
        name: 'Smart Single Recliner',
        slug: 'climate-craft-signature',
        seats: 1,
        image: '/images/products/climate-craft-signature/01.png',
      },
    ],
    challenge:
      'Long work-from-home days demanded a seat that could support extended sitting comfort, then transition seamlessly to post-work relaxation — all within a premium apartment living area where the furniture must look as refined as the rest of the interior. Standard office chairs compromised aesthetics; standard sofas compromised long-session comfort.',
    requirements: [
      'All-day sitting comfort for work',
      'Post-work relaxation transition',
      'Premium apartment aesthetic',
      'Technology-friendly controls',
      'Climate adaptation for Bengaluru weather',
    ],
    solution:
      'A Smart Single Recliner (Signature) placed in the living area — ergonomic support for work sessions, motorised reclining for decompression, liquid climate control for Bengaluru\'s warm afternoons and cooler evenings, and smart controls that feel native to a technology-oriented lifestyle.',
    technology: {
      climateControl: {
        description:
          'Personal liquid-based temperature control (15°C–35°C) integrated into the seat — cooling during warm afternoons, heating during cooler periods — silent, precise, and always within reach.',
        coolingMin: 15,
        heatingMax: 35,
        zones: ['Backrest', 'Seat base', 'Leg rest'],
      },
      controls: {
        voice: 'Voice-activated reclining and temperature — hands stay on keyboard or coffee.',
        touchscreen: 'Armrest touchscreen for precise climate and position control.',
        remote: 'Wireless remote for quick adjustments without breaking focus.',
      },
    },
    process: [
      {
        step: '01',
        title: 'Understand the Dual Role',
        description:
          'The living area serves as both daytime workspace and evening retreat — the seat must support upright focus and full recline recovery without being moved or swapped.',
      },
      {
        step: '02',
        title: 'Select the Configuration',
        description:
          'Single Smart Recliner (Signature) — compact enough for apartment scale, full climate technology, motorised reclining with leg-rest extension.',
      },
      {
        step: '03',
        title: 'Engineer the Work Position',
        description:
          'Calibrated upright seat depth, back angle and lumbar support for sustained desk-adjacent work — the recliner at rest reads as a refined armchair.',
      },
      {
        step: '04',
        title: 'Enable the Transition',
        description:
          'One-touch recline to zero-gravity position for post-work decompression — leg rest extends, back reclines, climate adjusts to recovery mode.',
      },
      {
        step: '05',
        title: 'Match the Interior',
        description:
          'Upholstery selected to harmonise with the apartment\'s material palette — the piece elevates the room rather than announcing itself as technology.',
      },
      {
        step: '06',
        title: 'Validate the Experience',
        description:
          'Work sessions stay comfortable. Evenings become genuinely restorative. The living area remains a designed space, not a compromised office.',
      },
    ],
    experience:
      'The recliner replaces both the office chair and the evening sofa — ergonomic for work, luxurious for rest. Cooling handles Bengaluru\'s warm afternoons; heating adds comfort during monsoon and winter evenings. Voice and touchscreen controls feel natural in a technology-first home. The living area retains its premium aesthetic.',
    results: [
      'Single seat replaces office chair + evening sofa',
      'Ergonomic work posture + full recline recovery',
      '15°C cooling for warm afternoons',
      '35°C heating for cooler evenings',
      'Voice/touchscreen/remote — all native to tech lifestyle',
      'Premium apartment aesthetic preserved',
    ],
    images: {
      hero: '/images/projects/city-view-retreat/01.png',
      environment: '/images/projects/city-view-retreat/02.png',
      detail: '/images/projects/city-view-retreat/03.png',
    },
    featured: false,
  },
]

export const TECHNOLOGY_HIGHLIGHTS: TechnologyHighlight[] = [
  {
    id: 'liquid-climate',
    title: 'Liquid-Based Climate Control Intelligence',
    description:
      'Temperature-controlled liquid circulates through integrated comfort zones beneath the upper back, lower back and thigh support — creating a more precise personal climate experience without noisy fans or air blowers.',
    icon: 'thermometer',
    specs: [
      { label: 'Cooling', value: 'Down to 15°C' },
      { label: 'Heating', value: 'Up to 35°C' },
      { label: 'Zones', value: '3 independent zones' },
      { label: 'Technology', value: 'Patented liquid circulation' },
    ],
  },
  {
    id: 'smart-controls',
    title: 'Smart Control System',
    description:
      'Three intuitive control methods — voice, touchscreen and remote — so the seat adapts to how you want to interact, not the other way around.',
    icon: 'panel',
    specs: [
      { label: 'Voice', value: 'Hands-free reclining & climate' },
      { label: 'Touchscreen', value: 'Integrated armrest interface' },
      { label: 'Remote', value: 'Wireless, tactile controls' },
      { label: 'Presets', value: 'Saved positions & temperatures' },
    ],
  },
  {
    id: 'motorised-motion',
    title: 'Whisper-Quiet Motorised Reclining',
    description:
      'Smooth, near-silent motorised reclining and leg-rest adjustment — the mechanism serves the experience without becoming part of the visual or auditory language.',
    icon: 'motion',
    specs: [
      { label: 'Recline', value: 'Motorised, continuous' },
      { label: 'Leg Rest', value: 'Motorised, independent' },
      { label: 'Sound', value: 'Whisper-quiet operation' },
      { label: 'Control', value: 'Armrest, voice, remote' },
    ],
  },
]

export const PROJECT_PROCESS_STEPS: ProjectProcessStep[] = [
  {
    number: '01',
    title: 'Understand the Space',
    description:
      'The room, its users, viewing experience and comfort requirements — proportions, light, traffic flow and the posture the space asks of the people inside it.',
  },
  {
    number: '02',
    title: 'Select the Configuration',
    description:
      'Choose the appropriate product family, seating count and comfort technology — Climate Smart, Motorised Comfort or Classic — matched to the environment.',
  },
  {
    number: '03',
    title: 'Integrate Intelligent Comfort',
    description:
      'Embed liquid-based temperature-control technology into the seating — independent zones, precise range (15°C–35°C), silent operation.',
  },
  {
    number: '04',
    title: 'Configure Smart Controls',
    description:
      'Provide voice, touchscreen and remote operation — each calibrated for the user\'s preferences and accessibility needs.',
  },
  {
    number: '05',
    title: 'Finish for the Interior',
    description:
      'Ensure premium upholstery, proportions and positioning make the piece feel like it was always part of the room — technology invisible, comfort visible.',
  },
  {
    number: '06',
    title: 'Create the Final Experience',
    description:
      'A finished environment where comfort, motion and climate feel effortless — the furniture disappears into the experience it was designed to deliver.',
  },
]

export const APPLICATIONS: Application[] = [
  { id: 'home-theatre', label: 'Home Theatres' },
  { id: 'luxury-apartments', label: 'Luxury Apartments' },
  { id: 'villas', label: 'Villas' },
  { id: 'media-rooms', label: 'Media Rooms' },
  { id: 'entertainment-lounges', label: 'Entertainment Lounges' },
  { id: 'premium-living-rooms', label: 'Premium Living Rooms' },
  { id: 'private-cinemas', label: 'Private Cinemas' },
  { id: 'high-end-interiors', label: 'High-End Interior Projects' },
]

export const WHY_DIFFERENT = {
  traditional: [
    'Cushioning & upholstery',
    'Manual or basic motorised reclining',
    'Static aesthetic — one look, one feel',
    'No temperature adaptation',
    'Single control method (if any)',
    'Furniture first, technology absent',
  ],
  climateCraft: [
    'Liquid-based temperature technology',
    'Cooling to 15°C / Heating to 35°C',
    'Voice-controlled reclining',
    'Smart touchscreen interface',
    'Wireless remote operation',
    'Premium 460 GSM upholstery',
    'Luxury aesthetics',
    'Technology disappears into the experience',
  ],
  headline: 'More than a recliner.',
  subheadline:
    'Traditional premium seating focuses on cushioning and reclining. Climate Craft adds intelligent climate control, smart interaction and engineering that adapts to the person — not the other way around.',
}