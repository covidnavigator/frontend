import React, { useEffect, useReducer, useCallback } from 'react'
import { connect } from 'react-redux'
import './activity.scss'

import {
  subject,
  status,
  activityTypes,
  process,
  setting,
  knowledgeLifecycleStage,
} from '../../../assets/js/options/formOptions'

// Container actions
import {
  setState,
  setValue,
  addContact,
  removeContact,
  edit,
  setRequest,
  setRequestSuccess,
  setOrganizationValue,
  setActivitiesSelect,
  setAssetsSelect,
  setOrganizationSelect,
  setKeywordsSelect,
  addOrg,
  removeOrg,
  addOrgContact,
  removeOrgContact,
} from './actions'
import { reducer, initialState } from './reducer'

// Redux actions
import {
  getActivityAction,
  getActivitiesAction,
  createActivityAction,
  updateActivityAction,
} from '../../../redux/actions/activitiesAction'

import { getArticlesAction } from '../../../redux/actions/articlesAction'
import { getOrganizationsAction } from '../../../redux/actions/organizationsAction'
import { getKeywords } from '../../../redux/actions/keywordsAction'

import { CreateActivityForm } from '../../../components'

import _ from 'lodash'

const ActivityCreationModal = ({
  modalType,
  getActivityAction,
  user,
  getArticlesAction,
  getActivitiesAction,
  getOrganizationsAction,
  createActivityAction,
  updateActivityAction,
  activityId = 0,
  organizationErrorMessage,
  organizationErrorName,
  handleCloseModal,
  getKeywords,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeValue = (key, value) => {
    dispatch(setValue(key, value))
    dispatch(edit())
  }

  const changeOrganizationValue = (index, key, value) => {
    dispatch(setOrganizationValue(index, key, value))
    dispatch(edit())
  }

  const addContacts = () => {
    dispatch(addContact())
    dispatch(edit())
  }

  const createActivity = (state) => {
    if (!state.activity.author.id) {
      state.activity.author = { id: user.id }
    }
    createActivityAction(state)
  }

  const updateActivity = (state) => {
    if (!state.activity.author.id) {
      state.activity.author = { id: user.id }
    }
    updateActivityAction(state)
  }

  const removeContacts = (i) => {
    dispatch(removeContact(i))
    dispatch(edit())
  }

  const addOrganization = () => {
    dispatch(addOrg())
    dispatch(edit())
  }

  const removeOrganization = (i) => {
    dispatch(removeOrg(i))
    dispatch(edit())
  }

  const addOrganizationContact = (i) => {
    dispatch(addOrgContact(i))
    dispatch(edit())
  }

  const removeOrganizationContact = (curatorI, i) => {
    dispatch(removeOrgContact(curatorI, i))
    dispatch(edit())
  }

  const delayedQuery = useCallback(
    _.debounce((searchFor, searchString) => {
      if (searchFor && !searchString) {
        fetchData(searchFor, '')
      } else {
        fetchData(searchFor, searchString)
      }
    }, 500),
    []
  )

  const handleInputChange = (searchFor, searchString) => {
    delayedQuery(searchFor, searchString)
  }

  const fetchData = async (searchFor, searchString) => {
    if (searchFor === 'assets') {
      await getArticlesAction(
        'articles' + makeUrl('article.name', searchString),
        setAssetsData
      )
    } else if (searchFor === 'activities') {
      await getActivitiesAction(
        'activities' + makeUrl('activity.name', searchString),
        setActiviesData
      )
    } else if (searchFor === 'keywords') {
      await getKeywords(
        setKeywordsData,
        makeUrl('keyword.keyword', searchString)
      )
    }
  }

  const makeUrl = (sortName, searchString) => {
    return `?page=1&limit=100&sortType=up&searchBy=title&status=all${
      sortName ? '&sortName=' + sortName : ''
    }${searchString ? '&searchString=' + searchString : ''}`
  }

  const setAssetsData = (body) => {
    if (body.data && body.data.length) {
      const assetSelect = body.data.map((asset) => {
        return { ...asset, label: asset.name, value: asset.id }
      })
      dispatch(setAssetsSelect(assetSelect))
    }
  }

  const setActiviesData = (data) => {
    if (data.length) {
      const activitiesSelect = data
        .map((activity) => {
          return {
            ...activity,
            label: activity.name,
            value: activity.id,
          }
        })
        .filter((option) => option.value !== activityId)

      dispatch(setActivitiesSelect(activitiesSelect))
    }
  }

  const setKeywordsData = (data) => {
    dispatch(setKeywordsSelect(data))
  }

  const fetchActivityData = async (id) => {
    dispatch(setRequest())

    let organizationSelect = []

    const setOrganizationData = (data) => {
      organizationSelect = data.map((org) => {
        return { ...org, label: org.name, value: org.id }
      })
      dispatch(setOrganizationSelect(organizationSelect))
    }

    await getOrganizationsAction('', setOrganizationData)
    await fetchData('assets')
    await fetchData('activities')
    await fetchData('keywords')

    changeValue('activity.author', user)

    if (modalType !== 'creation') {
      const setActivityData = (activity) => {
        const contacts = activity.contacts.map((item) => item)
        const organizations = activity.activity_organization.map((elem) => {
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
            owner: elem.owner,
          }
        })

        const data = {
          id: activity.id,
          name: activity.name,
          shortDescription: activity.shortDescription,
          description: activity.description,
          url: activity.url,
          status: status.filter((item) => activity.status === item.value)[0],
          keywords: activity.keywords.length
            ? activity.keywords.map((item) => {
                return { label: item, value: item }
              })
            : [],
          knowledgeStages: knowledgeLifecycleStage.filter((option) =>
            activity.knowledgeStages.some((stage) => stage === option.value)
          ),
          assets: activity.articles.length
            ? activity.articles.map((item) => {
                return { ...item, label: item.name, value: item.id }
              })
            : [],
          activities: activity.related.length
            ? activity.related.map((item) => {
                return { ...item, label: item.name, value: item.id }
              })
            : [],
          activityType: [],
          setting: [],
          process: [],
          subject: [],
          author: activity.author,
          isChanged: false,
        }

        if (activity.categories) {
          const subj = subject.filter((item) =>
            activity.categories.includes(item.value)
          )

          const aT = activityTypes.filter((item) =>
            activity.categories.includes(item.value)
          )
          const proc = process.filter((item) =>
            activity.categories.includes(item.value)
          )
          const set = setting.filter((item) =>
            activity.categories.includes(item.value)
          )
          if (subj) {
            subj.forEach((item) => {
              data.subject.push(item)
            })
          }
          if (aT) {
            aT.forEach((item) => {
              data.activityType.push(item)
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
            activity: data,
            contacts: contacts,
            organizations: organizations,
          })
        )

        dispatch(setRequestSuccess())
      }

      getActivityAction(id, setActivityData)
    }
  }

  useEffect(() => {
    fetchActivityData(activityId)
  }, [])

  return (
    <section className="activity-container">
      <div className="activity-container-block">
        <CreateActivityForm
          state={state}
          user={user}
          handleCloseModal={handleCloseModal}
          modalType={modalType}
          createActivity={createActivity}
          updateActivity={updateActivity}
          handleInputChange={handleInputChange}
          changeOrganizationValue={changeOrganizationValue}
          addOrganizationContact={addOrganizationContact}
          addOrganization={addOrganization}
          removeOrganizationContact={removeOrganizationContact}
          removeOrganization={removeOrganization}
          organizationErrorName={organizationErrorName}
          organizationErrorMessage={organizationErrorMessage}
          addContact={addContacts}
          removeContact={removeContacts}
          changeValue={changeValue}
        />
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  organizationErrorMessage: state.activities.organizationErrorMessage,
  organizationErrorName: state.activities.organizationErrorName,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createActivityAction: (activity) =>
      dispatch(createActivityAction(activity)),
    updateActivityAction: (id, activity) =>
      dispatch(updateActivityAction(id, activity)),
    getActivityAction: (id, callback) =>
      dispatch(getActivityAction(id, callback)),
    getActivitiesAction: (url, status, callback) =>
      dispatch(getActivitiesAction(url, status, callback)),
    getArticlesAction: (url, callback) =>
      dispatch(getArticlesAction(url, callback)),
    getOrganizationsAction: (url, callback) =>
      dispatch(getOrganizationsAction(url, callback)),
    getKeywords: (callback, url) => dispatch(getKeywords(callback, url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityCreationModal)
