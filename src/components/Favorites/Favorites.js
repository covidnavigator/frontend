import React, { useRef, useState, useEffect } from 'react'

import AssetModalDetails from '../Modal/ModalDetails/AssetModalDetails'
import { List, Modal } from '../../components'

import plus from '../../assets/img/icons/header/plus.svg'
import check from '../../assets/img/icons/feeds/check-circle-copy.svg'

import './favorites.scss'
import ActivityModalDetails from '../Modal/ModalDetails/ActivityModalDetails'

export const Favorites = ({
  lists,
  user,
  createList,
  changeList,
  deleteList,
}) => {
  const favoritesRef = useRef(null)
  const [isOpenAssetDetails, setOpenAssetDetails] = useState(false)
  const [isOpenActivityDetails, setOpenActivityDetail] = useState(false)
  const [isOpenFavorites, setOpenFavorites] = useState(false)
  const [isCreatingStarted, setCreatingStarted] = useState(false)
  const [listName, setListName] = useState('')
  const [modalInfo, setModalInfo] = useState({
    id: 0,
    type: 'asset',
    active: false,
  })

  const handleClick = (callback) => callback((prev) => !prev)

  const handleChangeInput = (e) => {
    setListName(e.target.value)
  }

  const submitCreation = () => {
    if (isCreatingStarted) {
      if (listName.length) {
        createList({
          creator: { id: user.id },
          articles: [],
          name: listName,
          description: '',
        })
        setCreatingStarted(false)
        setListName('')
      }
    }
  }

  useEffect(() => {
    if (modalInfo.type === 'asset' && modalInfo.active) {
      setOpenAssetDetails(true)
      setOpenFavorites(false)
    } else if (modalInfo.type === 'activity' && modalInfo.active) {
      setOpenActivityDetail(true)
      setOpenFavorites(false)
    } else {
      setOpenAssetDetails(false)
      setOpenActivityDetail(false)
    }
  }, [modalInfo])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        setOpenFavorites(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside, {
      capture: true,
    })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, {
        capture: true,
      })
    }
  }, [favoritesRef])

  const handleDeleteArticle = (articleId, listId) => {
    const list = lists.lists.filter((item) => item.id === listId)[0]
    const articles = list.articles.map((item) => item.id)
    const activities = list.activities.map((item) => item.id)
    const index = articles.indexOf(articleId)
    if (index !== -1) {
      articles.splice(index, 1)
      changeList(listId, { articles, activities })
    }
  }

  const handleDeleteActivity = (activityId, listId) => {
    const list = lists.lists.filter((item) => item.id === listId)[0]
    const activities = list.activities.map((item) => item.id)
    const articles = list.articles.map((item) => item.id)
    const index = activities.indexOf(activityId)
    if (index !== -1) {
      activities.splice(index, 1)
      changeList(listId, { activities, articles })
    }
  }

  const handleListDelete = (id) => {
    deleteList(id, user)
  }

  return (
    <div ref={favoritesRef} className="header-favorites">
      <div
        onClick={() => handleClick(setOpenFavorites)}
        className="header-favorites-block"
      >
        <div className="header-favorites-block__logo" />
      </div>

      <div
        className={
          isOpenFavorites
            ? 'header-favorites__list_open'
            : 'header-favorites__list'
        }
      >
        <h2 className="header-favorites__list-header">My Favorites</h2>
        <ul className="header-favorites__list-content">
          {lists.lists.map((item, index) => (
            <List
              key={index}
              item={item}
              changeList={changeList}
              handleDeleteArticle={handleDeleteArticle}
              handleDeleteActivity={handleDeleteActivity}
              handleListDelete={handleListDelete}
              setModal={setModalInfo}
            />
          ))}
        </ul>
        <div
          onClick={() => handleClick(setOpenFavorites)}
          className="header-favorites__list-close"
        >
          <div className="header-favorites__list-close-icon" />
        </div>
        {isCreatingStarted ? (
          <div className="header-favorites__button-group">
            <input
              value={listName}
              onChange={handleChangeInput}
              className="header-favorites-block__input"
            />
            <button
              onClick={submitCreation}
              className="header-favorites__button-submit"
            >
              <img src={check} alt="check" />
            </button>
            <button
              className="header-favorites__button-close"
              onClick={() => {
                setCreatingStarted(false)
              }}
            >
              <div className="header-favorites__button-close-icon" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreatingStarted(true)}
            className="header-favorites__button"
          >
            <img
              className="header-favorites__button-plus"
              src={plus}
              alt="plus"
            />
            <span>New Folder</span>
          </button>
        )}
      </div>
      {isOpenAssetDetails && (
        <Modal>
          <AssetModalDetails
            handleClose={() =>
              setModalInfo({ id: 0, type: 'asset', active: false })
            }
            id={modalInfo.id}
          />
        </Modal>
      )}
      {isOpenActivityDetails && (
        <Modal>
          <ActivityModalDetails
            id={modalInfo.id}
            handleClose={() =>
              setModalInfo({ id: 0, type: 'activity', active: false })
            }
          />
        </Modal>
      )}
    </div>
  )
}
