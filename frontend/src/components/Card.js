// src/components/Card.js
export default function Card({ label, valor, cor = "text-gray-800" }) {
    return (
      <div className="bg-white rounded-2xl shadow p-4">
        <p className="text-gray-500">{label}</p>
        <p className={`text-2xl font-bold ${cor}`}>{valor}</p>
      </div>
    );
  }