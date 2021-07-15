import { addDays, isEqual } from 'date-fns'
import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const CHANGE_FEEDBACK_VALUE = 'CHANGE_FEEDBACK_VALUE'
export const CHANGE_DATE = 'CHANGE_DATE'
export const SET_FEEDBACK_REQUEST = 'SET_FEEDBACK_REQUEST'
export const SET_PROCESSED_FEEDBACK_ID = 'SET_PROCESSED_FEEDBACK_ID'
export const SET_FEEDBACK_CREATE_SUCCESS = 'SET_FEEDBACK_CREATE_SUCCESS'
export const SET_FEEDBACK_UPDATE_SUCCESS = 'SET_FEEDBACK_UPDATE_SUCCESS'
export const SET_FEEDBACK_DELETE_SUCCESS = 'SET_FEEDBACK_DELETE_SUCCESS'

export const changeValue = (key, value) => ({
  type: CHANGE_FEEDBACK_VALUE,
  payload: {
    key,
    value,
  },
})

export const setDate = (startDate, endDate) => ({
  type: CHANGE_DATE,
  payload: {
    startDate,
    endDate,
  },
})

const setFeedbackRequest = () => ({
  type: SET_FEEDBACK_REQUEST,
})

const setProcessedFeedbackId = (id) => ({
  type: SET_PROCESSED_FEEDBACK_ID,
  id: id,
})

const setFeedbackValue = (dispatch, body) => {
  dispatch(changeValue('data', body.data))
  dispatch(changeValue('totalCount', body.totalCount))
  dispatch(changeValue('allResults', body.allCount))
  dispatch(changeValue('searchMore', false))
}

export const getFeedbackAction = (url, startDate, endDate) => {
  let urlParams = url
  if (urlParams === undefined) {
    urlParams = '?page=1&limit=30&sortName=id&sortType=up'
  }

  let data = {}
  if (startDate && endDate) {
    data = {
      startDate: startDate,
      endDate: addDays(endDate, 1),
    }
  }

  return async (dispatch) => {
    if (Object.keys(data).length) {
      await axios
        .post(`${API_URL}feedbacks${urlParams}`, data)
        .then((response) => {
          setFeedbackValue(dispatch, response.data)
        })
    } else {
      await axios.post(`${API_URL}feedbacks${urlParams}`).then((response) => {
        setFeedbackValue(dispatch, response.data)
      })
    }
  }
}

export const createFeedbackAction = (feedback) => {
  return async (dispatch) => {
    dispatch(setFeedbackRequest())

    await axios.post(`${API_URL}feedback`, feedback).then((response) => {
      dispatch(setProcessedFeedbackId(response.data.id))
      dispatch({
        type: SET_FEEDBACK_CREATE_SUCCESS,
      })
    })
  }
}

export const updateFeedbackAction = (id, data) => {
  return async (dispatch) => {
    dispatch(setFeedbackRequest())

    await axios.patch(`${API_URL}feedback/${id}`, data).then((response) => {
      dispatch(setProcessedFeedbackId(response.data.id))

      dispatch({
        type: SET_FEEDBACK_UPDATE_SUCCESS,
      })
    })
  }
}

export const deleteFeedbackAction = (id) => {
  return async (dispatch) => {
    dispatch(setFeedbackRequest())

    await axios.delete(`${API_URL}feedback/${id}`).then((response) => {
      dispatch(setProcessedFeedbackId(id))
      dispatch({
        type: SET_FEEDBACK_DELETE_SUCCESS,
      })
    })
  }
}
