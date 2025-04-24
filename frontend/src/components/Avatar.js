// src/components/Avatar.js
export default function Avatar({ nome, size = "w-24 h-24", bg = "bg-purple-100", textColor = "text-purple-600" }) {
    const iniciais = nome?.slice(0, 2).toUpperCase();
  
    return (
      <div className={`${size} ${bg} ${textColor} rounded-full flex items-center justify-center text-4xl font-bold shadow mb-4`}>
        {iniciais}
      </div>
    );
  }
  