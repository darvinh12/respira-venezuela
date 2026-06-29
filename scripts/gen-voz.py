# Genera los audios de los EJERCICIOS con la voz de Sebastián (Venezuela) y un
# manifiesto texto -> archivo. La app reproduce estos audios en vez de la voz del
# sistema, así suena igual de bien en cualquier dispositivo y sin internet.
#
# Requiere: pip install edge-tts   ·   Correr: python scripts/gen-voz.py
import asyncio, json, os
import edge_tts

VOZ = "es-VE-SebastianNeural"
RATE = "-8%"  # un poco más lento = más calmado
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)

# Frases EXACTAS que dicen los ejercicios (deben coincidir con Herramientas.jsx).
# Cada entrada: texto que la app pide hablar -> (opcional) variante para leer mejor.
FRASES = [
    # Respiración guiada / en caja
    "Inhala", "Sostén", "Exhala",
    # Suspiro inducido
    "Toma aire", "Un poco más", ("Suelta… aaah", "Suelta. Aaah."),
    # Respiración con peluche
    "Infla la barriga", "Baja despacito",
    # Soplar la vela
    "Toma aire por la nariz", "Sopla la vela despacito",
    # Grounding 5-4-3-2-1
    "5 cosas que puedes VER", "4 cosas que puedes TOCAR", "3 cosas que puedes OÍR",
    "2 cosas que puedes OLER", "1 cosa que puedes SABOREAR",
    # Relajación muscular
    "Manos y antebrazos. Cierra los puños con fuerza. Tensa cinco segundos y suelta diez.",
    "Brazos y hombros. Sube los hombros hacia las orejas. Tensa cinco segundos y suelta diez.",
    "Cara. Aprieta los ojos y la mandíbula. Tensa cinco segundos y suelta diez.",
    "Pecho y abdomen. Toma aire y tensa el abdomen. Tensa cinco segundos y suelta diez.",
    "Piernas y pies. Estira las piernas y apunta los dedos hacia ti. Tensa cinco segundos y suelta diez.",
    # Lugar seguro
    ("Si te sientes cómodo/a, cierra los ojos y respira lento tres veces.",
     "Si te sientes cómodo, cierra los ojos y respira lento tres veces."),
    "Imagina un lugar donde te sientas completamente a salvo. Puede ser real o inventado.",
    "¿Qué ves a tu alrededor? Observa los colores, la luz, las formas.",
    "¿Qué sonidos hay? ¿Qué temperatura sientes en la piel?",
    "Lleva una mano al pecho y dite en voz baja: «Aquí estoy a salvo».",
    "Quédate unos segundos más. Este lugar es tuyo: vuelve cuando lo necesites.",
    # Empujar la pared
    "Ponte frente a una pared, con un pie detrás del otro para sentirte firme y estable.",
    "Apoya las manos en la pared con los codos un poco flexionados.",
    "Conecta con lo que sientes y empieza a empujar la pared muy despacio, con fuerza.",
    "Hazlo lento a propósito: le dices a tu cuerpo que ya puede soltar esa energía, que la vida ya no depende de esa reacción.",
    "Despega las manos poco a poco y nota cómo se siente tu cuerpo, antes y después.",
    "Termina con un suspiro grande, soltando el aire por la boca con todo el cuerpo.",
    # Empujar con otra persona
    "Busca a alguien de confianza. Una persona empuja con las manos y la otra recibe firme.",
    "Mantengan la mirada mientras empujan, sin apuro.",
    "Empuja despacio, dejando salir la tensión que el cuerpo guardó.",
    "Cuando hayas sacado todo, suelta la fuerza poco a poco.",
    "Quédense un momento juntos, respirando y sosteniendo la mirada.",
]

async def main():
    manifest = {}
    i = 0
    for entrada in FRASES:
        clave, decir = (entrada, entrada) if isinstance(entrada, str) else entrada
        i += 1
        archivo = f"v{i:03d}.mp3"
        com = edge_tts.Communicate(decir, VOZ, rate=RATE)
        await com.save(os.path.join(OUT, archivo))
        manifest[clave] = "/audio/" + archivo
        print("OK", archivo, "·", clave[:48])
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0)
    print(f"\n{len(manifest)} audios + manifest.json en public/audio/")

asyncio.run(main())
