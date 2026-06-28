import { useState, useEffect, useRef } from 'react'
import { Eye, Hand, Ear, Flower2, Citrus, Sparkles, Heart, Activity, Cloud } from 'lucide-react'

// Componente de respiración animada reutilizable (acepta distintos patrones).
function Breath({ titulo, sub, fases, fuente }) {
  const [i, setI] = useState(0)
  const [activo, setActivo] = useState(true)
  const [ciclos, setCiclos] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!activo) return
    timer.current = setTimeout(() => {
      setI((prev) => {
        const next = (prev + 1) % fases.length
        if (next === 0) setCiclos((c) => c + 1)
        return next
      })
    }, fases[i].dur)
    return () => clearTimeout(timer.current)
  }, [i, activo, fases])

  const fase = fases[i]
  return (
    <div className="tool">
      <h1>{titulo}</h1>
      <p className="tool-sub">{sub}</p>
      <div className="breath-wrap">
        <div
          className="breath-circle"
          style={{
            transform: `scale(${activo ? fase.scale : 1})`,
            transitionDuration: `${activo ? fase.dur : 400}ms`,
          }}
        >
          <span>{activo ? fase.t : 'Pausa'}</span>
        </div>
      </div>
      <p className="ciclos">Ciclos completados: {ciclos}</p>
      <div className="tool-actions">
        <button className="accion-rapida" onClick={() => setActivo((a) => !a)}>
          {activo ? 'Pausar' : 'Continuar'}
        </button>
      </div>
      <p className="fuente">{fuente}</p>
    </div>
  )
}

// Respiración diafragmática: inhala 4 · sostén 4 · exhala 6
export function Respiracion() {
  const fases = [
    { t: 'Inhala', dur: 4000, scale: 1.6 },
    { t: 'Sostén', dur: 4000, scale: 1.6 },
    { t: 'Exhala', dur: 6000, scale: 1.0 },
  ]
  return (
    <Breath
      titulo="Respiración guiada"
      sub="Sigue el círculo. Inhala por la nariz, exhala despacio por la boca."
      fases={fases}
      fuente="Técnica de respiración diafragmática · OMS / OPS"
    />
  )
}

// Respiración en caja 4-4-4-4 (usada por equipos de emergencia y rescate)
export function RespiracionCaja() {
  const fases = [
    { t: 'Inhala', dur: 4000, scale: 1.6 },
    { t: 'Sostén', dur: 4000, scale: 1.6 },
    { t: 'Exhala', dur: 4000, scale: 1.0 },
    { t: 'Sostén', dur: 4000, scale: 1.0 },
  ]
  return (
    <Breath
      titulo="Respiración en caja"
      sub="Inhala 4 · sostén 4 · exhala 4 · sostén 4. La usan bomberos y rescatistas para mantener la calma bajo presión."
      fases={fases}
      fuente="Box breathing · primeros auxilios psicológicos"
    />
  )
}

// Grounding 5-4-3-2-1 para anclarse al presente
export function Grounding() {
  const pasos = [
    { n: 5, sentido: 'cosas que puedes VER', Ic: Eye, color: '#2E6B7E' },
    { n: 4, sentido: 'cosas que puedes TOCAR', Ic: Hand, color: '#7FA88B' },
    { n: 3, sentido: 'cosas que puedes OÍR', Ic: Ear, color: '#E0A93E' },
    { n: 2, sentido: 'cosas que puedes OLER', Ic: Flower2, color: '#D98A4A' },
    { n: 1, sentido: 'cosa que puedes SABOREAR', Ic: Citrus, color: '#C75D4A' },
  ]
  const [paso, setPaso] = useState(0)
  const fin = paso >= pasos.length

  return (
    <div className="tool">
      <h1>Grounding 5-4-3-2-1</h1>
      <p className="tool-sub">Cuando la mente se acelera, vuelve al aquí y ahora con tus sentidos.</p>

      {!fin ? (
        <div className="ground-card" style={{ borderColor: pasos[paso].color }}>
          <span className="ground-icon" style={{ color: pasos[paso].color }}>
            {(() => { const I = pasos[paso].Ic; return <I size={46} aria-hidden="true" /> })()}
          </span>
          <div className="ground-num" style={{ color: pasos[paso].color }}>{pasos[paso].n}</div>
          <div className="ground-text">{pasos[paso].sentido}</div>
          <button className="accion-rapida" onClick={() => setPaso(paso + 1)}>
            Listo, siguiente →
          </button>
          <div className="ground-progress">{paso + 1} de {pasos.length}</div>
        </div>
      ) : (
        <div className="ground-card done">
          <span className="ground-icon" style={{ color: '#7FA88B' }}><Sparkles size={46} aria-hidden="true" /></span>
          <div className="ground-text">Lo lograste. Estás aquí, estás a salvo en este momento.</div>
          <button className="accion-rapida" onClick={() => setPaso(0)}>Repetir</button>
        </div>
      )}
      <p className="fuente">Técnica de anclaje (grounding) · Apoyo psicosocial IFRC</p>
    </div>
  )
}

