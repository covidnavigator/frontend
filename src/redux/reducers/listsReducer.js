import {
  SET_USER_LISTS,
  SET_REQUEST,
  SET_CREATE_SUCCESS,
  SET_UPDATE_SUCCESS,
  SET_DELETE_SUCCESS,
  SET_PROCESSED_LIST_NAME,
} from '../actions/listsAction'

const initialState = {
  lists: [],
  createListSuccess: false,
  updateListSuccess: false,
  deleteListSuccess: false,
  listRequest: false,
  processedListName: '',
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LISTS:
      return { ...state, lists: action.lists, listRequest: false }
    case SET_REQUEST:
      return {
        ...state,
        listRequest: action.status,
        updateListSuccess: false,
        createListSuccess: false,
        deleteListSuccess: false,
      }
    case SET_UPDATE_SUCCESS: {
      return { ...state, updateListSuccess: true, listRequest: false }
    }
    case SET_CREATE_SUCCESS: {
      return { ...state, createListSuccess: true, listRequest: false }
    }
    case SET_DELETE_SUCCESS: {
      return { ...state, deleteListSuccess: true, listRequest: false }
    }
    case SET_PROCESSED_LIST_NAME: {
      return { ...state, processedListName: action.name }
    }
    default:
      return state
  }
}

export default listsReducer
