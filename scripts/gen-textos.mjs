// Exporta el texto de lectura de cada guía a un JSON, para que gen-voz.py
// genere el audio de Sebastián por guía. El texto debe componerse IGUAL que en
// App.jsx (componente Guia) para que coincida lo que se lee.
import { guias } from '../src/data.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dir = dirname(fileURLToPath(import.meta.url))
const out = []
for (const [id, g] of Object.entries(guias)) {
  const texto = `${g.titulo}. ${g.intro} Qué puedes hacer: ${g.pasos.join(' ')} Mejor evita: ${g.evitar.join(' ')} ¿Cuándo buscar ayuda profesional? ${g.cuandoBuscar}`
  out.push({ id: `guia-${id}`, texto })
}
writeFileSync(join(dir, 'guias-texto.json'), JSON.stringify(out, null, 0), 'utf-8')
console.log(`${out.length} guías exportadas a scripts/guias-texto.json`)
