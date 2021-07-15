import React, { useState, useRef, useEffect } from 'react'

import ApplicationHelper from '../../assets/js/utils'

import { CheckboxInput } from '../../components'

import arrow from '../../assets/img/icons/feeds/caret-down.svg'

export function Filters({
  handleChangingFilterValue,
  filters,
  title,
  group,
  items = [],
}) {
  const infoRef = useRef()
  const [visibility, setVisibility] = useState(false)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setOpened(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [infoRef])

  useEffect(() => {
    items.filter((item) => filters[group].includes(item.label)).length
      ? setVisibility(true)
      : setVisibility(false)
  }, [])

  const handleClickInfo = () => {
    setOpened((prev) => !prev)
  }

  const handleClick = () => {
    setVisibility((prev) => !prev)
  }

  const handleChange = (e, label, group) => {
    const newFilterArray = [...filters[group]]
    const index = newFilterArray.indexOf(label)
    if (index === -1) {
      newFilterArray.push(label)
    } else {
      newFilterArray.splice(index, 1)
    }
    handleChangingFilterValue(newFilterArray, group)
  }

  return (
    <div className="filters">
      <div className="filters__header">
        <img
          className="filters__expand"
          style={
            !visibility
              ? {
                  transform: 'rotate(-90deg)',
                }
              : {}
          }
          src={arrow}
          alt="arrow"
          onClick={handleClick}
        />
        <h3 onClick={handleClick} className="filters__title">
          {title}
        </h3>
        <div
          ref={infoRef}
          className={
            opened ? 'filters__help filters__help-opened' : 'filters__help'
          }
        >
          {opened ? (
            <div
              ref={infoRef}
              className="filters__help-trigger"
              onClick={handleClickInfo}
              data-large-hint={ApplicationHelper.compouseDescription(
                items.filter((item) => item.helpText)
              )}
              data-large-hint-at="right"
            />
          ) : (
            <div
              ref={infoRef}
              className="filters__help-trigger"
              onClick={handleClickInfo}
            />
          )}
        </div>

        {filters[group] && filters[group].length ? (
          <p className="filters__count">{filters[group].length}</p>
        ) : null}
      </div>
      {visibility ? (
        <ul className="filters-list">
          {items.map((item, index) => (
            <CheckboxInput
              key={index}
              label={item.label}
              item={item}
              isSelected={filters[group].includes(item.value)}
              group={group}
              handleChange={handleChange}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}
