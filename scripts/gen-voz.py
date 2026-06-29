# Genera con la voz de Sebastián (Venezuela):
#  1) Audios de las FRASES de los ejercicios -> manifest texto->archivo (la app
#     los reproduce en vez de la voz del sistema).
#  2) Audios de las GUÍAS (una por guía) -> /audio/guia-<id>.mp3, que el botón
#     "Escuchar" reproduce por URL.
# Suena igual de bien en cualquier dispositivo y, una vez cacheado, sin internet.
#
# Requiere: pip install edge-tts
# Correr:   node scripts/gen-textos.mjs   (exporta los textos de las guías)
#           python scripts/gen-voz.py
import asyncio, json, os, re
import edge_tts

VOZ = "es-VE-SebastianNeural"
RATE = "-8%"  # un poco más lento = más calmado
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)

# Limpia el texto para que se lea natural (quita "/a", "/o", guillemets sueltos).
def limpiar(t):
    t = re.sub(r"/[ao]s?\b", "", t)   # cómodo/a -> cómodo, niño/a -> niño
    t = t.replace("«", "").replace("»", "")
    return t

# Frases EXACTAS que dicen los ejercicios (deben coincidir con Herramientas.jsx).
FRASES = [
    "Inhala", "Sostén", "Exhala",
    "Toma aire", "Un poco más", "Suelta el aire",
    "Infla la barriga", "Baja despacito",
    "Toma aire por la nariz", "Sopla la vela despacito",
    "5 cosas que puedes VER", "4 cosas que puedes TOCAR", "3 cosas que puedes OÍR",
    "2 cosas que puedes OLER", "1 cosa que puedes SABOREAR",
    "Manos y antebrazos. Cierra los puños con fuerza. Tensa cinco segundos y suelta diez.",
    "Brazos y hombros. Sube los hombros hacia las orejas. Tensa cinco segundos y suelta diez.",
    "Cara. Aprieta los ojos y la mandíbula. Tensa cinco segundos y suelta diez.",
    "Pecho y abdomen. Toma aire y tensa el abdomen. Tensa cinco segundos y suelta diez.",
    "Piernas y pies. Estira las piernas y apunta los dedos hacia ti. Tensa cinco segundos y suelta diez.",
    ("Si te sientes cómodo/a, cierra los ojos y respira lento tres veces.",
     "Si te sientes cómodo, cierra los ojos y respira lento tres veces."),
    "Imagina un lugar donde te sientas completamente a salvo. Puede ser real o inventado.",
    "¿Qué ves a tu alrededor? Observa los colores, la luz, las formas.",
    "¿Qué sonidos hay? ¿Qué temperatura sientes en la piel?",
    "Lleva una mano al pecho y dite en voz baja: «Aquí estoy a salvo».",
    "Quédate unos segundos más. Este lugar es tuyo: vuelve cuando lo necesites.",
    "Ponte frente a una pared, con un pie detrás del otro para sentirte firme y estable.",
    "Apoya las manos en la pared con los codos un poco flexionados.",
    "Conecta con lo que sientes y empieza a empujar la pared muy despacio, con fuerza.",
    "Hazlo lento a propósito: le dices a tu cuerpo que ya puede soltar esa energía, que la vida ya no depende de esa reacción.",
    "Despega las manos poco a poco y nota cómo se siente tu cuerpo, antes y después.",
    "Termina con un suspiro grande, soltando el aire por la boca con todo el cuerpo.",
    "Busca a alguien de confianza. Una persona empuja con las manos y la otra recibe firme.",
    "Mantengan la mirada mientras empujan, sin apuro.",
    "Empuja despacio, dejando salir la tensión que el cuerpo guardó.",
    "Cuando hayas sacado todo, suelta la fuerza poco a poco.",
    "Quédense un momento juntos, respirando y sosteniendo la mirada.",
]

# Guías para niños (texto fijo de Herramientas.jsx). id -> texto.
GUIAS_FIJAS = {
    "guia-rincon": (
        "Elige un rincón tranquilo: una esquina, una carpa con sábanas o detrás del sofá. "
        "Pon cojines, una manta suave y un peluche o muñeco preferido. "
        "Agrega algo para las manos: una pelota antiestrés, plastilina o el frasco de la calma. "
        "Deja una luz suave o una linterna; nada de pantallas. "
        "Explícale: Este es tu lugar para calmarte, puedes venir cuando lo necesites. "
        "Acompáñalo sin obligar. No es un castigo: es un refugio."
    ),
    "guia-frases": (
        "Dile: Estoy aquí contigo, estás a salvo. Es normal sentir miedo, a mí también me asustó. "
        "Yo te cuido, vamos a estar bien. Si tiembla otra vez, ya sabemos qué hacer juntos. "
        "Mejor evita: No digas no llores ni no pasó nada, valida lo que siente. "
        "No le des detalles ni cifras de víctimas. Evita dejarlo frente a noticias o videos del sismo. "
        "No prometas que nunca va a temblar, di que estás para cuidarlo."
    ),
}

async def gen(texto, archivo):
    com = edge_tts.Communicate(limpiar(texto), VOZ, rate=RATE)
    await com.save(os.path.join(OUT, archivo))

async def main():
    # 1) Frases de ejercicios + manifest
    manifest = {}
    i = 0
    for entrada in FRASES:
        clave, decir = (entrada, entrada) if isinstance(entrada, str) else entrada
        i += 1
        archivo = f"v{i:03d}.mp3"
        await gen(decir, archivo)
        manifest[clave] = "/audio/" + archivo
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0)
    print(f"{len(manifest)} frases de ejercicios + manifest.json")

    # 2) Guías de niños (texto fijo)
    for gid, texto in GUIAS_FIJAS.items():
        await gen(texto, f"{gid}.mp3")
        print("OK", gid)

    # 3) Guías principales (desde scripts/guias-texto.json)
    jpath = os.path.join(os.path.dirname(__file__), "guias-texto.json")
    if os.path.exists(jpath):
        with open(jpath, encoding="utf-8") as f:
            guias = json.load(f)
        for g in guias:
            await gen(g["texto"], f"{g['id']}.mp3")
            print("OK", g["id"])
        print(f"{len(guias)} guías principales")
    else:
        print("AVISO: no existe guias-texto.json (corre antes: node scripts/gen-textos.mjs)")

asyncio.run(main())
