# K & S — Nuestra historia

Sitio de aniversario, escrito por capítulos. Un capítulo por mes.

## Estructura

```
index.html      → pantalla de la clave + selector de capítulos
mes-1.html      → Capítulo I  · Nuestro primer mes (21 jun — 21 jul)
mes-2.html      → Capítulo II · Dos meses contigo (21 jul — 21 ago)
media/          → fotos y videos del Capítulo I  (f01…f56.jpg, v1…v5.mp4)
media/m2/       → fotos y música del Capítulo II (p01…pNN.jpg, audio)
```

La clave de acceso es **`iloveyou`**. No distingue mayúsculas, acentos ni espacios.
Se guarda en el navegador, así que solo hay que escribirla la primera vez.
Para cambiarla: edita la constante `PASSPHRASE` en `index.html`.

---

## Cómo añadir las fotos del Capítulo II

Van todas en `media/m2/`, numeradas **desde `p01`** y sin saltos:

```
media/m2/p01.jpg
media/m2/p02.jpg
media/m2/p03.jpg
...
```

Se aceptan `.jpg`, `.jpeg`, `.png` y `.webp`, pero **todas con la misma extensión**.
La página las detecta sola: no hay que tocar el código.

> Consejo: antes de subirlas, bájalas a un ancho máximo de ~1600 px y calidad 80.
> Las 56 fotos del Capítulo I pesan casi 10 MB y eso hace que la página cargue lenta
> en el móvil con datos.

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

## Cómo añadir la música

El archivo va en `media/m2/` con uno de estos nombres (el que sea, el primero que
exista es el que suena):

```
media/m2/everything-everywhere.mp3
media/m2/everything_everywhere.mp3
media/m2/song.mp3
media/m2/everything-everywhere.m4a
media/m2/song.m4a
media/m2/everything-everywhere.ogg
```

Si no hay ningún archivo, el tocadiscos aparece apagado con el texto «sin disco aún»
y el resto de la página funciona igual.

El control es el disco de vinilo de la esquina: se toca para poner y quitar la música.
Gira mientras suena y el brazo baja sobre el disco.

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
| La carta | Pergamino a pantalla completa, texto centrado, con botón Español / English |
| Despedida | *Nuestra historia clásica apenas comienza…* + «Continuará» y botón para guardar la página |

Toda la dirección de arte es *old classic romantic*: crema y blanco crudo, tinta sepia,
burdeos y dorado envejecido; tipografías Cinzel, Playfair Display y Cormorant Garamond,
con Homemade Apple y Dancing Script para lo escrito a mano; grano de película, fibras
de papel y manchas de edad por encima de todo.

## Para añadir el Capítulo III

1. Duplica `mes-2.html` como `mes-3.html`.
2. Cambia `CONFIG.dir` a `media/m3/` y el texto de la carta.
3. En `index.html`, la tercera tarjeta ya existe: quítale la clase `card--soon`,
   conviértela en `<a href="mes-3.html">` y ponle su foto.
