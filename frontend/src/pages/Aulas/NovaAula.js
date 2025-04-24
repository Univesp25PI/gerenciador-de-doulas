import { useGestantes } from "../../hooks/useGestantes";
import { useCreateAula } from "../../hooks/useCreateAula";
import { useEffect, useState } from "react";

import Toast from "../../components/Toast";

export default function NovaAula() {
  const [form, setForm] = useState({
    id_doula: 1,
    id_gestante: "",
    numero_aula: "",
    tipo_aula: "",
    data_aula: "",
  });

  const [toast, setToast] = useState(null);

  const {
    gestantes,
    loading: loadingGestantes,
    error: errorGestantes,
  } = useGestantes();

  const {
    createAula,
    loading: loadingAula,
    error: errorAula,
    success: successAula,
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

      // Reset do formulário
      setForm({
        id_doula: 1,
        id_gestante: "",
        numero_aula: "",
        tipo_aula: "",
        data_aula: "",
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Cadastrar Nova Aula</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {loadingGestantes && <p>Carregando gestantes...</p>}
          {errorGestantes && <p className="text-red-600">{errorGestantes}</p>}
          <label className="block font-medium">Gestante</label>
          <select
            name="id_gestante"
            value={form.id_gestante}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione uma gestante</option>
            {gestantes.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Número da Aula</label>
          <input
            type="number"
            name="numero_aula"
            value={form.numero_aula}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Tipo de Aula</label>
          <select
            name="tipo_aula"
            value={form.tipo_aula}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione...</option>
            <option value="PreNatal">Pré-natal</option>
            <option value="Amamentacao">Amamentação</option>
            <option value="Parto">Plano de Parto</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Data e hora da Aula</label>
          <input
            type="datetime-local"
            name="data_aula"
            value={form.data_aula}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          disabled={loadingAula}
        >
          {loadingAula ? "Salvando..." : "Salvar Aula"}
        </button>
      </form>

      {successAula && <p className="text-green-600">Aula salva com sucesso!</p>}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
