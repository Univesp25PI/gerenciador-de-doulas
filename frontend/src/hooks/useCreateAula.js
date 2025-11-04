// src/hooks/useCreateAula.js
import { useState } from "react";
import { AulaService } from "../services/AulaService";

export function useCreateAula() {
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

  const createAula = async (form, onSuccess) => {
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

    // Adiciona id_doula ao payload
    const payload = {
      ...form,
      id_doula: doulaId
    };

    try {
      const result = await AulaService.create(payload);
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