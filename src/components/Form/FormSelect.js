import React, { useEffect, useMemo, useState, useRef } from 'react'
import Select from 'react-select'

import arrow from '../../assets/img/icons/feeds/caret-down.svg'

export function FormSelect({
  options,
  label,
  name,
  value,
  onChange,
  isMulti,
  isSearch,
  hideSelectedOptions,
  className,
  error,
  disabled,
  style,
}) {
  const [isFocus, setFocus] = useState(false)
  const [isCleared, setCleared] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setFocus(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectRef])

  const DropdownIndicator = (props) => {
    return error ? (
      <div className="dropdown-indicator" />
    ) : (
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
      color: state.data.color,
      fontWeight: state.data.fontWeight,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#ebebeb' : 'white',
      ':active': {
        backgroundColor: state.isSelected ? '#ebebeb' : 'white',
      },
      ':hover': {
        backgroundColor: state.isSelected ? '#ebebeb' : '#f5f5f5',
      },
    }),
    menuList: (base) => ({
      ...base,
      marginRight: '1px',

      '::-webkit-scrollbar': {
        width: '4px',
        backgroundColor: '#fff',
      },
      '::-webkit-scrollbar-track': {
        borderRadius: '3px',
        backgroundColor: '#fff',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '3px',
        backgroundColor: '#d6d6d6',
      },
    }),
    menu: (base) => ({
      ...base,
      position: 'absolute',
      top: style && style.menuTop ? style.menuTop : '-8px',
      left: '-1px',
      width: '100.5%',
      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
      zIndex: '2',
    }),
    input: (base) => ({
      ...base,
      width: '100%',
      marginTop: '14px',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '100%',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.data.fontWeight,
      padding: '12px 0px 0px 1px',
    }),
    control: (base, state) => ({
      ...base,
      width: '100%',
      height: '100%',
      minHeight: 'none',
      backgroundColor: 'transparent',
      borderRadius: '6px',
      border: error ? '1px solid #f44336' : '1px solid #d0d0d0',
      cursor: 'pointer',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: error ? '1px solid #f44336' : '1px solid #d0d0d0',
      },
    }),
  }))

  return (
    <div className={className} ref={selectRef}>
      <label
        htmlFor={label}
        className={
          value || isFocus ? 'form-item__label_active' : 'form-item__label'
        }
      >
        {label}
      </label>
      <Select
        components={{ DropdownIndicator }}
        styles={customStyles}
        options={options}
        isMulti={isMulti}
        value={isSearch ? (isCleared ? '' : value) : value}
        isDisabled={disabled}
        onFocus={() => setFocus(true)}
        onMenuOpen={() => setCleared(true)}
        onMenuClose={() => setCleared(false)}
        onChange={(item) => onChange(name, item)}
        className={
          error
            ? 'form-item__select form-item__select-errored'
            : 'form-item__select'
        }
        placeholder={''}
        hideSelectedOptions={hideSelectedOptions}
        isSearchable={isSearch ? true : false}
      />
    </div>
  )
}
