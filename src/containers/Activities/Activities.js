import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import plus from '../../assets/img/icons/header/plus.svg'
import * as permissions from '../../assets/js/options/permissions'
import ApplicationHelper from '../../assets/js/utils'

import sortArrow from '../../assets/img/icons/articles/long-arrow-down.svg'
import './activities.scss'

import ActivityCreationModal from '../../components/Modal/ActivityCreation/ActivityCreationModal'
import ActivityModalDetails from '../../components/Modal/ModalDetails/ActivityModalDetails'

import {
  Pagination,
  ActivityItem,
  Modal,
  FilterPanel,
  SearchByField,
  Footer,
} from '../../components'

import {
  getActivitiesAction,
  deleteActivityAction,
  changeValue,
  resetStore,
} from '../../redux/actions/activitiesAction'
import { setLogin } from '../../redux/actions/loginAction'

import _ from 'lodash'

import {
  activitiesTabs,
  activitiesSearchByOptions,
} from '../../assets/js/options/navigationPanelOptions'
import {
  THREE_ITEM_MENU_HEIGHT,
  ARTICLES_TABLE_TOP_INDENT,
} from '../../assets/js/constants'
import { getKeywords } from '../../redux/actions/keywordsAction'

function Activities({
  isLogin,
  user,
  setLogin,
  activities,
  history,
  changeValue,
  getActivitiesAction,
  deleteActivityAction,
  resetStore,
  getKeywords,
  keywords,
}) {
  const [inputValue, setInputValue] = useState('')
  const [modalType, setModalType] = useState({
    id: 0,
    tab: 'creation',
    editing: false,
  })
  const wrap = useRef(null)
  const [activitiesModal, setActivitiesModal] = useState(false)
  const [activitiesDetailsModal, setActivitiesDetailsModal] = useState(false)
  const [isOpenUp, setOpenUp] = useState(false)

  const handleStatusChanging = (item) => {
    changeValue('page', 1)
    changeValue('status', item)
  }

  const makeParams = (activities, role) => {
    const urlParameters = `${
      typeof activities.page !== undefined ? '?page=' + activities.page : ''
    }${activities.limit ? '&limit=' + activities.limit : ''}${
      activities.sortName !== '' ? '&sortName=' + activities.sortName : ''
    }${activities.sortType !== '' ? '&sortType=' + activities.sortType : ''}${
      activities.status !== '' ? '&status=' + activities.status : ''
    }${
      activities.searchString.length
        ? Array.isArray(activities.searchString)
          ? activities.searchString.reduce(
              (acc, cur) => acc + '&searchString=' + cur.value,
              ''
            )
          : '&searchString=' + activities.searchString
        : ''
    }${
      activities.searchBy.value !== ''
        ? '&searchBy=' + activities.searchBy.value
        : ''
    }${role ? '&role=admin' : ''}`
    return [activities.status, urlParameters]
  }

  const fetchData = (args) => {
    const [status, urlParameters] = args
    let base = ''
    if (
      status === 'Draft' &&
      !ApplicationHelper.checkPermission(permissions.DRAFTS_VIEW)
    ) {
      base = 'activities/profile'
    } else {
      base = 'activities'
    }

    const uri = `${base}${urlParameters}`
    getActivitiesAction(uri)
  }

  const delayedQuery = useCallback(
    _.debounce((userQuery) => changeValue('searchString', userQuery), 500),
    []
  )

  const handleInputChange = (value) => {
    setInputValue(value)
    delayedQuery(value)
  }

  const changeSortType = (sortName) => {
    if (sortName === activities.sortName) {
      if (activities.sortType === 'up') {
        changeValue('sortType', 'down')
      } else {
        changeValue('sortType', 'up')
      }
    } else {
      changeValue('sortName', sortName)
      changeValue('sortType', 'up')
    }
  }

  const handleCloseModal = () => {
    setModalType({
      id: 0,
      tab: 'creation',
      editing: false,
    })
    setActivitiesModal(false)
    setActivitiesDetailsModal(false)
  }

  const trackScrolling = () => {
    if (
      wrap.current.clientHeight + wrap.current.scrollTop >=
      wrap.current.scrollHeight - 25
    ) {
      changeValue('searchMore', true)
    }
  }

  useEffect(() => {
    if (
      activities.searchMore &&
      activities.data.length !== activities.totalCount
    ) {
      changeValue('limit', activities.limit + 15)
    }
  }, [activities.searchMore])

  useEffect(() => {
    if (modalType.editing) {
      setActivitiesModal(true)
    }
    if (modalType.tab === 'view') {
      setActivitiesDetailsModal(true)
    }
  }, [modalType])

  useEffect(() => {
    resetStore()
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
      history.push('/login')
    } else if (
      !ApplicationHelper.checkPermission(
        permissions.UNCLASSIFIED_ASSETS_VIEW
      ) &&
      !ApplicationHelper.checkPermission(
        permissions.PRECLASSIFIED_ASSETS_VIEW
      ) &&
      !ApplicationHelper.checkPermission(permissions.CLASSIFIED_ASSETS_VIEW) &&
      !ApplicationHelper.checkPermission(permissions.VERIFIED_ASSETS_VIEW)
    ) {
      history.push('/graph')
    } else {
      getKeywords()
      fetchData(
        makeParams(
          activities,
          ApplicationHelper.checkPermission(permissions.DRAFTS_VIEW)
        )
      )
    }
  }, [])

  useEffect(() => {
    if (wrap.current) {
      wrap.current.addEventListener('scroll', trackScrolling)
    }
    if (user.role) {
      fetchData(
        makeParams(
          activities,
          ApplicationHelper.checkPermission(permissions.DRAFTS_VIEW)
        )
      )
    }
    return () => {
      wrap.current.removeEventListener('scroll', trackScrolling)
    }
  }, [
    activities.sortName,
    activities.sortType,
    activities.page,
    activities.limit,
    activities.status,
    activities.searchString,
  ])

  useEffect(() => {
    if (
      activities.activitySuccessfullyCreated ||
      activities.activitySuccessfullyUpdated ||
      activities.activitySuccessfullyDeleted
    ) {
      handleCloseModal()
      getKeywords()
      fetchData(
        makeParams(
          activities,
          ApplicationHelper.checkPermission(permissions.DRAFTS_VIEW)
        )
      )
    }
  }, [
    activities.activitySuccessfullyCreated,
    activities.activitySuccessfullyUpdated,
    activities.activitySuccessfullyDeleted,
  ])

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
      <div className="activities">
        <h1 className="activities__header">Activities</h1>
        <div className="activities__filters">
          <button
            onClick={() =>
              setModalType({ id: 0, tab: 'creation', editing: true })
            }
            className="activities__addButton"
          >
            <img style={{ marginRight: '8px' }} src={plus} alt="plus" />
            New
          </button>

          <div className="activities__search">
            <SearchByField
              value={inputValue}
              onChange={handleInputChange}
              searchBy={activities.searchBy}
              setSearchBy={(field) => changeValue('searchBy', field)}
              options={activitiesSearchByOptions}
              keywords={keywords}
            />
          </div>

          <div className="activities__status">
            <FilterPanel
              filterName="Statuses"
              value={activities.status}
              changeValue={handleStatusChanging}
              options={activitiesTabs}
            />
          </div>

          <div className="activities__pagination">
            <Pagination
              page={activities.page}
              limit={activities.limit}
              totalResults={activities.totalCount}
            />
          </div>
        </div>

        <div className="activities__block">
          <div ref={wrap} className="activities__block-wrap">
            <table className="table">
              <thead>
                <tr className="table__row">
                  <th
                    className="table__header-id"
                    onClick={() => changeSortType('activity.id')}
                  >
                    Id
                    {activities.sortName === 'activity.id' ? (
                      <img
                        className={
                          activities.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-title"
                    onClick={() => changeSortType('activity.name')}
                  >
                    Title
                    {activities.sortName === 'activity.name' ? (
                      <img
                        className={
                          activities.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-author"
                    onClick={() => changeSortType('author.username')}
                  >
                    Contributor
                    {activities.sortName === 'author.username' ? (
                      <img
                        className={
                          activities.sortType === 'down'
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
                    onClick={() => changeSortType('activity.created')}
                  >
                    Created
                    {activities.sortName === 'activity.created' ? (
                      <img
                        className={
                          activities.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-pubType"
                    onClick={() => changeSortType('activity.knowledgeStages')}
                  >
                    Knowledge Stages
                    {activities.sortName === 'activity.knowledgeStages' ? (
                      <img
                        className={
                          activities.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__column_center"
                    onClick={() => changeSortType('activity.status')}
                  >
                    Status
                    {activities.sortName === 'activity.status' ? (
                      <img
                        className={
                          activities.sortType === 'down'
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
                {activities.data.length === 0
                  ? null
                  : activities.data.map((activity) => (
                      <ActivityItem
                        deleteActivityAction={deleteActivityAction}
                        setModalType={setModalType}
                        key={activity.id}
                        activity={activity}
                        checkMenuPosition={checkMenuPosition}
                        isOpenUp={isOpenUp}
                      />
                    ))}
              </tbody>
            </table>
            {activities.data.length === 0 ? (
              <span className="activities__block-error">
                Activities list is empty
              </span>
            ) : null}
          </div>
        </div>
        {activitiesModal && (
          <Modal>
            <ActivityCreationModal
              handleCloseModal={handleCloseModal}
              activityId={modalType.id}
              modalType={modalType.tab}
            />
          </Modal>
        )}
        {activitiesDetailsModal && (
          <Modal>
            <ActivityModalDetails
              handleClose={handleCloseModal}
              id={modalType.id}
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
  activities: state.activities,
  keywords: state.keywords.keywordsSelect,
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeValue: (key, value) => dispatch(changeValue(key, value)),
    deleteActivityAction: (id) => dispatch(deleteActivityAction(id)),
    getActivitiesAction: (url) => dispatch(getActivitiesAction(url)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    resetStore: () => dispatch(resetStore()),
    getKeywords: () => dispatch(getKeywords()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities)
