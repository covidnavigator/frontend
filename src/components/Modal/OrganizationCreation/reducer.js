import * as types from './actions'

export const initialState = {
  organization: {
    name: '',
    type: { value: 'government', label: 'Government-Sourced' },
    description: '',
    keywords: '',
    isChanged: false,
  },
  keywordsSelect: [],
  contacts: [],
  OrganizationRequest: false,
}

export const reducer = (state = initialState, { type, payload }) => {
  let contacts = []
  switch (type) {
    case types.SET_STATE:
      return {
        ...state,
        ...payload.state,
      }

    case types.SET_CONTACTS:
      return {
        ...state,
        contacts: payload.contacts,
      }

    case types.ADD_CONTACT:
      contacts = [...state.contacts]
      contacts.push({
        name: '',
        email: '',
        phone: '',
        other: '',
      })
      return {
        ...state,
        contacts: contacts,
      }

    case types.SET_MODIFY:
      return {
        ...state,
        organization: { ...state.organization, isChanged: true },
      }

    case types.REMOVE_CONTACT:
      contacts = [...state.contacts]
      contacts.splice(payload.index, 1)

      return {
        ...state,
        contacts: contacts,
      }

    case types.SET_KEYWORDS_SELECT:
      return {
        ...state,
        keywordsSelect: payload.keywordsSelect,
      }

    case types.CHANGE_VALUE:
      return {
        ...state,
        [payload.key.split('.')[0]]: {
          ...state[payload.key.split('.')[0]],
          [payload.key.split('.')[1]]: payload.value,
        },
      }

    case types.SET_ORGANIZATION_REQUEST:
      return {
        ...state,
        organizationRequest: true,
      }

    case types.SET_ORGANIZATION_LOAD_SUCCESS:
      return {
        ...state,
        organizationRequest: false,
      }

    default:
      return state
  }
}
