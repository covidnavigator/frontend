import React from 'react'

import './popup.scss'

export function Popup({ text, handleClick, handleClose }) {
  return (
    <div className="popup">
      <p className="popup__text">
        Are you sure you want to permanently delete <em>"{text}"</em>? You can't
        undo this action.
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
          Delete
        </button>
      </div>
    </div>
  )
}
