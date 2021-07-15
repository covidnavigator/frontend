import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import plus from '../../assets/img/icons/header/plus.svg'
import * as permissions from '../../assets/js/options/permissions'
import ApplicationHelper from '../../assets/js/utils'

import sortArrow from '../../assets/img/icons/articles/long-arrow-down.svg'
import './organizations.scss'

import OrganizationCreatingModal from '../../components/Modal/OrganizationCreation/OrganizationCreationModal'
import OrganizationModalDetails from '../../components/Modal/ModalDetails/OrganizationModalDetails'

import {
  Pagination,
  OrganizationItem,
  Modal,
  SearchByField,
  Footer,
} from '../../components'

import {
  getOrganizationsAction,
  deleteOrganizationAction,
  changeValue,
} from '../../redux/actions/organizationsAction'
import { setLogin } from '../../redux/actions/loginAction'

import _ from 'lodash'

import {
  ARTICLES_TABLE_TOP_INDENT,
  TWO_ITEM_MENU_HEIGHT,
} from '../../assets/js/constants'
import { organizationsSearchByOptions } from '../../assets/js/options/navigationPanelOptions'
import { getKeywords } from '../../redux/actions/keywordsAction'

function Organizations({
  isLogin,
  organizations,
  history,
  getOrganizationsAction,
  deleteOrganizationAction,
  changeValue,
  setLogin,
  getKeywords,
  keywords,
}) {
  const [inputValue, setInputValue] = useState('')
  const [modalType, setModalType] = useState({
    id: 0,
    type: 'creation',
    active: false,
  })
  const wrap = useRef(null)
  const [organizationModal, setOrganizationModal] = useState(false)
  const [organizationDetailsModal, setOrganizationDetailsModal] = useState(
    false
  )
  const [isOpenUp, setOpenUp] = useState(false)

  const makeParams = (organizations) => {
    const urlParameters = `${
      typeof organizations.page !== undefined
        ? '?page=' + organizations.page
        : ''
    }${organizations.limit ? '&limit=' + organizations.limit : ''}${
      organizations.sortName !== '' ? '&sortName=' + organizations.sortName : ''
    }${
      organizations.sortType !== '' ? '&sortType=' + organizations.sortType : ''
    }${
      organizations.searchString.length
        ? Array.isArray(organizations.searchString)
          ? organizations.searchString.reduce(
              (acc, cur) => acc + '&searchString=' + cur.value,
              ''
            )
          : '&searchString=' + organizations.searchString
        : ''
    }${
      organizations.searchBy.value !== ''
        ? '&searchBy=' + organizations.searchBy.value
        : ''
    }`
    return urlParameters
  }

  const delayedQuery = useCallback(
    _.debounce((inputValue) => changeValue('searchString', inputValue), 500),
    []
  )

  const handleInputChange = (value) => {
    setInputValue(value)
    delayedQuery(value)
  }

  const changeSortType = (sortName) => {
    if (sortName === organizations.sortName) {
      if (organizations.sortType === 'up') {
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
    setOrganizationModal(false)
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
      organizations.searchMore &&
      organizations.data.length !== organizations.totalCount
    ) {
      changeValue('limit', organizations.limit + 15)
    }
  }, [organizations.searchMore])

  useEffect(() => {
    if (
      (modalType.type === 'creation' || modalType.type === 'edit') &&
      modalType.active
    ) {
      setOrganizationModal(true)
    } else if (modalType.type === 'view' && modalType.active) {
      setOrganizationDetailsModal(true)
    }
  }, [modalType])

  useEffect(() => {
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
      history.push('/login')
    } else if (
      !ApplicationHelper.checkPermission(permissions.ORGANIZATIONS_VIEW)
    ) {
      history.push('/graph')
    } else if (wrap.current) {
      wrap.current.addEventListener('scroll', trackScrolling)
      getKeywords()
      getOrganizationsAction(makeParams(organizations))
    }
    return () => {
      wrap.current.removeEventListener('scroll', trackScrolling)
    }
  }, [
    organizations.sortName,
    organizations.sortType,
    organizations.page,
    organizations.limit,
    organizations.searchString,
    organizations.searchBy,
  ])

  useEffect(() => {
    if (
      organizations.creationOrganizationSuccess ||
      organizations.updationOrganizationSuccess ||
      organizations.deletionOrganizationSuccess
    ) {
      handleCloseModal()
      getKeywords()
      getOrganizationsAction(makeParams(organizations))
    }
  }, [
    organizations.creationOrganizationSuccess,
    organizations.updationOrganizationSuccess,
    organizations.deletionOrganizationSuccess,
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
      <div className="organizations">
        <h1 className="organizations__header">Organizations</h1>
        <div className="organizations__filters">
          {ApplicationHelper.checkPermission(permissions.ORGANIZATIONS_EDIT) ? (
            <button
              onClick={() =>
                setModalType({ id: 0, type: 'creation', active: true })
              }
              className="organizations__addButton"
            >
              <img style={{ marginRight: '8px' }} src={plus} alt="plus" />
              New
            </button>
          ) : null}

          <div className="organizations__search">
            <SearchByField
              value={inputValue}
              onChange={handleInputChange}
              keywords={keywords}
              searchBy={organizations.searchBy}
              setSearchBy={(field) => changeValue('searchBy', field)}
              options={organizationsSearchByOptions}
              keywords={keywords}
            />
          </div>

          <div className="organizations__pagination">
            <Pagination
              page={organizations.page}
              limit={organizations.limit}
              setPage={(val) => changeValue('page', val)}
              totalResults={organizations.totalCount}
            />
          </div>
        </div>

        <div className="organizations__block">
          <div ref={wrap} className="organizations__block-wrap">
            <table className="table">
              <thead>
                <tr className="table__row">
                  <th
                    className="table__header-id"
                    onClick={() => changeSortType('organizations.id')}
                  >
                    <span>Id</span>
                    {organizations.sortName === 'organizations.id' ? (
                      <img
                        className={
                          organizations.sortType === 'down'
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
                    onClick={() => changeSortType('organizations.name')}
                  >
                    <span>Name</span>
                    {organizations.sortName === 'organizations.name' ? (
                      <img
                        className={
                          organizations.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-description"
                    onClick={() => changeSortType('organizations.description')}
                  >
                    <span>Description</span>

                    {organizations.sortName === 'organizations.description' ? (
                      <img
                        className={
                          organizations.sortType === 'down'
                            ? 'table__header-sort-up'
                            : 'table__header-sort-down'
                        }
                        src={sortArrow}
                        alt="sort arrow"
                      />
                    ) : null}
                  </th>
                  <th
                    className="table__header-type"
                    onClick={() => changeSortType('organizations.type')}
                  >
                    <span>Type</span>

                    {organizations.sortName === 'organizations.type' ? (
                      <img
                        className={
                          organizations.sortType === 'down'
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
                {organizations.data.length === 0
                  ? null
                  : organizations.data.map((organization) => (
                      <OrganizationItem
                        deleteOrganizationAction={deleteOrganizationAction}
                        setModalType={setModalType}
                        key={organization.id}
                        organization={organization}
                        checkMenuPosition={checkMenuPosition}
                        isOpenUp={isOpenUp}
                      />
                    ))}
              </tbody>
            </table>
            {organizations.data.length === 0 ? (
              <span className="organizations__block-error">
                Organizations list is empty
              </span>
            ) : null}
          </div>
        </div>
        {organizationModal && (
          <Modal>
            <OrganizationCreatingModal
              handleCloseModal={handleCloseModal}
              organizationId={modalType.id}
              modalType={modalType.type}
            />
          </Modal>
        )}
        {organizationDetailsModal && (
          <Modal>
            <OrganizationModalDetails
              handleClose={() => setOrganizationDetailsModal(false)}
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
  organizations: state.organizations,
  keywords: state.keywords.keywordsSelect,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getOrganizationsAction: (url) => dispatch(getOrganizationsAction(url)),
    deleteOrganizationAction: (id) => dispatch(deleteOrganizationAction(id)),
    changeValue: (key, value) => dispatch(changeValue(key, value)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    getKeywords: () => dispatch(getKeywords()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organizations)
