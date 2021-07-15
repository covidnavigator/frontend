import * as types from '../actions/notificationsAction'

const initialState = {
  notifications: [],
  nextId: 0,
}

const notificationsReducer = (state = initialState, action) => {
  let notifications = []

  switch (action.type) {
    case types.ADD_NOTIFICATION: {
      notifications = [...state.notifications]
      notifications.push({
        noticeId: state.nextId,
        opened: false,
        ...action.notification,
      })
      if (notifications.length > 3) {
        notifications.splice(0, 1)
      }
      return {
        ...state,
        notifications: notifications,
        nextId: state.nextId + 1,
      }
    }

    case types.DELETE_NOTIFICATION: {
      notifications = [...state.notifications]
      const index = notifications.findIndex(
        (notification) => notification.noticeId === action.id
      )
      if (index !== -1) {
        notifications.splice(index, 1)
      }
      return {
        ...state,
        notifications: notifications,
      }
    }

    case types.SET_NOTIFICATION_STATUS: {
      notifications = [...state.notifications]
      notifications.forEach((notification) => {
        if (notification.noticeId === action.id) {
          notification.opened = action.status
        }
      })
      return {
        ...state,
        notifications: notifications,
      }
    }

    default:
      return state
  }
}

export default notificationsReducer
