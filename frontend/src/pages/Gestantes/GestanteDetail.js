import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGestante } from '../../hooks/useGestante';
import Avatar from '../../components/Avatar';
import { getComorbidityLabel } from '../../constants/comorbidities';

function GestanteDetail() {
  const { id } = useParams();
  const { gestante, loading, error } = useGestante(id);

  if (loading)
    return <div className="p-6 text-purple-600 text-center text-lg">Carregando dados da gestante...</div>;
  if (error)
    return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">

        {/* Avatar + Nome */}
        <div className="flex items-center gap-4">
          <Avatar nome={gestante.name} size="w-20 h-20" />
          <div>
            <h1 className="text-3xl font-extrabold text-purple-700">{gestante.name}</h1>
            <p className="text-gray-500 text-sm">ID #{gestante.id}</p>
          </div>
        </div>

        {/* Informações principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Detail label="Idade" value={gestante.age} />
          <Detail label="Semana Gestacional" value={gestante.pregnancy_week} />
          <Detail label="Previsão de Parto" value={formatDate(gestante.birth_forecast)} />
          <Detail label="Primeira gestação?" value={gestante.first_pregnancy ? "Sim" : "Não"} />
          <Detail label="E-mail" value={gestante.email} />
          <Detail label="Telefone" value={formatPhone(gestante.phone)} />
        </div>

        {/* Comorbidades */}
        <div>
          <p className="text-gray-500 font-medium mb-1">Comorbidades</p>
          {gestante.comorbidities?.length ? (
            <div className="flex flex-wrap gap-2">
              {gestante.comorbidities.map((c) => (
                <span
                  key={c}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm animate-fade-in"
                >
                  {getComorbidityLabel(c)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">Nenhuma</p>
          )}
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-400 border-t pt-4 text-right">
          Criada em {formatDate(gestante.create_date)} • Atualizada em {formatDate(gestante.update_date)}
        </div>

        {/* Voltar */}
        <div className="text-center">
          <Link
            to="/gestantes"
            className="inline-block mt-4 text-purple-600 hover:underline text-sm"
          >
            ← Voltar para a lista de gestantes
          </Link>
        </div>
      </div>
    </div>
  );
}

// Subcomponente reutilizável
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value || "-"}</p>
    </div>
  );
}

// Formatadores
function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("pt-BR");
}

function formatPhone(phone) {
  if (!phone) return "-";
  const match = phone.match(/^(\d{2})(\d{5})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
}

export default GestanteDetail;
