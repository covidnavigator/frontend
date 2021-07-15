import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const CHANGE_ACTIVITIES_VALUE = 'CHANGE_ACTIVITIES_VALUE'
export const SET_ACTIVITIES_REQUEST = 'SET_ACTIVITIES_REQUEST'
export const SET_ACTIVITIES_SUCCESSFULLY_CREATE =
  'SET_ACTIVITIES_SUCCESSFULLY_CREATE'
export const SET_ACTIVITIES_SUCCESSFULLY_UPDATE =
  'SET_ACTIVITIES_SUCCESSFULLY_UPDATE'
export const SET_ACTIVITIES_SUCCESSFULLY_DELETE =
  'SET_ACTIVITIES_SUCCESSFULLY_DELETE'
export const SET_ACTIVITY_ORGANIZATION_ERROR = 'SET_ACTIVITY_ORGANIZATION_ERROR'
export const SET_PROCESSED_ACTIVITY_ID = 'SET_PROCESSED_ACTIVITY_ID'
export const RESET_ACTIVITIES_STORE = 'RESET_ACTIVITIES_STORE'

export const changeValue = (key, value) => ({
  type: CHANGE_ACTIVITIES_VALUE,
  payload: {
    key,
    value,
  },
})

export const resetStore = () => ({
  type: RESET_ACTIVITIES_STORE,
})

const setActivitiesRequest = () => ({
  type: SET_ACTIVITIES_REQUEST,
})

const setActivitySuccessCreate = () => ({
  type: SET_ACTIVITIES_SUCCESSFULLY_CREATE,
})

const setActivitySuccessUpdate = () => ({
  type: SET_ACTIVITIES_SUCCESSFULLY_UPDATE,
})

const setActivitySuccessDelete = () => ({
  type: SET_ACTIVITIES_SUCCESSFULLY_DELETE,
})

const setProcessedActivityId = (id) => ({
  type: SET_PROCESSED_ACTIVITY_ID,
  id: id,
})

const setActitityValue = (
  dispatch,
  body,
  isActivitiesPage,
  isProfileActivitiesPage
) => {
  if (isActivitiesPage) {
    dispatch(changeValue('data', body.data))
    dispatch(changeValue('totalCount', body.totalCount))
  } else if (isProfileActivitiesPage) {
    dispatch(changeValue('profilePageData', body.data))
    dispatch(changeValue('totalCount', body.totalCount))
  } else {
    dispatch(changeValue('graphData', body.data))
  }
  dispatch(changeValue('searchMore', false))
}

const stateToObject = (state) => {
  const organizations = []

  state.organizations.forEach((organization) => {
    const newOrganization = { organization: {}, owner: '', keywords: [] }
    if (organization.organization.selected.value) {
      newOrganization.organization.id = organization.organization.selected.value
    } else {
      newOrganization.organization.name = organization.organization.name
      newOrganization.organization.type = organization.organization.type.label
      newOrganization.organization.description =
        organization.organization.description
      newOrganization.organization.contacts = organization.organization.contacts
        ? organization.organization.contacts
        : []
      if (organization.organization.keywords) {
        newOrganization.keywords = organization.organization.keywords.map(
          (keyword) => {
            return {
              keyword: keyword.value,
            }
          }
        )
      } else {
        newOrganization.organization.keywords = []
      }
    }
    newOrganization.owner = organization.owner
    if (newOrganization.organization.id || newOrganization.organization.name) {
      organizations.push(newOrganization)
    }
  })

  let data = {
    name: state.activity.name,
    shortDescription: state.activity.shortDescription,
    description: state.activity.description,
    status: state.activity.status.value,
    url: state.activity.url,
    author: { id: state.activity.author.id },
    articles: state.activity.assets ? state.activity.assets : [],
    related: state.activity.activities ? state.activity.activities : [],
    knowledgeStages: [
      ...state.activity.knowledgeStages.map((item) => item.value),
    ],
    categories: [
      ...state.activity.activityType.map((item) => item.value),
      ...state.activity.subject.map((item) => item.value),
      ...state.activity.setting.map((item) => item.value),
      ...state.activity.process.map((item) => item.value),
    ],
    contacts: state.contacts,
  }

  if (state.activity.id) {
    data.id = state.activity.id
  }

  return {
    data,
    keywords: state.activity.keywords
      ? state.activity.keywords.map((keyword) => {
          return {
            keyword: keyword.value,
          }
        })
      : [],
    organizations,
  }
}

export const getActivityAction = (id, callback) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}activities/${id}`).then((response) => {
      callback(response.data)
    })
  }
}

export const getActivitiesAction = (url, callback) => {
  let isActivitiesPage = false
  let isProfileActivitiesPage = false

  if (typeof callback !== 'function' && callback) {
    isProfileActivitiesPage = true
  } else {
    isActivitiesPage = true
  }

  return async (dispatch) => {
    await axios.get(`${API_URL}${url}`).then((response) => {
      if (typeof callback === 'function') {
        callback(response.data.data)
      } else {
        setActitityValue(
          dispatch,
          response.data,
          isActivitiesPage,
          isProfileActivitiesPage
        )
      }
    })
  }
}

export const getActivitiesCount = () => {
  return async (dispatch) => {
    await axios
      .get(`${API_URL}activities/count`)
      .then((response) => {
        dispatch(changeValue('allResults', response.data))
      })
      .catch(({ response }) => {
        dispatch(changeValue('allResults', 0))
      })
  }
}

export const createActivityAction = (state) => {
  const data = stateToObject(state)

  return async (dispatch) => {
    dispatch(setActivitiesRequest())

    await axios
      .post(`${API_URL}activities`, data)
      .then((response) => {
        dispatch(setProcessedActivityId(response.data.id))
        dispatch(setActivitySuccessCreate())
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          dispatch({
            type: SET_ACTIVITY_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}

export const updateActivityAction = (state) => {
  const data = stateToObject(state)
  return async (dispatch) => {
    dispatch(setActivitiesRequest())

    await axios
      .patch(`${API_URL}activities/${data.data.id}`, data)
      .then((response) => {
        dispatch(setProcessedActivityId(response.data.id))
        dispatch(setActivitySuccessUpdate())
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          dispatch({
            type: SET_ACTIVITY_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}

export const updateStatusAction = (id, status) => {
  const data = {
    data: {
      status: status,
    },
  }

  return async (dispatch) => {
    dispatch(setActivitiesRequest())

    await axios
      .patch(`${API_URL}activities/${id}`, data)
      .then((response) => {
        dispatch(setProcessedActivityId(response.data.id))
        dispatch(setActivitySuccessUpdate())
      })
      .catch(({ response }) => {
        if (response.status === 409) {
          dispatch({
            type: SET_ACTIVITY_ORGANIZATION_ERROR,
            message: response.data.message,
          })
        }
      })
  }
}

export const deleteActivityAction = (id) => {
  return async (dispatch) => {
    dispatch(setActivitiesRequest())

    await axios
      .delete(`${API_URL}activities/${id}`)
      .then((response) => {
        dispatch(setProcessedActivityId(id))
        dispatch(setActivitySuccessDelete())
      })
      .catch(({ response }) => {
        //response error
      })
  }
}
