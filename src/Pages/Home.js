import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Movies from "../Components/Movies";
import { fetchMovies } from "../services/movieService";

function Home() {
  const [movies, setMovies] = useState([]);
  const moviesRef = useRef(null);

  // Cargar películas al montar Home
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        if (moviesData && moviesData.length > 0) {
          setMovies(moviesData);
        }
      } catch (err) {
        console.error('Error cargando películas:', err);
      }
    };

    loadMovies();
  }, []);

  const handleMainClick = () => {
    if (moviesRef.current) {
      moviesRef.current.handleMainClick();
    }
  };

  const handleSortAZ = () => {
    if (moviesRef.current) {
      moviesRef.current.handleSortAZ();
    }
  };

  const handleSortByYear = () => {
    if (moviesRef.current) {
      moviesRef.current.handleSortByYear();
    }
  };

  return (
    <div className="home-section">
      <Navbar 
        onMainClick={handleMainClick}
        onSortAZ={handleSortAZ}
        onSortByYear={handleSortByYear}
      />
      <Header movies={movies} />
      <Movies ref={moviesRef} />
      <Footer />
    </div>
  );
}

export default Home;
