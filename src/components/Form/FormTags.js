import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export function FormTags({
  label,
  tags,
  handleDelete,
  handleAddition,
  handleDrag,
  className,
}) {
  return (
    <div className={className}>
      <label className="form-item__label_active">{label}</label>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
        inputFieldPosition="top"
        autofocus={false}
        placeholder={``}
      />
    </div>
  )
}
