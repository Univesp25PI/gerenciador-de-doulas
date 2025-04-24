import { useGestantes } from "../../hooks/useGestantes";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function GestantesList() {
  const { gestantes, loading, error } = useGestantes();
  const [currentPage, setCurrentPage] = useState(1);
  const gestantesPerPage = 5;

  if (loading) return <div className="p-6">Carregando gestantes...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const totalPages = Math.ceil(gestantes.length / gestantesPerPage);
  const startIndex = (currentPage - 1) * gestantesPerPage;
  const currentGestantes = gestantes.slice(startIndex, startIndex + gestantesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Minhas Gestantes</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-purple-100 text-left text-sm uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Idade</th>
              <th className="px-4 py-3">Semana</th>
              <th className="px-4 py-3">Previsão de parto</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
            {currentGestantes.map((g) => (
              <tr key={g.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{g.nome}</td>
                <td className="px-4 py-2">{g.idade}</td>
                <td className="px-4 py-2">{g.semana_gestacional || g.semana_gestacao}</td>
                <td className="px-4 py-2">{formatDate(g.previsao_parto)}</td>
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
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 text-sm border rounded ${
              currentPage === i + 1 ? "bg-purple-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}