import React, { useState } from 'react'

import link from '../../assets/img/icons/feeds/external-link.svg'
import arrow from '../../assets/img/icons/feeds/caret-down.svg'
import info from '../../assets/img/icons/feeds/info.svg'
import moment from 'moment'
import './suitableActivity.scss'

import { Modal } from '../../components'
import { FavoritesMenu } from '../Favorites'
import ActivityModalDetails from '../Modal/ModalDetails/ActivityModalDetails'

export const SuitableActivity = ({
  feed,
  user,
  lists,
  isLogin,
  changeList,
  createList,
}) => {
  const [visibility, setVisibility] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)

  const handleClickModal = () => {
    setOpenModal(!isOpenModal)
  }
  const changeVisibility = (callback) => {
    callback((prev) => !prev)
  }

  return (
    <li className="feeds__wrap__main-list__item">
      <div className="list__item-header">
        <img
          className="list__item-expand"
          style={
            !visibility
              ? {
                  transform: 'rotate(-90deg)',
                }
              : {}
          }
          src={arrow}
          alt="arrow"
          onClick={() => changeVisibility(setVisibility)}
        />
        <p
          onClick={() => changeVisibility(setVisibility)}
          className="feeds__wrap__main-list__title"
        >
          {feed.name}
          <span className="feeds__wrap__main-list__type">ACTIVITY</span>
        </p>
        {isLogin ? (
          <FavoritesMenu
            className="favorites__block-star"
            activity={feed}
            user={user}
            lists={lists}
            changeList={changeList}
            createList={createList}
          />
        ) : null}
        {feed.url ? (
          <a
            className="list__item-external"
            target="_blank"
            rel="noopener noreferrer"
            href={feed.url}
          >
            <img src={link} alt="external link" />
          </a>
        ) : null}
      </div>

      {visibility ? (
        <div className="feeds__wrap__main-list__additional">
          <p className="feeds__wrap__main-list__text">
            {feed.shortDescription}
          </p>

          <div className="feeds__wrap__main-list-info">
            <div
              onClick={handleClickModal}
              className="feeds__wrap__main-list__button-link"
            >
              <img src={info} alt="info" />
              More info
            </div>
            <p className="feeds__wrap__main-list__date">
              {moment(feed.created).format('ll')}
            </p>
          </div>
        </div>
      ) : null}
      {isOpenModal && (
        <Modal>
          <ActivityModalDetails id={feed.id} handleClose={handleClickModal} />
        </Modal>
      )}
    </li>
  )
}
