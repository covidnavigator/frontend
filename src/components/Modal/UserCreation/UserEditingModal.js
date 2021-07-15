import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import './userEditingModal.scss'

import {
  EditUserForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateUserForm,
} from '../../../components'

// Container actions
import { setValue, setUserData, edit } from './actions'
import { reducer, initialState } from './reducer'

// Redux actions
import {
  getUserAction,
  updateUser,
  updateUserPassword,
  createUser,
  resetUserErrors,
} from '../../../redux/actions/usersAction'

const UserEditingModal = ({
  createUser,
  updateUser,
  updateUserPassword,
  type,
  userId = 0,
  handleCloseModal,
  getUserAction,
  options,
  errorEmailMessage,
  errorMessage,
  className,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeValue = (key, value) => {
    dispatch(setValue(key, value))
    dispatch(edit())
  }

  const handleSubmitCreateForm = () => {
    createUser(state)
    resetUserErrors()
  }

  const fetchUserData = async (id) => {
    const setUser = (user) => {
      const data = {
        ...user,
        role: options.find((item) => item.role === user.role),
      }
      dispatch(setUserData(data))
    }

    getUserAction(id, setUser)
  }

  useEffect(() => {
    if (userId) {
      fetchUserData(userId)
    }
  }, [])

  return (
    <section className={`user-container ${className}`}>
      <div className="user-container-block">
        {type === 'edit' ? (
          <EditUserForm
            state={state}
            handleCloseModal={handleCloseModal}
            handleSubmitForm={() => updateUser(userId, state)}
            options={options}
            changeValue={changeValue}
            errorEmailMessage={errorEmailMessage}
          />
        ) : type === 'create' ? (
          <CreateUserForm
            state={state}
            handleCloseModal={handleCloseModal}
            handleSubmitForm={handleSubmitCreateForm}
            options={options}
            changeValue={changeValue}
            errorEmailMessage={errorEmailMessage}
          />
        ) : type === 'changePassword' ? (
          <ChangePasswordForm
            state={state}
            handleCloseModal={handleCloseModal}
            updatePassword={() =>
              updateUserPassword(state.currentPassword, state.password)
            }
            changeValue={changeValue}
            errorMessage={errorMessage}
          />
        ) : (
          <ResetPasswordForm
            state={state}
            handleCloseModal={handleCloseModal}
            updatePassword={() => updateUser(userId, state)}
            changeValue={changeValue}
          />
        )}
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  options: state.roles.roles,
  errorEmailMessage: state.users.errorEmailMessage,
  errorMessage: state.users.errorMessage,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    updateUserPassword: (currentPass, newPass) =>
      dispatch(updateUserPassword(currentPass, newPass)),
    getUserAction: (id, callback) => dispatch(getUserAction(id, callback)),
    createUser: (user) => dispatch(createUser(user)),
    resetUserErrors: () => dispatch(resetUserErrors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditingModal)
