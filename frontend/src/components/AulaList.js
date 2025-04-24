import React from 'react';
import { useAulas } from '../hooks/useAulas';

const AulaList = () => {
  const { aulas, loading, error } = useAulas();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1>Aulas</h1>
      <ul>
        {aulas.map((aula) => (
          <li key={aula.id}>
            <p><strong>Data da Aula:</strong> {aula.data_aula}</p>
            <p><strong>Semana Gestacional:</strong> {aula.semana_gestacional}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AulaList;
