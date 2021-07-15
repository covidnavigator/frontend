import React, { useState, useRef } from 'react'

import eye from '../../assets/img/icons/login/icons-eye.svg'

export function LoginInput({
  type,
  label,
  value,
  name,
  onChange,
  pageName,
  className,
  autoComplete,
  changeType,
}) {
  const inputRef = useRef(null)
  const [isFocus, setFocus] = useState(false)

  const handleChange = (e) => {
    if (name) {
      return onChange(name, e.target.value)
    }
    return onChange(e.target.value)
  }

  const handleLabelClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className={`${pageName}-item`}>
      <label
        className={
          value || isFocus
            ? `${pageName}-item__label_active`
            : `${pageName}-item__label`
        }
        onClick={handleLabelClick}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        className={`${pageName}-item__input ${className}`}
        autoComplete={autoComplete}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {label.includes('Password') ? (
        <img
          className={
            type === 'password'
              ? `${pageName}-item__input_eye`
              : `${pageName}-item__input_eye-crossed`
          }
          src={eye}
          alt="Show Password"
          onClick={changeType}
        />
      ) : null}
    </div>
  )
}