// Abrazo de la mariposa (Butterfly Hug) — autoestimulación bilateral, EMDR.
// Recomendado por IFRC/UNICEF para sobrevivientes de desastres (incluye niños).
export function Mariposa() {
  const [lado, setLado] = useState('izq')
  const [activo, setActivo] = useState(true)
  const [taps, setTaps] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!activo) return
    timer.current = setTimeout(() => {
      setLado((l) => (l === 'izq' ? 'der' : 'izq'))
      setTaps((t) => t + 1)
    }, 850)
    return () => clearTimeout(timer.current)
  }, [lado, activo])

  return (
    <div className="tool">
      <h1>Abrazo de la mariposa</h1>
      <p className="tool-sub">
        Cruza los brazos sobre el pecho, con cada mano en el hombro opuesto. Da
        golpecitos suaves y lentos, alternando, mientras respiras tranquilo/a.
      </p>
      <div className="mariposa-wrap">
        <span className={`mariposa-pad ${lado === 'izq' && activo ? 'on' : ''}`}>
          <Hand size={40} aria-hidden="true" style={{ transform: 'scaleX(-1)' }} />
        </span>
        <Heart className="mariposa-heart" size={30} aria-hidden="true" />
        <span className={`mariposa-pad ${lado === 'der' && activo ? 'on' : ''}`}>
          <Hand size={40} aria-hidden="true" />
        </span>
      </div>
      <p className="ciclos">{activo ? (lado === 'izq' ? '◀ Toca a la izquierda' : 'Toca a la derecha ▶') : 'En pausa'} · {taps} golpecitos</p>
      <div className="tool-actions">
        <button className="accion-rapida" onClick={() => setActivo((a) => !a)}>
          {activo ? 'Pausar' : 'Continuar'}
        </button>
      </div>
      <p className="fuente">Abrazo de la mariposa (EMDR) · IFRC / UNICEF</p>
    </div>
  )
}

// Relajación muscular progresiva (Jacobson) — tensar y soltar por zonas.
export function Musculos() {
  const grupos = [
    { zona: 'Manos y antebrazos', accion: 'Cierra los puños con fuerza.' },
    { zona: 'Brazos y hombros', accion: 'Sube los hombros hacia las orejas.' },
    { zona: 'Cara', accion: 'Aprieta los ojos y la mandíbula.' },
    { zona: 'Pecho y abdomen', accion: 'Toma aire y tensa el abdomen.' },
    { zona: 'Piernas y pies', accion: 'Estira las piernas y apunta los dedos hacia ti.' },
  ]
  const [paso, setPaso] = useState(0)
  const fin = paso >= grupos.length

  return (
    <div className="tool">
      <h1>Relajación muscular</h1>
      <p className="tool-sub">Tensa cada zona 5 segundos y luego suéltala 10 segundos. Nota la diferencia entre tensión y calma.</p>

      {!fin ? (
        <div className="ground-card" style={{ borderColor: '#2E6B7E' }}>
          <span className="ground-icon" style={{ color: '#2E6B7E' }}><Activity size={44} aria-hidden="true" /></span>
          <div className="ground-text" style={{ marginBottom: 6 }}>{grupos[paso].zona}</div>
          <p className="tool-sub" style={{ margin: '0 8px 14px' }}>{grupos[paso].accion}<br />Tensa 5 s… y suelta 10 s.</p>
          <button className="accion-rapida" onClick={() => setPaso(paso + 1)}>
            Hecho, siguiente →
          </button>
          <div className="ground-progress">{paso + 1} de {grupos.length}</div>
        </div>
      ) : (
        <div className="ground-card done">
          <span className="ground-icon" style={{ color: '#7FA88B' }}><Sparkles size={46} aria-hidden="true" /></span>
          <div className="ground-text">Tu cuerpo está más suelto. Respira y quédate con esa sensación.</div>
          <button className="accion-rapida" onClick={() => setPaso(0)}>Repetir</button>
        </div>
      )}
      <p className="fuente">Relajación muscular progresiva (Jacobson) · APA</p>
    </div>
  )
}

// Lugar seguro — visualización guiada (imagery) para calmar el sistema nervioso.
export function LugarSeguro() {
  const pasos = [
    'Si te sientes cómodo/a, cierra los ojos y respira lento tres veces.',
    'Imagina un lugar donde te sientas completamente a salvo. Puede ser real o inventado.',
    '¿Qué ves a tu alrededor? Observa los colores, la luz, las formas.',
    '¿Qué sonidos hay? ¿Qué temperatura sientes en la piel?',
    'Lleva una mano al pecho y dite en voz baja: «Aquí estoy a salvo».',
    'Quédate unos segundos más. Este lugar es tuyo: vuelve cuando lo necesites.',
  ]
  const [paso, setPaso] = useState(0)
  const fin = paso >= pasos.length

  return (
    <div className="tool">
      <h1>Tu lugar seguro</h1>
      <p className="tool-sub">Una visualización para llevar tu mente a un sitio de calma.</p>

      {!fin ? (
        <div className="ground-card" style={{ borderColor: '#7FA88B' }}>
          <span className="ground-icon" style={{ color: '#7FA88B' }}><Cloud size={44} aria-hidden="true" /></span>
          <div className="ground-text" style={{ fontSize: '1.08rem' }}>{pasos[paso]}</div>
          <button className="accion-rapida" onClick={() => setPaso(paso + 1)}>
            {paso === pasos.length - 1 ? 'Terminar' : 'Continuar →'}
          </button>
          <div className="ground-progress">{paso + 1} de {pasos.length}</div>
        </div>
      ) : (
        <div className="ground-card done">
          <span className="ground-icon" style={{ color: '#7FA88B' }}><Sparkles size={46} aria-hidden="true" /></span>
          <div className="ground-text">Respira. Llevas ese lugar seguro contigo a donde vayas.</div>
          <button className="accion-rapida" onClick={() => setPaso(0)}>Repetir</button>
        </div>
      )}
      <p className="fuente">Visualización del lugar seguro · Primeros auxilios psicológicos OMS</p>
    </div>
  )
}
