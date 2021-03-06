import {
  SET_STATE,
  SET_VALUE,
  SET_CURATOR_VALUE,
  SET_ORGANIZATIONS,
  ADD_CONTACT,
  ADD_CURATOR_CONTACT,
  REMOVE_CONTACT,
  REMOVE_CURATOR_CONTACT,
  SET_CONTACTS,
  SET_CURATORS,
  ADD_CURATOR,
  REMOVE_CURATOR,
  SET_MODIFY,
  SET_ASSET_REQUEST,
  SET_ASSET_LOAD_SUCCESS,
  SET_KEYWORDS_SELECT,
  SET_GEOGRAPHY_SELECT,
  SET_ARTICLE_JOURNALS,
  SET_ARTICLE_JOURNAL_VALUE,
  ADD_EXTERNAL_SOURCE,
  REMOVE_EXTERNAL_SOURCE,
  SET_EXTERNAL_SOURCE_VALUE,
  SET_EXTERNAL_SOURCES,
} from './actions';

export const initialState = {
  asset: {
    isChanged: false,
    name: '',
    ref: '',
    status: {
      value: 'Draft',
      label: 'Draft',
      color: '#33333399',
      backgroundColor: '#5151511a',
      fontWeight: 'bold',
    },
    description: '',
    url: '',
    authors: [],
    language: { value: 'en', label: 'English', nativelabel: 'English' },
    created: '',
    updated: '',
    role: [],
    keywords: '',
    formalism: [],
    publication_type: { value: 'review', label: 'Systematic Review' },
    asset_version: '',
    asset_maturity: { value: 'level_1', label: 'Level 1: Immature' },
    notes: '',
    geography: 'Global',
    author: {},
    pan_countries: [],
    countries: [],
    regions: [],
    localities: [],
    state_or_provinces: [],
    subject: [],
    process: [],
    setting: [],
    assetType: [],
    published_date: '',
    journal: {
      name: '',
      selected: '',
    },
    external_sources: [],
  },
  organization: {
    name: '',
    type: { value: 'government', label: 'Government-Sourced' },
    description: '',
    keywords: '',
    value: '',
  },
  contacts: [],
  curators: [],
  organizations: [{ label: '+ Create New', value: '', fontWeight: 'bold' }],
  keywordsSelect: [],
  countriesSelect: [],
  panCountriesSelect: [],
  regonsSelect: [],
  stateSelect: [],
  localitiesSelect: [],
  assetRequest: false,
  loadSuccess: false,
  journals: [{ label: '+ Create New', value: '', fontWeight: 'bold' }],
  externalSourcesSelect: [{ label: '+ Create New', value: '', fontWeight: 'bold' }],
}

