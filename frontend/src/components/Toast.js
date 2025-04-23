export default function Toast({ message, type = "success", onClose }) {
    const bgColor = {
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-500",
    }[type] || "bg-gray-700";
  
    return (
      <div className={`fixed bottom-4 right-4 px-4 py-3 text-white rounded shadow-lg ${bgColor}`}>
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>
          <button onClick={onClose} className="text-white font-bold">×</button>
        </div>
      </div>
    );
  }