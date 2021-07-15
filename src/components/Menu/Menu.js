import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import './menu.scss'

const menuRoot = document.getElementById('root')

export const Menu = ({
  children,
  menuPosition,
  isOpenUp,
  handleClose,
  className,
}) => {
  const menuRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (menuRef.current) {
      setDimensions({
        width: menuRef.current.offsetWidth,
        height: menuRef.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleClose)
    }
  }, [menuRef])

  const computePosition = () => {
    const position = {
      top: 0,
      left: menuPosition.left - dimensions.width,
    }
    if (isOpenUp) {
      position.top = menuPosition.top - dimensions.height
    } else {
      position.top = menuPosition.top
    }
    return position
  }

  return createPortal(
    <div className="menu_overlay">
      <ul
        ref={menuRef}
        className={`
          table-actions_open table-actions
          ${className ? className : ''}
        `}
        style={computePosition()}
      >
        {children}
      </ul>
    </div>,
    menuRoot
  )
}
