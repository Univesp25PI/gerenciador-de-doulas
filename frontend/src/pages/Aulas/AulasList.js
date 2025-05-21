import { Link } from "react-router-dom";
import { useAulas } from "../../hooks/useAulas";
import { useGestantes } from "../../hooks/useGestantes";
import { getClassTypeLabel } from "../../constants/classTypes";
import { useState } from "react";

export default function AulasList() {
  const { aulas, loadingAula, errorAula } = useAulas();
  const { gestantes, loadingGestante, errorGestante } = useGestantes();

  const [currentPage, setCurrentPage] = useState(1);
  const aulasPerPage = 5;

  const doulaRaw = localStorage.getItem("doula_logada");
  const doula = doulaRaw ? JSON.parse(doulaRaw) : null;
  const idDoula = doula?.id;

  if (loadingAula || loadingGestante)
    return <div className="p-6 text-purple-600 text-center">Carregando aulas...</div>;

  if (errorAula || errorGestante)
    return <div className="p-6 text-red-600 text-center">{errorAula || errorGestante}</div>;

  const getGestanteNome = (idPregnant) => {
    const g = gestantes.find((g) => g.id === idPregnant);
    return g?.name || g?.nome || `#${idPregnant}`;
  };

  // Filtra as gestantes da doula logada
  const gestantesDaDoula = gestantes.filter(g => g.id_doula === idDoula);
  const idsGestantes = gestantesDaDoula.map(g => g.id);

  // Filtra as aulas cujas gestantes pertencem à doula
  const aulasFiltradas = aulas.filter(aula => idsGestantes.includes(aula.id_pregnant));

  const totalPages = Math.ceil(aulasFiltradas.length / aulasPerPage);
  const startIndex = (currentPage - 1) * aulasPerPage;
  const currentAulas = aulasFiltradas.slice(startIndex, startIndex + aulasPerPage);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">Minhas Aulas</h1>

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
                  <td className="px-4 py-2 font-medium">{getGestanteNome(aula.id_pregnant)}</td>
                  <td className="px-4 py-2">{aula.class_number}</td>
                  <td className="px-4 py-2">{getClassTypeLabel(aula.class_type)}</td>
                  <td className="px-4 py-2">{formatDate(aula.class_date)}</td>
                  <td className="px-4 py-2">{aula.pregnant_week || "-"}</td>
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
