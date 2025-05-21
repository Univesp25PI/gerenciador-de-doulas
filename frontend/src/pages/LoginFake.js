import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoulaService } from "../services/DoulaService";

export default function LoginFake() {
  const [doulas, setDoulas] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoulas() {
      try {
        const data = await DoulaService.getAll();
        setDoulas(data);
      } catch (error) {
        console.error("Erro ao carregar doulas:", error);
      }
    }

    fetchDoulas();
  }, []);

  const handleLogin = () => {
    if (idSelecionado) {
      const doulaSelecionada = doulas.find((d) => d.id === Number(idSelecionado));
      if (doulaSelecionada) {
        localStorage.setItem("doula_logada", JSON.stringify(doulaSelecionada));
        navigate("/home");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold text-purple-700">Login (simulado)</h1>
        <p className="text-gray-600">Selecione seu perfil para acessar a plataforma.</p>

        <select
          value={idSelecionado}
          onChange={(e) => setIdSelecionado(e.target.value)}
          className="w-full border border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Selecione o seu perfil:</option>
          {doulas.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleLogin}
          disabled={!idSelecionado}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Entrar
        </button>

        <div className="text-sm pt-2">
          <p className="text-gray-500">
            Ainda não tem cadastro?{" "}
            <a href="/" className="text-purple-600 hover:underline">
              Voltar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
