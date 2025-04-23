import React from "react";
import { useParams } from "react-router-dom";
import { useAula } from "../../hooks/useAula";
import { useGestante } from "../../hooks/useGestante";

function AulaDetail() {
  const { id } = useParams();
  const { aula, loading, error } = useAula(id);

  const {
    gestante,
    loading: loadingGestante,
    error: errorGestante,
  } = useGestante(aula?.id_gestante);

  if (loading || loadingGestante) return <div className="p-6">Carregando aula e gestante...</div>;
  if (error || errorGestante) return <div className="p-6 text-red-600">{error || errorGestante}</div>;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl space-y-6">
        {aula && (
          <>
            <h1 className="text-2xl font-bold text-purple-700">Aula #{aula.numero_aula}</h1>
            <p className="text-gray-500 text-sm">{aula.tipo_aula}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <Detail label="Data e Hora" value={formatDateTime(aula.data_aula)} />
              <Detail label="Semana Gestacional" value={aula.semana_gestacional} />
              <Detail label="Tipo da Aula" value={aula.tipo_aula} />
            </div>

            {gestante && (
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold text-purple-600 mb-2">Participante</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <Detail label="Nome" value={gestante.nome} />
                  <Detail label="Idade" value={gestante.idade} />
                  <Detail label="Primeira Gestação" value={gestante.primeira_gestacao ? "Sim" : "Não"} />
                  <Detail label="Previsão de Parto" value={gestante.previsao_parto} />
                  <Detail label="Comorbidades" value={gestante.comorbidades || "Nenhuma"} />
                </div>
              </div>
            )}

            <div className="mt-4">
            <a
              href={`https://reuniao.fake.com/aula/${aula.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-blue-100 text-blue-700 border border-blue-300 rounded-md hover:bg-blue-200 transition text-sm font-medium"
            >
              🔗 Acessar reunião online
            </a>
            </div>

            <div className="text-xs text-gray-400 text-right">
              Criada em {formatDate(aula.create_date)} • Atualizada em {formatDate(aula.update_date)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("pt-BR");
}

function formatDateTime(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("pt-BR");
}

export default AulaDetail;
