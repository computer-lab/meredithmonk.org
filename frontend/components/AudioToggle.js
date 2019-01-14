import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const AudioToggle = ({ muted }) => (
  muted ? <FontAwesomeIcon icon={faVolumeOff} /> : <FontAwesomeIcon icon={faVolumeUp} />
)

AudioToggle.propTypes = {
  muted: PropTypes.bool,
}

AudioToggle.defaultProps = {
  muted: true,
}

export default AudioToggle
