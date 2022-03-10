import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'

import ApplicationHelper from '../../../assets/js/utils'

import { formalism, status } from '../../../assets/js/options/formOptions'

import link from '../../../assets/img/icons/feeds/external-link.svg'
import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'

import './../details.scss'
import {
  Menu,
  MenuItem,
  FavoritesMenu,
  StatusSelect,
} from '../../../components'

export const ArticleDetails = ({
  asset,
  handleClose,
  changeList,
  createList,
  updateStatus,
  user,
  lists,
  handleDelete,
  setEdtiModalOpenned,
  isLogin,
}) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClick = (e) => {
    e.persist()
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setMenuOpened((prev) => !prev)
  }

  const generateKeywords = (keywords) =>
    keywords.map((key, index) => (
      <span className="details_keyword" key={index}>
        {key}
      </span>
    ))

  const generateCurators = asset.curators.map((curator, index) => (
    <div className="details__curators_curator" key={index}>
      <span className="details__curators_curator_name">
        {curator.organization.name}
      </span>

      <span className="details__curators_curator_valuation">
        {curator.valuation}
      </span>
    </div>
  ))

  const generateContacts = asset.organization.contacts.map((contact) => (
    <div className="details__organization_contact" key={contact.id}>
      <div className="details__organization_contact_main">
        <span className="details__organization_contact_name">
          {contact.name}
        </span>
        <span className="details__organization_contact_email">
          {contact.email}
        </span>
      </div>
      <div className="details__organization_contact_additional">
        <span className="details__organization_contact_phone">
          {contact.phone}
        </span>
        <span className="details__organization_contact_other">
          {contact.other}
        </span>
      </div>
    </div>
  ))

  const generateSources = asset.external_sources.map((source, index) => (
    <div className="details__externalSources_source" key={index}>
      <div className="details__externalSources_source_name">
        <p className="details__title">External ID Source</p>
        <p>{source.external_name}</p>
      </div>

      <div className="details__externalSources_source_id">
        <p className="details__title">External Identifier(s)</p>
        <p>{source.external_ids}</p>
      </div>
    </div>
  ))

  console.log(asset.formalism)

  return (
    <React.Fragment>
      <div className="details__header">
        <div className="details__header-options">
          <span className="details__header-date">
            {moment(asset.created).format('MMM D, YYYY')}
          </span>
          <span className="details__header-orgName">
            {asset.organization.name}
          </span>
          <div className="details__header-icons">
            {isLogin ? (
              <FavoritesMenu
                changeList={changeList}
                createList={createList}
                lists={lists}
                user={user}
                asset={asset}
              />
            ) : null}

            <a
              className="details__header-external"
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={link} alt="link" />
            </a>
            {ApplicationHelper.getCurrentUserData().fullName ===
              asset.author.username ||
            ApplicationHelper.checkPermissionByAssetStatus(
              'edit',
              asset.status.value
            ) ? (
              <div className="details__more">
                <img src={moreIcon} alt="more" onClick={handleClick} />
                {menuOpened ? (
                  <Menu
                    handleClose={() => setMenuOpened(false)}
                    menuPosition={menuPosition}
                  >
                    <MenuItem
                      className="table-actions__item_edit"
                      handleClick={() => {
                        setMenuOpened(false)
                        setEdtiModalOpenned('identification')
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      className="table-actions__item_classification"
                      handleClick={() => {
                        setMenuOpened(false)
                        setEdtiModalOpenned('classification')
                      }}
                    >
                      Classify
                    </MenuItem>
                    <MenuItem
                      className="table-actions__item_delete"
                      handleClick={() => {
                        setMenuOpened(false)
                        handleDelete(true)
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                ) : null}
              </div>
            ) : null}
            <div className="details__header-times" onClick={handleClose} />
          </div>
        </div>
        <div className="details__header-main">
          {isLogin ? (
            ApplicationHelper.checkPermissionByAssetStatus(
              'edit',
              asset.status.value
            ) ? (
              <div className="details__header-select">
                <StatusSelect
                  className="form-item__status"
                  value={asset.status}
                  onChange={(status) => updateStatus('asset.status', status)}
                  options={ApplicationHelper.getPropperSelectOptions(
                    'edit',
                    status
                  )}
                  withBorder={true}
                  disabled={
                    !ApplicationHelper.checkPermissionByAssetStatus(
                      'edit',
                      asset.status.value
                    )
                  }
                />
              </div>
            ) : (
              <div className="details__header-select">
                <span
                  className={
                    asset.status.value === 'Verified'
                      ? 'details__header-select-verified'
                      : asset.status.value === 'Classified'
                      ? 'details__header-select-classified'
                      : asset.status.value === 'Preclassified'
                      ? 'details__header-select-preclassified'
                      : asset.status.value === 'Unclassified'
                      ? 'details__header-select-unclassified'
                      : 'details__header-select-draft'
                  }
                >
                  {asset.status.value}
                </span>
              </div>
            )
          ) : null}
          <span className="details__header-title">{asset.name}</span>
        </div>
      </div>
      <div className="details__wrap">
        <div className="details__general">
          <p className="details__general_description">{asset.description}</p>
          <div className="details__general_keywords">
            {generateKeywords(asset.keywords)}
          </div>
          <div className="details__general-items">
            <div className="details__general-item">
              <p className="details__title">Publication Type</p>
              <p>{asset.publication_type}</p>
            </div>

            {asset.asset_version.length ? (
              <div className="details__general-item">
                <p className="details__title">Asset Version</p>
                <p>{asset.asset_version}</p>
              </div>
            ) : null}

            <div className="details__general-item">
              <p className="details__title">Language</p>
              <p>{asset.language}</p>
            </div>
            <div className="details__general-item">
              <p className="details__title">Maturity</p>
              <p>{asset.asset_maturity}</p>
            </div>
            {asset.formalism.length ? (
              <div className="details__general-item">
                <p className="details__title">Formalism</p>
                <p>
                  {formalism
                    .filter((item) => asset.formalism.includes(item.value))
                    .map((item) => item.label)
                    .join(', ')}
                </p>
              </div>
            ) : null}
            <div className="details__general-item">
              <p className="details__title">Geography</p>
              {asset.geography === 'Non-Global' ? (
                <ul>
                  <li>{asset.pan_countries.join(', ')}</li>
                  <li>{asset.countries.join(', ')}</li>
                  <li>{asset.regions.join(', ')}</li>
                  <li>{asset.state_or_provinces.join(', ')}</li>
                  <li>{asset.localities.join(', ')}</li>
                </ul>
              ) : (
                <p>{asset.geography}</p>
              )}
            </div>
            {
              asset.published_date !== '' ? (
                <div className="details__general-item">
                  <p className="details__title">Published/Last Revision</p>
                  <p>{asset.published_date.split('/').filter((date) => date !== '__' && date !== '____').join('/')}</p>
                </div>
              ) : null
            }
          </div>
          <div className="details_authpub">
          {asset.authors.length ? (
              <div className="details_authpub-item">
                <p className="details__title">Author(s)</p>
                <p>{asset.authors.join(', ')}</p>
            </div>
          ) : null}
          {asset.journal ? (
            <div className="details_authpub-item mr-0">
                <p className="details__title">Publication</p>
                <p>{asset.journal.name}</p>
            </div>
          ) : null}
          </div>
        </div>
        <div className="details__organization">
          {asset.external_sources.length ? (
            <div className="details__externalSources">
              {generateSources}
            </div>
          ) : null}
          <p className="details__organizationTitle">
            SOURCE (ORGANIZATION) DETAILS
          </p>
          <div className="details__organization_header">
            <span className="details__organization_name">
              {asset.organization.name}
            </span>
            <span className="details__organization_type">
              {asset.organization.type}
            </span>
          </div>
          <p className="details__organization_description">
            {asset.organization.description}
          </p>
          <div className="details__organization_keywords">
            {generateKeywords(asset.organization.keywords)}
          </div>
          {asset.organization.contacts.length ? (
            <div className="details__organization_contacts">
              {generateContacts}
            </div>
          ) : null}
        </div>
        {asset.curators.length ? (
          <div className="details__curators">
            <p className="details__title">Curators</p>
            {generateCurators}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}
