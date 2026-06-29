import { useState, useEffect, useRef } from 'react'
import {
  Heart, Baby, Users, Siren, Wind, Activity, Moon, Home as HomeIcon, HeartCrack, CloudRain,
  CircleHelp, MessagesSquare, ToyBrick, HeartHandshake, Ear, CircleOff, Accessibility,
  LifeBuoy, MessageSquareWarning, Flame, Phone, Play, NotebookPen, House, ChevronRight,
  ChevronLeft, X, Globe, ArrowRight, CheckCircle2, Hand, ExternalLink, Square, Cloud, Sparkles,
  Share2, Download, Trash2, Music, BookOpen, Palette, Pencil, Box, Sprout, Star, ListChecks, Settings2,
} from 'lucide-react'
import { personas, situaciones, guias, directorio, videos, actividades } from './data.js'
import {
  Respiracion, Grounding, RespiracionCaja, Mariposa, Musculos, LugarSeguro,
  FrascoCalma, RespiracionPeluche, SoplarVela, RinconCalma, FrasesSeguridad, Sonidos,
  Suspiro, EmpujarPared, EmpujarPersona,
} from './Herramientas.jsx'
import { BotonEscuchar, SelectorVoz } from './voz.jsx'

// Datos para compartir la app (Web Share API).
const SHARE_DATA = {
  title: 'Respira Venezuela',
  text: 'Apoyo psicológico gratuito tras el terremoto: guías paso a paso, ejercicios de calma y números de ayuda verificados.',
  url: 'https://respira-venezuela.pages.dev/',
}

// Mapa de nombres (en data.js) a componentes de ícono Lucide
const ICONS = {
  Heart, Baby, Users, Siren, Wind, Activity, Moon, Home: HomeIcon, HeartCrack, CloudRain,
  CircleHelp, MessagesSquare, ToyBrick, HeartHandshake, Ear, CircleOff, Accessibility,
  LifeBuoy, MessageSquareWarning, Flame, Phone, Play, NotebookPen, House, Hand,
  Sparkles, Palette, Pencil, Box, Star, ListChecks, Sprout,
}
function Icon({ name, size = 24, ...rest }) {
  const C = ICONS[name] || Heart
  return <C size={size} strokeWidth={2} aria-hidden="true" {...rest} />
}

export default function App() {
  const [view, setView] = useState({ name: 'home' })
  const [ayuda, setAyuda] = useState(false)
  const [ajustes, setAjustes] = useState(false)
  const [historia, setHistoria] = useState([])
  const [installEvt, setInstallEvt] = useState(null)
  const [textScale, setTextScale] = useTextScale()

  // Captura el evento de instalación (PWA) para ofrecer "Instalar app".
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallEvt(e) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    const onInstalled = () => setInstallEvt(null)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const instalar = async () => {
    if (!installEvt) return
    installEvt.prompt()
    try { await installEvt.userChoice } catch { /* ignore */ }
    setInstallEvt(null)
  }

  const go = (next) => { setHistoria((h) => [...h, view]); setView(next); window.scrollTo(0, 0) }
  const back = () => {
    setHistoria((h) => {
      if (h.length === 0) { setView({ name: 'home' }); return [] }
      setView(h[h.length - 1]); return h.slice(0, -1)
    })
    window.scrollTo(0, 0)
  }
  const home = () => { setHistoria([]); setView({ name: 'home' }); window.scrollTo(0, 0) }
  const accion = (tool) => (tool === 'directorio' ? go({ name: 'directorio' }) : go({ name: 'tool', tool }))

  return (
    <div className="app">
      <Header onHome={home} onBack={view.name !== 'home' ? back : null} onAjustes={() => setAjustes(true)} />
      <main className="main">
        {view.name === 'home' && <Home go={go} installEvt={installEvt} instalar={instalar} />}
        {view.name === 'persona' && <Persona personaId={view.personaId} go={go} />}
        {view.name === 'guia' && <Guia guiaId={view.guiaId} accion={accion} />}
        {view.name === 'calma' && <Calma go={go} />}
        {view.name === 'tool' && <Tool tool={view.tool} />}
        {view.name === 'directorio' && <Directorio />}
        {view.name === 'videos' && <Videos />}
        {view.name === 'actividades' && <Actividades />}
        {view.name === 'diario' && <Diario />}
        <Footer />
      </main>

      <button className="fab" onClick={() => setAyuda(true)} aria-label="Abrir ayuda inmediata">
        <LifeBuoy size={22} strokeWidth={2.4} aria-hidden="true" /> Ayuda ahora
      </button>

      <Nav view={view} go={go} home={home} />
      {ayuda && <AyudaAhora onClose={() => setAyuda(false)} go={go} />}
      {ajustes && <Ajustes onClose={() => setAjustes(false)} textScale={textScale} setTextScale={setTextScale} />}
    </div>
  )
}

