import { useState } from "react";
import { useCreateGestante } from "../../hooks/useCreateGestante";
import InputField from "../../components/form/InputField";
import CheckboxField from "../../components/form/CheckboxField";
import Toast from "../../components/Toast";
import { COMORBIDITY_OPTIONS } from "../../constants/comorbidities";

export default function NovaGestante() {
  const { createGestante, loading, error, success } = useCreateGestante();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    email: "",
    phone: "",
    primeira_gestacao: false,
    ultima_menstruacao: "",
    semana_gestacao: "",
    previsao_parto: "",
    comorbidades: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleComorbidadeToggle = (comorbidade) => {
    setForm((prev) => {
      const alreadySelected = prev.comorbidades.includes(comorbidade);
      return {
        ...prev,
        comorbidades: alreadySelected
          ? prev.comorbidades.filter((c) => c !== comorbidade)
          : [...prev.comorbidades, comorbidade],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createGestante(form, () => {
      setToast({ type: "success", message: "Gestante cadastrada com sucesso!" });
      setTimeout(() => setToast(null), 3000);
      setForm({
        nome: "",
        idade: "",
        email: "",
        phone: "",
        primeira_gestacao: false,
        ultima_menstruacao: "",
        semana_gestacao: "",
        previsao_parto: "",
        comorbidades: [],
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700">Cadastrar Nova Gestante</h1>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os dados com atenção para acompanhar a gestação corretamente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
          <InputField label="Idade" name="idade" type="number" value={form.idade} onChange={handleChange} required />
          <CheckboxField label="Primeira gestação?" name="primeira_gestacao" checked={form.primeira_gestacao} onChange={handleChange} />
          <InputField label="Última menstruação" name="ultima_menstruacao" type="date" value={form.ultima_menstruacao} onChange={handleChange} required />
          <InputField label="Semana gestacional" name="semana_gestacao" type="number" value={form.semana_gestacao} onChange={handleChange} />
          <InputField label="Previsão de parto" name="previsao_parto" type="date" value={form.previsao_parto} onChange={handleChange} required />
          <InputField label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
          <InputField label="Telefone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />

          <div>
            <label className="block font-medium text-gray-700 mb-1">Comorbidades</label>
            <div className="grid grid-cols-2 gap-2">
              {COMORBIDITY_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={value}
                    checked={form.comorbidades.includes(value)}
                    onChange={() => handleComorbidadeToggle(value)}
                    className="accent-purple-600"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>

        {(toast || error || success) && (
          <Toast
            message={toast?.message || error}
            type={toast?.type || (success ? "success" : "error")}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
