// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY DETAIL DATA — client-supplied source of truth.
// The client-provided case-study information below is used exactly as given:
// titles, leads, specifications, sidebar facts, CTA copy and FAQ questions/
// answers are not paraphrased or embellished. Nothing here is invented.
//
// Hero image note: the client referenced the original WhatsApp filenames
// (e.g. "11.46.04 AM.jpeg"). These already exist in the repo under
// /images/products/<timestamp>.jpeg and are mapped here. Two references
// (11.50.31 AM.jpeg and 11.52.28 AM.jpeg) were not present in the repo, so
// the next available photograph from the same shoot is used instead for those
// two case studies — noted inline below.
// ─────────────────────────────────────────────────────────────────────────────

export interface CaseStudySpecRow {
  label: string
  value: string
}

export interface CaseStudyResultItem {
  /** A large display figure when the supplied result has a clean number/value, otherwise undefined. */
  value?: string
  text: string
}

export interface CaseStudyArticleSection {
  heading: string
  /** Exact client prose. Omitted for quote-only sections. */
  body?: string
  /** Exact client quote, when this section is a review/testimonial. */
  quote?: string
  /** Attribution for the quote, exactly as supplied (may be empty). */
  attribution?: string
  /** Client-supplied outcome figures/points, rendered as a highlight row. */
  stats?: {
    kicker?: string
    items: CaseStudyResultItem[]
  }
}

export interface CaseStudyFaq {
  q: string
  a: string
}

export interface CaseStudyDetailCTA {
  eyebrow: string
  heading: string
  body: string
  linkText: string
}

export interface CaseStudyDetail {
  slug: string
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  eyebrow: string
  title: string
  lead: string
  heroImage: string
  specificationTitle: string
  specifications: CaseStudySpecRow[]
  articleSections: CaseStudyArticleSection[]
  sidebarTitle: string
  sidebarStats: { label: string; value: string }[]
  cta: CaseStudyDetailCTA
  faqs: CaseStudyFaq[]
}

const detailImage = (key: string) => `/images/products/${key}.jpeg`

