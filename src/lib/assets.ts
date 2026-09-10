
import { addressSingleLine } from '../data/siteConfig'
import { PRODUCT_IMAGES } from '../data/generatedProductImages'

export const productImage = (key: string) => `/images/products/${key}.jpeg`

/**
 * The source angle photos above are full camera-resolution JPEG/PNG originals
 * (1512-4240px, 2-4MB each) — far larger than any on-screen use of them. Every
 * helper below serves the pre-generated WebP derivative sitting next to the
 * original instead (same filename, `.webp` extension, ~90-96% smaller, visually
 * lossless at display size) — see scripts/generate-image-derivatives.mjs.
 */
const toWebp = (file: string) => file.replace(/\.(png|jpe?g)$/i, '.webp')

/** Hero photo for a Home-page product (see src/data/homeProducts.ts). */
export const homeProductImage = (slug: string) => {
  const images = PRODUCT_IMAGES[slug]
  if (images && images.length > 0) {
    return `/images/products/${slug}/${toWebp(images[0])}`
  }
  return `/images/products/${slug}/01.webp`
}

/**
 * Small (640px-wide) WebP/PNG derivatives of `homeProductImage`, pre-generated for the
 * Home page "Explore Collection" cards — those cards never render wider than 310px, so
 * the original 1512px source photos (2-3MB each) were massively oversized for display.
 *
 * IMPORTANT:
 * Climate Craft Grand must use its verified primary image (01.webp / 01.png)
 * in the Explore Collection card instead of card.webp/card.png.
 *
 * This is intentionally limited to this one product only.
 */
const HOME_CARD_IMAGE_SLUGS = new Set(Object.keys(PRODUCT_IMAGES))

export const homeCardImage = (slug: string): { webp: string; fallback: string } => {
  /**
   * Climate Craft Grand:
   * Always use the primary verified image (01.webp / 01.png).
   *
   * This prevents the Explore Collection card from using a stale or incorrect
   * card.webp/card.png derivative on the production/Cloudflare deployment.
   */
  if (slug === 'climate-craft-grand') {
    return {
      webp: `/images/products/${slug}/01.webp`,
      fallback: `/images/products/${slug}/01.png`,
    }
  }

  /**
   * All other products keep the existing card image behavior unchanged.
   */
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
    return `/images/products/${slug}/${toWebp(images[index - 1])}`
  }

  // Fallback
  return `/images/products/${slug}/${String(index).padStart(2, '0')}.webp`
}

/** All verified angle images for a product, in order. */
export const homeProductImages = (slug: string) => {
  const images = PRODUCT_IMAGES[slug]
  if (!images) return []

  return images.map((file) => `/images/products/${slug}/${toWebp(file)}`)
}

/** Number of verified angle photos discovered for a product — 0 means no photography yet. */
export const homeProductImageCount = (slug: string) =>
  PRODUCT_IMAGES[slug]?.length ?? 0

/**
 * Tiny (~5-20KB) derivative of `homeProductImageAt`, for contexts that only
 * ever show the image at thumbnail size — e.g. the ProductViewer angle-picker
 * strip, rendered at 56-80px. Falls back to the full derivative if a
 * dedicated thumb wasn't generated for this slug (never a broken image).
 */
export const homeProductThumbAt = (slug: string, index: number) => {
  const images = PRODUCT_IMAGES[slug]

  if (images && index >= 1 && index <= images.length) {
    return `/images/products/${slug}/${toWebp(images[index - 1]).replace(/\.webp$/, '-thumb.webp')}`
  }

  return homeProductImageAt(slug, index)
}

/** A specific angle (1-indexed) for a Projects-page space (see src/data/projects.ts). */
export const projectImageAt = (slug: string, index: number) =>
  `/images/projects/${slug}/${String(index).padStart(2, '0')}.webp`

/** All verified angle images for a project space. */
export const projectImages = (slug: string, imageCount: number) =>
  Array.from({ length: imageCount }, (_, i) => projectImageAt(slug, i + 1))

/**
 * Product-specific infographic shown as the final section of the Product Detail
 * page. Lives at `infographic.png` inside each product's own image folder
 * (same filename everywhere — the folder, keyed by `product.slug`, is what
 * makes each path unique). Not run through the WebP derivative pipeline since
 * these are hand-placed one-offs, not photography sets.
 */
export const productInfographicImage = (slug: string) =>
  `/images/products/${slug}/infographic.png`

export const brand = {
  logo: '/images/brand/logo.webp',
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

