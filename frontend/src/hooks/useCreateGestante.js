import { useState } from "react";
import { GestanteService } from "../services/gestanteService";

export function useCreateGestante() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createGestante = async (form, onSuccess) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const doulaLogada = JSON.parse(localStorage.getItem("doula_logada") || "null");

    if (!doulaLogada?.id) {
      setError("Doula não identificada. Faça login novamente.");
      setLoading(false);
      return;
    }

    const payload = {
      id_doula: doulaLogada.id,
      name: form.nome,
      age: parseInt(form.idade),
      phone: form.phone,
      email: form.email,
      first_pregnancy: form.primeira_gestacao,
      lmp_date: form.ultima_menstruacao,
      comorbidities: form.comorbidades,
    };

    try {
      const result = await GestanteService.create(payload);
      setSuccess(true);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      console.error("Erro ao criar gestante:", err);
      const mensagem =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.defaultMessage ||
        err.message ||
        "Erro desconhecido ao cadastrar gestante.";
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return { createGestante, loading, error, success };
}
