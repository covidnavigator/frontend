import React from 'react'

export function FilterToggle({ label, checked, onClick }) {
  return (
    <div className="filter-toggle" onClick={onClick}>
      <h2 className="filter-toggle__label">{label}</h2>

      <div className={`filter-toggle__track${checked ? '_checked' : ''}`}>
        <div className={`filter-toggle__thumb${checked ? '_checked' : ''}`} />
      </div>
    </div>
  )
}
