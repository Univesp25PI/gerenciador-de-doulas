import { useState } from "react";
import { useDoulas } from "../../hooks/useDoulas";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { usePostGestante } from "../../hooks/usePostGestante";

export default function CadastroGestante() {
  const { doulas, loading, error } = useDoulas();
  const [index, setIndex] = useState(0);
  const { cadastrarGestante, loading: loadingPost, error: errorPost } = usePostGestante();
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    lmp_date: "",
    first_pregnancy: false,
    comorbidities: ""
  });
  const [feedback, setFeedback] = useState(null);

  const next = () => setIndex((prev) => (prev + 1) % doulas.length);
  const prev = () => setIndex((prev) => (prev - 1 + doulas.length) % doulas.length);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id_doula: doulas[index].id,
      name: form.name,
      age: Number(form.age),
      phone: form.phone,
      email: form.email,
      lmp_date: form.lmp_date,
      first_pregnancy: form.first_pregnancy,
      comorbidities: form.comorbidities
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean),
    };

    cadastrarGestante(payload, () => {
      setFeedback({ type: "success", message: "Gestante cadastrada com sucesso!" });
      setForm({
        name: "",
        age: "",
        phone: "",
        email: "",
        lmp_date: "",
        first_pregnancy: false,
        comorbidities: ""
      });
    });
  };

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
        <h1 className="text-3xl font-extrabold text-purple-700">Cadastro de Gestante</h1>
        <p className="text-gray-600 text-sm">
          Preencha o formulário para ser cadastrada pela doula selecionada abaixo.
        </p>

        {/* Doula */}
        <div>
          {doula.foto ? (
            <img src={doula.foto} alt={doula.name} className="w-32 h-32 rounded-full mx-auto border-4 border-purple-300 object-cover shadow" />
          ) : (
            <Avatar nome={doula.name} size="w-32 h-32" />
          )}
          <p className="font-semibold text-lg text-purple-700 mt-2">{doula.name}</p>
          <div className="flex justify-center gap-4 mt-2">
            <button onClick={prev} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-200">⬅</button>
            <button onClick={next} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-200">➡</button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="w-full border px-3 py-2 rounded" required />
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Idade" className="w-full border px-3 py-2 rounded" required />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Telefone" className="w-full border px-3 py-2 rounded" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded" required />
          <input type="date" name="lmp_date" value={form.lmp_date} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" name="first_pregnancy" checked={form.first_pregnancy} onChange={handleChange} />
            Primeira gestação?
          </label>
          <input type="text" name="comorbidities" value={form.comorbidities} onChange={handleChange} placeholder="Comorbidades (separadas por vírgula)" className="w-full border px-3 py-2 rounded" />

          <button type="submit" disabled={loadingPost} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
            {loadingPost ? "Enviando..." : "Cadastrar Gestante"}
          </button>
        </form>

        {feedback && (
          <p className={`text-sm ${feedback.type === "success" ? "text-green-600" : "text-red-600"} pt-2`}>
            {feedback.message}
          </p>
        )}

        {errorPost && (
          <p className="text-sm text-red-600 pt-2">{errorPost}</p>
        )}

        <Link to="/" className="text-sm text-purple-600 hover:underline transition block mt-4">
          ← Voltar para a escolha de perfil
        </Link>
      </div>
    </div>
  );
}
