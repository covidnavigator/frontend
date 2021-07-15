import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'

import sortArrow from '../../assets/img/icons/articles/long-arrow-down.svg'

import _ from 'lodash'

import {
  Pagination,
  FeedbackItem,
  SearchByField,
  FilterPanel,
  Datepicker,
  Footer,
} from '../../components'

import {
  changeValue,
  setDate,
  getFeedbackAction,
  deleteFeedbackAction,
  updateFeedbackAction,
} from '../../redux/actions/feedbackAction'
import { setLogin } from '../../redux/actions/loginAction'

import './feedbacks.scss'
import ApplicationHelper from '../../assets/js/utils'

import {
  ARTICLES_TABLE_TOP_INDENT,
  TWO_ITEM_MENU_HEIGHT,
} from '../../assets/js/constants'
import {
  feedbacksSearchByOptions,
  feedbackTabs,
} from '../../assets/js/options/navigationPanelOptions'

function Feedbacks({
  isLogin,
  history,
  feedbacks,
  changeValue,
  setDate,
  getFeedbackAction,
  deleteFeedbackAction,
  updateFeedbackAction,
  setLogin,
}) {
  const [inputValue, setInputValue] = useState('')
  const wrap = useRef(null)

  const [isOpenUp, setOpenUp] = useState(false)

  const makeParams = (feedbacks) => {
    const urlParameters = `${
      typeof feedbacks.page !== undefined ? '?page=' + feedbacks.page : ''
    }${feedbacks.limit ? '&limit=' + feedbacks.limit : ''}${
      feedbacks.status !== '' ? '&status=' + feedbacks.status : ''
    }${feedbacks.sortName !== '' ? '&sortName=' + feedbacks.sortName : ''}${
      feedbacks.sortType !== '' ? '&sortType=' + feedbacks.sortType : ''
    }${
      feedbacks.searchString !== ''
        ? '&searchString=' + feedbacks.searchString
        : ''
    }${
      feedbacks.searchBy.value !== ''
        ? '&searchBy=' + feedbacks.searchBy.value
        : ''
    }`
    return urlParameters
  }

  const handleStatusChange = (item) => {
    changeValue('page', 1)
    changeValue('status', item)
  }

  const delayedQuery = useCallback(
    _.debounce((inputValue) => changeValue('searchString', inputValue), 500),
    []
  )

  const handleInputChange = (value) => {
    setInputValue(value)
    changeValue('page', 1)
    delayedQuery(value)
  }

  const handleDateChange = (startDate, endDate) => {
    setDate(startDate, endDate)
  }

  const changeSortType = (sortName) => {
    if (sortName === feedbacks.sortName) {
      if (feedbacks.sortType === 'up') {
        changeValue('sortType', 'down')
      } else {
        changeValue('sortType', 'up')
      }
    } else {
      changeValue('sortName', sortName)
      changeValue('sortType', 'up')
    }
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
      feedbacks.searchMore &&
      feedbacks.data.length !== feedbacks.totalCount
    ) {
      changeValue('limit', feedbacks.limit + 15)
    }
  }, [feedbacks.searchMore])

  useEffect(() => {
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
      history.push('/login')
    } else if (
      ApplicationHelper.getCurrentUserData().role.role !== 'Superuser'
    ) {
      history.push('/graph')
    } else if (wrap.current) {
      wrap.current.addEventListener('scroll', trackScrolling)
      getFeedbackAction(
        makeParams(feedbacks),
        feedbacks.startDate,
        feedbacks.endDate
      )
    }
    return () => {
      wrap.current.removeEventListener('scroll', trackScrolling)
    }
  }, [
    feedbacks.sortName,
    feedbacks.sortType,
    feedbacks.page,
    feedbacks.limit,
    feedbacks.status,
    feedbacks.startDate,
    feedbacks.endDate,
    feedbacks.searchString,
    feedbacks.searchBy,
  ])

  useEffect(() => {
    if (
      feedbacks.creationFeedbackSuccess ||
      feedbacks.updationFeedbackSuccess ||
      feedbacks.deletionFeedbackSuccess
    ) {
      getFeedbackAction(
        makeParams(feedbacks),
        feedbacks.startDate,
        feedbacks.endDate
      )
    }
  }, [
    feedbacks.creationFeedbackSuccess,
    feedbacks.updationFeedbackSuccess,
    feedbacks.deletionFeedbackSuccess,
  ])

  const checkMenuPosition = (mouseY) => {
    const tableHeight = wrap.current.offsetHeight
    if (
      tableHeight < TWO_ITEM_MENU_HEIGHT ||
      tableHeight - (ARTICLES_TABLE_TOP_INDENT + tableHeight - mouseY) <
        TWO_ITEM_MENU_HEIGHT
    ) {
      setOpenUp(false)
    } else if (
      ARTICLES_TABLE_TOP_INDENT + tableHeight - mouseY <
      TWO_ITEM_MENU_HEIGHT
    ) {
      setOpenUp(true)
    } else setOpenUp(false)
  }

  return (
    <>
      <div className="feedbacks">
        <h1 className="feedbacks__header">Feedback</h1>
        <div className="feedbacks__filters">
          <div className="feedbacks__search">
            <SearchByField
              value={inputValue}
              onChange={handleInputChange}
              searchBy={feedbacks.searchBy}
              setSearchBy={(field) => changeValue('searchBy', field)}
              options={feedbacksSearchByOptions}
            />
          </div>

          <div className="feedbacks__datepicker">
            <Datepicker
              className=""
              startDate={feedbacks.startDate}
              endDate={feedbacks.endDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="feedbacks__status">
            <FilterPanel
              filterName="Statuses"
              value={feedbacks.status}
              changeValue={handleStatusChange}
              options={feedbackTabs}
            />
          </div>

          <div className="feedbacks__pagination">
            <Pagination
              page={feedbacks.page}
              limit={feedbacks.limit}
              setPage={(val) => changeValue('page', val)}
              totalResults={feedbacks.totalCount}
            />
          </div>
        </div>
        <div className="feedbacks__block">
          <div ref={wrap} className="feedbacks__block-wrap">
            <table className="table">
              <thead>
                <tr className="table__row">
                  <th
                    className="table__header-id"
                    onClick={() => changeSortType('id')}
                  >
                    <span>Id</span>
                    {feedbacks.sortName === 'id' ? (
                      <img
                        className={
                          feedbacks.sortType === 'down'
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
                    onClick={() => changeSortType('title')}
                  >
                    <span>Title/Message</span>
                    {feedbacks.sortName === 'title' ? (
                      <img
                        className={
                          feedbacks.sortType === 'down'
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
                    onClick={() => changeSortType('username')}
                  >
                    <span>Name/Email</span>

                    {feedbacks.sortName === 'username' ? (
                      <img
                        className={
                          feedbacks.sortType === 'down'
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
                    onClick={() => changeSortType('created')}
                  >
                    <span>Date, Time</span>

                    {feedbacks.sortName === 'created' ? (
                      <img
                        className={
                          feedbacks.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th className="table__header-disposition">Disposition</th>
                  <th
                    className="table__header-status"
                    onClick={() => changeSortType('status')}
                  >
                    <span>Status</span>

                    {feedbacks.sortName === 'status' ? (
                      <img
                        className={
                          feedbacks.sortType === 'down'
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
                {feedbacks.data.length === 0
                  ? null
                  : feedbacks.data.map((feedback) => (
                      <FeedbackItem
                        deleteFeedbackAction={deleteFeedbackAction}
                        updateFeedbackAction={updateFeedbackAction}
                        key={feedback.id}
                        feedback={feedback}
                        checkMenuPosition={checkMenuPosition}
                        isOpenUp={isOpenUp}
                      />
                    ))}
              </tbody>
            </table>
            {feedbacks.data.length === 0 ? (
              <span className="feedbacks__block-error">
                Feedback list is empty
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
const mapStateToProps = (state) => ({
  feedbacks: state.feedbacks,
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeValue: (key, value) => dispatch(changeValue(key, value)),
    setDate: (startDate, endDate) => dispatch(setDate(startDate, endDate)),
    getFeedbackAction: (url, startDate, endDate) =>
      dispatch(getFeedbackAction(url, startDate, endDate)),
    deleteFeedbackAction: (id) => dispatch(deleteFeedbackAction(id)),
    updateFeedbackAction: (id, feedback) =>
      dispatch(updateFeedbackAction(id, feedback)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks)
