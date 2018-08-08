/* eslint-disable no-underscore-dangle */
import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import BemHelper from 'react-bem-helper'
import map from 'lodash.map'

import { List, ListItem } from '../list'

// Styling
const classes = new BemHelper('rates')

export const Rates = props => {
  const { data } = props
  return (
    <div {...classes()}>
      <h3>Prefetched Rates (Apollo)</h3>
      <List>
        {map(get(data, 'rates') || [], rate => (
          <ListItem key={rate.currency}>{rate.currency}</ListItem>
        ))}
      </List>
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