// Tamaño de texto accesible: escala global persistida, aplicada a la raíz.
const ESCALAS_TEXTO = [
  { v: 1, n: 'Normal' },
  { v: 1.15, n: 'Grande' },
  { v: 1.3, n: 'Más grande' },
]
function useTextScale() {
  const [scale, setScale] = useState(() => {
    try { return Number(localStorage.getItem('respira_text_scale')) || 1 } catch { return 1 }
  })
  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', String(scale))
    try { localStorage.setItem('respira_text_scale', String(scale)) } catch { /* ignore */ }
  }, [scale])
  return [scale, setScale]
}

function Ajustes({ onClose, textScale, setTextScale }) {
  const panelRef = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    panelRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [onClose])

  return (
    <div className="modal-bg" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ajustes">
      <div className="modal" onClick={(e) => e.stopPropagation()} ref={panelRef} tabIndex={-1}>
        <div className="modal-grip" aria-hidden="true" />
        <div className="modal-scroll">
          <h2 className="ajustes-h2"><Settings2 size={22} aria-hidden="true" /> Ajustes</h2>
          <p className="modal-sub">Tamaño del texto</p>
          <div className="text-size-row" role="group" aria-label="Tamaño del texto">
            {ESCALAS_TEXTO.map((o) => (
              <button
                key={o.n}
                className={'text-size-btn' + (textScale === o.v ? ' on' : '')}
                onClick={() => setTextScale(o.v)}
                aria-pressed={textScale === o.v}
              >
                <span className="text-size-a" style={{ fontSize: `calc(1rem * ${o.v})` }} aria-hidden="true">A</span>
                <small>{o.n}</small>
              </button>
            ))}
          </div>
          <SelectorVoz />
        </div>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

function Header({ onHome, onBack, onAjustes }) {
  return (
    <header className="header">
      {onBack ? (
        <button className="header-btn" onClick={onBack} aria-label="Volver a la pantalla anterior">
          <ChevronLeft size={20} aria-hidden="true" /> Volver
        </button>
      ) : <span className="header-btn ghost" />}
      <button className="brand" onClick={onHome} aria-label="Ir al inicio de Respira">
        <img className="brand-mark" src="/icon-192.png" alt="" aria-hidden="true" />
        <span className="brand-text">Respira <span className="brand-sub">Venezuela</span></span>
      </button>
      <button className="header-btn icon-only" onClick={onAjustes} aria-label="Ajustes de accesibilidad">
        <Settings2 size={21} aria-hidden="true" />
      </button>
    </header>
  )
}

function Home({ go, installEvt, instalar }) {
  return (
    <>
      <img className="home-logo" src="/logo.png" alt="Respira Venezuela — Apoyo psicológico" />
      <section className="hero">
        <p className="hero-eyebrow">Estamos contigo</p>
        <h1>No estás solo/a.</h1>
        <p className="hero-text">Apoyo psicológico para después del terremoto. Respira. Vamos paso a paso.</p>
      </section>

      <h2 className="section-title">¿Quién busca apoyo?</h2>
      <p className="section-hint">Elige tu situación para encontrar ayuda hecha para ti.</p>

      <div className="cards">
        {personas.map((p) => (
          <button key={p.id} className="card persona-card" data-color={p.color} onClick={() => go({ name: 'persona', personaId: p.id })}>
            <span className={`chip chip-${p.color}`}><Icon name={p.icon} size={26} /></span>
            <span className="card-body">
              <span className="card-title">{p.titulo}</span>
              <span className="card-desc">{p.desc}</span>
            </span>
            <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="quick-row">
        <button className="quick" onClick={() => go({ name: 'calma' })}><span className="quick-ic chip-azul"><Wind size={22} /></span>Calma ya</button>
        <button className="quick" onClick={() => go({ name: 'tool', tool: 'sonidos' })}><span className="quick-ic chip-verde"><Music size={22} /></span>Sonidos</button>
        <button className="quick" onClick={() => go({ name: 'actividades' })}><span className="quick-ic chip-amarillo"><ListChecks size={22} /></span>Actividades</button>
        <button className="quick" onClick={() => go({ name: 'directorio' })}><span className="quick-ic chip-verde"><Phone size={22} /></span>Números</button>
        <button className="quick" onClick={() => go({ name: 'videos' })}><span className="quick-ic chip-amarillo"><Play size={22} /></span>Videos</button>
        <button className="quick" onClick={() => go({ name: 'diario' })}><span className="quick-ic chip-terracota"><NotebookPen size={22} /></span>Mi diario</button>
      </div>

      <CompartirInstalar installEvt={installEvt} instalar={instalar} />

      <p className="disclaimer">
        Respira es apoyo de primera línea, <strong>no reemplaza</strong> la atención profesional ni los servicios de emergencia.
        Si hay peligro para la vida, llama al <a href="tel:171">171</a>.
      </p>
    </>
  )
}

// Compartir la app (difunde las líneas de ayuda) e instalarla en el teléfono.
function CompartirInstalar({ installEvt, instalar }) {
  const [copiado, setCopiado] = useState(false)

  const compartir = async () => {
    try {
      if (navigator.share) { await navigator.share(SHARE_DATA); return }
    } catch { return /* el usuario canceló */ }
    try {
      await navigator.clipboard.writeText(SHARE_DATA.url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch { /* sin portapapeles */ }
  }

  return (
    <section className="compartir" aria-label="Compartir e instalar">
      <p className="compartir-msg">Ayuda a que esto llegue a quien lo necesita.</p>
      <div className="compartir-row">
        <button className="compartir-btn" onClick={compartir}>
          <Share2 size={19} aria-hidden="true" /> {copiado ? '¡Enlace copiado!' : 'Compartir Respira'}
        </button>
        {installEvt && (
          <button className="compartir-btn alt" onClick={instalar}>
            <Download size={19} aria-hidden="true" /> Instalar app
          </button>
        )}
      </div>
    </section>
  )
}

function Persona({ personaId, go }) {
  const persona = personas.find((p) => p.id === personaId)
  const lista = situaciones[personaId] || []
  return (
    <>
      <section className="persona-head">
        <span className={`chip big chip-${persona.color}`}><Icon name={persona.icon} size={34} /></span>
        <h1>{persona.titulo}</h1>
        <p>Toca lo que más se parece a lo que estás viviendo.</p>
      </section>
      <div className="cards">
        {lista.map((s) => (
          <button key={s.id} className={'card sit-card' + (s.urgente ? ' urgente' : '')} onClick={() => go({ name: 'guia', guiaId: s.id })}>
            <span className={'chip ' + (s.urgente ? 'chip-terracota' : `chip-${persona.color}`)}><Icon name={s.icon} size={24} /></span>
            <span className="card-title">{s.titulo}</span>
            <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
          </button>
        ))}
      </div>

      {personaId === 'padres' && (
        <>
          <h2 className="section-title">Calmar a tu hijo/a</h2>
          <p className="section-hint">Juegos y herramientas para hacer juntos y bajar el miedo.</p>
          <div className="cards">
            <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'frasco' })}>
              <span className="chip chip-amarillo"><Sparkles size={24} /></span>
              <span className="card-title">Frasco de la calma</span>
              <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
            </button>
            <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'peluche' })}>
              <span className="chip chip-verde"><Heart size={24} /></span>
              <span className="card-title">Respira con tu peluche</span>
              <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
            </button>
            <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'vela' })}>
              <span className="chip chip-terracota"><Flame size={24} /></span>
              <span className="card-title">Apaga la vela</span>
              <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
            </button>
            <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'rincon' })}>
              <span className="chip chip-azul"><HomeIcon size={24} /></span>
              <span className="card-title">Rincón de la calma</span>
              <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
            </button>
            <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'frases' })}>
              <span className="chip chip-verde"><HeartHandshake size={24} /></span>
              <span className="card-title">Frases que dan seguridad</span>
              <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </>
  )
}

