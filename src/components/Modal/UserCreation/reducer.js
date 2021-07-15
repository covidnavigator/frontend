import { SET_STATE, SET_VALUE, SET_MODIFY } from './actions'

export const initialState = {
  email: '',
  username: '',
  password: '',
  organization: '',
  currentPassword: '',
  confirmPassword: '',
  role: {},
  isChanged: false,
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_STATE:
      return {
        ...state,
        ...payload.state,
      }
    case SET_VALUE:
      return {
        ...state,
        [payload.key]: payload.value,
      }
    case SET_MODIFY:
      return {
        ...state,
        isChanged: true,
      }
    default:
      return state
  }
}
