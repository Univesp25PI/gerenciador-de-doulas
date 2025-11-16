import { useState } from "react";
import { DoulaService } from "../services/DoulaService";

export function useDoula() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const cadastrarDoula = async (dados) => {
    setLoading(true);
    setErro("");
    try {
      const novaDoula = await DoulaService.create(dados);
      return novaDoula;
    } catch (err) {
      const mensagemErro = err.response?.data?.message || "Erro ao cadastrar doula.";
      setErro(mensagemErro);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { cadastrarDoula, loading, erro };
}