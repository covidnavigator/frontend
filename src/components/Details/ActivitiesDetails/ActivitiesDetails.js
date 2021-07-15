import React, { useState } from 'react'
import moment from 'moment'

import ApplicationHelper from '../../../assets/js/utils'

import {
  knowledgeLifecycleStage,
  status,
} from '../../../assets/js/options/formOptions'

import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'

import './../details.scss'
import { Menu, MenuItem, StatusSelect } from '../../../components'
import { FavoritesMenu } from '../../Favorites'

export const ActivityDetails = ({
  isLogin,
  activity,
  handleClose,
  updateStatus,
  handleDelete,
  setEdtiModalOpenned,
  changeList,
  createList,
  lists,
  user,
}) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClick = (e) => {
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setMenuOpened((prev) => !prev)
  }

  const generateKeywords = (array) =>
    array.map((key, index) => (
      <span className="details_keyword" key={index}>
        {key}
      </span>
    ))

  const generateKnowledge = (knowledgeStages) => {
    const knowledge = knowledgeLifecycleStage
      .filter((item) => knowledgeStages.includes(item.value))
      .map((item) => item.label)

    return (
      <div className="details__general_knowledge">
        <p className="details__title">Knowledge Lifecycle Stage(s)</p>
        <p>{knowledge.join(', ')}</p>
      </div>
    )
  }

  const generateContacts = (contacts) =>
    contacts.map((contact) => (
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

  const generateCurators = activity.organizations.map((organization, index) => (
    <div style={{ margin: '10px 0' }} key={index}>
      <div className="details__organization_header">
        <span className="details__organization_name">
          {organization.organization.name}
        </span>
        <span className="details__organization_type">
          {organization.organization.type}
        </span>
        {organization.owner ? (
          <span className="details__organization_type">(OWNER)</span>
        ) : null}
      </div>
      <p className="details__organization_description">
        {organization.organization.description}
      </p>

      <div className="details__organization_keywords">
        {generateKeywords(organization.organization.keywords)}
      </div>

      {organization.organization.contacts ? (
        <div className="details__organization_contacts">
          {generateContacts(organization.organization.contacts)}
        </div>
      ) : null}
    </div>
  ))

  return activity.id ? (
    <>
      <div className="details__header">
        <div className="details__header-options">
          <span className="details__header-date">
            {moment(activity.created).format('MMM D, YYYY')}
          </span>

          <div className="details__header-icons">
            {isLogin ? (
              <FavoritesMenu
                changeList={changeList}
                createList={createList}
                lists={lists}
                user={user}
                activity={activity}
              />
            ) : null}
            {ApplicationHelper.getCurrentUserData().fullName ===
              activity.author.username ||
            ApplicationHelper.checkPermissionByAssetStatus(
              'edit',
              activity.status.value
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
              activity.status.value
            ) ? (
              <div className="details__header-select">
                <StatusSelect
                  className="form-item__status"
                  value={activity.status}
                  onChange={(status) => updateStatus('activity.status', status)}
                  options={ApplicationHelper.getPropperSelectOptions(
                    'edit',
                    status
                  )}
                  withBorder={true}
                  disabled={
                    !ApplicationHelper.checkPermissionByAssetStatus(
                      'edit',
                      activity.status.value
                    )
                  }
                />
              </div>
            ) : (
              <div className="details__header-select">
                <span
                  className={
                    activity.status.value === 'Verified'
                      ? 'details__header-select-verified'
                      : activity.status.value === 'Classified'
                      ? 'details__header-select-classified'
                      : activity.status.value === 'Preclassified'
                      ? 'details__header-select-preclassified'
                      : activity.status.value === 'Unclassified'
                      ? 'details__header-select-unclassified'
                      : 'details__header-select-draft'
                  }
                >
                  {activity.status.value}
                </span>
              </div>
            )
          ) : null}
          <span className="details__header-title">{activity.name}</span>
          <p className="details__header-description mt-10">
            {activity.shortDescription}
          </p>
        </div>
      </div>
      <div className="details__wrap">
        {activity.url ||
        activity.description ||
        activity.ul ||
        activity.keywords.length ? (
          <div className="details__general">
            {activity.description ? (
              <p className="details__general_description">
                {activity.description}
              </p>
            ) : null}

            {activity.url ? (
              <div className="details__general_link">
                <a
                  href={activity.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {activity.url}
                </a>
              </div>
            ) : null}
            {activity.keywords.length ? (
              <div className="details__general_keywords">
                {generateKeywords(activity.keywords)}
              </div>
            ) : null}

            {activity.knowledgeStages.length
              ? generateKnowledge(activity.knowledgeStages)
              : null}
          </div>
        ) : null}

        {activity.contacts.length ||
        activity.related.length ||
        activity.articles.length ? (
          <div className="details__organization">
            {activity.related.length || activity.articles.length ? (
              <>
                {activity.related.length ? (
                  <>
                    <p className="details__title">Related Activities</p>
                    <div className="details__organization_keywords">
                      {generateKeywords(activity.related)}
                    </div>
                  </>
                ) : null}

                {activity.articles.length ? (
                  <>
                    <p className="details__title">Related Assets</p>
                    <div className="details__organization_keywords">
                      {generateKeywords(activity.articles)}
                    </div>
                  </>
                ) : null}
              </>
            ) : null}

            {activity.contacts.length ? (
              <>
                <p className="details__organizationTitle">CONTACTS</p>
                {generateContacts(activity.contacts)}
              </>
            ) : null}
          </div>
        ) : null}

        {activity.organizations.length ? (
          <div className="details__organization">
            <p className="details__organizationTitle">
              SOURCE (ORGANIZATION) DETAILS
            </p>
            <div className="details__organization-organizations">
              {generateCurators}
            </div>
          </div>
        ) : null}
      </div>
    </>
  ) : null
}
