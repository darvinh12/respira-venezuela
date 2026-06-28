import { useState, useEffect, useRef } from 'react'
import { Eye, Hand, Ear, Flower2, Citrus, Sparkles, Heart, Activity, Cloud, Flame, Home, HeartHandshake } from 'lucide-react'

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

/* ============ Herramientas para calmar a los niños/as ============ */

// Frasco de la calma (calm jar / glitter jar): el niño "agita" y mira la
// purpurina bajar mientras respira. Animación de partículas en canvas.
export function FrascoCalma() {
  const canvasRef = useRef(null)
  const partsRef = useRef([])
  const rafRef = useRef(null)
  const settledRef = useRef(false)
  const [calma, setCalma] = useState(false)

  const W = 220, H = 300
  const colors = ['#F2B705', '#2E6B7E', '#7FA88B', '#C75D4A', '#E0A93E', '#9CC0A8']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const N = 95
    const parts = []
    for (let i = 0; i < N; i++) {
      parts.push({
        x: 18 + Math.random() * (W - 36),
        y: H - 16 - Math.random() * 70,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 3,
        r: 2.4 + Math.random() * 2.6,
        c: colors[i % colors.length],
      })
    }
    partsRef.current = parts
    let settledFrames = 0
    const floor = H - 12

    const step = () => {
      ctx.clearRect(0, 0, W, H)
      let moving = 0
      for (const p of parts) {
        p.vy += 0.11
        p.vx *= 0.97
        p.vy *= 0.97
        p.x += p.vx
        p.y += p.vy
        if (p.x < 12) { p.x = 12; p.vx *= -0.4 }
        if (p.x > W - 12) { p.x = W - 12; p.vx *= -0.4 }
        if (p.y > floor) { p.y = floor; p.vy *= -0.22; p.vx *= 0.82 }
        if (p.y < 12) { p.y = 12; p.vy *= -0.3 }
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.2) moving++
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.fill()
      }
      if (moving < 3) settledFrames++; else settledFrames = 0
      if (settledFrames > 24 && !settledRef.current) { settledRef.current = true; setCalma(true) }
      if (moving >= 3 && settledRef.current) { settledRef.current = false; setCalma(false) }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const agitar = () => {
    for (const p of partsRef.current) {
      p.vx = (Math.random() - 0.5) * 16
      p.vy = (Math.random() - 0.5) * 16 - 3
    }
    settledRef.current = false
    setCalma(false)
  }

  return (
    <div className="tool">
      <h1>Frasco de la calma</h1>
      <p className="tool-sub">Agita el frasco y miren juntos cómo baja la purpurina. Cuando todo se asiente, su cuerpo también estará más tranquilo.</p>
      <div className="frasco">
        <canvas ref={canvasRef} width={W} height={H} aria-hidden="true" />
        <div className="frasco-tapa" aria-hidden="true" />
      </div>
      <p className="ciclos">{calma ? '✨ Todo en calma' : '… respira mientras baja'}</p>
      <div className="tool-actions">
        <button className="accion-rapida" onClick={agitar}>Agitar el frasco</button>
      </div>
      <p className="fuente">Frasco de la calma (Montessori) · apoyo de autorregulación infantil</p>
    </div>
  )
}

// Respiración con peluche: el niño pone un peluche en la barriga y lo ve
// subir (inhala) y bajar (exhala). Inhala 4 · exhala 6.
export function RespiracionPeluche() {
  const fases = [
    { t: 'Infla la barriga', dur: 4000, scale: 1.5 },
    { t: 'Baja despacito', dur: 6000, scale: 1.0 },
  ]
  const [i, setI] = useState(0)
  const [activo, setActivo] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    if (!activo) return
    timer.current = setTimeout(() => setI((p) => (p + 1) % fases.length), fases[i].dur)
    return () => clearTimeout(timer.current)
  }, [i, activo])

  const fase = fases[i]
  return (
    <div className="tool">
      <h1>Respira con tu peluche</h1>
      <p className="tool-sub">Acuesta a tu hijo/a y pon un peluche en su barriga. A respirar juntos: que el peluche suba y baje despacito.</p>
      <div className="breath-wrap">
        <div
          className="breath-circle peluche"
          style={{ transform: `scale(${activo ? fase.scale : 1})`, transitionDuration: `${activo ? fase.dur : 400}ms` }}
        >
          <span role="img" aria-label="peluche">🧸</span>
        </div>
      </div>
      <p className="ciclos">{activo ? fase.t : 'Pausa'}</p>
      <div className="tool-actions">
        <button className="accion-rapida" onClick={() => setActivo((a) => !a)}>{activo ? 'Pausar' : 'Continuar'}</button>
      </div>
      <p className="fuente">Respiración con peluche (belly breathing) · UNICEF / Save the Children</p>
    </div>
  )
}

