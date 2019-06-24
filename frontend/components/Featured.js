import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const Featured = ({ text, link, openInNewTab }) => (
  <div className="featured">
    <Link href={link} prefetch>
      <a>
        {text} <FontAwesomeIcon title="arrow right" size="sm" icon={faAngleDoubleRight} />
      </a>
    </Link>
  </div>
)

Featured.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
}

Featured.defaultProps = {
  text: '',
  link: '/',
}

export default Featured
