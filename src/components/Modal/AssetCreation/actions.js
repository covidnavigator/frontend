export const SET_STATE = 'SET_STATE'
export const SET_VALUE = 'SET_VALUE'
export const SET_CURATOR_VALUE = 'SET_CURATOR_VALUE'
export const SET_KEYWORD = 'SET_KEYWORD'
export const DELETE_KEYWORD = 'DELETE_KEYWORD'
export const DRAG_KEYWORD = 'DRAG_KEYWORD'
export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const ADD_CURATOR_CONTACT = 'ADD_CURATOR_CONTACT'
export const ADD_CURATOR = 'ADD_CURATOR'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const REMOVE_CURATOR_CONTACT = 'REMOVE_CURATOR_CONTACT'
export const REMOVE_CURATOR = 'REMOVE_CURATOR'
export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_CURATORS = 'SET_CURATORS'
export const SET_MODIFY = 'SET_MODIFY'
export const SET_ASSET_REQUEST = 'SET_ASSET_REQUEST'
export const SET_ASSET_LOAD_SUCCESS = 'SET_ASSET_LOAD_SUCCESS'
export const SET_KEYWORDS_SELECT = 'SET_KEYWORDS_SELECT'
export const SET_GEOGRAPHY_SELECT = 'SET_GEOGRAPHY_SELECT'

export const edit = () => ({
  type: SET_MODIFY,
})

export const setValue = (key, value) => ({
  type: SET_VALUE,
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

export const setGeographySelect = (data) => ({
  type: SET_GEOGRAPHY_SELECT,
  payload: {
    ...data,
  },
})

export const setCuratorValue = (index, key, value) => ({
  type: SET_CURATOR_VALUE,
  payload: {
    index,
    key,
    value,
  },
})

export const addContact = () => ({
  type: ADD_CONTACT,
})

export const addCuratorContact = (index) => ({
  type: ADD_CURATOR_CONTACT,
  payload: {
    index,
  },
})

export const addCurator = () => ({
  type: ADD_CURATOR,
})

export const setCurators = (curators) => ({
  type: SET_CURATORS,
  payload: {
    curators,
  },
})

export const removeContact = (index) => ({
  type: REMOVE_CONTACT,
  payload: {
    index,
  },
})

export const removeCuratorContact = (curatorIndex, index) => ({
  type: REMOVE_CURATOR_CONTACT,
  payload: {
    curatorIndex,
    index,
  },
})

export const removeCurator = (index) => ({
  type: REMOVE_CURATOR,
  payload: {
    index,
  },
})

export const setState = (state) => ({
  type: SET_STATE,
  payload: {
    state,
  },
})

export const setOrganization = (state) => ({
  type: SET_ORGANIZATIONS,
  payload: {
    state,
  },
})

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: {
    contacts,
  },
})

export const setAssetRequest = () => ({
  type: SET_ASSET_REQUEST,
})

export const setAssetLoadSuccess = () => ({
  type: SET_ASSET_LOAD_SUCCESS,
})
