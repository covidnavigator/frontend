import {
  CHANGE_LEGEND_ITEM,
  RESET_LEGEND_ITEMS,
  SET_LEGEND_ITEM,
} from '../actions/legendAction'

const initialState = {
  careSettings: true,
  careProcess: true,
  subject: true,
  resource: true,
}

const legendReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LEGEND_ITEM:
      return {
        ...state,
        careSettings: false,
        careProcess: false,
        subject: false,
        resource: false,
        [action.legendItem]: true,
      }

    case RESET_LEGEND_ITEMS:
      return {
        ...state,
        careSettings: true,
        careProcess: true,
        subject: true,
        resource: true,
      }

    case SET_LEGEND_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      }

    default:
      return state
  }
}

export default legendReducer
