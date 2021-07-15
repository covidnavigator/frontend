export const SET_STATE = 'SET_STATE'
export const SET_VALUE = 'SET_VALUE'
export const SET_MODIFY = 'SET_MODIFY'

export const setValue = (key, value) => ({
  type: SET_VALUE,
  payload: {
    key,
    value,
  },
})

export const setUserData = (state) => ({
  type: SET_STATE,
  payload: {
    state,
  },
})

export const edit = () => ({
  type: SET_MODIFY,
})
