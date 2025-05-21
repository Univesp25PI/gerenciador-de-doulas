// src/hooks/useAulas.js
import { useState, useEffect } from 'react';
import { AulaService } from '../services/AulaService';

export const useAulas = () => {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAulas = async () => {
      try {
        const result = await AulaService.getAll();
        setAulas(result);
      } catch (err) {
        console.error("Erro ao buscar aulas:", err);
        setError("Erro ao carregar aulas.");
      } finally {
        setLoading(false);
      }
    };

    loadAulas();
  }, []);

  return { aulas, loading, error };
};
