import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connect } from 'react-redux'

import plus from '../../assets/img/icons/header/plus.svg'
import sortArrow from '../../assets/img/icons/articles/long-arrow-down.svg'

import AssetCreationModal from '../../components/Modal/AssetCreation/AssetCreationModal'
import AssetModalDetails from '../../components/Modal/ModalDetails/AssetModalDetails'
import {
  ArticleItem,
  Pagination,
  Modal,
  SearchByField,
  FilterPanel,
  Footer,
} from '../../components'

import {
  getArticlesAction,
  deleteArticleAction,
} from '../../redux/actions/articlesAction'
import { setLogin } from '../../redux/actions/loginAction'

import './articles.scss'
import ApplicationHelper from '../../assets/js/utils'
import * as permissions from '../../assets/js/options/permissions'

import _ from 'lodash'

import {
  assetsSearchByOptions,
  assetsTabs,
} from '../../assets/js/options/navigationPanelOptions'
import {
  THREE_ITEM_MENU_HEIGHT,
  ARTICLES_TABLE_TOP_INDENT,
} from '../../assets/js/constants'
import { getKeywords } from '../../redux/actions/keywordsAction'

function Articles({
  isLogin,
  setLogin,
  user,
  history,
  reduxArticles,
  deleteArticleAction,
  getArticlesAction,
  getKeywords,
  keywords,
}) {
  const [inputValue, setInputValue] = useState('')
  const [searchBy, setSearchBy] = useState(assetsSearchByOptions[0])
  const [status, setStatus] = useState('all')
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [totalResults, setTotalResults] = useState(0)
  const [sort, setSort] = useState({ direction: 'down', name: 'article.id' })
  const [searchMore, setSearchMore] = useState(false)
  const [modalType, setModalType] = useState({
    id: 0,
    tab: 'create',
    editing: false,
  })
  const [assetDetailsModal, setAssetDetailsModal] = useState(false)
  const [assetModal, setAssetModal] = useState(false)
  const [isOpenUp, setOpenUp] = useState(false)
  const wrap = useRef(null)

  const handleCloseModal = () => {
    setModalType({
      id: 0,
      tab: 'create',
      editing: false,
    })
    setAssetDetailsModal(false)
    setAssetModal(false)
  }

  const setModal = (data) => {
    setModalType(data)
  }

  useEffect(() => {
    if (modalType.editing) {
      setAssetModal(true)
    }
    if (modalType.tab === 'view') {
      setAssetDetailsModal(true)
    }
  }, [modalType])

  const trackScrolling = () => {
    if (
      wrap.current.clientHeight + wrap.current.scrollTop >=
      wrap.current.scrollHeight - 25
    ) {
      setSearchMore(true)
    }
  }

  const makeParams = (...args) => {
    const [inputValue, searchBy, page, limit, status, sort] = args

    const urlParameters = `${typeof page !== undefined ? '?page=' + page : ''}${
      limit ? '&limit=' + limit : ''
    }${status !== '' ? '&status=' + status : ''}${
      sort.name.length
        ? '&sortName=' + sort.name + '&sortType=' + sort.direction
        : ''
    }${
      inputValue.length
        ? Array.isArray(inputValue)
          ? inputValue.reduce(
              (acc, cur) => acc + '&searchString=' + cur.value,
              ''
            )
          : '&searchString=' + inputValue
        : ''
    }${searchBy.value !== '' ? '&searchBy=' + searchBy.value : ''}`
    return [status, urlParameters]
  }

  const delayedQuery = useCallback(
    _.debounce((...args) => fetchData(makeParams(...args)), 500),
    []
  )

  const handleInputChange = (value) => {
    setInputValue(value)
    setPage(1)
    delayedQuery(value, searchBy, page, limit, status, sort)
  }

  const fetchData = async ([status, urlParameters]) => {
    let base = ''
    if (
      status === 'Draft' &&
      !ApplicationHelper.checkPermission(permissions.DRAFTS_VIEW)
    ) {
      base = 'articles/profile'
    } else {
      base = 'articles'
    }
    const uri = `${base}${urlParameters}`
    getArticlesAction(uri, setArticlesData)
  }

  const setArticlesData = (body) => {
    setArticles(body.data)
    setPage(1)
    setTotalResults(body.totalCount)
    setSearchMore(false)
  }

  useEffect(() => {
    if (searchMore && articles.length !== totalResults) {
      setLimit((prev) => prev + 15)
    }
  }, [searchMore])

  useEffect(() => {
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
      if (wrap.current) {
        wrap.current.addEventListener('scroll', trackScrolling)
      }
      if (user.role) {
        fetchData(makeParams(inputValue, searchBy, page, limit, status, sort))
      }
      if (reduxArticles.creationSuccess || reduxArticles.updationSuccess) {
        setAssetModal(false)
        getKeywords()
      }
      if (reduxArticles.deletionSuccess) {
        setAssetDetailsModal(false)
      }
    }

    return () => {
      wrap.current.removeEventListener('scroll', trackScrolling)
    }
  }, [
    user,
    status,
    limit,
    page,
    sort,
    reduxArticles.creationSuccess,
    reduxArticles.updationSuccess,
    reduxArticles.updateStatusSuccess,
    reduxArticles.deletionSuccess,
  ])

  const handleStatusChange = (status) => {
    setStatus(status)
    setPage(1)
  }

  const changeSortType = (name) => {
    setSort((prev) => ({
      direction:
        prev.name === name ? (prev.direction === 'up' ? 'down' : 'up') : 'up',
      name: name,
    }))
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
      <div className="all-articles">
        <h1 className="articles__header">Assets</h1>

        <div className="articles__options">
          <button
            onClick={() =>
              setModalType({ id: 0, tab: 'creation', editing: 'asset' })
            }
            className="articles__addButton"
          >
            <img style={{ marginRight: '8px' }} src={plus} alt="plus" />
            New
          </button>

          <div className="articles__search">
            <SearchByField
              value={inputValue}
              onChange={handleInputChange}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              options={assetsSearchByOptions}
              keywords={keywords}
            />
          </div>

          <div className="articles__status">
            <FilterPanel
              filterName="Statuses"
              value={status}
              changeValue={handleStatusChange}
              options={[
                assetsTabs[0],
                assetsTabs[1],
                ...ApplicationHelper.getPropperSelectOptions(
                  'view',
                  assetsTabs.slice(2)
                ),
              ]}
            />
          </div>

          <div className="articles__pagination">
            <Pagination page={page} limit={limit} totalResults={totalResults} />
          </div>
        </div>

        <div className="articles__block">
          <div ref={wrap} className="articles__block-wrap">
            <table className="table">
              <thead>
                <tr className="table__row">
                  <th
                    className="table__header-id"
                    onClick={() => changeSortType('article.id')}
                  >
                    Id
                    {sort.name === 'article.id' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                    onClick={() => changeSortType('article.name')}
                  >
                    Title
                    {sort.name === 'article.name' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                    {sort.name === 'author.username' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                    onClick={() => changeSortType('article.created')}
                  >
                    Created
                    {sort.name === 'article.created' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                    onClick={() => changeSortType('article.publication_type')}
                  >
                    Publication Type
                    {sort.name === 'article.publication_type' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                    onClick={() => changeSortType('article.status')}
                  >
                    Status
                    {sort.name === 'article.status' ? (
                      <img
                        className={
                          sort.direction === 'down'
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
                {articles && articles.length !== 0
                  ? articles.map((article) => (
                      <ArticleItem
                        key={article.id}
                        article={article}
                        setModal={setModal}
                        deleteArticle={deleteArticleAction}
                        checkMenuPosition={checkMenuPosition}
                        isOpenUp={isOpenUp}
                      />
                    ))
                  : null}
              </tbody>
            </table>
            {articles.length === 0 ? (
              <span className="articles__block-error">
                Assets list is empty
              </span>
            ) : null}
          </div>
        </div>
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
        {assetDetailsModal && (
          <Modal>
            <AssetModalDetails
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
  lists: state.lists.lists,
  reduxArticles: state.articles,
  keywords: state.keywords.keywordsSelect,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesAction: (uri, callback) =>
      dispatch(getArticlesAction(uri, callback)),
    deleteArticleAction: (id) => dispatch(deleteArticleAction(id)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    getKeywords: () => dispatch(getKeywords()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
