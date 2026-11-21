# K & S — Nuestra historia

Sitio de aniversario, escrito por capítulos. Un capítulo por mes.

## Estructura

```
index.html          → pantalla de la clave + selector de capítulos
mes-1.html          → Capítulo I   · Nuestro primer mes (21 jun — 21 jul)
mes-2.html          → Capítulo II  · Dos meses contigo (21 jul — 21 ago)
mes-3.html          → Capítulo III · Nuestro propio universo (21 ago — 21 sep)
mes-4.html          → Capítulo IV  · A la orilla de ti (21 sep — 21 oct)
mes-5.html          → Capítulo V   · Nuestro otoño (21 oct — 21 nov)
subir.html          → panel para subir fotos desde el móvil (no enlazado, noindex)
media/              → fotos y videos del Capítulo I  (f01…f56.jpg, v1…v5.mp4)
media/m2/           → fotos del Capítulo II (p01…p42.jpg, q01…q20.jpg)
media/m3/           → fotos del Capítulo III (p01…p93.jpg)
media/m4/           → fotos del Capítulo IV + manifest.json (los escribe subir.html)
media/m5/           → fotos del Capítulo V + manifest.json (los escribe subir.html)
fotos-originales/   → los originales del móvil, sin publicar (respaldo)
```

## Capítulo III — Nuestro propio universo

Una experiencia nocturna y celestial, distinta del cine del primer mes y del
romance vintage del segundo. Azul medianoche, violeta, blanco lunar y dorado;
tipografías Fraunces, Cormorant Garamond y Dancing Script.

| Sección | Qué es |
|---|---|
| Entrada | Una estrella que se toca para abrir el universo y arrancar la música |
| Hero | «Nuestro propio universo» con las iniciales **K & S** dibujadas como constelación |
| Tres astros | Un sol, una luna violeta y un planeta azul, uno por capítulo; al tocarlos aparece una frase |
| Mapa estelar | Las 93 fotos del mes, cada una una estrella con halo, conectadas por líneas de constelación; se abren rodeadas de luz |
| Estrella fugaz | Cruzan estrellas fugaces; al atrapar una se desbloquea la carta secreta |
| La luna | Momento íntimo: al tocar la luna se revela un texto lento |
| La carta | Cápsula del universo con la carta de los tres meses, Español / English y opción de guardarla |
| Final | Las estrellas forman **S & K** y «El universo continúa expandiéndose…» |

