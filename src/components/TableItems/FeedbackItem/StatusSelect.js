import React, { useMemo, useState } from 'react'
import Select from 'react-select'

import arrow from '../../../assets/img/icons/feeds/caret-down.svg'

export function StatusSelect({
  options,
  label,
  value,
  onChange,
  className,
  disabled,
  withBorder,
}) {
  const DropdownIndicator = (value) => {
    return value ? (
      <div
        style={!withBorder ? { backgroundColor: value.color } : null}
        className={`${className}-dropdownindicator`}
      />
    ) : null
  }

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
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.data.fontWeight,
    }),
    container: (base) => ({
      ...base,
      backgroundColor:
        value && value.backgroundColor ? value.backgroundColor : 'transparent',
      borderRadius: withBorder ? '21px' : '0px',
    }),
    control: (base, state) => ({
      ...base,
      width:
        !withBorder && value && value.label
          ? `${6 * value.label.length + 35}px`
          : '100%',
      height: '100%',
      backgroundColor: 'transparent',
      cursor: 'pointer',

      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),
  }))

  return (
    <div className={className}>
      <Select
        components={{
          DropdownIndicator: () => DropdownIndicator(value),
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
        options={options}
        value={value}
        isDisabled={disabled}
        onChange={(item) => onChange(item)}
        placeholder={''}
        isSearchable={false}
      />
    </div>
  )
}
