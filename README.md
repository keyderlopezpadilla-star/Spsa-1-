# K & S — Nuestra historia

Sitio de aniversario, escrito por capítulos. Un capítulo por mes.

## Estructura

```
index.html          → pantalla de la clave + selector de capítulos
mes-1.html          → Capítulo I  · Nuestro primer mes (21 jun — 21 jul)
mes-2.html          → Capítulo II · Dos meses contigo (21 jul — 21 ago)
media/              → fotos y videos del Capítulo I  (f01…f56.jpg, v1…v5.mp4)
media/m2/           → fotos y música del Capítulo II (p01…p16.jpg, audio)
fotos-originales/   → los originales del móvil, sin publicar (respaldo)
```

La clave de acceso es **`iloveyou`**. No distingue mayúsculas, acentos ni espacios.
Se guarda en el navegador, así que solo hay que escribirla la primera vez.
Para cambiarla: edita la constante `PASSPHRASE` en `index.html`.

---

## Las fotos del Capítulo II

Ahora mismo hay **16 fotos publicadas** en `media/m2/` (`p01.jpg` … `p16.jpg`),
listadas en `CONFIG.photos` dentro de `mes-2.html`:

- **`p01`–`p06`** son de este mes, las 6 que se pudieron usar de las 42 que subiste.
- **`p07`–`p16`** son del primer mes, reutilizadas para que la tira de película y
  las polaroids no se vieran vacías.

Todas están reducidas a 1600 px de lado largo y calidad 82: **3.2 MB en total**,
frente a los 62 MB de los originales.

### ⚠️ Faltan 36 fotos, y hay que convertirlas antes

De las 42 que subiste, **36 son `.heic`**, y ese formato **no se puede mostrar en
la web**: ni Chrome, ni Firefox, ni Edge lo soportan. Si se pusieran tal cual, a
ella le saldrían imágenes rotas en casi cualquier móvil.

Están guardadas en `fotos-originales/` (esa carpeta no se publica) y ahí mismo,
en `fotos-originales/LEEME.md`, están las tres formas de convertirlas — la más
fácil es mandártelas por WhatsApp a ti mismo, que las convierte solo.

### Para añadir más fotos

Súbelas a `media/m2/` continuando la numeración (`p17.jpg`, `p18.jpg`, …) y
añádelas a la lista `CONFIG.photos` de `mes-2.html`. Si dejas esa lista vacía,
la página vuelve a detectarlas sola siempre que empiecen en `p01` y no haya
saltos.

> Consejo: 1600 px de lado largo y calidad 80 es suficiente. Las 56 fotos del
> Capítulo I pesan casi 10 MB sin comprimir, y eso hace que esa página cargue
> lenta en el móvil con datos.

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
