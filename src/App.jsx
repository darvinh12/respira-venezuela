import { useState, useEffect } from 'react'
import { personas, situaciones, guias, directorio, videos } from './data.js'
import { Respiracion, Grounding } from './Herramientas.jsx'

export default function App() {
  // view: { name: 'home'|'persona'|'guia'|'calma'|'tool'|'directorio'|'videos'|'diario', ...params }
  const [view, setView] = useState({ name: 'home' })
  const [ayuda, setAyuda] = useState(false)
  const [historia, setHistoria] = useState([])

  const go = (next) => {
    setHistoria((h) => [...h, view])
    setView(next)
    window.scrollTo(0, 0)
  }
  const back = () => {
    setHistoria((h) => {
      if (h.length === 0) { setView({ name: 'home' }); return [] }
      const prev = h[h.length - 1]
      setView(prev)
      return h.slice(0, -1)
    })
    window.scrollTo(0, 0)
  }
  const home = () => { setHistoria([]); setView({ name: 'home' }); window.scrollTo(0, 0) }

  // Acción rápida desde una guía hacia una herramienta o el directorio
  const accion = (tool) => {
    if (tool === 'directorio') return go({ name: 'directorio' })
    return go({ name: 'tool', tool })
  }

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
      </main>

      <Nav view={view} go={go} home={home} />

      <button className="fab" onClick={() => setAyuda(true)} aria-label="Ayuda ahora">
        🆘 Ayuda ahora
      </button>

      {ayuda && <AyudaAhora onClose={() => setAyuda(false)} go={go} />}
    </div>
  )
}

function Header({ onHome, onBack }) {
  return (
    <header className="header">
      {onBack ? (
        <button className="header-btn" onClick={onBack} aria-label="Volver">‹ Volver</button>
      ) : (
        <span className="header-btn ghost" />
      )}
      <button className="brand" onClick={onHome}>
        <span className="brand-mark">◍</span> Respira <span className="brand-sub">Venezuela</span>
      </button>
      <span className="header-btn ghost" />
    </header>
  )
}

function Home({ go }) {
  return (
    <>
      <section className="hero">
        <h1>No estás solo/a.</h1>
        <p>Apoyo psicológico para después del terremoto. Respira. Vamos paso a paso.</p>
      </section>
      <h2 className="section-title">¿Quién busca apoyo?</h2>
      <p className="section-hint">Elige tu situación para encontrar ayuda hecha para ti.</p>
      <div className="cards">
        {personas.map((p) => (
          <button key={p.id} className="card persona-card" onClick={() => go({ name: 'persona', personaId: p.id })}>
            <span className="card-icon">{p.icon}</span>
            <span className="card-body">
              <span className="card-title">{p.titulo}</span>
              <span className="card-desc">{p.desc}</span>
            </span>
            <span className="card-arrow">›</span>
          </button>
        ))}
      </div>

      <div className="quick-row">
        <button className="quick" onClick={() => go({ name: 'calma' })}>🌬️<span>Calma ya</span></button>
        <button className="quick" onClick={() => go({ name: 'directorio' })}>📞<span>Números de ayuda</span></button>
        <button className="quick" onClick={() => go({ name: 'videos' })}>🎬<span>Videos</span></button>
        <button className="quick" onClick={() => go({ name: 'diario' })}>📔<span>Mi diario</span></button>
      </div>

      <p className="disclaimer">
        Respira es apoyo de primera línea, <strong>no reemplaza</strong> la atención profesional ni los servicios de emergencia.
        Si hay peligro para la vida, llama al <strong>171</strong>.
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
        <span className="persona-head-icon">{persona.icon}</span>
        <h1>{persona.titulo}</h1>
        <p>Toca lo que más se parece a lo que estás viviendo.</p>
      </section>
      <div className="cards">
        {lista.map((s) => (
          <button
            key={s.id}
            className={'card sit-card' + (s.urgente ? ' urgente' : '')}
            onClick={() => go({ name: 'guia', guiaId: s.id })}
          >
            <span className="card-icon">{s.icon}</span>
            <span className="card-title">{s.titulo}</span>
            <span className="card-arrow">›</span>
          </button>
        ))}
      </div>
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
          {g.accionRapida.label} →
        </button>
      )}

      <h3>Qué puedes hacer</h3>
      <ol className="pasos">
        {g.pasos.map((p, i) => <li key={i}>{p}</li>)}
      </ol>

      <h3 className="evitar-title">Mejor evita</h3>
      <ul className="evitar">
        {g.evitar.map((e, i) => <li key={i}>{e}</li>)}
      </ul>

      <div className="cuando">
        <strong>¿Cuándo buscar ayuda profesional?</strong>
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
        <span className="persona-head-icon">🌬️</span>
        <h1>Calma ya</h1>
        <p>Herramientas rápidas para bajar la angustia en este momento.</p>
      </section>
      <div className="cards">
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'respiracion' })}>
          <span className="card-icon">🫁</span>
          <span className="card-title">Respiración guiada</span>
          <span className="card-arrow">›</span>
        </button>
        <button className="card sit-card" onClick={() => go({ name: 'tool', tool: 'grounding' })}>
          <span className="card-icon">🖐️</span>
          <span className="card-title">Grounding 5-4-3-2-1</span>
          <span className="card-arrow">›</span>
        </button>
      </div>
    </>
  )
}

