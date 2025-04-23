// src/components/form/InputField.js
export default function InputField({ label, name, value, onChange, type = "text", required = false }) {
    return (
      <div>
        <label htmlFor={name} className="block font-medium mb-1">
          {label}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border p-2 rounded"
        />
      </div>
    );
  }