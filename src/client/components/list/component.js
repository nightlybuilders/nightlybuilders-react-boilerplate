/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import BemHelper from 'react-bem-helper'

// Styling
const classes = new BemHelper('list')

export const List = props => {
  const { data, actions } = props
  return (
    <ul {...classes()}>
      {data.length > 0 && data.map(d => <li key={actions.getKey(d)}>{actions.getValue(d)}</li>)}
    </ul>
  )
}

List.displayName = 'List'
List.propTypes = {
  data: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  actions: PropTypes.shape({
    getValue: PropTypes.func,
    getKey: PropTypes.func,
  }),
}
List.defaultProps = {
  data: [],
  actions: {
    getValue: d => d.id,
    getKey: d => d,
  },
}
