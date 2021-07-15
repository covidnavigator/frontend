import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './login.scss'

import {
  setLoginProcess,
  setLogin,
  loginAction,
  confirmAction,
} from '../../redux/actions/loginAction'
import { getCurrentUser } from '../../redux/actions/userAction'

import { LoginInput, Footer } from '../../components'
import ApplicationHelper from '../../assets/js/utils'

function Login({
  isLogin,
  setLogin,
  history,
  loginAction,
  confirmAction,
  setLoginProcess,
  getCurrentUser,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  const [error, setError] = useState('')

  const changeType = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    if (ApplicationHelper.validateEmail(email)) {
      loginAction({ email, password }, loginSuccess, loginError)
    } else {
      setError('Please enter a valid email address.')
    }
  }

  const loginSuccess = (body) => {
    ApplicationHelper.setAuthenData(
      true,
      JSON.stringify({
        permissions: body.permissions,
        role: body.user.role,
        fullName: body.user.username,
        token: body.payload.token,
        refresh: body.payload.refresh,
      })
    )
    setLogin(true)
    getCurrentUser()
  }

  const loginError = (body) => {
    setError(body.message)
  }

  const getPropsFromLink = () => {
    const getRegexpFor = (paramName) => {
      return RegExp(`[\?|&]${paramName}=([\\s\\S]+?)(&|$)`)
    }

    const urlFromEmail = window.location.href
    history.push('/login')

    if (
      getRegexpFor('id').test(urlFromEmail) &&
      getRegexpFor('code').test(urlFromEmail)
    ) {
      const id = parseInt(urlFromEmail.match(getRegexpFor('id'))[1])
      const code = urlFromEmail.match(getRegexpFor('code'))[1]

      confirmAction(id, code, loginSuccess, loginError)
    }
  }

  useEffect(() => {
    getPropsFromLink()
  }, [])

  useEffect(() => {
    setLoginProcess(true)
    if (isLogin) history.push('/graph')
    return () => {
      setLoginProcess(false)
    }
  }, [isLogin])

  return (
    <>
      <div className="login">
        <div className="login__background" />
        <div className="login__wrap">
          <h1 className="login__title">Sign In</h1>
          <form className="login-form" onSubmit={onSubmitForm}>
            <LoginInput
              label="Email"
              autoComplete="username email"
              value={email}
              onChange={setEmail}
              className="login-item__email"
              pageName="login"
            />
            <LoginInput
              label="Password"
              type={type}
              autoComplete="password"
              value={password}
              onChange={setPassword}
              changeType={changeType}
              className="login-item__password"
              pageName="login"
            />
            {error ? (
              <pre className="login__error-message">
                {error.split('.').join('.\n')}
              </pre>
            ) : null}
            <button className="login-form__button">Sign In</button>
            <button
              type="button"
              className="login-form__forgot-button"
              data-small-hint="Coming soon!"
              data-small-hint-at="bottom"
            >
              Forgot Password
            </button>
            <button
              type="button"
              className="login-form__signUp"
              onClick={() => history.push('/register')}
            >
              Don't have an Account? Create one now
            </button>
          </form>
        </div>
      </div>

      <Footer className="footer_opacity footer_onTop" />
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (islogin) => dispatch(setLogin(islogin)),
    loginAction: (cred, callbackSuccess, callbackError) =>
      dispatch(loginAction(cred, callbackSuccess, callbackError)),
    confirmAction: (id, code, callbackSuccess, callbackError) =>
      dispatch(confirmAction(id, code, callbackSuccess, callbackError)),
    setLoginProcess: (loginProcess) => dispatch(setLoginProcess(loginProcess)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
