import gql from 'graphql-tag'

export const queryRates = gql`
  query($currency: String!) {
    rates(currency: $currency) {
      currency
    }
  }
`
