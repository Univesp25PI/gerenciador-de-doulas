import { Link } from "react-router-dom";
import { useAulas } from "../../hooks/useAulas";
import { useGestantes } from "../../hooks/useGestantes";
import { useState } from "react";

export default function AulasList() {
  const { aulas, loadingAula, errorAula } = useAulas();
  const { gestantes, loadingGestante, errorGestante } = useGestantes();

  const [currentPage, setCurrentPage] = useState(1);
  const aulasPerPage = 5;

  if (loadingAula || loadingGestante) return <div className="p-6">Carregando aulas...</div>;
  if (errorAula || errorGestante)
    return <div className="p-6 text-red-600">{errorAula || errorGestante}</div>;

  const getGestanteNome = (id) => {
    const g = gestantes.find((g) => g.id === id);
    return g ? g.nome : `#${id}`;
  };

  const totalPages = Math.ceil(aulas.length / aulasPerPage);
  const startIndex = (currentPage - 1) * aulasPerPage;
  const currentAulas = aulas.slice(startIndex, startIndex + aulasPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Minhas Aulas</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-purple-100 text-gray-600 uppercase text-left">
            <tr>
              <th className="px-4 py-3">Gestante</th>
              <th className="px-4 py-3">Nº</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentAulas.map((aula) => (
              <tr key={aula.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{getGestanteNome(aula.id_gestante)}</td>
                <td className="px-4 py-2">{aula.numero_aula}</td>
                <td className="px-4 py-2">{formatTipo(aula.tipo_aula)}</td>
                <td className="px-4 py-2">{formatDate(aula.data_aula)}</td>
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

function formatTipo(tipo) {
  const map = {
    PreNatal: "Pré-natal",
    Amamentacao: "Amamentação",
    Parto: "Plano de Parto",
  };
  return map[tipo] || tipo;
}

function formatDate(dataStr) {
  if (!dataStr) return "-";
  return new Date(dataStr).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}