export const CASE_STUDY_DETAILS: CaseStudyDetail[] = [
  {
    slug: 'smart-recliner-for-software-engineers-india',
    metaTitle: 'Smart Recliner for Software Engineers in India | Climate Craft',
    metaDescription:
      "Case study on how a Senior Tech Lead in Bengaluru upgraded his hybrid WFH setup with Climate Craft's smart temperature-controlled recliner for peak focus and ergonomics.",
    breadcrumb: 'Software Engineers',
    eyebrow: 'Case Study · Ergonomics & Tech',
    title: 'Smart Recliner for Software Engineers.',
    lead: 'How a Senior Tech Lead in Bengaluru transformed 10-hour hybrid coding sessions, reduced lower back strain, and elevated evening relaxation with active liquid thermal seating.',
    heroImage: detailImage('11.46.04'),
    specificationTitle: 'Installation Specifications',
    specifications: [
      { label: 'Model Series', value: 'Climate Craft Apex Solo' },
      { label: 'Upholstery', value: 'Semi-Aniline Nappa Leather (Graphite)' },
      { label: 'Thermal Module', value: 'Dual Cooling & Warm Liquid Loop' },
      { label: 'Temperature Range', value: '15°C – 36°C Adjustable' },
      { label: 'Control Interface', value: 'Flush Armrest Touch + Mobile App' },
      { label: 'Location', value: 'Indiranagar, Bengaluru, Karnataka' },
    ],
    articleSections: [
      {
        heading: 'Executive Summary',
        body: 'Software engineering demands high focus, extended desk hours, physical fatigue, thermal discomfort during warm Indian afternoons, and lower back strain. Explores how a Climate Craft smart climate-controlled recliner in a home office in Indiranagar, Bengaluru delivered measurable improvements.',
      },
      {
        heading: 'The Challenge',
        body: 'Aditya V., 34-year-old Principal Systems Architect, 9–12 hours daily at screens. Issues: heat entrapment along lumbar/thigh contacts during warm Bengaluru afternoons; postural fatigue from static seating angles over 4+ hours; difficulty transitioning from work mode to relaxation.',
      },
      {
        heading: 'The Climate Craft Solution',
        body: 'Customized single-seater motorized recliner in breathable top-grain Italian leather with proprietary liquid-based closed-loop temperature control. Key specs: Liquid Cooling to 18°C; Integrated Lumbar Heating to 34°C; Infinite Motorized Articulation (105° upright to 135° zero-gravity); Quiet Operation <28 dB.',
      },
      {
        heading: 'Results & Impact',
        stats: {
          kicker: 'After 90 days',
          items: [
            { value: '35%', text: 'Reduction in Midday Fatigue' },
            { text: 'Enhanced Recovery (135° zero-gravity + 32°C lumbar heat for 20 min between meetings)' },
            { text: 'Seamless Work-Life Transition' },
          ],
        },
      },
    ],
    sidebarTitle: 'Project Summary',
    sidebarStats: [
      { label: 'Client Profile', value: 'Senior Tech Lead / Architect' },
      { label: 'Location', value: 'Bengaluru, India' },
      { label: 'Environment', value: 'Hybrid WFH Studio' },
      { label: 'Primary Need', value: 'Ergonomics & Thermal Comfort' },
      { label: 'Solution', value: 'Climate-Controlled Recliner' },
      { label: 'Temperature Range', value: '18°C Cooling – 34°C Heating' },
    ],
    cta: {
      eyebrow: 'Bespoke Specification',
      heading: 'Upgrade Your WFH Workstation',
      body: 'Experience intelligent liquid cooling and motorized positioning engineered tailored to your exact study or home office layout.',
      linkText: 'Consult Our Engineers',
    },
    faqs: [
      {
        q: 'Can I comfortably use a laptop while recline-positioned?',
        a: 'Yes. Motorized articulation allows independent backrest and legrest adjustment.',
      },
      {
        q: 'Does the cooling system generate noise picked up on calls?',
        a: 'No. Ultra-quiet brushless fluid pumps operating under 28 decibels.',
      },
      {
        q: 'What electrical requirements for home office setup?',
        a: 'Standard 220V/240V Indian domestic wall sockets (5A).',
      },
    ],
  },

  {
    slug: 'smart-recliner-for-new-homeowners-india',
    metaTitle: 'Smart Recliner for New Homeowners in India | Premium First Home Furniture',
    metaDescription:
      'Explore how new homeowners in Bengaluru transformed their living room into a luxury sanctuary with Climate Craft smart temperature-controlled 2-seater recliners.',
    breadcrumb: 'New Homeowners',
    eyebrow: 'Residential & Lifestyle Case Study',
    title: 'Smart Recliner for New Homeowners in India',
    lead: 'A first home living room anchor combining bespoke Italian leather upholstery, dual-zone temperature control, and quiet electric recline.',
    heroImage: detailImage('11.48.29'),
    specificationTitle: 'Bespoke Features Installed',
    specifications: [
      { label: 'Dual Independent Thermal Zones', value: '15°C cooling to 35°C warming' },
      { label: 'Concealed Touch Interfaces', value: 'Integrated seamlessly into armrest leather' },
      { label: 'Silent Motor Recline', value: 'Zero-wall mechanism needing only 10cm clearance' },
      { label: 'Wireless Fast-Charging', value: 'Built into the central armrest console' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Ananya and Rohan, first 3BHK high-rise in Whitefield, Bengaluru. Sought furniture reflecting progressive taste with unmatched personal comfort.',
      },
      {
        heading: 'The Design & Comfort Objectives',
        body: 'Needed: independent dual-zone temperature control; refined architectural profile; zero-wall electric recline.',
      },
      {
        heading: 'The Climate Craft 2-Seater Solution',
        body: 'Customized 2-Seater Smart Recliner Sofa in Warm Bone aniline leather with dark teal trim.',
      },
      {
        heading: 'Homeowner Review',
        quote:
          'It is the absolute centerpiece of our new home. Coming back from work and switching on the active cooling feature makes every evening feel like a resort stay,',
        attribution: 'says Ananya.',
      },
    ],
    sidebarTitle: 'Whitefield Apartment',
    sidebarStats: [
      { label: 'Property Type', value: '3BHK High-Rise Residence' },
      { label: 'Location', value: 'Whitefield, Bengaluru' },
      { label: 'Model Installed', value: '2-Seater Smart Recliner Sofa' },
      { label: 'Thermal Feature', value: 'Dual Independent Zones' },
    ],
    cta: {
      eyebrow: 'Bespoke Specification',
      heading: 'Design Your First Home Statement Piece',
      body: "Let our design team configure a 2-seater smart recliner perfectly matched to your new home's interior palette and comfort requirements.",
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'How close to the wall can the recliner be placed?',
        a: 'Zero-wall motorized glide mechanism requires only 10cm (4 inches) of clearance.',
      },
      {
        q: 'Can both seats operate at different temperatures simultaneously?',
        a: 'Yes, all Climate Craft multi-seat sofas feature independent thermal loops.',
      },
    ],
  },

  {
    slug: 'smart-recliner-for-pregnant-women-india',
    metaTitle: 'Smart Recliner for Pregnant Women in India | Ergonomic Maternity Comfort',
    metaDescription:
      'Learn how Climate Craft smart recliners provide gentle, temperature-regulated ergonomic relief and seamless electric recline for expectant and nursing mothers in India.',
    breadcrumb: 'Maternity Comfort',
    eyebrow: 'Maternity Wellness Case Study',
    title: 'Smart Recliner for Pregnant Women in India',
    lead: 'Providing gentle lumbar support, effortless motorized positioning, and cooling comfort for expecting and nursing mothers in Koramangala.',
    heroImage: detailImage('11.50.36'), // client ref: 11.50.31 AM.jpeg (nearest available asset from the same shoot)
    specificationTitle: 'Maternity Feature Spec',
    specifications: [
      { label: 'Effortless Power Assist Lift', value: 'Gentle standing assistance without abdominal strain' },
      { label: 'Micro-Adjustable Lumbar Support', value: 'Motorized air-cell lumbar bladder' },
      { label: 'Sustained Surface Cooling', value: "Soothing 21°C temperature regulation" },
      { label: 'Hypoallergenic Materials', value: 'Zero VOC finishes & natural leather' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Meera from Koramangala, second trimester, persistent lower back strain and night hot flashes in humid Indian climate. Standard seating insufficient.',
      },
      {
        heading: 'Maternity Health & Ergonomic Considerations',
        body: 'Needed: smooth effortless motorized recline; 21°C surface cooling; adjustable lumbar fill; gentle power-assist lift.',
      },
      {
        heading: 'The Climate Craft Maternity Solution',
        body: 'Maternity Series Electric Glider & Recliner in ultra-soft hypoallergenic breathable natural leather in cream white.',
      },
      {
        heading: "Mother's Experience",
        quote: 'The power-lift feature and subtle cooling made my late trimester and early nursing weeks infinitely easier.',
      },
    ],
    sidebarTitle: 'Koramangala Nursery',
    sidebarStats: [
      { label: 'User Profile', value: 'Maternity & Post-Natal Nursing' },
      { label: 'Location', value: 'Koramangala, Bengaluru' },
      { label: 'Model Installed', value: 'Maternity Electric Glider' },
      { label: 'Special Mechanism', value: 'Power Lift + Soothing Cool Loop' },
    ],
    cta: {
      eyebrow: 'Maternity Comfort',
      heading: 'Comfort Designed for Every Stage of Motherhood',
      body: 'Speak with our ergonomics team to configure the ideal maternity recliner with gentle lift assistance and temperature-controlled support.',
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'Is the temperature cooling safe during pregnancy?',
        a: 'Yes. Gentle conductive surface temperature control (20°C–24°C), no cold air drafts.',
      },
      {
        q: 'Is the recliner helpful after childbirth for nursing?',
        a: 'Yes. Smooth electronic recline adjustments help find ideal nursing angle.',
      },
    ],
  },

  {
    slug: 'smart-recliner-for-post-workout-recovery',
    metaTitle: 'Smart Recliner for Post Workout Recovery | Active Muscle Relief Seating',
    metaDescription:
      'Discover how endurance athletes and fitness enthusiasts in India utilize Climate Craft liquid thermal recliners for targeted post-workout thermal recovery.',
    breadcrumb: 'Post Workout Recovery',
    eyebrow: 'Athletic Performance Case Study',
    title: 'Smart Recliner for Post-Workout Recovery',
    lead: 'How a marathon runner integrated active contrast thermal therapy into daily recovery routines with Climate Craft liquid temperature seating.',
    heroImage: detailImage('11.52.33'), // client ref: 11.52.28 AM.jpeg (nearest available asset from the same shoot)
    specificationTitle: 'Recovery Performance Spec',
    specifications: [
      { label: 'Rapid Contrast Thermal Shift', value: 'Cooling to warming in under 90 seconds' },
      { label: 'Heart-Above-Knee Zero Gravity', value: 'Reduces lower limb blood pooling' },
      { label: 'Breathable Perforated Leather', value: 'Optimizes liquid thermal transfer' },
      { label: 'Post-Workout Presets', value: 'One-touch 20-minute recovery programs' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Vikram from Indiranagar, amateur endurance runner, required at-home muscle recovery station after 20km marathon training.',
      },
      {
        heading: 'The Athletic Recovery Challenge',
        body: 'Needed: immediate post-run cooling (16°C); targeted thermal warmth (36°C) for circulation; elevated leg placement (zero-gravity).',
      },
      {
        heading: 'The Climate Craft Performance Recovery Installation',
        body: 'Performance Series Recovery Recliner with rapid-switch Peltier thermal coils in lumbar and leg supports.',
      },
      {
        heading: 'Athlete Testimonial',
        quote: 'Using the 16°C cooling setting immediately after a long humid run reduces my recovery time drastically.',
      },
    ],
    sidebarTitle: 'Indiranagar Recovery Suite',
    sidebarStats: [
      { label: 'Primary Use', value: 'Marathon & Athletic Recovery' },
      { label: 'Location', value: 'Indiranagar, Bengaluru' },
      { label: 'Model Installed', value: 'Performance Recovery Recliner' },
      { label: 'Key Feature', value: 'Zero-Gravity + Rapid Contrast Loop' },
    ],
    cta: {
      eyebrow: 'Athletic Performance',
      heading: 'Build Your At-Home Recovery Station',
      body: 'Configure a performance recovery recliner with rapid thermal contrast, zero-gravity positioning, and preset recovery programs.',
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'How fast does the chair transition between cooling and heating modes?',
        a: 'Within 60 to 90 seconds.',
      },
      {
        q: 'Does zero-gravity recline help reduce muscle stiffness?',
        a: 'Yes, raising legs above heart level aids lymphatic return.',
      },
    ],
  },

  {
    slug: 'luxury-home-furniture-india',
    metaTitle: 'Luxury Home Furniture India | Smart Heated & Cooling Recliners for Premium Homes',
    metaDescription:
      'Discover how Climate Craft outfitted a 6,000 sq. ft. luxury villa in Bengaluru with bespoke temperature-controlled 3-seater, 2-seater, and single smart recliners.',
    breadcrumb: 'Luxury Home Furniture',
    eyebrow: 'Luxury Interiors Case Study',
    title: 'Luxury Home Furniture India – Elevating Living',
    lead: 'Outfitting a 6,000 sq. ft. architectural villa in Bengaluru with custom climate-controlled smart seating for three generations.',
    heroImage: detailImage('11.48.29'),
    specificationTitle: 'Villa Furniture Collection Installed',
    specifications: [
      { label: 'Smart 3-Seater Recliner', value: 'Triple-zone hydro cooling & warming' },
      { label: 'Smart 2-Seater Living Sofa', value: 'Concealed touch & wireless charging' },
      { label: 'Single Executive Recliners', value: 'Tailored ergonomics for senior family' },
      { label: 'Automation Sync', value: 'Crestron & Control4 integration' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: '6,000 sq. ft. villa in Jayanagar, Bengaluru. Business executive couple, two teenagers, elderly parents.',
      },
      {
        heading: 'The Architectural & Multi-User Vision',
        body: 'Needed: central 3-seater for family movie nights; formal 2-seater for guests; single recliners for reading nooks and senior bedroom.',
      },
      {
        heading: 'The Climate Craft Complete Villa Installation',
        body: 'Suite of handcrafted furniture in Italian full-grain hides in muted sage and bone tones.',
      },
      {
        heading: 'Architect & Client Response',
        quote: 'Climate Craft gave us the rare combination of haute couture furniture design and genuine high-technology.',
        attribution: 'Lead architect Rajesh Menon.',
      },
    ],
    sidebarTitle: 'Jayanagar Villa',
    sidebarStats: [
      { label: 'Property Type', value: '6,000 sq. ft. Luxury Villa' },
      { label: 'Location', value: 'Jayanagar, Bengaluru' },
      { label: 'Pieces Installed', value: '3-Seater, 2-Seater, 2 Single Recliners' },
      { label: 'System Sync', value: 'Crestron / Control4 Integrated' },
    ],
    cta: {
      eyebrow: 'Luxury Interiors',
      heading: 'Outfit Your Villa with Bespoke Smart Seating',
      body: 'Work with our design team to create a cohesive suite of climate-controlled furniture perfectly matched to your architectural vision.',
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'Can Climate Craft recliners be customized to match custom villa interior palettes?',
        a: 'Over 40 shades of Italian aniline leathers, nubucks, and luxury performance fabrics.',
      },
      {
        q: 'Do you integrate with home automation systems like Crestron or Control4?',
        a: 'Yes, via Wi-Fi/Zigbee APIs.',
      },
    ],
  },

  {
    slug: 'home-theatre-recliner-india',
    metaTitle: 'Best Home Theatre Recliner in India | Smart Heated & Cooling Cinema Seating',
    metaDescription:
      'Explore how Climate Craft installed voice-controlled heated and cooling cinema seating in a 135-inch Dolby Atmos home theatre in Bengaluru.',
    breadcrumb: 'Home Theatre',
    eyebrow: 'Home Theatre Case Study',
    title: 'The Ultimate Home Theatre Recliner',
    lead: 'Creating an acoustically transparent, temperature-controlled cinema seating row for 135-inch 4K projection marathons in Bengaluru.',
    heroImage: detailImage('11.48.37'),
    specificationTitle: 'Cinema Spec Sheet',
    specifications: [
      { label: 'Acoustic Motor Dampening', value: 'Custom insulated housing (<22dB)' },
      { label: 'Dark-Mode Touchscreen', value: 'OLED armrest interface with auto-dimming' },
      { label: 'Hydro Thermal Control', value: '18°C cooling / 32°C warming loops' },
      { label: 'Cupholder Cooling', value: 'Active Peltier chillers in solid aluminum' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Kabir in Dollars Colony, Bengaluru. Dedicated 7.1.4 Dolby Atmos cinema with 135-inch 4K Laser Projector. Bespoke cinema recliners for 3–5 hour sessions.',
      },
      {
        heading: 'The Cinema Comfort Challenge',
        body: 'Needed: sub-25dB whisper-quiet motors; active cooling; voice and dark-mode controls.',
      },
      {
        heading: 'The Climate Craft Cinema Installation',
        body: 'Curved row of 4 Cinema Series Smart Electric Recliners in matte black acoustic velvet and leather accents.',
      },
      {
        heading: 'Homeowner Review',
        quote: 'The silent motors and temperature regulation completely change the movie watching experience.',
      },
    ],
    sidebarTitle: 'Dollars Colony Cinema',
    sidebarStats: [
      { label: 'AV Setup', value: '135" 4K / Dolby Atmos 7.1.4' },
      { label: 'Location', value: 'Dollars Colony, Bengaluru' },
      { label: 'Model Installed', value: 'Cinema Series Smart Recliners (Row of 4)' },
      { label: 'Acoustic Noise', value: '<22dB Ultra-Quiet' },
    ],
    cta: {
      eyebrow: 'Home Cinema',
      heading: 'Build Your Perfect Home Theatre Setup',
      body: 'Configure acoustically silent cinema recliners with active temperature control and dark-mode interfaces for the ultimate home screening experience.',
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'Does the motor sound disturb quiet movie scenes?',
        a: 'No. Below 22dB.',
      },
      {
        q: 'Can the cupholders keep beverages chilled?',
        a: 'Yes, Peltier armrest cupholders maintain 8°C.',
      },
    ],
  },

  {
    slug: 'smart-recliner-for-senior-citizens-india',
    metaTitle: 'Smart Recliner for Senior Citizens in India | Power Lift & Heated Seating',
    metaDescription:
      'Discover how Climate Craft power-lift smart recliners with soothing therapeutic warmth empower senior citizens in Bengaluru with safe, independent mobility.',
    breadcrumb: 'Senior Mobility',
    eyebrow: 'Senior Mobility Case Study',
    title: 'Smart Recliner for Senior Citizens in India',
    lead: 'Combining gentle motorized power-lift assistance with therapeutic warmth for joint stiffness relief in Sadashivanagar.',
    heroImage: detailImage('11.48.29'),
    specificationTitle: 'Care Series Spec Sheet',
    specifications: [
      { label: 'Power Stand-Assist Lift', value: 'Smooth, stable tilt motor rated up to 160kg' },
      { label: 'Therapeutic Heat Therapy', value: "Targeted 38°C spinal joint warmth" },
      { label: 'Large Tactile Remote', value: 'High-contrast backlit two-button controller' },
      { label: 'Emergency Battery Backup', value: 'Uninterrupted operation during power outages' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Dr. Murthy, 74-year-old retired professor, Sadashivanagar, Bengaluru. Joint stiffness and osteoarthritis.',
      },
      {
        heading: 'Senior Comfort & Safety Requirements',
        body: 'Needed: smooth tilt-and-lift mechanism; gentle lumbar heat (34°C–38°C); large tactile remote.',
      },
      {
        heading: 'The Climate Craft Care Series Installation',
        body: 'Senior Care Series Power-Lift Recliner in supple non-slip cognac leather with high-density ergonomic foam.',
      },
      {
        heading: 'Family Feedback',
        quote: 'My father has regained his full independence in the living room.',
        attribution: 'Daughter Sunitha.',
      },
    ],
    sidebarTitle: 'Sadashivanagar Residence',
    sidebarStats: [
      { label: 'User Profile', value: 'Senior Citizen Joint Care' },
      { label: 'Location', value: 'Sadashivanagar, Bengaluru' },
      { label: 'Model Installed', value: 'Senior Care Power-Lift Recliner' },
      { label: 'Primary Features', value: 'Power Lift + Spinal Heat Therapy' },
    ],
    cta: {
      eyebrow: 'Senior Mobility',
      heading: 'Give Your Loved Ones Safe, Independent Comfort',
      body: 'Our Care Series power-lift recliners are engineered for safe, effortless mobility with therapeutic heat designed for senior well-being.',
      linkText: 'Configure Yours',
    },
    faqs: [
      {
        q: 'Does the power-lift chair work during power cuts?',
        a: 'Yes. Integrated battery backup.',
      },
      {
        q: 'Is the remote easy for elderly users?',
        a: 'Simplified two-button tactile controllers with soft glow backlighting.',
      },
    ],
  },

  {
    slug: 'smart-recliner-for-medical-industry-india',
    metaTitle: 'Smart Recliner for Medical Industry in India | Premium Clinic Furniture',
    metaDescription:
      'Discover how premier private clinics and healthcare waiting suites in Bengaluru elevate visitor comfort with Climate Craft temperature-controlled electric recliners.',
    breadcrumb: 'Medical Industry',
    eyebrow: 'Healthcare & Commercial Case Study',
    title: 'Smart Recliner for the Medical Industry in India',
    lead: 'Elevating VIP visitor suites and executive physician lounges in a premier Bengaluru multi-specialty clinic with medical-grade leather and liquid climate controls.',
    heroImage: detailImage('11.51.12'),
    specificationTitle: 'Specification Highlights',
    specifications: [
      { label: 'Antimicrobial Coating', value: 'Impermeable to liquids & easily disinfected' },
      { label: 'Silent Motor Operation', value: 'Ultra-quiet micro-stepper motors' },
      { label: 'Liquid Climate Control', value: 'Range from 15°C cooling to 35°C warming' },
      { label: 'Modular Maintenance', value: 'Toolless quick-swap thermal cassettes' },
    ],
    articleSections: [
      {
        heading: 'Executive Overview',
        body: 'Leading private multi-specialty healthcare center, Cunningham Road, Bengaluru. Executive doctor rest lounges and VIP patient waiting suites.',
      },
      {
        heading: 'Commercial Healthcare Requirements',
        body: 'Needed: antimicrobial wipe-clean upholstery; whisper-quiet motors (<25dB); intuitive touch controls.',
      },
      {
        heading: 'The Climate Craft Healthcare Lounge Solution',
        body: '6 Commercial Lounge Electric Recliners in antimicrobial liquid-resistant synthetic leather in slate grey.',
      },
      {
        heading: 'Medical Facility Director Feedback',
        quote: 'The Climate Craft lounge chairs have transformed our VIP waiting suite into a world-class environment.',
        attribution: 'Dr. Suresh Rao, Managing Director.',
      },
    ],
    sidebarTitle: 'Cunningham Road Clinic',
    sidebarStats: [
      { label: 'Facility Type', value: 'Private Multi-Specialty Clinic' },
      { label: 'Location', value: 'Cunningham Road, Bengaluru' },
      { label: 'Units Installed', value: '6 Commercial Lounge Recliners' },
      { label: 'Upholstery', value: 'Antimicrobial Clinical Grade' },
    ],
    cta: {
      eyebrow: 'Healthcare & Commercial',
      heading: 'Upgrade Your Clinic or Healthcare Facility',
      body: 'Supply your waiting suites and physician lounges with commercial-grade climate-controlled recliners built to healthcare hygiene and acoustic standards.',
      linkText: 'Request Similar Build',
    },
    faqs: [
      {
        q: 'Is the upholstery suitable for frequent hospital/clinic sanitization?',
        a: 'Yes. Polyurethane and treated leathers withstand hospital disinfectants.',
      },
      {
        q: 'Do you offer commercial warranties?',
        a: '5-year commercial warranties covering motors, liquid thermal modules, and structural frames.',
      },
    ],
  },
]

export const CASE_STUDY_DETAIL_SLUGS: string[] = CASE_STUDY_DETAILS.map((cs) => cs.slug)

export function getCaseStudyDetailBySlug(slug: string | undefined): CaseStudyDetail | undefined {
  return CASE_STUDY_DETAILS.find((cs) => cs.slug === slug)
}