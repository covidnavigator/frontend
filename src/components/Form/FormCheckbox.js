import React from 'react'

export function FormCheckbox({ label, name, checked, onChange }) {
  return (
    <div className="form-checkbox-group form-item_checkbox">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          className=""
          onChange={(e) => onChange(name, e.target.checked)}
        />
        {label}
        <span className="checkmark"></span>
      </label>
    </div>
  )
}
