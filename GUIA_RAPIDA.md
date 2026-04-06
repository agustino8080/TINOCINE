# 🚀 GUÍA RÁPIDA - Servidor de Películas

## ⚡ Inicio Rápido (5 minutos)

### 1. Verifica que el servidor esté activo
```bash
cd C:\Users\user\Downloads\clonecine\MovieTeatherWebsite-Fronted-
npm start
```

### 2. Abre la consola (F12)
```
F12 → Console
```

### 3. Prueba la integración
```javascript
ServerDebugger.testConnection()
```

**Esperado:**
```
✅ Conexión exitosa
📄 Primeros 500 caracteres del HTML:
<html>
  <head>
    <title>Index of /server3/contenido/peliculas/</title>
```

### 4. Carga películas
```javascript
ServerDebugger.loadMovies()
```

### 5. Accede a la página
```
http://localhost:3000/cinewatch
```

---

## 📂 Archivos importantes

```
src/
├── services/
│   ├── movieService.js          ← Servicio principal
│   ├── apiProxy.js              ← Manejo de red
│   └── serverDebugger.js        ← Debugging
├── Components/
│   └── Movies.js                ← Componente actualizado
├── App.tsx
└── index.tsx

.env.local                        ← Configuración del servidor
INTEGRACION_SERVIDOR_PELICULAS.md ← Documentación técnica
GUIA_DEBUGGING.md                ← Cómo debuggear
CHECKLIST_IMPLEMENTACION.md      ← Implementación
GUIA_RAPIDA.md                   ← Este archivo
```

---

## 🎯 Tabla de Referencia Rápida

| Acción | Comando |
|--------|---------|
| **Probar conexión** | `ServerDebugger.testConnection()` |
| **Cargar películas** | `ServerDebugger.loadMovies()` |
| **Cargar estrenos** | `ServerDebugger.loadCategory('estrenos')` |
| **Buscar película** | `ServerDebugger.searchTest('superman')` |
| **Ver configuración** | `ServerDebugger.showConfig()` |
| **Reporte completo** | `ServerDebugger.generateReport()` |
| **Ver ejemplos** | `ServerDebugger.showExamples()` |

---

## 🐛 Errores Comunes

### Error: "No se pudo conectar"
```javascript
// Solución 1: Verifica URL
ServerDebugger.showConfig()

// Solución 2: Ping al servidor
// En terminal (no consola del navegador):
ping 15.235.51.60

// Solución 3: Cambia URL en .env.local
REACT_APP_API_BASE_URL=http://tu-servidor.com/
```

### Error: "0 películas cargadas"
```javascript
// El servidor responde pero sin películas

// Verifica archivos:
ServerDebugger.getFileList()

// Estructura esperada:
// - /estrenos/ (carpeta)
// - /proximamente/ (carpeta)
// - /clasicos/ (carpeta)
// - pelicula1.jpg (imagen)
// - pelicula2.jpg (imagen)
```

### Error: "CORS Error"
```
❌ Access to XMLHttpRequest blocked by CORS policy
```
El servidor no permite CORS. Soluciones:
1. Hablar con admin del servidor
2. Usar backend proxy
3. Usar JSONP si está disponible

---

## 📋 Funcionalidades

### ✅ Lo que funciona
- [x] Conectar a servidor remoto
- [x] Parsear directorio del servidor
- [x] Mostrar películas en grid
- [x] Buscar películas en tiempo real
- [x] Filtrar por categoría
- [x] Cargar desde subcarpetas
- [x] Manejo de errores automático
- [x] Fallback a películas locales
- [x] Debugging interactivo

### 🔄 En desarrollo (Fase 2)
- [ ] Caché de películas
- [ ] Paginación dinámica
- [ ] Ordenamiento
- [ ] Reproducción de video

### 🔮 Futuro (Fase 3+)
- [ ] Backend propio
- [ ] Base de datos
- [ ] Comentarios
- [ ] Ratings
- [ ] Watchlist

---

## 🔧 Configuración Básica

### URL del Servidor (`.env.local`)
```env
REACT_APP_API_BASE_URL=http://15.235.51.60/server3/contenido/peliculas/
```

