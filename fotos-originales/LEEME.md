# Fotos originales del móvil

Aquí están las 42 fotos tal como las subiste. **Esta carpeta no se publica**
(está en `.vercelignore`), sirve solo de respaldo.

## Por qué no se usan directamente

De las 42, **36 son `.heic`**. Y el formato HEIC **no se puede mostrar en la web**:

| Navegador | ¿Muestra HEIC? |
|---|---|
| Chrome (Android y escritorio) | No |
| Firefox | No |
| Edge | No |
| Safari | Solo en versiones recientes |

No es un problema de esta página: si se pusieran tal cual, a ella le saldrían
imágenes rotas en casi cualquier móvil. Hay que convertirlas a JPEG.

## Las que sí están publicadas

Las 6 que eran JPEG de verdad se redujeron a 1600 px y están en `media/m2/`
como `p01.jpg` … `p06.jpg`:

| Publicada | Original | Antes | Después |
|---|---|---|---|
| `p01.jpg` | `20260806_105657.jpg` | 6.4 MB · 3000×4000 | 227 KB · 1200×1600 |
| `p02.jpg` | `20260806_105707.jpg` | 8.2 MB · 3000×4000 | 297 KB · 1200×1600 |
| `p03.jpg` | `ULZS5890.JPG` | 242 KB · 1530×2040 | 204 KB · 1200×1600 |
| `p04.jpg` | `USJA0045.JPG` | 167 KB · 1153×2048 | 129 KB · 901×1600 |
| `p05.jpg` | `WhatsApp … 16.48.14.jpeg` | 433 KB · 2560×1920 | 199 KB · 1600×1200 |
| `p06.jpg` | `WhatsApp … 16.48.15.jpeg` | 658 KB · 2560×1920 | 302 KB · 1600×1200 |

De `p07.jpg` a `p16.jpg` son diez fotos del primer mes, reutilizadas para que
la tira de película y las polaroids no se vieran vacías.

## Cómo convertir las 36 HEIC que faltan

Elige la que te resulte más cómoda. Las dos primeras son las más fáciles.

### 1. Desde el propio móvil (lo más rápido)

**Android / Samsung:** Ajustes de la cámara → *Formato de imagen* o *Opciones
avanzadas* → cambia HEIF por **JPEG**. Luego abre las fotos en Galería,
compártelas por WhatsApp contigo mismo y descárgalas: WhatsApp las convierte a
JPEG automáticamente. (Así llegaron `p05` y `p06`.)

**iPhone:** Ajustes → Cámara → Formatos → **Más compatible**. Para las que ya
tienes, Fotos → Compartir → *Copiar fotos* pegándolas en Archivos, o mándalas
por correo eligiendo tamaño mediano.

### 2. Desde el ordenador, sin instalar nada

Abre [squoosh.app](https://squoosh.app) en Chrome, arrastra las fotos, elige
**JPEG** con calidad 80 y redimensiona el lado largo a 1600 px. Descárgalas.

### 3. Con línea de comandos

```bash
# macOS
brew install libheif
for f in *.heic *.HEIC; do heif-convert "$f" "${f%.*}.jpg"; done

# Linux
sudo apt install libheif-examples imagemagick
for f in *.heic *.HEIC; do heif-convert "$f" "${f%.*}.jpg"; done
mogrify -resize 1600x1600\> -quality 82 *.jpg
```

## Cuando las tengas convertidas

Súbelas a `media/m2/` continuando la numeración a partir de `p17.jpg`, en el
orden en que quieras que aparezcan. Si prefieres que las de este mes vayan
primero y las del primer mes al final, dímelo y renumero todo.

También hay que añadirlas a la lista `CONFIG.photos` de `mes-2.html`, o dejar
esa lista vacía para que la página vuelva a detectarlas sola.
