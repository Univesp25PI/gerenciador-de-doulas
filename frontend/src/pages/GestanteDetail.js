import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGestanteById } from '../api'; // Assuming you have a function to fetch gestante by ID

function GestanteDetail() {
  const { id } = useParams(); // Get the gestante ID from the URL
  const [gestante, setGestante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGestanteDetails = async () => {
      try {
        const data = await fetchGestanteById(id); // Fetch gestante details by ID
        setGestante(data); // Set the gestante details in state
        setLoading(false);
      } catch (err) {
        setError('Failed to load gestante details');
        setLoading(false);
      }
    };

    loadGestanteDetails();
  }, [id]); // Re-run this effect when the ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {gestante && (
        <div>
          <h1>Gestante Details</h1>
          <p><strong>Name:</strong> {gestante.nome}</p>
          <p><strong>Idade:</strong> {gestante.idade}</p>
          <p><strong>Comorbidades:</strong> {gestante.comorbidades}</p>
          <p><strong>Semana Gestacional:</strong> {gestante.semana_gestacional}</p>
          <p><strong>Previsão Parto:</strong> {gestante.previsao_parto}</p>
        </div>
      )}
    </div>
  );
}

export default GestanteDetail;