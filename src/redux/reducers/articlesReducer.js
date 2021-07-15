import {
  SET_ALL_COUNT,
  SET_ARTICLE_REQUEST,
  SET_ARTICLE_CREATE_SUCCESS,
  SET_ARTICLE_UPDATE_SUCCESS,
  SET_STATUS_UPDATE_SUCCESS,
  SET_ARTICLE_DELETE_SUCCESS,
  SET_ORGANIZATION_ERROR,
  SET_URL_ERROR,
  SET_PROCESSED_ARTICLE_ID,
} from '../actions/articlesAction'

const initialState = {
  articles: [],
  totalCount: 0,
  allAsetsNumber: 0,
  processedAssetID: '',
  creationSuccess: false,
  updationSuccess: false,
  articleRequest: false,
  updateStatusSuccess: false,
  deletionSuccess: false,
  urlErrorMessage: '',
  organizationErrorMessage: '',
  organizationErrorName: '',
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE_REQUEST:
      return {
        ...state,
        organizationErrorMessage: '',
        organizationErrorName: '',
        urlErrorMessage: '',
        creationSuccess: false,
        updationSuccess: false,
        updateStatusSuccess: false,
        deletionSuccess: false,
        articleRequest: true,
      }
    case SET_ARTICLE_CREATE_SUCCESS:
      return {
        ...state,
        creationSuccess: true,
        updationSuccess: false,
        articleRequest: false,
      }
    case SET_ARTICLE_UPDATE_SUCCESS:
      return {
        ...state,
        creationSuccess: false,
        updationSuccess: true,
        articleRequest: false,
      }
    case SET_STATUS_UPDATE_SUCCESS: {
      return {
        ...state,
        updateStatusSuccess: true,
        articleRequest: false,
      }
    }

    case SET_ARTICLE_DELETE_SUCCESS: {
      return {
        ...state,
        deletionSuccess: true,
        articleRequest: false,
      }
    }
    case SET_ORGANIZATION_ERROR:
      return {
        ...state,
        organizationErrorName: action.message.split(' ').slice(0, -2).join(' '),
        organizationErrorMessage: 'Organization with this name already exists',
      }
    case SET_URL_ERROR:
      return {
        ...state,
        urlErrorMessage: action.message,
      }
    case SET_ALL_COUNT:
      return {
        ...state,
        allAsetsNumber: action.number,
      }

    case SET_PROCESSED_ARTICLE_ID:
      return {
        ...state,
        processedAssetID: action.id,
      }
    default:
      return state
  }
}

export default articlesReducer
