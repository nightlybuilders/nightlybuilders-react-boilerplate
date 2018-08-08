/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'bem-classnames'

// Styling
const classes = {
  name: 'list',
}

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}
const defaultProps = {
  children: null,
}

export const List = ({ className, children }) => (
  <ul className={cx(classes, className)}>{children}</ul>
)
export const ListItem = ({ className, children, onClick, onKeyPress, styles }) => (
  <li
    className={cx(classes, className)}
    style={styles}
    onClick={onClick}
    onKeyPress={onKeyPress}
    role="presentation"
  >
    {children}
  </li>
)

ListItem.displayName = 'ListItem'
ListItem.propTypes = {
  ...propTypes,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}
ListItem.defaultProps = {
  ...defaultProps,
  className: '',
  onClick: () => {},
  onKeyPress: () => {},
  style: {},
}

List.displayName = 'List'
List.propTypes = {
  ...propTypes,
  className: PropTypes.string,
}
List.defaultProps = {
  ...defaultProps,
  className: '',
}