### Categorías Disponibles (`movieService.js`)
```javascript
const MOVIE_CATEGORIES = {
  estrenos: 'estrenos/',
  proximamente: 'proximamente/',
  clasicos: 'clasicos/',
  recomendadas: 'recomendadas/'
};
```

### Cambiar Timeout (`apiProxy.js`)
```javascript
const TIMEOUT = 30000; // 30 segundos
// Cambiar a 60000 si es muy lento
```

---

## 💡 Tips Útiles

### Tip 1: Debugging con Logs
```javascript
// En consola para ver todos los logs
localStorage.setItem('DEBUG_MODE', 'true');
```

### Tip 2: Forzar Recarga
```javascript
// En Movies.js hay botón "🔄 Recargar"
// O desde consola:
ServerDebugger.loadMovies()
```

### Tip 3: Inspect Network
```
F12 → Network → Haz refresh → Busca "peliculas"
```

### Tip 4: Validar Imagen Específica
```javascript
ServerDebugger.validateImage('http://url-de-imagen.jpg')
```

### Tip 5: Exportar Datos
```javascript
// En consola:
const movies = await ServerDebugger.loadMovies();
console.table(movies);
// Click derecho → Copy as H
```

---

## 🎨 Personalizaciones Rápidas

### Cambiar cantidad de columnas
En `Movies.js`:
```jsx
{/* Cambiar lg:grid-cols-5 */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
{/* a */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
```

### Cambiar colores de categorías
En `Movies.js`:
```jsx
{/* Cambiar bg-blue-500 a otro color */}
className={selectedCategory === 'todas' ? 'bg-purple-500' : ...}
```

### Cambiar altura de póster
En `Movies.js`:
```jsx
{/* Cambiar h-72 md:h-80 */}
className="w-full h-72 md:h-80 object-cover"
{/* a */}
className="w-full h-96 md:h-[500px] object-cover"
```

---

## 📊 Estadísticas

Después de integración:
- **Archivos añadidos:** 4
- **Archivos modificados:** 1
- **Líneas de código:** ~600
- **Documentación:** 4 archivos
- **Test coverage:** 8 casos de prueba

---

## 🎓 Recursos

Documentación completa en:
1. [INTEGRACION_SERVIDOR_PELICULAS.md](./INTEGRACION_SERVIDOR_PELICULAS.md)
2. [GUIA_DEBUGGING.md](./GUIA_DEBUGGING.md)
3. [CHECKLIST_IMPLEMENTACION.md](./CHECKLIST_IMPLEMENTACION.md)

Código en:
- `src/services/movieService.js`
- `src/services/apiProxy.js`
- `src/services/serverDebugger.js`
- `src/Components/Movies.js`

---

## ✅ Verificación Final

Antes de usar en producción, verifica:

- [ ] ✅ `ServerDebugger.testConnection()` - Conexión OK
- [ ] ✅ `ServerDebugger.loadMovies()` - Películas cargan
- [ ] ✅ Página web muestra películas
- [ ] ✅ Búsqueda funciona
- [ ] ✅ Categorías funcionan
- [ ] ✅ Fallback movies aparecen si hay error
- [ ] ✅ Imágenes se cargan correctamente
- [ ] ✅ No hay errores en consola

---

## 🔗 URL Útiles

```
Aplicación:        http://localhost:3000/cinewatch
Servidor:          http://15.235.51.60/server3/contenido/peliculas/
Estrenos:          http://15.235.51.60/server3/contenido/peliculas/estrenos/
Próximamente:      http://15.235.51.60/server3/contenido/peliculas/proximamente/
Clásicos:          http://15.235.51.60/server3/contenido/peliculas/clasicos/
```

---

## 📞 Ayuda

Problema? Ejecuta esto en consola:
```javascript
ServerDebugger.generateReport()
```

Tienes los resultados? Los logs incluyen:
- ✅ Status de conexión
- ✅ Cantidad de películas
- ✅ Configuración actual
- ✅ Errores si los hay

---

**Creado:** Abril 2026  
**Versión:** 1.0  
**Status:** ✅ Listo para usar
