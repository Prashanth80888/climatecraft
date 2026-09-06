// One-off/rerunnable build tool: generates small WebP derivatives for the
// full-camera-resolution product/project photography checked into public/images,
// so the app can stop shipping 2-4MB PNG/JPEG files for images displayed at a
// few hundred pixels. Source files are left untouched. Safe to re-run — it
// skips a derivative if it's already newer than its source.
//
// Usage: node scripts/generate-image-derivatives.mjs
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const IMAGES_DIR = path.join(ROOT, 'public', 'images')

const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

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

let built = 0
let skipped = 0
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

async function main() {
  const productsDir = path.join(IMAGES_DIR, 'products')
  const projectsDir = path.join(IMAGES_DIR, 'projects')

  // Product angle photos: full "main" viewer derivative + a tiny thumbnail
  // for the ProductViewer angle-picker strip (rendered at ~56-80px).
  const productFiles = await listSourceImages(productsDir)
  for (const file of productFiles) {
    await processFile(file, [
      { suffix: '', maxDim: 1600, quality: 80 },
      { suffix: '-thumb', maxDim: 220, quality: 72 },
    ])
  }

  // Ensure every product slug has a Home-marquee card derivative (640px),
  // matching the existing src/lib/assets.ts homeCardImage() convention.
  const productDirs = (await fs.readdir(productsDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
  for (const slug of productDirs) {
    const dir = path.join(productsDir, slug)
    const entries = await fs.readdir(dir)
    const angleFiles = entries.filter((f) => /^\d{2}\.(png|jpg|jpeg)$/i.test(f)).sort()
    if (angleFiles.length === 0) continue
    const first = path.join(dir, angleFiles[0])
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

  console.log(`\nDerivatives built: ${built}, skipped (up to date): ${skipped}`)
  console.log(`Source bytes touched: ${(bytesBefore / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Derivative bytes produced (this run's outputs, cumulative on disk): ${(bytesAfter / 1024 / 1024).toFixed(1)}MB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
