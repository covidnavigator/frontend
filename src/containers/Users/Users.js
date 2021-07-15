import React, { useEffect, useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import plus from '../../assets/img/icons/header/plus.svg'
import sortArrow from '../../assets/img/icons/articles/long-arrow-down.svg'

import UserEditingModal from '../../components/Modal/UserCreation/UserEditingModal'
import {
  Modal,
  UserItem,
  Pagination,
  SearchByField,
  Footer,
} from '../../components'

import {
  getUsersAction,
  deleteUser,
  changeValue,
  resetUserErrors,
  updateUserStatus,
} from '../../redux/actions/usersAction'
import { getRolesAction } from '../../redux/actions/rolesAction'
import { setLogin } from '../../redux/actions/loginAction'

import './users.scss'
import ApplicationHelper from '../../assets/js/utils'
import * as permissions from '../../assets/js/options/permissions'

import {
  ARTICLES_TABLE_TOP_INDENT,
  THREE_ITEM_MENU_HEIGHT,
} from '../../assets/js/constants'
import { usersSearchByOptions } from '../../assets/js/options/navigationPanelOptions'

function Users({
  isLogin,
  setLogin,
  user,
  history,
  getUsersAction,
  deleteUser,
  resetUserErrors,
  storeUsers,
  getRolesAction,
  changeValue,
  updateUserStatus,
}) {
  const [inputValue, setInputValue] = useState('')
  const [modalType, setModalType] = useState({
    id: 0,
    type: 'edit',
    active: false,
  })
  const [isOpenEditModal, setOpenEditModal] = useState(false)
  const [isOpenUp, setOpenUp] = useState(false)
  const wrap = useRef(null)

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    resetUserErrors()
  }

  const trackScrolling = () => {
    if (
      wrap.current.clientHeight + wrap.current.scrollTop >=
      wrap.current.scrollHeight - 25
    ) {
      changeValue('searchMore', true)
    }
  }

  const setModal = (data) => {
    setModalType(data)
  }

  useEffect(() => {
    if (
      storeUsers.searchMore &&
      storeUsers.data.length !== storeUsers.totalCount
    ) {
      changeValue('limit', storeUsers.limit + 15)
    }
  }, [storeUsers.searchMore])

  useEffect(() => {
    if (modalType.active) {
      setOpenEditModal(true)
    }
  }, [modalType])

  useEffect(() => {
    if (
      storeUsers.updationSuccess ||
      storeUsers.creationSuccess ||
      storeUsers.deletionSuccess
    ) {
      handleCloseEditModal()
      getUsersAction(makeParams(storeUsers))
    }
  }, [
    storeUsers.deletionSuccess,
    storeUsers.updationSuccess,
    storeUsers.creationSuccess,
  ])

  useEffect(() => {
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
      history.push('/login')
    } else if (!ApplicationHelper.checkPermission(permissions.ALL_USERS_VIEW)) {
      history.push('/graph')
    } else if (wrap.current) {
      wrap.current.addEventListener('scroll', trackScrolling)
      getUsersAction(makeParams(storeUsers))
      getRolesAction()
    }
    return () => {
      wrap.current.removeEventListener('scroll', trackScrolling)
    }
  }, [
    storeUsers.searchString,
    storeUsers.searchBy,
    storeUsers.sortName,
    storeUsers.sortType,
    storeUsers.page,
    storeUsers.limit,
  ])

  const makeParams = (users) => {
    const urlParameters = `${
      typeof users.page !== undefined ? '?page=' + users.page : ''
    }${users.limit ? '&limit=' + users.limit : ''}${
      users.sortName !== '' ? '&sortName=' + users.sortName : ''
    }${users.sortType !== '' ? '&sortType=' + users.sortType : ''}${
      users.searchString !== ''
        ? '&searchString=' + encodeURIComponent(users.searchString)
        : ''
    }${users.searchBy.value !== '' ? '&searchBy=' + users.searchBy.value : ''}`
    return urlParameters
  }

  const delayQuery = useCallback(
    _.debounce((inputValue) => changeValue('searchString', inputValue), 500),
    []
  )

  const handleInputChange = (value) => {
    setInputValue(value)
    delayQuery(value)
  }

  const handleDeleteUser = async (id) => {
    deleteUser(id)
    if (id === user.id) {
      setLogin(false)
      localStorage.removeItem('token')
      history.push('/login')
    }
  }

  const changeSortType = (sortName) => {
    if (sortName === storeUsers.sortName) {
      storeUsers.sortType === 'up'
        ? changeValue('sortType', 'down')
        : changeValue('sortType', 'up')
    } else {
      changeValue('sortName', sortName)
      changeValue('sortType', 'up')
    }
  }

  const checkMenuPosition = (mouseY) => {
    const tableHeight = wrap.current.offsetHeight
    if (
      tableHeight < THREE_ITEM_MENU_HEIGHT ||
      tableHeight - (ARTICLES_TABLE_TOP_INDENT + tableHeight - mouseY) <
        THREE_ITEM_MENU_HEIGHT
    ) {
      setOpenUp(false)
    } else if (
      ARTICLES_TABLE_TOP_INDENT + tableHeight - mouseY <
      THREE_ITEM_MENU_HEIGHT
    ) {
      setOpenUp(true)
    } else setOpenUp(false)
  }

  return (
    <>
      <div className="users">
        <h1 className="users__header">Users</h1>

        <div className="users__options">
          {ApplicationHelper.checkPermission(permissions.ALL_USERS_EDIT) && (
            <button
              className="users__addButton"
              onClick={() =>
                setModal({
                  id: 0,
                  type: 'create',
                  active: true,
                })
              }
            >
              <img style={{ marginRight: '8px' }} src={plus} alt="plus" />
              New
            </button>
          )}

          <div className="users__search">
            <SearchByField
              value={inputValue}
              onChange={handleInputChange}
              searchBy={storeUsers.searchBy}
              setSearchBy={(field) => changeValue('searchBy', field)}
              options={usersSearchByOptions}
            />
          </div>

          <div className="users__pagination">
            <Pagination
              page={storeUsers.page}
              limit={storeUsers.limit}
              setPage={(val) => changeValue('page', val)}
              totalResults={storeUsers.totalCount}
            />
          </div>
        </div>

        <div className="users__block">
          <div ref={wrap} className="users__block-wrap">
            <table className="table">
              <thead>
                <tr className="table__row">
                  <th
                    className="table__header-id"
                    onClick={() => changeSortType('users.id')}
                  >
                    Id
                    {storeUsers.sortName === 'users.id' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-profile"
                    onClick={() => changeSortType('users.username')}
                  >
                    Profile
                    {storeUsers.sortName === 'users.username' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-organization"
                    onClick={() => changeSortType('users.organization')}
                  >
                    Organization
                    {storeUsers.sortName === 'users.organization' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-role"
                    onClick={() => changeSortType('users.role')}
                  >
                    Role
                    {storeUsers.sortName === 'users.role' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-date"
                    onClick={() => changeSortType('users.createdAt')}
                  >
                    Created
                    {storeUsers.sortName === 'users.createdAt' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-date"
                    onClick={() => changeSortType('users.updatedAt')}
                  >
                    Updated
                    {storeUsers.sortName === 'users.updatedAt' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-status"
                    onClick={() => changeSortType('users.active')}
                  >
                    Status
                    {storeUsers.sortName === 'users.active' ? (
                      <img
                        className={
                          storeUsers.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {storeUsers.data.length !== 0
                  ? storeUsers.data.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        setModal={setModal}
                        deleteUser={handleDeleteUser}
                        updateStatus={updateUserStatus}
                        checkMenuPosition={checkMenuPosition}
                        isOpenUp={isOpenUp}
                      />
                    ))
                  : null}
              </tbody>
            </table>
            {storeUsers.data.length === 0 ? (
              <span className="users__block-error">Users list is empty</span>
            ) : null}
          </div>
        </div>
        {isOpenEditModal && (
          <Modal>
            <UserEditingModal
              className="user-container_center"
              type={modalType.type}
              userId={modalType.id}
              handleCloseModal={handleCloseEditModal}
            />
          </Modal>
        )}
      </div>

      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  storeUsers: state.users,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    resetUserErrors: () => dispatch(resetUserErrors()),
    getRolesAction: () => dispatch(getRolesAction()),
    getUsersAction: (url) => dispatch(getUsersAction(url)),
    changeValue: (key, value) => dispatch(changeValue(key, value)),
    updateUserStatus: (id, status) => dispatch(updateUserStatus(id, status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
