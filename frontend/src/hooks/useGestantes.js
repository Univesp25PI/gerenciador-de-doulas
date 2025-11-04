// src/hooks/useGestantes.js
import { useState, useEffect } from "react";
import { GestanteService } from "../services/gestanteService";

export function useGestantes() {
  const [gestantes, setGestantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGestantes = async () => {
      try {
        console.log("🔄 Carregando gestantes...");
        console.log("🔧 REACT_APP_USE_MOCK:", process.env.REACT_APP_USE_MOCK);
        
        const data = await GestanteService.getAll();
        
        console.log("✅ Gestantes carregadas:", data);
        setGestantes(data);
        
      } catch (err) {
        console.error("❌ Erro completo:", err);
        console.error("📊 Status:", err.response?.status);
        console.error("💬 Mensagem:", err.response?.data);
        
        let mensagemErro = "Erro ao carregar gestantes.";
        
        // Erros específicos
        if (err.response?.status === 401) {
          mensagemErro = "Você não está autenticado. Redirecionando para login...";
        } else if (err.response?.status === 403) {
          mensagemErro = "Você não tem permissão para acessar essas informações.";
        } else if (err.response?.status === 404) {
          mensagemErro = "Endpoint não encontrado. Verifique a URL da API.";
        } else if (err.response?.status === 500) {
          mensagemErro = "Erro no servidor. Tente novamente mais tarde.";
        } else if (err.message === "Network Error") {
          mensagemErro = "Erro de conexão. Verifique se o backend está rodando.";
        } else if (err.response?.data?.message) {
          mensagemErro = err.response.data.message;
        }
        
        setError(mensagemErro);
      } finally {
        setLoading(false);
      }
    };

    loadGestantes();
  }, []);

  return { gestantes, loading, error };
}