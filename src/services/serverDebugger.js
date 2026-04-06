/**
 * Test & Debug Utils - Herramientas para probar la conexión con el servidor
 * Ejecuta en la consola del navegador (F12)
 */

import movieService from './movieService';
import apiProxy from './apiProxy';

const ServerDebugger = {
  /**
   * Prueba conexión básica al servidor
   */
  testConnection: async () => {
    console.log('🧪 Probando conexión al servidor...');
    try {
      const url = process.env.REACT_APP_API_BASE_URL || 'http://15.235.51.60/server3/contenido/peliculas/';
      const html = await apiProxy.fetchWithRetries(url);
      console.log('✅ Conexión exitosa');
      console.log('📄 Primeros 500 caracteres del HTML:');
      console.log(html.substring(0, 500));
      return html;
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      return null;
    }
  },

  /**
   * Obtiene lista de archivos del servidor
   */
  getFileList: async () => {
    console.log('📂 Obteniendo lista de archivos...');
    try {
      const url = process.env.REACT_APP_API_BASE_URL || 'http://15.235.51.60/server3/contenido/peliculas/';
      const files = await apiProxy.getServerFileList(url);
      console.table(files);
      return files;
    } catch (error) {
      console.error('❌ Error:', error);
      return [];
    }
  },

  /**
   * Carga películas desde el servidor
   */
  loadMovies: async () => {
    console.log('🎬 Cargando películas...');
    try {
      const movies = await movieService.fetchMoviesFromServer();
      console.log(`✅ ${movies.length} películas cargadas`);
      console.table(movies);
      return movies;
    } catch (error) {
      console.error('❌ Error:', error);
      return [];
    }
  },

  /**
   * Carga películas de una categoría específica
   */
  loadCategory: async (category) => {
    console.log(`🎬 Cargando categoría: ${category}`);
    try {
      const movies = await movieService.fetchMoviesFromServer(category);
      console.log(`✅ ${movies.length} películas en ${category}`);
      console.table(movies);
      return movies;
    } catch (error) {
      console.error('❌ Error:', error);
      return [];
    }
  },

  /**
   * Prueba búsqueda de películas
   */
  searchTest: async (query) => {
    console.log(`🔍 Buscando: "${query}"`);
    try {
      const movies = await movieService.fetchMoviesFromServer();
      const results = movieService.searchMovies(query, movies);
      console.log(`✅ ${results.length} resultados encontrados`);
      console.table(results);
      return results;
    } catch (error) {
      console.error('❌ Error:', error);
      return [];
    }
  },

  /**
   * Valida una URL de imagen
   */
  validateImage: async (url) => {
    console.log(`🖼️ Validando imagen: ${url}`);
    try {
      const meta = await apiProxy.getImageMetadata(url);
      console.log('✅ Imagen válida');
      console.table(meta);
      return meta;
    } catch (error) {
      console.error('❌ Error:', error);
      return null;
    }
  },

  /**
   * Muestra configuración actual
   */
  showConfig: () => {
    console.log('⚙️ Configuración actual:');
    console.log({
      'API Base URL': process.env.REACT_APP_API_BASE_URL,
      'Categorías': movieService.MOVIE_CATEGORIES,
      'Timeout': '30 segundos',
      'Reintentos': '3'
    });
  },

  /**
   * Genera reporte completo
   */
  generateReport: async () => {
    console.clear();
    console.log('📊 ========== REPORTE DE SERVIDOR ==========');
    
    this.showConfig();
    console.log('\n');
    
    const connection = await this.testConnection();
    console.log('\n');
    
    if (connection) {
      const files = await this.getFileList();
      console.log('\n');
      
      const movies = await this.loadMovies();
      console.log('\n');
      
      console.log('✅ Reporte completado');
    } else {
      console.error('❌ No se pudo conectar al servidor');
    }
  },

  /**
   * Descarga una película
   */
  downloadMovie: async (url, filename) => {
    console.log(`⬇️ Descargando: ${filename}`);
    try {
      await apiProxy.downloadFile(url, filename);
      console.log('✅ Descarga iniciada');
    } catch (error) {
      console.error('❌ Error:', error);
    }
  },

  /**
   * Muestra ejemplos de uso
   */
  showExamples: () => {
    console.log(`
    %c 📚 EJEMPLOS DE USO
    `, 'font-size: 14px; font-weight: bold; color: blue;');
    
    console.log(`
// 1. Probar conexión
ServerDebugger.testConnection();

// 2. Obtener lista de archivos
ServerDebugger.getFileList();

// 3. Cargar todas las películas
ServerDebugger.loadMovies();

// 4. Cargar categoría específica (estrenos, proximamente, clasicos)
ServerDebugger.loadCategory('estrenos');

// 5. Buscar películas
ServerDebugger.searchTest('superman');

// 6. Validar imagen
ServerDebugger.validateImage('http://...');

// 7. Ver configuración
ServerDebugger.showConfig();

// 8. Generar reporte completo
ServerDebugger.generateReport();

// 9. Descargar película
ServerDebugger.downloadMovie('http://...', 'mi-pelicula.jpg');
    `);
  }
};

// Expone en window para acceso desde consola
if (typeof window !== 'undefined') {
  window.ServerDebugger = ServerDebugger;
  console.log('✅ ServerDebugger disponible. Escribe: ServerDebugger.showExamples()');
}

export default ServerDebugger;
