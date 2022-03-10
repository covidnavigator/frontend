import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import {
  status,
  publicationTypes,
} from '../../../assets/js/options/formOptions'
import { languages } from '../../../assets/js/options/articlesFilters'
import { ArticleDetails, Popup, Modal } from '../../../components'

import { changeList, createList } from '../../../redux/actions/listsAction'
import {
  updateStatus,
  deleteArticleAction,
  getArticleAction,
} from '../../../redux/actions/articlesAction'
import AssetCreationModal from '../AssetCreation/AssetCreationModal'

import { isClickOnNotification, isClickOnMenu } from '../../../scripts/Scripts'

const AssetModalDetails = ({
  id,
  handleClose,
  articles,
  lists,
  changeList,
  user,
  createList,
  getArticleAction,
  updateStatus,
  deleteArticleAction,
  isLogin,
}) => {
  const [asset, setAsset] = useState({})
  const [editModalOpenned, setEdtiModalOpenned] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)
  const popupRef = useRef(null)

  const closeEditModal = () => {
    setEdtiModalOpenned(false)
  }

  const update = (key, value) => {
    updateStatus(id, value.value)
  }

  const handleDelete = () => deleteArticleAction(asset.id)

  const setData = (body) => {
    const data = {
      id: body.id,
      name: body.name,
      title: body.name,
      ref: body.ref,
      status: status.filter((item) => body.status === item.value)[0],
      description: body.description,
      authors: body.authors,
      notes: body.notes,
      url: body.url,
      language: languages.find((language) => language.value === body.language)
        .label,
      created: new Date(body.created),
      published_date: body.published_date ? body.published_date : '',
      role: body.role,
      keywords: body.keywords,
      pan_countries: body.pan_countries,
      geography: body.geography,
      countries: body.countries,
      regions: body.regions,
      state_or_provinces: body.state_or_provinces,
      localities: body.localities,
      formalism: body.formalism,
      publication_type: publicationTypes.find(
        (type) => type.value === body.publication_type
      ).label,
      asset_version: body.asset_version ? body.asset_version : '',
      asset_maturity: body.asset_maturity,
      author: body.author,
      organization: {
        ...body.organization,
      },
      curators: [...body.curators],
      journal: body.journal,
      external_sources: body.external_sources,
    }
    setAsset(data)
  }

  const fetchArticleData = () => getArticleAction(id, setData)

  useEffect(() => {
    if ((articles.updateStatusSuccess || articles.updationSuccess) && id) {
      fetchArticleData()
      setEdtiModalOpenned(false)
    }
  }, [articles.updateStatusSuccess, articles.updationSuccess])

  useEffect(() => {
    if (id) {
      fetchArticleData()
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !popupRef.current
      ) {
        if (
          !isClickOnNotification(event.target) &&
          !isClickOnMenu(event.target)
        ) {
          handleClose()
        }
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
  }, [modalRef, popupRef])

  return asset.id ? (
    <section className="details__container">
      {!editModalOpenned.length ? (
        <div ref={modalRef} className="details__container-modal">
          <ArticleDetails
            isLogin={isLogin}
            handleClose={handleClose}
            changeList={changeList}
            createList={createList}
            lists={lists}
            user={user}
            updateStatus={update}
            asset={asset}
            handleDelete={setOpenModal}
            setEdtiModalOpenned={setEdtiModalOpenned}
          />
          {isOpenModal && (
            <div ref={popupRef} className="details__container-modal">
              <Modal>
                <Popup
                  text={asset.name}
                  handleClick={handleDelete}
                  handleClose={() => setOpenModal(false)}
                />
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <div className="modal">
          <AssetCreationModal
            user={user}
            assetId={id}
            modalType={editModalOpenned}
            handleCloseModal={closeEditModal}
          />
        </div>
      )}
    </section>
  ) : null
}

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
  user: state.user,
  articles: state.articles,
  isLogin: state.login.isLogin,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
    changeList: (id, list) => dispatch(changeList(id, list)),
    updateStatus: (id, status) => dispatch(updateStatus(id, status)),
    deleteArticleAction: (id) => dispatch(deleteArticleAction(id)),
    getArticleAction: (id, callback) =>
      dispatch(getArticleAction(id, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetModalDetails)
