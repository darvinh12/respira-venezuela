// Respira Venezuela — contenido segmentado por persona y situación.
// Fuentes: OMS (Primeros Auxilios Psicológicos "Mirar·Escuchar·Conectar"),
// OPS (Guía Práctica de Salud Mental en Situaciones de Desastres),
// IFRC/Cruz Roja (Centro de Referencia de Apoyo Psicosocial).

// ---------------------------------------------------------------------------
// PERSONAS — cada una abre a sus propias situaciones concretas (no contenido general)
// ---------------------------------------------------------------------------
export const personas = [
  {
    id: 'mi',
    icon: 'Heart',
    color: 'azul',
    titulo: 'Necesito apoyo para mí',
    desc: 'Estoy asustado/a, ansioso/a o no sé cómo seguir.',
  },
  {
    id: 'padres',
    icon: 'Baby',
    color: 'verde',
    titulo: 'Soy madre, padre o cuido niños',
    desc: 'Quiero ayudar a un niño o niña a sentirse seguro/a.',
  },
  {
    id: 'familiar',
    icon: 'Users',
    color: 'amarillo',
    titulo: 'Cuido a un familiar o adulto mayor',
    desc: 'Acompaño a alguien que la está pasando mal.',
  },
  {
    id: 'rescatista',
    icon: 'Siren',
    color: 'terracota',
    titulo: 'Soy rescatista o voluntario/a',
    desc: 'Ayudo a otros y necesito cuidarme también.',
  },
]

// ---------------------------------------------------------------------------
// SITUACIONES — tarjetas concretas por persona. Cada una apunta a una guía.
// ---------------------------------------------------------------------------
export const situaciones = {
  mi: [
    { id: 'panico', icon: 'Wind', titulo: 'Estoy en pánico, no puedo respirar', urgente: true },
    { id: 'replicas', icon: 'Activity', titulo: 'Tiemblo cada vez que hay una réplica' },
    { id: 'insomnio', icon: 'Moon', titulo: 'No puedo dormir por miedo a que tiemble' },
    { id: 'perdida-casa', icon: 'Home', titulo: 'Perdí mi casa, lo perdí todo' },
    { id: 'duelo', icon: 'HeartCrack', titulo: 'Perdí a un ser querido' },
    { id: 'ansiedad', icon: 'CloudRain', titulo: 'Siento ansiedad y angustia todo el tiempo' },
    { id: 'normales', icon: 'CircleHelp', titulo: '¿Es normal sentirme así?' },
  ],
  padres: [
    { id: 'nino-llora', icon: 'Baby', titulo: 'Mi hijo/a no para de llorar o está muy asustado/a' },
    { id: 'explicar', icon: 'MessagesSquare', titulo: '¿Cómo le explico lo que pasó?' },
    { id: 'contar-muerte', icon: 'HeartCrack', titulo: 'Perdimos a un familiar, ¿cómo se lo digo?' },
    { id: 'nino-dormir', icon: 'Moon', titulo: 'No quiere dormir solo/a o tiene pesadillas' },
    { id: 'regresion', icon: 'ToyBrick', titulo: 'Volvió a actuar como más pequeño/a (pipí, no se despega)' },
    { id: 'neurodivergente', icon: 'Accessibility', titulo: 'Mi hijo/a es neurodivergente o con necesidades especiales' },
    { id: 'cuidarte', icon: 'HeartHandshake', titulo: 'Yo también estoy agotado/a (cuídate tú)' },
  ],
  familiar: [
    { id: 'escuchar', icon: 'Ear', titulo: 'Cómo acompañar y escuchar sin presionar' },
    { id: 'bloqueado', icon: 'CircleOff', titulo: 'Está bloqueado/a, no habla ni reacciona' },
    { id: 'mayor', icon: 'Accessibility', titulo: 'Cómo ayudar a un adulto mayor' },
    { id: 'cuando-derivar', icon: 'LifeBuoy', titulo: '¿Cuándo necesita ayuda profesional ya?' },
  ],
  rescatista: [
    { id: 'pfa', icon: 'HeartHandshake', titulo: 'Primeros Auxilios Psicológicos: Mirar·Escuchar·Conectar' },
    { id: 'que-no-decir', icon: 'MessageSquareWarning', titulo: 'Qué decir y qué NO decir a una víctima' },
    { id: 'no-quemarte', icon: 'Flame', titulo: 'No te quemes: cuidar al que cuida' },
  ],
}

