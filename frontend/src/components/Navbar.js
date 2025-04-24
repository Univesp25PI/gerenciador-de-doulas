import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/gestantes", label: "Gestantes" },
    { to: "/aulas", label: "Aulas" },
    { to: "/about", label: "Sobre Mim" },
  ];

  return (
    <nav className="bg-purple-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">Gestante+</Link>

        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`sm:flex gap-6 ${menuOpen ? "block mt-4" : "hidden"} sm:mt-0 sm:block`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block sm:inline-block py-2 sm:py-0 hover:text-purple-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}