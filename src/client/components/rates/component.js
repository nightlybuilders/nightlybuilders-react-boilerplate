/* eslint-disable no-underscore-dangle */
import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import BemHelper from 'react-bem-helper'

import { List } from '../list'

// Styling
const classes = new BemHelper('rates')

export const Rates = props => {
  const { data } = props
  return (
    <div {...classes()}>
      <h3>Prefetched Rates (Apollo)</h3>
      <List data={get(data, 'rates')} getKey={d => d.currency} getValue={d => d.currency} />
    </div>
  )
}

Rates.displayName = 'Rates'
Rates.propTypes = {
  data: PropTypes.shape({
    rates: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  }),
}
Rates.defaultProps = {
  data: {
    rates: [],
  },
}
