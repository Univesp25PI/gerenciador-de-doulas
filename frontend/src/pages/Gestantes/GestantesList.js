import { useGestantes } from "../../hooks/useGestantes";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { routes } from "../../routes";
import { useAuth } from "../../contexts/AuthContext";

export default function GestantesList() {
  const { gestantes, loading, error } = useGestantes();
  const { doula, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const gestantesPerPage = 5;

  // Redireciona se não houver doula logada
  useEffect(() => {
    if (!authLoading && !doula) {
      navigate("/login");
    }
  }, [doula, authLoading, navigate]);

  const minhasGestantes = gestantes?.filter((g) => g.doula?.id === doula?.id) || [];

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium text-lg">Carregando gestantes...</p>
          <p className="text-gray-500 text-sm mt-2">Aguarde enquanto buscamos seus dados</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao Carregar</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              Recarregar Página
            </button>
            <Link
              to="/home"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition text-center"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (minhasGestantes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nenhuma Gestante Cadastrada</h2>
          <p className="text-gray-600 mb-6">
            Você ainda não possui gestantes cadastradas em seu perfil.
          </p>
          <Link
            to={routes.novaGestante}
            className="inline-block bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-medium"
          >
            + Cadastrar Primeira Gestante
          </Link>
          <Link
            to="/home"
            className="block mt-3 text-purple-600 hover:underline text-sm"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  // Success state with data
  const totalPages = Math.ceil(minhasGestantes.length / gestantesPerPage);
  const startIndex = (currentPage - 1) * gestantesPerPage;
  const currentGestantes = minhasGestantes.slice(startIndex, startIndex + gestantesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-700">
              Minhas Gestantes
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {minhasGestantes.length} {minhasGestantes.length === 1 ? 'gestante cadastrada' : 'gestantes cadastradas'}
            </p>
          </div>
          <Link
            to={routes.novaGestante}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg text-center font-medium"
          >
            + Nova Gestante
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Nome</th>
                <th className="px-4 py-3 text-left">Idade</th>
                <th className="px-4 py-3 text-left">Semana</th>
                <th className="px-4 py-3 text-left">Previsão de Parto</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-800 bg-white">
              {currentGestantes.map((g) => (
                <tr key={g.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3 font-medium">{g.name}</td>
                  <td className="px-4 py-3">{g.age} anos</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {g.pregnancy_week}ª semana
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(g.birth_forecast)}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={routes.detalheGestante(g.id)}
                      className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                    >
                      Ver detalhes →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Anterior
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white font-medium"
                      : "border border-purple-300 hover:bg-purple-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm border border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Próxima →
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/home"
            className="text-purple-600 hover:underline text-sm"
          >
            ← Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "Não informado";
  try {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  } catch (error) {
    return "Data inválida";
  }
}
