import React, { useState } from 'react'

import { FormInput } from '../Form'

export const ResetPasswordForm = ({
  state,
  handleCloseModal,
  changeValue,
  updatePassword,
}) => {
  const [validation, setValidation] = useState(false)
  const [type, setType] = useState('password')

  const changeType = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const verify = () => {
    if (state.password.trim().length !== 0) {
      if (state.isChanged) {
        setValidation(false)
        updatePassword()
      }
    } else {
      setValidation(true)
    }
  }

  return (
    <div className="password-resetting">
      <div className="form__header">
        <h2 className="form__header__title">Reset Password</h2>
        <div className="form__header__times" onClick={handleCloseModal} />
      </div>
      <div className="form__user-info__wrap">
        <p className="form__user-info__title">User Personal Info</p>
        <div className="form__user-info_main">
          <span className="form__user-info_item form__user-info_username">
            {state.username}
          </span>
        </div>
        <div className="form__user-info_additional">
          <span className="form__user-info_item form__user-info_email">
            {state.email}
          </span>
          <span className="form__user-info_item form__user-info_role">
            {state.role.label}
          </span>
        </div>
      </div>
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
