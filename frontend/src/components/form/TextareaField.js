// src/components/form/TextareaField.js
export default function TextareaField({ label, name, value, onChange }) {
    return (
      <div>
        <label htmlFor={name} className="block font-medium mb-1">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
      </div>
    );
  }