import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Movies";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Movies from "../Components/Movies";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Header />
      <Movies/>
      <Footer />
    </div>
  );
}

export default Home;
