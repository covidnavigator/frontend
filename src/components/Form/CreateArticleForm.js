import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckboxGroup,
  FormRadioGroup,
} from '../Form'
import { StatusSelect } from '../../components'

import plus from '../../assets/img/icons/header/plus.svg'
import times from '../../assets/img/icons/articles/icons-times-copy.svg'

import {
  source,
  maturity,
  languages,
  formalism,
  publicationTypes,
  status,
  statusDescriptions,
  geopraphy,
  curation,
  roles,
  process,
  setting,
  asset,
  subject,
} from '../../assets/js/options/formOptions'

import 'react-datepicker/dist/react-datepicker.css'
import './form.scss'
import { FormCreatableSelect } from './FormCreatableSelect'
import ApplicationHelper from '../../assets/js/utils'

export function CreateArticleForm({
  state,
  changeValue,
  changeCuratorValue,
  handleCloseModal,
  activeTab,
  modalType,
  handleInputChange,
  addContact,
  addCuratorContact,
  addCurator,
  removeContact,
  removeCuratorContact,
  removeCurator,
  createAsset,
  updateAsset,
  urlErrorMessage,
  organizationErrorMessage,
  organizationErrorName,
}) {
  const [curatorValidation, setCuratorValidation] = useState(false)
  const [identificationValidation, setIdentificationValidation] = useState(
    false
  )

  const [identification, setIdentification] = useState('active')
  const [curators, setCurators] = useState('')
  const [classification, setClassification] = useState('')

  useEffect(() => {
    if (activeTab === 'identification') {
      setIdentification('active')
      setCurators('')
      setClassification('')
    } else if (activeTab === 'curators') {
      setIdentification('')
      setCurators('active')
      setClassification('')
    } else if (activeTab === 'classification') {
      setIdentification('')
      setCurators('')
      setClassification('active')
    }
  }, [activeTab])

  useEffect(() => {
    if (urlErrorMessage || organizationErrorMessage) {
      setIdentification('active')
      setCurators('')
      setClassification('')
    }
  }, [urlErrorMessage, organizationErrorMessage])

  const handleChangeStatus = (status) => {
    changeValue('asset.status', status)
  }

  const changeContacts = (key, value, num, item) => {
    let arr = [...state[item]]
    arr[num][key] = value
    changeValue(key, arr)
  }

  const changeCuratorContacts = (curatorIndex, index, key, value) => {
    let orgContacts = [...state.curators[curatorIndex].organization.contacts]
    orgContacts[index][key] = value
    changeCurators(curatorIndex, 'organization.contacts', orgContacts)
  }

  const changeCurators = (index, key, value) => {
    changeCuratorValue(index, key, value)
  }

  const verifyCurators = () => {
    let contactError = false
    let organizationError = false
    state.curators.forEach((curator) => {
      if (curator.organization.selected.label === '+ Create New') {
        curator.organization.contacts.forEach((contact) => {
          if (
            contact.name.trim().length === 0 ||
            !ApplicationHelper.validateEmail(contact.email)
          ) {
            contactError = true
          }
        })
        if (
          curator.organization.name.trim().length === 0 ||
          state.organizations.some(
            (org) =>
              org.label.toLowerCase() ===
              curator.organization.name.toLowerCase().trim()
          ) ||
          state.curators.filter(
            (cur) =>
              cur.organization.name.toLowerCase().trim() ===
              curator.organization.name.toLowerCase().trim()
          ).length !== 1 ||
          state.organization.name.toLowerCase().trim() ===
            curator.organization.name.toLowerCase().trim()
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

  const verifyIdentifitcation = () => {
    let contactError = false
    let organizationError = false
    if (state.organization.value.label === '+ Create New') {
      state.contacts.forEach((contact) => {
        if (
          contact.name.trim().length === 0 ||
          !ApplicationHelper.validateEmail(contact.email)
        ) {
          contactError = true
        }
      })
      if (
        state.organization.name.trim().length === 0 ||
        isOrganizationExist(state.organization.name.trim())
      ) {
        organizationError = true
      } else {
        organizationError = false
      }
    } else if (!state.organization.value.id) {
      organizationError = true
    }

    if (
      !contactError &&
      state.asset.name.trim().length !== 0 &&
      ApplicationHelper.validateUrl(state.asset.url) &&
      state.asset.description.trim().length !== 0 &&
      !organizationError
    ) {
      return true
    } else {
      return false
    }
  }

  const verify = () => {
    if (!verifyIdentifitcation() || !verifyCurators()) {
      if (!verifyCurators()) {
        setIdentification('')
        setCurators('active')
        setClassification('')
        setCuratorValidation(true)
      }
      if (!verifyIdentifitcation()) {
        setIdentification('active')
        setCurators('')
        setClassification('')
        setIdentificationValidation(true)
      }
    } else if (state.asset.isChanged) {
      setIdentificationValidation(false)
      setCuratorValidation(false)
      if (modalType === 'creation') {
        createAsset(state)
      } else {
        updateAsset(state)
      }
    }
  }

  const generateContacts = state.contacts.map((contact, index) => (
    <div key={index} className="form__creation-contacts_info mt-10">
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
        onChange={(key, value) => changeContacts(key, value, index, 'contacts')}
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

  const generateCuratorContacts = (curatorIndex) =>
    state.curators[curatorIndex].organization.contacts.map((contact, index) => (
      <div key={index} className="form__creation-contacts_info mt-10">
        <FormInput
          className="form-item"
          label="Name*"
          name="name"
          id={'curName' + curatorIndex + index}
          error={
            curatorValidation
              ? contact.name.trim().length === 0
                ? true
                : false
              : false
          }
          value={contact.name}
          onChange={(key, value) =>
            changeCuratorContacts(curatorIndex, index, key, value)
          }
        />
        <FormInput
          className="form-item"
          label="Email*"
          id={'curEmail' + curatorIndex + index}
          error={
            curatorValidation
              ? !ApplicationHelper.validateEmail(contact.email)
                ? true
                : false
              : false
          }
          name="email"
          value={contact.email}
          onChange={(key, value) =>
            changeCuratorContacts(curatorIndex, index, key, value)
          }
        />
        <img
          style={{ cursor: 'pointer' }}
          onClick={(e) => removeCuratorContact(curatorIndex, index)}
          src={times}
          alt="times"
        />
        <FormInput
          className="form-item"
          label="Phone"
          name="phone"
          id={'curPhone' + curatorIndex + index}
          value={contact.phone}
          onChange={(key, value) =>
            changeCuratorContacts(curatorIndex, index, key, value)
          }
        />
        <FormInput
          className="form-item"
          label="Other"
          name="other"
          id={'curOther' + curatorIndex + index}
          value={contact.other}
          onChange={(key, value) =>
            changeCuratorContacts(curatorIndex, index, key, value)
          }
        />
      </div>
    ))

  const organizationsWithoutSelected = () => {
    return state.organizations.filter((org) => {
      if (
        !state.curators.some(
          (curator) =>
            curator.organization.selected.label === org.label &&
            curator.organization.selected.label !== '+ Create New'
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
      state.organizations.some(
        (org) => org.label.toLowerCase() === name.toLowerCase()
      )
    ) {
      return true
    }
    return false
  }

  const isUniqueOrganizationName = (name) => {
    if (
      !name.length ||
      state.organization.name.toLowerCase() === name.toLowerCase() ||
      state.curators.filter(
        (curator) =>
          curator.organization.name.toLowerCase() === name.toLowerCase()
      ).length
    ) {
      return false
    }
    return true
  }

  const generateCurators = state.curators.map((curator, index) => (
    <div
      key={index}
      className={
        curator.organization.selected.label !== '+ Create New' &&
        curator.organization.selected !== ''
          ? 'form__creation-curator mb-10'
          : 'form__creation-curators mb-10'
      }
    >
      <FormSelect
        className="form-item"
        label="Curator(Organization)"
        name="organization.selected"
        value={curator.organization.selected}
        onChange={(key, value) => changeCurators(index, key, value)}
        options={organizationsWithoutSelected()}
        isSearch={true}
        hideSelectedOptions={true}
        style={{ menuTop: '42px' }}
      />
      {curator.organization.selected.label !== '+ Create New' &&
      curator.organization.selected !== '' ? (
        <div className="form__creation-curator_info">
          <FormSelect
            className="form-item"
            label="Valuation"
            name="valuation"
            value={curator.valuation}
            onChange={(key, value) => changeCurators(index, key, value)}
            options={curation}
          />
        </div>
      ) : null}
      <img
        style={{ cursor: 'pointer' }}
        onClick={(e) => removeCurator(index)}
        src={times}
        alt="times"
      />
      {curator.organization.selected.label === '+ Create New' ? (
        <div className="form__creation-curators_info">
          <div className="form__creation-curators__subsection">
            <div className="form__creation-curators__subsection_input">
              <FormInput
                className="form-item"
                label="Organization Name*"
                name="organization.name"
                id={'organizationName' + index}
                error={
                  curatorValidation
                    ? curator.organization.name.trim().length === 0
                      ? true
                      : false
                    : false
                }
                errorMessage={
                  curatorValidation
                    ? isOrganizationExist(curator.organization.name)
                      ? 'Organization with this name already exists'
                      : isUniqueOrganizationName(curator.organization.name)
                      ? ''
                      : 'Organization name must be unique'
                    : ''
                }
                value={curator.organization.name}
                onChange={(key, value) => changeCurators(index, key, value)}
              />
            </div>
            <div className="form__creation-curators__subsection_select">
              <FormSelect
                className="form-item"
                label="Organization Type"
                name="organization.type"
                value={curator.organization.type}
                onChange={(key, value) => changeCurators(index, key, value)}
                options={source}
              />
            </div>
          </div>

          <FormTextarea
            className="form-item__notes"
            label="Organization Description"
            name="organization.description"
            id={'organizationDescription' + index}
            value={curator.organization.description}
            onChange={(key, value) => changeCurators(index, key, value)}
            maxLength={1000}
          />

          <div className="form__creation-curators__subsection">
            <div className="form__creation-curators__subsection_input">
              <FormCreatableSelect
                className="form-item"
                label="Organization Keywords"
                name="organization.keywords"
                onInputChange={handleInputChange}
                value={curator.organization.keywords}
                options={state.keywordsSelect}
                onChange={(key, value) => changeCurators(index, key, value)}
                isMulti={true}
              />
            </div>
            <div className="form__creation-curators__subsection_select">
              <FormSelect
                className="form-item"
                label="Valuation"
                name="valuation"
                value={curator.valuation}
                onChange={(key, value) => changeCurators(index, key, value)}
                options={curation}
              />
            </div>
          </div>
          <div className="form__creation-contacts">
            <h2 className="form__creation-contacts_header">
              Points of Contact
            </h2>
            {generateCuratorContacts(index)}
            <button
              onClick={() => addCuratorContact(index)}
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
        </div>
      ) : null}
    </div>
  ))

  return (
    <form className="form">
      <div className="form__header">
        <h2 className="form__header__title">
          {modalType === 'creation' ? 'New Asset' : 'Edit Asset'}
        </h2>

        <div className="form__header__status-description">
          {state.asset.status.value
            ? statusDescriptions[state.asset.status.value]
            : Array.isArray(state.asset.status)
            ? statusDescriptions[state.asset.status[0].value]
            : ''}
        </div>

        <div
          className={`form__header-select form__header-select-${
            ApplicationHelper.getPropperSelectOptions('edit', status).length
          }`}
        >
          <StatusSelect
            className="form-item__status"
            value={state.asset.status}
            onChange={handleChangeStatus}
            options={ApplicationHelper.getPropperSelectOptions('edit', status)}
            withBorder={true}
          />
        </div>

        <div className="form__header__times" onClick={handleCloseModal} />
      </div>

      <div className="form__asset-name">
        <FormInput
          className="form-item"
          label="Asset Name*"
          name="asset.name"
          error={
            identificationValidation
              ? state.asset.name.trim().length === 0
                ? true
                : false
              : false
          }
          value={state.asset.name}
          onChange={changeValue}
          maxLength={250}
        />
      </div>

      <div className="form__tabs">
        <li
          className={
            identification === 'active'
              ? 'form__tabs-item-selected'
              : 'form__tabs-item'
          }
          onClick={() => {
            setIdentification('active')
            setCurators('')
            setClassification('')
          }}
        >
          <span>Identification</span>
        </li>
        <li
          className={
            curators === 'active'
              ? 'form__tabs-item-selected'
              : 'form__tabs-item'
          }
          onClick={() => {
            setIdentification('')
            setCurators('active')
            setClassification('')
          }}
        >
          <span>Curators</span>
        </li>
        <li
          className={
            classification === 'active'
              ? 'form__tabs-item-selected'
              : 'form__tabs-item'
          }
          onClick={() => {
            setIdentification('')
            setCurators('')
            setClassification('active')
          }}
        >
          <span>Classification</span>
        </li>
      </div>
      {modalType === 'creation' || !state.assetRequest ? (
        <>
          <div className="form__content">
            {identification === 'active' ? (
              <React.Fragment>
                <FormInput
                  className="form-item"
                  label="URL*"
                  name="asset.url"
                  error={
                    identificationValidation
                      ? !ApplicationHelper.validateUrl(state.asset.url)
                        ? true
                        : false
                      : false
                  }
                  errorMessage={urlErrorMessage}
                  value={state.asset.url}
                  onChange={changeValue}
                />
                <FormTextarea
                  className="form-item__textarea"
                  label="Description*"
                  name="asset.description"
                  error={
                    identificationValidation
                      ? state.asset.description.trim().length === 0
                        ? true
                        : false
                      : false
                  }
                  value={state.asset.description}
                  onChange={changeValue}
                  maxLength={1000}
                />

                <div className="form__subsection">
                  <div className="form__subsection-select">
                    <FormSelect
                      className="form-item"
                      label="Publication Type"
                      name="asset.publication_type"
                      value={state.asset.publication_type}
                      onChange={changeValue}
                      options={publicationTypes}
                    />
                  </div>

                  <div className="form__subsection-select">
                    <FormInput
                      className="form-item"
                      label="Asset Version"
                      name="asset.asset_version"
                      value={state.asset.asset_version}
                      onChange={changeValue}
                    />
                  </div>

                  <div className="form__subsection-select">
                    <FormSelect
                      className="form-item"
                      label="Language"
                      name="asset.language"
                      value={state.asset.language}
                      onChange={changeValue}
                      options={languages}
                    />
                  </div>
                  <div className="form__subsection-select">
                    <FormSelect
                      className="form-item"
                      label="Asset Maturity"
                      name="asset.asset_maturity"
                      value={state.asset.asset_maturity}
                      onChange={changeValue}
                      options={maturity}
                    />
                  </div>
                </div>

                <FormSelect
                  className={
                    state.organization.value.label === '+ Create New'
                      ? 'form-item'
                      : 'form-item mb-24'
                  }
                  label="Source (Organization)*"
                  name="organization.value"
                  error={
                    identificationValidation
                      ? state.organization.value === ''
                        ? true
                        : false
                      : false
                  }
                  value={state.organization.value}
                  onChange={changeValue}
                  options={state.organizations}
                  isSearch={true}
                  hideSelectedOptions={true}
                  style={{ menuTop: '42px' }}
                />

                {state.organization.value.label === '+ Create New' ? (
                  <div className="form__creation">
                    <div className="form__creation-organization_header">
                      <div className="form__creation-organization_name">
                        <FormInput
                          className="form-item"
                          label="Organization Name*"
                          name="organization.name"
                          error={
                            identificationValidation
                              ? state.organization.name.trim().length === 0
                                ? true
                                : false
                              : false
                          }
                          errorMessage={
                            identificationValidation
                              ? isOrganizationExist(state.organization.name)
                                ? 'Organization with this name already exists'
                                : ''
                              : ''
                          }
                          value={state.organization.name}
                          onChange={changeValue}
                        />
                      </div>
                      <div className="form__creation-organization_type">
                        <FormSelect
                          className="form-item"
                          label="Organization Type"
                          name="organization.type"
                          value={state.organization.type}
                          onChange={changeValue}
                          options={source}
                        />
                      </div>
                    </div>
                    <FormTextarea
                      className="form-item__notes"
                      label="Organization Description"
                      name="organization.description"
                      value={state.organization.description}
                      onChange={changeValue}
                      maxLength={1000}
                    />

                    <FormCreatableSelect
                      className="form-item"
                      label="Organization Keywords"
                      name="organization.keywords"
                      value={state.organization.keywords}
                      onInputChange={handleInputChange}
                      options={state.keywordsSelect}
                      onChange={changeValue}
                      isMulti={true}
                    />
                    <div className="form__creation-contacts">
                      <h2 className="form__creation-contacts_header">
                        Points of Contact
                      </h2>
                      {generateContacts}
                      <button
                        onClick={addContact}
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
                  </div>
                ) : null}

                <FormCreatableSelect
                  className="form-item mt-14"
                  label="Keywords"
                  name="asset.keywords"
                  value={state.asset.keywords}
                  onInputChange={handleInputChange}
                  onChange={changeValue}
                  isMulti={true}
                  options={state.keywordsSelect}
                />

                <FormInput
                  className="form-item"
                  label="Subsection Reference"
                  name="asset.ref"
                  value={state.asset.ref}
                  onChange={changeValue}
                />

                <FormTextarea
                  className="form-item__notes"
                  label="Notes"
                  name="asset.notes"
                  value={state.asset.notes}
                  onChange={changeValue}
                  maxLength={1000}
                />
                <div className="form__context-of-use">
                  <h2 className="form__context-of-use_header">
                    Intended Audience
                  </h2>
                  <FormCheckboxGroup
                    className="form-item"
                    label="Intended Audience"
                    name="asset.role"
                    allOption={true}
                    value={state.asset.role}
                    onChange={changeValue}
                    options={roles}
                  />
                  <h2 className="form__context-of-use_header">Formalism(s)</h2>
                  <FormCheckboxGroup
                    label="Formalism(s)"
                    name="asset.formalism"
                    allOption={true}
                    value={state.asset.formalism}
                    onChange={changeValue}
                    options={formalism}
                  />
                  <h2 className="form__context-of-use_header">Geography</h2>
                  <FormRadioGroup
                    className={
                      state.asset.geography !== 'Global' &&
                      state.asset.geography !== 'Unknown'
                        ? 'form-radio-group mb-12'
                        : 'form-radio-group mb-30'
                    }
                    name="asset.geography"
                    value={state.asset.geography}
                    onChange={changeValue}
                    options={geopraphy}
                  />
                </div>

                {state.asset.geography !== 'Global' &&
                state.asset.geography !== 'Unknown' ? (
                  <div className="form__geography">
                    <FormCreatableSelect
                      className="form-item"
                      label="Pan-Country"
                      name="asset.pan_countries"
                      value={state.asset.pan_countries}
                      onChange={changeValue}
                      options={state.panCountriesSelect}
                    />

                    <FormCreatableSelect
                      className="form-item"
                      label="Country"
                      name="asset.countries"
                      value={state.asset.countries}
                      onChange={changeValue}
                      options={state.countriesSelect}
                    />

                    <FormCreatableSelect
                      className="form-item"
                      label="Region"
                      name="asset.regions"
                      value={state.asset.regions}
                      onChange={changeValue}
                      options={state.regonsSelect}
                    />

                    <FormCreatableSelect
                      className="form-item"
                      label="State or Province"
                      name="asset.state_or_provinces"
                      value={state.asset.state_or_provinces}
                      onChange={changeValue}
                      options={state.stateSelect}
                    />

                    <FormCreatableSelect
                      className="form-item"
                      label="Locality"
                      name="asset.localities"
                      value={state.asset.localities}
                      onChange={changeValue}
                      options={state.localitiesSelect}
                    />
                  </div>
                ) : null}
              </React.Fragment>
            ) : null}
            {curators === 'active' ? (
              <React.Fragment>
                {generateCurators}
                <button
                  onClick={addCurator}
                  type="button"
                  style={state.curators.length ? {} : { marginTop: '0px' }}
                  className="form__creation-curators_button"
                >
                  <img
                    className="form__creation-curators_button-plus"
                    src={plus}
                    alt="plus"
                  />
                  <span>Curator</span>
                </button>
              </React.Fragment>
            ) : null}
            {classification === 'active' ? (
              <div className="form__classification">
                <div className="form__classification_items">
                  <div className="form__classification_item">
                    <h2 className="form__classification_header">Subject</h2>
                    <FormCheckboxGroup
                      name="asset.subject"
                      allOption={true}
                      value={state.asset.subject}
                      onChange={changeValue}
                      options={subject}
                    />
                  </div>
                  <div className="form__classification_item">
                    <h2 className="form__classification_header mt-30">
                      Care Process
                    </h2>
                    <FormCheckboxGroup
                      name="asset.process"
                      allOption={true}
                      value={state.asset.process}
                      onChange={changeValue}
                      options={process}
                    />
                  </div>
                </div>
                <div className="form__classification_items">
                  <div className="form__classification_item">
                    <h2 className="form__classification_header">Asset Type</h2>
                    <FormCheckboxGroup
                      name="asset.assetType"
                      allOption={true}
                      value={state.asset.assetType}
                      onChange={changeValue}
                      options={asset}
                    />
                  </div>

                  <div className="form__classification_item">
                    <h2 className="form__classification_header  mt-30">
                      Care Setting
                    </h2>
                    <FormCheckboxGroup
                      name="asset.setting"
                      allOption={true}
                      value={state.asset.setting}
                      onChange={changeValue}
                      options={setting}
                    />
                  </div>
                </div>
              </div>
            ) : null}
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
                disabled={!state.asset.isChanged}
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
    </form>
  )
}
