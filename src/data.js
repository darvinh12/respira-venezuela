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
    icon: '🫂',
    titulo: 'Necesito apoyo para mí',
    desc: 'Estoy asustado/a, ansioso/a o no sé cómo seguir.',
  },
  {
    id: 'padres',
    icon: '👨‍👩‍👧',
    titulo: 'Soy madre, padre o cuido niños',
    desc: 'Quiero ayudar a un niño o niña a sentirse seguro/a.',
  },
  {
    id: 'familiar',
    icon: '🧓',
    titulo: 'Cuido a un familiar o adulto mayor',
    desc: 'Acompaño a alguien que la está pasando mal.',
  },
  {
    id: 'rescatista',
    icon: '🚒',
    titulo: 'Soy rescatista o voluntario/a',
    desc: 'Ayudo a otros y necesito cuidarme también.',
  },
]

// ---------------------------------------------------------------------------
// SITUACIONES — tarjetas concretas por persona. Cada una apunta a una guía.
// ---------------------------------------------------------------------------
export const situaciones = {
  mi: [
    { id: 'panico', icon: '😮‍💨', titulo: 'Estoy en pánico, no puedo respirar', urgente: true },
    { id: 'replicas', icon: '🌍', titulo: 'Tiemblo cada vez que hay una réplica' },
    { id: 'insomnio', icon: '🌙', titulo: 'No puedo dormir por miedo a que tiemble' },
    { id: 'perdida-casa', icon: '🏚️', titulo: 'Perdí mi casa, lo perdí todo' },
    { id: 'duelo', icon: '🕊️', titulo: 'Perdí a un ser querido' },
    { id: 'ansiedad', icon: '😰', titulo: 'Siento ansiedad y angustia todo el tiempo' },
    { id: 'normales', icon: '💚', titulo: '¿Es normal sentirme así?' },
  ],
  padres: [
    { id: 'nino-llora', icon: '😢', titulo: 'Mi hijo/a no para de llorar o está muy asustado/a' },
    { id: 'explicar', icon: '🗣️', titulo: '¿Cómo le explico lo que pasó?' },
    { id: 'contar-muerte', icon: '🕊️', titulo: 'Perdimos a un familiar, ¿cómo se lo digo?' },
    { id: 'nino-dormir', icon: '🌙', titulo: 'No quiere dormir solo/a o tiene pesadillas' },
    { id: 'regresion', icon: '🧸', titulo: 'Volvió a actuar como más pequeño/a (pipí, no se despega)' },
    { id: 'cuidarte', icon: '💛', titulo: 'Yo también estoy agotado/a (cuídate tú)' },
  ],
  familiar: [
    { id: 'escuchar', icon: '👂', titulo: 'Cómo acompañar y escuchar sin presionar' },
    { id: 'bloqueado', icon: '😶', titulo: 'Está bloqueado/a, no habla ni reacciona' },
    { id: 'mayor', icon: '🧓', titulo: 'Cómo ayudar a un adulto mayor' },
    { id: 'cuando-derivar', icon: '🆘', titulo: '¿Cuándo necesita ayuda profesional ya?' },
  ],
  rescatista: [
    { id: 'pfa', icon: '🤝', titulo: 'Primeros Auxilios Psicológicos: Mirar·Escuchar·Conectar' },
    { id: 'que-no-decir', icon: '🚫', titulo: 'Qué decir y qué NO decir a una víctima' },
    { id: 'no-quemarte', icon: '🔥', titulo: 'No te quemes: cuidar al que cuida' },
  ],
}

// ---------------------------------------------------------------------------
// GUÍAS — contenido concreto. pasos = qué hacer; evitar = qué no hacer.
// ---------------------------------------------------------------------------
export const guias = {
  // ---- PARA MÍ ----
  panico: {
    titulo: 'Estoy en pánico, no puedo respirar',
    intro: 'Un ataque de pánico da mucho miedo pero NO es peligroso y pasa. Tu cuerpo está en alarma; vamos a bajarlo paso a paso.',
    accionRapida: { label: 'Abrir respiración guiada', tool: 'respiracion' },
    pasos: [
      'Recuerda: esto es pánico, no te vas a morir ni te estás volviendo loco/a. Va a pasar en minutos.',
      'Respira despacio: inhala 4 segundos, sostén 4, exhala 6. La exhalación larga apaga la alarma.',
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
      'Limita ver videos del terremoto una y otra vez: reactiva la alarma.',
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
      'Come, hidrátate y duerme lo que puedas: tu cuerpo también está en alarma.',
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
      'Detecta señales de alarma en ti: irritabilidad, insomnio, embotamiento, llanto, no querer seguir.',
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
      { nombre: 'LAPSI – Federación de Psicólogos de Venezuela', detalle: 'Primeros auxilios psicológicos, gratis y confidencial (viernes a domingo, 8am–8pm)', tels: ['0212-4163116', '0424-2907338'] },
      { nombre: 'UCAB – PsicoLínea', detalle: 'Línea de salud mental de la Universidad Católica Andrés Bello', tels: ['0414-1217882'] },
      { nombre: 'Psicólogos sin Fronteras Venezuela', detalle: 'Apoyo psicosocial en crisis y procesos de duelo', tels: ['0424-9270304'] },
    ],
  },
  {
    grupo: 'Emergencias',
    items: [
      { nombre: 'Emergencias (número único nacional)', detalle: 'Marca 171 (CANTV) · *1 (Movilnet) · 112 (Digitel) · 911 (Movistar)', tels: ['171'], urgente: true },
      { nombre: 'Protección Civil Nacional', detalle: 'Atención y coordinación ante desastres', tels: ['0800-5588427', '0212-6311522'] },
      { nombre: 'Cruz Roja Venezolana', detalle: 'Ambulancias y apoyo en emergencias', tels: ['0212-5712411', '0212-5714574'] },
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
export const videos = [
  { titulo: 'Primeros Auxilios Psicológicos (OPS/OMS)', fuente: 'OPS/OMS', url: 'https://www.youtube.com/results?search_query=primeros+auxilios+psicol%C3%B3gicos+OPS+OMS' },
  { titulo: 'Respiración para calmar la ansiedad', fuente: 'Salud mental', url: 'https://www.youtube.com/results?search_query=respiraci%C3%B3n+guiada+para+la+ansiedad' },
  { titulo: 'Cómo ayudar a los niños tras un desastre', fuente: 'UNICEF / Cruz Roja', url: 'https://www.youtube.com/results?search_query=como+ayudar+a+los+ni%C3%B1os+despu%C3%A9s+de+un+terremoto' },
  { titulo: 'Manejo del duelo tras una pérdida', fuente: 'Cruz Roja', url: 'https://www.youtube.com/results?search_query=manejo+del+duelo+cruz+roja' },
]
