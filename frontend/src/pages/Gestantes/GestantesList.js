import { useGestantes } from "../../hooks/useGestantes";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function GestantesList() {
  const { gestantes, loading, error } = useGestantes();
  const [currentPage, setCurrentPage] = useState(1);
  const gestantesPerPage = 5;

  const doula = JSON.parse(localStorage.getItem("doula_logada") || "null");
  const doulaId = doula?.id;

  const minhasGestantes = gestantes?.filter((g) => g.id_doula === doulaId) || [];

  if (loading)
    return <div className="p-6 text-purple-600 text-center">Carregando gestantes...</div>;
  if (error)
    return <div className="p-6 text-red-600 text-center">{error}</div>;

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
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          Minhas Gestantes
        </h1>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Nome</th>
                <th className="px-4 py-3 text-left">Idade</th>
                <th className="px-4 py-3 text-left">Semana</th>
                <th className="px-4 py-3 text-left">Previsão de parto</th>
                <th className="px-4 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
              {currentGestantes.map((g) => (
                <tr key={g.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-2 font-medium">{g.name}</td>
                  <td className="px-4 py-2">{g.age}</td>
                  <td className="px-4 py-2">{g.pregnancy_week}</td>
                  <td className="px-4 py-2">{formatDate(g.birth_forecast)}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/gestantes/${g.id}`}
                      className="text-purple-600 hover:underline"
                    >
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

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}
