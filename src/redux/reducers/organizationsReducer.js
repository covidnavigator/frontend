import * as types from '../actions/organizationsAction'

import { organizationsSearchByOptions } from '../../assets/js/options/navigationPanelOptions'

export const initialState = {
  data: [],
  searchString: '',
  searchBy: organizationsSearchByOptions[0],
  totalCount: 0,
  allResults: 0,
  page: 1,
  limit: 30,
  searchMore: false,
  sortName: 'organizations.id',
  sortType: 'down',
  organizationRequest: false,
  creationOrganizationSuccess: false,
  updationOrganizationSuccess: false,
  deletionOrganizationSuccess: false,
  organizationErrorMessage: '',
  processedOrgID: 0,
}

const organizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ORGANIZATION_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }

    case types.SET_ORGANIZATION_REQUEST:
      return {
        ...state,
        creationOrganizationSuccess: false,
        updationOrganizationSuccess: false,
        deletionOrganizationSuccess: false,
        organizationErrorMessage: '',
        organizationRequest: true,
      }
    case types.SET_ORGANIZATION_CREATE_SUCCESS:
      return {
        ...state,
        organizationRequest: false,
        creationOrganizationSuccess: true,
      }
    case types.SET_ORGANIZATION_UPDATE_SUCCESS:
      return {
        ...state,
        organizationRequest: false,
        updationOrganizationSuccess: true,
      }
    case types.SET_ORGANIZATION_DELETE_SUCCESS:
      return {
        ...state,
        organizationRequest: false,
        deletionOrganizationSuccess: true,
      }
    case types.SET_ORGANIZATION_ERROR:
      return {
        ...state,
        organizationErrorMessage: action.message,
      }
    case types.SET_PROCESSED_ORGANIZATION_ID:
      return {
        ...state,
        processedOrgID: action.id,
      }
    default:
      return state
  }
}

export default organizationsReducer
