import React, { useState, useMemo } from 'react'

import CreatableSelect from 'react-select/creatable'

export function FormCreatableSelect({
  label,
  name,
  value,
  onChange,
  className,
  options,
  onInputChange,
}) {
  const [isFocus, setFocus] = useState(false)

  const handleBlur = () => {
    setFocus(false)
  }

  const customStyles = useMemo(() => ({
    control: (base, state) => ({
      ...base,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: '1px solid #d0d0d0',
      cursor: 'text',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        width: '100%',
        height: '100%',
        border: '1px solid #d0d0d0',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.data.fontWeight,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#eee' : 'white',
      ':active': {
        width: '100%',
        height: '100%',
        backgroundColor: state.isSelected ? '#eee' : 'white',
      },
      ':hover': {
        backgroundColor: '#eee',
      },
    }),
  }))

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className={
          (value && value.length) || isFocus
            ? 'form-item__label_active'
            : 'form-item__label'
        }
      >
        {label}
      </label>
      <CreatableSelect
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        styles={customStyles}
        options={options}
        value={value}
        onInputChange={onInputChange ? onInputChange : ''}
        onChange={(item) => onChange(name, item)}
        className="form-item__multiselect"
        placeholder=""
        createOptionPosition="first"
        isMulti
      />
    </div>
  )
}
