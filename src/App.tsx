import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from './Pages/Login';
import Home from "./Pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
