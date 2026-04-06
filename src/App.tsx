import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from './Pages/Login';
import Home from "./Pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";


function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/' : '/cinewatch';
  
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
