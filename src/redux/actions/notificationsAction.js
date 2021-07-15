export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const SET_NOTIFICATION_STATUS = 'SET_NOTIFICATION_STATUS'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  notification,
})

export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  id,
})

export const setNotificationStatus = (id, status) => ({
  type: SET_NOTIFICATION_STATUS,
  id,
  status,
})
