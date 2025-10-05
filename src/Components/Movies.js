import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import SupermanPoster from "../Assets/SupermanPoster.jpg";
import Zootopia2 from "../Assets/Zootopia2.jpeg";
import Demonslayer from "../Assets/DemonSlayer.webp";
import Destinofinal from "../Assets/DestinoFinal.jpg";
import Avatar3 from "../Assets/Avatar3.jpg";


function Movies() {
  const movies = [
    {
      id:1,
      title:"Demon Slayer", 
      image: Demonslayer,
      rating: "B",
      duration: "99 min",
      status: "Estreno",
      bgColor: "bg-orange-500"
    },
    {
      id:2,
      title:"Zootopia 2", 
      image: Zootopia2,
      rating: "A",
      duration: "95 min",
      status: "Proximamente",
      bgColor: "bg-green-500"
    },
    {
      id:3,
      title:"Superman", 
      image: SupermanPoster,
      rating: "B",
      duration: "120 min",
      status: "Estreno",
      bgColor: "bg-yellow-500"
    },
    {
      id:4,
      title:"Avatar 3", 
      image: Avatar3,
      rating: "B",
      duration: "150 min",
      status: "Proximamente",
      bgColor: "bg-orange-500"
    },
    {
      id:5,
      title:"Destino Final: Lazos de Sangre", 
      image: Destinofinal,
      rating: "B-15",
      duration: "90 min",
      status: "Estreno",
      bgColor: "bg-red-500"
    }
  ];
  
return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-8">Cartelera</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              {/* Poster Container */}
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-3">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Rating Badge */}
                <div className={`absolute top-2 left-2 ${movie.bgColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {movie.rating}
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {movie.duration}
                </div>
              </div>

              {/* Movie Info */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm md:text-base text-gray-800 line-clamp-2">
                  {movie.title}
                </h3>
                
                {/* Status Button */}
                <button 
                  className={`w-full text-xs font-semibold py-2 px-3 rounded-full transition-colors ${
                    movie.status === 'Estreno' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  {movie.status}
                </button>
                
                {/* Ver detalle link */}
                <button className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1">
                  Ver detalle
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default Movies;
