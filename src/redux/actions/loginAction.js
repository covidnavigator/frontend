import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGIN_PROCESS = 'SET_LOGIN_PROCESS'
export const SET_EMAIL_SENT = 'SET_EMAIL_SENT'
export const SET_UNCONFIRMED_USER = 'SET_UNCONFIRMED_USER'

export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  isLogin,
})

export const setLoginProcess = (loginProcess) => ({
  type: SET_LOGIN_PROCESS,
  loginProcess,
})

export const setEmailSent = (isSent) => ({
  type: SET_EMAIL_SENT,
  isSent,
})

const setUnconfirmedUser = ({ username, email }) => ({
  type: SET_UNCONFIRMED_USER,
  username,
  email,
})

const stateToRegistrationData = (state) => {
  return {
    username: state.username.trim(),
    email: state.email.trim(),
    organization: state.organization.trim(),
    password: state.password.trim(),
  }
}

export const loginAction = (credentials, callbackSuccess, callbackError) => {
  return async (dispatch) => {
    await axios
      .post(`${API_URL}users/login`, credentials)
      .then((response) => {
        callbackSuccess(response.data)
      })
      .catch((res) => {
        if (res.response) {
          callbackError(res.response.data)
        }
      })
  }
}

export const registerAction = (state, callbackSuccess, callbackError) => {
  return async (dispatch) => {
    await axios
      .post(`${API_URL}users/register`, stateToRegistrationData(state))
      .then((response) => {
        dispatch(setUnconfirmedUser(response.data))
        dispatch(setEmailSent(true))
        callbackSuccess(response.data)
      })
      .catch((response) => {
        if (response.response) {
          callbackError(response.response.data.message)
        }
      })
  }
}

export const confirmAction = (userId, code, callbackSuccess, callbackError) => {
  return async (dispatch) => {
    await axios
      .post(`${API_URL}users/confirm`, { userId, code })
      .then((response) => {
        callbackSuccess(response.data)
      })
      .catch((response) => {
        if (response.response) {
          callbackError(response.response.data)
        }
      })
  }
}
