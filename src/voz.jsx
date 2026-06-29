import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Lectura en voz alta con la voz del propio teléfono (Web Speech API).
// Funciona sin internet en la mayoría de móviles modernos. Si no hay voz, todo
// degrada con elegancia: los botones no aparecen y queda el texto en pantalla.
//
// Elegimos la voz en español que mejor suene (prefiere Google / naturales) y
// además dejamos que el usuario escoja la suya en Ajustes (se recuerda).

const PREF_KEY = 'respira_voz'
let voces = []

function refrescarVoces() {
  if (typeof speechSynthesis === 'undefined') return
  voces = speechSynthesis.getVoices() || []
}
if (typeof speechSynthesis !== 'undefined') {
  refrescarVoces()
  speechSynthesis.addEventListener?.('voiceschanged', refrescarVoces)
}

export function hayVoz() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  )
}

// ---- Audio pregrabado (voz de Sebastián) para las frases de los ejercicios ----
// Suena igual de bien en cualquier dispositivo. Si una frase no tiene audio, se
// usa la voz del sistema como respaldo (p. ej. en las guías largas).
let audioMap = {}
let audioEl = null
if (typeof fetch !== 'undefined') {
  fetch('/audio/manifest.json')
    .then((r) => (r.ok ? r.json() : {}))
    .then((m) => { audioMap = m || {} })
    .catch(() => {})
}
export function hayAudio() { return Object.keys(audioMap).length > 0 }
export function puedeHablar() { return hayVoz() || hayAudio() }

// Solo voces en español.
export function vocesEs() {
  if (!voces.length) refrescarVoces()
  return voces.filter((v) => /^es/i.test(v.lang))
}

// Todas las voces (para poder elegir aunque no haya en español).
export function vocesTodas() {
  if (!voces.length) refrescarVoces()
  return voces
}

// Puntúa qué tan agradable/clara suele ser una voz en español.
function puntuar(v) {
  const n = (v.name || '').toLowerCase()
  let s = 0
  if (/^es/i.test(v.lang)) s += 100
  if (/es[-_](us|mx|419|co|ve|ar|cl)/i.test(v.lang)) s += 10 // español latino, más neutral aquí
  if (/es[-_]es/i.test(v.lang)) s += 5
  if (n.includes('google')) s += 35 // las de Google suenan más naturales
  if (n.includes('natural') || n.includes('neural')) s += 30
  if (n.includes('microsoft')) s += 12
  // nombres femeninos suelen percibirse más suaves
  if (/(paulina|sabina|helena|laura|mónica|monica|elena|lucia|lucía|sofía|sofia|google español)/.test(n)) s += 6
  if (n.includes('espeak')) s -= 60 // robótica, evitar
  return s
}

function mejorVoz() {
  const es = vocesEs()
  if (!es.length) return null
  return es.slice().sort((a, b) => puntuar(b) - puntuar(a))[0]
}

export function getVozPref() {
  try { return localStorage.getItem(PREF_KEY) || '' } catch { return '' }
}
export function setVozPref(name) {
  try {
    if (name) localStorage.setItem(PREF_KEY, name)
    else localStorage.removeItem(PREF_KEY)
  } catch { /* ignore */ }
}

function vozActual() {
  const pref = getVozPref()
  if (pref) {
    const v = vocesEs().find((x) => x.name === pref)
    if (v) return v
  }
  return mejorVoz()
}

export function hablar(texto, onFin) {
  if (!texto) return
  callar()
  // Si hay audio pregrabado para esta frase exacta, lo reproducimos (mejor voz).
  const url = audioMap[texto]
  if (url) {
    try {
      if (!audioEl) audioEl = new Audio()
      audioEl.src = url
      audioEl.onended = onFin || null
      const p = audioEl.play()
      if (p && p.catch) p.catch(() => hablarTTS(texto, onFin))
      return
    } catch { /* cae al respaldo */ }
  }
  hablarTTS(texto, onFin)
}

