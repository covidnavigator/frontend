import * as types from '../actions/usersAction'

import { usersSearchByOptions } from '../../assets/js/options/navigationPanelOptions'

const initialState = {
  data: [],
  searchString: '',
  searchBy: usersSearchByOptions[0],
  totalCount: 0,
  allUsersCount: 0,
  page: 1,
  limit: 30,
  searchMore: false,
  sortName: 'users.id',
  sortType: 'up',
  size: 10,
  creationSuccess: false,
  creationError: false,
  updationSuccess: false,
  updationError: false,
  usersRequest: false,
  deletionSuccess: false,
  deletionError: false,
  errorEmailMessage: '',
  errorMessage: '',
  processedUserID: 0,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_USER_VALUE: {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    }

    case types.SET_USERS_REQUEST: {
      return {
        ...state,
        usersRequest: true,
        creationSuccess: false,
        creationError: false,
        updationSuccess: false,
        updationError: false,
        deletionSuccess: false,
        deletionError: false,
        errorEmailMessage: '',
        errorMessage: '',
      }
    }

    case types.SET_USER_CREATE_SUCCESS: {
      return {
        ...state,
        creationSuccess: true,
        usersRequest: false,
      }
    }

    case types.SET_USER_UPDATE_SUCCESS: {
      return {
        ...state,
        updationSuccess: true,
        usersRequest: false,
      }
    }

    case types.SET_USER_DELETE_SUCCESS: {
      return {
        ...state,
        deletionSuccess: true,
        usersRequest: false,
      }
    }

    case types.SET_USER_DELETE_ERROR: {
      return {
        ...state,
        deletionError: true,
        usersRequest: false,
      }
    }

    case types.SET_PROCESSED_USER_ID: {
      return {
        ...state,
        processedUserID: action.id,
      }
    }

    case types.SET_USERS_DATA: {
      return {
        ...state,
        data: action.body.data,
        totalCount: action.body.totalCount,
      }
    }

    case types.SET_USERS_COUNT: {
      return {
        ...state,
        allUsersCount: action.count,
      }
    }

    case types.SET_EMAIL_ERROR_MESSAGE: {
      return {
        ...state,
        errorEmailMessage: action.message,
      }
    }

    case types.SET_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.message,
      }
    }

    case types.RESET_USER_ERRORS: {
      return {
        ...state,
        errorEmailMessage: '',
        errorMessage: '',
      }
    }

    default:
      return state
  }
}

export default usersReducer
