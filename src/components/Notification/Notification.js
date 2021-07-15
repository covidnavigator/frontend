import React from 'react'

import './notification.scss'

export const Notification = ({
  error,
  type,
  id,
  name,
  action,
  errorMessage,
  handleClose,
}) => {
  return (
    <div
      className={`notification ${
        !error ? 'notification_success' : 'notification_error'
      }`}
    >
      {!error ? (
        <p className="notification__message_success">
          {type}{' '}
          <span className="notification__message__selected-text">
            {name ? name : `#${id}`}
          </span>{' '}
          successfully {action}
        </p>
      ) : (
        <p className="notification__message_error">
          {type}{' '}
          <span className="notification__message__selected-text">
            {name ? name : `#${id}`}
          </span>{' '}
          {errorMessage}
        </p>
      )}
      <div className="notification__close" onClick={handleClose}></div>
    </div>
  )
}
