import React, { useRef, useEffect, useState } from 'react'

import starIcon from '../../assets/img/icons/feeds/star.svg'
import starFilledIcon from '../../assets/img/icons/feeds/star-filled.svg'
import check from '../../assets/img/icons/feeds/check-circle-copy.svg'
import plus from '../../assets/img/icons/header/plus.svg'

import { CheckboxInput } from '..'

export const FavoritesMenu = ({
  className,
  asset,
  activity,
  createList,
  changeList,
  user,
  lists,
}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [isCreatingStarted, setCreatingStarted] = useState(false)
  const [listName, setListName] = useState('')

  const more = useRef(null)
  const star = useRef(null)

  const checkSelection = (list, id) => {
    if (list.articles.length && asset) {
      return list.articles.filter((item) => item.id === id).length
    } else if (asset) {
      return false
    }
    if (list.activities.length && activity) {
      return list.activities.filter((item) => item.id === id).length
    } else if (activity) {
      return false
    }
  }

  const submitCreation = () => {
    if (listName.length) {
      if (asset) {
        createList({
          creator: { id: user.id },
          articles: [{ id: asset.id }],
          activities: [],
          name: listName,
          description: '',
        })
      } else if (activity) {
        createList({
          creator: { id: user.id },
          articles: [],
          activities: [{ id: activity.id }],
          name: listName,
          description: '',
        })
      }

      setCreatingStarted(false)
      setListName('')
    }
  }

  const handleChangeInput = (e) => {
    setListName(e.target.value)
  }

  const handleChange = (e, name, id) => {
    const list = lists.filter((item) => item.id === id)[0]
    let articles = list.articles.map((item) => item.id)
    let activities = list.activities.map((item) => item.id)

    if (list.articles.length && asset) {
      const index = list.articles.map((item) => item.id).indexOf(asset.id)
      if (index > -1) {
        articles.splice(index, 1)
      } else {
        articles.push(asset.id)
      }
    } else if (asset) {
      articles.push(asset.id)
    }

    if (list.activities.length && activity) {
      const index = list.activities.map((item) => item.id).indexOf(activity.id)
      if (index > -1) {
        activities.splice(index, 1)
      } else {
        activities.push(activity.id)
      }
    } else if (activity) {
      activities.push(activity.id)
    }

    changeList(id, { articles, activities })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (star.current && !star.current.contains(event.target)) {
        setOpenMenu(false)
      }
      if (more.current && !more.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [star])

  return (
    <div
      ref={star}
      className={
        className ? 'feeds__wrap__main-list__favorites' : 'details__favorites'
      }
    >
      <img
        className={className ? className : 'details__favorites-star'}
        src={
          asset
            ? lists
                .map((item) => item.articles)
                .map((item) => item.map((item) => item.id))
                .filter((item) => item.includes(asset.id)).length
              ? starFilledIcon
              : starIcon
            : activity
            ? lists
                .map((item) => item.activities)
                .map((item) => item.map((item) => item.id))
                .filter((item) => item.includes(activity.id)).length
              ? starFilledIcon
              : starIcon
            : false
        }
        alt="star"
        onClick={() => setOpenMenu((prev) => !prev)}
      />
      {openMenu ? (
        <div className="favorites__block">
          <h2 className="favorites__block-header">My Favorites</h2>
          <img
            className="favorites__block-times"
            src={
              asset
                ? lists
                    .map((item) => item.articles)
                    .map((item) => item.map((item) => item.id))
                    .filter((item) => item.includes(asset.id)).length
                  ? starFilledIcon
                  : starIcon
                : activity
                ? lists
                    .map((item) => item.activities)
                    .map((item) => item.map((item) => item.id))
                    .filter((item) => item.includes(activity.id)).length
                  ? starFilledIcon
                  : starIcon
                : false
            }
            alt="star"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
          <ul className="favorites__block-list">
            {lists.map((item, index) => (
              <CheckboxInput
                key={index}
                label={item.name}
                isSelected={
                  asset
                    ? checkSelection(item, asset.id)
                    : checkSelection(item, activity.id)
                }
                group={item.id}
                handleChange={handleChange}
              />
            ))}
          </ul>
          {isCreatingStarted ? (
            <div className="favorites__block-button-group">
              <input
                value={listName}
                onChange={handleChangeInput}
                className="favorites__block-input"
              />
              <button
                onClick={submitCreation}
                className="favorites__block-button-submit"
              >
                <img src={check} alt="check" />
              </button>
              <button
                className="favorites__block-button-close"
                onClick={() => setCreatingStarted(false)}
              >
                <div className="favorites__block-button-close-icon" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCreatingStarted(true)}
              className="favorites__block-button"
            >
              <img
                className="favorites__block-button-plus"
                src={plus}
                alt="plus"
              />
              <span>New Folder</span>
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
