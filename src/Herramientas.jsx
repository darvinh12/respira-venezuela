import { useState, useEffect, useRef } from 'react'

// Respiración guiada animada: inhala 4 · sostén 4 · exhala 6
export function Respiracion() {
  const fases = [
    { t: 'Inhala', dur: 4000, scale: 1.6 },
    { t: 'Sostén', dur: 4000, scale: 1.6 },
    { t: 'Exhala', dur: 6000, scale: 1.0 },
  ]
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
  }, [i, activo])

  const fase = fases[i]
  return (
    <div className="tool">
      <h1>Respiración guiada</h1>
      <p className="tool-sub">Sigue el círculo. Inhala por la nariz, exhala despacio por la boca.</p>
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
      <p className="fuente">Técnica de respiración diafragmática · OMS / OPS</p>
    </div>
  )
}

// Grounding 5-4-3-2-1 para anclarse al presente
export function Grounding() {
  const pasos = [
    { n: 5, sentido: 'cosas que puedes VER', icon: '👁️', color: '#2E6B7E' },
    { n: 4, sentido: 'cosas que puedes TOCAR', icon: '✋', color: '#7FA88B' },
    { n: 3, sentido: 'cosas que puedes OÍR', icon: '👂', color: '#F2B705' },
    { n: 2, sentido: 'cosas que puedes OLER', icon: '👃', color: '#D98A4A' },
    { n: 1, sentido: 'cosa que puedes SABOREAR', icon: '👅', color: '#C75D4A' },
  ]
  const [paso, setPaso] = useState(0)
  const fin = paso >= pasos.length

  return (
    <div className="tool">
      <h1>Grounding 5-4-3-2-1</h1>
      <p className="tool-sub">Cuando la mente se acelera, vuelve al aquí y ahora con tus sentidos.</p>

      {!fin ? (
        <div className="ground-card" style={{ borderColor: pasos[paso].color }}>
          <span className="ground-icon">{pasos[paso].icon}</span>
          <div className="ground-num" style={{ color: pasos[paso].color }}>{pasos[paso].n}</div>
          <div className="ground-text">{pasos[paso].sentido}</div>
          <button className="accion-rapida" onClick={() => setPaso(paso + 1)}>
            Listo, siguiente →
          </button>
          <div className="ground-progress">{paso + 1} de {pasos.length}</div>
        </div>
      ) : (
        <div className="ground-card done">
          <span className="ground-icon">💚</span>
          <div className="ground-text">Lo lograste. Estás aquí, estás a salvo en este momento.</div>
          <button className="accion-rapida" onClick={() => setPaso(0)}>Repetir</button>
        </div>
      )}
      <p className="fuente">Técnica de anclaje (grounding) · Apoyo psicosocial IFRC</p>
    </div>
  )
}
