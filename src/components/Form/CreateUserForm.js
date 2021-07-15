import React, { useState } from 'react'

import { FormInput, FormSelect } from '../Form'

import ApplicationHelper from '../../assets/js/utils'

export const CreateUserForm = ({
  state,
  changeValue,
  options,
  handleSubmitForm,
  handleCloseModal,
  errorEmailMessage,
}) => {
  const [validation, setValidation] = useState(false)
  const [type, setType] = useState('password')

  const changeType = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const verifyUser = () => {
    if (
      state.username.trim().length === 0 ||
      !ApplicationHelper.validateEmail(state.email) ||
      state.password.trim().length === 0 ||
      !state.role.value
    ) {
      return false
    }
    return true
  }

  const verify = () => {
    if (verifyUser()) {
      if (state.isChanged) {
        setValidation(false)
        handleSubmitForm()
      }
    } else {
      setValidation(true)
    }
  }

  return (
    <div className="user-editing">
      <div className="form__header">
        <h2 className="form__header__title">Create User</h2>
        <div className="form__header__times" onClick={handleCloseModal} />
      </div>
      <form>
        <FormInput
          className="form-item"
          label="Email"
          name="email"
          error={
            validation ? !ApplicationHelper.validateEmail(state.email) : false
          }
          errorMessage={errorEmailMessage ? errorEmailMessage : ''}
          value={state.email}
          onChange={changeValue}
        />
        <FormInput
          className="form-item"
          label="Username"
          name="username"
          error={validation ? state.username.trim().length === 0 : false}
          value={state.username}
          onChange={changeValue}
        />
        <FormInput
          className="form-item"
          label="Organization"
          name="organization"
          value={state.organization}
          onChange={changeValue}
        />
        <FormInput
          type={type}
          className="form-item"
          label="Password"
          name="password"
          error={validation ? state.password.trim().length === 0 : false}
          value={state.password}
          onChange={changeValue}
          changeType={changeType}
        />
        <FormSelect
          className="form-item"
          label="Role"
          name="role"
          error={validation ? !state.role.value : false}
          value={state.role.value ? state.role : ''}
          onChange={changeValue}
          options={options}
        />
      </form>
      <div className="form__footer">
        <div className="form__footer-buttons">
          <button
            onClick={handleCloseModal}
            type="button"
            className="form__footer-buttons__cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!state.isChanged}
            onClick={verify}
            className="form__footer-buttons__next"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
