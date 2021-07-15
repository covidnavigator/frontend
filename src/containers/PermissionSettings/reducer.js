import { CHANGE_PERMISSIONS, SET_ROLE, RESET_STATE } from './actions'

export const initialState = {
  role: '',
  permissions: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      }
    case SET_ROLE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case RESET_STATE:
      return { ...initialState }
    default:
      return state
  }
}
