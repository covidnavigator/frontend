import React from 'react'

import './footer.scss'

export const Footer = ({ className }) => {
  return (
    <div className={`footer ${className}`}>
      <span className="copyright">
        © {new Date().getFullYear()}{' '}
        <a
          href="https://www.omg.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Object Management Group.{' '}
        </a>
        All Rights Reserved.
      </span>
    </div>
  )
}
