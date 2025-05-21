import { Link } from "react-router-dom";
import { Baby, HeartPulse } from "lucide-react";

export default function EscolherPerfil() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
            Bem-vinda!
          </h1>
          <p className="text-gray-600">
            Escolha o seu perfil para começar sua jornada no nosso espaço de acolhimento.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="/cadastro-doula"
            className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-purple-700 transition"
          >
            <HeartPulse className="w-5 h-5" />
            Sou Doula
          </Link>
          <Link
            to="/cadastro-gestante"
            className="flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-full text-lg font-medium hover:bg-purple-50 transition"
          >
            <Baby className="w-5 h-5" />
            Sou Gestante
          </Link>
        </div>

        <div className="text-sm text-gray-500 pt-2">
          Já tem uma conta?{" "}
        <Link to="/login-fake" className="text-purple-600 hover:underline">
          Faça login aqui
        </Link>
        </div>
      </div>
    </div>
  );
}
