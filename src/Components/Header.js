import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Palomitas from "../Assets/Popcorns.png";
import { useTheme } from "../contexts/ThemeContext";

const GRADIENT_COLORS = {
  principal: [
    "from-blue-600 to-cyan-400",
    "from-purple-600 to-pink-400",
    "from-red-600 to-orange-400",
    "from-green-600 to-teal-400",
    "from-indigo-600 to-blue-400",
    "from-rose-600 to-pink-400",
  ],
  darkNeon: [
    "from-[#0a0e27] via-[#00ff88] to-[#00ffff]",
    "from-[#0a0e27] via-[#ff00ff] to-[#00ffff]",
    "from-[#0a0e27] via-[#00ff88] to-[#ff00ff]",
    "from-[#0a0e27] via-[#00ffff] to-[#00ff88]",
    "from-[#0a0e27] via-[#ff00ff] to-[#00ffff]",
    "from-[#0a0e27] via-[#00ff88] to-[#00ffff]",
  ],
  sunset: [
    "from-[#ff6b6b] to-[#ffa94d]",
    "from-[#ff922b] to-[#ff6b6b]",
    "from-[#ffa94d] to-[#ff922b]",
    "from-[#ff6b6b] to-[#ff922b]",
    "from-[#ffa94d] to-[#ff6b6b]",
    "from-[#ff922b] to-[#ffa94d]",
  ],
  forest: [
    "from-[#166534] to-[#22c55e]",
    "from-[#22c55e] to-[#86efac]",
    "from-[#16a34a] to-[#22c55e]",
    "from-[#86efac] to-[#22c55e]",
    "from-[#166534] to-[#86efac]",
    "from-[#22c55e] to-[#16a34a]",
  ],
};

function Header({ movies = [] }) {
  const { currentTheme } = useTheme();
  
  // Seleccionar 6 películas aleatorias del listado
  const randomMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [movies]);

  const gradients = GRADIENT_COLORS[currentTheme] || GRADIENT_COLORS.principal;

  return (
    <div className="w-full h-[700px] md:h-[500px] relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {/* Slides dinámicos de películas */}
        {randomMovies.map((movie, index) => {
          const titleLower = movie.title.toLowerCase();
          let description = 'Vive la experiencia del cine como nunca antes. ¡No te la pierdas!';
          
          if (titleLower.includes('acción') || titleLower.includes('marvel') || titleLower.includes('superhéroe') || titleLower.includes('batman') || titleLower.includes('superman')) {
            description = '¡Acción sin límites! Prepárate para una experiencia cinematográfica inolvidable.';
          } else if (titleLower.includes('comedia')) {
            description = '¡Que todos rían juntos! La mejor comedia de la temporada te espera.';
          } else if (titleLower.includes('terror') || titleLower.includes('horror') || titleLower.includes('miedo')) {
            description = '¡Miedo y suspenso garantizado! No es para los débiles de corazón.';
          } else if (titleLower.includes('romance') || titleLower.includes('amor')) {
            description = '¡Historias que conmueven el corazón! Trae a tu persona especial.';
          } else if (titleLower.includes('animad')) {
            description = '¡Diversión para toda la familia! Una aventura colorida te espera.';
          } else if (titleLower.includes('drama')) {
            description = '¡Emociones al máximo! Una historia que tocará profundamente tu alma.';
          } else if (titleLower.includes('aventura') || titleLower.includes('fantasía')) {
            description = '¡Sumérjete en mundos mágicos! Una aventura épica te aguarda.';
          }
          
          return (
            <SwiperSlide key={movie.id || index}>
              <div className={`flex flex-col md:flex-row items-center justify-center md:gap-6 h-full bg-gradient-to-r ${gradients[index % gradients.length]} text-white px-10 transition-all duration-300`}>
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                  <div className="text-sm text-white text-opacity-90 mb-3">
                    {movie.duration && <span>⏱️ {movie.duration}</span>}
                    {movie.rating && <span className="ml-3">📊 {movie.rating}</span>}
                  </div>
                  <p className="mb-4 text-base leading-relaxed">
                    {description}
                  </p>
                  <p className="text-sm mb-4 text-opacity-80 text-white">
                    {movie.status === 'Estreno' ? '🎬 Ahora en cartelera' : '⏰ Próximamente en cines'}
                  </p>
                  <button className="bg-white bg-opacity-20 px-4 py-2 rounded-md hover:bg-opacity-30 transition-all">
                    {movie.url ? '🎫 Ver más' : 'Comprar tickets'}
                  </button>
                </div>
              {movie.image && (
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="rounded-lg shadow-lg max-h-[450px] object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </SwiperSlide>
          );
        })}

        {/* Slide Combo Palomitas */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 h-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">🍿 Combo Pa´compartir</h2>
              <p className="mb-4">Descubre las nuevas promociones de palomitas y bebidas.</p>
              <button className="bg-orange-700 px-4 py-2 rounded-md hover:bg-orange-800 transition-colors">
                Comprar ahora
              </button>
            </div>
            <img
              src={Palomitas}
              alt="Palomitas :D"
              className="rounded-lg shadow-lg max-h-[500px]"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Header;
