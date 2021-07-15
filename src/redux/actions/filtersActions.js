import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE'
export const SET_FILTERS = 'SET_FILTERS'
export const SET_ACTIVE_NODE = 'SET_ACTIVE_NODE'
export const SET_SUITABLE_ARTICLES = 'SET_SUITABLE_ARTICLES'
export const SET_SUITABLE_ACTIVITIES = 'SET_SUITABLE_ACTIVITIES'
export const RESET_FILTERS_VALUE = 'RESET_FILTERS_VALUE'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const SET_OPENNED_NODE = 'SET_OPENNED_NODE'
export const CHANGE_GRAPHASSETS = 'CHANGE_GRAPHASSETS'
export const CHANGE_GRAPH_ACTIVITIES = 'CHANGE_GRAPH_ACTIVITIES'
export const CHANGE_SLIDER_VALUE = 'CHANGE_SLIDER_VALUE'
export const SET_SUITABLE_DATA = 'SET_SUITABLE_DATA'

export const changeFilterValue = (key, value) => ({
  type: CHANGE_FILTER_VALUE,
  filter: {
    key,
    value,
  },
})

export const chageStatus = (status) => ({
  type: CHANGE_STATUS,
  status,
})

export const changeSliderValue = (value) => ({
  type: CHANGE_SLIDER_VALUE,
  value,
})

export const resetFiltersValue = () => ({
  type: RESET_FILTERS_VALUE,
})

export const setActiveNode = (node) => ({
  type: SET_ACTIVE_NODE,
  node,
})

export const setOpeennedNode = (node) => ({
  type: SET_OPENNED_NODE,
  node,
})

export const changeGraphAssets = (graphAssets) => ({
  type: CHANGE_GRAPHASSETS,
  graphAssets,
})

export const changeGraphActivities = (graphActivities) => ({
  type: CHANGE_GRAPH_ACTIVITIES,
  graphActivities,
})

export const setSuitableData = (data) => ({
  type: SET_SUITABLE_DATA,
  data,
})

export const getGraphData = (filters, node) => {
  const url = buildUrlFromFilters(filters, node)

  return async (dispatch) => {
    await axios
      .get(`${API_URL}activities/graph${url}`)
      .then((response) => {
        dispatch(setSuitableData(response.data))
      })
      .catch(({ response }) => {})
  }
}

const buildUrlFromFilters = (filters, node) => {
  return `${'?role=' + filters.role}${
    filters.graphActivities || filters.graphAssets ? '&searchFor=' : ''
  }${
    filters.graphAssets && filters.graphActivities
      ? 'all'
      : filters.graphAssets
      ? 'assets'
      : filters.graphActivities
      ? 'activities'
      : ''
  }${node.id ? '&category=' + node.id : ''}${
    filters.language ? '&language=' + filters.language : ''
  }${
    filters.formalism.length
      ? filters.formalism.reduce((acc, cur) => acc + '&formalism=' + cur, '')
      : ''
  }${
    filters.source_type.length
      ? filters.source_type.reduce((acc, cur) => acc + '&sourceType=' + cur, '')
      : ''
  }${
    filters.maturity_version.length
      ? filters.maturity_version.reduce(
          (acc, cur) => acc + '&maturity=' + cur,
          ''
        )
      : ''
  }${
    filters.publication_type.length
      ? filters.publication_type.reduce(
          (acc, cur) => acc + '&publicationType=' + cur,
          ''
        )
      : ''
  }${
    filters.knowledge_lifecycle_stage.length
      ? filters.knowledge_lifecycle_stage.reduce(
          (acc, cur) => acc + '&knowledgeStages=' + cur,
          ''
        )
      : ''
  }`
}
