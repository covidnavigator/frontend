import React from 'react'

import './pagination.scss'

export function Pagination({ page, limit, totalResults }) {
  return (
    <div className="pagination">
      <span className="pagination-text">
        {totalResults ? (page - 1) * limit + 1 : 0}-
        {page * limit > totalResults ? totalResults : page * limit} of{' '}
        {totalResults}
      </span>
    </div>
  )
}
