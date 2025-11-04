import { Link } from "react-router-dom";
import { useAulas } from "../../hooks/useAulas";
import { useGestantes } from "../../hooks/useGestantes";
import { getClassTypeLabel } from "../../constants/classTypes";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AulasList() {
  const { aulas } = useAulas();
  const { gestantes } = useGestantes();
  const { doula, loading, error, logout } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const aulasPerPage = 5;

  // Redireciona se não houver doula logada
  useEffect(() => {
    if (!loading && !doula) {
      window.location.href = "/login";
    }
  }, [doula, loading]);

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
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Nenhuma doula logada
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "Volte e faça login."}
          </p>
          <a
            href="/login"
            className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  // Filtra gestantes da doula logada
  const gestantesDaDoula = gestantes?.filter(
    (g) => g.doula?.id === doula?.id
  ) || [];
  const idsGestantes = gestantesDaDoula.map(g => g.id);

  // Filtra aulas cujas gestantes pertencem à doula
  const aulasFiltradas = aulas?.filter(
    (aula) => idsGestantes.includes(aula.pregnant?.id)
  ) || [];

  const totalPages = Math.ceil(aulasFiltradas.length / aulasPerPage);
  const startIndex = (currentPage - 1) * aulasPerPage;
  const currentAulas = aulasFiltradas.slice(startIndex, startIndex + aulasPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-purple-700">Minhas Aulas</h1>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto text-sm text-gray-800 divide-y divide-gray-200">
            <thead className="bg-purple-100 text-gray-700 uppercase text-left">
              <tr>
                <th className="px-4 py-3">Gestante</th>
                <th className="px-4 py-3">Nº</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Semana</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentAulas.map((aula) => (
                <tr key={aula.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-2 font-medium">{aula.pregnant?.name}</td>
                  <td className="px-4 py-2">{aula.class_number}</td>
                  <td className="px-4 py-2">{getClassTypeLabel(aula.class_type)}</td>
                  <td className="px-4 py-2">{formatDate(aula.class_date)}</td>
                  <td className="px-4 py-2">{aula.pregnant?.pregnancy_week ?? "-"}</td>
                  <td className="px-4 py-2">
                    <Link to={`/aulas/${aula.id}`} className="text-purple-600 hover:underline">
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-purple-300 rounded hover:bg-purple-50 disabled:opacity-50"
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "border-purple-300 hover:bg-purple-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-purple-300 rounded hover:bg-purple-50 disabled:opacity-50"
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(dataStr) {
  if (!dataStr) return "-";
  return new Date(dataStr).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
