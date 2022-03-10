import React, {useState} from 'react';
import InputMask from 'react-input-mask';

export function FormInputDate ({
    type,
    id,
    label,
    name,
    value,
    onChange,
    onBlur,
    className,
    error,
    errorMessage,
  }) {

  const [val, setVal] = useState(value);
  const [isFocus, setFocus] = useState(false)


  const handleChange = (e) => {
      name ? onChange(name, e.target.value) : onChange(e.target.value);
      setVal(e.target.value);
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

      <InputMask
        type={type}
        id={id ? id : label}
        className="form-item__input"
        value={val || value}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={(e) => handleBlur(e)}
        mask="9999/99/99"
      />
    </div>
  )
}