// Respaldo con la voz del sistema (para frases sin audio, como las guías).
function hablarTTS(texto, onFin) {
  if (!hayVoz() || !texto) return
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(texto)
    const v = vozActual()
    if (v) { u.voice = v; u.lang = v.lang }
    else u.lang = 'es-VE'
    u.rate = 0.9   // un poco más lento = más suave y fácil de seguir
    u.pitch = 1.02
    u.volume = 1
    if (onFin) u.onend = onFin
    speechSynthesis.speak(u)
  } catch { /* sin voz disponible */ }
}

export function callar() {
  try { if (audioEl) { audioEl.pause(); audioEl.onended = null } } catch { /* nada */ }
  try { if (hayVoz()) speechSynthesis.cancel() } catch { /* nada */ }
}

// Botón para leer un texto a demanda (guías y listas).
export function BotonEscuchar({ texto, src, etiqueta = 'Escuchar' }) {
  const [hablando, setHablando] = useState(false)
  const audioRef = useRef(null)
  const detener = () => {
    try { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } } catch { /* */ }
    callar()
  }
  useEffect(() => () => detener(), []) // eslint-disable-line react-hooks/exhaustive-deps
  if (!hayVoz() && !src) return null
  const toggle = () => {
    if (hablando) { detener(); setHablando(false); return }
    if (src) {
      // Audio pregrabado de la guía (voz de Sebastián); si falla, voz del sistema.
      const a = new Audio(src)
      audioRef.current = a
      a.onended = () => setHablando(false)
      const fallback = () => { audioRef.current = null; hablar(texto, () => setHablando(false)) }
      a.onerror = fallback
      const p = a.play()
      if (p && p.catch) p.catch(fallback)
    } else {
      hablar(texto, () => setHablando(false))
    }
    setHablando(true)
  }
  return (
    <button className={'btn-escuchar' + (hablando ? ' on' : '')} onClick={toggle} aria-pressed={hablando}>
      {hablando ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
      {hablando ? 'Detener' : etiqueta}
    </button>
  )
}

// Botón de encendido/apagado de voz para ejercicios con fases o pasos.
export function BotonVoz({ activa, onClick }) {
  if (!puedeHablar()) return null
  return (
    <button className={'btn-voz' + (activa ? ' on' : '')} onClick={onClick} aria-pressed={activa}>
      {activa ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
      {activa ? 'Voz activada' : 'Activar voz'}
    </button>
  )
}

// Selector de voz para Ajustes: lista las voces en español y deja probarlas.
export function SelectorVoz() {
  const [lista, setLista] = useState(() => vocesEs())
  const [sel, setSel] = useState(() => getVozPref())

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') return
    const actualizar = () => { refrescarVoces(); setLista(vocesEs()) }
    speechSynthesis.addEventListener?.('voiceschanged', actualizar)
    actualizar()
    return () => speechSynthesis.removeEventListener?.('voiceschanged', actualizar)
  }, [])

  if (!hayVoz()) return null

  const probar = () => hablar('Hola. Así sonará la lectura en Respira. Respira hondo, estás a salvo.')
  const cambiar = (name) => { setSel(name); setVozPref(name); probar() }

  return (
    <div className="selector-voz">
      <p className="modal-sub">Voz de lectura</p>
      {lista.length === 0 ? (
        <p className="ajustes-nota">Tu dispositivo no tiene voces en español ahora mismo. La lectura usará la voz por defecto si hay alguna.</p>
      ) : (
        <>
          <select className="select-voz" value={sel} onChange={(e) => cambiar(e.target.value)} aria-label="Elegir voz de lectura">
            <option value="">Automática (la mejor de tu equipo)</option>
            {lista.map((v) => (
              <option key={v.voiceURI} value={v.name}>{v.name} · {v.lang}</option>
            ))}
          </select>
          <button className="btn-escuchar" onClick={probar}>
            <Volume2 size={18} aria-hidden="true" /> Probar voz
          </button>
        </>
      )}
    </div>
  )
}
