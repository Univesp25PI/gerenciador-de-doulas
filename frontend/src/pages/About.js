import React from "react";
import Avatar from "../components/Avatar";

function About() {
  // Pegando do localStorage
  const doulaRaw = localStorage.getItem("doula_logada");
  const doula = doulaRaw ? JSON.parse(doulaRaw) : null;

  if (!doula) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600 text-center text-lg">
          Nenhuma doula logada. Volte e selecione seu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar nome={doula.name} size="w-28 h-28" />
          <h1 className="text-2xl font-bold text-purple-700 mt-2">{doula.name}</h1>
          <p className="text-sm text-gray-500">Meu Perfil:</p>
        </div>

        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Telefone:</span>
            <span>
              ({doula.phone?.slice(0, 2)}) {doula.phone?.slice(2, 7)}-{doula.phone?.slice(7)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="truncate">{doula.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Associada desde:</span>
            <span>{new Date(doula.create_date).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Ultima atualização:</span>
            <span>{new Date(doula.update_date).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            disabled
            className="bg-purple-300 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-80"
            title="Ainda não implementado"
          >
            Editar perfil (em breve)
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
