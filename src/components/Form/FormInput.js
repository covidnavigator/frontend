import React, { useState } from 'react'

import eye from '../../assets/img/icons/login/icons-eye.svg'

export function FormInput({
  type,
  id,
  changeType,
  label,
  name,
  value,
  onChange,
  onBlur,
  maxLength,
  className,
  error,
  errorMessage,
}) {
  const [isFocus, setFocus] = useState(false)

  const handleChange = (e) => {
    if (maxLength) {
      const { value, maxLength } = e.target
      const message = value.slice(0, maxLength)
      name ? onChange(name, message) : onChange(message)
    } else {
      name ? onChange(name, e.target.value) : onChange(e.target.value)
    }
  }

  const handleBlur = (e) => {
    setFocus(false)
    onBlur && onBlur(e)
  }

  return (
    <div
      className={
        error || errorMessage ? `${className} form-item-errored` : className
      }
    >
      <label
        htmlFor={id ? id : label}
        className={
          value || isFocus ? 'form-item__label_active' : 'form-item__label'
        }
      >
        {errorMessage ? errorMessage : label}
      </label>

      {maxLength && isFocus ? (
        <label
          className={
            isFocus ? 'form-item__counter_active' : 'form-item__counter'
          }
        >
          {value.length}/{maxLength}
        </label>
      ) : null}

      <input
        type={type}
        id={id ? id : label}
        className="form-item__input"
        value={value || ''}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={(e) => handleBlur(e)}
        maxLength={maxLength}
        autoComplete="off"
      />
      {label.includes('Password') ? (
        <img
          className={
            type === 'password'
              ? 'form-item__input_eye'
              : 'form-item__input_eye-crossed'
          }
          src={eye}
          alt="Show Password"
          onClick={changeType}
        />
      ) : null}
      {(error || errorMessage) && !label.includes('Password') ? (
        <div className="form-item__input-error" />
      ) : null}
    </div>
  )
}