- Música: **[nuestra canción](https://youtu.be/OFcKm-5jSQE)** desde YouTube, con el
  planeta y las lunas girando mientras suena. Se cambia en `CONFIG.VIDEO_ID`.
- Las 93 fotos van ordenadas por su fecha real (23 ago — 14 sep), sin duplicados
  (verificado con huella perceptual), reducidas a 1400 px: 14.8 MB frente a los
  ~220 MB originales.
- La foto más grande del mapa (la primera) se marca en `CONFIG.destacadas`.

La clave de acceso es **`iloveyou`**. No distingue mayúsculas, acentos ni espacios.
Se guarda en el navegador, así que solo hay que escribirla la primera vez.
Para cambiarla: edita la constante `PASSPHRASE` en `index.html`.

## Capítulo IV — A la orilla de ti

Un atardecer en la orilla del mar que ocupa toda la página. No es una imagen:
se dibuja en tiempo real con un shader WebGL (cielo, nubes, sol, mar con olas,
el reflejo del sol en el agua, espuma y arena) y **el sol baja a medida que se
hace scroll**. Al final de la página ya es de noche, con estrellas y la luna
reflejada en el mar.

| Sección | Qué es |
|---|---|
| Entrada | «A la orilla de ti». El botón está sobre el agua y al tocarlo arranca todo |
| Hero | «Cuatro meses», con las letras apareciendo una a una, y un contador en vivo de días, horas, minutos y segundos juntos desde el 21 de junio |
| Cuatro olas | Una tarjeta por capítulo, con su frase y el enlace a ese capítulo; al tocarlas se mueve el mar |
| Hora dorada | Carrusel 3D con las fotos tomadas **de verdad** entre las 16:30 y las 20:00, según la hora de cada foto |
| La marea | Los **cuatro meses** en orden: cada capítulo con sus fotos agrupadas por día y con la hora exacta de cada una; arriba, un reloj indica el día y la hora de la foto que está pasando |
| Escribe en la arena | Se dibuja con el dedo sobre arena mojada; una ola sube y lo borra |
| La botella | Al tocarla salta el corcho y sale la carta (ES/EN, PDF y .txt) |
| Final | Ya de noche: «El sol se esconde, pero nosotros nos quedamos.» |

Interacciones: **tocar el mar crea ondas** en el agua, el sol sigue un poco el
puntero, las fotos se inclinan con el ratón, y el visor se maneja deslizando con
el dedo (izquierda/derecha para cambiar de foto, hacia abajo para cerrar).

- La resolución del shader se ajusta sola si el móvil va lento. Si el navegador
  no tiene WebGL, se muestra un atardecer en CSS.
- **Fechas y horas exactas:** `media/recuerdos.json` guarda las fotos de los capítulos
  I–III con su fecha y hora reales (EXIF, hora local del móvil). Se obtuvieron
  emparejando cada foto publicada con su original de `fotos-originales/` por huella
  perceptual: 133 de 135 fotos de los capítulos II y III tienen día y hora. Las 56 del
  Capítulo I llegaron al repositorio sin metadatos, así que van en su orden original
  y sin hora. Las polaroids `q` del Capítulo II son copias del I y no se repiten.
- **Música:** [nuestra canción](https://youtu.be/oGQHECaU8qM) desde YouTube; el sol
  de la esquina la pone y la quita y gira mientras suena. Arranca al pulsar
  «Ver el atardecer». Se cambia en `CONFIG.VIDEO_ID` de `mes-4.html`.
- **La carta** vive en `LETTER` (ES/EN). Al abrir la botella se desenrolla como un
  pergamino, el sol se detiene en el horizonte mientras se lee y los párrafos
  aparecen al ritmo de la lectura. `*así*` resalta una frase.

## Subir fotos desde el móvil — `subir.html`

Abre `tu-web/subir.html` en el móvil. Ahí eliges las fotos y se publican en el
capítulo con un toque. Todo se hace en el propio teléfono:

1. Lee la **fecha real** de cada foto (EXIF; si no tiene, la saca del nombre
   del archivo, como en las de WhatsApp) y las ordena solas.
2. Convierte las **HEIC** a JPEG, reduce el lado largo a 1400 px y **quita el
   EXIF y la ubicación GPS**.
3. Detecta las **repetidas** con una huella perceptual, tanto entre las nuevas
   como contra las ya publicadas.
4. Publica todo en **un único commit** en GitHub (fotos + `manifest.json`).
   Vercel redespliega y en ~1 minuto ya están en el capítulo.

También sirve para poner un texto debajo de cada foto, corregir su fecha o
borrar fotos ya publicadas.

**Configuración (una sola vez por móvil):** crea un *fine-grained token* en
GitHub → Settings → Developer settings → Personal access tokens, con acceso
**solo a este repositorio** y el permiso **Contents: Read and write**. Pégalo
en la pantalla de configuración. El token se guarda solo en ese navegador; se
puede quitar con «Olvidar en este móvil».

Por defecto publica en la rama `main`, que es la que despliega Vercel. Para un
capítulo nuevo, añade una línea a `CHAPTERS` dentro de `subir.html`.


## Capítulo V — Nuestro otoño

El otoño avanza con el scroll: arriba es un octubre dorado, con rayos de luz y un
árbol lleno de hojas verdes y amarillas; al bajar, las hojas se vuelven naranjas,
rojas y marrones, el árbol se va quedando desnudo, cae la niebla de noviembre y
el cielo se enfría. Todo se dibuja en tiempo real en un canvas.

| Sección | Qué es |
|---|---|
| Portada | **YOU & ME**: letras gigantes rellenas con nuestras fotos en blanco y negro, «&» en rojo, «My Anniversary with You · 2026.11.21»; las hojas caen por delante. Al entrar, el árbol se sacude. Exportada en `media/m5/portada.jpg` (1080×1920), descargable desde el final |
| Hero | «Cinco meses»: cada letra cae como una hoja; contador en vivo desde el 21 de junio |
| Cinco hojas | Una hoja prensada por capítulo; al tocarla se da la vuelta con su frase y el enlace |
| Hojas doradas | Un juego: de vez en cuando cae una hoja dorada; al atraparla aparece una nota (hay 7) |
| El mes, hoja a hoja | Las fotos caen como hojas y se amontonan por día, cada una con su hora; arriba, la fecha de la que pasa |
| El libro | Un libro con hojas prensadas: se abre y dentro está la carta (ES/EN, PDF y .txt) |
| Final | Árbol desnudo, niebla: «En otoño todo cae. Menos lo que siento por ti.» |

Interacciones: las hojas caen con física (gravedad, aleteo, viento); **el dedo o el
ratón son viento** y las empujan; **tocar el suelo las levanta**; al volver hacia
arriba, el árbol rebrota.

- **Carta:** «Al chico del primer mensaje», en `LETTER` de `mes-5.html` (ES/EN). **Música:** «we fell in love in october» de girl in red (`CONFIG.VIDEO_ID`).
- **Fotos de la portada:** cada letra lleva su foto en el atributo `style` (`--img`, y `--pos`/`--size` para encuadrarla).
- Las 53 fotos del 21 oct al 1 nov estaban en `media/m4/` y se movieron a `media/m5/`.

## Vídeos

`subir.html` también acepta **vídeos** (MOV del iPhone, MP4 de Android…) y los
prepara en el propio móvil, sin servidor, con [Mediabunny](https://mediabunny.dev)
1.65.2 sobre WebCodecs:

- Se convierten a **MP4 H.264 + AAC**, que se reproduce en cualquier navegador
  (el iPhone graba en HEVC, que muchos no saben mostrar), a **720p** como máximo,
  30 fps y ~2,2 Mbps (menos si el vídeo es más pequeño). Un minuto ocupa ~17 MB.
- Se quedan con el **primer minuto** como máximo.
- Se les quitan **todos los metadatos**: ni ubicación GPS ni modelo del móvil.
- La **fecha** sale de los metadatos del iPhone (hora local), del nombre del
  archivo o de la cabecera del MP4, y cada vídeo va solo al capítulo que le toca.
- Se genera un **póster** (un fotograma) que sirve de miniatura y para detectar
  repetidos.
- En Safari, que no trae codificador AAC, se usa uno en WebAssembly
  (`@mediabunny/aac-encoder`), que solo se descarga si hace falta. Hace falta
  Chrome o Safari 16.4+; si el navegador no puede, se avisa y no se sube nada.

En los capítulos IV y V los vídeos aparecen en la galería con su duración y se
reproducen solos, en silencio, al pasar por delante (salvo con ahorro de datos o
movimiento reducido). Al abrirlos suenan, y la canción de la página se pausa
mientras tanto. En el manifiesto llevan `type: "video"`, `poster` y `duration`.

## subir.html reparte las fotos solo

Cada foto va al capítulo que le toca **por su fecha** (del día 21 al 21 siguiente),
aunque esté abierto otro capítulo: en una misma tanda pueden ir unas al IV y otras
al V, en un solo commit. Cada foto muestra su destino («→ Cap. V») antes de publicar.
Las repetidas se detectan contra todos los capítulos. Para el VI, añade una línea a
`CHAPTERS` en `subir.html` con su rango de fechas.

---

## Las fotos del Capítulo II

Hay **62 fotos publicadas** en `media/m2/`, repartidas en dos galerías que **no
comparten ninguna foto**:

| Galería | Archivos | Qué es |
|---|---|---|
| Tira de película · *Nuestro negativo* | `p01`–`p42` | Las 42 de **este mes**, del 25 de julio al 21 de agosto |
| Polaroids · *Las que sigo mirando* | `q01`–`q20` | 20 del **primer mes**, como recuerdo |

Cada lista vive en `CONFIG.film.photos` y `CONFIG.polaroid.photos` dentro de
`mes-2.html`.

### El orden es el real

Las 42 de este mes están ordenadas por la **fecha EXIF** de cada archivo, no por
el nombre. De las 42, 40 tenían fecha fiable; las dos que no (`ULZS5890` y
`USJA0045`, que perdieron los metadatos) van al final.

Los pies de foto llevan la fecha **solo cuando cambia el día**, como un diario,
para que no se repita «2 de agosto» siete veces seguidas. Los demás están vacíos
esperando lo que quieras escribir.

### Se comprobó que no hay repetidas

Antes de publicarlas se calculó una huella perceptual (*dHash* de 64 bits) de
las 62 y se compararon todas contra todas. La distancia mínima fue 16 sobre 64,
muy por encima del umbral de una foto duplicada. Ninguna se repite, ni dentro de
una galería ni entre las dos.

### Tamaño

Todas están a 1400 px de lado largo y calidad 80: **11 MB en total**, frente a
los 123 MB de los originales. Se cargan de forma perezosa, así que al abrir la
página solo bajan las que se ven.

### Los originales

Están en `fotos-originales/` como respaldo. Esa carpeta **no se publica** (está
en `.vercelignore`): son 123 MB y buena parte son `.heic`, un formato que los
navegadores no saben mostrar. Ahí mismo hay un `LEEME.md` con el detalle.

### Para añadir más fotos

Súbelas a `media/m2/` continuando la numeración (`p43.jpg`, o `q21.jpg` si es del
primer mes) y añádelas a la lista que corresponda. Si dejas una lista vacía, la
página busca sola siguiendo el prefijo (`p` para la tira, `q` para las polaroids).

> Consejo: 1400 px de lado largo y calidad 80 es más que suficiente. El
> Capítulo I aún tiene sus 56 fotos sin comprimir, casi 10 MB, y por eso carga
> más lento en el móvil con datos.

### Los textos escritos a mano

En `mes-2.html`, dentro de `CONFIG.captions`, hay un texto por cada foto.
La clave es el número de la foto:

```js
captions: {
  1:  "el día que empezó el segundo mes",
  2:  "",                                  // vacío = sin texto, no pasa nada
  3:  "esa risa tuya",
  ...
}
```

Ese texto aparece debajo de la foto tanto en la tira de película como en la polaroid,
con tipografía manuscrita.

---

## La música

Suena **«Everywhere, Everything» de Noah Kahan**, desde YouTube, igual que el
Capítulo I: hay un reproductor de YouTube escondido en la página y el control
visible es el disco de vinilo de la esquina. Se toca para poner y quitar la
música; gira mientras suena y el brazo baja sobre el disco. La canción se repite
en bucle y entra con un *fade in* para que no arranque de golpe.

Empieza a sonar al pulsar «Comenzar» en la portada del capítulo. Ese clic es
imprescindible: los navegadores no permiten reproducir sonido sin que la persona
toque algo primero.

Para cambiar la canción, edita esta línea de `mes-2.html` con el id del vídeo
(la parte que va después de `v=` en la dirección de YouTube):

```js
const VIDEO_ID = "dJPdkhsr0gU";   // Everywhere, Everything — Noah Kahan
const VOLUMEN  = 72;              // 0 a 100
```

Si YouTube no carga (sin conexión, o un bloqueador de anuncios), el vinilo se
apaga y avisa, y el resto de la página sigue funcionando con normalidad.

---

## Qué hay en el Capítulo II

| Sección | Qué es |
|---|---|
| Apertura | Portada «Capítulo Segundo» — el clic arranca la música (los navegadores no permiten sonido sin un toque) |
| Hero | «II» grande y *Dos meses, y se siente como toda una vida* |
| El tiempo | Reloj de bolsillo antiguo con manecillas de verdad y subesfera de días, + calendario de pared con cada día tachado a mano en tinta y los aniversarios marcados con un círculo de cera |
| Nuestro negativo | Tira de película analógica con perforaciones, se desplaza en horizontal con el scroll |
| Sobre la mesa | Polaroids esparcidas sobre madera, con cinta adhesiva y texto a mano |
| Correspondencia | Sobre antiguo con sello de cera 3D con las iniciales **S & K**. Al tocarlo se rompe en dos, la solapa se abre y sale la carta |
| La carta | Pergamino a pantalla completa, texto centrado, con botón Español / English y opción de guardarla |
| Despedida | *Nuestra historia clásica apenas comienza…* + «Continuará» y botón para guardar la página |

Toda la dirección de arte es *old classic romantic*: crema y blanco crudo, tinta sepia,
burdeos y dorado envejecido; tipografías Cinzel, Playfair Display y Cormorant Garamond,
con Homemade Apple y Dancing Script para lo escrito a mano; grano de película, fibras
de papel y manchas de edad por encima de todo.

## Guardar la carta

Al final de la carta hay dos botones, y los dos cambian de idioma con ella:

- **Guardar en PDF** — abre el diálogo de impresión del navegador, donde se elige
  «Guardar como PDF». En el móvil sale en Compartir → Imprimir. Hay una hoja de
  estilos `@media print` hecha a propósito: quita la página entera y deja solo la
  carta, maquetada para papel, con tinta sepia sobre blanco y márgenes de 20 mm.
  No depende de fondos ni degradados, porque los navegadores no los imprimen si
  la persona no activa «gráficos de fondo».
- **Descargar el texto** — un `.txt` con la carta entera, generado en el momento.
  Funciona siempre, incluso sin conexión.

## Para añadir el Capítulo III

1. Duplica `mes-2.html` como `mes-3.html`.
2. Cambia `CONFIG.dir` a `media/m3/` y el texto de la carta.
3. En `index.html`, la tercera tarjeta ya existe: quítale la clase `card--soon`,
   conviértela en `<a href="mes-3.html">` y ponle su foto.
