import React from 'react'

export function FormRadioGroup({ options, value, name, onChange, className }) {
  return (
    <div className={className}>
      {options.map((option, index) => (
        <label
          className="radio-container"
          key={index}
          onClick={() => onChange(name, option.label)}
        >
          {option.label}
          <input
            type="radio"
            checked={option.label === value}
            onChange={() => onChange(name, option.label)}
          />
          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  )
}
