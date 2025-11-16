import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDoula } from "../../hooks/usePostDoula";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function CadastroDoula() {
  const navigate = useNavigate();
  const { cadastrarDoula, loading, erro } = useDoula();
  const { login } = useAuth();

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    // Validação básica
    if (!form.name || !form.email || !form.phone || !form.password) {
      setLoginError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Aguarda o cadastro ser concluído
      const resultado = await cadastrarDoula(form);
      console.log("Cadastro realizado:", resultado);
      
      // Aguarda um pequeno delay para garantir que o banco commitou
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Se chegou aqui, cadastro foi bem-sucedido
      try {
        await login(form.email, form.password);
        navigate("/home");
      } catch (loginErr) {
        console.error("Erro ao fazer login após cadastro:", loginErr);
        setLoginError("Cadastro realizado com sucesso! Faça login para continuar...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (cadastroErr) {
      console.error("Erro ao cadastrar:", cadastroErr);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-800 dark:text-yellow-300 mb-2">
            Cadastro de Doula
          </h1>
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            Preencha seus dados para começar a usar a plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
          
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-700"
              placeholder="Senha"
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-2"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && (
            <div
              role="alert"
              className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm"
            >
              {erro}
            </div>
          )}

          {loginError && (
            <div
              role="alert"
              className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-3 rounded-lg text-sm"
            >
              {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center text-sm space-y-2">
          <p className="text-gray-700 dark:text-gray-200">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-purple-800 dark:text-yellow-300 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
            >
              Fazer login
            </Link>
          </p>
          <Link
            to="/"
            className="block text-purple-800 dark:text-yellow-300 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm transition"
          >
            ← Voltar para a escolha de perfil
          </Link>
        </div>
      </div>
    </div>
  );
}