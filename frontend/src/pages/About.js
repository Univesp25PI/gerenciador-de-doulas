import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { doula, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  // Redireciona se não houver doula logada
  React.useEffect(() => {
    if (!loading && !doula) {
      navigate("/login");
    }
  }, [doula, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!doula) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erro ao Carregar</h2>
          <p className="text-gray-600 mb-4">{error || "Nenhuma doula logada. Volte e faça login."}</p>
          <button
            onClick={() => navigate("/login")}
            className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar nome={doula.name} size="w-28 h-28" />
          <h1 className="text-2xl font-bold text-purple-700 mt-2">{doula.name}</h1>
          <p className="text-sm text-gray-500">Meu Perfil</p>
        </div>

        <div className="space-y-3 text-gray-700 text-sm">
          {doula.phone && (
            <div className="flex justify-between">
              <span className="font-medium">Telefone:</span>
              <span>
                ({doula.phone?.slice(0, 2)}) {doula.phone?.slice(2, 7)}-{doula.phone?.slice(7)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="truncate">{doula.email}</span>
          </div>

          {doula.create_date && (
            <div className="flex justify-between">
              <span className="font-medium">Associada desde:</span>
              <span>{new Date(doula.create_date).toLocaleDateString("pt-BR")}</span>
            </div>
          )}

          {doula.update_date && (
            <div className="flex justify-between">
              <span className="font-medium">Última atualização:</span>
              <span>{new Date(doula.update_date).toLocaleDateString("pt-BR")}</span>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <button
            disabled
            className="w-full bg-purple-300 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-80"
            title="Ainda não implementado"
          >
            Editar perfil (em breve)
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            🔄 Atualizar Dados
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </div>
  );
}
