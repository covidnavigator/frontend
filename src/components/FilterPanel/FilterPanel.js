import React, { useState, useRef, useEffect } from 'react'

import arrow from '../../assets/img/icons/feeds/caret-down.svg'
import './filterPanel.scss'

export function FilterPanel({ filterName, value, options, changeValue }) {
  const [selectOpened, setSelectOpened] = useState(false)
  const panelRef = useRef(null)
  const selectRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setSelectOpened(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [panelRef])

  const handleSelectClick = (e) => {
    if (
      !selectRef.current ||
      (selectRef.current && !selectRef.current.contains(e.target))
    )
      setSelectOpened((prev) => !prev)
  }

  const handleSelectItemClick = (value) => {
    setSelectOpened(false)
    changeValue(value)
  }

  return (
    <div ref={panelRef} className="filter-panel" onClick={handleSelectClick}>
      <span className="filter-panel__title">
        {`${filterName}: ${
          value
            ? options.find((item) => item.value === value).name
            : options[0].name
        }`}
      </span>
      <img className="filter-panel__arrow" src={arrow} alt="arrow" />

      {selectOpened && (
        <ul ref={selectRef} className="filter-panel__select">
          {options
            ? options.map((option, i) => (
                <li
                  key={i}
                  className={`filter-panel__select-item ${
                    option.value === value
                      ? 'filter-panel__select-item_active'
                      : ''
                  }`}
                  onClick={() => handleSelectItemClick(option.value)}
                >
                  {option.name}
                </li>
              ))
            : null}
        </ul>
      )}
    </div>
  )
}
