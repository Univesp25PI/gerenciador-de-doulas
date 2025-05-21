// src/pages/Aulas/NovaAula.js
import { useGestantes } from "../../hooks/useGestantes";
import { useCreateAula } from "../../hooks/useCreateAula";
import { CLASS_TYPE_OPTIONS } from "../../constants/classTypes";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";

export default function NovaAula() {
  const [form, setForm] = useState({
    id_pregnant: "",
    class_number: "",
    class_type: "",
    class_date: "",
    lmp_date: ""
  });

  const [toast, setToast] = useState(null);
  const doulaRaw = localStorage.getItem("doula_logada");
  const doula = doulaRaw ? JSON.parse(doulaRaw) : null;
  const idDoula = doula?.id;

  const {
    gestantes,
    loading: loadingGestantes,
    error: errorGestantes,
  } = useGestantes();

  const gestantesDaDoula = gestantes.filter(g => g.id_doula === idDoula);

  const {
    createAula,
    loading: loadingAula,
    error: errorAula,
  } = useCreateAula();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAula(form, () => {
      setToast({ type: "success", message: "Aula cadastrada com sucesso!" });
      setTimeout(() => setToast(null), 3000);

      setForm({
        id_pregnant: "",
        class_number: "",
        class_type: "",
        class_date: "",
        lmp_date: ""
      });
    });
  };

  useEffect(() => {
    if (errorAula) {
      setToast({ type: "error", message: errorAula });
      setTimeout(() => setToast(null), 3000);
    }
  }, [errorAula]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700">Cadastrar Nova Aula</h1>
          <p className="text-sm text-gray-600 mt-1">
            Selecione uma gestante e preencha os dados da aula.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Gestante */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Gestante</label>
            {loadingGestantes && <p className="text-sm text-gray-500">Carregando gestantes...</p>}
            {errorGestantes && <p className="text-red-600 text-sm">{errorGestantes}</p>}
            <select
              name="id_pregnant"
              value={form.id_pregnant}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Selecione uma gestante</option>
              {gestantesDaDoula.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Número da Aula */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Número da Aula</label>
            <input
              type="number"
              name="class_number"
              value={form.class_number}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Tipo de Aula */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Tipo de Aula</label>
            <select
              name="class_type"
              value={form.class_type}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Selecione...</option>
              {CLASS_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data da Aula */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Data e Hora</label>
            <input
              type="datetime-local"
              name="class_date"
              value={form.class_date}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Última menstruação */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Última Menstruação</label>
            <input
              type="date"
              name="lmp_date"
              value={form.lmp_date}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
            disabled={loadingAula}
          >
            {loadingAula ? "Salvando..." : "Salvar Aula"}
          </button>
        </form>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
