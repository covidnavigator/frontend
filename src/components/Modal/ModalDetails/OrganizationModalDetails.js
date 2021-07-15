import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import { OrganizationDetails, Popup, Modal } from '../..'

import {
  getOrganizationAction,
  deleteOrganizationAction,
} from '../../../redux/actions/organizationsAction'

import OrganizationCreationModal from '../OrganizationCreation/OrganizationCreationModal'

import { isClickOnNotification, isClickOnMenu } from '../../../scripts/Scripts'

import '../modal.scss'

const OrganizationModalDetails = ({
  id,
  handleClose,
  organizations,
  getOrganizationAction,
  deleteOrganizationAction,
}) => {
  const [organization, setOrganization] = useState({})
  const [editModalOpenned, setEdtiModalOpenned] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)
  const popupRef = useRef(null)

  const closeEditModal = () => {
    setEdtiModalOpenned(false)
  }

  const handleDelete = () => deleteOrganizationAction(organization.id)

  const fetchOrganizationData = () => {
    getOrganizationAction(id, setOrganization)
  }

  useEffect(() => {
    if (organizations.updationOrganizationSuccess && id) {
      fetchOrganizationData()
      setEdtiModalOpenned(false)
    }
  }, [organizations.updationOrganizationSuccess])

  useEffect(() => {
    if (id) {
      fetchOrganizationData()
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
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, popupRef])

  return organization.id ? (
    <section className="details__container">
      {!editModalOpenned.length ? (
        <div ref={modalRef} className="details__container-modal">
          <OrganizationDetails
            handleClose={handleClose}
            organization={organization}
            handleDelete={setOpenModal}
            setEdtiModalOpenned={setEdtiModalOpenned}
          />
          {isOpenModal && (
            <div ref={popupRef} className="details__container-modal">
              <Modal>
                <Popup
                  text={organization.name}
                  handleClick={handleDelete}
                  handleClose={() => setOpenModal(false)}
                />
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <div className="modal">
          <OrganizationCreationModal
            organizationId={id}
            modalType="edit"
            handleCloseModal={closeEditModal}
          />
        </div>
      )}
    </section>
  ) : null
}

const mapStateToProps = (state) => ({
  organizations: state.organizations,
})

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrganizationAction: (id) => dispatch(deleteOrganizationAction(id)),
    getOrganizationAction: (id, callback) =>
      dispatch(getOrganizationAction(id, callback)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationModalDetails)