// ---------------------------------------------------------------------------
// GUÍAS — contenido concreto. pasos = qué hacer; evitar = qué no hacer.
// ---------------------------------------------------------------------------
export const guias = {
  // ---- PARA MÍ ----
  panico: {
    titulo: 'Estoy en pánico, no puedo respirar',
    intro: 'Un ataque de pánico da mucho miedo pero NO es peligroso y pasa. Tu cuerpo está en alerta; vamos a bajarlo paso a paso.',
    accionRapida: { label: 'Abrir respiración guiada', tool: 'respiracion' },
    pasos: [
      'Recuerda: esto es pánico, no te vas a morir ni te estás volviendo loco/a. Va a pasar en minutos.',
      'Respira despacio: inhala 4 segundos, sostén 4, exhala 6. La exhalación larga baja la alerta.',
      'Apoya los pies en el piso y siente el suelo firme. Nombra 5 cosas que ves a tu alrededor.',
      'Pon una mano en el pecho y otra en el abdomen; deja que se mueva el abdomen, no el pecho.',
      'Si puedes, moja tu cara con agua fría o sostén algo frío: ayuda a calmar el cuerpo.',
    ],
    evitar: ['Respirar rápido o "tomar más aire" (empeora el mareo)', 'Pelear con el miedo; déjalo pasar como una ola', 'Encerrarte en pensamientos catastróficos'],
    cuandoBuscar: 'Si los ataques se repiten varias veces al día, duran mucho, o sientes que no puedes con tu vida, llama a una línea de apoyo (ver Ayuda ahora).',
    fuente: 'OMS – Primeros Auxilios Psicológicos',
  },
  replicas: {
    titulo: 'Tiemblo cada vez que hay una réplica',
    intro: 'Las réplicas son normales después de un terremoto fuerte y pueden durar días o semanas. Que tu cuerpo se sobresalte es una respuesta de protección, no debilidad.',
    pasos: [
      'Acepta que las réplicas ocurrirán un tiempo: saberlo reduce el susto.',
      'Ten listo un plan simple: qué hacer y a dónde ir si tiembla. La preparación calma la mente.',
      'Cuando sientas una réplica, respira lento y repítete: "esto pasa, estoy haciendo lo correcto".',
      'Después de cada réplica, suelta el cuerpo: hombros, mandíbula, manos. El cuerpo guarda la tensión.',
      'Limita ver videos del terremoto una y otra vez: reactiva la alerta.',
    ],
    evitar: ['Revisar noticias o redes sin parar', 'Quedarte despierto/a "vigilando" toda la noche', 'Avergonzarte por sobresaltarte: le pasa a todos'],
    cuandoBuscar: 'Si el miedo te impide comer, dormir o salir por más de 2-3 semanas, busca apoyo profesional.',
    fuente: 'OPS – Salud Mental en Situaciones de Desastres',
  },
  insomnio: {
    titulo: 'No puedo dormir por miedo a que tiemble',
    intro: 'El insomnio tras un terremoto es muy común: el cuerpo se mantiene "en guardia". Con rutina y calma, el sueño vuelve.',
    pasos: [
      'Crea una rutina: misma hora para acostarte, luz baja y menos pantallas una hora antes.',
      'Antes de dormir haz respiración lenta (inhala 4, exhala 6) durante unos minutos.',
      'Si no duermes en 20 minutos, levántate, haz algo tranquilo con luz tenue y vuelve cuando tengas sueño.',
      'Deja a mano lo esencial (linterna, zapatos, agua): saber que estás listo/a tranquiliza.',
      'Evita café, energizantes y siestas largas durante el día.',
    ],
    evitar: ['Usar el teléfono en la cama viendo noticias', 'Tomar alcohol para dormir (empeora el sueño)', 'Obligarte a dormir con enojo: aumenta la activación'],
    cuandoBuscar: 'Si pasas más de 2 semanas casi sin dormir o con pesadillas intensas, consulta una línea de apoyo.',
    fuente: 'OPS / IFRC – Apoyo psicosocial en emergencias',
  },
  'perdida-casa': {
    titulo: 'Perdí mi casa, lo perdí todo',
    intro: 'Perder tu hogar duele profundamente: no es solo el techo, es tu seguridad y tus recuerdos. Lo que sientes es legítimo.',
    pasos: [
      'Atiende primero lo básico: un lugar seguro, agua, comida, abrigo. Una cosa a la vez.',
      'Permítete sentir la pérdida; llorar no es debilidad, es parte de sanar.',
      'Apóyate en otros: pedir ayuda no te hace menos. Acércate a refugios y organizaciones.',
      'Haz una sola tarea concreta hoy (un trámite, un contacto). Avanzar en pequeño devuelve control.',
      'Conserva una rutina mínima: comer y dormir a horas fijas sostiene el ánimo.',
    ],
    evitar: ['Tomar decisiones grandes e irreversibles en caliente', 'Aislarte de los demás', 'Compararte con quien "lo perdió todo y sigue fuerte"'],
    cuandoBuscar: 'Si sientes desesperanza total o que no vale la pena seguir, llama YA a una línea de apoyo (ver Ayuda ahora).',
    fuente: 'OPS – Salud Mental en Situaciones de Desastres',
  },
  duelo: {
    titulo: 'Perdí a un ser querido',
    intro: 'No hay una forma "correcta" de vivir el duelo y no hay un tiempo fijo. Tu dolor refleja tu amor.',
    pasos: [
      'Acepta lo que sientes —tristeza, rabia, culpa, vacío—: todo cabe en el duelo.',
      'Habla de quien perdiste con alguien de confianza cuando te sientas listo/a.',
      'Cuida tu cuerpo: come algo, hidrátate, descansa aunque cueste.',
      'Si tienes creencias o rituales (despedidas, oración, comunidad), apóyate en ellos.',
      'Avanza a tu ritmo. Habrá días buenos y malos; ambos son parte del proceso.',
    ],
    evitar: ['Presionarte a "superarlo rápido"', 'Aislarte por completo', 'Anestesiarte con alcohol o drogas'],
    cuandoBuscar: 'Si después de semanas no puedes funcionar, sientes que no quieres vivir, o el dolor no afloja nada, busca apoyo profesional.',
    fuente: 'IFRC – Apoyo en duelo y pérdida',
  },
  ansiedad: {
    titulo: 'Siento ansiedad y angustia todo el tiempo',
    intro: 'Después de un desastre el cuerpo queda "acelerado". La ansiedad constante es agotadora pero se puede bajar.',
    pasos: [
      'Pon nombre a lo que sientes ("estoy ansioso/a"): nombrarlo ya baja la intensidad.',
      'Usa el grounding 5-4-3-2-1 para volver al presente (ver herramienta).',
      'Mueve el cuerpo: caminar, estirarte o tareas simples descargan la tensión.',
      'Reduce el consumo de noticias a momentos breves y horarios fijos.',
      'Conéctate con otros: hablar con alguien de confianza regula el sistema nervioso.',
    ],
    accionRapida: { label: 'Abrir grounding 5-4-3-2-1', tool: 'grounding' },
    evitar: ['Cafeína y energizantes en exceso', 'Estar pegado/a a noticias y redes', 'Exigirte estar "bien" todo el tiempo'],
    cuandoBuscar: 'Si la ansiedad te impide trabajar, comer o dormir por más de 2 semanas, contacta una línea de apoyo.',
    fuente: 'OMS / OPS',
  },
  normales: {
    titulo: '¿Es normal sentirme así?',
    intro: 'Sí. El miedo, el llanto, el insomnio, la rabia, el aturdimiento o la dificultad para concentrarte son REACCIONES NORMALES ante un evento anormal. No estás enfermo/a ni débil.',
    pasos: [
      'Tu mente y tu cuerpo están reaccionando para protegerte: es esperable tras un terremoto.',
      'La mayoría de las personas mejora con el tiempo, el apoyo y el autocuidado.',
      'No te compares con otros: cada quien procesa a su ritmo.',
      'Date permiso de sentir sin juzgarte. Pasar por esto no significa que algo ande mal contigo.',
      'Apoyarte en familia, comunidad y rutinas acelera la recuperación.',
    ],
    evitar: ['Exigirte "estar bien ya"', 'Esconder lo que sientes', 'Pensar que pedir ayuda es de débiles'],
    cuandoBuscar: 'Las reacciones que NO ceden tras varias semanas, o las ideas de hacerte daño, sí necesitan atención profesional. No esperes: llama.',
    fuente: 'OMS – Primeros Auxilios Psicológicos',
  },

  // ---- PADRES / NIÑOS ----
  'nino-llora': {
    titulo: 'Mi hijo/a no para de llorar o está muy asustado/a',
    intro: 'Los niños sienten el miedo de los adultos y necesitan, sobre todo, sentirse seguros y acompañados. Tu calma es su medicina.',
    pasos: [
      'Abrázalo/a y baja a su altura. El contacto físico calma más que mil palabras.',
      'Valida lo que siente: "sé que tuviste mucho miedo, yo estoy aquí contigo".',
      'Háblale con voz tranquila y frases cortas. Tu tono importa más que el contenido.',
      'Devuélvele rutina: comer, jugar, dormir a horas conocidas le da seguridad.',
      'Limita que vea imágenes del terremoto en TV o teléfono.',
    ],
    evitar: ['Decir "no llores" o "no pasa nada"', 'Mentirle o darle detalles que asusten', 'Dejarlo/a solo/a con la angustia'],
    cuandoBuscar: 'Si tras varias semanas sigue muy asustado/a, no juega, no come o no duerme, consulta con un profesional o línea de apoyo.',
    fuente: 'IFRC / UNICEF – Apoyo psicosocial a niñez',
  },
  explicar: {
    titulo: '¿Cómo le explico lo que pasó?',
    intro: 'Los niños necesitan la verdad, en palabras simples y adaptadas a su edad. No saber asusta más que saber.',
    pasos: [
      'Usa palabras sencillas: "tembló muy fuerte la tierra, se llama terremoto, ya pasó".',
      'Responde solo lo que pregunta, sin abrumar con detalles.',
      'Asegúrale lo que es cierto: "hay personas trabajando para cuidarnos" y "estamos juntos".',
      'Permítele preguntar las veces que necesite; repetir le ayuda a entender.',
      'Si pregunta si volverá a pasar, sé honesto/a y tranquilizador/a: "puede temblar otra vez, por eso sabemos qué hacer para cuidarnos".',
    ],
    evitar: ['Mentir ("no va a pasar más")', 'Dar detalles aterradores o cifras de muertos', 'Evitar el tema: el silencio aumenta el miedo'],
    cuandoBuscar: 'Si el niño/a queda obsesionado/a con el tema o muy bloqueado/a, busca apoyo profesional.',
    fuente: 'UNICEF / IFRC',
  },
  'contar-muerte': {
    titulo: 'Perdimos a un familiar, ¿cómo se lo digo?',
    intro: 'Dar esta noticia es muy duro. Los niños merecen saber la verdad con amor; ocultarla genera más confusión y miedo.',
    pasos: [
      'Busca un lugar tranquilo y un momento sin prisa. Que esté alguien de confianza cerca.',
      'Usa palabras claras y reales: "murió", "ya no va a volver". Evita "se durmió" o "se fue de viaje" (confunden y dan miedo a dormir/viajar).',
      'Dale espacio para reaccionar: puede llorar, callar, enojarse o seguir jugando. Todo es válido.',
      'Asegúrale que no es su culpa y que tú vas a seguir cuidándolo/a.',
      'Permítele recordar y despedirse a su manera (un dibujo, una vela, hablar de la persona).',
    ],
    evitar: ['Eufemismos como "se durmió" o "se fue"', 'Ocultar la muerte "para protegerlo"', 'Exigirle que reaccione de cierta forma'],
    cuandoBuscar: 'Si el duelo del niño/a se vuelve muy intenso o prolongado (no come, no duerme, retrocede mucho), busca apoyo profesional.',
    fuente: 'IFRC – Apoyo en duelo infantil',
  },
  'nino-dormir': {
    titulo: 'No quiere dormir solo/a o tiene pesadillas',
    intro: 'Tras un susto grande, muchos niños temen la oscuridad o dormir solos. Es temporal y se supera con paciencia y rutina.',
    pasos: [
      'Mantén una rutina de sueño tranquila: cuento, luz tenue, misma hora.',
      'Si tiene pesadillas, abrázalo/a y recuérdale que está a salvo y tú estás cerca.',
      'Acepta de forma transitoria que duerma acompañado/a o con una luz suave; luego, de a poco, recupera su espacio.',
      'Dale un objeto de seguridad (peluche, sábana) que lo acompañe.',
      'Durante el día, deja que dibuje o juegue lo que sintió: así procesa el miedo.',
    ],
    evitar: ['Burlarte o regañarlo/a por tener miedo', 'Forzarlo/a a dormir solo/a de golpe', 'Ver pantallas con contenido del terremoto antes de dormir'],
    cuandoBuscar: 'Si las pesadillas y el miedo a dormir siguen intensos por más de un mes, consulta a un profesional.',
    fuente: 'UNICEF / OPS',
  },
  regresion: {
    titulo: 'Volvió a actuar como más pequeño/a',
    intro: 'Que un niño "retroceda" (hacerse pipí, hablar como bebé, no despegarse de ti) tras un desastre es una reacción NORMAL al estrés. No es un retroceso real ni un capricho.',
    pasos: [
      'Tómalo con calma y sin castigar: es su forma de pedir seguridad.',
      'Dale más cercanía y contacto físico esos días; lo necesita.',
      'Mantén rutinas simples y predecibles: le devuelven sensación de control.',
      'Refuerza con cariño cada pequeño avance, sin presionar.',
      'Confía: cuando se sienta seguro/a otra vez, estas conductas suelen desaparecer solas.',
    ],
    evitar: ['Castigar o avergonzar ("ya estás grande para eso")', 'Presionar para que "vuelva a la normalidad" ya', 'Preocuparte en exceso: suele ser pasajero'],
    cuandoBuscar: 'Si la conducta persiste muchas semanas o se intensifica, consulta con un profesional.',
    fuente: 'IFRC / UNICEF',
  },
  cuidarte: {
    titulo: 'Yo también estoy agotado/a (cuídate tú)',
    intro: 'No puedes cuidar bien si te apagas. Cuidarte no es egoísmo: es lo que te permite sostener a tu familia.',
    pasos: [
      'Reconoce que tú también pasaste por el terremoto y tienes derecho a sentirte mal.',
      'Roba momentos pequeños para ti: respirar, un café, cinco minutos de silencio.',
      'Apóyate en otros adultos: turnarse el cuidado no te hace mal padre/madre.',
      'Come, hidrátate y duerme lo que puedas: tu cuerpo también está en alerta.',
      'Habla de cómo te sientes con alguien de confianza o una línea de apoyo.',
    ],
    accionRapida: { label: 'Tomar 1 minuto para respirar', tool: 'respiracion' },
    evitar: ['Cargar con todo solo/a', 'Sentir culpa por necesitar descanso', 'Posponer indefinidamente tu propio bienestar'],
    cuandoBuscar: 'Si te sientes desbordado/a, sin fuerzas para cuidar o con desesperanza, busca apoyo profesional cuanto antes.',
    fuente: 'OMS – Cuidar al cuidador',
  },

  // ---- FAMILIAR / ADULTO MAYOR ----
  escuchar: {
    titulo: 'Cómo acompañar y escuchar sin presionar',
    intro: 'Acompañar no es resolver ni dar consejos. Es estar presente y escuchar. Sigue el modelo de la OMS: Mirar · Escuchar · Conectar.',
    pasos: [
      'MIRAR: observa si está seguro/a, si tiene necesidades básicas y cómo está emocionalmente.',
      'ESCUCHAR: acércate con calma, preséntate, escucha sin juzgar ni interrumpir.',
      'No obligues a hablar: a veces basta con estar al lado en silencio.',
      'Valida: "es normal sentirse así después de lo que pasó".',
      'CONECTAR: ayúdale con necesidades concretas y con información sobre dónde encontrar apoyo.',
    ],
    evitar: ['Presionar para que cuente lo que pasó', 'Decir "tienes que ser fuerte" o "pudo ser peor"', 'Dar consejos no pedidos o minimizar su dolor'],
    cuandoBuscar: 'Si la persona habla de hacerse daño, no reacciona o no puede funcionar, ayúdale a contactar una línea de apoyo de inmediato.',
    fuente: 'OMS – Primeros Auxilios Psicológicos (Mirar·Escuchar·Conectar)',
  },
  bloqueado: {
    titulo: 'Está bloqueado/a, no habla ni reacciona',
    intro: 'Tras un trauma, algunas personas se "congelan": no hablan, parecen ausentes o muy aturdidas. Es una respuesta de protección.',
    pasos: [
      'Acércate con calma y voz suave; preséntate aunque te conozca.',
      'Llévalo/a a un lugar seguro y tranquilo, lejos del peligro y del ruido.',
      'Ofrece algo básico: agua, una manta, sentarse. El cuidado concreto reconecta.',
      'Ayúdale a "aterrizar": pídele que sienta sus pies en el piso, que respire contigo.',
      'Quédate cerca. No lo/a dejes solo/a hasta que esté más presente.',
    ],
    evitar: ['Sacudirlo/a o gritarle', 'Exigir que reaccione "ya"', 'Dejarlo/a solo/a en ese estado'],
    cuandoBuscar: 'Si el bloqueo dura horas, no responde a nada o empeora, busca atención médica/psicológica urgente.',
    fuente: 'OPS / OMS',
  },
  mayor: {
    titulo: 'Cómo ayudar a un adulto mayor',
    intro: 'Los adultos mayores pueden estar más vulnerables: por movilidad, salud, soledad o pérdida de su entorno conocido. Necesitan seguridad y respeto.',
    pasos: [
      'Asegura lo básico: medicinas, lentes, audífonos, bastón, abrigo, agua y comida.',
      'Háblale con respeto y paciencia, de frente y claro; no lo/a trates como niño/a.',
      'Mantén referencias conocidas: rutinas, objetos familiares, personas cercanas.',
      'Escucha sus recuerdos y preocupaciones; sentirse escuchado/a reduce la angustia.',
      'Conéctalo/a con su red (familia, vecinos, comunidad) para que no quede aislado/a.',
    ],
    evitar: ['Aislarlo/a o decidir todo por él/ella', 'Apurarlo/a o tratarlo/a con condescendencia', 'Descuidar sus medicinas y condiciones de salud'],
    cuandoBuscar: 'Si aparece confusión repentina, no come, no duerme o se aísla por completo, busca atención de salud.',
    fuente: 'OPS – Atención a grupos vulnerables',
  },
  'cuando-derivar': {
    titulo: '¿Cuándo necesita ayuda profesional ya?',
    intro: 'El apoyo de familia y comunidad alcanza para la mayoría, pero hay señales que requieren un profesional sin demora.',
    pasos: [
      'Habla o insinúa que quiere hacerse daño o no quiere vivir → busca ayuda YA.',
      'No puede funcionar (no come, no duerme, no se mueve) durante días.',
      'Está desconectado/a de la realidad, muy confundido/a o ve/oye cosas.',
      'Consume alcohol o drogas para soportar el día.',
      'Las reacciones intensas no ceden tras varias semanas.',
    ],
    accionRapida: { label: 'Ver líneas de ayuda ahora', tool: 'directorio' },
    evitar: ['Esperar "a ver si se le pasa" ante señales graves', 'Minimizar las ideas de hacerse daño', 'Dejar a la persona sola en crisis'],
    cuandoBuscar: 'Ante cualquiera de estas señales, contacta de inmediato una línea de apoyo o servicio de emergencia.',
    fuente: 'OMS / OPS',
  },

  neurodivergente: {
    titulo: 'Mi hijo/a es neurodivergente o con necesidades especiales',
    intro: 'Niños y niñas autistas, con TDAH, discapacidad intelectual o sensorial pueden vivir el sismo y las réplicas con mucha más intensidad. La rutina y la previsibilidad son su mayor refugio.',
    pasos: [
      'Recupera la rutina y anticipa: avisa qué va a pasar con frases cortas y concretas ("ahora comemos, luego dormimos").',
      'Baja la carga sensorial: menos ruido y luz fuerte; ofrece audífonos, una manta o su objeto/juguete de siempre.',
      'Comunícate como mejor te entienda: dibujos, pictogramas, señas, objetos reales o gestos, no solo palabras.',
      'Respeta su autorregulación: si se balancea, aletea o repite algo para calmarse, déjalo; eso lo/a ayuda.',
      'Ten a mano lo esencial: medicación, audífono, lentes, su tablero o comunicador, y una identificación con su nombre y un contacto.',
      'Sé su ancla: tu calma y tu presencia constante regulan más que cualquier explicación.',
    ],
    evitar: ['Cambiar de golpe rutinas, lugares y cuidadores', 'Forzar contacto físico, miradas o que "se porte normal"', 'Saturarlo/a de gente, ruido, preguntas o noticias en pantalla'],
    cuandoBuscar: 'Si deja de comer o dormir varios días, se autolesiona más de lo habitual o pierde habilidades que ya tenía, contacta a su médico/terapeuta o una línea de apoyo.',
    accionRapida: { label: 'Ver líneas de ayuda ahora', tool: 'directorio' },
    fuente: 'Primeros Auxilios Psicológicos y apoyo a la discapacidad en emergencias · OPS / NCTSN',
  },

  // ---- RESCATISTA ----
  pfa: {
    titulo: 'Primeros Auxilios Psicológicos: Mirar · Escuchar · Conectar',
    intro: 'El marco de la OMS para apoyar a alguien en crisis. No requiere ser psicólogo: requiere presencia, respeto y calma.',
    pasos: [
      'MIRAR: evalúa seguridad, identifica quién necesita ayuda urgente y reacciones graves de estrés.',
      'ESCUCHAR: acércate con respeto, pregunta por necesidades, escucha y ayuda a calmar. No fuerces a hablar.',
      'CONECTAR: ayuda a cubrir necesidades básicas, a acceder a servicios y a reunirse con sus seres queridos.',
      'Prioriza a los más vulnerables: niños, mayores, embarazadas, personas con discapacidad o heridas.',
      'Da información veraz y sencilla; la incertidumbre aumenta el miedo.',
    ],
    evitar: ['Presionar para obtener el relato del trauma', 'Hacer promesas que no puedes cumplir', 'Juzgar, etiquetar o tratar como "pacientes" a las personas'],
    cuandoBuscar: 'Deriva a atención especializada a quien tenga riesgo de hacerse daño, no funcione, o presente reacciones severas.',
    fuente: 'OMS – Primeros Auxilios Psicológicos (guía de campo)',
  },
  'que-no-decir': {
    titulo: 'Qué decir y qué NO decir a una víctima',
    intro: 'Las palabras consuelan o hieren. Estas son frases que ayudan y frases que, aunque bienintencionadas, hacen daño.',
    pasos: [
      'SÍ: "Estoy aquí contigo." "Lo que sientes es normal." "No fue tu culpa."',
      'SÍ: "¿Qué necesitas ahora?" Ofrece algo concreto: agua, una manta, un teléfono.',
      'SÍ: escucha y valida; a veces el silencio acompañado vale más que cualquier frase.',
      'Habla claro y con calma; baja a su altura y mantén contacto visual respetuoso.',
      'Respeta su ritmo, su cultura y sus creencias.',
    ],
    evitar: ['"Sé fuerte", "no llores", "pudo ser peor"', '"Sé cómo te sientes", "todo pasa por algo"', 'Dar consejos no pedidos o apurar su dolor'],
    cuandoBuscar: 'Si detectas riesgo de autolesión o reacciones severas, conecta a la persona con apoyo profesional.',
    fuente: 'IFRC / OMS',
  },
  'no-quemarte': {
    titulo: 'No te quemes: cuidar al que cuida',
    intro: 'Ayudar en un desastre desgasta. El estrés del rescatista y el trauma vicario son reales. Cuidarte te permite seguir ayudando.',
    pasos: [
      'Reconoce tus límites: descansa, rota turnos, come e hidrátate.',
      'Habla con tu equipo de lo que viviste; compartir descarga el peso.',
      'Haz pausas para respirar y soltar la tensión, aunque sean breves.',
      'Separa momentos de desconexión: no estés 24/7 en modo emergencia.',
      'Detecta señales de alerta en ti: irritabilidad, insomnio, embotamiento, llanto, no querer seguir.',
    ],
    accionRapida: { label: 'Tomar 1 minuto para respirar', tool: 'respiracion' },
    evitar: ['Sentir que descansar es "abandonar"', 'Aguantar solo/a sin hablar con nadie', 'Usar alcohol o sustancias para sostener el ritmo'],
    cuandoBuscar: 'Si el desgaste no cede, tienes pesadillas, embotamiento o pensamientos de hacerte daño, busca apoyo profesional.',
    fuente: 'OMS / IFRC – Cuidado del personal de ayuda',
  },
}

