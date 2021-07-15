import React, { useState, useEffect, useRef } from 'react'

import ApplicationHelper from '../../../assets/js/utils'

import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'

import './../details.scss'
import { Menu, MenuItem } from '../../../components'

import * as permissions from '../../../assets/js/options/permissions'

export const OrganizationDetails = ({
  organization,
  handleClose,
  setEdtiModalOpenned,
}) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClick = (e) => {
    e.persist()
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setMenuOpened((prev) => !prev)
  }

  const generateOrgKeywords = organization.keywords.map((key, index) => (
    <span className="details_keyword" key={index}>
      {key}
    </span>
  ))

  const generateContacts = organization.contacts.map((contact) => (
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
  return (
    <React.Fragment>
      <div className="details__header-options_with-title">
        <span className="details__header-title">{organization.name}</span>
        <div className="details__header-icons">
          {ApplicationHelper.checkPermission(permissions.ORGANIZATIONS_EDIT) ? (
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
                    className="table-actions__item_delete"
                    isComingSoon={true}
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
      <div className="details__wrap">
        <div className="details__organization_header">
          <span className="details__organization_type">
            {organization.type}
          </span>
        </div>
        <p className="details__organization_description">
          {organization.description}
        </p>
        <div className="details__organization_keywords">
          {generateOrgKeywords}
        </div>
        {organization.contacts.length ? (
          <div className="details__organization_contacts">
            {generateContacts}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}
