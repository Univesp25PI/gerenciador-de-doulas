import { useGestantes } from "../hooks/useGestantes";
import { useAulas } from "../hooks/useAulas";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { getClassTypeLabel } from "../constants/classTypes";

export default function Home() {
  const { gestantes } = useGestantes();
  const { aulas } = useAulas();

  const doula = JSON.parse(localStorage.getItem("doula_logada") || "null");
  const doulaId = doula?.id;

  // Filtrar apenas os dados da doula logsada
  const minhasGestantes = gestantes?.filter((g) => g.id_doula === doulaId) || [];
  const minhasAulas = aulas?.filter((aula) => {
    const gestante = gestantes.find((g) => g.id === aula.id_pregnant);
    return gestante?.id_doula === doulaId;
  }) || [];
  const totalGestantes = minhasGestantes.length;
  const totalAulas = minhasAulas.length;

  const proximaAula = minhasAulas
    .slice()
    .sort((a, b) => new Date(a.class_date) - new Date(b.class_date))[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700">
            Bem-vinda, {doula?.name || "Doula"}!
          </h1>
          <p className="text-gray-600 mt-1">Aqui está o resumo das suas gestantes e aulas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Gestantes</p>
            <p className="text-3xl font-bold text-purple-700">{totalGestantes}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Aulas Marcadas</p>
            <p className="text-3xl font-bold text-purple-700">{totalAulas}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Próxima Aula</p>
            <p className="text-md text-purple-800 font-semibold">
              {proximaAula
                ? new Date(proximaAula.class_date).toLocaleString()
                : "Nenhuma"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Próximas Aulas</h2>
          {minhasAulas.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma aula agendada ainda.</p>
          ) : (
            <ul className="space-y-3">
              {minhasAulas.slice(0, 3).map((aula) => (
                <li key={aula.id} className="p-4 bg-white rounded shadow border">
                  <p className="font-medium">
                    <strong>{aula.class_type}</strong> —{" "}
                    {new Date(aula.class_date).toLocaleString("pt-BR")}
                  </p>
                  <Link
                    to={routes.detalheAula(aula.id)}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Ver detalhes
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={routes.novaGestante}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg text-center font-medium"
          >
            Nova Gestante
          </Link>
          <Link
            to={routes.novaAula}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg text-center font-medium"
          >
            Nova Aula
          </Link>
        </div>
      </div>
    </div>
  );
}
