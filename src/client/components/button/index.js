import React from 'react'
import PropTypes from 'prop-types'
import cx from 'bem-classnames'

// Styling
const classes = {
  name: 'button',
}

export const Button = props => (
  <button className={cx(classes, props.className)} style={props.styles} onClick={props.onClick}>
    {props.children}
  </button>
)

Button.displayName = 'Button'
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

Button.defaultProps = {
  children: [],
  className: '',
  onClick: () => {},
  styles: {},
}
