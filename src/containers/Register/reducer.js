import * as types from './actions'

export const initialState = {
  username: '',
  email: '',
  organization: '',
  password: '',
  confirmPassword: '',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_REGISTER_VALUE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    }

    default:
      return state
  }
}