function Guia({ guiaId, accion }) {
  const g = guias[guiaId]
  if (!g) return <p>Contenido no disponible.</p>
  const textoVoz = `${g.titulo}. ${g.intro} Qué puedes hacer: ${g.pasos.join(' ')} Mejor evita: ${g.evitar.join(' ')} ¿Cuándo buscar ayuda profesional? ${g.cuandoBuscar}`
  return (
    <article className="guia">
      <h1>{g.titulo}</h1>
      <p className="guia-intro">{g.intro}</p>
      <div className="escuchar-row"><BotonEscuchar src={`/audio/guia-${guiaId}.mp3`} texto={textoVoz} etiqueta="Escuchar esta guía" /></div>

      {g.accionRapida && (
        <button className="accion-rapida" onClick={() => accion(g.accionRapida.tool)}>
          {g.accionRapida.label} <ArrowRight size={18} aria-hidden="true" />
        </button>
      )}

      <h3 className="bloque-title hacer"><CheckCircle2 size={20} aria-hidden="true" /> Qué puedes hacer</h3>
      <ol className="pasos">{g.pasos.map((p, i) => <li key={i}>{p}</li>)}</ol>

      <h3 className="bloque-title evitar-title"><X size={20} aria-hidden="true" /> Mejor evita</h3>
      <ul className="evitar">{g.evitar.map((e, i) => <li key={i}>{e}</li>)}</ul>

      <div className="cuando">
        <strong><LifeBuoy size={18} aria-hidden="true" /> ¿Cuándo buscar ayuda profesional?</strong>
        <p>{g.cuandoBuscar}</p>
      </div>

      <p className="fuente">Fuente: {g.fuente}</p>
    </article>
  )
}

