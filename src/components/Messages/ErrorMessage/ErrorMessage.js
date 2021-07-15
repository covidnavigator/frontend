import React from 'react'

import { Modal } from '../../Modal'

import './errorMessage.scss'

export function ErrorMessage({ error, setError }) {
  return (
    <Modal>
      <div className="error-message">
        <span className="error-message__text">{error}</span>
        <button className="error-message__ok" onClick={() => setError('')}>
          OK
        </button>
      </div>
    </Modal>
  )
}
