import { useState } from "react";
import { api } from "../api";

export function useDoula() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const cadastrarDoula = async (dados, onSuccess) => {
    setLoading(true);
    setErro("");
    try {
      const response = await api.post("/doula", dados);
      const novaDoula = response.data.data;
      onSuccess(novaDoula);
    } catch (err) {
      setErro("Erro ao cadastrar doula.");
    } finally {
      setLoading(false);
    }
  };

  return { cadastrarDoula, loading, erro };
}