// ---------------------------------------------------------------------------
// DIRECTORIO — números reales y verificados (junio 2026). tel: para llamar.
// ---------------------------------------------------------------------------
export const directorio = [
  {
    grupo: 'Apoyo psicológico (Venezuela)',
    items: [
      { nombre: 'LAPSI – Federación de Psicólogos de Venezuela', detalle: 'Primeros auxilios psicológicos, gratis y confidencial (viernes a domingo, 8am–8pm)', tels: ['0424-2907338', '0212-4163116', '0212-4163118'] },
      { nombre: 'UCAB – PsicoLínea', detalle: 'Línea gratuita y confidencial de salud mental de la UCAB (jueves, 8am–5pm)', tels: ['0414-1217882', '0424-1723981'] },
      { nombre: 'Psicólogos sin Fronteras Venezuela', detalle: 'Apoyo psicosocial en crisis y procesos de duelo', tels: ['0424-9270304', '0412-9270304'] },
      { nombre: 'CECODAP', detalle: 'Apoyo y protección psicológica a niñas, niños y adolescentes', tels: ['0424-2842359'] },
      { nombre: 'INVEDIN', detalle: 'Apoyo a niños y personas con discapacidad y necesidades especiales', tels: ['0414-9065863'] },
      { nombre: 'PLAFAM', detalle: 'Atención en salud y apoyo psicológico', tels: ['0412-2273712'] },
      { nombre: 'Tinta Violeta', detalle: 'Apoyo psicológico a mujeres y atención en violencia de género', tels: ['0412-6924062'] },
      { nombre: 'Hola Doc', detalle: 'Orientación en salud y bienestar emocional', tels: ['0212-7717190'] },
      { nombre: 'Rehabilitarte', detalle: 'Apoyo psicológico y acompañamiento emocional', tels: ['0424-6115506'] },
      { nombre: 'Siempre Juntos', detalle: 'Apoyo emocional y acompañamiento', tels: ['0426-5723422'] },
      { nombre: 'SNC', detalle: 'Línea de apoyo psicológico', tels: ['0414-4265181'] },
      { nombre: 'Línea 0-800-AYUDA-01 (Gobierno)', detalle: 'Apoyo psicológico telefónico gratuito y nacional, activado tras el terremoto (psicólogos y psiquiatras)', tels: ['0-800-29832-01'] },
    ],
  },
  {
    grupo: 'Emergencias',
    items: [
      { nombre: 'Emergencias (número único nacional)', detalle: 'Marca 171 (CANTV) · *1 (Movilnet) · 112 (Digitel) · 911 (Movistar)', tels: ['171'], urgente: true },
      { nombre: 'Protección Civil Nacional', detalle: 'Atención y coordinación ante desastres', tels: ['0800-5588427', '0212-6311522'] },
      { nombre: 'Cruz Roja Venezolana', detalle: 'Ambulancias, emergencias y restablecimiento del contacto con familiares (RCF)', tels: ['0212-5712411', '0212-5714574'] },
      { nombre: 'Bomberos de Caracas', detalle: 'Rescate y atención de emergencias (Caracas)', tels: ['0212-5422444'] },
    ],
  },
  {
    grupo: 'Apoyo internacional en crisis (español)',
    items: [
      { nombre: 'Línea 024 (España)', detalle: 'Atención a la conducta suicida, 24h. Útil como referencia y para venezolanos en España', tels: ['024'] },
      { nombre: '988 Suicide & Crisis Lifeline (EE. UU.)', detalle: 'Atención en español, 24/7 (para quienes están en EE. UU.)', tels: ['988'] },
      { nombre: 'Find A Helpline', detalle: 'Directorio mundial de líneas de ayuda por país (chat, texto, teléfono)', web: 'https://findahelpline.com/es-419' },
    ],
  },
]

