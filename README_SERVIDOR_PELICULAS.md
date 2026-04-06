# 📽️ CineWatch - Integración de Servidor de Películas

> **Aplicación Web de Películas con Integración de Servidor Remoto**

![Status](https://img.shields.io/badge/Status-Activo-green) ![Version](https://img.shields.io/badge/Version-1.0-blue) ![Last Update](https://img.shields.io/badge/Updated-Abril%202026-blue)

---

## 🎯 ¿Qué se ha integrado?

✅ **Conexión a Servidor Remoto**
```
http://15.235.51.60/server3/contenido/peliculas/
```

✅ **Características:**
- Carga dinámica de películas
- Soporte de subcarpetas/categorías
- Búsqueda en tiempo real
- Cambio de categorías
- Estados de carga y error
- Fallback automático
- Debugging interactivo

✅ **Tecnología:**
- React 19 (Hooks: useState, useEffect)
- Fetch API con reintentos
- Manejo de CORS
- Tailwind CSS responsive

---

## 🚀 Inicio Rápido

### 1. El servidor ya está en ejecución
```
✅ http://localhost:3000/cinewatch
```

### 2. Abre la consola del navegador
```
Presiona F12 → Pestaña Console
```

### 3. Prueba la conexión
```javascript
ServerDebugger.testConnection()
```

### 4. Carga películas
```javascript
ServerDebugger.loadMovies()
```

---

## 📚 Documentación

| Documento | Descripción | Para quién |
|-----------|-------------|-----------|
| **[GUIA_RAPIDA.md](./GUIA_RAPIDA.md)** | Referencia rápida de comandos | Todos |
| **[INTEGRACION_SERVIDOR_PELICULAS.md](./INTEGRACION_SERVIDOR_PELICULAS.md)** | Guía técnica completa | Desarrolladores |
| **[GUIA_DEBUGGING.md](./GUIA_DEBUGGING.md)** | Cómo usar el debugger | Testers/Developers |
| **[CHECKLIST_IMPLEMENTACION.md](./CHECKLIST_IMPLEMENTACION.md)** | Estado y próximos pasos | Project Managers |

---

## 🏗️ Estructura de Archivos

```
src/
├── services/
│   ├── movieService.js          ← Servicio principal de películas
│   ├── apiProxy.js              ← Manejador de red con reintentos
│   └── serverDebugger.js        ← Herramientas de debugging
├── Components/
│   └── Movies.js                ← Componente React actualizado
├── Pages/
│   ├── Home.js
│   └── Login.js
├── App.tsx                       ← Aplicación principal
└── index.tsx                     ← Punto de entrada

.env.local                        ← Configuración del servidor
GUIA_RAPIDA.md                   ← Referencia rápida ⭐ EMPIEZA AQUÍ
INTEGRACION_SERVIDOR_PELICULAS.md ← Documentación técnica
GUIA_DEBUGGING.md                ← Debugging
CHECKLIST_IMPLEMENTACION.md      ← Estado del proyecto
```

---

## 🎬 ¿Cómo Funciona?

### Flujo de Carga
```
1. Componente Movies.js se monta
   ↓
2. useEffect llama a loadMovies()
   ↓
3. movieService.fetchMoviesFromServer() se conecta
   ↓
4. apiProxy.fetchWithRetries() hace 3 intentos
   ↓
5. Se parsea el HTML del servidor
   ↓
6. Se extraen imágenes y carpetas
   ↓
7. Se transforman en objetos Movie
   ↓
8. setState actualiza películas
   ↓
9. React re-renderiza el grid
   ↓
10. Usuario ve películas en la pantalla
```

### Estructura de Datos
```javascript
{
  id: 1,
  title: "Superman",
  image: "http://..../superman.jpg",
  rating: "B",
  duration: "120 min",
  status: "Estreno",
  bgColor: "bg-blue-500",
  url: "http://...",
  type: "imagen" | "carpeta"
}
```

---

## 🔧 Configuración

### URL del Servidor (`.env.local`)
```env
REACT_APP_API_BASE_URL=http://15.235.51.60/server3/contenido/peliculas/
```

### Categorías Disponibles
```
/estrenos/
/proximamente/
/clasicos/
/recomendadas/
```

---

## 💻 Comandos de Consola

### Testing
```javascript
// Verificar conexión
ServerDebugger.testConnection()

// Cargar todas las películas
ServerDebugger.loadMovies()

// Cargar categoría específica
ServerDebugger.loadCategory('estrenos')

// Buscar película
ServerDebugger.searchTest('superman')

// Reporte completo
ServerDebugger.generateReport()

// Ver ejemplos
ServerDebugger.showExamples()
```

---

## ✨ Características Implementadas

### ✅ Core Features
- [x] Obtener películas del servidor remoto
- [x] Parsear HTML del directorio
- [x] Extraer imágenes y carpetas
- [x] Generar metadata (rating, duración, estado)
- [x] Mostrar en grid responsive
- [x] Búsqueda en tiempo real
- [x] Filtrar por categoría
- [x] Manejo de errores
- [x] Fallback automático
- [x] Reintentos automáticos

### ✅ UI/UX
- [x] Spinner de carga
- [x] Barra de búsqueda
- [x] Botones de categorías
- [x] Mensajes de error
- [x] Grid responsive (2/3/5 columnas)
- [x] Soporte para imágenes faltantes
- [x] Información del servidor visualizada

### ✅ Developer Tools
- [x] Debugger interactivo
- [x] Logs detallados en consola
- [x] Validación de URLs
- [x] Metadata de imágenes
- [x] Descarga de archivos
- [x] CORS handling

---

## 🐛 Resolución de Problemas

### Problema: No hay películas
**Solución:**
```javascript
ServerDebugger.getFileList()
// Verifica estructura del servidor
```

### Problema: CORS Error
**Solución:**
- Hablar con admin del servidor
- O usar backend proxy

### Problema: Conexión lenta
**Solución:**
```javascript
// En apiProxy.js cambiar:
const TIMEOUT = 60000; // de 30000 a 60000
```

**Más ayuda:** Ver [GUIA_DEBUGGING.md](./GUIA_DEBUGGING.md)

---

## 📊 Características de Red

- **Timeout:** 30 segundos por request
- **Reintentos:** 3 automáticos con backoff exponencial
- **Backoff:** 1s, 2s, 4s
- **CORS:** Configurado automáticamente
- **Validación:** Todas las URLs validadas

---

## 🎨 Personalización Rápida

### Cambiar colores
Edita el array en `movieService.js`:
```javascript
const colors = [
  'bg-red-500',
  'bg-blue-500',
  // agregar más...
];
```

### Cambiar número de columnas
Edita `Movies.js`:
```jsx
{/* De */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">

{/* A */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
```

### Cambiar categorías
Edita `movieService.js`:
```javascript
const MOVIE_CATEGORIES = {
  estrenos: 'estrenos/',
  miCategoria: 'mi-categoria/',
  // agregar más...
};
```

---

## 🔬 Testing

Antes de deployment, verifica:

```javascript
// 1. Conexión
ServerDebugger.testConnection()     // ✅ Debe conectar

// 2. Películas
ServerDebugger.loadMovies()         // ✅ Debe retornar array

// 3. UI
// Abre http://localhost:3000/cinewatch
// ✅ Grid visible
// ✅ Búsqueda funciona
// ✅ Categorías funcionan

// 4. Reporte
ServerDebugger.generateReport()     // ✅ Todo OK sin errores
```

---

## 📈 Próximas Mejoras

### Fase 2 - Optimización
- [ ] Caché local de películas
- [ ] Preload de imágenes
- [ ] Paginación dinámica
- [ ] Lazy loading avanzado

### Fase 3 - Funcionalidades
- [ ] Ordenamiento (título, rating)
- [ ] Filtros avanzados
- [ ] Favoritos/Watchlist
- [ ] Relacionadas/Recomendadas

### Fase 4 - Backend
- [ ] API propia con base de datos
- [ ] Sistema de usuarios
- [ ] Comentarios y ratings
- [ ] Reproductor de video

### Fase 5 - DevOps
- [ ] CI/CD pipeline
- [ ] Tests automáticos
- [ ] Monitoreo
- [ ] Analytics

---

## 📦 Dependencias

### Main Dependencies
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.3",
  "react-bootstrap": "^2.10.10",
  "react-icons": "^5.5.0",
  "lucide-react": "^0.544.0",
  "swiper": "^12.0.2",
  "bootstrap": "^5.3.8"
}
```

### No se requieren dependencias adicionales para el servidor

---

## 🌐 URLs Importantes

```
Aplicación:        http://localhost:3000/cinewatch
Servidor Base:     http://15.235.51.60/server3/contenido/peliculas/
Estrenos:          http://15.235.51.60/server3/contenido/peliculas/estrenos/
Próximamente:      http://15.235.51.60/server3/contenido/peliculas/proximamente/
Clásicos:          http://15.235.51.60/server3/contenido/peliculas/clasicos/
```

---

## 📝 Historial de Cambios

### v1.0 (Abril 2026)
- ✅ Integración completa del servidor
- ✅ Búsqueda y filtrado
- ✅ Debugging tools
- ✅ Documentación completa
- ✅ Manejo de errores
- ✅ Fallback automático

---

## 🤝 Contribuir

Para contribuir:
1. Fork del proyecto
2. Crear rama: `git checkout -b mi-feature`
3. Commit: `git commit -am 'Agregar feature'`
4. Push: `git push origin mi-feature`
5. Pull Request

---

## 📄 Licencia

Este proyecto es propiedad de CineWatch. Todos los derechos reservados.

---

## 📞 Soporte

**¿Preguntas o problemas?**

1. Mira [GUIA_RAPIDA.md](./GUIA_RAPIDA.md)
2. Ejecuta `ServerDebugger.generateReport()` en consola
3. Revisa [GUIA_DEBUGGING.md](./GUIA_DEBUGGING.md)
4. Abre un issue en el repositorio

---

## 🙏 Agradecimientos

Gracias a:
- React Team
- Tailwind CSS
- Bootstrap
- La comunidad de desarrolladores

---

## 👨‍💻 Desarrollado por

**GitHub Copilot**  
Abril 2026

---

## 🎯 Empezar

1. **Lee primero:** [GUIA_RAPIDA.md](./GUIA_RAPIDA.md) ⭐
2. **Ejecuta:** `ServerDebugger.testConnection()`
3. **Abre:** http://localhost:3000/cinewatch
4. **Disfruta:** 🎬

---

**¡Bienvenido a CineWatch! 🎬✨**
