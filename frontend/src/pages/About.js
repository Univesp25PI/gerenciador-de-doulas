import React from "react";
import { useDoula } from "../hooks/useDoula";
import Avatar from "../components/Avatar";

function About() {
  const { doula, loading, error } = useDoula();

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          {/* Avatar (ícone de perfil) */}
          <Avatar nome={doula.nome} />

        <h1 className="text-2xl font-bold text-gray-800 mb-1">{doula.nome}</h1>
        </div>

        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Telefone:</span>
            <span>
              ({doula.telefone.slice(0, 2)}) {doula.telefone.slice(2, 7)}-{doula.telefone.slice(7)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="truncate">{doula.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Criada em:</span>
            <span>{new Date(doula.create_date).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Atualizada em:</span>
            <span>{new Date(doula.update_date).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;