import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import { connect } from 'react-redux'

import { CreateArticleForm } from '../..'

import {
  maturity as maturities,
  languages,
  formalism,
  publicationTypes,
  curation,
  roles,
  subject,
  status,
  asset,
  process,
  setting,
} from '../../../assets/js/options/formOptions'

// Container actions
import {
  setState,
  setValue,
  setCuratorValue,
  addContact,
  addCuratorContact,
  removeContact,
  removeCuratorContact,
  setOrganization,
  setKeywordsSelect,
  setGeographySelect,
  addCurator,
  removeCurator,
  edit,
  setAssetRequest,
  setAssetLoadSuccess,
  setArticleJournal,
  setArticleJournalValue,
  addExternalSource,
  removeExternalSource,
  setExternalSourceValue,
  setExternalSources,
} from './actions';
import { reducer, initialState } from './reducer'

// Redux actions
import {
  createArticleAction,
  updateArticleAction,
  setArticleRequest,
  getArticleAction,
  getGeography,
  getArticleJournals,
  getExternalSources,
} from '../../../redux/actions/articlesAction';

import { getOrganizationsAction } from '../../../redux/actions/organizationsAction'
import { getKeywords } from '../../../redux/actions/keywordsAction'

import _ from 'lodash'

import './article.scss'

