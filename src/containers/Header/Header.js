import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Favorites,
  Modal,
  FeedbackModal,
  NotificationsBox,
  EmailSentModal,
} from '../../components'

import AssetCreationModal from '../../components/Modal/AssetCreation/AssetCreationModal'
import UserEditingModal from '../../components/Modal/UserCreation/UserEditingModal'
import Legend from '../../components/Legend/Legend'

import * as permissions from '../../assets/js/options/permissions'

import plus from '../../assets/img/icons/header/plus.svg'
import assetIcon from '../../assets/img/icons/header/file.svg'
import activityIcon from '../../assets/img/icons/header/history.svg'

import './header.scss'
import ApplicationHelper from '../../assets/js/utils'

import { createFeedbackAction } from '../../redux/actions/feedbackAction'
import { getArticlesCount } from '../../redux/actions/articlesAction'
import { getActivitiesCount } from '../../redux/actions/activitiesAction'
import {
  getLists,
  createList,
  deleteList,
  changeList,
} from '../../redux/actions/listsAction'
import { setLogin, setEmailSent } from '../../redux/actions/loginAction'
import {
  addNotification,
  setNotificationStatus,
  deleteNotification,
} from '../../redux/actions/notificationsAction'
import { getRolesAction } from '../../redux/actions/rolesAction'
import { getUsersCount } from '../../redux/actions/usersAction'
import { getProfileInfo } from '../../redux/actions/userAction'
import ActivityCreationModal from '../../components/Modal/ActivityCreation/ActivityCreationModal'

