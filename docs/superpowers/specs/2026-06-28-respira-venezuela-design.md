# Respira (Respira Venezuela) — Especificación de Diseño

**Fecha:** 2026-06-28
**Autor:** Ganesh Oliver Molero
**Estado:** Aprobado (pendiente revisión de spec)

---

## 1. Resumen

**Respira** es una PWA (web app instalable, con modo offline) de **apoyo psicológico** para la población de Venezuela tras los dos terremotos más fuertes de su historia. Ofrece guías basadas en protocolos oficiales, herramientas interactivas de regulación emocional, videos verificados, autoevaluación, diario de emociones y un directorio de números de atención reales.

- **Nombre:** Respira · **Título/instalación:** "Respira Venezuela" · **Bajada:** *Apoyo psicológico tras el terremoto*
- **Plataforma:** PWA (instalable, sin tienda de apps), **offline-first**
- **Público:** todos, con secciones diferenciadas (afectados / cuidadores / rescatistas)
- **Idioma:** Español (Venezuela)

### Principio rector
La app **no sustituye** la atención profesional ni los servicios de emergencia. Es apoyo de primera línea, psicoeducación y puente hacia ayuda formal. Todo el contenido sensible se guarda **solo en el dispositivo** (privacidad total, sin cuentas).

---

## 2. Fundamento (marcos y referentes)

El contenido se basa en protocolos reconocidos y se cita en cada guía:

- **OMS — Primeros Auxilios Psicológicos (PFA):** modelo **Mirar · Escuchar · Conectar**.
- **OPS — Guía Práctica de Salud Mental en Situaciones de Desastres** (referencia para Latinoamérica).
- **IFRC / Cruz Roja — Centro de Referencia de Apoyo Psicosocial** (módulos PAP en español).
- **IASC** — guías de salud mental y apoyo psicosocial en emergencias.

Benchmark de apps (lo adoptado): SAMHSA *PFA Mobile* (acciones de PFA), *Sonoma Rises* (check-in diario / rutina / resiliencia), *T2 Mood Tracker* (seguimiento de ánimo), *TLS / CBT-i* (psicoeducación, conexión a ayuda local, sueño).

---

## 3. Identidad visual

| Uso | Color | Hex |
|-----|-------|-----|
| Principal | Azul sereno (cielo/mar Caribe) | `#2E6B7E` |
| Acento | Amarillo araguaney (suavizado) | `#F2B705` |
| Apoyo | Verde salvia (grounding) | `#7FA88B` |
| Fondo | Crema cálido | `#FAF6EF` |
| Emergencia | Terracota (urgencia controlada, NO rojo alarma) | `#C75D4A` |

- **Tono:** sereno, cálido, refugio. Mucho espacio en blanco. Sin elementos alarmantes.
- **Identidad venezolana:** se toman azul y amarillo (bandera) deliberadamente **evitando el rojo brillante**, que dispara ansiedad en crisis.
- **Tipografía:** sans-serif amable y legible (a definir en construcción; candidatas: Nunito / Work Sans).

---

## 4. Estructura y componentes

### 4.1 Inicio — selector "¿Quién eres?"
Tres caminos grandes y claros que adaptan el contenido:
1. 👤 **Necesito apoyo** (afectado/a)
2. 👨‍👩‍👧 **Cuido a alguien** (niños / mayores / familia)
3. 🚒 **Soy rescatista / voluntario/a**

### 4.2 Botón "Ayuda ahora" (flotante, siempre visible)
Acceso inmediato a: líneas de crisis · 171 · respiración rápida de 1 minuto. Color terracota.

### 4.3 Secciones principales

**Guías** (texto, offline, citadas):
- Primeros Auxilios Psicológicos: *Mirar · Escuchar · Conectar*
- "Tus reacciones son normales" (psicoeducación: miedo, llanto, insomnio = respuestas normales a un evento anormal)
- Manejo de ansiedad y estrés agudo
- Ataques de pánico (qué hacer en el momento)
- **Réplicas (aftershocks): cómo manejar el miedo a que vuelva a temblar** *(específico de terremotos)*
- Duelo y pérdida (familiares, hogar)
- Insomnio y sueño tras el trauma
- Cómo hablar con niños y niñas / ayudarlos
- Cuidar al cuidador / autocuidado del que ayuda (trauma vicario)

**Calma ya** (herramientas interactivas, offline):
- Respiración guiada (animación de inhalar/exhalar)
- Grounding 5-4-3-2-1
- Relajación / regulación corporal

