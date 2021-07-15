import React, { useState } from 'react'

export function FormCheckboxGroup({
  options,
  value,
  name,
  allOption,
  onChange,
}) {
  const [allSelected, setAllSelection] = useState(false)
  const [someSelected, setSomeSelected] = useState(false)

  const handleChange = (e, label) => {
    if (label) {
      if (label === 'All' && allSelected) {
        setAllSelection(false)
        onChange(name, [])
      } else if (label === 'All') {
        setAllSelection(true)
        setSomeSelected(false)
        onChange(name, [...options])
      } else {
        const newFilterArray = [...value]
        const index = newFilterArray.indexOf(label)
        if (index === -1) {
          newFilterArray.push(label)
        } else {
          newFilterArray.splice(index, 1)
        }
        if (verify(newFilterArray, options)) {
          setAllSelection(true)
          setSomeSelected(false)
        } else {
          setAllSelection(false)
        }
        newFilterArray.length ? setSomeSelected(true) : setSomeSelected(false)
        onChange(name, newFilterArray)
      }
    }
  }

  let verify = (a, b) =>
    a.length === b.length &&
    ((b = b.slice(0)),
    a.filter((e) => b.some((k, i) => compare(k, e) && b.splice(i, 1))),
    !b.length)

  let compare = (a, b) =>
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((e) => b[e] === a[e])

  return (
    <div className="form-checkbox-group">
      {allOption ? (
        <label
          htmlFor=""
          className="checkbox-container"
          onClick={(e) => handleChange(e, 'All')}
        >
          <input
            type="checkbox"
            checked={value.length}
            onChange={(e) => handleChange(e, 'All')}
          />
          All
          <span
            className={
              allSelected || verify(value, options)
                ? 'checkmark'
                : someSelected || value.length
                ? 'checkmark-some'
                : 'checkmark'
            }
          ></span>
        </label>
      ) : null}
      {options.map((option, index) => (
        <label
          key={index}
          htmlFor=""
          disabled={
            option.className === 'ml-22'
              ? value.some((elem) => {
                  return elem.value === 'knowledge'
                })
                ? false
                : true
              : false
          }
          style={
            option.className === 'ml-22'
              ? value.some((elem) => {
                  return elem.value === 'knowledge'
                })
                ? {}
                : { opacity: 0.5, ':hover': 'none' }
              : {}
          }
          className={
            option.className
              ? `checkbox-container ${option.className}`
              : 'checkbox-container'
          }
          onClick={
            option.className === 'ml-22'
              ? value.some((elem) => {
                  return elem.value === 'knowledge'
                })
                ? (e) => handleChange(e, option)
                : (e) => handleChange(e, false)
              : (e) => handleChange(e, option)
          }
        >
          {option.label}
          <input
            type="checkbox"
            checked={
              option.className === 'ml-22'
                ? value.some((elem) => {
                    return elem.value === 'knowledge'
                  }) &&
                  value.some((elem) => {
                    return elem.value === option.value
                  })
                : value.some((elem) => {
                    return elem.value === option.value
                  })
            }
            onChange={(e) => handleChange(e, option)}
          />

          <span className="checkmark"></span>
        </label>
      ))}
    </div>
  )
}
