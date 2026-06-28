import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Registro del service worker (modo offline) — solo en producción.
// Auto-actualización: cuando se despliega una versión nueva, el SW nuevo
// hace skipWaiting() y al tomar control recargamos una vez para que el
// usuario no quede atrapado en una versión cacheada vieja.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // Busca actualizaciones al cargar.
      reg.update().catch(() => {})
      reg.addEventListener('updatefound', () => {
        const nuevo = reg.installing
        if (!nuevo) return
        nuevo.addEventListener('statechange', () => {
          // Hay una versión nueva instalada y ya había un SW controlando.
          if (nuevo.state === 'installed' && navigator.serviceWorker.controller) {
            nuevo.postMessage('SKIP_WAITING')
          }
        })
      })
    }).catch(() => {})

    // Cuando el SW nuevo toma control, recargamos una sola vez.
    let recargado = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (recargado) return
      recargado = true
      window.location.reload()
    })
  })
}
