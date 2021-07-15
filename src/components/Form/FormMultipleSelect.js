import React, { useMemo, useState } from 'react'
import Select from 'react-select'

import arrow from '../../assets/img/icons/feeds/caret-down.svg'

export function FormMultipleSelect({
  options,
  label,
  name,
  value,
  onChange,
  hideSelectedOptions,
  onInputChange,
  className,
  disabled,
}) {
  const [isFocus, setFocus] = useState(false)

  const handleBlur = () => {
    setFocus(false)
  }

  const DropdownIndicator = (props) => {
    return (
      <img
        style={{ width: '14px', height: '14px', margin: '0 10px 0 0' }}
        src={arrow}
        alt="arrow"
      />
    )
  }

  const customStyles = useMemo(() => ({
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#ebebeb' : 'white',
      ':hover': {
        backgroundColor: state.isSelected ? '#ebebeb' : '#f5f5f5',
      },
    }),
    control: (base, state) => ({
      ...base,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: '1px solid #d0d0d0',
      cursor: 'pointer',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: '1px solid #d0d0d0',
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
      <Select
        components={{ DropdownIndicator }}
        onInputChange={onInputChange}
        styles={customStyles}
        options={options}
        isMulti={true}
        value={value}
        isDisabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        onChange={(item) => onChange(name, item)}
        className="form-item__multi"
        placeholder=""
        hideSelectedOptions={hideSelectedOptions}
      />
    </div>
  )
}
