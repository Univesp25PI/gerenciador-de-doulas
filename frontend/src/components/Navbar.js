import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png"; // ajuste o caminho se necessário

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const doulaLogada = JSON.parse(localStorage.getItem("doula_logada") || "null");

  const links = [
    { to: "/gestantes", label: "Gestantes" },
    { to: "/aulas", label: "Aulas" },
    { to: "/about", label: "Sobre Mim" },
  ];

  const handleLogoClick = () => {
    navigate(doulaLogada ? "/home" : "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("doula_logada");
    navigate("/");
  };

  return (
    <nav className="bg-purple-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-2 text-white font-bold text-xl hover:text-purple-300 transition"
      >
        <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
        <span className="hidden sm:inline">Gestante+</span>
      </button>

        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu principal em telas grandes */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-purple-300 transition"
            >
              {link.label}
            </Link>
          ))}
          {doulaLogada && (
            <button
              onClick={handleLogout}
              className="bg-white text-purple-700 font-medium px-3 py-1 rounded hover:bg-purple-100 transition"
            >
              Sair
            </button>
          )}
        </div>
      </div>

      {/* Menu animado no mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden bg-purple-700 px-4 pb-4 flex flex-col gap-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-purple-200 transition"
              >
                {link.label}
              </Link>
            ))}
            {doulaLogada && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-white hover:text-red-200 transition text-left"
              >
                Sair
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

