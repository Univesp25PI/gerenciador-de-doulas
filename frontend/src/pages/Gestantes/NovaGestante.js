import { useState } from "react";
import { useCreateGestante } from "../../hooks/useCreateGestante";
import InputField from "../../components/form/InputField";
import TextareaField from "../../components/form/TextareaField";
import CheckboxField from "../../components/form/CheckboxField";
import Toast from "../../components/Toast";

export default function NovaGestante() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    primeira_gestacao: false,
    ultima_menstruacao: "",
    semana_gestacao: "",
    previsao_parto: "",
    comorbidades: "",
  });

  const { createGestante, loading, error, success } = useCreateGestante();
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createGestante(form, () => {
      setToast({ type: "success", message: "Gestante cadastrada com sucesso!" });
      setTimeout(() => setToast(null), 3000);
      setForm({
        nome: "",
        idade: "",
        primeira_gestacao: false,
        ultima_menstruacao: "",
        semana_gestacao: "",
        previsao_parto: "",
        comorbidades: "",
      });
    });
  };

  return (
    <div className="max-w-xl mt-10 mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold">Cadastrar Nova Gestante</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
        <InputField label="Idade" name="idade" type="number" value={form.idade} onChange={handleChange} required />
        <CheckboxField label="Primeira gestação?" name="primeira_gestacao" checked={form.primeira_gestacao} onChange={handleChange} />
        <InputField label="Última menstruação" name="ultima_menstruacao" type="date" value={form.ultima_menstruacao} onChange={handleChange} required />
        <InputField label="Semana gestacional" name="semana_gestacao" type="number" value={form.semana_gestacao} onChange={handleChange} />
        <InputField label="Previsão de parto" name="previsao_parto" type="date" value={form.previsao_parto} onChange={handleChange} required />
        <TextareaField label="Comorbidades (opcional)" name="comorbidades" value={form.comorbidades} onChange={handleChange} />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>

      {(toast || error || success) && (
        <Toast
          message={toast?.message || error}
          type={toast?.type || (success ? "success" : "error")}
          onClose={() => {
            setToast(null);
          }}
        />
      )}
    </div>
  );
}
