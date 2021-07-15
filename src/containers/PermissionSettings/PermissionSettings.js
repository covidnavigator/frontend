import React, { useReducer, useEffect } from 'react'
import { connect } from 'react-redux'

import { FormSelect, Footer } from '../../components'
import { permissions as permissionData } from '../../assets/js/options/permissions'

import { changePermissionsValue, setRole, resetState } from './actions'
import { reducer, initialState } from './reducer'

import {
  getRolesAction,
  setRolesPermission,
} from '../../redux/actions/rolesAction'
import { setLogin } from '../../redux/actions/loginAction'

import './permissionSettings.scss'
import * as permissions from '../../assets/js/options/permissions'
import ApplicationHelper from '../../assets/js/utils'

const PermissionSettings = ({
  isLogin,
  history,
  roles,
  getRolesAction,
  setRolesPermission,
  setLogin,
}) => {
  const [state, setState] = useReducer(reducer, initialState)
  useEffect(() => {
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
      history.push('/login')
    } else if (
      !ApplicationHelper.checkPermission(permissions.ROLE_PERMISSIONS_VIEW) ||
      !ApplicationHelper.getCurrentUserData().role.role === 'Superuser'
    ) {
      history.push('/graph')
    } else if (!roles.roles.length) {
      getRolesAction()
    }
  }, [])

  useEffect(() => {
    getRolesAction()
  }, [roles.updateRoleSuccess])

  const changeValue = (key, value) => {
    const role = roles.roles.filter((role) => role.id === value.value)[0]
    const permissions = []
    role.permissions.forEach((element) => {
      permissions.push(element.permission)
    })
    setState(setRole(key, value))
    setState(changePermissionsValue(permissions))
  }

  const handleChange = (e, value) => {
    const newPermissionList = state.permissions
    const index = newPermissionList.indexOf(value)
    if (index === -1) {
      newPermissionList.push(value)
    } else {
      newPermissionList.splice(index, 1)
    }
    setState(changePermissionsValue(newPermissionList))
  }

  const submit = () => {
    setRolesPermission(state.role.id, state.permissions)
    getRolesAction()
    setState(resetState())
  }

  return (
    <>
      <div className="permission-settings">
        <div className="permission-settings-block">
          <h2 className="permission-settings__title">Permission Settings</h2>
          <div className="permission-settings__wrap">
            <FormSelect
              className="form-item"
              label="Role"
              name="role"
              value={state.role}
              onChange={changeValue}
              options={roles.roles.filter((item) => item.role !== 'Superuser')}
            />
            {state.role.permissions && (
              <table className="permission-table">
                <thead>
                  <tr className="permission-table__row">
                    <th>ACCESS</th>
                    <th>VIEW</th>
                    <th>EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionData.map((permission, index) => (
                    <tr key={index} className="permission-table__row">
                      <td>{permission.label}</td>
                      <td>
                        <input
                          type="checkbox"
                          disabled={
                            !ApplicationHelper.checkPermission(
                              permissions.ROLE_PERMISSIONS_EDIT
                            )
                          }
                          checked={state.permissions.includes(
                            permission.viewValue
                          )}
                          onChange={(e) =>
                            handleChange(e, permission.viewValue)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled={
                            !ApplicationHelper.checkPermission(
                              permissions.ROLE_PERMISSIONS_EDIT
                            )
                          }
                          checked={state.permissions.includes(
                            permission.editValue
                          )}
                          onChange={(e) =>
                            handleChange(e, permission.editValue)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {state.role.permissions &&
              ApplicationHelper.checkPermission(
                permissions.ROLE_PERMISSIONS_EDIT
              ) && (
                <button
                  className="permission-settings__button"
                  onClick={submit}
                >
                  Submit
                </button>
              )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  roles: state.roles,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setRolesPermission: (role, permissions) =>
      dispatch(setRolesPermission(role, permissions)),
    getRolesAction: () => dispatch(getRolesAction()),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSettings)
