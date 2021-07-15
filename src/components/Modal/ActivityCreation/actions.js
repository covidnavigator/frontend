export const ADD_CONTACT = 'ADD_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_MODIFY = 'SET_MODIFY'
export const CHANGE_VALUE = 'CHANGE_VALUE'
export const SET_STATE = 'SET_STATE'
export const SET_REQUEST = 'SET_REQUEST'
export const SET_REQUEST_SUCCESS = 'SET_REQUEST_SUCCESS'
export const SET_ORGANIZATION_VALUE = 'SET_ORGANIZATION_VALUE'
export const SET_ASSETS_SELECT = 'SET_ASSETS_SELECT'
export const SET_ACTIVITIES_SELECT = 'SET_ACTIVITIES_SELECT'
export const SET_ORGANIZATIONS_SELECT = 'SET_ORGANIZATIONS_SELECT'
export const SET_KEYWORDS_SELECT = 'SET_KEYWORDS_SELECT'
export const ADD_ORGANIZATION = 'ADD_ORGANIZATION'
export const REMOVE_ORGANIZATION = 'REMOVE_ORGANIZATION'
export const ADD_ORGANIZATION_CONTACT = 'ADD_ORGANIZATION_CONTACT'
export const REMOVE_ORGANIZATION_CONTACT = 'REMOVE_ORGANIZATION_CONTACT'

export const setState = (state) => ({
  type: SET_STATE,
  payload: {
    state,
  },
})

export const setValue = (key, value) => ({
  type: CHANGE_VALUE,
  payload: {
    key,
    value,
  },
})

export const setAssetsSelect = (assetsSelect) => ({
  type: SET_ASSETS_SELECT,
  payload: {
    assetsSelect,
  },
})

export const setActivitiesSelect = (activitiesSelect) => ({
  type: SET_ACTIVITIES_SELECT,
  payload: {
    activitiesSelect,
  },
})

export const setOrganizationSelect = (orgSelect) => ({
  type: SET_ORGANIZATIONS_SELECT,
  payload: {
    orgSelect,
  },
})

export const setKeywordsSelect = (keywordsSelect) => ({
  type: SET_KEYWORDS_SELECT,
  payload: {
    keywordsSelect,
  },
})

export const addOrg = () => ({
  type: ADD_ORGANIZATION,
})

export const removeOrg = (index) => ({
  type: REMOVE_ORGANIZATION,
  payload: {
    index,
  },
})

export const addOrgContact = (index) => ({
  type: ADD_ORGANIZATION_CONTACT,
  payload: {
    index,
  },
})

export const removeOrgContact = (curatorIndex, index) => ({
  type: REMOVE_ORGANIZATION_CONTACT,
  payload: {
    curatorIndex,
    index,
  },
})

export const setOrganizationValue = (index, key, value) => ({
  type: SET_ORGANIZATION_VALUE,
  payload: {
    index,
    key,
    value,
  },
})

export const edit = () => ({
  type: SET_MODIFY,
})

export const addContact = () => ({
  type: ADD_CONTACT,
})

export const removeContact = (index) => ({
  type: REMOVE_CONTACT,
  payload: {
    index,
  },
})

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: {
    contacts,
  },
})

export const setRequest = () => ({
  type: SET_REQUEST,
})

export const setRequestSuccess = () => ({
  type: SET_REQUEST_SUCCESS,
})
