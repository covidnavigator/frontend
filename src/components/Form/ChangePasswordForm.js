import React, { useEffect, useState } from 'react'

import { FormInput } from '../Form'

export const ChangePasswordForm = ({
  state,
  handleCloseModal,
  changeValue,
  updatePassword,
  errorMessage,
}) => {
  const [validation, setValidation] = useState(false)
  const [currentType, setCurrentType] = useState('password')
  const [newType, setNewType] = useState('password')
  const [confirmType, setConfirmType] = useState('password')
  const [isFieldsFilled, setFieldFilled] = useState(false)

  useEffect(() => {
    if (
      state.currentPassword.trim().length !== 0 &&
      state.password.trim().length !== 0 &&
      state.confirmPassword.trim().length !== 0
    ) {
      setFieldFilled(true)
    } else {
      setFieldFilled(false)
    }
  }, [state.currentPassword, state.password, state.confirmPassword])

  const changeType = (setType) => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const verify = () => {
    if (
      isFieldsFilled &&
      state.password.trim() === state.confirmPassword.trim()
    ) {
      setValidation(false)
      updatePassword()
    } else {
      setValidation(true)
    }
  }

  return (
    <div className="password-change">
      <h2 className="password-change__title">Change Password</h2>
      <div className="password-change__times" onClick={handleCloseModal} />

      <div className="password-change__form">
        <FormInput
          type={currentType}
          className="form-item"
          label="Current Password"
          name="currentPassword"
          error={validation ? state.currentPassword.trim().length === 0 : false}
          errorMessage={errorMessage ? errorMessage : ''}
          value={state.currentPassword}
          onChange={changeValue}
          changeType={() => changeType(setCurrentType)}
        />

        <FormInput
          type={newType}
          className="form-item"
          label="New Password"
          name="password"
          error={
            validation
              ? state.password.trim().length === 0 ||
                state.password.trim() !== state.confirmPassword.trim()
              : false
          }
          value={state.password}
          onChange={changeValue}
          changeType={() => changeType(setNewType)}
        />

        <FormInput
          type={confirmType}
          className="form-item"
          label="Confirm New Password"
          name="confirmPassword"
          error={
            validation
              ? state.confirmPassword.trim().length === 0 ||
                state.password.trim() !== state.confirmPassword.trim()
              : false
          }
          value={state.confirmPassword}
          onChange={changeValue}
          changeType={() => changeType(setConfirmType)}
        />
      </div>

      <div className="password-change__footer">
        <button
          onClick={handleCloseModal}
          type="button"
          className="footer__button footer__button_cancel"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!isFieldsFilled}
          onClick={verify}
          className="footer__button footer__button_submit"
        >
          Save
        </button>
      </div>
    </div>
  )
}
