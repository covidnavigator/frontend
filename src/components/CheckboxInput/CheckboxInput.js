import React from 'react'
import './checkboxInput.scss'

export function CheckboxInput({
  handleChange,
  label,
  isSelected,
  group,
  item,
}) {
  return (
    <li className="list__item">
      <label
        htmlFor=""
        className="checkbox-container"
        onClick={(e) => handleChange(e, item ? item.value : label, group)}
      >
        {label}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => handleChange(e, item ? item.value : label, group)}
        />
        <span className="checkmark"></span>
      </label>
    </li>
  )
}
