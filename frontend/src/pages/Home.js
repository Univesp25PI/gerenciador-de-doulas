import { useGestantes } from "../hooks/useGestantes";
import { useAulas } from "../hooks/useAulas";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import React, { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { gestantes } = useGestantes();
  const { aulas } = useAulas();
  const { doula, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !doula) {
      navigate("/login");
    }
  }, [doula, loading, navigate]);

  const minhasGestantes =
    gestantes?.filter((g) => g.doula?.id === doula?.id) || [];

  const minhasAulas =
    aulas?.filter((aula) => aula.pregnant?.doula_id === doula?.id) || [];

  const proximaAula = useMemo(() => {
    if (!minhasAulas.length) return null;
    return minhasAulas
      .slice()
      .sort((a, b) => new Date(a.class_date) - new Date(b.class_date))[0];
  }, [minhasAulas]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-purple-800 dark:text-purple-200 font-medium">
            Carregando seus dados...
          </p>
        </div>
      </div>
    );
  }

  if (!doula) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-700 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Erro ao Carregar
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {error || "Nenhuma doula logada. Volte e faça login."}
          </p>

          <a
            href="/login"
            className="inline-block bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-400 text-white py-2 px-6 rounded-lg transition font-semibold"
          >
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-800 dark:text-purple-300">
              Bem-vinda, {doula?.name || "Doula"}!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              Aqui está o resumo das suas gestantes e aulas.
            </p>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Gestantes
            </p>
            <p className="text-3xl font-bold text-purple-800 dark:text-yellow-400">
              {minhasGestantes.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Aulas Marcadas
            </p>
            <p className="text-3xl font-bold text-purple-800 dark:text-yellow-400">
              {minhasAulas.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Próxima Aula
            </p>
            <p className="text-md text-purple-900 dark:text-yellow-400 font-semibold">
              {proximaAula
                ? new Date(proximaAula.class_date).toLocaleString("pt-BR")
                : "Nenhuma"}
            </p>
          </div>
        </div>

        {/* Lista de aulas */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 dark:text-yellow-400 mb-2">
            Próximas Aulas
          </h2>
          {minhasAulas.length === 0 ? (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Nenhuma aula agendada ainda.
            </p>
          ) : (
            <ul className="space-y-3">
              {minhasAulas.slice(0, 3).map((aula) => (
                <li
                  key={aula.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    <strong className="text-purple-950 dark:text-yellow-300">
                      {aula.class_type}
                    </strong>{" "}
                    — {new Date(aula.class_date).toLocaleString("pt-BR")}
                  </p>
                  <Link
                    to={routes.detalheAula(aula.id)}
                    className="text-sm text-purple-950 dark:text-yellow-300 hover:underline focus:ring-2 focus:ring-purple-400 rounded"
                  >
                    Ver detalhes
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={routes.novaGestante}
            className="bg-purple-800 hover:bg-purple-900 focus:ring-2 focus:ring-purple-400 focus:outline-none text-white px-6 py-3 rounded-lg text-center font-semibold shadow-md dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900"
          >
            Nova Gestante
          </Link>
          <Link
            to={routes.novaAula}
            className="bg-purple-800 hover:bg-purple-900 focus:ring-2 focus:ring-purple-400 focus:outline-none text-white px-6 py-3 rounded-lg text-center font-semibold shadow-md dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900"
          >
            Nova Aula?
          </Link>
        </div>
      </div>
    </div>
  );
}
