import React, { useState, Fragment } from 'react'

import { Modal, Popup, Menu, MenuItem } from '../../../components'

import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'
import ApplicationHelper from '../../../assets/js/utils'
import { knowledgeLifecycleStage } from '../../../assets/js/options/formOptions'

export function ActivityItem({
  activity,
  deleteActivityAction,
  setModalType,
  checkMenuPosition,
  isOpenUp,
}) {
  const [isOpen, setOpen] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClickModal = () => setOpenModal((prev) => !prev)
  const handleDelete = () => deleteActivityAction(activity.id)
  const handleClick = (e) => {
    e.persist()
    if (checkMenuPosition) {
      checkMenuPosition(e.clientY)
    }
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setOpen((prev) => !prev)
  }

  const generateKnowledge = (activity) => {
    const knowledgeStages = knowledgeLifecycleStage
      .filter((item) => activity.knowledgeStages.includes(item.value))
      .map((item) => item.label)
    return <span>{knowledgeStages.join(', ')}</span>
  }

  return activity.id ? (
    <Fragment>
      <tr className="table__row">
        <td>{activity.id}</td>
        <td className="table__row-title">
          <span
            onClick={() =>
              setModalType({
                id: activity.id,
                tab: 'view',
                editing: false,
              })
            }
          >
            {activity.name}
          </span>
        </td>
        <td className="table__row-auth">
          <span>{activity.author.username}</span>
        </td>
        <td>
          <span>{activity.created.slice(0, 10)}</span>
        </td>
        <td className="table__row-pubType">
          {activity.knowledgeStages ? generateKnowledge(activity) : ''}
        </td>
        <td className="table__column_center">
          <span
            className={
              activity.status === 'Verified'
                ? 'table-status__verified'
                : activity.status === 'Classified'
                ? 'table-status__classified'
                : activity.status === 'Preclassified'
                ? 'table-status__preclassified'
                : activity.status === 'Unclassified'
                ? 'table-status__unclassified'
                : 'table-status__draft'
            }
          >
            {activity.status === 'Verified'
              ? 'Published'
              : activity.status === 'Classified'
              ? 'Classified'
              : activity.status === 'Preclassified'
              ? 'Preclassified'
              : activity.status === 'Unclassified'
              ? 'Submitted'
              : 'Draft'}
          </span>
        </td>

        {/* //add depency on permissions not at role ( edit, delete ) */}
        {ApplicationHelper.getCurrentUserData().fullName ===
          activity.author.username ||
        ApplicationHelper.checkPermissionByAssetStatus(
          'edit',
          activity.status
        ) ? (
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
                      id: activity.id,
                      tab: 'identification',
                      editing: 'activity',
                    })
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  className="table-actions__item_classification"
                  handleClick={() => {
                    setOpen(false)
                    setModalType({
                      id: activity.id,
                      tab: 'classification',
                      editing: 'activity',
                    })
                  }}
                >
                  Classify
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
            text={activity.name}
            handleClick={handleDelete}
            handleClose={handleClickModal}
          />
        </Modal>
      )}
    </Fragment>
  ) : null
}
