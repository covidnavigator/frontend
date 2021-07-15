import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_ROLES = 'SET_ROLES'
export const SET_ROLES_OPTIONS = 'SET_ROLES_OPTIONS'
export const SET_ROLES_REQUEST = 'SET_ROLES_REQUEST'
export const SET_ROLES_UPDATE_SUCCESS = 'SET_ROLES_UPDATE_SUCCESS'
export const SET_PROCESSED_ROLE = 'SET_PROCESSED_ROLE'

const setRolesRequest = () => ({
  type: SET_ROLES_REQUEST,
})

const setRolesUpdateSuccess = () => ({
  type: SET_ROLES_UPDATE_SUCCESS,
})

const setProcessedRole = (role) => ({
  type: SET_PROCESSED_ROLE,
  role,
})

export const getRolesAction = () => {
  return async (dispatch) => {
    await axios.get(`${API_URL}roles`).then((response) => {
      const rolesOptions = response.data.map((role) => {
        return { ...role, value: role.id, label: role.role }
      })
      dispatch(setRoles(rolesOptions))
    })
  }
}

export const setRolesPermission = (role, permissions) => {
  const data = { permissions: permissions }
  return async (dispatch) => {
    dispatch(setRolesRequest())

    await axios.put(`${API_URL}roles/${role}`, data).then((response) => {
      dispatch(setProcessedRole(response.data.role))
      dispatch(setRolesUpdateSuccess())
    })
  }
}

const setRoles = (roles) => ({
  type: SET_ROLES,
  roles,
})
