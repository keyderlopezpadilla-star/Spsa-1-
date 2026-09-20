# K & S — Nuestra historia

Sitio de aniversario, escrito por capítulos. Un capítulo por mes.

## Estructura

```
index.html          → pantalla de la clave + selector de capítulos
mes-1.html          → Capítulo I   · Nuestro primer mes (21 jun — 21 jul)
mes-2.html          → Capítulo II  · Dos meses contigo (21 jul — 21 ago)
mes-3.html          → Capítulo III · Nuestro propio universo (21 ago — 21 sep)
media/              → fotos y videos del Capítulo I  (f01…f56.jpg, v1…v5.mp4)
media/m2/           → fotos del Capítulo II (p01…p42.jpg, q01…q20.jpg)
media/m3/           → fotos del Capítulo III (p01…p93.jpg)
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
