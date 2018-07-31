import React from 'react'
import PropTypes from 'prop-types'
import cx from 'bem-classnames'
import get from 'lodash.get'

// Styling
const classes = {
  name: 'image',
}

export const getImagePath = (src, cachebuster) => {
  // if the src contains http, we assume it is pointing to an external host and
  // return the src right away
  if (src.indexOf('http') >= 0) {
    return src
  }

  return `/__static__/${cachebuster}/images/${src}`
}

// TODO: create ResponsiveImage Version (not working in IE <=11):
//  - https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
export const Image = props => (
  <img
    alt={props.alt || ''}
    className={cx(classes, props.className)}
    onClick={props.onClick}
    onKeyDown={props.onClick}
    role="presentation"
    style={props.styles}
    src={getImagePath(props.src, get(props, 'data.cachebuster', 0))}
  />
)

Image.displayName = 'Image'
Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

Image.defaultProps = {
  className: '',
  onClick: () => {},
  styles: {},
}
