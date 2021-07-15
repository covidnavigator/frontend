export const CHANGE_PERMISSIONS = 'CHANGE_PERMISSION'
export const SET_ROLE = 'SET_ROLE'
export const RESET_STATE = 'RESET_STATE'

export const changePermissionsValue = (permissions) => ({
  type: CHANGE_PERMISSIONS,
  permissions,
})

export const setRole = (key, value) => ({
  type: SET_ROLE,
  payload: {
    key,
    value,
  },
})

export const resetState = () => ({
  type: RESET_STATE,
})
