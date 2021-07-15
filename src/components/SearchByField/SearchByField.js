import React, { useState, useEffect, useRef, useMemo } from 'react'

import CreatableSelect from 'react-select/creatable'

import times from '../../assets/img/icons/filters/times.svg'
import arrow from '../../assets/img/icons/feeds/caret-down.svg'
import './searchByField.scss'

export function SearchByField({
  value,
  onChange,
  setSearchBy,
  searchBy,
  options,
  keywords,
}) {
  const [menuOpened, setMenuOpened] = useState(false)
  const [isMultiSearch, setMultiSearch] = useState(false)
  const menuRef = useRef(null)
  const menuListRef = useRef(null)

  useEffect(() => {
    if (searchBy.value === 'keyword') {
      setMultiSearch(true)
    } else {
      setMultiSearch(false)
    }
    clearSearch()
  }, [searchBy])

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const handleMenuClick = (e) => {
    if (
      !menuListRef.current ||
      (menuListRef.current && !menuListRef.current.contains(e.target))
    ) {
      setMenuOpened((prev) => !prev)
    }
  }

  const handleMenuItemClick = (option) => {
    setMenuOpened(false)
    setSearchBy(option)
  }

  const handleMultiInputChange = (value) => {
    if (value === null) value = ''
    onChange(value)
  }

  const clearSearch = () => {
    onChange('')
  }

  const multiSelectCustomStyles = useMemo(() => ({
    control: (base, state) => ({
      ...base,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'text',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        width: '100%',
        height: '100%',
        border: 'none',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: state.data.fontWeight,
      cursor: 'pointer',
      backgroundColor: 'white',
      ':active': {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      },
      ':hover': {
        backgroundColor: 'white',
      },
    }),
  }))

  return (
    <div className="search-panel">
      <div className="search-panel__search">
        {isMultiSearch ? (
          <CreatableSelect
            value={value}
            styles={multiSelectCustomStyles}
            options={keywords}
            onChange={handleMultiInputChange}
            className="search-panel__search-input"
            placeholder={`Search by ${
              searchBy && searchBy.name ? searchBy.name : '...'
            }`}
            isMulti
            formatCreateLabel={(option) => `Add "${option}" to search`}
          />
        ) : (
          <input
            type="text"
            value={value}
            className="search-panel__search-input"
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Search by ${
              searchBy && searchBy.name ? searchBy.name : '...'
            }`}
          />
        )}

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

      <div
        ref={menuRef}
        className="search-panel__menu"
        onClick={handleMenuClick}
      >
        <span className="search-panel__menu-title">
          {searchBy && searchBy.name ? searchBy.name : options[0].name}
        </span>
        <img className="search-panel__menu-arrow" src={arrow} alt="arrow" />

        {menuOpened && (
          <ul ref={menuListRef} className="search-panel__menu-select">
            {options
              ? options.map((option, i) => (
                  <li
                    key={i}
                    className={`search-panel__menu-item ${
                      option.value === searchBy.value
                        ? 'search-panel__menu-item_active'
                        : ''
                    }`}
                    onClick={() => handleMenuItemClick(option)}
                  >
                    {option.name}
                  </li>
                ))
              : null}
          </ul>
        )}
      </div>
    </div>
  )
}
