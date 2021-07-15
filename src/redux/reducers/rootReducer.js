import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'
import filtersReducer from './filtersReducer'
import rolesReducer from './rolesReducer'
import listsReducer from './listsReducer'
import legendReducer from './legendReducer'
import usersReducer from './usersReducer'
import feedbacksReducer from './feedbacksReducer'
import organizationsReducer from './organizationsReducer'
import notificationsReducer from './notificationsReducer'
import activitiesReducer from './activitiesReducer'
import keywordsReducer from './keywordsReducer'

export const rootReducer = combineReducers({
  articles: articlesReducer,
  activities: activitiesReducer,
  filters: filtersReducer,
  login: loginReducer,
  user: userReducer,
  roles: rolesReducer,
  lists: listsReducer,
  users: usersReducer,
  legend: legendReducer,
  feedbacks: feedbacksReducer,
  organizations: organizationsReducer,
  notifications: notificationsReducer,
  keywords: keywordsReducer,
})

export default rootReducer
