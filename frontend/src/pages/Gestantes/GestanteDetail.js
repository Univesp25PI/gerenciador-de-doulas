import React from 'react';
import { useParams } from 'react-router-dom';
import { useGestante } from '../../hooks/useGestante';
import Avatar from '../../components/Avatar';

function GestanteDetail() {
  const { id } = useParams();
  const { gestante, loading, error } = useGestante(id);
  console.log("info_gestante", gestante)
  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl space-y-6">
        {gestante && (
          <>
            {/* Avatar e Nome */}
            <div className="flex items-center gap-4">
              <Avatar nome={gestante.nome} size="w-16 h-16" />
              <div>
                <h1 className="text-2xl font-bold text-purple-700">{gestante.nome}</h1>
                <p className="text-gray-500 text-sm">ID #{gestante.id}</p>
              </div>
            </div>

            {/* Detalhes principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <Detail label="Idade" value={gestante.idade} />
              <Detail label="Semana Gestacional" value={gestante.semana_gestacao} />
              <Detail label="Previsão de Parto" value={gestante.previsao_parto} />
              <Detail label="Comorbidades" value={gestante.comorbidades || 'Nenhuma'} />
            </div>

            {/* Timestamps (opcional) */}
            <div className="text-xs text-gray-400 text-right">
              Criada em {formatDate(gestante.create_date)} • Atualizada em {formatDate(gestante.update_date)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 🔹 Subcomponente de linha de detalhe
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

// 🔹 Formatador de data simples (ex: 24/03/2025)
function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("pt-BR");
}

export default GestanteDetail;