const COLORS = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    pink: "bg-pink-600 hover:bg-pink-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };
  
  export default function Button({ href = "#", children, cor = "indigo" }) {
    const colorClass = COLORS[cor] || COLORS.indigo;
  
    return (
      <a
        href={href}
        className={`${colorClass} text-white px-4 py-2 rounded-xl shadow transition duration-200`}
      >
        {children}
      </a>
    );
  }