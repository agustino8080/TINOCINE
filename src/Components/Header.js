import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SupermanPoster from "../Assets/SupermanPoster.jpg";
import Zootopia2 from "../Assets/Zootopia2.jpeg";
import Palomitas from "../Assets/Popcorns.png";


function Header() {
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
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 h-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">SUPERMAN</h2>
              <p className="mb-4">Del director de Guardianes de la Galaxia y The Suicide Squad, llega SUPERMAN.</p>
              <button className="bg-blue-700 px-4 py-2 rounded-md">
                Comprar tickets
              </button>
            </div>
            <img
              src={SupermanPoster}
              alt="SUPERMAN"
              className=" rounded-lg shadow-lg max-h-[450px] transition-opacity duration-1000 ease-in"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 h-full bg-gradient-to-r from-purple-600 to-pink-400 text-white px-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">ZOOTOPIA 2</h2>
              <p className="mb-4">Judy y Nick regresan en una nueva aventura para resolver un nuevo misterio</p>
              <button className="bg-purple-700 px-4 py-2 rounded-md">
                Comprar tickets
              </button>
            </div>
            <img
              src={Zootopia2}
              alt="Zootopia"
              className="rounded-lg shadow-lg max-h-[450px]"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 h-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Combo Pa´compartir</h2>
              <p className="mb-4">Descubre las nuevas promociones de palomitas.</p>
              <button className="bg-orange-700 px-4 py-2 rounded-md">
                Comprar tickets
              </button>
            </div>
            <img
              src={Palomitas}
              alt="Palomitas :D"
              className="rounded-lg shadow-lg max-h-[500px] transition-opacity duration-1000 ease-in"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Header;
