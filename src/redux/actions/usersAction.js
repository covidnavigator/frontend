import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_PAGE = 'SET_PAGE'
export const SET_USERS_REQUEST = 'SET_USERS_REQUEST'
export const SET_USERS_DATA = 'SET_USERS_DATA'
export const SET_USER_CREATE_SUCCESS = 'SET_USER_CREATE_SUCCESS'
export const SET_USER_UPDATE_SUCCESS = 'SET_USER_UPDATE_SUCCESS'
export const SET_USER_DELETE_SUCCESS = 'SET_USER_DELETE_SUCCESS'
export const SET_USER_DELETE_ERROR = 'SET_USER_DELETE_ERROR'
export const SET_EMAIL_ERROR_MESSAGE = 'SET_EMAIL_ERROR_MESSAGE'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const SET_PROCESSED_USER_ID = 'SET_PROCESSED_USER_ID'
export const RESET_USER_ERRORS = 'RESET_USER_ERRORS'
export const CHANGE_USER_VALUE = 'CHANGE_USER_VALUE'
export const SET_USERS_COUNT = 'SET_USERS_COUNT'

export const changeValue = (key, value) => ({
  type: CHANGE_USER_VALUE,
  payload: {
    key,
    value,
  },
})

export const setPage = (page) => ({
  type: SET_PAGE,
  action: {
    page,
  },
})

const setUsersRequest = () => ({
  type: SET_USERS_REQUEST,
})

const setUserCreateSuccess = () => ({
  type: SET_USER_CREATE_SUCCESS,
})

const setUserUpdateSuccess = () => ({
  type: SET_USER_UPDATE_SUCCESS,
})

const setUserDeleteSuccess = () => ({
  type: SET_USER_DELETE_SUCCESS,
})

const setUserDeleteError = () => ({
  type: SET_USER_DELETE_ERROR,
})

const setProcessedUserID = (id) => ({
  type: SET_PROCESSED_USER_ID,
  id: id,
})

export const resetUserErrors = () => ({
  type: RESET_USER_ERRORS,
})

const setUserValue = (dispatch, body) => {
  dispatch(changeValue('data', body.data))
  dispatch(changeValue('totalCount', body.totalCount))
  dispatch(changeValue('searchMore', false))
}

const setUsersCount = (count) => ({
  type: SET_USERS_COUNT,
  count,
})

const userStateToObject = (state) => {
  if (!state.password) {
    return {
      email: state.email.trim(),
      username: state.username.trim(),
      organization: state.organization.trim(),
      role: { id: state.role.value },
    }
  }
  return {
    password: state.password.trim(),
  }
}

const prepareUserForCreation = (state) => {
  return {
    email: state.email.trim(),
    username: state.username.trim(),
    organization: state.organization.trim(),
    role: { id: state.role.value },
    password: state.password.trim(),
  }
}

export const getUserAction = (id, callback) => {
  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios.get(`${API_URL}user/${id}`).then((response) => {
      callback(response.data)
    })
  }
}

export const getUsersAction = (url, callback) => {
  let urlParams = url
  if (urlParams === undefined) {
    urlParams = '?page=1&limit=30&sortName=users.id&sortType=up'
  }

  return async (dispatch) => {
    dispatch(setUsersRequest())
    await axios.get(`${API_URL}users${urlParams}`).then((response) => {
      if (callback) {
        callback(response.data)
      } else {
        setUserValue(dispatch, response.data)
      }
    })
  }
}

export const getUsersCount = () => {
  return async (dispatch) => {
    await axios.get(`${API_URL}usersCount`).then((response) => {
      dispatch(setUsersCount(response.data))
    })
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios
      .post(`${API_URL}users`, prepareUserForCreation(user))
      .then((response) => {
        dispatch(setProcessedUserID(response.data.id))
        dispatch(setUserCreateSuccess())
      })
      .catch(({ response }) => {
        if (response.data.message === 'Email has already been taken') {
          dispatch({
            type: SET_EMAIL_ERROR_MESSAGE,
            message: response.data.message,
          })
        } else {
          dispatch({ type: SET_ERROR_MESSAGE, message: response.data.message })
        }
      })
  }
}

export const updateUserPassword = (currentPassword, newPassword) => {
  const data = { currentPassword, newPassword }

  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios
      .put(`${API_URL}user/password`, data)
      .then((response) => {
        dispatch(setProcessedUserID(response.data.id))
        dispatch(setUserUpdateSuccess())
      })
      .catch(({ response }) => {
        if (response.data.message === 'Wrong current password!') {
          dispatch({
            type: SET_ERROR_MESSAGE,
            message: response.data.message,
          })
        }
      })
  }
}

export const updateUserStatus = (id, status) => {
  const data = { active: status }

  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios
      .patch(`${API_URL}user/${id}`, data)
      .then((response) => {
        dispatch(setProcessedUserID(response.data.id))
        dispatch(setUserUpdateSuccess())
      })
      .catch(({ response }) => {
        dispatch({ type: SET_ERROR_MESSAGE, message: response.data.message })
      })
  }
}

export const updateUser = (id, state) => {
  const data = userStateToObject(state)

  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios
      .patch(`${API_URL}user/${id}`, data)
      .then((response) => {
        dispatch(setProcessedUserID(response.data.id))
        dispatch(setUserUpdateSuccess())
      })
      .catch(({ response }) => {
        if (response.data.message === 'Email has already been taken') {
          dispatch({
            type: SET_EMAIL_ERROR_MESSAGE,
            message: response.data.message,
          })
        } else {
          dispatch({ type: SET_ERROR_MESSAGE, message: response.data.message })
        }
      })
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(setUsersRequest())

    await axios
      .delete(`${API_URL}user/${id}`)
      .then((response) => {
        dispatch(setProcessedUserID(id))
        dispatch(setUserDeleteSuccess())
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          dispatch({
            type: SET_ERROR_MESSAGE,
            message: 'cannot be deleted because of contained assets',
          })
        }
        dispatch(setUserDeleteError())
      })
  }
}
