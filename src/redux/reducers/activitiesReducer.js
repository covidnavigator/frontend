import * as types from '../actions/activitiesAction'

import { activitiesSearchByOptions } from '../../assets/js/options/navigationPanelOptions'

export const initialState = {
  data: [],
  graphData: [],
  profilePageData: [],
  searchString: '',
  searchBy: activitiesSearchByOptions[0],
  totalCount: 0,
  allResults: 0,
  page: 1,
  limit: 30,
  searchMore: false,
  status: 'All',
  sortName: 'activity.id',
  sortType: 'down',
  activitiesRequest: false,
  activitySuccessfullyCreated: false,
  activitySuccessfullyUpdated: false,
  activitySuccessfullyDeleted: false,
  organizationErrorMessage: '',
  organizationErrorName: '',
  processedActivityID: 0,
}

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ACTIVITIES_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }

    case types.SET_ACTIVITIES_REQUEST:
      return {
        ...state,
        activitySuccessfullyCreated: false,
        activitySuccessfullyUpdated: false,
        activitySuccessfullyDeleted: false,
        organizationErrorMessage: '',
        organizationErrorName: '',
        activitiesRequest: true,
      }
    case types.SET_ACTIVITIES_SUCCESSFULLY_CREATE:
      return {
        ...state,
        activitiesRequest: false,
        activitySuccessfullyCreated: true,
      }
    case types.SET_ACTIVITIES_SUCCESSFULLY_UPDATE:
      return {
        ...state,
        activitiesRequest: false,
        activitySuccessfullyUpdated: true,
      }
    case types.SET_ACTIVITIES_SUCCESSFULLY_DELETE:
      return {
        ...state,
        activitiesRequest: false,
        activitySuccessfullyDeleted: true,
      }
    case types.SET_ACTIVITY_ORGANIZATION_ERROR:
      return {
        ...state,
        organizationErrorName: action.message.split(' ').slice(0, -2).join(' '),
        organizationErrorMessage: 'Organization with this name already exists',
      }
    case types.SET_PROCESSED_ACTIVITY_ID:
      return {
        ...state,
        processedActivityID: action.id,
      }
    case types.RESET_ACTIVITIES_STORE:
      return { ...state, ...initialState, allResults: state.allResults }

    default:
      return state
  }
}

export default activitiesReducer
