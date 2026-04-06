import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { fetchMovies, MOVIE_LISTS } from "../services/movieService";
import { useTheme } from "../contexts/ThemeContext";
import VideoPlayer from "./VideoPlayer";

const Movies = forwardRef((props, ref) => {
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState('fullrow');

  // Exponer métodos al componente padre
  useImperativeHandle(ref, () => ({
    handleMainClick,
    handleSortAZ,
    handleSortByYear
  }));

  // Carga películas del M3U al montar o cambiar lista
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadMovies();
  }, [selectedListId]);

  // Carga películas del M3U
  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📡 Descargando lista M3U:', selectedListId);
      
      let backendMovies = await fetchMovies(selectedListId);
      
      // 🧪 PELÍCULA DE PRUEBA - Video con CORS habilitado
      const testMovie = {
        id: 0,
        title: '🧪 Ocean Sample Video',
        image: 'https://via.placeholder.com/300x400?text=Test+Video',
        rating: 'G',
        duration: '10 seg',
        status: 'Prueba',
        description: 'Video de prueba para verificar reproducción en el navegador.',
        bgColor: '#FF5733',
        url: 'https://vjs.zencdn.net/v/oceans.mp4',
        tvgId: null,
        tvgName: 'TEST VIDEO'
      };
      
      if (backendMovies && backendMovies.length > 0) {
        console.log(`✅ ${backendMovies.length} películas obtenidas`);
        // Agregar película de prueba al inicio
        backendMovies = [testMovie, ...backendMovies];
        setMovies(backendMovies);
        setFilteredMovies(backendMovies);
      } else {
        console.warn('⚠️ No se obtuvieron películas');
        setError('No se pudieron cargar las películas');
        setMovies([testMovie]);
        setFilteredMovies([testMovie]);
      }
    } catch (err) {
      console.error('❌ Error al cargar películas:', err);
      setError('Error al cargar las películas');
      setMovies([]);
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejadores de ordenamiento
  const handleMainClick = () => {
    setFilteredMovies([...movies]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortAZ = () => {
    const sorted = [...filteredMovies].sort((a, b) => 
      a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
    );
    setFilteredMovies(sorted);
  };

  const handleSortByYear = () => {
    const sorted = [...filteredMovies].sort((a, b) => {
      const yearA = extractYear(a.title) || 0;
      const yearB = extractYear(b.title) || 0;
      return yearB - yearA; // Descendente (más recientes primero)
    });
    setFilteredMovies(sorted);
  };

  /**
   * Extrae el año del título de la película
   */
  const extractYear = (title) => {
    const match = title.match(/\b(19|20)\d{2}\b/);
    return match ? parseInt(match[0]) : null;
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };
  
return (
    <div className="min-h-screen p-4 md:p-8 transition-all duration-300" style={{ backgroundColor: theme.colors.bg }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-8 transition-colors duration-300" style={{ color: theme.colors.text }}>
          Cartelera
        </h1>
        
        {/* Selector de Listas */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {Object.values(MOVIE_LISTS).map((list) => (
            <button
              key={list.id}
              onClick={() => setSelectedListId(list.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedListId === list.id
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-102'
              }`}
              style={{
                backgroundColor: selectedListId === list.id ? theme.colors.primary : theme.colors.card,
                color: selectedListId === list.id ? '#fff' : theme.colors.text,
                border: `2px solid ${selectedListId === list.id ? theme.colors.primary : 'transparent'}`,
              }}
            >
              {list.name}
            </button>
          ))}
        </div>
        
        {/* Mensajes de estado */}
        {error && (
          <div className="mb-4 p-3 rounded transition-colors duration-300" style={{ backgroundColor: theme.colors.primary + '20', borderLeft: `4px solid ${theme.colors.primary}`, color: theme.colors.text }}>
            ⚠️ {error}
          </div>
        )}

        {loading && filteredMovies.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderBottomColor: theme.colors.primary }}></div>
            </div>
            <p className="mt-4 transition-colors duration-300" style={{ color: theme.colors.text }}>Cargando películas...</p>
          </div>
        )}

        {filteredMovies.length === 0 && !loading && (
          <div className="text-center py-8 transition-colors duration-300" style={{ color: theme.colors.text }}>
            No se encontraron películas.
          </div>
        )}

        {/* Grid de películas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer transition-transform duration-300 hover:scale-105" onClick={() => handleMovieClick(movie)}>
              {/* Poster Container */}
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-3">
                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(movie.title);
                    }}
                  />
                ) : (
                  <div className="w-full h-72 md:h-80 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-center px-2 transition-colors duration-300" style={{ color: theme.colors.text + '80' }}>📁 {movie.title}</span>
                  </div>
                )}
                
                {/* Rating Badge */}
                <div 
                  style={{ backgroundColor: movie.bgColor || theme.colors.primary, color: theme.currentTheme === 'darkNeon' ? '#000' : '#fff' }}
                  className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded"
                >
                  {movie.rating}
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded transition-colors duration-300" style={{ backgroundColor: theme.colors.primary + 'cc' }}>
                  {movie.duration}
                </div>
              </div>

              {/* Movie Info */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm md:text-base line-clamp-2 transition-colors duration-300" style={{ color: theme.colors.text }}>
                  {movie.title}
                </h3>
                
                {/* Status Button */}
                <button 
                  className="w-full text-xs font-semibold py-2 px-3 rounded-full transition-colors text-white"
                  style={{
                    backgroundColor: movie.status === 'Estreno' ? theme.colors.primary : theme.colors.secondary,
                  }}
                >
                  {movie.status}
                </button>
                
                {/* Ver detalle link */}
                <a 
                  href={movie.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-medium hover:underline flex items-center gap-1 transition-colors duration-300"
                  style={{ color: theme.colors.primary }}
                >
                  Ver detalle
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayer 
        movie={selectedMovie} 
        isOpen={playerOpen} 
        onClose={handleClosePlayer}
      />
    </div>
  );
});

Movies.displayName = 'Movies';

export default Movies;
