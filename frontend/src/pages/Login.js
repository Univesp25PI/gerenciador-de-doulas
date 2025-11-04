import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError(err.message || "Email ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 dark:text-yellow-300">
            Login
          </h1>
          <p className="text-gray-700 dark:text-gray-200 mt-2">
            Acesse sua conta
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          {error && (
            <div
              className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Campo de email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsReady(true)}
              required
              readOnly={!isReady}
              autoComplete="email"
              className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="seu@email.com"
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                readOnly={!isReady}
                autoComplete="current-password"
                className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Senha"
              />

              {/* Botão de alternar visibilidade */}
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-purple-800 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-2"
                style={{ minWidth: "44px", minHeight: "44px" }} // área de toque mínima
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="text-sm text-center pt-2 text-gray-700 dark:text-gray-200">
          <p>
            Ainda não tem cadastro?{" "}
            <a
              href="/cadastro-doula"
              className="text-purple-900 dark:text-yellow-300 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