function Header({
  filters,
  isLogin,
  loginProcess,
  setLogin,
  user,
  users,
  roles,
  status,
  getLists,
  createList,
  changeList,
  deleteList,
  getActivitiesCount,
  getArticlesCount,
  articles,
  activities,
  lists,
  login,
  organizations,
  createFeedbackAction,
  feedbacks,
  opennedNode,
  activeNode,
  notifications,
  addNotification,
  setNotificationStatus,
  deleteNotification,
  getRolesAction,
  setEmailSent,
  getUsersCount,
  getProfileInfo,
}) {
  const [isOpenCreationList, setOpenCreationList] = useState(false)
  const [isOpenLinksList, setOpenLinksList] = useState(false)
  const [isOpenHamburgerMenu, setOpenHamburgerMenu] = useState(false)
  const [isOpenSupportMenu, setOpenSupportMenu] = useState(false)
  const [isFeedbackModalOpened, setFeedbackModalOpenned] = useState(false)
  const [isOpenCogwheelMenu, setOpenCogwheelMenu] = useState(false)
  const [assetModal, setAssetModal] = useState(false)
  const [activityModal, setActivityModal] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [modalType, setModalType] = useState('create')
  const [userModalInfo, setUserModalInfo] = useState({
    id: 0,
    type: 'changePassword',
    active: false,
  })
  const [helpModalInfo, setHelpModalInfo] = useState({
    type: 'emailSent',
    active: false,
  })

  const userRef = useRef(null)
  const ref = useRef(null)
  const hamburgerRef = useRef(null)
  const cogwheelRef = useRef(null)
  const supportRef = useRef(null)

  const handleClick = (callback) => callback((prev) => !prev)
  const toLoginPage = () => history.push('/login')

  useEffect(() => {
    if (
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
      new Date()
    ) {
      setLogin(false)
    }
  }, [])

  useEffect(() => {
    for (let notification of notifications) {
      if (!notification.opened) {
        setNotificationStatus(notification.noticeId, true)
        setTimeout(() => {
          deleteNotification(notification.noticeId)
        }, 5000)
      }
    }
  }, [notifications])

  useEffect(() => {
    if (
      articles.creationSuccess ||
      articles.updationSuccess ||
      articles.updateStatusSuccess ||
      articles.deletionSuccess
    ) {
      if (articles.creationSuccess) {
        addNotification({
          id: articles.processedAssetID,
          type: 'Asset',
          action: 'created',
        })
      }
      if (articles.updationSuccess || articles.updateStatusSuccess) {
        addNotification({
          id: articles.processedAssetID,
          type: 'Asset',
          action: 'updated',
        })
      }
      if (articles.deletionSuccess) {
        addNotification({
          id: articles.processedAssetID,
          type: 'Asset',
          action: 'deleted',
        })
      }

      setAssetModal(false)
      getProfileInfo()
      getArticlesCount()
    }
  }, [
    articles.creationSuccess,
    articles.updationSuccess,
    articles.deletionSuccess,
    articles.updateStatusSuccess,
  ])

  useEffect(() => {
    if (
      activities.activitySuccessfullyCreated ||
      activities.activitySuccessfullyUpdated ||
      activities.activitySuccessfullyDeleted
    ) {
      if (activities.activitySuccessfullyCreated) {
        addNotification({
          id: activities.processedActivityID,
          type: 'Activity',
          action: 'created',
        })
      }

      if (activities.activitySuccessfullyUpdated) {
        addNotification({
          id: activities.processedActivityID,
          type: 'Activity',
          action: 'updated',
        })
      }

      if (activities.activitySuccessfullyDeleted) {
        addNotification({
          id: activities.processedActivityID,
          type: 'Activity',
          action: 'deleted',
        })
      }

      setActivityModal(false)
      getActivitiesCount()
      getProfileInfo()
    }
  }, [
    activities.activitySuccessfullyCreated,
    activities.activitySuccessfullyUpdated,
    activities.activitySuccessfullyDeleted,
  ])

  useEffect(() => {
    if (organizations.creationOrganizationSuccess) {
      addNotification({
        id: organizations.processedOrgID,
        type: 'Organization',
        action: 'created',
      })
    }
    if (organizations.updationOrganizationSuccess) {
      addNotification({
        id: organizations.processedOrgID,
        type: 'Organization',
        action: 'updated',
      })
    }
    if (organizations.deletionOrganizationSuccess) {
      addNotification({
        id: organizations.processedOrgID,
        type: 'Organization',
        action: 'deleted',
      })
    }
  }, [
    organizations.creationOrganizationSuccess,
    organizations.updationOrganizationSuccess,
    organizations.deletionOrganizationSuccess,
  ])

  useEffect(() => {
    if (feedbacks.creationFeedbackSuccess) {
      addNotification({
        id: feedbacks.processedFeedID,
        type: 'Feedback',
        action: 'sent',
      })
    }
    if (feedbacks.updationFeedbackSuccess) {
      addNotification({
        id: feedbacks.processedFeedID,
        type: 'Feedback',
        action: 'updated',
      })
    }
    if (feedbacks.deletionFeedbackSuccess) {
      addNotification({
        id: feedbacks.processedFeedID,
        type: 'Feedback',
        action: 'deleted',
      })
    }
  }, [
    feedbacks.updationFeedbackSuccess,
    feedbacks.creationFeedbackSuccess,
    feedbacks.deletionFeedbackSuccess,
  ])

  useEffect(() => {
    if (
      users.creationSuccess ||
      users.updationSuccess ||
      users.deletionSuccess
    ) {
      if (users.creationSuccess) {
        addNotification({
          id: users.processedUserID,
          type: 'User',
          action: 'created',
        })
      }
      if (users.updationSuccess) {
        addNotification({
          id: users.processedUserID,
          type: 'User',
          action: 'updated',
        })
      }
      if (users.deletionSuccess) {
        addNotification({
          id: users.processedUserID,
          type: 'User',
          action: 'deleted',
        })
      }

      getUsersCount()
      setUserModalInfo({ id: 0, type: 'changePassword', active: false })
    } else if (users.deletionError) {
      if (users.deletionError) {
        addNotification({
          id: users.processedUserID,
          type: 'User',
          action: 'deleted',
          error: true,
          errorMessage: users.errorMessage,
        })
      }
    }
  }, [
    users.creationSuccess,
    users.updationSuccess,
    users.deletionSuccess,
    users.deletionError,
  ])

  useEffect(() => {
    if (userModalInfo.active) {
      setUserModal(true)
      setOpenLinksList(false)
    } else {
      setUserModal(false)
    }
  }, [userModalInfo])

  useEffect(() => {
    if (modalType.editing === 'activity') setActivityModal(true)
    if (modalType.editing === 'asset') setAssetModal(true)
  }, [modalType])

  useEffect(() => {
    setFeedbackModalOpenned()
  }, [feedbacks.creationFeedbackSuccess])

  let history = useHistory()

  const logOut = () => {
    ApplicationHelper.setAuthenData(false, '')
    setLogin(false)
    setOpenLinksList(false)
    history.push('/login')
  }

  const handleItemClick = (item) => {
    setOpenLinksList(false)
    setOpenHamburgerMenu(false)
    setOpenCogwheelMenu(false)
    history.push(item)
  }

  const handleCloseModal = () => {
    setAssetModal(false)
    setActivityModal(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpenLinksList(false)
      }
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenCreationList(false)
      }
      if (cogwheelRef.current && !cogwheelRef.current.contains(event.target)) {
        setOpenCogwheelMenu(false)
      }
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpenHamburgerMenu(false)
      }
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        setOpenSupportMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userRef, ref, hamburgerRef, cogwheelRef, supportRef])

  useEffect(() => {
    if (
      user.createdAt ||
      lists.updateListSuccess ||
      lists.createListSuccess ||
      lists.deleteListSuccess
    ) {
      getLists(user)
      if (lists.createListSuccess) {
        addNotification({
          name: lists.processedListName,
          type: 'Favorites list',
          action: 'created',
        })
      }
      if (lists.updateListSuccess) {
        addNotification({
          name: lists.processedListName,
          type: 'Favorites list',
          action: 'updated',
        })
      }
      if (lists.deleteListSuccess) {
        addNotification({
          name: lists.processedListName,
          type: 'Favorites list',
          action: 'deleted',
        })
      }
    }
  }, [
    user,
    lists.updateListSuccess,
    lists.createListSuccess,
    lists.deleteListSuccess,
  ])

  useEffect(() => {
    if (roles.updateRoleSuccess) {
      if (roles.updateRoleSuccess) {
        addNotification({
          name: roles.processedRole,
          type: 'Role',
          action: 'updated',
        })
      }
    }
  }, [roles.updateRoleSuccess])

  useEffect(() => {
    if (login.isEmailSent) {
      setHelpModalInfo({ type: 'emailSent', active: true })
    } else {
      setHelpModalInfo({ type: 'emailSent', active: false })
    }
  }, [login.isEmailSent])

  return (
    <header className="header">
      <Link to="/graph" className="header__logo" />

      <div className="header-home">
        <div className="header-home-block">
          <div className="header-home-block__logo" />
          <a
            className="header-home-link"
            href="https://covidnavigator.org/"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>

      {isLogin && status ? (
        <button
          ref={ref}
          onClick={() => handleClick(setOpenCreationList)}
          className="header__addButton"
        >
          <img style={{ marginRight: '8px' }} src={plus} alt="plus" />
          New
          <ul
            className={`header__addButton-creation ${
              isOpenCreationList ? 'header__addButton-creation__open' : ''
            }`}
          >
            <li
              className="header__addButton__item"
              onClick={() =>
                setModalType({
                  id: 0,
                  tab: 'creation',
                  editing: 'asset',
                })
              }
            >
              <img src={assetIcon} alt="assetIcon" />
              <span>New Asset</span>
            </li>
            <li
              className="header__addButton__item"
              onClick={() =>
                setModalType({
                  id: 0,
                  tab: 'creation',
                  editing: 'activity',
                })
              }
            >
              <img src={activityIcon} alt="assetIcon" />
              <span>New Activity</span>
            </li>
          </ul>
        </button>
      ) : null}

      <div className={status ? 'header-legend' : 'header-legend hidden'}>
        <Legend
          activeNode={activeNode}
          opennedNode={opennedNode}
          graphAssets={filters.graphAssets}
          graphActivities={filters.graphActivities}
          visibilityLevel={filters.visibilityLevel}
        />
      </div>

      <div ref={supportRef} className="header-support">
        <div
          className="header-support-block"
          onClick={() => handleClick(setOpenSupportMenu)}
        >
          <div className="header-support-block__logo" />
        </div>

        <div
          className={
            isOpenSupportMenu
              ? 'header-support__list_open'
              : 'header-support__list'
          }
        >
          <div
            onClick={() => handleClick(setOpenSupportMenu)}
            className="header-support__list-close"
          >
            <div className="header-support__list-close-icon" />
          </div>
          <h2 className="header-support__list-title">Support</h2>
          <ul className="header-support__list-links">
            <li>
              <a
                onClick={() => setOpenSupportMenu(false)}
                className="header-support__list-links-about"
                href="https://covidnavigator.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
            </li>
            <li>
              <span
                onClick={() => {
                  setOpenSupportMenu(false)
                  setFeedbackModalOpenned(true)
                }}
              >
                Send Feedback
              </span>
            </li>
          </ul>
        </div>
      </div>

      {isLogin ? (
        <div ref={hamburgerRef} className="header-menu">
          <div
            className="header-menu-block"
            onClick={() => handleClick(setOpenHamburgerMenu)}
          >
            <div className="header-menu-block__logo" />
          </div>

          <div
            className={
              isOpenHamburgerMenu
                ? 'header-menu__list_open'
                : 'header-menu__list'
            }
          >
            <div
              onClick={() => handleClick(setOpenHamburgerMenu)}
              className="header-menu__list-close"
            >
              <div className="header-menu__list-close-icon" />
            </div>
            <h2 className="header-menu__list-title">Administration</h2>
            <ul className="header-menu__list-links">
              {ApplicationHelper.checkPermission(
                permissions.UNCLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.PRECLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.CLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.VERIFIED_ASSETS_VIEW
              ) ? (
                <li>
                  <span onClick={() => handleItemClick('/assets')}>Assets</span>
                  <p>{articles.allAsetsNumber}</p>
                </li>
              ) : null}

              {ApplicationHelper.checkPermission(
                permissions.UNCLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.PRECLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.CLASSIFIED_ASSETS_VIEW
              ) ||
              ApplicationHelper.checkPermission(
                permissions.VERIFIED_ASSETS_VIEW
              ) ? (
                <li>
                  <span onClick={() => handleItemClick('/activities')}>
                    Activities
                  </span>
                  <p>{activities.allResults}</p>
                </li>
              ) : null}

              {ApplicationHelper.checkPermission(
                permissions.ORGANIZATIONS_VIEW
              ) ? (
                <li>
                  <span onClick={() => handleItemClick('/organizations')}>
                    Organizations
                  </span>
                  <p>{organizations.allResults}</p>
                </li>
              ) : null}

              {ApplicationHelper.checkPermission(permissions.ALL_USERS_VIEW) ? (
                <li>
                  <span onClick={() => handleItemClick('/users')}>
                    Manage Users
                  </span>
                  <p>{users.allUsersCount}</p>
                </li>
              ) : null}
              {ApplicationHelper.checkPermission(
                permissions.ROLE_PERMISSIONS_VIEW
              ) ? (
                <li>
                  <span onClick={() => handleItemClick('/permissions')}>
                    Permission Settings
                  </span>
                </li>
              ) : null}
              {ApplicationHelper.getCurrentUserData().role.role ===
              'Superuser' ? (
                <li className="header-menu__list-links header-menu__list-feedbacks">
                  <span onClick={() => handleItemClick('/feedbacks')}>
                    Feedbaсk
                  </span>
                  <p>{feedbacks.allResults}</p>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}

      {isLogin ? (
        <Favorites
          createList={createList}
          changeList={changeList}
          deleteList={deleteList}
          user={user}
          lists={lists}
        />
      ) : null}

      {!loginProcess || isLogin ? (
        <div
          ref={userRef}
          className={!isLogin ? 'header-logout' : 'header-user'}
        >
          <div
            className="header-user-block"
            onClick={
              isLogin ? () => handleClick(setOpenLinksList) : toLoginPage
            }
          >
            <div className="header-user-block__logo" />
            {!isLogin ? (
              <NavLink className="header-user__signIn-link" to="/login">
                Sign In
              </NavLink>
            ) : null}
          </div>

          <div
            className={
              isOpenLinksList ? 'header-user__list_open' : 'header-user__list'
            }
          >
            <div
              onClick={() => handleClick(setOpenLinksList)}
              className="header-user__list-close"
            >
              <div className="header-user__list-close-icon" />
            </div>

            <h2 className="header-user__list-title">{user.username}</h2>
            <p className="header-user__list-email">{user.email}</p>
            <p className="header-user__list-role">{user.role}</p>

            <ul className="header-user__list-links">
              <li data-small-hint="Coming soon!" data-small-hint-at="left">
                <span>Edit Account</span>
              </li>
              <li>
                <span
                  onClick={() =>
                    setUserModalInfo({
                      id: user.id,
                      type: 'changePassword',
                      active: true,
                    })
                  }
                >
                  Change Password
                </span>
              </li>
              <div className="header-user__list-links-profile">
                <li>
                  <span onClick={() => handleItemClick('/profile/assets')}>
                    My Assets
                  </span>
                  <p>{user.articlesCount ? user.articlesCount : 0}</p>
                </li>

                <li>
                  <span onClick={() => handleItemClick('/profile/activities')}>
                    My Activities
                  </span>
                  <p>{user.activitiesCount ? user.activitiesCount : 0}</p>
                </li>
              </div>

              <li className="header-user__list-links-logout">
                <span onClick={logOut}>Sign Out</span>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      {assetModal && (
        <Modal>
          <AssetCreationModal
            handleCloseModal={handleCloseModal}
            user={user}
            assetId={modalType.id}
            modalType={modalType.tab}
          />
        </Modal>
      )}

      {activityModal && (
        <Modal>
          <ActivityCreationModal
            handleCloseModal={handleCloseModal}
            activityId={modalType.id}
            modalType={modalType.tab}
          />
        </Modal>
      )}

      {isFeedbackModalOpened && (
        <Modal>
          <FeedbackModal
            user={user}
            setModalOpened={setFeedbackModalOpenned}
            sendFeedback={createFeedbackAction}
            isLogin={isLogin}
          />
        </Modal>
      )}

      {userModal && (
        <Modal>
          <UserEditingModal
            className="user-container_top"
            userId={userModalInfo.id}
            type={userModalInfo.type}
            handleCloseModal={() =>
              setUserModalInfo({ id: 0, type: 'changePassword', active: false })
            }
          />
        </Modal>
      )}

      {helpModalInfo.active && (
        <Modal>
          {helpModalInfo.type === 'emailSent' && (
            <EmailSentModal
              username={login.unconfirmedUser.username}
              email={login.unconfirmedUser.email}
              handleClose={() => setEmailSent(false)}
            />
          )}
        </Modal>
      )}

      <NotificationsBox
        notifications={notifications}
        deleteNotification={deleteNotification}
      />
    </header>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.users,
  roles: state.roles,
  filters: state.filters.filters,
  status: state.filters.status,
  lists: state.lists,
  articles: state.articles,
  activities: state.activities,
  organizations: state.organizations,
  feedbacks: state.feedbacks,
  opennedNode: state.filters.opennedNode,
  activeNode: state.filters.activeNode,
  notifications: state.notifications.notifications,
  login: state.login,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    getLists: (user) => dispatch(getLists(user)),
    createList: (list) => dispatch(createList(list)),
    changeList: (id, list) => dispatch(changeList(id, list)),
    getActivitiesCount: () => dispatch(getActivitiesCount()),
    getArticlesCount: () => dispatch(getArticlesCount()),
    deleteList: (id) => dispatch(deleteList(id)),
    createFeedbackAction: (feedback) =>
      dispatch(createFeedbackAction(feedback)),
    addNotification: (notification) => dispatch(addNotification(notification)),
    setNotificationStatus: (id, status) =>
      dispatch(setNotificationStatus(id, status)),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    getRolesAction: () => dispatch(getRolesAction()),
    setEmailSent: () => dispatch(setEmailSent()),
    getUsersCount: () => dispatch(getUsersCount()),
    getProfileInfo: () => dispatch(getProfileInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
