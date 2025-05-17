// src/hooks/useCreateAula.js
import { useState } from "react";
import { AulaService } from "../services/AulaService";

export function useCreateAula() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createAula = async (form, onSuccess) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await AulaService.create(form);
      setSuccess(true);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      console.error("Erro ao criar aula:", err);

      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Erro desconhecido";

      setError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createAula, loading, error, success };
}
