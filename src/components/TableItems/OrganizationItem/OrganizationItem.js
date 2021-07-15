import React, { useState, Fragment } from 'react'

import { Menu, MenuItem, Modal, Popup } from '../../../components'

import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'
import ApplicationHelper from '../../../assets/js/utils'
import * as permissions from '../../../assets/js/options/permissions'

export function OrganizationItem({
  organization,
  deleteOrganizationAction,
  setModalType,
  checkMenuPosition,
  isOpenUp,
}) {
  const [isModalOpened, setModalOpenned] = useState(false)

  const [isOpen, setOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClick = (e) => {
    e.persist()
    if (checkMenuPosition) {
      checkMenuPosition(e.clientY)
    }
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setOpen((prev) => !prev)
  }

  const handleClickModal = () => {
    setModalOpenned((prev) => !prev)
  }

  const handleDelete = () => {
    deleteOrganizationAction(organization.id)
  }

  return organization.id ? (
    <Fragment>
      <tr className="table__row">
        <td className="table__row-id">
          <span style={{ cursor: 'pointer' }}>{organization.id}</span>
        </td>
        <td
          onClick={() =>
            setModalType({
              id: organization.id,
              type: 'view',
              active: true,
            })
          }
          className="table__row-organization-title"
        >
          <span>{organization.name}</span>
        </td>
        <td className="table__row-organization-description">
          <span>{organization.description}</span>
        </td>
        <td className="table__row-organization-type">
          <span>{organization.type}</span>
        </td>

        {/* //add depency on permissions not at role ( edit, delete ) */}
        {ApplicationHelper.checkPermission(permissions.ORGANIZATIONS_EDIT) ? (
          <td className="table__column_actions">
            <img
              src={moreIcon}
              className="table__more-icon"
              alt="more-icon"
              onClick={handleClick}
            />
            {isOpen ? (
              <Menu
                isOpenUp={isOpenUp}
                handleClose={() => setOpen(false)}
                menuPosition={menuPosition}
              >
                <MenuItem
                  className="table-actions__item_edit"
                  handleClick={() => {
                    setOpen(false)
                    setModalType({
                      id: organization.id,
                      type: 'edit',
                      active: true,
                    })
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
          </td>
        ) : (
          <td></td>
        )}
      </tr>
      {isModalOpened && (
        <Modal>
          <Popup
            text={organization.name}
            handleClick={handleDelete}
            handleClose={handleClickModal}
          />
        </Modal>
      )}
    </Fragment>
  ) : null
}
