import React, { useState, useEffect, useReducer } from 'react'
import { connect } from 'react-redux'

import './register.scss'

import { LoginInput, Footer } from '../../components'
import ApplicationHelper from '../../assets/js/utils'

import { changeRegisterValue } from './actions'
import { reducer, initialState } from './reducer'

import {
  setLoginProcess,
  setLogin,
  registerAction,
} from '../../redux/actions/loginAction'
import { downloadFile } from '../../redux/actions/fileAction'

function Register({
  isLogin,
  setLogin,
  history,
  setLoginProcess,
  registerAction,
}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [newPassType, setNewPassType] = useState('password')
  const [confirmPassType, setConfirmPassType] = useState('password')
  const [errorMessage, setErrorMessage] = useState('')
  const [helpMessage, setHelpMessage] = useState('')

  const changeType = (setType) => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const handleInputChange = (name, value) => {
    dispatch(changeRegisterValue(name, value))
  }

  const verifyForm = () => {
    let isValid = true

    if (
      state.username.trim() === '' ||
      state.email.trim() === '' ||
      state.organization.trim() === '' ||
      state.password.trim() === '' ||
      state.confirmPassword.trim() === ''
    ) {
      isValid = false
      setErrorMessage('Please fill in all fields.')
    } else if (!ApplicationHelper.validateEmail(state.email)) {
      isValid = false
      setErrorMessage('Please enter a valid email address.')
    } else if (state.password !== state.confirmPassword) {
      isValid = false
      setErrorMessage("Passwords don't match. Please check it.")
    }

    return isValid
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    if (verifyForm()) {
      registerAction(state, registrationSuccess, registrationError)
    }
  }

  const registrationSuccess = (body) => {
    history.push('/graph')
  }

  const registrationError = (message) => {
    setErrorMessage(message)
  }

  const download = (e) => {
    e.stopPropagation()
    downloadFile()
  }

  useEffect(() => {
    if (helpMessage !== '') {
      setErrorMessage('')
    }
  }, [helpMessage])

  useEffect(() => {
    if (errorMessage !== '') {
      setHelpMessage('')
    }
  }, [errorMessage])

  useEffect(() => {
    setLoginProcess(true)
    if (isLogin) history.push('./graph')
    return () => setLoginProcess(false)
  }, [])

  return (
    <>
      <div className="register">
        <div className="register__background" />
        <div className="register__wrap">
          <h1 className="register__title">Beta Program Participation</h1>

          <p className="register__description">
            On behalf of the team behind the COVID Navigator, we would like to
            invite you to participate in our formal Beta test program.
          </p>

          <p className="register__description">
            Just as this site has been developed through the contributed time
            and effort of a community of volunteers, we are hoping you will join
            us by exercising the site and providing us valuable feedback of your
            experiences.
          </p>

          <section className="register__main-container">
            <div className="register__steps-box">
              <h3>Being a “formal” beta tester is a simple, 3-step process:</h3>

              <ol>
                <li>
                  Fill-out the registration form, check your email for
                  confirmation and Sign In into COVID-19 Navigator.
                </li>

                <li>
                  Download the{' '}
                  <span
                    onClick={download}
                    className="register__steps-box__link"
                  >
                    Test Script
                  </span>
                  , review and perform each of those activities, noting your
                  experiences and thoughts.
                </li>

                <li>
                  Submit your feedback via the{' '}
                  <a
                    href="https://www.surveymonkey.com/r/G8CTQH3"
                    target="_blank"
                    className="register__steps-box__link"
                  >
                    Beta Survey tool
                  </a>
                  .
                </li>
              </ol>

              <p>
                We estimate that the actual testing activity should take between
                30 and 60 minutes.
              </p>
            </div>

            <form className="register__form" onSubmit={onSubmitForm}>
              <div className="register__form-row">
                <LoginInput
                  autoComplete="user_username"
                  label="Your Name"
                  value={state.username}
                  name="username"
                  onChange={handleInputChange}
                  className="register-item__username"
                  pageName="register"
                />

                <LoginInput
                  label="Email"
                  value={state.email}
                  name="email"
                  onChange={handleInputChange}
                  className="register-item__email"
                  pageName="register"
                  autoComplete="user_email"
                />
              </div>
              <div className="register__form-row">
                <LoginInput
                  label="Organization"
                  value={state.organization}
                  name="organization"
                  onChange={handleInputChange}
                  className="register-item__username"
                  pageName="register"
                  autoComplete="user_organization"
                />
              </div>
              <div className="register__form-row">
                <LoginInput
                  label="Password"
                  type={newPassType}
                  value={state.password}
                  name="password"
                  onChange={handleInputChange}
                  changeType={() => changeType(setNewPassType)}
                  className="register-item__password"
                  pageName="register"
                  autoComplete="password"
                />

                <LoginInput
                  label="Confirm Password"
                  type={confirmPassType}
                  value={state.confirmPassword}
                  name="confirmPassword"
                  onChange={handleInputChange}
                  changeType={() => changeType(setConfirmPassType)}
                  className="register-item__password"
                  pageName="register"
                  autoComplete="password"
                />
              </div>
              {errorMessage ? (
                <div className="register__form-row">
                  <span className="register__error-message">
                    {errorMessage}
                  </span>
                </div>
              ) : null}
              <div className="register__form-row">
                <button className="register__form__button">Sign Up</button>

                <div className="register__form__login-button">
                  <button
                    type="button"
                    className="register__form__signIn"
                    onClick={() => history.push('/login')}
                  >
                    Already a Member? Please Sign In.
                  </button>
                </div>
              </div>

              <div className="register__thanks">
                <p>
                  Thanks in advance for your help in making this a valuable
                  community asset!
                </p>
              </div>
            </form>
          </section>

          <Footer className="footer_opacity footer_onTop" />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    setLoginProcess: (loginProcess) => dispatch(setLoginProcess(loginProcess)),
    registerAction: (state, callbackSuccess, callbackError) =>
      dispatch(registerAction(state, callbackSuccess, callbackError)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
