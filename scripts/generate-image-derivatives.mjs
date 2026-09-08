// One-off/rerunnable build tool: generates small WebP derivatives for the
// full-camera-resolution product/project photography checked into public/images,
// so the app can stop shipping 2-4MB PNG/JPEG files for images displayed at a
// few hundred pixels. Source files are left untouched. Safe to re-run — it
// skips a derivative if it's already newer than its source, and removes
// derivatives left behind by a source image that no longer exists.
//
// PRODUCT IMAGE WORKFLOW: every public/images/products/<slug>/ folder is
// scanned for sequentially-numbered master photos — 01.png, 02.jpg, 03.jpeg,
// etc. (any of .png/.jpg/.jpeg, sorted numerically, not alphabetically). 01 is
// always the product's main/primary image. Nothing about a product's image
// set is hardcoded here or in src/lib/assets.ts — this script is the only
// place that reads the filesystem; it writes the discovered, ordered list to
// src/data/generatedProductImages.ts, which the app's image helpers import.
// Different products may reuse the same filenames (each product's images are
// only ever a folder + filename apart) since every slug gets its own object key.
//
// Usage: node scripts/generate-image-derivatives.mjs
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const IMAGES_DIR = path.join(ROOT, 'public', 'images')
const PRODUCTS_DIR = path.join(IMAGES_DIR, 'products')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'generatedProductImages.ts')

const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])
// Master photo filenames: one or more digits, then a supported extension —
// e.g. 01.png, 02.JPG, 10.jpeg. Sorted by numeric value, not string order, so
// 09 < 10 regardless of digit count.
const NUMBERED_FILE_RE = /^(\d+)\.(png|jpe?g)$/i

/** @param {string} p */
async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

/** Skip regenerating a derivative that's already up to date with its source. */
async function needsBuild(srcPath, srcMtimeMs, outPath) {
  if (!(await exists(outPath))) return true
  const outStat = await fs.stat(outPath)
  return outStat.mtimeMs < srcMtimeMs
}

async function makeDerivative(srcPath, srcMtimeMs, outPath, maxDim, quality) {
  if (!(await needsBuild(srcPath, srcMtimeMs, outPath))) return 'skipped'
  await sharp(srcPath)
    .rotate() // respect EXIF orientation from camera originals
    .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath)
  return 'built'
}

function isDerivative(filename) {
  return /-(card|thumb)\.(webp|png)$/i.test(filename) || /^card\.(webp|png)$/i.test(filename)
}

async function listSourceImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await listSourceImages(path.join(dir, entry.name))))
    } else {
      const ext = path.extname(entry.name).toLowerCase()
      if (SOURCE_EXT.has(ext) && !isDerivative(entry.name)) {
        files.push(path.join(dir, entry.name))
      }
    }
  }
  return files
}

function withNewExt(filePath, suffix, ext) {
  const dir = path.dirname(filePath)
  const base = path.basename(filePath, path.extname(filePath))
  return path.join(dir, `${base}${suffix}.${ext}`)
}

/** Sorted ascending by the leading number, e.g. 02 < 09 < 10. */
function sortNumbered(filenames) {
  return [...filenames].sort((a, b) => {
    const na = parseInt(a.match(NUMBERED_FILE_RE)[1], 10)
    const nb = parseInt(b.match(NUMBERED_FILE_RE)[1], 10)
    return na - nb
  })
}

let built = 0
let skipped = 0
let removed = 0
let bytesBefore = 0
let bytesAfter = 0

async function processFile(file, variants) {
  const stat = await fs.stat(file)
  bytesBefore += stat.size
  for (const { suffix, maxDim, quality } of variants) {
    const outPath = withNewExt(file, suffix, 'webp')
    const result = await makeDerivative(file, stat.mtimeMs, outPath, maxDim, quality)
    if (result === 'built') built++
    else skipped++
    if (await exists(outPath)) {
      bytesAfter += (await fs.stat(outPath)).size
    }
  }
}

/**
 * Remove derivatives left behind by a source photo that was renamed/deleted —
 * e.g. `05.JPG` replaced by a new `05.png` is fine (same output name gets
 * overwritten), but if `06.JPG` was deleted outright, `06.webp`/`06-thumb.webp`
 * must not keep serving the old photo forever.
 */
async function removeOrphanDerivatives(dir, currentBasenames) {
  const entries = await fs.readdir(dir)
  for (const entry of entries) {
    const m = entry.match(/^(\d+)(-thumb)?\.webp$/i)
    if (!m) continue
    if (!currentBasenames.has(m[1])) {
      await fs.rm(path.join(dir, entry))
      removed++
    }
  }
}

/**
 * Scans every public/images/products/<slug> folder for sequentially-numbered
 * master photos and returns { slug: ['01.png', '02.jpg', ...] } in numeric
 * order. This is the single place product image order/identity is decided.
 */
