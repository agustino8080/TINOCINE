/**
 * API Proxy Handler - Maneja problemas de CORS y conexión
 * Usa este archivo si tienes problemas de CORS con el servidor de películas
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://15.235.51.60/server3/contenido/peliculas/';
const TIMEOUT = 30000; // 30 segundos

// Opciones de CORS para evitar problemas
const corsOptions = {
  mode: 'cors',
  credentials: 'omit',
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  }
};

/**
 * Fetch con timeout
 * @param {string} url - URL a obtener
 * @param {object} options - Opciones de fetch
 * @returns {Promise} Respuesta del servidor
 */
const fetchWithTimeout = (url, options = {}) => {
  return Promise.race([
    fetch(url, { ...corsOptions, ...options }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout al conectar')), TIMEOUT)
    )
  ]);
};

/**
 * Obtiene contenido del servidor con reintentos
 * @param {string} url - URL del servidor
 * @param {number} retries - Número de reintentos
 * @returns {Promise<string>} HTML del servidor
 */
export const fetchWithRetries = async (url, retries = 3) => {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📡 Intento ${i + 1}/${retries} de conexión a: ${url}`);
      
      const response = await fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      console.log(`✅ Conexión exitosa (intento ${i + 1})`);
      return html;
      
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Error en intento ${i + 1}:`, error.message);
      
      // Espera antes de reintentar (backoff exponencial)
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`⏳ Reintentando en ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`No se pudo conectar después de ${retries} intentos: ${lastError.message}`);
};

/**
 * Obtiene lista de archivos del servidor (compatible con listados HTTP)
 * @param {string} directory - Directorio del servidor
 * @returns {Promise<Array>} Array de archivos
 */
export const getServerFileList = async (directory) => {
  try {
    const html = await fetchWithRetries(directory);
    const urls = parseDirectoryListing(html, directory);
    return urls;
  } catch (error) {
    console.error('Error obteniendo lista de archivos:', error);
    return [];
  }
};

/**
 * Parsea listado de directorio HTTP
 * @param {string} html - HTML del listado
 * @param {string} baseUrl - URL base
 * @returns {Array} Array de URLs encontradas
 */
const parseDirectoryListing = (html, baseUrl) => {
  const urls = [];
  
  if (!html || html.length === 0) {
    console.warn('[parseDirectoryListing] HTML vacío');
    return urls;
  }

  console.log(`[parseDirectoryListing] Analizando HTML (${html.length} bytes) de ${baseUrl}`);

  // Diferentes formatos de listado HTTP
  const patterns = [
    // Apache/Nginx style: <a href="filename">filename</a> con más flexibilidad
    {name: 'Apache Anchor', regex: /<a\s+[^>]*href=["']?([^"'\s>]+)["']?[^>]*>([^<]+)<\/a>/gi},
    
    // Generic href extractor
    {name: 'Generic href', regex: /href=["']?([^"'\s>]+)["']?/gi},
    
    // Busca en atributos data-*
    {name: 'Data attributes', regex: /data-(?:file|path|url)=["']([^"']+)["']/gi},
    
    // Busca rutas con extensiones multimedia
    {name: 'Media routes', regex: /["']([^"']*\.(?:mp4|mkv|avi|mov|webm|m3u8|jpg|jpeg|png|gif|webp|zip|rar|7z))["']/gi},
  ];
  
  const urlSet = new Set();
  
  for (const {name, regex} of patterns) {
    let match;
    const patternUrls = [];
    
    while ((match = regex.exec(html)) !== null) {
      let url = match[1];
      
      // Validaciones básicas
      if (!url || url === '#' || url === '../' || url === './' || url === '/' || url.startsWith('?')) {
        continue;
      }
      
      // Convierte rutas relativas a absolutas si es necesario
      if (!url.startsWith('http')) {
        const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
        try {
          const fullUrl = new URL(url, base).href;
          urlSet.add(fullUrl);
          patternUrls.push(fullUrl);
        } catch (e) {
          console.warn(`[${name}] URL inválida: ${url}`);
        }
      } else {
        urlSet.add(url);
        patternUrls.push(url);
      }
    }
    
    if (patternUrls.length > 0) {
      console.log(`[${name}] Encontradas ${patternUrls.length} URLs`);
    }
  }

  console.log(`[parseDirectoryListing] Total URLs extraídas: ${urlSet.size}`);
  return Array.from(urlSet);
};

/**
 * Valida que una URL sea accesible
 * @param {string} url - URL a validar
 * @returns {Promise<boolean>} true si es accesible
 */
export const validateUrl = async (url) => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      ...corsOptions 
    });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Obtiene metadata de una imagen
 * @param {string} url - URL de la imagen
 * @returns {Promise<Object>} Datos de la imagen
 */
export const getImageMetadata = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        ratio: img.naturalWidth / img.naturalHeight,
        loaded: true
      });
    };
    
    img.onerror = () => {
      reject(new Error('No se pudo cargar la imagen'));
    };
    
    img.src = url;
  });
};

/**
 * Descarga un archivo desde el servidor
 * @param {string} url - URL del archivo
 * @param {string} filename - Nombre para guardar (opcional)
 */
export const downloadFile = async (url, filename = null) => {
  try {
    const response = await fetchWithRetries(url);
    const blob = await response.blob();
    
    // Crea URL de descarga
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    
    // Limpia
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
    
    console.log('✅ Descarga completada:', filename);
  } catch (error) {
    console.error('❌ Error en descarga:', error);
    throw error;
  }
};

export default {
  fetchWithRetries,
  fetchWithTimeout,
  getServerFileList,
  validateUrl,
  getImageMetadata,
  downloadFile,
  corsOptions
};
