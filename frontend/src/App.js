import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GestanteDetail from './pages/Gestantes/GestanteDetail'; 
import NovaGestante from './pages/Gestantes/NovaGestante'; 
import Navbar from "./components/Navbar";
import NovaAula from './pages/Aulas/NovaAula'; 
import GestantesList from "./pages/Gestantes/GestantesList";
import AulasList from "./pages/Aulas/AulasList";
import AulaDetail from "./pages/Aulas/AulaDetail";
import EscolherPerfil from "./pages/EscolherPerfil";
import CadastroDoula from "./pages/Doula/CadastroDoula";
import CadastroGestante from './pages/Gestantes/CadastroGestante';
import LoginFake from './pages/LoginFake'; 

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/cadastro-doula', '/cadastro-gestante', '/login-fake'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<EscolherPerfil />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-doula" element={<CadastroDoula />} />
        <Route path="/cadastro-gestante" element={<CadastroGestante />} />
        <Route path="/login-fake" element={<LoginFake />} />
 
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