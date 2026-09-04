import { addressSingleLine } from '../data/siteConfig'

export const productImage = (key: string) => `/images/products/${key}.jpeg`

const PRODUCT_IMAGES: Record<string, string[]> = {
  'climate-craft-duo': ['01.png'],
  'climate-craft-grand': ['01.png', '02.png', '03.png', '04.png', '05.JPG', '06.JPG', '07.JPG', '08.JPG', '09.JPG'],
  'climate-craft-signature': ['01.png', '02.png', '03.png', '04.png', '05.JPG', '06.JPG', '07.JPG', '08.JPG'],
  'climate-craft-signature-new': [
    'DSC04689.png', // Hero image (index 1 / 0-th in array)
    'DSC04640.png',
    'DSC04646.png',
    'DSC04649.png',
    'DSC04669.png',
    'DSC04728.png',
    'DSC04735.png'
  ],
  'craft-classic': ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png'],
  'craft-classic-duo': ['01.png', '02.png', '03.png', '04.JPG', '05.JPG'],
  'craft-classic-grand': ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'],
  'craft-motion': ['01.png', '02.png', '03.png', '04.png'],
  'craft-motion-duo': ['01.png', '02.png', '03.JPG', '04.JPG', '05.JPG', '06.JPG'],
  'craft-motion-grand': ['01.png', '02.png', '03.png', '04.png'],
}

/** Hero photo for a Home-page product (see src/data/homeProducts.ts). */
export const homeProductImage = (slug: string) => {
  const images = PRODUCT_IMAGES[slug]
  if (images && images.length > 0) {
    return `/images/products/${slug}/${images[0]}`
  }
  return `/images/products/${slug}/01.png`
}

/**
 * Small (640px-wide) WebP/PNG derivatives of `homeProductImage`, pre-generated for the
 * Home page "Explore Collection" cards — those cards never render wider than 310px, so
 * the original 1512px source photos (2-3MB each) were massively oversized for display.
 * Only covers slugs with a generated `card.webp`/`card.png`; falls back to the full-size
 * original for anything else so a missing derivative never breaks the image.
 */
const HOME_CARD_IMAGE_SLUGS = new Set(Object.keys(PRODUCT_IMAGES))

export const homeCardImage = (slug: string): { webp: string; fallback: string } => {
  if (HOME_CARD_IMAGE_SLUGS.has(slug)) {
    return {
      webp: `/images/products/${slug}/card.webp`,
      fallback: `/images/products/${slug}/card.png`,
    }
  }
  const original = homeProductImage(slug)
  return { webp: original, fallback: original }
}

/** A specific angle (1-indexed) for a product with multiple verified photos. */
export const homeProductImageAt = (slug: string, index: number) => {
  const images = PRODUCT_IMAGES[slug]
  if (images && index >= 1 && index <= images.length) {
    return `/images/products/${slug}/${images[index - 1]}`
  }
  // Fallback
  return `/images/products/${slug}/${String(index).padStart(2, '0')}.png`
}

/** All verified angle images for a product, in order. */
export const homeProductImages = (slug: string, _imageCount: number) => {
  const images = PRODUCT_IMAGES[slug]
  if (images) {
    return images.map((file) => `/images/products/${slug}/${file}`)
  }
  // Fallback to imageCount logic if slug not found
  return Array.from({ length: _imageCount }, (_, i) => homeProductImageAt(slug, i + 1))
}

/** A specific angle (1-indexed) for a Projects-page space (see src/data/projects.ts). */
export const projectImageAt = (slug: string, index: number) =>
  `/images/projects/${slug}/${String(index).padStart(2, '0')}.png`

/** All verified angle images for a project space, in order. */
export const projectImages = (slug: string, imageCount: number) =>
  Array.from({ length: imageCount }, (_, i) => projectImageAt(slug, i + 1))

export const brand = {
  logo: '/images/brand/logo.png',
  heroVideo: '/videos/hero.mp4',
  heroPoster: '/videos/hero-poster.jpg',
  mechanicsVideo: '/videos/mechanics.mp4',
  mechanicsPoster: '/videos/mechanics-poster.jpg',
}

export const contact = {
  phoneDisplay: '+91 76193 43762',
  phoneHref: '917619343762',
  email: 'climatecrafttechnology@gmail.com',
  address: addressSingleLine,
  showrooms: 'Milan & New York',
}

export const whatsappHref = (message: string) =>
  `https://wa.me/${contact.phoneHref}?text=${encodeURIComponent(message)}`