function Tool({ tool }) {
  if (tool === 'respiracion') return <Respiracion />
  if (tool === 'grounding') return <Grounding />
  return null
}

function Directorio() {
  return (
    <>
      <section className="persona-head">
        <span className="persona-head-icon">📞</span>
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
                  <a key={t} className="tel" href={`tel:${t.replace(/[^0-9*]/g, '')}`}>📞 {t}</a>
                ))}
                {it.web && <a className="tel web" href={it.web} target="_blank" rel="noreferrer">🌐 Abrir</a>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

function Videos() {
  return (
    <>
      <section className="persona-head">
        <span className="persona-head-icon">🎬</span>
        <h1>Videos</h1>
        <p>De fuentes serias. Requieren conexión a internet.</p>
      </section>
      <div className="cards">
        {videos.map((v) => (
          <a key={v.titulo} className="card sit-card" href={v.url} target="_blank" rel="noreferrer">
            <span className="card-icon">▶️</span>
            <span className="card-body">
              <span className="card-title">{v.titulo}</span>
              <span className="card-desc">{v.fuente}</span>
            </span>
            <span className="card-arrow">↗</span>
          </a>
        ))}
      </div>
    </>
  )
}

// Diario simple con seguimiento de ánimo, guardado SOLO en el dispositivo
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
        <span className="persona-head-icon">📔</span>
        <h1>Mi diario</h1>
        <p>Se guarda solo en tu teléfono. Nadie más lo ve.</p>
      </section>

      <div className="diario-form">
        <label className="diario-label">¿Cómo te sientes ahora?</label>
        <div className="animo-row">
          {ANIMOS.map((a) => (
            <button key={a.v} className={'animo' + (animo === a.v ? ' on' : '')} onClick={() => setAnimo(a.v)} title={a.t}>
              <span>{a.e}</span><small>{a.t}</small>
            </button>
          ))}
        </div>
        <textarea className="diario-nota" placeholder="Escribe lo que quieras soltar… (opcional)" value={nota} onChange={(e) => setNota(e.target.value)} />
        <button className="accion-rapida" onClick={guardar}>Guardar</button>
      </div>

      {registros.length > 0 && (
        <div className="diario-historial">
          <h3>Tu evolución</h3>
          <div className="grafico">
            {registros.slice(0, 14).reverse().map((r, i) => (
              <div key={i} className="barra" style={{ height: `${r.animo * 18}px`, background: barColor(r.animo) }} title={`${r.fecha}: ${r.animo}/5`} />
            ))}
          </div>
          <ul className="registros">
            {registros.map((r, i) => (
              <li key={i}>
                <span className="reg-emo">{ANIMOS.find((a) => a.v === r.animo)?.e}</span>
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
  return ['#C75D4A', '#D98A4A', '#E6B84A', '#9CB87F', '#7FA88B'][v - 1] || '#7FA88B'
}

function Nav({ view, go, home }) {
  const items = [
    { id: 'home', icon: '🏠', label: 'Inicio', action: home, active: view.name === 'home' },
    { id: 'calma', icon: '🌬️', label: 'Calma', action: () => go({ name: 'calma' }), active: view.name === 'calma' || view.name === 'tool' },
    { id: 'directorio', icon: '📞', label: 'Ayuda', action: () => go({ name: 'directorio' }), active: view.name === 'directorio' },
    { id: 'diario', icon: '📔', label: 'Diario', action: () => go({ name: 'diario' }), active: view.name === 'diario' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <button key={it.id} className={'nav-item' + (it.active ? ' active' : '')} onClick={it.action}>
          <span>{it.icon}</span><small>{it.label}</small>
        </button>
      ))}
    </nav>
  )
}

function AyudaAhora({ onClose, go }) {
  const psico = directorio[0].items
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Ayuda ahora</h2>
        <p>Si hay peligro para la vida, llama al <a className="tel inline" href="tel:171">171</a>.</p>
        <p className="modal-sub">Si necesitas hablar con alguien:</p>
        {psico.map((it) => (
          <a key={it.nombre} className="tel block" href={`tel:${(it.tels[0] || '').replace(/[^0-9*]/g, '')}`}>
            📞 {it.nombre} — {it.tels[0]}
          </a>
        ))}
        <button className="accion-rapida" onClick={() => { onClose(); go({ name: 'tool', tool: 'respiracion' }) }}>
          🫁 O respira un minuto conmigo
        </button>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}
