import * as types from './actions'

export const initialState = {
  activity: {
    name: '',
    shortDescription: '',
    description: '',
    url: '',
    keywords: [],
    knowledgeStages: [],
    status: {
      value: 'Draft',
      label: 'Draft',
      color: '#33333399',
      backgroundColor: '#5151511a',
      fontWeight: 'bold',
    },
    subject: [],
    process: [],
    setting: [],
    activityType: [],
    author: {},
    assets: [],
    activities: [],
    isChanged: false,
  },
  contacts: [],
  organizations: [],
  activitiesOptions: [],
  assetsOptions: [],
  keywordsSelect: [],
  organizationOptions: [
    { label: '+ Create New', value: '', fontWeight: 'bold' },
  ],
  activityRequest: false,
}

export const reducer = (state = initialState, { type, payload }) => {
  let contacts = []
  let organizations = []
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

    case types.SET_ACTIVITIES_SELECT:
      return {
        ...state,
        activitiesOptions: payload.activitiesSelect,
      }

    case types.SET_ASSETS_SELECT:
      return {
        ...state,
        assetsOptions: payload.assetsSelect,
      }

    case types.SET_ORGANIZATIONS_SELECT:
      return {
        ...state,
        organizationOptions: [
          ...state.organizationOptions,
          ...payload.orgSelect,
        ],
      }

    case types.SET_KEYWORDS_SELECT:
      return {
        ...state,
        keywordsSelect: payload.keywordsSelect,
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

    case types.ADD_ORGANIZATION:
      organizations = [...state.organizations]
      organizations.push({
        organization: {
          name: '',
          type: { value: 'government', label: 'Government-Sourced' },
          description: '',
          keywords: '',
          contacts: [],
          selected: '',
        },
        owner: false,
      })
      return {
        ...state,
        organizations: organizations,
      }

    case types.REMOVE_ORGANIZATION:
      organizations = [...state.organizations]
      organizations.splice(payload.index, 1)

      return {
        ...state,
        organizations: organizations,
      }

    case types.ADD_ORGANIZATION_CONTACT:
      organizations = [...state.organizations]
      organizations[payload.index].organization.contacts.push({
        name: '',
        email: '',
        phone: '',
        other: '',
      })
      return {
        ...state,
        organizations: organizations,
      }

    case types.REMOVE_ORGANIZATION_CONTACT:
      organizations = [...state.organizations]
      organizations[payload.curatorIndex].organization.contacts.splice(
        payload.index,
        1
      )
      return {
        ...state,
        organizations: organizations,
      }

    case types.SET_MODIFY:
      return {
        ...state,
        activity: { ...state.activity, isChanged: true },
      }

    case types.REMOVE_CONTACT:
      contacts = [...state.contacts]
      contacts.splice(payload.index, 1)

      return {
        ...state,
        contacts: contacts,
      }

    case types.SET_ORGANIZATION_VALUE:
      organizations = [...state.organizations]
      if (payload.key.split('.').length === 2) {
        organizations[payload.index][payload.key.split('.')[0]][
          payload.key.split('.')[1]
        ] = payload.value
      } else {
        organizations[payload.index][payload.key.split('.')[0]] = payload.value
      }
      return {
        ...state,
        organizations: [...organizations],
      }

    case types.CHANGE_VALUE:
      return {
        ...state,
        [payload.key.split('.')[0]]: {
          ...state[payload.key.split('.')[0]],
          [payload.key.split('.')[1]]: payload.value,
        },
      }

    case types.SET_REQUEST:
      return {
        ...state,
        activityRequest: true,
      }

    case types.SET_REQUEST_SUCCESS:
      return {
        ...state,
        activityRequest: false,
      }

    default:
      return state
  }
}
