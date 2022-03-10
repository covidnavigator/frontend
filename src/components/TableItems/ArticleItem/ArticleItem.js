import React, { useState, Fragment } from 'react'

import { Modal, Popup, Menu, MenuItem } from '../../../components'

import './articleItem.scss'
import moreIcon from '../../../assets/img/icons/articles/icons-ellipsis-v.svg'
import ApplicationHelper from '../../../assets/js/utils'

import { publicationTypes } from '../../../assets/js/options/formOptions'

export function ArticleItem({
  article,
  deleteArticle,
  setModal,
  checkMenuPosition,
  isOpenUp,
}) {
  const [isOpen, setOpen] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleClickModal = () => setOpenModal((prev) => !prev)
  const handleDelete = () => deleteArticle(article.id)
  const handleClick = (e) => {
    e.persist()
    if (checkMenuPosition) {
      checkMenuPosition(e.clientY)
    }
    setMenuPosition({ top: e.clientY, left: e.clientX })
    setOpen((prev) => !prev)
  }

  return article.id ? (
    <Fragment>
      <tr className="table__row">
        <td>{article.id}</td>
        <td className="table__row-title">
          <span
            onClick={() =>
              setModal({
                id: article.id,
                tab: 'view',
                editing: false,
              })
            }
          >
            {article.name}
          </span>
        </td>
        <td className="table__row-auth">
          <span>{article.author.username}</span>
        </td>
        <td>
          <span>{article.created.slice(0, 10)}</span>
        </td>
        <td className="table__row-pubType">
          <span>
            {
              publicationTypes.find(
                (type) => type.value === article.publication_type
              ).label
            }
          </span>
        </td>
        <td className="table__column_center">
          <span
            className={
              article.status === 'Verified'
                ? 'table-status__verified'
                : article.status === 'Classified'
                ? 'table-status__classified'
                : article.status === 'Preclassified'
                ? 'table-status__preclassified'
                : article.status === 'Unclassified'
                ? 'table-status__unclassified'
                : 'table-status__draft'
            }
          >
            {article.status === 'Verified'
              ? 'Published'
              : article.status === 'Classified'
              ? 'Classified'
              : article.status === 'Preclassified'
              ? 'Preclassified'
              : article.status === 'Unclassified'
              ? 'Submitted'
              : 'Draft'}
          </span>
        </td>

        {/* //add depency on permissions not at role ( edit, delete ) */}
        {ApplicationHelper.getCurrentUserData().fullName ===
          article.author.username ||
        ApplicationHelper.checkPermissionByAssetStatus(
          'edit',
          article.status
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
                    setModal({
                      id: article.id,
                      tab: 'identification',
                      editing: 'asset',
                    })
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  className="table-actions__item_classification"
                  handleClick={() => {
                    setOpen(false)
                    setModal({
                      id: article.id,
                      tab: 'classification',
                      editing: 'asset',
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
            text={article.name}
            handleClick={handleDelete}
            handleClose={handleClickModal}
          />
        </Modal>
      )}
    </Fragment>
  ) : null
}
