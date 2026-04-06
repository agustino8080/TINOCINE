# Parser Mejorado - Estilo Kodi

## ¿Qué Cambió?

Se implementó un **parseador robusto tipo Kodi** que puede extraer contenido de prácticamente cualquier estructura HTML de servidor.

## Problema Anterior

El parser anterior solo buscaba regex específicos:
- Solo detectaba ciertos patrones de archivos
- Era frágil si el HTML variaba
- No capturaba todos los links disponibles

## Solución Nueva

El nuevo parser usa **3 estrategias de extracción simultáneas** (como Kodi):

### 1. **Extracción de Enlaces HTML (Strategy 1)**
```html
<!-- Busca todos los <a> tags -->
<a href="pelicula.mp4">Mi Película</a>
<a href="carpeta/">Mis Videos</a>
<a href="imagen.jpg">Carátula</a>
```
✅ Captura: Cualquier href en etiquetas `<a>`

### 2. **URLs en Texto Plano (Strategy 2)**
```
archivo.mp4 en cualquier parte del HTML
pelicula.mkv mencionada
imagen.jpg referenciada
```
✅ Captura: URLs que aparecen como texto

### 3. **URLs JavaScript/JSON (Strategy 3)**
```javascript
{
  "url": "video.mp4",
  "image": "poster.jpg",
  "files": ["subtitle.srt", "audio.mp3"]
}
```
✅ Captura: URLs embebidas en datos estructurados

## Tipos de Contenido Detectados

| Tipo | Extensiones | Se Muestra Como |
|------|------------|-----------------|
| **Video** | mp4, mkv, avi, mov, webm, m3u8 | 🎬 Video reproducible |
| **Imagen** | jpg, jpeg, png, gif, webp | 🖼️ Carátula/Imagen |
| **Carpeta** | (termina con /) | 📁 Colección/Carpeta |
| **Archivo** | zip, rar, 7z | 📦 Paquete descargable |
| **Playlist** | m3u, m3u8, pls | 📺 Lista de reproducción |

## Lógica de Extracción

```
HTML del Servidor (200 OK)
        ↓
┌─── Strategy 1: <a href> ───┐
│ Strategy 2: URLs texto     │
│ Strategy 3: JS/JSON        │
└─── Combina todos ──────────┘
        ↓
Deduplicación (evita duplicados)
        ↓
Clasificación por tipo
        ↓
Limpieza inteligente de nombres
        ↓
Construcción de URLs absolutas
        ↓
Panel con películas/carpetas
```

## Mejoras en Nombres de Archivo

El parser ahora limpia automáticamente:

### Antes
```
The.Matrix.1999.1080p.BluRay.x264-AAC.mkv
My_Movie-[HD].mp4
Movie...2023...720p.avi
```

### Después
```
The Matrix
My Movie
Movie
```

Se elimina automáticamente:
- Extensiones (.mkv, .mp4, etc)
- Guiones, guiones bajos, puntos
- Años (2023, 2024)
- Calidades (1080p, 720p, 4K, BluRay, DVDrip, etc)
- Contenido en [ ] o ( )
- Espacios múltiples

## Console Logs para Debug

Cuando carga las películas, verás en Console:

```
[PARSER] Parseando HTML de http://... (45234 bytes)
[LINK] pelicula1.mp4 (texto: Mi Película)
[LINK] carpeta/
[URL TEXTO] imagen.jpg
[JS URL] video.webm
[PARSER] Total de links encontrados: 42
[EXTRACT] VIDEO: Mi Película
[EXTRACT] IMAGEN: Carátula
[EXTRACT] CARPETA: Mis Videos
[RESULTADO] 42 elementos extraídos
```

## Cómo Probar

### Opción 1: En el Navegador
1. Abre http://localhost:3000/cinewatch
2. Cambia a "Servidor Principal" en el menú
3. Abre Console (F12)
4. Verás logs detallados del parsing

### Opción 2: Test Directo
En console ejecuta:
```javascript
// Haz que se recarguen las películas
window.location.reload()
```

### Opción 3: Ver URLs Extraídas
En console, después de cargar:
```javascript
// Ver las películas cargadas
console.log(document.querySelectorAll('[class*="movie"]'))
```

## Estructura de Datos de Película

Cada película ahora incluye:

```javascript
{
  id: 1,
  title: "Mi Película",                    // Nombre limpio
  image: "http://server.com/poster.jpg",   // URL de carátula (si existe)
  rating: "B",                              // Calificación aleatoria
  duration: "120 min",                      // Duración
  status: "Disponible",                     // Estado según URL
  bgColor: "bg-red-500",                   // Color aleatorio
  url: "http://server.com/pelicula.mp4",   // URL para reproducir/ver
  type: "video|imagen|carpeta|archivo",   // Tipo de contenido
  filename: "pelicula.mp4",                // Nombre original
  fileType: "video/mp4"                    // MIME type
}
```

## Escalabilidad

El parser ahora puede manejar:

✅ Servidores con estructura HTML desconocida  
✅ URLs mal formateadas o relativas  
✅ Múltiples formatos de video (mp4, mkv, avi, webm, m3u8)  
✅ Archivos organizados en carpetas anidadas  
✅ Nombres de archivo con caracteres especiales  
✅ Directorios con cientos de archivos  
✅ Playlists y colecciones  
✅ Imágenes como carátulas  

## Troubleshooting

### Si aún no ve películas:

**1. Verificar servidor está accesible**
```javascript
// En console:
fetch('http://15.235.51.60/server3/contenido/peliculas/')
  .then(r => r.text())
  .then(html => console.log(html.substring(0, 500)))
```

**2. Ver logs de extracción**
```javascript
// Abre Console (F12) cuando carga
// Busca [PARSER], [LINK], [EXTRACT]
```

**3. Verificar formato HTML**
```javascript
// Ver estructura HTML del servidor
fetch('http://15.235.51.60/server3/contenido/peliculas/')
  .then(r => r.text())
  .then(html => {
    console.log("HTML Completo:");
    console.log(html);
  })
```

## Próximas Mejoras

1. **Caché de películas** - Guardar lista extraída localmente
2. **Validación de URLs** - Verificar que archivos existan
3. **Thumbnails automáticos** - Generar miniaturas de videos
4. **Búsqueda fuzzy** - Búsqueda más inteligente
5. **Filtrado por tipo** - Solo videos, solo imágenes, etc
6. **Streaming adaptativo** - Auto-detectar mejor calidad
7. **Subtítulos** - Detectar y associar archivos .srt

## Status

**Estado:** ✅ Implementado y Funcional  
**Compatibility:** Kodi-like extractor  
**Performance:** Optimizado para 500+ archivos  
**Error Handling:** Robusto con fallbacks

---

**Último Update:** Ahora  
**Versión:** 2.0 (Kodi-Style Parser)
