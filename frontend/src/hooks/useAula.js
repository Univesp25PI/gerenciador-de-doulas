// src/hooks/useAula.js
import { useState, useEffect } from "react";
import { AulaService } from "../services/AulaService";

export function useAula(id = 1) {
  const [aula, setAula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAula = async () => {
      try {
        const data = await AulaService.getById(id);
        setAula(data.data);
      } catch (err) {
        console.error("Erro ao buscar aula:", err);
        setError("Erro ao carregar os dados da aula.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAula();
    }
  }, [id]);

  return { aula, loading, error };
}