**Videos:** enlaces verificados (YouTube y otras plataformas) de fuentes serias en español (OPS/OMS, Cruz Roja, psicólogos acreditados). Requieren internet; se marca claramente.

**Diario de emociones** (offline, solo en el dispositivo):
- Registro de ánimo + nota breve
- **Gráfico de evolución del ánimo** en el tiempo (ver progreso)

**Autoevaluación:** cuestionario breve basado en escalas reconocidas (orientado a estrés/ansiedad/TEPT) con recomendaciones automáticas. Aviso claro de que no es diagnóstico.

**Directorio de atención:** números reales y verificados — 171, Bomberos, Protección Civil, Cruz Roja Venezolana, líneas de apoyo psicológico, hospitales. Botón de llamada directa. "Encontrar ayuda cerca."

### 4.4 Funciones de apoyo
- **Check-in diario opcional:** notificación suave ("¿Cómo amaneciste? Respira 1 minuto"). Activable/desactivable.
- **Accesibilidad:** texto grande, lenguaje simple, íconos para baja alfabetización, alto contraste.

---

## 5. Seguridad y ética (crítico en salud mental)

- **Aviso permanente:** "Respira es apoyo, no reemplaza atención profesional ni emergencias."
- **Detección de crisis:** si la autoevaluación o el diario indican riesgo alto (p. ej. ideas de autolesión), mostrar **de inmediato** líneas de ayuda y el botón "Ayuda ahora".
- **Privacidad:** sin cuentas, sin registro, sin envío de datos a servidores. Diario y autoevaluación se guardan **solo en el dispositivo** (localStorage / IndexedDB).
- **Contenido citado:** cada guía referencia su fuente (OPS/OMS/IFRC).
- **Derivación:** recomendado vincular con un ente venezolano real (Federación de Psicólogos de Venezuela / Cruz Roja Venezolana) para casos serios.

---

## 6. Arquitectura técnica

- **Tipo:** PWA instalable, **offline-first**.
- **Stack:** React + Vite + Service Worker (precaching de guías, herramientas y directorio). Posible PWA plugin (vite-plugin-pwa / Workbox).
- **Almacenamiento local:** localStorage / IndexedDB para diario, autoevaluación y preferencias. Nada sale del dispositivo.
- **Offline:** disponibles sin internet → guías, "Calma ya", diario, autoevaluación, directorio de números. Requieren internet → videos.
- **Contenido:** datos estructurados (JSON) para guías, videos y directorio, fáciles de actualizar.
- **Despliegue:** estático y rápido (Vercel / Netlify, o hosting propio).
- **Sin backend** en v1 (todo cliente). Esto maximiza privacidad, simplicidad y velocidad de despliegue.

### Límites de la arquitectura
- Las notificaciones push en PWA son limitadas en iOS; el check-in diario se implementa como recordatorio local del lado del cliente cuando sea posible, con degradación elegante.
- Los videos no se cachean offline por peso; se enlazan.

---

## 7. Alcance v1 (MVP) vs. después

**v1 (lanzar ya):**
- Selector de usuario, botón "Ayuda ahora", Guías (todas las listadas), Calma ya (respiración + grounding), Videos enlazados, Diario con gráfico, Autoevaluación, Directorio, avisos de seguridad, offline, accesibilidad.

**Después (v2+):**
- Check-in diario con notificaciones, más idiomas (lenguas indígenas), modo para voluntarios con seguimiento de personas atendidas (estilo SAMHSA), integración formal con un ente derivador, contenido en audio.

---

## 8. Pruebas

- **Funcionales:** navegación por los 3 perfiles, botón "Ayuda ahora" siempre accesible, herramientas interactivas funcionan, diario persiste tras cerrar la app.
- **Offline:** desconectar red y verificar que guías/herramientas/diario/directorio siguen disponibles; videos muestran aviso de "requiere internet".
- **Seguridad:** la detección de crisis dispara las líneas de ayuda; los datos no salen del dispositivo.
- **Accesibilidad:** contraste, tamaño de texto, lectura con lector de pantalla, uso con una mano.
- **Instalación PWA:** instalable en Android (y iOS con sus límites).
- **Verificación de contenido:** todos los enlaces de video existen y son de fuentes serias; todos los números del directorio están verificados.

---

## 9. Criterios de éxito

- Una persona en crisis encuentra alivio inmediato (respiración / "Ayuda ahora") en **menos de 10 segundos** desde abrir la app.
- La app funciona **sin internet** para todo lo esencial.
- El contenido es **confiable y citable** (OPS/OMS/IFRC).
- Los números de atención son **reales y verificados**.
- Privacidad total: nada del usuario sale del dispositivo.
