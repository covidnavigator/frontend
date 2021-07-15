import { SET_USER, SET_PROFILE_INFO } from '../actions/userAction'

const initialState = {
  id: 1,
  createdAt: '',
  updatedAt: '',
  email: '',
  username: '',
  role: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    case SET_PROFILE_INFO:
      return {
        ...state,
        articlesCount: action.payload.articlesCount,
        activitiesCount: action.payload.activitiesCount,
      }
    default:
      return state
  }
}

export default userReducer
