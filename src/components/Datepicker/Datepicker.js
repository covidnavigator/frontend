import React, { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

import './datepicker.scss'
import calendarIcon from '../../assets/img/icons/feedbacks/icons-calendar.svg'
import times from '../../assets/img/icons/filters/times.svg'

export const Datepicker = ({ startDate, endDate, onChange, className }) => {
  const [isOpen, setOpen] = useState(false)
  const [dateCount, setDateCount] = useState(0)
  const calendarRef = useRef(null)
  const displayRef = useRef(null)
  const imgRef = useRef(null)
  const clearRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !displayRef.current.contains(event.target)
      ) {
        closeCalendar()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [calendarRef])

  useEffect(() => {
    if (dateCount === 2) {
      closeCalendar()
    }
  }, [dateCount])

  const CalendarIcon = () => {
    return (
      <img
        ref={imgRef}
        style={{ width: '16px', height: '16px' }}
        src={calendarIcon}
        alt="arrow"
        onClick={() => setOpen((prev) => !prev)}
      />
    )
  }

  const ClearIcon = () => {
    return (
      <img
        ref={clearRef}
        src={times}
        style={{ width: '12px', height: '12px' }}
        alt="Clear"
        onClick={closeCalendar}
      />
    )
  }

  const closeCalendar = () => {
    setOpen(false)
    setDateCount(0)
  }

  const handleSelect = (ranges) => {
    setDateCount((count) => count + 1)
    onChange(ranges.selection.startDate, ranges.selection.endDate)
  }

  const handleInputChange = (values) => {
    if (values) {
      onChange(values[0], values[1])
    } else {
      onChange(null, null)
    }
  }

  const handleInputClick = (event) => {
    if (
      !imgRef.current.contains(event.target) &&
      !clearRef.current.contains(event.target)
    ) {
      setOpen(true)
    }
  }

  const prepareRange = (start, end) => {
    return {
      startDate: start ? start : new Date(),
      endDate: end ? end : new Date(),
      color: '#00838f',
      key: 'selection',
    }
  }

  return (
    <div className="datepicker">
      <div ref={displayRef} className="datepicker__display">
        <DateRangePicker
          formatLongDate={(locale, date) => {
            return format(date, 'dd MM yyyy')
          }}
          onChange={handleInputChange}
          value={[startDate, endDate]}
          clearIcon={<ClearIcon />}
          calendarIcon={<CalendarIcon />}
          onClick={handleInputClick}
        />
      </div>
      {isOpen && (
        <div ref={calendarRef} className="datepicker__calendar">
          <DateRange
            className="datepicker__calendar__daterange"
            ranges={[prepareRange(startDate, endDate)]}
            onChange={handleSelect}
            maxDate={new Date()}
            showDateDisplay={false}
          />
        </div>
      )}
    </div>
  )
}
