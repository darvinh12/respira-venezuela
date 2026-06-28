import { useState, useEffect } from 'react'
import {
  Heart, Baby, Users, Siren, Wind, Activity, Moon, Home as HomeIcon, HeartCrack, CloudRain,
  CircleHelp, MessagesSquare, ToyBrick, HeartHandshake, Ear, CircleOff, Accessibility,
  LifeBuoy, MessageSquareWarning, Flame, Phone, Play, NotebookPen, House, ChevronRight,
  ChevronLeft, X, Globe, ArrowRight, CheckCircle2, Hand, ExternalLink, Square, Cloud, Sparkles,
} from 'lucide-react'
import { personas, situaciones, guias, directorio, videos } from './data.js'
import {
  Respiracion, Grounding, RespiracionCaja, Mariposa, Musculos, LugarSeguro,
  FrascoCalma, RespiracionPeluche, SoplarVela, RinconCalma, FrasesSeguridad,
} from './Herramientas.jsx'

// Mapa de nombres (en data.js) a componentes de ícono Lucide
const ICONS = {
  Heart, Baby, Users, Siren, Wind, Activity, Moon, Home: HomeIcon, HeartCrack, CloudRain,
  CircleHelp, MessagesSquare, ToyBrick, HeartHandshake, Ear, CircleOff, Accessibility,
  LifeBuoy, MessageSquareWarning, Flame, Phone, Play, NotebookPen, House, Hand,
}
function Icon({ name, size = 24, ...rest }) {
  const C = ICONS[name] || Heart
  return <C size={size} strokeWidth={2} aria-hidden="true" {...rest} />
}

export default function App() {
  const [view, setView] = useState({ name: 'home' })
  const [ayuda, setAyuda] = useState(false)
  const [historia, setHistoria] = useState([])

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
      <Header onHome={home} onBack={view.name !== 'home' ? back : null} />
      <main className="main">
        {view.name === 'home' && <Home go={go} />}
        {view.name === 'persona' && <Persona personaId={view.personaId} go={go} />}
        {view.name === 'guia' && <Guia guiaId={view.guiaId} accion={accion} />}
        {view.name === 'calma' && <Calma go={go} />}
        {view.name === 'tool' && <Tool tool={view.tool} />}
        {view.name === 'directorio' && <Directorio />}
        {view.name === 'videos' && <Videos />}
        {view.name === 'diario' && <Diario />}
        <Footer />
      </main>

      <button className="fab" onClick={() => setAyuda(true)} aria-label="Abrir ayuda inmediata">
        <LifeBuoy size={22} strokeWidth={2.4} aria-hidden="true" /> Ayuda ahora
      </button>

      <Nav view={view} go={go} home={home} />
      {ayuda && <AyudaAhora onClose={() => setAyuda(false)} go={go} />}
    </div>
  )
}

function Header({ onHome, onBack }) {
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
      <span className="header-btn ghost" />
    </header>
  )
}

function Home({ go }) {
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
        <button className="quick" onClick={() => go({ name: 'directorio' })}><span className="quick-ic chip-verde"><Phone size={22} /></span>Números</button>
        <button className="quick" onClick={() => go({ name: 'videos' })}><span className="quick-ic chip-amarillo"><Play size={22} /></span>Videos</button>
        <button className="quick" onClick={() => go({ name: 'diario' })}><span className="quick-ic chip-terracota"><NotebookPen size={22} /></span>Mi diario</button>
      </div>

      <p className="disclaimer">
        Respira es apoyo de primera línea, <strong>no reemplaza</strong> la atención profesional ni los servicios de emergencia.
        Si hay peligro para la vida, llama al <a href="tel:171">171</a>.
      </p>
    </>
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
  return (
    <article className="guia">
      <h1>{g.titulo}</h1>
      <p className="guia-intro">{g.intro}</p>

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

function Calma({ go }) {
  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-azul"><Wind size={34} /></span>
        <h1>Calma ya</h1>
        <p>Herramientas rápidas para bajar la angustia en este momento.</p>
      </section>
      <div className="cards">
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'respiracion' })}>
          <span className="chip chip-azul"><Wind size={24} /></span>
          <span className="card-title">Respiración guiada</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'grounding' })}>
          <span className="chip chip-verde"><Hand size={24} /></span>
          <span className="card-title">Grounding 5-4-3-2-1</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'caja' })}>
          <span className="chip chip-azul"><Square size={24} /></span>
          <span className="card-title">Respiración en caja</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'mariposa' })}>
          <span className="chip chip-terracota"><Heart size={24} /></span>
          <span className="card-title">Abrazo de la mariposa</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'musculos' })}>
          <span className="chip chip-amarillo"><Activity size={24} /></span>
          <span className="card-title">Relajación muscular</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'lugar' })}>
          <span className="chip chip-verde"><Cloud size={24} /></span>
          <span className="card-title">Tu lugar seguro</span>
          <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
        </button>
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
  if (tool === 'frasco') return <FrascoCalma />
  if (tool === 'peluche') return <RespiracionPeluche />
  if (tool === 'vela') return <SoplarVela />
  if (tool === 'rincon') return <RinconCalma />
  if (tool === 'frases') return <FrasesSeguridad />
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem('respira_diario')
      if (raw) setRegistros(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  const guardar = () => {
    const fecha = new Date().toLocaleString('es-VE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    const next = [{ animo, nota, fecha }, ...registros].slice(0, 60)
    setRegistros(next)
    try { localStorage.setItem('respira_diario', JSON.stringify(next)) } catch { /* ignore */ }
    setNota('')
  }

  return (
    <>
      <section className="persona-head">
        <span className="chip big chip-terracota"><NotebookPen size={34} /></span>
        <h1>Mi diario</h1>
        <p>Se guarda solo en tu teléfono. Nadie más lo ve.</p>
      </section>

      <div className="diario-form">
        <label className="diario-label" id="animo-label">¿Cómo te sientes ahora?</label>
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
          <h3>Tu evolución</h3>
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
  const psico = directorio[0].items
  return (
    <div className="modal-bg" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ayuda inmediata">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grip" aria-hidden="true" />
        <h2><LifeBuoy size={22} aria-hidden="true" /> Ayuda ahora</h2>
        <p>Si hay peligro para la vida, llama al <a className="tel inline" href="tel:171">171</a>.</p>
        <p className="modal-sub">Si necesitas hablar con alguien:</p>
        {psico.map((it) => (
          <a key={it.nombre} className="tel block" href={`tel:${(it.tels[0] || '').replace(/[^0-9*]/g, '')}`}>
            <Phone size={18} aria-hidden="true" /> {it.nombre} — {it.tels[0]}
          </a>
        ))}
        <button className="accion-rapida" onClick={() => { onClose(); go({ name: 'tool', tool: 'respiracion' }) }}>
          <Wind size={18} aria-hidden="true" /> O respira un minuto conmigo
        </button>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}
