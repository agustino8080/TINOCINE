# Sistema de Servidores - Menú "Elige tu Cine"

## ¿Qué Cambió?

Se implementó un sistema funcional completo que permite cambiar entre diferentes servidores de películas directamente desde el menú "Elige tu cine" en la navbar.

## Archivos Modificados

### 1. **src/Pages/Home.js** 
- Agregado estado `selectedServer` con `useState`
- Creado array `MOVIE_SERVERS` con la lista de servidores disponibles
- Se pasa `serverUrl` y `serverName` como props a Movies.js
- Se pasan props a Navbar para que maneje el cambio de servidor

```javascript
const MOVIE_SERVERS = [
  {
    id: 'local',
    name: 'Peliculas Locales',
    url: '',
    description: 'Peliculas por defecto'
  },
  {
    id: 'server1',
    name: 'Servidor Principal',
    url: 'http://15.235.51.60/server3/contenido/peliculas/',
    description: 'Servidor remoto con todas las peliculas'
  }
];
```

### 2. **src/Components/Navbar.js**
- Recibe props: `servers`, `selectedServer`, `onServerChange`
- El select dropdown ahora es **funcional**:
  - Se mapean los servidores del array dinámicamente
  - onChange dispara el callback `onServerChange`
  - Muestra el servidor seleccionado

```javascript
<select
  value={selectedServer}
  onChange={(e) => onServerChange(e.target.value)}
>
  <option value="">Elige tu cine</option>
  {servers.map(server => (
    <option key={server.id} value={server.id}>
      {server.name}
    </option>
  ))}
</select>
```

### 3. **src/Components/Movies.js**
- Recibe props: `serverUrl` y `serverName`
- `useEffect` ahora tiene `serverUrl` como dependencia
  - **Cada vez que cambias el servidor en el menú, se recarga automáticamente**
- `loadMovies()` actualizada para usar el `serverUrl` dinámico
- `handleCategoryChange()` ahora construye URLs dinámicamente basadas en `serverUrl`
- La información del servidor se muestra con el nombre del servidor seleccionado

## Flujo de Funcionamiento

```
Usuario selecciona servidor en Navbar
          ↓
onServerChange actualiza estado en Home.js
          ↓
currentServer se actualiza
          ↓
serverUrl y serverName se pasan a Movies.js
          ↓
useEffect detecta cambio en serverUrl
          ↓
loadMovies() se ejecuta con el nuevo servidor
          ↓
Películas se cargan y muestran
```

## Cómo Usar

### Opción 1: Cambiar de Servidor desde el Menú
1. Abre http://localhost:3000/cinewatch
2. En la navbar, haz clic en el dropdown "Elige tu cine"
3. Selecciona un servidor:
   - **Peliculas Locales** → Muestra películas por defecto
   - **Servidor Principal** → Se conecta a http://15.235.51.60/server3/contenido/peliculas/
4. Las películas se cargan automáticamente del servidor seleccionado

### Opción 2: Agregar Más Servidores
Para agregar nuevos servidores, edita el array `MOVIE_SERVERS` en `Home.js`:

```javascript
const MOVIE_SERVERS = [
  {
    id: 'local',
    name: 'Peliculas Locales',
    url: '',
    description: 'Peliculas por defecto'
  },
  {
    id: 'server1',
    name: 'Servidor Principal',
    url: 'http://15.235.51.60/server3/contenido/peliculas/',
    description: 'Servidor remoto con todas las peliculas'
  },
  // ← AGREGA NUEVOS AQUÍ
  {
    id: 'server2',
    name: 'Mi Servidor Personalizado',
    url: 'http://mi-servidor.com/peliculas/',
    description: 'Mi servidor personalizado'
  }
];
```

## Características Principales

✅ **Menú funcional** - El dropdown "Elige tu cine" ahora tiene lógica real  
✅ **Cambio dinámico** - Las películas se cargan automáticamente al cambiar servidor  
✅ **Categorías dinámicas** - Las categorías (estrenos, proximamente, etc) se adaptan al servidor  
✅ **Información del servidor** - Se muestra qué servidor está activo  
✅ **Escalable** - Fácil agregar nuevos servidores  
✅ **Manejo de errores** - Si el servidor no responde, usa películas por defecto  

## Testing en Consola

### Verificar que funciona:
```javascript
// Ver en console
console.log('Cargando películas...');
// Debería ver mensajes como:
// 📡 Conectando a: http://15.235.51.60/server3/contenido/peliculas/
// ✅ 45 películas cargadas de Servidor Principal
```

### Ver logs de cambio de servidor:
1. Abre Developer Tools (F12)
2. Ve a Console
3. Cambia de servidor en el menú
4. Verás logs detallados del proceso

## Estructura de Datos

Cada servidor debe tener:
- `id` - Identificador único (string)
- `name` - Nombre mostrado en el menú
- `url` - URL base del servidor (termina con `/`)
- `description` - Descripción para tooltip

## Próximas Mejoras Posibles

1. Guardar servidor seleccionado en localStorage
2. Agregar botón para editar/agregar servidores
3. Mostrar estado de conexión (✅ conectado / ❌ error)
4. Caché de películas por servidor
5. Validar URLs antes de conectar
6. Historial de servidores recientes

---

**Estado:** ✅ Completamente funcional  
**Última actualización:** Ahora  
**Servidor por defecto:** Servidor Principal (http://15.235.51.60/server3/contenido/peliculas/)
