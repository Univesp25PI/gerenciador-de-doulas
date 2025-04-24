import React from 'react';
import { useDoulas } from '../hooks/useDoulas';

const DoulaList = () => {
  const { doulas, loading, error } = useDoulas();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1>Doulas</h1>
      <ul>
        {doulas.map((doula) => (
          <li key={doula.id}>
            <p><strong>Nome:</strong> {doula.nome}</p>
            <p><strong>Telefone:</strong> {doula.telefone}</p>
            <p><strong>Email:</strong> {doula.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoulaList;
