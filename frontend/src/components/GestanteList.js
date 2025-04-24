import React from 'react';
import { useGestantes } from '../hooks/useGestantes';

const GestanteList = () => {
  const { gestantes, loading, error } = useGestantes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1>Gestantes</h1>
      <h1>gestante</h1>

    </div>
  );
};

export default GestanteList;
