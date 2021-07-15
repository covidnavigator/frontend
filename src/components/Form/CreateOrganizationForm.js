import React, { useState } from 'react'
import Loader from 'react-loader-spinner'

import { source } from '../../assets/js/options/formOptions'

import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormCreatableSelect,
} from '../Form'

import './form.scss'
import plus from '../../assets/img/icons/header/plus.svg'
import times from '../../assets/img/icons/articles/icons-times-copy.svg'

import ApplicationHelper from '../../assets/js/utils'

export function CreateOrganizationForm({
  state,
  modalType,
  changeValue,
  addContact,
  removeContact,
  handleCloseModal,
  handleInputChange,
  createOrganization,
  updateOrganization,
  organizationErrorMessage,
}) {
  const [validation, setValidation] = useState(false)

  const changeContacts = (key, value, num, item) => {
    let arr = [...state[item]]
    arr[num][key] = value
    changeValue(key, arr)
  }

  const verifyOrganization = () => {
    let error = false

    state.contacts.forEach((contact) => {
      if (
        contact.name.trim().length === 0 ||
        !ApplicationHelper.validateEmail(contact.email)
      ) {
        error = true
      }
    })

    if (state.organization.name.trim().length === 0) {
      error = true
    }

    return !error
  }

  const verify = () => {
    if (verifyOrganization()) {
      if (state.organization.isChanged) {
        setValidation(false)
        if (modalType === 'creation') {
          createOrganization(state)
        } else {
          updateOrganization(state.organization.id, state)
        }
      }
    } else {
      setValidation(true)
    }
  }

  const generateContacts = state.contacts.map((contact, index) => (
    <div
      key={index}
      className="form__creation-contacts_info form__creation-contacts_info_first-nesting-level mt-10"
    >
      <FormInput
        className="form-item"
        label="Name*"
        name="name"
        id={'name' + index}
        error={
          validation ? (contact.name.trim().length === 0 ? true : false) : false
        }
        value={contact.name}
        onChange={(key, value) => changeContacts(key, value, index, 'contacts')}
      />
      <FormInput
        className="form-item"
        label="Email*"
        id={'email' + index}
        error={
          validation
            ? !ApplicationHelper.validateEmail(contact.email)
              ? true
              : false
            : false
        }
        name="email"
        value={contact.email}
        onChange={(key, value) => changeContacts(key, value, index, 'contacts')}
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
        onChange={(key, value) => changeContacts(key, value, index, 'contacts')}
      />
      <FormInput
        className="form-item"
        label="Other"
        name="other"
        id={'other' + index}
        value={contact.other}
        onChange={(key, value) => changeContacts(key, value, index, 'contacts')}
      />
    </div>
  ))

  return (
    <form className="form">
      <div className="form__header">
        <h2 className="form__header__title">
          {modalType === 'creation' ? 'New Organization' : 'Edit Organization'}
        </h2>

        <div className="form__header__times" onClick={handleCloseModal} />
      </div>
      {modalType === 'creation' || !state.organizationRequest ? (
        <>
          <div className="form__content">
            <div className="form__creation form__creation_transparent">
              <div className="form__creation-organization_header">
                <div className="form__creation-organization_name">
                  <FormInput
                    className="form-item"
                    label="Name*"
                    name="organization.name"
                    error={
                      validation
                        ? state.organization.name.trim().length === 0
                          ? true
                          : false
                        : false
                    }
                    errorMessage={organizationErrorMessage}
                    value={state.organization.name}
                    onChange={changeValue}
                  />
                </div>
                <div className="form__creation-organization_type">
                  <FormSelect
                    className="form-item"
                    label="Type"
                    name="organization.type"
                    value={state.organization.type}
                    onChange={changeValue}
                    options={source}
                  />
                </div>
              </div>
              <FormTextarea
                className="form-item__notes"
                label="Description"
                name="organization.description"
                value={state.organization.description}
                onChange={changeValue}
                maxLength={1000}
              />

              <FormCreatableSelect
                className="form-item"
                label="Keywords"
                name="organization.keywords"
                value={state.organization.keywords}
                onInputChange={handleInputChange}
                onChange={changeValue}
                isMulti={true}
                options={state.keywordsSelect}
              />
              <div className="form__creation-contacts">
                {generateContacts}
                <button
                  onClick={addContact}
                  type="button"
                  className="form__creation-contacts_button form__creation-contacts_button_large"
                >
                  <img
                    className="form__creation-contacts_button-plus"
                    src={plus}
                    alt="plus"
                  />
                  <span>Contact</span>
                </button>
              </div>
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
                disabled={!state.organization.isChanged}
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
            timeout={0} //3 secs
          />
        </div>
      )}
    </form>
  )
}
