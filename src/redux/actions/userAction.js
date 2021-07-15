import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_USER = 'SET_USER'
export const SET_PROFILE_INFO = 'SET_PROFILE_INFO'

export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const setProfileInfo = (info) => ({
  type: SET_PROFILE_INFO,
  payload: {
    articlesCount: info.articlesCount,
    activitiesCount: info.activitiesCount,
  },
})

export function getCurrentUser() {
  return async (dispatch) => {
    await axios.get(`${API_URL}user`).then((response) => {
      dispatch(setUser(response.data))
    })
  }
}

export function getProfileInfo() {
  return async (dispatch) => {
    await axios.get(`${API_URL}profileInfo`).then((response) => {
      dispatch(setProfileInfo(response.data))
    })
  }
}
