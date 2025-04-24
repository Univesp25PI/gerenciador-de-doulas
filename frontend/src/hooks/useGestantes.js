// src/hooks/useGestantes.js
import { useState, useEffect } from "react";
import { GestanteService } from "../services/gestanteService";

export function useGestantes() {
  const [gestantes, setGestantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGestantes = async () => {
      try {
        const data = await GestanteService.getAllByDoula();
        setGestantes(data);
      } catch (err) {
        console.log("erro", err)
        console.log("env", process.env.REACT_APP_USE_MOCK)
        console.error("Erro ao buscar gestantes:", err);
        setError("Erro ao carregar gestantes.");
      } finally {
        setLoading(false);
      }
    };

    loadGestantes();
  }, []);

  return { gestantes, loading, error };
}
