// Genera public/og-image.png (1200x630), la tarjeta que se ve al compartir el enlace.
// Compone el emblema sobre el degradado de marca + texto. Render por sharp (SVG -> PNG).
import sharp from 'sharp'
import { readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const emblem = readFileSync(join(pub, 'icon-512.png')).toString('base64')

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#357d92"/>
      <stop offset="0.55" stop-color="#2E6B7E"/>
      <stop offset="1" stop-color="#224f5d"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#F2B705" stop-opacity="0.30"/>
      <stop offset="0.72" stop-color="#F2B705" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="80" r="240" fill="url(#glow)"/>
  <image x="96" y="175" width="290" height="290" href="data:image/png;base64,${emblem}"/>
  <text x="430" y="285" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="#ffffff">Respira Venezuela</text>
  <text x="433" y="352" font-family="Arial, Helvetica, sans-serif" font-size="37" fill="#e9f2f3">Apoyo psicológico tras el terremoto</text>
  <text x="433" y="424" font-family="Arial, Helvetica, sans-serif" font-size="29" font-weight="700" fill="#F2B705">Guías · Calma · Números de ayuda · Sin internet</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(pub, 'og-image.png'))
console.log('og-image.png:', (statSync(join(pub, 'og-image.png')).size / 1024).toFixed(1) + ' KB')
