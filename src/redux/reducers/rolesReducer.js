import {
  SET_ROLES,
  SET_ROLES_OPTIONS,
  SET_ROLES_UPDATE_SUCCESS,
  SET_PROCESSED_ROLE,
  SET_ROLES_REQUEST,
} from '../actions/rolesAction'

const initialState = {
  roles: [],
  options: [],
  rolesRequest: false,
  updateRoleSuccess: false,
  processedRole: '',
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLES:
      return { ...state, roles: action.roles }
    case SET_ROLES_OPTIONS: {
      return { ...state, options: action.roles }
    }
    case SET_ROLES_REQUEST: {
      return {
        ...state,
        rolesRequest: true,
        updateRoleSuccess: false,
        processedRole: '',
      }
    }
    case SET_ROLES_UPDATE_SUCCESS: {
      return { ...state, rolesRequest: false, updateRoleSuccess: true }
    }
    case SET_PROCESSED_ROLE: {
      return { ...state, processedRole: action.role }
    }
    default:
      return state
  }
}

export default rolesReducer
