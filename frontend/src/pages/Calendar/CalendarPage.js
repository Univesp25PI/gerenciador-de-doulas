import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";

export default function CalendarPage() {
  const { events, loading, error, addEvent, removeEvent } = useCalendar();
  const [showForm, setShowForm] = useState(false);
  
  // State for new event form
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (loading) return <div className="p-6">Carregando agenda...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    // Combine date and time for Google Calendar ISO format
    const startDateTime = `${date}T${startTime}:00-03:00`;
    const endDateTime = `${date}T${endTime}:00-03:00`;

    const success = await addEvent({
      summary,
      description,
      start_time: startDateTime,
      end_time: endDateTime
    });

    if (success) {
      setShowForm(false);
      setSummary("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    return new Date(dateTimeStr).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Minha Agenda</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
        >
          {showForm ? "Cancelar" : "+ Novo Evento"}
        </button>
      </div>

      {showForm && (
        <div className="bg-purple-50 p-6 rounded-xl shadow mb-6 border border-purple-200">
          <h2 className="text-lg font-bold text-purple-800 mb-4">Adicionar Evento</h2>
          <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input 
                required 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                className="mt-1 w-full border border-gray-300 rounded p-2" 
                placeholder="Ex: Aula 1 - Preparação" 
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="mt-1 w-full border border-gray-300 rounded p-2" 
                placeholder="Detalhes do evento..."
                rows="2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input 
                type="date" 
                required 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="mt-1 w-full border border-gray-300 rounded p-2" 
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Início</label>
                <input 
                  type="time" 
                  required 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)} 
                  className="mt-1 w-full border border-gray-300 rounded p-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Término</label>
                <input 
                  type="time" 
                  required 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)} 
                  className="mt-1 w-full border border-gray-300 rounded p-2" 
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700 transition">
                Salvar Evento
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {events.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum evento agendado.</div>
        ) : (
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-purple-100 text-gray-600 uppercase text-left">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Início</th>
                <th className="px-4 py-3">Término</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{event.summary}</td>
                  <td className="px-4 py-3 text-gray-500">{event.description}</td>
                  <td className="px-4 py-3">{formatDateTime(event.start?.dateTime)}</td>
                  <td className="px-4 py-3">{formatDateTime(event.end?.dateTime)}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => removeEvent(event.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
