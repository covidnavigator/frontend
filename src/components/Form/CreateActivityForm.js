import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckboxGroup,
  FormCheckbox,
  FormCreatableSelect,
  StatusSelect,
  FormMultipleSelect,
} from '../../components'

import './form.scss'
import plus from '../../assets/img/icons/header/plus.svg'
import arrow from '../../assets/img/icons/feeds/caret-down.svg'
import times from '../../assets/img/icons/articles/icons-times-copy.svg'

import {
  source,
  status,
  activitiesStatusDescriptions,
  process,
  activityTypes,
  setting,
  subject,
  knowledgeLifecycleStage,
} from '../../assets/js/options/formOptions'

import ApplicationHelper from '../../assets/js/utils'

export function CreateActivityForm({
  state,
  changeValue,
  handleCloseModal,
  modalType,
  addContact,
  addOrganizationContact,
  addOrganization,
  handleInputChange,
  removeContact,
  removeOrganizationContact,
  removeOrganization,
  createActivity,
  updateActivity,
  organizationErrorMessage,
  changeOrganizationValue,
  organizationErrorName,
}) {
  const [organizationValidation, setorganizationValidation] = useState(false)
  const [identificationValidation, setIdentificationValidation] = useState(
    false
  )

  const [identification, setIdentification] = useState(true)
  const [organizations, setOrganizations] = useState(false)
  const [classification, setClassification] = useState(false)

  const openSection = (callback) => {
    callback((prev) => !prev)
  }

  const changeContacts = (key, value, num, item) => {
    let arr = [...state[item]]
    arr[num][key] = value
    changeValue(key, arr)
  }

  const changeOrganizationContacts = (organizationIndex, index, key, value) => {
    let orgContacts = [
      ...state.organizations[organizationIndex].organization.contacts,
    ]
    orgContacts[index][key] = value
    changeOrganizations(organizationIndex, 'organization.contacts', orgContacts)
  }

  const changeOrganizations = (index, key, value) => {
    changeOrganizationValue(index, key, value)
  }

  const verifyIdentifitcation = () => {
    let contactError = false

    state.contacts.forEach((contact) => {
      if (
        contact.name.trim().length === 0 ||
        !ApplicationHelper.validateEmail(contact.email)
      ) {
        contactError = true
      }
    })

    if (
      !contactError &&
      state.activity.name.trim().length !== 0 &&
      state.activity.shortDescription.trim().length !== 0
    ) {
      return true
    } else {
      return false
    }
  }

  const verifyOrganizations = () => {
    let contactError = false
    let organizationError = false
    state.organizations.forEach((organization) => {
      if (organization.organization.selected.label === '+ Create New') {
        organization.organization.contacts.forEach((contact) => {
          if (
            contact.name.trim().length === 0 ||
            !ApplicationHelper.validateEmail(contact.email)
          ) {
            contactError = true
          }
        })
        if (
          organization.organization.name.trim().length === 0 ||
          state.organizations.some(
            (org) => org.label === organization.organization.name.trim()
          ) ||
          state.organizations.filter(
            (cur) =>
              cur.organization.name === organization.organization.name.trim()
          ).length !== 1
        ) {
          organizationError = true
        }
      }
    })

    if (!contactError && !organizationError) {
      return true
    } else {
      return false
    }
  }

  const verify = () => {
    if (!verifyIdentifitcation() || !verifyOrganizations()) {
      if (!verifyOrganizations()) {
        setIdentification(false)
        setOrganizations(true)
        setClassification(false)
        setorganizationValidation(true)
      }
      if (!verifyIdentifitcation()) {
        setIdentification(true)
        setOrganizations(false)
        setClassification(false)
        setIdentificationValidation(true)
      }
    } else if (state.activity.isChanged) {
      setIdentificationValidation(false)
      setorganizationValidation(false)
      if (modalType === 'creation') {
        createActivity(state)
      } else {
        updateActivity(state)
      }
    }
  }

  useEffect(() => {
    if (modalType === 'classification') {
      setIdentification(false)
      setOrganizations(false)
      setClassification(true)
    }
  }, [modalType])

  useEffect(() => {
    if (organizationErrorMessage) {
      setIdentification(false)
      setOrganizations(true)
      setClassification(false)
      setorganizationValidation(true)
    }
  }, [organizationErrorMessage])

  const organizationsWithoutSelected = () => {
    return state.organizationOptions.filter((org) => {
      if (
        !state.organizations.some(
          (organization) =>
            organization.organization.selected.label === org.label &&
            organization.organization.selected.label !== '+ Create New'
        )
      ) {
        return true
      }
      return false
    })
  }

  const isOrganizationExist = (name) => {
    if (name === '') return false
    if (
      organizationErrorName === name ||
      state.organizations.some((org) => org.label === name)
    ) {
      return true
    }
    return false
  }

  const isUniqueOrganizationName = (name) => {
    if (name === '') return true
    if (
      state.organizations.filter(
        (organization) => organization.organization.name === name
      ).length === 1
    ) {
      return true
    }
    return false
  }

  const generateContacts = state.contacts.map((contact, index) => (
    <div key={index} className="form__creation">
      <div className="form__creation-contacts_info">
        <FormInput
          className="form-item"
          label="Name*"
          name="name"
          id={'name' + index}
          error={
            identificationValidation
              ? contact.name.trim().length === 0
                ? true
                : false
              : false
          }
          value={contact.name}
          onChange={(key, value) =>
            changeContacts(key, value, index, 'contacts')
          }
        />
        <FormInput
          className="form-item"
          label="Email*"
          id={'email' + index}
          error={
            identificationValidation
              ? !ApplicationHelper.validateEmail(contact.email)
                ? true
                : false
              : false
          }
          name="email"
          value={contact.email}
          onChange={(key, value) =>
            changeContacts(key, value, index, 'contacts')
          }
        />
        <img
          style={{ cursor: 'pointer' }}
          onClick={(e) => removeContact(index)}
          src={times}
          alt="times"
        />
        <FormInput
          className="form-item"
          label="Phone"
          name="phone"
          id={'phone' + index}
          value={contact.phone}
          onChange={(key, value) =>
            changeContacts(key, value, index, 'contacts')
          }
        />
        <FormInput
          className="form-item"
          label="Other"
          name="other"
          id={'other' + index}
          value={contact.other}
          onChange={(key, value) =>
            changeContacts(key, value, index, 'contacts')
          }
        />
      </div>
    </div>
  ))

  const generateOrganizationContacts = (organizationIndex) =>
    state.organizations[organizationIndex].organization.contacts.map(
      (contact, index) => (
        <div key={index} className="form__creation-contacts_info mt-10">
          <FormInput
            className="form-item"
            label="Name*"
            name="name"
            id={'orgContactName' + organizationIndex + index}
            error={
              organizationValidation
                ? contact.name.trim().length === 0
                  ? true
                  : false
                : false
            }
            value={contact.name}
            onChange={(key, value) =>
              changeOrganizationContacts(organizationIndex, index, key, value)
            }
          />
          <FormInput
            className="form-item"
            label="Email*"
            id={'orgContactEmail' + organizationIndex + index}
            error={
              organizationValidation
                ? !ApplicationHelper.validateEmail(contact.email)
                  ? true
                  : false
                : false
            }
            name="email"
            value={contact.email}
            onChange={(key, value) =>
              changeOrganizationContacts(organizationIndex, index, key, value)
            }
          />
          <img
            style={{ cursor: 'pointer' }}
            onClick={(e) => removeOrganizationContact(organizationIndex, index)}
            src={times}
            alt="times"
          />
          <FormInput
            className="form-item"
            label="Phone"
            name="phone"
            id={'orgContactPhone' + organizationIndex + index}
            value={contact.phone}
            onChange={(key, value) =>
              changeOrganizationContacts(organizationIndex, index, key, value)
            }
          />
          <FormInput
            className="form-item"
            label="Other"
            name="other"
            id={'orgContactOther' + organizationIndex + index}
            value={contact.other}
            onChange={(key, value) =>
              changeOrganizationContacts(organizationIndex, index, key, value)
            }
          />
        </div>
      )
    )

  const generateOrganizations = state.organizations.map(
    (organization, index) => (
      <div
        key={index}
        className="form__creation__organizations form__creation mb-10"
      >
        <div
          className={
            organization.organization.selected.label !== '+ Create New' &&
            organization.organization.selected !== ''
              ? 'form__creation-select'
              : 'form__creation-select-empty'
          }
        >
          <FormSelect
            className="form-item"
            label="Organization"
            name="organization.selected"
            value={organization.organization.selected}
            onChange={(key, value) => changeOrganizations(index, key, value)}
            options={organizationsWithoutSelected()}
            isSearch={true}
            hideSelectedOptions={true}
            style={{ menuTop: '42px' }}
          />

          {organization.organization.selected !== '' ? (
            <div className="form__creation__organizations-info">
              <FormCheckbox
                label="Owner"
                name="owner"
                checked={organization.owner}
                onChange={(key, value) =>
                  changeOrganizations(index, key, value)
                }
              />
            </div>
          ) : null}
          <img
            style={{ cursor: 'pointer' }}
            onClick={(e) => removeOrganization(index)}
            src={times}
            alt="times"
          />
        </div>
        {organization.organization.selected.label === '+ Create New' ? (
          <>
            <div className="form__creation-organization_header">
              <div className="form__creation-organization_name">
                <FormInput
                  className="form-item"
                  label="Organization Name*"
                  name="organization.name"
                  id={'orgName' + index}
                  error={
                    organizationValidation
                      ? organization.organization.name.trim().length === 0
                        ? true
                        : false
                      : false
                  }
                  errorMessage={
                    organizationValidation
                      ? isOrganizationExist(organization.organization.name)
                        ? 'Organization with this name already exists'
                        : isUniqueOrganizationName(
                            organization.organization.name
                          )
                        ? ''
                        : 'Organization name must be unique'
                      : ''
                  }
                  value={organization.organization.name}
                  onChange={(key, value) =>
                    changeOrganizations(index, key, value)
                  }
                />
              </div>
              <div className="form__creation-organization_type">
                <FormSelect
                  className="form-item"
                  label="Organization Type"
                  name="organization.type"
                  value={organization.organization.type}
                  onChange={(key, value) =>
                    changeOrganizations(index, key, value)
                  }
                  options={source}
                />
              </div>
            </div>

            <FormTextarea
              className="form-item__notes"
              label="Organization Description"
              name="organization.description"
              id={'orgDescr' + index}
              value={organization.organization.description}
              onChange={(key, value) => changeOrganizations(index, key, value)}
              maxLength={1000}
            />
            <FormCreatableSelect
              className="form-item"
              label="Organization Keywords"
              name="organization.keywords"
              onInputChange={(string) => handleInputChange('keywords', string)}
              value={organization.organization.keywords}
              options={state.keywordsSelect}
              onChange={(key, value) => changeOrganizations(index, key, value)}
              isMulti={true}
            />

            <div className="form__creation-contacts">
              <h2 className="form__creation-contacts_header">
                Points of Contact
              </h2>
              {generateOrganizationContacts(index)}
              <button
                onClick={() => addOrganizationContact(index)}
                type="button"
                className="form__creation-contacts_button"
              >
                <img
                  className="form__creation-contacts_button-plus"
                  src={plus}
                  alt="plus"
                />
                <span>Contact</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    )
  )

  return (
    <>
      <div className="form__header">
        <h2 className="form__header__title">
          {modalType === 'creation' ? 'New Activity' : 'Edit Activity'}
        </h2>

        <div className="form__header__status-description">
          {activitiesStatusDescriptions[state.activity.status.value]}
        </div>

        <div
          className={`form__header-select form__header-select-${
            ApplicationHelper.getPropperSelectOptions('edit', status).length
          }`}
        >
          <StatusSelect
            className="form-item__status"
            value={state.activity.status}
            onChange={(value) => changeValue('activity.status', value)}
            options={ApplicationHelper.getPropperSelectOptions('edit', status)}
            withBorder={true}
            disabled={
              !ApplicationHelper.checkPermissionByAssetStatus(
                'edit',
                state.activity.status.value
              )
            }
          />
        </div>

        <div className="form__header__times" onClick={handleCloseModal} />
      </div>

      <div className="form__asset-name">
        <FormInput
          className="form-item"
          label="Activity Name*"
          name="activity.name"
          error={
            identificationValidation
              ? state.activity.name.trim().length === 0
                ? true
                : false
              : false
          }
          value={state.activity.name}
          onChange={changeValue}
        />
      </div>

      {modalType === 'creation' || !state.activityRequest ? (
        <>
          <div className="form__content">
            <div className="form__section">
              <h2 className="form__section-title">
                <div
                  className={
                    identificationValidation &&
                    state.activity.shortDescription.trim().length === 0
                      ? 'list-expand-errored'
                      : 'list-expand'
                  }
                  style={
                    !identification
                      ? {
                          transform: 'rotate(-90deg)',
                        }
                      : {}
                  }
                  onClick={() => openSection(setIdentification)}
                />
                <span
                  className={
                    identificationValidation &&
                    state.activity.shortDescription.trim().length === 0
                      ? 'form-item-errored'
                      : ''
                  }
                  onClick={() => openSection(setIdentification)}
                >
                  Identification
                </span>
              </h2>

              {identification ? (
                <div className="form__section-content">
                  <FormInput
                    className="form-item"
                    label="Short Description*"
                    name="activity.shortDescription"
                    error={
                      identificationValidation
                        ? state.activity.shortDescription.trim().length === 0
                          ? true
                          : false
                        : false
                    }
                    value={state.activity.shortDescription}
                    onChange={changeValue}
                  />
                  <FormTextarea
                    className="form-item__textarea"
                    label="Full Description"
                    name="activity.description"
                    value={state.activity.description}
                    onChange={changeValue}
                    maxLength={1000}
                  />

                  <FormCreatableSelect
                    className="form-item"
                    label="Keywords"
                    name="activity.keywords"
                    onInputChange={(string) =>
                      handleInputChange('keywords', string)
                    }
                    value={state.activity.keywords}
                    onChange={changeValue}
                    isMulti={true}
                    options={state.keywordsSelect}
                  />

                  <FormInput
                    className="form-item mb-24"
                    label="Website"
                    name="activity.url"
                    value={state.activity.url}
                    onChange={changeValue}
                  />

                  <FormMultipleSelect
                    className="form-item"
                    label="Related (Activities)"
                    name="activity.activities"
                    onInputChange={(string) =>
                      handleInputChange('activities', string)
                    }
                    value={state.activity.activities}
                    hideSelectedOptions={true}
                    options={state.activitiesOptions}
                    onChange={changeValue}
                  />

                  <FormMultipleSelect
                    className="form-item mb-24"
                    label="Related (Assets)"
                    name="activity.assets"
                    value={state.activity.assets}
                    onInputChange={(string) =>
                      handleInputChange('assets', string)
                    }
                    hideSelectedOptions={true}
                    options={state.assetsOptions}
                    onChange={changeValue}
                  />

                  {generateContacts}

                  <button
                    onClick={addContact}
                    type="button"
                    style={
                      state.organizations.length ? {} : { marginTop: '0px' }
                    }
                    className="form__creation-curators_button"
                  >
                    <img
                      className="form__creation-curators_button-plus"
                      src={plus}
                      alt="plus"
                    />
                    <span>Contact</span>
                  </button>
                </div>
              ) : null}
            </div>
            <div className="form__section">
              <h2 className="form__section-title">
                <div
                  className={
                    organizationValidation && !verifyOrganizations()
                      ? 'list-expand-errored'
                      : 'list-expand'
                  }
                  style={
                    !organizations
                      ? {
                          transform: 'rotate(-90deg)',
                        }
                      : {}
                  }
                  onClick={() => openSection(setOrganizations)}
                />

                <span
                  className={
                    organizationValidation && !verifyOrganizations()
                      ? 'form-item-errored'
                      : ''
                  }
                  onClick={() => openSection(setOrganizations)}
                >
                  Organizations
                </span>
              </h2>

              {organizations ? (
                <div className="form__section-content">
                  {generateOrganizations}
                  <button
                    onClick={addOrganization}
                    type="button"
                    style={
                      state.organizations.length ? {} : { marginTop: '0px' }
                    }
                    className="form__creation-curators_button"
                  >
                    <img
                      className="form__creation-curators_button-plus"
                      src={plus}
                      alt="plus"
                    />
                    <span>Organization</span>
                  </button>
                </div>
              ) : null}
            </div>

            <div className="form__section">
              <h2 className="form__section-title">
                <img
                  className="list-expand"
                  style={
                    !classification
                      ? {
                          transform: 'rotate(-90deg)',
                        }
                      : {}
                  }
                  src={arrow}
                  onClick={() => openSection(setClassification)}
                  alt="arrow"
                />
                <span onClick={() => openSection(setClassification)}>
                  Classification
                </span>
              </h2>

              {classification ? (
                <div className="form__section-content">
                  <div className="form__classification">
                    <div className="form__classification_items">
                      <div className="form__classification_item">
                        <h2 className="form__classification_header">Subject</h2>
                        <FormCheckboxGroup
                          name="activity.subject"
                          allOption={true}
                          value={state.activity.subject}
                          onChange={changeValue}
                          options={subject}
                        />
                      </div>
                      <div className="form__classification_item">
                        <h2 className="form__classification_header mt-30">
                          Activity Type
                        </h2>
                        <FormCheckboxGroup
                          name="activity.activityType"
                          allOption={true}
                          value={state.activity.activityType}
                          onChange={changeValue}
                          options={activityTypes}
                        />
                      </div>
                    </div>
                    <div className="form__classification_items">
                      <div className="form__classification_item">
                        <h2 className="form__classification_header">
                          Care Process
                        </h2>
                        <FormCheckboxGroup
                          name="activity.process"
                          allOption={true}
                          value={state.activity.process}
                          onChange={changeValue}
                          options={process}
                        />
                      </div>

                      <div className="form__classification_item">
                        <h2 className="form__classification_header mt-30">
                          Care Setting
                        </h2>
                        <FormCheckboxGroup
                          name="activity.setting"
                          allOption={true}
                          value={state.activity.setting}
                          onChange={changeValue}
                          options={setting}
                        />
                      </div>

                      <div className="form__classification_item mt-30">
                        <h2 className="form__classification_header">
                          Knowledge Lifecycle Stage(s)
                        </h2>
                        <FormCheckboxGroup
                          name="activity.knowledgeStages"
                          allOption={true}
                          value={state.activity.knowledgeStages}
                          onChange={changeValue}
                          options={knowledgeLifecycleStage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="form__footer">
            <div className="form__footer-buttons">
              <button
                onClick={handleCloseModal}
                type="button"
                className="form__footer-buttons__cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!state.activity.isChanged}
                onClick={verify}
                className="form__footer-buttons__next"
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="form__loader">
          <Loader
            type="Bars"
            color="#00838f"
            height={80}
            width={80}
            timeout={0}
          />
        </div>
      )}
    </>
  )
}
