import React from 'react'

import './menuItem.scss'

export const MenuItem = ({
  className,
  handleClick,
  children,
  isComingSoon,
}) => {
  return isComingSoon ? (
    <li
      className={`table-actions__item ${className}`}
      data-small-hint="Coming soon!"
      data-small-hint-at="right"
    >
      {children}
    </li>
  ) : (
    <li className={`table-actions__item ${className}`} onClick={handleClick}>
      {children}
    </li>
  )
}
