# 📽️ Integración de Servidor de Películas - CineWatch

## 🎯 Descripción General

Se ha integrado exitosamente el servidor externo de películas (`http://15.235.51.60/server3/contenido/peliculas/`) a la aplicación web CineWatch. La aplicación ahora puede:

- ✅ Conectarse al servidor de películas
- ✅ Cargar películas de subcarpetas automáticamente
- ✅ Buscar y filtrar películas
- ✅ Cambiar entre categorías
- ✅ Usar películas por defecto si el servidor no responde

---

## 📋 Archivos Creados/Modificados

### 1. **`src/services/movieService.js`** (NUEVO)
Servicio de API que maneja toda la lógica de conexión con el servidor.

**Funciones principales:**
- `fetchMoviesFromServer(category)` - Obtiene películas de una categoría
- `fetchAllMoviesByCategory()` - Obtiene películas de todas las categorías
- `parseMoviesFromHTML(html, baseUrl)` - Parsea el HTML del servidor
- `searchMovies(query, movies)` - Busca películas por título
- `filterMoviesByStatus(status, movies)` - Filtra por estado

### 2. **`src/Components/Movies.js`** (MODIFICADO)
Componente principal actualizado para:
- Usar `useState` y `useEffect` para gestionar estado
- Cargar películas del servidor al montar
- Implementar búsqueda en tiempo real
- Cambiar entre categorías
- Mostrar estados de carga y error

### 3. **`.env.local`** (NUEVO)
Archivo de configuración de variables de entorno:
```env
REACT_APP_API_BASE_URL=http://15.235.51.60/server3/contenido/peliculas/
REACT_APP_ENVIRONMENT=production
```

---

## 🔧 Estructura del Servidor de Películas

El servidor espera esta estructura:

```
http://15.235.51.60/server3/contenido/peliculas/
├── estrenos/
│   ├── pelicula1.jpg
│   ├── pelicula1.mp4
│   └── ...
├── proximamente/
│   ├── pelicula2.jpg
│   └── ...
├── clasicos/
│   ├── pelicula3.jpg
│   └── ...
└── recomendadas/
    └── ...
```

---

## 🚀 Lógica de Funcionamiento

### 1. **Carga Inicial**
```javascript
useEffect(() => {
  loadMovies(); // Se ejecuta al montar el componente
}, []);
```

### 2. **Conexión al Servidor**
```javascript
const serverMovies = await movieService.fetchMoviesFromServer();
```

### 3. **Parseo HTML**
- Busca referencias a imágenes: `*.jpg, *.jpeg, *.png, *.gif, *.webp`
- Busca carpetas: cualquier carpeta del servidor
- Extrae información de metadata

### 4. **Transformación de Datos**
Cada película obtiene:
```javascript
{
  id: número,
  title: "Nombre Formateado", // De filename
  image: "URL de la imagen",
  rating: "A/B/C/D", // Asignado aleatoriamente
  duration: "minutos", // Generado aleatoriamente
  status: "Estreno/Proximamente/Clásico", // Según la carpeta
  bgColor: "color-tailwind",
  url: "URL del servidor",
  type: "imagen|carpeta"
}
```

### 5. **Búsqueda y Filtrado**
```javascript
// Búsqueda en tiempo real
useEffect(() => {
  if (searchQuery) {
    results = movieService.searchMovies(searchQuery, movies);
  }
  setFilteredMovies(results);
}, [searchQuery, movies]);
```

### 6. **Cambio de Categoría**
```javascript
const handleCategoryChange = async (category) => {
  const categoryMovies = await movieService.fetchMoviesFromServer(category);
  setMovies(categoryMovies);
};
```

---

## 🎨 Características de la UI

### Barra de Búsqueda
- Búsqueda en tiempo real (debounced)
- Botón de recarga manual
- Filtra películas mientras escribes

### Categorías
- **Todas** - Todas las películas
- **Estrenos** - Subfolder: `/estrenos/`
- **Próximamente** - Subfolder: `/proximamente/`
- **Clásicos** - Subfolder: `/clasicos/`

### Estados de Carga
- Spinner de carga mientras obtiene datos
- Manejo de errores con mensajes
- Fallback a películas por defecto

### Información de Películas
- Título (formateado del filename)
- Póster (imagen del servidor)
- Calificación (badge de color)
- Duración (generada)
- Estado (Estreno/Proximamente/etc)

---

## ⚙️ Configuración

### Cambiar la URL del Servidor
Edita `.env.local`:
```env
REACT_APP_API_BASE_URL=http://tu-nuevo-servidor.com/peliculas/
```

### Cambiar Categorías
En `src/services/movieService.js`:
```javascript
const MOVIE_CATEGORIES = {
  estrenos: 'estrenos/',
  proximamente: 'proximamente/',
  clasicos: 'clasicos/',
  recomendadas: 'recomendadas/' // ← Puedes agregar más
};
```

### Personalizar Ratings
En `src/services/movieService.js`:
```javascript
const getRandomRating = () => {
  const ratings = ['A', 'B', 'B-15', 'C', 'D'];
  return ratings[Math.floor(Math.random() * ratings.length)];
};
```

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────┐
│   Carga del Componente          │
│   (useEffect - Montar)          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   loadMovies()                  │
│   - Conecta al servidor         │
│   - Obtiene HTML                │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   parseMoviesFromHTML()         │
│   - Busca imágenes              │
│   - Busca carpetas              │
│   - Crea objetos película       │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   setMovies() + setFiltered()   │
│   Estado actualizado            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Renderiza Grid de Películas   │
└─────────────────────────────────┘
```

---

## 🐛 Manejo de Errores

1. **Servidor no responde**
   - Usa películas por defecto (fallback)
   - Muestra mensaje de advertencia
   - No rompe la aplicación

2. **Búsqueda sin resultados**
   - Muestra mensaje "No se encontraron películas"
   - Permite intentar otra búsqueda

3. **Imagen no carga**
   - Usa placeholder genérico
   - Mantiene la estructura del grid

---

## 📱 Responsividad

- **Mobile** (2 columnas)
- **Tablet** (3 columnas)
- **Desktop** (5 columnas)

---

## 🎯 Próximas Mejoras Posibles

1. **Paginación** - Cargar más películas dinámicamente
2. **Ordenamiento** - Por título, rating, fecha
3. **Filtros avanzados** - Por rating, duración
4. **Reproducción** - Videos directamente desde el servidor
5. **Caché local** - Guardar películas en localStorage
6. **API Backend** - Crear backend propio para gestionar películas
7. **Streaming** - Integración con player de video

---

## 📞 Soporte

Si hay problemas:
1. Verifica la consola del navegador (F12)
2. Comprueba que el servidor esté en línea
3. Revisa la estructura de carpetas del servidor
4. Verifica `.env.local` tenga la URL correcta

---

**última actualización:** Abril 2026  
**Versión:** 1.0
