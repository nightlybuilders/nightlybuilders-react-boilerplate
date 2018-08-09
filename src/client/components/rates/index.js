// graphql docs: https://www.apollographql.com/docs/react/api/react-apollo.html#graphql
import { compose, graphql } from 'react-apollo'

import { queryRates } from '../../../common/queries/'

import { Rates as RatesComponent } from './component'

export const Rates = compose(
  graphql(queryRates, {
    options: props => ({
      variables: {
        currency: props.currency,
      },
    }),
  }),
)(RatesComponent)
