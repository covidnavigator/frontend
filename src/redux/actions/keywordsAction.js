import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_KEYWORDS = 'SET_KEYWORDS'

export const setKeywords = (keywords) => ({
  type: SET_KEYWORDS,
  payload: {
    keywords,
  },
})

export const getKeywords = (callback, url) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}keywords${url ? url : ''}`).then((response) => {
      if (response.data.length) {
        const keywordsSelect = response.data.map((item) => {
          return { label: item.keyword, value: item.keyword }
        })
        if (callback) {
          callback(keywordsSelect)
        } else {
          dispatch(setKeywords(keywordsSelect))
        }
      }
    })
  }
}
