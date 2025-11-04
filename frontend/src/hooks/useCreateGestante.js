import { useState } from "react";
import { GestanteService } from "../services/gestanteService";

export function useCreateGestante() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const createGestante = async (form, onSuccess) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Sessão expirada. Faça login novamente.");
      setLoading(false);
      return;
    }

    const decodedToken = parseJwt(token);
    const doulaId = decodedToken?.id || decodedToken?.sub || decodedToken?.user_id;

    if (!doulaId) {
      setError("Token inválido. Faça login novamente.");
      setLoading(false);
      return;
    }

    const payload = {
      id_doula: doulaId,
      name: form.nome,
      age: parseInt(form.idade, 10) || null,
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

  const reset = () => {
    setError("");
    setSuccess(false);
  };

  return { createGestante, loading, error, success, reset };
}