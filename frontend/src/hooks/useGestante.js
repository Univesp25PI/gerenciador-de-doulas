// src/hooks/useGestante.js
import { useState, useEffect } from "react";
import { GestanteService } from "../services/gestanteService";

export function useGestante(id) {
  const [gestante, setGestante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGestante() {
      try {
        const data = await GestanteService.getById(id);
        setGestante(data);
      } catch (err) {
        console.error("Erro ao buscar gestante:", err);
        setError("Erro ao carregar os dados da gestante.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadGestante();
    }
  }, [id]);

  return { gestante, loading, error };
}