async function discoverProductImages() {
  const slugs = (await fs.readdir(PRODUCTS_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

  /** @type {Record<string, string[]>} */
  const manifest = {}
  for (const slug of slugs) {
    const dir = path.join(PRODUCTS_DIR, slug)
    const entries = await fs.readdir(dir)
    const numbered = entries.filter((f) => NUMBERED_FILE_RE.test(f))
    if (numbered.length === 0) continue
    manifest[slug] = sortNumbered(numbered)
  }
  return manifest
}

async function writeManifest(manifest) {
  const lines = Object.entries(manifest).map(
    ([slug, files]) => `  '${slug}': [${files.map((f) => `'${f}'`).join(', ')}],`,
  )
  const content = `// AUTO-GENERATED by scripts/generate-image-derivatives.mjs — do not edit by hand.
// Regenerate with \`npm run optimize-images\` after adding/removing/replacing
// product photos. Each entry is the numerically-sorted list of master photo
// filenames found in public/images/products/<slug>/ — index 0 (the lowest
// number, always "01") is that product's main/primary image.
export const PRODUCT_IMAGES: Record<string, string[]> = {
${lines.join('\n')}
}
`
  await fs.writeFile(MANIFEST_PATH, content, 'utf-8')
}

async function main() {
  const projectsDir = path.join(IMAGES_DIR, 'projects')

  const productManifest = await discoverProductImages()

  // Product angle photos: full "main" viewer derivative + a tiny thumbnail
  // for the ProductViewer angle-picker strip (rendered at ~56-80px).
  for (const [slug, files] of Object.entries(productManifest)) {
    const dir = path.join(PRODUCTS_DIR, slug)
    for (const file of files) {
      await processFile(path.join(dir, file), [
        { suffix: '', maxDim: 1600, quality: 80 },
        { suffix: '-thumb', maxDim: 220, quality: 72 },
      ])
    }
    const currentBasenames = new Set(files.map((f) => f.match(NUMBERED_FILE_RE)[1]))
    await removeOrphanDerivatives(dir, currentBasenames)

    // Home-marquee card derivative (640px) generated from 01 — the first
    // (lowest-numbered) master photo — matching the existing
    // src/lib/assets.ts homeCardImage() convention.
    const first = path.join(dir, files[0])
    const cardWebp = path.join(dir, 'card.webp')
    const cardPng = path.join(dir, 'card.png')
    const stat = await fs.stat(first)
    if (await needsBuild(first, stat.mtimeMs, cardWebp)) {
      await sharp(first).rotate().resize({ width: 640, height: 800, fit: 'cover' }).webp({ quality: 76 }).toFile(cardWebp)
      built++
    } else skipped++
    if (await needsBuild(first, stat.mtimeMs, cardPng)) {
      await sharp(first).rotate().resize({ width: 640, height: 800, fit: 'cover' }).png({ quality: 80, compressionLevel: 9 }).toFile(cardPng)
      built++
    } else skipped++
  }

  await writeManifest(productManifest)

  // Project space photos (used as project hero/environment/detail images and
  // in case-study cards/galleries) — a single right-sized "main" derivative
  // covers both the larger detail views and the smaller card grids.
  const projectFiles = await listSourceImages(projectsDir)
  for (const file of projectFiles) {
    await processFile(file, [{ suffix: '', maxDim: 1600, quality: 80 }])
  }

  // Loose top-level detail/feature images referenced directly by About and
  // Features components (e.g. /images/craft.png, /images/about/motion.png).
  const looseFiles = [
    'craft.png',
    'motion.png',
    'material.png',
    'control.png',
    'ergonomics.png',
    'climate.jpg',
    'Green sofa 1.png',
    'recline control.jpg',
    'screen.jpg',
  ].map((f) => path.join(IMAGES_DIR, f))
  looseFiles.push(path.join(IMAGES_DIR, 'about', 'motion.png'))
  looseFiles.push(path.join(IMAGES_DIR, 'about', 'design.png'))

  for (const file of looseFiles) {
    if (!(await exists(file))) {
      console.warn(`skip (not found): ${file}`)
      continue
    }
    await processFile(file, [{ suffix: '', maxDim: 1400, quality: 80 }])
  }

  console.log(`\nProducts discovered: ${Object.keys(productManifest).length}`)
  for (const [slug, files] of Object.entries(productManifest)) {
    console.log(`  ${slug}: ${files.length} image(s), main = ${files[0]}`)
  }
  console.log(`\nDerivatives built: ${built}, skipped (up to date): ${skipped}, orphans removed: ${removed}`)
  console.log(`Source bytes touched: ${(bytesBefore / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Derivative bytes produced (this run's outputs, cumulative on disk): ${(bytesAfter / 1024 / 1024).toFixed(1)}MB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
