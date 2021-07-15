import React, { useState } from 'react'

import arrow from '../../assets/img/icons/feeds/caret-down.svg'
import edit from '../../assets/img/icons/header/edit.svg'
import trash from '../../assets/img/icons/header/trash.svg'
import check from '../../assets/img/icons/feeds/check-circle-copy.svg'

import { Modal, Popup } from '../../components'

export const List = ({
  item,
  handleDeleteArticle,
  handleDeleteActivity,
  handleListDelete,
  changeList,
  setModal,
}) => {
  const [visibility, setVisibility] = useState(false)
  const [isEditingStarted, setEditingStarted] = useState(false)
  const [editingList, setEditingList] = useState(null)
  const [listName, setListName] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)

  const handleClickModal = () => setModalOpen((prev) => !prev)

  const handleEditing = (list) => {
    setEditingStarted(true)
    setVisibility(false)
    setEditingList(list)
    setListName(list.name)
  }

  const handleChangeInput = (e) => {
    setListName(e.target.value)
  }

  const submitEditing = () => {
    if (isEditingStarted) {
      changeList(editingList.id, {
        articles: editingList.articles.map((item) => item.id),
        activities: editingList.activities.map((item) => item.id),
        description: '',
        name: listName,
      })
      setEditingStarted(false)
      setListName('')
    }
  }

  const handleClick = (callback) => callback((prev) => !prev)

  return (
    <li className="list">
      {isEditingStarted ? (
        <div className="header-favorites__button-group">
          <input
            value={listName}
            onChange={handleChangeInput}
            className="header-favorites-block__input"
          />
          <button
            onClick={submitEditing}
            className="header-favorites__button-submit"
          >
            <img src={check} alt="check" />
          </button>
          <button
            className="header-favorites__button-close"
            onClick={() => {
              setEditingStarted(false)
            }}
          >
            <div className="header-favorites__button-close-icon" />
          </button>
        </div>
      ) : (
        <div className="list-header">
          <img
            className="list-expand"
            style={
              !visibility
                ? {
                    transform: 'rotate(-90deg)',
                  }
                : {}
            }
            src={arrow}
            alt="arrow"
            onClick={() => handleClick(setVisibility)}
          />
          <p onClick={() => handleClick(setVisibility)} className="list-title">
            {item.name}
          </p>

          <div className="list-button-group">
            <img
              onClick={() => handleEditing(item)}
              src={edit}
              alt="edit"
              className="list-button"
            />
            <img
              onClick={handleClickModal}
              src={trash}
              alt="trash"
              className="list-button"
            />
          </div>
        </div>
      )}

      {visibility ? (
        <ul className="list-links">
          {item.articles.map((article) => (
            <li key={article.id} className="list__item">
              <span
                className="list__item-link"
                onClick={() =>
                  setModal({
                    id: article.id,
                    type: 'asset',
                    active: true,
                  })
                }
              >
                {article.name}
              </span>
              <img
                onClick={() => handleDeleteArticle(article.id, item.id)}
                src={trash}
                alt="trash"
                className="list__item-button"
              />
            </li>
          ))}
          {item.activities.map((activity) => (
            <li key={activity.id} className="list__item">
              <span
                className="list__item-link"
                onClick={() =>
                  setModal({
                    id: activity.id,
                    type: 'activity',
                    active: true,
                  })
                }
              >
                {activity.name}
              </span>
              <img
                onClick={() => handleDeleteActivity(activity.id, item.id)}
                src={trash}
                alt="trash"
                className="list__item-button"
              />
            </li>
          ))}
        </ul>
      ) : null}
      {isModalOpen && (
        <Modal>
          <Popup
            text={item.name}
            handleClick={() => handleListDelete(item.id)}
            handleClose={handleClickModal}
          />
        </Modal>
      )}
    </li>
  )
}
