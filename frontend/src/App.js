import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GestanteDetail from './pages/Gestantes/GestanteDetail';  // Import the Doulas List page
import NovaGestante from './pages/Gestantes/NovaGestante';  // Import the Doulas List page
import Navbar from "./components/Navbar";
import NovaAula from './pages/Aulas/NovaAula';  // Import the Doulas List page
import GestantesList from "./pages/Gestantes/GestantesList";
import AulasList from "./pages/Aulas/AulasList";
import AulaDetail from "./pages/Aulas/AulaDetail";

function App() {
return (
  <>
  <Navbar />
  <Routes>
    
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/gestantes/:id" element={<GestanteDetail />} /> 
    <Route path="/gestantes/nova" element={<NovaGestante />} /> 
    <Route path="/aulas/nova" element={<NovaAula />} /> 
    <Route path="/gestantes" element={<GestantesList />} />
    <Route path="/aulas" element={<AulasList />} />
    <Route path="/aulas/:id" element={<AulaDetail />} />

  </Routes>
  </>
);
}

export default App;