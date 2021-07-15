import React, { useState } from 'react'
import ApplicationHelper from '../../../assets/js/utils'
import { downloadFile } from '../../../redux/actions/fileAction'

import { FormInput, FormTextarea } from '../../Form'

import './feedbackModal.scss'

export const FeedbackModal = ({
  isLogin,
  setModalOpened,
  sendFeedback,
  user,
}) => {
  const [validationProcess, setValidationProcess] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const validateForm = () => {
    if (isLogin) {
      if (title.trim().length !== 0 && message.trim().length !== 0) {
        return true
      }
      setValidationProcess(true)
      return false
    } else {
      if (
        userName.trim().length !== 0 &&
        ApplicationHelper.validateEmail(userEmail) &&
        title.trim().length !== 0 &&
        message.trim().length !== 0
      ) {
        return true
      }
      setValidationProcess(true)
      return false
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      if (isLogin) {
        sendFeedback({
          username: user.username,
          userEmail: user.email,
          title,
          message,
        })
      } else {
        sendFeedback({ username: userName, userEmail, title, message })
      }
    }
  }

  const download = (e) => {
    e.stopPropagation()
    downloadFile()
  }

  return (
    <div className="feedback">
      <h2 className="feedback-title">Send Quick Feedback</h2>
      <div className="feedback-times" onClick={() => setModalOpened(false)} />
      <p className="feedback-description">
        You can also download the{' '}
        <span onClick={download} className="feedback-description-button">
          Test Script
        </span>{' '}
        and submit your feedback via the{' '}
        <a
          href="https://www.surveymonkey.com/r/G8CTQH3"
          target="_blank"
          className="feedback-description-link"
        >
          Beta Survey tool
        </a>
        .
      </p>

      <form className="feedback-form">
        {!isLogin ? (
          <React.Fragment>
            <FormInput
              className="form-item"
              label="Your Name*"
              error={
                validationProcess
                  ? userName.trim().length === 0
                    ? true
                    : false
                  : false
              }
              value={userName}
              onChange={(val) => setUserName(val)}
            />
            <FormInput
              className="form-item"
              label="Your Email*"
              error={
                validationProcess
                  ? userEmail.trim().length === 0 ||
                    !ApplicationHelper.validateEmail(userEmail)
                    ? true
                    : false
                  : false
              }
              value={userEmail}
              onChange={(val) => setUserEmail(val)}
            />
          </React.Fragment>
        ) : null}

        <FormInput
          className="form-item"
          label="Title*"
          error={
            validationProcess
              ? title.trim().length === 0
                ? true
                : false
              : false
          }
          value={title}
          onChange={(val) => setTitle(val)}
        />
        <FormTextarea
          className="form-item__textarea"
          label="Message*"
          error={
            validationProcess
              ? message.trim().length === 0
                ? true
                : false
              : false
          }
          value={message}
          onChange={(val) => setMessage(val)}
          maxLength={1000}
        />
        <div className="feedback-buttons">
          <button
            type="button"
            className="feedback-cancel"
            onClick={() => setModalOpened(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="feedback-submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
