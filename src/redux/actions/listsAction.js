import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_USER_LISTS = 'SET_USER_LISTS'
export const SET_REQUEST = 'SET_REQUEST'
export const SET_CREATE_SUCCESS = 'SET_CREATE_SUCCESS'
export const SET_UPDATE_SUCCESS = 'SET_UPDATE_SUCCESS'
export const SET_DELETE_SUCCESS = 'SET_DELETE_SUCCESS'
export const SET_PROCESSED_LIST_NAME = 'SET_PROCESSED_LIST_NAME'

const setProcessedListName = (name) => ({
  type: SET_PROCESSED_LIST_NAME,
  name,
})

export const getLists = () => {
  return async (dispatch) => {
    dispatch(setRequest(true))

    await axios.get(`${API_URL}list/profile`).then((response) => {
      dispatch(setUserLists(response.data))
    })
  }
}

export const deleteList = (id) => {
  return async (dispatch) => {
    dispatch(setRequest(true))

    await axios.delete(`${API_URL}list/${id}`).then((response) => {
      dispatch(setProcessedListName(response.data.name))
      dispatch({
        type: SET_DELETE_SUCCESS,
      })
    })
  }
}

export const changeList = (id, list) => {
  return async (dispatch) => {
    dispatch(setRequest(true))

    await axios.put(`${API_URL}list/${id}`, list).then((response) => {
      dispatch(setProcessedListName(response.data.name))
      dispatch({
        type: SET_UPDATE_SUCCESS,
      })
    })
  }
}

export const createList = (list) => {
  return async (dispatch) => {
    dispatch(setRequest(true))

    await axios.post(`${API_URL}list`, list).then((response) => {
      dispatch(setProcessedListName(response.data.name))
      dispatch({
        type: SET_CREATE_SUCCESS,
      })
    })
  }
}

const setUserLists = (lists) => ({
  type: SET_USER_LISTS,
  lists,
})

const setRequest = (status) => ({
  type: SET_REQUEST,
  status,
})