function ToolCard({ go, tool, color, Ic, titulo, desc }) {
  return (
    <button className="card sit-card" onClick={() => go({ name: 'tool', tool })}>
      <span className={`chip chip-${color}`}><Ic size={24} /></span>
      <span className="card-body">
        <span className="card-title">{titulo}</span>
        <span className="card-desc">{desc}</span>
      </span>
      <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
    </button>
  )
}

function Calma({ go }) {
  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-azul"><Wind size={34} /></span>
        <h1>Calma ya</h1>
        <p>Toca la que necesites. Cada una te dice para qué sirve y te guía paso a paso.</p>
      </section>

      <h2 className="section-title">Respirar</h2>
      <p className="section-hint">Para bajar la angustia con el aire.</p>
      <div className="cards">
        <ToolCard go={go} tool="respiracion" color="azul" Ic={Wind} titulo="Respiración guiada" desc="Baja la angustia con el ritmo del aire" />
        <ToolCard go={go} tool="caja" color="azul" Ic={Square} titulo="Respiración en caja" desc="Calma firme, la que usan los rescatistas" />
        <ToolCard go={go} tool="suspiro" color="terracota" Ic={Wind} titulo="Suspiro inducido" desc="Cuando la angustia se pasa del límite" />
      </div>

      <h2 className="section-title">Anclar el cuerpo</h2>
      <p className="section-hint">Para volver al aquí y ahora.</p>
      <div className="cards">
        <ToolCard go={go} tool="grounding" color="verde" Ic={Hand} titulo="Grounding 5-4-3-2-1" desc="Vuelve al presente usando tus sentidos" />
        <ToolCard go={go} tool="mariposa" color="terracota" Ic={Heart} titulo="Abrazo de la mariposa" desc="Golpecitos suaves que tranquilizan" />
        <ToolCard go={go} tool="musculos" color="amarillo" Ic={Activity} titulo="Relajación muscular" desc="Suelta la tensión zona por zona" />
        <ToolCard go={go} tool="lugar" color="verde" Ic={Cloud} titulo="Tu lugar seguro" desc="Imagina un sitio donde estás a salvo" />
      </div>

      <h2 className="section-title">Descargar la tensión</h2>
      <p className="section-hint">Para cuando la activación sobrepasa lo incómodo y te vas a los bordes. No hay forma buena ni mala de hacerlo.</p>
      <div className="cards">
        <ToolCard go={go} tool="empujar-pared" color="terracota" Ic={Hand} titulo="Empujar la pared" desc="Saca la energía que te abruma" />
        <ToolCard go={go} tool="empujar-persona" color="verde" Ic={HeartHandshake} titulo="Empujar con otra persona" desc="Descarga la tensión acompañado" />
      </div>

      <h2 className="section-title">Acompañarte</h2>
      <p className="section-hint">Sonido de fondo para relajarte o dormir.</p>
      <div className="cards">
        <ToolCard go={go} tool="sonidos" color="azul" Ic={Music} titulo="Sonidos para calmar" desc="Lluvia, olas o viento, sin internet" />
      </div>
    </>
  )
}

