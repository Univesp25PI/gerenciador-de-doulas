import { useState } from "react";
import { api } from "../api";

export function usePostGestante() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cadastrarGestante = async (payload, onSuccess) => {
    setLoading(true);
    setError("");

    try {
      await api.post("/pregnant", payload);
      onSuccess?.();
    } catch (err) {
      const mensagem =
        err.response?.data?.message ||                      
        err.response?.data?.errors?.[0]?.defaultMessage ||  
        JSON.stringify(err.response?.data) ||               
        err.message ||                                     
        "Erro ao cadastrar gestante";

      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return { cadastrarGestante, loading, error };
}
