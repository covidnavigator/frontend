import React, { useEffect, useReducer, useCallback } from 'react'
import { connect } from 'react-redux'
import './organizationCreationModal.scss'

import { source } from '../../../assets/js/options/formOptions'

// Container actions
import {
  setState,
  setValue,
  addContact,
  removeContact,
  edit,
  setOrganizationRequest,
  setOrganizationLoadSuccess,
  setKeywordsSelect,
} from './actions'
import { reducer, initialState } from './reducer'

// Redux actions
import {
  getOrganizationAction,
  createOrganizationAction,
  updateOrganizationAction,
} from '../../../redux/actions/organizationsAction'

import { CreateOrganizationForm } from '../../../components'
import { getKeywords } from '../../../redux/actions/keywordsAction'

import _ from 'lodash'

const OrganizationCreatingModal = ({
  modalType,
  getOrganizationAction,
  createOrganizationAction,
  updateOrganizationAction,
  organizationId = 0,
  handleCloseModal,
  organizationErrorMessage,
  getKeywords,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeValue = (key, value) => {
    dispatch(setValue(key, value))
    dispatch(edit())
  }

  const addContacts = () => {
    dispatch(addContact())
    dispatch(edit())
  }

  const removeContacts = (i) => {
    dispatch(removeContact(i))
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

  const setOrganizationData = (org) => {
    const data = {
      organization: {
        ...org,
        keywords: org.keywords.map((item) => {
          return { label: item, value: item }
        }),
        type: source.filter((item) => org.type.includes(item.label)),
      },
      contacts: [...org.contacts],
    }
    dispatch(setState(data))
    dispatch(setOrganizationLoadSuccess())
  }

  const fetchOrganizationData = async (id) => {
    await getKeywords(setKeywordsData, makeUrl())
    if (organizationId) {
      dispatch(setOrganizationRequest())

      getOrganizationAction(id, setOrganizationData)
    }
  }

  useEffect(() => {
    fetchOrganizationData(organizationId)
  }, [])

  return (
    <section className="organization-container">
      <div className="organization-container-block">
        <CreateOrganizationForm
          state={state}
          handleCloseModal={handleCloseModal}
          modalType={modalType}
          createOrganization={createOrganizationAction}
          handleInputChange={handleInputChange}
          updateOrganization={updateOrganizationAction}
          addContact={addContacts}
          removeContact={removeContacts}
          changeValue={changeValue}
          organizationErrorMessage={organizationErrorMessage}
        />
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  organizationErrorMessage: state.organizations.organizationErrorMessage,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrganizationAction: (organization) =>
      dispatch(createOrganizationAction(organization)),
    updateOrganizationAction: (id, data) =>
      dispatch(updateOrganizationAction(id, data)),
    getOrganizationAction: (id, callback) =>
      dispatch(getOrganizationAction(id, callback)),
    getKeywords: (callback, url) => dispatch(getKeywords(callback, url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationCreatingModal)
