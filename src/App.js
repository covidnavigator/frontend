import React, { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'

import Header from './containers/Header/Header'
import { Hint, Preloader } from './components'

import { getCurrentUser } from './redux/actions/userAction'
import { getOrganizationsAction } from './redux/actions/organizationsAction'

import routes from './routes'
import './assets/scss/index.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { getFeedbackAction } from './redux/actions/feedbackAction'
import ApplicationHelper from './assets/js/utils'
import * as permissions from './assets/js/options/permissions'
import { getActivitiesCount } from './redux/actions/activitiesAction'
import { getArticlesCount } from './redux/actions/articlesAction'
import { getUsersAction, getUsersCount } from './redux/actions/usersAction'
import { getLists } from './redux/actions/listsAction'

const history = createBrowserHistory()

function App({
  login,
  user,
  getCurrentUser,
  getArticlesCount,
  getActivitiesCount,
  getOrganizationsAction,
  getFeedbackAction,
  getUsersAction,
  getLists,
  getUsersCount,
}) {
  useEffect(() => {
    if (login.isLogin) {
      getCurrentUser()
    }
  }, [login.isLogin])

  useEffect(() => {
    if (user.role) {
      getActivitiesCount()
      getArticlesCount()
      getOrganizationsAction()
      getFeedbackAction()
      getLists()
      if (ApplicationHelper.checkPermission(permissions.ALL_USERS_VIEW)) {
        getUsersAction()
        getUsersCount()
      }
    }
  }, [user])

  return (
    <Router history={history}>
      <div className="app">
        <Header
          isLogin={login.isLogin}
          loginProcess={login.loginProcess}
          user={user}
        />

        <div className="wrapper">
          <Suspense fallback={<Preloader />}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                    <route.component {...props} isLogin={login.isLogin} />
                  )}
                />
              ))}
              <Redirect from="/" to="/graph" />
            </Switch>
          </Suspense>
        </div>
        <Hint />
        <Hint attribute="data-hover-hint" hover />
        <Hint attribute="data-large-hint" className="large-hint" />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
    getArticlesCount: () => dispatch(getArticlesCount()),
    getOrganizationsAction: () => dispatch(getOrganizationsAction()),
    getFeedbackAction: () => dispatch(getFeedbackAction()),
    getActivitiesCount: () => dispatch(getActivitiesCount()),
    getUsersAction: () => dispatch(getUsersAction()),
    getUsersCount: () => dispatch(getUsersCount()),
    getLists: () => dispatch(getLists()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
