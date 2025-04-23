// src/hooks/useDoula.js
import { useState, useEffect } from "react";
import { DoulaService } from "../services/DoulaService";

export function useDoula(id = 1) {
  const [doula, setDoula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoula = async () => {
      try {
        const data = await DoulaService.getById(id);
        setDoula(data);
      } catch (err) {
        console.error("Erro ao buscar doula:", err);
        setError("Erro ao carregar os dados da Doula.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDoula();
    }
  }, [id]);

  return { doula, loading, error };
}
