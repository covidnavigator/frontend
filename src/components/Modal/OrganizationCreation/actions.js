export const ADD_CONTACT = 'ADD_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_MODIFY = 'SET_MODIFY'
export const CHANGE_VALUE = 'CHANGE_VALUE'
export const SET_STATE = 'SET_STATE'
export const SET_ORGANIZATION_REQUEST = 'SET_ORGANIZATION_REQUEST'
export const SET_ORGANIZATION_LOAD_SUCCESS = 'SET_ORGANIZATION_LOAD_SUCCESS'
export const SET_KEYWORDS_SELECT = 'SET_KEYWORDS_SELECT'

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

export const setKeywordsSelect = (keywordsSelect) => ({
  type: SET_KEYWORDS_SELECT,
  payload: {
    keywordsSelect,
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

export const setOrganizationRequest = () => ({
  type: SET_ORGANIZATION_REQUEST,
})

export const setOrganizationLoadSuccess = () => ({
  type: SET_ORGANIZATION_LOAD_SUCCESS,
})
