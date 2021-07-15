import * as types from '../actions/keywordsAction'

const initialState = {
  keywordsSelect: [],
}

const keywordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_KEYWORDS:
      return {
        ...state,
        keywordsSelect: action.payload.keywords,
      }
    default:
      return state
  }
}

export default keywordsReducer
