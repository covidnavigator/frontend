import React, { useMemo, useState } from 'react'
import Select from 'react-select'

export function FilterSelect({
  options,
  icon,
  value,
  onChange,
  className,
  disabled,
}) {
  console.log(value, options)
  const customStyles = useMemo(() => ({
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.data.fontWeight,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#eee' : 'white',
      ':active': {
        backgroundColor: state.isSelected ? '#eee' : 'white',
      },
      ':hover': {
        backgroundColor: '#eee',
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
    control: (base, state) => {
      return {
        ...base,
        width: value[0].label ? `${7 * value[0].label.length + 50}px` : '100%',
        height: '100%',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
      }
    },
  }))

  return (
    <div className={className}>
      <img src={icon} alt="users" className="filter-bar__role-icon" />
      <Select
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
        options={options}
        value={value}
        isDisabled={disabled}
        onChange={onChange}
        className="filter-bar__select"
        placeholder={''}
        isSearchable={false}
      />
    </div>
  )
}