// ---------------------------------------------------------------------------
// VIDEOS — enlaces a fuentes serias (requieren internet). Verificar/curar.
// ---------------------------------------------------------------------------
// Videos verificados (HTTP 200 vía oEmbed). categoria agrupa por tema.
export const videos = [
  // Primeros auxilios psicológicos
  { titulo: 'Primeros Auxilios Psicológicos', fuente: 'Cruz Roja Mexicana', categoria: 'Primeros auxilios psicológicos', url: 'https://www.youtube.com/watch?v=MnxsBh__kn8' },
  { titulo: 'Primeros Auxilios Psicológicos en contextos de desastre', fuente: 'Cruz Roja Argentina', categoria: 'Primeros auxilios psicológicos', url: 'https://www.youtube.com/watch?v=myhDRcOIkC4' },
  // Ayudar a los niños
  { titulo: 'Apoyo emocional a los niños tras un sismo', fuente: 'NotimexTV', categoria: 'Ayudar a los niños', url: 'https://www.youtube.com/watch?v=uw0OmSAdTds' },
  { titulo: 'Cómo superar el miedo a los sismos (recomendaciones psicológicas)', fuente: 'Centro Universitario de Estudios Jurídicos', categoria: 'Ayudar a los niños', url: 'https://www.youtube.com/watch?v=ZPDVIs-YnHM' },
  // Duelo y pérdida
  { titulo: 'Ante una pérdida significativa: manejo del duelo', fuente: 'OPS/PAHO TV', categoria: 'Duelo y pérdida', url: 'https://www.youtube.com/watch?v=qUGkJr61iG0' },
  { titulo: 'Manejo y tratamiento del duelo', fuente: 'Telesalud Minsa', categoria: 'Duelo y pérdida', url: 'https://www.youtube.com/watch?v=QKWJPVsvufA' },
  // Ataques de pánico
  { titulo: 'Ataques de pánico: qué son y cómo recuperar el control', fuente: 'Revista MSP', categoria: 'Ataques de pánico', url: 'https://www.youtube.com/watch?v=ypfpyHa72FM' },
  { titulo: 'Ataques de pánico: cómo controlarlos', fuente: 'Televisión Pública (ADN Buena Salud)', categoria: 'Ataques de pánico', url: 'https://www.youtube.com/watch?v=__HIGQmu8So' },
  // Calmar la ansiedad (incluye respiración)
  { titulo: 'Prevención y manejo de la ansiedad', fuente: 'Cruz Roja Española', categoria: 'Calmar la ansiedad', url: 'https://www.youtube.com/watch?v=M_no3cxZJws' },
  { titulo: 'Ejercicio de respiración para la ansiedad y el estrés (5 min)', fuente: 'Respiración guiada', categoria: 'Calmar la ansiedad', url: 'https://www.youtube.com/watch?v=0mXT7lc-la0' },
  { titulo: 'Respiración 4-7-8 para reducir la ansiedad', fuente: 'Gabriela Litschi', categoria: 'Calmar la ansiedad', url: 'https://www.youtube.com/watch?v=EGO5m_DBzF8' },
  // Dormir mejor
  { titulo: 'Cinco pautas para evitar el insomnio y dormir mejor', fuente: 'Dr. Javier Albares (AprendemosJuntos)', categoria: 'Dormir mejor', url: 'https://www.youtube.com/watch?v=mBVRrNumTnQ' },
  { titulo: 'Relajación guiada para dormir', fuente: 'Malova Elena', categoria: 'Dormir mejor', url: 'https://www.youtube.com/watch?v=75Wh25sAm-U' },
]

