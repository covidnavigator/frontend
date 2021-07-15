import React, { useState, useRef, useEffect } from 'react'

export function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  className,
  maxLength,
  error,
  onBlur,
}) {
  const textAreaRef = useRef()
  const [textAreaHeight, setTextAreaHeight] = useState('auto')

  const textAreaStyle = {
    height: textAreaHeight,
  }

  useEffect(() => {
    if (value === '') {
      setTextAreaHeight('34px')
    } else {
      setTextAreaHeight(`${textAreaRef.current.scrollHeight + 5}px`)
    }
  }, [value])

  const onChangeHandler = (e) => {
    setTextAreaHeight('auto')
    const { value, maxLength } = e.target
    const message = value.slice(0, maxLength)
    name ? onChange(name, message) : onChange(message)
  }

  const [isFocus, setFocus] = useState(false)

  const handleBlur = (e) => {
    setFocus(false)
    onBlur && onBlur(e)
  }

  return (
    <div
      className={
        error
          ? `${className.split('__').shift()} form-item-errored`
          : className.split('__').shift()
      }
    >
      <label
        htmlFor={id ? id : label}
        className={
          className === 'form-item__notes'
            ? value || isFocus
              ? 'form-item__label_active'
              : 'form-item__label'
            : value || isFocus
            ? 'form-item__descr-label_active'
            : 'form-item__descr-label'
        }
      >
        {label}
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
      <textarea
        id={id ? id : label}
        ref={textAreaRef}
        style={textAreaStyle}
        className={className}
        value={value}
        onChange={onChangeHandler}
        onFocus={() => setFocus(true)}
        onBlur={(e) => handleBlur(e)}
        maxLength={maxLength}
      />
      {error ? <div className="form-item__textarea-error" /> : null}
    </div>
  )
}
