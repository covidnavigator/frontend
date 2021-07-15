import React, { useState, Fragment } from 'react'

import {
  Modal,
  Popup,
  DeactivationPopup,
  Menu,
  MenuItem,
} from '../../../components'

import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'

import ApplicationHelper from '../../../assets/js/utils'
import * as permissions from '../../../assets/js/options/permissions'

export function UserItem({
  user,
  deleteUser,
  setModal,
  checkMenuPosition,
  isOpenUp,
  updateStatus,
}) {
  const [isOpen, setOpen] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenDeactivation, setOpenDeactivation] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClickModal = () => setOpenModal((prev) => !prev)
  const handleClickDeactivation = () => setOpenDeactivation((prev) => !prev)
  const handleDelete = () => deleteUser(user.id)
  const handleChangeStatus = () => {
    updateStatus(user.id, !user.active)
  }
  const handleClick = (e) => {
    e.persist()
    if (checkMenuPosition) {
      checkMenuPosition(e.clientY)
    }
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setOpen((prev) => !prev)
  }

  return user.id ? (
    <Fragment>
      <tr className="table__row">
        <td>{user.id}</td>
        <td className="table__row-profile">
          <p className="table__row-profile-item">{user.username}</p>
          <p className="table__row-profile-item">{user.email}</p>
        </td>
        <td className="table__row-organization">
          <span>{user.organization}</span>
        </td>
        <td className="table__row-role">
          <span>{user.role}</span>
        </td>
        <td>
          <span>{user.createdAt.slice(0, 10)}</span>
        </td>
        <td>
          <span>{user.updatedAt.slice(0, 10)}</span>
        </td>
        <td
          className={
            user.active
              ? 'table__row-status_active'
              : 'table__row-status_inactive'
          }
        >
          <span>{user.active ? 'Active' : 'Inactive'}</span>
        </td>

        {ApplicationHelper.checkPermission(permissions.ALL_USERS_EDIT) ? (
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
                  className={`table-actions__item_${
                    user.active ? 'deactivate' : 'activate'
                  }`}
                  handleClick={() => {
                    setOpen(false)
                    handleClickDeactivation()
                  }}
                >
                  {user.active ? 'Deactivate' : 'Activate'}
                </MenuItem>
                <MenuItem
                  className="table-actions__item_edit"
                  handleClick={() => {
                    setOpen(false)
                    setModal({
                      id: user.id,
                      type: 'edit',
                      active: true,
                    })
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  className="table-actions__item_reset-password"
                  handleClick={() => {
                    setOpen(false)
                    setModal({
                      id: user.id,
                      type: 'resetPassword',
                      active: true,
                    })
                  }}
                >
                  Reset Password
                </MenuItem>
                <MenuItem
                  className="table-actions__item_delete"
                  handleClick={() => {
                    setOpen(false)
                    handleClickModal()
                  }}
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

      {isOpenModal && (
        <Modal>
          <Popup
            text={user.username}
            handleClick={handleDelete}
            handleClose={handleClickModal}
          />
        </Modal>
      )}

      {isOpenDeactivation && (
        <Modal>
          <DeactivationPopup
            type={user.active ? 'deactivate' : 'activate'}
            name={user.username}
            handleClick={handleChangeStatus}
            handleClose={handleClickDeactivation}
          />
        </Modal>
      )}
    </Fragment>
  ) : null
}