// Soplar la vela: "toma aire... y sopla despacio". La llama se inclina al exhalar.
export function SoplarVela() {
  const fases = [
    { t: 'Toma aire por la nariz', dur: 4000, soplando: false },
    { t: 'Sopla la vela despacito', dur: 5000, soplando: true },
  ]
  const [i, setI] = useState(0)
  const [activo, setActivo] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    if (!activo) return
    timer.current = setTimeout(() => setI((p) => (p + 1) % fases.length), fases[i].dur)
    return () => clearTimeout(timer.current)
  }, [i, activo])

  const fase = fases[i]
  return (
    <div className="tool">
      <h1>Apaga la vela</h1>
      <p className="tool-sub">Tomamos aire oliendo una flor… y soplamos despacito como para apagar una velita, sin que se apague del todo.</p>
      <div className="vela-wrap">
        <div className="vela">
          <span className={'vela-flama' + (activo && fase.soplando ? ' soplando' : '')} aria-hidden="true" />
          <span className="vela-cuerpo" aria-hidden="true" />
        </div>
      </div>
      <p className="ciclos">{activo ? fase.t : 'Pausa'}</p>
      <div className="tool-actions">
        <button className="accion-rapida" onClick={() => setActivo((a) => !a)}>{activo ? 'Pausar' : 'Continuar'}</button>
      </div>
      <p className="fuente">Respiración «huele la flor, sopla la vela» · Child Mind Institute</p>
    </div>
  )
}

// Guía: Rincón de la calma (cómo armar un espacio seguro en casa).
export function RinconCalma() {
  const items = [
    'Elige un rincón tranquilo: una esquina, una carpa con sábanas o detrás del sofá.',
    'Pon cojines, una manta suave y un peluche o muñeco preferido.',
    'Agrega algo para las manos: una pelota antiestrés, plastilina o el frasco de la calma.',
    'Deja una luz suave o una linterna; nada de pantallas.',
    'Explícale: «Este es tu lugar para calmarte, puedes venir cuando lo necesites».',
    'Acompáñalo/a sin obligar. No es un castigo: es un refugio.',
  ]
  return (
    <div className="tool" style={{ textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center' }}>Rincón de la calma</h1>
      <p className="tool-sub" style={{ textAlign: 'center' }}>Un espacio seguro en casa para que tu hijo/a regule sus emociones.</p>
      <ol className="pasos">{items.map((t, k) => <li key={k}>{t}</li>)}</ol>
      <p className="fuente" style={{ textAlign: 'center' }}>Rincón de la calma · psicología infantil / disciplina positiva</p>
    </div>
  )
}

// Guía: Frases de seguridad (qué decir y qué evitar con tu hijo/a).
export function FrasesSeguridad() {
  const decir = [
    '«Estoy aquí contigo, estás a salvo».',
    '«Es normal sentir miedo. A mí también me asustó».',
    '«Yo te cuido. Vamos a estar bien».',
    '«Si tiembla otra vez, ya sabemos qué hacer juntos».',
  ]
  const evitar = [
    'No digas «no llores» ni «no pasó nada»: valida lo que siente.',
    'No le des detalles ni cifras de víctimas.',
    'Evita dejarlo/a frente a noticias o videos del sismo.',
    'No prometas que «nunca va a temblar»: di que estás para cuidarlo/a.',
  ]
  return (
    <div className="tool" style={{ textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center' }}>Frases que dan seguridad</h1>
      <p className="tool-sub" style={{ textAlign: 'center' }}>Tus palabras y tu calma son su mayor refugio. Háblale a su altura, mirándolo/a a los ojos.</p>
      <h3 className="bloque-title hacer"><Heart size={20} aria-hidden="true" /> Dile</h3>
      <ul className="evitar" style={{ listStyle: 'none', paddingLeft: 0 }}>{decir.map((t, k) => <li key={k}>{t}</li>)}</ul>
      <h3 className="bloque-title evitar-title"><Hand size={20} aria-hidden="true" /> Mejor evita</h3>
      <ul className="evitar">{evitar.map((t, k) => <li key={k}>{t}</li>)}</ul>
      <p className="fuente" style={{ textAlign: 'center' }}>Cómo hablar con niños tras una catástrofe · UNICEF / Save the Children</p>
    </div>
  )
}
