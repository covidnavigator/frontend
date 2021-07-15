import React from 'react'

import './tabs.scss'

export const Tabs = ({ tabList, status, onTabChange }) => {
  const generateTabs = tabList.map((item) => {
    return (
      <li
        key={item.id}
        className={
          item.name === status.name ? 'tabs-item-selected' : 'tabs-item'
        }
        onClick={() => onTabChange(item)}
      >
        <span>{item.name.split(' ')[0]}</span>
      </li>
    )
  })

  return <ul className="tabs">{generateTabs}</ul>
}
