import React, { useState, useEffect, Fragment } from 'react'

import { Menu, MenuItem, Modal, Popup, FormTextarea } from '../../../components'

import './feedbackItem.scss'
import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'
import arrow from '../../../assets/img/icons/feeds/caret-down.svg'

import { feedbackStatus } from '../../../assets/js/options/formOptions'
import { StatusSelect } from './StatusSelect'

import moment from 'moment'

export function FeedbackItem({
  feedback,
  deleteFeedbackAction,
  updateFeedbackAction,
  setModal,
  checkMenuPosition,
  isOpenUp,
}) {
  const [isFeedbackOpenned, setFeedbackOpenned] = useState(false)
  const [isModalOpened, setModalOpenned] = useState(false)
  const [disposition, setDisposition] = useState('')
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const [isOpen, setOpen] = useState(false)

  const handleClick = (e) => {
    e.persist()
    if (checkMenuPosition) {
      checkMenuPosition(e.clientY)
    }
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setOpen((prev) => !prev)
  }

  const handleBlur = (e) => {
    updateFeedbackAction(feedback.id, { disposition: e.target.value.trim() })
  }

  const handleChangeStatus = (item) => {
    updateFeedbackAction(feedback.id, { status: item.value })
  }

  useEffect(() => {
    setDisposition(feedback.disposition)
  }, [])

  const handleClickModal = () => {
    setModalOpenned((prev) => !prev)
  }

  const handleDelete = () => {
    deleteFeedbackAction(feedback.id)
  }

  return feedback.id ? (
    <Fragment>
      <tr className="table__row">
        <td
          onClick={() => setFeedbackOpenned((prev) => !prev)}
          className={
            feedback.status === 'New'
              ? 'table__row-bold table__row-id'
              : 'table__row-id'
          }
        >
          <img
            className="table__row-expand"
            style={
              !isFeedbackOpenned
                ? {
                    transform: 'rotate(-90deg)',
                    marginRight: '6px',
                    cursor: 'pointer',
                  }
                : { marginRight: '6px', cursor: 'pointer' }
            }
            src={arrow}
          />
          <span style={{ cursor: 'pointer' }}>{feedback.id}</span>
        </td>
        <td
          className="table__row-feedback-title"
          onClick={() => setFeedbackOpenned((prev) => !prev)}
        >
          <span className={feedback.status === 'New' ? 'table__row-bold' : ''}>
            {feedback.title}
          </span>
          {isFeedbackOpenned ? (
            <p className="table__row-feedback-title-message">
              {feedback.message}
            </p>
          ) : null}
        </td>
        <td
          onClick={() => setFeedbackOpenned((prev) => !prev)}
          className="table__row-author"
        >
          <p className="table__row-feedback_item">{feedback.username}</p>
          <p className="table__row-feedback_item">{feedback.userEmail}</p>
        </td>
        <td
          onClick={() => setFeedbackOpenned((prev) => !prev)}
          className="table__row-date"
        >
          <span className="table__row-feedback_item">
            {moment(feedback.created).format('lll')}
          </span>
        </td>
        <td className="table__row-disposition">
          {isFeedbackOpenned ? (
            <FormTextarea
              className="form-item__textarea"
              label="Disposition"
              value={disposition}
              onBlur={handleBlur}
              onChange={setDisposition}
              maxLength={500}
            />
          ) : (
            <span
              className="table__row-feedback_item"
              onClick={() => setFeedbackOpenned((prev) => !prev)}
            >
              {disposition}
            </span>
          )}
        </td>
        <td className="table__column_center">
          <StatusSelect
            value={
              feedbackStatus.filter((item) => feedback.status === item.value)[0]
            }
            className="table__row-select"
            onChange={handleChangeStatus}
            options={feedbackStatus}
          />
        </td>

        {/* //add depency on permissions not at role ( edit, delete ) */}

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
                className="table-actions__item_mail"
                isComingSoon={true}
              >
                Send via Email
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
      </tr>
      {isModalOpened && (
        <Modal>
          <Popup
            text={feedback.title}
            handleClick={handleDelete}
            handleClose={handleClickModal}
          />
        </Modal>
      )}
    </Fragment>
  ) : null
}
