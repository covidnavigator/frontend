import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import { status } from '../../../assets/js/options/formOptions'
import { isClickOnNotification, isClickOnMenu } from '../../../scripts/Scripts'

import { ActivityDetails, Popup, Modal } from '../../../components'
import ActivityCreationModal from '../../../components/Modal/ActivityCreation/ActivityCreationModal'

import { changeList, createList } from '../../../redux/actions/listsAction'

import {
  updateStatusAction,
  deleteActivityAction,
  getActivityAction,
} from '../../../redux/actions/activitiesAction'

const ActivityModalDetails = ({
  id,
  isLogin,
  user,
  lists,
  handleClose,
  createList,
  changeList,
  activities,
  updateStatusAction,
  deleteActivityAction,
  getActivityAction,
}) => {
  const [activity, setActivity] = useState({})
  const [editModalOpenned, setEdtiModalOpenned] = useState(false)
  const [isOpenDeletePopup, setOpenDeletePopup] = useState(false)
  const detailsRef = useRef(null)
  const deletePopupRef = useRef(null)

  const handleDelete = () => deleteActivityAction(activity.id)

  const setData = (body) => {
    const data = {
      id: body.id,
      name: body.name,
      shortDescription: body.shortDescription,
      description: body.description,
      url: body.url,
      status: status.filter((item) => body.status === item.value)[0],
      keywords: body.keywords,
      knowledgeStages: body.knowledgeStages,
      author: body.author,
      created: body.created,
      organization: {
        ...body.organization,
      },
      contacts: body.contacts,
      categories: body.categories,
      related: body.related
        ? body.related
            .filter((activity) => activity.status === 'Verified')
            .map((activity) => activity.name)
        : [],
      organizations: body.activity_organization,
      articles: body.articles
        .filter((article) => article.status === 'Verified')
        .map((article) => article.name),
    }
    setActivity(data)
  }

  useEffect(() => {
    if (activities.activitySuccessfullyUpdated && id) {
      getActivityAction(id, setData)
      setEdtiModalOpenned(false)
    }
  }, [activities.activitySuccessfullyUpdated])

  useEffect(() => {
    if (id) {
      getActivityAction(id, setData)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target) &&
        !deletePopupRef.current
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
  }, [detailsRef, deletePopupRef])

  return activity.id ? (
    <section className="details__container">
      {!editModalOpenned ? (
        <div ref={detailsRef} className="details__container-modal">
          <ActivityDetails
            isLogin={isLogin}
            handleClose={handleClose}
            updateStatus={(key, value) => updateStatusAction(id, value.value)}
            activity={activity}
            handleDelete={setOpenDeletePopup}
            setEdtiModalOpenned={setEdtiModalOpenned}
            changeList={changeList}
            createList={createList}
            lists={lists}
            user={user}
          />
          {isOpenDeletePopup && (
            <div ref={deletePopupRef} className="details__container-modal">
              <Modal>
                <Popup
                  text={activity.name}
                  handleClick={handleDelete}
                  handleClose={() => setOpenDeletePopup(false)}
                />
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <div className="modal">
          <ActivityCreationModal
            handleCloseModal={() => setEdtiModalOpenned(false)}
            activityId={id}
            modalType={editModalOpenned}
          />
        </div>
      )}
    </section>
  ) : null
}

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
  user: state.user,
  activities: state.activities,
  isLogin: state.login.isLogin,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
    changeList: (id, list) => dispatch(changeList(id, list)),
    updateStatusAction: (id, status) =>
      dispatch(updateStatusAction(id, status)),
    deleteActivityAction: (id) => dispatch(deleteActivityAction(id)),
    getActivityAction: (id, callback) =>
      dispatch(getActivityAction(id, callback)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityModalDetails)