// ---------------------------------------------------------------------------
// ACTIVIDADES — ejercicios psicosociales para hacer en casa (descargables)
// ---------------------------------------------------------------------------
export const actividades = [
  {
    id: 'frasco-calma',
    grupo: 'Para niños',
    icon: 'Sparkles',
    titulo: 'El frasco de la calma',
    intro: 'Un frasco con purpurina que, al agitarse y reposar, ayuda a un niño/a a calmarse mientras respira y observa.',
    materiales: ['Un frasco o botella transparente con tapa', 'Agua tibia', 'Pega con escarcha o purpurina (o champú y brillantina)', 'Opcional: una gota de colorante'],
    pasos: [
      'Llena el frasco casi hasta arriba con agua tibia.',
      'Agrega la pega con escarcha y la purpurina; cierra bien la tapa (puedes sellarla con pega).',
      'Agítalo junto al niño/a y observen cómo la purpurina baja despacio.',
      'Invítale a respirar lento mientras mira: «inhala… exhala…» hasta que todo repose.',
      'Explícale: «cuando estés muy nervioso/a, agita el frasco y respira hasta que se calme; tu mente también se calma así».',
    ],
    fuente: 'Actividad de autorregulación · IFRC / UNICEF',
  },
  {
    id: 'dibuja-emociones',
    grupo: 'Para niños',
    icon: 'Palette',
    titulo: 'Dibuja cómo te sientes',
    intro: 'Dibujar ayuda a los niños a sacar lo que sienten cuando no tienen palabras para el miedo o la tristeza.',
    materiales: ['Hojas o cuaderno', 'Lápices o creyones de colores'],
    pasos: [
      'Invítale a dibujar «lo que pasó» o «cómo se siente tu corazón hoy».',
      'No corrijas ni juzgues el dibujo; acompáñalo con calma.',
      'Pregúntale con suavidad: «¿me cuentas tu dibujo?». Escucha sin apurar.',
      'Valida lo que exprese: «tuviste mucho miedo, y está bien sentirlo».',
      'Terminen con un dibujo de algo que le dé seguridad: su casa, su familia, su lugar favorito.',
    ],
    fuente: 'Expresión emocional a través del juego · UNICEF',
  },
  {
    id: 'rincon-seguro',
    grupo: 'Para niños',
    icon: 'Box',
    titulo: 'Nuestro rincón seguro',
    intro: 'Un espacio acogedor en casa donde el niño/a puede ir cuando se sienta asustado/a o abrumado/a.',
    materiales: ['Un rincón tranquilo', 'Cojines, mantas o peluches', 'Opcional: sus dibujos o un objeto querido'],
    pasos: [
      'Elijan juntos un rincón tranquilo de la casa.',
      'Háganlo cómodo con cojines, una manta y algún peluche.',
      'Acuerden que es un lugar para calmarse, no un castigo.',
      'Enséñale a usar ahí la respiración o el frasco de la calma.',
      'Ve con él/ella las primeras veces, hasta que aprenda a usarlo solo/a.',
    ],
    fuente: 'Sensación de seguridad y control · IFRC',
  },
  {
    id: 'carta-a-mi',
    grupo: 'Para ti',
    icon: 'Pencil',
    titulo: 'Carta a mí mismo/a',
    intro: 'Escribirte con compasión, como le hablarías a alguien que quieres, baja la autoexigencia y la culpa.',
    materiales: ['Papel y lápiz, o las notas de tu teléfono'],
    pasos: [
      'Escribe la fecha y empieza: «Querido/a [tu nombre]…».',
      'Reconoce lo que estás viviendo sin juzgarte: «es normal que me sienta así después de esto».',
      'Escríbete lo que le dirías a un buen amigo/a en tu lugar.',
      'Anota una cosa pequeña que harás hoy para cuidarte.',
      'Guárdala. Reléela cuando vuelvas a sentirte abrumado/a.',
    ],
    fuente: 'Autocompasión · basado en T. Neff / OMS',
  },
  {
    id: 'tres-cosas',
    grupo: 'Para ti',
    icon: 'Star',
    titulo: 'Tres cosas buenas del día',
    intro: 'Cada noche, anotar tres cosas que salieron bien reentrena la mente para notar lo seguro y lo bueno, no solo la amenaza.',
    materiales: ['Un cuaderno o el Diario de esta app'],
    pasos: [
      'Antes de dormir, recuerda el día que pasó.',
      'Anota tres cosas, por pequeñas que sean, que estuvieron bien o que agradeces.',
      'Para cada una, escribe por qué pasó o qué papel tuviste tú.',
      'Hazlo varios días seguidos; el efecto crece con la práctica.',
    ],
    fuente: 'Ejercicio de bienestar · psicología positiva',
  },
  {
    id: 'rutina-visual',
    grupo: 'Para la familia',
    icon: 'ListChecks',
    titulo: 'Rutina diaria visual',
    intro: 'Después de un desastre, la rutina devuelve sensación de control y seguridad, sobre todo a los niños.',
    materiales: ['Una cartulina u hoja grande', 'Marcadores', 'Opcional: dibujos o recortes'],
    pasos: [
      'Dibujen juntos los momentos del día: despertar, comer, jugar/estudiar, asearse, dormir.',
      'Pónganlo en un lugar visible de la casa.',
      'Cumplan los horarios principales de comer y dormir aunque todo lo demás esté difícil.',
      'Dejen un espacio para «jugar» y otro para «hablar de cómo estamos».',
      'Ajusten la rutina con calma según lo que la familia necesite.',
    ],
    fuente: 'Rutinas y estabilidad · OPS / UNICEF',
  },
  {
    id: 'plan-familiar',
    grupo: 'Para la familia',
    icon: 'Sprout',
    titulo: 'Nuestro plan ante sismos',
    intro: 'Tener un plan simple reduce el miedo: la mente se calma cuando sabe qué hacer si vuelve a temblar.',
    materiales: ['Papel y lápiz'],
    pasos: [
      'Identifiquen los lugares más seguros de la casa (junto a muros firmes, lejos de ventanas).',
      'Acuerden un punto de encuentro fuera de casa por si se separan.',
      'Preparen una mochila con agua, linterna, copias de documentos, medicinas y algo de abrigo.',
      'Practiquen el plan con calma una vez, como un juego, sin asustar a los niños.',
      'Repítanlo de vez en cuando para que todos lo recuerden.',
    ],
    fuente: 'Preparación familiar · Protección Civil / IFRC',
  },
]