const AssetCreationModal = ({
  user,
  getOrganizationsAction,
  getArticleAction,
  updateArticleAction,
  createArticleAction,
  setArticleRequest,
  assetId = 0,
  modalType,
  handleCloseModal,
  urlErrorMessage,
  organizationErrorMessage,
  organizationErrorName,
  getKeywords,
  getGeography,
  getArticleJournals,
  getExternalSources,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const assetModalRef = useRef(null)

  const changeValue = (key, value) => {
    dispatch(setValue(key, value))
    dispatch(edit())
  }

  const changeCuratorValue = (index, key, value) => {
    dispatch(setCuratorValue(index, key, value))
    dispatch(edit())
  }

  const changeExternalSource = (index, key, value) => {
    dispatch(setExternalSourceValue(index, key, value))
    dispatch(edit())
  }

  const changeArticleJournalValue = (key, value) => {
    dispatch(setArticleJournalValue(key, value))
    dispatch(edit())
  }

  const stateToObjects = () => {
    const organization = {
      data: {},
      keywords: [],
    }
    const curators = []

    if (state.organization.value.id) {
      organization.data.id = state.organization.value.id
    } else {
      organization.data.name = state.organization.name
      organization.data.type = state.organization.type.label
      organization.data.description = state.organization.description
      organization.data.contacts = state.contacts ? state.contacts : []
      if (state.organization.keywords) {
        organization.keywords = state.organization.keywords.map((keyword) => {
          return {
            keyword: keyword.value,
          }
        })
      } else {
        organization.keywords = []
      }
    }

    state.curators.forEach((curator) => {
      const newCurator = { organization: {}, valuation: '', keywords: [] }
      if (curator.organization.selected.value) {
        newCurator.organization.id = curator.organization.selected.value
      } else {
        newCurator.organization.name = curator.organization.name
        newCurator.organization.type = curator.organization.type.label
        newCurator.organization.description = curator.organization.description
        newCurator.organization.contacts = curator.organization.contacts
          ? curator.organization.contacts
          : []
        if (curator.organization.keywords) {
          newCurator.keywords = curator.organization.keywords.map((keyword) => {
            return {
              keyword: keyword.value,
            }
          })
        } else {
          newCurator.keywords = []
        }
      }
      newCurator.valuation = curator.valuation.label
      if (newCurator.organization.id || newCurator.organization.name) {
        curators.push(newCurator)
      }
    })

    if (!state.asset.author.id) {
      state.asset.author = { id: user.id }
    }

    return {
      asset: state.asset,
      curators: curators,
      organization: organization,
    }
  }

  const updateAsset = (state) => {
    const obj = stateToObjects(state)
    updateArticleAction(obj.asset, obj.curators, obj.organization)
  }

  const createAsset = (state) => {
    const obj = stateToObjects(state)
    createArticleAction(obj.asset, obj.curators, obj.organization)
  }

  const addContacts = () => {
    dispatch(addContact())
    dispatch(edit())
  }

  const addCuratorContacts = (i) => {
    dispatch(addCuratorContact(i))
    dispatch(edit())
  }

  const addCurators = () => {
    dispatch(addCurator())
    dispatch(edit())
  }

  const addExternalSources = () => {
    dispatch(addExternalSource())
    dispatch(edit())
  }

  const removeContacts = (i) => {
    dispatch(removeContact(i))
    dispatch(edit())
  }

  const removeCuratorContacts = (curatorI, i) => {
    dispatch(removeCuratorContact(curatorI, i))
    dispatch(edit())
  }

  const removeCurators = (i) => {
    dispatch(removeCurator(i))
    dispatch(edit())
  }

  const removeExternalSources = (i) => {
    dispatch(removeExternalSource(i))
    dispatch(edit())
  }

  const setKeywordsData = (data) => {
    dispatch(setKeywordsSelect(data))
  }

  const makeUrl = (searchString) => {
    return `?page=1&limit=100&sortType=up&searchBy=title&status=all&sortName=keyword.keyword${
      searchString ? '&searchString=' + searchString : ''
    }`
  }

  const delayedQuery = useCallback(
    _.debounce(
      (searchString) => getKeywords(setKeywordsData, makeUrl(searchString)),
      500
    ),
    []
  )

  const handleInputChange = (searchString) => {
    delayedQuery(searchString)
  }

  const fetchArticleData = async (id) => {
    dispatch(setAssetRequest())

    let organizationSelect
    let articleJournalsSelect
    let externalSourcesSelect

    const setOrganizationData = (data) => {
      organizationSelect = data.map((org) => {
        return { ...org, label: org.name, value: org.id }
      })
      dispatch(setOrganization(organizationSelect))
    }

    await getOrganizationsAction('', setOrganizationData)

    const setGeographyData = (data) => {
      dispatch(setGeographySelect(data))
    }

    const setExternalSourcesData = (data) => {
      externalSourcesSelect = data.map((source) => {
        return { label: source.external_name  }
      })
      dispatch(setExternalSources(externalSourcesSelect))
    }

    await getGeography(setGeographyData)
    await getKeywords(setKeywordsData, makeUrl())
    await getExternalSources(setExternalSourcesData)

    const setArticleJournals = (data) => {
      articleJournalsSelect = data.map((journal) => {
        return { label: journal.journals_name, id: journal.journals_id }
      })
      dispatch(setArticleJournal(articleJournalsSelect))
    }

    await getArticleJournals(setArticleJournals)

    if (modalType !== 'creation') {
      const setAssetData = (article) => {
        const array = {
          ...article,
        }
        const org = {
          name: '',
          type: { value: 'government', label: 'Government-Sourced' },
          description: '',
          value: organizationSelect.filter(
            (item) => item.id === article.organization.id
          )[0],
        }
        const extsource = array.external_sources.map((elem) => {
          return {
            name: elem.external_name,
            selected: {
              label: elem.external_name,
            },
            ids: elem.external_ids,
          }
        })
        const contacts = array.organization.contacts.map((item) => item)
        const curators = array.curators.map((elem) => {
          return {
            organization: {
              name: '',
              type: { value: 'government', label: 'Government-Sourced' },
              description: '',
              keywords: '',
              contacts: [],
              selected: {
                label: elem.organization.name,
                value: elem.organization.id,
              },
            },
            valuation: curation.filter(
              (item) => elem.valuation === item.label
            )[0],
          }
        })
        const journal = {
          name: '',
          selected: article.journal ? articleJournalsSelect.filter((item) => item.id === article.journal.id)[0] : ''
        }
        const data = {
          id: article.id,
          name: article.name,
          ref: article.ref,
          status: status.filter((item) => article.status === item.value)[0],
          description: article.description,
          authors: article.authors.map((item) => ({
            label: item,
            value: item,
          })),
          notes: article.notes,
          url: article.url,
          language: languages[1].options.find(
            (lang) => lang.value === article.language
          ),
          created: new Date(article.created),
          updated: new Date(article.updated),
          published_date: article.published_date ? article.published_date :  '',
          external_sources: extsource,
          role: roles.filter((item) => article.role.includes(item.value)),
          keywords: article.keywords.map((item) => {
            return { label: item, value: item }
          }),
          pan_countries: article.pan_countries.map((item) => {
            return { label: item, value: item }
          }),
          geography: article.geography,
          countries: article.countries.map((item) => {
            return { label: item, value: item }
          }),
          regions: article.regions.map((item) => {
            return { label: item, value: item }
          }),
          state_or_provinces: article.state_or_provinces.map((item) => {
            return { label: item, value: item }
          }),
          localities: article.localities.map((item) => {
            return { label: item, value: item }
          }),

          formalism: formalism.filter((item) =>
            article.formalism.includes(item.value)
          ),
          publication_type: publicationTypes.find(
            (type) => type.value === article.publication_type
          ),
          asset_version: article.asset_version,
          asset_maturity: maturities.find(
            (item) => item.label === article.asset_maturity
          ),
          assetType: [],
          setting: [],
          process: [],
          subject: [],
          author: article.author,
          isChanged: false,
          journal: journal,
        }
        if (article.categories.length) {
          const subj = subject.filter((item) =>
            article.categories.includes(item.value)
          )
          const aT = asset.filter((item) =>
            article.categories.includes(item.value)
          )
          const proc = process.filter((item) =>
            article.categories.includes(item.value)
          )
          const set = setting.filter((item) =>
            article.categories.includes(item.value)
          )
          if (subj) {
            subj.forEach((item) => {
              data.subject.push(item)
            })
          }
          if (aT) {
            aT.forEach((item) => {
              data.assetType.push(item)
            })
          }
          if (proc) {
            proc.forEach((item) => {
              data.process.push(item)
            })
          }
          if (set) {
            set.forEach((item) => {
              data.setting.push(item)
            })
          }
        }

        dispatch(
          setState({
            asset: data,
            organization: { ...org },
            contacts: contacts,
            curators: curators,
          })
        )
      }

      getArticleAction(id, setAssetData)
    }
    dispatch(setAssetLoadSuccess())
  }

  useEffect(() => {
    fetchArticleData(assetId)
    setArticleRequest()
  }, [])

  return (
    <section ref={assetModalRef} className="container">
      <div className="container-block">
        <CreateArticleForm
          state={state}
          activeTab={modalType}
          handleCloseModal={handleCloseModal}
          handleInputChange={handleInputChange}
          modalType={modalType}
          createAsset={createAsset}
          updateAsset={updateAsset}
          addContact={addContacts}
          addCuratorContact={addCuratorContacts}
          addCurator={addCurators}
          addExternalSource={addExternalSources}
          removeContact={removeContacts}
          removeCuratorContact={removeCuratorContacts}
          removeCurator={removeCurators}
          removeExternalSource={removeExternalSources}
          changeValue={changeValue}
          changeCuratorValue={changeCuratorValue}
          changeArticleJournalValue={changeArticleJournalValue}
          changeExternalSource={changeExternalSource}
          urlErrorMessage={urlErrorMessage}
          organizationErrorMessage={organizationErrorMessage}
          organizationErrorName={organizationErrorName}
        />
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  urlErrorMessage: state.articles.urlErrorMessage,
  organizationErrorMessage: state.articles.organizationErrorMessage,
  organizationErrorName: state.articles.organizationErrorName,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createArticleAction: (asset, curators, organization) =>
      dispatch(createArticleAction(asset, curators, organization)),
    updateArticleAction: (asset, curators, organization) =>
      dispatch(updateArticleAction(asset, curators, organization)),
    setArticleRequest: (id, list) => dispatch(setArticleRequest(id, list)),
    getOrganizationsAction: (url, callback) =>
      dispatch(getOrganizationsAction(url, callback)),
    getArticleAction: (id, callback) =>
      dispatch(getArticleAction(id, callback)),
    getKeywords: (callback, url) => dispatch(getKeywords(callback, url)),
    getGeography: (callback) => dispatch(getGeography(callback)),
    getArticleJournals: (callback) => dispatch(getArticleJournals(callback)),
    getExternalSources: (callback) => dispatch(getExternalSources(callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetCreationModal)
