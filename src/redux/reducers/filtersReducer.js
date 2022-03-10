import {
  CHANGE_FILTER_VALUE,
  SET_ACTIVE_NODE,
  SET_SUITABLE_ARTICLES,
  SET_SUITABLE_ACTIVITIES,
  RESET_FILTERS_VALUE,
  CHANGE_STATUS,
  SET_OPENNED_NODE,
  CHANGE_GRAPHASSETS,
  CHANGE_GRAPH_ACTIVITIES,
  CHANGE_SLIDER_VALUE,
  SET_SUITABLE_DATA,
} from '../actions/filtersActions'

import {
  assetsFilters,
  activitiesFilters,
} from '../../assets/js/options/articlesFilters'

export const initialState = {
  status: false,
  suitableArticles: [],
  suitableActivities: [],
  activeNode: { id: '', data: { $assetId: '', $activityId: '' }, name: '' },
  opennedNode: { id: '', data: {}, name: '' },
  slider: 2,
  filters: {
    activeFilters: 0,
    role: 'directCare',
    publication_type: [],
    language: 'en',
    maturity_version: [],
    formalism: [],
    source_type: [],
    knowledge_lifecycle_stage: [],
    graphIcons: false,
    visibilityLevel: 100,
    graphAllRelations: false,
    graphRelated: false,
    graphAssets: true,
    graphActivities: true,
  },

  knowledgeStages: '',
  activityType: '',
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_VALUE:
      let obj = {
        ...state,
        filters: {
          ...state.filters,
          [action.filter.key]: action.filter.value,
        },
      }
      let count = 0
      for (let key in obj.filters) {
        if (Array.isArray(obj.filters[key]) && !!obj.filters[key].length) {
          count += obj.filters[key].length
          if (
            (!state.filters.graphAssets &&
              assetsFilters.includes(key) &&
              !activitiesFilters.includes(key)) ||
            (!state.filters.graphActivities &&
              activitiesFilters.includes(key) &&
              !assetsFilters.includes(key))
          ) {
            count -= obj.filters[key].length
          }
        } else if (
          !Array.isArray(obj.filters[key]) &&
          !!obj.filters[key].length &&
          key !== 'role' &&
          key !== 'activeFilters' &&
          key !== 'graphIcons' &&
          key !== 'visibilityLevel' &&
          key !== 'graphAllRelations' &&
          key !== 'graphRelated' &&
          key !== 'graphAssets' &&
          key !== 'graphActivities' &&
          key !== 'language'
        ) {
          count += 1
        }
      }

      return { ...obj, filters: { ...obj.filters, activeFilters: count } }
    case RESET_FILTERS_VALUE:
      return {
        ...state,
        filters: {
          ...state.filters,
          activeFilters: 0,
          role: 'directCare',
          publication_type: [],
          language: 'en',
          maturity_version: [],
          formalism: [],
          knowledge_lifecycle_stage: [],
          source_type: [],
        },
      }
    case SET_ACTIVE_NODE:
      return {
        ...state,
        activeNode: action.node,
      }
    case SET_OPENNED_NODE:
      return {
        ...state,
        opennedNode: action.node,
      }

    case CHANGE_GRAPHASSETS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          graphAssets: action.graphAssets,
        },
      }
    }

    case CHANGE_GRAPH_ACTIVITIES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          graphActivities: action.graphActivities,
        },
      }
    }

    case SET_SUITABLE_DATA:
      return {
        ...state,
        suitableActivities: action.data.activities,
        suitableArticles: action.data.articles,
      }

    case CHANGE_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case CHANGE_SLIDER_VALUE:
      return {
        ...state,
        slider: action.value,
      }

    default:
      return state
  }
}

export default filtersReducer
