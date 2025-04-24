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
  
      const payload = {
        id_doula: 1,
        nome: form.nome,
        idade: parseInt(form.idade),
        primeira_gestacao: form.primeira_gestacao,
        ultima_menstruacao: form.ultima_menstruacao,
        semana_gestacao: form.semana_gestacao,
        previsao_parto: form.previsao_parto,
        comorbidades: form.comorbidades,
      };
  
      try {
        const result = await GestanteService.create(payload);
        setSuccess(true);
        if (onSuccess) onSuccess(result);
      } catch (err) {
        console.error("Erro ao criar gestante:", err);
        setError("Erro ao cadastrar gestante.");
      } finally {
        setLoading(false);
      }
    };
  
    return { createGestante, loading, error, success };
  }