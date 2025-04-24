import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGestantes } from '../api'; // Import from api.js, which will conditionally use mock or real API

function GestanteList() {
  const [doulas, setDoulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all doulas using the api.js logic
  const loadGesntantes = async () => {
    try {
      const fetchedGestantes = await fetchGestantes(); // This will use either the mock or real API function
      console.log('Fetched Gestantes:', fetchedGestantes); // Log to inspect the response
      if (Array.isArray(fetchedGestantes)) {
        setDoulas(fetchedGestantes); // Set doulas only if it's an array
      } else {
        throw new Error('Expected an array but got something else');
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch doulas when the component mounts
  useEffect(() => {
    loadGesntantes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>List of Doulas</h1>
      <ul>
        {doulas.map((doula) => (
          <li key={doula.id}>
            <Link to={`/gestante/${doula.id}`}>
              <h2>{doula.nome}</h2>
              <p>Idade: {doula.idade}</p>
              <p>Semana Gestacional: {doula.semana_gestacional}</p>
              <p>Comorbidades: {doula.comorbidades}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestanteList;
