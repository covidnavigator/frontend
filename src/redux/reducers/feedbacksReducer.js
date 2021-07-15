import * as types from '../actions/feedbackAction'

import { feedbacksSearchByOptions } from '../../assets/js/options/navigationPanelOptions'

export const initialState = {
  data: [],
  searchString: '',
  searchBy: feedbacksSearchByOptions[0],
  startDate: null,
  endDate: null,
  totalCount: 0,
  allResults: 0,
  page: 1,
  limit: 30,
  searchMore: false,
  status: 'All',
  sortName: 'id',
  sortType: 'down',
  feedbackRequest: false,
  creationFeedbackSuccess: false,
  updationFeedbackSuccess: false,
  deletionFeedbackSuccess: false,
  processedFeedID: 0,
}

const feedbacksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_FEEDBACK_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case types.CHANGE_DATE:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      }
    case types.SET_FEEDBACK_REQUEST:
      return {
        ...state,
        creationFeedbackSuccess: false,
        updationFeedbackSuccess: false,
        deletionFeedbackSuccess: false,
        feedbackRequest: true,
      }
    case types.SET_FEEDBACK_CREATE_SUCCESS:
      return {
        ...state,
        feedbackRequest: false,
        creationFeedbackSuccess: true,
      }
    case types.SET_FEEDBACK_UPDATE_SUCCESS:
      return {
        ...state,
        feedbackRequest: false,
        updationFeedbackSuccess: true,
      }
    case types.SET_FEEDBACK_DELETE_SUCCESS:
      return {
        ...state,
        feedbackRequest: false,
        deletionFeedbackSuccess: true,
      }
    case types.SET_PROCESSED_FEEDBACK_ID:
      return {
        ...state,
        processedFeedID: action.id,
      }
    default:
      return state
  }
}

export default feedbacksReducer
