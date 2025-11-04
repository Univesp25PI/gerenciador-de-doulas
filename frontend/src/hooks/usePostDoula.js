import { useState } from "react";
import { DoulaService } from "../services/DoulaService";

export function useDoula() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const cadastrarDoula = async (dados, onSuccess) => {
    setLoading(true);
    setErro("");
    try {
      const novaDoula = await DoulaService.create(dados);
      onSuccess(novaDoula);
    } catch (err) {
      setErro("Erro ao cadastrar doula.");
    } finally {
      setLoading(false);
    }
  };

  return { cadastrarDoula, loading, erro };
}