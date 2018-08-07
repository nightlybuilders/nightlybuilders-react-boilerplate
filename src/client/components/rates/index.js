import { compose, graphql } from 'react-apollo'

import { queryRates } from '../../../common/queries/'
import { Rates as RatesComponent } from './component'

export const Rates = compose(graphql(queryRates))(RatesComponent)
