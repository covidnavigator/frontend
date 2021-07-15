import React from 'react'
import { createPortal } from 'react-dom'

import { Notification } from '../Notification'

import './notificationsBox.scss'

const noticeRoot = document.getElementById('root')

export const NotificationsBox = ({ notifications, deleteNotification }) => {
  const generateNotifications = () => {
    return notifications
      .filter((notification) => notification.opened === true)
      .map((notification) => (
        <Notification
          key={notification.noticeId}
          type={notification.type}
          id={notification.id}
          name={notification.name}
          action={notification.action}
          error={notification.error}
          errorMessage={notification.errorMessage}
          handleClose={() => deleteNotification(notification.noticeId)}
        />
      ))
  }

  return createPortal(
    <div className="notifications-box">{generateNotifications()}</div>,
    noticeRoot
  )
}
