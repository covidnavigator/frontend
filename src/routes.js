import React from 'react'

import Graph from './containers/Graph/Graph'

const Feedbacks = React.lazy(() => import('./containers/Feedbacks/Feedbacks'))
const Organizations = React.lazy(() =>
  import('./containers/Organizations/Organizations')
)

const LoginPage = React.lazy(() => import('./containers/Login/Login'))
const RegisterPage = React.lazy(() => import('./containers/Register/Register'))
const ProfilePage = React.lazy(() => import('./containers/Profile/Profile'))
const ProfileActivities = React.lazy(() =>
  import('./containers/Profile/Activities')
)
const UsersPage = React.lazy(() => import('./containers/Users/Users'))
const ArticlesPage = React.lazy(() => import('./containers/Articles/Articles'))
const Activities = React.lazy(() =>
  import('./containers/Activities/Activities')
)

const PermissionSettings = React.lazy(() =>
  import('./containers/PermissionSettings/PermissionSettings')
)

const routes = [
  { id: 0, path: '/graph', component: Graph },
  { id: 1, path: '/login', component: LoginPage },
  { id: 2, path: '/profile/assets', component: ProfilePage },
  { id: 3, path: '/profile/activities', component: ProfileActivities },
  { id: 4, path: '/users', component: UsersPage },
  { id: 5, path: '/assets', exact: true, component: ArticlesPage },
  { id: 6, path: '/permissions', component: PermissionSettings },
  { id: 7, path: '/feedbacks', component: Feedbacks },
  { id: 8, path: '/organizations', component: Organizations },
  { id: 9, path: '/activities', component: Activities },
  { id: 10, path: '/register', component: RegisterPage },
]

export default routes