export const reducer = (state = initialState, { type, payload }) => {
  let contacts = []
  let curators = []
  let external_sources = []
  switch (type) {
    case SET_STATE:
      return {
        ...state,
        ...payload.state,
      }

    case SET_KEYWORDS_SELECT:
      return {
        ...state,
        keywordsSelect: payload.keywordsSelect,
      }

    case SET_GEOGRAPHY_SELECT: {
      return {
        ...state,
        ...payload,
      }
    }

    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: [...state.organizations, ...payload.state],
      }
    case SET_CURATORS:
      return {
        ...state,
        curatorsSelect: [...state.curatorsSelect, ...payload.curators],
      }
    case SET_CONTACTS:
      return {
        ...state,
        contacts: payload.contacts,
      }

    case ADD_CONTACT:
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

    case ADD_CURATOR_CONTACT:
      curators = [...state.curators]
      curators[payload.index].organization.contacts.push({
        name: '',
        email: '',
        phone: '',
        other: '',
      })
      return {
        ...state,
        curators: curators,
      }

    case SET_MODIFY:
      return {
        ...state,
        asset: { ...state.asset, isChanged: true },
      }

    case REMOVE_CONTACT:
      contacts = [...state.contacts]
      contacts.splice(payload.index, 1)
      return {
        ...state,
        contacts: contacts,
      }

    case REMOVE_CURATOR_CONTACT:
      curators = [...state.curators]
      curators[payload.curatorIndex].organization.contacts.splice(
        payload.index,
        1
      )
      return {
        ...state,
        curators: curators,
      }

    case ADD_CURATOR:
      curators = [...state.curators]
      curators.push({
        organization: {
          name: '',
          type: { value: 'government', label: 'Government-Sourced' },
          description: '',
          keywords: '',
          contacts: [],
          selected: '',
        },
        valuation: { value: 'recommended', label: 'Recommended' },
      })
      return {
        ...state,
        curators: curators,
      }

    case REMOVE_CURATOR:
      curators = [...state.curators]
      curators.splice(payload.index, 1)

      return {
        ...state,
        curators: curators,
      }

    case SET_VALUE:
      if (
        payload.key === 'organization.value' &&
        payload.value.label === '+ Create New'
      ) {
        return {
          ...state,
          contacts: [],
          [payload.key.split('.')[0]]: {
            ...state[payload.key.split('.')[0]],
            [payload.key.split('.')[1]]: payload.value,
          },
        }
      } else if (
        payload.key === 'organization.value' &&
        payload.value.label !== '+ Create New'
      ) {
        return {
          ...state,
          [payload.key.split('.')[0]]: {
            ...state[payload.key.split('.')[0]],
            [payload.key.split('.')[1]]: payload.value,
            name: '',
          },
        }
      } else {
        return {
          ...state,
          [payload.key.split('.')[0]]: {
            ...state[payload.key.split('.')[0]],
            [payload.key.split('.')[1]]: payload.value,
          },
        }
      }

    case SET_CURATOR_VALUE:
      curators = [...state.curators]
      if (payload.key.split('.').length === 2) {
        curators[payload.index][payload.key.split('.')[0]][
          payload.key.split('.')[1]
        ] = payload.value
      } else {
        curators[payload.index][payload.key.split('.')[0]] = payload.value
      }
      return {
        ...state,
        curators: [...curators],
      }

    case SET_EXTERNAL_SOURCE_VALUE:
      external_sources = [...state.asset.external_sources]
      if (payload.value.label !== '+ Create New' && payload.key === 'selected') {
        external_sources[payload.index]['name'] = payload.value.label;
      }
      if (payload.value.label === '+ Create New' && payload.key === 'selected') {
        external_sources[payload.index][payload.key.split('.')[0]] = payload.value;
        external_sources[payload.index]['name'] = '';

      } else {
        external_sources[payload.index][payload.key.split('.')[0]] = payload.value
      }

      return {
        ...state,
        asset: {...state.asset, external_sources: external_sources}
      }

    case SET_ASSET_REQUEST:
      return {
        ...state,
        assetRequest: true,
        loadSuccess: false,
      }

    case SET_ASSET_LOAD_SUCCESS:
      return {
        ...state,
        assetRequest: false,
        loadSuccess: true,
      }

    case SET_ARTICLE_JOURNALS:
      return {
        ...state,
        journals: [...state.journals, ...payload.journals],
      }

    case SET_ARTICLE_JOURNAL_VALUE:
      if (payload.key === 'asset.journal.selected' && payload.value.label !== '+ Create New') {
        return {
          ...state,
          [payload.key.split('.')[0]]: {
            ...state[payload.key.split('.')[0]],
            [payload.key.split('.')[1]]: {
              [payload.key.split('.')[2]]: payload.value,
              name: '',
            },
          },
        }
      } else {
        return {
          ...state,
          [payload.key.split('.')[0]]: {
            ...state[payload.key.split('.')[0]],
            [payload.key.split('.')[1]]: {
              ...state[payload.key.split('.')[0]][payload.key.split('.')[1]],
              [payload.key.split('.')[2]]: payload.value,
            },
          },
        }
      }


    case ADD_EXTERNAL_SOURCE:
      external_sources = [...state.asset.external_sources]
      external_sources.push({
        name: '',
        selected: '',
        ids: '',
      })
      return {
        ...state,
        asset: {...state.asset, external_sources: external_sources}
      }

    case REMOVE_EXTERNAL_SOURCE:
      external_sources = [...state.asset.external_sources]
      external_sources.splice(payload.index, 1)

      state.asset.external_sources = external_sources;

      return {
        ...state,
        asset: {...state.asset, external_sources: external_sources}
      }

    case SET_EXTERNAL_SOURCES:
      return {
        ...state,
        externalSourcesSelect: [...state.externalSourcesSelect, ...payload.state],
      }


    default:
      return state
  }
}
