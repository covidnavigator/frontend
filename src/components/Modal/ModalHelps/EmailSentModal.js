import React from 'react'

import './help.scss'

export function EmailSentModal({ username, email, handleClose }) {
  return (
    <section className="help-modal__container">
      <div className="help-modal__header">
        <h2 className="help-modal__title">
          {username}, everything is almost ready!
        </h2>
      </div>
      <div className="help-modal__body">
        <p className="help-modal__text">
          To activate your account, please follow the link in our letter sent to{' '}
          <span className="help-modal__text_important">{email}</span>
        </p>
      </div>
      <div className="help-modal__footer">
        <button className="help-modal__accept-btn" onClick={handleClose}>
          Ok
        </button>
      </div>
    </section>
  )
}
