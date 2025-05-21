import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDoula } from "../../hooks/usePostDoula";

export default function CadastroDoula() {
  const navigate = useNavigate();
  const { cadastrarDoula, loading, erro } = useDoula();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cadastrarDoula(form, (novaDoula) => {
      // Armazena no localStorage
      localStorage.setItem("doula_logada", JSON.stringify(novaDoula));
      navigate("/home");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
            Cadastro de Doula
          </h1>
          <p className="text-gray-600 text-sm">
            Preencha seus dados para começar a usar a plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center text-sm">
          <Link
            to="/"
            className="text-purple-600 hover:underline transition"
          >
            ← Voltar para a escolha de perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
