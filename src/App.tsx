import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from './Pages/Login';
import Home from "./Pages/Home";


function App() {
  return (
    <Router basename="/cinewatch">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
