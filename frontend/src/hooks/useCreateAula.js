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

    const payload = {
      ...form,
      id_doula: Number(form.id_doula),
      id_gestante: Number(form.id_gestante),
      numero_aula: Number(form.numero_aula),
    };

    try {
      const data = await AulaService.create(payload);
      setSuccess(true);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error("Erro ao criar aula:", err);
      setError("Erro ao cadastrar aula.");
    } finally {
      setLoading(false);
    }
  };

  return { createAula, loading, error, success };
}
