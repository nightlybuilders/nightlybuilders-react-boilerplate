/* eslint-disable no-underscore-dangle */
import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import BemHelper from 'react-bem-helper'
import dbg from 'debug'
import map from 'lodash.map'
import invoke from 'lodash.invoke'

import { List, ListItem } from '../list'

// Styling
const classes = new BemHelper('rates')

const debug = dbg('nb:Rates')

export class Rates extends React.Component {
  componentDidMount = () => {
    // Illustration: how to refresh data from Apollo
    setTimeout(() => {
      debug('refreshData')
      invoke(this.props, 'data.refetch')
    }, 3000)
  }

  render() {
    const { data } = this.props
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
}

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
