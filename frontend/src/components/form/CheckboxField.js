// src/components/form/CheckboxField.js
export default function CheckboxField({ label, name, checked, onChange }) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }