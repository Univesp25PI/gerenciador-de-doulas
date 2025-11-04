import { Link } from "react-router-dom";
import { Baby, HeartPulse } from "lucide-react";

export default function EscolherPerfil() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-900 dark:to-gray-950 transition-colors">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center space-y-8 border border-gray-300 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-800 dark:text-yellow-300 mb-2">
            Bem-vinda!
          </h1>
          <p className="text-gray-700 dark:text-gray-200">
            Escolha o seu perfil para começar sua jornada no nosso espaço de acolhimento.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Botão Doula */}
          <Link
            to="/cadastro-doula"
            className="flex items-center justify-center gap-2 bg-purple-800 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
          >
            <HeartPulse className="w-5 h-5" aria-hidden="true" />
            <span>Sou Doula</span>
          </Link>

          {/* Botão Gestante */}
          <Link
            to="/cadastro-gestante"
            className="flex items-center justify-center gap-2 border-2 border-purple-800 text-purple-800 dark:border-yellow-300 dark:text-yellow-300 py-3 px-6 rounded-full text-lg font-semibold hover:bg-purple-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
          >
            <Baby className="w-5 h-5" aria-hidden="true" />
            <span>Sou Gestante</span>
          </Link>
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-200 pt-2">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-purple-900 dark:text-yellow-300 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
          >
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
