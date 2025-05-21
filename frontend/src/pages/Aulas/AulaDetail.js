import React from "react";
import { useParams } from "react-router-dom";
import { useAula } from "../../hooks/useAula";
import { useGestante } from "../../hooks/useGestante";
import { getClassTypeLabel } from "../../constants/classTypes";
import Avatar from "../../components/Avatar";

function AulaDetail() {
  const { id } = useParams();
  const { aula, loading, error } = useAula(id);

  const shouldLoadGestante = !!aula?.id_pregnant;
  const {
    gestante,
    loading: loadingGestante,
    error: errorGestante,
  } = useGestante(shouldLoadGestante ? aula.id_pregnant : null);

  if (loading || (shouldLoadGestante && loadingGestante)) {
    return <div className="p-6 text-purple-600 text-center">Carregando aula e gestante...</div>;
  }

  if (error || errorGestante) {
    return <div className="p-6 text-red-600 text-center">{error || errorGestante}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex justify-center items-start p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl space-y-6">
        {/* Título da Aula */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-purple-700">
            Aula #{aula.class_number}
          </h1>
          <span className="text-sm text-white bg-purple-500 px-3 py-1 rounded-full">
            {getClassTypeLabel(aula.class_type)}
          </span>
        </div>

        {/* Info da Aula */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <Detail label="Data e Hora" value={formatDateTime(aula.class_date)} />
          <Detail label="Semana Gestacional" value={aula.pregnant_week || "-"} />
          <Detail label="Última Menstruação" value={formatDate(aula.lmp_date)} />
          <Detail label="Tipo da Aula" value={getClassTypeLabel(aula.class_type)} />
        </div>

        {/* Info da Gestante */}
        {gestante && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar nome={gestante.name} size="w-14 h-14" />
              <div>
                <h2 className="text-xl font-bold text-purple-600">{gestante.name}</h2>
                <p className="text-sm text-gray-500">Participante da aula</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <Detail label="Idade" value={gestante.age} />
              <Detail label="Previsão de Parto" value={formatDate(gestante.birth_forecast)} />
              <Detail label="Primeira Gestação" value={gestante.first_pregnancy ? "Sim" : "Não"} />
              <Detail
                label="Comorbidades"
                value={
                  Array.isArray(gestante.comorbidities) && gestante.comorbidities.length > 0
                    ? gestante.comorbidities.join(", ")
                    : "Nenhuma"
                }
              />
            </div>
          </div>
        )}

        {/* Link de Reunião */}
        <div className="text-center mt-4">
          <a
            href={`https://reuniao.fake.com/aula/${aula.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
          >
            🔗 Acessar Reunião Online
          </a>
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-400 text-right pt-4 border-t">
          Criada em {formatDate(aula.create_date)} • Atualizada em {formatDate(aula.update_date)}
        </div>
      </div>
    </div>
  );
}

// Subcomponente de detalhe visual
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

// Helpers de data
function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("pt-BR");
}

export default AulaDetail;