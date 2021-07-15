import React from 'react'

import './popup.scss'

export function DeactivationPopup({ type, name, handleClick, handleClose }) {
  return (
    <div className="popup">
      <p className="popup__text">
        Are you sure you want to{' '}
        {type === 'deactivate' ? 'deactivate' : 'activate'} <em>"{name}"</em>?
      </p>
      <div className="popup__buttons">
        <button className="popup__buttons__cancel" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="popup__buttons__delete"
          onClick={() => {
            handleClick()
            handleClose()
          }}
        >
          {type === 'deactivate' ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      <div className="popup__close" onClick={handleClose}></div>
    </div>
  )
}
