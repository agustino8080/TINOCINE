// Movie Service - Conecta con lista M3U
const M3U_URL = 'https://raw.githubusercontent.com/agustino8080/listam3u/refs/heads/main/lista_fullrow.m3u';

/**
 * Obtiene todas las películas desde la lista M3U
 * @returns {Promise<Array>} Array de películas
 */
export const fetchMovies = async () => {
  try {
    console.log('📡 Descargando lista M3U desde:', M3U_URL);
    
    const response = await fetch(M3U_URL);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const m3uContent = await response.text();
    console.log(`✅ Lista M3U descargada: ${m3uContent.length} bytes`);
    
    const movies = parseM3U(m3uContent);
    console.log(`🎬 ${movies.length} películas extraídas del M3U`);
    
    return movies;
  } catch (error) {
    console.error('❌ Error fetching movies:', error);
    return [];
  }
};

/**
 * Parsea contenido M3U y extrae películas
 * Formato:
 * #EXTINF:-1,tvg-id="xxx" tvg-name="Nombre" tvg-logo="url",Nombre Película
 * http://url-de-la-pelicula
 * 
 * @param {string} m3uContent - Contenido del archivo M3U
 * @returns {Array} Array de películas
 */
const parseM3U = (m3uContent) => {
  const movies = [];
  let id = 1;

  // Split por líneas
  const lines = m3uContent.split('\n').map(line => line.trim()).filter(line => line);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Busca líneas que comiencen con #EXTINF
    if (line.startsWith('#EXTINF:')) {
      try {
        // Extrae información de la línea EXTINF
        const extinf = parseExtinf(line);
        
        // La siguiente línea debe ser la URL
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          
          // Si la siguiente línea no empieza con #, es la URL
          if (!nextLine.startsWith('#')) {
            const url = nextLine.trim();
            
            if (url && extinf.title) {
              const movie = {
                id: id++,
                title: extinf.title,
                image: extinf.logo || null,
                rating: extractRating(extinf.title) || 'PG-13',
                duration: extractDuration(extinf.title) || '120 min',
                status: extractStatus(extinf.title) || 'Disponible',
                description: extinf.title,
                bgColor: getRandomBgColor(),
                url: url,
                tvgId: extinf.tvgId || null,
                tvgName: extinf.tvgName || extinf.title
              };
              
              movies.push(movie);
              console.log(`[M3U] ${id-1}. ${movie.title} - ${url.substring(0, 50)}...`);
            }
            
            // Salta la siguiente línea ya que fue procesada
            i++;
          }
        }
      } catch (error) {
        console.error('Error parseando línea M3U:', line, error);
      }
    }
  }

  console.log(`[RESULTADO] Total de películas: ${movies.length}`);
  return movies;
};

/**
 * Parsea línea EXTINF
 * @param {string} extinf - Línea EXTINF
 * @returns {Object} Objeto con información extraída
 */
const parseExtinf = (extinf) => {
  const result = {
    title: '',
    tvgId: null,
    tvgName: null,
    logo: null
  };

  // Extrae tvg-id
  const tvgIdMatch = extinf.match(/tvg-id="([^"]*)"/);
  if (tvgIdMatch) result.tvgId = tvgIdMatch[1];

  // Extrae tvg-name
  const tvgNameMatch = extinf.match(/tvg-name="([^"]*)"/);
  if (tvgNameMatch) result.tvgName = tvgNameMatch[1];

  // Extrae logo/tvg-logo
  const logoMatch = extinf.match(/tvg-logo="([^"]*)"/);
  if (logoMatch) result.logo = logoMatch[1];

  // Extrae título (después de la última coma)
  const titleMatch = extinf.match(/,(.+)$/);
  if (titleMatch) {
    result.title = titleMatch[1].trim();
  } else {
    // Si no hay coma, toma toda la línea después de #EXTINF:-1
    result.title = extinf.replace(/#EXTINF:-1[^,]*,?/, '').trim();
  }

  return result;
};

/**
 * Extrae calificación del título
 * @param {string} title - Título de la película
 * @returns {string|null} Calificación
 */
const extractRating = (title) => {
  const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'A', 'B', 'B-15', 'C', 'D'];
  for (const rating of ratings) {
    if (title.includes(rating)) return rating;
  }
  return null;
};

/**
 * Extrae duración del título
 * @param {string} title - Título de la película
 * @returns {string|null} Duración en minutos
 */
const extractDuration = (title) => {
  const match = title.match(/(\d{2,3})\s*min/i);
  if (match) return `${match[1]} min`;
  return null;
};

/**
 * Extrae estado del título
 * @param {string} title - Título de la película
 * @returns {string} Estado
 */
const extractStatus = (title) => {
  if (title.toLowerCase().includes('estreno')) return 'Estreno';
  if (title.toLowerCase().includes('proximamente') || title.toLowerCase().includes('próximamente')) return 'Proximamente';
  if (title.toLowerCase().includes('clásico') || title.toLowerCase().includes('clasico')) return 'Clásico';
  return 'Disponible';
};

/**
 * Genera un color de fondo aleatorio
 * @returns {string} Código hexadecimal de color
 */
const getRandomBgColor = () => {
  const colors = [
    '#1e3a5f', // Azul oscuro
    '#d4af37', // Dorado
    '#c41e3a', // Rojo
    '#002868', // Azul navy
    '#0066cc', // Azul
    '#ff6b35', // Naranja
    '#004e89', // Azul profundo
    '#9d4edd', // Púrpura
    '#3a86ff', // Azul cielo
    '#fb5607'  // Naranja brillante
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Obtiene película por ID
 * @param {number} id - ID de la película
 * @param {Array} movies - Array de películas
 * @returns {Object|null}
 */
export const getMovieById = (id, movies) => {
  return movies.find(movie => movie.id === id) || null;
};

/**
 * Filtra películas por estado
 * @param {string} status - Estado a filtrar
 * @param {Array} movies - Array de películas
 * @returns {Array}
 */
export const filterMoviesByStatus = (status, movies) => {
  return movies.filter(movie => movie.status === status);
};

/**
 * Busca películas por título
 * @param {string} query - Término de búsqueda
 * @param {Array} movies - Array de películas
 * @returns {Array}
 */
export const searchMoviesByTitle = (query, movies) => {
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

const movieServiceExports = {
  fetchMovies,
  getMovieById,
  filterMoviesByStatus,
  searchMoviesByTitle
};

export default movieServiceExports;
