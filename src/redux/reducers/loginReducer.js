import ApplicationHelper from '../../assets/js/utils'
import {
  SET_LOGIN,
  SET_LOGIN_PROCESS,
  SET_EMAIL_SENT,
  SET_UNCONFIRMED_USER,
} from '../actions/loginAction'

const initialState = {
  isLogin: ApplicationHelper.getCurrentUserData().token ? true : false,
  loginProcess: false,
  isEmailSent: false,
  unconfirmedUser: {
    username: '',
    email: '',
  },
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.isLogin }
    case SET_LOGIN_PROCESS: {
      return {
        ...state,
        loginProcess: action.loginProcess,
      }
    }
    case SET_EMAIL_SENT: {
      return {
        ...state,
        isEmailSent: action.isSent,
      }
    }
    case SET_UNCONFIRMED_USER: {
      return {
        ...state,
        unconfirmedUser: {
          username: action.username,
          email: action.email,
        },
      }
    }
    default:
      return state
  }
}

export default loginReducer
