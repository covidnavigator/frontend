import React, { useState } from 'react'
import times from '../../assets/img/icons/filters/times.svg'
import './form.scss'

export function FormSearch({ value, onChange, placeholder, onSubmit }) {
  const clearSearch = () => {
    onChange('')
  }

  return (
    <div className="search">
      <input
        type="text"
        value={value}
        className="search-input"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <img
        style={
          value === '' ? { visibility: 'hidden' } : { visibility: 'visible' }
        }
        src={times}
        alt="Clear"
        className="clear"
        onClick={clearSearch}
      />
    </div>
  )
}
