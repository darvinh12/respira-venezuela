// Optimiza los PNG de public/ para que pesen lo mínimo (clave en zonas con poca señal).
// Fuente del emblema: icon-512.png (512px). Fuente del logo completo: logo.png.
// Lee los originales en memoria antes de escribir, para poder sobrescribir sin perder la fuente.
import sharp from 'sharp'
import { readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const png = (quality = 82) => ({ quality, compressionLevel: 9, palette: true, effort: 10 })
const kb = (p) => (statSync(p).size / 1024).toFixed(1) + ' KB'

const emblemSrc = readFileSync(join(pub, 'icon-512.png'))
const logoSrc = readFileSync(join(pub, 'logo.png'))

const logoMeta = await sharp(logoSrc).metadata()
console.log(`Logo original: ${logoMeta.width}x${logoMeta.height}`)

await sharp(emblemSrc).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png(png()).toFile(join(pub, 'icon-512.png'))
await sharp(emblemSrc).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png(png()).toFile(join(pub, 'icon-192.png'))
await sharp(emblemSrc).resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png(png()).toFile(join(pub, 'favicon.png'))
await sharp(logoSrc).resize({ width: 440 }).png(png()).toFile(join(pub, 'logo.png'))

const logoOut = await sharp(readFileSync(join(pub, 'logo.png'))).metadata()
console.log('--- Tamaños finales ---')
for (const f of ['favicon.png', 'icon-192.png', 'icon-512.png', 'logo.png']) {
  console.log(`${f}: ${kb(join(pub, f))}`)
}
console.log(`logo.png mostrado: ${logoOut.width}x${logoOut.height}`)
