import { addressSingleLine } from '../data/siteConfig'

export const productImage = (key: string) => `/images/products/${key}.jpeg`

const SIGNATURE_NEW_IMAGES = [
  'DSC04689.png', // Hero image (index 1 / 0-th in array)
  'DSC04640.png',
  'DSC04646.png',
  'DSC04649.png',
  'DSC04669.png',
  'DSC04728.png',
  'DSC04735.png'
]

/** Hero photo for a Home-page product (see src/data/homeProducts.ts). */
export const homeProductImage = (slug: string) => {
  if (slug === 'climate-craft-signature-new') {
    return `/images/products/climate-craft-signature-new/${SIGNATURE_NEW_IMAGES[0]}`
  }
  return `/images/products/${slug}/01.png`
}

/** A specific angle (1-indexed) for a product with multiple verified photos. */
export const homeProductImageAt = (slug: string, index: number) => {
  if (slug === 'climate-craft-signature-new') {
    return `/images/products/climate-craft-signature-new/${SIGNATURE_NEW_IMAGES[index - 1]}`
  }
  return `/images/products/${slug}/${String(index).padStart(2, '0')}.png`
}

/** All verified angle images for a product, in order. */
export const homeProductImages = (slug: string, imageCount: number) => {
  if (slug === 'climate-craft-signature-new') {
    return SIGNATURE_NEW_IMAGES.map((file) => `/images/products/climate-craft-signature-new/${file}`)
  }
  return Array.from({ length: imageCount }, (_, i) => homeProductImageAt(slug, i + 1))
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
