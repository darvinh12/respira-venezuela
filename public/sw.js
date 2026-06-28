// Service worker de Respira Venezuela — app offline-first para zona de terremoto.
// Estrategia:
//  - Navegaciones (HTML): network-first con respaldo al index cacheado (offline).
//  - Assets estáticos con hash (JS/CSS/imágenes/fuentes): cache-first + relleno en segundo plano.
//  - Cache versionado; se limpian versiones viejas en 'activate'.
const VERSION = 'respira-v2'
const CACHE = VERSION

// App-shell mínimo. Los bundles de Vite (/assets/*) llevan hash y se cachean
// en tiempo de ejecución la primera vez que se piden.
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // addAll falla si UN recurso falla; usamos peticiones tolerantes.
      .then((cache) =>
        Promise.all(
          APP_SHELL.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
          )
        )
      )
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  )
})

// Permite forzar la activación del SW nuevo desde la app si se desea.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

function isNavigationRequest(request) {
  return (
    request.mode === 'navigate' ||
    (request.method === 'GET' &&
      request.headers.get('accept')?.includes('text/html'))
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // 1) Navegaciones: red primero (para recibir despliegues nuevos), con
  //    respaldo a la última copia cacheada o al app-shell cuando no hay conexión.
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/index.html', copy)).catch(() => {})
          return res
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('/index.html'))
        )
    )
    return
  }

  // 2) Resto de GET (assets, fuentes, etc.): cache primero, luego red, y se
  //    guarda lo nuevo para uso offline posterior.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then((res) => {
          // Solo cacheamos respuestas válidas (incluye opacas de fuentes CDN).
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {})
          }
          return res
        })
        .catch(() => cached)
    })
  )
})
