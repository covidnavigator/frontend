import React from 'react'
import ReactHintFactory from 'react-hint'

import './hint.scss'

export const Hint = ({ attribute, hideTime, hover, className }) => {
  const ReactHint = ReactHintFactory(React)

  return (
    <ReactHint
      persist
      delay={
        hideTime
          ? { hide: hideTime }
          : hover
          ? { show: 200, hide: 200 }
          : { hide: 1 }
      }
      attribute={attribute ? attribute : 'data-small-hint'}
      className={className ? className : 'small-hint'}
      autoPosition
      events={{ click: true, hover }}
    />
  )
}
