import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const CHANGE_ORGANIZATION_VALUE = 'CHANGE_ORGANIZATION_VALUE'
export const SET_PROCESSED_ORGANIZATION_ID = 'SET_PROCESSED_ORGANIZATION_ID'
export const SET_ORGANIZATION_REQUEST = 'SET_ORGANIZATION_REQUEST'
export const SET_ORGANIZATION_CREATE_SUCCESS = 'SET_ORGANIZATION_CREATE_SUCCESS'
export const SET_ORGANIZATION_UPDATE_SUCCESS = 'SET_ORGANIZATION_UPDATE_SUCCESS'
export const SET_ORGANIZATION_DELETE_SUCCESS = 'SET_ORGANIZATION_DELETE_SUCCESS'
export const SET_ORGANIZATION_ERROR = 'SET_ORGANIZATION_ERROR'

export const changeValue = (key, value) => ({
  type: CHANGE_ORGANIZATION_VALUE,
  payload: {
    key,
    value,
  },
})

const setOrganizationRequest = () => ({
  type: SET_ORGANIZATION_REQUEST,
})

const setOrganizationCreateSuccess = () => ({
  type: SET_ORGANIZATION_CREATE_SUCCESS,
})

const setOgranizationUpdateSuccess = () => ({
  type: SET_ORGANIZATION_UPDATE_SUCCESS,
})

const setProcessedOrganizationId = (id) => ({
  type: SET_PROCESSED_ORGANIZATION_ID,
  id: id,
})

const setOrganizationValue = (dispatch, body) => {
  dispatch(changeValue('data', body.data))
  dispatch(changeValue('totalCount', body.totalCount))
  dispatch(changeValue('allResults', body.allCount))
  dispatch(changeValue('searchMore', false))
}

const stateToObject = (state) => {
  return {
    data: {
      name: state.organization.name,
      type: state.organization.type.label,
      description: state.organization.description,
      keywords: state.organization.keywords
        ? state.organization.keywords.map((item) => item.label)
        : [],
      contacts: [...state.contacts],
    },
    keywords: state.organization.keywords
      ? state.organization.keywords.map((keyword) => {
          return {
            keyword: keyword.value,
          }
        })
      : [],
  }
}

export const getOrganizationAction = (id, callback) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}organization/${id}`).then((response) => {
      callback(response.data)
    })
  }
}

export const getOrganizationsAction = (url, callback) => {
  let urlParams = url
  if (urlParams === undefined) {
    urlParams = '?page=1&limit=30&sortName=organizations.id&sortType=up'
  }

  return async (dispatch) => {
    await axios.get(`${API_URL}organization${urlParams}`).then((response) => {
      if (callback) {
        callback(response.data)
      } else {
        setOrganizationValue(dispatch, response.data)
      }
    })
  }
}

export const createOrganizationAction = (state) => {
  const data = stateToObject(state)

  return async (dispatch) => {
    dispatch(setOrganizationRequest())

    await axios
      .post(`${API_URL}organization`, data)
      .then((response) => {
        dispatch(setProcessedOrganizationId(response.data.id))
        dispatch(setOrganizationCreateSuccess())
      })
      .catch(({ response }) => {
        if (
          response.data.message === 'Organization with this name already exists'
        ) {
          dispatch({
            type: SET_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}

export const updateOrganizationAction = (id, state) => {
  const data = stateToObject(state)

  return async (dispatch) => {
    dispatch(setOrganizationRequest())

    await axios
      .patch(`${API_URL}organization/${id}`, data)
      .then((response) => {
        dispatch(setProcessedOrganizationId(response.data.id))
        dispatch(setOgranizationUpdateSuccess())
      })
      .catch(({ response }) => {
        if (
          response.data.message === 'Organization with this name already exists'
        ) {
          dispatch({
            type: SET_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}

export const deleteOrganizationAction = (id) => {
  return async (dispatch) => {
    dispatch(setOrganizationRequest())

    await axios
      .delete(`${API_URL}organization/${id}`)
      .then((response) => {
        dispatch(setProcessedOrganizationId(id))
        dispatch({
          type: SET_ORGANIZATION_DELETE_SUCCESS,
        })
      })
      .catch(({ response }) => {
        if (
          response.data.message === 'Organization with this name already exists'
        ) {
          dispatch({
            type: SET_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}
