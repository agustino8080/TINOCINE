/**
 * DEBUG SCRIPT - Parser Kodi-Style
 * Paste this in Browser Console (F12) to test the new parser
 */

const DEBUG_SERVER = 'http://15.235.51.60/server3/contenido/peliculas/';

// Función para probar la conexión
window.testServerConnection = async function() {
  console.clear();
  console.log('%c🔍 INICIANDO TEST DE SERVIDOR', 'color: blue; font-size: 16px; font-weight: bold;');
  console.log(`📡 Servidor: ${DEBUG_SERVER}`);
  
  try {
    console.log('\n1. Conectando al servidor...');
    const response = await fetch(DEBUG_SERVER);
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get('content-type')}`);
    console.log(`   Content-Length: ${response.headers.get('content-length')} bytes`);
    
    if (!response.ok) {
      console.error(`❌ Error HTTP: ${response.status}`);
      return;
    }
    
    console.log('\n2. Descargando HTML...');
    const html = await response.text();
    console.log(`   ✅ HTML descargado: ${html.length} bytes`);
    
    console.log('\n3. Analizando estructura HTML...');
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('a');
    console.log(`   Total de etiquetas <a>: ${links.length}`);
    
    console.log('\n4. Links encontrados:');
    const urlSet = new Set();
    links.forEach((link, idx) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();
      if (href && !href.includes('?')) {
        urlSet.add(href);
        if (idx < 20) { // Muestra primeros 20
          console.log(`   ${idx + 1}. ${href} (${text})`);
        }
      }
    });
    console.log(`   ... y ${Math.max(0, urlSet.size - 20)} más`);
    
    console.log('\n5. Clasificación de archivos:');
    const videos = Array.from(urlSet).filter(u => /\.(mp4|mkv|avi|mov|webm|m3u8)$/i.test(u));
    const images = Array.from(urlSet).filter(u => /\.(jpg|jpeg|png|gif|webp)$/i.test(u));
    const folders = Array.from(urlSet).filter(u => u.endsWith('/'));
    const archives = Array.from(urlSet).filter(u => /\.(zip|rar|7z)$/i.test(u));
    
    console.log(`   🎬 Videos: ${videos.length}`);
    console.log(`   🖼️  Imágenes: ${images.length}`);
    console.log(`   📁 Carpetas: ${folders.length}`);
    console.log(`   📦 Archivos: ${archives.length}`);
    console.log(`   📊 Total: ${urlSet.size}`);
    
    if (videos.length > 0) {
      console.log('\n6. Ejemplo de videos encontrados:');
      videos.slice(0, 5).forEach(v => console.log(`   • ${v}`));
      if (videos.length > 5) console.log(`   ... y ${videos.length - 5} más`);
    }
    
    if (images.length > 0) {
      console.log('\n7. Ejemplo de imágenes encontradas:');
      images.slice(0, 5).forEach(i => console.log(`   • ${i}`));
      if (images.length > 5) console.log(`   ... y ${images.length - 5} más`);
    }
    
    if (folders.length > 0) {
      console.log('\n8. Carpetas encontradas:');
      folders.slice(0, 5).forEach(f => console.log(`   • ${f}`));
      if (folders.length > 5) console.log(`   ... y ${folders.length - 5} más`);
    }
    
    console.log('\n%c✅ TEST COMPLETADO', 'color: green; font-size: 14px; font-weight: bold;');
    console.log('Ver resultado en la sección anterior');
    
  } catch (error) {
    console.error('%c❌ ERROR DURANTE TEST', 'color: red; font-size: 14px; font-weight: bold;');
    console.error(`Error: ${error.message}`);
    console.error('Stack:', error.stack);
  }
};

// Función para limpiar y recargar películas
window.reloadMovies = function() {
  console.log('%c🔄 RECARGANDO PELÍCULAS', 'color: orange; font-size: 14px; font-weight: bold;');
  window.location.reload();
};

// Función para ver las películas cargadas
window.showLoadedMovies = function() {
  console.clear();
  console.log('%c🎬 PELÍCULAS CARGADAS', 'color: purple; font-size: 16px; font-weight: bold;');
  
  // Busca los elementos de película en el DOM
  const thumbnails = document.querySelectorAll('[class*="group"]'); // Adjust selector based on your HTML structure
  
  if (thumbnails.length === 0) {
    console.log('⚠️ No se encontraron películas en el DOM');
    console.log('Espera a que carguen o verifica la estructura HTML');
    return;
  }
  
  console.log(`Encontradas ${thumbnails.length} películas`);
  
  // Intenta extraer información de cada elemento
  let count = 0;
  thumbnails.forEach((thumb, idx) => {
    const title = thumb.textContent?.trim() || 'Sin título';
    const img = thumb.querySelector('img');
    const src = img?.src || 'Sin imagen';
    
    if (title && title !== 'Sin título') {
      count++;
      console.log(`${count}. ${title}`);
      if (count <= 10) console.log(`   Imagen: ${src}`);
    }
  });
  
  console.log(`\n✅ Total mostrables: ${count}`);
};

// Función para inspeccionar respuesta raw
window.inspectRawHTML = async function() {
  console.clear();
  console.log('%c📋 HTML RAW DEL SERVIDOR', 'color: darkblue; font-size: 14px; font-weight: bold;');
  
  try {
    const response = await fetch(DEBUG_SERVER);
    const html = await response.text();
    
    console.log(`Total: ${html.length} bytes`);
    console.log('\n--- PRIMEROS 2000 CARACTERES ---\n');
    console.log(html.substring(0, 2000));
    console.log('\n... (truncado)');
    console.log('\nPara ver completo, ejecuta:');
    console.log('fetch("' + DEBUG_SERVER + '").then(r=>r.text()).then(h=>copy(h))');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Menu de comandos disponibles
window.debugMenu = function() {
  console.clear();
  console.log('%c═══════════════════════════════════════════', 'color: cyan; font-weight: bold;');
  console.log('%c    🎬 DEBUG MENU - PARSER KODI-STYLE', 'color: cyan; font-weight: bold; font-size: 14px;');
  console.log('%c═══════════════════════════════════════════', 'color: cyan; font-weight: bold;');
  console.log('\n Comandos disponibles:\n');
  console.log('%cwindow.testServerConnection()', 'color: green; font-weight: bold;');
  console.log('  → Prueba la conexión al servidor');
  console.log('  → Extrae y clasifica todos los links\n');
  
  console.log('%cwindow.inspectRawHTML()', 'color: green; font-weight: bold;');
  console.log('  → Muestra el HTML raw del servidor\n');
  
  console.log('%cwindow.showLoadedMovies()', 'color: green; font-weight: bold;');
  console.log('  → Muestra películas cargadas en el DOM\n');
  
  console.log('%cwindow.reloadMovies()', 'color: green; font-weight: bold;');
  console.log('  → Recarga la página para refrescar películas\n');
  
  console.log('%cwindow.debugMenu()', 'color: green; font-weight: bold;');
  console.log('  → Muestra este menú\n');
  
  console.log('%c═══════════════════════════════════════════', 'color: cyan; font-weight: bold;');
};

// Mostrar menú al cargar
console.log('%c💡 Debug Script Cargado. Escribe: window.debugMenu()', 'color: blue; font-weight: bold;');

export { debugMenu, testServerConnection, showLoadedMovies, reloadMovies, inspectRawHTML };
