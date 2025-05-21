import { useState } from "react";
import { useDoulas } from "../../hooks/useDoulas";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

export default function CadastroGestante() {
  const { doulas, loading, error } = useDoulas();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % doulas.length);
  const prev = () => setIndex((prev) => (prev - 1 + doulas.length) % doulas.length);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-purple-600 text-lg">Carregando doulas...</div>;
  }

  if (error || !doulas.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error || "Nenhuma doula disponível no momento."}</p>
      </div>
    );
  }

  const doula = doulas[index];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-purple-700">Visualizar Doulas</h1>
        <p className="text-gray-600 text-sm">
          A opção de cadastro pela gestante ainda não está disponível.<br />
          Por favor, peça para uma <span className="font-semibold text-purple-700">doula</span> realizar seu cadastro.
        </p>

        {/* Carrossel de Doulas */}
        <div>
          {doula.foto ? (
            <img src={doula.foto} alt={doula.name} className="w-32 h-32 rounded-full mx-auto border-4 border-purple-300 object-cover shadow" />
          ) : (
            <Avatar nome={doula.name} size="w-32 h-32" />
          )}
          <p className="font-semibold text-lg text-purple-700 mt-2">{doula.name}</p>
          <div className="flex justify-center gap-4 mt-2">
            <button onClick={prev} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-200" aria-label="Doula anterior">⬅</button>
            <button onClick={next} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-200" aria-label="Próxima doula">➡</button>
          </div>
        </div>

        <Link to="/" className="text-sm text-purple-600 hover:underline transition block mt-4">
          ← Voltar para a escolha de perfil
        </Link>
      </div>
    </div>
  );
}