function Tool({ tool }) {
  if (tool === 'respiracion') return <Respiracion />
  if (tool === 'grounding') return <Grounding />
  if (tool === 'caja') return <RespiracionCaja />
  if (tool === 'mariposa') return <Mariposa />
  if (tool === 'musculos') return <Musculos />
  if (tool === 'lugar') return <LugarSeguro />
  if (tool === 'suspiro') return <Suspiro />
  if (tool === 'empujar-pared') return <EmpujarPared />
  if (tool === 'empujar-persona') return <EmpujarPersona />
  if (tool === 'frasco') return <FrascoCalma />
  if (tool === 'peluche') return <RespiracionPeluche />
  if (tool === 'vela') return <SoplarVela />
  if (tool === 'rincon') return <RinconCalma />
  if (tool === 'frases') return <FrasesSeguridad />
  if (tool === 'sonidos') return <Sonidos />
  return null
}

function Directorio() {
  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-verde"><Phone size={34} /></span>
        <h1>Números de ayuda</h1>
        <p>Líneas verificadas. Toca un número para llamar.</p>
      </section>
      {directorio.map((bloque) => (
        <div key={bloque.grupo} className="dir-grupo">
          <h3>{bloque.grupo}</h3>
          {bloque.items.map((it) => (
            <div key={it.nombre} className={'dir-item' + (it.urgente ? ' urgente' : '')}>
              <div className="dir-nombre">{it.nombre}</div>
              <div className="dir-detalle">{it.detalle}</div>
              <div className="dir-tels">
                {(it.tels || []).map((t) => (
                  <a key={t} className="tel" href={`tel:${t.replace(/[^0-9*]/g, '')}`}><Phone size={16} aria-hidden="true" /> {t}</a>
                ))}
                {it.web && <a className="tel web" href={it.web} target="_blank" rel="noreferrer"><Globe size={16} aria-hidden="true" /> Abrir</a>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

function Videos() {
  const cats = [...new Set(videos.map((v) => v.categoria))]
  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-amarillo"><Play size={34} /></span>
        <h1>Videos</h1>
        <p>De fuentes serias. Requieren conexión a internet.</p>
      </section>
      {cats.map((cat) => (
        <div key={cat} className="dir-grupo">
          <h3>{cat}</h3>
          <div className="cards">
            {videos.filter((v) => v.categoria === cat).map((v) => (
              <a key={v.url} className="card sit-card" href={v.url} target="_blank" rel="noreferrer">
                <span className="chip chip-terracota"><Play size={22} /></span>
                <span className="card-body">
                  <span className="card-title">{v.titulo}</span>
                  <span className="card-desc">{v.fuente}</span>
                </span>
                <ExternalLink className="card-arrow" size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

// Descarga un texto como archivo (offline). Reutilizado por actividades y material.
function descargarTexto(nombre, contenido) {
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}

function textoActividad(a) {
  const mat = a.materiales?.length
    ? `Materiales:\n${a.materiales.map((m) => `  • ${m}`).join('\n')}\n\n`
    : ''
  const pasos = a.pasos.map((p, i) => `  ${i + 1}. ${p}`).join('\n')
  return `${a.titulo}  (${a.grupo})\n\n${a.intro}\n\n${mat}Paso a paso:\n${pasos}\n\nFuente: ${a.fuente}\n\n— Respira Venezuela`
}

function textoNumeros() {
  let out = 'NÚMEROS DE AYUDA · Respira Venezuela\n\n'
  directorio.forEach((b) => {
    out += `— ${b.grupo} —\n`
    b.items.forEach((it) => {
      const tels = (it.tels || []).join(' · ')
      out += `${it.nombre}: ${tels}${it.web ? ` (${it.web})` : ''}\n  ${it.detalle}\n\n`
    })
  })
  out += 'Si hay peligro para la vida, llama al 171.\n'
  return out
}

function textoGuiaBolsillo() {
  let out = 'GUÍA DE BOLSILLO · Respira Venezuela\nApoyo psicológico tras el terremoto\n\n'
  out += '========================\nNÚMEROS DE AYUDA\n========================\n\n'
  directorio.forEach((b) => {
    out += `— ${b.grupo} —\n`
    b.items.forEach((it) => {
      const tels = (it.tels || []).join(' · ')
      out += `${it.nombre}: ${tels}${it.web ? ` (${it.web})` : ''}\n  ${it.detalle}\n`
    })
    out += '\n'
  })
  out += '\n========================\nGUÍAS PASO A PASO\n========================\n'
  Object.values(guias).forEach((g) => {
    out += `\n### ${g.titulo} ###\n${g.intro}\n\nQué puedes hacer:\n`
    out += g.pasos.map((p, i) => `  ${i + 1}. ${p}`).join('\n')
    out += '\n\nMejor evita:\n' + g.evitar.map((e) => `  x ${e}`).join('\n')
    out += `\n\n¿Cuándo buscar ayuda profesional?\n  ${g.cuandoBuscar}\n  Fuente: ${g.fuente}\n`
  })
  out += '\n\nRespira es apoyo de primera línea, no reemplaza la atención profesional ni los servicios de emergencia. Si hay peligro para la vida, llama al 171.\n'
  return out
}

function Actividades() {
  const [abierta, setAbierta] = useState(null)
  const grupos = [...new Set(actividades.map((a) => a.grupo))]

  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-amarillo"><ListChecks size={34} /></span>
        <h1>Actividades</h1>
        <p>Ejercicios para hacer en casa, a tu ritmo. Puedes descargarlos para imprimir o guardar.</p>
      </section>

      <div className="material">
        <h3 className="material-title"><Download size={18} aria-hidden="true" /> Material para descargar</h3>
        <p className="material-sub">Guárdalo en tu teléfono para tenerlo aunque no haya internet.</p>
        <div className="material-btns">
          <button className="material-btn" onClick={() => descargarTexto('guia-de-bolsillo-respira.txt', textoGuiaBolsillo())}>
            <BookOpen size={18} aria-hidden="true" /> Guía de bolsillo
          </button>
          <button className="material-btn" onClick={() => descargarTexto('numeros-de-ayuda-respira.txt', textoNumeros())}>
            <Phone size={18} aria-hidden="true" /> Números de ayuda
          </button>
        </div>
      </div>

      {grupos.map((grupo) => (
        <div key={grupo} className="dir-grupo">
          <h3>{grupo}</h3>
          <div className="cards">
            {actividades.filter((a) => a.grupo === grupo).map((a) => {
              const open = abierta === a.id
              return (
                <div key={a.id} className={'actividad' + (open ? ' open' : '')}>
                  <button className="actividad-head" onClick={() => setAbierta(open ? null : a.id)} aria-expanded={open}>
                    <span className="chip chip-amarillo"><Icon name={a.icon} size={24} /></span>
                    <span className="actividad-tit">
                      <span className="card-title">{a.titulo}</span>
                      <span className="card-desc">{a.intro}</span>
                    </span>
                    <ChevronRight className={'card-arrow act-arrow' + (open ? ' rot' : '')} size={22} aria-hidden="true" />
                  </button>
                  {open && (
                    <div className="actividad-body">
                      {a.materiales?.length > 0 && (
                        <>
                          <h4 className="act-h">Materiales</h4>
                          <ul className="act-mat">{a.materiales.map((m, i) => <li key={i}>{m}</li>)}</ul>
                        </>
                      )}
                      <h4 className="act-h">Paso a paso</h4>
                      <ol className="pasos">{a.pasos.map((p, i) => <li key={i}>{p}</li>)}</ol>
                      <p className="fuente">Fuente: {a.fuente}</p>
                      <button className="material-btn full" onClick={() => descargarTexto(`actividad-${a.id}.txt`, textoActividad(a))}>
                        <Download size={18} aria-hidden="true" /> Descargar esta actividad
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

function Diario() {
  const ANIMOS = [
    { v: 1, e: '😣', t: 'Muy mal' },
    { v: 2, e: '😟', t: 'Mal' },
    { v: 3, e: '😐', t: 'Regular' },
    { v: 4, e: '🙂', t: 'Bien' },
    { v: 5, e: '😌', t: 'Tranquilo/a' },
  ]
  const [registros, setRegistros] = useState([])
  const [animo, setAnimo] = useState(3)
  const [nota, setNota] = useState('')
  const [confirmar, setConfirmar] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('respira_diario')
      if (raw) setRegistros(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  const persistir = (next) => {
    setRegistros(next)
    try { localStorage.setItem('respira_diario', JSON.stringify(next)) } catch { /* ignore */ }
  }

  const guardar = () => {
    const fecha = new Date().toLocaleString('es-VE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    persistir([{ animo, nota, fecha }, ...registros].slice(0, 60))
    setNota('')
  }

  const borrar = (idx) => persistir(registros.filter((_, i) => i !== idx))
  const borrarTodo = () => { persistir([]); setConfirmar(false) }

  const exportar = () => {
    const texto = registros.map((r) => {
      const cara = ANIMOS.find((a) => a.v === r.animo)
      return `${r.fecha} — ${cara ? cara.t : r.animo}/5${r.nota ? `\n  ${r.nota}` : ''}`
    }).join('\n\n')
    descargarTexto('mi-diario-respira.txt', `Mi diario · Respira Venezuela\n\n${texto}\n`)
  }

  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-terracota"><NotebookPen size={34} /></span>
        <h1>Mi diario</h1>
        <p>Se guarda solo en tu teléfono. Nadie más lo ve.</p>
      </section>

      <div className="diario-form">
        <span className="diario-label" id="animo-label">¿Cómo te sientes ahora?</span>
        <div className="animo-row" role="group" aria-labelledby="animo-label">
          {ANIMOS.map((a) => (
            <button key={a.v} className={'animo' + (animo === a.v ? ' on' : '')} onClick={() => setAnimo(a.v)} aria-pressed={animo === a.v} aria-label={a.t}>
              <span aria-hidden="true">{a.e}</span><small>{a.t}</small>
            </button>
          ))}
        </div>
        <label className="diario-label" htmlFor="nota">Escribe lo que quieras soltar</label>
        <textarea id="nota" className="diario-nota" placeholder="Es opcional. Lo que escribas se queda en tu teléfono." value={nota} onChange={(e) => setNota(e.target.value)} />
        <button className="accion-rapida" onClick={guardar}>Guardar</button>
      </div>

      {registros.length > 0 && (
        <div className="diario-historial">
          <div className="diario-hist-head">
            <h3>Tu evolución</h3>
            <div className="diario-tools">
              <button className="diario-tool" onClick={exportar} aria-label="Exportar mi diario a un archivo">
                <Download size={16} aria-hidden="true" /> Exportar
              </button>
              {confirmar ? (
                <span className="diario-confirm">
                  ¿Seguro?
                  <button className="diario-tool danger" onClick={borrarTodo}>Sí, borrar</button>
                  <button className="diario-tool" onClick={() => setConfirmar(false)}>No</button>
                </span>
              ) : (
                <button className="diario-tool danger" onClick={() => setConfirmar(true)} aria-label="Borrar todos los registros">
                  <Trash2 size={16} aria-hidden="true" /> Borrar todo
                </button>
              )}
            </div>
          </div>
          <div className="grafico" role="img" aria-label="Gráfico de tu ánimo en los últimos registros">
            {registros.slice(0, 14).reverse().map((r, i) => (
              <div key={i} className="barra" style={{ height: `${r.animo * 18}px`, background: barColor(r.animo) }} title={`${r.fecha}: ${r.animo}/5`} />
            ))}
          </div>
          <ul className="registros">
            {registros.map((r, i) => (
              <li key={i}>
                <span className="reg-emo" aria-hidden="true">{ANIMOS.find((a) => a.v === r.animo)?.e}</span>
                <span className="reg-fecha">{r.fecha}</span>
                {r.nota && <span className="reg-nota">{r.nota}</span>}
                <button className="reg-del" onClick={() => borrar(i)} aria-label={`Borrar registro del ${r.fecha}`}>
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

function barColor(v) {
  return ['#C75D4A', '#D98A4A', '#E0A93E', '#9CB87F', '#7FA88B'][v - 1] || '#7FA88B'
}

function Footer() {
  return (
    <footer className="creditos">
      © {new Date().getFullYear()} · Hecho por{' '}
      <a href="https://www.instagram.com/gigroupoficial/" target="_blank" rel="noreferrer">GI Group LATAM C.A.</a>
    </footer>
  )
}

function Nav({ view, go, home }) {
  const items = [
    { id: 'home', Ic: House, label: 'Inicio', action: home, active: view.name === 'home' },
    { id: 'calma', Ic: Wind, label: 'Calma', action: () => go({ name: 'calma' }), active: view.name === 'calma' || view.name === 'tool' },
    { id: 'directorio', Ic: Phone, label: 'Ayuda', action: () => go({ name: 'directorio' }), active: view.name === 'directorio' },
    { id: 'diario', Ic: NotebookPen, label: 'Diario', action: () => go({ name: 'diario' }), active: view.name === 'diario' },
  ]
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map((it) => (
        <button key={it.id} className={'nav-item' + (it.active ? ' active' : '')} onClick={it.action} aria-current={it.active ? 'page' : undefined}>
          <it.Ic size={22} aria-hidden="true" /><small>{it.label}</small>
        </button>
      ))}
    </nav>
  )
}

function AyudaAhora({ onClose, go }) {
  const psico = directorio[0].items.slice(0, 3) // líneas clave; el resto en el directorio
  const modalRef = useRef(null)

  // Accesibilidad: cierra con Escape, bloquea el scroll de fondo, mueve el foco
  // al diálogo al abrir y lo devuelve al cerrar.
  useEffect(() => {
    const prevActivo = document.activeElement
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modalRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prevActivo && prevActivo.focus) prevActivo.focus()
    }
  }, [onClose])

  return (
    <div className="modal-bg" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ayuda inmediata">
      <div className="modal" ref={modalRef} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <div className="modal-grip" aria-hidden="true" />
        <div className="modal-scroll">
          <h2><LifeBuoy size={22} aria-hidden="true" /> Ayuda ahora</h2>
          <p>Si hay peligro para la vida, llama al <a className="tel inline" href="tel:171">171</a>.</p>
          <p className="modal-sub">Si necesitas hablar con alguien:</p>
          {psico.map((it) => (
            <a key={it.nombre} className="tel block" href={`tel:${(it.tels[0] || '').replace(/[^0-9*]/g, '')}`}>
              <Phone size={18} aria-hidden="true" /> {it.nombre} — {it.tels[0]}
            </a>
          ))}
          <button className="ver-todos" onClick={() => { onClose(); go({ name: 'directorio' }) }}>
            Ver todos los números de ayuda <ArrowRight size={17} aria-hidden="true" />
          </button>
          <button className="accion-rapida" onClick={() => { onClose(); go({ name: 'tool', tool: 'respiracion' }) }}>
            <Wind size={18} aria-hidden="true" /> O respira un minuto conmigo
          </button>
        </div>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}
