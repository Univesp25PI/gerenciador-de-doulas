import { useState, useEffect } from "react";
import { DoulaService } from "../services/DoulaService";

export function useDoulas() {
  const [doulas, setDoulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDoulas() {
      try {
        const data = await DoulaService.getAll();
        setDoulas(data);
      } catch (err) {
        console.error("Erro ao buscar doulas:", err);

        // Captura mensagem de erro detalhada se existir
        const mensagem =
          err.response?.data?.errors?.Description ||
          err.response?.data?.message ||
          err.message ||
          "Erro ao carregar as doulas.";

        setError(mensagem);
      } finally {
        setLoading(false);
      }
    }

    loadDoulas();
  }, []);

  return { doulas, loading, error };
}
