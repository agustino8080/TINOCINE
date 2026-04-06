# 🔧 Guía de Debugging - Servidor de Películas

## 📋 Herramientas Disponibles

Se han creado tres herramientas principales para trabajar con el servidor de películas:

### 1. **movieService.js** - Servicio Principal
Gestiona la lógica de conexión y transformación de datos.

### 2. **apiProxy.js** - Manejador de Red
Implementa:
- Reintentos automáticos (3 intentos con backoff exponencial)
- Timeout de 30 segundos
- Manejo de CORS
- Descarga de archivos
- Validación de URLs
- Metadata de imágenes

### 3. **serverDebugger.js** - Herramienta de Testing
Disponible en la consola del navegador para debugging interactivo.

---

## 🚀 Cómo Usar el Debugger

### Paso 1: Abre la Consola
```
F12 → Pestaña "Console"
```

### Paso 2: Ejecuta Comandos

#### **Test de Conexión**
```javascript
ServerDebugger.testConnection()
```
✅ Verifica que puedas conectar al servidor  
✅ Muestra los primeros 500 caracteres del HTML

**Resultado esperado:**
```
✅ Conexión exitosa
📄 Primeros 500 caracteres del HTML:
<html>
  <head>
    <title>Index of /server3/contenido/peliculas/</title>
  ...
```

#### **Obtener Lista de Archivos**
```javascript
ServerDebugger.getFileList()
```
✅ Lista todos los archivos del servidor

**Resultado esperado:**
```
[
  "http://15.235.51.60/server3/contenido/peliculas/estrenos/",
  "http://15.235.51.60/server3/contenido/peliculas/proximamente/",
  "http://15.235.51.60/server3/contenido/peliculas/pelicula1.jpg",
  ...
]
```

#### **Cargar Películas**
```javascript
// Todas las películas
ServerDebugger.loadMovies()

// Categoría específica
ServerDebugger.loadCategory('estrenos')
ServerDebugger.loadCategory('proximamente')
ServerDebugger.loadCategory('clasicos')
```

✅ Muestra tabla con todas las películas  
✅ Incluye: id, title, image, rating, duration, status, type

**Resultado esperado:**
```
┌─────┬──────────────────┬──────────┬────────┬──────────┬───────────────┐
│ id  │ title            │ rating   │ status │ duration │ type          │
├─────┼──────────────────┼──────────┼────────┼──────────┼───────────────┤
│  1  │ Superman         │ B        │ Estreno│ 125 min  │ imagen        │
│  2  │ Avatar 3         │ A        │ Próximamente │ 150 min │ imagen │
│  3  │ Estrenos        │ A        │ Disponible   │ Colección │ carpeta │
```

#### **Buscar Películas**
```javascript
ServerDebugger.searchTest('superman')
ServerDebugger.searchTest('avatar')
ServerDebugger.searchTest('demon')
```

✅ Filtra películas por título

#### **Ver Configuración**
```javascript
ServerDebugger.showConfig()
```

**Resultado:**
```
⚙️ Configuración actual:
{
  "API Base URL": "http://15.235.51.60/server3/contenido/peliculas/",
  "Categorías": {
    estrenos: "estrenos/",
    proximamente: "proximamente/",
    clasicos: "clasicos/",
    recomendadas: "recomendadas/"
  },
  "Timeout": "30 segundos",
  "Reintentos": "3"
}
```

#### **Validar Imagen**
```javascript
ServerDebugger.validateImage('http://15.235.51.60/server3/contenido/peliculas/superman.jpg')
```

✅ Verifica que la imagen sea accesible  
✅ Obtiene dimensiones

**Resultado:**
```
✅ Imagen válida
{
  width: 300,
  height: 400,
  ratio: 0.75,
  loaded: true
}
```

#### **Generar Reporte Completo**
```javascript
ServerDebugger.generateReport()
```

✅ Ejecuta todas las pruebas  
✅ Genera resumen completo

**Resultado:** Se mostrará toda la información en orden

#### **Ver Ejemplos**
```javascript
ServerDebugger.showExamples()
```

---

## 🐛 Solución de Problemas

### Problema: "No se pudo conectar"
```
❌ Error de conexión: TypeError: Failed to fetch
```

**Soluciones:**
1. Verifica que el servidor esté en línea
2. Revisa la URL en `.env.local`
3. Comprueba conectividad: `ping 15.235.51.60`
4. Investiga si hay bloques de firewall

### Problema: "Conexión exitosa pero sin películas"
```
✅ Conexión exitosa
✅ 0 películas cargadas
```

**Soluciones:**
1. Verifica la estructura de carpetas del servidor
2. Comprueba que haya archivos `.jpg, .png, .gif, .webp`
3. Revisa permisos del servidor

### Problema: "Timeout"
```
⏳ Error: Timeout al conectar
```

**Soluciones:**
1. El servidor está lento
2. Conexión de red lenta
3. Aumenta timeout en `apiProxy.js`: `const TIMEOUT = 60000`

### Problema: "CORS Error"
```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Soluciones:**
1. El servidor no permite CORS
2. Usar backend intermedio para proxy
3. Contactar administrador del servidor

---

## 📊 Estructura de Datos

### Objeto Película
```javascript
{
  id: 1,                                    // ID único
  title: "Superman",                         // Título formateado
  image: "http://..../superman.jpg",         // URL de imagen
  rating: "B",                               // Calificación (A, B, C, D)
  duration: "120 min",                       // Duración generada
  status: "Estreno",                         // Estado basado en carpeta
  bgColor: "bg-blue-500",                   // Color Tailwind
  url: "http://...",                         // URL del archivo/carpeta
  type: "imagen" | "carpeta"                 // Tipo de contenido
}
```

---

## 🔐 Seguridad

- ✅ Validación de URLs
- ✅ Manejo de errores sin exposición de datos sensibles
- ✅ Timeout para evitar bloqueos
- ✅ No almacena credenciales
- ✅ Reintentos controlados

---

## 📈 Monitoreo

Para ver logs detallados en consola:
```javascript
// Activa logs detallados
localStorage.setItem('DEBUG_MODE', 'true');

// Desactiva logs
localStorage.removeItem('DEBUG_MODE');
```

---

## 🎯 Casos de Uso

### Caso 1: Verificar servidor antes de deployment
```javascript
ServerDebugger.generateReport()
// Revisa console para confirmar todo funciona
```

### Caso 2: Añadir nueva categoría
```javascript
// 1. Añade en serverDebugger.js el comando
ServerDebugger.loadCategory('miCategoria')

// 2. Verifica que funciona
// 3. Añade botón en UI
```

### Caso 3: Debuggear película específica
```javascript
// Busca película
ServerDebugger.searchTest('nombrePelicula')

// Valida imagen
ServerDebugger.validateImage(movieUrl)

// Descarga si necesitas
ServerDebugger.downloadMovie(movieUrl, 'pelicula.jpg')
```

---

## 📝 Notas

- El debugger está disponible automáticamente en desarrollo
- Todos los comandos son síncronos (devuelven Promesas)
- Los logs incluyen timestamps y statusos visuales
- Compatible con Chrome, Firefox, Safari, Edge

---

**Última actualización:** Abril 2026
