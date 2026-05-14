import { useGestantes } from "../hooks/useGestantes";
import { useAulas } from "../hooks/useAulas";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function Home() {
  const { gestantes } = useGestantes();
  const { aulas } = useAulas();

  const totalGestantes = gestantes?.length || 0;
  const totalAulas = aulas?.length || 0;

  const proximaAula = aulas?.slice().sort((a, b) => new Date(a.data_aula) - new Date(b.data_aula))[0];

  const formatTipoAula = (tipo) => {
    const map = {
      OBSTETRIC_INTERVENTIONS: "Intercorrências Obstétricas",
      BIRTH_PHYSIOLOGY: "Pré-natal",
      NEWBORN_RECEPTION: "Recepção do Recém-nascido",
      PREGNANCY_OVERVIEW: "Visão Geral da Gestação",
      CESAREAN_OVERVIEW: "Visão Geral da Cesárea",
      BREASTFEEDING_AND_PUERPERIUM: "Amamentação e Puerpério",
      NEST_PREPARATION: "Preparação do Ninho",
      PAIN_RELIEF_METHODS: "Amamentação",
      PAIN_MANAGEMENT: "Plano de Parto",
      AulaTypeEnum: "Aula Planejada", // Fallback for the mock
    };
    return map[tipo] || tipo;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bem-vinda, Doula!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-sm">Gestantes</p>
          <p className="text-xl font-bold">{totalGestantes}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-sm">Aulas Marcadas</p>
          <p className="text-xl font-bold">{totalAulas}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-sm">Próxima Aula</p>
          <p className="text-md">
            {proximaAula ? new Date(proximaAula.data_aula).toLocaleString() : "Nenhuma"}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-4 mb-2">Próximas Aulas</h2>
        <ul className="space-y-2">
          {aulas?.slice(0, 3).map((aula) => (
            <li key={aula.id} className="p-3 border rounded">
              <p><strong>{formatTipoAula(aula.tipo_aula)}</strong> — {new Date(aula.data_aula).toLocaleString()}</p>
              <Link to={routes.detalheAula(aula.id)} className="text-sm text-purple-600 underline">
                Ver detalhes
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 mt-6">
        <Link to={routes.novaGestante} className="bg-purple-600 text-white px-4 py-2 rounded">
          Nova Gestante
        </Link>
        <Link to={routes.novaAula} className="bg-purple-600 text-white px-4 py-2 rounded">
          Nova Aula
        </Link>
      </div>
    </div>
  );
}
